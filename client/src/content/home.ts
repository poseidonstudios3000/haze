import type { LinkCard, TeaserCopy } from "./types";

// Photos are files in client/public/assets, matched to the city or venue in the
// file name where one exists. width/height = the file's real size. Photos wider
// than 1600px use a web-sized copy ("-1600w.webp", WebP q82); the originals are
// kept untouched next to them. The others are already under 1600px wide. The
// location tile photos are WebP copies (sRGB, q82) of the client's JPEG/HEIC
// uploads ("<City>-DJ-Services.*"), which stay next to them unchanged.

// Homepage copy ("/"). SEO title and description live in shared/seo.ts.
// All wording below is client-approved; change it only on her instruction.

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
    text: "High-energy live mixing and tailored DJ and MC experiences across Illinois, Colorado and Northern Texas.",
    buttonCta: "Explore",
    buttons: [
      {
        title: "Corporate Events",
        href: "/corporate-event-dj",
        text: "On-brand music for Brand activations, Company events, Conferences, Galas, and more.",
      },
      {
        title: "Private Events",
        href: "/private-event-dj",
        text: "Anniversaries, Birthdays, Hosting, and Milestone celebrations.",
      },
      {
        title: "Weddings",
        href: "/wedding-dj",
        text: "Live-mixed from the Ceremony to the Last dance, with afterparty availability.",
      },
      {
        title: "Other Events",
        href: "/event-dj",
        text: "Fashion shows, Pop-ups, Product launches, Sports Events and more.",
      },
    ] satisfies LinkCard[],
  },

  locations: {
    heading: "Choose Your Location",
    cards: [
      {
        title: "Chicago",
        href: "/chicago-dj",
        text: "Home base in Elmhurst, playing in the city and the suburbs plus Central Illinois, Michigan and Wisconsin.",
        image: {
          src: "/assets/Chicagoland-DJ-Services.webp",
          width: 1320,
          height: 1759,
          position: "50% 30%",
        },
      },
      {
        title: "Dallas-Fort Worth",
        href: "/dallas-dj",
        text: "Home base in Dallas, playing in the city and Fort Worth, Blue Ridge, Celina, Frisco, McKinney, Plano and the rest of the Metroplex.",
        image: {
          src: "/assets/Dallas-DJ-Services-1600w.webp",
          width: 1600,
          height: 1744,
          position: "50% 60%",
        },
      },
      {
        title: "Denver",
        href: "/denver-dj",
        text: "Home base in Castle Rock, playing across Denver, and Colorado's mountain venues from Aspen to Boulder, Breckenridge, Colorado Springs, Estes Park, Fort Collins, Loveland, Lyons, Vail, and beyond.",
        image: {
          src: "/assets/Denver-DJ-Services.webp",
          width: 960,
          height: 720,
          position: "45% 30%",
        },
      },
      {
        title: "Destination",
        href: "/destination-dj",
        text: "Events across the U.S. and internationally including Canada, France, Germany, Greece, Italy, Netherlands, Spain, Switzerland and beyond. Inquire for a custom proposal.",
        image: {
          src: "/assets/Destination-DJ-Services-1600w.webp",
          width: 1600,
          height: 1067,
          position: "50% 8%",
        },
      },
    ] satisfies LinkCard[],
  },

  rentals: {
    heading: "Event Rentals",
    text: "Sound systems, microphones, audio guestbooks, photo booths (360 and stationary), mobile photo booth trailer, CO2 cannons.",
    cta: "See Rentals",
    href: "/event-rentals",
    image: {
      src: "/assets/DJ-Miss-Haze-Wedding-DJ-Setup.webp",
      width: 960,
      height: 720,
      position: "50% 50%",
    },
  } satisfies TeaserCopy,

  /** Stats strip right after the "Trusted by Leading Brands" logo strip. */
  credentials: {
    /** `prefix` renders small before the value, so "Up to 5,000 guests" reads as one line. */
    stats: [
      { value: "1,000+", label: "events" },
      { value: "500", label: "weddings" },
      { value: "200", label: "corporate events" },
      { value: "150", label: "private events" },
      { prefix: "Up to", value: "5,000", label: "guests" },
    ] as { prefix?: string; value: string; label: string }[],
    reach: "Performing across the United States, Europe and the Middle East",
    bbb: {
      label: "A+ rated on BBB",
      href: "https://www.bbb.org/us/il/elmhurst/profile/djs/dj-miss-haze-0654-1000119151",
    },
  },

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
