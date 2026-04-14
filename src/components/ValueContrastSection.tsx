import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const valueRows = [
  { label: "Rouge tier", detail: "active since 2019" },
  { label: "4x Beauty Insider points", detail: "this week" },
  { label: "Amex Gold card offer", detail: "$5 on $20+" },
  { label: "12 purchases this year", detail: "$847 total" },
  { label: "Member pricing", detail: "unlocked" },
  { label: "Refer-a-friend", detail: "2 referrals" },
];

const ValueContrastSection = () => (
  <AnimatedSection className="relative bg-background py-16 md:py-24">
    <div className="mx-auto max-w-content px-6 md:px-20">
      {/* Main comparison */}
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-0">

        {/* Left: What agents see */}
        <div className="flex flex-1 flex-col items-center justify-center py-8 md:py-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-[72px] text-foreground md:text-[96px]"
            style={{ lineHeight: 1 }}
          >
            $23.00
          </motion.span>
          <span className="mt-3 text-[13px] text-foreground/35">list price</span>
        </div>

        {/* Center: Bridge */}
        <div className="flex flex-col items-center gap-3 md:mx-8 md:shrink-0">
          <div className="hidden h-24 w-px bg-border md:block" />
          <div className="flex h-8 w-8 items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
              <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
            </svg>
          </div>
          <div className="hidden h-24 w-px bg-border md:block" />
          {/* Mobile: horizontal line */}
          <div className="h-px w-16 bg-border md:hidden" />
        </div>

        {/* Right: What you've built */}
        <div className="flex flex-1 flex-col items-center justify-center md:items-start">
          <div className="w-full max-w-[320px] space-y-1.5">
            {valueRows.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3.5 py-2.5"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <span className="text-[13px] font-medium text-foreground">{row.label}</span>
                <span className="text-[12px] text-foreground/40">{row.detail}</span>
              </motion.div>
            ))}
          </div>
          <span className="mt-3 self-center text-[13px] text-foreground/35 md:self-start md:pl-1">customer value</span>
        </div>
      </div>

      {/* Bottom copy */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-12 max-w-[600px] text-center text-[16px] font-medium leading-[1.7] text-foreground/70 md:text-[18px]"
      >
        Agents see a price. You see a relationship worth 100x that.
        <br />
        Parleo makes sure the agent sees it too.
      </motion.p>
    </div>
  </AnimatedSection>
);

export default ValueContrastSection;
