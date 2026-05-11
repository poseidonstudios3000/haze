import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

const placeholderAssetIdPrefix = "\0placeholder-asset:";
const attachedAssetsDir = path.resolve(import.meta.dirname, "attached_assets");
const allowMissingAssetPlaceholders =
  process.env.ALLOW_MISSING_ASSETS === "true" ||
  process.env.NODE_ENV === "development";

function getPlaceholderValue(source: string) {
  const ext = path.extname(source).toLowerCase();
  const isVideo = [".mp4", ".mov"].includes(ext);
  return isVideo
    ? "data:video/mp4;base64,"
    : `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><rect width="1600" height="1000" fill="#111"/><path d="M0 760c250-95 500-95 750 0s500 95 850 0v240H0z" fill="#c7ff3d" opacity=".35"/><circle cx="1180" cy="330" r="170" fill="#c7ff3d" opacity=".22"/><text x="80" y="130" fill="#f5f5f5" font-family="Arial, sans-serif" font-size="64" font-weight="700">Missing site asset</text><text x="80" y="215" fill="#d7d7d7" font-family="Arial, sans-serif" font-size="34">Restore attached_assets for production visuals.</text></svg>`,
      )}`;
}

function getPlaceholderModule(source: string) {
  return `export default ${JSON.stringify(getPlaceholderValue(source))};`;
}

function placeholderAssetPlugin() {
  return {
    name: "placeholder-missing-assets",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (
        !allowMissingAssetPlaceholders ||
        !code.includes("@assets/") ||
        !/\.[cm]?[jt]sx?$/.test(id)
      ) {
        return null;
      }

      const transformed = code.replace(
        /import\s+([A-Za-z_$][\w$]*)\s+from\s+["']@assets\/([^"']+)["'];?/g,
        (statement, importName: string, assetPath: string) => {
          const absoluteAssetPath = path.resolve(attachedAssetsDir, assetPath);
          if (fs.existsSync(absoluteAssetPath)) {
            return statement;
          }

          return `const ${importName} = ${JSON.stringify(
            getPlaceholderValue(assetPath),
          )};`;
        },
      );

      return transformed === code ? null : { code: transformed, map: null };
    },
    resolveId(source: string) {
      if (!source.startsWith("@assets/")) {
        return null;
      }

      const relativeAssetPath = source.replace(/^@assets\//, "");
      const absoluteAssetPath = path.resolve(attachedAssetsDir, relativeAssetPath);

      if (allowMissingAssetPlaceholders && !fs.existsSync(absoluteAssetPath)) {
        return `${placeholderAssetIdPrefix}${source}`;
      }

      return null;
    },
    load(id: string) {
      if (!id.startsWith(placeholderAssetIdPrefix)) {
        const filePath = id.split("?")[0];
        if (
          allowMissingAssetPlaceholders &&
          filePath.startsWith(`${attachedAssetsDir}${path.sep}`) &&
          !fs.existsSync(filePath)
        ) {
          return getPlaceholderModule(filePath);
        }

        return null;
      }

      const source = id.slice(placeholderAssetIdPrefix.length);
      return getPlaceholderModule(source);
    },
  };
}

export default defineConfig({
  plugins: [placeholderAssetPlugin(), react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
