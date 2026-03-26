import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scenario, findSandboxVariation, MerchantCompare } from "@/data/demoData";

interface InteractiveSandboxProps {
  scenario: Scenario;
}

const PillGroup = ({ label, options, selected, onSelect }: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) => (
  <div className="space-y-2">
    <span className="text-[11px] font-medium uppercase tracking-wider text-parleo-muted">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all ${
            selected === opt
              ? "border border-primary/30 bg-primary/[0.08] text-primary"
              : "border border-border bg-card text-foreground/50 hover:text-foreground/70"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const AnimatedPrice = ({ value, prefix = "$" }: { value: number; prefix?: string }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
    >
      {prefix}{value.toFixed(2)}
    </motion.span>
  </AnimatePresence>
);

const InteractiveSandbox = ({ scenario }: InteractiveSandboxProps) => {
  const [membership, setMembership] = useState("Top-tier");
  const [card, setCard] = useState("Premium Amex");
  const [channel, setChannel] = useState("Web");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"headline" | "trueCost">("trueCost");

  const variation = findSandboxVariation(scenario.sandboxVariations, membership, card, channel);
  const savings = scenario.sandboxListPrice - variation.netPrice;
  const savingsPct = ((savings / scenario.sandboxListPrice) * 100).toFixed(0);

  const triggerShimmer = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  }, []);

  useEffect(() => { triggerShimmer(); }, [membership, card, channel, triggerShimmer]);

  const sortedMerchants = [...scenario.merchantCompare].sort((a, b) =>
    sortBy === "headline" ? a.headlinePrice - b.headlinePrice : a.trueCost - b.trueCost
  );

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-content px-6 md:px-20">
        <span className="font-label text-parleo-muted">TRY IT YOURSELF</span>
        <h2 className="mt-3 font-heading text-[28px] text-foreground md:text-[40px]" style={{ lineHeight: 1.1 }}>
          Change the inputs.<br />Watch the price change.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-[2fr_3fr]">
          {/* Controls */}
          <div className="space-y-6">
            <PillGroup label="Membership Tier" options={["Non-member", "Base", "Mid-tier", "Top-tier"]} selected={membership} onSelect={setMembership} />
            <PillGroup label="Card Type" options={["No card", "Generic Visa", "Premium Amex", "Store card"]} selected={card} onSelect={setCard} />
            <PillGroup label="Channel" options={["Web", "In-app"]} selected={channel} onSelect={setChannel} />
          </div>

          {/* Live result */}
          <div className={`rounded-xl border border-border bg-card p-6 transition-opacity ${loading ? "opacity-50" : "opacity-100"}`} style={{ boxShadow: "var(--shadow-elevated)" }}>
            <div className="text-[15px] font-semibold text-foreground mb-4">{scenario.sandboxProduct}</div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-[14px]">
                <span className="text-foreground/60">List price</span>
                <span className="font-medium text-foreground">${scenario.sandboxListPrice.toFixed(2)}</span>
              </div>
              <div className="h-px bg-border" />

              {variation.loyaltyDiscount > 0 && (
                <div className="flex justify-between text-[14px]">
                  <span className="text-foreground/60">{variation.loyaltyLabel}</span>
                  <span className="font-medium text-primary">−<AnimatedPrice value={variation.loyaltyDiscount} /></span>
                </div>
              )}
              {variation.cardDiscount > 0 && (
                <div className="flex justify-between text-[14px]">
                  <span className="text-foreground/60">{variation.cardLabel}</span>
                  <span className="font-medium text-primary">−<AnimatedPrice value={variation.cardDiscount} /></span>
                </div>
              )}
              {variation.pointsValue > 0 && (
                <div className="flex justify-between text-[14px]">
                  <span className="text-foreground/60">{variation.pointsLabel}</span>
                  <span className="font-medium text-primary">−<AnimatedPrice value={variation.pointsValue} /></span>
                </div>
              )}

              {variation.loyaltyDiscount === 0 && variation.cardDiscount === 0 && variation.pointsValue === 0 && (
                <div className="text-[13px] text-foreground/40 italic py-2">No incentives available for this combination</div>
              )}

              <div className="h-px bg-border" />
              <div className="flex justify-between text-[15px] pt-1">
                <span className="font-semibold text-foreground">Net effective price</span>
                <span className="text-[20px] font-bold text-primary"><AnimatedPrice value={variation.netPrice} /></span>
              </div>

              {savings > 0 && (
                <div className="text-right text-[13px] font-medium text-primary">
                  You save $<AnimatedPrice value={savings} prefix="" /> ({savingsPct}%)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Multi-merchant compare */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[17px] font-semibold text-foreground">Multi-Merchant Compare</h3>
            <div className="flex items-center gap-2 text-[12px] text-foreground/50">
              Sort by:
              <button onClick={() => setSortBy("headline")} className={`px-2 py-1 rounded ${sortBy === "headline" ? "bg-secondary text-foreground font-medium" : ""}`}>
                Headline Price
              </button>
              <button onClick={() => setSortBy("trueCost")} className={`px-2 py-1 rounded ${sortBy === "trueCost" ? "bg-primary/10 text-primary font-medium" : ""}`}>
                True Cost
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {sortedMerchants.map((m, i) => {
                const isBest = i === 0;
                return (
                  <motion.div
                    key={m.name}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl border p-5 text-center transition-all ${
                      isBest && sortBy === "trueCost"
                        ? "border-primary/30 bg-primary/[0.03]"
                        : "border-border bg-card"
                    }`}
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    {isBest && sortBy === "trueCost" && (
                      <span className="mb-2 inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        Best Value
                      </span>
                    )}
                    <div className="text-[14px] font-semibold text-foreground">{m.name}</div>
                    <div className="mt-2 text-[12px] text-foreground/40">Headline: ${m.headlinePrice.toFixed(2)}</div>
                    <div className={`mt-1 text-[18px] font-bold ${isBest && sortBy === "trueCost" ? "text-primary" : "text-foreground"}`}>
                      ${m.trueCost.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-foreground/40">true cost</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSandbox;
