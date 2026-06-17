import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Eye, FileCode2, Sparkles, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

/* ───────────────────────────────────────────────────────────
   Section B · Share of Algorithm
   A single hand-crafted, design-forward interactive panel:
   ① Era timeline (glyphs)  →  ② Pillar stack (True Value highlighted)
   ─────────────────────────────────────────────────────────── */

/* ─────────── ERAS ─────────── */

type EraId = "1960s" | "1980s" | "2010s" | "2025";
type Era = {
  id: EraId;
  year: string;
  label: string;
  measured: string;
  spend: string;
  glyph: (active: boolean) => JSX.Element;
};

const stroke = (active: boolean) =>
  active ? "hsl(213 99% 60%)" : "rgba(255,255,255,0.35)";

const ERAS: Era[] = [
  {
    id: "1960s",
    year: "1960s",
    label: "Shelf",
    measured: "Nielsen",
    spend: "$8B",
    glyph: (a) => (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
        <rect x="4" y="7" width="24" height="4" rx="0.5" stroke={stroke(a)} />
        <rect x="4" y="14" width="24" height="4" rx="0.5" stroke={stroke(a)} />
        <rect x="4" y="21" width="24" height="4" rx="0.5" stroke={stroke(a)} />
        <circle cx="9" cy="9" r="0.8" fill={stroke(a)} />
        <circle cx="16" cy="16" r="0.8" fill={stroke(a)} />
        <circle cx="22" cy="23" r="0.8" fill={stroke(a)} />
      </svg>
    ),
  },
  {
    id: "1980s",
    year: "1980s",
    label: "Voice",
    measured: "GRPs",
    spend: "$12B",
    glyph: (a) => (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
        <circle cx="16" cy="22" r="2" fill={stroke(a)} />
        <path d="M10 18 A 8 8 0 0 1 22 18" stroke={stroke(a)} strokeLinecap="round" />
        <path d="M7 16 A 12 12 0 0 1 25 16" stroke={stroke(a)} strokeLinecap="round" opacity="0.7" />
        <path d="M4 14 A 16 16 0 0 1 28 14" stroke={stroke(a)} strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "2010s",
    year: "2010s",
    label: "Search",
    measured: "SEO",
    spend: "$200B",
    glyph: (a) => (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
        <circle cx="14" cy="14" r="7" stroke={stroke(a)} />
        <path d="M19.5 19.5 L26 26" stroke={stroke(a)} strokeLinecap="round" />
        <path d="M11 14 H17" stroke={stroke(a)} strokeLinecap="round" opacity="0.6" />
        <path d="M11 11 H15" stroke={stroke(a)} strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "2025",
    year: "2025",
    label: "Algorithm",
    measured: "Parleo",
    spend: "~$1T",
    glyph: (a) => (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
        <circle cx="16" cy="16" r="3" fill={stroke(a)} />
        <circle cx="6" cy="8" r="2" stroke={stroke(a)} />
        <circle cx="26" cy="8" r="2" stroke={stroke(a)} />
        <circle cx="6" cy="24" r="2" stroke={stroke(a)} />
        <circle cx="26" cy="24" r="2" stroke={stroke(a)} />
        <path d="M8 9 L14 14 M24 9 L18 14 M8 23 L14 18 M24 23 L18 18" stroke={stroke(a)} opacity="0.6" />
      </svg>
    ),
  },
];

/* ─────────── PILLARS ─────────── */

type PillarTone = "measured" | "partial" | "open";
type Pillar = {
  id: string;
  label: string;
  question: string;
  dims: { id: string; name: string }[];
  status: string;
  coverage: number; // 0..1, visual fill on the row
  tone: PillarTone;
  measuredBy: string;
  icon: typeof Eye;
};

const PILLARS: Pillar[] = [
  {
    id: "visibility",
    label: "Visibility",
    question: "Is the agent aware of you?",
    dims: [
      { id: "01", name: "Mention rate" },
      { id: "02", name: "Share of voice" },
      { id: "03", name: "Recommendation strength" },
    ],
    status: "Measured",
    coverage: 1,
    tone: "measured",
    measuredBy: "Profound · Bluefish",
    icon: Eye,
  },
  {
    id: "accessibility",
    label: "Accessibility",
    question: "Can it read your data?",
    dims: [
      { id: "04", name: "Structured data" },
      { id: "05", name: "Platform distribution" },
    ],
    status: "Partial",
    coverage: 0.55,
    tone: "partial",
    measuredBy: "SEO · structured-data tools",
    icon: FileCode2,
  },
  {
    id: "true-value",
    label: "True Value",
    question: "Is it seeing your real offer?",
    dims: [
      { id: "06", name: "Incentive citation" },
      { id: "07", name: "Incentive accuracy" },
      { id: "08", name: "True value delta" },
    ],
    status: "Unmeasured",
    coverage: 0,
    tone: "open",
    measuredBy: "Parleo",
    icon: Sparkles,
  },
];

const toneColor = (t: PillarTone) =>
  t === "measured"
    ? "hsl(var(--success))"
    : t === "partial"
      ? "hsl(var(--warning))"
      : "hsl(213 99% 55%)";

/* ─────────── SECTION ─────────── */

const ShareOfAlgorithmSection = () => {
  const [activeEra, setActiveEra] = useState<EraId>("2025");
  const [activePillar, setActivePillar] = useState<string>("true-value");
  const reduce = useReducedMotion();

  const eraIndex = ERAS.findIndex((e) => e.id === activeEra);
  const progressPct = (eraIndex / (ERAS.length - 1)) * 100;
  const era = ERAS[eraIndex];

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
            After shelf, voice, and search comes the era quietly redirecting
            every category. Three pillars decide the score. One is still
            unmeasured.
          </p>
        </div>

        {/* ─── Canvas ─── */}
        <div
          className="relative mt-12 overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0B0B12] text-white md:mt-16"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(213 99% 50% / 0.16), transparent 65%)",
            }}
          />
          {/* Faint grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* ① Era timeline */}
          <div className="relative px-6 pt-8 md:px-12 md:pt-12">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-white/40">
                ① Four eras of distribution
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/30">
                {String(eraIndex + 1).padStart(2, "0")} / 04
              </span>
            </div>

            <div className="relative mt-8 pb-2">
              {/* Glyphs row */}
              <div className="relative grid grid-cols-4 gap-3">
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
                        animate={{
                          y: isActive ? -2 : 0,
                          opacity: isActive ? 1 : 0.55,
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-3"
                      >
                        {e.glyph(isActive)}
                      </motion.div>
                      <div
                        className={`font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
                          isActive ? "text-primary" : "text-white/40"
                        }`}
                      >
                        {e.year}
                      </div>
                      <div
                        className={`mt-1 font-heading text-[14px] leading-tight md:text-[15px] transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-white/55 group-hover:text-white/80"
                        }`}
                        style={{ letterSpacing: "-0.005em" }}
                      >
                        Share of {e.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Rail */}
              <div className="relative mt-7 h-px">
                <div className="absolute inset-0 bg-white/10" />
                <motion.div
                  className="absolute left-0 top-0 h-px bg-primary"
                  initial={reduce ? { width: `${progressPct}%` } : { width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Tick marks */}
                {ERAS.map((_, i) => {
                  const left = (i / (ERAS.length - 1)) * 100;
                  const isActive = i === eraIndex;
                  return (
                    <span
                      key={i}
                      className="absolute -translate-x-1/2"
                      style={{ left: `${left}%`, top: "-3px" }}
                    >
                      <span className="relative inline-flex h-1.5 w-1.5">
                        {isActive && (
                          <span className="absolute -inset-1.5 rounded-full bg-primary/30 animate-ping" />
                        )}
                        <span
                          className={`relative inline-block h-1.5 w-1.5 rounded-full ${
                            isActive
                              ? "bg-primary"
                              : i < eraIndex
                                ? "bg-primary/60"
                                : "bg-white/25"
                          }`}
                        />
                      </span>
                    </span>
                  );
                })}
              </div>

              {/* Compact metadata strip */}
              <div className="mt-5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={era.id + "-m"}
                    initial={reduce ? false : { opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.25 }}
                  >
                    Measured by{" "}
                    <span className="text-primary">{era.measured}</span>
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={era.id + "-s"}
                    initial={reduce ? false : { opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="text-white/55 tabular-nums"
                  >
                    {era.spend} annual spend
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Divider with label */}
          <div className="relative mt-12 flex items-center gap-4 px-6 md:mt-14 md:px-12">
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-white/40">
              ② Decided by three pillars
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* ② Pillar stack */}
          <div className="relative px-6 pb-10 pt-8 md:px-12 md:pb-14 md:pt-10">
            <div className="flex flex-col gap-3">
              {PILLARS.map((p) => {
                const isActive = p.id === activePillar;
                const Icon = p.icon;
                const accent = toneColor(p.tone);
                const isOpen = p.tone === "open";

                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    onMouseEnter={() => setActivePillar(p.id)}
                    onFocus={() => setActivePillar(p.id)}
                    onClick={() => setActivePillar(p.id)}
                    aria-pressed={isActive}
                    layout
                    className={`group relative flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      isActive
                        ? isOpen
                          ? "border-primary/40"
                          : "border-white/20"
                        : "border-white/[0.08] hover:border-white/15"
                    }`}
                    style={{
                      background: isActive
                        ? isOpen
                          ? "linear-gradient(180deg, hsl(213 99% 50% / 0.14), hsl(213 99% 50% / 0.04))"
                          : "rgba(255,255,255,0.035)"
                        : "rgba(255,255,255,0.015)",
                    }}
                  >
                    {/* Row header */}
                    <div className="flex items-center gap-5 px-5 py-4 md:px-7 md:py-5">
                      {/* Icon tile */}
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          borderColor: isActive
                            ? `${accent}80`
                            : "rgba(255,255,255,0.1)",
                          background: isActive
                            ? `${accent}1A`
                            : "rgba(255,255,255,0.02)",
                        }}
                      >
                        <Icon
                          size={18}
                          color={isActive ? accent : "rgba(255,255,255,0.55)"}
                          strokeWidth={1.6}
                        />
                      </span>

                      {/* Label + question */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-3">
                          <h4
                            className={`font-heading text-[20px] leading-none md:text-[22px] ${
                              isActive ? "text-white" : "text-white/75"
                            }`}
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {p.label}
                          </h4>
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                            0{PILLARS.indexOf(p) + 1}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[12.5px] italic leading-snug text-white/55 md:text-[13px]">
                          {p.question}
                        </p>
                      </div>

                      {/* Coverage meter (visual) */}
                      <div className="hidden w-44 shrink-0 md:block">
                        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                          <span>Industry coverage</span>
                          <span style={{ color: accent }}>
                            {Math.round(p.coverage * 100)}%
                          </span>
                        </div>
                        <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.max(p.coverage * 100, 4)}%` }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full"
                            style={{
                              background: isOpen
                                ? `repeating-linear-gradient(45deg, ${accent}, ${accent} 3px, transparent 3px, transparent 6px)`
                                : accent,
                            }}
                          />
                        </div>
                      </div>

                      {/* Status pill */}
                      <span
                        className="hidden shrink-0 rounded-full border px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] md:inline-flex md:items-center md:gap-1.5"
                        style={{
                          borderColor: `${accent}50`,
                          color: accent,
                          background: `${accent}10`,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: accent }}
                        />
                        {p.status}
                      </span>
                    </div>

                    {/* Expanded dimensions (active row) */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="dims"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.06] px-5 py-4 md:px-7 md:py-5">
                            <div className="flex flex-wrap items-center gap-2">
                              {p.dims.map((d) => (
                                <span
                                  key={d.id}
                                  className="flex items-center gap-2 rounded-full border px-3 py-1.5"
                                  style={{
                                    borderColor: isOpen
                                      ? `${accent}40`
                                      : "rgba(255,255,255,0.1)",
                                    background: isOpen
                                      ? `${accent}10`
                                      : "rgba(255,255,255,0.025)",
                                  }}
                                >
                                  <span
                                    className="font-mono text-[10px] tabular-nums"
                                    style={{
                                      color: isOpen
                                        ? accent
                                        : "rgba(255,255,255,0.45)",
                                    }}
                                  >
                                    {d.id}
                                  </span>
                                  <span className="text-[12.5px] text-white/85">
                                    {d.name}
                                  </span>
                                </span>
                              ))}
                              <span className="ml-auto hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 md:inline-flex">
                                Measured by
                                <span
                                  className="text-[11px] normal-case tracking-normal"
                                  style={{
                                    color: isOpen ? accent : "rgba(255,255,255,0.85)",
                                    fontWeight: isOpen ? 600 : 400,
                                  }}
                                >
                                  {p.measuredBy}
                                </span>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Right edge "claimed" marker on True Value */}
                    {isOpen && (
                      <span
                        aria-hidden
                        className="absolute right-4 top-4 hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-primary md:inline-flex"
                      >
                        <ArrowRight size={11} />
                        Parleo layer
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ShareOfAlgorithmSection;
