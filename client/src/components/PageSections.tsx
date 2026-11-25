import type { ComponentType } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getSeoPage } from "@shared/seo";
import { CompactBookingForm } from "@/components/CompactBookingForm";
import type { InquiryCopy, LinkCard, Photo } from "@/content/types";
import type { PlanningLinksCopy } from "@/content/planning-links";
import { cn } from "@/lib/utils";

// Building blocks shared by the content pages (resources, destination,
// rentals) and the homepage's new sections. All copy comes in as props from
// client/src/content; nothing here hard-codes wording.

export function SectionDivider({ className }: { className?: string }) {
  return <div className={cn("h-1 w-24 bg-primary rounded-full mx-auto", className)} />;
}

/** Visible breadcrumb trail, read from the page's breadcrumbs in shared/seo.ts (same source as the BreadcrumbList schema). */
export function Breadcrumbs({ path }: { path: string }) {
  const crumbs = getSeoPage(path).breadcrumbs;
  if (!crumbs?.length) return null;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-white">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="hover:text-primary transition-colors">
                    {crumb.name}
                  </Link>
                  <ChevronRight className="w-3 h-3" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Page-top block with the page's single H1. */
export function PageHeader({
  heading,
  intro,
  breadcrumbsPath,
}: {
  heading: string;
  intro: string;
  breadcrumbsPath?: string;
}) {
  return (
    <section className="container mx-auto px-4 pt-12 md:pt-20 pb-6 md:pb-10">
      <div className="max-w-4xl mx-auto text-center space-y-5">
        {breadcrumbsPath && <Breadcrumbs path={breadcrumbsPath} />}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tighter break-words">
          {heading}
        </h1>
        <SectionDivider />
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">{intro}</p>
      </div>
    </section>
  );
}

/**
 * Page-top block with a full-bleed photo behind the page's single H1. The
 * photo is above the fold, so it loads eagerly at high priority; the section
 * has a fixed minimum height, so nothing shifts while it loads. A bottom-up
 * scrim keeps the heading and intro readable on any photo.
 */
export function PageHero({
  heading,
  intro,
  image,
}: {
  heading: string;
  intro: string;
  image: Photo & { alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="eager"
        decoding="async"
        {...{ fetchpriority: "high" }}
        style={{ objectPosition: image.position }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-black/70 to-black/25"
        aria-hidden="true"
      />
      <div className="container mx-auto flex min-h-[520px] items-end px-4 pb-12 pt-32 md:min-h-[600px] md:pb-16 lg:min-h-[640px]">
        <div className="mx-auto max-w-4xl space-y-5 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-display uppercase tracking-tighter text-white break-words">
            {heading}
          </h1>
          <SectionDivider />
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">{intro}</p>
        </div>
      </div>
    </section>
  );
}

/** Centered section heading (h2) with the accent divider and an optional line. */
export function SectionHeading({ heading, text, id }: { heading: string; text?: string; id?: string }) {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-3 mb-8 md:mb-12">
      <h2 id={id} className="text-2xl md:text-4xl font-black font-display uppercase tracking-tighter">
        {heading}
      </h2>
      <SectionDivider />
      {text && (
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{text}</p>
      )}
    </div>
  );
}

/** Bordered card that links to another page: icon + title, one line of copy, arrow. */
export function LinkCardTile({
  card,
  icon: Icon,
  cta,
  headingLevel = "h3",
  testId,
}: {
  card: LinkCard;
  icon?: ComponentType<{ className?: string }>;
  cta?: string;
  headingLevel?: "h2" | "h3";
  testId?: string;
}) {
  const Heading = headingLevel;
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 transition-colors hover:border-primary/40 hover:bg-white/[0.07]"
      data-testid={testId}
    >
      <span className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2.5">
          {Icon && <Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />}
          <Heading className="text-lg md:text-xl font-bold font-display uppercase tracking-tight text-white group-hover:text-primary transition-colors">
            {card.title}
          </Heading>
        </span>
        {!cta && (
          <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{card.text}</span>
      {cta && (
        <span className="mt-auto flex items-center gap-1.5 pt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {cta}
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      )}
    </Link>
  );
}

/**
 * Closing booking-form block: the city pages' "Ready to Party?" CTA with the
 * same CompactBookingForm right inside it. id="inquire" is the target of the
 * fixed bar's "Inquire Now" button on pages that have this section.
 */
export function InquirySection({ copy }: { copy: InquiryCopy }) {
  return (
    <section id="inquire" className="container mx-auto px-4 py-16 md:py-24 text-center scroll-mt-20">
      <div className="max-w-3xl mx-auto space-y-6 bg-zinc-900/50 px-5 py-10 sm:p-10 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
        <h2 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tighter">
          {copy.heading} <span className="text-primary italic">{copy.highlight}</span>
        </h2>
        <p className="text-base md:text-xl text-muted-foreground uppercase tracking-widest font-bold">{copy.text}</p>
        <div className="pt-2 text-left">
          <CompactBookingForm />
        </div>
      </div>
    </section>
  );
}

/**
 * Small "Planning your event?" block near the end of the city and event type
 * pages: the "Also Serving" heading style with the bordered arrow cards used
 * for "DJ Services in <City>". Plain links (real <a href>), so they are in the
 * prerendered HTML.
 */
export function PlanningLinks({ copy }: { copy: PlanningLinksCopy }) {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12" aria-labelledby="planning-links-heading">
      <div className="max-w-3xl mx-auto space-y-5">
        <h2
          id="planning-links-heading"
          className="text-center text-xs font-black font-display uppercase tracking-widest text-primary"
        >
          {copy.heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {copy.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors"
              data-testid={`link-planning-${link.href.slice(1).replace(/\//g, "-")}`}
            >
              <span className="text-base md:text-lg font-bold font-display uppercase text-white group-hover:text-primary transition-colors">
                {link.label}
              </span>
              <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
