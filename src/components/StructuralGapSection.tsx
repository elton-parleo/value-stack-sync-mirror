import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";

/* ───────────────────────────────────────────────────────────
   Section A · The structural gap
   Two-document editorial composition.
   Left:  CPG brand commerce ledger (what's spent)
   Right: Agent-visible feed (what's seen) — redacted to $0
   ─────────────────────────────────────────────────────────── */

type LedgerRow = {
  code: string;
  label: string;
  amount: string;
  note?: string;
  emphasis?: "trade" | "media" | "muted" | "total";
};

const LEDGER: LedgerRow[] = [
  { code: "01", label: "Net revenue", amount: "84,200", emphasis: "muted" },
  { code: "02", label: "Cost of goods sold", amount: "(41,150)", emphasis: "muted" },
  { code: "03", label: "Gross profit", amount: "43,050", emphasis: "total" },
  { code: "04", label: "Trade promotion", amount: "(11,800)", note: "$500B–$1T industry", emphasis: "trade" },
  { code: "05", label: "Retail media", amount: "(2,140)", note: "~$45B US, eMarketer 2025", emphasis: "media" },
  { code: "06", label: "Brand marketing", amount: "(6,920)", emphasis: "muted" },
  { code: "07", label: "SG&A", amount: "(9,300)", emphasis: "muted" },
  { code: "08", label: "Operating income", amount: "12,890", emphasis: "total" },
];

const useCountUp = (target: number, durationMs = 1100, start: boolean) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, durationMs]);
  return v;
};

