import type { LinkCard, TeaserCopy } from "./types";

// Photos are existing files in client/public/assets, matched to the city or
// venue in the file name where one exists. width/height = the file's real size.

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
        image: {
          src: "/assets/DJ-Miss-Haze-Chicago-BsFlPIRw.webp",
          width: 2048,
          height: 1365,
          position: "58% 40%",
        },
      },
      {
        title: "Dallas-Fort Worth",
        href: "/dallas-dj",
        text: "Dallas, Fort Worth, Frisco, Plano and the rest of the Metroplex.",
        // The Gardenia Venue, Valley View, TX
        image: {
          src: "/assets/The-Gardenia-Venue-Valley-View-Texas-Wedding-DJ-Miss-Haze-J6b3gkmq.webp",
          width: 2803,
          height: 3024,
          position: "50% 30%",
        },
      },
      {
        title: "Denver",
        href: "/denver-dj",
        text: "Denver, the Front Range and Colorado's mountain venues.",
        image: {
          src: "/assets/dj-miss-haze-wedding-dj-in-colorado-UyTmhhk5.webp",
          width: 1232,
          height: 822,
          position: "50% 35%",
        },
      },
      {
        title: "Destination",
        href: "/destination-dj",
        text: "Events across the U.S. and abroad.",
        // Corporate event in Kansas City, MO (outside the three home markets)
        image: {
          src: "/assets/Corporate-Event-DJ-Miss-Haze-Kansas-City-MO-BiAYUCHi.webp",
          width: 5047,
          height: 3605,
          position: "50% 62%",
        },
      },
    ] satisfies LinkCard[],
  },

  rentals: {
    heading: "Event Rentals",
    text: "Sound systems, microphones, audio guestbooks, photo booths (360 and classic) and CO2 cannons.",
    cta: "See Rentals",
    href: "/event-rentals",
    image: {
      src: "/assets/DJ-Miss-Haze-Wedding-DJ-Setup.webp",
      width: 960,
      height: 720,
      position: "50% 50%",
    },
  } satisfies TeaserCopy,

  resources: {
    heading: "Event Resources",
    text: "Trusted venues, planners, photographers and other vendors in Chicago, Dallas-Fort Worth and Denver.",
    cta: "See Resources",
    href: "/event-resources",
    image: {
      src: "/assets/DJ-Miss-Haze-Wedding-Venue-C4lopNEW.webp",
      width: 1024,
      height: 1536,
      position: "50% 60%",
    },
  } satisfies TeaserCopy,
};
