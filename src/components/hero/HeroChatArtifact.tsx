import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import tatchaImage from "@/assets/tatcha-water-cream.png";

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
      {/* Cycle progress hairline */}
      <div className="absolute inset-x-0 top-0 z-10 h-px overflow-hidden rounded-t-[20px] bg-foreground/[0.05]">
        <motion.div
          key={cycleKey}
          className="h-full origin-left bg-primary/60"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </div>

      {/* Chrome bar */}
      <div className="flex items-center justify-between rounded-t-[20px] border-b border-border/50 px-4 py-2.5">
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
        <div className="flex min-w-0 items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={isParleo ? "p" : "s"}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.3 }}
              className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45 sm:flex"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isParleo ? "bg-primary" : "bg-foreground/25"
                }`}
              />
              {isParleo ? "parleo · shopping" : "standard · shopping"}
            </motion.span>
          </AnimatePresence>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            S
          </div>
        </div>
      </div>

      <div className="min-h-[396px] p-4 sm:min-h-[408px] sm:p-5">{children}</div>
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
  { label: "Beauty Insider Rouge", value: "−$6.00" },
  { label: "Sephora Visa · 4% back", value: "−$0.96" },
  { label: "Birthday gift credit", value: "−$8.40" },
];

const rankingRows = [
  { retailer: "Sephora", standard: "$30.00", parleo: "$14.64", note: "loyalty + card + gift value" },
  { retailer: "Amazon", standard: "$28.00", parleo: "$28.00", note: "list price only" },
];

const ProductCard = ({ phase }: { phase: Phase }) => {
  const isParleo = phase === "parleo";
  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-card"
      transition={{ layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Badge */}
      <AnimatePresence>
        {isParleo && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
              <span className="absolute inset-0 rounded-full bg-white" />
            </span>
            Best with Parleo
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-[34%_1fr] items-stretch sm:grid-cols-[38%_1fr]">
        {/* Product image well */}
        <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden border-r border-border/60 bg-[hsl(36_18%_94%)] sm:min-h-[226px]">
          <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/35 sm:left-4 sm:top-4">SKU 320418</div>
          <div className="absolute bottom-3 left-3 hidden max-w-[120px] font-mono text-[9px] uppercase leading-[1.5] tracking-[0.14em] text-foreground/35 sm:bottom-4 sm:left-4 sm:block">
            Merchant value made readable
          </div>
          <motion.img
            src={tatchaImage}
            alt="Tatcha The Water Cream"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] h-[100px] w-auto object-contain sm:h-[136px]"
            style={{ filter: "drop-shadow(0 14px 18px hsl(165 40% 18% / 0.16))" }}
          />
        </div>

        {/* Detail rail */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-3.5">
          <div>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={isParleo ? "flips" : "default"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`hidden shrink-0 rounded-full border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] sm:inline-block ${
                    isParleo
                      ? "border-primary/25 bg-primary/[0.06] text-primary"
                      : "border-border bg-secondary/40 text-foreground/45"
                  }`}
                >
                  {isParleo ? "Agent result flips" : "List price ranks"}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Winner retailer */}
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <BrandLogo name={isParleo ? "Sephora" : "Amazon"} size={14} />
                <span className="text-[12px] font-semibold text-foreground">
                  {isParleo ? "Sephora" : "Amazon"}
                </span>
              </div>
              <div className="text-right leading-none">
                {isParleo && (
                  <div className="mb-0.5 text-[10.5px] text-foreground/40 line-through tabular-nums">
                    $30.00
                  </div>
                )}
                <AnimatedPrice
                  value={isParleo ? 14.64 : 28.0}
                  className={`font-display text-[20px] tabular-nums ${
                    isParleo ? "text-primary" : "text-foreground"
                  }`}
                />
              </div>
            </div>

            <div className="mt-2 rounded-lg border border-border/60 bg-secondary/30 p-2">
              <div className="mb-1.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/40">
                <span>{isParleo ? "LLM sees incentives" : "LLM sees list prices"}</span>
                <span>{isParleo ? "Effective cost" : "Sticker price"}</span>
              </div>
              <div className="space-y-1.5">
                {rankingRows.map((row) => {
                  const winner = isParleo ? row.retailer === "Sephora" : row.retailer === "Amazon";
                  return (
                    <motion.div
                      layout
                      key={row.retailer}
                      className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-1 transition-colors duration-500 ${
                        winner ? "bg-card text-foreground" : "text-foreground/48"
                      }`}
                    >
                      <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5 sm:grid-cols-[auto_minmax(48px,auto)_minmax(0,1fr)]">
                        <BrandLogo name={row.retailer} size={12} grayscale={!winner} />
                        <span className="text-[11px] font-semibold">{row.retailer}</span>
                        <span className="hidden truncate text-[10px] text-foreground/42 sm:inline">{isParleo ? row.note : "visible to agent"}</span>
                      </div>
                      <span className={`text-[11px] font-semibold tabular-nums ${winner && isParleo ? "text-primary" : ""}`}>
                        {isParleo ? row.parleo : row.standard}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Incentive stack: only parleo */}
            <AnimatePresence>
              {isParleo && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-0.5 border-t border-border/60 pt-2">
                    {incentiveStack.map((s, i) => (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18 + i * 0.07, duration: 0.3 }}
                        className="flex items-center justify-between text-[10.5px] tabular-nums"
                      >
                        <span className="text-foreground/60">{s.label}</span>
                        <span className="font-semibold text-[hsl(var(--success))]">{s.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between border-t border-border/60 bg-secondary/30 px-3.5 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
          {isParleo ? "8 retailers · true price" : "8 retailers · list price"}
        </span>
        <span className="text-[11px] font-medium text-primary/85">View all →</span>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Assistant column
   ───────────────────────────────────────────── */

const AssistantContent = ({ phase }: { phase: Phase }) => (
  <div className="flex gap-2.5">
    <AssistantAvatar />
    <div className="min-w-0 flex-1 space-y-2.5">
      <AnimatePresence mode="wait">
        {phase === "typing" ? (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-2.5"
          >
            <TypingDots />
            <ProductCard phase="standard" />
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2.5"
          >
            <ProductCard phase={phase} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

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
    <div>
      <div className="mb-2.5">
        <ModeCaption phase={displayPhase} />
      </div>

      <ChatChrome phase={displayPhase} cycleKey={cycleKey} duration={TOTAL}>
        <div className="space-y-3.5">
          <UserBubble />
          <AssistantContent phase={phase} />
        </div>
      </ChatChrome>
    </div>
  );
};

export default HeroChatArtifact;
