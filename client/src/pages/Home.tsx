import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { VibeReel } from "@/components/VibeReel";
import { GalleryPreview } from "@/components/GalleryPreview";
import { FAQ } from "@/components/FAQ";
import { GoogleReviews } from "@/components/GoogleReviews";
import { CompactBookingForm } from "@/components/CompactBookingForm";
import { EventSignatureSection } from "@/components/EventSignatureSection";
import { EquipmentIncluded } from "@/components/EquipmentIncluded";
import { ClientLogos } from "@/components/ClientLogos";
import { CorporateEventPlanning } from "@/components/CorporateEventPlanning";
import { WeddingEventPlanning } from "@/components/WeddingEventPlanning";
import { PrivateEventPlanning } from "@/components/PrivateEventPlanning";
import { useTheme } from "@/context/ThemeContext";
import { useEventContent, layoutToEventType as getEventType } from "@/hooks/use-event-content";
import { useSiteImages } from "@/hooks/use-site-images";
import { getSeoPage } from "@shared/seo";

const heroImages: Record<string, string> = {
  corporate_event: "/assets/corporate-events-wide-B-d8CPwl.webp",
  wedding: "/assets/dj-miss-haze-premium-event-dj-hero-2026.webp",
  private_event: "/assets/private-events-wide-DpNMy9wX.webp",
  pr_show: "/assets/dj-miss-haze-other-events-hero-2026.webp",
};

const heroBackgroundColors: Record<string, string> = {
  corporate_event: "rgb(141,144,125)",
  wedding: "rgb(140,143,124)",
  private_event: "rgb(163,139,106)",
  pr_show: "rgb(142,122,94)",
};

const heroAltText: Record<string, string> = {
  corporate_event: "DJ Miss Haze performing at a Corporate Event in Chicago, Dallas, Denver",
  wedding: "DJ Miss Haze Wedding DJ and MC in Chicago, Dallas, Denver",
  private_event: "DJ Miss Haze Private Event DJ in Chicago, Dallas, Denver",
  pr_show: "DJ Miss Haze Event DJ and MC for Brand Activations and PR Events",
};

const pageTitles: Record<string, string> = {
  corporate_event: "Corporate Event DJ & MC | DJ Miss Haze | Dallas, Chicago, Denver",
  wedding: "Wedding DJ & MC | DJ Miss Haze | Dallas, Chicago, Denver",
  private_event: "Private Event DJ & MC | DJ Miss Haze | Dallas, Chicago, Denver",
  pr_show: "Event DJ & MC | DJ Miss Haze | Brand Activations & PR Events",
};

