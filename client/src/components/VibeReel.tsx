import { motion } from "framer-motion";
import { useState } from "react";
import { X, Play } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import corporateVideo1 from "@assets/DJ_Miss_Haze_Corporate_and_Influencer_Event_DJ_1768769503858.mp4";
import corporateVideo2 from "@assets/DJ-Miss-Haze-influencer-event-in-chicago-gig_1768862015483.mp4";
import corporateVideo3 from "@assets/DJ-Miss-Haze-Corporate-Branding-DJ-Converse_(1)_1768862015484.mp4";
import weddingVideo1 from "@assets/DJ-Miss-Haze-Wedding-DJ-Reel_1769628311846.MP4";
import weddingVideo2 from "@assets/DJ-Miss-Haze-Wedding-DJ-Colorado-Reel_1769628311847.MP4";
import weddingVideo3 from "@assets/DJ-Miss-Haze-Top-10-Wedding-Songs-of-2025_1769628311847.MP4";
import weddingVideo4 from "@assets/DJ-Miss-Haze-Black-Canyon-Inn-Colorado-Wedding-DJ_1769628311848.MP4";
import weddingVideo5 from "@assets/360-Photo-Booth-Add-On-Video-Reel_(1)_1769628311849.MP4";
import weddingVideo6 from "@assets/360-Photo-Booth-Add-On-Video-Reel_1769628311850.MP4";

const corporateVideos = [
  { id: 1, src: corporateVideo1, title: "Corporate & Influencer Events" },
  { id: 2, src: corporateVideo2, title: "Influencer Event in Chicago" },
  { id: 3, src: corporateVideo3, title: "Converse Brand Activation" },
];

const weddingVideos = [
  { id: 1, src: weddingVideo1, title: "Wedding DJ Reel" },
  { id: 2, src: weddingVideo2, title: "Colorado Wedding DJ" },
  { id: 3, src: weddingVideo3, title: "Top 10 Wedding Songs 2025" },
  { id: 4, src: weddingVideo4, title: "Black Canyon Inn Wedding" },
  { id: 5, src: weddingVideo5, title: "360 Photo Booth Add-On" },
  { id: 6, src: weddingVideo6, title: "360 Photo Booth Experience" },
];

export function VibeReel() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const { layout } = useTheme();
  
  const videos = layout === "wedding" ? weddingVideos : corporateVideos;
  const currentVideo = activeVideo !== null ? videos.find(v => v.id === activeVideo) : null;

  return (
    <div className="space-y-4 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">VIBE REEL</h2>
        <div className="h-1 w-24 bg-primary rounded-full" />
      </div>

      <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-4 md:gap-8 w-max">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="w-[300px] md:w-[320px] flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setActiveVideo(video.id)}
                className="w-full text-left"
                data-testid={`button-reel-${video.id}`}
              >
                <div className="aspect-[9/16] rounded-2xl bg-gradient-to-br from-primary/20 via-black to-black border border-white/10 overflow-hidden relative shadow-2xl group">
                  <video
                    src={`${video.src}#t=0.001`}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/40 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-lg font-bold text-white uppercase tracking-wider">{video.title}</p>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">DJ Miss Haze</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {currentVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 z-[60] w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-colors"
            data-testid="button-close-reel"
          >
            <X className="w-6 h-6" />
          </button>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={currentVideo.src}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          </motion.div>
          
          <div className="mt-4 text-center">
            <p className="text-lg font-bold text-white uppercase tracking-wider">{currentVideo.title}</p>
            <p className="text-sm text-primary font-bold uppercase">DJ Miss Haze</p>
          </div>
          
          <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/50 md:hidden">
            Tap outside video or X to close
          </p>
        </motion.div>
      )}
    </div>
  );
}
