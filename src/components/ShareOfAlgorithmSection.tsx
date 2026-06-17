import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/* Section B: Share of Algorithm */

type EraId = "shelf" | "voice" | "search" | "algorithm";
type PillarId = "visibility" | "accessibility" | "trueValue";

type Era = {
  id: EraId;
  year: string;
  name: string;
  instrument: string;
  caption: string;
};

type Pillar = {
  id: PillarId;
  index: string;
  name: string;
  question: string;
  status: string;
  statusTone: "muted" | "partial" | "primary";
  dimensions: string[];
  proof: string;
};

const ERAS: Era[] = [
  {
    id: "shelf",
    year: "1960s",
    name: "Shelf",
    instrument: "Nielsen",
    caption: "Physical distribution became measurable.",
  },
  {
    id: "voice",
    year: "1980s",
    name: "Voice",
    instrument: "GRPs",
    caption: "Mass media turned reach into a buying lever.",
  },
  {
    id: "search",
    year: "2010s",
    name: "Search",
    instrument: "SEO",
    caption: "Intent moved into keywords, rankings and feeds.",
  },
  {
    id: "algorithm",
    year: "2025",
    name: "Algorithm",
    instrument: "Parleo",
    caption: "Agents compare offers before a customer ever sees the shelf.",
  },
];

const PILLARS: Pillar[] = [
  {
    id: "visibility",
    index: "01",
    name: "Visibility",
    question: "Can agents find you?",
    status: "Measured",
    statusTone: "muted",
    dimensions: ["Mention rate", "Share of voice", "Recommendation strength"],
    proof: "The brand enters the shortlist.",
  },
  {
    id: "accessibility",
    index: "02",
    name: "Accessibility",
    question: "Can agents read the data?",
    status: "Partial",
    statusTone: "partial",
    dimensions: ["Schema depth", "Feed freshness"],
    proof: "The catalog becomes machine legible.",
  },
  {
    id: "trueValue",
    index: "03",
    name: "True Value",
    question: "Can agents price the real offer?",
    status: "Parleo layer",
    statusTone: "primary",
    dimensions: ["Incentive citation", "Incentive accuracy", "True value delta"],
    proof: "The agent ranks the complete customer value.",
  },
];

const DIMENSIONS = [
  "Mention",
  "Voice",
  "Strength",
  "Schema",
  "Feeds",
  "Citation",
  "Accuracy",
  "Delta",
];

const OFFER_LINES = [
  { label: "Member price", value: "3.00" },
  { label: "Loyalty credit", value: "2.20" },
  { label: "Card offer", value: "2.40" },
];

