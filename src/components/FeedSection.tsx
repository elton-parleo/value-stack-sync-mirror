import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";
import SectionHeader from "./editorial/SectionHeader";

/* ───────────────────────────────────────────────
   Section C · Architecture
   Merchant data sources → Parleo API → Agents
   ─────────────────────────────────────────────── */

type Source = { brand: string; label: string };

const SOURCES_TOP: Source[] = [
  { brand: "Sephora", label: "Loyalty + tier data" },
  { brand: "Ulta", label: "Promo + member pricing" },
  { brand: "Nordstrom", label: "Catalog + SKU graph" },
];

const SOURCES_BOTTOM: Source[] = [
  { brand: "Amex", label: "Card-linked offers" },
  { brand: "Visa", label: "TAP network" },
  { brand: "Chase", label: "Statement credits" },
];

const AGENTS: Source[] = [
  { brand: "ChatGPT", label: "ChatGPT" },
  { brand: "Claude", label: "Claude" },
  { brand: "Perplexity", label: "Perplexity" },
  { brand: "Google", label: "Gemini" },
];

const LAYERS = [
  { id: "01", name: "Unified Product Taxonomy", detail: "SKUs resolved across merchants" },
  { id: "02", name: "Deal Signals + True Cost", detail: "Loyalty, card, member pricing" },
  { id: "03", name: "Semantic Intelligence", detail: "Reviews, briefs, ranked shortlists" },
];

const SourceCard = ({ source, side }: { source: Source; side: "left" | "right" }) => (
  <motion.div
    initial={{ opacity: 0, x: side === "left" ? -10 : 10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card/60 px-3.5 py-2.5 backdrop-blur-sm transition-colors hover:border-primary/30"
  >
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-background/80">
      <BrandLogo name={source.brand} size={16} />
    </span>
    <div className="min-w-0 flex-1">
      <div className="truncate text-[12.5px] font-medium leading-tight text-foreground">
        {source.brand}
      </div>
      <div className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/45">
        {source.label}
      </div>
    </div>
  </motion.div>
);

const FlowLine = ({ direction }: { direction: "in" | "out" }) => (
  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
    <defs>
      <linearGradient id={`flow-${direction}`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="hsl(213 99% 50%)" stopOpacity={direction === "in" ? "0" : "0.5"} />
        <stop offset="50%" stopColor="hsl(213 99% 50%)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(213 99% 50%)" stopOpacity={direction === "in" ? "0.5" : "0"} />
      </linearGradient>
    </defs>
  </svg>
);

const FeedSection = () => (
  <AnimatedSection id="architecture" className="relative bg-background py-20 md:py-32">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <SectionHeader
        index="06"
        kicker="Signal"
        title="One call. Every signal an agent needs."
        standfirst="Parleo collapses 8 to 12 merchant lookups into a single pre-computed response: normalized SKUs, loyalty math, card-linked offers, and semantic context."
        align="wide"
      />


      {/* Diagram */}
      <div className="relative mt-16 md:mt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr_1fr] md:gap-6 lg:gap-10">
          {/* LEFT · Data sources */}
          <div className="flex flex-col">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/50">
                01 · Sources
              </span>
              <span className="font-mono text-[9.5px] tabular-nums text-foreground/35">
                200+ merchants
              </span>
            </div>
            <div className="space-y-2.5">
              {SOURCES_TOP.map((s) => (
                <SourceCard key={s.brand} source={s} side="left" />
              ))}
              <div className="flex items-center gap-3 px-1 py-1.5">
                <span className="h-px flex-1 bg-border/60" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">
                  Cards + networks
                </span>
                <span className="h-px flex-1 bg-border/60" />
              </div>
              {SOURCES_BOTTOM.map((s) => (
                <SourceCard key={s.brand} source={s} side="left" />
              ))}
            </div>
          </div>

          {/* CENTER · Parleo core */}
          <div className="relative flex flex-col">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-primary">
                02 · Parleo API
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/45">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-primary opacity-50 animate-ping" />
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Live
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-transparent bg-[#1E1E2E] p-5 md:p-6"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              {/* Soft glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(213 99% 50% / 0.18), transparent 60%)" }}
              />

              {/* Endpoint header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <code className="font-mono text-[11.5px] text-white/80">
                  <span className="text-primary">POST</span>{" "}
                  /v1/intel
                </code>
                <span className="font-mono text-[10px] tabular-nums text-white/45">
                  ~42ms
                </span>
              </div>

              {/* Layers */}
              <ul className="mt-4 space-y-3">
                {LAYERS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                    className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.025] p-3"
                  >
                    <span className="mt-[1px] font-mono text-[10px] tabular-nums text-primary">
                      {l.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium leading-snug text-white">
                        {l.name}
                      </div>
                      <div className="mt-0.5 text-[11.5px] leading-snug text-white/55">
                        {l.detail}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Spec strip */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                {[
                  { k: "Tokens", v: "~2K" },
                  { k: "Latency", v: "<50ms" },
                  { k: "PII", v: "Zero" },
                ].map((m) => (
                  <div key={m.k} className="text-center">
                    <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/40">
                      {m.k}
                    </div>
                    <div className="mt-1 font-mono text-[12px] tabular-nums text-white">
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Caption under core */}
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              Pre-computed · Hourly refresh
            </p>
          </div>

          {/* RIGHT · Agents */}
          <div className="flex flex-col">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/50">
                03 · Agents
              </span>
              <span className="font-mono text-[9.5px] tabular-nums text-foreground/35">
                MCP · ACP · OpenAPI
              </span>
            </div>
            <div className="space-y-2.5">
              {AGENTS.map((s) => (
                <SourceCard key={s.brand} source={s} side="right" />
              ))}
              <div className="mt-3 rounded-xl border border-primary/20 bg-primary/[0.04] px-3.5 py-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                  Result
                </div>
                <div className="mt-1 text-[12.5px] leading-snug text-foreground/80">
                  Agent recommends with true cost, not sticker price.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connector lines (desktop only) */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="conn-l" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(213 99% 50%)" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(213 99% 50%)" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="conn-r" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(213 99% 50%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(213 99% 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Footer insight bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 rounded-2xl border border-border/60 bg-card/40 px-6 py-5 md:px-7"
      >
        <p className="text-[14.5px] leading-snug text-foreground/75 md:text-[15.5px]">
          Agents stop guessing on sticker price.{" "}
          <span className="font-semibold text-foreground">
            One call returns the offer your customer actually qualifies for
          </span>
          , with sub-50ms latency and zero PII.
        </p>
      </motion.div>
    </div>
  </AnimatedSection>
);

export default FeedSection;
