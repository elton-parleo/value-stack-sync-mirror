import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import LifestyleAccent from "./LifestyleAccent";
import BrandLogo from "./BrandLogo";
import skiiProduct from "@/assets/sk-ii-facial-treatment-essence.png.asset.json";

/* ───────────────────────────────────────────────────────────
   Section A · The shift
   Product: SK-II Facial Treatment Essence 230ml · $245 MAP
   Loyalty stacks are real, documented public programs.
   No retailer discounts the MAP. The variance lives in
   loyalty + co-brand card rewards. Sephora intentionally
   does NOT win here: outside of a Rouge event window, the
   department-store stacks beat it.
   ─────────────────────────────────────────────────────────── */

type Retailer = {
  name: string;
  program: string;
  tier: string;
  sticker: number;
  trueCost: number;
  stack: { label: string; value: number; type: "loyalty" | "card" }[];
  card: string;
};

const PRODUCT_PRICE = 245.0;

const RETAILERS: Retailer[] = [
  {
    name: "Nordstrom",
    program: "Nordy Club",
    tier: "Icon · Triple Points Day",
    sticker: PRODUCT_PRICE,
    trueCost: 222.95,
    card: "Nordstrom Visa",
    stack: [
      { label: "Icon 3× base on beauty", value: 14.7, type: "loyalty" },
      { label: "Nordstrom Visa · 3 pts / $1", value: 7.35, type: "card" },
    ],
  },
  {
    name: "Bloomingdale's",
    program: "Loyallist",
    tier: "Top of the List event",
    sticker: PRODUCT_PRICE,
    trueCost: 225.4,
    card: "Bloomie's Amex",
    stack: [
      { label: "Loyallist 6× base on beauty", value: 7.35, type: "loyalty" },
      { label: "Bloomie's Amex · 6% beauty", value: 12.25, type: "card" },
    ],
  },
  {
    name: "Saks",
    program: "SaksFirst",
    tier: "Platinum · Bonus reward",
    sticker: PRODUCT_PRICE,
    trueCost: 230.3,
    card: "SaksFirst Mastercard",
    stack: [
      { label: "SaksFirst 4 pts / $1", value: 9.8, type: "loyalty" },
      { label: "Mastercard · 2% back", value: 4.9, type: "card" },
    ],
  },
  {
    name: "Amazon",
    program: "Prime",
    tier: "Default agent destination",
    sticker: PRODUCT_PRICE,
    trueCost: 232.75,
    card: "Prime Visa",
    stack: [{ label: "Prime Visa · 5% back at Amazon", value: 12.25, type: "card" }],
  },
  {
    name: "Sephora",
    program: "Beauty Insider",
    tier: "Rouge · between events",
    sticker: PRODUCT_PRICE,
    trueCost: 235.2,
    card: "Sephora Visa",
    stack: [{ label: "Sephora Visa · 4% back", value: 9.8, type: "card" }],
  },
];

const fmt = (n: number) => `$${n.toFixed(2)}`;
const MAX_SAVINGS = Math.max(...RETAILERS.map((r) => r.sticker - r.trueCost));

