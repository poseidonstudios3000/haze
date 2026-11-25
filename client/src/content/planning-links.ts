// "Planning your event?" link block near the end of the city pages and the
// event type pages, pointing to the resource and rentals pages. Wording lives
// here so it can be changed without touching components.

export interface PlanningLinksCopy {
  heading: string;
  links: { label: string; href: string }[];
}

/** City pages (/chicago-dj, /chicago-wedding-dj, /chicago-corporate-event-dj, ...), keyed by city slug. */
export const cityPlanningLinks: Record<"chicago" | "dallas" | "denver", PlanningLinksCopy> = {
  chicago: {
    heading: "Planning your Chicago event?",
    links: [
      { label: "Chicago venues and vendors", href: "/event-resources/chicago" },
      { label: "Event rentals", href: "/event-rentals" },
    ],
  },
  dallas: {
    heading: "Planning your Dallas-Fort Worth event?",
    links: [
      { label: "Dallas-Fort Worth venues and vendors", href: "/event-resources/dallas-fort-worth" },
      { label: "Event rentals", href: "/event-rentals" },
    ],
  },
  denver: {
    heading: "Planning your Denver event?",
    links: [
      { label: "Denver venues and vendors", href: "/event-resources/denver" },
      { label: "Event rentals", href: "/event-rentals" },
    ],
  },
};

/** Event type pages (/wedding-dj, /corporate-event-dj, /private-event-dj, /event-dj). */
export const eventTypePlanningLinks: PlanningLinksCopy = {
  heading: "Planning your event?",
  links: [
    { label: "Venues and vendors by city", href: "/event-resources" },
    { label: "Event rentals", href: "/event-rentals" },
  ],
};

/** The block for a page: the city version when the page has a known city, otherwise the event type version. */
export function getPlanningLinks(city?: string): PlanningLinksCopy {
  const slug = city?.trim().toLowerCase();
  if (slug && slug in cityPlanningLinks) return cityPlanningLinks[slug as keyof typeof cityPlanningLinks];
  return eventTypePlanningLinks;
}
