import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type EventLayout = "wedding" | "pr_show" | "private_event" | "corporate_event";

interface ThemeContextType {
  layout: EventLayout;
  setLayout: (layout: EventLayout) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getLayoutFromUrl(): EventLayout | null {
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

  useEffect(() => {
    localStorage.setItem("dj-layout", layout);
    document.documentElement.setAttribute("data-layout", layout);
  }, [layout]);

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
