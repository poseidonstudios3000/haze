import { useEffect, useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";

const TikTok = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z" />
  </svg>
);

export function Navbar() {
  const [, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socials = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/djmisshaze" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/djmisshaze" },
    { name: "TikTok", icon: TikTok, href: "https://www.tiktok.com/@djmisshaze" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-2 relative">
        <div className="absolute left-1/2 -translate-x-1/2 text-xs md:text-sm font-mono text-red-500 pointer-events-none select-none">
          hermes test
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="/"
            className="text-sm md:text-xl font-black tracking-tighter cursor-pointer text-foreground transition-colors font-display uppercase shrink-0"
          >
            DJ MISS HAZE
          </a>

          <div className="flex items-center gap-1">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:text-primary transition-colors hover:bg-foreground/5 rounded-full text-foreground"
                  title={social.name}
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 ml-auto shrink-0">
          <ThemeSelector />
        </div>
      </div>
    </nav>
  );
}
