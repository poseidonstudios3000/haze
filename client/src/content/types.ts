// Shapes for the page copy in client/src/content. Components only read these
// files, so wording can be swapped here without touching any layout code.

/**
 * A photo from client/public/assets. width/height are the file's real pixel
 * size (they reserve space so nothing shifts while it loads). `position` is the
 * CSS object-position used when the photo is cropped to fit, e.g. "50% 30%".
 */
export interface Photo {
  src: string;
  width: number;
  height: number;
  position?: string;
  /** Only for photos that carry meaning on their own. Photos behind link text are decorative and get alt="". */
  alt?: string;
}

/** A card or tile that links to another page. */
export interface LinkCard {
  title: string;
  text: string;
  href: string;
  /** Background photo for image-led tiles (homepage locations). */
  image?: Photo;
}

/** A teaser block: heading, one line of copy and a link. */
export interface TeaserCopy {
  heading: string;
  text: string;
  cta: string;
  href: string;
  /** Photo beside the text in the homepage's editorial blocks. */
  image?: Photo;
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
