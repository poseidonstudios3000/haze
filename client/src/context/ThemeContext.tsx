import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useLocation } from "wouter";
import { getEventLayoutForPath, type EventLayout } from "@shared/seo";

export type { EventLayout };

interface ThemeContextType {
  layout: EventLayout;
  setLayout: (layout: EventLayout) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getLayoutFromUrl(): EventLayout | null {
  const pathLayout = getEventLayoutForPath(window.location.pathname);
  if (pathLayout) return pathLayout;

  const params = new URLSearchParams(window.location.search);
  const event = params.get("event");
  if (event === "corporate") return "corporate_event";
  if (event === "wedding") return "wedding";
  if (event === "private") return "private_event";
  if (event === "pr") return "pr_show";
  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<EventLayout>(() => {
    // URL parameter takes priority
    const urlLayout = getLayoutFromUrl();
    if (urlLayout) return urlLayout;
    // Fallback to localStorage
    const saved = localStorage.getItem("dj-layout");
    return (saved as EventLayout) || "wedding";
  });

  const [location] = useLocation();

  // Keep the layout in sync with the route on client-side (wouter) navigation.
  // The provider only reads the path in the useState initializer above, so on a
  // <Link> click it doesn't remount and the layout would otherwise stay on the
  // page you started from. Only routes that carry their own eventLayout drive a
  // change; hubs, /faq and the admin pages have no eventLayout, so
  // getEventLayoutForPath returns null and their behaviour is unchanged.
  useEffect(() => {
    const fromRoute = getEventLayoutForPath(location);
    if (fromRoute && fromRoute !== layout) setLayout(fromRoute);
    // Keyed on `location` only, on purpose: a manual layout change on the same
    // route must not be reverted by this sync.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    localStorage.setItem("dj-layout", layout);
    document.documentElement.setAttribute("data-layout", layout);
  }, [layout]);

  // GA4 only fires a page_view automatically on the first (hard) load via the
  // gtag('config', ...) snippet in index.html. wouter navigations are
  // client-side and never reload the page, so without this every SPA route
  // change would go uncounted. Listen to the same `location` this provider
  // already tracks and send a page_view on each change. Skip the very first run
  // so we don't double-count the initial load that config already reported.
  const isFirstPageView = useRef(true);
  useEffect(() => {
    if (isFirstPageView.current) {
      isFirstPageView.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return (
    <ThemeContext.Provider value={{ layout, setLayout }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
