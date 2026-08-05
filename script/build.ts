import { execSync } from "child_process";
import path from "path";

const rootDir = path.resolve(import.meta.dirname, "..");

console.log("Building frontend with Vite...");
execSync("npm run build:client", {
  cwd: rootDir,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

console.log("Generating route-specific SEO HTML...");
execSync("tsx script/generate-seo-pages.ts", {
  cwd: rootDir,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

// Body prerendering runs after the per-route head is in place. It is optional
// and non-fatal: SKIP_PRERENDER=true skips it, and it self-skips when no
// Chromium is available, so it can never break the build.
if (process.env.SKIP_PRERENDER === "true") {
  console.log("Skipping body prerendering (SKIP_PRERENDER=true)...");
} else {
  console.log("Prerendering route bodies with headless Chrome...");
  execSync("tsx script/prerender.ts", {
    cwd: rootDir,
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });
}

console.log("Building server with esbuild...");
execSync("npm run build:server", {
  cwd: rootDir,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

console.log("Build complete!");
