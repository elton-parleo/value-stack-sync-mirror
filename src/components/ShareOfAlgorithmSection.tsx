import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/* ───────────────────────────────────────────────────────────
   Section B · Share of Algorithm
   B1  Four eras of distribution (compact context strip)
   B2  Three pillars / eight dimensions framework (the IP)
   ─────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────
   B1 · Era strip
   ────────────────────────────────────────────── */

type Era = {
  year: string;
  label: string;
  distribution: string;
  measured: string;
  spend: string;
  active?: boolean;
};

const ERAS: Era[] = [
  {
    year: "1960s",
    label: "Share of Shelf",
    distribution: "Physical retail.",
    measured: "Nielsen, IRI",
    spend: "$8B+",
  },
  {
    year: "1980s",
    label: "Share of Voice",
    distribution: "Broadcast media.",
    measured: "GRPs / MMM",
    spend: "$12B+",
  },
  {
    year: "2010s",
    label: "Share of Search",
    distribution: "Query results.",
    measured: "SEO / SEM rank",
    spend: "$200B+",
  },

  {
    year: "2025",
    label: "Share of Algorithm",
    distribution: "Agent decisions.",
    measured: "Parleo",
    spend: "$1T expected",
    active: true,
  },
];

const EraCard = ({ era, i }: { era: Era; i: number }) => {
  const dark = !!era.active;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-2xl border p-5 md:p-6 ${
        dark
          ? "border-transparent bg-[#1E1E2E] text-white"
          : "border-border/70 bg-transparent"
      }`}
      style={dark ? { boxShadow: "var(--shadow-elevated)" } : undefined}
    >
      {dark && (
        <span className="absolute -top-2.5 left-5 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse-dot" />
          Now
        </span>
      )}

      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
            dark ? "text-primary" : "text-foreground/45"
          }`}
        >
          {era.year}
        </span>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
            dark ? "text-white/35" : "text-foreground/35"
          }`}
        >
          0{i + 1}
        </span>
      </div>

      <h3
        className={`mt-4 font-heading text-[22px] leading-tight md:text-[26px] ${
          dark ? "text-white" : "text-foreground"
        }`}
        style={{ letterSpacing: "-0.01em" }}
      >
        {era.label}
      </h3>

      <p
        className={`mt-2 text-[13px] leading-snug ${
          dark ? "text-white/65" : "text-foreground/60"
        }`}
      >
        Distribution moved through {era.distribution.toLowerCase().replace(/\.$/, "")}.
      </p>

      <dl
        className={`mt-6 space-y-3 border-t pt-4 ${
          dark ? "border-white/10" : "border-border/60"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <dt
            className={`font-mono text-[9px] uppercase tracking-[0.16em] ${
              dark ? "text-white/40" : "text-foreground/40"
            }`}
          >
            Measured by
          </dt>
          <dd
            className={`text-right text-[12.5px] ${
              dark ? "font-semibold text-primary" : "text-foreground/80"
            }`}
          >
            {era.measured}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt
            className={`font-mono text-[9px] uppercase tracking-[0.16em] ${
              dark ? "text-white/40" : "text-foreground/40"
            }`}
          >
            Annual spend
          </dt>
          <dd
            className={`text-right font-mono text-[12px] tabular-nums ${
              dark ? "text-white/85" : "text-foreground/70"
            }`}
          >
            {era.spend}
          </dd>
        </div>
      </dl>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   B2 · Three pillars · Eight dimensions
   ────────────────────────────────────────────── */

type PillarTone = "measured" | "partial" | "open";

type Dimension = {
  id: string;
  name: string;
  detail?: string;
};

type Pillar = {
  label: string;
  question: string;
  dimensions: Dimension[];
  measured: string;
  status: string;
  tone: PillarTone;
};

const PILLARS: Pillar[] = [
  {
    label: "Visibility",
    question: "Are you in the room?",
    dimensions: [
      { id: "01", name: "Mention Rate" },
      { id: "02", name: "Share of Voice" },
      { id: "03", name: "Recommendation Strength" },
    ],
    measured: "GEO tools (Profound, Bluefish)",
    status: "Measured",
    tone: "measured",
  },
  {
    label: "Accessibility",
    question: "Can agents read your commerce data?",
    dimensions: [
      { id: "04", name: "Structured Data Completeness" },
      { id: "05", name: "Platform Distribution" },
    ],
    measured: "Partially, SEO / structured-data tools",
    status: "Partly measured",
    tone: "partial",
  },
  {
    label: "True Value",
    question: "Are agents seeing your real offer?",
    dimensions: [
      {
        id: "06",
        name: "Incentive Citation Rate",
        detail: "Are agents citing your incentive and loyalty data?",
      },
      {
        id: "07",
        name: "Incentive Accuracy",
        detail: "Are the right, most current incentives applied?",
      },
      {
        id: "08",
        name: "True Value Delta",
        detail: "How do you compare after resolution?",
      },
    ],
    measured: "Parleo",
    status: "Unmeasured · Parleo",
    tone: "open",
  },
];

const StatusDot = ({ tone }: { tone: PillarTone }) => {
  const color =
    tone === "measured"
      ? "bg-[hsl(var(--success))]"
      : tone === "partial"
        ? "bg-[hsl(var(--warning))]"
        : "bg-primary";
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className={`absolute inset-0 rounded-full ${color} opacity-40 animate-ping`} />
      <span className={`relative inline-block h-2 w-2 rounded-full ${color}`} />
    </span>
  );
};

