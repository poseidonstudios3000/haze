import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SEO_PAGES } from "../shared/seo.js";

const serverDir = path.dirname(fileURLToPath(import.meta.url));

export function serveStatic(app: Express) {
  const distPath = path.resolve(serverDir, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const routePaths = SEO_PAGES
    .map((page) => page.path)
    .filter((routePath) => routePath !== "/");

  app.get(routePaths, (req, res) => {
    res.sendFile(path.resolve(distPath, req.path.slice(1), "index.html"));
  });

  app.use(express.static(distPath));

  // Unknown paths get a real 404 with the dedicated 404.html — its own noindex
  // head and title — never a soft-200 copy of the homepage. Mirrors how Vercel
  // serves dist/public/404.html in production.
  app.use("*", (_req, res) => {
    res.status(404).sendFile(path.resolve(distPath, "404.html"));
  });
}
