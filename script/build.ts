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

console.log("Building server with esbuild...");
execSync("npm run build:server", {
  cwd: rootDir,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

console.log("Build complete!");
