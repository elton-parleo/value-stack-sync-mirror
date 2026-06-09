import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import tatchaWaterCream from "@/assets/tatcha-water-cream.png";

type Phase = "thinking" | "listed" | "scan" | "corrected";

const CYCLE_MS = 10800;
const TIMELINE: Array<{ at: number; phase: Phase }> = [
  { at: 0, phase: "thinking" },
  { at: 850, phase: "listed" },
  { at: 3600, phase: "scan" },
  { at: 5850, phase: "corrected" },
];
const ease = [0.22, 1, 0.36, 1] as const;

const AnimatedMoney = ({ value, className = "" }: { value: number; className?: string }) => {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const from = previous.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 780);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else previous.current = to;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className={className}>${display.toFixed(2)}</span>;
};

const TypingDots = () => (
  <div className="flex items-center gap-1.5 px-1 py-1">
    {[0, 1, 2].map((index) => (
      <motion.span
        key={index}
        className="h-1.5 w-1.5 rounded-full bg-foreground/35"
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.16, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const ChatChrome = ({ children, progress }: { children: React.ReactNode; progress: number }) => (
  <div className="relative w-full overflow-hidden rounded-[18px] border border-border bg-card shadow-elevated">
    <div className="absolute inset-x-0 top-0 z-10 h-px bg-foreground/[0.04]">
      <motion.div className="h-full bg-primary/55" animate={{ width: `${progress * 100}%` }} transition={{ ease: "linear", duration: 0.08 }} />
    </div>

    <div className="flex items-center justify-between border-b border-border/60 bg-card px-3 py-2.5 md:px-4 md:py-3">
      <div className="flex min-w-0 items-center gap-2">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-foreground/40">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
        <div className="flex min-w-0 items-center gap-1 text-[12.5px] font-semibold text-foreground/80">
          <span className="truncate">ChatGPT</span>
          <span className="ml-0.5 font-normal text-foreground/40">5</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-foreground/40">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">Share</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">S</span>
      </div>
    </div>

    <div className="px-3 py-4 md:px-5 md:py-5">{children}</div>

    <div className="border-t border-border/60 bg-card px-3 py-2.5 md:px-4 md:py-3">
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-2 md:px-4 md:py-2.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-foreground/40">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span className="flex-1 truncate text-[12px] text-foreground/35">Ask anything</span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground md:h-7 md:w-7">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--background))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </span>
      </div>
    </div>
  </div>
);

const UserBubble = () => (
  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} className="flex justify-end">
    <div className="max-w-[86%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-[14px] leading-snug text-primary-foreground">
      Find me the best price on Tatcha The Water Cream.
    </div>
  </motion.div>
);

const AssistantAvatar = () => (
  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-card">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M5 8h14" />
      <path d="M7 16h10" />
      <path d="M9 3l6 18" />
      <path d="M15 3L9 21" />
    </svg>
  </div>
);

const StatusHeader = ({ phase }: { phase: Phase }) => {
  const active = phase === "scan" || phase === "corrected";

  return (
    <motion.div
      className="relative flex items-center justify-between overflow-hidden border-b px-3 py-2"
      animate={{
        backgroundColor: active ? "hsl(213 99% 50% / 0.045)" : "hsl(var(--secondary) / 0.34)",
        borderColor: active ? "hsl(213 99% 50% / 0.18)" : "hsl(var(--border) / 0.7)",
      }}
      transition={{ duration: 0.7, ease }}
    >
      <motion.div
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
        animate={{ x: phase === "scan" ? ["0%", "430%"] : "430%", opacity: phase === "scan" ? [0, 1, 0.2] : 0 }}
        transition={{ duration: 1.7, ease }}
      />
      <div className="relative flex min-w-0 items-center gap-2">
        <motion.span className="relative h-2 w-2 rounded-full" animate={{ backgroundColor: active ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.34)" }} transition={{ duration: 0.45 }}>
          <motion.span className="absolute inset-0 rounded-full bg-primary" animate={{ opacity: active ? [0.45, 0] : 0, scale: active ? [1, 2.7] : 1 }} transition={{ duration: 1.7, repeat: active ? Infinity : 0, ease: "easeOut" }} />
        </motion.span>
        <div className="min-w-0">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-foreground/45">{active ? "Parleo layer active" : "Standard agent view"}</p>
          <p className="truncate text-[11.5px] font-medium text-foreground/70">{active ? "Incentives translated into true price" : "Ranking from visible prices only"}</p>
        </div>
      </div>
      <motion.div className="relative hidden h-6 w-[108px] overflow-hidden rounded-full border border-border/70 bg-card/80 sm:block" animate={{ borderColor: active ? "hsl(213 99% 50% / 0.26)" : "hsl(var(--border) / 0.7)" }} transition={{ duration: 0.6 }}>
        <motion.div className="absolute inset-y-1 left-1 rounded-full bg-primary/12" animate={{ width: active ? "82%" : "32%" }} transition={{ duration: 0.95, ease }} />
        <span className="relative flex h-full items-center justify-center text-[9.5px] font-semibold uppercase tracking-[0.1em] text-foreground/55">{active ? "True cost" : "List price"}</span>
      </motion.div>
    </motion.div>
  );
};

const ProductHeader = () => (
  <div className="flex items-center gap-2.5 px-3 pt-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-secondary/45">
      <img src={tatchaWaterCream} alt="Tatcha The Water Cream" className="h-full w-full object-contain" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.13em] text-foreground/45">Tatcha</p>
      <p className="truncate text-[13.5px] font-semibold leading-tight text-foreground">The Water Cream</p>
      <p className="text-[11px] leading-tight text-foreground/52">50ml moisturizer</p>
    </div>
  </div>
);

const RetailerNode = ({
  name,
  logo,
  label,
  price,
  selected,
  muted = false,
}: {
  name: string;
  logo: string;
  label: string;
  price: number;
  selected: boolean;
  muted?: boolean;
}) => (
  <motion.div
    className="relative h-[64px] rounded-lg border px-2.5 py-2"
    animate={{
      y: selected ? -3 : 0,
      backgroundColor: selected ? "hsl(213 99% 50% / 0.055)" : "hsl(var(--secondary) / 0.24)",
      borderColor: selected ? "hsl(213 99% 50% / 0.28)" : "hsl(var(--border) / 0.66)",
      opacity: muted ? 0.55 : 1,
    }}
    transition={{ duration: 0.7, ease }}
  >
    <div className="flex items-center gap-2">
      <BrandLogo name={logo} size={15} />
      <span className="text-[12px] font-semibold text-foreground/82">{name}</span>
    </div>
    <div className="mt-1.5 flex items-end justify-between gap-2 tabular-nums">
      <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-foreground/40">{label}</span>
      <AnimatedMoney value={price} className={selected ? "text-[14px] font-bold text-primary" : "text-[12.5px] font-semibold text-foreground/72"} />
    </div>
    <motion.span
      className="absolute -right-1.5 -top-1.5 rounded-full border border-card px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.08em]"
      animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0.92, backgroundColor: selected ? "hsl(var(--primary))" : "hsl(var(--card))", color: selected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))" }}
      transition={{ duration: 0.45, ease }}
    >
      Pick
    </motion.span>
  </motion.div>
);

