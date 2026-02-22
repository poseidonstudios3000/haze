import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useEventContent, layoutToEventType } from "@/hooks/use-event-content";

export function EventSignatureSection() {
  const { layout } = useTheme();
  const eventType = layoutToEventType(layout);
  const { content } = useEventContent(eventType);

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        key={layout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <blockquote className="text-2xl md:text-4xl font-black font-display italic text-primary leading-tight">
          "{content.signature.quote}"
        </blockquote>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {content.signature.description}
        </p>
      </motion.div>
    </section>
  );
}
