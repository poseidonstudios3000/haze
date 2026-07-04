import fs from "fs";
import path from "path";
import {
  PUBLIC_SEO_PAGES,
  SEO_PAGES,
  SITE_URL,
  injectSeoMeta,
  applySeoOverride,
  type SeoOverride,
} from "../shared/seo";
import { storage } from "../server/storage";

const rootDir = path.resolve(import.meta.dirname, "..");
const distPublicDir = path.join(rootDir, "dist", "public");
const indexPath = path.join(distPublicDir, "index.html");
const baseHtml = fs.readFileSync(indexPath, "utf-8");
const today = new Date().toISOString().slice(0, 10);

function writeRouteHtml(routePath: string, html: string) {
  const normalized = routePath === "/" ? "" : routePath.replace(/^\/+/, "");
  const outputDir = path.join(distPublicDir, normalized);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), html);
}

const siteContentRows = await storage.getSiteContent();
const overridesByPath = new Map<string, SeoOverride>();
for (const row of siteContentRows) {
  if (row.sectionKey.startsWith("seo:")) {
    overridesByPath.set(row.sectionKey.slice(4), row.content as SeoOverride);
  }
}

for (const basePage of SEO_PAGES) {
  const page = applySeoOverride(basePage, overridesByPath.get(basePage.path));
  const html = injectSeoMeta(baseHtml, page);
  if (page.path === "/") {
    fs.writeFileSync(indexPath, html);
  } else {
    writeRouteHtml(page.path, html);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_SEO_PAGES.map((page) => {
  const loc = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq || "monthly"}</changefreq>
    <priority>${page.priority || "0.5"}</priority>
  </url>`;
}).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(distPublicDir, "sitemap.xml"), sitemap);

fs.writeFileSync(
  path.join(distPublicDir, "robots.txt"),
  `User-agent: *
Allow: /

Disallow: /admin
Disallow: /corporate-admin

Sitemap: ${SITE_URL}/sitemap.xml
`,
);

console.log(`Generated SEO HTML for ${SEO_PAGES.length} routes plus robots.txt and sitemap.xml`);
