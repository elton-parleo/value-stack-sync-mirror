import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import productJar from "@/assets/tatcha-water-cream.webp";

type Phase = "typing" | "standard" | "parleo";

/* ─────────────────────────────────────────────
   Primitives
   ───────────────────────────────────────────── */

const TypingDots = () => (
  <div className="flex items-center gap-1.5 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-foreground/35"
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const AnimatedPrice = ({
  value,
  className = "",
  duration = 700,
}: {
  value: number;
  className?: string;
  duration?: number;
}) => {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span className={className}>${display.toFixed(2)}</span>;
};

/* ─────────────────────────────────────────────
   Chat chrome
   ───────────────────────────────────────────── */

const ChatChrome = ({
  children,
  phase,
  cycleKey,
  duration,
}: {
  children: React.ReactNode;
  phase: Phase;
  cycleKey: number;
  duration: number;
}) => {
  const isParleo = phase === "parleo";
  return (
    <div
      className="relative w-full overflow-visible rounded-[20px] border border-border/70 bg-card"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      {/* Browser-like chrome bar */}
      <div className="relative rounded-t-[20px] border-b border-border/60 bg-secondary/40 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border/60 bg-card px-2.5 py-0.5 text-[11px] text-foreground/55">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            chatgpt.com
          </div>
          <div className="w-[42px]" />
        </div>
        {/* Cycle progress hairline on bottom seam */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-border/50">
          <motion.div
            key={cycleKey}
            className="h-full origin-left bg-primary/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </div>
      </div>

      {/* ChatGPT app header */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <button className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[13px] font-semibold text-foreground/80 hover:bg-secondary/40" type="button">
          ChatGPT <span className="font-normal text-foreground/45">5</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-0.5 opacity-50">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/55 sm:flex">
          <span
            className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
            style={{ backgroundColor: isParleo ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.25)" }}
          />
          <span className="relative block h-[12px] w-[128px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={isParleo ? "p" : "s"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                {isParleo ? "parleo · shopping" : "shopping"}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10a37f] text-[11px] font-semibold text-white">
            S
          </div>
        </div>
      </div>

      <div className="h-[514px] p-3 sm:h-[400px] sm:p-4">{children}</div>
    </div>
  );
};

const AssistantAvatar = () => (
  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="hsl(213 99% 50% / 0.12)" stroke="hsl(213 99% 50%)" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M12 3 L13.7 9.3 A2 2 0 0 0 14.7 10.3 L21 12 L14.7 13.7 A2 2 0 0 0 13.7 14.7 L12 21 L10.3 14.7 A2 2 0 0 0 9.3 13.7 L3 12 L9.3 10.3 A2 2 0 0 0 10.3 9.3 Z" />
    </svg>
  </div>
);

const UserBubble = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-end"
  >
    <div className="max-w-[85%] rounded-[18px] rounded-tr-md bg-primary px-3.5 py-2 text-[13px] leading-snug text-primary-foreground">
      Find me the best price on Tatcha The Water Cream.
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Product card (the hero of the answer)
   ───────────────────────────────────────────── */

const incentiveStack = [
  { label: "Beauty Insider Rouge · 20% event", value: "−$14.80" },
  { label: "Sephora Visa · 4% back", value: "−$2.96" },
  { label: "Birthday gift credit", value: "−$5.00" },
];

const rankingRows = [
  { retailer: "Sephora", standard: "$74.00", parleo: "$51.24", note: "loyalty + card + gift value" },
  { retailer: "Amazon", standard: "$74.00", parleo: "$74.00", note: "list price only" },
];

const EASE = [0.32, 0.72, 0, 1] as const; // Apple-style smooth
const SPRING = { type: "spring" as const, stiffness: 220, damping: 30, mass: 0.9 };

const RetailerRow = ({
  retailer,
  price,
  note,
  winner,
  isParleo,
}: {
  retailer: string;
  price: string;
  note: string;
  winner: boolean;
  isParleo: boolean;
}) => (
  <div
    className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-1"
    style={{
      transition: "background-color 600ms cubic-bezier(0.32,0.72,0,1), color 600ms cubic-bezier(0.32,0.72,0,1)",
      backgroundColor: winner ? "hsl(var(--card))" : "transparent",
      color: winner ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.5)",
    }}
  >
    <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5 sm:grid-cols-[auto_minmax(48px,auto)_minmax(0,1fr)]">
      <BrandLogo name={retailer} size={12} grayscale={!winner} />
      <span className="text-[11px] font-semibold">{retailer}</span>
      <span className="hidden truncate text-[10px] text-foreground/42 sm:inline">
        {isParleo ? note : "visible to agent"}
      </span>
    </div>
    <span
      className={`text-[11px] font-semibold tabular-nums transition-colors duration-500 ${
        winner && isParleo ? "text-primary" : ""
      }`}
    >
      {price}
    </span>
  </div>
);

const ProductCard = ({ phase }: { phase: Phase }) => {
  const isParleo = phase === "parleo";
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-card"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Badge — gentler entrance, no ping */}
      <AnimatePresence>
        {isParleo && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Best with Parleo
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 items-stretch sm:grid-cols-[38%_1fr]">
        {/* Product image well: horizontal band on mobile, side rail from sm up */}
        <div className="relative flex h-[112px] items-center justify-center overflow-hidden border-b border-border/60 bg-[hsl(36_18%_94%)] sm:h-auto sm:min-h-[240px] sm:border-b-0 sm:border-r">
          <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/35 sm:left-4 sm:top-4">
            SKU 320418
          </div>
          <div className="absolute bottom-3 left-3 hidden max-w-[120px] font-mono text-[9px] uppercase leading-[1.5] tracking-[0.14em] text-foreground/35 sm:bottom-4 sm:left-4 sm:block">
            Merchant value made readable
          </div>
          <motion.img
            src={productJar}
            alt="Tatcha The Water Cream moisturizer jar"
            width={347}
            height={298}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: isParleo ? 1.04 : 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative z-[1] h-[74px] w-auto max-w-[72%] object-contain sm:h-[104px]"
            style={{ filter: "drop-shadow(0 14px 22px hsl(165 20% 25% / 0.16))" }}
          />
        </div>

        {/* Detail rail */}
        <div className="flex min-w-0 flex-1 flex-col p-3.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/45">
                Tatcha
              </div>
              <div className="mt-0.5 text-[13px] font-semibold leading-tight text-foreground">
                The Water Cream
              </div>
              <div className="mt-0.5 text-[11px] text-foreground/50">50 ml · moisturizer</div>
            </div>
          </div>

          {/* Winner retailer — crossfade instead of instant swap */}
          <div className="mt-3 flex items-center justify-between">
            <div className="relative h-[18px] min-w-[90px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isParleo ? "sephora" : "amazon"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-0 flex items-center gap-1.5"
                >
                  <BrandLogo name={isParleo ? "Sephora" : "Amazon"} size={14} />
                  <span className="text-[12px] font-semibold text-foreground">
                    {isParleo ? "Sephora" : "Amazon"}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="text-right leading-none">
              <div
                className="mb-0.5 text-[10.5px] text-foreground/40 line-through tabular-nums"
                style={{
                  opacity: isParleo ? 1 : 0,
                  transform: `translateY(${isParleo ? 0 : 4}px)`,
                  transition: "opacity 500ms cubic-bezier(0.32,0.72,0,1), transform 500ms cubic-bezier(0.32,0.72,0,1)",
                }}
              >
                $74.00
              </div>
              <motion.div
                key={isParleo ? "p-price" : "s-price"}
                initial={{ scale: 0.95, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <AnimatedPrice
                  value={isParleo ? 51.24 : 74.0}
                  duration={900}
                  className={`font-display text-[20px] tabular-nums transition-colors duration-500 ${
                    isParleo ? "text-primary" : "text-foreground"
                  }`}
                />
              </motion.div>
            </div>
          </div>

          {/* Ranking box */}
          <div className="mt-2 rounded-lg border border-border/60 bg-secondary/30 p-2">
            <div className="space-y-1.5">
              {rankingRows.map((row) => (
                <RetailerRow
                  key={row.retailer}
                  retailer={row.retailer}
                  price={isParleo ? row.parleo : row.standard}
                  note={row.note}
                  winner={isParleo ? row.retailer === "Sephora" : row.retailer === "Amazon"}
                  isParleo={isParleo}
                />
              ))}
            </div>
          </div>

          {/* Incentive stack — reserved space, opacity+stagger reveal */}
          <div
            className="mt-2 border-t border-border/60 pt-2"
            style={{
              minHeight: 60,
              opacity: isParleo ? 1 : 0,
              transform: `translateY(${isParleo ? 0 : 4}px)`,
              transition: "opacity 600ms cubic-bezier(0.32,0.72,0,1), transform 600ms cubic-bezier(0.32,0.72,0,1)",
              pointerEvents: isParleo ? "auto" : "none",
            }}
          >
            <div className="space-y-0.5">
              {incentiveStack.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={false}
                  animate={{
                    opacity: isParleo ? 1 : 0,
                    x: isParleo ? 0 : -4,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: isParleo ? 0.22 + i * 0.08 : 0,
                  }}
                  className="flex items-center justify-between text-[10.5px] tabular-nums"
                >
                  <span className="text-foreground/60">{s.label}</span>
                  <span className="font-semibold text-[hsl(var(--success))]">{s.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between border-t border-border/60 bg-secondary/30 px-3.5 py-1.5">
        <span className="relative block h-[13px] w-[190px] font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
          <AnimatePresence mode="wait">
            <motion.span
              key={isParleo ? "tp" : "lp"}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0"
            >
              {isParleo ? "8 retailers · true price" : "8 retailers · list price"}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-[11px] font-medium text-primary/85">View all →</span>
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────
   Assistant column
   ───────────────────────────────────────────── */

const AssistantContent = ({ phase }: { phase: Phase }) => {
  const cardPhase: Phase = phase === "typing" ? "standard" : phase;
  return (
    <div className="flex gap-2.5">
      <AssistantAvatar />
      <div className="min-w-0 flex-1 space-y-2.5">
        <div
          style={{
            opacity: phase === "typing" ? 0.6 : 1,
            transition: "opacity 500ms cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          <ProductCard phase={cardPhase} />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Mode caption (subtle, editorial)
   ───────────────────────────────────────────── */

const ModeCaption = ({ phase }: { phase: Phase }) => {
  const isParleo = phase === "parleo";
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
            isParleo ? "bg-primary" : "bg-foreground/25"
          }`}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
          <AnimatePresence mode="wait">
            <motion.span
              key={isParleo ? "p" : "s"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              {isParleo ? "agent + parleo layer" : "agent · standalone"}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">
        live demo
      </span>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Orchestrator
   ───────────────────────────────────────────── */

const SEQUENCE: { phase: Phase; hold: number }[] = [
  { phase: "typing", hold: 1100 },
  { phase: "standard", hold: 2800 },
  { phase: "parleo", hold: 5000 },
];

const TOTAL = SEQUENCE.reduce((s, p) => s + p.hold, 0);

const HeroChatArtifact = () => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "parleo" : "typing");
  const [cycleKey, setCycleKey] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let timers: number[] = [];
    const run = () => {
      setCycleKey((key) => key + 1);
      setPhase("typing");
      timers.push(window.setTimeout(() => setPhase("standard"), SEQUENCE[0].hold));
      timers.push(window.setTimeout(() => setPhase("parleo"), SEQUENCE[0].hold + SEQUENCE[1].hold));
      timers.push(window.setTimeout(run, TOTAL));
    };
    run();
    return () => timers.forEach(window.clearTimeout);
  }, [reduce]);

  const displayPhase: Phase = phase === "typing" ? "standard" : phase;

  return (
    <ChatChrome phase={displayPhase} cycleKey={cycleKey} duration={TOTAL}>
      <div className="space-y-3.5">
        <UserBubble />
        <AssistantContent phase={phase} />
      </div>
    </ChatChrome>
  );
};

export default HeroChatArtifact;
