import AnimatedSection from "../AnimatedSection";

const DevTrackHeader = () => (
  <AnimatedSection
    id="developers"
    className="relative border-y border-border/60 py-16 md:py-24"
    style={{ background: "#EAE8E5" }}
  >
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="flex items-center gap-3">
        <span className="inline-block h-2 w-2 rounded-full bg-primary" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          For developers
        </span>
      </div>
      <div className="mt-5 grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-14">
        <h2
          className="font-heading text-[32px] text-foreground md:text-[52px]"
          style={{ lineHeight: 1.05 }}
        >
          The layer your agent calls.
        </h2>
        <p className="self-end text-[16px] leading-[1.65] text-foreground/70 md:text-[18px]">
          One endpoint returns normalized products, true-cost deal signals, and semantic context. Your agent skips the 8 to 12 tool calls a cold crawl needs.
        </p>
      </div>
    </div>
  </AnimatedSection>
);

export default DevTrackHeader;
