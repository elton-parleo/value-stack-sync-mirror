import { motion } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";

const ProblemSection = () => {
  const ref = useRef(null);

  return (
    <AnimatedSection id="problem" className="section-grid relative bg-background py-16 md:py-24" ref={ref}>
      <div className="diffusion-glow pointer-events-none absolute right-0 top-[30%]" />
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -left-[150px] top-1/2 hidden h-[400px] w-[400px] rounded-full opacity-[0.03] md:block">
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }}
        />
      </div>

      {/* Decorative cross-hatch */}
      <div className="pointer-events-none absolute right-[8%] top-[10%] hidden md:block">
        <svg width="32" height="32" viewBox="0 0 32 32" className="opacity-[0.06]">
          <line x1="0" y1="0" x2="32" y2="32" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="32" y1="0" x2="0" y2="32" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="16" y1="0" x2="16" y2="32" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="0" y1="16" x2="32" y2="16" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="font-label text-parleo-muted">THE BLIND SPOT</span>
        </div>

        <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
          AI agents see sticker price.<br className="hidden md:block" />
          Your real value stays hidden.
        </h2>

        <p className="mt-4 max-w-[520px] text-[17px] leading-[1.7] text-foreground/50">
          Loyalty, card-linked offers, VIP tiers. None of it is structured for programmatic access. So merchants with better real value lose to whoever has the lowest list price.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid grid-cols-1 gap-4 md:mt-12 lg:grid-cols-3"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
            className="min-w-0 overflow-hidden rounded-xl border border-border bg-card p-5 transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 2l6 6M8 2l-6 6" stroke="hsl(var(--parleo-muted))" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-label text-parleo-muted">WITHOUT PARLEO</span>
            </div>

            <div className="mt-5 min-w-0">
              <div className="flex items-center gap-2.5">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="shrink-0 text-parleo-muted opacity-40">
                  <path d="M4 22h24l1-4-5-2-1-4-3 1-2-3H8l-1 4-4 2 1 6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M8 10l2 3 3-1 1 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                  <line x1="4" y1="25" x2="28" y2="25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <p className="text-sm font-medium text-foreground">Nike Air Max 90</p>
              </div>

              <p className="mt-3 text-[30px] font-bold leading-none text-foreground sm:text-[32px]">$140</p>

              <div className="mt-5 space-y-3">
                {["Amex offer: hidden", "Loyalty points: hidden", "VIP tier: hidden"].map((text) => (
                  <div key={text} className="flex min-w-0 items-start gap-2 text-[13px] leading-[1.45] text-parleo-muted">
                    <svg width="10" height="10" viewBox="0 0 10 10" className="mt-1 shrink-0 opacity-40">
                      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                    </svg>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-md bg-secondary px-3 py-2.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mt-0.5 shrink-0 text-parleo-muted opacity-50"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
                <p className="text-[11px] leading-[1.45] text-parleo-muted">Agent decides on price alone</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
            className="min-w-0 overflow-hidden rounded-xl border-2 border-primary/20 bg-card p-5 transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
            style={{ boxShadow: "0 4px 24px -4px hsl(var(--primary) / 0.08)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5L8 3" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-label text-primary">WITH PARLEO</span>
              </div>

              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">
                PARLEO ENABLED
              </span>
            </div>

            <div className="mt-5 min-w-0">
              <div className="flex items-center gap-2.5">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="shrink-0 text-primary opacity-50">
                  <path d="M4 22h24l1-4-5-2-1-4-3 1-2-3H8l-1 4-4 2 1 6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M8 10l2 3 3-1 1 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                  <line x1="4" y1="25" x2="28" y2="25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <p className="text-sm font-medium text-foreground">Nike Air Max 90</p>
              </div>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-base leading-none text-parleo-muted line-through sm:text-lg">$140</span>
                <span className="text-[30px] font-bold leading-none text-primary sm:text-[32px]">$107</span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { text: "Amex offer: −$20", icon: "card" },
                  { text: "Loyalty: 2× pts ($8 value)", icon: "star" },
                  { text: "VIP tier: active", icon: "shield" },
                ].map((item) => (
                  <div key={item.text} className="flex min-w-0 items-start gap-2 text-[13px] leading-[1.45] text-foreground">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      {item.icon === "card" && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                      )}
                      {item.icon === "star" && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                      {item.icon === "shield" && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      )}
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-md bg-primary/[0.04] px-3 py-2.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
                  <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[11px] font-medium leading-[1.45] text-primary">Agent picks the better deal</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
            className="min-w-0 overflow-hidden rounded-xl bg-code-bg p-5 transition-shadow duration-300 hover:shadow-card-hover sm:p-6"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
                  <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-label text-parleo-muted">API RESPONSE · 48ms</span>
            </div>

            <pre
              className="mt-4 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[10px] leading-[1.7] sm:text-[11px] sm:leading-[1.8]"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
{`{
  "card_signal": `}<span style={{ color: "hsl(var(--primary) / 0.85)" }}>"amex"</span>{`,
  "segment": `}<span style={{ color: "hsl(var(--primary) / 0.85)" }}>"likely_vip"</span>{`,
  "incentives": [`}
{`    { "apply": `}<span style={{ color: "hsl(var(--success))" }}>"-$20"</span>{` },`}
{`    { "apply": `}<span style={{ color: "hsl(var(--success))" }}>"2x_pts"</span>{` }`}
{`  ],`}
{`  "net_price": `}<span style={{ color: "hsl(var(--primary) / 0.85)" }}>107.00</span>{`,`}
{`  "pii": `}<span style={{ color: "hsl(var(--success))" }}>false</span>{`
}`}
            </pre>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[10px] text-parleo-muted">
              {["Zero PII", "Logic only", "Sub-50ms"].map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <svg width="8" height="8" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5L8 3" stroke="hsl(var(--success))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default ProblemSection;