/* ── Editorial product panel (uses the real product image) ── */
const ProductPanel = () => (
  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-[#F8F6F3] via-[#F2EFEB] to-[#EAE6DF] p-6 md:p-8">
    {/* Header: brand + size */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
          SK-II
        </div>
        <div className="mt-1.5 font-heading text-[18px] leading-tight text-foreground md:text-[20px]">
          Facial Treatment Essence
        </div>
        <div className="mt-0.5 text-[12px] text-foreground/55">230 ml · Pitera</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45">
          MAP
        </div>
        <div className="mt-1 font-display text-[20px] font-semibold tabular-nums text-foreground">
          $245.00
        </div>
      </div>
    </div>

    {/* Product image */}
    <div className="relative flex flex-1 items-center justify-center py-6">
      <div className="absolute inset-x-10 bottom-4 h-3 rounded-[50%] bg-foreground/15 blur-md" />
      <motion.img
        src={skiiProduct.url}
        alt="SK-II Facial Treatment Essence 230ml bottle and red carton"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 h-[260px] w-auto object-contain mix-blend-multiply md:h-[340px]"
        loading="lazy"
      />
    </div>

    {/* Footer: tracked retailers */}
    <div className="flex items-center justify-between border-t border-foreground/10 pt-4">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/45">
        Tracked across
      </div>
      <div className="font-mono text-[10.5px] tabular-nums text-foreground/70">5 retailers</div>
    </div>
  </div>
);

/* ── A single retailer row · large logo, savings bar, expanding winner ── */
const RetailerRow = ({
  r,
  rank,
  mode,
  isWinner,
  expanded,
}: {
  r: Retailer;
  rank: number;
  mode: "sticker" | "true";
  isWinner: boolean;
  expanded: boolean;
}) => {
  const price = mode === "sticker" ? r.sticker : r.trueCost;
  const savings = r.sticker - r.trueCost;
  const barPct = mode === "true" ? (savings / MAX_SAVINGS) * 100 : 0;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 280, damping: 32 }}
      className={`relative rounded-xl border transition-colors ${
        isWinner
          ? "border-primary/45 bg-card"
          : "border-border/60 bg-card/70 hover:border-border"
      }`}
      style={isWinner ? { boxShadow: "var(--shadow-card-hover)" } : undefined}
    >
      <div className="grid grid-cols-[32px_44px_1fr_auto] items-center gap-3 px-3.5 py-3 md:gap-4 md:px-4">
        {/* Rank */}
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10.5px] font-semibold tabular-nums ${
            isWinner
              ? "bg-primary text-primary-foreground"
              : "bg-foreground/[0.06] text-foreground/55"
          }`}
        >
          {rank}
        </div>

        {/* Logo tile */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg border ${
            isWinner ? "border-primary/25 bg-primary/[0.04]" : "border-border/70 bg-secondary/50"
          }`}
        >
          <BrandLogo name={r.name} size={26} />
        </div>

        {/* Identity + program */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[14px] font-semibold text-foreground">{r.name}</span>
            {isWinner && (
              <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                Best true cost
              </span>
            )}
            {r.name === "Amazon" && mode === "sticker" && (
              <span className="rounded-full border border-foreground/15 bg-card px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/55">
                Agent default
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-foreground/50">
            <span>{r.program}</span>
            <span className="text-foreground/25">/</span>
            <span className="normal-case tracking-[0.04em] text-foreground/55">{r.tier}</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          {mode === "true" && savings > 0 && (
            <div className="text-[10.5px] text-foreground/40 line-through tabular-nums">
              {fmt(r.sticker)}
            </div>
          )}
          <motion.div
            key={`${mode}-${price}`}
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`tabular-nums leading-none ${
              isWinner
                ? "font-display text-[22px] font-bold text-primary md:text-[24px]"
                : "text-[15px] font-semibold text-foreground/85"
            }`}
          >
            {fmt(price)}
          </motion.div>
          {mode === "true" && savings > 0 && (
            <div
              className={`mt-0.5 text-[10px] font-semibold tabular-nums ${
                isWinner ? "text-[hsl(var(--success))]" : "text-foreground/45"
              }`}
            >
              −{fmt(savings)}
            </div>
          )}
        </div>
      </div>

      {/* Savings bar (true-cost mode only) */}
      <AnimatePresence>
        {mode === "true" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-2"
          >
            <div className="ml-[80px] h-[3px] w-[calc(100%-80px)] overflow-hidden rounded-full bg-foreground/[0.05]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${barPct}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={isWinner ? "h-full bg-primary" : "h-full bg-foreground/25"}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded incentive ladder for winner */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-primary/15 bg-primary/[0.03] px-4 py-3.5 md:px-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/50">
                  Resolved incentive ladder
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/50">
                  {r.program} · {r.card}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px] tabular-nums">
                  <span className="text-foreground/55">List price (MAP)</span>
                  <span className="text-foreground/75">{fmt(r.sticker)}</span>
                </div>
                {r.stack.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                    className="flex items-center justify-between text-[12px] tabular-nums"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          s.type === "loyalty" ? "bg-primary" : "bg-[hsl(var(--success))]"
                        }`}
                      />
                      <span className="text-foreground/70">{s.label}</span>
                    </div>
                    <span className="font-semibold text-[hsl(var(--success))]">
                      −{fmt(s.value)}
                    </span>
                  </motion.div>
                ))}
                <div className="mt-2 flex items-end justify-between border-t border-primary/15 pt-2">
                  <span className="text-[12px] font-semibold text-foreground">
                    True cost to this member
                  </span>
                  <span className="font-display text-[22px] font-bold tabular-nums text-primary">
                    {fmt(r.trueCost)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Right panel: ranking artifact ── */
const RankingPanel = () => {
  const [mode, setMode] = useState<"sticker" | "true">("true");

  const sorted = [...RETAILERS].sort((a, b) =>
    mode === "sticker" ? a.sticker - b.sticker : a.trueCost - b.trueCost,
  );
  const trueWinner = [...RETAILERS].sort((a, b) => a.trueCost - b.trueCost)[0];
  const winnerSavings = trueWinner.sticker - trueWinner.trueCost;

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/55 px-5 py-3.5">
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/45">
            Assistant response
          </div>
          <div className="mt-0.5 text-[13.5px] font-semibold text-foreground">
            5 retailers compared · ranked by true cost
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          resolved 48ms
        </div>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between gap-3 px-5 pt-4">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/50">
          What the agent sees
        </div>
        <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 p-0.5">
          <button
            onClick={() => setMode("sticker")}
            className={`rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-all ${
              mode === "sticker"
                ? "bg-card text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground/75"
            }`}
          >
            Sticker price
          </button>
          <button
            onClick={() => setMode("true")}
            className={`rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-all ${
              mode === "true"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground/75"
            }`}
          >
            True cost with Parleo
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="flex-1 px-4 py-4 md:px-5">
        <LayoutGroup>
          <div className="space-y-2">
            {sorted.map((r, i) => {
              const isWinner = mode === "true" && r.name === trueWinner.name;
              return (
                <RetailerRow
                  key={r.name}
                  r={r}
                  rank={i + 1}
                  mode={mode}
                  isWinner={isWinner}
                  expanded={isWinner}
                />
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Footer summary */}
      <div className="border-t border-border/55 bg-secondary/30 px-5 py-3.5">
        <AnimatePresence mode="wait">
          {mode === "true" ? (
            <motion.p
              key="t"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12.5px] leading-snug text-foreground/70"
            >
              <span className="font-semibold text-foreground">{trueWinner.name}</span>{" "}
              wins by{" "}
              <span className="font-semibold text-primary">{fmt(winnerSavings)}</span>.{" "}
              Value the agent could not see at MAP.
            </motion.p>
          ) : (
            <motion.p
              key="s"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12.5px] leading-snug text-foreground/70"
            >
              All five tied at MAP. The agent defaults to{" "}
              <span className="font-semibold text-foreground">Amazon</span>.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

const ProblemSection = () => {
  const ref = useRef(null);

  return (
    <AnimatedSection
      id="problem"
      className="relative overflow-hidden bg-background py-16 md:py-24"
      ref={ref}
    >
      <LifestyleAccent variant="skincare" corner="tr" size={42} opacity={0.16} blur={16} />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-20">
        <h2 className="section-heading max-w-[20ch] text-foreground">
          Your customers are shopping through agents.{" "}
          <span className="text-foreground/45">Agents are shopping on sticker price.</span>
        </h2>
        <p className="section-copy mt-5 max-w-[620px]">
          The fastest-growing channel in commerce ranks merchants on the one number that has
          nothing to do with what a customer actually pays.
        </p>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: "58%", label: "of consumers have used AI to shop", source: "Stripe, 2024" },
            { value: "4,700%", label: "YoY increase in AI-driven retail traffic", source: "Adobe, 2024" },
            { value: "$5T", label: "projected agentic commerce revenue by 2030", source: "McKinsey, 2024" },
          ].map((s) => (
            <div
              key={s.value}
              className="py-5 sm:px-6 sm:py-6 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[32px] font-bold tracking-tight text-foreground md:text-[40px]"
                  style={{ lineHeight: 1 }}
                >
                  {s.value}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-foreground/65 md:text-[14px]">
                {s.label}
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="h-px w-4 bg-foreground/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                  {s.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial caption above artifact */}
        <div className="mt-16 max-w-[680px] md:mt-24">
          <h3 className="text-[23px] font-semibold leading-[1.14] text-foreground md:text-[28px]">
            True Value of your product.{" "}
            <span className="text-foreground/45">Invisible to agents.</span>
          </h3>
        </div>

        {/* Asymmetric artifact: product hero + comparison panel */}
        <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
          <ProductPanel />
          <RankingPanel />
        </div>
      </div>

    </AnimatedSection>
  );
};

export default ProblemSection;
