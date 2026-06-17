import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/* Section B: Share of Algorithm
   A single interactive canvas. Era rail → 3 coverage pillars →
   live value resolution. Designed-forward, not text-heavy. */

type EraId = "shelf" | "voice" | "search" | "algorithm";
type PillarId = "visibility" | "accessibility" | "trueValue";

type Era = { id: EraId; year: string; name: string; caption: string };
type Pillar = {
  id: PillarId;
  index: string;
  name: string;
  question: string;
  coverage: number; // 0..1
  status: "Measured" | "Partial" | "Parleo";
};

const ERAS: Era[] = [
  { id: "shelf", year: "1960s", name: "Shelf", caption: "Distribution becomes measurable." },
  { id: "voice", year: "1980s", name: "Voice", caption: "Mass media turns reach into a lever." },
  { id: "search", year: "2010s", name: "Search", caption: "Intent moves into keywords and rankings." },
  { id: "algorithm", year: "2025", name: "Algorithm", caption: "Agents compare offers before the customer sees the shelf." },
];

const PILLARS: Pillar[] = [
  {
    id: "visibility",
    index: "01",
    name: "Visibility",
    question: "Can agents find you?",
    coverage: 0.92,
    status: "Measured",
  },
  {
    id: "accessibility",
    index: "02",
    name: "Accessibility",
    question: "Can agents read your catalog?",
    coverage: 0.55,
    status: "Partial",
  },
  {
    id: "trueValue",
    index: "03",
    name: "True Value",
    question: "Can agents price the real offer?",
    coverage: 0.08,
    status: "Parleo",
  },
];

const OFFER_LINES = [
  { label: "List price", value: 30.0, kind: "list" as const },
  { label: "Member price", value: -3.0, kind: "incentive" as const },
  { label: "Loyalty credit", value: -2.2, kind: "incentive" as const },
  { label: "Card-linked offer", value: -2.4, kind: "incentive" as const },
];
const RESOLVED = 30 - 3 - 2.2 - 2.4;