const PillarCard = ({ pillar, i }: { pillar: Pillar; i: number }) => {
  const dark = pillar.tone === "open";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 md:p-7 ${
        dark
          ? "border-transparent bg-[#1E1E2E] text-white"
          : pillar.tone === "partial"
            ? "border-border/60 bg-card/40 text-foreground"
            : "border-border/55 bg-card/30 text-foreground"
      }`}
      style={dark ? { boxShadow: "var(--shadow-elevated)" } : undefined}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(213 99% 50% / 0.18), transparent 60%)" }}
        />
      )}

      {/* Eyebrow */}
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
            dark
              ? "text-primary"
              : pillar.tone === "partial"
                ? "text-foreground/55"
                : "text-foreground/45"
          }`}
        >
          Pillar {String(i + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <StatusDot tone={pillar.tone} />
          <span
            className={`font-mono text-[9.5px] uppercase tracking-[0.16em] ${
              dark ? "text-white/55" : "text-foreground/45"
            }`}
          >
            {pillar.status}
          </span>
        </div>
      </div>

      {/* Pillar name */}
      <h4
        className={`mt-4 font-heading text-[28px] leading-[1.05] md:text-[34px] ${
          dark ? "text-white" : pillar.tone === "partial" ? "text-foreground/85" : "text-foreground/75"
        }`}
        style={{ letterSpacing: "-0.015em" }}
      >
        {pillar.label}
      </h4>

      <p
        className={`mt-2 text-[14px] leading-snug ${
          dark ? "text-white/65" : "text-foreground/55"
        }`}
      >
        "{pillar.question}"
      </p>

      {/* Dimensions */}
      <ul
        className={`mt-6 flex-1 space-y-3 border-t pt-5 ${
          dark ? "border-white/10" : "border-border/55"
        }`}
      >
        {pillar.dimensions.map((d, di) => (
          <motion.li
            key={d.id}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + di * 0.06 }}
            className="flex items-start gap-3"
          >
            <span
              className={`mt-[2px] font-mono text-[11px] tabular-nums ${
                dark
                  ? "text-primary"
                  : pillar.tone === "partial"
                    ? "text-foreground/45"
                    : "text-foreground/35"
              }`}
              style={{ letterSpacing: "0.02em" }}
            >
              {d.id}
            </span>
            <div className="min-w-0">
              <div
                className={`text-[14px] font-medium leading-snug ${
                  dark ? "text-white" : "text-foreground/85"
                }`}
              >
                {d.name}
              </div>
              {d.detail && (
                <div
                  className={`mt-1 text-[12.5px] leading-snug ${
                    dark ? "text-white/55" : "text-foreground/55"
                  }`}
                >
                  {d.detail}
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Footer */}
      <div
        className={`mt-6 flex items-center justify-between border-t pt-4 ${
          dark ? "border-white/10" : "border-border/55"
        }`}
      >
        <span
          className={`font-mono text-[9.5px] uppercase tracking-[0.18em] ${
            dark ? "text-white/45" : "text-foreground/40"
          }`}
        >
          Measured by
        </span>
        <span
          className={`text-right text-[12.5px] ${
            dark
              ? "font-semibold text-primary"
              : pillar.tone === "partial"
                ? "text-foreground/75"
                : "text-foreground/70"
          }`}
        >
          {pillar.measured}
        </span>
      </div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Section wrapper
   ────────────────────────────────────────────── */

const ShareOfAlgorithmSection = () => (
  <AnimatedSection
    id="share-of-algorithm"
    className="relative bg-background py-20 md:py-32"
  >
    <div className="mx-auto max-w-content px-6 md:px-20">
      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          Share of Algorithm
        </span>
      </div>

      {/* Section headline */}
      <div className="mt-6 grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
        <h2
          className="font-heading text-[36px] text-foreground md:text-[60px]"
          style={{ lineHeight: 1.02, letterSpacing: "-0.02em" }}
        >
          A new metric decides{" "}
          <span className="text-foreground/45">who agents recommend.</span>
        </h2>
        <p className="self-end max-w-[440px] text-[17px] leading-[1.55] text-foreground/65 md:text-[19px]">
          After share of shelf, share of voice, and share of search comes
          the era that quietly redirects every category.
        </p>
      </div>

      {/* B1 · Era strip */}
      <div className="mt-14 grid gap-4 md:grid-cols-4 md:gap-5">
        {ERAS.map((era, i) => (
          <EraCard key={era.label} era={era} i={i} />
        ))}
      </div>

      {/* B2 · Framework */}
      <div className="mt-24 md:mt-32">
        {/* Hairline + eyebrow */}
        <div className="flex items-center gap-3 border-t border-foreground/10 pt-10">
          <span className="h-px w-8 bg-primary" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            The framework
          </span>
        </div>

        <div className="mt-6 grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <h3
            className="font-heading text-[32px] text-foreground md:text-[52px]"
            style={{ lineHeight: 1.04, letterSpacing: "-0.02em" }}
          >
            Three pillars.{" "}
            <span className="text-foreground/45">Eight dimensions.</span>{" "}
            One score.
          </h3>
          <p className="self-end max-w-[440px] text-[16px] leading-[1.6] text-foreground/65 md:text-[18px]">
            Visibility asks if the agent saw you. Accessibility asks if it
            could read you. True Value asks what it actually saw.
          </p>
        </div>

        {/* Three columns */}
        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.label} pillar={p} i={i} />
          ))}
        </div>

        {/* Footer insight bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 px-6 py-5 md:flex-row md:items-center md:gap-6 md:px-7"
        >
          <div className="flex items-center gap-3 md:shrink-0">
            <span className="h-6 w-[3px] rounded-full bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              The opening
            </span>
          </div>
          <p className="text-[14.5px] leading-snug text-foreground/75 md:text-[15.5px]">
            Visibility and Accessibility already have tools.{" "}
            <span className="font-semibold text-foreground">True Value does not</span>,
            and that is the opening.
          </p>
        </motion.div>
      </div>
    </div>
  </AnimatedSection>
);

export default ShareOfAlgorithmSection;
