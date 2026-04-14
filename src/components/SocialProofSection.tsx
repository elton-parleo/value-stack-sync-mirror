import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

/* ── Scrolling logo marquee ── */

const aiPlatforms = [
  "ChatGPT", "Claude", "Perplexity", "Google",
];

const merchantLogos = [
  "Sephora", "Nike", "Nordstrom", "Target", "Ulta", "Best Buy",
  "Lululemon", "Apple", "REI", "Dyson", "Patagonia", "Adidas",
  "Home Depot", "Macy's", "Amazon", "Sony",
];

const stats = [
  { value: "58%", label: "of consumers have used AI to shop", source: "Stripe" },
  { value: "4,700%", label: "YoY increase in AI-driven retail traffic", source: "Adobe" },
  { value: "$5T", label: "projected agentic commerce revenue by 2030", source: "McKinsey" },
];

const MarqueeRow = ({ logos, speed = 30, reverse = false }: { logos: string[]; speed?: number; reverse?: boolean }) => {
  // Double the logos for seamless infinite scroll
  const doubled = [...logos, ...logos];
  return (
    <div className="relative w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-foreground/70 whitespace-nowrap"
          >
            <BrandLogo name={name} size={16} />
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const SocialProofSection = () => (
  <section className="relative overflow-hidden border-t border-border bg-background py-10 md:py-14">
    <div className="mx-auto max-w-content px-6 md:px-20">
      {/* Stats row */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center md:text-left"
          >
            <span className="text-[36px] font-bold text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
              {s.value}
            </span>
            <p className="mt-1 text-[14px] leading-[1.5] text-foreground/55">
              {s.label}
            </p>
            <span className="mt-1 inline-block text-[11px] font-medium text-foreground/35">
              {s.source}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Divider + label */}
      <div className="mt-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-medium uppercase tracking-widest text-foreground/35">
          Connects with
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>

    {/* Full-bleed scrolling marquee */}
    <div className="mt-5 space-y-3">
      <MarqueeRow logos={[...aiPlatforms, ...merchantLogos.slice(0, 8)]} speed={35} />
      <MarqueeRow logos={[...merchantLogos.slice(8), ...aiPlatforms]} speed={40} reverse />
    </div>
  </section>
);

export default SocialProofSection;
