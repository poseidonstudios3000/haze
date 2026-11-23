import { useEffect, useRef } from "react";
import { MapPin, ArrowRight, BookOpen, Speaker } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { CompactBookingForm } from "@/components/CompactBookingForm";
import { ClientLogos } from "@/components/ClientLogos";
import { EditorialFeature, LocationBento } from "@/components/HomeShowcase";
import { getSeoPage } from "@shared/seo";
import { homeContent } from "@/content/home";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = "/assets/dj-miss-haze-premium-event-dj-hero-2026.webp";

// All homepage copy lives in client/src/content/home.ts.
const { hero, bannerWords, eventExperience, locations, rentals, resources } = homeContent;

type EventButtonStyle = {
  color: string;
  glow: string;
  textClass: string;
  subClass: string;
  lineClass: string;
};

// Colors per event button, keyed by the button's link (copy comes from home.ts).
const EVENT_BUTTON_STYLES: Record<string, EventButtonStyle> = {
  "/corporate-event-dj": { color: "hsl(217 91% 60%)", glow: "hsla(217,91%,60%,0.5)", textClass: "text-white", subClass: "text-white/70", lineClass: "text-white/90" },
  "/private-event-dj": { color: "hsl(62 84% 54%)", glow: "hsla(62,84%,54%,0.45)", textClass: "text-black", subClass: "text-black/60", lineClass: "text-black/80" },
  "/wedding-dj": { color: "hsl(15 39% 51%)", glow: "hsla(15,39%,51%,0.5)", textClass: "text-white", subClass: "text-white/70", lineClass: "text-white/90" },
  "/event-dj": { color: "hsl(330 85% 54%)", glow: "hsla(330,85%,54%,0.5)", textClass: "text-white", subClass: "text-white/70", lineClass: "text-white/90" },
};

type EventButtonData = EventButtonStyle & {
  label: string;
  line: string;
  cta: string;
  href: string;
};

const eventButtons: EventButtonData[] = eventExperience.buttons.map((button) => ({
  ...EVENT_BUTTON_STYLES[button.href],
  label: button.title,
  line: button.text,
  cta: eventExperience.buttonCta,
  href: button.href,
}));

