import { Calendar, Video } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function FooterCTA() {
  const { layout } = useTheme();
  const isWedding = layout === "wedding";
  
  const tagline = isWedding 
    ? "Say Yes to an Elevated DJ Experience" 
    : "Ready to boost your brand?";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4 md:py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="hidden md:flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
            {tagline}
          </span>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-1 md:flex-none h-12 px-6 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 beam-effect"
            data-testid="link-book-now"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now</span>
          </a>
          
          <a 
            href="https://scheduler.zoom.us/dj-miss-haze" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 md:flex-none h-12 px-6 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 beam-effect"
            data-testid="link-zoom-call"
          >
            <Video className="w-4 h-4" />
            <span>Zoom Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
