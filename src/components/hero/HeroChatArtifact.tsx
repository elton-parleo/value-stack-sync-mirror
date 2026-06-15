import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import tatchaAsset from "@/assets/tatcha-water-cream.png.asset.json";

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
   Product canvas (left rail)
   ───────────────────────────────────────────── */

const ProductCanvas = ({ phase }: { phase: Phase }) => {
  const isParleo = phase === "parleo";
  return (
    <div
      className="relative hidden overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-[hsl(165_38%_92%)] to-[hsl(165_24%_85%)] sm:block"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      {/* Editorial label */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-foreground/40" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
          SKU · 8675309
        </span>
      </div>

      {/* Vertical brand mark */}
      <div
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40"
        style={{ writingMode: "vertical-rl" }}
      >
        Tatcha · The Water Cream
      </div>

      {/* Product image */}
      <motion.div
        className="relative flex aspect-[4/5] items-center justify-center px-8 pb-12 pt-10"
        animate={{ scale: isParleo ? 1.02 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={tatchaAsset.url}
          alt="Tatcha The Water Cream"
          className="relative z-[1] h-full w-auto object-contain mix-blend-multiply"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 18px 28px hsl(165 40% 18% / 0.18))" }}
        />
        {/* Floor shadow */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 h-3 w-[55%] -translate-x-1/2 rounded-[50%] bg-[hsl(165_30%_20%)] opacity-25 blur-md" />
      </motion.div>

      {/* Bottom info bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-foreground/[0.06] bg-[hsl(165_28%_88%)]/70 px-4 py-3 backdrop-blur-sm">
        <div className="leading-tight">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/50">
            8 retailers · live
          </div>
          <div className="mt-0.5 text-[12px] font-semibold text-foreground/80">
            True price spread
          </div>
        </div>
        <div className="text-right leading-none">
          <AnimatedPrice
            value={isParleo ? 14.64 : 28.0}
            className="font-display text-[20px] tabular-nums text-foreground"
          />
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45">
            {isParleo ? "after incentives" : "list · best sticker"}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Chat chrome
   ───────────────────────────────────────────── */

const ChatChrome = ({ children, progress }: { children: React.ReactNode; progress: number }) => (
  <div
    className="relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    <div className="absolute inset-x-0 top-0 z-10 h-px bg-foreground/[0.05]">
      <div
        className="h-full bg-primary/60 transition-[width] duration-100 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>

    <div className="flex items-center justify-between border-b border-border/50 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
        </div>
        <span className="ml-1 text-[12px] font-semibold text-foreground/70">
          ChatGPT <span className="font-normal text-foreground/35">5</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
          shopping
        </span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(28_78%_62%)] text-[10px] font-bold text-white">
          S
        </div>
      </div>
    </div>

    <div className="px-4 py-4">{children}</div>
  </div>
);

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
    <div className="max-w-[88%] rounded-[18px] rounded-tr-md bg-primary px-3.5 py-2 text-[13px] leading-snug text-primary-foreground">
      Find me the best price on Tatcha The Water Cream.
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Result rows
   ───────────────────────────────────────────── */

const incentiveStack = [
  { label: "Beauty Insider Rouge", value: "−$6.00" },
  { label: "Sephora Visa · 4% back", value: "−$0.96" },
  { label: "Birthday gift credit", value: "−$8.40" },
];

const SephoraCard = () => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    <div
      className="relative rounded-xl border border-primary/25 bg-primary/[0.035] p-3.5"
      style={{ boxShadow: "0 0 0 4px hsl(213 99% 50% / 0.04)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute -top-2 right-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
          <span className="absolute inset-0 rounded-full bg-white" />
        </span>
        Best with Parleo
      </motion.div>

      <div className="mb-2.5 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <BrandLogo name="Sephora" size={16} />
          <span className="text-[13px] font-semibold text-foreground">Sephora</span>
        </div>
        <div className="text-right leading-none">
          <div className="mb-0.5 text-[11px] text-foreground/40 line-through tabular-nums">$30.00</div>
          <AnimatedPrice value={14.64} className="text-[18px] font-bold text-primary tabular-nums" />
        </div>
      </div>

      <div className="space-y-1 border-t border-primary/15 pt-2.5">
        {incentiveStack.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.07, duration: 0.3 }}
            className="flex items-center justify-between text-[11.5px] tabular-nums"
          >
            <span className="text-foreground/65">{s.label}</span>
            <span className="font-semibold text-[hsl(var(--success))]">{s.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const AmazonRow = ({ isParleo }: { isParleo: boolean }) => (
  <motion.div
    layout
    animate={{
      opacity: isParleo ? 0.5 : 1,
      filter: isParleo ? "grayscale(100%)" : "grayscale(0%)",
    }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 px-3.5 py-2.5"
  >
    <div className="flex items-center gap-2">
      <BrandLogo name="Amazon" size={16} />
      <span className="text-[12.5px] font-medium text-foreground/80">Amazon</span>
      <AnimatePresence>
        {!isParleo && (
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="rounded-full bg-foreground/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground/65"
          >
            Recommended
          </motion.span>
        )}
      </AnimatePresence>
    </div>
    <div className="text-[13px] font-semibold tabular-nums text-foreground/80">$28.00</div>
  </motion.div>
);

const Footnote = ({ isParleo }: { isParleo: boolean }) => (
  <div className="flex items-center justify-between pt-0.5">
    <AnimatePresence mode="wait">
      <motion.span
        key={isParleo ? "p" : "s"}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -3 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45"
      >
        {isParleo ? "with parleo · 8 retailers" : "sticker price · 8 retailers"}
      </motion.span>
    </AnimatePresence>
    <button className="text-[11px] font-medium text-primary/80 hover:text-primary">
      View all →
    </button>
  </div>
);

/* ─────────────────────────────────────────────
   Assistant column
   ───────────────────────────────────────────── */

const AssistantContent = ({ phase }: { phase: Phase }) => (
  <div className="flex gap-2.5">
    <AssistantAvatar />
    <div className="min-w-0 flex-1">
      <AnimatePresence mode="wait">
        {phase === "typing" ? (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TypingDots />
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2.5"
          >
            <AnimatePresence initial={false}>
              {phase === "parleo" && <SephoraCard key="sephora" />}
            </AnimatePresence>
            <AmazonRow isParleo={phase === "parleo"} />
            <Footnote isParleo={phase === "parleo"} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Mode toggle (top, editorial)
   ───────────────────────────────────────────── */

const ModeIndicator = ({ phase }: { phase: Phase }) => {
  const isParleo = phase === "parleo";
  return (
    <div className="flex items-center justify-between rounded-full border border-border/70 bg-card/80 px-1 py-1 backdrop-blur">
      <div className="relative flex w-full">
        <motion.div
          layout
          className="absolute inset-y-0 w-1/2 rounded-full bg-foreground"
          animate={{ x: isParleo ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
        <span
          className={`relative z-[1] flex-1 text-center text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
            !isParleo ? "text-background" : "text-foreground/45"
          }`}
        >
          Standard agent
        </span>
        <span
          className={`relative z-[1] flex-1 text-center text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
            isParleo ? "text-background" : "text-foreground/45"
          }`}
        >
          With Parleo
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Orchestrator
   ───────────────────────────────────────────── */

const SEQUENCE: { phase: Phase; hold: number }[] = [
  { phase: "typing", hold: 1100 },
  { phase: "standard", hold: 2600 },
  { phase: "parleo", hold: 4800 },
];

const TOTAL = SEQUENCE.reduce((s, p) => s + p.hold, 0);

const HeroChatArtifact = () => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "parleo" : "typing");
  const [progress, setProgress] = useState(reduce ? 1 : 0);
  const [paused, setPaused] = useState(false);
  const startedAt = useRef<number>(performance.now());

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const loop = (t: number) => {
      if (paused) {
        startedAt.current = t - progress * TOTAL;
        raf = requestAnimationFrame(loop);
        return;
      }
      const elapsed = (t - startedAt.current) % TOTAL;
      let acc = 0;
      let current: Phase = "typing";
      for (const step of SEQUENCE) {
        if (elapsed < acc + step.hold) {
          current = step.phase;
          break;
        }
        acc += step.hold;
      }
      setPhase(current);
      setProgress(elapsed / TOTAL);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduce]);

  const replay = () => {
    startedAt.current = performance.now();
    setPhase("typing");
    setProgress(0);
  };

  // Display phase for top indicator (treat typing as standard)
  const displayPhase: Phase = phase === "typing" ? "standard" : phase;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-3">
        <ModeIndicator phase={displayPhase} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[0.85fr_1.15fr]">
        <ProductCanvas phase={displayPhase} />
        <ChatChrome progress={progress}>
          <div className="space-y-4">
            <UserBubble />
            <AssistantContent phase={phase} />
          </div>
        </ChatChrome>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/35">
          Live demo · auto-cycles
        </span>
        <button
          onClick={replay}
          className="text-[11px] font-medium text-foreground/40 transition-colors hover:text-foreground/70"
        >
          Replay ↻
        </button>
      </div>
    </div>
  );
};

export default HeroChatArtifact;
