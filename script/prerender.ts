/**
 * Body prerendering — headless-Chrome snapshot of each public route.
 *
 * Runs after generate-seo-pages.ts, so every dist/public/<route>/index.html
 * already has the correct per-route <head> (title/description/canonical/JSON-LD,
 * including DB-backed SEO overrides). This step loads each route in Chromium,
 * waits for the app to render, and writes the rendered #root markup back into
 * the file — WITHOUT touching the head. Crawlers that don't run JS (ChatGPT,
 * Perplexity) then see real content; browsers still client-render normally,
 * because main.tsx uses createRoot (which discards the snapshot and re-renders).
 *
 * Deliberately NOT SSR: no renderToString, no ssrPath, no SSR bundle.
 *
 * The step is non-fatal by design. If SKIP_PRERENDER=true, or no Chromium can be
 * resolved (e.g. a build environment without a browser), it logs and exits 0 so
 * the deploy is never broken — the pages simply stay client-rendered.
 *
 * Chromium resolution tries a locally installed browser first (dev + this repo's
 * CI, via PLAYWRIGHT_BROWSERS_PATH or a system path), then falls back to the
 * @sparticuz/chromium binary in serverless build environments like Vercel, which
 * ship no browser of their own. That dependency is build-time only (a
 * devDependency) and is imported lazily here, so it never enters the serverless
 * function bundle and its absence never breaks the build.
 */
import fs from "fs";
import path from "path";
import { createServer, type Server } from "http";
import { fileURLToPath } from "url";
import express from "express";
import { chromium } from "playwright-core";
import { PUBLIC_SEO_PAGES } from "../shared/seo";

const rootDir = path.resolve(import.meta.dirname, "..");
const distPublicDir = path.join(rootDir, "dist", "public");

// Marker Vite emits for the mount node. We replace only this, leaving the
// surrounding head/scripts exactly as generate-seo-pages.ts wrote them.
const EMPTY_ROOT = '<div id="root"></div>';

function log(message: string) {
  console.log(`[prerender] ${message}`);
}

/**
 * Find a Chromium/Chrome executable. playwright-core bundles no browser, so we
 * resolve one from (in order): an explicit override, the Playwright browser
 * cache (how this repo's dev environment provides it), then common system paths.
 * Returns null when none exists — the caller then skips gracefully.
 */
function resolveChromiumPath(): string | null {
  const override = process.env.PRERENDER_CHROMIUM_PATH;
  if (override && fs.existsSync(override)) return override;

  const candidates: string[] = [];

  const browsersRoot = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (browsersRoot && fs.existsSync(browsersRoot)) {
    for (const entry of fs.readdirSync(browsersRoot)) {
      if (entry.startsWith("chromium")) {
        candidates.push(
          path.join(browsersRoot, entry, "chrome-linux", "chrome"),
          path.join(browsersRoot, entry, "chrome-linux", "headless_shell"),
        );
      }
    }
  }

  candidates.push(
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
  );

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

interface ResolvedBrowser {
  executablePath: string;
  args: string[];
  source: string;
}

/**
 * Resolve a launchable Chromium, preferring a local browser so dev and CI behave
 * exactly as before, then falling back to @sparticuz/chromium for serverless
 * build environments (Vercel) that ship no browser. Returns null when neither
 * resolves — the caller then skips gracefully. Never throws: a missing or broken
 * @sparticuz/chromium is caught and treated as "no browser".
 */
async function resolveBrowser(): Promise<ResolvedBrowser | null> {
  const local = resolveChromiumPath();
  if (local) {
    return {
      executablePath: local,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      source: "local",
    };
  }

  // Serverless fallback. Imported lazily and defensively: if the dependency
  // isn't installed (or fails to unpack its binary), we return null and the
  // build carries on with client-rendered pages.
  try {
    const mod: any = await import("@sparticuz/chromium");
    const sparticuz = mod.default ?? mod;
    // We only capture #root markup, so we don't need WebGL/canvas — disabling
    // graphics drops the swiftshader/ANGLE flags and speeds cold start.
    if ("graphicsMode" in sparticuz) sparticuz.graphicsMode = false;

    const executablePath: string = await sparticuz.executablePath();
    if (!executablePath || !fs.existsSync(executablePath)) {
      log("@sparticuz/chromium resolved no executable — skipping.");
      return null;
    }

    // @sparticuz/chromium targets direct Chromium launches, so its args include
    // flags Playwright can't drive: --single-process stops Playwright attaching
    // over CDP, and --headless='shell' is Playwright's to set. Strip both; keep
    // the rest (no-sandbox, swiftshader off, etc.).
    const args: string[] = (sparticuz.args as string[]).filter(
      (arg) => arg !== "--single-process" && !arg.startsWith("--headless"),
    );

    return { executablePath, args, source: "@sparticuz/chromium" };
  } catch (error) {
    log(
      `@sparticuz/chromium unavailable (${(error as Error).message}) — ` +
        "skipping body prerendering.",
    );
    return null;
  }
}

/** Serve dist/public so clean route URLs map to their generated index.html. */
function startStaticServer(): Promise<{ server: Server; port: number }> {
  const app = express();
  // Assets, favicon, sitemap, etc.
  app.use(express.static(distPublicDir));
  // Clean routes -> their per-route index.html (falls back to the SPA shell).
  app.get("*", (req, res) => {
    const routeFile = path.join(distPublicDir, req.path, "index.html");
    if (req.path !== "/" && fs.existsSync(routeFile)) {
      res.sendFile(routeFile);
    } else {
      res.sendFile(path.join(distPublicDir, "index.html"));
    }
  });

  return new Promise((resolve) => {
    const server = createServer(app);
    // Port 0 -> OS assigns a free port, so parallel builds don't collide.
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      resolve({ server, port });
    });
  });
}