/* ── Left: Merchant Ledger ─────────────────────────────── */
const MerchantLedger = ({ active }: { active: boolean }) => {
  const total = useCountUp(545, 1300, active); // $500B + ~$45B blended
  return (
    <div className="relative flex h-full flex-col rounded-[14px] border border-foreground/10 bg-[#FBFAF7] p-7 md:p-9">
      {/* Document header */}
      <div className="flex items-start justify-between border-b border-foreground/15 pb-4">
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/45">
            Exhibit A · Merchant ledger
          </div>
          <div className="mt-1.5 font-heading text-[18px] leading-tight text-foreground">
            Commerce P&amp;L · FY 2025
          </div>
        </div>
        <div className="text-right font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/45">
          USD · millions
          <div className="mt-0.5 normal-case tracking-[0.08em] text-foreground/35">illustrative composite</div>
        </div>
      </div>

      {/* Ledger rows */}
      <div className="mt-5 flex-1">
        {LEDGER.map((row, i) => {
          const isHi = row.emphasis === "trade" || row.emphasis === "media";
          const isTotal = row.emphasis === "total";
          return (
            <motion.div
              key={row.code}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-[28px_1fr_auto] items-baseline gap-3 border-b py-2.5 ${
                isTotal ? "border-foreground/30" : "border-foreground/[0.07]"
              }`}
            >
              <span
                className={`font-mono text-[10px] tabular-nums ${
                  isHi ? "text-primary" : "text-foreground/35"
                }`}
              >
                {row.code}
              </span>
              <div className="min-w-0">
                <div
                  className={`truncate text-[13.5px] ${
                    isTotal
                      ? "font-semibold text-foreground"
                      : isHi
                        ? "font-medium text-foreground"
                        : "text-foreground/70"
                  }`}
                >
                  {row.label}
                </div>
                {row.note && (
                  <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-primary/85">
                    {row.note}
                  </div>
                )}
              </div>
              <div className="relative">
                {isHi && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-[3px] -inset-x-1.5 origin-right rounded-sm bg-primary/[0.07]"
                  />
                )}
                <span
                  className={`relative font-mono text-[13px] tabular-nums ${
                    isTotal
                      ? "font-semibold text-foreground"
                      : isHi
                        ? "font-medium text-foreground"
                        : "text-foreground/65"
                  }`}
                >
                  {row.amount}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footnote */}
      <div className="mt-5 border-t border-foreground/15 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/50">
            Lines 04 + 05 · industry pool
          </span>
          <span className="font-display text-[26px] font-semibold tabular-nums leading-none text-primary md:text-[30px]">
            ${total.toFixed(0)}B+
          </span>
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-foreground/55">
          Trade promotion is the second-largest line on the P&amp;L after COGS. Retail media is the
          fastest-growing line in CPG.
        </p>
      </div>
    </div>
  );
};

/* ── Right: Agent-Visible Feed ─────────────────────────── */
const FEED_LINES = [
  { key: "sku", label: '"sku"', value: '"SK2-FTE-230"' },
  { key: "price", label: '"list_price"', value: "245.00" },
  { key: "trade", label: '"trade_promotion"', redacted: true, note: "$500B–$1T not surfaced" },
  { key: "media", label: '"retail_media"', redacted: true, note: "~$45B not surfaced" },
  { key: "loyalty", label: '"loyalty_offer"', value: "null" },
  { key: "card", label: '"card_offer"', value: "null" },
  { key: "incentive", label: '"visible_incentive"', value: "$0.00", highlight: true },
];

const AgentFeed = ({ active }: { active: boolean }) => (
  <div
    className="relative flex h-full flex-col overflow-hidden rounded-[14px] bg-[#0E0E14] p-7 text-white/90 md:p-9"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    {/* Top hairline accent */}
    <span className="absolute inset-x-0 top-0 h-px bg-primary" />

    {/* Document header */}
    <div className="flex items-start justify-between border-b border-white/10 pb-4">
      <div>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/45">
          Exhibit B · Agent-visible feed
        </div>
        <div className="mt-1.5 font-heading text-[18px] leading-tight text-white">
          GET /agents/v1/product.json
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/45">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
        runtime
      </div>
    </div>

    {/* Feed body */}
    <div className="mt-5 flex-1 font-mono text-[12.5px] leading-[1.9]">
      <div className="text-white/35">{"{"}</div>
      {FEED_LINES.map((line, i) => (
        <motion.div
          key={line.key}
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-[160px_1fr] items-center gap-3 pl-4"
        >
          <span className="text-white/55">{line.label}:</span>
          {line.redacted ? (
            <div className="flex items-center gap-2.5">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[14px] w-[120px] origin-left rounded-[2px] bg-white"
                aria-hidden
              />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-primary/95">
                {line.note}
              </span>
            </div>
          ) : (
            <span
              className={
                line.highlight
                  ? "font-semibold tabular-nums text-primary"
                  : line.value === "null"
                    ? "text-white/35"
                    : "tabular-nums text-white/80"
              }
            >
              {line.value}
              {i < FEED_LINES.length - 1 && <span className="text-white/25">,</span>}
            </span>
          )}
        </motion.div>
      ))}
      <div className="text-white/35">{"}"}</div>
    </div>

    {/* Footer: $0 */}
    <div className="mt-5 border-t border-white/10 pt-4">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/50">
          Incentive value resolved
        </span>
        <span className="font-display text-[44px] font-semibold leading-none tabular-nums text-white md:text-[52px]">
          $0.00
        </span>
      </div>
      <p className="mt-2 text-[11.5px] leading-snug text-white/55">
        Of either investment, surfaced to the agent making the recommendation today.
      </p>
    </div>
  </div>
);

/* ── Section ───────────────────────────────────────────── */
const StructuralGapSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.25 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatedSection
      id="structural-gap"
      ref={ref}
      className="relative bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-20">
        {/* Header */}
        <div className="grid gap-10 border-t border-foreground/15 pt-10 md:grid-cols-12 md:gap-12 md:pt-14">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                The structural gap
              </span>
            </div>
            <h2
              className="mt-6 font-heading text-[34px] tracking-tight text-foreground md:text-[58px]"
              style={{ lineHeight: 1.02 }}
            >
              The two largest conversion investments in commerce never reach the agent.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-3">
            <p className="text-[16.5px] leading-[1.6] text-foreground/65 md:text-[18px]">
              Brands spend over half a trillion dollars a year shaping how products move. The system
              that now decides what gets recommended cannot see a cent of it.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                Trade promotion
              </div>
              <div className="text-foreground/75 tabular-nums">$500B–$1T / yr</div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
                US retail media
              </div>
              <div className="text-foreground/75 tabular-nums">~$45B / yr</div>
            </div>
          </div>
        </div>

        {/* Two-document composition */}
        <div className="relative mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {/* Connector glyph (desktop only) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <div className="flex flex-col items-center gap-2 rounded-full border border-foreground/15 bg-background px-3 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/60">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-foreground/50">
                resolved
              </span>
            </div>
          </div>

          <MerchantLedger active={active} />
          <AgentFeed active={active} />
        </div>

        {/* Footer rule */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 grid grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-foreground/15 pt-5"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            The gap
          </span>
          <p className="text-[14px] leading-snug text-foreground/75 md:text-[15px]">
            Trade and retail media drive every category. Neither is legible to the agent making the call.
          </p>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40 md:inline">
            § 01 / 05
          </span>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default StructuralGapSection;
