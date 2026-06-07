import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme, type EventLayout } from "@/context/ThemeContext";

const layoutOptions: { key: EventLayout; label: string; href: string }[] = [
  { key: "corporate_event", label: "Corporate", href: "/corporate-event-dj" },
  { key: "private_event", label: "Private", href: "/private-event-dj" },
  { key: "wedding", label: "Wedding", href: "/wedding-dj" },
  { key: "pr_show", label: "Other", href: "/brand-activation-dj" },
];

export function ThemeSelector() {
  const { layout, setLayout } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex items-center gap-1 text-xs font-bold tracking-wider">
        <span className="text-muted-foreground mr-1">Select your event experience:</span>
        {layoutOptions.map((option, index) => (
          <span key={option.key} className="flex items-center">
            <a
              href={option.href}
              onClick={() => setLayout(option.key)}
              className={`transition-colors ${layout === option.key ? "text-primary" : "text-white hover:text-primary"}`}
            >
              {option.label}
            </a>
            {index < layoutOptions.length - 1 && <span className="text-white/30 mx-1">/</span>}
          </span>
        ))}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:text-primary transition-colors text-foreground"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 w-48 bg-black border border-white/20 rounded-xl overflow-hidden z-50 backdrop-blur-xl"
            >
              {layoutOptions.map((option) => (
                <a
                  key={option.key}
                  href={option.href}
                  onClick={() => {
                    setLayout(option.key);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-colors text-xs font-bold tracking-wider border-b border-white/10 last:border-b-0 ${
                    layout === option.key
                      ? "bg-white/20 text-primary"
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  {option.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
