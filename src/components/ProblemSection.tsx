import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

/* ───────────────────────────────────────────────────────────
   Ranking data: Dyson Airwrap Multi-Styler across 8 retailers.
   Sticker price view vs. Parleo true-cost view (after the
   user's loyalty, card-linked offers, and member benefits).
   ─────────────────────────────────────────────────────────── */

type Retailer = {
  name: string;
  sticker: number;
  trueCost: number;
  stack: string[]; // short incentive lines, shown on the row
  note?: string; // small tag (Member only, etc.)
};

const RETAILERS: Retailer[] = [
  {
    name: "Sephora",
    sticker: 599.99,
    trueCost: 430.79,
    stack: ["Rouge 20% off event", "Sephora Visa 4% back", "Birthday gift $30"],
  },
  {
    name: "Ulta",
    sticker: 599.99,
    trueCost: 449.99,
    stack: ["Diamond 20% off", "Ultamate points $30"],
  },
  {
    name: "Costco",
    sticker: 549.99,
    trueCost: 549.99,
    stack: ["Executive 2% reward"],
    note: "Member only",
  },
  {
    name: "Target",
    sticker: 599.99,
    trueCost: 569.99,
    stack: ["RedCard 5% off"],
  },
  {
    name: "Amazon",
    sticker: 599.99,
    trueCost: 569.99,
    stack: ["Prime Visa 5% back"],
  },
  {
    name: "Best Buy",
    sticker: 599.99,
    trueCost: 569.99,
    stack: ["My Best Buy Plus 5% back"],
  },
  {
    name: "Dyson",
    sticker: 599.99,
    trueCost: 574.99,
    stack: ["Direct: extended 2yr warranty"],
  },
  {
    name: "Nordstrom",
    sticker: 599.99,
    trueCost: 539.99,
    stack: ["Icon tier 6% Notes", "Nordstrom Visa"],
  },
];

const fmt = (n: number) => `$${n.toFixed(2)}`;

