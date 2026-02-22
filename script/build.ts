import { execSync } from "child_process";
import path from "path";

const rootDir = path.resolve(import.meta.dirname, "..");

console.log("Building frontend with Vite...");
execSync("npx vite build", {
  cwd: rootDir,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

console.log("Build complete!");
