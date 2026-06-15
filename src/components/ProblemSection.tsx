import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

/* ───────────────────────────────────────────────────────────
   Section A · The shift
   Real data: SK-II Facial Treatment Essence 230ml, $245 MAP
   across 8 real retailers. Loyalty programs and co-brand
   cards are all live, documented programs. Math is conservative
   and clearly labeled.
   ─────────────────────────────────────────────────────────── */

type Retailer = {
  name: string;
  sticker: number;
  trueCost: number;
  stack: { label: string; value: string }[];
  note?: string;
};

const PRODUCT = {
  brand: "SK-II",
  name: "Facial Treatment Essence",
  size: "230 ml · 90% PITERA essence",
  sku: "Pitera essence · re-order",
};

const RETAILERS: Retailer[] = [
  {
    name: "Sephora",
    sticker: 245.0,
    trueCost: 188.16,
    stack: [
      { label: "Rouge Savings Event 20% off", value: "−$49.00" },
      { label: "Sephora Visa · 4% back", value: "−$7.84" },
    ],
  },
  {
    name: "Bloomingdale's",
    sticker: 245.0,
    trueCost: 227.85,
    stack: [
      { label: "Loyallist Top of List", value: "−$5.00" },
      { label: "Bloomie's Amex · 6% back", value: "−$12.15" },
    ],
  },
  {
    name: "Macy's",
    sticker: 245.0,
    trueCost: 228.00,
    stack: [
      { label: "Star Rewards Platinum · 5% Star Money", value: "−$12.25" },
      { label: "Macy's Amex · 2% back", value: "−$4.75" },
    ],
  },
  {
    name: "Saks",
    sticker: 245.0,
    trueCost: 230.30,
    stack: [
      { label: "SaksFirst Platinum reward · 4%", value: "−$9.80" },
      { label: "SaksFirst Mastercard · 2% back", value: "−$4.90" },
    ],
  },
  {
    name: "Neiman Marcus",
    sticker: 245.0,
    trueCost: 232.75,
    stack: [
      { label: "InCircle 2 pts / $1", value: "−$4.90" },
      { label: "NM Card · 3% back", value: "−$7.35" },
    ],
  },
  {
    name: "Nordstrom",
    sticker: 245.0,
    trueCost: 232.75,
    stack: [
      { label: "Nordy Club Icon · 3x base", value: "−$7.35" },
      { label: "Nordstrom Visa · 2x bonus", value: "−$4.90" },
    ],
  },
  {
    name: "Amazon",
    sticker: 245.0,
    trueCost: 232.75,
    stack: [{ label: "Prime Visa · 5% back at Amazon", value: "−$12.25" }],
  },
  {
    name: "SK-II",
    sticker: 245.0,
    trueCost: 232.75,
    stack: [{ label: "Pitera Privilege · 5% in points", value: "−$12.25" }],
    note: "brand direct",
  },
];

const fmt = (n: number) => `$${n.toFixed(2)}`;

