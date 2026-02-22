import { useQuery } from "@tanstack/react-query";
import type { CorporateContent } from "@shared/schema";

export interface HeroContent {
  subtitle: string;
  locations: string[];
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

export type EventType = "corporate" | "wedding" | "private" | "other";

export const EVENT_TYPES: { key: EventType; label: string; layoutKey: string }[] = [
  { key: "corporate", label: "Corporate", layoutKey: "corporate_event" },
  { key: "wedding", label: "Wedding", layoutKey: "wedding" },
  { key: "private", label: "Private", layoutKey: "private_event" },
  { key: "other", label: "Other / PR Show", layoutKey: "pr_show" },
];

const WEDDING_FAQ: FAQItem[] = [
  { category: "DJ & MC Services", question: "Can you DJ and MC?", answer: "Yes, DJ Miss Haze is a professional DJ with live, dynamic music mixing who also MCs her events and is known to engage the audience while hosting. This is a critical dual role for a seamless wedding. DJ Miss Haze handles all necessary announcements, introductions (with phonetic pronunciation checks), and coordinates with your planner/vendors to ensure every timeline transition (grand entrance, toasts, first dance, etc.) is executed flawlessly and professionally." },
  { category: "DJ & MC Services", question: "How experienced are you with weddings?", answer: "Over the past 7 years, DJ Miss Haze curated almost 500 weddings. She typically covers music from pre-ceremony to the last song/exit. She is also available for wedding afterparties." },
  { category: "DJ & MC Services", question: "How do you keep the dance floor going at my wedding?", answer: "DJ Miss Haze is an experienced professional who treats the dance floor as a dynamic environment. Her reputation is built on quickly assessing the room's energy and adjusting the music in real-time—blending tracks from different eras and genres seamlessly. DJ Miss Haze honors her clients playlist and do-not-playlist and builds out her music framework based on her clients music taste plus guest inclusion. You can trust DJ Miss Haze' expertise to keep everyone engaged, ensuring a vibrant, inclusive and high-energy dance floor." },
  { category: "DJ & MC Services", question: "Can you play multiple genres?", answer: "Absolutely. DJ Miss Haze specializes in Classics, Country, EDM, Hip Hop/Rap, R&B and Soul, Reggaeton, Pop / Top 40. She is also experienced with cultural and culture fusion weddings, including Afrobeats, Latin, Middle Eastern, Indian, Asian and Balkan Music." },
  { category: "DJ & MC Services", question: "How do you handle guest requests?", answer: "Requests are handled thoughtfully—always aligned with the couple's vision and the room's energy." },
  { category: "DJ & MC Services", question: "How involved can we be in the music selection?", answer: "With DJ Miss Haze, you can be as involved as you like to. She is proven to DJ entire events without guidance, and also adheres to playlists and do-not-playlist. You can also work with DJ Miss Haze on custom song edits. She is very experienced editing songs for key moments, such as Ceremony, Grand Entrance, 1st Dance, and more. You set the vision, and DJ Miss Haze delivers." },
  { category: "DJ & MC Services", question: "We have very different music tastes between us, and our guests. How do you manage that?", answer: "DJ Miss Haze specializes in versatility. She excels at curating sets to set the tone for each phase of the wedding and transitions smoothly between phases, genres and energy levels to ensure she always delivers what the crowd needs in the moment. She schedules a detailed consultation and offers unlimited preparation meetings to ensure the music reflects every mood and moment of your special day. Working with DJ Miss Haze, you can choose to collect guest song requests prior to your event to ensure everyone feels included." },
  { category: "DJ & MC Services", question: "Do you play clean only or also songs with explicit lyrics?", answer: "DJ Miss Haze is experienced DJing entirely family-friendly, clean events, and can also deliver events with explicit lyrics. She always complies to her clients preference when it comes to lyrics. Some events start clean and can transition to explicit late in the night. She will assess your thoughts on this important detail and will help guide you in the process." },
  { category: "DJ & MC Services", question: "Are you a traditional Wedding DJ?", answer: "DJ Miss Haze is highly experienced with Weddings, and started her career in various environments such as clubs, concerts, and corporate events. Based on your personal preference, she can deliver a traditional, or non-traditional wedding experience or a mix of both." },
  { category: "Booking", question: "How far in advance should I book?", answer: "We recommend booking 4-24 months in advance for weddings. DJ Miss Haze is able to cover last minute weddings and offer same-day emergency DJ services, subject to availability." },
  { category: "Booking", question: "What is your minimum booking fee?", answer: "Weddings start at $2,800. Final pricing will be determined during the first contact call or zoom meeting with DJ Miss Haze. Talk to DJ Miss Haze about off-season pricing, and other available discounts." },
  { category: "Booking", question: "How do we secure booking with DJ Miss Haze?", answer: "Your event date is secured with a signed contract and paid retainer. DJ Miss Haze offers zero-fee payment plans that fit your budgeting needs." },
  { category: "Booking", question: "Which payment methods do you accept?", answer: "DJ Miss Haze offers the following payment methods: ACH, Cash, Check, Credit and Debit Card, Cryptocurrencies, Wire, and Zelle." },
  { category: "Equipment", question: "What equipment do you bring to a wedding?", answer: "DJ Miss Haze brings a professional BOSE speaker system, Shure cordless microphone with mic stand, and dance floor lighting. She includes yard games and glow sticks for free for all wedding clients. All equipment is insured, maintained and tested before every wedding." },
  { category: "Equipment", question: "Which add-ons do you offer?", answer: "DJ Miss Haze offers the following add-ons: Photo Booth, Dancing on the Clouds, Smoke Machine, and CO2 Cannons. Bundle pricing is available for two items or more." },
  { category: "Locations", question: "Which locations do you service?", answer: "DJ Miss Haze operates out of three hubs: Chicago (Illinois), Dallas Fort Worth (Texas) and Denver (Colorado). She has her complete equipment stack plus lighting, photo booths, dancing on the clouds, fog machine, yard games and CO2 cannons at each hub. She is also available for destination weddings, or weddings beyond her hub. You can work with her anywhere in the world. Travel fees apply for weddings outside of her hubs." },
  { category: "Locations", question: "Do you charge travel fees?", answer: "Weddings in Chicago, Dallas Fort Worth and Denver plus 100 miles radius have ZERO travel fees. Events beyond those regions will be priced upon assessment." },
  { category: "Logistics & Reliability", question: "Are you insured?", answer: "Yes, DJ Miss Haze carries full liability insurance. If your venue requires a Certificate of Insurance, we are happy to provide it directly to them at no extra charge." },
  { category: "Logistics & Reliability", question: "What is your policy on breaks, attire and vendor meal?", answer: "Miss Haze does not take breaks during your event's contracted time and does not consume alcohol while working. She dresses in professional attire appropriate for your wedding's formality. A vendor meal is requested for events lasting 5+ hours to maintain focus and energy throughout the night." },
];

const CORPORATE_FAQ: FAQItem[] = [
  { category: "DJ & MC Services", question: "Can you DJ and MC?", answer: "Yes, DJ Miss Haze is a professional DJ with live, dynamic music mixing who also MCs her events and is known to engage the audience while hosting. This is a critical dual role for a seamless company event. DJ Miss Haze handles all necessary announcements, introductions (with phonetic pronunciation checks), and coordinates with your planner/vendors to ensure every timeline transition (grand entrance, toasts, first dance, etc.) is executed flawlessly and professionally." },
  { category: "DJ & MC Services", question: "How experienced are you with Corporate Events?", answer: "Over the past 10 years, DJ Miss Haze worked over 200 Corporate Events, ranging from medium store events, school events or fashion shows to large company celebrations including Fortune 500 companies. She is also experienced with PR, branding and influencer events and deeply understands how those different event types flow and what the objectives are at each." },
  { category: "DJ & MC Services", question: "How do you keep the dance floor going at a Company Event?", answer: "DJ Miss Haze is an experienced professional who treats the dance floor as a dynamic environment. Her reputation is built on quickly assessing the room's energy and adjusting the music in real-time—blending tracks from different eras and genres seamlessly. She engages in tailored preparation work and deeply caters to the dance floor in front of her, giving her real-time feedback. You can trust DJ Miss Haze' expertise to keep everyone engaged, ensuring a vibrant, inclusive and high-energy dance floor." },
  { category: "DJ & MC Services", question: "Can you play multiple genres?", answer: "Absolutely. DJ Miss Haze specializes in Classics, Country, EDM, Hip Hop/Rap, R&B and Soul, Latin, Pop / Top 40. She is also experienced with cultural and culture fusion events, including Afrobeats, Latin, Middle Eastern, Indian, Asian and Balkan Music. Being German herself, she deeply understands German, UK, Dutch, Eastern European and Spanish / Italian music." },
  { category: "DJ & MC Services", question: "How involved can we be in the music selection?", answer: "With DJ Miss Haze, you can be as involved as you like to. She is proven to DJ entire events without guidance, and also adheres to playlists and do-not-playlist. You can also work with DJ Miss Haze to curate custom song edits. You set the vision, and DJ Miss Haze ties it together at your event." },
  { category: "DJ & MC Services", question: "Our family and guests have very different music tastes. How do you manage that?", answer: "DJ Miss Haze specializes in versatility. She excels at curating sets to set the tone for each phase of the event and transitions smoothly between phases, genres and energy levels to ensure she always delivers what the crowd needs in the moment. She schedules a detailed consultation and offers unlimited preparation meetings to ensure the music reflects every mood and moment of your special day. Working with DJ Miss Haze, you can choose to collect guest song requests prior to your event to ensure everyone feels included." },
  { category: "DJ & MC Services", question: "Do you play clean only or also songs with explicit lyrics?", answer: "DJ Miss Haze is experienced DJing entirely family-friendly, clean events, and can also deliver events with explicit lyrics, or a combination of both. She always complies to her clients preference when it comes to lyrics. Some events start clean and can transition to explicit late in the night. She will assess your thoughts on this important detail and will help guide you in the process. Her recommendation is to keep lyrics clean, or on the low end of the spectrum at a Corporate Event to provide elegance and inclusion through music." },
  { category: "Booking", question: "How far in advance should I book?", answer: "We recommend booking 2-8 months in advance for Corporate Events. DJ Miss Haze is able to cover last minute Corporate Events and offer same-day emergency DJ services, subject to availability." },
  { category: "Booking", question: "What is your minimum booking fee?", answer: "Corporate Events start at $1,800. Final pricing will be determined during the first contact call or zoom meeting with DJ Miss Haze." },
  { category: "Booking", question: "How do we secure booking with DJ Miss Haze?", answer: "Your event date is secured with a signed contract and paid retainer." },
  { category: "Booking", question: "Which payment methods do you accept?", answer: "DJ Miss Haze offers the following payment methods: ACH, Cash, Check, Credit and Debit Card, Cryptocurrencies, Wire, and Zelle." },
  { category: "Equipment", question: "What equipment do you bring to a Corporate Event?", answer: "DJ Miss Haze brings a professional BOSE speaker system, Shure cordless microphone with mic stand, and dance floor lighting. All equipment is insured, maintained and tested before every event." },
  { category: "Equipment", question: "Which add-ons do you offer?", answer: "DJ Miss Haze offers optional add-ons: Photo Booth, Audio Guestbook, CO2 Cannons, Dancing on the Clouds, Glow Sticks, Smoke Machine, and Yard Games. Bundle pricing is available for two items or more." },
  { category: "Locations", question: "Which locations do you service?", answer: "DJ Miss Haze operates out of three hubs: Chicago (Illinois), Dallas Fort Worth (Texas) and Denver (Colorado). She has her complete equipment stack plus lighting, photo booths, dancing on the clouds, fog machine, and CO2 cannons at each hub. She is also available for destination events, or Company Events beyond her hub. You can work with her anywhere in the world. Travel fees apply for events outside of her hubs." },
  { category: "Locations", question: "Do you charge travel fees?", answer: "Events in Chicago, Dallas Fort Worth and Denver plus 100 miles radius have ZERO travel fees. Events beyond are subject to travel fees." },
  { category: "Logistics & Reliability", question: "Are you insured?", answer: "Yes, DJ Miss Haze carries full liability insurance. If your venue requires a Certificate of Insurance, we are happy to provide it directly to them at no extra charge." },
  { category: "Logistics & Reliability", question: "What is your policy on breaks, attire and vendor meal?", answer: "Miss Haze does not take breaks during your event's contracted time and does not consume alcohol. She dresses in professional attire appropriate for your company event's formality. A vendor meal is requested for events lasting 5+ hours to maintain focus and energy throughout the night." },
];

const PRIVATE_FAQ: FAQItem[] = [
  { category: "DJ & MC Services", question: "Can you DJ and MC?", answer: "Yes, DJ Miss Haze is a professional DJ with live, dynamic music mixing who also MCs her events and is known to engage the audience while hosting. She handles all necessary announcements and coordinates with your planner/vendors to ensure every moment is executed flawlessly." },
  { category: "DJ & MC Services", question: "How experienced are you with Private Events?", answer: "DJ Miss Haze has extensive experience with private events including birthdays, anniversaries, holiday parties, and intimate gatherings across Chicago, Dallas-Fort Worth, and Denver." },
  { category: "DJ & MC Services", question: "Can you play multiple genres?", answer: "Absolutely. DJ Miss Haze specializes in Classics, Country, EDM, Hip Hop/Rap, R&B and Soul, Reggaeton, Pop / Top 40. She is also experienced with cultural music, including Afrobeats, Latin, Middle Eastern, Indian, Asian and Balkan Music." },
  { category: "DJ & MC Services", question: "How involved can we be in the music selection?", answer: "With DJ Miss Haze, you can be as involved as you like. She is proven to DJ entire events without guidance, and also adheres to playlists and do-not-playlist. You set the vision, and DJ Miss Haze delivers." },
  { category: "Booking", question: "How far in advance should I book?", answer: "We recommend booking 2-6 months in advance for private events. DJ Miss Haze is able to cover last minute events and offer same-day emergency DJ services, subject to availability." },
  { category: "Booking", question: "What is your minimum booking fee?", answer: "Private events start at $1,500. Final pricing will be determined during the first contact call or zoom meeting with DJ Miss Haze." },
  { category: "Booking", question: "Which payment methods do you accept?", answer: "DJ Miss Haze offers the following payment methods: ACH, Cash, Check, Credit and Debit Card, Cryptocurrencies, Wire, and Zelle." },
  { category: "Equipment", question: "What equipment do you bring?", answer: "DJ Miss Haze brings a professional BOSE speaker system, Shure cordless microphone with mic stand, and dance floor lighting. All equipment is insured, maintained and tested before every event." },
  { category: "Equipment", question: "Which add-ons do you offer?", answer: "DJ Miss Haze offers optional add-ons: Photo Booth, Dancing on the Clouds, Smoke Machine, CO2 Cannons, Glow Sticks, and Yard Games. Bundle pricing is available for two items or more." },
  { category: "Locations", question: "Which locations do you service?", answer: "DJ Miss Haze operates out of three hubs: Chicago (Illinois), Dallas Fort Worth (Texas) and Denver (Colorado). She is also available for destination events anywhere in the world." },
  { category: "Locations", question: "Do you charge travel fees?", answer: "Events in Chicago, Dallas Fort Worth and Denver plus 100 miles radius have ZERO travel fees. Events beyond those regions will be priced upon assessment." },
  { category: "Logistics & Reliability", question: "Are you insured?", answer: "Yes, DJ Miss Haze carries full liability insurance. If your venue requires a Certificate of Insurance, we are happy to provide it directly to them at no extra charge." },
];

const OTHER_FAQ: FAQItem[] = [
  { category: "DJ & MC Services", question: "Can you DJ and MC?", answer: "Yes, DJ Miss Haze is a professional DJ with live, dynamic music mixing who also MCs her events. She handles all necessary announcements, introductions, and coordinates with your team to ensure every timeline transition is executed flawlessly." },
  { category: "DJ & MC Services", question: "How experienced are you with PR Shows and Brand Events?", answer: "Over the past 10 years, DJ Miss Haze has worked with publicists, brands, and creative agencies on events ranging from red carpet galas and brand activations to product launches and influencer events." },
  { category: "DJ & MC Services", question: "Can you play multiple genres?", answer: "Absolutely. DJ Miss Haze specializes in Classics, Country, EDM, Hip Hop/Rap, R&B and Soul, Latin, Pop / Top 40. She curates music to match your brand's identity and event objectives." },
  { category: "Booking", question: "How far in advance should I book?", answer: "We recommend booking 2-6 months in advance. DJ Miss Haze is able to cover last minute events and offer same-day emergency DJ services, subject to availability." },
  { category: "Booking", question: "What is your minimum booking fee?", answer: "Event pricing varies based on scope, location, and requirements. Final pricing will be determined during the first contact call or zoom meeting with DJ Miss Haze." },
  { category: "Booking", question: "Which payment methods do you accept?", answer: "DJ Miss Haze offers the following payment methods: ACH, Cash, Check, Credit and Debit Card, Cryptocurrencies, Wire, and Zelle." },
  { category: "Equipment", question: "What equipment do you bring?", answer: "DJ Miss Haze brings a professional BOSE speaker system, Shure cordless microphone with mic stand, and dance floor lighting. All equipment is insured, maintained and tested before every event." },
  { category: "Locations", question: "Which locations do you service?", answer: "DJ Miss Haze operates out of three hubs: Chicago (Illinois), Dallas Fort Worth (Texas) and Denver (Colorado). She is also available for nationwide and international travel." },
  { category: "Locations", question: "Do you charge travel fees?", answer: "Events in Chicago, Dallas Fort Worth and Denver plus 100 miles radius have ZERO travel fees. Events beyond are subject to travel fees." },
  { category: "Logistics & Reliability", question: "Are you insured?", answer: "Yes, DJ Miss Haze carries full liability insurance. If your venue requires a Certificate of Insurance, we are happy to provide it directly to them at no extra charge." },
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
      items: ["HIGH-ENERGY", "CLASSY & TIMELESS", "BOLD & ECLECTIC", "SOPHISTICATED", "ON BRAND", "FUN & INCLUSIVE"],
    },
    signature: {
      quote: "DJ Miss Haze delivers a premium experience that aligns with your brand and engages your audience.",
      description: "Specializing in Corporate Events across Chicago, Dallas\u2013Fort Worth, and Denver plus surrounding areas, DJ Miss Haze is trusted by companies, agencies, and event planners who expect professionalism, adaptability, and premium sound design. She is also available for nationwide and destination travel.",
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
      items: ["HIGH-ENERGY", "MEMORABLE", "PERSONALIZED", "SOPHISTICATED", "FUN", "UNFORGETTABLE"],
    },
    signature: {
      quote: "Every private celebration deserves an atmosphere that feels both exclusive and effortlessly fun.",
      description: "Specializing in Private Events across Chicago, Dallas\u2013Fort Worth, and Denver plus surrounding areas, DJ Miss Haze brings sophistication and energy to birthdays, anniversaries, holiday parties, and intimate gatherings. Whether it's an elegant cocktail affair or a high-energy dance party, she curates the perfect vibe for you and your guests. Available for nationwide and destination travel.",
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
      title: "PARTY REVIEWS",
      ratingText: "5.0 stars",
      items: [
        { author: "Sarah M.", role: "Birthday Party Host", text: "DJ Miss Haze made our party unforgettable! She read the room perfectly and kept everyone dancing all night long.", rating: 5 },
        { author: "Marcus T.", role: "Birthday Party Host", text: "Incredible energy and professionalism. She knows exactly how to get the party started and keep it going!", rating: 5 },
        { author: "Elena R.", role: "Event Planner", text: "I've worked with many DJs over the years, and DJ Miss Haze is truly one of the best. Professional, talented, and always brings the perfect vibe.", rating: 5 },
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
      description: "Specializing in PR Shows, Brand Activations, and High-Profile Events across Chicago, Dallas\u2013Fort Worth, and Denver plus surrounding areas, DJ Miss Haze collaborates with publicists, brands, and creative agencies to deliver unforgettable experiences. Her ability to elevate any space with curated sound design makes her the go-to choice for launches, galas, and exclusive showcases. Available for nationwide and international travel.",
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
        { author: "Sarah M.", role: "Birthday Party Host", text: "DJ Miss Haze made our party unforgettable! She read the room perfectly and kept everyone dancing all night long.", rating: 5 },
        { author: "Marcus T.", role: "Birthday Party Host", text: "Incredible energy and professionalism. She knows exactly how to get the party started and keep it going!", rating: 5 },
        { author: "Elena R.", role: "Event Planner", text: "I've worked with many DJs over the years, and DJ Miss Haze is truly one of the best. Professional, talented, and always brings the perfect vibe.", rating: 5 },
      ],
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
