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

const MarqueeRow = ({ logos, speed = 30, reverse = false }: { logos: string[]; speed?: number; reverse?: boolean }) => {
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
  <section className="relative overflow-hidden bg-background py-8 md:py-10">

    {/* Full-bleed scrolling marquee */}
    <div className="space-y-3">
      <MarqueeRow logos={[...aiPlatforms, ...merchantLogos.slice(0, 8)]} speed={35} />
      <MarqueeRow logos={[...merchantLogos.slice(8), ...aiPlatforms]} speed={40} reverse />
    </div>
  </section>
);

export default SocialProofSection;
