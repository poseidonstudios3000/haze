import type {
  IntroContent,
  LocalMarketContent,
  LogisticsContent,
} from "@/hooks/use-event-content";

// City-only content blocks, shared by the city+service pages (Home) and the
// city hub (LocationPage) so both render the same way. Each returns null when
// its section is absent, so non-city pages simply don't show them.

export function CityIntro({ intro }: { intro?: IntroContent }) {
  if (!intro) return null;
  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="max-w-3xl mx-auto space-y-5">
        {intro.question && (
          <p className="text-xl md:text-3xl font-black font-display italic text-primary leading-tight">
            {intro.question}
          </p>
        )}
        {intro.body.map((paragraph, i) => (
          <p key={i} className="text-lg text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function CityLocalMarket({ localMarket }: { localMarket?: LocalMarketContent }) {
  if (!localMarket) return null;
  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">
            {localMarket.title}
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </div>
        {localMarket.lead && (
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            {localMarket.lead}
          </p>
        )}
        <div className="space-y-5">
          {localMarket.blocks.map((block, i) => (
            <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {block.label && <span className="text-white font-bold">{block.label} </span>}
              {block.text}
            </p>
          ))}
        </div>
        {localMarket.closing?.map((paragraph, i) => (
          <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function CityLogistics({ logistics }: { logistics?: LogisticsContent }) {
  if (!logistics) return null;
  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">
            {logistics.title}
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logistics.items.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-2"
            >
              <h3 className="text-base font-black font-display text-primary uppercase">
                {item.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
