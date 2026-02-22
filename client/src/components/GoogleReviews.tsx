import { motion, PanInfo } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useEventContent, layoutToEventType } from "@/hooks/use-event-content";

export function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { layout } = useTheme();
  const evtType = layoutToEventType(layout);
  const { content: eventContent } = useEventContent(evtType);

  const reviews = eventContent.reviews.items.map((item, i) => ({ id: i + 1, rating: item.rating || 5, date: "", ...item }));

  const title = eventContent.reviews.title;
  const ratingText = eventContent.reviews.ratingText;

  const paginate = useCallback((newDirection: number) => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return reviews.length - 1;
      if (nextIndex >= reviews.length) return 0;
      return nextIndex;
    });
  }, [reviews.length]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  return (
    <div 
      className="space-y-6 md:space-y-10"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">{title}</h2>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{ratingText}</p>
        </div>
      </div>

      <div className="relative">
        <div 
          className="overflow-hidden rounded-2xl h-[380px] md:h-[320px] cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-full h-full">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={false}
                animate={{
                  x: `${(index - currentIndex) * 100}%`,
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 0.9,
                }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                drag={index === currentIndex ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={index === currentIndex ? handleDragEnd : undefined}
                className="absolute inset-0 w-full h-full"
              >
                <div className="relative h-full p-6 md:p-10 rounded-2xl bg-gradient-to-br from-white/8 via-white/5 to-transparent border border-white/10 backdrop-blur-sm flex flex-col">
                  <Quote className="absolute top-6 left-6 w-8 h-8 md:w-12 md:h-12 text-primary/20" />
                  
                  <div className="relative z-10 pt-8 md:pt-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed text-center max-w-4xl mx-auto line-clamp-5 md:line-clamp-4">
                        "{review.text}"
                      </p>
                    </div>
                    
                    <div className="text-center mt-4">
                      <p className="text-base md:text-lg font-bold text-white uppercase tracking-wider">
                        — {review.author}
                      </p>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide mt-1">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group relative p-1"
              data-testid={`review-dot-${index}`}
            >
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-white/30 group-hover:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="hidden md:flex absolute -left-4 -right-4 top-1/2 -translate-y-1/2 justify-between pointer-events-none">
          <button
            onClick={() => paginate(-1)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
            data-testid="button-review-prev"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
            data-testid="button-review-next"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground md:hidden">
        Swipe to see more reviews
      </p>

      <div className="text-center pt-4">
        <a 
          href="https://www.google.com/search?q=Dj+Miss+Haze"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
          data-testid="link-google-reviews"
        >
          See all reviews on Google
        </a>
      </div>
    </div>
  );
}
