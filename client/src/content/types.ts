// Shapes for the page copy in client/src/content. Components only read these
// files, so wording can be swapped here without touching any layout code.

/** A card or tile that links to another page. */
export interface LinkCard {
  title: string;
  text: string;
  href: string;
}

/** A teaser block: heading, one line of copy and a link. */
export interface TeaserCopy {
  heading: string;
  text: string;
  cta: string;
  href: string;
}

/** The booking form section at the bottom of a page (same copy as the city pages' closing CTA). */
export interface InquiryCopy {
  heading: string;
  /** Rendered in the accent color after the heading, e.g. "Party?". */
  highlight: string;
  text: string;
}

/** An optional image. Leave `image` undefined until a photo is ready. */
export interface ImageSlot {
  src: string;
  alt: string;
}

/** One vendor or venue on a city resource page. */
export interface ResourceItem {
  name: string;
  /** Shown after the name, e.g. the town ("Oak Brook") or the service ("violinist"). */
  detail?: string;
  /** External website. Items with a url are linked (opens in a new tab). */
  url?: string;
}

export interface ResourceGroup {
  heading: string;
  items: ResourceItem[];
}

/** Copy for one city resource page (/event-resources/<city>). */
export interface CityResourcesContent {
  /** Route of this page. SEO title, description and breadcrumbs live in shared/seo.ts. */
  path: string;
  heading: string;
  intro: string;
  groups: ResourceGroup[];
  /** Links at the end of the page. */
  overviewLink: { label: string; href: string };
  djPageLink: { label: string; href: string };
}