const ShareOfAlgorithmSection = () => {
  const [activeEra, setActiveEra] = useState<EraId>("algorithm");
  const [activePillar, setActivePillar] = useState<PillarId>("trueValue");
  const reduce = useReducedMotion();
  const eraIndex = ERAS.findIndex((era) => era.id === activeEra);
  const activeEraData = ERAS[eraIndex] ?? ERAS[3];
  const activePillarData = PILLARS.find((pillar) => pillar.id === activePillar) ?? PILLARS[2];
  const progressPct = (eraIndex / (ERAS.length - 1)) * 100;

  return (
    <AnimatedSection id="share-of-algorithm" className="relative bg-background py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="grid gap-8 border-b border-border px-6 py-8 md:grid-cols-[1fr_360px] md:px-10 md:py-10 lg:px-12">
            <div className="max-w-[760px]">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  Share of Algorithm
                </span>
              </div>

              <h2 className="mt-5 max-w-[720px] font-heading text-[38px] leading-[1.02] text-foreground md:text-[54px]">
                The new shelf space is decided by agents.
              </h2>

              <p className="mt-5 max-w-[650px] text-[16.5px] leading-[1.5] text-foreground/68 md:text-[18px]">
                Visibility gets a brand considered. Accessibility lets agents read the catalog.
                True Value shows the offer a customer actually earns.
              </p>
            </div>

            <ScorePlate activePillar={activePillarData} />
          </div>

          <div className="border-b border-border px-6 py-7 md:px-10 lg:px-12">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                  Distribution metrics
                </div>
                <p className="mt-2 max-w-[520px] text-[14px] leading-snug text-foreground/60">
                  {activeEraData.caption}
                </p>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/42">
                {String(eraIndex + 1).padStart(2, "0")} / 04
              </div>
            </div>

            <div className="relative mt-6">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                {ERAS.map((era) => (
                  <EraButton
                    key={era.id}
                    era={era}
                    active={activeEra === era.id}
                    onSelect={() => setActiveEra(era.id)}
                  />
                ))}
              </div>
              <div className="relative mt-5 h-px bg-border">
                <motion.div
                  className="absolute left-0 top-0 h-px bg-primary"
                  initial={reduce ? { width: `${progressPct}%` } : { width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-7 px-6 py-7 md:grid-cols-[360px_1fr] md:px-10 md:py-9 lg:grid-cols-[390px_1fr] lg:px-12">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                  Recommendation stack
                </span>
                <span className="font-mono text-[10px] tabular-nums text-foreground/38">
                  3 pillars
                </span>
              </div>

              {PILLARS.map((pillar) => (
                <PillarButton
                  key={pillar.id}
                  pillar={pillar}
                  active={activePillar === pillar.id}
                  onSelect={() => setActivePillar(pillar.id)}
                />
              ))}
            </div>

            <ResolutionPanel activePillar={activePillarData} />
          </div>

          <DimensionStrip />
        </div>
      </div>
    </AnimatedSection>
  );
};

const EraButton = ({
  era,
  active,
  onSelect,
}: {
  era: Era;
  active: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    onMouseEnter={onSelect}
    onFocus={onSelect}
    onClick={onSelect}
    aria-pressed={active}
    className={`group flex min-h-[112px] flex-col justify-between rounded-[24px] border px-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
      active
        ? "border-primary/35 bg-primary/[0.04] text-foreground"
        : "border-border bg-background/45 text-foreground/52 hover:border-foreground/18 hover:text-foreground/72"
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <EraGlyph id={era.id} />
      <span className={`font-mono text-[10px] tabular-nums ${active ? "text-primary" : "text-foreground/40"}`}>
        {era.year}
      </span>
    </div>
    <div>
      <div className="font-heading text-[18px] leading-none">Share of {era.name}</div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/42">
        {era.instrument}
      </div>
    </div>
  </button>
);

const PillarButton = ({
  pillar,
  active,
  onSelect,
}: {
  pillar: Pillar;
  active: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={active}
    className={`group w-full rounded-[28px] border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
      active
        ? "border-primary/45 bg-primary/[0.055]"
        : "border-border bg-background/45 hover:border-foreground/18"
    }`}
  >
    <div className="flex items-start gap-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
          active ? "border-primary/35 bg-primary/10 text-primary" : "border-border bg-card text-foreground/48"
        }`}
      >
        <PillarGlyph id={pillar.id} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tabular-nums text-foreground/40">{pillar.index}</span>
          <StatusPill pillar={pillar} active={active} />
        </span>
        <span className="mt-2 block font-heading text-[22px] leading-none text-foreground">
          {pillar.name}
        </span>
        <span className="mt-2 block text-[13.5px] leading-snug text-foreground/58">
          {pillar.question}
        </span>
      </span>
    </div>
  </button>
);

const ResolutionPanel = ({ activePillar }: { activePillar: Pillar }) => {
  const isTrueValue = activePillar.id === "trueValue";

  return (
    <motion.div
      key={activePillar.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-background/55 p-5 md:p-6"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                True value resolution
              </div>
              <div className="mt-2 font-heading text-[26px] leading-none text-foreground">
                {isTrueValue ? "The hidden value becomes rankable." : activePillar.proof}
              </div>
            </div>
            <div className="hidden rounded-full border border-primary/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary sm:block">
              {activePillar.index}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_140px]">
            <div className="space-y-2.5">
              <ValueRow label="List price" value="$30.00" muted />
              {OFFER_LINES.map((line, index) => (
                <motion.div
                  key={line.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.08 * index }}
                >
                  <ValueRow label={line.label} value={`$${line.value}`} />
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-primary/25 bg-primary/[0.055] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Agent sees
              </div>
              <div>
                <div className="font-heading text-[34px] leading-none text-primary">$22.40</div>
                <div className="mt-2 text-[12.5px] leading-snug text-foreground/58">
                  Resolved value with incentives applied.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <RankTile label="Sticker rank" value="03" muted />
          <RankTile label="True value rank" value="01" />
          <div className="col-span-2 rounded-2xl border border-border bg-card p-4 lg:col-span-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
              Active lens
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {activePillar.dimensions.map((dimension) => (
                <span
                  key={dimension}
                  className="rounded-full border border-primary/25 bg-primary/[0.045] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-primary"
                >
                  {dimension}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ScorePlate = ({ activePillar }: { activePillar: Pillar }) => (
  <div className="hidden rounded-2xl border border-border bg-background/55 p-4 md:block">
    <div className="flex items-center justify-between border-b border-border pb-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
        Parleo framework
      </span>
      <span className="h-2 w-2 rounded-full bg-primary" />
    </div>
    <div className="mt-4 space-y-2">
      {PILLARS.map((pillar) => (
        <div
          key={pillar.id}
          className={`flex items-center justify-between rounded-full border px-3 py-2 ${
            pillar.id === activePillar.id
              ? "border-primary/30 bg-primary/[0.055] text-primary"
              : "border-border bg-card text-foreground/55"
          }`}
        >
          <span className="font-mono text-[10px] tabular-nums">{pillar.index}</span>
          <span className="text-[13px] font-medium">{pillar.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const DimensionStrip = () => (
  <div className="border-t border-border px-6 py-5 md:px-10 lg:px-12">
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
      {DIMENSIONS.map((dimension, index) => {
        const highlighted = index >= 5;
        return (
          <div
            key={dimension}
            className={`rounded-full border px-3 py-2 text-center font-mono text-[9.5px] uppercase tracking-[0.12em] ${
              highlighted
                ? "border-primary/30 bg-primary/[0.055] text-primary"
                : "border-border bg-background/45 text-foreground/42"
            }`}
          >
            <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-1 text-foreground/25">/</span>
            {dimension}
          </div>
        );
      })}
    </div>
  </div>
);

const StatusPill = ({ pillar, active }: { pillar: Pillar; active: boolean }) => {
  const tone = pillar.statusTone === "primary" || active ? "text-primary border-primary/30 bg-primary/[0.055]" : "text-foreground/48 border-border bg-card";
  return (
    <span className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] ${tone}`}>
      {pillar.status}
    </span>
  );
};

const ValueRow = ({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) => (
  <div className={`flex items-center justify-between rounded-full border px-4 py-2.5 ${muted ? "border-border bg-background/45 text-foreground/45" : "border-primary/20 bg-primary/[0.035] text-foreground"}`}>
    <span className="font-mono text-[10px] uppercase tracking-[0.16em]">{label}</span>
    <span className={`font-mono text-[13px] tabular-nums ${muted ? "text-foreground/50" : "text-primary"}`}>
      {value}
    </span>
  </div>
);

const RankTile = ({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) => (
  <div className={`rounded-2xl border p-4 ${muted ? "border-border bg-card text-foreground/45" : "border-primary/30 bg-primary/[0.055] text-primary"}`}>
    <div className="font-mono text-[10px] uppercase tracking-[0.16em]">{label}</div>
    <div className="mt-3 font-heading text-[36px] leading-none tabular-nums">{value}</div>
  </div>
);

const EraGlyph = ({ id }: { id: EraId }) => {
  if (id === "shelf") {
    return (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.35">
        <path d="M8 10H28M8 18H28M8 26H28" />
        <path d="M10 8V28M18 8V28M26 8V28" opacity="0.45" />
      </svg>
    );
  }

  if (id === "voice") {
    return (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.35">
        <circle cx="18" cy="24" r="2.2" fill="currentColor" stroke="none" />
        <path d="M12 20C14.5 17.5 21.5 17.5 24 20" strokeLinecap="round" />
        <path d="M8 17C12.5 12.5 23.5 12.5 28 17" strokeLinecap="round" opacity="0.55" />
        <path d="M5 14C11 8 25 8 31 14" strokeLinecap="round" opacity="0.28" />
      </svg>
    );
  }

  if (id === "search") {
    return (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.35">
        <circle cx="16" cy="16" r="7" />
        <path d="M21.5 21.5L29 29" strokeLinecap="round" />
        <path d="M12 14H19M12 18H17" opacity="0.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.35">
      <circle cx="18" cy="18" r="3" fill="currentColor" stroke="none" />
      <circle cx="9" cy="10" r="2.5" />
      <circle cx="27" cy="10" r="2.5" />
      <circle cx="9" cy="26" r="2.5" />
      <circle cx="27" cy="26" r="2.5" />
      <path d="M11 11L16 16M25 11L20 16M11 25L16 20M25 25L20 20" opacity="0.5" />
    </svg>
  );
};

const PillarGlyph = ({ id }: { id: PillarId }) => {
  if (id === "visibility") {
    return (
      <svg viewBox="0 0 28 28" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 14C8 9.5 20 9.5 23 14C20 18.5 8 18.5 5 14Z" />
        <circle cx="14" cy="14" r="2.5" />
      </svg>
    );
  }

  if (id === "accessibility") {
    return (
      <svg viewBox="0 0 28 28" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 6H20V22H8Z" />
        <path d="M11 11H17M11 15H17M11 19H14" opacity="0.55" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 28" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 9H21V19H7Z" />
      <path d="M10 14H18" opacity="0.55" />
      <path d="M14 6V22" opacity="0.55" />
    </svg>
  );
};

export default ShareOfAlgorithmSection;