const ValueRoute = ({ phase }: { phase: Phase }) => {
  const active = phase === "scan" || phase === "corrected";
  const corrected = phase === "corrected";

  return (
    <div className="relative mt-2.5 h-[76px] px-3">
      <div className="absolute left-[22px] right-[22px] top-[38px] h-px bg-border/80" />
      <motion.div className="absolute left-[22px] top-[38px] h-px bg-primary" animate={{ width: corrected ? "calc(100% - 44px)" : active ? "58%" : "18%", opacity: active ? 0.65 : 0.22 }} transition={{ duration: 0.95, ease }} />
      <div className="grid h-full grid-cols-[1fr_48px_1fr] items-center gap-2">
        <RetailerNode name="Amazon" logo="Amazon" label="List" price={28} selected={!active} muted={corrected} />
        <motion.div className="relative flex h-12 items-center justify-center" animate={{ opacity: active ? 1 : 0.45 }} transition={{ duration: 0.45 }}>
          <motion.div className="absolute h-8 w-8 rounded-full border border-primary/25 bg-primary/[0.055]" animate={{ scale: active ? [1, 1.13, 1] : 1 }} transition={{ duration: 1.7, repeat: active ? Infinity : 0, ease: "easeInOut" }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative">
            <path d="M3 12h15" />
            <path d="M13 7l5 5-5 5" />
          </svg>
        </motion.div>
        <RetailerNode name="Sephora" logo="Sephora" label={active ? "True" : "List"} price={active ? 14.64 : 30} selected={active} />
      </div>
    </div>
  );
};

const ValueStack = ({ phase }: { phase: Phase }) => {
  const active = phase === "scan" || phase === "corrected";
  const corrected = phase === "corrected";
  const items = [
    { label: "Rouge discount", value: "-$6.00" },
    { label: "Sephora Visa 4%", value: "-$0.96" },
    { label: "Gift value", value: "-$8.40" },
  ];

  return (
    <div className="relative mt-2.5 px-3">
      <motion.div className="relative overflow-hidden rounded-lg border bg-card" animate={{ borderColor: active ? "hsl(213 99% 50% / 0.22)" : "hsl(var(--border) / 0.7)" }} transition={{ duration: 0.65, ease }}>
        <motion.div className="pointer-events-none absolute inset-0 bg-primary/[0.035]" animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.65, ease }} />
        <motion.div className="pointer-events-none absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-transparent via-primary/12 to-transparent" animate={{ x: phase === "scan" ? ["-120%", "245%"] : "245%", opacity: phase === "scan" ? [0, 1, 0] : 0 }} transition={{ duration: 1.55, ease }} />
        <div className="relative grid grid-cols-[1fr_auto] gap-2.5 px-3 py-2">
          <div>
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-foreground/45">Hidden value</p>
            <div className="mt-1 space-y-0.5">
              {items.map((item, index) => (
                <motion.div key={item.label} className="flex items-center justify-between gap-3 text-[11.2px] tabular-nums" animate={{ opacity: active ? 1 : 0.34, x: active ? 0 : -4 }} transition={{ delay: active ? index * 0.1 : 0, duration: 0.45, ease }}>
                  <span className="truncate text-foreground/62">{item.label}</span>
                  <span className="font-semibold text-[hsl(var(--success))]">{active ? item.value : "$0.00"}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex w-[96px] flex-col justify-between rounded-md border border-border/65 bg-card/85 p-2 text-right">
            <span className="text-[9px] font-medium uppercase tracking-[0.09em] text-foreground/42">True cost</span>
            <AnimatedMoney value={active ? 14.64 : 30} className={active ? "text-[18px] font-bold leading-none text-primary" : "text-[17px] font-bold leading-none text-foreground/58"} />
            <motion.span className="text-[9.5px] font-semibold text-primary" animate={{ opacity: corrected ? 1 : 0, y: corrected ? 0 : 4 }} transition={{ duration: 0.45, ease }}>
              $13.36 lower
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Recommendation = ({ phase }: { phase: Phase }) => {
  const active = phase === "scan" || phase === "corrected";
  const corrected = phase === "corrected";

  return (
    <div className="px-3 pb-3 pt-2.5">
      <motion.div className="relative min-h-[54px] overflow-hidden rounded-lg border px-3 py-2" animate={{ borderColor: active ? "hsl(213 99% 50% / 0.22)" : "hsl(var(--border) / 0.68)", backgroundColor: active ? "hsl(213 99% 50% / 0.045)" : "hsl(var(--secondary) / 0.26)" }} transition={{ duration: 0.65, ease }}>
        <div className="flex items-start gap-2.5">
          <motion.div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border" animate={{ borderColor: active ? "hsl(213 99% 50% / 0.26)" : "hsl(var(--border))", backgroundColor: active ? "hsl(var(--primary))" : "hsl(var(--card))" }} transition={{ duration: 0.55, ease }}>
            <motion.svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground) / 0.52)"} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" animate={{ rotate: active ? 0 : -45 }} transition={{ duration: 0.55, ease }}>
              <path d="M20 6 9 17l-5-5" />
            </motion.svg>
          </motion.div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold leading-snug text-foreground">
              {corrected ? "Recommendation corrected to Sephora" : active ? "Resolving the real winner" : "Recommendation: Amazon"}
            </p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-foreground/66">
              {corrected ? "Sephora wins once loyalty, card value and gift value are readable." : active ? "The visible price is being reconciled against the incentive layer." : "Sticker-price logic picks the lowest listed offer."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AnswerCard = ({ phase }: { phase: Phase }) => {
  const active = phase === "scan" || phase === "corrected";
  const corrected = phase === "corrected";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: phase === "thinking" ? 0 : 1, y: phase === "thinking" ? 8 : 0 }}
      transition={{ duration: 0.55, ease }}
      className="h-[410px] overflow-hidden rounded-xl border border-border bg-card"
    >
      <StatusHeader phase={phase} />

      <div className="relative px-3 py-3">
        <motion.div
          className="pointer-events-none absolute inset-x-3 top-[118px] h-px bg-primary"
          animate={{ scaleX: active ? 1 : 0.34, opacity: active ? 0.55 : 0.18 }}
          transition={{ duration: 0.9, ease }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 w-[44%] bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          animate={{ x: phase === "scan" ? ["-110%", "250%"] : "250%", opacity: phase === "scan" ? [0, 1, 0] : 0 }}
          transition={{ duration: 1.6, ease }}
        />

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-secondary/45">
            <img src={tatchaWaterCream} alt="Tatcha The Water Cream" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.13em] text-foreground/45">Tatcha</p>
            <p className="truncate text-[13.5px] font-semibold leading-tight text-foreground">The Water Cream</p>
          </div>
          <motion.div
            className="rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.09em]"
            animate={{ borderColor: active ? "hsl(213 99% 50% / 0.26)" : "hsl(var(--border))", color: active ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.46)" }}
            transition={{ duration: 0.55, ease }}
          >
            {active ? "True cost" : "List price"}
          </motion.div>
        </div>

        <div className="mt-3 grid grid-cols-[1fr_42px_1fr] items-center gap-2">
          <motion.div
            className="relative h-[86px] rounded-lg border px-2.5 py-2"
            animate={{ y: active ? 0 : -4, opacity: corrected ? 0.55 : 1, borderColor: !active ? "hsl(213 99% 50% / 0.28)" : "hsl(var(--border) / 0.7)", backgroundColor: !active ? "hsl(213 99% 50% / 0.055)" : "hsl(var(--secondary) / 0.24)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center gap-2 text-[12px] font-semibold text-foreground/82"><BrandLogo name="Amazon" size={15} /> Amazon</div>
            <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground/38">Sticker price</p>
            <p className="mt-0.5 text-right text-[18px] font-bold tabular-nums text-foreground">$28.00</p>
            <motion.span className="absolute -right-1.5 -top-1.5 rounded-full border border-card bg-primary px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.08em] text-primary-foreground" animate={{ opacity: !active ? 1 : 0, scale: !active ? 1 : 0.92 }} transition={{ duration: 0.4, ease }}>Pick</motion.span>
          </motion.div>

          <motion.div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-primary/[0.055]" animate={{ scale: active ? [1, 1.12, 1] : 1, opacity: active ? 1 : 0.48 }} transition={{ duration: 1.7, repeat: active ? Infinity : 0, ease: "easeInOut" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h15" /><path d="M13 7l5 5-5 5" /></svg>
          </motion.div>

          <motion.div
            className="relative h-[86px] rounded-lg border px-2.5 py-2"
            animate={{ y: active ? -4 : 0, borderColor: active ? "hsl(213 99% 50% / 0.32)" : "hsl(var(--border) / 0.7)", backgroundColor: active ? "hsl(213 99% 50% / 0.06)" : "hsl(var(--secondary) / 0.24)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center gap-2 text-[12px] font-semibold text-foreground/82"><BrandLogo name="Sephora" size={15} /> Sephora</div>
            <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground/38">{active ? "After incentives" : "Sticker price"}</p>
            <p className="mt-0.5 text-right text-[18px] font-bold tabular-nums text-primary"><AnimatedMoney value={active ? 14.64 : 30} /></p>
            <motion.span className="absolute -right-1.5 -top-1.5 rounded-full border border-card bg-primary px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.08em] text-primary-foreground" animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.92 }} transition={{ duration: 0.4, ease }}>Pick</motion.span>
          </motion.div>
        </div>

        <motion.div className="mt-2.5 rounded-lg border px-3 py-2" animate={{ borderColor: active ? "hsl(213 99% 50% / 0.24)" : "hsl(var(--border) / 0.68)", backgroundColor: active ? "hsl(213 99% 50% / 0.045)" : "hsl(var(--secondary) / 0.24)" }} transition={{ duration: 0.6, ease }}>
          <div className="flex items-center justify-between gap-3 text-[11px] tabular-nums text-foreground/62">
            <span>{corrected ? "Corrected recommendation" : active ? "Applying hidden value" : "Sticker-price recommendation"}</span>
            <span className={active ? "font-bold text-primary" : "font-bold text-foreground/70"}>{active ? "Sephora wins" : "Amazon wins"}</span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-3 text-[11px] tabular-nums text-foreground/62">
            <span>Rouge + Visa + gift value</span><span className="font-semibold text-[hsl(var(--success))]">{active ? "-$15.36" : "$0.00"}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const HeroChatArtifact = () => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "corrected" : "thinking");
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(reduce ? 1 : 0);

  const replay = useCallback(() => {
    setPhase("thinking");
    setProgress(0);
    setCycle((current) => current + 1);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    TIMELINE.forEach(({ at, phase: nextPhase }) => timers.push(setTimeout(() => setPhase(nextPhase), at)));
    timers.push(setTimeout(() => setCycle((current) => current + 1), CYCLE_MS));
    return () => timers.forEach(clearTimeout);
  }, [cycle, paused, reduce]);

  useEffect(() => {
    if (reduce) {
      setProgress(1);
      return;
    }
    if (paused) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(1, (now - start) / CYCLE_MS);
      setProgress(next);
      if (next < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [cycle, paused, reduce]);

  return (
    <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ChatChrome progress={progress}>
        <div className="space-y-4">
          <UserBubble />
          <div className="flex items-start gap-3">
            <AssistantAvatar />
            <div className="relative min-h-[410px] min-w-0 flex-1">
              <motion.div className="absolute left-0 top-0 rounded-2xl rounded-tl-md bg-secondary/60 px-3 py-2" animate={{ opacity: phase === "thinking" ? 1 : 0, y: phase === "thinking" ? 0 : -4 }} transition={{ duration: 0.3, ease }}>
                <TypingDots />
              </motion.div>
              <AnswerCard phase={phase} />
            </div>
          </div>
        </div>
      </ChatChrome>

      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-foreground/40">
        <button type="button" onClick={replay} className="rounded-full px-2 py-1 transition-colors hover:text-foreground/70">
          Replay
        </button>
        <span className="h-1 w-1 rounded-full bg-foreground/20" />
        <span>Hover to pause</span>
      </div>
    </div>
  );
};

export default HeroChatArtifact;