import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import slide1 from "@assets/Wedding-DJ-Chicago-DJ-Miss-Haze-5-things-couples-dont-realize-when-booking-a-DJ-1.png";
import slide2 from "@assets/Miss-Haze-5-things-couples-dont-realize-when-booking-a-DJ-2.png";
import slide3 from "@assets/Miss-Haze-5-things-couples-dont-realize-when-booking-a-DJ-3.png";
import slide4 from "@assets/Miss-Haze-5-things-couples-dont-realize-when-booking-a-DJ-4.png";
import slide5 from "@assets/Miss-Haze-5-things-couples-dont-realize-when-booking-a-DJ-5.png";
import slide6 from "@assets/Miss-Haze-5-things-couples-dont-realize-when-booking-a-DJ-6.png";
import slide7 from "@assets/Miss-Haze-5-things-couples-dont-realize-when-booking-a-DJ-7.png";
import slide8 from "@assets/Miss-Haze-5-things-couples-dont-realize-when-booking-a-DJ-8.png";

const slides = [
  { src: slide1, alt: "5 Things Couples Don't Realize When Booking a Wedding DJ" },
  { src: slide2, alt: "Wedding DJ Tips - Slide 2" },
  { src: slide3, alt: "Wedding DJ Tips - Slide 3" },
  { src: slide4, alt: "Wedding DJ Tips - Slide 4" },
  { src: slide5, alt: "Wedding DJ Tips - Slide 5" },
  { src: slide6, alt: "Wedding DJ Tips - Slide 6" },
  { src: slide7, alt: "Wedding DJ Tips - Slide 7" },
  { src: slide8, alt: "Wedding DJ Tips - Slide 8" },
];

export function WeddingEventPlanning() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase">5 Things Couples Don't Realize When Booking a Wedding DJ</h2>
          <div className="h-1 w-24 bg-primary rounded-full mx-auto" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            className="relative aspect-[4/5] md:aspect-[3/4] max-h-[600px] mx-auto overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={slides[currentIndex].src}
                alt={slides[currentIndex].alt}
                className="w-full h-full object-contain"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>

            <button
              onClick={goPrev}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
              aria-label="Previous slide"
              data-testid="button-wedding-carousel-prev"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
              aria-label="Next slide"
              data-testid="button-wedding-carousel-next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary w-6 md:w-8" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  data-testid={`button-wedding-dot-${index}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {slides.map((sheet, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? "border-primary opacity-100 scale-105" 
                    : "border-transparent opacity-50 hover:opacity-75"
                }`}
                aria-label={sheet.alt}
                data-testid={`button-wedding-thumb-${index}`}
              >
                <img 
                  src={sheet.src} 
                  alt={sheet.alt} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
