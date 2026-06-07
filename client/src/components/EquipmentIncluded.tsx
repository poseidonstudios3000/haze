import {
  CheckCircle2,
  MapPin,
  Mic2,
  ShieldCheck,
  Sparkles,
  Speaker,
  Zap,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const copy = {
  wedding: {
    eyebrow: "Production Included",
    title: "Sound, Mics, Lighting, and Wedding-Ready Extras",
    intro:
      "DJ Miss Haze brings more than music. Every wedding booking includes the core production gear needed for ceremony, announcements, dinner, dancing, and a confident reception flow.",
    note:
      "Wedding clients also receive complimentary yard games and glow sticks, with optional effects available for high-impact moments.",
    addOns: "Photo booth, dancing on the clouds, smoke/fog, CO2 cannons, glow sticks, and yard games.",
  },
  corporate_event: {
    eyebrow: "Professional Event Production",
    title: "Clean Sound and Clear Announcements for Business Events",
    intro:
      "Corporate events need a DJ who can support speeches, awards, presentations, networking, and dancing without making production feel chaotic. DJ Miss Haze brings polished gear and room-aware sound.",
    note:
      "The setup is designed for professional presentation, reliable announcements, and brand-appropriate energy.",
    addOns: "Photo booth, audio guestbook, CO2 cannons, lighting, smoke/fog, and event effects.",
  },
  private_event: {
    eyebrow: "Party-Ready Setup",
    title: "Everything Needed to Make the Room Feel Alive",
    intro:
      "Private events still need professional sound, clear hosting, and a setup that fits the room. DJ Miss Haze brings the essentials so your party feels intentional from the first song.",
    note:
      "Packages can scale for intimate gatherings, milestone birthdays, holiday parties, and high-energy celebrations.",
    addOns: "Photo booth, dancing on the clouds, smoke/fog, CO2 cannons, glow sticks, and yard games.",
  },
  pr_show: {
    eyebrow: "Activation-Ready Production",
    title: "Sound Support for Brands, Launches, and High-Profile Events",
    intro:
      "Brand activations and PR events need sound that supports the room, the run of show, and the message. DJ Miss Haze brings a clean, flexible setup built for polished guest experiences.",
    note:
      "The production approach supports announcements, transitions, arrivals, product moments, and high-energy crowd shifts.",
    addOns: "Photo booth, lighting, audio guestbook, monogram, smoke/fog, CO2 cannons, and event effects.",
  },
};

const includedItems = [
  {
    icon: Speaker,
    title: "Professional BOSE Sound",
    description: "A premium speaker system selected for clear vocals, full music playback, and room-appropriate coverage.",
  },
  {
    icon: Mic2,
    title: "Shure Wireless Handheld Mic",
    description: "A cordless handheld microphone for announcements, speeches, toasts, introductions, and guest-facing moments.",
  },
  {
    icon: CheckCircle2,
    title: "Mic Stand Included",
    description: "A microphone stand is included for ceremonies, speeches, presentations, and hands-free speaking moments.",
  },
  {
    icon: Sparkles,
    title: "Dance Floor Lighting",
    description: "Lighting is included to help the room transition from polished event flow into dance-floor energy.",
  },
  {
    icon: ShieldCheck,
    title: "Insured and Venue-Ready",
    description: "Gear is maintained and tested, and a Certificate of Insurance can be provided when venues require it.",
  },
  {
    icon: MapPin,
    title: "Chicago, Dallas, Denver Hubs",
    description: "Complete equipment access across all three hubs helps reduce travel complexity for local events.",
  },
];

export function EquipmentIncluded() {
  const { layout } = useTheme();
  const content = copy[layout];

  return (
    <section id="equipment" className="container mx-auto px-4 py-12 md:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.24em] text-primary">
              {content.eyebrow}
            </p>
            <h2 className="text-2xl md:text-4xl font-black font-display uppercase leading-tight">
              {content.title}
            </h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
          <p className="lg:col-span-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {content.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {includedItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5 md:p-6"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-base md:text-lg font-black font-display uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          <div className="lg:col-span-5 bg-primary text-black rounded-2xl p-5 md:p-6">
            <Zap className="w-8 h-8 mb-4" />
            <h3 className="text-lg md:text-xl font-black font-display uppercase mb-2">
              Optional Add-Ons
            </h3>
            <p className="text-sm md:text-base font-semibold leading-relaxed">
              {content.addOns}
            </p>
          </div>
          <div className="lg:col-span-7 bg-zinc-900/50 border border-white/5 rounded-2xl p-5 md:p-6 flex items-center">
            <p className="text-base md:text-lg text-white leading-relaxed font-semibold">
              {content.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