const layoutToFormEventType: Record<string, string> = {
  corporate_event: "corporate",
  wedding: "wedding",
  private_event: "private",
  pr_show: "other",
};

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { layout } = useTheme();
  const { getImage } = useSiteImages();
  const aboutImage = getImage("about_photo");
  const evtType = getEventType(layout);
  const { content: eventContent } = useEventContent(evtType);
  const heroSubtitle = eventContent.hero.subtitle;
  const eventType = layoutToFormEventType[layout] || "other";
  const isCorporate = layout === "corporate_event";
  const isWedding = layout === "wedding";
  const isPrivate = layout === "private_event";
  const isOther = layout === "pr_show";

  useEffect(() => {
    const routeTitle = getSeoPage(window.location.pathname).title;
    document.title = routeTitle || pageTitles[layout] || "DJ Miss Haze | Premium Event DJ & MC";
  }, [layout]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      {/* 1. Hero Section */}
      <section
        ref={targetRef}
        className="relative overflow-hidden"
        style={{
          height: "calc(100dvh - 56px)",
          backgroundColor: heroBackgroundColors[layout] || "rgb(141,144,125)",
        }}
      >
        <img
          key={layout}
          src={heroImages[layout]}
          alt={heroAltText[layout] || "DJ Miss Haze Event DJ and MC"}
          className={`absolute z-[2] inset-0 w-full h-full object-cover pointer-events-none select-none ${
            layout === "wedding"
              ? "object-top"
              : layout === "pr_show"
                ? "object-[center_10%] md:object-[center_15%]"
                : "object-center"
          }`}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        <div className="hidden sm:block absolute inset-0 z-[3] bg-gradient-to-t from-background from-5% via-background/30 via-30% to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6">
          <div className="w-full max-w-2xl text-center">
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[5.5vw] leading-none font-black font-display tracking-tighter text-white flex justify-center gap-[0.03em] uppercase mb-1">
              <span>D</span><span>J</span><span className="ml-[0.08em]">M</span><span>I</span><span>S</span><span>S</span><span className="ml-[0.08em]">H</span><span>A</span><span>Z</span><span>E</span>
            </h1>

            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-primary uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] whitespace-pre-line mb-1">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-white/80 uppercase tracking-wider md:tracking-widest mb-2 sm:mb-3">
              {eventContent.hero.locations.map((location: string, index: number) => (
                <span key={index} className="flex items-center gap-1 sm:gap-1.5">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-primary" />
                  <span>{location}</span>
                </span>
              ))}
            </div>

            <CompactBookingForm defaultEventType={eventType} />
          </div>
        </div>
      </section>

      {/* 2. Ticker Component */}
      {(() => {
        const tickerItems = eventContent.ticker.items;
        const tickerContent = tickerItems.map((item, j) => (
          <span key={j} className="shrink-0 flex items-center">
            <span className="flex mx-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-star-gradient">★</span>
              ))}
            </span>
            {item}
          </span>
        ));
        return (
          <div className="w-full bg-primary py-3 overflow-hidden whitespace-nowrap relative z-30 shadow-lg shadow-primary/20">
            <div className="flex">
              <div className="flex shrink-0 animate-marquee">
                <div className="flex items-center text-black font-black font-display text-lg uppercase shrink-0">
                  {tickerContent}
                </div>
              </div>
              <div className="flex shrink-0 animate-marquee" aria-hidden="true">
                <div className="flex items-center text-black font-black font-display text-lg uppercase shrink-0">
                  {tickerContent}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 3. Event Signature Section */}
      <EventSignatureSection />

      {/* Client Logos Banner */}
      {!isPrivate && !isOther && <ClientLogos />}

      {/* 4. Brand Reviews */}
      <section id="reviews" className="container mx-auto px-4 py-8 md:py-16">
        <GoogleReviews />
      </section>

      {/* Production Included */}
      <EquipmentIncluded />

      {isOther && (
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase">A White Glove DJ Service That Shapes the Energy of Your Event.</h2>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              From fundraisers to fashion, shows, sports events and more, DJ Miss Haze designs sound and pacing that connects people, elevates the atmosphere, and keeps your event flowing smoothly.
            </p>
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 space-y-6">
              <p className="text-xl md:text-2xl font-black font-display text-primary uppercase">
                This isn't background music. It's energy architecture.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every event has its unique vibe. My role is to read the room, guide momentum, and create a natural space through entertainment — your guests will feel engaged, present, and connected from the first moment to the last.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether the goal is celebration, storytelling, brand impact, or pure hype, the music always supports why people are gathering.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-black font-display mb-8 uppercase">Event Experiences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Sports Events & Watch Parties", text: "Tailgates, fan events, venue game days, tournaments, and celebrations with high-energy pacing and strategic hype moments." },
                  { title: "Fundraisers & Galas", text: "Charity events, auctions, and benefit dinners where sound supports storytelling, emotion, and donor engagement." },
                  { title: "Fashion Shows & Creative Productions", text: "Runway shows, designer showcases, and editorial events requiring precision timing, curated sound, and brand alignment." },
                  { title: "Community & Cultural Events", text: "Festivals, city events, cultural celebrations, and inclusive gatherings that bring diverse audiences together through music." },
                ].map((experience, index) => (
                  <div key={index} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-3">
                    <h4 className="text-lg font-black font-display text-primary uppercase">{experience.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{experience.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Vibe Reel */}
      {!isPrivate && !isOther && (
        <section className="container mx-auto px-4 py-8 md:py-16">
          <VibeReel />
        </section>
      )}

      {/* 6. Mantra Section */}
      <section id="mantra" className="container mx-auto px-4 py-16 md:py-24 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase">{eventContent.mantra.title}</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <p className="text-3xl md:text-5xl font-black italic leading-tight text-primary uppercase tracking-tighter">
                {eventContent.mantra.quote}
              </p>
            </div>
            <div className="md:col-span-2 space-y-8">
              <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                {eventContent.mantra.subtitle}
              </p>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {eventContent.mantra.paragraph1}
                </p>
                <p>
                  {eventContent.mantra.paragraph2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Gallery */}
      <section id="gallery" className="container mx-auto px-4 py-8 md:py-16">
        <GalleryPreview />
      </section>

      {isOther && (
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase">Choose DJ Miss Haze for Your Event</h2>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Because your event deserves intention, not just music.
              <br />
              <span className="text-white font-bold">DJ Miss Haze is chosen by hosts, planners, and brands who want more than a playlist.</span>{" "}
              What sets her apart is a disciplined, experience-first approach to sound, flow, and energy — designed to elevate the entire room and leave a lasting impression.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Premium, Polished Presentation", text: "Clean, modern setups that complement your space — not distract from it. Professional sound, thoughtful lighting, and camera-friendly aesthetics are standard." },
                { title: "Strategic Planning & White-Glove Execution", text: "From your first inquiry to final track, every detail is planned with clarity and care. DJ Miss Haze collaborates seamlessly with planners, venues, producers, and vendors to keep your event running smoothly." },
                { title: "Confident Mic Presence", text: "When announcements or guidance are needed, they're delivered clearly and tastefully — never overbearing, never awkward." },
              ].map((item, index) => (
                <div key={index} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-3">
                  <h4 className="text-lg font-black font-display text-primary uppercase">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-3">
                <h4 className="text-lg font-black font-display text-primary uppercase">Versatile Across Event Types</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Trusted for:</p>
                <ul className="space-y-1.5">
                  {["Sports Events", "Fundraisers & Galas", "Fashion Shows & Creative Productions", "Community & Cultural Events", "And more."].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">&#10003;</span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-white font-medium italic">The approach adapts; the standard remains.</p>
              </div>
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 space-y-4">
              <h4 className="text-lg font-black font-display text-primary uppercase">Multi-Market, Travel-Ready</h4>
              <p className="text-muted-foreground leading-relaxed">
                Based in Chicago, Dallas-Fort Worth, and Denver — with worldwide travel available — DJ Miss Haze brings consistency and excellence wherever your event is held.
              </p>
            </div>
          </div>
        </section>
      )}

      {isWedding && (
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase">Choose DJ Miss Haze for Your Wedding</h2>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Wedding clients who choose DJ Miss Haze become hosts who lead with intention, inclusion, confidence, and elevated taste.
              <br />
              <span className="text-white font-bold">They are no longer "hoping the music works" — they are curating an experience people remember and talk about.</span>
            </p>
            <div className="space-y-4">
              {[
                { from: "Stressed Planners", to: "Calm, Confident Hosts", text: "They can trust that every transition, cue, and moment will flow smoothly — allowing them to stay present at their wedding instead of managing details." },
                { from: "Throwing an Event", to: "Creating an Experience", text: "Their event feels thoughtful, polished, and immersive — not generic or thrown together." },
                { from: "Playing Music", to: "Setting the Energy", text: "They become hosts who understand that how people feel matters." },
                { from: "Entertaining Guests", to: "Bringing People Together", text: "Their space feels inclusive, connected, and welcoming — across generations, cultures, and personalities." },
                { from: "Hiring a Vendor", to: "Partnering with a Professional", text: "They work with someone who anticipates needs, communicates clearly, and leads with calm authority and mindful presence." },
              ].map((item, index) => (
                <div key={index} className="bg-zinc-900/50 rounded-2xl border border-white/5 p-6 space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg md:text-xl font-black font-display text-white/40 uppercase italic">{item.from}</span>
                    <span className="text-primary text-lg">→</span>
                    <span className="text-lg md:text-xl font-black font-display text-primary uppercase">{item.to}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 space-y-6">
              <h3 className="text-xl md:text-2xl font-black font-display uppercase">Clients who choose DJ Miss Haze are:</h3>
              <ul className="space-y-3">
                {[
                  { trait: "Intentional", desc: "they care about details and energy" },
                  { trait: "Quality-driven", desc: "they value professionalism over shortcuts" },
                  { trait: "Emotionally intelligent", desc: "they want guests to feel something" },
                  { trait: "Confident leaders", desc: "they host with presence, not anxiety" },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-1">&#10003;</span>
                    <span className="text-muted-foreground"><span className="text-white font-bold">{item.trait}</span> — {item.desc}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-white font-medium italic border-l-4 border-primary pl-4">
                They want their event to reflect who they are, not just what they booked.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 8. Why Companies Choose (Corporate Only) */}
      {isCorporate && (
        <section id="why-choose" className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase">Why Companies Choose DJ Miss Haze</h2>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Corporate clients choose DJ Miss Haze for her ability to balance energy, professionalism, and brand sensitivity—without compromising on vibe.
                </p>
                <div className="space-y-4">
                  <p className="text-xl font-bold text-white uppercase tracking-wider">You can expect:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">&#10003;</span>
                      <span className="text-muted-foreground">A collaborative planning process</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">&#10003;</span>
                      <span className="text-muted-foreground">Clear communication and responsiveness</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">&#10003;</span>
                      <span className="text-muted-foreground">Experience working with diverse corporate audiences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">&#10003;</span>
                      <span className="text-muted-foreground">A modern, polished aesthetic aligned with professional brands</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">&#10003;</span>
                      <span className="text-muted-foreground">A DJ who understands timing, flow, and executive-level expectations</span>
                    </li>
                  </ul>
                </div>
                <p className="text-lg text-white font-medium italic border-l-4 border-primary pl-4">
                  This is not a "wedding DJ crossover" or club-only approach—it's a corporate-ready DJ experience built for business environments.
                </p>
              </div>
              
              <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 space-y-6">
                <h3 className="text-2xl md:text-3xl font-black font-display uppercase">
                  Let's Elevate Your Next <span className="text-primary">Corporate Event</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're planning a formal corporate gala, a large-scale conference, or a high-energy company celebration, DJ Miss Haze brings the expertise and presence needed to make your event memorable—for the right reasons.
                </p>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-block px-8 py-3 btn-gradient text-primary-foreground font-black font-display tracking-tighter rounded-full hover:scale-105 transition-all beam-effect uppercase"
                  data-testid="button-why-choose-cta"
                >
                  Start Planning
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8.5 Corporate Event Planning Carousel (Corporate Only) */}
      {isCorporate && <CorporateEventPlanning />}

      {/* 8.6 Wedding Event Planning Carousel (Wedding Only) */}
      {isWedding && <WeddingEventPlanning />}

      {/* 8.7 Private Event Planning Section (Private Only) */}
      {isPrivate && <PrivateEventPlanning />}

      {/* 9. FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-8 md:py-16">
        <FAQ />
      </section>

      {/* 10. About Section */}
      <section id="about" className="container mx-auto px-4 py-16 md:py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">{eventContent.about.title}</h2>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                {eventContent.about.paragraph1}
              </p>
              <p>
                {eventContent.about.paragraph2}
              </p>
              <p>
                {eventContent.about.paragraph3}
              </p>
              <p className="font-bold text-white uppercase tracking-widest text-sm">
                {eventContent.about.footer}
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
            <img 
              src={aboutImage || heroImages.corporate_event} 
              alt="DJ Miss Haze biography" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* 11. Final CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6 bg-zinc-900/50 p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
          <h2 className="text-2xl md:text-4xl font-black font-display uppercase tracking-tighter">
            {eventContent.cta.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {eventContent.cta.subtitle}
          </p>
          <div className="pt-4">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block px-12 py-4 btn-gradient text-primary-foreground font-black font-display tracking-tighter text-xl rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20 beam-effect uppercase"
              data-testid="link-inquire-now"
            >
              {eventContent.cta.button}
            </a>
          </div>
        </div>
      </section>

      <FooterCTA />
      
      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
