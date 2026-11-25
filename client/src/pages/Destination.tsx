import { Globe, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { InquirySection, PageHero, SectionHeading } from "@/components/PageSections";
import { usePageTitle } from "@/hooks/use-page-title";
import { FAQ } from "@/components/FAQ";
import { destinationContent as content, type DestinationListSection } from "@/content/destination";

// /destination-dj. The U.S. destinations, International, How It Works and
// Photos sections are empty slots in client/src/content/destination.ts; each
// one renders only once it has content.

function DestinationList({
  section,
  icon: Icon,
}: {
  section: DestinationListSection;
  icon: typeof MapPin;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <h2 className="flex items-center gap-2.5 text-xl md:text-2xl font-black font-display uppercase tracking-tighter">
        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
        {section.heading}
      </h2>
      {section.intro && <p className="mt-3 text-muted-foreground leading-relaxed">{section.intro}</p>}
      <ul className="mt-4 divide-y divide-white/5">
        {section.items.map((item) => (
          <li key={`${item.name}-${item.detail ?? ""}`} className="py-2 text-white/90">
            {item.name}
            {item.detail && <span className="text-muted-foreground">, {item.detail}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Destination() {
  usePageTitle("/destination-dj");

  const lists = [
    { section: content.usDestinations, icon: MapPin },
    { section: content.international, icon: Globe },
  ].filter(({ section }) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      <PageHero heading={content.heading} intro={content.intro} image={content.heroImage} />

      {/* Body text under the hero (same paragraph style as the city intros). */}
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">{content.body}</p>
        </div>
      </section>

      {lists.length > 0 && (
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className={`max-w-5xl mx-auto grid grid-cols-1 gap-4 md:gap-6 ${lists.length > 1 ? "md:grid-cols-2" : ""}`}>
            {lists.map(({ section, icon }) => (
              <DestinationList key={section.heading} section={section} icon={icon} />
            ))}
          </div>
        </section>
      )}

      {content.howItWorks.steps.length > 0 && (
        <section className="container mx-auto px-4 py-8 md:py-12">
          <SectionHeading heading={content.howItWorks.heading} text={content.howItWorks.intro || undefined} />
          <ol className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {content.howItWorks.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="text-xs font-black font-display uppercase tracking-widest text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-bold font-display uppercase tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {content.photos.images.length > 0 && (
        <section className="container mx-auto px-4 py-8 md:py-12">
          <SectionHeading heading={content.photos.heading} />
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {content.photos.images.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-square w-full rounded-2xl border border-white/10 object-cover"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
      )}

      {/* Short FAQ before the closing CTA, with FAQPage JSON-LD like the other FAQ blocks. */}
      <section id="faq" className="container mx-auto px-4 py-8 md:py-16">
        <FAQ content={content.faq} emitSchema />
      </section>

      <InquirySection copy={content.inquiry} />

      <FooterCTA />

      {/* Bottom spacing clears the fixed FooterCTA bar */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
