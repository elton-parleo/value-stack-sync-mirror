import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const visibleItems = [
  { category: "Products", detail: "Names, descriptions, images" },
  { category: "Prices", detail: "Listed / sticker price" },
  { category: "Availability", detail: "In stock / out of stock" },
];

const invisibleItems = [
  { category: "Loyalty programs", detail: "Tier discounts, points multipliers, member pricing" },
  { category: "Card-linked offers", detail: "Amex, Visa, Chase partnerships and cashback" },
  { category: "Promotional stacking", detail: "Bundle deals, flash sales, seasonal promos" },
  { category: "Customer lifetime value", detail: "Repeat purchase incentives, retention offers" },
  { category: "True cost after incentives", detail: "Net effective price for loyalty members" },
];

const stats = [
  { value: "52%", description: "Savings surfaced at Sephora after loyalty + card stacking." },
  { value: "4 retailers", description: "Same product, 4 different true costs. Only Parleo knows which one wins." },
  { value: "<50ms", description: "Full incentive stack resolved per query. Zero PII." },
];

const PlatformContextSection = () => (
  <AnimatedSection className="section-grid relative bg-background py-10 md:py-14">
    <div className="mx-auto max-w-content px-6 pt-6 md:px-20">
      {/* Label */}
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="9" y="3" width="6" height="4" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-label text-parleo-muted">YOUR VALUE STACK</span>
      </div>

      {/* Headline */}
      <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
        Agents see your products.<br className="hidden md:block" />
        They don't see your value.
      </h2>
      <p className="mt-3 max-w-[620px] text-[15px] leading-[1.7] text-foreground/50 md:text-[17px]">
        You've spent years building loyalty programs that drive lifetime value. Here's what AI agents actually see today.
      </p>

      {/* Agent Readiness Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 overflow-hidden rounded-xl border border-border bg-card"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {/* Grid header */}
        <div className="grid grid-cols-2 border-b border-border">
          <div className="flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="hsl(152, 69%, 31%)" strokeWidth="1.5" />
              <path d="M4.5 7l2 2 3.5-3.5" stroke="hsl(152, 69%, 31%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40 md:text-[13px]">
              What agents can see
            </span>
          </div>
          <div className="flex items-center gap-2 border-l border-border bg-primary/[0.02] px-5 py-3 md:px-6 md:py-3.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="hsl(213, 99%, 50%)" strokeWidth="1.5" />
              <path d="M5 5l4 4M9 5l-4 4" stroke="hsl(213, 99%, 50%)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-primary/70 md:text-[13px]">
              What agents can't see
            </span>
          </div>
        </div>

        {/* Grid rows */}
        <div className="divide-y divide-border">
          {/* Visible rows */}
          {visibleItems.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="grid grid-cols-2"
            >
              <div className="flex items-start gap-2.5 px-5 py-3 md:px-6 md:py-3.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[hsl(152,69%,31%)]/10">
                  <svg width="8" height="8" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5L8 3" stroke="hsl(152,69%,31%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <span className="text-[14px] font-medium text-foreground">{item.category}</span>
                  <p className="text-[12px] leading-[1.5] text-foreground/40">{item.detail}</p>
                </div>
              </div>
              <div className="border-l border-border bg-primary/[0.02] px-5 py-3 md:px-6 md:py-3.5">
                <span className="text-[13px] text-foreground/25">—</span>
              </div>
            </motion.div>
          ))}

          {/* Invisible rows */}
          {invisibleItems.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="grid grid-cols-2"
            >
              <div className="flex items-center px-5 py-3 md:px-6 md:py-3.5">
                <span className="text-[13px] text-foreground/25">—</span>
              </div>
              <div className="border-l-2 border-l-primary/30 bg-primary/[0.03] px-5 py-3 md:px-6 md:py-3.5">
                <div className="flex items-start gap-2.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                    <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                    <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
                  </svg>
                  <div>
                    <span className="text-[14px] font-semibold text-foreground">{item.category}</span>
                    <p className="text-[12px] leading-[1.5] text-foreground/50">{item.detail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Callout */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-5 text-[14px] leading-[1.6] text-foreground/50 md:text-[15px]"
      >
        The invisible column is where your competitive advantage lives. <span className="font-semibold text-foreground">Parleo makes all of it agent-readable.</span>
      </motion.p>

      {/* Stat cards */}
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 + i * 0.1, duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-card-hover hover:border-primary/20"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <span className="block font-heading text-[28px] leading-none tracking-tight text-primary md:text-[32px]">
              {s.value}
            </span>
            <p className="mt-2 text-[13px] leading-[1.5] text-foreground/50">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default PlatformContextSection;
