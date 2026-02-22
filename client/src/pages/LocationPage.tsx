import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { VibeReel } from "@/components/VibeReel";
import { GalleryPreview } from "@/components/GalleryPreview";
import { FAQ } from "@/components/FAQ";
import { GoogleReviews } from "@/components/GoogleReviews";
import { CompactBookingForm } from "@/components/CompactBookingForm";
import { EventSignatureSection } from "@/components/EventSignatureSection";
import chicagoImg from "@assets/generated_images/chicago_skyline_dj_backdrop.png";
import dallasImg from "@assets/generated_images/dallas_skyline_dj_backdrop.png";
import denverImg from "@assets/generated_images/denver_skyline_dj_backdrop.png";

import res1 from "@assets/stock_images/modern_event_venue_a_01a0bdf0.jpg";
import res2 from "@assets/stock_images/modern_event_venue_a_1d474530.jpg";
import res3 from "@assets/stock_images/modern_event_venue_a_c5227e74.jpg";

const cityImages: Record<string, string> = {
  chicago: chicagoImg,
  dallas: dallasImg,
  denver: denverImg,
};

type LocationData = {
  city: string;
  state: string;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
};

const locations: Record<string, LocationData> = {
  chicago: {
    city: "Chicago",
    state: "IL",
    tagline: "The Windy City's Premier Event DJ",
    description: "Bringing high-energy vibes to Chicago weddings, corporate events, and private parties throughout the Chicagoland area.",
    seoTitle: "Chicago DJ | Event DJ & MC | DJ Miss Haze",
    seoDescription: "Professional event DJ services in Chicago, IL. DJ Miss Haze specializes in weddings, corporate events, and private parties throughout Chicagoland.",
  },
  dallas: {
    city: "Dallas",
    state: "TX",
    tagline: "Dallas-Fort Worth's Elite Event DJ",
    description: "Elevating DFW events with curated music experiences for weddings, galas, and exclusive private celebrations.",
    seoTitle: "Dallas DJ | Event DJ & MC | DJ Miss Haze",
    seoDescription: "Professional event DJ services in Dallas-Fort Worth, TX. DJ Miss Haze brings high-energy, sophisticated music to weddings and corporate events.",
  },
  denver: {
    city: "Denver",
    state: "CO",
    tagline: "The Mile High City's Go-To Event DJ",
    description: "Creating unforgettable moments at Denver weddings, mountain venues, and corporate gatherings across Colorado.",
    seoTitle: "Denver DJ | Event DJ & MC | DJ Miss Haze",
    seoDescription: "Professional event DJ services in Denver, CO. DJ Miss Haze delivers curated music experiences for weddings, corporate events, and private parties.",
  },
};

interface LocationPageProps {
  location: "chicago" | "dallas" | "denver";
}

