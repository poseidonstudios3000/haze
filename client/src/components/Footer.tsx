import { Link } from "wouter";
import { MapPin, Phone } from "lucide-react";
import { SOCIAL_LINKS } from "./Navbar";
import {
  CITY_HUB_PAGES,
  SERVICE_PAGES,
  getCityPagesForLayout,
  getSeoPageLabel,
  type SeoPage,
} from "@shared/seo";

const PHONE_DISPLAY = "(312) 270-1114";
const PHONE_HREF = "tel:+13122701114";
const SERVICE_AREAS = ["Chicago, IL", "Dallas–Fort Worth, TX", "Denver, CO"];

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
  return (
    <footer className="border-t border-white/10 bg-black/40">
      {/* Extra bottom padding clears the fixed FooterCTA bar. */}
      <div className="container mx-auto px-4 pt-12 md:pt-16 pb-28 md:pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
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

          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <FooterHeading>Contact</FooterHeading>
            <p className="text-sm font-bold text-white uppercase font-display tracking-wider mb-3">
              DJ Miss Haze
            </p>

            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
              data-testid="link-footer-phone"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{PHONE_DISPLAY}</span>
            </a>

            {/*
              TODO(client): street address intentionally NOT published yet —
              pending confirmation from the client on whether she wants one listed.
              When confirmed, drop the address in here and it will render under
              the phone number. Until then nothing unverified goes on the live site.

              <address className="not-italic text-sm text-muted-foreground mb-4" data-testid="text-footer-address">
                STREET ADDRESS PLACEHOLDER
              </address>
            */}

            <ul className="space-y-2 mb-6">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <FooterHeading>Follow</FooterHeading>
            <div className="flex items-center gap-1">
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
          <Link
            href="/"
            className="text-sm font-black font-display uppercase tracking-tighter text-foreground hover:text-primary transition-colors"
            data-testid="link-footer-home"
          >
            DJ Miss Haze
          </Link>
          <p className="text-[10px] text-white/30 tracking-widest uppercase text-center">
            Event DJ &amp; MC — Chicago, IL | Dallas, TX | Denver, CO
          </p>
        </div>
      </div>
    </footer>
  );
}