function EventButton({ data }: { data: EventButtonData }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const sheenRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const inner = innerRef.current;
    const sheen = sheenRef.current;
    if (!link || !inner || !sheen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(sheen, { xPercent: -160, opacity: 0 });

      const xTo = gsap.quickTo(link, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(link, "y", { duration: 0.5, ease: "power3.out" });
      const ixTo = gsap.quickTo(inner, "x", { duration: 0.65, ease: "power3.out" });
      const iyTo = gsap.quickTo(inner, "y", { duration: 0.65, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = link.getBoundingClientRect();
        const relX = e.clientX - r.left - r.width / 2;
        const relY = e.clientY - r.top - r.height / 2;
        xTo(relX * 0.16);
        yTo(relY * 0.3);
        ixTo(relX * 0.09);
        iyTo(relY * 0.16);
      };

      const onEnter = () => {
        gsap.to(link, { scale: 1.045, duration: 0.45, ease: "power3.out" });
        gsap.fromTo(
          sheen,
          { xPercent: -160, opacity: 0 },
          { xPercent: 220, opacity: 1, duration: 0.9, ease: "power2.out" },
        );
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
        ixTo(0);
        iyTo(0);
        gsap.to(link, { scale: 1, duration: 0.55, ease: "power3.out" });
        gsap.to(sheen, { opacity: 0, duration: 0.3 });
      };

      link.addEventListener("mousemove", onMove);
      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);

      return () => {
        link.removeEventListener("mousemove", onMove);
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      };
    }, link);

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={linkRef}
      href={data.href}
      style={{ backgroundColor: data.color, ["--glow" as string]: data.glow }}
      className={`event-btn group relative isolate flex flex-col items-center justify-center overflow-hidden rounded-2xl px-6 py-10 md:py-14 text-center will-change-transform transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_var(--glow)] ${data.textClass}`}
      data-testid={`button-event-${data.href.replace(/\//g, "")}`}
    >
      {/* soft top highlight for depth */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-60" aria-hidden="true" />
      {/* sheen sweep */}
      <span
        ref={sheenRef}
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
        aria-hidden="true"
      />
      <span ref={innerRef} className="relative z-[2] flex flex-col items-center gap-2">
        <span className="font-display text-xl font-black uppercase tracking-tight md:text-2xl">
          {data.label}
        </span>
        <span className={`max-w-xs text-sm font-medium leading-snug md:text-base ${data.lineClass}`}>
          {data.line}
        </span>
        <span className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ${data.subClass}`}>
          {data.cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </span>
    </a>
  );
}

export default function Landing() {
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = getSeoPage("/").title || "DJ Miss Haze | Premium Event DJ & MC";
  }, []);

  useEffect(() => {
    const container = buttonsRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".event-btn", {
        opacity: 0,
        y: 48,
        scale: 0.94,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: container, start: "top 82%" },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      {/* 1. Hero Section + Contact Form */}
      <section
        className="relative overflow-hidden"
        style={{ height: "calc(100dvh - 56px)", backgroundColor: "rgb(140,143,124)" }}
      >
        <img
          src={HERO_IMAGE}
          alt={hero.imageAlt}
          className="absolute z-[2] inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
          loading="eager"
          decoding="sync"
        />
        <div className="hidden sm:block absolute inset-0 z-[3] bg-gradient-to-t from-background from-5% via-background/30 via-30% to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6">
          <div className="w-full max-w-2xl text-center">
            {/* Brand lettering — decorative, not the document heading. */}
            <div className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[5.5vw] leading-none font-black font-display tracking-tighter text-white flex justify-center gap-[0.03em] uppercase mb-1">
              <span>D</span><span>J</span><span className="ml-[0.08em]">M</span><span>I</span><span>S</span><span>S</span><span className="ml-[0.08em]">H</span><span>A</span><span>Z</span><span>E</span>
            </div>

            {/* The page's single h1: the descriptive, keyword-rich headline. */}
            <h1 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-primary uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] mb-1">
              {hero.heading}
            </h1>

            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-white/80 uppercase tracking-wider md:tracking-widest mb-2 sm:mb-3">
              {hero.locations.map((location) => (
                <span key={location} className="flex items-center gap-1 sm:gap-1.5">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-primary" />
                  <span>{location}</span>
                </span>
              ))}
            </div>

            <CompactBookingForm />
          </div>
        </div>
      </section>

      {/* 2. Brand Banner — endless marquee */}
      {(() => {
        const bannerContent = bannerWords.map((word, j) => (
          <span key={j} className="shrink-0 flex items-center">
            <span className="flex mx-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-star-gradient">★</span>
              ))}
            </span>
            {word}
          </span>
        ));
        return (
          <div className="w-full bg-primary py-3 overflow-hidden whitespace-nowrap relative z-30 shadow-lg shadow-primary/20">
            <div className="flex">
              <div className="flex shrink-0 animate-marquee">
                <div className="flex items-center text-black font-black font-display text-lg uppercase shrink-0">
                  {bannerContent}
                </div>
              </div>
              <div className="flex shrink-0 animate-marquee" aria-hidden="true">
                <div className="flex items-center text-black font-black font-display text-lg uppercase shrink-0">
                  {bannerContent}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 3. Event Experience Buttons */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black font-display uppercase tracking-tighter">
            {eventExperience.heading}
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full mx-auto" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {eventExperience.text}
          </p>
        </div>

        <div ref={buttonsRef} className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {eventButtons.map((button) => (
            <EventButton key={button.href} data={button} />
          ))}
        </div>
      </section>

      {/* 4. Choose Your Location: image-led bento grid */}
      <LocationBento heading={locations.heading} cards={locations.cards} />

      {/* 5. Event Rentals (photo left) + 6. Event Resources (photo right) */}
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl space-y-6 md:space-y-8">
          <EditorialFeature copy={rentals} icon={Speaker} imageSide="left" testId="link-home-rentals" />
          <EditorialFeature copy={resources} icon={BookOpen} imageSide="right" testId="link-home-resources" />
        </div>
      </div>

      {/* 7. Logo strip. Forced to the brands variant: the theme defaults to
          wedding on "/", which would otherwise swap in "As Seen In". */}
      <ClientLogos variant="brands" />

      <FooterCTA />

      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
