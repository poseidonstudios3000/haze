import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";
import { Resend } from "resend";
import multer from "multer";
import path from "path";
import fs from "fs";
import session from "express-session";

const UPLOADS_DIR = process.env.VERCEL
  ? path.join("/tmp", "uploads")
  : path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const uploadStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, "_");
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|webp|gif|svg|mp4|mov)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed"));
    }
  },
});

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req.session as any)?.isAdmin) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

function getEmailRecipients(envValue: string | undefined, fallback: string[]) {
  return envValue
    ? envValue.split(",").map((email) => email.trim()).filter(Boolean)
    : fallback;
}

function isCronAuthorized(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true;
  return req.get("authorization") === `Bearer ${cronSecret}`;
}

async function sendMonitorAlert(subject: string, html: string) {
  const apiKey = process.env.MONITOR_RESEND_API_KEY || process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("No Resend API key configured for monitor alerts");
  }

  const resend = new Resend(apiKey);
  const recipients = getEmailRecipients(process.env.MONITOR_ALERT_TO, [
    "poseidonstudios3000@gmail.com",
    "info@djmisshaze.com",
  ]);

  await resend.emails.send({
    from:
      process.env.MONITOR_ALERT_FROM ||
      process.env.RESEND_FROM ||
      "DJ Miss Haze Monitor <bookings@djmisshaze.com>",
    to: recipients,
    subject,
    html,
  });
}

