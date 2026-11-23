import { MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { LinkCardTile, PageHeader } from "@/components/PageSections";
import { usePageTitle } from "@/hooks/use-page-title";
import { eventResourcesContent as content } from "@/content/event-resources";

export default function EventResources() {
  usePageTitle("/event-resources");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      <PageHeader heading={content.heading} intro={content.intro} />

      <section className="container mx-auto px-4 pt-4 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {content.cards.map((card) => (
            <LinkCardTile
              key={card.href}
              card={card}
              icon={MapPin}
              cta={content.cardCta}
              headingLevel="h2"
              testId={`link-resources-${card.href.split("/").pop()}`}
            />
          ))}
        </div>
      </section>

      <FooterCTA />

      {/* Bottom spacing clears the fixed FooterCTA bar */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
