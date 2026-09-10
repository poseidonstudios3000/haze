import { useQuery } from "@tanstack/react-query";
import type { CorporateContent } from "@shared/schema";

export interface HeroContent {
  subtitle: string;
  locations: string[];
  /** City pages only: tagline under the service line, e.g. "From West Loop Lofts to Lakefront Ballrooms". */
  subline?: string;
  /** City pages only: location badge text, e.g. "CHICAGO, IL". */
  badge?: string;
}

export interface TickerContent {
  items: string[];
}

export interface SignatureContent {
  quote: string;
  description: string;
}

export interface MantraContent {
  title: string;
  quote: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
}

export interface AboutContent {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  footer: string;
}

export interface CTAContent {
  title: string;
  subtitle: string;
  button: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQContent {
  title: string;
  items: FAQItem[];
}

export interface ReviewItem {
  author: string;
  role: string;
  text: string;
  rating?: number;
}

export interface ReviewsContent {
  title: string;
  ratingText: string;
  items: ReviewItem[];
}

export interface EventSections {
  hero: HeroContent;
  ticker: TickerContent;
  signature: SignatureContent;
  mantra: MantraContent;
  about: AboutContent;
  cta: CTAContent;
  faq: FAQContent;
  reviews: ReviewsContent;
}

// === CITY CONTENT ========================================================
// City pages layer their own copy on top of the event-type defaults. Some
// sections override an event section (hero, faq, reviews); the rest are
// city-only (intro, localMarket, logistics, resources) and simply don't
// render on pages that have no city content.

export interface IntroContent {
  /** Italic lead-in question. */
  question?: string;
  /** One or more intro paragraphs. */
  body: string[];
}

export interface LocalMarketBlock {
  /** Bolded lead phrase the sentence continues from, e.g. "West Loop and Fulton Market". */
  label?: string;
  text: string;
}

export interface LocalMarketContent {
  title: string;
  lead?: string;
  blocks: LocalMarketBlock[];
  closing?: string[];
}

export interface LogisticsItem {
  label: string;
  text: string;
}

export interface LogisticsContent {
  title: string;
  items: LogisticsItem[];
}

export interface ResourceCard {
  category: string;
  city: string;
  title: string;
  description: string;
  image?: string;
}

export interface ResourcesContent {
  title: string;
  cards: ResourceCard[];
}

// A city's content for one surface (a service page or its hub). Every section
// is optional. A present section overrides the matching event-type section
// (hero/faq/reviews) or adds a city-only section; missing sections fall back
// to the event-type default.
export interface CitySections {
  hero?: HeroContent;
  intro?: IntroContent;
  localMarket?: LocalMarketContent;
  logistics?: LogisticsContent;
  faq?: FAQContent;
  reviews?: ReviewsContent;
  resources?: ResourcesContent;
}

// The surfaces a city can hold content for: its two service pages and its hub.
export type CityContentKey = "wedding" | "corporate" | "hub";

// What a city+service page renders: the event-type sections with city
// overrides applied, plus the city-only sections attached.
export interface ResolvedCityContent extends EventSections {
  intro?: IntroContent;
  localMarket?: LocalMarketContent;
  logistics?: LogisticsContent;
  resources?: ResourcesContent;
}

export type EventType = "corporate" | "wedding" | "private" | "other";

export const EVENT_TYPES: { key: EventType; label: string; layoutKey: string }[] = [
  { key: "corporate", label: "Corporate", layoutKey: "corporate_event" },
  { key: "wedding", label: "Wedding", layoutKey: "wedding" },
  { key: "private", label: "Private", layoutKey: "private_event" },
  { key: "other", label: "Other / PR Show", layoutKey: "pr_show" },
];

// === PRICING / INVESTMENT ================================================
// Rendered as a visible page section (InvestmentSection), NOT via the FAQ or
// the DB-merged `faq` section — so production DB content can never silently
// replace it. One tier per event type; a page shows the tier for its event
// type, and the hub pages show all tiers. Wording is the client's, verbatim.
export interface PricingTier {
  label: string;
  investment: string;
}

export const PRICING_TIERS: Record<EventType, PricingTier> = {
  wedding: { label: "Weddings", investment: "Investment begins at $3,500 during main season, off-season pricing available" },
  corporate: { label: "Corporate Events", investment: "Investment begins at $2,500" },
  private: { label: "Private Events", investment: "Investment begins at $2,200" },
  other: { label: "Other Events", investment: "priced upon request" },
};

// Shown on every service and city page in event-type order.
export const PRICING_ORDER: EventType[] = ["wedding", "corporate", "private", "other"];

export const PRICING_INCLUDED: string[] = [
  "Custom DJ and MC services",
  "Preparation meetings",
  "Vendor collaboration",
  "Custom song edits for key moments",
  "Full audio setup",
  "Microphone setup",
  "Dance floor lighting",
];

const WEDDING_FAQ: FAQItem[] = [
  { category: "DJ & MC Services", question: "Can you DJ and MC?", answer: "Yes, DJ Miss Haze is a professional DJ with live, dynamic music mixing who also MCs her events and is known to engage the audience while hosting. This is a critical dual role for a seamless wedding. DJ Miss Haze handles all necessary announcements, introductions (with phonetic pronunciation checks), and coordinates with your planner/vendors to ensure every timeline transition (grand entrance, toasts, first dance, etc.) is executed flawlessly and professionally." },
  { category: "DJ & MC Services", question: "How experienced are you with weddings?", answer: "Over the past 7 years, DJ Miss Haze curated almost 500 weddings. She typically covers music from pre-ceremony to the last song/exit. She is also available for wedding afterparties." },
  { category: "DJ & MC Services", question: "How do you keep the dance floor going at my wedding?", answer: "DJ Miss Haze is an experienced professional who treats the dance floor as a dynamic environment. Her reputation is built on quickly assessing the room's energy and adjusting the music in real-time, blending tracks from different eras and genres seamlessly. DJ Miss Haze honors her clients playlist and do-not-playlist and builds out her music framework based on her clients music taste plus guest inclusion. You can trust DJ Miss Haze' expertise to keep everyone engaged, ensuring a vibrant, inclusive and high-energy dance floor." },
  { category: "DJ & MC Services", question: "Can you play multiple genres?", answer: "Absolutely. DJ Miss Haze specializes in Classics, Country, EDM, Hip Hop/Rap, R&B and Soul, Reggaeton, Pop / Top 40. She is also experienced with cultural and culture fusion weddings, including Afrobeats, Latin, Middle Eastern, Indian, Asian and Balkan Music." },
  { category: "DJ & MC Services", question: "How do you handle guest requests?", answer: "Requests are handled thoughtfully, always aligned with the couple's vision and the room's energy." },
  { category: "DJ & MC Services", question: "How involved can we be in the music selection?", answer: "With DJ Miss Haze, you can be as involved as you like to. She is proven to DJ entire events without guidance, and also adheres to playlists and do-not-playlist. You can also work with DJ Miss Haze on custom song edits. She is very experienced editing songs for key moments, such as Ceremony, Grand Entrance, 1st Dance, and more. You set the vision, and DJ Miss Haze delivers." },
  { category: "DJ & MC Services", question: "We have very different music tastes between us, and our guests. How do you manage that?", answer: "DJ Miss Haze specializes in versatility. She excels at curating sets to set the tone for each phase of the wedding and transitions smoothly between phases, genres and energy levels to ensure she always delivers what the crowd needs in the moment. She schedules a detailed consultation and offers unlimited preparation meetings to ensure the music reflects every mood and moment of your special day. Working with DJ Miss Haze, you can choose to collect guest song requests prior to your event to ensure everyone feels included." },
  { category: "DJ & MC Services", question: "Do you play clean only or also songs with explicit lyrics?", answer: "DJ Miss Haze is experienced DJing entirely family-friendly, clean events, and can also deliver events with explicit lyrics. She always complies to her clients preference when it comes to lyrics. Some events start clean and can transition to explicit late in the night. She will assess your thoughts on this important detail and will help guide you in the process." },
  { category: "DJ & MC Services", question: "Are you a traditional Wedding DJ?", answer: "DJ Miss Haze is highly experienced with Weddings, and started her career in various environments such as clubs, concerts, and corporate events. Based on your personal preference, she can deliver a traditional, or non-traditional wedding experience or a mix of both." },
  { category: "Booking", question: "How far in advance should I book?", answer: "It varies by market: 6 to 24 months for weddings in Chicago and Denver, and a shorter 2 to 8 months in Dallas–Fort Worth. DJ Miss Haze is already booking into 2028, so it's worth inquiring early, though she also covers last-minute weddings and same-day emergency DJ services, subject to availability." },
  { category: "Booking", question: "What's the investment to book DJ Miss Haze?", answer: "Wedding investment begins at $3,500 during main season, with off-season pricing available. That covers custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup. Final pricing is confirmed on your first call or Zoom." },
  { category: "Booking", question: "How do we secure booking with DJ Miss Haze?", answer: "Your event date is secured with a signed contract and paid retainer. DJ Miss Haze offers zero-fee payment plans that fit your budgeting needs." },
  { category: "Booking", question: "Which payment methods do you accept?", answer: "DJ Miss Haze offers the following payment methods: ACH, Cash, Check, Credit and Debit Card, Cryptocurrencies, Wire, and Zelle." },
  { category: "Equipment", question: "What equipment do you bring to a wedding?", answer: "DJ Miss Haze brings a professional BOSE speaker system, Shure cordless microphone with mic stand, and dance floor lighting. She includes yard games and glow sticks for free for all wedding clients. All equipment is insured, maintained and tested before every wedding." },
  { category: "Equipment", question: "Which add-ons do you offer?", answer: "DJ Miss Haze offers optional add-ons: a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, and glow sticks, with more available on request. Bundle pricing is available for two items or more." },
  { category: "Locations", question: "Which locations do you service?", answer: "DJ Miss Haze operates out of three hubs: Chicago (Illinois), Dallas Fort Worth (Texas) and Denver (Colorado). She keeps a full set of equipment in every market: lighting, photo booths, fog machine and CO2 cannons at each hub, so nothing has to travel far. Within 100 miles of Chicago, Dallas–Fort Worth and Denver there is no travel surcharge. She is also available for destination weddings anywhere in the world, with a travel fee quoted upfront." },
  { category: "Locations", question: "Do you charge travel fees?", answer: "Weddings in Chicago, Dallas Fort Worth and Denver plus 100 miles radius have ZERO travel fees. Events beyond those regions will be priced upon assessment." },
  { category: "Logistics & Reliability", question: "Are you insured?", answer: "Yes, DJ Miss Haze carries full liability insurance. If your venue requires a Certificate of Insurance, we are happy to provide it directly to them at no extra charge." },
  { category: "Logistics & Reliability", question: "What is your policy on breaks, attire and vendor meal?", answer: "Miss Haze does not take breaks during your event's contracted time and does not consume alcohol while working. She dresses in professional attire appropriate for your wedding's formality. A vendor meal is requested for events lasting 5+ hours to maintain focus and energy throughout the night." },
];

const CORPORATE_FAQ: FAQItem[] = [
  { category: "DJ & MC Services", question: "Can you DJ and MC?", answer: "Yes, DJ Miss Haze is a professional DJ with live, dynamic music mixing who also MCs her events and is known to engage the audience while hosting. This is a critical dual role for a seamless company event. DJ Miss Haze handles all necessary announcements, introductions (with phonetic pronunciation checks), and coordinates with your planner/vendors to ensure every timeline transition (grand entrance, toasts, first dance, etc.) is executed flawlessly and professionally." },
  { category: "DJ & MC Services", question: "How experienced are you with Corporate Events?", answer: "Over the past 10 years, DJ Miss Haze worked over 200 Corporate Events, ranging from medium store events, school events or fashion shows to large company celebrations including Fortune 500 companies. She is also experienced with PR, branding and influencer events and deeply understands how those different event types flow and what the objectives are at each." },
  { category: "DJ & MC Services", question: "How do you keep the dance floor going at a Company Event?", answer: "DJ Miss Haze is an experienced professional who treats the dance floor as a dynamic environment. Her reputation is built on quickly assessing the room's energy and adjusting the music in real-time, blending tracks from different eras and genres seamlessly. She engages in tailored preparation work and deeply caters to the dance floor in front of her, giving her real-time feedback. You can trust DJ Miss Haze' expertise to keep everyone engaged, ensuring a vibrant, inclusive and high-energy dance floor." },
  { category: "DJ & MC Services", question: "Can you play multiple genres?", answer: "Absolutely. DJ Miss Haze specializes in Classics, Country, EDM, Hip Hop/Rap, R&B and Soul, Latin, Pop / Top 40. She is also experienced with cultural and culture fusion events, including Afrobeats, Latin, Middle Eastern, Indian, Asian and Balkan Music. Being German herself, she deeply understands German, UK, Dutch, Eastern European and Spanish / Italian music." },
  { category: "DJ & MC Services", question: "How involved can we be in the music selection?", answer: "With DJ Miss Haze, you can be as involved as you like to. She is proven to DJ entire events without guidance, and also adheres to playlists and do-not-playlist. You can also work with DJ Miss Haze to curate custom song edits. You set the vision, and DJ Miss Haze ties it together at your event." },
  { category: "DJ & MC Services", question: "Our family and guests have very different music tastes. How do you manage that?", answer: "DJ Miss Haze specializes in versatility. She excels at curating sets to set the tone for each phase of the event and transitions smoothly between phases, genres and energy levels to ensure she always delivers what the crowd needs in the moment. She schedules a detailed consultation and offers unlimited preparation meetings to ensure the music reflects every mood and moment of your special day. Working with DJ Miss Haze, you can choose to collect guest song requests prior to your event to ensure everyone feels included." },
  { category: "DJ & MC Services", question: "Do you play clean only or also songs with explicit lyrics?", answer: "DJ Miss Haze is experienced DJing entirely family-friendly, clean events, and can also deliver events with explicit lyrics, or a combination of both. She always complies to her clients preference when it comes to lyrics. Some events start clean and can transition to explicit late in the night. She will assess your thoughts on this important detail and will help guide you in the process. Her recommendation is to keep lyrics clean, or on the low end of the spectrum at a Corporate Event to provide elegance and inclusion through music." },
  { category: "Booking", question: "How far in advance should I book?", answer: "Typically 2 to 4 months for corporate events, though the first two weeks of December book much further out. DJ Miss Haze is already taking 2028 dates, so inquire early. She also covers last-minute events and same-day emergency DJ services, subject to availability." },
  { category: "Booking", question: "What's the investment to book DJ Miss Haze?", answer: "Corporate event investment begins at $2,500, covering custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup. Final pricing is confirmed on your first call or Zoom." },
  { category: "Booking", question: "How do we secure booking with DJ Miss Haze?", answer: "Your event date is secured with a signed contract and paid retainer." },
  { category: "Booking", question: "Which payment methods do you accept?", answer: "DJ Miss Haze offers the following payment methods: ACH, Cash, Check, Credit and Debit Card, Cryptocurrencies, Wire, and Zelle." },
  { category: "Equipment", question: "What equipment do you bring to a Corporate Event?", answer: "DJ Miss Haze brings a professional BOSE speaker system, Shure cordless microphone with mic stand, and dance floor lighting. All equipment is insured, maintained and tested before every event." },
  { category: "Equipment", question: "Which add-ons do you offer?", answer: "DJ Miss Haze offers optional add-ons: a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, and glow sticks, with more available on request. Bundle pricing is available for two items or more." },
  { category: "Locations", question: "Which locations do you service?", answer: "DJ Miss Haze operates out of three hubs: Chicago (Illinois), Dallas Fort Worth (Texas) and Denver (Colorado). She keeps a full set of equipment in every market: lighting, photo booths, fog machine and CO2 cannons at each hub, so nothing has to travel far. Within 100 miles of Chicago, Dallas–Fort Worth and Denver there is no travel surcharge. She is also available for destination events anywhere in the world, with a travel fee quoted upfront." },
  { category: "Locations", question: "Do you charge travel fees?", answer: "Events in Chicago, Dallas Fort Worth and Denver plus 100 miles radius have ZERO travel fees. Events beyond are subject to travel fees." },
  { category: "Logistics & Reliability", question: "Are you insured?", answer: "Yes, DJ Miss Haze carries full liability insurance. If your venue requires a Certificate of Insurance, we are happy to provide it directly to them at no extra charge." },
  { category: "Logistics & Reliability", question: "What is your policy on breaks, attire and vendor meal?", answer: "Miss Haze does not take breaks during your event's contracted time and does not consume alcohol. She dresses in professional attire appropriate for your company event's formality. A vendor meal is requested for events lasting 5+ hours to maintain focus and energy throughout the night." },
];

const PRIVATE_FAQ: FAQItem[] = [
  { category: "DJ & MC Services", question: "Can you DJ and MC?", answer: "Yes, DJ Miss Haze is a professional DJ with live, dynamic music mixing who also MCs her events and is known to engage the audience while hosting. She handles all necessary announcements and coordinates with your planner/vendors to ensure every moment is executed flawlessly." },
  { category: "DJ & MC Services", question: "How experienced are you with Private Events?", answer: "DJ Miss Haze has extensive experience with private events including birthdays, anniversaries, holiday parties, and intimate gatherings across Chicago, Dallas-Fort Worth, and Denver." },
  { category: "DJ & MC Services", question: "Can you play multiple genres?", answer: "Absolutely. DJ Miss Haze specializes in Classics, Country, EDM, Hip Hop/Rap, R&B and Soul, Reggaeton, Pop / Top 40. She is also experienced with cultural music, including Afrobeats, Latin, Middle Eastern, Indian, Asian and Balkan Music." },
  { category: "DJ & MC Services", question: "How involved can we be in the music selection?", answer: "With DJ Miss Haze, you can be as involved as you like. She is proven to DJ entire events without guidance, and also adheres to playlists and do-not-playlist. You set the vision, and DJ Miss Haze delivers." },
  { category: "Booking", question: "How far in advance should I book?", answer: "Typically 1 to 6 months for private events. DJ Miss Haze is already booking into 2028, so inquire early. Last-minute and same-day emergency bookings are possible, subject to availability." },
  { category: "Booking", question: "What's the investment to book DJ Miss Haze?", answer: "Private event investment begins at $2,200, covering custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup. Final pricing is confirmed on your first call or Zoom." },
  { category: "Booking", question: "Which payment methods do you accept?", answer: "DJ Miss Haze offers the following payment methods: ACH, Cash, Check, Credit and Debit Card, Cryptocurrencies, Wire, and Zelle." },
  { category: "Equipment", question: "What equipment do you bring?", answer: "DJ Miss Haze brings a professional BOSE speaker system, Shure cordless microphone with mic stand, and dance floor lighting. All equipment is insured, maintained and tested before every event." },
  { category: "Equipment", question: "Which add-ons do you offer?", answer: "DJ Miss Haze offers optional add-ons: a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, and glow sticks, with more available on request. Bundle pricing is available for two items or more." },
  { category: "Locations", question: "Which locations do you service?", answer: "DJ Miss Haze operates out of three hubs: Chicago (Illinois), Dallas Fort Worth (Texas) and Denver (Colorado). She is also available for destination events anywhere in the world." },
  { category: "Locations", question: "Do you charge travel fees?", answer: "Events in Chicago, Dallas Fort Worth and Denver plus 100 miles radius have ZERO travel fees. Events beyond those regions will be priced upon assessment." },
  { category: "Logistics & Reliability", question: "Are you insured?", answer: "Yes, DJ Miss Haze carries full liability insurance. If your venue requires a Certificate of Insurance, we are happy to provide it directly to them at no extra charge." },
];

const OTHER_FAQ: FAQItem[] = [
  { category: "DJ & MC Services", question: "Can you DJ and MC?", answer: "Yes, DJ Miss Haze is a professional DJ with live, dynamic music mixing who also MCs her events and is known to engage the audience while hosting. This is a critical dual role for a seamless event. DJ Miss Haze handles all necessary announcements, introductions (with phonetic pronunciation checks), and coordinates with your planner/vendors to ensure every timeline transition (grand entrance, toasts, first dance, etc.) is executed flawlessly and professionally." },
  { category: "DJ & MC Services", question: "How experienced are you with events?", answer: "Over the past 16 years, DJ Miss Haze curated 500+ events, from club nights to sports events, fashion shows, galas, fundraisers, pop-ups and more." },
  { category: "DJ & MC Services", question: "How do you keep the dance floor going at my specific event?", answer: "DJ Miss Haze is an experienced professional who treats the dance floor as a dynamic environment. Her reputation is built on quickly assessing the room's energy and adjusting the music in real-time, blending tracks from different eras and genres seamlessly. DJ Miss Haze honors her clients playlist and do-not-playlist and builds out her music framework based on her clients music taste plus guest inclusion. You can trust DJ Miss Haze' expertise to keep everyone engaged, ensuring a vibrant, high-energy dance party without relying on a pre-set, unchangeable mix." },
  { category: "DJ & MC Services", question: "Can you play multiple genres?", answer: "Absolutely. DJ Miss Haze specializes in Classics, Country, EDM, Hip Hop/Rap, R&B and Soul, Reggaeton, Pop / Top 40. She is also experienced with cultural and culture fusion events, including Afrobeats, Latin, Middle Eastern, Indian, Asian and Balkan Music. She is known for her deep knowledge of music, versatility and ability to blend various music flavors into a single event with flow." },
  { category: "DJ & MC Services", question: "How do you handle guest requests?", answer: "Requests are handled thoughtfully, always aligned with the host's vision and the room's energy." },
  { category: "DJ & MC Services", question: "How involved can we be in the music selection?", answer: "With DJ Miss Haze, you can be as involved as you like to. She is proven to DJ entire events without guidance, and also adheres to playlists and do-not-playlist. You can also work with DJ Miss Haze on custom song edits. She is very experienced editing songs for key moments as well." },
  { category: "DJ & MC Services", question: "We have very different music tastes among our guests. How do you manage that?", answer: "DJ Miss Haze specializes in versatility. She excels at curating sets to set the tone for any event type and transitions smoothly between phases, genres and energy levels to ensure she always delivers what the crowd needs in the moment." },
  { category: "DJ & MC Services", question: "Do you play clean only or also songs with explicit lyrics?", answer: "DJ Miss Haze is experienced DJing entirely family-friendly, clean events, and can also deliver events with explicit lyrics. She always complies to her clients preference when it comes to lyrics." },
  { category: "Booking", question: "How far in advance should I book?", answer: "Typically 1 to 6 months for other event types. DJ Miss Haze is already booking into 2028, so inquire early. Last-minute and same-day emergency services are available, subject to availability." },
  { category: "Booking", question: "What's the investment to book DJ Miss Haze?", answer: "Other events are priced upon request, since they range so widely. Every booking includes custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup. Request a proposal and DJ Miss Haze will put together pricing for your event." },
  { category: "Booking", question: "How do we secure booking with DJ Miss Haze?", answer: "Your event date is secured with a signed contract and paid retainer. DJ Miss Haze offers zero-fee payment plans that fit your budgeting needs." },
  { category: "Booking", question: "Which payment methods do you accept?", answer: "DJ Miss Haze offers the following payment methods: ACH, Cash, Check, Credit and Debit Card, Cryptocurrencies, Wire, and Zelle." },
  { category: "Equipment", question: "What equipment do you bring to an event?", answer: "DJ Miss Haze brings a professional BOSE speaker system, Shure cordless microphone with mic stand, and dance floor lighting. All equipment is insured, maintained and tested before every event." },
  { category: "Equipment", question: "Which add-ons do you offer?", answer: "DJ Miss Haze offers optional add-ons: a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, and glow sticks, with more available on request. Bundle pricing is available for two items or more." },
  { category: "Locations", question: "Which locations do you service?", answer: "DJ Miss Haze operates out of three hubs: Chicago (Illinois), Dallas Fort Worth (Texas) and Denver (Colorado). She keeps a full set of equipment in every market: lighting, photo booths, fog machine and CO2 cannons at each hub, so nothing has to travel far. Within 100 miles of Chicago, Dallas–Fort Worth and Denver there is no travel surcharge. She is also available for events anywhere in the world, with a travel fee quoted upfront." },
  { category: "Locations", question: "Do you charge travel fees?", answer: "Events in Chicago, Dallas Fort Worth and Denver plus 100 miles radius have ZERO travel fees. Events beyond those regions will be priced individually." },
  { category: "Logistics & Reliability", question: "Are you insured?", answer: "Yes, DJ Miss Haze carries full liability insurance. If your venue requires a Certificate of Insurance, we are happy to provide it directly to them at no extra charge." },
  { category: "Logistics & Reliability", question: "What is your policy on breaks, attire and vendor meal?", answer: "Miss Haze does not take breaks during your event's contracted time and does not consume alcohol. She dresses in professional attire appropriate for your event's formality. A vendor meal is requested for events lasting 5+ hours to maintain focus and energy throughout the night." },
];

const SHARED_ABOUT: AboutContent = {
  title: "ABOUT",
  paragraph1: "DJ Miss Haze was born and raised in Germany, where she officially started her DJ career in 2010 after a decade of recording mixtapes for her family, friends and ultimately across her entire hometown. As a daughter to parents with an impressive vinyl collection, she organically engaged and deeply connected with music from an early age. Her brother who started DJing as a teenager inspired her to continue leveraging her deep connection to music and people as a DJ herself. She bought her own set of Technics 1200s in 2009 and practiced beat-matching and various forms of music blending daily.",
  paragraph2: "Her career started out as a Club DJ in a highly competitive club environment in Frankfurt, Germany. DJ Miss Haze also organized her own club and concert events across Europe, which connected her with record labels, international agencies, and media. Besides launching the 1st ever radio show dedicated to Hip Hop R&B on German Radio, she also worked with renowned artists such as Kendrick Lamar, Trey Songz, Lloyd, Snap!, Mario and others as their Tour DJ.",
  paragraph3: "In 2014, she started receiving steady work as a Corporate Event DJ and a year later took on her 1st gig as a wedding DJ. She moved to the U.S. in 2019 and has since established herself as a top choice for weddings, corporate, and private events due to her unmatched diverse DJ experience and relentless focus on the client and guest experience.",
  footer: "AVAILABLE IN CHICAGO, DALLAS FORT WORTH, DENVER & BEYOND",
};

const SHARED_MANTRA: MantraContent = {
  title: "MANTRA",
  quote: "PRESENCE, INTENTION, & LEADERSHIP.",
  subtitle: "Every event is approached with mindfulness, balance, and care - and 200% of my energy.",
  paragraph1: "DJ Miss Haze believes in the power of conscious curation. She approaches events with the same guideline as she does her personal life: with presence, intention, emotional awareness, focus and calm leadership. She welcomes and respects all cultures, religions, identities, and orientations.",
  paragraph2: "DJ Miss Haze applies the same principles and high ethical standards she has for her personal life to her work as a DJ. She exemplifies authenticity and integrity. With her, you will not just book a DJ. You will partner with an experienced DJ and event host who masters the art of reading, and leading the room.",
};

export const DEFAULT_EVENT_CONTENT: Record<EventType, EventSections> = {
  corporate: {
    hero: {
      subtitle: "Corporate Event DJ & MC",
      locations: ["Chicago", "Dallas", "Denver"],
    },
    ticker: {
      items: ["HIGH-ENERGY", "CLASSY & TIMELESS", "BOLD & ECLECTIC", "SOPHISTICATED", "VERSATILE", "FUN & INCLUSIVE"],
    },
    signature: {
      quote: "DJ Miss Haze delivers a premium experience that aligns with your brand and engages your audience.",
      description: "Specializing in Corporate Events across Chicago, Dallas–Fort Worth, and Denver plus surrounding areas, DJ Miss Haze is trusted by companies, agencies, and event planners who expect professionalism, adaptability, and premium sound design. She is also available for nationwide and destination travel.",
    },
    mantra: { ...SHARED_MANTRA },
    about: { ...SHARED_ABOUT },
    cta: {
      title: "READY TO BOOST YOUR BRAND?",
      subtitle: "Secure your date now for 2026 - 2028",
      button: "Inquire Now",
    },
    faq: {
      title: "FREQUENTLY ASKED",
      items: [...CORPORATE_FAQ],
    },
    reviews: {
      title: "BRAND REVIEWS",
      ratingText: "5.0 stars",
      items: [
        { author: "Jasmine", role: "Chicago, IL / Famous Streetwear x Converse Influencer Event", text: "DJ Miss Haze was such a pleasure to work with for an event we hosted last month. She was very responsive, helped execute our vision for the event and brought amazing positive energy and fun vibes! Everyone was raving about her incredibly curated playlist and I would absolutely recommend her for any future events.", rating: 5 },
        { author: "Rilie", role: "Kansas City, MO / JE Dunn", text: "We had the absolute best time with DJ Miss Haze at our company Holiday Party! I first met her at my friend Haleys wedding (where the dance floor was packed all night) and knew immediately that I had to have her at our event. She completely delivered, professional, fun, and SUCH a vibe from start to finish. She read the room perfectly, kept the energy high, and had everyone from the interns to the execs dancing like no one was watching. People are still talking about how good the music was. She brought that cool-but-polished energy we were hoping for and truly elevated the whole night. If youre even thinking about booking her, DO IT. 10/10 recommend!", rating: 5 },
        { author: "Wendy", role: "Denver, CO / Denver Art Museum", text: "DJ Miss Haze recently played for a fundraising gala at the Denver Art Museum, and she was incredible at creating an energetic vibe. She was so great to work with and had all our guests up and dancing and enjoying the night. I highly recommend DJ Miss Haze for any event!", rating: 5 },
        { author: "Jessi", role: "Chicago, IL / Event Manager", text: "DJ Miss Haze has been the DJ for multiple work events and she is AMAZING! She brings such a positive vibe and knows how to keep the party going.", rating: 5 },
        { author: "Anna", role: "Denver, Colorado / Karter School", text: "We had DJ Haze at our school holiday party, and she was absolutely amazing! She kept the energy alive from start to finish, and the music was perfectly on point for the crowd. Everyone had such a great time dancing and celebrating - she really made the party unforgettable. Highly recommend her for any event where you want the vibe to stay fun and upbeat!", rating: 5 },
        { author: "Nisha", role: "Chicago, Illinois / University of Chicago", text: "DJ Miss Haze was the perfect choice for playing at our graduate schools 125-person event in Chicagos River North. Yasmin listened carefully to what we had in mind, asked thoughtful questions, and was a pleasure to meet and talk to in-person! All communications and setup went totally smoothly. We also absolutely loved the music she was playing and she gauged the audience perfectly. 10/10 would hire again!", rating: 5 },
        { author: "Chris", role: "Denver, CO / Magnolia", text: "We had a wonderful time with DJ Miss Haze and the services she provided for our holiday party at The Magnolia Denver. She was very responsive, allowed us to provide a playlist in advance, and had everyone dancing! Thank you for making it special!", rating: 5 },
      ],
    },
  },
  wedding: {
    hero: {
      subtitle: "Wedding DJ & MC",
      locations: ["Chicago", "Dallas", "Denver"],
    },
    ticker: {
      items: ["HIGH-ENERGY", "CLASSY & TIMELESS", "BOLD & ECLECTIC", "SOPHISTICATED", "ROMANTIC", "FUN & INCLUSIVE"],
    },
    signature: {
      quote: "Are you seeking a Wedding experience that feels effortless, joyful and deeply personal?",
      description: "DJ Miss Haze is ready to bring her signature skill, reliability, and energy as both your DJ and MC at your wedding in Chicago, Dallas Fort Worth, Denver and beyond. Secure your date with DJ Miss Haze as your Female Wedding DJ now.",
    },
    mantra: { ...SHARED_MANTRA },
    about: { ...SHARED_ABOUT },
    cta: {
      title: "READY TO GET MARRIED?",
      subtitle: "Secure your date now for 2026 - 2028",
      button: "Inquire Now",
    },
    faq: {
      title: "FREQUENTLY ASKED",
      items: [...WEDDING_FAQ],
    },
    reviews: {
      title: "WEDDING REVIEWS",
      ratingText: "5.0 stars",
      items: [
        { author: "Amanda", role: "Dallas Fort Worth, Texas @ NYLO, Plano", text: "From the very first planning call to the final song of the night, DJ Miss Haze exceeded every expectation we had. She brought so much knowledge and creativity to the pre-wedding process — helping us pick the perfect songs, offering thoughtful suggestions, and even helping us design moments we didn't even know we needed. She's professional, vibrant, and truly committed to making your wedding unforgettable. If you're lucky enough to book her — DO IT.", rating: 5 },
        { author: "Alexa", role: "Denver, Colorado @ Estes Park Resort", text: "DJ Miss Haze DJ'd our wedding and was incredible to work with from our initial call all the way through after our wedding, sharing photos and videos and checking in with us! She's the best hype woman and truly understood the assignment for our wedding. We had a wide variety of music we wanted to play and she integrated it all flawlessly. During the planning process, she was so helpful since (like a lot of people) we had never done this before! She is professional, fun and easy to collaborate with. I would highly recommend hiring her for any event you are planning!", rating: 5 },
        { author: "Christine", role: "Chicago, IL @ Luxbar, Chicago", text: "DJ Miss Haze was absolutely phenomenal at our wedding! From start to finish, she made the entire experience so special for us. She took the time to meet with us multiple times before our big day to ensure everything was just right and so she really got to know us as a couple. The music was perfectly curated to match the vibe we envisioned, and she kept the energy up throughout the night. DJ Miss Haze played at both our main event and our official afterparty and was able to create two completely different vibes!", rating: 5 },
        { author: "Austin", role: "Denver, Colorado @ Deer Creek Mountain Camp, Bailey CO", text: "We had so much fun working with DJ Miss Haze. She made personalized mixes and was always down to get creative. She also brought up the idea of an anniversary dance where couples were weeded off the dance floor until it was only my grandparents (together 65 years), at which point she surprised them by transitioning to their first dance song. She was amazing at reading the room and had the dance floor popping literally the entire evening – we never had less than 30 people on the dance floor!!! Highly, highly recommend DJ Miss Haze. Wow!", rating: 5 },
      ],
    },
  },
  private: {
    hero: {
      subtitle: "Private Event DJ & MC",
      locations: ["Chicago", "Dallas", "Denver"],
    },
    ticker: {
      items: ["HIGH-ENERGY", "LIVE-MIXED", "PERSONALIZED", "SOPHISTICATED", "FUN", "CURATED"],
    },
    signature: {
      quote: "Every private celebration deserves an atmosphere that feels both exclusive and effortlessly fun.",
      description: "Specializing in Private Events across Chicago, Dallas–Fort Worth, and Denver plus surrounding areas, DJ Miss Haze brings sophistication and energy to birthdays, anniversaries, holiday parties, and intimate gatherings. Whether it's an elegant cocktail affair or a high-energy dance party, she curates the perfect vibe for you and your guests. Available for nationwide and destination travel.",
    },
    mantra: { ...SHARED_MANTRA },
    about: { ...SHARED_ABOUT },
    cta: {
      title: "READY TO CELEBRATE?",
      subtitle: "Secure your date now for 2026 - 2028",
      button: "Inquire Now",
    },
    faq: {
      title: "FREQUENTLY ASKED",
      items: [...PRIVATE_FAQ],
    },
    reviews: {
      title: "EVENT REVIEWS",
      ratingText: "5.0 stars",
      items: [
        { author: "Rosy", role: "Naperville, IL", text: "DJ Miss Haze was wonderful to work with. Very punctual, professional, friendly with our guests and most important, she played amazing music. I HIGHLY recommend her to be your next DJ.", rating: 5 },
        { author: "JM", role: "Denver, CO", text: "We used DJ Miss Haze for our elopement reception and she was amazing! We decided within a month of our reception to get a DJ and she was so accommodating and easy to work with. She answered all our questions and stayed in contact up until the reception. She is personable and easy to talk to and all our guests commented on how great she was. We would highly recommend her for anything party! And we would for sure use her again.", rating: 5 },
        { author: "Marisa", role: "Vail, CO", text: "Where do I begin?!?! You MUST book DJ Haze for your next event! She is absolutely top notch as a person and as a musician. She was kind and responsive from the very first time we communicated. She was open to our ideas for the atmosphere that we wanted to create through her music. The party ended up being beyond our wildest expectations and it was because of her and her music. Our guests didn't want the night to end!!!! Please book her for your next important event, you will be really glad you did. We will definitely use her again and she has even become our friend. She is a wonderful person and has an amazing ear for good music. If I could give her more than 5 stars I would!!!", rating: 5 },
        { author: "Nikki", role: "Frisco, TX", text: "She is a phenomenal DJ! We have added Miss Haze to our preferred vendor list! She really knows how to get a party started and read the room! I can't thank her enough for the amazing jobs she does for our events!", rating: 5 },
      ],
    },
  },
  other: {
    hero: {
      subtitle: "Event DJ & MC",
      locations: ["Chicago", "Dallas", "Denver"],
    },
    ticker: {
      items: ["HIGH-ENERGY", "CLASSY & TIMELESS", "BOLD & ECLECTIC", "SOPHISTICATED", "ON BRAND", "FUN & INCLUSIVE"],
    },
    signature: {
      quote: "From red carpets to brand activations, DJ Miss Haze commands the room with style and precision.",
      description: "Specializing in PR Shows, Brand Activations, and High-Profile Events across Chicago, Dallas–Fort Worth, and Denver plus surrounding areas, DJ Miss Haze collaborates with publicists, brands, and creative agencies to deliver experiences people talk about afterwards. Her ability to elevate any space with curated sound design makes her the go-to choice for launches, galas, and exclusive showcases. Available for nationwide and international travel.",
    },
    mantra: { ...SHARED_MANTRA },
    about: { ...SHARED_ABOUT },
    cta: {
      title: "READY TO PARTY?",
      subtitle: "Secure your date now for 2026 - 2028",
      button: "Inquire Now",
    },
    faq: {
      title: "FREQUENTLY ASKED",
      items: [...OTHER_FAQ],
    },
    reviews: {
      title: "EVENT REVIEWS",
      ratingText: "5.0 stars",
      items: [
        { author: "Sarah M.", role: "Chicago, IL / Gala Host", text: "DJ Miss Haze made our Gala Event the talk of the town. She read the room perfectly and kept everyone dancing all night long.", rating: 5 },
        { author: "Marcus T.", role: "Denver, CO / Sports Event Promoter", text: "Incredible energy and professionalism. She knows exactly how to get the party started and keep it going!", rating: 5 },
        { author: "Elena R.", role: "Dallas, TX / Event Planner", text: "I've worked with many DJs over the years, and DJ Miss Haze is truly one of the best. Professional, talented, and always brings the perfect vibe.", rating: 5 },
      ],
    },
  },
};

// === CITY CONTENT (Chicago / Dallas / Denver) ===========================
// City order is alphabetical everywhere — Chicago, Dallas, Denver — which is
// also her stated order of importance.
//
// PRESENCE: DJ Miss Haze is Chicago-based (confirmed). She splits time between
// Chicago and Denver in summer and fall, and travels to Dallas–Fort Worth
// mainly in winter but is available there year-round. She keeps a full set of
// equipment in each market — a selling point surfaced on the city pages and FAQ.
//
// VENUES: the Chicago, Denver and Dallas copy below all name client-confirmed
// venues, and every market's list is now final — nothing further pending. Denver
// and Dallas were both expanded from the client's full venue lists (Denver adds
// cultural, downtown and northern-reach venues; Dallas moves from market-only to
// named venues right across the metroplex).
// SERVICE AREAS: the client supplied complete service-area lists per market;
// these are woven through the local-market copy and the travel FAQs, since they
// carry more local-search weight than venue names.

// Genuine Chicago / Chicagoland testimonials, reused from the event reviews
// above filtered to the city. Never place a Denver or Texas location on a
// Chicago page.
const CHICAGO_WEDDING_REVIEWS: ReviewItem[] = [
  { author: "Christine", role: "Chicago, IL @ Luxbar, Chicago", text: "DJ Miss Haze was absolutely phenomenal at our wedding! From start to finish, she made the entire experience so special for us. She took the time to meet with us multiple times before our big day to ensure everything was just right and so she really got to know us as a couple. The music was perfectly curated to match the vibe we envisioned, and she kept the energy up throughout the night. DJ Miss Haze played at both our main event and our official afterparty and was able to create two completely different vibes!", rating: 5 },
  { author: "Rosy", role: "Naperville, IL", text: "DJ Miss Haze was wonderful to work with. Very punctual, professional, friendly with our guests and most important, she played amazing music. I HIGHLY recommend her to be your next DJ.", rating: 5 },
];

const CHICAGO_CORPORATE_REVIEWS: ReviewItem[] = [
  { author: "Jasmine", role: "Chicago, IL / Famous Streetwear x Converse Influencer Event", text: "DJ Miss Haze was such a pleasure to work with for an event we hosted last month. She was very responsive, helped execute our vision for the event and brought amazing positive energy and fun vibes! Everyone was raving about her incredibly curated playlist and I would absolutely recommend her for any future events.", rating: 5 },
  { author: "Jessi", role: "Chicago, IL / Event Manager", text: "DJ Miss Haze has been the DJ for multiple work events and she is AMAZING! She brings such a positive vibe and knows how to keep the party going.", rating: 5 },
  { author: "Nisha", role: "Chicago, Illinois / University of Chicago", text: "DJ Miss Haze was the perfect choice for playing at our graduate schools 125-person event in Chicagos River North. Yasmin listened carefully to what we had in mind, asked thoughtful questions, and was a pleasure to meet and talk to in-person! All communications and setup went totally smoothly. We also absolutely loved the music she was playing and she gauged the audience perfectly. 10/10 would hire again!", rating: 5 },
];

// Badge-row chips for the city hero: her real Chicagoland service areas.
const CHICAGO_HERO_LOCATIONS = ["Chicago", "Naperville", "Oak Brook", "Glenview", "Hinsdale"];

// --- Denver / Colorado testimonials (genuine, from the event reviews above) ---
// Confirmed Denver venues from these reviews: Estes Park Resort (Alexa) and
// Deer Creek Mountain Camp / Bailey (Austin). Vail is a location, not a venue.
const DENVER_WEDDING_REVIEWS: ReviewItem[] = [
  { author: "JM", role: "Denver, CO", text: "We used DJ Miss Haze for our elopement reception and she was amazing! We decided within a month of our reception to get a DJ and she was so accommodating and easy to work with. She answered all our questions and stayed in contact up until the reception. She is personable and easy to talk to and all our guests commented on how great she was. We would highly recommend her for anything party! And we would for sure use her again.", rating: 5 },
  { author: "Marisa", role: "Vail, CO", text: "Where do I begin?!?! You MUST book DJ Haze for your next event! She is absolutely top notch as a person and as a musician. She was kind and responsive from the very first time we communicated. She was open to our ideas for the atmosphere that we wanted to create through her music. The party ended up being beyond our wildest expectations and it was because of her and her music. Our guests didn't want the night to end!!!! Please book her for your next important event, you will be really glad you did. We will definitely use her again and she has even become our friend. She is a wonderful person and has an amazing ear for good music. If I could give her more than 5 stars I would!!!", rating: 5 },
  { author: "Alexa", role: "Denver, Colorado @ Estes Park Resort", text: "DJ Miss Haze DJ'd our wedding and was incredible to work with from our initial call all the way through after our wedding, sharing photos and videos and checking in with us! She's the best hype woman and truly understood the assignment for our wedding. We had a wide variety of music we wanted to play and she integrated it all flawlessly. During the planning process, she was so helpful since (like a lot of people) we had never done this before! She is professional, fun and easy to collaborate with. I would highly recommend hiring her for any event you are planning!", rating: 5 },
  { author: "Austin", role: "Denver, Colorado @ Deer Creek Mountain Camp, Bailey CO", text: "We had so much fun working with DJ Miss Haze. She made personalized mixes and was always down to get creative. She also brought up the idea of an anniversary dance where couples were weeded off the dance floor until it was only my grandparents (together 65 years), at which point she surprised them by transitioning to their first dance song. She was amazing at reading the room and had the dance floor popping literally the entire evening – we never had less than 30 people on the dance floor!!! Highly, highly recommend DJ Miss Haze. Wow!", rating: 5 },
];

const DENVER_CORPORATE_REVIEWS: ReviewItem[] = [
  { author: "Wendy", role: "Denver, CO / Denver Art Museum", text: "DJ Miss Haze recently played for a fundraising gala at the Denver Art Museum, and she was incredible at creating an energetic vibe. She was so great to work with and had all our guests up and dancing and enjoying the night. I highly recommend DJ Miss Haze for any event!", rating: 5 },
  { author: "Anna", role: "Denver, Colorado / Karter School", text: "We had DJ Haze at our school holiday party, and she was absolutely amazing! She kept the energy alive from start to finish, and the music was perfectly on point for the crowd. Everyone had such a great time dancing and celebrating - she really made the party unforgettable. Highly recommend her for any event where you want the vibe to stay fun and upbeat!", rating: 5 },
  { author: "Chris", role: "Denver, CO / Magnolia", text: "We had a wonderful time with DJ Miss Haze and the services she provided for our holiday party at The Magnolia Denver. She was very responsive, allowed us to provide a playlist in advance, and had everyone dancing! Thank you for making it special!", rating: 5 },
];

// Badge-row chips: her real Colorado service areas.
const DENVER_HERO_LOCATIONS = ["Denver", "Vail", "Estes Park", "Breckenridge"];

// --- Dallas–Fort Worth / Texas testimonials (genuine, from the reviews above) ---
// Confirmed DFW venue from these reviews: NYLO Plano (Amanda). Only two genuine
// Texas testimonials exist in the repo, so the DFW pages reuse both.
const DALLAS_WEDDING_REVIEWS: ReviewItem[] = [
  { author: "Amanda", role: "Dallas Fort Worth, Texas @ NYLO, Plano", text: "From the very first planning call to the final song of the night, DJ Miss Haze exceeded every expectation we had. She brought so much knowledge and creativity to the pre-wedding process — helping us pick the perfect songs, offering thoughtful suggestions, and even helping us design moments we didn't even know we needed. She's professional, vibrant, and truly committed to making your wedding unforgettable. If you're lucky enough to book her — DO IT.", rating: 5 },
  { author: "Nikki", role: "Frisco, TX", text: "She is a phenomenal DJ! We have added Miss Haze to our preferred vendor list! She really knows how to get a party started and read the room! I can't thank her enough for the amazing jobs she does for our events!", rating: 5 },
];

// Nikki (event/preferred-vendor) leads the corporate order; Amanda follows.
const DALLAS_CORPORATE_REVIEWS: ReviewItem[] = [DALLAS_WEDDING_REVIEWS[1], DALLAS_WEDDING_REVIEWS[0]];

// Badge-row chips: her real DFW service areas.
const DALLAS_HERO_LOCATIONS = ["Dallas", "Fort Worth", "Plano", "Frisco", "McKinney"];

export const DEFAULT_CITY_CONTENT: Record<
  string,
  Partial<Record<CityContentKey, CitySections>>
> = {
  chicago: {
    wedding: {
      hero: {
        subtitle: "Chicago Wedding DJ & MC",
        subline: "From West Loop Lofts to Lakefront Ballrooms",
        badge: "CHICAGO, IL",
        locations: CHICAGO_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you seeking a Chicago wedding that feels effortless, joyful and deeply personal?",
        body: [
          "Chicago weddings ask a lot of a DJ. One night might move from a ceremony in a Gold Coast hotel, through cocktails on a rooftop with the skyline behind you, into a reception in a converted Fulton Market warehouse: three rooms, three completely different acoustics, one seamless evening. As both your DJ and MC, I hold that arc together with the presence, intention and leadership your day deserves.",
        ],
      },
      localMarket: {
        title: "Weddings Across Chicagoland",
        lead: "Chicago doesn't have one wedding aesthetic. It has a dozen, and each one changes how a night should sound.",
        blocks: [
          { label: "West Loop and Fulton Market", text: "have become the city's industrial heart: exposed brick, timber beams, twenty-foot ceilings. These rooms photograph beautifully and behave badly. Hard surfaces mean reverb, and a system that isn't tuned for the space turns a first dance into an echo. I bring line-of-sight speaker placement and a BOSE setup that fills the room without punishing the front tables." },
          { label: "Downtown and River North", text: "bring the sophisticated hotel ballrooms and polished downtown rooms: LUXBAR, Walden, The Carter, Private Dining by Sepia, The Wellsley. They also bring the rooftops with views of the skyline, Lake Michigan and the Chicago River. Grand, formal, usually on a tight timeline with a hard end time, and rewarding precision: cues that land on the beat, announcements that move three hundred guests without ever feeling rushed." },
          { label: "Lakefront and museum venues", text: "give you skyline and water, and a wind that has opinions about outdoor ceremonies. So we agree on a backup plan during planning, well before the day." },
          { label: "The suburbs", text: "cover Naperville, Oak Brook, Glenview, Hinsdale, Downers Grove, Burr Ridge, Oak Park, Elmhurst, Lombard, Schaumburg, Hoffman Estates, St. Charles, Geneva and Bolingbrook. That's where many Chicago weddings actually happen: a large guest count in an intimate, tucked-away setting. Country clubs and private estates like The Drake Oak Brook, Morton Arboretum in Lisle, Cantigny Park in Wheaton and Riverside Receptions in Geneva, often with longer receptions and a wider guest age range: a floor that has to hold grandparents at nine and college friends at midnight. And Chicagoland isn't the edge of the map. I regularly work venues well beyond it, from Heritage Harbor in Ottawa to Pear Tree Estate in Champaign and out toward Edwards near Peoria, which is exactly why the 100-mile radius is worth spelling out." },
        ],
        closing: [
          "And Chicago weddings are rarely monocultural. This city's families blend traditions constantly, and a single reception might need several musical worlds to sit comfortably side by side. I welcome and respect all cultures, religions, identities and orientations, and I prepare for those evenings the way I'd prepare for any other: by learning your family's music and the running order before I ever touch a fader.",
        ],
      },
      logistics: {
        title: "The Practical Side of a Chicago Wedding",
        items: [
          { label: "Timing and end times", text: "Many downtown venues run firm curfews, and some residential-adjacent spaces have volume restrictions after a set hour. I confirm these directly with your venue during planning, then build the night's energy curve so the peak lands where it should, not cut off mid-climb." },
          { label: "Load-in", text: "High-rise and downtown venues often mean freight elevators, scheduled dock access and a coordinator who needs paperwork in advance. I arrive early, coordinate load-in with your venue ahead of time, and carry a Certificate of Insurance available on request, which most Chicago venues will ask for." },
          { label: "Season", text: "Peak runs May through October, with September and October the most competitive dates in the city. If you're planning a fall Saturday, book vendors early. Winter weddings are increasingly popular here and I love them, but travel buffers matter when lake-effect snow is a possibility." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "Locations", question: "Do you travel to the Chicago suburbs?", answer: "Yes. Elmhurst, Naperville, Oak Brook, Glenview, Hinsdale, Downers Grove, Burr Ridge, Oak Park, Lombard, Schaumburg, Hoffman Estates, St. Charles, Geneva, Bolingbrook and the wider Chicagoland area are all standard territory. I've worked venues like The Drake Oak Brook, Morton Arboretum in Lisle, Cantigny Park in Wheaton and Riverside Receptions in Geneva, and further out to Heritage Harbor in Ottawa, Pear Tree Estate in Champaign and toward Edwards near Peoria. Anywhere within 100 miles of Chicago carries no travel surcharge; destinations beyond that are available with a travel fee, quoted upfront." },
          { category: "DJ & MC Services", question: "Can you handle a multicultural or multilingual reception?", answer: "Absolutely, and I really enjoy them. Chicago families often blend traditions, and I plan those nights carefully, learning the key songs, the order of traditions, and the pronunciation of every name I'll announce. For a reception that runs in another language, I work with a bilingual MC on request, common across Chicago and Dallas–Fort Worth, and we plan the announcements and running order together in advance." },
          { category: "DJ & MC Services", question: "Do you MC as well as DJ?", answer: "Yes, and they're not separate services here. Grand entrance, toasts, parent dances, cake, bouquet. I handle the announcements and the room's attention, so your coordinator isn't holding a microphone and your uncle isn't either." },
          { category: "Logistics & Reliability", question: "My venue has an end time and a volume limit. Is that a problem?", answer: "No. That's normal in Chicago and it's completely manageable. I just need to know early. I confirm the restrictions with your venue directly and shape the evening so the peak arrives before the cutoff." },
          { category: "Logistics & Reliability", question: "Do you have liability insurance?", answer: "Yes, a Certificate of Insurance is available on request, which most Chicago venues require from vendors." },
          { category: "Equipment", question: "What's included when I book you?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting come standard. Optional additions include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, glow sticks, and more on request." },
          { category: "Booking", question: "How far in advance should I book a Chicago wedding date?", answer: "For weddings, 6 to 24 months is typical in Chicago, and September and October Saturdays go earliest. I'm already booking into 2028, so inquire early. Off-peak and weekday dates have more availability, and if your date is close it's always worth asking." },
          { category: "Booking", question: "What's the investment?", answer: "Wedding investment begins at $3,500 during main season, with off-season pricing available, covering custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup." },
          { category: "Locations", question: "Are you local to Chicago?", answer: "Yes, DJ Miss Haze is Chicago-based and keeps a full set of equipment here, so nothing has to travel in and setup is never a compromise. She splits time between Chicago and Denver through summer and fall." },
        ],
      },
      reviews: {
        title: "CHICAGO WEDDING REVIEWS",
        ratingText: "5.0 stars",
        items: CHICAGO_WEDDING_REVIEWS,
      },
    },

    corporate: {
      hero: {
        subtitle: "Chicago Corporate Event DJ & MC",
        subline: "Galas, Conferences and Holiday Parties",
        badge: "CHICAGO, IL",
        locations: CHICAGO_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you planning a company event that people actually talk about afterward?",
        body: [
          "Corporate events in Chicago live or die on the run of show. A gala has an awards segment that can't drift, a conference reception has ninety minutes before people leave for dinner, a holiday party needs to carry three hundred colleagues from polite conversation to a full dance floor. As both DJ and MC, I hold the timeline and the room at once, so your team can be guests at their own event.",
        ],
      },
      localMarket: {
        title: "Corporate Events Across Chicago",
        lead: "A corporate crowd is not a wedding crowd, and Chicago's corporate calendar has its own shape.",
        blocks: [
          { label: "Downtown hotel ballrooms", text: "handle the formal end: awards nights, annual meetings, industry galas, in downtown rooms like Walden, The Carter and Private Dining by Sepia. These come with a production schedule, an AV team and a timeline that someone has already agonised over. My job is to fit into it precisely: hit the cue, hand the microphone over cleanly, bring the energy back up the second the presentation ends." },
          { label: "West Loop and Fulton Market", text: "have become the city's corporate playground as much as its restaurant district. Converted warehouses, exposed brick, long communal tables. Companies book these for launches, client events and anything meant to feel less like a conference and more like a night out. Beautiful rooms, difficult acoustics, and worth setting up carefully." },
          { label: "Museums and cultural venues", text: "carry the prestige end of the calendar. Fundraisers, board dinners, milestone anniversaries. These evenings usually need restraint first and volume later: guests need to hear each other during the reception, and the room only opens up after the program ends." },
          { label: "The suburbs", text: "cover Oak Brook, Naperville, Downers Grove, Burr Ridge, Oak Park, Elmhurst, Lombard, Schaumburg and Hoffman Estates. They hold the corporate campuses and the country clubs that serve them, from The Drake Oak Brook to the Morton Arboretum in Lisle and Cantigny Park in Wheaton. Summer outings, sales kickoffs, holiday parties for teams that don't want to travel downtown in December." },
        ],
        closing: [
          "The Chicago corporate year has two peaks. November and December are holiday party season, and the good dates go early. Companies often book a year ahead for the first two weekends of December. Spring and fall carry the conference and gala calendar. Summer belongs to outdoor company events, which bring their own questions about power, weather and sound outdoors.",
          "What corporate work really demands is reading a room that didn't choose to be together. At a wedding, everyone knows the couple. At a company party, half the room reports to the other half. That changes what opens the floor, when to push and when to hold back, and it's the part that experience buys you.",
        ],
      },
      logistics: {
        title: "Working With Your Production Team",
        items: [
          { label: "Timelines and cues", text: "Corporate events usually run to a written schedule with a client, a planner and often an AV vendor. I ask for the run of show in advance, confirm the cue list, and coordinate directly with your AV team on the day so nothing overlaps or drops out." },
          { label: "Sound for two rooms at once", text: "Networking and dancing need completely different volumes. I plan the evening in stages: background level during arrivals and dinner, controlled build after the program, full room once the floor opens." },
          { label: "MC duties", text: "Awards, raffles, introductions, thank-yous, closing announcements. When a senior leader steps up to speak, they get a clean handover and a microphone that works. It sounds obvious, and it's still the thing I see go wrong most often." },
          { label: "Documentation", text: "Larger venues require a Certificate of Insurance from every vendor, and some downtown properties have specific load-in windows and dock scheduling. I handle both directly with the venue before the event." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "DJ & MC Services", question: "Do you work with our AV company or event planner?", answer: "Yes, routinely. I ask for the run of show ahead of time, confirm the cue list, and coordinate on site so the audio handovers are clean. If you have a production team, I fit into their plan rather than the other way around." },
          { category: "DJ & MC Services", question: "Can you MC the awards or presentation segment?", answer: "Yes. Introductions, award announcements, raffle draws, thank-yous, closing remarks, and clean microphone handovers to your speakers. Having the same person handle both the music and the microphone keeps the evening moving without a second point of coordination." },
          { category: "DJ & MC Services", question: "Our event is more networking than dancing. Is that a problem?", answer: "Not at all. Plenty of corporate evenings never open a dance floor, and the skill there is restraint: the right music at the right level so people can hear each other, with the energy shifting as the night progresses. I plan for the event you're actually having." },
          { category: "Logistics & Reliability", question: "Do you have liability insurance and a COI?", answer: "Yes. A Certificate of Insurance is available on request, which most corporate venues require from vendors before load-in." },
          { category: "Locations", question: "Do you travel to the suburbs for company events?", answer: "Yes. Oak Brook, Naperville, Elmhurst, Lombard, Glenview, Hinsdale, Downers Grove, Burr Ridge, Oak Park, Schaumburg, Hoffman Estates, St. Charles, Geneva, Bolingbrook and the wider Chicagoland area. Anywhere within 100 miles of Chicago carries no travel surcharge; beyond that is available with a travel fee, quoted upfront." },
          { category: "Booking", question: "How far ahead should we book a December holiday party?", answer: "Corporate events are typically 2 to 4 months out, but the first two weekends of December are the most contested dates of the Chicago corporate year and companies frequently book them a year ahead. I'm already taking 2028 dates, so inquire early. Other dates have more flexibility." },
          { category: "Equipment", question: "What's included?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting. Optional additions include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine and glow sticks, popular for launches and brand events." },
          { category: "Booking", question: "What's the investment?", answer: "Corporate event investment begins at $2,500, covering custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup." },
          { category: "Locations", question: "Are you local to Chicago?", answer: "Yes, DJ Miss Haze is Chicago-based and keeps a full set of equipment here, so nothing has to travel in and setup is never a compromise. She splits time between Chicago and Denver through summer and fall." },
        ],
      },
      reviews: {
        title: "CHICAGO CORPORATE REVIEWS",
        ratingText: "5.0 stars",
        items: CHICAGO_CORPORATE_REVIEWS,
      },
    },

    hub: {
      hero: {
        subtitle: "Event DJ & MC",
        subline: "The Windy City's Premier Event DJ",
        badge: "CHICAGO, IL",
        locations: CHICAGO_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you looking for a Chicago DJ who reads the room before the room knows what it wants?",
        body: [
          "Weddings in Fulton Market lofts. Corporate galas downtown. Birthday parties in Lincoln Park and anniversaries out in Naperville. Chicago keeps a DJ honest: every neighborhood has its own rooms, its own crowd and its own idea of a good night. As both DJ and MC, I bring the same thing to all of them: presence, intention and a dance floor that fills and stays full.",
        ],
      },
      localMarket: {
        title: "Serving Chicago and Chicagoland",
        lead: "Chicago is a city of distinct rooms, and the difference matters more than people expect.",
        blocks: [
          { label: "Downtown and River North", text: "hold the hotel ballrooms and polished downtown rooms: LUXBAR, Walden, The Carter, Private Dining by Sepia. They also hold the formal end of the calendar: weddings with three hundred guests, corporate galas, milestone celebrations. Tight timelines, firm end times, and rooms that reward precision." },
          { label: "West Loop and Fulton Market", text: "brought the industrial aesthetic that now defines Chicago events. Exposed brick, high ceilings, hard surfaces. Stunning to look at, genuinely challenging for sound, and worth the extra setup time." },
          { label: "Lincoln Park, Wicker Park and the North Side", text: "hold the smaller, more personal end: private parties, birthdays, anniversaries, intimate receptions. Different scale, different energy, same preparation." },
          { label: "The lakefront and museum campus", text: "deliver the views, and the weather that comes with them. Outdoor ceremonies and rooftop receptions need a plan B that's ready rather than theoretical." },
          { label: "The suburbs", text: "cover Naperville, Oak Brook, Glenview, Hinsdale, Downers Grove, Burr Ridge, Oak Park, Elmhurst, Lombard, Schaumburg, Hoffman Estates, St. Charles, Geneva and Bolingbrook. That's where a lot of Chicago events actually land: a large guest count in an intimate, tucked-away setting. Country clubs and private estates like The Drake Oak Brook, Morton Arboretum in Lisle and Cantigny Park in Wheaton, usually with longer events and a wider age range in the room. And the reach runs well past Chicagoland. Heritage Harbor in Ottawa, Pear Tree Estate in Champaign, out toward Edwards near Peoria. That's exactly why the 100-mile radius is worth spelling out." },
        ],
        closing: [
          "And Chicago weddings are rarely monocultural. This city's families blend traditions constantly, and a single reception might need several musical worlds to sit comfortably side by side. I welcome and respect all cultures, religions, identities and orientations, and I prepare for those evenings the way I'd prepare for any other: by learning your family's music and the running order before I ever touch a fader.",
        ],
      },
      logistics: {
        title: "Practical Notes for Chicago Events",
        items: [
          { label: "Venue requirements", text: "Most Chicago venues ask vendors for a Certificate of Insurance before load-in, and downtown properties often schedule dock access and freight elevator windows in advance. I handle both directly with your venue." },
          { label: "End times and volume", text: "Downtown venues frequently run firm curfews, and some spaces have volume restrictions after a set hour. I confirm these during planning and shape the evening so the peak lands before the cutoff." },
          { label: "Season and booking", text: "Weddings peak May through October, with September and October the busiest. Corporate holiday parties peak in the first two weeks of December. Both book well ahead. Off-peak dates have real availability. It's always worth asking." },
          { label: "Winter", text: "Lake-effect weather is a scheduling factor from December through March. I build travel buffers into winter events rather than hoping." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "Locations", question: "Which areas of Chicagoland do you cover?", answer: "Chicago proper plus Elmhurst, Naperville, Oak Brook, Glenview, Hinsdale, Downers Grove, Burr Ridge, Oak Park, Lombard, Schaumburg, Hoffman Estates, St. Charles, Geneva, Bolingbrook and the surrounding suburbs. Anywhere within 100 miles of Chicago carries no travel surcharge; destinations further out are available with a travel fee, quoted upfront." },
          { category: "DJ & MC Services", question: "Do you DJ and MC, or just DJ?", answer: "Both, as one service. Announcements, introductions, timeline management and the microphone are all part of it. You don't need a separate MC." },
          { category: "DJ & MC Services", question: "What kind of events do you take in Chicago?", answer: "Weddings, corporate events, private parties, milestone celebrations and brand activations. Different rooms, same preparation." },
          { category: "Equipment", question: "What equipment comes with a booking?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting as standard. Optional extras include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, glow sticks, and more on request." },
          { category: "Logistics & Reliability", question: "Do you carry liability insurance?", answer: "Yes, with a Certificate of Insurance available on request." },
          { category: "Booking", question: "How far in advance should I book?", answer: "It depends on the event: weddings run 6 to 24 months in Chicago, corporate events are typically 2 to 4 months (early December much further), and private events 1 to 6 months. I'm already booking into 2028, so inquire early. Everything else is more flexible." },
          { category: "DJ & MC Services", question: "Can you handle multiple languages or cultural traditions?", answer: "Yes. Chicago weddings and celebrations often blend traditions, and I plan those evenings in advance: the music, the order of events, and the correct pronunciation of every name I announce. For bilingual receptions I work with a bilingual MC on request, common across Chicago and Dallas–Fort Worth." },
          { category: "Locations", question: "Are you local to Chicago?", answer: "Yes, DJ Miss Haze is Chicago-based and keeps a full set of equipment here, so nothing has to travel in and setup is never a compromise. She splits time between Chicago and Denver through summer and fall." },
        ],
      },
      reviews: {
        title: "CHICAGO REVIEWS",
        ratingText: "5.0 stars",
        items: CHICAGO_WEDDING_REVIEWS,
      },
      // Was three tiles (Chicago/Denver/Dallas) on every city page; Chicago
      // keeps only its own Chicago-tagged resource.
      resources: {
        title: "RESOURCES",
        cards: [
          {
            category: "Planning",
            city: "Chicago, IL",
            title: "Ultimate Wedding DJ Checklist",
            description: "Ensure your big day sounds perfect with our comprehensive guide to wedding music planning and DJ selection.",
            image: "/assets/Brand-Event-DJ-Setup-Chicago-C4CUamlB.webp",
          },
        ],
      },
    },
  },
  // === DENVER — angle: altitude, mountain weather and travel logistics ===
  // Named Denver venues below are client-confirmed. Estes Park Resort and Deer
  // Creek Mountain Camp also appear in the testimonials, the Denver Art Museum and
  // Magnolia in the corporate reviews, Black Canyon Inn in her VibeReel, and The
  // Broadmoor and Estes Park Resort in the gallery photos; the rest come from her
  // venue list. Her list runs to 40-plus venues; the copy names only a selection
  // that makes a point — cultural (Denver Art Museum, Botanic Gardens), city (Mile
  // High Station, Rooftop 1630), near-metro, and the Fort Collins / Loveland /
  // Lyons cluster that shows northern reach — rather than the whole list. "Ritz
  // Carlton, Denver" appears twice in her source list; it is one venue, named once.
  denver: {
    wedding: {
      hero: {
        subtitle: "Denver Wedding DJ & MC",
        subline: "Denver, Vail, Estes Park and the Mountains",
        badge: "DENVER, CO",
        locations: DENVER_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you planning a Colorado wedding that feels effortless, joyful and deeply personal?",
        body: [
          "Colorado weddings are rarely just one evening. Guests fly in on Thursday, there's a welcome party, the ceremony is at eight thousand feet with a view people will talk about for years, and by Sunday brunch nobody wants to leave. As both your DJ and MC, I plan for the whole arc, not just the reception, so three days at altitude feel like one celebration, start to finish.",
        ],
      },
      localMarket: {
        title: "From RiNo Warehouses to Mountain Venues",
        lead: "Colorado gives you two completely different weddings, and they need different things from a DJ.",
        blocks: [
          { label: "Denver proper", text: "means RiNo, LoDo and the Union Station district. That's where the city's industrial venues live: converted warehouses and brick-and-steel rooms like Skylight, Moss, Ironworks and Mile High Station, the Front Range behind them. Denver hosts plenty of dressed-up downtown weddings too: a fancy hotel like the Ritz-Carlton Denver, a rooftop under the open sky like Rooftop 1630, or a cultural setting such as the Denver Art Museum or the Denver Botanic Gardens. City logistics, city timelines, and rooms that photograph beautifully but need careful sound placement. These usually run a single evening with local guests and a familiar rhythm." },
          { label: "The foothills and the plains", text: "ring the city: The Manor House and Arrowhead Golf Club in Littleton, Highlands Ranch Mansion and Willow Ridge Manor over in Morrison, Cielo at Castle Pines to the south, Bonnie Blues out in Elizabeth to the east. A short drive from downtown, but already rural in feel: the bridge between a city wedding and a mountain one, and often the sweet spot for couples who want the view without the two-hour drive." },
          { label: "The mountains", text: "are another world: Vail, Breckenridge, the canyons out toward Bailey, at venues like Deer Creek Mountain Camp in Bailey and Evergreen Lake House, where the view is the whole point and the infrastructure is an afterthought. Power can be limited. Cell signal disappears. The drive from Denver runs one to two hours, and in winter it runs longer. I build that travel time into my schedule, and I confirm with your venue exactly what power is available before the day. And I work well past the metro. The Broadmoor down in Colorado Springs, Spruce Mountain Ranch in Larkspur. That's exactly why the 100-mile radius is worth spelling out." },
          { label: "Estes Park in particular", text: "has become a wedding destination in its own right, and it's a stretch of Colorado I know venue by venue: The Stanley Hotel and Della Terra up on the mountainside, the Estes Park Resort down by the lake, Black Canyon Inn and The Landing at Estes Park in town. An hour and a half from Denver, high enough that a weather contingency always matters, and a setting that does half the work on its own." },
          { label: "And Colorado runs north as well as up.", text: "The stretch toward Loveland, Lyons and Fort Collins has become wedding country of its own: Fort Collins Country Club, Sylvan Dale Ranch in Loveland, RiverBend and the Lyons Farmette, The St Vrain in Longmont, Windsong Estate up in Severance. An hour or so from Denver, comfortably within range, and a gentler, greener feel than the high-mountain venues." },
          { label: "Altitude changes the night, and most couples don't expect it.", text: "Denver sits at 5,280 feet; mountain venues sit at eight or nine thousand. Guests arriving from sea level feel alcohol faster and tire earlier. I plan the pacing around it. Your dance floor needs to peak earlier here than it would at sea level, and getting that right is what keeps everyone dancing instead of heading to bed at ten." },
          { label: "Colorado weather needs planning for.", text: "Summer afternoons bring thunderstorms that arrive fast and clear fast. Snow is possible well into June and from September onward. Every outdoor ceremony needs a plan B we've agreed on in advance: where it moves, who makes the call, and how much time I need to get the equipment covered and relocated safely." },
          { label: "And Colorado is destination country.", text: "Many of these weddings run across three days: welcome party, wedding, farewell brunch. Each one needs its own music and its own energy. The welcome party is usually louder than couples expect, and the brunch needs barely anything at all. Planning all three together is better than treating them as separate bookings." },
        ],
        closing: [
          "Colorado weddings run the full range: intimate gatherings of around forty and full-scale celebrations of three hundred, in a fairly even mix of Colorado natives and couples who fell for these mountains on a visit and came back to marry with that landscape behind them. They can be classy, they can be wild, and they're often both at once; the crowd is almost always friendly, authentic and kind-spirited. I welcome and respect all cultures, religions, identities and orientations.",
          "Whatever the scale, the part I care most about is the design of your key moments: the ceremony music, the grand entrance, the first dance and the parent dances, worked out with you in advance so each one lands exactly the way you pictured it. Then I keep the floor full for the rest of the night.",
        ],
      },
      logistics: {
        title: "What Mountain Weddings Actually Require",
        items: [
          { label: "Power and setup", text: "Rustic and outdoor venues often have limited electrical capacity. I confirm what's available in advance and plan the system around it, rather than discovering the problem on the day." },
          { label: "Travel and timing", text: "Mountain venues mean real drive time from Denver: an hour to Estes Park, closer to two toward Vail or Breckenridge, and longer when weather is in play. I build buffers into the schedule as standard." },
          { label: "Connectivity", text: "Plenty of Colorado venues have no reliable cell signal. Everything I need is downloaded and ready offline before I leave. Nothing streams on the day." },
          { label: "Season", text: "June through September is peak for mountain weddings, and the best Saturdays go early. Denver proper has a longer usable season. Winter mountain weddings are beautiful and worth considering: availability is much better and the mountains look their best under snow." },
          { label: "Insurance", text: "A Certificate of Insurance is available on request, which most Colorado venues require from vendors." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "Locations", question: "Do you travel to mountain venues?", answer: "Yes. Estes Park, Vail, Breckenridge and the surrounding areas are standard territory, along with Littleton, Golden, Castle Pines, Highlands Ranch, Parker and Larkspur closer in, and Loveland, Lyons and Fort Collins to the north. Estes Park especially: I've worked The Stanley Hotel, Della Terra, the Estes Park Resort, Black Canyon Inn and The Landing there, plus Deer Creek Mountain Camp out toward Bailey and The Broadmoor down in Colorado Springs. Anywhere within 100 miles of Denver carries no travel surcharge. Aspen and other destinations beyond that are available with a travel fee, quoted upfront." },
          { category: "Logistics & Reliability", question: "Our venue has limited power. Is that a problem?", answer: "That comes up often at mountain and outdoor venues and it's completely manageable. I just need to know early. I confirm the available electrical supply with your venue in advance and configure the system accordingly." },
          { category: "DJ & MC Services", question: "We're planning a three-day destination wedding. Can you cover all of it?", answer: "Yes, and I'd encourage planning it as one event rather than three. The welcome party, the wedding and the farewell brunch each need a different energy, and planning them together makes the whole weekend feel intentional instead of assembled." },
          { category: "DJ & MC Services", question: "Most of our guests are flying in from sea level. Does that change anything?", answer: "More than people expect. Alcohol hits harder at altitude and guests tire earlier, so the night's energy curve needs to peak sooner than it would at sea level. It's the kind of thing you only account for if you've worked here." },
          { category: "Logistics & Reliability", question: "What happens if the weather turns during an outdoor ceremony?", answer: "We agree a plan B in advance: where the ceremony moves, who calls it, and how much lead time I need to relocate equipment safely. Colorado weather moves fast; the decision shouldn't be made under pressure." },
          { category: "DJ & MC Services", question: "Do you MC as well as DJ?", answer: "Yes, as one service. Grand entrance, toasts, parent dances, cake, closing. Announcements and room management included, so your planner isn't holding a microphone." },
          { category: "Equipment", question: "What's included when I book you?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting come standard. Optional additions include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, glow sticks, and more on request." },
          { category: "Booking", question: "How far ahead should we book a summer mountain wedding?", answer: "Peak summer mountain Saturdays, June to September, go 6 to 24 months out, and the most sought-after venues go further. I'm already booking into 2028, so inquire early. Winter and shoulder-season dates have real availability." },
          { category: "Booking", question: "What's the investment?", answer: "Wedding investment begins at $3,500 during main season, with off-season pricing available, covering custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup." },
          { category: "Locations", question: "Are you local to the Denver market?", answer: "DJ Miss Haze is Chicago-based but splits time between Chicago and Denver through summer and fall, and she keeps a full set of equipment in the Denver market, so gear never has to travel far and setup is never a compromise." },
        ],
      },
      reviews: {
        title: "DENVER WEDDING REVIEWS",
        ratingText: "5.0 stars",
        items: DENVER_WEDDING_REVIEWS,
      },
    },

    corporate: {
      hero: {
        subtitle: "Denver Corporate Event DJ & MC",
        subline: "Galas, Conferences and Mountain Retreats",
        badge: "DENVER, CO",
        locations: DENVER_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you planning a company event that doesn't feel like a company event?",
        body: [
          "Denver's corporate culture runs less formal than most, and the events reflect it. A gala downtown still needs a clean run of show, but a leadership retreat in Breckenridge needs something else entirely. As both DJ and MC I hold the timeline where it matters and read the room where it doesn't, so your team ends up somewhere between well-run and genuinely enjoyable.",
        ],
      },
      localMarket: {
        title: "Corporate Events Across Colorado",
        lead: "The Denver corporate calendar has a shape you won't find in other markets.",
        blocks: [
          { label: "Downtown and the convention district", text: "carry the formal end: industry galas, association dinners, awards nights, conference receptions, in rooms like the Ritz-Carlton Denver and Mile High Station, and cultural venues such as the Denver Art Museum and Denver Botanic Gardens. These run to a written schedule with an AV team and a planner who has thought about every minute. My job is to fit into that precisely: hit the cue, hand over the microphone cleanly, bring the energy back the moment the program ends." },
          { label: "RiNo and the warehouse districts", text: "hold the launches, client events and anything meant to feel less corporate than it is. Breweries, rooftops and converted industrial rooms like Skylight, Moss and Ironworks. Beautiful spaces with difficult acoustics, worth the extra setup time." },
          { label: "The Denver Tech Center and the southern suburbs", text: "bring the campus events: sales kickoffs, summer outings, holiday parties for teams that don't want to drive downtown in December." },
          { label: "And then there's the mountain retreat,", text: "which is genuinely a Colorado specialty. Companies book Vail, Breckenridge or Estes Park for multi-day leadership offsites, and resorts like The Broadmoor down in Colorado Springs for the larger conferences. And the evening program runs differently from a city event: smaller groups, longer evenings, a mix of formal dinner and something much looser afterward. These come with the same infrastructure questions as mountain weddings: power, connectivity, drive time." },
        ],
        closing: [
          "Two things shape the Colorado corporate year. Holiday parties peak across the first two weeks of December and book far ahead. And the outdoor season, roughly June to September, carries company outings, retreats and everything that takes advantage of being here rather than somewhere else.",
          "Reading a corporate crowd is a different skill to reading a wedding. At a wedding, everyone knows the couple. At a company event, half the room reports to the other half, and the floor doesn't open the same way. Knowing when to push and when to hold back is the part experience buys you.",
        ],
      },
      logistics: {
        title: "Working With Your Team",
        items: [
          { label: "Run of show", text: "I ask for the schedule in advance, confirm the cue list and coordinate with your AV vendor on the day so audio handovers are clean and nothing overlaps." },
          { label: "Two volumes, one evening", text: "Networking and dancing need completely different levels. I plan the night in stages: background during arrivals and dinner, controlled build after the program, full room once the floor opens." },
          { label: "MC duties", text: "Awards, introductions, raffles, thank-yous, closing remarks, with clean microphone handovers to your speakers. If a senior leader is presenting, they get a working mic and a proper introduction." },
          { label: "Mountain and offsite venues", text: "Retreat locations need the same planning as mountain weddings: confirmed power supply, offline-ready material where there's no signal, and travel buffers built into the schedule." },
          { label: "Documentation", text: "Most venues require a Certificate of Insurance from vendors before load-in. Available on request." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "DJ & MC Services", question: "Do you work with our AV company or event planner?", answer: "Yes, routinely. I ask for the run of show ahead of time, confirm the cue list and coordinate on site. If you have a production team, I fit into their plan rather than the other way around." },
          { category: "DJ & MC Services", question: "Can you MC the awards or presentation segment?", answer: "Yes. Introductions, award announcements, raffle draws, thank-yous and closing remarks, with clean handovers to your speakers. One person covering both music and microphone removes a whole layer of coordination." },
          { category: "Locations", question: "Do you cover mountain retreats and offsites?", answer: "Yes. Vail, Breckenridge, Estes Park and the surrounding areas, along with resorts like The Broadmoor in Colorado Springs for larger conferences, and north to Loveland and Fort Collins. Retreat venues come with their own requirements: power supply, connectivity, travel time. I plan for all three in advance rather than on arrival." },
          { category: "DJ & MC Services", question: "Our event is networking rather than dancing. Does that work?", answer: "Absolutely. Plenty of corporate evenings never open a dance floor. The skill there is restraint: the right music at a level where people can actually talk, with the energy shifting as the evening moves." },
          { category: "Logistics & Reliability", question: "Do you have liability insurance and a COI?", answer: "Yes, available on request, which most Colorado venues require from vendors." },
          { category: "Booking", question: "How far ahead should we book a December holiday party?", answer: "Corporate events are typically 2 to 4 months out, though the first two weeks of December are the most contested dates of the year and often book a year ahead. I'm already taking 2028 dates, so inquire early. Other dates are far more flexible." },
          { category: "Equipment", question: "What's included?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting. Optional extras include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine and glow sticks, popular for launches and brand events." },
          { category: "Booking", question: "What's the investment?", answer: "Corporate event investment begins at $2,500, covering custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup." },
          { category: "Locations", question: "Are you local to the Denver market?", answer: "DJ Miss Haze is Chicago-based but splits time between Chicago and Denver through summer and fall, and she keeps a full set of equipment in the Denver market, so gear never has to travel far and setup is never a compromise." },
        ],
      },
      reviews: {
        title: "DENVER CORPORATE REVIEWS",
        ratingText: "5.0 stars",
        items: DENVER_CORPORATE_REVIEWS,
      },
    },

    hub: {
      hero: {
        subtitle: "Event DJ & MC",
        subline: "The Mile High City's Go-To Event DJ",
        badge: "DENVER, CO",
        locations: DENVER_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you looking for a Denver DJ who knows the difference between a city venue and a mountain one?",
        body: [
          "Weddings in RiNo warehouses and ceremonies at nine thousand feet. Corporate galas downtown and leadership retreats in Breckenridge. Birthdays, anniversaries and destination weekends that run from Thursday to Sunday. Colorado asks more of a DJ than most markets: the logistics are real and the settings are extraordinary. As both DJ and MC, I bring the same thing to all of it: presence, intention and a floor that fills and stays full.",
        ],
      },
      localMarket: {
        title: "Serving Denver and the Colorado Mountains",
        lead: "Colorado is really two markets, and knowing which one you're in changes everything.",
        blocks: [
          { label: "Denver proper", text: "means RiNo, LoDo, Union Station and the downtown core. That's where the city's industrial venues sit: converted warehouses and brick-and-steel spaces like Skylight, Moss, Ironworks and Mile High Station. There's a dressed-up side too: fancy hotel ballrooms like the Ritz-Carlton Denver, rooftops like Rooftop 1630, and cultural settings such as the Denver Art Museum and Denver Botanic Gardens. City timelines, city logistics, rooms that look superb and need thoughtful sound placement." },
          { label: "The foothills and the plains", text: "ring the city: The Manor House and Arrowhead Golf Club in Littleton, Highlands Ranch Mansion and Willow Ridge Manor in Morrison, Cielo at Castle Pines to the south, Bonnie Blues out in Elizabeth. A short drive from downtown but already rural in feel, and the natural middle ground between a city event and a mountain one." },
          { label: "The mountains", text: "are where Colorado earns its reputation: Vail, Breckenridge, the canyons toward Bailey, at venues like Deer Creek Mountain Camp in Bailey and Evergreen Lake House. Estes Park has become a destination in its own right, with a run of venues I know well: The Stanley Hotel, Della Terra, the Estes Park Resort, Black Canyon Inn and The Landing. The view is the point and the infrastructure is secondary: limited power, unreliable signal, drive times of one to two hours that stretch further in winter. And the range runs further still. The Broadmoor in Colorado Springs, Spruce Mountain Ranch in Larkspur. That's why the 100-mile radius is worth spelling out." },
          { label: "And Colorado runs north, too.", text: "Loveland, Lyons, Longmont and Fort Collins have their own cluster of venues: Fort Collins Country Club, Sylvan Dale Ranch, RiverBend and the Lyons Farmette, The St Vrain. An hour from Denver, comfortably in range, and a greener counterpoint to the high country." },
          { label: "Altitude is a real factor.", text: "Denver sits at 5,280 feet and mountain venues sit at eight or nine thousand. Guests arriving from sea level feel alcohol faster and tire earlier, which changes when a night should peak. Most visiting DJs don't account for it." },
          { label: "Weather moves fast here.", text: "Summer afternoon storms arrive and clear within an hour. Snow is possible into June and from September. Outdoor events need a genuine plan B, agreed in advance." },
          { label: "And Colorado draws destination events.", text: "Multi-day weddings, corporate retreats, milestone celebrations that bring people in from across the country. These run across several days with different energy each time, and planning them as one piece works far better than treating them separately." },
        ],
      },
      logistics: {
        title: "Practical Notes for Colorado Events",
        items: [
          { label: "Power", text: "Rustic and outdoor venues frequently have limited electrical supply. I confirm capacity in advance and plan the setup around it." },
          { label: "Travel", text: "Mountain venues mean genuine drive time, and winter conditions extend it. Buffers are built in as standard, not added when something goes wrong." },
          { label: "Connectivity", text: "Many Colorado venues have no reliable cell signal. Everything is downloaded and ready offline before I leave." },
          { label: "Season", text: "Mountain events peak June through September, and the best Saturdays go early. Denver proper runs a longer season. Winter dates offer real availability and settings that need no decoration." },
          { label: "Insurance", text: "A Certificate of Insurance is available on request." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "Locations", question: "Which areas of Colorado do you cover?", answer: "Denver and the metro area: Littleton, Golden, Highlands Ranch, Parker, Castle Pines, Elizabeth. Plus Estes Park, Vail, Breckenridge and the mountain communities, north to Loveland, Lyons and Fort Collins, and south through Larkspur to Colorado Springs. Anywhere within 100 miles of Denver carries no travel surcharge. Aspen and anywhere further afield are available with a travel fee, quoted upfront." },
          { category: "DJ & MC Services", question: "Do you DJ and MC, or just DJ?", answer: "Both, as a single service. Announcements, introductions, timeline management and the microphone are included. No separate MC needed." },
          { category: "Booking", question: "Do mountain venues cost more?", answer: "Within 100 miles of Denver there's no travel surcharge, mountain venues included. Destinations beyond that carry a travel fee, quoted upfront. I'd rather be clear from the start than surprise anyone later." },
          { category: "Logistics & Reliability", question: "What if our venue has no power or signal?", answer: "Both are common in the mountains and both are solvable with planning. I confirm the electrical supply in advance and everything I need is stored offline before I leave." },
          { category: "Equipment", question: "What equipment comes with a booking?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting as standard. Optional extras include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, glow sticks, and more on request." },
          { category: "Booking", question: "How far in advance should I book?", answer: "It depends: mountain weddings run 6 to 24 months, corporate events are typically 2 to 4 months (early December further), and private events 1 to 6 months. I'm already booking into 2028, so inquire early. Winter and shoulder-season dates have far more availability." },
          { category: "DJ & MC Services", question: "Do you cover multi-day destination events?", answer: "Yes, and they work better planned as one piece. A welcome party, a main event and a farewell brunch each need a different energy, and planning them together makes the weekend feel intentional." },
          { category: "Locations", question: "Are you local to the Denver market?", answer: "DJ Miss Haze is Chicago-based but splits time between Chicago and Denver through summer and fall, and she keeps a full set of equipment in the Denver market, so gear never has to travel far and setup is never a compromise." },
        ],
      },
      reviews: {
        title: "DENVER REVIEWS",
        ratingText: "5.0 stars",
        items: DENVER_WEDDING_REVIEWS,
      },
      resources: {
        title: "RESOURCES",
        cards: [
          {
            category: "Venues",
            city: "Denver, CO",
            title: "Top 5 Industrial Venues in Denver",
            description: "Explore the most unique raw spaces and industrial warehouses perfect for modern, high-energy events.",
            image: "/assets/Corporate-Event-DJ-Miss-Haze-D2xGj5cD.webp",
          },
        ],
      },
    },
  },

  // === DALLAS–FORT WORTH — angle: heat, distance and large events ===
  // Named DFW venues are client-confirmed. NYLO Plano appears in a testimonial and
  // 4 Eleven Fort Worth in her VibeReel; the rest — The Adolphus, Dallas Arboretum,
  // Hickory, 34 Events, Magnolia Terrace, Honey Creek Venues, The Windsor at Hebron
  // Park, Arrowwood, Gardenia Venue and Clark Gardens — are from her venue list.
  // Bilingual receptions: she DJs and MCs in English and German only, and brings
  // in a bilingual MC on request for Spanish — copy reflects that, here and on
  // the Chicago pages.
  // NOTE: no South Asian wedding content anywhere in DFW, per the client — the
  // DFW angle is heat, distances and large guest counts.
  dallas: {
    wedding: {
      hero: {
        subtitle: "Dallas Wedding DJ & MC",
        subline: "Dallas, Fort Worth, Plano, Frisco and McKinney",
        badge: "DALLAS–FORT WORTH, TX",
        locations: DALLAS_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you planning a Texas wedding that feels effortless, joyful and deeply personal?",
        body: [
          "Dallas–Fort Worth is not one city, it's a dozen. A ceremony in the Fort Worth Stockyards and a reception in a Frisco ballroom are forty miles and two different worlds apart, and a wedding in July asks completely different questions than one in October. As both your DJ and MC, I plan for the metroplex as it actually is: the distances, the heat and the guest counts all worked out well before your date.",
        ],
      },
      localMarket: {
        title: "Weddings Across the Metroplex",
        lead: "DFW spreads across nearly ten thousand square miles, and that shapes everything.",
        blocks: [
          { label: "Dallas proper", text: "brings the modern end: Deep Ellum's converted warehouses, Design District galleries, and downtown landmarks like The Adolphus and the Dallas Arboretum, alongside hotel ballrooms, rooftops and rooms like Hickory. City venues, city timelines, and spaces that reward careful sound placement." },
          { label: "Fort Worth", text: "has an entirely different character. The Stockyards carry real western heritage, the cultural district runs more formal, and venues like 4 Eleven Fort Worth suit couples who want something that feels distinctly Texan rather than generically upscale. That changes the music, not just the setting." },
          { label: "The northern suburbs", text: "cover Plano, Frisco, McKinney, Allen, Prosper and Celina. They hold the metroplex's newest and largest venues: NYLO Plano, 34 Events in Plano, Magnolia Terrace in Frisco, The Windsor at Hebron Park, and Honey Creek Venues up in Celina. Purpose-built event spaces, country clubs and hotel ballrooms with capacity for three hundred and up. These are often the biggest guest counts in the region, and big rooms need a different approach than intimate ones." },
          { label: "Ranch and barn venues", text: "ring the metroplex in every direction: Arrowwood Weddings & Events down in Palmer, Gardenia Venue up in Valley View, Clark Gardens out past Weatherford. Beautiful, popular, and frequently limited on electrical supply, so I confirm what a venue can actually provide before the day rather than during setup. Several of these sit well outside the metroplex proper, which is exactly why the 100-mile radius is worth spelling out." },
          { label: "Heat is the defining factor here, and it shapes the whole calendar.", text: "Peak season runs March through May and September through November. Summer weddings happen, but outdoor ceremonies move late into the evening and guests spend most of the night indoors. That changes the pacing: the floor fills later and stays fuller once it does. Spring brings its own variable: Texas storms arrive fast, and any outdoor ceremony between March and May needs a plan B that's ready rather than theoretical." },
        ],
        closing: [
          "And DFW weddings are rarely one-note. The metroplex has a large Hispanic community, and bilingual receptions are common here. For those I work with a bilingual MC on request, so the night can move between English and Spanish, between a father-daughter dance and a full cumbia set. Texas weddings also tend to run bigger and later than most markets, with guest lists that stretch across several generations: a floor that has to hold grandparents at nine and college friends at midnight. I welcome and respect all cultures, religions, identities and orientations, and I learn a family's music before the day rather than during it.",
          "I don't work the metroplex in isolation, either. Over the years I've built a circle of trusted Dallas–Fort Worth vendors: photographers, designers, content creators and more. I'm glad to collaborate with yours, or point you toward people I've worked alongside and rate, if you're still filling out your team.",
        ],
      },
      logistics: {
        title: "The Practical Side of a DFW Wedding",
        items: [
          { label: "Distance", text: "Fort Worth to McKinney is fifty miles, and metroplex traffic is real. I build travel time into the schedule properly instead of optimistically." },
          { label: "Heat and equipment", text: "Outdoor setups in Texas summer need shade and airflow: electronics fail in direct sun at 100°F. Where a ceremony is outdoors, I plan the setup around protection as well as sound." },
          { label: "Power at ranch venues", text: "Rustic venues frequently have limited electrical capacity. I confirm availability with the venue in advance and configure accordingly." },
          { label: "Guest counts", text: "The northern suburbs hold the region's largest venues, and DFW weddings frequently run three hundred guests and up. Bigger rooms need different speaker placement and coverage planning, confirmed with the venue in advance rather than adjusted on the night." },
          { label: "Insurance", text: "A Certificate of Insurance is available on request, which most DFW venues require from vendors." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "Locations", question: "Which parts of the metroplex do you cover?", answer: "Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Prosper, Celina, Denton, Highland Park, Hebron and the surrounding metroplex. I've worked venues from The Adolphus and the Dallas Arboretum downtown to NYLO Plano, 34 Events, Magnolia Terrace and 4 Eleven Fort Worth, out to Arrowwood in Palmer and Clark Gardens past Weatherford. Anywhere within 100 miles of Dallas–Fort Worth carries no travel surcharge; destinations beyond that are available with a travel fee, quoted upfront." },
          { category: "Logistics & Reliability", question: "Our wedding is a large one: three hundred guests or more. Is that a problem?", answer: "Not at all, and it's common in DFW. Larger rooms need different speaker placement so the sound carries to the back without punishing the front tables. That's planned with the venue in advance." },
          { category: "DJ & MC Services", question: "Can you run a bilingual reception?", answer: "For bilingual receptions I work with a bilingual MC on request, common across Dallas–Fort Worth and Chicago. I DJ and MC in English (I also speak German); the bilingual MC covers the Spanish announcements, and we plan the running order together in advance." },
          { category: "Logistics & Reliability", question: "Our ceremony is outdoors in summer. What should we know?", answer: "Texas heat is a real planning factor. Outdoor ceremonies work best later in the evening, and equipment needs shade and airflow. Electronics fail in direct sun. I plan the setup around that rather than hoping for a mild day." },
          { category: "Logistics & Reliability", question: "Our venue is a ranch with limited power. Is that a problem?", answer: "Common in DFW and entirely manageable. I confirm the electrical supply with your venue in advance and plan the system around what's actually available." },
          { category: "DJ & MC Services", question: "Do you MC as well as DJ?", answer: "Yes, as one service. Grand entrance, toasts, parent dances, cake, closing. Announcements and room management included, so your coordinator isn't holding a microphone." },
          { category: "Equipment", question: "What's included when I book you?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting come standard. Optional additions include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, glow sticks, and more on request." },
          { category: "Booking", question: "How far ahead should we book?", answer: "Dallas–Fort Worth weddings book on a shorter runway than most markets: typically 2 to 8 months, with peak spring and fall Saturdays going earliest. That said, I'm already holding 2028 dates, so inquire early; summer and winter have considerably more availability." },
          { category: "Booking", question: "What's the investment?", answer: "Wedding investment begins at $3,500 during main season, with off-season pricing available, covering custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup." },
          { category: "Locations", question: "Are you local to Dallas–Fort Worth?", answer: "DJ Miss Haze is Chicago-based and travels to Dallas–Fort Worth mainly in winter, but she's available year-round and keeps a full set of equipment in the DFW market, so nothing has to travel in and setup is never a compromise." },
        ],
      },
      reviews: {
        title: "DALLAS–FORT WORTH WEDDING REVIEWS",
        ratingText: "5.0 stars",
        items: DALLAS_WEDDING_REVIEWS,
      },
    },

    corporate: {
      hero: {
        subtitle: "Dallas Corporate Event DJ & MC",
        subline: "Galas, Conferences and Company Celebrations",
        badge: "DALLAS–FORT WORTH, TX",
        locations: DALLAS_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you planning a company event that people actually want to attend?",
        body: [
          "DFW has one of the country's densest concentrations of corporate headquarters, and the event calendar reflects it: sales kickoffs, industry galas, holiday parties for teams of five hundred. Every one runs to a schedule someone has agonised over. As both DJ and MC, I hold that timeline precisely and still leave the room somewhere it wants to be at eleven.",
        ],
      },
      localMarket: {
        title: "Corporate Events Across Dallas–Fort Worth",
        lead: "The metroplex corporate calendar is larger and more spread out than most markets.",
        blocks: [
          { label: "The Plano and Frisco corridor", text: "holds a remarkable density of corporate campuses: the northern suburbs have absorbed a wave of headquarters relocations over the past decade. That means sales kickoffs, annual meetings, holiday parties and summer outings, mostly at venues close to the campuses rather than downtown, from NYLO Plano to 34 Events." },
          { label: "Downtown Dallas", text: "carries the formal end: industry galas, association dinners, awards nights, conference receptions in hotel ballrooms and convention spaces like The Adolphus. These run with an AV team and a written run of show, and the job is to fit into it exactly. Hit the cue, hand the microphone over cleanly, bring the energy back the second the program ends." },
          { label: "Deep Ellum and the Design District", text: "hold the launches, client events and anything meant to feel less corporate than it is. Converted warehouses, galleries, rooftops, rooms like Hickory. Great atmosphere, difficult acoustics, worth the setup time." },
          { label: "Fort Worth", text: "runs its own calendar with a distinctly different character: the Stockyards and cultural district venues, 4 Eleven Fort Worth among them, suit companies wanting something with local identity rather than another ballroom." },
        ],
        closing: [
          "The Texas corporate year has a particular shape. Holiday parties peak across the first two weeks of December and book far ahead. Sales kickoffs cluster in January. Spring and fall carry the conference and gala calendar. And summer outdoor company events run early or late in the day: nobody schedules an outdoor function for a Texas afternoon in July.",
          "Reading a corporate crowd is a different skill to reading a wedding. At a wedding, everyone knows the couple. At a company party, half the room reports to the other half, and the floor doesn't open the same way. Knowing when to push and when to hold back is the part experience buys.",
        ],
      },
      logistics: {
        title: "Working With Your Team",
        items: [
          { label: "Run of show", text: "I ask for the schedule in advance, confirm the cue list and coordinate with your AV vendor on the day so audio handovers are clean." },
          { label: "Two volumes, one evening", text: "Networking and dancing need completely different levels. I plan the night in stages: background during arrivals and dinner, controlled build after the program, full room once the floor opens." },
          { label: "MC duties", text: "Awards, introductions, raffles, thank-yous, closing remarks, with clean handovers to your speakers. If a senior leader is presenting, they get a working microphone and a proper introduction." },
          { label: "Scale and distance", text: "Large suburban venues and metroplex travel both need planning. I build realistic travel time into the schedule and confirm load-in windows with the venue ahead of time." },
          { label: "Documentation", text: "Most venues require a Certificate of Insurance from vendors before load-in. Available on request." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "DJ & MC Services", question: "Do you work with our AV company or event planner?", answer: "Yes, routinely. I ask for the run of show ahead of time, confirm the cue list and coordinate on site. If you have a production team, I fit into their plan rather than the other way around." },
          { category: "DJ & MC Services", question: "Can you MC the awards or presentation segment?", answer: "Yes. Introductions, award announcements, raffle draws, thank-yous and closing remarks, with clean microphone handovers. One person covering both music and microphone removes a layer of coordination on the night." },
          { category: "Locations", question: "Do you cover events in Plano, Frisco and McKinney?", answer: "Yes, along with Dallas, Fort Worth, Allen, Prosper, Celina, Denton, Highland Park, Hebron and the wider metroplex. The northern suburbs are a significant part of the corporate calendar here. Anywhere within 100 miles of Dallas–Fort Worth carries no travel surcharge; beyond that is available with a travel fee, quoted upfront." },
          { category: "DJ & MC Services", question: "Our event is networking rather than dancing. Does that work?", answer: "Absolutely. Plenty of corporate evenings never open a dance floor, and the skill there is restraint: the right music at a level where people can actually talk, with the energy shifting as the evening moves." },
          { category: "Logistics & Reliability", question: "Do you have liability insurance and a COI?", answer: "Yes, available on request, which most DFW venues require from vendors." },
          { category: "Booking", question: "How far ahead should we book a December holiday party?", answer: "Corporate events are typically 2 to 4 months out. The first two weeks of December are the most contested dates of the corporate year and often book a year ahead, and January sales kickoffs fill early. I'm already taking 2028 dates, so inquire early. Other dates are more flexible." },
          { category: "Equipment", question: "What's included?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting. Optional extras include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine and glow sticks, popular for launches and brand events." },
          { category: "Booking", question: "What's the investment?", answer: "Corporate event investment begins at $2,500, covering custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup." },
          { category: "Locations", question: "Are you local to Dallas–Fort Worth?", answer: "DJ Miss Haze is Chicago-based and travels to Dallas–Fort Worth mainly in winter, but she's available year-round and keeps a full set of equipment in the DFW market, so nothing has to travel in and setup is never a compromise." },
        ],
      },
      reviews: {
        title: "DALLAS–FORT WORTH CORPORATE REVIEWS",
        ratingText: "5.0 stars",
        items: DALLAS_CORPORATE_REVIEWS,
      },
    },

    hub: {
      hero: {
        subtitle: "Event DJ & MC",
        subline: "Dallas–Fort Worth's Elite Event DJ",
        badge: "DALLAS, TX",
        locations: DALLAS_HERO_LOCATIONS,
      },
      intro: {
        question: "Are you looking for a DJ who knows the metroplex is not one city?",
        body: [
          "Weddings in the Fort Worth Stockyards and receptions in Frisco ballrooms. Corporate galas downtown and campus events out in Plano. Milestone birthdays, anniversaries and company parties for five hundred. Dallas–Fort Worth is the biggest and most varied market I work in, and it rewards preparation. As both DJ and MC, I bring the same thing to all of it: presence, intention and a floor that fills and stays full.",
        ],
      },
      localMarket: {
        title: "Serving Dallas, Fort Worth and the Metroplex",
        lead: "DFW spreads across nearly ten thousand square miles, and each part of it runs differently.",
        blocks: [
          { label: "Dallas proper", text: "brings Deep Ellum's warehouses, Design District galleries, downtown landmarks like The Adolphus and the Dallas Arboretum, ballrooms and rooftops: the modern, urban end of the calendar." },
          { label: "Fort Worth", text: "has its own identity entirely. The Stockyards carry genuine western heritage and the cultural district runs more formal, at venues like 4 Eleven Fort Worth. Events here often want something distinctly Texan rather than generically upscale." },
          { label: "Plano, Frisco and McKinney", text: "hold the metroplex's newest venues and its densest concentration of corporate campuses: NYLO Plano, 34 Events, Magnolia Terrace in Frisco. The largest guest counts in the region are usually up here: purpose-built event spaces, country clubs and ballrooms built for three hundred and more." },
          { label: "Ranch and barn venues", text: "ring the metroplex in all directions: Arrowwood in Palmer, Clark Gardens past Weatherford, Gardenia Venue up in Valley View. Popular, beautiful, and frequently limited on power, and several sit well outside the metroplex, which is why the 100-mile radius is worth spelling out." },
          { label: "Heat shapes the year.", text: "Peak season runs March to May and September to November. Summer events move indoors or late into the evening, and outdoor functions simply don't get scheduled for a Texas afternoon in July. Spring storms are the other variable: anything outdoors between March and May needs a real plan B." },
        ],
        closing: [
          "And DFW celebrations run big. The metroplex has a substantial Hispanic community and bilingual receptions are common. For those I work with a bilingual MC on request. And Texas events generally carry larger guest lists and later nights than most markets. I welcome and respect all cultures, religions, identities and orientations, and I prepare for those events in advance rather than improvising on the night.",
        ],
      },
      logistics: {
        title: "Practical Notes for DFW Events",
        items: [
          { label: "Distance", text: "Fort Worth to McKinney is fifty miles and metroplex traffic is real. Travel time goes into the schedule realistically." },
          { label: "Heat", text: "Outdoor equipment needs shade and airflow in Texas summer: electronics fail in direct sun. Outdoor setups are planned around that." },
          { label: "Power", text: "Ranch and rustic venues often have limited electrical capacity. Confirmed with the venue in advance." },
          { label: "Season and booking", text: "Spring and fall Saturdays go earliest. Early-December corporate dates and January sales kickoffs also fill fast. Summer and winter have genuine availability." },
          { label: "Insurance", text: "A Certificate of Insurance is available on request." },
        ],
      },
      faq: {
        title: "FREQUENTLY ASKED",
        items: [
          { category: "Locations", question: "Which areas do you cover?", answer: "Dallas, Fort Worth, Plano, Frisco, Celina, McKinney, Denton, Allen, Highland Park, Prosper, Hebron and the surrounding metroplex. Anywhere within 100 miles of Dallas–Fort Worth carries no travel surcharge; anything further out is available with a travel fee, quoted upfront." },
          { category: "DJ & MC Services", question: "Do you DJ and MC, or just DJ?", answer: "Both, as a single service. Announcements, introductions, timeline management and the microphone are included. No separate MC needed." },
          { category: "DJ & MC Services", question: "Can you run a bilingual reception?", answer: "For bilingual receptions I work with a bilingual MC on request, common across Dallas–Fort Worth and Chicago. I DJ and MC in English (I also speak German); the bilingual MC covers the Spanish announcements, and we plan the running order together in advance." },
          { category: "DJ & MC Services", question: "What kind of events do you take here?", answer: "Weddings, corporate events, private parties, milestone celebrations and brand activations." },
          { category: "Equipment", question: "What equipment comes with a booking?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting as standard. Optional extras include a stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine, glow sticks, and more on request." },
          { category: "Logistics & Reliability", question: "Do you carry liability insurance?", answer: "Yes, with a Certificate of Insurance available on request." },
          { category: "Booking", question: "How far in advance should I book?", answer: "It depends on the event: Dallas–Fort Worth weddings run a shorter 2 to 8 months, corporate events are typically 2 to 4 months (early December further), and private events 1 to 6 months. I'm already booking into 2028, so inquire early. Summer and winter are far more open." },
          { category: "Locations", question: "Are you local to Dallas–Fort Worth?", answer: "DJ Miss Haze is Chicago-based and travels to Dallas–Fort Worth mainly in winter, but she's available year-round and keeps a full set of equipment in the DFW market, so nothing has to travel in and setup is never a compromise." },
        ],
      },
      reviews: {
        title: "DALLAS–FORT WORTH REVIEWS",
        ratingText: "5.0 stars",
        items: DALLAS_WEDDING_REVIEWS,
      },
      resources: {
        title: "RESOURCES",
        cards: [
          {
            category: "Corporate",
            city: "Dallas, TX",
            title: "Corporate Event Vibe Guide",
            description: "How to balance professional networking with a high-energy party atmosphere for your next gala.",
            image: "/assets/DJ-Miss-Haze-Company-Event-DJ-CJUkMjfh.webp",
          },
        ],
      },
    },
  },
};

export const SECTION_KEYS = [
  "hero", "ticker", "signature", "mantra", "about", "cta", "faq", "reviews",
] as const;

export type SectionKey = typeof SECTION_KEYS[number];

function buildDbKey(eventType: EventType, section: SectionKey): string {
  return `event.${eventType}.${section}`;
}

export const CITY_SECTION_KEYS = [
  "hero", "intro", "localMarket", "logistics", "faq", "reviews", "resources",
] as const;

export type CitySectionKey = typeof CITY_SECTION_KEYS[number];

// Mirrors buildDbKey for city content: "city.<slug>.<surface>.<section>",
// e.g. "city.chicago.wedding.hero". No admin UI writes these yet, but the DB
// override path resolves them exactly like event content does.
function buildCityDbKey(citySlug: string, key: CityContentKey, section: CitySectionKey): string {
  return `city.${citySlug}.${key}.${section}`;
}

export function layoutToEventType(layout: string): EventType {
  switch (layout) {
    case "corporate_event": return "corporate";
    case "wedding": return "wedding";
    case "private_event": return "private";
    default: return "other";
  }
}

export function useEventContent(eventType: EventType) {
  const { data: allContent, isLoading } = useQuery<CorporateContent[]>({
    queryKey: ["/api/corporate-content"],
  });

  const defaults = DEFAULT_EVENT_CONTENT[eventType];
  const content: EventSections = { ...defaults };

  if (allContent) {
    for (const section of SECTION_KEYS) {
      const dbKey = buildDbKey(eventType, section);
      const match = allContent.find((c) => c.sectionKey === dbKey);
      if (match) {
        (content as any)[section] = match.content;
      } else if (eventType === "corporate") {
        const legacyMatch = allContent.find((c) => c.sectionKey === section);
        if (legacyMatch) {
          (content as any)[section] = legacyMatch.content;
        }
      }
    }
  }

  return { content, isLoading };
}

export function useAllEventContent() {
  const { data: allContent, isLoading } = useQuery<CorporateContent[]>({
    queryKey: ["/api/corporate-content"],
  });

  const result: Record<EventType, EventSections> = {
    corporate: { ...DEFAULT_EVENT_CONTENT.corporate },
    wedding: { ...DEFAULT_EVENT_CONTENT.wedding },
    private: { ...DEFAULT_EVENT_CONTENT.private },
    other: { ...DEFAULT_EVENT_CONTENT.other },
  };

  if (allContent) {
    for (const et of EVENT_TYPES) {
      for (const section of SECTION_KEYS) {
        const dbKey = buildDbKey(et.key, section);
        const match = allContent.find((c) => c.sectionKey === dbKey);
        if (match) {
          (result[et.key] as any)[section] = match.content;
        } else if (et.key === "corporate") {
          const legacyMatch = allContent.find((c) => c.sectionKey === section);
          if (legacyMatch) {
            (result[et.key] as any)[section] = legacyMatch.content;
          }
        }
      }
    }
  }

  return { content: result, isLoading, rawContent: allContent };
}

// Resolve a city's content for one surface: the in-code defaults, with any
// matching DB rows ("city.<slug>.<surface>.<section>") layered on top. Returns
// an empty object when there is no city (e.g. a non-city service page) or no
// content for that city yet, so callers safely fall back to event defaults.
export function useCityContent(
  citySlug: string | undefined,
  key: CityContentKey | null,
): CitySections {
  const { data: allContent } = useQuery<CorporateContent[]>({
    queryKey: ["/api/corporate-content"],
  });

  if (!citySlug || !key) return {};

  const defaults = DEFAULT_CITY_CONTENT[citySlug]?.[key] ?? {};
  const content: CitySections = { ...defaults };

  if (allContent) {
    for (const section of CITY_SECTION_KEYS) {
      const dbKey = buildCityDbKey(citySlug, key, section);
      const match = allContent.find((c) => c.sectionKey === dbKey);
      if (match) {
        (content as any)[section] = match.content;
      }
    }
  }

  return content;
}

// Merge rule: city content overrides event content SECTION BY SECTION. Where
// the city defines a section it wins (hero, faq, reviews); where it doesn't,
// the event-type default stands. The city-only sections (intro, localMarket,
// logistics, resources) are attached as-is. This is what makes the six
// city+service routes correct — they are both a city AND an event type, and
// each section resolves to the most specific copy available.
export function mergeCityIntoEvent(
  event: EventSections,
  city: CitySections,
): ResolvedCityContent {
  return {
    ...event,
    hero: city.hero ?? event.hero,
    faq: city.faq ?? event.faq,
    reviews: city.reviews ?? event.reviews,
    intro: city.intro,
    localMarket: city.localMarket,
    logistics: city.logistics,
    resources: city.resources,
  };
}
