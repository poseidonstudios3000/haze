import type { CityResourcesContent } from "../types";

// /event-resources/chicago copy. SEO title, description and breadcrumbs live in
// shared/seo.ts. Items with a `url` are linked; the rest show as plain text.
export const chicagoResources: CityResourcesContent = {
  path: "/event-resources/chicago",
  heading: "Chicago Event Resources",
  intro: "Venues, planners, photographers and other vendors DJ Miss Haze works with in Chicago and across Illinois.",
  groups: [
    {
      heading: "Venues in Chicago",
      items: [
        { name: "Walden", url: "https://waldenchicago.com/" },
        { name: "LUXBAR", url: "https://luxbar.com/" },
        { name: "Private Dining by Sepia", url: "https://www.sepiachicago.com/privatedining" },
        { name: "The Wellsley", url: "https://www.wellsleychicago.com/" },
        { name: "The Carter", url: "https://thecarterchicago.com/" },
      ],
    },
    {
      heading: "Venues in the suburbs",
      items: [
        { name: "The Drake", detail: "Oak Brook" },
        { name: "Cantigny Park", detail: "Wheaton" },
        { name: "Morton Arboretum", detail: "Lisle" },
        { name: "Riverside Receptions", detail: "Geneva" },
        { name: "Valladolid Banquet", detail: "Summit" },
      ],
    },
    {
      heading: "Venues further out in Illinois",
      items: [
        { name: "Heritage Harbor", detail: "Ottawa" },
        { name: "Haven on the Farm", detail: "Edwards" },
        { name: "Pear Tree Estate", detail: "Champaign" },
        { name: "Allerton Park", detail: "Monticello" },
      ],
    },
    {
      heading: "Planners",
      items: [
        { name: "C9 Weddings", url: "https://c9weddings.com" },
        { name: "Events by Tess", url: "https://eventsbytess.com" },
        { name: "Hillary Rae Events", url: "https://hr-events-inc.com" },
      ],
    },
    {
      heading: "Photographers",
      items: [
        { name: "Sydney Marie Photography", url: "https://sydneymariephotography.com/" },
        { name: "Christina", url: "https://millieraecophoto.com" },
        { name: "Sherah Grose", url: "https://sherah-g.com" },
      ],
    },
    {
      heading: "Videographers",
      items: [{ name: "Elle and Ashton", detail: "photo and video", url: "https://elleandashton.com" }],
    },
    {
      heading: "Hair and makeup",
      items: [
        { name: "Glam Atelier", url: "https://glamatelier.com" },
        { name: "Nia Dynasty", url: "https://niadynasty.com" },
      ],
    },
    {
      heading: "More vendors",
      items: [
        { name: "Tiffany Moore", detail: "violinist", url: "https://www.tiffanymooreviolin.com/" },
        { name: "99 Hausballoons", detail: "decor and rentals", url: "https://99hausballoons.com" },
      ],
    },
  ],
  overviewLink: { label: "All Event Resources", href: "/event-resources" },
  djPageLink: { label: "Chicago DJ & MC", href: "/chicago-dj" },
};
