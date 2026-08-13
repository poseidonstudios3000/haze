import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { FooterCTA } from "@/components/FooterCTA";
import { FAQ } from "@/components/FAQ";
import { getSeoPage } from "@shared/seo";
import type { FAQContent } from "@/hooks/use-event-content";

// Standalone /faq content — general questions across all markets. City-specific
// questions stay on the city pages. Some intentional overlap on the core
// questions (equipment, insurance, lead time) so each page stands alone; the
// wording differs.
//
// TODO(client): email address pending — she wants one on the site but hasn't
// given it yet. Everything else here is confirmed.
const FAQ_PAGE_CONTENT: FAQContent = {
  title: "FREQUENTLY ASKED",
  items: [
    // 1. Booking & Availability
    { category: "Booking & Availability", question: "How far in advance should I book?", answer: "It depends on the event and the market. Weddings run 6 to 24 months in Chicago and Denver, but a shorter 2 to 8 months in Dallas–Fort Worth. Corporate events are typically 2 to 4 months (the first two weeks of December much further out), and private events 1 to 6 months. I'm already booking into 2028, so enquire early — off-peak dates and weekdays have far more availability, and if your date is close, ask anyway." },
    { category: "Booking & Availability", question: "How do I check if my date is available?", answer: "Send an enquiry with your date, location and event type. I'll come back with availability and a quote. If your date is taken I'll tell you straight away rather than leaving you waiting." },
    { category: "Booking & Availability", question: "Do you take more than one event per day?", answer: "Usually one — and always just one for a wedding, which gets my full day. For shorter events I can sometimes take two, like a wedding and a separate afterparty, or a corporate event and its afterparty. Ask about your date and I'll tell you what's possible." },
    { category: "Booking & Availability", question: "What happens if you're ill or can't make it?", answer: "You book me and you get me — I don't hand your event off to someone else. For a genuine emergency only, I keep trusted professional DJs I can call on, and your event details, timeline and music selections are documented so a stand-in wouldn't be starting from nothing. It's never happened, but planning for it is part of the job." },
    { category: "Booking & Availability", question: "Do you require a deposit?", answer: "Yes — a retainer secures your date, with the balance due on the day of the event. Terms are set out in the contract before anything is signed." },

    // 2. Services
    { category: "Services", question: "Do you DJ and MC, or just DJ?", answer: "Both, as a single service. Grand entrance, toasts, parent dances, cake cutting, closing announcements — I handle the microphone and the room's attention alongside the music. You don't need to hire a separate MC, and your coordinator doesn't end up doing it." },
    { category: "Services", question: "What kinds of events do you take?", answer: "Weddings, corporate events, private parties, milestone celebrations and brand activations. Across Chicago, Dallas–Fort Worth, Denver, and destination events beyond those." },
    { category: "Services", question: "Can you handle multiple cultural traditions or languages?", answer: "Yes, and I prepare for it properly. Chicago and DFW families in particular often blend traditions — the music, the running order and the correct pronunciation of every name I'll announce are all worked out in advance rather than improvised. I DJ and MC in English and German; for bilingual receptions I work with a bilingual MC on request, common across both markets. I welcome and respect all cultures, religions, identities and orientations." },
    { category: "Services", question: "Do you do ceremony music as well as the reception?", answer: "Yes. Processional, recessional, cocktail hour and reception can all be covered, with the sound set up appropriately for each — a ceremony needs something very different from a dance floor." },
    { category: "Services", question: "Can you take requests from guests?", answer: "That's your call, and we agree it in advance. Some couples want an open request policy, others want a do-not-play list respected without exception. Either works — what matters is deciding beforehand rather than during." },

    // 3. Equipment & Production
    { category: "Equipment & Production", question: "What's included when I book you?", answer: "A professional BOSE sound system, a Shure wireless handheld microphone and stand, and dance floor lighting come as standard with every booking." },
    { category: "Equipment & Production", question: "What optional extras are available?", answer: "A stationary photo booth, a 360 photo booth, a mobile photo booth trailer, an audio guestbook, CO2 cannons, a fog machine and glow sticks — with more available on request. Popular additions for brand activations and larger celebrations." },
    { category: "Equipment & Production", question: "Do you provide microphones for speeches?", answer: "Yes — a Shure wireless handheld and stand are included. For events with multiple speakers or a stage setup, tell me in advance and I'll plan accordingly." },
    { category: "Equipment & Production", question: "Our venue has limited power. Is that a problem?", answer: "It's common at ranch, barn and mountain venues, and it's a planning question rather than a problem. I confirm the available electrical supply with your venue in advance and configure the system around what's actually there." },
    { category: "Equipment & Production", question: "Can you cover both an indoor and outdoor space?", answer: "Yes, though it needs planning. Ceremonies outdoors and receptions indoors is a standard setup. Where the two run simultaneously, we discuss the equipment requirements upfront." },

    // 4. Travel & Locations
    { category: "Travel & Locations", question: "Which areas do you cover?", answer: "Chicago and Chicagoland — Elmhurst, Naperville, Oak Brook, Glenview, Hinsdale, Lombard, Schaumburg, Hoffman Estates, St. Charles, Geneva and Bolingbrook. Dallas–Fort Worth — Plano, Frisco, McKinney, Allen, Prosper, Celina, Denton, Highland Park and Hebron. Denver and Colorado — Littleton, Golden, Highlands Ranch, Parker, Castle Pines, Larkspur, plus Vail, Breckenridge, Estes Park and north to Loveland, Lyons and Fort Collins." },
    { category: "Travel & Locations", question: "Where are you based — are you local to each market?", answer: "DJ Miss Haze is Chicago-based. She splits time between Chicago and Denver through summer and autumn, and travels to Dallas–Fort Worth mainly in winter but is available there year-round. She also keeps a full set of equipment in each market, so gear never has to travel far and setup is never a compromise." },
    { category: "Travel & Locations", question: "Do you travel outside those areas?", answer: "Yes — destination events are welcome. Within 100 miles of Chicago, Dallas or Denver there's no travel surcharge; destinations beyond that are available with a travel fee, quoted upfront." },
    { category: "Travel & Locations", question: "Is there a travel charge for suburbs?", answer: "No surcharge within 100 miles of any of the three metros — Chicago, Dallas or Denver. Anything beyond that carries a travel fee, quoted clearly before you book." },
    { category: "Travel & Locations", question: "Do you cover mountain venues in Colorado?", answer: "Yes — Estes Park, Vail, Breckenridge and the surrounding areas. Mountain venues bring their own requirements: limited power, unreliable cell signal, and real drive time from Denver. All three are planned for in advance rather than discovered on the day." },
    { category: "Travel & Locations", question: "Can you cover a multi-day destination wedding?", answer: "Yes, and it works better planned as one event rather than three. A welcome party, the wedding and a farewell brunch each need a different energy — planning them together makes the whole weekend feel intentional instead of assembled." },

    // 5. Planning & Timeline
    { category: "Planning & Timeline", question: "How does the planning process work?", answer: "After booking we work through your timeline, music preferences, must-play and do-not-play lists, and the specific moments that matter to you. Closer to the date we confirm the run of show and I coordinate directly with your venue and other vendors." },
    { category: "Planning & Timeline", question: "Do you work with our wedding planner or coordinator?", answer: "Yes, routinely. I ask for the timeline in advance, confirm the cue list, and coordinate on the day so nothing overlaps or gets missed." },
    { category: "Planning & Timeline", question: "Can we choose the music?", answer: "Yes. Most couples give me a sense of direction plus specific must-plays and a do-not-play list, then trust me to read the room within that. Some want a fully planned set. Both work." },
    { category: "Planning & Timeline", question: "When do you arrive and set up?", answer: "Early enough that setup is complete and tested well before guests arrive. Exact timing depends on the venue's load-in rules — many downtown and high-rise venues schedule dock access and freight elevators in advance, and I handle that with them directly." },
    { category: "Planning & Timeline", question: "What if our timeline runs late?", answer: "It usually does, and it's normal. Adjusting on the fly is part of the job — I'll work with your coordinator to reshape the evening so the important moments still land properly." },

    // 6. Corporate Events
    { category: "Corporate Events", question: "Do you work with our AV company or production team?", answer: "Yes. I ask for the run of show ahead of time, confirm the cue list, and coordinate on site so audio handovers are clean. If you have a production team, I fit into their plan rather than the other way around." },
    { category: "Corporate Events", question: "Can you MC the awards or presentation segment?", answer: "Yes — introductions, award announcements, raffle draws, thank-yous and closing remarks, with clean microphone handovers to your speakers. Having one person cover both music and microphone removes a whole layer of coordination." },
    { category: "Corporate Events", question: "Our event is networking rather than dancing. Does that work?", answer: "Absolutely. Plenty of corporate evenings never open a dance floor. The skill there is restraint — the right music at a level where people can actually talk, with the energy shifting as the evening progresses." },
    { category: "Corporate Events", question: "Do you have liability insurance?", answer: "Yes. A Certificate of Insurance is available on request, which most venues require from vendors before load-in." },
    { category: "Corporate Events", question: "Can you handle events for several hundred guests?", answer: "Yes. Larger rooms need different speaker placement and coverage planning, which is confirmed with the venue in advance." },

    // 7. Practical
    { category: "Practical", question: "How much does it cost?", answer: "DJ Miss Haze thinks of it as an investment, and it depends on the event type, date and any add-ons. Investment begins at $3,500 for weddings in main season (off-season pricing available), $2,500 for corporate events and $2,200 for private events; other events are priced upon request. Every booking includes custom DJ and MC services, preparation meetings, vendor collaboration, custom song edits for key moments, and the full audio, microphone and dance-floor lighting setup. Send an enquiry with your details for a clear quote." },
    { category: "Practical", question: "What forms of payment do you accept?", answer: "Payment details are set out in the contract. A retainer secures the date, with the balance due on the day of the event." },
    { category: "Practical", question: "Do you carry backup equipment?", answer: "Yes — every piece of equipment I bring has a backup on site with me at the event. A failure mid-event isn't something to improvise around, so there's redundancy on everything that matters." },
    { category: "Practical", question: "Are you insured?", answer: "Yes, with a Certificate of Insurance available on request." },
    { category: "Practical", question: "How do we get started?", answer: "Send an enquiry with your date, location and event type, or book a Zoom call. From there we'll talk through what you're planning and whether it's a fit." },
  ],
};

export default function Faq() {
  useEffect(() => {
    document.title = getSeoPage("/faq").title;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-14">
      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-12 md:pt-20 pb-6 md:pb-10">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tighter">
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Booking, planning and everything in between — for weddings and events across Chicago, Dallas–Fort Worth and Denver.
          </p>
        </div>
      </section>

      {/* FAQ with FAQPage schema (answers are all in the DOM) */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <FAQ content={FAQ_PAGE_CONTENT} emitSchema />
      </section>

      <FooterCTA />

      {/* Bottom spacing clears the fixed FooterCTA bar */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