function routeFilePath(routePath: string): string {
  const normalized = routePath === "/" ? "" : routePath.replace(/^\/+/, "");
  return path.join(distPublicDir, normalized, "index.html");
}

async function main() {
  if (process.env.SKIP_PRERENDER === "true") {
    log("SKIP_PRERENDER=true — skipping body prerendering.");
    return;
  }

  if (!fs.existsSync(distPublicDir)) {
    log(`dist/public not found at ${distPublicDir} — nothing to prerender.`);
    return;
  }

  const resolved = await resolveBrowser();
  if (!resolved) {
    log(
      "No Chromium executable found — skipping body prerendering (pages stay " +
        "client-rendered). Set PRERENDER_CHROMIUM_PATH to enable it here.",
    );
    return;
  }
  log(`Using Chromium (${resolved.source}) at ${resolved.executablePath}`);

  const startedAt = Date.now();
  const { server, port } = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await chromium.launch({
    executablePath: resolved.executablePath,
    args: resolved.args,
  });

  let rendered = 0;
  let skipped = 0;

  try {
    const page = await browser.newPage();

    // We only snapshot #root markup, never pixels, so image/media/font bytes are
    // dead weight — blocking them cuts the render time and, more importantly,
    // avoids a slow build hanging on an external asset that's unreachable from
    // the build network. The DOM structure we capture is unaffected.
    await page.route("**/*", (route) => {
      const type = route.request().resourceType();
      if (type === "image" || type === "media" || type === "font") {
        return route.abort();
      }
      return route.continue();
    });

    for (const seoPage of PUBLIC_SEO_PAGES) {
      const filePath = routeFilePath(seoPage.path);
      if (!fs.existsSync(filePath)) {
        log(`No built file for ${seoPage.path} — skipping.`);
        skipped++;
        continue;
      }

      await page.goto(`${baseUrl}${seoPage.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // The footer only mounts once the app has rendered, so it's our signal
      // that #root holds real content (and that internal links exist).
      await page.waitForSelector("footer", { timeout: 30000 });

      const rootHtml = await page.$eval("#root", (el) => el.innerHTML);
      if (!rootHtml || rootHtml.trim().length === 0) {
        log(`Empty #root after render for ${seoPage.path} — leaving as-is.`);
        skipped++;
        continue;
      }

      const original = fs.readFileSync(filePath, "utf-8");
      if (!original.includes(EMPTY_ROOT)) {
        log(`Root marker not found in ${seoPage.path} — leaving as-is.`);
        skipped++;
        continue;
      }

      // Replace ONLY the empty mount node; head and scripts are untouched.
      const updated = original.replace(
        EMPTY_ROOT,
        `<div id="root">${rootHtml}</div>`,
      );
      fs.writeFileSync(filePath, updated);
      rendered++;
    }
  } finally {
    await browser.close();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }

  const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);
  log(
    `Prerendered ${rendered} route(s)` +
      (skipped ? `, skipped ${skipped}` : "") +
      ` in ${seconds}s.`,
  );
}

// Only guard genuine failures; a missing browser is already handled above.
main().catch((error) => {
  console.error("[prerender] Failed:", error);
  // Non-fatal: never break the build over prerendering.
  if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    process.exitCode = 0;
  }
});
