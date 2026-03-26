import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Scenario, type CardType, scenarios } from "./scenarioData";

interface Props {
  scenario: Scenario;
}

const tierOptions = ["Non-member", "Base", "Mid-tier", "Top-tier"] as const;
const cardOptions = ["No card", "Generic Visa", "Premium Amex", "Store card"] as const;
type Tier = (typeof tierOptions)[number];
type Card = (typeof cardOptions)[number];

const tierMultiplier: Record<Tier, number> = { "Non-member": 0, Base: 0.25, "Mid-tier": 0.5, "Top-tier": 1 };
const cardToKey: Record<Card, CardType> = { "No card": "no-card", "Generic Visa": "visa", "Premium Amex": "amex", "Store card": "store" };

/* ── Segmented control with sliding highlight ── */
const SegmentedControl = ({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const idx = options.indexOf(value);
    const btns = containerRef.current.querySelectorAll<HTMLButtonElement>("button");
    if (btns[idx]) {
      setHighlight({ left: btns[idx].offsetLeft, width: btns[idx].offsetWidth });
    }
  }, [value, options]);

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">{label}</div>
      <div ref={containerRef} className="relative inline-flex flex-wrap rounded-lg border border-border bg-secondary/60 p-[3px]">
        <motion.div
          className="absolute top-[3px] rounded-md bg-primary"
          style={{ height: "calc(100% - 6px)" }}
          animate={{ left: highlight.left, width: highlight.width }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`relative z-10 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
              value === opt ? "text-primary-foreground" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Animated counting number ── */
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  return <span>{prefix}{display.toFixed(2)}</span>;
};

/* ── Main component ── */
const DemoSandbox = ({ scenario }: Props) => {
  const data = scenarios[scenario];
  const sm = data.sandboxMerchants;

  const [tier, setTier] = useState<Tier>("Top-tier");
  const [card, setCard] = useState<Card>("Premium Amex");
  const [sortByCost, setSortByCost] = useState(true);

  useEffect(() => {
    setTier("Top-tier");
    setCard("Premium Amex");
    setSortByCost(true);
  }, [scenario]);

  // Auto-switch to true cost sort when toggles change
  useEffect(() => { setSortByCost(true); }, [tier, card]);

  const computed = useMemo(() => {
    const mult = tierMultiplier[tier];
    const cardKey = cardToKey[card];

    return sm.map((m) => {
      const loyaltyDisc = Math.round(m.topLoyalty * mult * 100) / 100;
      const cardDisc = m.cardDiscounts[cardKey];
      const trueCost = Math.round((m.listPrice - loyaltyDisc - cardDisc) * 100) / 100;
      const savings = Math.round((m.listPrice - trueCost) * 100) / 100;
      const savingsPct = m.listPrice > 0 ? Math.round((savings / m.listPrice) * 100) : 0;

      const loyaltyLabel = mult > 0 ? m.loyaltyLabel : "No loyalty program";
      let cardLabel = "No card offers";
      if (cardKey !== "no-card") {
        cardLabel = cardDisc > 0 ? m.cardLabels[cardKey as Exclude<CardType, 'no-card'>] : m.cardLabels[cardKey as Exclude<CardType, 'no-card'>];
      }

      return { name: m.name, listPrice: m.listPrice, loyaltyDisc, loyaltyLabel, cardDisc, cardLabel, trueCost, savings, savingsPct };
    });
  }, [sm, tier, card]);

  const sorted = useMemo(() => {
    const arr = [...computed];
    return sortByCost ? arr.sort((a, b) => a.trueCost - b.trueCost) : arr.sort((a, b) => a.listPrice - b.listPrice);
  }, [computed, sortByCost]);

  const best = sorted[0];

  return (
    <div className="mt-4">
      <h3 className="font-heading text-[18px] text-foreground md:text-[22px]">
        Adjust the inputs. Watch rankings shift.
      </h3>
      <p className="mt-1 mb-4 text-[13px] leading-relaxed text-foreground/60">
        Each merchant has different loyalty programs and card partnerships. Your profile determines which merchant offers the best real value.
      </p>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Left: Controls */}
        <div className="w-full lg:w-[34%]">
          <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex flex-col gap-3.5">
              <SegmentedControl options={tierOptions} value={tier} onChange={(v) => setTier(v as Tier)} label="Membership Tier" />
              <SegmentedControl options={cardOptions} value={card} onChange={(v) => setCard(v as Card)} label="Card Type" />
            </div>
          </div>
        </div>

        {/* Right: Price breakdown for best merchant */}
        <div className="w-full lg:w-[66%]">
          <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="mb-2 text-[14px] font-semibold text-foreground">
              {data.product} <span className="text-foreground/40">·</span> <span className="text-primary">at {best.name}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-foreground">List Price</span>
                <span className="font-semibold text-foreground">${best.listPrice.toFixed(2)}</span>
              </div>
              <div className="h-px bg-border" />

              <div className="flex items-center justify-between text-[13px]">
                <span className={best.loyaltyDisc === 0 ? "text-foreground/35" : "text-foreground"}>
                  {best.loyaltyLabel}
                </span>
                <span className={`font-medium ${best.loyaltyDisc === 0 ? "text-foreground/35" : "text-[hsl(var(--success))]"}`}>
                  {best.loyaltyDisc === 0 ? "$0.00" : <>−<AnimatedNumber value={best.loyaltyDisc} /></>}
                </span>
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <span className={best.cardDisc === 0 ? "text-foreground/35" : "text-foreground"}>
                  {best.cardLabel}
                </span>
                <span className={`font-medium ${best.cardDisc === 0 ? "text-foreground/35" : "text-[hsl(var(--success))]"}`}>
                  {best.cardDisc === 0 ? "$0.00" : <>−<AnimatedNumber value={best.cardDisc} /></>}
                </span>
              </div>

              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-foreground">Net Effective Price</span>
                <span className="text-[22px] font-bold text-[hsl(var(--success))]">
                  <AnimatedNumber value={best.trueCost} />
                </span>
              </div>

              {best.savings > 0 && (
                <div className="text-[12px] font-medium text-[hsl(var(--success))]">
                  You save ${best.savings.toFixed(2)} ({best.savingsPct}%)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Merchant compare */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[14px] font-semibold text-foreground">Multi-Merchant Compare</div>
          <div className="inline-flex rounded-lg border border-border bg-secondary/60 p-0.5">
            {["Headline Price", "True Cost"].map((label) => {
              const active = label === "True Cost" ? sortByCost : !sortByCost;
              return (
                <button
                  key={label}
                  onClick={() => setSortByCost(label === "True Cost")}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all ${
                    active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  Sort by {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2.5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {sorted.map((m, i) => {
              const isBest = i === 0;
              return (
                <motion.div
                  key={m.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-xl border bg-card p-3.5 ${
                    isBest ? "border-primary" : "border-border"
                  }`}
                  style={{ boxShadow: isBest ? "var(--shadow-card-hover)" : "var(--shadow-card)" }}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-foreground">{m.name}</span>
                    {isBest && (
                      <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-1.5 py-0.5 text-[9px] font-bold text-primary">
                        BEST VALUE
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-foreground/50">Headline: ${m.listPrice.toFixed(2)}</div>
                  <div className="text-[17px] font-bold text-foreground">
                    True: <AnimatedNumber value={m.trueCost} />
                  </div>
                  {m.savings > 0 ? (
                    <div className="mt-0.5 text-[11px] font-medium text-[hsl(var(--success))]">
                      Save ${m.savings.toFixed(2)} ({m.savingsPct}%)
                    </div>
                  ) : (
                    <div className="mt-0.5 text-[11px] text-foreground/40">No discounts available</div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DemoSandbox;
