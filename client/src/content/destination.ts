import type { ImageSlot, InquiryCopy, Photo } from "./types";

// /destination-dj copy. SEO title and description live in shared/seo.ts.
//
// EMPTY SLOTS for Yasmin: usDestinations, international, howItWorks and photos.
// Each section stays hidden on the page until it has at least one item, so the
// page can ship with any of them still empty.

export interface DestinationListSection {
  heading: string;
  /** Optional line under the heading. */
  intro: string;
  /** e.g. { name: "Napa Valley", detail: "California" } */
  items: { name: string; detail?: string }[];
}

export interface DestinationContent {
  heading: string;
  intro: string;
  /** Full-width photo behind the H1 (existing file in client/public/assets). */
  heroImage: Photo & { alt: string };
  usDestinations: DestinationListSection;
  international: DestinationListSection;
  howItWorks: {
    heading: string;
    intro: string;
    /** In order, e.g. { title: "Inquire", text: "Send your date and destination." } */
    steps: { title: string; text: string }[];
  };
  photos: {
    heading: string;
    images: ImageSlot[];
  };
  inquiry: InquiryCopy;
}

export const destinationContent: DestinationContent = {
  heading: "Destination DJ & MC",
  intro:
    "DJ Miss Haze travels for weddings, corporate events and celebrations outside Chicago, Dallas-Fort Worth and Denver.",

  // Corporate event in Kansas City, MO: taken outside her three home markets.
  // Web-sized copy of Corporate-Event-DJ-Miss-Haze-Kansas-City-MO-BiAYUCHi.webp.
  heroImage: {
    src: "/assets/Corporate-Event-DJ-Miss-Haze-Kansas-City-MO-BiAYUCHi-1600w.webp",
    width: 1600,
    height: 1143,
    position: "50% 30%",
    alt: "Guests on the dance floor at a corporate event in Kansas City with DJ Miss Haze",
  },

  // EMPTY SLOT: U.S. destinations. Add items to show the section.
  usDestinations: {
    heading: "U.S. Destinations",
    intro: "",
    items: [],
  },

  // EMPTY SLOT: international destinations. Add items to show the section.
  international: {
    heading: "International",
    intro: "",
    items: [],
  },

  // EMPTY SLOT: how booking a destination event works. Add steps to show the section.
  howItWorks: {
    heading: "How It Works",
    intro: "",
    steps: [],
  },

  // EMPTY SLOT: photos. Add { src, alt } entries (files in client/public/assets) to show the section.
  photos: {
    heading: "Photos",
    images: [],
  },

  // Closing booking form, same wording as the city pages' closing CTA.
  inquiry: {
    heading: "Ready to",
    highlight: "Party?",
    text: "Secure your date now for 2026 - 2028",
  },
};
