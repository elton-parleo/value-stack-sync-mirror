import AnimatedSection from "./AnimatedSection";

/**
 * Hero stats. VERIFY each figure + source before publish:
 *  - 39% Adobe Analytics 2025 holiday survey (US consumers using AI for shopping)
 *  - ~1,200% AI-driven retail traffic YoY, Adobe holiday 2024 → 2025
 *  - $1.7T agentic commerce projection by 2030 (analyst composite)
 */
const stats = [
  { value: "39%", label: "of US consumers have used AI for shopping", source: "Adobe, 2025 · verify" },
  { value: "1,200%", label: "YoY growth in AI-driven retail traffic", source: "Adobe, 2025 · verify" },
  { value: "$1.7T", label: "projected agentic commerce by 2030", source: "Analyst composite · verify" },
];

const StakesSection = () => (
  <AnimatedSection id="stakes" className="relative bg-background py-16 md:py-24">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <h2
        className="max-w-[20ch] font-heading text-[32px] text-foreground md:text-[52px]"
        style={{ lineHeight: 1.05 }}
      >
        AI agents are already shopping for your customers.
      </h2>
      <p className="mt-5 max-w-[640px] text-[17px] leading-[1.6] text-foreground/65 md:text-[19px]">
        It's the fastest-growing way people shop, and it's already deciding who gets the sale.
      </p>

      <div className="mt-10 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.value} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
            <span
              className="text-[36px] font-bold tracking-tight text-foreground md:text-[44px]"
              style={{ lineHeight: 1 }}
            >
              {s.value}
            </span>
            <p className="mt-3 text-[14px] leading-snug text-foreground/70">{s.label}</p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="h-px w-4 bg-foreground/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                {s.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default StakesSection;
