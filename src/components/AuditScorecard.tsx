import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Pillar = {
  name: string;
  score: number;
  max: number;
  note: string;
  own?: boolean;
};

const pillars: Pillar[] = [
  { name: "Visibility", score: 25, max: 32, note: "Agents can find you" },
  { name: "Accessibility", score: 14, max: 18, note: "Agents can read you" },
  { name: "True Value", score: 20, max: 50, note: "Only Parleo measures this", own: true },
];

const TOTAL = 59;
const THRESHOLD = 60;
const EXPOSURE = 4500000;

const useCountUp = (target: number, active: boolean, duration = 1100) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);
  return value;
};

/** Weighted tick meter: one tick per available point, so row width encodes point weight. */
const TickMeter = ({
  pillar,
  inView,
  index,
}: {
  pillar: Pillar;
  inView: boolean;
  index: number;
}) => {
  const ticks = Array.from({ length: pillar.max });
  return (
    <div className="flex items-end gap-[2px]" aria-hidden>
      {ticks.map((_, i) => {
        const filled = i < pillar.score;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, scaleY: 0.35 }}
            animate={inView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.35 }}
            transition={{
              duration: 0.34,
              delay: 0.3 + index * 0.16 + i * 0.012,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-[16px] flex-1 origin-bottom rounded-[1.5px]"
            style={{
              background: filled
                ? pillar.own
                  ? "hsl(var(--primary))"
                  : "hsl(var(--foreground) / 0.55)"
                : pillar.own
                  ? "hsl(0 0% 100% / 0.14)"
                  : "hsl(var(--foreground) / 0.10)",
            }}
          />
        );
      })}
    </div>
  );
};

const AuditScorecard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const score = useCountUp(TOTAL, inView);
  const exposure = useCountUp(EXPOSURE, inView, 1500);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-border bg-[hsl(34_8%_91%)] shadow-card"
      style={{ borderTop: "2px solid hsl(var(--primary))" }}
    >
      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-foreground/[0.07] px-5 py-3.5 md:px-7">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-foreground/45">
          Agentic value report
        </span>
        <span className="rounded-full border border-foreground/12 px-2.5 py-1 font-mono text-[10.5px] text-foreground/50">
          sample · skincare
        </span>
      </div>

      {/* score plate */}
      <div className="px-5 pb-6 pt-6 md:px-7">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-end gap-3">
            <span
              className="font-heading text-[76px] leading-[0.82] tracking-[-0.03em] text-foreground md:text-[92px]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {Math.round(score)}
            </span>
            <span className="pb-2 font-mono text-[11px] tracking-[0.1em] text-foreground/40">/100</span>
          </div>
          <div className="max-w-[212px] pb-1.5">
            <div className="text-[13px] font-semibold leading-[1.25] text-foreground">
              One point below readiness
            </div>
            <p className="mt-1.5 text-[12px] leading-[1.45] text-foreground/55">
              20 of the 41 missing points sit in True Value
            </p>
          </div>

        </div>

        {/* 100-point rule with readiness threshold */}
        <div className="relative mt-5">
          <div className="flex h-[7px] items-stretch gap-[2px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.008 }}
                className="flex-1 rounded-[1px]"
                style={{
                  background:
                    i * 2 < TOTAL ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.10)",
                }}
              />
            ))}
          </div>
          <div
            className="absolute -top-1.5 h-[16px] w-px bg-foreground/45"
            style={{ left: `${THRESHOLD}%` }}
            aria-hidden
          />
          <span
            className="absolute top-[18px] -translate-x-1/2 font-mono text-[10px] tracking-[0.08em] text-foreground/45"
            style={{ left: `${THRESHOLD}%` }}
          >
            ready at 60
          </span>
        </div>
      </div>

      {/* weighted pillars */}
      <div className="mt-4 flex flex-col gap-3 px-5 pb-6 md:px-7">
        {pillars.map((p, i) => (
          <div
            key={p.name}
            className="rounded-xl px-4 py-3.5"
            style={{
              background: p.own ? "#0E0E14" : "hsl(var(--foreground) / 0.035)",
            }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span
                className={`text-[13px] font-semibold tracking-[-0.01em] ${
                  p.own ? "text-white" : "text-foreground/85"
                }`}
              >
                {p.name}
              </span>
              <span
                className={`font-mono text-[11.5px] ${p.own ? "text-white/60" : "text-foreground/45"}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {p.score}/{p.max} pts
              </span>
            </div>
            {/* width is proportional to point weight: 50 pts = full width */}
            <div className="mt-2.5" style={{ width: `${(p.max / 50) * 100}%` }}>
              <TickMeter pillar={p} inView={inView} index={i} />
            </div>
            <span
              className={`mt-2 block text-[11px] ${p.own ? "text-primary" : "text-foreground/40"}`}
            >
              {p.note}
            </span>
          </div>
        ))}
      </div>

      {/* exposure strip */}
      <div className="flex items-baseline justify-between gap-4 border-t border-foreground/[0.07] bg-foreground/[0.03] px-5 py-4 md:px-7">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground/45">
          Modeled annual exposure
        </span>
        <span
          className="font-heading text-[20px] tracking-[-0.02em] text-foreground"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          ${(Math.round(exposure / 10000) / 100).toFixed(2)}M
        </span>
      </div>
    </div>
  );
};

export default AuditScorecard;
