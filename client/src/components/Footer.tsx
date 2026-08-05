import { Link, useLocation } from "wouter";
import { MapPin, Phone } from "lucide-react";
import { SOCIAL_LINKS } from "./Navbar";
import {
  CITY_HUB_PAGES,
  SERVICE_PAGES,
  BUSINESS_LOCATIONS,
  getCityPagesForLayout,
  getSeoPageLabel,
  getLocalBusinessSchema,
  getSeoPage,
  type SeoPage,
} from "@shared/seo";

// All four link columns are derived from SEO_PAGES, so adding a route there
// puts it in the footer automatically — no second list to keep in sync.
const LINK_COLUMNS: { heading: string; pages: SeoPage[] }[] = [
  { heading: "Locations", pages: CITY_HUB_PAGES },
  { heading: "Services", pages: SERVICE_PAGES },
  { heading: "Weddings by City", pages: getCityPagesForLayout("wedding") },
  { heading: "Corporate by City", pages: getCityPagesForLayout("corporate_event") },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-black font-display uppercase tracking-widest text-primary mb-4">
      {children}
    </h2>
  );
}

export function Footer() {
  const [location] = useLocation();
  // City pages carry only their own location's LocalBusiness node; the homepage,
  // generic service pages and /faq carry all three. The visible NAP below always
  // shows all three regardless — this only scopes the structured data.
  const citySlug = getSeoPage(location).city?.toLowerCase();
  const localBusinessSchema = getLocalBusinessSchema(citySlug);

  return (
    <footer className="border-t border-white/10 bg-black/40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Extra bottom padding clears the fixed FooterCTA bar. */}
      <div className="container mx-auto px-4 pt-12 md:pt-16 pb-28 md:pb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {LINK_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <FooterHeading>{column.heading}</FooterHeading>
              <ul className="space-y-2.5">
                {column.pages.map((page) => (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-footer-${page.path.slice(1)}`}
                    >
                      {getSeoPageLabel(page)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contact — full NAP for all three locations */}
        <div className="mt-12 pt-10 border-t border-white/5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1">
            <FooterHeading>Contact</FooterHeading>
            <p className="text-sm font-bold text-white uppercase font-display tracking-wider mb-5">
              DJ Miss Haze
            </p>
            {/* Wider than before so addresses fit on one line at typical desktop
                widths; each column is equal-height (grid stretch) with the
                address growing (flex-1) so the phone links stay on a common
                baseline even if an address wraps at a narrower width. */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8 max-w-5xl">
              {BUSINESS_LOCATIONS.map((loc) => (
                <div key={loc.slug} className="flex flex-col gap-2">
                  <p className="text-xs font-black font-display uppercase tracking-widest text-primary">
                    {loc.areaLabel}
                  </p>
                  <address
                    className="not-italic flex items-start gap-2 text-sm text-muted-foreground flex-1"
                    data-testid={`text-footer-address-${loc.slug}`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      {loc.streetAddress}, {loc.addressLocality}, {loc.addressRegion} {loc.postalCode}
                    </span>
                  </address>
                  <a
                    href={loc.phoneHref}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-phone-${loc.slug}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{loc.phoneDisplay}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:text-right">
            <FooterHeading>Follow</FooterHeading>
            <div className="flex items-center gap-1 lg:justify-end">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:text-primary transition-colors hover:bg-foreground/5 rounded-full text-foreground"
                    title={social.name}
                    data-testid={`link-footer-social-${social.name.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-sm font-black font-display uppercase tracking-tighter text-foreground hover:text-primary transition-colors"
              data-testid="link-footer-home"
            >
              DJ Miss Haze
            </Link>
            <Link
              href="/faq"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-footer-faq"
            >
              FAQ
            </Link>
          </div>
          <p className="text-[10px] text-white/30 tracking-widest uppercase text-center">
            Event DJ &amp; MC — Chicago, IL | Dallas, TX | Denver, CO
          </p>
        </div>
      </div>
    </footer>
  );
}
