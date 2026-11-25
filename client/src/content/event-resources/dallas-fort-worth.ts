import type { CityResourcesContent } from "../types";

// /event-resources/dallas-fort-worth copy. SEO title, description and
// breadcrumbs live in shared/seo.ts. Items with a `url` are linked; the rest
// show as plain text.
export const dallasFortWorthResources: CityResourcesContent = {
  path: "/event-resources/dallas-fort-worth",
  heading: "Dallas-Fort Worth Event Resources",
  intro: "Venues, photographers and other vendors DJ Miss Haze works with in Dallas, Fort Worth and across North Texas.",
  groups: [
    {
      heading: "Venues in Dallas",
      items: [{ name: "The Adolphus" }, { name: "Hickory" }, { name: "Dallas Arboretum" }],
    },
    {
      heading: "Venues in Fort Worth and west",
      items: [
        { name: "4 Eleven", detail: "Fort Worth" },
        { name: "Clark Gardens", detail: "Weatherford" },
      ],
    },
    {
      heading: "Venues north of Dallas",
      items: [
        { name: "NYLO", detail: "Plano" },
        { name: "34 Events", detail: "Plano" },
        { name: "Magnolia Terrace", detail: "Frisco" },
        { name: "Honey Creek Venues", detail: "Celina" },
        { name: "Gardenia Venue", detail: "Valley View" },
        { name: "The Windsor at Hebron Park" },
      ],
    },
    {
      heading: "Venues south of Dallas",
      items: [{ name: "Arrowwood Weddings & Events", detail: "Palmer" }],
    },
    {
      heading: "Photographers",
      items: [
        { name: "Kassandra Jasmine Photography", url: "https://kassandrajasmine.com" },
        { name: "Randi Michelle Photography", url: "https://randimichelle.com" },
      ],
    },
    {
      heading: "More vendors",
      items: [
        { name: "Cat Lauren", detail: "calligraphy", url: "https://catlaurencalligraphy.com" },
        { name: "DNB Andrea", detail: "flower preservation", url: "https://dbandrea.com" },
        { name: "Letty Long", detail: "content creation", url: "https://shopmy.us/lettylong1" },
        { name: "Kristin Hazelwood", detail: "design and branding", url: "https://hazelwoodpaperco.com" },
      ],
    },
  ],
  overviewLink: { label: "All Event Resources", href: "/event-resources" },
  djPageLink: { label: "Dallas DJ & MC", href: "/dallas-dj" },
  serviceLinks: [
    { label: "Dallas Wedding DJ & MC", href: "/dallas-wedding-dj" },
    { label: "Dallas Corporate Event DJ & MC", href: "/dallas-corporate-event-dj" },
  ],
};
