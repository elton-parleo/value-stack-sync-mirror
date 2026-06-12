import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type Phase = "typing" | "standard" | "parleo";

/* ─────────────────────────────────────────────
   Primitives
   ───────────────────────────────────────────── */

const TypingDots = () => (
  <div className="flex items-center gap-1.5 px-2 py-2">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-foreground/30"
        animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const AnimatedPrice = ({
  value,
  className = "",
  duration = 650,
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
   Chrome
   ───────────────────────────────────────────── */

const ChatChrome = ({ children, progress }: { children: React.ReactNode; progress: number }) => (
  <div
    className="relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    {/* Cycle progress hairline */}
    <div className="absolute inset-x-0 top-0 z-10 h-px bg-foreground/[0.04]">
      <div
        className="h-full bg-primary/50 transition-[width] duration-100 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>

    {/* Title bar */}
    <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/35">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
        <div className="flex items-center gap-1 text-[13px] font-semibold text-foreground/70">
          ChatGPT
          <span className="ml-0.5 font-normal text-foreground/35">5</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/35">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-full bg-foreground px-3 py-1 text-[12px] font-medium text-background">Share</button>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(28_78%_62%)] text-[11px] font-bold text-white">S</div>
      </div>
    </div>

    <div className="px-5 py-5">{children}</div>

    {/* Composer */}
    <div className="px-5 pb-5">
      <div className="flex h-11 w-full items-center rounded-2xl border border-border/60 bg-secondary/40 px-4">
        <span className="text-[13px] text-foreground/30">Message ChatGPT...</span>
      </div>
    </div>
  </div>
);

const AssistantAvatar = () => (
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(213 99% 50% / 0.12)" stroke="hsl(213 99% 50%)" strokeWidth="1.8" strokeLinejoin="round">
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
    <div className="max-w-[85%] rounded-[20px] rounded-tr-md bg-primary px-4 py-2.5 text-[14px] leading-snug text-primary-foreground">
      Find me the best price on Tatcha The Water Cream.
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Retailer / Sephora cards
   ───────────────────────────────────────────── */

const incentiveStack = [
  { label: "Beauty Insider Rouge", value: "−$6.00" },
  { label: "Sephora Visa · 4% back", value: "−$0.96" },
  { label: "Birthday gift credit", value: "−$8.40" },
];

const SephoraCard = () => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 12, height: 0 }}
    animate={{ opacity: 1, y: 0, height: "auto" }}
    exit={{ opacity: 0, y: -8, height: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="overflow-visible"
  >
    <div
      className="relative rounded-xl border border-primary/25 bg-primary/[0.04] p-4"
      style={{ boxShadow: "0 0 0 4px hsl(213 99% 50% / 0.04)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-2.5 right-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary-foreground"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
          <span className="absolute inset-0 rounded-full bg-white" />
        </span>
        Best with Parleo
      </motion.div>

      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <BrandLogo name="Sephora" size={18} />
          <span className="text-[14px] font-semibold text-foreground">Sephora</span>
        </div>
        <div className="text-right leading-none">
          <div className="mb-1 text-[12px] text-foreground/40 line-through">$30.00</div>
          <AnimatedPrice value={14.64} className="text-[20px] font-bold text-primary" />
        </div>
      </div>

      <div className="space-y-1.5 border-t border-primary/15 pt-3">
        {incentiveStack.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between text-[12.5px] tabular-nums"
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
    animate={{ opacity: isParleo ? 0.45 : 1, filter: isParleo ? "grayscale(100%)" : "grayscale(0%)" }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 px-4 py-3"
  >
    <div className="flex items-center gap-2">
      <BrandLogo name="Amazon" size={18} />
      <span className="text-[13.5px] font-medium text-foreground/80">Amazon</span>
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
    <div className="text-[14px] font-semibold tabular-nums text-foreground/80">$28.00</div>
  </motion.div>
);

const ActionRow = ({ isParleo }: { isParleo: boolean }) => (
  <motion.div
    initial={false}
    animate={{ opacity: 1 }}
    className="flex flex-wrap gap-2 pt-1"
  >
    <button
      className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
        isParleo
          ? "border-primary/30 bg-primary/[0.06] text-primary"
          : "border-border/70 bg-card text-foreground/70"
      }`}
    >
      {isParleo ? "View on Sephora" : "View on Amazon"}
    </button>
    <button className="rounded-full border border-border/70 bg-card px-3.5 py-1.5 text-[12.5px] font-medium text-foreground/70">
      See all 8 retailers
    </button>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Assistant column
   ───────────────────────────────────────────── */

const AssistantContent = ({ phase }: { phase: Phase }) => (
  <div className="flex gap-3">
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
            className="space-y-3"
          >
            <AnimatePresence initial={false}>
              {phase === "parleo" && <SephoraCard key="sephora" />}
            </AnimatePresence>
            <AmazonRow isParleo={phase === "parleo"} />
            <ActionRow isParleo={phase === "parleo"} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Orchestrator
   ───────────────────────────────────────────── */

const SEQUENCE: { phase: Phase; hold: number }[] = [
  { phase: "typing", hold: 1100 },
  { phase: "standard", hold: 2400 },
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

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ChatChrome progress={progress}>
        <div className="space-y-5">
          <UserBubble />
          <AssistantContent phase={phase} />
        </div>
      </ChatChrome>
      <div className="mt-2 flex justify-end">
        <button
          onClick={replay}
          className="text-[11px] font-medium text-foreground/40 transition-colors hover:text-foreground/70"
        >
          Replay
        </button>
      </div>
    </div>
  );
};

export default HeroChatArtifact;