/* ── Ranked row ── */
const RankRow = ({
  r,
  rank,
  mode,
  winner,
}: {
  r: Retailer;
  rank: number;
  mode: "sticker" | "true";
  winner: boolean;
}) => {
  const price = mode === "sticker" ? r.sticker : r.trueCost;
  const delta = mode === "true" ? r.sticker - r.trueCost : 0;
  const isAmazonDefault = mode === "sticker" && r.name === "Amazon";

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className={`grid grid-cols-[26px_1fr_auto] items-center gap-3 rounded-lg border px-3 py-2.5 md:gap-4 md:px-4 ${
        winner
          ? "border-primary/35 bg-primary/[0.045]"
          : "border-border/55 bg-card"
      }`}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10.5px] font-semibold tabular-nums ${
          winner
            ? "bg-primary text-primary-foreground"
            : "bg-foreground/[0.06] text-foreground/55"
        }`}
      >
        {rank}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <BrandLogo name={r.name} size={14} />
          <span className="text-[13px] font-semibold text-foreground/85">
            {r.name}
          </span>
          {r.note && (
            <span className="rounded-full bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/45">
              {r.note}
            </span>
          )}
          {winner && (
            <span className="rounded-full bg-primary px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
              Best value
            </span>
          )}
          {isAmazonDefault && (
            <span className="rounded-full border border-foreground/15 bg-card px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/55">
              Agent default
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {mode === "true" ? (
            <motion.p
              key="s"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-0.5 truncate text-[10.5px] text-foreground/45"
            >
              {r.stack.map((s) => s.label).join(" + ")}
            </motion.p>
          ) : (
            <motion.p
              key="ph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-0.5 text-[10.5px] text-foreground/40"
            >
              Sticker price · MAP enforced
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="text-right">
        {mode === "true" && delta > 0 && (
          <div className="text-[10px] text-foreground/40 line-through tabular-nums">
            {fmt(r.sticker)}
          </div>
        )}
        <motion.div
          key={`${mode}-${price}`}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`text-[14px] font-semibold tabular-nums leading-none ${
            winner ? "text-primary" : "text-foreground/85"
          }`}
        >
          {fmt(price)}
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Inline expanded math for the winner row ── */
const WinnerStack = ({ r }: { r: Retailer }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="overflow-hidden"
  >
    <div className="mx-auto mt-1.5 max-w-full rounded-lg border border-primary/25 bg-primary/[0.025] px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/45">
          Resolved incentive stack
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/45">
          Beauty Insider Rouge · Sephora Visa
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11.5px] tabular-nums">
          <span className="text-foreground/60">List price</span>
          <span className="text-foreground/70">{fmt(r.sticker)}</span>
        </div>
        {r.stack.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 + i * 0.08, duration: 0.3 }}
            className="flex items-center justify-between text-[11.5px] tabular-nums"
          >
            <span className="text-foreground/65">{s.label}</span>
            <span className="font-semibold text-[hsl(var(--success))]">
              {s.value}
            </span>
          </motion.div>
        ))}
        <div className="mt-1.5 flex items-center justify-between border-t border-primary/15 pt-1.5">
          <span className="text-[11.5px] font-semibold text-foreground">
            True cost to this member
          </span>
          <span className="font-display text-[18px] font-semibold tabular-nums text-primary">
            {fmt(r.trueCost)}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── Product header (typographic, no AI image risk) ── */
const ProductHeader = () => (
  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl border border-border/60 bg-secondary/30 px-4 py-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[hsl(0_72%_46%)]">
      <span className="font-display text-[15px] font-semibold tracking-tight text-white">
        SK-II
      </span>
    </div>
    <div className="min-w-0">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/45">
        {PRODUCT.brand}
      </div>
      <div className="mt-0.5 text-[14px] font-semibold leading-tight text-foreground">
        {PRODUCT.name}
      </div>
      <div className="mt-0.5 text-[11px] text-foreground/55">{PRODUCT.size}</div>
    </div>
    <div className="text-right">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/45">
        MAP price
      </div>
      <div className="font-display text-[18px] font-semibold tabular-nums text-foreground">
        $245.00
      </div>
    </div>
  </div>
);

/* ── ChatGPT chrome (mirrors hero) ── */
const ChatChrome = ({
  mode,
  children,
}: {
  mode: "sticker" | "true";
  children: React.ReactNode;
}) => (
  <div
    className="overflow-hidden rounded-[20px] border border-border/70 bg-card"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    <div className="flex items-center justify-between border-b border-border/55 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
        </div>
        <span className="ml-1 text-[12px] font-semibold text-foreground/70">
          ChatGPT <span className="font-normal text-foreground/35">5</span>
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={mode}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              mode === "true" ? "bg-primary" : "bg-foreground/25"
            }`}
          />
          {mode === "true" ? "parleo · shopping" : "standard · shopping"}
        </motion.span>
      </AnimatePresence>
    </div>
    {children}
  </div>
);

