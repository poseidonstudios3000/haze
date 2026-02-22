import { SiNike, SiBmw, SiHyundai } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";

const corporateClients = [
  { name: "BMW", icon: SiBmw },
  { name: "BUICK", icon: null },
  { name: "CONVERSE", icon: null },
  { name: "DENVER ART MUSEUM", icon: null },
  { name: "JE DUNN", icon: null },
  { name: "Hyundai", icon: SiHyundai },
  { name: "MACY'S", icon: null },
  { name: "NEIMAN MARCUS", icon: null },
  { name: "Nike", icon: SiNike },
  { name: "RANE", icon: null },
  { name: "THE NORTH FACE", icon: null },
  { name: "UNIVERSITY OF CHICAGO", icon: null },
];

const weddingPublications = [
  { name: "CARATS & CAKE" },
  { name: "ENGAGED LIFE" },
  { name: "SOCIÉTÉ PRIVÉE" },
];

export function ClientLogos() {
  const { layout } = useTheme();
  const isWedding = layout === "wedding";
  const clients = isWedding ? weddingPublications : corporateClients;
  const title = isWedding ? "As Seen In" : "Trusted by Leading Brands";

  if (isWedding) {
    return (
      <section className="py-8 md:py-12 bg-zinc-900/30 border-y border-white/5">
        <div className="container mx-auto px-4 mb-6">
          <p className="text-center text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest">
            {title}
          </p>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
            {weddingPublications.map((pub, index) => (
              <span 
                key={index}
                className="text-lg md:text-xl font-bold text-white/60 hover:text-primary transition-colors whitespace-nowrap uppercase tracking-wider"
              >
                {pub.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 overflow-hidden bg-zinc-900/30 border-y border-white/5">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest">
          {title}
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee">
          {corporateClients.map((client, index) => (
            <div
              key={`a-${index}`}
              className="flex items-center justify-center mx-8 md:mx-12"
            >
              {client.icon ? (
                <client.icon className="h-8 md:h-10 w-auto text-white/60 hover:text-primary transition-colors" />
              ) : (
                <span className="text-lg md:text-xl font-bold text-white/60 hover:text-primary transition-colors whitespace-nowrap uppercase tracking-wider">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee" aria-hidden="true">
          {corporateClients.map((client, index) => (
            <div
              key={`b-${index}`}
              className="flex items-center justify-center mx-8 md:mx-12"
            >
              {client.icon ? (
                <client.icon className="h-8 md:h-10 w-auto text-white/60 hover:text-primary transition-colors" />
              ) : (
                <span className="text-lg md:text-xl font-bold text-white/60 hover:text-primary transition-colors whitespace-nowrap uppercase tracking-wider">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
