import { useState, useMemo } from "react";
import { Mic2, Calendar, Speaker, MapPin, Shield, Plus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useEventContent, layoutToEventType } from "@/hooks/use-event-content";
import type { FAQItem, FAQContent } from "@/hooks/use-event-content";

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
  // Standalone FAQ page categories:
  "Booking & Availability": <Calendar className="w-5 h-5" />,
  "Services": <Mic2 className="w-5 h-5" />,
  "Equipment & Production": <Speaker className="w-5 h-5" />,
  "Travel & Locations": <MapPin className="w-5 h-5" />,
  "Planning & Timeline": <Calendar className="w-5 h-5" />,
  "Corporate Events": <Mic2 className="w-5 h-5" />,
  "Practical": <Shield className="w-5 h-5" />,
};

// `content` lets a city or FAQ page pass its own FAQ; without it the component
// reads the current event-type FAQ. `emitSchema` renders FAQPage JSON-LD for
// this FAQ.
//
// IMPORTANT (Google FAQPage compliance): every answer is rendered into the DOM
// and only visually collapsed with CSS — never mounted on expand. All
// categories render too (inactive ones hidden). So the FAQPage markup only ever
// describes text that is actually present in the HTML, which is what Google
// requires and what the prerender captures.
export function FAQ({
  content,
  emitSchema,
}: { content?: FAQContent; emitSchema?: boolean } = {}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const { layout } = useTheme();
  const evtType = layoutToEventType(layout);
  const { content: eventContent } = useEventContent(evtType);
  const faq = content ?? eventContent.faq;

  const categories: FAQCategory[] = useMemo(() => {
    const categoryMap = new Map<string, (FAQItem & { id: number })[]>();
    faq.items.forEach((item, index) => {
      const cat = item.category || "General";
      if (!categoryMap.has(cat)) categoryMap.set(cat, []);
      categoryMap.get(cat)!.push({ ...item, id: index + 1 });
    });
    return Array.from(categoryMap.entries()).map(([category, items]) => ({
      category,
      icon: CATEGORY_ICONS[category] || <Mic2 className="w-5 h-5" />,
      items,
    }));
  }, [faq.items]);

  const faqSchema = useMemo(() => {
    if (!emitSchema) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };
  }, [emitSchema, faq.items]);

  const renderFAQItem = (item: FAQItem & { id: number }) => {
    const isExpanded = expanded === item.id;
    return (
      <div key={item.id} className="group">
        <div
          className={`transition-all duration-300 border rounded-xl ${
            isExpanded
              ? "bg-primary/10 border-primary/50"
              : "bg-zinc-900/50 border-white/5 hover:border-primary/30 hover:bg-zinc-900/80"
          }`}
        >
          <button
            onClick={() => setExpanded(isExpanded ? null : item.id)}
            className="w-full text-left"
            aria-expanded={isExpanded}
            data-testid={`faq-question-${item.id}`}
          >
            <div className="flex items-start justify-between p-5 gap-4">
              <span
                className={`text-base md:text-lg font-semibold transition-colors ${
                  isExpanded ? "text-primary" : "text-white group-hover:text-primary"
                }`}
              >
                {item.question}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isExpanded ? "bg-primary text-black rotate-45" : "bg-white/10 text-white"
                }`}
              >
                <Plus className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Answer stays in the DOM always; CSS grid-rows collapses the height.
              Not conditionally mounted, so crawlers and the prerender see it. */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-5 pb-5 pt-0">
                <div className="h-px bg-white/10 mb-4" />
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (categories.length === 0) return null;

  return (
    <div className="space-y-8 md:space-y-12">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div>
        <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">{faq.title}</h2>
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
                <span
                  className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${
                    activeCategory === index ? "bg-black/20 text-black" : "bg-white/10 text-muted-foreground"
                  }`}
                >
                  {category.items.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          {/* All categories render; only the active one is shown. Keeps every
              Q&A in the DOM so the FAQPage markup matches the page. */}
          {categories.map((category, catIdx) => (
            <div
              key={catIdx}
              className={catIdx === activeCategory ? "space-y-3" : "hidden"}
              aria-hidden={catIdx !== activeCategory}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-primary">{category.icon}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white">{category.category}</h3>
              </div>
              <div className="space-y-3">{category.items.map((item) => renderFAQItem(item))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
