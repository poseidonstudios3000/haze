import type { CityResourcesContent } from "../types";

// /event-resources/denver copy. SEO title, description and breadcrumbs live in
// shared/seo.ts. Items with a `url` are linked; the rest show as plain text.
export const denverResources: CityResourcesContent = {
  path: "/event-resources/denver",
  heading: "Denver Event Resources",
  intro: "Venues, planners, photographers and other vendors DJ Miss Haze works with in Denver, the mountains and across Colorado.",
  groups: [
    {
      heading: "Venues in Denver",
      items: [
        {
          name: "The Ritz-Carlton, Denver",
          url: "https://www.ritzcarlton.com/en/hotels/denrz-the-ritz-carlton-denver/",
        },
        { name: "Skylight", url: "https://skylight.828venues.com/" },
        { name: "Moss", url: "https://mossdenver.com/" },
        { name: "Ironworks", url: "https://ironworksdenver.co/" },
        { name: "The Curtis" },
        { name: "Mile High Station" },
        { name: "Rooftop 1630" },
        { name: "Denver Botanic Gardens" },
        { name: "Denver Art Museum" },
        { name: "Space Gallery" },
        { name: "Space Annex" },
        { name: "Magnolia Hotel" },
        { name: "Denver Athletic Club" },
      ],
    },
    {
      heading: "Venues south of Denver",
      items: [
        { name: "The Manor House", detail: "Littleton", url: "https://themanorhouse.com/" },
        {
          name: "Arrowhead Golf Club",
          detail: "Littleton",
          url: "https://arcisgolf.com/clubs/arrowhead_golf_club/weddings",
        },
        { name: "Wellshire Event Center", detail: "Littleton" },
        { name: "Hudson Gardens & Event Center", detail: "Littleton" },
        { name: "Highlands Ranch Mansion", detail: "Highlands Ranch" },
        { name: "Cielo at Castle Pines", detail: "Castle Pines", url: "https://www.cielocastlepines.com/" },
        { name: "Spruce Mountain Ranch", detail: "Larkspur", url: "https://sprucemountainevents.com/" },
        { name: "Bonnie Blues", detail: "Elizabeth", url: "https://www.bonniebluesvenue.com/" },
        { name: "Once Upon a Time Events", detail: "Kiowa" },
        { name: "The Broadmoor", detail: "Colorado Springs", url: "https://www.broadmoor.com" },
      ],
    },
    {
      heading: "Venues in the foothills and mountains",
      items: [
        { name: "The Rose Event Center", detail: "Golden" },
        { name: "Willow Ridge Manor", detail: "Morrison" },
        { name: "Woodlands", detail: "Morrison" },
        {
          name: "Evergreen Lake House",
          detail: "Evergreen",
          url: "https://www.evergreenrecreation.com/evergreen-lake-house",
        },
        { name: "Evergreen Red Barn", detail: "Evergreen" },
        { name: "Deer Creek Mountain Camp", detail: "Bailey", url: "https://deercreekmountaincamp.com/" },
      ],
    },
    {
      heading: "Venues in Estes Park",
      items: [
        { name: "The Stanley Hotel", url: "https://www.stanleyhotel.com/" },
        { name: "Della Terra" },
        { name: "Estes Park Resort" },
        { name: "Black Canyon Inn" },
        { name: "The Landing at Estes Park" },
      ],
    },
    {
      heading: "Venues in Northern Colorado",
      items: [
        { name: "The St Vrain", detail: "Longmont" },
        { name: "RiverBend", detail: "Lyons" },
        { name: "Lyons Farmette", detail: "Lyons" },
        { name: "Sylvan Dale Ranch", detail: "Loveland" },
        { name: "Fort Collins Country Club", detail: "Fort Collins" },
        { name: "Windsong Estate Event Center", detail: "Severance" },
        { name: "The Mishawaka", detail: "Bellevue" },
      ],
    },
    {
      heading: "Planners",
      items: [
        { name: "Weddings by Jay", url: "https://weddingsbyjay.com" },
        { name: "Elysian Wed Co", url: "https://elysianwedco.com" },
        { name: "Urban Events Colorado", url: "https://www.urbaneventscolorado.com/" },
        { name: "Full Bloom Events", url: "https://eventsinfullbloom.com" },
      ],
    },
    {
      heading: "Photographers",
      items: [
        { name: "Jill Houser Photography", url: "https://www.jillhouser.com" },
        { name: "Kelsey Kaplan Photography", url: "https://kelseykaplanphoto.com/" },
        { name: "Kaitlin Diana Photography", url: "https://www.kaitlyndianaphotography.com/" },
        { name: "Brody Lee Photography", url: "https://brodyleephoto.com" },
        { name: "Piper", url: "https://tayloredwedding.com" },
        { name: "Pure Bliss Imagery", url: "https://purebissimagery.com/" },
        { name: "Savannah Lauren Photography", url: "https://savannahlaurenphotography.com" },
        { name: "Esmeralda Zavala", url: "https://esmeraldazavala.mypixieset.com" },
        { name: "Whitney Rae", url: "https://bywhitneyrae.com" },
      ],
    },
    {
      heading: "Videographers",
      items: [
        { name: "Piper Allison", url: "https://piperallisonvideo.com" },
        { name: "Jonathan Schroeder Media", url: "https://jschroedermedia.com" },
        { name: "Jess and Doz", detail: "photo and video", url: "https://jessanddoz.com" },
      ],
    },
    {
      heading: "More vendors",
      items: [
        { name: "Plus the Pups", detail: "wedding dog handler", url: "https://plusthepups.com" },
        { name: "Alyce in Flourland", detail: "cake artistry", url: "https://alyceinflourland.com" },
        { name: "Wyld Roots Floral", detail: "florist", url: "https://wyldrootsfloral.com" },
      ],
    },
  ],
  overviewLink: { label: "All Event Resources", href: "/event-resources" },
  djPageLink: { label: "Denver DJ & MC", href: "/denver-dj" },
};
