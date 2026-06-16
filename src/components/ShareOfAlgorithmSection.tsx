import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/* ───────────────────────────────────────────────────────────
   Section B · Share of Algorithm
   Four eras of consumer attention. Three neutral, one
   highlighted: the era we are now entering.
   ─────────────────────────────────────────────────────────── */

type Era = {
  year: string;
  label: string;
  distribution: string;
  measured: string;
  spend: string;
  glyph: React.ReactNode;
  active?: boolean;
};

const SHELF = (
  <svg viewBox="0 0 80 60" className="h-full w-full">
    <g stroke="currentColor" strokeWidth="1.1" fill="none">
      <line x1="6" y1="16" x2="74" y2="16" />
      <line x1="6" y1="32" x2="74" y2="32" />
      <line x1="6" y1="48" x2="74" y2="48" />
      {[10, 19, 28, 37, 46, 55, 64].map((x) => (
        <rect key={`r1-${x}`} x={x} y="8" width="5" height="8" fill="currentColor" opacity="0.55" stroke="none" />
      ))}
      {[10, 19, 28, 37, 46, 55, 64].map((x) => (
        <rect key={`r2-${x}`} x={x} y="24" width="5" height="8" fill="currentColor" opacity="0.4" stroke="none" />
      ))}
      {[10, 19, 28, 37, 46, 55, 64].map((x) => (
        <rect key={`r3-${x}`} x={x} y="40" width="5" height="8" fill="currentColor" opacity="0.25" stroke="none" />
      ))}
    </g>
  </svg>
);

const VOICE = (
  <svg viewBox="0 0 80 60" className="h-full w-full">
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
      {[10, 18, 26, 34, 42, 50, 58, 66, 74].map((x, i) => {
        const heights = [10, 22, 14, 34, 20, 40, 28, 18, 8];
        const h = heights[i];
        return <line key={x} x1={x} y1={30 - h / 2} x2={x} y2={30 + h / 2} />;
      })}
    </g>
  </svg>
);

const SEARCH = (
  <svg viewBox="0 0 80 60" className="h-full w-full">
    <g fill="currentColor">
      <rect x="8" y="12" width="64" height="8" rx="1" opacity="0.55" />
      <rect x="8" y="24" width="52" height="6" rx="1" opacity="0.4" />
      <rect x="8" y="34" width="44" height="6" rx="1" opacity="0.3" />
      <rect x="8" y="44" width="34" height="6" rx="1" opacity="0.22" />
    </g>
    <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6">
      <rect x="8" y="12" width="64" height="8" rx="1" />
    </g>
  </svg>
);

const ALGO = (
  <svg viewBox="0 0 80 60" className="h-full w-full">
    <g stroke="currentColor" strokeWidth="1.1" fill="none">
      {[[16, 14], [64, 14], [10, 30], [70, 30], [16, 46], [64, 46]].map(([x, y], i) => (
        <line key={i} x1="40" y1="30" x2={x} y2={y} opacity="0.55" />
      ))}
    </g>
    <g fill="currentColor">
      <circle cx="40" cy="30" r="4.5" />
      {[[16, 14], [64, 14], [10, 30], [70, 30], [16, 46], [64, 46]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" opacity="0.85" />
      ))}
    </g>
  </svg>
);

const ERAS: Era[] = [
  {
    year: "1960s",
    label: "Share of Shelf",
    distribution: "Distribution moved through physical retail.",
    measured: "Nielsen, IRI",
    spend: "$8B+",
    glyph: SHELF,
  },
  {
    year: "1980s",
    label: "Share of Voice",
    distribution: "Distribution moved through broadcast media.",
    measured: "GRPs, Media Mix",
    spend: "$12B+",
    glyph: VOICE,
  },
  {
    year: "2010s",
    label: "Share of Search",
    distribution: "Distribution moved through query results.",
    measured: "SEO / SEM rank",
    spend: "$200B+",
    glyph: SEARCH,
  },
  {
    year: "2025",
    label: "Share of Algorithm",
    distribution: "Distribution moves through agent decisions.",
    measured: "Parleo",
    spend: "$1T expected",
    glyph: ALGO,
    active: true,
  },
];

