import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import {
  SERVICE_PAGES,
  CITY_HUB_PAGES,
  getSeoPageLabel,
} from "@shared/seo";

// Real content for a 404 (served from dist/public/404.html with a 404 status),
// not the developer default. Brand styling, a short human line, and links back
// to the main pages — the same pill-link pattern used elsewhere on the site.
export default function NotFound() {
  const links = [
    { path: "/", label: "Home" },
    ...SERVICE_PAGES.map((page) => ({
      path: page.path,
      label: getSeoPageLabel(page),
    })),
    ...CITY_HUB_PAGES.map((page) => ({
      path: page.path,
      label: getSeoPageLabel(page),
    })),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      <section className="container mx-auto px-4 pt-16 md:pt-28 pb-16 md:pb-24 min-h-[60vh] flex items-center">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-sm font-black font-display uppercase tracking-[0.3em] text-primary">
            404
          </p>
          <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tighter">
            This Page Doesn't <span className="text-primary italic">Exist</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
            The link may be broken, or the page may have moved. Let's get you back
            to the music.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                data-testid={`link-404-${link.path === "/" ? "home" : link.path.slice(1)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />

      {/* Bottom spacing clears the fixed FooterCTA bar */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