export default function LocationPage({ location }: LocationPageProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const heroImage = cityImages[location];
  const locationData = locations[location];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      {/* 1. Hero Section - Location Specific */}
      <section ref={targetRef} className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
          <motion.img 
            key={location}
            src={heroImage} 
            alt={`DJ Miss Haze ${locationData.city} DJ`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="container relative z-20 px-4 text-center flex flex-col items-center justify-center h-full">
          <div className="space-y-4 md:space-y-6">
            {/* Title */}
            <div className="flex flex-col items-center w-full max-w-[98vw]">
              <h1 className="text-[13vw] md:text-[11vw] leading-none font-black font-display tracking-tighter text-white w-full flex justify-between uppercase">
                <span>D</span><span>J</span><span className="ml-[0.1em]">M</span><span>I</span><span>S</span><span>S</span><span className="ml-[0.1em]">H</span><span>A</span><span>Z</span><span>E</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-bold text-primary uppercase tracking-[0.2em]">
              Event DJ & MC
            </p>

            {/* Location Badge */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3 px-6 py-3 bg-black/50 backdrop-blur-md rounded-full border border-primary/30">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-lg md:text-xl font-bold text-white uppercase tracking-widest">{locationData.city}, {locationData.state}</span>
              </div>
            </div>

            {/* Location Tagline */}
            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto">
              {locationData.tagline}
            </p>

            {/* Compact Booking Form */}
            <div className="pt-6">
              <CompactBookingForm defaultLocation={location} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ticker Component */}
      <div className="w-full bg-primary py-3 overflow-hidden whitespace-nowrap -rotate-1 relative z-30 shadow-lg shadow-primary/20">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 text-black font-black font-display text-lg uppercase shrink-0">
              <span>***** HIGH-ENERGY</span>
              <span>***** CLASSY & TIMELESS</span>
              <span>***** BOLD & ECLECTIC</span>
              <span>***** SOPHISTICATED</span>
              <span>***** ROMANTIC</span>
              <span>***** FUN & INCLUSIVE</span>
              <span>*****</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Event Signature Section */}
      <EventSignatureSection />

      {/* 4. Brand Reviews */}
      <section id="reviews" className="container mx-auto px-4 py-8 md:py-16">
        <GoogleReviews />
      </section>

      {/* 4. Vibe Reel */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <VibeReel />
      </section>

      {/* 5. FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-8 md:py-16">
        <FAQ />
      </section>

      {/* 6. Mantra Section */}
      <section id="mantra" className="container mx-auto px-4 py-16 md:py-24 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-black font-display mb-4 uppercase">MANTRA</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <p className="text-3xl md:text-5xl font-black italic leading-tight text-primary uppercase tracking-tighter">
                "PRESENCE, INTENTION, & LEADERSHIP."
              </p>
            </div>
            <div className="md:col-span-2 space-y-8">
              <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                "Every event is approached with mindfulness, balance, and care - and 200% of my energy."
              </p>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  DJ Miss Haze believes in the power of conscious curation. She approaches events with the same guideline as she does her personal life: with presence, intention, emotional awareness, focus and calm leadership. She welcomes and respects all cultures, religions, identities, and orientations.
                </p>
                <p>
                  DJ Miss Haze applies the same principles and high ethical standards she has for her personal life to her work as a DJ. She exemplifies authenticity and integrity. With her, you will not just book a DJ. You will partner with an experienced DJ and event host who masters the art of reading, and leading the room.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Resources Slider */}
      <section id="resources" className="container mx-auto px-4 py-8 md:py-16 space-y-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-black font-display mb-2 uppercase">RESOURCES</h2>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </div>
        
        <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-6 w-max">
            <div className="w-[300px] group cursor-pointer flex-shrink-0">
              <div className="aspect-video rounded-2xl bg-white/5 mb-4 overflow-hidden relative border border-white/10">
                <img src={res1} alt="Checklist" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs font-bold text-primary border border-primary/20">Planning</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 uppercase font-bold tracking-widest"><MapPin className="w-3 h-3" /> Chicago, IL</div>
              <h3 className="text-xl font-bold font-display leading-tight group-hover:text-primary transition-colors uppercase mb-2">Ultimate Wedding DJ Checklist</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">Ensure your big day sounds perfect with our comprehensive guide to wedding music planning and DJ selection.</p>
            </div>
            <div className="w-[300px] group cursor-pointer flex-shrink-0">
              <div className="aspect-video rounded-2xl bg-white/5 mb-4 overflow-hidden relative border border-white/10">
                <img src={res2} alt="Lights" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs font-bold text-primary border border-primary/20">Venues</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 uppercase font-bold tracking-widest"><MapPin className="w-3 h-3" /> Denver, CO</div>
              <h3 className="text-xl font-bold font-display leading-tight group-hover:text-primary transition-colors uppercase mb-2">Top 5 Industrial Venues in Denver</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">Explore the most unique raw spaces and industrial warehouses perfect for modern, high-energy events.</p>
            </div>
            <div className="w-[300px] group cursor-pointer flex-shrink-0">
              <div className="aspect-video rounded-2xl bg-white/5 mb-4 overflow-hidden relative border border-white/10">
                <img src={res3} alt="Party" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs font-bold text-primary border border-primary/20">Corporate</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 uppercase font-bold tracking-widest"><MapPin className="w-3 h-3" /> Dallas, TX</div>
              <h3 className="text-xl font-bold font-display leading-tight group-hover:text-primary transition-colors uppercase mb-2">Corporate Event Vibe Guide</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">How to balance professional networking with a high-energy party atmosphere for your next gala.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Gallery */}
      <section id="gallery" className="container mx-auto px-4 py-8 md:py-16">
        <GalleryPreview />
      </section>

      {/* 9. About Section */}
      <section id="about" className="container mx-auto px-4 py-16 md:py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black font-display mb-2 uppercase">ABOUT</h2>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                DJ Miss Haze was born and raised in Germany, where she officially started her DJ career in 2010 after a decade of recording mixtapes for her family, friends and ultimately across her entire hometown. As a daughter to parents with an impressive vinyl collection, she organically engaged and deeply connected with music from an early age. Her brother who started DJing as a teenager inspired her to continue leveraging her deep connection to music and people as a DJ herself. She bought her own set of Technics 1200s in 2009 and practiced beat-matching and various forms of music blending daily.
              </p>
              <p>
                Her career started out as a Club DJ in a highly competitive club environment in Frankfurt, Germany. DJ Miss Haze also organized her own club and concert events across Europe, which connected her with record labels, international agencies, and media. Besides launching the 1st ever radio show dedicated to Hip Hop R&B on German Radio, she also worked with renowned artists such as Kendrick Lamar, Trey Songz, Lloyd, Snap!, Mario and others as their Tour DJ.
              </p>
              <p>
                In 2014, she started receiving steady work as a Corporate Event DJ and a year later took on her 1st gig as a wedding DJ. She moved to the U.S. in 2019 and has since established herself as a top choice for weddings, corporate, and private events due to her unmatched diverse DJ experience and relentless focus on the client and guest experience.
              </p>
              <p className="font-bold text-white uppercase tracking-widest text-sm">
                AVAILABLE IN CHICAGO, DALLAS FORT WORTH, DENVER & BEYOND
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
            <img 
              src={heroImage} 
              alt="DJ Miss Haze biography" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* 10. Final CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8 bg-zinc-900/50 p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
          <h2 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tighter">
            READY TO <span className="text-primary italic">PARTY?</span>
          </h2>
          <p className="text-xl text-muted-foreground uppercase tracking-widest font-bold">
            Secure your date now for 2026 - 2028
          </p>
          <div className="pt-4">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block px-12 py-4 bg-primary text-black font-black font-display tracking-tighter text-xl rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20 beam-effect uppercase"
              data-testid="link-inquire-now-cta"
            >
              Inquire Now
            </a>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}
