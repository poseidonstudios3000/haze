import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { ChevronDown, Mic2, Calendar, Speaker, MapPin, Shield, Plus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useEventContent, layoutToEventType } from "@/hooks/use-event-content";
import type { FAQItem } from "@/hooks/use-event-content";

interface FAQCategory {
  category: string;
  icon: React.ReactNode;
  items: (FAQItem & { id: number })[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "DJ & MC Services": <Mic2 className="w-5 h-5" />,
  "Booking": <Calendar className="w-5 h-5" />,
  "Equipment": <Speaker className="w-5 h-5" />,
  "Locations": <MapPin className="w-5 h-5" />,
  "Logistics & Reliability": <Shield className="w-5 h-5" />,
};

export function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const { layout } = useTheme();
  const evtType = layoutToEventType(layout);
  const { content: eventContent } = useEventContent(evtType);

  const categories: FAQCategory[] = useMemo(() => {
    const categoryMap = new Map<string, (FAQItem & { id: number })[]>();
    eventContent.faq.items.forEach((item, index) => {
      const cat = item.category || "General";
      if (!categoryMap.has(cat)) categoryMap.set(cat, []);
      categoryMap.get(cat)!.push({ ...item, id: index + 1 });
    });
    return Array.from(categoryMap.entries()).map(([category, items]) => ({
      category,
      icon: CATEGORY_ICONS[category] || <Mic2 className="w-5 h-5" />,
      items,
    }));
  }, [eventContent.faq.items]);

  const currentCategory = categories[activeCategory] || categories[0];

  const renderFAQItem = (faq: FAQItem & { id: number }) => {
    const isExpanded = expanded === faq.id;

    return (
      <motion.div
        key={faq.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <button
          onClick={() => setExpanded(isExpanded ? null : faq.id)}
          className={`w-full text-left transition-all duration-300 ${
            isExpanded
              ? "bg-primary/10 border-primary/50"
              : "bg-zinc-900/50 border-white/5 hover:border-primary/30 hover:bg-zinc-900/80"
          } border rounded-xl`}
          data-testid={`faq-question-${faq.id}`}
        >
          <div className="flex items-start justify-between p-5 gap-4">
            <span className={`text-base md:text-lg font-semibold transition-colors ${
              isExpanded ? "text-primary" : "text-white group-hover:text-primary"
            }`}>
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isExpanded ? "bg-primary text-black" : "bg-white/10 text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0">
                  <div className="h-px bg-white/10 mb-4" />
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    );
  };

  if (!currentCategory) return null;

  return (
    <div className="space-y-8 md:space-y-12">
      <div>
        <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">{eventContent.faq.title}</h2>
        <div className="h-1 w-24 bg-primary rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-8 space-y-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCategory(index);
                  setExpanded(null);
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-primary text-black"
                    : "bg-zinc-900/50 text-white hover:bg-zinc-900/80 border border-white/5 hover:border-primary/30"
                }`}
                data-testid={`faq-category-${index}`}
              >
                <span className={`shrink-0 ${activeCategory === index ? "text-black" : "text-primary"}`}>
                  {category.icon}
                </span>
                <span className="font-bold text-sm md:text-base">{category.category}</span>
                <span className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${
                  activeCategory === index
                    ? "bg-black/20 text-black"
                    : "bg-white/10 text-muted-foreground"
                }`}>
                  {category.items.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-primary">{currentCategory.icon}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {currentCategory.category}
                </h3>
              </div>
              {currentCategory.items.map((faq) => renderFAQItem(faq))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
