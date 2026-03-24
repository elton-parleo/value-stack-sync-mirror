import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const flywheelSteps = [
  { label: "Agent traffic grows", angle: 0 },
  { label: "Merchants join to be visible", angle: 90 },
  { label: "More data = more valuable", angle: 180 },
  { label: "Agents default to Parleo", angle: 270 },
];

const assertions = [
  {
    title: "A new channel is forming.",
    body: "Early presence compounds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Agents form habits fast.",
    body: "Parleo is designed to be their default.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M17 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11V9a4 4 0 014-4h14" />
        <path d="M7 23l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    ),
  },
  {
    title: "Control follows presence.",
    body: "The B2B product sells itself when traffic flows.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

const HowItWorks = () => (
  <AnimatedSection id="how-it-works" className="section-grid relative bg-background py-16 md:py-24">
    <div className="diffusion-glow pointer-events-none absolute left-[10%] top-[50%] -translate-y-1/2" />
    <div className="decorative-line" />

    <div className="mx-auto max-w-content px-6 pt-8 md:px-20">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-label text-parleo-muted">THE WINDOW</span>
      </div>
      <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
        The standard is forming now.
      </h2>

      {/* Flywheel diagram + assertions */}
      <div className="mt-10 grid items-center gap-8 md:mt-14 md:gap-12 md:grid-cols-[1fr_1fr]">
        {/* Flywheel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex aspect-square w-full max-w-[260px] items-center justify-center md:max-w-[340px]"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-border" />
          <div className="absolute inset-3 rounded-full border border-border/60" />

          {/* Rotating arrow indicators */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-dashed border-primary/20"
          />

          {/* Center hub */}
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.06]" style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.1)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(var(--primary))" />
              <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
            </svg>
          </div>

          {/* Node labels positioned around the circle */}
          {flywheelSteps.map((step, i) => {
            const positions = [
              "left-1/2 -translate-x-1/2 -top-2 -translate-y-full",
              "top-1/2 -translate-y-1/2 -right-2 translate-x-full",
              "left-1/2 -translate-x-1/2 -bottom-2 translate-y-full",
              "top-1/2 -translate-y-1/2 -left-2 -translate-x-full",
            ];
            const dotPositions = [
              "left-1/2 -translate-x-1/2 top-0",
              "right-0 top-1/2 -translate-y-1/2",
              "left-1/2 -translate-x-1/2 bottom-0",
              "left-0 top-1/2 -translate-y-1/2",
            ];
            return (
              <div key={step.label}>
                {/* Dot on ring */}
                <div className={`absolute ${dotPositions[i]} h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary`} style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.4)" }} />
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className={`absolute ${positions[i]} max-w-[110px] rounded-lg border border-border bg-card px-2 py-1.5 text-center md:max-w-[140px] md:px-3 md:py-2`}
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <span className="text-[10px] font-medium text-foreground md:text-[12px]">{step.label}</span>
                </motion.div>
              </div>
            );
          })}

          {/* Directional arrows between nodes */}
          <svg className="pointer-events-none absolute inset-0" viewBox="0 0 340 340">
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="hsl(213,99%,50%)" opacity="0.4" />
              </marker>
            </defs>
            {/* Curved arrows between nodes */}
            <path d="M190 30 A140 140 0 0 1 310 150" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1" opacity="0.2" markerEnd="url(#arrowhead)" />
            <path d="M310 190 A140 140 0 0 1 190 310" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1" opacity="0.2" markerEnd="url(#arrowhead)" />
            <path d="M150 310 A140 140 0 0 1 30 190" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1" opacity="0.2" markerEnd="url(#arrowhead)" />
            <path d="M30 150 A140 140 0 0 1 150 30" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1" opacity="0.2" markerEnd="url(#arrowhead)" />
          </svg>
        </motion.div>

        {/* Assertions — compact, icon-driven */}
        <div className="space-y-5">
          {assertions.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.06]">
                {a.icon}
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-foreground">{a.title}</h3>
                <p className="mt-0.5 text-[14px] text-foreground/50">{a.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </AnimatedSection>
);

export default HowItWorks;
