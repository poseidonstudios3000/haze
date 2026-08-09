import type { EventType } from "@/hooks/use-event-content";
import { PRICING_TIERS, PRICING_ORDER, PRICING_INCLUDED } from "@/hooks/use-event-content";

// Visible pricing section — real page content, not a FAQ answer and not driven
// by the DB-merged `faq` section, so it can't be silently overridden.
//
// Pass `eventType` on a page tied to one event type (a wedding or corporate
// page) to show that single tier; omit it on the hub pages to show all tiers.
export function InvestmentSection({ eventType }: { eventType?: EventType }) {
  const tiers = eventType
    ? [{ key: eventType, ...PRICING_TIERS[eventType] }]
    : PRICING_ORDER.map((key) => ({ key, ...PRICING_TIERS[key] }));
  const single = tiers.length === 1;

  return (
    <section id="investment" className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">Investment</h2>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </div>

        {single ? (
          <div className="space-y-2">
            <p className="text-sm font-black font-display uppercase tracking-widest text-primary">
              {tiers[0].label}
            </p>
            <p className="text-2xl md:text-4xl font-black font-display text-white leading-tight">
              {tiers[0].investment}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-1"
              >
                <p className="text-sm font-black font-display uppercase tracking-widest text-primary">
                  {tier.label}
                </p>
                <p className="text-lg md:text-xl font-bold text-white leading-snug">
                  {tier.investment}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-white/5 space-y-4">
          <h3 className="text-lg font-black font-display uppercase text-white">Every booking includes</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {PRICING_INCLUDED.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
