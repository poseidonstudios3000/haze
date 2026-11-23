import type { LinkCard, TeaserCopy } from "./types";

// Homepage copy ("/"). SEO title and description live in shared/seo.ts.
// The hero, banner, "Choose Your Event Experience" heading, its line and the
// four event buttons are the existing, approved wording; the lines under the
// buttons and the sections after them are first drafts.

export const homeContent = {
  hero: {
    /** The page's H1. */
    heading: "Premium Event DJ & MC",
    imageAlt: "DJ Miss Haze Premium Event DJ and MC in Chicago, Dallas, Denver",
    locations: ["Chicago", "Dallas", "Denver"],
  },

  /** Scrolling word banner under the hero (alphabetical). */
  bannerWords: ["Collaborative", "Custom Curated", "Dynamic", "Fun", "Inclusive"],

  eventExperience: {
    heading: "Choose Your Event Experience",
    text: "High-energy live mixing and tailored DJ and MC experiences across Illinois, Colorado and North Texas.",
    buttonCta: "Explore",
    buttons: [
      {
        title: "Corporate Events",
        href: "/corporate-event-dj",
        text: "On-brand music for company parties, galas and conferences.",
      },
      {
        title: "Private Events",
        href: "/private-event-dj",
        text: "Birthdays, anniversaries and milestone celebrations.",
      },
      {
        title: "Weddings",
        href: "/wedding-dj",
        text: "Live-mixed from the ceremony to the last dance.",
      },
      {
        title: "Other Events",
        href: "/event-dj",
        text: "Brand activations, pop-ups and product launches.",
      },
    ] satisfies LinkCard[],
  },

  locations: {
    heading: "Choose Your Location",
    cards: [
      {
        title: "Chicago",
        href: "/chicago-dj",
        text: "Home base in Elmhurst, playing the city and the suburbs.",
      },
      {
        title: "Dallas-Fort Worth",
        href: "/dallas-dj",
        text: "Dallas, Fort Worth, Frisco, Plano and the rest of the Metroplex.",
      },
      {
        title: "Denver",
        href: "/denver-dj",
        text: "Denver, the Front Range and Colorado's mountain venues.",
      },
      {
        title: "Destination",
        href: "/destination-dj",
        text: "Events across the U.S. and abroad.",
      },
    ] satisfies LinkCard[],
  },

  rentals: {
    heading: "Event Rentals",
    text: "Sound systems, microphones, audio guestbooks, photo booths (360 and classic) and CO2 cannons.",
    cta: "See Rentals",
    href: "/event-rentals",
  } satisfies TeaserCopy,

  resources: {
    heading: "Event Resources",
    text: "Trusted venues, planners, photographers and other vendors in Chicago, Dallas-Fort Worth and Denver.",
    cta: "See Resources",
    href: "/event-resources",
  } satisfies TeaserCopy,
};
