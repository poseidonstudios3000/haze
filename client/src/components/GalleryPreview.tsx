import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Wedding gallery images (new set)
import weddingImg1 from "@assets/Ada-Street-Chicago-Wedding-DJ-Miss-Haze.jpg";
import weddingImg2 from "@assets/Broadmoor-Colorado-Springs-Wedding-DJ-Miss-Haze.jpg";
import weddingImg3 from "@assets/dj-miss-haze-best-wedding-dj-book-now.jpg";
import weddingImg4 from "@assets/dj-miss-haze-best-wedding-dj-chicago.jpg";
import weddingImg5 from "@assets/DJ-Miss-Haze-club-type-wedding-bride-new.jpg";
import weddingImg6 from "@assets/dj-miss-haze-letting-bride-spin-new.webp";
import weddingImg7 from "@assets/DJ-Miss-Haze-newlyweds-1st-Dance-new.jpg";
import weddingImg8 from "@assets/DJ-Miss-Haze-wedding-DJ-bouquet-toss-new.jpg";
import weddingImg9 from "@assets/dj-miss-haze-wedding-dj-chicago-dallas-denver-new.jpg";
import weddingImg10 from "@assets/DJ-Miss-Haze-Wedding-DJ-Colorado-new.jpg";
import weddingImg11 from "@assets/dj-miss-haze-wedding-dj-in-colorado.jpg";
import weddingImg12 from "@assets/dj-miss-haze-wedding-dj-top-rated-new.jpg";
import weddingImg13 from "@assets/DJ-Miss-Haze-Wedding-DJ-Vibe.webp";
import weddingImg14 from "@assets/DJ-Miss-Haze-Wedding-Venue.jpg";
import weddingImg15 from "@assets/Estes-Park-Resort-CO-Wedding-couple.jpg";
import weddingImg16 from "@assets/Estes-Park-Resort-dancing-bride.jpg";
import weddingImg17 from "@assets/Estes-Park-Resort-Wedding-new.jpg";
import weddingImg18 from "@assets/hype-bride-wedding-reception-new.jpg";
import weddingImg19 from "@assets/The-Gardenia-Venue-Texas-Wedding.jpeg";
import weddingImg20 from "@assets/Wedding-DJ-Three-Peaks-Ranch-Colorado.jpg";

// Corporate gallery images
import corpImg1 from "@assets/JEDunnChristmasParty2024PRINT-1258_1768515859611.jpg";
import corpImg2 from "@assets/JEDunnChristmasParty2024PRINT-1255_1768515859615.jpg";
import corpImg3 from "@assets/JEDunnChristmasParty2024PRINT-1208_1768515859616.jpg";
import corpImg4 from "@assets/JEDunnChristmasParty2024PRINT-1207_1768515859617.jpg";
import corpImg5 from "@assets/IMG_5952_1768515859618.jpg";
import corpImg6 from "@assets/DSC02938_1768515859619.jpg";
import corpImg7 from "@assets/DSC02920_1768515859620.jpg";
import corpImg8 from "@assets/DJ_Miss_Haze_Corporate_Event_DJ_(1)_1768515859621.jpg";
import corpImg9 from "@assets/DJ_Miss_Haze_Corporate_DJ_1768515859622.jpg";
import corpImg10 from "@assets/DJ_Miss_Haze_Company_Event_DJ_1768515859623.jpg";
import corpImg11 from "@assets/DJ_Miss_Haze_Chicago_1768515859624.jpg";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  span?: string;
}

const weddingImages: GalleryImage[] = [
  { id: 1, src: weddingImg1, title: "Ada Street Chicago Wedding" },
  { id: 2, src: weddingImg2, title: "Broadmoor Colorado Springs" },
  { id: 3, src: weddingImg3, title: "Best Wedding DJ" },
  { id: 4, src: weddingImg4, title: "Chicago Wedding DJ" },
  { id: 5, src: weddingImg5, title: "Club Style Wedding" },
  { id: 6, src: weddingImg6, title: "Bride Spinning" },
  { id: 7, src: weddingImg7, title: "Newlyweds First Dance" },
  { id: 8, src: weddingImg8, title: "Bouquet Toss" },
  { id: 9, src: weddingImg9, title: "Chicago Dallas Denver" },
  { id: 10, src: weddingImg10, title: "Colorado Wedding DJ" },
  { id: 11, src: weddingImg11, title: "Wedding DJ in Colorado" },
  { id: 12, src: weddingImg12, title: "Top Rated Wedding DJ" },
  { id: 13, src: weddingImg13, title: "Wedding DJ Vibe" },
  { id: 14, src: weddingImg14, title: "Wedding Venue" },
  { id: 15, src: weddingImg15, title: "Estes Park Resort Couple" },
  { id: 16, src: weddingImg16, title: "Estes Park Dancing Bride" },
  { id: 17, src: weddingImg17, title: "Estes Park Resort Wedding" },
  { id: 18, src: weddingImg18, title: "Hype Bride Reception" },
  { id: 19, src: weddingImg19, title: "The Gardenia Venue Texas" },
  { id: 20, src: weddingImg20, title: "Three Peaks Ranch Colorado" },
];

const corporateImages: GalleryImage[] = [
  { id: 1, src: corpImg1, title: "LED Dance Floor Party" },
  { id: 2, src: corpImg2, title: "Corporate Celebration" },
  { id: 3, src: corpImg3, title: "JE Dunn Holiday Party" },
  { id: 4, src: corpImg4, title: "Company Event" },
  { id: 5, src: corpImg5, title: "University of Chicago - Women in Business" },
  { id: 6, src: corpImg6, title: "DJ Miss Haze" },
  { id: 7, src: corpImg7, title: "Brand Activation" },
  { id: 8, src: corpImg8, title: "Event Setup" },
  { id: 9, src: corpImg9, title: "Professional DJ Setup" },
  { id: 10, src: corpImg10, title: "Behind the Decks" },
  { id: 11, src: corpImg11, title: "University of Chicago" },
];

export function GalleryPreview() {
  const { layout } = useTheme();
  const isCorporate = layout === "corporate_event";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  
  const images = isCorporate ? corporateImages : weddingImages;

  useEffect(() => {
    const imagesToPreload = isCorporate ? corporateImages : weddingImages;
    let loadedCount = 0;
    preloadedImages.current = imagesToPreload.map((img) => {
      const image = new Image();
      image.src = img.src;
      image.onload = () => {
        loadedCount++;
        if (loadedCount === imagesToPreload.length) {
          setImagesLoaded(true);
        }
      };
      return image;
    });
  }, [isCorporate]);

  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, imagesLoaded, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const galleryTitle = isCorporate ? "Gallery" : "Wedding Gallery";

  return (
    <>
      <div className="space-y-6 md:space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">{galleryTitle}</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div 
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                loading="eager"
                decoding="async"
              />
            </AnimatePresence>

            {!imagesLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-bold text-lg md:text-xl text-white font-display">
                {images[currentIndex].title}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {currentIndex + 1} / {images.length}
              </p>
            </div>

            <button
              onClick={goPrev}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
              aria-label="Previous image"
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
              aria-label="Next image"
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5 z-10 flex-wrap max-w-md mx-auto px-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary w-6" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  data-testid={`button-gallery-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
