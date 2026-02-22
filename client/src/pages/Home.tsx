import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { VibeReel } from "@/components/VibeReel";
import { GalleryPreview } from "@/components/GalleryPreview";
import { FAQ } from "@/components/FAQ";
import { GoogleReviews } from "@/components/GoogleReviews";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { CompactBookingForm } from "@/components/CompactBookingForm";
import { EventSignatureSection } from "@/components/EventSignatureSection";
import { ClientLogos } from "@/components/ClientLogos";
import { CorporateEventPlanning } from "@/components/CorporateEventPlanning";
import { WeddingEventPlanning } from "@/components/WeddingEventPlanning";
import { PrivateEventPlanning } from "@/components/PrivateEventPlanning";
import { useTheme } from "@/context/ThemeContext";
import { layouts } from "@/styles/themes";
import { usePosts } from "@/hooks/use-posts";
import { useEventContent, layoutToEventType as getEventType } from "@/hooks/use-event-content";
import { useSiteImages } from "@/hooks/use-site-images";
import weddingImg from "@assets/VERSACE_(3)_1769632123580.png";
import prShowImg from "@assets/DJ_Miss_Haze_Wedding_DJ_Chicago_and_Denver-022_1766178470443.jpg";
import privateEventImg from "@assets/DJ_Miss_Haze_Wedding_DJ_Chicago_and_Denver-073_1766178470442.jpg";
import corporateImg from "@assets/DJ_Miss_Haze_Wedding_DJ_Chicago_and_Denver-022_(1)_1768864251304.jpg";

const defaultLayoutImages = {
  wedding: weddingImg,
  pr_show: prShowImg,
  private_event: privateEventImg,
  corporate_event: corporateImg,
};

const layoutToImageKey: Record<string, string> = {
  corporate_event: "hero_corporate",
  wedding: "hero_wedding",
  private_event: "hero_private",
  pr_show: "hero_other",
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
  const currentLayout = layouts[layout];
  const { getImage } = useSiteImages();
  const dynamicHero = getImage(layoutToImageKey[layout] || "hero_other");
  const heroImage = dynamicHero || defaultLayoutImages[layout as keyof typeof defaultLayoutImages];
  const aboutImage = getImage("about_photo");
  const evtType = getEventType(layout);
  const { content: eventContent } = useEventContent(evtType);
  const heroSubtitle = eventContent.hero.subtitle;
  const eventType = layoutToFormEventType[layout] || "other";
  const isCorporate = layout === "corporate_event";
  const isWedding = layout === "wedding";
  const isPrivate = layout === "private_event";
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const { data: posts, isLoading } = usePosts();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      {/* 1. Hero Section */}
      <section ref={targetRef} className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
          <motion.img 
            key={layout}
            src={heroImage} 
            alt="DJ Miss Haze"
            className={`w-full h-full object-cover ${
              layout === "wedding" 
                ? "object-[center_10%] md:object-[center_15%]" 
                : layout === "corporate_event"
                  ? ""
                  : "object-center"
            }`}
            style={layout === "corporate_event" ? { objectPosition: 'center 25%' } : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="container relative z-20 px-4 text-center flex flex-col items-center justify-center h-full">
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col items-center w-full max-w-[98vw]">
              <h1 className="text-[13vw] md:text-[11vw] leading-none font-black font-display tracking-tighter text-white w-full flex justify-between uppercase">
                <span>D</span><span>J</span><span className="ml-[0.1em]">M</span><span>I</span><span>S</span><span>S</span><span className="ml-[0.1em]">H</span><span>A</span><span>Z</span><span>E</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl font-bold text-primary uppercase tracking-[0.2em] whitespace-pre-line">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-lg font-bold text-white/80 uppercase tracking-widest">
              {eventContent.hero.locations.map((location: string, index: number) => (
                <span key={index} className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{location}</span>
                </span>
              ))}
            </div>

            <div className="pt-6">
              <CompactBookingForm defaultEventType={eventType} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ticker Component */}
      {(() => {
        const tickerItems = eventContent.ticker.items;
        const tickerContent = tickerItems.map((item, j) => (
          <span key={j} className="shrink-0 flex items-center gap-2">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </span>
            {item}
          </span>
        ));
        return (
          <div className="w-full bg-primary py-3 overflow-hidden whitespace-nowrap -rotate-1 relative z-30 shadow-lg shadow-primary/20">
            <div className="flex">
              <div className="flex shrink-0 animate-marquee">
                <div className="flex items-center gap-6 px-4 text-black font-black font-display text-lg uppercase shrink-0">
                  {tickerContent}
                </div>
              </div>
              <div className="flex shrink-0 animate-marquee" aria-hidden="true">
                <div className="flex items-center gap-6 px-4 text-black font-black font-display text-lg uppercase shrink-0">
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
      <ClientLogos />

      {/* 4. Brand Reviews */}
      <section id="reviews" className="container mx-auto px-4 py-8 md:py-16">
        <GoogleReviews />
      </section>

      {/* 5. Vibe Reel */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <VibeReel />
      </section>

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
                  className="inline-block px-8 py-3 bg-primary text-black font-black font-display tracking-tighter rounded-full hover:scale-105 transition-all beam-effect uppercase"
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
              src={aboutImage || corporateImg} 
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
              className="inline-block px-12 py-4 bg-primary text-black font-black font-display tracking-tighter text-xl rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20 beam-effect uppercase"
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
