import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import BrandLogo from "./BrandLogo";

const valueLayers = [
  { label: "Rouge tier", value: "−10%", sub: "Loyalty status detected" },
  { label: "Amex Platinum", value: "−$5.00", sub: "Card-linked offer" },
  { label: "Beauty Insider 4x", value: "$4.60", sub: "Points multiplier" },
  { label: "12 purchases/yr", value: "$847", sub: "Annual relationship value" },
  { label: "Member since 2019", value: "", sub: "Tenure signal" },
];

const ValueRevealSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Label crossfade
  const labelOpacity1 = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);
  const labelOpacity2 = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  // Price animation
  const priceReveal = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const originalPriceOpacity = useTransform(priceReveal, (v) => (v > 0.5 ? 0.25 : 1));
  const strikethroughWidth = useTransform(priceReveal, [0.4, 0.8], ["0%", "100%"]);

  // Card border glow
  const borderOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);

  // Closing copy
  const closingOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);
  const closingY = useTransform(scrollYProgress, [0.58, 0.68], [16, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "80vh", minHeight: 600 }}
    >
      <div
        className="sticky top-0 flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <div className="flex flex-col items-center px-5 w-full max-w-[440px]">
          {/* Label */}
          <div className="relative mb-6 h-4 w-full text-center">
            <motion.span
              className="absolute inset-0 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/30"
              style={{ opacity: labelOpacity1 }}
            >
              What agents see today
            </motion.span>
            <motion.span
              className="absolute inset-0 text-[11px] font-medium uppercase tracking-[0.14em] text-primary/50"
              style={{ opacity: labelOpacity2 }}
            >
              What Parleo surfaces
            </motion.span>
          </div>

          {/* Card */}
          <motion.div
            className="w-full rounded-2xl border bg-card overflow-hidden"
            style={{
              borderColor: useTransform(borderOpacity, (v) =>
                `hsl(213 99% 50% / ${v * 0.2})`
              ),
              boxShadow: useTransform(borderOpacity, (v) =>
                `0 ${4 + v * 20}px ${12 + v * 40}px -${4 + v * 8}px hsl(243 10% 30% / ${0.04 + v * 0.06}), 0 0 0 1px hsl(213 99% 50% / ${v * 0.08})`
              ),
            }}
          >
            {/* Top bar — Parleo attribution, fades in */}
            <motion.div
              className="flex items-center justify-between border-b border-border/40 px-5 py-2.5"
              style={{ opacity: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]) }}
            >
              <div className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213 99% 50%)" />
                  <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213 99% 50%)" opacity="0.4" />
                </svg>
                <span className="text-[10px] font-medium text-primary/50">Parleo enrichment</span>
              </div>
              <span className="text-[10px] text-foreground/25">48ms</span>
            </motion.div>

            <div className="p-6 md:p-8">
              {/* Product identity */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                  <BrandLogo name="Sephora" size={24} />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-foreground">
                    Rare Beauty Soft Pinch Blush
                  </p>
                  <p className="text-[12px] text-foreground/40">Sephora · Beauty</p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="relative">
                  <motion.span
                    className="text-[36px] font-bold tracking-tight text-foreground md:text-[44px]"
                    style={{ opacity: originalPriceOpacity, lineHeight: "1" }}
                  >
                    $23.00
                  </motion.span>
                  <motion.span
                    className="absolute left-0 top-1/2 h-[2px] bg-foreground/30"
                    style={{ width: strikethroughWidth }}
                  />
                </span>
                <motion.span
                  className="text-[36px] font-bold tracking-tight text-primary md:text-[44px]"
                  style={{ opacity: priceReveal, lineHeight: "1" }}
                >
                  $11.10
                </motion.span>
              </div>

              {/* Savings badge */}
              <motion.div
                className="mt-2"
                style={{ opacity: useTransform(scrollYProgress, [0.3, 0.38], [0, 1]) }}
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--success))]/10 px-2.5 py-1 text-[11px] font-semibold text-[hsl(var(--success))]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17l9.2-9.2M17 17V8H8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  52% true savings
                </span>
              </motion.div>

              {/* Value layers — the reveal */}
              <div className="mt-6 space-y-0">
                {valueLayers.map((layer, i) => (
                  <ValueRow
                    key={layer.label}
                    layer={layer}
                    scrollYProgress={scrollYProgress}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Closing copy */}
          <motion.p
            className="mt-8 max-w-[380px] text-center text-[15px] leading-[1.65] text-foreground/45 md:text-[16px]"
            style={{ opacity: closingOpacity, y: closingY }}
          >
            Every product has a listed price.<br />
            Your best customers have a better one.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

/* ── Individual value row with scroll-driven reveal ── */

const ValueRow = ({
  layer,
  scrollYProgress,
  index,
}: {
  layer: { label: string; value: string; sub: string };
  scrollYProgress: MotionValue<number>;
  index: number;
}) => {
  const start = 0.28 + index * 0.045;
  const end = start + 0.05;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [6, 0]);

  return (
    <motion.div
      className="flex items-center justify-between border-b border-border/30 py-3 last:border-b-0"
      style={{ opacity, y }}
    >
      <div>
        <span className="text-[13px] font-medium text-foreground/70">{layer.label}</span>
        <p className="text-[11px] text-foreground/30">{layer.sub}</p>
      </div>
      {layer.value && (
        <span className="text-[14px] font-semibold text-[hsl(var(--success))]">
          {layer.value}
        </span>
      )}
    </motion.div>
  );
};

export default ValueRevealSection;
