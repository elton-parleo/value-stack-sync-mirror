import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const valueLayers = [
  { label: "Rouge tier", value: "−10%", isGreen: true },
  { label: "Amex card offer", value: "−$5.00", isGreen: true },
  { label: "4x Beauty Insider", value: "$4.60 value", isGreen: true },
  { label: "12 purchases/yr", value: "$847 annual", isGreen: false },
  { label: "Member since 2019", value: "", isGreen: false },
];

const ValueRevealSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Label crossfade: switch around 30%
  const labelOpacity1 = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]);
  const labelOpacity2 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  // Price strikethrough + true cost appear around 25-35%
  const priceReveal = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);

  // Each value layer fades in staggered from 30% to 55%
  const layerProgress = valueLayers.map((_, i) => {
    const start = 0.28 + i * 0.05;
    const end = start + 0.06;
    return { start, end };
  });

  // Closing copy fades in at ~55-65%
  const closingOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const closingY = useTransform(scrollYProgress, [0.55, 0.65], [12, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "60vh", minHeight: 500 }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center" style={{ height: "60vh", minHeight: 500 }}>
        <div className="flex flex-col items-center px-5">
          {/* Label */}
          <div className="relative mb-4 h-5">
            <motion.span
              className="absolute inset-0 text-center text-[12px] font-medium uppercase tracking-widest text-foreground/35"
              style={{ opacity: labelOpacity1 }}
            >
              What agents see
            </motion.span>
            <motion.span
              className="absolute inset-0 text-center text-[12px] font-medium uppercase tracking-widest text-primary/60"
              style={{ opacity: labelOpacity2 }}
            >
              What Parleo surfaces
            </motion.span>
          </div>

          {/* Card */}
          <div
            className="w-full max-w-[360px] rounded-xl border border-border bg-card p-6"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Product name */}
            <p className="text-[15px] font-semibold text-foreground">
              Rare Beauty Soft Pinch Blush
            </p>

            {/* Price row */}
            <div className="mt-2 flex items-baseline gap-2.5">
              <motion.span
                className="text-[24px] font-bold text-foreground"
                style={{
                  textDecoration: useTransform(priceReveal, (v) =>
                    v > 0.5 ? "line-through" : "none"
                  ),
                  opacity: useTransform(priceReveal, (v) =>
                    v > 0.5 ? 0.35 : 1
                  ),
                }}
              >
                $23.00
              </motion.span>
              <motion.span
                className="text-[11px] text-foreground/40"
                style={{ opacity: priceReveal }}
              >
                →
              </motion.span>
              <motion.span
                className="text-[28px] font-bold text-primary"
                style={{ opacity: priceReveal }}
              >
                $11.10
              </motion.span>
            </div>

            {/* Value layers */}
            <div className="mt-4 space-y-1.5">
              {valueLayers.map((layer, i) => (
                <ValueLayer
                  key={layer.label}
                  layer={layer}
                  scrollYProgress={scrollYProgress}
                  start={layerProgress[i].start}
                  end={layerProgress[i].end}
                />
              ))}
            </div>
          </div>

          {/* Closing copy */}
          <motion.p
            className="mt-6 max-w-[400px] text-center text-[15px] leading-[1.6] text-foreground/50"
            style={{ opacity: closingOpacity, y: closingY }}
          >
            Every product has a listed price. Your best customers have a better one.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

/* ── Individual value layer with scroll-driven fade ── */

const ValueLayer = ({
  layer,
  scrollYProgress,
  start,
  end,
}: {
  layer: { label: string; value: string; isGreen: boolean };
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [6, 0]);

  return (
    <motion.div
      className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 px-3 py-2"
      style={{ opacity, y }}
    >
      <span className="text-[13px] text-foreground/70">{layer.label}</span>
      {layer.value && (
        <span
          className={`text-[13px] font-semibold ${
            layer.isGreen ? "text-[hsl(var(--success))]" : "text-foreground/50"
          }`}
        >
          {layer.value}
        </span>
      )}
    </motion.div>
  );
};

export default ValueRevealSection;
