import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Eye, FileCode2, Sparkles, Check, MinusCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

/* ───────────────────────────────────────────────────────────
   Section B · Share of Algorithm
   Light editorial card with a single dramatic dark row for
   True Value. Two quiet "measured" rows above set up the
   contrast. Hierarchy carries the story; copy stays minimal.
   ─────────────────────────────────────────────────────────── */

/* ───────── ERAS ───────── */

type EraId = "1960s" | "1980s" | "2010s" | "2025";
type Era = {
  id: EraId;
  year: string;
  label: string;
  measured: string;
  glyph: (active: boolean) => JSX.Element;
};

const eraStroke = (a: boolean) =>
  a ? "hsl(213 99% 50%)" : "hsl(240 5% 55%)";

const ERAS: Era[] = [
  {
    id: "1960s",
    year: "1960s",
    label: "Shelf",
    measured: "Nielsen",
    glyph: (a) => (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" strokeWidth={1.4}>
        <rect x="4" y="7" width="24" height="4" rx="0.5" stroke={eraStroke(a)} />
        <rect x="4" y="14" width="24" height="4" rx="0.5" stroke={eraStroke(a)} />
        <rect x="4" y="21" width="24" height="4" rx="0.5" stroke={eraStroke(a)} />
        <circle cx="9" cy="9" r="0.9" fill={eraStroke(a)} />
        <circle cx="16" cy="16" r="0.9" fill={eraStroke(a)} />
        <circle cx="22" cy="23" r="0.9" fill={eraStroke(a)} />
      </svg>
    ),
  },
  {
    id: "1980s",
    year: "1980s",
    label: "Voice",
    measured: "GRPs",
    glyph: (a) => (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" strokeWidth={1.4}>
        <circle cx="16" cy="22" r="2" fill={eraStroke(a)} />
        <path d="M10 18 A 8 8 0 0 1 22 18" stroke={eraStroke(a)} strokeLinecap="round" />
        <path d="M7 16 A 12 12 0 0 1 25 16" stroke={eraStroke(a)} strokeLinecap="round" opacity="0.7" />
        <path d="M4 14 A 16 16 0 0 1 28 14" stroke={eraStroke(a)} strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "2010s",
    year: "2010s",
    label: "Search",
    measured: "SEO",
    glyph: (a) => (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" strokeWidth={1.4}>
        <circle cx="14" cy="14" r="7" stroke={eraStroke(a)} />
        <path d="M19.5 19.5 L26 26" stroke={eraStroke(a)} strokeLinecap="round" />
        <path d="M11 14 H17" stroke={eraStroke(a)} strokeLinecap="round" opacity="0.6" />
        <path d="M11 11 H15" stroke={eraStroke(a)} strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "2025",
    year: "2025",
    label: "Algorithm",
    measured: "Parleo",
    glyph: (a) => (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" strokeWidth={1.4}>
        <circle cx="16" cy="16" r="3" fill={eraStroke(a)} />
        <circle cx="6" cy="8" r="2" stroke={eraStroke(a)} />
        <circle cx="26" cy="8" r="2" stroke={eraStroke(a)} />
        <circle cx="6" cy="24" r="2" stroke={eraStroke(a)} />
        <circle cx="26" cy="24" r="2" stroke={eraStroke(a)} />
        <path d="M8 9 L14 14 M24 9 L18 14 M8 23 L14 18 M24 23 L18 18" stroke={eraStroke(a)} opacity="0.55" />
      </svg>
    ),
  },
];

const ShareOfAlgorithmSection = () => {
  const [activeEra, setActiveEra] = useState<EraId>("2025");
  const reduce = useReducedMotion();
  const eraIndex = ERAS.findIndex((e) => e.id === activeEra);
  const progressPct = (eraIndex / (ERAS.length - 1)) * 100;

  return (
    <AnimatedSection
      id="share-of-algorithm"
      className="relative bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-20">
        {/* ── Header (tight, single-column, scan-friendly) ── */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              Share of Algorithm
            </span>
          </div>

          <h2
            className="mt-5 font-heading text-[40px] leading-[1.04] text-foreground md:text-[52px]"
            style={{ letterSpacing: "-0.022em" }}
          >
            A new metric decides who agents recommend.
          </h2>

          <p className="mt-5 max-w-[640px] text-[17px] leading-[1.55] text-foreground/65 md:text-[18px]">
            After shelf, voice, and search comes the era quietly redirecting
            every category. Three pillars decide the score.{" "}
            <span className="text-foreground">One is still unmeasured.</span>
          </p>
        </div>

        {/* ── Editorial card ── */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-foreground/[0.08] bg-[#F7F5F0] md:mt-14">
          {/* ▸ Era timeline */}
          <div className="relative px-6 pt-10 md:px-12 md:pt-12">
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tabular-nums text-foreground/40">
                  01
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/55">
                  Four eras of distribution
                </span>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40 md:inline">
                {String(eraIndex + 1).padStart(2, "0")} / 04 · hover to explore
              </span>
            </div>

            <div className="relative mt-9 pb-2">
              <div className="grid grid-cols-4 gap-3">
                {ERAS.map((e) => {
                  const isActive = e.id === activeEra;
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onMouseEnter={() => setActiveEra(e.id)}
                      onFocus={() => setActiveEra(e.id)}
                      onClick={() => setActiveEra(e.id)}
                      aria-pressed={isActive}
                      className="group flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md"
                    >
                      <motion.div
                        animate={{ y: isActive ? -3 : 0, opacity: isActive ? 1 : 0.55 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-3"
                      >
                        {e.glyph(isActive)}
                      </motion.div>
                      <div
                        className={`font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
                          isActive ? "text-primary" : "text-foreground/45"
                        }`}
                      >
                        {e.year}
                      </div>
                      <div
                        className={`mt-1 font-heading text-[15px] leading-tight md:text-[17px] transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground/55 group-hover:text-foreground/80"
                        }`}
                        style={{ letterSpacing: "-0.005em" }}
                      >
                        Share of {e.label}
                      </div>
                      <div className="mt-1.5 font-mono text-[10px] tabular-nums text-foreground/40">
                        {e.measured}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Rail */}
              <div className="relative mt-8 h-px">
                <div className="absolute inset-0 bg-foreground/12" />
                <motion.div
                  className="absolute left-0 top-0 h-px bg-primary"
                  initial={reduce ? { width: `${progressPct}%` } : { width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                {ERAS.map((_, i) => {
                  const left = (i / (ERAS.length - 1)) * 100;
                  const isActive = i === eraIndex;
                  return (
                    <span
                      key={i}
                      className="absolute -translate-x-1/2"
                      style={{ left: `${left}%`, top: "-3.5px" }}
                    >
                      <span className="relative inline-flex h-2 w-2">
                        {isActive && (
                          <span className="absolute -inset-2 rounded-full bg-primary/25 animate-ping" />
                        )}
                        <span
                          className={`relative inline-block h-2 w-2 rounded-full ${
                            isActive
                              ? "bg-primary"
                              : i < eraIndex
                                ? "bg-primary/60"
                                : "bg-foreground/25"
                          }`}
                        />
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ▸ Pillar stack */}
          <div className="relative mt-10 px-6 pb-10 md:mt-12 md:px-12 md:pb-12">
            <div className="flex items-baseline justify-between border-t border-foreground/10 pt-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tabular-nums text-foreground/40">
                  02
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/55">
                  Three pillars · Eight dimensions
                </span>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40 md:inline">
                The score for 2025
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              {/* Visibility — quiet measured row */}
              <QuietPillarRow
                icon={Eye}
                index="01"
                label="Visibility"
                question="Is the agent aware of you?"
                status="Measured"
                statusTone="success"
                tools="Profound · Bluefish · GEO suites"
                dims={["Mention rate", "Share of voice", "Recommendation strength"]}
              />

              {/* Accessibility — quiet partial row */}
              <QuietPillarRow
                icon={FileCode2}
                index="02"
                label="Accessibility"
                question="Can it read your commerce data?"
                status="Partial"
                statusTone="warning"
                tools="SEO · structured-data tools"
                dims={["Structured data completeness", "Platform distribution"]}
              />

              {/* True Value — dramatic dark row */}
              <TrueValueRow />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ───────── QuietPillarRow ───────── */

const QuietPillarRow = ({
  icon: Icon,
  index,
  label,
  question,
  status,
  statusTone,
  tools,
  dims,
}: {
  icon: typeof Eye;
  index: string;
  label: string;
  question: string;
  status: string;
  statusTone: "success" | "warning";
  tools: string;
  dims: string[];
}) => {
  const accent = statusTone === "success" ? "hsl(var(--success))" : "hsl(var(--warning))";
  const StatusIcon = statusTone === "success" ? Check : MinusCircle;

  return (
    <div className="group relative grid grid-cols-12 items-center gap-4 rounded-2xl border border-foreground/[0.08] bg-white/65 px-5 py-5 md:px-7 md:py-6">
      {/* Index + Icon + Name */}
      <div className="col-span-12 flex items-center gap-4 md:col-span-5">
        <span className="font-mono text-[10px] tabular-nums text-foreground/35">
          {index}
        </span>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-background/60"
        >
          <Icon size={17} color="hsl(240 5% 45%)" strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <div className="font-heading text-[19px] leading-tight text-foreground md:text-[21px]" style={{ letterSpacing: "-0.01em" }}>
            {label}
          </div>
          <div className="mt-0.5 text-[12.5px] italic text-foreground/55">
            {question}
          </div>
        </div>
      </div>

      {/* Dimensions inline */}
      <div className="col-span-12 flex flex-wrap items-center gap-1.5 md:col-span-4">
        {dims.map((d) => (
          <span
            key={d}
            className="rounded-full border border-foreground/10 bg-background/60 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.06em] text-foreground/60"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Status + tools */}
      <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-3 md:justify-end">
        <div className="text-right">
          <div
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            <StatusIcon size={12} strokeWidth={2.4} />
            {status}
          </div>
          <div className="mt-1 text-[11.5px] text-foreground/50">{tools}</div>
        </div>
      </div>
    </div>
  );
};

/* ───────── TrueValueRow (the showpiece) ───────── */

const TrueValueRow = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-2 overflow-hidden rounded-2xl bg-[#0E0E14] text-white"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(213 99% 50% / 0.22), transparent 65%)",
        }}
      />
      {/* Vertical primary accent bar on the left */}
      <span
        aria-hidden
        className="absolute inset-y-4 left-0 w-[3px] rounded-r-full bg-primary"
      />

      <div className="relative grid grid-cols-12 items-stretch gap-6 px-6 py-7 md:gap-10 md:px-10 md:py-9">
        {/* LEFT: Title block */}
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tabular-nums text-primary">
              03
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-primary">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary opacity-50 animate-ping" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Unmeasured industry-wide
            </span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
              <Sparkles size={20} color="hsl(213 99% 60%)" strokeWidth={1.8} />
            </span>
            <h3
              className="font-heading text-[36px] leading-none text-white md:text-[44px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              True Value
            </h3>
          </div>

          <p className="mt-4 text-[15px] leading-snug text-white/70 md:text-[16px]">
            Are agents seeing your <em className="not-italic text-white">real offer</em>{" "}
            — after loyalty, card-linked perks, and live promos resolve?
          </p>

          {/* Parleo claim line */}
          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/45">
              Measured by
            </span>
            <span className="font-heading text-[16px] text-primary" style={{ letterSpacing: "-0.005em" }}>
              Parleo
            </span>
            <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
              The Parleo layer
            </span>
          </div>
        </div>

        {/* RIGHT: Three dimensions as numbered cards */}
        <div className="col-span-12 md:col-span-7">
          <div className="grid gap-2.5 md:grid-cols-3 md:gap-3">
            {[
              {
                id: "06",
                name: "Incentive citation",
                detail: "Are agents citing your loyalty perks?",
              },
              {
                id: "07",
                name: "Incentive accuracy",
                detail: "Are the most current incentives applied?",
              },
              {
                id: "08",
                name: "True value delta",
                detail: "How do you compare after resolution?",
              },
            ].map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                className="group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-primary/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] tabular-nums text-primary">
                    {d.id}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                </div>
                <div className="mt-3 font-heading text-[15.5px] leading-tight text-white" style={{ letterSpacing: "-0.005em" }}>
                  {d.name}
                </div>
                <div className="mt-1.5 text-[12px] leading-snug text-white/55">
                  {d.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer micro-stat */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              Industry coverage today
            </span>
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <span className="font-mono text-[11px] tabular-nums text-primary">0 / 8</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShareOfAlgorithmSection;
