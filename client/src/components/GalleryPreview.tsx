import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  span?: string;
}

const weddingImages: GalleryImage[] = [
  { id: 1, src: "/assets/Ada-Street-Chicago-Wedding-DJ-Miss-Haze-SLWShZZj.webp", title: "Ada Street Chicago Wedding" },
  { id: 2, src: "/assets/Broadmoor-Colorado-Springs-Wedding-DJ-Miss-Haze-KM23MvbW.webp", title: "Broadmoor Colorado Springs Wedding" },
  { id: 3, src: "/assets/dj-miss-haze-best-wedding-dj-book-now-COinecxb.webp", title: "Best Wedding DJ Book Now" },
  { id: 4, src: "/assets/dj-miss-haze-best-wedding-dj-in-chicago-book-now-DFKzenEF.webp", title: "Best Wedding DJ in Chicago" },
  { id: 5, src: "/assets/DJ-Miss-Haze-club-type-wedding-bride-BJ0wm7vn.webp", title: "Club Style Wedding Bride" },
  { id: 6, src: "/assets/dj-miss-haze-letting-bride-spin-at-wedding-colorado-DR50EFcM.webp", title: "Bride Spinning at Wedding Colorado" },
  { id: 7, src: "/assets/DJ-Miss-Haze-newlyweds-1st-Dance-BGw3_uBQ.webp", title: "Newlyweds First Dance" },
  { id: 8, src: "/assets/DJ-Miss-Haze-wedding-DJ-bouquet-toss-BrYy-aqy.webp", title: "Wedding DJ Bouquet Toss" },
  { id: 9, src: "/assets/dj-miss-haze-wedding-dj-chicago-dallas-denver-tAZA5nrQ.webp", title: "Wedding DJ Chicago Dallas Denver" },
  { id: 10, src: "/assets/DJ-Miss-Haze-Wedding-DJ-Colorado-Dmyl2KgU.webp", title: "Wedding DJ Colorado" },
  { id: 11, src: "/assets/dj-miss-haze-wedding-dj-in-colorado-UyTmhhk5.webp", title: "Wedding DJ in Colorado" },
  { id: 12, src: "/assets/dj-miss-haze-wedding-dj-top-rated-MRrJ1QXZ.webp", title: "Top Rated Wedding DJ" },
  { id: 13, src: "/assets/DJ-Miss-Haze-Wedding-DJ-Vibe-BfSlidBo.webp", title: "Wedding DJ Vibe" },
  { id: 14, src: "/assets/DJ-Miss-Haze-Wedding-Venue-C4lopNEW.webp", title: "Wedding Venue" },
  { id: 15, src: "/assets/Estes-Park-Resort-CO-Wedding-couple-and-dj-miss-haze-CF-CoMR9.webp", title: "Estes Park Resort Wedding Couple" },
  { id: 16, src: "/assets/Estes-Park-Resort-dancing-bride-DJ-Miss-Haze-D41LCjPw.webp", title: "Estes Park Resort Dancing Bride" },
  { id: 17, src: "/assets/Estes-Park-Resort-Wedding-DJ-Miss-Haze-BCy6iA_P.webp", title: "Estes Park Resort Wedding" },
  { id: 18, src: "/assets/hype-bride-wedding-reception-CSKMFOcD.webp", title: "Hype Bride Wedding Reception" },
  { id: 19, src: "/assets/The-Gardenia-Venue-Valley-View-Texas-Wedding-DJ-Miss-Haze-J6b3gkmq.webp", title: "The Gardenia Venue Valley View Texas" },
  { id: 20, src: "/assets/Societe-Privee-Chicago-Wedding-Network-_ldgEXcM.webp", title: "Societe Privee Chicago Wedding Network" },
  { id: 21, src: "/assets/Wedding-DJ-Three-Peaks-Ranch-DJ-Miss-Haze-COLORADO-I2pu1XWM.webp", title: "Three Peaks Ranch Colorado Wedding" },
];

