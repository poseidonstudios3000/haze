import type { ComponentType } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/PageSections";
import { useReveal } from "@/hooks/use-reveal";
import type { LinkCard, Photo, TeaserCopy } from "@/content/types";
import { cn } from "@/lib/utils";

// The homepage's image-led sections: the "Choose Your Location" bento grid and
// the Event Rentals / Event Resources editorial blocks. Copy and photos come
// from client/src/content/home.ts.

/**
 * A photo that fills its (already sized) container. The container sets the
 * box, and width/height give the browser the aspect ratio up front, so
 * loading never shifts the layout. Below-the-fold photos are lazy-loaded.
 */
function FillPhoto({ photo, className }: { photo: Photo; className?: string }) {
  return (
    <img
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={photo.alt ?? ""}
      loading="lazy"
      decoding="async"
      style={{ objectPosition: photo.position }}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}

// Slow zoom on hover. Long and eased, so it reads as a drift, not a jump.
const hoverZoom =
  "transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

function LocationTile({
  card,
  featured,
  className,
}: {
  card: LinkCard;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={card.href}
      data-reveal
      className={cn(
        "group relative isolate flex overflow-hidden rounded-3xl border border-white/10 bg-zinc-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      data-testid={`link-home-location-${card.href.replace(/\//g, "")}`}
    >
      {card.image && <FillPhoto photo={card.image} className={hoverZoom} />}
      {/* Bottom-up scrim: near-black behind the text, clear toward the top so the photo still leads. */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/95",
          featured ? "via-black/50 via-35% to-black/0" : "via-black/60 via-50% to-black/10",
        )}
        aria-hidden="true"
      />
      {/* Copper arrow in the top corner, so the text below gets the tile's full width. */}
      <span
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/60 bg-black/50 backdrop-blur-sm transition-colors duration-500 group-hover:border-primary group-hover:bg-black/70 md:right-6 md:top-6"
        aria-hidden="true"
      >
        <ArrowRight className="h-4 w-4 text-primary transition-transform duration-500 ease-out group-hover:translate-x-1" />
      </span>
      <div className="relative z-10 mt-auto w-full p-6 md:p-8">
        <div className="min-w-0">
          <h3
            className={cn(
              "font-display font-black uppercase leading-[0.9] tracking-tighter text-white",
              featured ? "text-5xl sm:text-6xl lg:text-7xl" : "text-3xl md:text-4xl",
            )}
          >
            {card.title}
          </h3>
          <p
            className={cn(
              "mt-3 max-w-md leading-snug text-white/90",
              featured ? "text-base md:text-lg" : "text-sm md:text-base",
            )}
          >
            {card.text}
          </p>
        </div>
      </div>
    </Link>
  );
}

/**
 * Bento grid. Desktop (lg, 3 columns): Chicago as a 2x2 feature on the left,
 * Dallas-Fort Worth and Denver stacked on the right, Destination as a wide
 * strip across the bottom. Tablet: Chicago full width, then two up, then
 * Destination full width. Mobile: stacked, Chicago first and tallest. Fixed
 * heights mean nothing moves while photos load.
 */
export function LocationBento({ heading, cards }: { heading: string; cards: LinkCard[] }) {
  const ref = useReveal<HTMLElement>();
  const [featured, ...rest] = cards;
  const restLayout = [
    "h-[260px] sm:h-[280px] lg:h-auto",
    "h-[260px] sm:h-[280px] lg:h-auto",
    "h-[260px] sm:col-span-2 sm:h-[300px] lg:col-span-3 lg:h-auto",
  ];

  return (
    <section ref={ref} className="container mx-auto px-4 pb-16 md:pb-24" aria-labelledby="home-locations-heading">
      <div data-reveal>
        <SectionHeading heading={heading} id="home-locations-heading" />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:grid-rows-[300px_300px_260px]">
        {featured && (
          <LocationTile
            card={featured}
            featured
            className="h-[440px] sm:col-span-2 sm:h-[480px] lg:col-span-2 lg:row-span-2 lg:h-auto"
          />
        )}
        {rest.map((card, index) => (
          <LocationTile
            key={card.href}
            card={card}
            className={restLayout[index] ?? "h-[260px] lg:h-auto"}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Editorial block: photo on one side, big heading, line and button on the
 * other. `imageSide` alternates the layout on desktop; on mobile the photo is
 * always on top.
 */
export function EditorialFeature({
  copy,
  icon: Icon,
  imageSide,
  testId,
}: {
  copy: TeaserCopy;
  icon: ComponentType<{ className?: string }>;
  imageSide: "left" | "right";
  testId?: string;
}) {
  const ref = useReveal<HTMLElement>();
  const headingId = `feature-${copy.href.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}`;

  return (
    <section
      ref={ref}
      aria-labelledby={headingId}
      className="group grid overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 lg:grid-cols-2"
    >
      <div
        data-reveal
        className={cn(
          "relative h-[300px] overflow-hidden sm:h-[380px] lg:h-auto lg:min-h-[520px]",
          imageSide === "right" && "lg:order-last",
        )}
      >
        {copy.image && <FillPhoto photo={copy.image} className={hoverZoom} />}
        {/* Fade the photo into the text panel on desktop, and into the card bottom on mobile. */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent",
            imageSide === "left" ? "lg:bg-gradient-to-r" : "lg:bg-gradient-to-l",
            "lg:from-transparent lg:via-transparent lg:to-zinc-950/60",
          )}
          aria-hidden="true"
        />
      </div>

      <div className="relative flex flex-col items-start justify-center gap-6 p-8 sm:p-10 lg:p-16">
        <span
          data-reveal
          className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-black/40"
        >
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </span>
        <div data-reveal className="space-y-4">
          <h2
            id={headingId}
            className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl lg:text-6xl"
          >
            {copy.heading}
          </h2>
          <div className="h-1 w-20 rounded-full bg-primary" />
        </div>
        <p data-reveal className="max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
          {copy.text}
        </p>
        <div data-reveal>
          <Link
            href={copy.href}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display font-black uppercase tracking-tighter text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            data-testid={testId}
          >
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
