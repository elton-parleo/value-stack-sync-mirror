import { motion } from "framer-motion";
import lifestyleSkincare from "@/assets/lifestyle-skincare.jpg";
import lifestyleFragrance from "@/assets/lifestyle-fragrance.jpg";
import lifestyleFashion from "@/assets/lifestyle-fashion.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";

const tiles = [
  { src: lifestyleSkincare, flex: "md:flex-[1.6]" },
  { src: lifestyleFragrance, flex: "md:flex-[2.4]" },
  { src: lifestyleFashion, flex: "md:flex-[1.2]" },
  { src: lifestyleTech, flex: "md:flex-[1.8]" },
];

const LifestyleStrip = () => (
  <section aria-label="Field" className="relative bg-background py-20 md:py-28">
    <div className="relative mx-auto max-w-content px-6 md:px-20">
      {/* Editorial chrome */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-4 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45 tabular-nums">
            05 <span className="text-foreground/25">/</span>{" "}
            <span className="text-foreground/55">Field</span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/35 sm:inline">
            Where this lives
          </span>
        </div>
        <div
          aria-hidden
          className="h-px w-full"
          style={{ background: "hsl(var(--border) / 0.85)" }}
        />
      </motion.div>

      <div className="mt-10 flex h-[180px] gap-2 md:mt-14 md:h-[240px] md:gap-3">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative flex-1 overflow-hidden bg-[#EAE8E5] ${t.flex}`}
          >
            <img
              src={t.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04]"
              style={{ filter: "saturate(0.55) contrast(1.02)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-foreground/10 transition-opacity duration-[900ms] group-hover:opacity-0"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.06]"
            />
          </motion.div>
        ))}
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/40">
        Beauty counters. Apparel floors. Loyalty desks. Checkout.
      </p>
    </div>
  </section>
);

export default LifestyleStrip;
