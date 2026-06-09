import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import tatchaWaterCream from "@/assets/tatcha-water-cream.png";

type Phase = "typing" | "standard" | "parleo";

/* ─────────────────────────────────────────────
   Tiny primitives
   ───────────────────────────────────────────── */

const TypingDots = () => (
  <div className="flex items-center gap-1.5 px-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-foreground/35"
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/** Tween a numeric price for a soft counter feel. */
const AnimatedPrice = ({
  value,
  className = "",
  duration = 750,
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

const ChatChrome = ({
  children,
  progress,
}: {
  children: React.ReactNode;
  progress: number;
}) => (
  <div
    className="relative w-full overflow-hidden rounded-[18px] border border-border bg-card"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    {/* Cycle progress hairline */}
    <div className="absolute inset-x-0 top-0 z-10 h-px bg-foreground/[0.04]">
      <motion.div
        className="h-full bg-primary/50"
        style={{ width: `${progress * 100}%` }}
        transition={{ ease: "linear" }}
      />
    </div>

    {/* Title bar */}
    <div className="flex items-center justify-between border-b border-border/60 bg-card px-3 py-2.5 md:px-4 md:py-3">
      <div className="flex items-center gap-2">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
        <div className="flex items-center gap-1 text-[12.5px] font-semibold text-foreground/80">
          ChatGPT
          <span className="ml-0.5 font-normal text-foreground/40">5</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">Share</button>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(28_75%_60%)] text-[10px] font-semibold text-white">S</div>
      </div>
    </div>

    <div className="px-3 py-4 md:px-5 md:py-5">{children}</div>

    {/* Composer */}
    <div className="border-t border-border/60 bg-card px-3 py-2.5 md:px-4 md:py-3">
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-2 md:px-4 md:py-2.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span className="flex-1 truncate text-[12px] text-foreground/35">Ask anything</span>
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground md:h-7 md:w-7">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const Avatar = () => (
  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[hsl(213_99%_65%)]">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
    </svg>
  </div>
);

const UserBubble = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-end"
  >
    <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-[14px] leading-snug text-primary-foreground">
      Find me the best price on Tatcha The Water Cream.
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

type Retailer = {
  name: string;
  listed: number;
  trueCost?: number;
};

const baseRetailers: Retailer[] = [
  { name: "Amazon", listed: 28.0 },
  { name: "Sephora", listed: 30.0, trueCost: 14.64 },
  { name: "Ulta", listed: 30.0 },
  { name: "Nordstrom", listed: 30.0 },
];

const ranked = (isParleo: boolean) =>
  [...baseRetailers].sort((a, b) => {
    const av = isParleo ? a.trueCost ?? a.listed : a.listed;
    const bv = isParleo ? b.trueCost ?? b.listed : b.listed;
    return av - bv;
  });

const incentiveStack = [
  { label: "Beauty Insider Rouge member", value: "−$6.00" },
  { label: "Sephora Visa · 4% back", value: "−$0.96" },
  { label: "Birthday GWP value", value: "−$8.40" },
];

/* ─────────────────────────────────────────────
   Row
   ───────────────────────────────────────────── */

const RetailerRow = ({
  retailer,
  isParleo,
  rank,
}: {
  retailer: Retailer;
  isParleo: boolean;
  rank: number;
}) => {
  const isBest = rank === 0;
  const showTrueCost = isParleo && retailer.trueCost !== undefined;
  const displayValue = showTrueCost ? retailer.trueCost! : retailer.listed;

  return (
    <motion.div
      layout
      layoutId={`row-${retailer.name}`}
      transition={{ type: "spring", stiffness: 360, damping: 36, mass: 0.7 }}
      className="relative"
    >
      <motion.div
        animate={{
          borderColor: isBest
            ? isParleo
              ? "hsl(213 99% 50% / 0.30)"
              : "hsl(var(--foreground) / 0.16)"
            : "hsl(var(--border) / 0.6)",
          backgroundColor: isBest
            ? isParleo
              ? "hsl(213 99% 50% / 0.05)"
              : "hsl(var(--foreground) / 0.03)"
            : "hsl(var(--secondary) / 0.25)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between rounded-lg border px-3 py-2.5"
      >
        <div className="flex items-center gap-2">
          <BrandLogo name={retailer.name} size={16} />
          <span className="text-[13px] font-medium text-foreground/85">{retailer.name}</span>
          <AnimatePresence mode="wait">
            {isBest && (
              <motion.span
                key={isParleo ? "parleo-badge" : "std-badge"}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                  isParleo ? "bg-primary/15 text-primary" : "bg-foreground/10 text-foreground/70"
                }`}
              >
                {isParleo ? "True best" : "Recommended"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-baseline gap-2 tabular-nums">
          <AnimatePresence>
            {showTrueCost && (
              <motion.span
                key="strike"
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[12px] text-foreground/40 line-through"
              >
                ${retailer.listed.toFixed(2)}
              </motion.span>
            )}
          </AnimatePresence>
          <AnimatedPrice
            value={displayValue}
            className={`text-[14px] font-semibold ${
              showTrueCost ? "text-primary" : isBest ? "text-foreground" : "text-foreground/75"
            }`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Status bar (single piece that morphs)
   ───────────────────────────────────────────── */

const StatusBar = ({ isParleo }: { isParleo: boolean }) => (
  <motion.div
    animate={{
      backgroundColor: isParleo ? "hsl(213 99% 50% / 0.05)" : "hsl(var(--secondary) / 0.45)",
      borderColor: isParleo ? "hsl(213 99% 50% / 0.18)" : "hsl(var(--border) / 0.6)",
    }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex items-center gap-2 overflow-hidden border-b px-4 py-2"
  >
    {/* Sweep highlight on activation */}
    <AnimatePresence>
      {isParleo && (
        <motion.div
          key="sweep"
          initial={{ x: "-100%" }}
          animate={{ x: "120%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-y-0 w-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(213 99% 50% / 0.18) 50%, transparent 100%)",
          }}
        />
      )}
    </AnimatePresence>

    <motion.span
      animate={{
        backgroundColor: isParleo ? "hsl(213 99% 50%)" : "hsl(var(--foreground) / 0.3)",
      }}
      transition={{ duration: 0.4 }}
      className="relative inline-flex h-1.5 w-1.5"
    >
      <AnimatePresence>
        {isParleo && (
          <motion.span
            key="ping"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-primary"
          />
        )}
      </AnimatePresence>
      <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "currentColor" }} />
    </motion.span>

    <div className="relative h-[14px] flex-1 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={isParleo ? "p" : "s"}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            isParleo ? "text-primary" : "text-foreground/45"
          }`}
        >
          {isParleo ? "Parleo true-price layer active" : "Standard agent · listed prices"}
        </motion.span>
      </AnimatePresence>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Answer card (single, morphing)
   ───────────────────────────────────────────── */

const AnswerCard = ({ isParleo }: { isParleo: boolean }) => {
  const rows = ranked(isParleo);

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 280, damping: 34 }}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <StatusBar isParleo={isParleo} />

      {/* Product header */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary/60">
          <img src={tatchaWaterCream} alt="Tatcha The Water Cream" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-[10.5px] font-medium uppercase tracking-wider text-foreground/45">Tatcha</p>
          <p className="text-[14px] font-semibold text-foreground">The Water Cream</p>
          <p className="text-[12px] text-foreground/50">50ml moisturizer</p>
        </div>
      </div>

      {/* Rows (reordered + reformatted via layout) */}
      <LayoutGroup>
        <motion.div layout className="space-y-1.5 px-4 pt-4">
          {rows.map((r, i) => (
            <RetailerRow key={r.name} retailer={r} isParleo={isParleo} rank={i} />
          ))}
        </motion.div>
      </LayoutGroup>

      {/* Incentive stack (parleo only) */}
      <AnimatePresence initial={false}>
        {isParleo && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden px-4"
          >
            <div className="mt-4 rounded-lg border border-primary/15 bg-primary/[0.035] p-3">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary/70">
                Sephora incentive stack
              </p>
              <div className="mt-2 space-y-1.5">
                {incentiveStack.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-between text-[12.5px] tabular-nums"
                  >
                    <span className="text-foreground/65">{s.label}</span>
                    <span className="font-semibold text-[hsl(var(--success))]">{s.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendation line */}
      <motion.div layout className="px-4 pb-4 pt-4">
        <div className="relative h-[44px] md:h-[40px]">
          <AnimatePresence mode="wait">
            {isParleo ? (
              <motion.p
                key="rec-p"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-[13.5px] leading-relaxed text-foreground/80"
              >
                Recommending <span className="font-semibold text-primary">Sephora</span>. True cost
                $14.64 beats Amazon by{" "}
                <span className="font-semibold text-foreground">$13.36</span> after your incentives.
              </motion.p>
            ) : (
              <motion.p
                key="rec-s"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-[13.5px] leading-relaxed text-foreground/75"
              >
                Recommending <span className="font-semibold text-foreground">Amazon</span>. Lowest
                listed price at $28.00.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Orchestrator
   ───────────────────────────────────────────── */

const TIMELINE: Array<{ at: number; phase: Phase }> = [
  { at: 0, phase: "typing" },
  { at: 1200, phase: "standard" },
  { at: 4600, phase: "parleo" },
];
const CYCLE_MS = 11000;

const HeroChatArtifact = () => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "parleo" : "typing");
  const [hovered, setHovered] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [progress, setProgress] = useState(0);

  const replay = useCallback(() => {
    setPhase("typing");
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (hovered) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    TIMELINE.forEach(({ at, phase: p }) => {
      timers.push(setTimeout(() => setPhase(p), at));
    });
    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE_MS));
    return () => timers.forEach(clearTimeout);
  }, [cycle, hovered, reduce]);

  // Progress hairline
  useEffect(() => {
    if (reduce) {
      setProgress(1);
      return;
    }
    if (hovered) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / CYCLE_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cycle, hovered, reduce]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ChatChrome progress={progress}>
        <div className="space-y-4">
          <UserBubble />
          <div className="flex items-start gap-3">
            <Avatar />
            <div className="relative min-h-[460px] min-w-0 flex-1 md:min-h-[500px]">
              <AnimatePresence>
                {phase === "typing" && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    className="absolute left-0 top-0 inline-block rounded-2xl rounded-tl-md bg-secondary/60 px-3 py-2"
                  >
                    <TypingDots />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {phase !== "typing" && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.35 } }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0"
                  >
                    <AnswerCard isParleo={phase === "parleo"} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </ChatChrome>

      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-foreground/40">
        <button
          onClick={replay}
          className="rounded-full px-2 py-1 transition-colors hover:text-foreground/70"
        >
          Replay
        </button>
        <span className="h-1 w-1 rounded-full bg-foreground/20" />
        <span>Hover to pause</span>
      </div>
    </div>
  );
};

export default HeroChatArtifact;
