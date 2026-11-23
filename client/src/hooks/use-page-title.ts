import { useEffect } from "react";
import { getSeoPage } from "@shared/seo";

// The per-route <title> is baked into each prerendered HTML file; this keeps it
// right after client-side (wouter) navigation too.
export function usePageTitle(path: string) {
  useEffect(() => {
    document.title = getSeoPage(path).title;
  }, [path]);
}
