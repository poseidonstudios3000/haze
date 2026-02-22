import { useTheme, type EventLayout } from "@/context/ThemeContext";
import { layouts } from "@/styles/themes";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function ThemeSelector() {
  const { layout, setLayout } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const layoutOptions: EventLayout[] = ["corporate_event", "private_event", "wedding", "pr_show"];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-white/40 transition-colors text-xs font-bold tracking-wider whitespace-nowrap"
      >
        {layouts[layout].name}
        <ChevronDown className="w-3 h-3" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-56 bg-black border border-white/20 rounded-xl overflow-hidden z-50 backdrop-blur-xl"
          >
            {layoutOptions.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLayout(l);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-colors text-xs font-bold tracking-wider border-b border-white/10 last:border-b-0 ${
                  layout === l
                    ? "bg-white/20 text-primary"
                    : "hover:bg-white/10 text-white"
                }`}
              >
                <div className="font-bold">{layouts[l].name}</div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
