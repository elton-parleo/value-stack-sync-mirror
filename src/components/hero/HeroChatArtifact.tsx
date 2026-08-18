import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import waterCreamJar from "@/assets/water-cream-jar.png";

type Phase = "typing" | "standard" | "parleo";

const EASE = [0.32, 0.72, 0, 1] as const;

/* ─────────────────────────────────────────────
   Primitives
   ───────────────────────────────────────────── */

const AnimatedPrice = ({
  value,
  className = "",
  duration = 900,
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

const TypingDots = () => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1 w-1 rounded-full bg-foreground/35"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Chrome: one slim bar, no nested chrome
   ───────────────────────────────────────────── */

const Chrome = ({
  children,
  cycleKey,
  duration,
}: {
  children: React.ReactNode;
  cycleKey: number;
  duration: number;
}) => (
  <div
    className="relative w-full overflow-hidden rounded-[16px] border border-border/70 bg-card"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    <div className="relative flex items-center gap-3 border-b border-border/60 bg-secondary/35 px-3.5 py-2">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
        chatgpt.com
      </span>
      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/30">
        live
      </span>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-transparent">
        <motion.div
          key={cycleKey}
          className="h-full origin-left bg-primary/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </div>
    </div>
    <div className="px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5">{children}</div>
  </div>
);

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

const incentives = [
  { label: "Beauty Insider Rouge, 20% event", value: "−$14.80" },
  { label: "Sephora Visa, 4% back", value: "−$2.96" },
  { label: "Birthday gift credit", value: "−$5.00" },
];

type Row = { retailer: string; price: number; note: string };

const STANDARD: Row[] = [
  { retailer: "Amazon", price: 74.0, note: "list price" },
  { retailer: "Sephora", price: 74.0, note: "list price" },
];

const PARLEO: Row[] = [
  { retailer: "Sephora", price: 51.24, note: "loyalty, card, gift value" },
  { retailer: "Amazon", price: 74.0, note: "list price only" },
];

/* ─────────────────────────────────────────────
   Answer composition
   ───────────────────────────────────────────── */

const Answer = ({ phase }: { phase: Phase }) => {
  const isParleo = phase === "parleo";
  const rows = isParleo ? PARLEO : STANDARD;

  return (
    <div className="space-y-3.5">
      {/* Product line */}
      <div className="flex items-center gap-3.5">
        <div className="relative flex h-[74px] w-[74px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[hsl(36_18%_94%)]">
          <motion.img
            src={waterCreamJar}
            alt="Tatcha The Water Cream moisturizer jar"
            width={912}
            height={912}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: isParleo ? 1.05 : 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-[52px] w-auto object-contain"
            style={{ filter: "drop-shadow(0 8px 14px hsl(165 20% 25% / 0.16))" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-primary"
            initial={false}
            animate={{ scaleX: isParleo ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-foreground/40">
            Tatcha
          </div>
          <div className="mt-0.5 truncate text-[14px] font-semibold leading-tight text-foreground">
            The Water Cream
          </div>
          <div className="mt-0.5 text-[11px] text-foreground/45">50 ml, moisturizer</div>
        </div>

        <div className="text-right">
          <div
            className="text-[10.5px] tabular-nums text-foreground/40 line-through"
            style={{
              opacity: isParleo ? 1 : 0,
              transition: "opacity 500ms cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            $74.00
          </div>
          <AnimatedPrice
            value={isParleo ? 51.24 : 74.0}
            className={`font-display text-[26px] leading-none tabular-nums transition-colors duration-500 ${
              isParleo ? "text-primary" : "text-foreground"
            }`}
          />
          <div className="mt-1 h-[11px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={isParleo ? "true" : "list"}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40"
              >
                {isParleo ? "true cost" : "sticker price"}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Ranking, reorders on the reveal */}
      <div className="border-t border-border/60 pt-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
            Agent ranking
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30">
            8 retailers
          </span>
        </div>
        <div className="space-y-1">
          {rows.map((row, i) => {
            const winner = i === 0;
            return (
              <motion.div
                key={row.retailer}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="grid grid-cols-[16px_auto_minmax(0,1fr)_auto] items-center gap-2 rounded-[8px] px-1.5 py-1.5"
                style={{
                  backgroundColor:
                    winner && isParleo ? "hsl(var(--primary) / 0.06)" : "transparent",
                  transition: "background-color 600ms cubic-bezier(0.32,0.72,0,1)",
                }}
              >
                <span className="font-mono text-[9.5px] tabular-nums text-foreground/35">
                  0{i + 1}
                </span>
                <BrandLogo name={row.retailer} size={13} grayscale={!winner} />
                <span className="flex min-w-0 items-baseline gap-2">
                  <span
                    className={`text-[11.5px] font-semibold ${
                      winner ? "text-foreground" : "text-foreground/55"
                    }`}
                  >
                    {row.retailer}
                  </span>
                  <span className="hidden truncate text-[10px] text-foreground/40 sm:inline">
                    {row.note}
                  </span>
                </span>
                <span
                  className={`text-[11.5px] font-semibold tabular-nums ${
                    winner && isParleo ? "text-primary" : "text-foreground/60"
                  }`}
                >
                  ${row.price.toFixed(2)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Value stack, revealed by Parleo */}
      <div
        className="border-t border-border/60 pt-3"
        style={{
          opacity: isParleo ? 1 : 0.35,
          transition: "opacity 600ms cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
            Value stack
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30">
            {isParleo ? "resolved by parleo" : "not visible to agent"}
          </span>
        </div>
        <div className="space-y-1">
          {incentives.map((s, i) => (
            <motion.div
              key={s.label}
              initial={false}
              animate={{ opacity: isParleo ? 1 : 0, x: isParleo ? 0 : -4 }}
              transition={{ duration: 0.45, ease: EASE, delay: isParleo ? 0.2 + i * 0.09 : 0 }}
              className="flex items-center gap-2 text-[10.5px] tabular-nums"
            >
              <span className="text-foreground/55">{s.label}</span>
              <span className="h-px flex-1 bg-foreground/10" />
              <span className="font-semibold text-[hsl(var(--success))]">{s.value}</span>
            </motion.div>
          ))}
          {!isParleo && (
            <div className="flex h-[52px] items-center justify-center">
              <TypingDots />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Orchestrator
   ───────────────────────────────────────────── */

const SEQUENCE = [
  { phase: "typing" as Phase, hold: 900 },
  { phase: "standard" as Phase, hold: 2600 },
  { phase: "parleo" as Phase, hold: 5000 },
];
const TOTAL = SEQUENCE.reduce((s, p) => s + p.hold, 0);

const HeroChatArtifact = () => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "parleo" : "typing");
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    const run = () => {
      setCycleKey((k) => k + 1);
      setPhase("typing");
      timers.push(window.setTimeout(() => setPhase("standard"), SEQUENCE[0].hold));
      timers.push(
        window.setTimeout(() => setPhase("parleo"), SEQUENCE[0].hold + SEQUENCE[1].hold),
      );
      timers.push(window.setTimeout(run, TOTAL));
    };
    run();
    return () => timers.forEach(window.clearTimeout);
  }, [reduce]);

  return (
    <Chrome cycleKey={cycleKey} duration={TOTAL}>
      <div className="space-y-3.5">
        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="max-w-[84%] rounded-[14px] rounded-tr-[5px] bg-primary px-3 py-1.5 text-[12.5px] leading-snug text-primary-foreground"
          >
            Best price on Tatcha The Water Cream?
          </motion.div>
        </div>
        <Answer phase={phase === "typing" ? "standard" : phase} />
      </div>
    </Chrome>
  );
};

export default HeroChatArtifact;
