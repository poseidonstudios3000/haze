import { motion } from "framer-motion";
import { PartyPopper, Users, Sparkles, Music, Heart, Clock } from "lucide-react";

const features = [
  {
    icon: PartyPopper,
    title: "Milestone Celebrations",
    description: "Birthdays, anniversaries, graduations, and life's big moments deserve big music energy."
  },
  {
    icon: Users,
    title: "Intimate Gatherings",
    description: "From backyard BBQs to elegant dinner parties, music tailored to your guest list and vibe."
  },
  {
    icon: Sparkles,
    title: "Holiday Events",
    description: "New Year's Eve, Halloween bashes, themed parties: we bring the energy to match your celebration."
  },
  {
    icon: Music,
    title: "Custom Playlists",
    description: "Your favorite genres, must-play songs, and do-not-play list all curated for your event."
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Every private event is unique. We work closely with you to capture your vision perfectly."
  },
  {
    icon: Clock,
    title: "Flexible Packages",
    description: "From cocktail hours to all-night dance parties, packages designed for your timeline and budget."
  }
];

export function PrivateEventPlanning() {
  return (
    <>
      <section id="why-private" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-black font-display mb-4 uppercase" data-testid="text-private-celebration-heading">Your Celebration, Your Sound</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5"
                data-testid={`card-private-feature-${index}`}
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider" data-testid={`text-private-feature-title-${index}`}>{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-private-feature-desc-${index}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 space-y-6 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black font-display uppercase">
              Host a party your guests will <span className="text-primary italic pr-1">rave about</span> for years
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Whether it's an intimate gathering of 20 or a blowout bash of 200+, DJ Miss Haze brings the energy and expertise to entertain your guests the right way at your private event.
            </p>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block px-8 py-3 bg-primary text-black font-black font-display tracking-tighter rounded-full hover:scale-105 transition-all beam-effect uppercase"
              data-testid="button-private-cta"
            >
              Plan Your Party
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
