import type { LinkCard } from "../types";

// /event-resources overview copy. SEO title and description live in shared/seo.ts.
export const eventResourcesContent = {
  heading: "Event Resources",
  intro: "Venues, planners, photographers and other vendors DJ Miss Haze works with, city by city.",
  cardCta: "See Vendors",
  cards: [
    {
      title: "Chicago",
      href: "/event-resources/chicago",
      text: "Venues in the city, the suburbs and across Illinois, plus planners, photographers, videographers, hair and makeup and more.",
    },
    {
      title: "Dallas-Fort Worth",
      href: "/event-resources/dallas-fort-worth",
      text: "Venues in Dallas, Fort Worth and North Texas, plus photographers and more.",
    },
    {
      title: "Denver",
      href: "/event-resources/denver",
      text: "Venues in Denver, the mountains, Estes Park and Northern Colorado, plus planners, photographers, videographers and more.",
    },
  ] satisfies LinkCard[],
};
