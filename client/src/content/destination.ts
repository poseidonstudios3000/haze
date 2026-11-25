import type { ImageSlot, InquiryCopy, Photo } from "./types";
import type { FAQContent } from "@/hooks/use-event-content";

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
  /** Paragraph under the hero. */
  body: string;
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
  /** Short FAQ before the closing CTA. Rendered with the site's FAQ component, including FAQPage JSON-LD. */
  faq: FAQContent;
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

  // DRAFT: needs Yasmin's OK
  body:
    "Getting married or hosting an event outside Illinois, Colorado or North Texas? DJ Miss Haze travels for weddings, corporate events and private celebrations. Same live mixing, same MC work, same planning process as at home. Share your date and location in the inquiry form to check availability.",

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

  faq: {
    // Same section title as every other FAQ block on the site (not new copy).
    title: "FREQUENTLY ASKED",
    items: [
      {
        // DRAFT: needs Yasmin's OK
        question: "Do you travel outside Illinois, Colorado and North Texas?",
        // DRAFT: needs Yasmin's OK
        answer:
          "Yes. DJ Miss Haze travels for weddings, corporate events and private celebrations. Send your date and location through the inquiry form to check availability.",
      },
      {
        // DRAFT: needs Yasmin's OK
        question: "Can you work with my planner and venue?",
        // DRAFT: needs Yasmin's OK
        answer: "Yes. DJ Miss Haze works with your planner and venue team on timing, setup and the run of show.",
      },
    ],
  },

  // Closing booking form, same wording as the city pages' closing CTA.
  inquiry: {
    heading: "Ready to",
    highlight: "Party?",
    text: "Secure your date now for 2026 - 2028",
  },
};
