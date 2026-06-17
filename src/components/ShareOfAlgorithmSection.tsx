import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/* ───────────────────────────────────────────────────────────
   Section B · Share of Algorithm
   One interactive panel: Era timeline → Pillar lens → True Value.
   ─────────────────────────────────────────────────────────── */

type EraId = "1960s" | "1980s" | "2010s" | "2025";

type Era = {
  id: EraId;
  year: string;
  label: string;
  distribution: string;
  measured: string;
  spend: string;
};

const ERAS: Era[] = [
  {
    id: "1960s",
    year: "1960s",
    label: "Share of Shelf",
    distribution: "Physical retail aisles.",
    measured: "Nielsen, IRI",
    spend: "$8B+",
  },
  {
    id: "1980s",
    year: "1980s",
    label: "Share of Voice",
    distribution: "Broadcast media.",
    measured: "GRPs / MMM",
    spend: "$12B+",
  },
  {
    id: "2010s",
    year: "2010s",
    label: "Share of Search",
    distribution: "Query results.",
    measured: "SEO / SEM rank",
    spend: "$200B+",
  },
  {
    id: "2025",
    year: "2025",
    label: "Share of Algorithm",
    distribution: "Agent decisions.",
    measured: "Parleo",
    spend: "~$1T",
  },
];

type PillarTone = "measured" | "partial" | "open";
type PillarId = "visibility" | "accessibility" | "true-value";

type Dimension = { id: string; name: string; detail?: string };

type Pillar = {
  id: PillarId;
  label: string;
  question: string;
  dimensions: Dimension[];
  measured: string;
  status: string;
  tone: PillarTone;
};

