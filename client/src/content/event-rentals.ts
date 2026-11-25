import type { ImageSlot, InquiryCopy } from "./types";

// /event-rentals copy. SEO title and description live in shared/seo.ts.
//
// Every item has an `image` slot: leave it undefined until the photo is ready
// (the card shows an icon panel meanwhile), then set { src, alt } with the file
// in client/public/assets. Items with an empty `text` are EMPTY SLOTS for
// Yasmin; the card shows only the title until text is added.

export interface RentalItem {
  /** Stable id, also the anchor on the page (/event-rentals#audio-guestbook). Don't rename. */
  id: string;
  title: string;
  text: string;
  image?: ImageSlot;
}

export interface EventRentalsContent {
  heading: string;
  intro: string;
  items: RentalItem[];
  inquiry: InquiryCopy;
}

export const eventRentalsContent: EventRentalsContent = {
  heading: "Event Rentals",
  intro:
    "Sound systems, microphones, audio guestbooks, photo booths and CO2 cannons for events in Chicago, Dallas-Fort Worth and Denver.",
  items: [
    {
      id: "sound-systems",
      title: "Sound Systems",
      text: "Speakers for speeches, ceremonies and background music.",
      image: undefined,
    },
    {
      id: "microphones",
      title: "Microphones",
      text: "Microphones with stands for toasts, speeches and presentations.",
      image: undefined,
    },
    {
      id: "audio-guestbook",
      title: "Audio Guestbook",
      text: "Guests pick up the phone and leave a voice message for the couple or the host. Comes with a stand.",
      image: undefined,
    },
    {
      id: "360-photo-booth",
      title: "360 Photo Booth",
      // DRAFT: needs Yasmin's OK
      text: "A rotating camera arm records short slow-motion videos of your guests from every angle. A fun way to get people on their feet between sets.",
      image: undefined,
    },
    {
      id: "classic-photo-booth",
      title: "Classic Photo Booth",
      // DRAFT: needs Yasmin's OK
      text: "A photo booth for group shots and candid moments. Guests can take photos throughout the night.",
      image: undefined,
    },
    {
      id: "photo-booth-add-ons",
      title: "Photo Booth Add-Ons",
      text: "Prints, props and a custom layout with your names, date or logo.",
      image: undefined,
    },
    {
      id: "co2-cannons",
      title: "CO2 Cannons",
      // DRAFT: needs Yasmin's OK
      text: "Short bursts of cold CO2 fog for big moments like the grand entrance, the first dance or the peak of the night.",
      image: undefined,
    },
  ],

  // Closing booking form, same wording as the city pages' closing CTA.
  inquiry: {
    heading: "Ready to",
    highlight: "Party?",
    text: "Secure your date now for 2026 - 2028",
  },
};