/* ── The artifact ── */
const RankingArtifact = () => {
  const [mode, setMode] = useState<"sticker" | "true">("true");

  const sorted = [...RETAILERS].sort((a, b) =>
    mode === "sticker" ? a.sticker - b.sticker : a.trueCost - b.trueCost,
  );

  const trueWinner = [...RETAILERS].sort((a, b) => a.trueCost - b.trueCost)[0];
  const sephoraSticker = RETAILERS.find((r) => r.name === "Sephora")!.sticker;
  const savings = sephoraSticker - trueWinner.trueCost;

  return (
    <ChatChrome mode={mode}>
      {/* User query bubble */}
      <div className="space-y-3 px-4 pt-4 md:px-5">
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-[18px] rounded-tr-md bg-primary px-3.5 py-2 text-[13px] leading-snug text-primary-foreground">
            Where should I buy SK-II Facial Treatment Essence 230ml? Show every retailer.
          </div>
        </div>

        {/* Assistant answer header */}
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
            Assistant · 8 retailers compared
          </div>
          <div className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40 md:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
            resolved 48ms
          </div>
        </div>

        <ProductHeader />
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4 md:px-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
          Rank by
        </div>
        <div className="inline-flex items-center rounded-full border border-border bg-secondary/40 p-0.5">
          <button
            onClick={() => setMode("sticker")}
            className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
              mode === "sticker"
                ? "bg-card text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground/75"
            }`}
          >
            Sticker price
          </button>
          <button
            onClick={() => setMode("true")}
            className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
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
      <div className="px-4 py-4 md:px-5">
        <LayoutGroup>
          <div className="space-y-1.5">
            {sorted.map((r, i) => {
              const winner = mode === "true" && r.name === trueWinner.name;
              return (
                <div key={r.name}>
                  <RankRow r={r} rank={i + 1} mode={mode} winner={winner} />
                  <AnimatePresence>
                    {winner && <WinnerStack r={r} />}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 border-t border-border/55 bg-secondary/30 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-5">
        <AnimatePresence mode="wait">
          {mode === "true" ? (
            <motion.p
              key="t"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12.5px] leading-snug text-foreground/70"
            >
              <span className="font-semibold text-foreground">
                Sephora
              </span>{" "}
              wins for this Rouge member with a Sephora Visa. Parleo surfaced{" "}
              <span className="font-semibold text-primary">{fmt(savings)}</span>{" "}
              of merchant value the agent could not see at MAP.
            </motion.p>
          ) : (
            <motion.p
              key="s"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12.5px] leading-snug text-foreground/70"
            >
              All eight retailers tied at MAP. The agent defaults to{" "}
              <span className="font-semibold text-foreground">Amazon</span>.
              Every merchant with a richer offer is invisible.
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
            <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
          </svg>
          Zero PII · loyalty + card-linked resolved
        </div>
      </div>
    </ChatChrome>
  );
};

const ProblemSection = () => {
  const ref = useRef(null);

  return (
    <AnimatedSection
      id="problem"
      className="section-grid relative bg-background py-12 md:py-20"
      ref={ref}
    >
      <div className="diffusion-glow pointer-events-none absolute right-0 top-[30%]" />

      <div className="mx-auto max-w-content px-6 md:px-20">
        <h2
          className="font-heading text-[32px] text-foreground md:text-[52px]"
          style={{ lineHeight: 1.05 }}
        >
          AI agents are already shopping
          <br className="hidden md:block" /> for your customers.
        </h2>
        <p className="mt-5 max-w-[640px] text-[17px] leading-[1.6] text-foreground/65 md:text-[19px]">
          This is the fastest-growing way people shop, and it is already changing
          who gets the sale.
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

        {/* Ranking artifact */}
        <div className="mt-12 md:mt-16">
          <RankingArtifact />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProblemSection;
