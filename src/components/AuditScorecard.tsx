import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  { name: "Visibility", score: 25, max: 32, note: "Do agents see you at all" },
  { name: "Accessibility", score: 14, max: 18, note: "Can they read your feed" },
  { name: "True Value", score: 20, max: 50, note: "Only Parleo measures this", own: true },
];

const TOTAL = 59;
const EXPOSURE = 4500000;

const useCountUp = (target: number, active: boolean, duration = 900) => {
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

const AuditScorecard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const score = useCountUp(TOTAL, inView);
  const exposure = useCountUp(EXPOSURE, inView, 1400);

  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-border bg-[hsl(34_8%_91%)] shadow-card"
      style={{ borderTop: "2px solid hsl(var(--primary))" }}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-foreground/[0.07] px-6 py-4">
        <span className="text-[12px] font-medium tracking-[0.12em] text-foreground/45">
          AGENTIC VALUE REPORT
        </span>
        <span className="text-[11.5px] text-foreground/40">Sample</span>
      </div>

      <div className="flex flex-col gap-7 px-6 py-7 md:px-8">
        {/* ring + verdict */}
        <div className="flex items-center gap-6">
          <div className="relative h-[124px] w-[124px] shrink-0">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r={R} fill="none" stroke="hsl(var(--foreground) / 0.1)" strokeWidth="7" />
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (C * score) / 100}
              />
              {/* readiness tick at 60 */}
              <circle cx="60" cy="60" r={R} fill="none" stroke="hsl(var(--foreground) / 0.35)" strokeWidth="7" strokeDasharray={`2 ${C}`} strokeDashoffset={-(C * 0.6)} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-[34px] font-heading leading-none text-foreground"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {Math.round(score)}
              </span>
              <span className="mt-1 text-[10.5px] tracking-[0.1em] text-foreground/40">/ 100</span>
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-[17px] font-semibold leading-[1.2] text-foreground">One point below readiness</div>
            <p className="mt-2 text-[13.5px] leading-[1.5] text-foreground/60">
              The gap isn't visibility. It's value agents can't resolve. 20 points are recoverable.
            </p>
          </div>
        </div>

        {/* pillars */}
        <div className="flex flex-col gap-4 border-t border-foreground/[0.07] pt-6">
          {pillars.map((p, i) => {
            const pct = (p.score / p.max) * 100;
            return (
              <div key={p.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-[13.5px] font-medium ${p.own ? "text-primary" : "text-foreground/80"}`}>
                    {p.name}
                  </span>
                  <span
                    className="text-[12.5px] text-foreground/50"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {p.score} / {p.max}
                  </span>
                </div>
                <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-foreground/[0.09]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: p.own ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.4)" }}
                  />
                </div>
                <span className={`mt-1.5 block text-[11.5px] ${p.own ? "text-primary/80" : "text-foreground/40"}`}>
                  {p.note}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* exposure strip */}
      <div className="flex items-baseline justify-between gap-4 border-t border-foreground/[0.07] bg-foreground/[0.03] px-6 py-4 md:px-8">
        <span className="text-[12px] tracking-[0.1em] text-foreground/45">MODELED ANNUAL EXPOSURE</span>
        <span
          className="text-[19px] font-heading text-foreground"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          ${(Math.round(exposure / 10000) / 100).toFixed(2)}M
        </span>
      </div>
    </div>
  );
};

export default AuditScorecard;