const corporateImages: GalleryImage[] = [
  { id: 1, src: "/assets/Brand-Event-DJ-Setup-Chicago-C4CUamlB.webp", title: "Brand Event DJ Setup Chicago" },
  { id: 2, src: "/assets/Corporate-DJ-Chicago-IL-DJ-Miss-Haze-DlBGURCN.webp", title: "Corporate DJ Chicago IL" },
  { id: 3, src: "/assets/Corporate-DJ-Miss-Haze-BQuovUTN.webp", title: "Corporate DJ Miss Haze" },
  { id: 4, src: "/assets/Corporate-Event-DJ-Miss-Haze-Kansas-City-MO-BiAYUCHi.webp", title: "Corporate Event DJ Kansas City MO" },
  { id: 5, src: "/assets/Corporate-Event-DJ-Miss-Haze-D2xGj5cD.webp", title: "Corporate Event DJ Miss Haze" },
  { id: 6, src: "/assets/Corporate-Event-DJ-University-of-Chicago-DJ-Miss-Haze-Eva-Ho-Photography-CyrZgdyU.webp", title: "University of Chicago Event" },
  { id: 7, src: "/assets/Corporate-Event-with-DJ-Miss-Haze-Dw_uSdUN.webp", title: "Corporate Event with DJ Miss Haze" },
  { id: 8, src: "/assets/DJ-Miss-Haze-Chicago-2-DXjTZukF.webp", title: "DJ Miss Haze Chicago" },
  { id: 9, src: "/assets/DJ-Miss-Haze-Chicago-BsFlPIRw.webp", title: "DJ Miss Haze Chicago Event" },
  { id: 10, src: "/assets/DJ-Miss-Haze-Company-Event-DJ-CJUkMjfh.webp", title: "DJ Miss Haze Company Event" },
  { id: 11, src: "/assets/DJ-Miss-Haze-Converse-onbrand-C5panVMw.webp", title: "DJ Miss Haze x Converse" },
  { id: 12, src: "/assets/DJ-Miss-Haze-Corporate-DJ-B8IR7soD.webp", title: "DJ Miss Haze Corporate DJ" },
  { id: 13, src: "/assets/DJ-Miss-Haze-Corporate-Event-DJ-n-yJetmp.webp", title: "DJ Miss Haze Corporate Event" },
  { id: 14, src: "/assets/DJ-Miss-Haze-Corporate-Event-DJ-1-CnxQMZEl.webp", title: "Corporate Event DJ Performance" },
  { id: 15, src: "/assets/DJ-Miss-Haze-Corporate-Event-DJ1-CUWyUkFY.webp", title: "Corporate Event Entertainment" },
  { id: 16, src: "/assets/Famous-Footwear-DJ-Miss-Haze-CoXfChRg.webp", title: "Famous Footwear x DJ Miss Haze" },
  { id: 17, src: "/assets/JE-Dunn-Corporate-Event-Photo-Anniversary-Event-7DajihfR.webp", title: "JE Dunn Corporate Anniversary Event" },
  { id: 18, src: "/assets/JEDunnChristmasParty2024PRINT-1267-BtMUR1fW.webp", title: "JE Dunn Christmas Party 2024" },
  { id: 19, src: "/assets/Kansas-City-Corporate-Event-S4_kTYwS.webp", title: "Kansas City Corporate Event" },
];

const privateImages: GalleryImage[] = [
  { id: 1, src: "/assets/Private-Event-DJ-Miss-Haze-DIzMz1_Z.webp", title: "Private Event DJ Miss Haze" },
  { id: 2, src: "/assets/Private-Event-DJ-Chicago-BWcYfPYB.webp", title: "Private Event DJ Chicago" },
  { id: 3, src: "/assets/Private-Events-DJ-energy-chicago-Bg5ibJvV.webp", title: "Private Events DJ Energy Chicago" },
  { id: 4, src: "/assets/DJ-Miss-Haze-Event-DJ-and-MC-BjFMJQkD.webp", title: "DJ Miss Haze Event DJ and MC" },
  { id: 5, src: "/assets/Pro-Mobile-DJ-Chicago-CPGYrjc-.webp", title: "Pro Mobile DJ Chicago" },
  { id: 6, src: "/assets/Private-Event-book-DJ-now-Colorado-CyhlfpRN.webp", title: "Private Event Book DJ Now Colorado" },
  { id: 7, src: "/assets/female-DJ-chicago-rooftop-De5czptt.webp", title: "Female DJ Chicago Rooftop" },
  { id: 8, src: "/assets/Female-DJ-Glenview-Illinois-CL6Zoy3A.webp", title: "Female DJ Glenview Illinois" },
];

const otherImages: GalleryImage[] = [
  { id: 1, src: "/assets/DJ-Miss-Haze-event-dj-chicago-CLnVax-b.webp", title: "Event DJ Miss Haze Chicago" },
  { id: 2, src: "/assets/Female-DJ-book-now-Colorado-BZOEs0J8.webp", title: "Female DJ Book Now Colorado" },
  { id: 3, src: "/assets/DJ-Miss-Haze-Chicago-2-DXjTZukF.webp", title: "Mobile DJ Chicago DJ Miss Haze" },
  { id: 4, src: "/assets/Societe-Privee-DJ-Miss-Haze-D2XU2qzQ.webp", title: "Societe Privee DJ Miss Haze" },
];

export function GalleryPreview() {
  const { layout } = useTheme();
  const isCorporate = layout === "corporate_event";
  const isPrivate = layout === "private_event";
  const isOther = layout === "pr_show";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  
  const images = isCorporate ? corporateImages : isPrivate ? privateImages : isOther ? otherImages : weddingImages;

  useEffect(() => {
    const imagesToPreload = isCorporate ? corporateImages : isPrivate ? privateImages : isOther ? otherImages : weddingImages;
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
  }, [isCorporate, isPrivate, isOther]);

  useEffect(() => {
    setCurrentIndex(0);
    preloadedImages.current = [];
  }, [layout]);

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

  const galleryTitle = isCorporate ? "Gallery" : isPrivate ? "Private Event Gallery" : isOther ? "Events Gallery" : "Wedding Gallery";

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
