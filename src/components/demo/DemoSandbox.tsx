import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { type Scenario, scenarios } from "./scenarioData";

interface Props {
  scenario: Scenario;
}

const tierOptions = ["Non-member", "Base", "Mid-tier", "Top-tier"] as const;
const cardOptions = ["No card", "Generic Visa", "Premium Amex", "Store card"] as const;
type Tier = typeof tierOptions[number];
type Card = typeof cardOptions[number];

const tierMultiplier: Record<Tier, number> = { "Non-member": 0, "Base": 0.25, "Mid-tier": 0.5, "Top-tier": 1 };

const SegmentedControl = ({ options, value, onChange }: { options: readonly string[]; value: string; onChange: (v: string) => void }) => (
  <div className="inline-flex flex-wrap rounded-lg border border-border bg-secondary p-0.5">
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-all ${
          value === opt ? "bg-card text-foreground shadow-sm" : "text-parleo-muted hover:text-foreground"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const AnimatedNumber = ({ value, prefix = "$" }: { value: number; prefix?: string }) => {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number>();

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;
    if (from === to) return;

    const duration = 300;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(from + (to - from) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  return <span>{prefix}{display.toFixed(2)}</span>;
};

const DemoSandbox = ({ scenario }: Props) => {
  const data = scenarios[scenario];
  const sb = data.sandbox;

  const [tier, setTier] = useState<Tier>("Top-tier");
  const [card, setCard] = useState<Card>("Premium Amex");

  useEffect(() => { setTier("Top-tier"); setCard("Premium Amex"); }, [scenario]);

  const pricing = useMemo(() => {
    const mult = tierMultiplier[tier];
    const loyalty = sb.loyaltyFull * mult;
    const points = sb.pointsFull * mult;

    let cardDiscount = 0;
    if (card === "No card") cardDiscount = 0;
    else if (card === "Generic Visa") cardDiscount = Math.round(sb.listPrice * 0.01 * 100) / 100;
    else if (card === "Premium Amex") cardDiscount = sb.cardFull;
    else if (card === "Store card") cardDiscount = Math.round(sb.listPrice * 0.05 * 100) / 100;

    const net = Math.max(sb.listPrice - loyalty - cardDiscount - points, 0);
    const totalSavings = sb.listPrice - net;
    const savingsPct = sb.listPrice > 0 ? Math.round((totalSavings / sb.listPrice) * 100) : 0;
    return { loyalty, cardDiscount, points, net, totalSavings, savingsPct };
  }, [tier, card, sb]);

  const [sortByCost, setSortByCost] = useState(true);
  const sortedMerchants = useMemo(() => {
    const m = [...data.merchants];
    return sortByCost ? m.sort((a, b) => a.trueCost - b.trueCost) : m.sort((a, b) => a.headlinePrice - b.headlinePrice);
  }, [data.merchants, sortByCost]);

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-20">
        <div className="font-label mb-3 text-primary">Try It Yourself</div>
        <h2 className="font-heading mb-6 text-[28px] text-foreground md:text-[40px]">
          Change the inputs. Watch the price change.
        </h2>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Controls */}
          <div className="w-full md:w-[40%]">
            <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="mb-4">
                <div className="mb-2 text-[13px] font-semibold text-foreground">Membership Tier</div>
                <SegmentedControl options={tierOptions} value={tier} onChange={(v) => setTier(v as Tier)} />
              </div>
              <div>
                <div className="mb-2 text-[13px] font-semibold text-foreground">Card Type</div>
                <SegmentedControl options={cardOptions} value={card} onChange={(v) => setCard(v as Card)} />
              </div>
            </div>
          </div>

          {/* Price waterfall */}
          <div className="w-full md:w-[60%]">
            <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="mb-3 text-[15px] font-semibold text-foreground">{data.product}</div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-foreground">List Price</span>
                  <span className="font-semibold text-foreground">${sb.listPrice.toFixed(2)}</span>
                </div>
                <div className="h-px bg-border" />

                <div className="flex items-center justify-between text-[14px]">
                  <span className={pricing.loyalty === 0 ? "text-parleo-muted" : "text-foreground"}>
                    {pricing.loyalty === 0 ? "No loyalty program" : sb.loyaltyLabel}
                  </span>
                  <span className={`font-medium ${pricing.loyalty === 0 ? "text-parleo-muted" : "text-[hsl(var(--success))]"}`}>
                    {pricing.loyalty === 0 ? "$0.00" : <>−<AnimatedNumber value={pricing.loyalty} /></>}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[14px]">
                  <span className={pricing.cardDiscount === 0 ? "text-parleo-muted" : "text-foreground"}>
                    {card === "No card" ? "No card offers" : card === "Generic Visa" ? "1% Visa cashback" : card === "Store card" ? "5% store discount" : sb.cardLabel}
                  </span>
                  <span className={`font-medium ${pricing.cardDiscount === 0 ? "text-parleo-muted" : "text-[hsl(var(--success))]"}`}>
                    {pricing.cardDiscount === 0 ? "$0.00" : <>−<AnimatedNumber value={pricing.cardDiscount} /></>}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[14px]">
                  <span className={pricing.points === 0 ? "text-parleo-muted" : "text-foreground"}>
                    {pricing.points === 0 ? "No points value" : sb.pointsLabel}
                  </span>
                  <span className={`font-medium ${pricing.points === 0 ? "text-parleo-muted" : "text-[hsl(var(--success))]"}`}>
                    {pricing.points === 0 ? "$0.00" : <>−<AnimatedNumber value={pricing.points} /></>}
                  </span>
                </div>

                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-foreground">Net Effective Price</span>
                  <span className="text-[22px] font-bold text-[hsl(var(--success))]">
                    <AnimatedNumber value={pricing.net} />
                  </span>
                </div>

                {/* Savings line */}
                {pricing.totalSavings > 0 && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-[hsl(var(--success))]">
                      You save ${pricing.totalSavings.toFixed(2)} ({pricing.savingsPct}%)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Merchant compare */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[15px] font-semibold text-foreground">Multi-Merchant Compare</div>
            <div className="inline-flex rounded-lg border border-border bg-secondary p-0.5">
              {["Headline Price", "True Cost"].map((label) => {
                const active = label === "True Cost" ? sortByCost : !sortByCost;
                return (
                  <button
                    key={label}
                    onClick={() => setSortByCost(label === "True Cost")}
                    className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-all ${
                      active ? "bg-card text-foreground shadow-sm" : "text-parleo-muted"
                    }`}
                  >
                    Sort by {label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {sortedMerchants.map((m, i) => {
              const isBest = i === 0 && sortByCost;
              return (
                <motion.div
                  key={m.domain}
                  layout
                  transition={{ duration: 0.3 }}
                  className={`rounded-lg border bg-card p-4 ${
                    isBest ? "border-primary" : "border-border"
                  }`}
                  style={{ boxShadow: isBest ? "var(--shadow-card-hover)" : "var(--shadow-card)" }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-foreground">{m.name}</span>
                    {isBest && (
                      <span className="rounded-full border border-primary/20 bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-primary">BEST VALUE</span>
                    )}
                  </div>
                  <div className="text-[13px] text-parleo-muted">Headline: ${m.headlinePrice.toFixed(2)}</div>
                  <div className="text-[18px] font-bold text-foreground">True: ${m.trueCost.toFixed(2)}</div>
                  {m.note && <div className="mt-1 text-[12px] text-parleo-muted">{m.note}</div>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSandbox;
