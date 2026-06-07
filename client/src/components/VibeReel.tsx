import { motion } from "framer-motion";
import { useState } from "react";
import { X, Play } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const corporateVideos = [
  { id: 1, src: "/assets/DJ-Miss-Haze-Corporate-and-Influencer-Event-DJ-D2HS7rlS.mp4", title: "Corporate & Influencer Events" },
  { id: 2, src: "/assets/DJ-Miss-Haze-Corporate-Branding-DJ-Converse-fwtGuCHl.mp4", title: "Converse Brand Activation" },
  { id: 3, src: "/assets/DJ-Miss-Haze-influencer-event-in-chicago-gig-B_3JayfX.mp4", title: "Influencer Event in Chicago" },
  { id: 4, src: "/assets/Denver-Corporate-Event-DJ-DQrMsMHX.mp4", title: "Denver Corporate Event" },
];

const weddingVideos = [
  { id: 1, src: "/assets/DJ-Miss-Haze-Wedding-DJ-Reel-xL-QkZ92.mp4", title: "Wedding DJ Reel" },
  { id: 2, src: "/assets/DJ-Miss-Haze-Wedding-DJ-Colorado-Reel-DbwMh-nV.mp4", title: "Colorado Wedding DJ" },
  { id: 3, src: "/assets/DJ-Miss-Haze-Top-10-Wedding-Songs-of-2025-BJQbdgXj.mp4", title: "Top 10 Wedding Songs 2025" },
  { id: 4, src: "/assets/DJ-Miss-Haze-Black-Canyon-Inn-Colorado-Wedding-DJ-Qi7EQQuP.mp4", title: "Black Canyon Inn Wedding" },
  { id: 5, src: "/assets/360-Photo-Booth-Add-On-Video-Reel-hiXiLvqj.mp4", title: "360 Photo Booth Add-On" },
  { id: 6, src: "/assets/DJ-Miss-Haze-2026-Wedding-DJ-Reel-4-Eleven-Fort-Worth-Bu_e-Gi3.mp4", title: "4 Eleven Fort Worth Wedding" },
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
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/15 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 ml-1" style={{ fill: "url(#icon-gradient)", stroke: "url(#icon-gradient)" }} />
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