const PILLARS: Pillar[] = [
  {
    id: "visibility",
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
    id: "accessibility",
    label: "Accessibility",
    question: "Can agents read your commerce data?",
    dimensions: [
      { id: "04", name: "Structured Data Completeness" },
      { id: "05", name: "Platform Distribution" },
    ],
    measured: "Partial · SEO / structured-data tools",
    status: "Partly measured",
    tone: "partial",
  },
  {
    id: "true-value",
    label: "True Value",
    question: "Are agents seeing your real offer?",
    dimensions: [
      {
        id: "06",
        name: "Incentive Citation Rate",
        detail: "Are agents citing your loyalty and incentive data?",
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

const toneAccent = (tone: PillarTone) =>
  tone === "measured"
    ? "hsl(var(--success))"
    : tone === "partial"
      ? "hsl(var(--warning))"
      : "hsl(213 99% 50%)";

const StatusDot = ({ tone, ping = false }: { tone: PillarTone; ping?: boolean }) => (
  <span className="relative inline-flex h-1.5 w-1.5">
    {ping && (
      <span
        className="absolute inset-0 rounded-full opacity-50 animate-ping"
        style={{ background: toneAccent(tone) }}
      />
    )}
    <span
      className="relative inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: toneAccent(tone) }}
    />
  </span>
);

const ShareOfAlgorithmSection = () => {
  const [activeEraId, setActiveEraId] = useState<EraId>("2025");
  const [activePillarId, setActivePillarId] = useState<PillarId>("true-value");
  const reduce = useReducedMotion();

  const activeEra = ERAS.find((e) => e.id === activeEraId)!;
  const activeEraIndex = ERAS.findIndex((e) => e.id === activeEraId);
  const activePillar = PILLARS.find((p) => p.id === activePillarId)!;

  const progressPct = (activeEraIndex / (ERAS.length - 1)) * 100;

  return (
    <AnimatedSection
      id="share-of-algorithm"
      className="relative bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            Share of Algorithm
          </span>
        </div>

        {/* Headline */}
        <div className="mt-6 grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <h2
            className="font-heading text-[36px] text-foreground md:text-[58px]"
            style={{ lineHeight: 1.02, letterSpacing: "-0.02em" }}
          >
            A new metric decides{" "}
            <span className="text-foreground/45">who agents recommend.</span>
          </h2>
          <p className="self-end max-w-[460px] text-[16px] leading-[1.55] text-foreground/65 md:text-[18px]">
            After shelf, voice, and search comes the era that quietly redirects
            every category. Three pillars decide the score. One is still
            unmeasured.
          </p>
        </div>

        {/* ─── Interactive editorial canvas ─── */}
        <div
          className="relative mt-12 overflow-hidden rounded-2xl border border-transparent bg-[#0E0E14] text-white md:mt-16"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(213 99% 50% / 0.18), transparent 60%)",
            }}
          />

          {/* ── Era rail ── */}
          <div className="relative px-6 pt-8 md:px-10 md:pt-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/45">
                Four eras of distribution
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/35">
                {String(activeEraIndex + 1).padStart(2, "0")} / 04
              </span>
            </div>

            {/* Rail */}
            <div className="relative mt-7">
              {/* Base hairline */}
              <div className="absolute left-0 right-0 top-1.5 h-px bg-white/10" />
              {/* Progress fill */}
              <motion.div
                className="absolute left-0 top-1.5 h-px bg-primary"
                initial={reduce ? { width: `${progressPct}%` } : { width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Nodes */}
              <div className="relative grid grid-cols-4 gap-2">
                {ERAS.map((era, i) => {
                  const isActive = era.id === activeEraId;
                  const isPast = i < activeEraIndex;
                  return (
                    <button
                      key={era.id}
                      type="button"
                      onClick={() => setActiveEraId(era.id)}
                      onMouseEnter={() => setActiveEraId(era.id)}
                      aria-pressed={isActive}
                      className="group flex flex-col items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md"
                    >
                      <span className="relative flex h-3 w-3 items-center justify-center">
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                        )}
                        <span
                          className={`relative inline-block h-3 w-3 rounded-full border transition-colors ${
                            isActive
                              ? "border-primary bg-primary"
                              : isPast
                                ? "border-primary/50 bg-primary/30"
                                : "border-white/25 bg-[#0E0E14] group-hover:border-white/55"
                          }`}
                        />
                      </span>
                      <div className="min-w-0">
                        <div
                          className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                            isActive ? "text-primary" : "text-white/45"
                          }`}
                        >
                          {era.year}
                        </div>
                        <div
                          className={`mt-1 font-heading text-[15px] leading-tight md:text-[17px] transition-colors ${
                            isActive ? "text-white" : "text-white/55 group-hover:text-white/80"
                          }`}
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {era.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Era detail + pillar lens ── */}
          <div className="relative mt-8 grid gap-px bg-white/[0.06] md:mt-10 md:grid-cols-[0.9fr_1.4fr]">
            {/* LEFT: Era detail (morphs) */}
            <div className="bg-[#0E0E14] px-6 py-7 md:px-10 md:py-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra.id}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-2">
                    <StatusDot tone="open" ping={activeEra.id === "2025"} />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/55">
                      {activeEra.id === "2025" ? "Now" : "Past era"}
                    </span>
                  </div>

                  <h3
                    className="mt-4 font-heading text-[28px] leading-[1.05] text-white md:text-[36px]"
                    style={{ letterSpacing: "-0.015em" }}
                  >
                    {activeEra.label}
                  </h3>

                  <p className="mt-3 text-[14px] leading-snug text-white/65 md:text-[15px]">
                    Distribution moved through{" "}
                    {activeEra.distribution.toLowerCase().replace(/\.$/, "")}.
                  </p>

                  <dl className="mt-7 space-y-4 border-t border-white/10 pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
                        Measured by
                      </dt>
                      <dd
                        className={`text-right text-[12.5px] ${
                          activeEra.id === "2025"
                            ? "font-semibold text-primary"
                            : "text-white/80"
                        }`}
                      >
                        {activeEra.measured}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
                        Annual spend
                      </dt>
                      <dd className="text-right font-mono text-[12.5px] tabular-nums text-white/85">
                        {activeEra.spend}
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: Pillar lens (only meaningful on 2025; locked open) */}
            <div className="relative bg-[#0E0E14] px-6 py-7 md:px-10 md:py-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/55">
                  Decided by three pillars
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/35">
                  Eight dimensions
                </span>
              </div>

              {/* Pillar chips */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {PILLARS.map((p) => {
                  const isActive = p.id === activePillarId;
                  const accent = toneAccent(p.tone);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePillarId(p.id)}
                      onMouseEnter={() => setActivePillarId(p.id)}
                      aria-pressed={isActive}
                      className={`group relative flex flex-col items-start gap-2 rounded-xl border px-3.5 py-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                        isActive
                          ? "border-transparent"
                          : "border-white/10 hover:border-white/25"
                      }`}
                      style={
                        isActive
                          ? {
                              background:
                                p.tone === "open"
                                  ? "linear-gradient(180deg, hsl(213 99% 50% / 0.16), hsl(213 99% 50% / 0.06))"
                                  : "rgba(255,255,255,0.05)",
                              boxShadow:
                                p.tone === "open"
                                  ? "inset 0 0 0 1px hsl(213 99% 50% / 0.45)"
                                  : "inset 0 0 0 1px rgba(255,255,255,0.18)",
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-2">
                        <StatusDot tone={p.tone} ping={isActive && p.tone === "open"} />
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.2em]"
                          style={{
                            color: isActive ? accent : "rgba(255,255,255,0.45)",
                          }}
                        >
                          {p.status}
                        </span>
                      </div>
                      <div
                        className={`font-heading text-[17px] leading-tight transition-colors md:text-[19px] ${
                          isActive ? "text-white" : "text-white/70 group-hover:text-white"
                        }`}
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {p.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active pillar expanded panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 md:p-5"
                >
                  <p className="text-[13px] italic leading-snug text-white/65 md:text-[14px]">
                    "{activePillar.question}"
                  </p>

                  <ul className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    {activePillar.dimensions.map((d, di) => (
                      <motion.li
                        key={d.id}
                        initial={reduce ? false : { opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 + di * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className="mt-[2px] font-mono text-[10.5px] tabular-nums"
                          style={{
                            color:
                              activePillar.tone === "open"
                                ? "hsl(213 99% 60%)"
                                : "rgba(255,255,255,0.45)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {d.id}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[13.5px] font-medium leading-snug text-white">
                            {d.name}
                          </div>
                          {d.detail && (
                            <div className="mt-1 text-[12px] leading-snug text-white/55">
                              {d.detail}
                            </div>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                      Measured by
                    </span>
                    <span
                      className="text-right text-[12px]"
                      style={{
                        color:
                          activePillar.tone === "open"
                            ? "hsl(213 99% 65%)"
                            : "rgba(255,255,255,0.8)",
                        fontWeight: activePillar.tone === "open" ? 600 : 400,
                      }}
                    >
                      {activePillar.measured}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Closing strip inside the canvas */}
          <div className="relative flex flex-col gap-3 border-t border-white/10 px-6 py-5 md:flex-row md:items-center md:gap-6 md:px-10">
            <div className="flex items-center gap-3 md:shrink-0">
              <span className="h-5 w-[3px] rounded-full bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                The opening
              </span>
            </div>
            <p className="text-[14px] leading-snug text-white/75 md:text-[15px]">
              Visibility and Accessibility already have tools.{" "}
              <span className="font-semibold text-white">
                True Value does not
              </span>
              , and that is the layer Parleo owns.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ShareOfAlgorithmSection;
