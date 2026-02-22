import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music, User, Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";
import { ThemeSelector } from "./ThemeSelector";

const TikTok = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z" />
  </svg>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "REVIEWS", href: "#reviews" },
    { name: "GALLERY", href: "#gallery" },
    { name: "RESOURCES", href: "#resources" },
    { name: "FAQ", href: "#faq" },
  ];

  const socials = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/djmisshaze" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/djmisshaze" },
    { name: "TikTok", icon: TikTok, href: "https://www.tiktok.com/@djmisshaze" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/50 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/">
              <div className="text-sm md:text-xl font-black tracking-tighter cursor-pointer text-white transition-colors font-display uppercase shrink-0">
                DJ MISS HAZE
              </div>
            </Link>

            <div className="flex items-center gap-1">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:text-primary transition-colors hover:bg-white/5 rounded-full text-white"
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

            <button
              onClick={() => setIsOpen(true)}
              className="p-1.5 hover:bg-white/5 rounded-full transition-colors flex items-center justify-center ml-1 md:ml-2"
              data-testid="button-menu-open"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col"
          >
            <div className="container mx-auto px-4 py-6 flex justify-end items-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                data-testid="button-menu-close"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 container mx-auto px-4 flex flex-col justify-center items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="text-4xl md:text-5xl font-black font-display tracking-tighter hover:text-primary transition-all cursor-pointer text-white hover:scale-105"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                className="mt-4"
              >
                <a 
                  href="#vibe-check" 
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-primary text-black font-black font-display tracking-tighter text-xl rounded-full hover:scale-105 transition-all"
                >
                  BOOK NOW
                </a>
              </motion.div>
            </div>

            <div className="p-8">
              <div className="container mx-auto flex flex-col items-center gap-4">
                <div className="flex items-center gap-6">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-primary transition-colors"
                        title={social.name}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                  © 2026 DJ MISS HAZE • CHICAGO • DALLAS • DENVER
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
