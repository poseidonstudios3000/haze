import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { PageHeader } from "@/components/PageSections";
import { usePageTitle } from "@/hooks/use-page-title";
import type { CityResourcesContent, ResourceItem } from "@/content/types";

// Shared template for /event-resources/<city>. The copy comes from
// client/src/content/event-resources/<city>.ts; the title, description and
// breadcrumb trail (visible + BreadcrumbList schema) from shared/seo.ts.

function ResourceEntry({ item }: { item: ResourceItem }) {
  const detail = item.detail ? <span className="text-muted-foreground">, {item.detail}</span> : null;

  if (!item.url) {
    return (
      <li className="py-2 text-sm md:text-base text-white/90">
        {item.name}
        {detail}
      </li>
    );
  }

  return (
    <li className="py-2 text-sm md:text-base">
      <a
        href={item.url}
        target="_blank"
        rel="noopener"
        className="group inline-flex items-baseline gap-1.5 font-bold text-white hover:text-primary transition-colors"
      >
        <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-primary">
          {item.name}
        </span>
        <ExternalLink className="w-3 h-3 shrink-0 self-center text-primary" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      {detail}
    </li>
  );
}

export default function CityResources({ content }: { content: CityResourcesContent }) {
  usePageTitle(content.path);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      <PageHeader heading={content.heading} intro={content.intro} breadcrumbsPath={content.path} />

      {/* Groups flow into columns (masonry-style) so long and short lists pack
          evenly; reading order runs down each column, matching the DOM. */}
      <section className="container mx-auto px-4 pt-4 pb-10 md:pb-16">
        <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6">
          {content.groups.map((group) => (
            <div
              key={group.heading}
              className="mb-4 md:mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-xs font-black font-display uppercase tracking-widest text-primary mb-2">
                {group.heading}
              </h2>
              <ul className="divide-y divide-white/5">
                {group.items.map((item) => (
                  <ResourceEntry key={`${item.name}-${item.detail ?? ""}`} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={content.overviewLink.href}
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors"
            data-testid="link-resources-overview"
          >
            <ArrowLeft className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:-translate-x-1" />
            <span className="text-base md:text-lg font-bold font-display uppercase text-white group-hover:text-primary transition-colors">
              {content.overviewLink.label}
            </span>
          </Link>
          <Link
            href={content.djPageLink.href}
            className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors"
            data-testid="link-resources-dj-page"
          >
            <span className="text-base md:text-lg font-bold font-display uppercase text-white group-hover:text-primary transition-colors">
              {content.djPageLink.label}
            </span>
            <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
          {content.serviceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors"
              data-testid={`link-resources-service-${link.href.slice(1)}`}
            >
              <span className="text-base md:text-lg font-bold font-display uppercase text-white group-hover:text-primary transition-colors">
                {link.label}
              </span>
              <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <FooterCTA />

      {/* Bottom spacing clears the fixed FooterCTA bar */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