const ShareOfAlgorithmSection = () => {
  const [activeEra, setActiveEra] = useState<EraId>("algorithm");
  const [activePillar, setActivePillar] = useState<PillarId>("trueValue");
  const reduce = useReducedMotion();
  const eraIndex = ERAS.findIndex((e) => e.id === activeEra);
  const activeEraData = ERAS[eraIndex] ?? ERAS[3];
  const progressPct = (eraIndex / (ERAS.length - 1)) * 100;
  const pillar = PILLARS.find((p) => p.id === activePillar) ?? PILLARS[2];

  return (
    <AnimatedSection id="share-of-algorithm" className="relative bg-background py-16 md:py-20">
      <div className="mx-auto max-w-content px-6 md:px-20">
        {/* Headline */}
        <div className="max-w-[820px]">
          <h2
            className="font-heading text-[40px] leading-[1.02] text-foreground md:text-[58px]"
            style={{ letterSpacing: "-0.022em" }}
          >
            The new shelf is decided by{" "}
            <em
              className="font-serif italic text-primary"
              style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
            >
              agents
            </em>
            .
          </h2>
          <p className="mt-5 max-w-[640px] text-[17px] leading-[1.55] text-foreground/65 md:text-[19px]">
            Visibility gets a brand considered. Accessibility lets agents read the catalog.
            True Value is the offer a customer actually earns — and the layer Parleo owns.
          </p>
        </div>

        {/* Single canvas */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-card md:mt-14">
          {/* Era rail */}
          <div className="px-6 pt-7 md:px-10 md:pt-9 lg:px-14">
            <div className="flex items-end justify-between gap-4">
              <div className="font-display text-[15px] text-foreground/70 md:text-[16px]">
                Four eras of distribution.
                <span className="ml-1.5 text-foreground/40">One unresolved layer.</span>
              </div>
              <div className="hidden font-mono text-[10px] tabular-nums text-foreground/40 md:block">
                {String(eraIndex + 1).padStart(2, "0")} / 04
              </div>
            </div>

            <div className="relative mt-6">
              {/* Track */}
              <div className="absolute left-0 right-0 top-[34px] h-px bg-border" />
              <motion.div
                className="absolute left-0 top-[34px] h-px bg-primary"
                initial={reduce ? { width: `${progressPct}%` } : { width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="relative grid grid-cols-4 gap-2">
                {ERAS.map((era, i) => {
                  const active = era.id === activeEra;
                  const passed = i <= eraIndex;
                  return (
                    <button
                      key={era.id}
                      type="button"
                      onMouseEnter={() => setActiveEra(era.id)}
                      onFocus={() => setActiveEra(era.id)}
                      onClick={() => setActiveEra(era.id)}
                      className="group flex flex-col items-center pt-1 focus:outline-none"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all ${
                          active
                            ? "border-primary/40 bg-primary/[0.06] text-primary scale-[1.04]"
                            : passed
                            ? "border-foreground/15 bg-background text-foreground/65"
                            : "border-border bg-background/40 text-foreground/35"
                        }`}
                      >
                        <EraGlyph id={era.id} />
                      </div>
                      <div
                        className={`mt-3 h-2 w-2 rounded-full transition-colors ${
                          active ? "bg-primary" : passed ? "bg-foreground/35" : "bg-border"
                        }`}
                      />
                      <div className="mt-3 text-center">
                        <div className={`font-display text-[14px] leading-none ${active ? "text-foreground" : "text-foreground/55"}`}>
                          {era.name}
                        </div>
                        <div className="mt-1 font-mono text-[9.5px] tabular-nums text-foreground/40">
                          {era.year}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-5 max-w-[520px] text-[13.5px] leading-snug text-foreground/55">
              {activeEraData.caption}
            </p>
          </div>

          <div className="mt-7 h-px bg-border" />

          {/* Pillars + resolution */}
          <div className="grid gap-7 px-6 py-7 md:grid-cols-[420px_1fr] md:gap-10 md:px-10 md:py-9 lg:px-14">
            {/* Pillars stack */}
            <div className="space-y-3">
              {PILLARS.map((p) => (
                <PillarTile
                  key={p.id}
                  pillar={p}
                  active={activePillar === p.id}
                  onSelect={() => setActivePillar(p.id)}
                />
              ))}
              <div className="flex items-center gap-2 pl-1 pt-2 text-[12px] text-foreground/45">
                <span className="inline-block h-1 w-1 rounded-full bg-primary" />
                <span>Tap a pillar to inspect.</span>
              </div>
            </div>

            {/* Resolution canvas */}
            <ResolutionCanvas pillar={pillar} />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ── Pillar tile with real coverage meter ── */
const PillarTile = ({
  pillar,
  active,
  onSelect,
}: {
  pillar: Pillar;
  active: boolean;
  onSelect: () => void;
}) => {
  const isParleo = pillar.status === "Parleo";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        active
          ? isParleo
            ? "border-primary/45 bg-primary/[0.05]"
            : "border-foreground/22 bg-background"
          : "border-border bg-background/55 hover:border-foreground/18"
      }`}
    >
      {/* Accent stripe for active */}
      {active && (
        <motion.span
          layoutId="pillar-accent"
          className={`absolute left-0 top-4 h-[calc(100%-2rem)] w-[3px] rounded-full ${
            isParleo ? "bg-primary" : "bg-foreground/55"
          }`}
        />
      )}

      <div className="flex items-start gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            isParleo
              ? "border-primary/35 bg-primary/10 text-primary"
              : active
              ? "border-foreground/20 bg-card text-foreground/70"
              : "border-border bg-card text-foreground/45"
          }`}
        >
          <PillarGlyph id={pillar.id} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[10px] tabular-nums text-foreground/40">
              {pillar.index}
            </span>
            <StatusPill status={pillar.status} />
          </div>
          <div
            className={`mt-1.5 font-display text-[22px] leading-none ${
              isParleo && active ? "text-primary" : "text-foreground"
            }`}
          >
            {pillar.name}
          </div>
          <div className="mt-1.5 text-[13px] leading-snug text-foreground/55">
            {pillar.question}
          </div>

          {/* Coverage meter */}
          <div className="mt-3.5 flex items-center gap-3">
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/[0.08]">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${pillar.coverage * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute left-0 top-0 h-full rounded-full ${
                  isParleo ? "bg-primary" : "bg-foreground/55"
                }`}
              />
              {/* Industry coverage gap marker */}
              {isParleo && (
                <span
                  aria-hidden
                  className="absolute right-0 top-0 h-full w-[2px] bg-primary/30"
                  style={{ left: `${pillar.coverage * 100}%` }}
                />
              )}
            </div>
            <span className="font-mono text-[10px] tabular-nums text-foreground/55">
              {Math.round(pillar.coverage * 100)}%
            </span>
          </div>
          <div className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-foreground/38">
            {isParleo ? "Industry coverage gap" : "Industry coverage"}
          </div>
        </div>
      </div>
    </button>
  );
};

const StatusPill = ({ status }: { status: "Measured" | "Partial" | "Parleo" }) => {
  const cls =
    status === "Parleo"
      ? "border-primary/35 bg-primary/[0.08] text-primary"
      : status === "Partial"
      ? "border-foreground/20 bg-background text-foreground/55"
      : "border-foreground/15 bg-background text-foreground/55";
  const label = status === "Parleo" ? "Parleo layer" : status;
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${cls}`}
    >
      {label}
    </span>
  );
};

/* ── Resolution canvas — animated bar breakdown + rank swap ── */
const ResolutionCanvas = ({ pillar }: { pillar: Pillar }) => {
  const isTV = pillar.id === "trueValue";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-background/60 p-5 md:p-7">
      {/* Ambient corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(213 99% 50% / 0.10), transparent 65%)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={pillar.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-display text-[13px] text-foreground/55">
                Same product. Two prices.
              </div>
              <div className="mt-1 font-display text-[24px] leading-tight text-foreground md:text-[28px]">
                {isTV
                  ? "The agent sees the real offer."
                  : pillar.id === "accessibility"
                  ? "Catalog readable. Value still hidden."
                  : "On the shortlist. Not yet ranked right."}
              </div>
            </div>
            <div className="hidden shrink-0 text-right md:block">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/40">
                SK-II Essence
              </div>
              <div className="mt-1 font-mono text-[10px] tabular-nums text-foreground/55">
                230 ml
              </div>
            </div>
          </div>

          {/* Stacked horizontal bars */}
          <div className="mt-6 space-y-2.5">
            {OFFER_LINES.map((line, i) => {
              const isList = line.kind === "list";
              const pct = isList ? 100 : Math.abs(line.value) / 30 * 100;
              return (
                <motion.div
                  key={line.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                  className="flex items-center gap-3"
                >
                  <div className="w-[110px] shrink-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-foreground/55">
                    {line.label}
                  </div>
                  <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-foreground/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: 0.08 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full ${
                        isList
                          ? "bg-foreground/15"
                          : isTV
                          ? "bg-primary/85"
                          : "bg-foreground/35"
                      }`}
                    />
                    <span className="absolute inset-0 flex items-center justify-end pr-3 font-mono text-[11px] tabular-nums text-foreground">
                      {isList ? "$30.00" : `−$${Math.abs(line.value).toFixed(2)}`}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Resolved row */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.45 }}
              className={`mt-3 flex items-center gap-3 rounded-xl border px-3 py-3 ${
                isTV ? "border-primary/30 bg-primary/[0.05]" : "border-foreground/15 bg-background"
              }`}
            >
              <div className="w-[110px] shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-primary">
                Resolved
              </div>
              <div className="flex-1 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                Effective price the customer pays
              </div>
              <div
                className={`font-display text-[26px] tabular-nums leading-none ${
                  isTV ? "text-primary" : "text-foreground"
                }`}
              >
                ${RESOLVED.toFixed(2)}
              </div>
            </motion.div>
          </div>

          {/* Rank swap */}
          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <RankTile label="Sticker rank" value="03" tone="muted" />
            <div className="hidden items-center justify-center font-mono text-[18px] text-foreground/35 sm:flex">
              →
            </div>
            <RankTile label="True-value rank" value="01" tone={isTV ? "primary" : "muted"} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const RankTile = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "primary" | "muted";
}) => (
  <div
    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
      tone === "primary"
        ? "border-primary/30 bg-primary/[0.05]"
        : "border-border bg-card"
    }`}
  >
    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
      {label}
    </div>
    <div
      className={`font-display text-[34px] leading-none tabular-nums ${
        tone === "primary" ? "text-primary" : "text-foreground/55"
      }`}
    >
      {value}
    </div>
  </div>
);

/* ── Glyphs ── */
const EraGlyph = ({ id }: { id: EraId }) => {
  if (id === "shelf")
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M6 9h20M6 16h20M6 23h20" />
        <path d="M9 7v18M16 7v18M23 7v18" opacity="0.4" />
      </svg>
    );
  if (id === "voice")
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="16" cy="22" r="2" fill="currentColor" stroke="none" />
        <path d="M10 18C12.5 15.5 19.5 15.5 22 18" strokeLinecap="round" />
        <path d="M7 14C11 9.5 21 9.5 25 14" strokeLinecap="round" opacity="0.55" />
        <path d="M4 11C9 5 23 5 28 11" strokeLinecap="round" opacity="0.3" />
      </svg>
    );
  if (id === "search")
    return (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="14" cy="14" r="6" />
        <path d="M19 19l6 6" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="9" r="2" />
      <circle cx="24" cy="9" r="2" />
      <circle cx="8" cy="23" r="2" />
      <circle cx="24" cy="23" r="2" />
      <path d="M10 10l4 4M22 10l-4 4M10 22l4-4M22 22l-4-4" opacity="0.5" />
    </svg>
  );
};

const PillarGlyph = ({ id }: { id: PillarId }) => {
  if (id === "visibility")
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 12C5.5 8 18.5 8 21 12C18.5 16 5.5 16 3 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  if (id === "accessibility")
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="6" y="4" width="12" height="16" rx="1" />
        <path d="M9 9h6M9 13h6M9 17h4" opacity="0.55" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z" />
    </svg>
  );
};

export default ShareOfAlgorithmSection;
