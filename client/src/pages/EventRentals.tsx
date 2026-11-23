import { Camera, CloudFog, Mic, Package, Phone, Rotate3d, Sparkles, Speaker } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { InquirySection, PageHeader } from "@/components/PageSections";
import { usePageTitle } from "@/hooks/use-page-title";
import { eventRentalsContent as content, type RentalItem } from "@/content/event-rentals";

// /event-rentals. Each card has an image slot (client/src/content/event-rentals.ts);
// until a photo is set it shows the item's icon instead.

const RENTAL_ICONS: Record<string, typeof Speaker> = {
  "sound-systems": Speaker,
  microphones: Mic,
  "audio-guestbook": Phone,
  "360-photo-booth": Rotate3d,
  "classic-photo-booth": Camera,
  "photo-booth-add-ons": Sparkles,
  "co2-cannons": CloudFog,
};

function RentalCard({ item }: { item: RentalItem }) {
  const Icon = RENTAL_ICONS[item.id] ?? Package;
  return (
    <article
      id={item.id}
      className="scroll-mt-20 flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      data-testid={`card-rental-${item.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-zinc-900/60">
        {item.image ? (
          <img
            src={item.image.src}
            alt={item.image.alt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.06] via-transparent to-primary/10">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-black/40">
              <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h2 className="text-lg md:text-xl font-bold font-display uppercase tracking-tight">{item.title}</h2>
        {item.text && <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.text}</p>}
      </div>
    </article>
  );
}

export default function EventRentals() {
  usePageTitle("/event-rentals");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      <PageHeader heading={content.heading} intro={content.intro} />

      <section className="container mx-auto px-4 pt-4 pb-4 md:pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {content.items.map((item) => (
            <RentalCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <InquirySection copy={content.inquiry} />

      <FooterCTA />

      {/* Bottom spacing clears the fixed FooterCTA bar */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
