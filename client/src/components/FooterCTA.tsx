import { Calendar, Video } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function FooterCTA() {
  const { layout } = useTheme();
  const tagline = {
    wedding: "Say Yes to an Elevated DJ Experience",
    corporate_event: "Ready to boost your brand?",
    private_event: "Are you ready for an awesome experience?",
    pr_show: "Are you ready to Party?",
  }[layout] || "Ready to boost your brand?";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-t border-white/10 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between gap-3">
        
        <div className="hidden md:flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            {tagline}
          </span>
        </div>
        <p className="hidden md:block text-[10px] text-white/30 tracking-widest uppercase">
          Chicago, IL | Dallas, TX | Denver, CO
        </p>

        <div className="flex w-full md:w-auto gap-2">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-1 md:flex-none h-7 px-3 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 beam-effect"
            data-testid="link-book-now"
          >
            <Calendar className="w-3 h-3" />
            <span>Inquire Now</span>
          </a>
          
          <a 
            href="https://scheduler.zoom.us/dj-miss-haze" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 md:flex-none h-7 px-3 rounded-full btn-gradient text-primary-foreground text-xs font-bold transition-colors flex items-center justify-center gap-1 beam-effect"
            data-testid="link-zoom-call"
          >
            <Video className="w-3 h-3" />
            <span>Zoom Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
