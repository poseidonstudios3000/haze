import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import infosheet1 from "@assets/DJ-Miss-Haze-Corporate-DJ-Brand-Activation-Infosheet_1769548310856.png";
import infosheet2 from "@assets/DJ-Miss-Haze-Corporate-DJ-Brand-Activation-Infosheet-Chicago_1769548310854.png";
import infosheet3 from "@assets/DJ-Miss-Haze-Corporate-DJ-Brand-Activation-Infosheet-Chicago-I_1769548310855.png";
import infosheet4 from "@assets/DJ-Miss-Haze-Corporate-DJ-Brand-Activation-Infosheet-Denver_1769548310855.png";
import infosheet5 from "@assets/DJ-Miss-Haze-Corporate-DJ-Brand-Activation-Infosheet-Events_1769548310856.png";
import infosheet6 from "@assets/DJ-Miss-Haze-Corporate-DJ-Brand-Activation-Infosheet-CTA_1769548310855.png";
import infosheet7 from "@assets/DJ-Miss-Haze-Corporate-DJ-Brand-Activation-Infosheet-Testimoni_1769548310856.png";
import infosheet8 from "@assets/DJ-Miss-Haze-Event-Activation-Testimonial-2_1769548310856.png";

const infosheets = [
  { src: infosheet1, alt: "How the right DJ can boost your brand" },
  { src: infosheet2, alt: "Always On-Brand - Professionalism meets Alignment" },
  { src: infosheet3, alt: "Collaboration Is Expected - Your Guests are Top-Priority" },
  { src: infosheet4, alt: "Raising Your Event's Importance - Guiding Principle" },
  { src: infosheet5, alt: "Rooms I lead - Available Event Types" },
  { src: infosheet6, alt: "Contact Me Now To Secure Your Date" },
  { src: infosheet7, alt: "Testimonial - Rilie B, Marketing & Events, JE Dunn" },
  { src: infosheet8, alt: "Testimonial - Jasmine F, Director, Influencer & Showroom" },
];

export function CorporateEventPlanning() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % infosheets.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % infosheets.length);
    setIsAutoPlaying(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + infosheets.length) % infosheets.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase">Corporate DJ Brand Activation</h2>
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
                src={infosheets[currentIndex].src}
                alt={infosheets[currentIndex].alt}
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
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
              aria-label="Next slide"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {infosheets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary w-6 md:w-8" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  data-testid={`button-dot-${index}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {infosheets.map((sheet, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? "border-primary opacity-100 scale-105" 
                    : "border-transparent opacity-50 hover:opacity-75"
                }`}
                aria-label={sheet.alt}
                data-testid={`button-thumb-${index}`}
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