/* ── A single ranked row ── */
const RankRow = ({
  r,
  rank,
  mode,
  winner,
  stickerWinnerCost,
}: {
  r: Retailer;
  rank: number;
  mode: "sticker" | "true";
  winner: boolean;
  stickerWinnerCost: number;
}) => {
  const price = mode === "sticker" ? r.sticker : r.trueCost;
  const delta = mode === "true" ? r.sticker - r.trueCost : 0;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={`grid grid-cols-[28px_1fr_auto] items-center gap-3 rounded-xl border px-3 py-3 md:gap-4 md:px-4 ${
        winner
          ? "border-primary/30 bg-primary/[0.04]"
          : "border-border/60 bg-card"
      }`}
    >
      {/* Rank pill */}
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10.5px] font-semibold tabular-nums ${
          winner
            ? "bg-primary text-primary-foreground"
            : "bg-foreground/[0.06] text-foreground/55"
        }`}
      >
        {rank}
      </div>

      {/* Retailer + incentive stack */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <BrandLogo name={r.name} size={14} />
          <span className="text-[13px] font-semibold text-foreground/85">
            {r.name}
          </span>
          {r.note && (
            <span className="rounded-full bg-foreground/[0.06] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-foreground/50">
              {r.note}
            </span>
          )}
          {winner && (
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary-foreground">
              Best value
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {mode === "true" ? (
            <motion.div
              key="stack"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 overflow-hidden"
            >
              {r.stack.map((s) => (
                <span
                  key={s}
                  className="text-[10.5px] text-foreground/50"
                >
                  {s}
                </span>
              )).reduce<React.ReactNode[]>((acc, el, i, arr) => {
                acc.push(el);
                if (i < arr.length - 1)
                  acc.push(
                    <span key={`sep-${i}`} className="text-[10.5px] text-foreground/25">
                      ·
                    </span>
                  );
                return acc;
              }, [])}
            </motion.div>
          ) : (
            <motion.p
              key="ph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-0.5 text-[10.5px] text-foreground/40"
            >
              Listed price only
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Price */}
      <div className="text-right">
        <motion.div
          key={`${mode}-${price}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`text-[14px] font-semibold tabular-nums ${
            winner ? "text-primary" : "text-foreground/85"
          }`}
        >
          {fmt(price)}
        </motion.div>
        {mode === "true" && delta > 0 && (
          <div className="text-[10px] font-medium tabular-nums text-[hsl(var(--success))]">
            saves {fmt(delta)}
          </div>
        )}
        {mode === "sticker" && stickerWinnerCost === price && (
          <div className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
            lowest listed
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── The ranking artifact ── */
const RankingArtifact = () => {
  const [mode, setMode] = useState<"sticker" | "true">("true");

  const sorted = [...RETAILERS].sort((a, b) =>
    mode === "sticker" ? a.sticker - b.sticker : a.trueCost - b.trueCost
  );

  const stickerWinner = [...RETAILERS].sort((a, b) => a.sticker - b.sticker)[0];
  const trueWinner = [...RETAILERS].sort((a, b) => a.trueCost - b.trueCost)[0];
  const winnerName = mode === "sticker" ? stickerWinner.name : trueWinner.name;
  const savingsVsSticker = stickerWinner.sticker - trueWinner.trueCost;

  return (
    <div
      className="overflow-hidden rounded-[20px] border border-border bg-card"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 md:px-6">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/[0.08]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="truncate text-[12.5px] text-foreground/65">
            <span className="text-foreground/40">Query · </span>
            best price on Dyson Airwrap Multi-Styler
          </span>
        </div>
        <div className="hidden items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-wider text-foreground/40 md:flex">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          8 retailers · resolved 48ms
        </div>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4 md:px-6">
        <div className="text-[11px] uppercase tracking-wider text-foreground/45">
          Rank by
        </div>
        <div
          className="inline-flex items-center rounded-full border border-border bg-secondary/40 p-0.5"
        >
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
      <div className="px-4 py-4 md:px-6 md:py-5">
        <LayoutGroup>
          <div className="space-y-1.5">
            {sorted.map((r, i) => (
              <RankRow
                key={r.name}
                r={r}
                rank={i + 1}
                mode={mode}
                winner={r.name === winnerName}
                stickerWinnerCost={stickerWinner.sticker}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>

      {/* Footer summary */}
      <div className="flex flex-col gap-2 border-t border-border/60 bg-secondary/30 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <AnimatePresence mode="wait">
          {mode === "true" ? (
            <motion.p
              key="t-foot"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12.5px] text-foreground/70"
            >
              <span className="font-semibold text-foreground">
                {trueWinner.name}
              </span>{" "}
              wins after your incentive stack. That is{" "}
              <span className="font-semibold text-primary">
                {fmt(savingsVsSticker)}
              </span>{" "}
              the agent could not see at sticker price.
            </motion.p>
          ) : (
            <motion.p
              key="s-foot"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12.5px] text-foreground/70"
            >
              Agent recommends{" "}
              <span className="font-semibold text-foreground">
                {stickerWinner.name}
              </span>
              . The retailer with the best actual value is invisible.
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-wider text-foreground/40">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
            <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
          </svg>
          Zero PII · loyalty + card-linked resolved
        </div>
      </div>
    </div>
  );
};

const ProblemSection = () => {
  const ref = useRef(null);

  return (
    <AnimatedSection id="problem" className="section-grid relative bg-background py-12 md:py-20" ref={ref}>
      <div className="diffusion-glow pointer-events-none absolute right-0 top-[30%]" />

      <div className="mx-auto max-w-content px-6 md:px-20">
        <h2 className="font-heading text-[32px] text-foreground md:text-[52px]" style={{ lineHeight: 1.05 }}>
          AI agents are already shopping<br className="hidden md:block" />
          for your customers.
        </h2>
        <p className="mt-5 max-w-[640px] text-[17px] leading-[1.6] text-foreground/65 md:text-[19px]">
          This is the fastest-growing way people shop, and it is already changing who gets the sale.
        </p>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: "58%", label: "of consumers have used AI to shop", source: "Stripe, 2024" },
            { value: "4,700%", label: "YoY increase in AI-driven retail traffic", source: "Adobe, 2024" },
            { value: "$5T", label: "projected agentic commerce revenue by 2030", source: "McKinsey, 2024" },
          ].map((s) => (
            <div key={s.value} className="py-5 sm:px-6 sm:py-6 sm:first:pl-0 sm:last:pr-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[32px] font-bold tracking-tight text-foreground md:text-[40px]" style={{ lineHeight: 1 }}>
                  {s.value}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-foreground/65 md:text-[14px]">
                {s.label}
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="h-px w-4 bg-foreground/20" />
                <span className="text-[10.5px] font-medium uppercase tracking-wider text-foreground/40">
                  {s.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ranking artifact */}
        <div className="mt-12 md:mt-16">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label text-foreground/45">Live ranking</p>
              <p className="mt-1 text-[15px] text-foreground/75 md:text-[16px]">
                Hero showed one product. Here is what an agent sees across the full set of retailers.
              </p>
            </div>
          </div>

          <RankingArtifact />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProblemSection;
