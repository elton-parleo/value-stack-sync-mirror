import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import tatchaWaterCream from "@/assets/tatcha-water-cream.png";

type Phase = "typing" | "standard" | "parleo";

const TypingDots = () => (
  <div className="flex items-center gap-1 px-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-foreground/35"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const ChatChrome = ({ children }: { children: React.ReactNode }) => (
  <div
    className="w-full overflow-hidden rounded-[18px] border border-border bg-card"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
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

type Row = {
  name: string;
  listed: string;
  trueCost?: string;
  badge?: string;
  highlight?: boolean;
};

const RetailerRow = ({ row, showTrue }: { row: Row; showTrue: boolean }) => (
  <motion.div
    layout
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
      row.highlight ? "border-primary/30 bg-primary/[0.05]" : "border-border/60 bg-secondary/30"
    }`}
  >
    <div className="flex items-center gap-2">
      <BrandLogo name={row.name} size={16} />
      <span className="text-[13px] font-medium text-foreground/85">{row.name}</span>
      {row.badge && (
        <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
          row.highlight ? "bg-primary/15 text-primary" : "bg-foreground/10 text-foreground/70"
        }`}>
          {row.badge}
        </span>
      )}
    </div>
    <div className="flex items-baseline gap-2">
      {showTrue && row.trueCost ? (
        <>
          <span className="text-[12px] text-foreground/35 line-through">{row.listed}</span>
          <span className="text-[14px] font-semibold text-primary">{row.trueCost}</span>
        </>
      ) : (
        <span className={`text-[14px] font-semibold ${row.highlight ? "text-foreground" : "text-foreground/75"}`}>
          {row.listed}
        </span>
      )}
    </div>
  </motion.div>
);

const standardRows: Row[] = [
  { name: "Amazon", listed: "$28.00", badge: "Recommended", highlight: true },
  { name: "Sephora", listed: "$30.00" },
  { name: "Ulta", listed: "$30.00" },
  { name: "Nordstrom", listed: "$30.00" },
];

const parleoRows: Row[] = [
  { name: "Sephora", listed: "$30.00", trueCost: "$14.64", badge: "True best deal", highlight: true },
  { name: "Amazon", listed: "$28.00" },
  { name: "Ulta", listed: "$30.00" },
  { name: "Nordstrom", listed: "$30.00" },
];

const incentiveStack = [
  { label: "Beauty Insider Rouge member", value: "−$6.00" },
  { label: "Sephora Visa · 4% back", value: "−$0.96" },
  { label: "Birthday GWP value", value: "−$8.40" },
];

const AnswerCard = ({ phase }: { phase: "standard" | "parleo" }) => {
  const isParleo = phase === "parleo";
  const rows = isParleo ? parleoRows : standardRows;

  return (
    <motion.div
      layout
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      {/* Status bar */}
      <AnimatePresence mode="wait" initial={false}>
        {isParleo ? (
          <motion.div
            key="parleo-bar"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2 border-b border-primary/15 bg-primary/[0.05] px-4 py-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              Parleo true-price layer active
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="std-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-2"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/45">
              Standard agent · listed prices
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Rows */}
      <motion.div layout className="space-y-1.5 px-4 pt-4">
        {rows.map((r) => (
          <RetailerRow key={r.name} row={r} showTrue={isParleo && !!r.trueCost} />
        ))}
      </motion.div>

      {/* Incentive stack reveals only in parleo */}
      <AnimatePresence initial={false}>
        {isParleo && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden px-4"
          >
            <div className="mt-4 rounded-lg border border-primary/15 bg-primary/[0.04] p-3">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-primary/70">
                Sephora incentive stack
              </p>
              <div className="mt-2 space-y-1.5">
                {incentiveStack.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.35 }}
                    className="flex items-center justify-between text-[12.5px]"
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

      {/* Recommendation */}
      <motion.div layout className="px-4 pb-4 pt-4">
        <AnimatePresence mode="wait" initial={false}>
          {isParleo ? (
            <motion.p
              key="rec-parleo"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[13.5px] leading-relaxed text-foreground/80"
            >
              Recommending <span className="font-semibold text-primary">Sephora</span>. True cost $14.64 beats Amazon by{" "}
              <span className="font-semibold text-foreground">$13.36</span> after your incentives.
            </motion.p>
          ) : (
            <motion.p
              key="rec-std"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[13.5px] leading-relaxed text-foreground/75"
            >
              Recommending <span className="font-semibold text-foreground">Amazon</span>. Lowest listed price at $28.00.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const UserBubble = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-end"
  >
    <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-[14px] leading-snug text-primary-foreground">
      Find me the best price on Tatcha The Water Cream.
    </div>
  </motion.div>
);

const HeroChatArtifact = () => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "parleo" : "typing");
  const [hovered, setHovered] = useState(false);
  const [cycle, setCycle] = useState(0);

  const replay = useCallback(() => {
    setPhase("typing");
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (hovered) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    setPhase("typing");
    timers.push(setTimeout(() => setPhase("standard"), 1100));
    timers.push(setTimeout(() => setPhase("parleo"), 3400));
    timers.push(setTimeout(() => setPhase("typing"), 8800));
    timers.push(setTimeout(() => setCycle((c) => c + 1), 9000));
    return () => timers.forEach(clearTimeout);
  }, [cycle, hovered, reduce]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ChatChrome>
        <div className="space-y-4">
          <UserBubble />
          <div className="flex items-start gap-3">
            <Avatar />
            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                {phase === "typing" ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-block rounded-2xl rounded-tl-md bg-secondary/60 px-3 py-2"
                  >
                    <TypingDots />
                  </motion.div>
                ) : (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnswerCard phase={phase} />
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
        <span>Auto-plays the recommendation flip</span>
      </div>
    </div>
  );
};

export default HeroChatArtifact;