const EraCard = ({ era, i }: { era: Era; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className={`relative flex flex-col rounded-2xl border p-5 transition-colors md:p-6 ${
      era.active
        ? "border-primary/45 bg-primary/[0.04]"
        : "border-border/70 bg-transparent"
    }`}
    style={era.active ? { boxShadow: "var(--shadow-card-hover)" } : undefined}
  >
    {era.active && (
      <span className="absolute -top-2.5 left-5 rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
        Now
      </span>
    )}

    {/* Header */}
    <div className="flex items-center justify-between">
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
          era.active ? "text-primary" : "text-foreground/45"
        }`}
      >
        {era.year}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/35">
        Era {String(i + 1).padStart(2, "0")}
      </span>
    </div>

    {/* Era name */}
    <h3
      className={`mt-3 font-heading text-[22px] leading-tight md:text-[24px] ${
        era.active ? "text-primary" : "text-foreground"
      }`}
    >
      {era.label}
    </h3>

    {/* Glyph */}
    <div
      className={`mt-5 h-[88px] rounded-lg ${
        era.active
          ? "bg-card text-primary"
          : "text-foreground/45"
      }`}
    >
      <div className="h-full p-3">{era.glyph}</div>
    </div>

    {/* Spec rows */}
    <dl className="mt-5 space-y-3 border-t border-border/60 pt-4">
      <div>
        <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40">
          Distribution
        </dt>
        <dd className="mt-0.5 text-[13px] leading-snug text-foreground/80">
          {era.distribution}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40">
          Measured by
        </dt>
        <dd
          className={`mt-0.5 text-[13px] leading-snug ${
            era.active ? "font-semibold text-primary" : "text-foreground/80"
          }`}
        >
          {era.measured}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40">
          Annual spend
        </dt>
        <dd className="mt-0.5 font-mono text-[12px] tabular-nums text-foreground/65">
          {era.spend}
        </dd>
      </div>
    </dl>
  </motion.div>
);

const PILLARS = [
  {
    eyebrow: "01 · Visibility",
    question: "Are you in the room?",
    metrics: ["Mention Rate", "Share of Voice", "Recommendation Strength"],
    measured: "Measured by others (Profound, Bluefish, AEO tools)",
    lit: false,
  },
  {
    eyebrow: "02 · Accessibility",
    question: "Can agents read your commerce data?",
    metrics: ["Structured Data Completeness", "Platform Distribution"],
    measured: "Partly measured",
    lit: false,
  },
  {
    eyebrow: "True Value",
    question: "Are agents seeing your real offer?",
    metrics: ["06 · Incentive Citation Rate", "07 · Incentive Accuracy", "08 · True Value Delta"],
    measured: "Measured by Parleo",
    lit: true,
  },
];

const PillarCard = ({ p, i }: { p: typeof PILLARS[number]; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: i * 0.08 }}
    className={`flex flex-col rounded-2xl border p-6 md:p-7 ${
      p.lit
        ? "border-[#0166FF]/40 text-white"
        : "border-border/60 bg-card/60 text-foreground/55"
    }`}
    style={p.lit ? { background: "#1E1E2E", boxShadow: "var(--shadow-card-hover)" } : undefined}
  >
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
        p.lit ? "text-[#6FA8FF]" : "text-foreground/40"
      }`}
    >
      {p.eyebrow}
    </span>
    <h3
      className={`mt-3 font-heading text-[22px] leading-tight md:text-[26px] ${
        p.lit ? "text-white" : "text-foreground/75"
      }`}
    >
      {p.question}
    </h3>
    <ul className="mt-5 space-y-2 border-t border-current/15 pt-4">
      {p.metrics.map((m) => (
        <li
          key={m}
          className={`text-[13.5px] tabular-nums ${
            p.lit ? "text-white/85" : "text-foreground/55"
          }`}
        >
          {m}
        </li>
      ))}
    </ul>
    <div
      className={`mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
        p.lit
          ? "bg-[#0166FF] text-white"
          : "bg-foreground/[0.05] text-foreground/50"
      }`}
    >
      {p.measured}
    </div>
  </motion.div>
);

const ShareOfAlgorithmSection = () => (
  <AnimatedSection
    id="share-of-algorithm"
    className="relative bg-background py-16 md:py-24"
  >
    <div className="diffusion-glow pointer-events-none absolute left-0 top-[20%]" />

    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
        <h2
          className="font-heading text-[32px] text-foreground md:text-[52px]"
          style={{ lineHeight: 1.04 }}
        >
          A new metric decides
          <br />
          who agents recommend.
        </h2>
        <p className="self-end text-[17px] leading-[1.6] text-foreground/65 md:text-[19px]">
          After share of shelf, share of voice, and share of search comes Share of Algorithm.
        </p>
      </div>

      {/* Era cards */}
      <div className="mt-12 grid gap-4 md:grid-cols-4 md:gap-5">
        {ERAS.map((era, i) => (
          <EraCard key={era.label} era={era} i={i} />
        ))}
      </div>

      {/* Three-pillar framework */}
      <div className="mt-20">
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-12">
          <h3
            className="font-heading text-[26px] text-foreground md:text-[36px]"
            style={{ lineHeight: 1.1 }}
          >
            Three pillars. One that nobody else measures.
          </h3>
          <p className="text-[15px] leading-[1.6] text-foreground/65 md:text-[17px]">
            Visibility and accessibility are crowded layers. True Value is open, and it's where your margin actually pools.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.eyebrow} p={p} i={i} />
          ))}
        </div>

        <p className="mt-8 max-w-[760px] text-[15px] leading-[1.65] text-foreground/70 md:text-[17px]">
          Visibility is covered. True Value is the layer where your margin pools, and nobody else measures it. That's us.
        </p>
      </div>
    </div>
  </AnimatedSection>
);

export default ShareOfAlgorithmSection;
