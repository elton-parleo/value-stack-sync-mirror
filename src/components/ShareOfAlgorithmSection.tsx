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
    <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.85">
      <line x1="6" y1="14" x2="74" y2="14" />
      <line x1="6" y1="30" x2="74" y2="30" />
      <line x1="6" y1="46" x2="74" y2="46" />
      {[10, 18, 26, 34, 42, 50, 58, 66].map((x) => (
        <rect key={`s1-${x}`} x={x} y="6" width="6" height="8" fill="currentColor" opacity="0.18" />
      ))}
      {[10, 18, 26, 34, 42, 50, 58, 66].map((x) => (
        <rect key={`s2-${x}`} x={x} y="22" width="6" height="8" fill="currentColor" opacity="0.18" />
      ))}
      {[10, 18, 26, 34, 42, 50, 58, 66].map((x) => (
        <rect key={`s3-${x}`} x={x} y="38" width="6" height="8" fill="currentColor" opacity="0.18" />
      ))}
    </g>
  </svg>
);

const VOICE = (
  <svg viewBox="0 0 80 60" className="h-full w-full">
    <g stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9" strokeLinecap="round">
      {[
        [18, 30, 22], [26, 30, 30], [34, 30, 16], [42, 30, 36], [50, 30, 24], [58, 30, 28], [66, 30, 18],
      ].map(([x, cy, h], i) => (
        <line key={i} x1={x} y1={cy - h / 2} x2={x} y2={cy + h / 2} />
      ))}
    </g>
  </svg>
);

const SEARCH = (
  <svg viewBox="0 0 80 60" className="h-full w-full">
    <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.9">
      <rect x="8" y="14" width="64" height="9" rx="1" />
      <line x1="14" y1="18.5" x2="44" y2="18.5" strokeWidth="1" opacity="0.55" />
      <rect x="8" y="28" width="50" height="5" opacity="0.35" fill="currentColor" />
      <rect x="8" y="36" width="58" height="5" opacity="0.35" fill="currentColor" />
      <rect x="8" y="44" width="42" height="5" opacity="0.35" fill="currentColor" />
    </g>
  </svg>
);

const ALGO = (
  <svg viewBox="0 0 80 60" className="h-full w-full">
    <defs>
      <linearGradient id="algoGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#algoGrad)" strokeWidth="1.3">
      <circle cx="40" cy="30" r="4" fill="currentColor" />
      {[
        [16, 14], [64, 14], [12, 30], [68, 30], [16, 46], [64, 46], [40, 8], [40, 52],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="40" y1="30" x2={x} y2={y} opacity="0.55" />
          <circle cx={x} cy={y} r="2.2" fill="currentColor" opacity="0.7" />
        </g>
      ))}
    </g>
  </svg>
);

const ERAS: Era[] = [
  {
    year: "1960s",
    label: "Shelf",
    distribution: "Won by trade marketing and end-caps",
    measured: "Facings, planogram share",
    spend: "$120B / yr trade promo",
    glyph: SHELF,
  },
  {
    year: "1980s",
    label: "Voice",
    distribution: "Won by mass media and brand fame",
    measured: "GRPs, reach, frequency",
    spend: "$300B / yr advertising",
    glyph: VOICE,
  },
  {
    year: "2010s",
    label: "Search",
    distribution: "Won by SEO and paid keywords",
    measured: "Rank, CTR, share of voice",
    spend: "$280B / yr digital",
    glyph: SEARCH,
  },
  {
    year: "2025",
    label: "Algorithm",
    distribution: "Won by what agents can read about you",
    measured: "Agent Commerce Score",
    spend: "$5T projected by 2030",
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
        ? "border-primary/40 bg-card"
        : "border-border/70 bg-card/60"
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
      className={`mt-3 font-heading text-[28px] leading-none md:text-[34px] ${
        era.active ? "text-primary" : "text-foreground"
      }`}
    >
      {era.label}
    </h3>

    {/* Glyph */}
    <div
      className={`mt-5 h-[88px] rounded-lg border ${
        era.active
          ? "border-primary/20 bg-primary/[0.03] text-primary"
          : "border-border/60 bg-secondary/40 text-foreground/55"
      }`}
    >
      <div className="h-full p-2">{era.glyph}</div>
    </div>

    {/* Spec rows */}
    <dl className="mt-5 space-y-2.5 border-t border-border/60 pt-4">
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

const ShareOfAlgorithmSection = () => (
  <AnimatedSection
    id="share-of-algorithm"
    className="relative bg-background py-16 md:py-24"
  >
    <div className="diffusion-glow pointer-events-none absolute left-0 top-[20%]" />

    <div className="mx-auto max-w-content px-6 md:px-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18M3 12h18" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-label text-parleo-muted">SHARE OF ALGORITHM</span>
      </div>

      <div className="mt-5 grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
        <h2
          className="font-heading text-[32px] text-foreground md:text-[52px]"
          style={{ lineHeight: 1.04 }}
        >
          Every era of retail
          <br />
          had a metric.
          <br />
          <span className="text-foreground/45">This one is yours.</span>
        </h2>
        <p className="self-end text-[17px] leading-[1.6] text-foreground/65 md:text-[19px]">
          Shelf, voice, search. Each shift in distribution produced a new
          scoreboard. Agentic commerce is the next one, and it is measurable
          today.
        </p>
      </div>

      {/* Era cards */}
      <div className="mt-12 grid gap-4 md:grid-cols-4 md:gap-5">
        {ERAS.map((era, i) => (
          <EraCard key={era.label} era={era} i={i} />
        ))}
      </div>

      {/* Closing line */}
      <div className="mt-10 grid gap-6 border-t border-border/60 pt-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
          Bottom line
        </div>
        <p className="max-w-[760px] text-[18px] leading-[1.5] text-foreground/85 md:text-[20px]">
          Your competitors are already being measured on this. They just do not
          have the scorecard yet.
        </p>
      </div>
    </div>
  </AnimatedSection>
);

export default ShareOfAlgorithmSection;
