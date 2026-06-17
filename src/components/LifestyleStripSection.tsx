import { motion } from "framer-motion";
import lifestyleSkincare from "@/assets/lifestyle-skincare.jpg";
import lifestyleFragrance from "@/assets/lifestyle-fragrance.jpg";
import lifestyleFashion from "@/assets/lifestyle-fashion.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";

const tiles = [
  { src: lifestyleSkincare, label: "Beauty", index: "01" },
  { src: lifestyleFragrance, label: "Fragrance", index: "02" },
  { src: lifestyleFashion, label: "Apparel", index: "03" },
  { src: lifestyleTech, label: "Electronics", index: "04" },
];

const LifestyleStripSection = () => (
  <section
    aria-label="Parleo commerce verticals"
    className="relative bg-background py-20 md:py-28"
  >
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Left: editorial headline */}
        <div className="md:col-span-5 md:sticky md:top-24 md:self-start">
          <span className="font-mono text-[10px] tracking-[0.22em] text-foreground/45">
            VERTICALS / 04
          </span>
          <h2 className="mt-4 font-display text-[32px] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[44px]">
            The product worlds agents now shop on your behalf.
          </h2>
          <p className="mt-5 max-w-[380px] text-[15px] leading-[1.55] text-foreground/60">
            Beauty, fragrance, apparel, electronics. Parleo structures the catalog, pricing, and incentive layer agents need to transact in every vertical your customers buy from.
          </p>
        </div>

        {/* Right: 2x2 editorial mosaic with varied heights */}
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {tiles.map((t, i) => (
              <motion.figure
                key={t.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-[2px] bg-[#EAE8E5] ${
                  i === 0 ? "md:mt-10" : i === 3 ? "md:mt-10" : ""
                }`}
                style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : "3 / 4" }}
              >
                <img
                  src={t.src}
                  alt={t.label}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.03]"
                  style={{ filter: "saturate(0.92) contrast(1.02)" }}
                />
                <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 md:p-4">
                  <span className="rounded-full bg-background/85 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-foreground/75 backdrop-blur-[2px]">
                    {t.index} · {t.label.toUpperCase()}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* hairline divider at section close */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.08) 50%, transparent 100%)",
      }}
    />
  </section>
);

export default LifestyleStripSection;
