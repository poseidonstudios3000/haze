import { MapPin, Phone } from "lucide-react";
import type { BusinessLocation } from "@shared/seo";

// Visible NAP block for a single location, shown on that city's pages. The
// LocalBusiness schema itself lives in the footer (site-wide), so this is
// plain visible content — no duplicate structured data.
export function LocationContact({ location }: { location?: BusinessLocation }) {
  if (!location) return null;
  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 text-center sm:text-left">
        <div className="space-y-2">
          <h2 className="text-xs font-black font-display uppercase tracking-widest text-primary">
            {location.areaLabel}
          </h2>
          <p className="flex items-center justify-center sm:justify-start gap-2 text-sm md:text-base text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>
              {location.streetAddress}, {location.addressLocality}, {location.addressRegion} {location.postalCode}
            </span>
          </p>
        </div>
        <a
          href={location.phoneHref}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-black font-display uppercase tracking-tighter hover:scale-105 transition-transform shrink-0"
          data-testid={`link-city-phone-${location.slug}`}
        >
          <Phone className="w-4 h-4" />
          <span>{location.phoneDisplay}</span>
        </a>
      </div>
    </section>
  );
}
