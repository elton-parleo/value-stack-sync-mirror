import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    num: "01",
    label: "CONNECT",
    headline: "Sync your value stack",
    body: "Plug in loyalty rules, card offers, VIP tiers, and inventory constraints via API. You're live in under two weeks.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    label: "CONTROL",
    headline: "Set your rules",
    body: "Margin floors, liability targets, inventory priorities. The engine enforces them on every agent query. Automatically.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    label: "CONVERT",
    headline: "Win on real value",
    body: "Agents see your complete incentive stack as logic formulas, not PII. You win on value, they convert.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const HowItWorks = () => (
  <AnimatedSection id="how-it-works" className="section-grid relative bg-background py-16 md:py-24">
    <div className="diffusion-glow pointer-events-none absolute left-[10%] top-[50%] -translate-y-1/2" />
    <div className="decorative-line" />

    {/* Decorative corner element */}
    <div className="pointer-events-none absolute left-[5%] top-[20%] hidden md:block">
      <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-[0.05]">
        <path d="M0 0h16v2H2v14H0V0z" fill="hsl(213,99%,50%)" />
      </svg>
    </div>
    <div className="pointer-events-none absolute bottom-[15%] right-[5%] hidden md:block">
      <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-[0.05]">
        <path d="M40 40H24v-2h14V24h2v16z" fill="hsl(213,99%,50%)" />
      </svg>
    </div>

    <div className="mx-auto max-w-content px-6 pt-8 md:px-20">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-label text-parleo-muted">HOW IT WORKS</span>
      </div>
      <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
        One integration.<br />Every agent. Full control.
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="group relative rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            {/* Connection line between cards */}
            {i < steps.length - 1 && (
              <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block" />
            )}
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/[0.06] transition-colors duration-300 group-hover:bg-primary/[0.1]">
                {s.icon}
              </div>
              <span className="text-[40px] font-extrabold text-primary/[0.06]">{s.num}</span>
            </div>
            <span className="mt-5 block font-label text-primary">{s.label}</span>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{s.headline}</h3>
            <p className="mt-2.5 text-[16px] leading-[1.7] text-foreground/50">{s.body}</p>

            {/* Subtle bottom accent line on hover */}
            <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-primary/20 transition-all duration-500 group-hover:w-1/2" />
          </motion.div>
        ))}
      </div>

      {/* Flow arrow indicator */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2 text-parleo-muted/40">
          <svg width="40" height="8" viewBox="0 0 40 8">
            <line x1="0" y1="4" x2="34" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M34 1l4 3-4 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] font-medium tracking-wider">LIVE IN 14 DAYS</span>
          <svg width="40" height="8" viewBox="0 0 40 8" className="rotate-180">
            <line x1="0" y1="4" x2="34" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M34 1l4 3-4 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

export default HowItWorks;
