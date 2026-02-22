import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, PartyPopper, Users, Sparkles, Music, Heart, Clock } from "lucide-react";

import img1 from "@assets/JEDunnChristmasParty2024PRINT-1207_1768515859617.jpg";
import img2 from "@assets/JEDunnChristmasParty2024PRINT-1255_1768515859615.jpg";
import img3 from "@assets/DSC02920_1768515859620.jpg";
import img4 from "@assets/DSC02938_1768515859619.jpg";

const slides = [
  { src: img1, alt: "Holiday Party DJ Experience" },
  { src: img2, alt: "Birthday Celebration Energy" },
  { src: img3, alt: "Private Party Moments" },
  { src: img4, alt: "Dance Floor Vibes" },
];

const features = [
  {
    icon: PartyPopper,
    title: "Milestone Celebrations",
    description: "Birthdays, anniversaries, graduations, and life's biggest moments deserve the perfect soundtrack."
  },
  {
    icon: Users,
    title: "Intimate Gatherings",
    description: "From backyard BBQs to elegant dinner parties, music tailored to your guest list and vibe."
  },
  {
    icon: Sparkles,
    title: "Holiday Events",
    description: "New Year's Eve, Halloween bashes, themed parties — we bring the energy to match your celebration."
  },
  {
    icon: Music,
    title: "Custom Playlists",
    description: "Your favorite genres, must-play songs, and do-not-play list all curated for your event."
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Every private event is unique. We work closely with you to capture your vision perfectly."
  },
  {
    icon: Clock,
    title: "Flexible Packages",
    description: "From cocktail hours to all-night dance parties, packages designed for your timeline and budget."
  }
];

export function PrivateEventPlanning() {
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
    <>
      <section id="why-private" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase" data-testid="text-private-celebration-heading">Your Celebration, Your Sound</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5"
                data-testid={`card-private-feature-${index}`}
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider" data-testid={`text-private-feature-title-${index}`}>{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-private-feature-desc-${index}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 space-y-6 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black font-display uppercase">
              Let's Make Your Party <span className="text-primary italic">Unforgettable</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Whether it's an intimate gathering of 20 or a blowout bash of 200+, DJ Miss Haze brings the energy, expertise, and personal attention to make your private event truly memorable.
            </p>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block px-8 py-3 bg-primary text-black font-black font-display tracking-tighter rounded-full hover:scale-105 transition-all beam-effect uppercase"
              data-testid="button-private-cta"
            >
              Plan Your Party
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase" data-testid="text-private-moments-heading">Private Event Moments</h2>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div 
              className="relative aspect-[16/9] max-h-[500px] mx-auto overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={slides[currentIndex].src}
                  alt={slides[currentIndex].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <button
                onClick={goPrev}
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
                aria-label="Previous slide"
                data-testid="button-private-carousel-prev"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={goNext}
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
                aria-label="Next slide"
                data-testid="button-private-carousel-next"
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
                    data-testid={`button-private-dot-${index}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex 
                      ? "border-primary opacity-100 scale-105" 
                      : "border-transparent opacity-50 hover:opacity-75"
                  }`}
                  aria-label={slide.alt}
                  data-testid={`button-private-thumb-${index}`}
                >
                  <img 
                    src={slide.src} 
                    alt={slide.alt} 
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
    </>
  );
}