async function seedDatabase() {
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    await storage.createPost({
      location: "DALLAS",
      title: "Top 5 Rooftops for Events",
      category: "Venues",
      content: "Discover the best skyline views...",
    });
    await storage.createPost({
      location: "CHICAGO",
      title: "Industrial Wedding Venues",
      category: "Venues",
      content: "Raw spaces for modern vibes...",
    });
    await storage.createPost({
      location: "DENVER",
      title: "Underground Bass Clubs",
      category: "Nightlife",
      content: "Where the bass hits different...",
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const redirects: Record<string, string> = {
    "/weddings": "/wedding-dj",
    "/weddings/": "/wedding-dj",
    "/corporate-events": "/corporate-event-dj",
    "/corporate-events/": "/corporate-event-dj",
    "/private-events": "/private-event-dj",
    "/private-events/": "/private-event-dj",
  };

  app.get(Object.keys(redirects), (req, res) => {
    res.redirect(301, redirects[req.path]);
  });

  const sessionSecret =
    process.env.SESSION_SECRET ||
    (process.env.NODE_ENV === "production"
      ? "missing-session-secret-public-api-fallback"
      : "dev-session-secret");

  if (
    process.env.NODE_ENV === "production" &&
    !process.env.SESSION_SECRET
  ) {
    console.warn("[SESSION] SESSION_SECRET is not configured; admin sessions may reset between serverless cold starts.");
  }

  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.use("/uploads", (req, res, next) => {
    const filePath = path.join(UPLOADS_DIR, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  });

  seedDatabase();

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
      (req.session as any).isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/session", (req, res) => {
    res.json({ isAdmin: !!(req.session as any)?.isAdmin });
  });

  app.get(api.inquiries.list.path, requireAdmin, async (_req, res) => {
    const inquiries = await storage.getInquiries();
    res.json(inquiries);
  });

  app.get("/api/health/booking-form", async (req, res) => {
    if (!isCronAuthorized(req)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const checkedAt = new Date();
    const failures: string[] = [];
    let syntheticInquiryId: number | undefined;

    try {
      if (req.query.testAlert === "true") {
        await sendMonitorAlert(
          "[TEST - no action needed] DJ Miss Haze booking form monitor alert",
          `
            <h2>TEST ALERT - no action needed</h2>
            <p>This is a test of the DJ Miss Haze booking form monitor alert email.</p>
            <p><strong>No booking inquiry failed.</strong> The form monitor is being verified intentionally.</p>
            <p><strong>Checked at:</strong> ${checkedAt.toISOString()}</p>
            <p>If this were a real alert, this email would include the failing check details and point to Vercel deployment logs and environment variables.</p>
          `,
        );

        return res.json({
          status: "test-alert-sent",
          checkedAt: checkedAt.toISOString(),
        });
      }

      if (!process.env.DATABASE_URL) {
        failures.push("DATABASE_URL is not configured");
      }

      if (!process.env.RESEND_API_KEY) {
        failures.push("RESEND_API_KEY is not configured");
      }

      const eventDate = new Date(checkedAt);
      eventDate.setUTCDate(eventDate.getUTCDate() + 30);
      const date = `${String(eventDate.getUTCMonth() + 1).padStart(2, "0")}/${String(eventDate.getUTCDate()).padStart(2, "0")}/${eventDate.getUTCFullYear()}`;

      const syntheticInquiry = api.inquiries.create.input.parse({
        eventType: "monitor",
        location: "automated-health-check",
        date,
        name: `Backend Health Monitor ${checkedAt.toISOString()}`,
        email: "poseidonstudios3000@gmail.com",
        phone: "",
      });

      const created = await storage.createInquiry(syntheticInquiry);
      syntheticInquiryId = created.id;
      await storage.deleteInquiry(created.id);

      if (failures.length > 0) {
        throw new Error(failures.join("; "));
      }

      res.json({
        status: "ok",
        checkedAt: checkedAt.toISOString(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown booking form health check failure";
      const html = `
        <h2>DJ Miss Haze booking form health check failed</h2>
        <p>The daily backend monitor found a problem with the booking form path.</p>
        <p><strong>Checked at:</strong> ${checkedAt.toISOString()}</p>
        <p><strong>Error:</strong> ${message}</p>
        <p><strong>Synthetic inquiry id:</strong> ${syntheticInquiryId ?? "not created"}</p>
        <p>Check Vercel deployment logs and production environment variables.</p>
      `;

      try {
        await sendMonitorAlert(
          "[URGENT] DJ Miss Haze booking form health check failed",
          html,
        );
      } catch (alertError) {
        console.error("[MONITOR ALERT ERROR]", alertError);
      }

      res.status(500).json({
        status: "failed",
        message,
        checkedAt: checkedAt.toISOString(),
      });
    }
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);

      if (process.env.NODE_ENV === "production" && !process.env.RESEND_API_KEY) {
        return res.status(503).json({
          message: "Inquiry email delivery is not configured",
        });
      }

      const inquiry = await storage.createInquiry(input);

      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailRecipients = getEmailRecipients(process.env.BOOKING_ALERT_TO, [
          "poseidonstudios3000@gmail.com",
          "info@djmisshaze.com",
        ]);
        const emailFrom =
          process.env.RESEND_FROM ||
          "DJ Miss Haze Bookings <bookings@djmisshaze.com>";

        try {
          await resend.emails.send({
            from: emailFrom,
            to: emailRecipients,
            subject: `New Booking Inquiry: ${input.eventType} in ${input.location}`,
            html: `
              <h2>New Booking Inquiry</h2>
              <p><strong>Name:</strong> ${input.name}</p>
              <p><strong>Location:</strong> ${input.location}</p>
              <p><strong>Event Type:</strong> ${input.eventType}</p>
              <p><strong>Event Date:</strong> ${input.date}</p>
              <p><strong>Email:</strong> ${input.email || "Not provided"}</p>
              <p><strong>Phone:</strong> ${input.phone || "Not provided"}</p>
              <hr>
              <p style="color: #888; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
            `,
          });
          console.log(`[EMAIL] Booking inquiry sent to ${emailRecipients.join(", ")}`);
        } catch (emailError) {
          console.error("[EMAIL ERROR]", emailError);
          if (process.env.NODE_ENV === "production") {
            return res.status(502).json({
              message: "Inquiry email delivery failed",
            });
          }
        }
      } else {
        console.log("[EMAIL] RESEND_API_KEY not configured, skipping email");
      }

      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.corporateContent.list.path, async (_req, res) => {
    const content = await storage.getCorporateContent();
    res.json(content);
  });

  app.post(api.corporateContent.update.path, requireAdmin, async (req, res) => {
    try {
      const input = api.corporateContent.update.input.parse(req.body);
      const content = await storage.upsertCorporateContent(input);
      res.json(content);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/site-content", async (_req, res) => {
    const content = await storage.getSiteContent();
    res.json(content);
  });

  app.post("/api/admin/site-content", requireAdmin, async (req, res) => {
    try {
      const input = z.object({
        sectionKey: z.string(),
        content: z.record(z.any()),
      }).parse(req.body);
      const content = await storage.upsertSiteContent(input);
      res.json(content);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/site-images", async (_req, res) => {
    const images = await storage.getSiteImages();
    res.json(images);
  });

  app.post("/api/admin/upload", requireAdmin, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const imageKey = req.body.imageKey;
      if (!imageKey) {
        return res.status(400).json({ message: "imageKey is required" });
      }
      const url = `/uploads/${req.file.filename}`;
      const image = await storage.upsertSiteImage({
        imageKey,
        url,
        originalName: req.file.originalname,
      });
      res.json(image);
    } catch (err) {
      res.status(500).json({ message: "Upload failed" });
    }
  });

  app.delete("/api/admin/site-images/:imageKey", requireAdmin, async (req, res) => {
    try {
      const existing = await storage.getSiteImageByKey(req.params.imageKey);
      if (existing) {
        const filePath = path.join(UPLOADS_DIR, path.basename(existing.url));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        await storage.deleteSiteImage(req.params.imageKey);
      }
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ message: "Delete failed" });
    }
  });

  return httpServer;
}
