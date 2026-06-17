import { motion } from "framer-motion";
import lifestyleSkincare from "@/assets/lifestyle-skincare.jpg";
import lifestyleFragrance from "@/assets/lifestyle-fragrance.jpg";
import lifestyleFashion from "@/assets/lifestyle-fashion.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";
import lifestyleVanity from "@/assets/lifestyle-vanity.jpg";

type Tile = {
  src: string;
  alt: string;
  label: string;
  index: string;
  /** desktop column span out of 12 */
  col: string;
  /** desktop height */
  h: string;
  /** desktop vertical offset for editorial rhythm */
  offset?: string;
  ratio: string;
};

const tiles: Tile[] = [
  {
    src: lifestyleSkincare,
    alt: "Editorial skincare bottles on stone with directional sunlight",
    label: "Skincare",
    index: "01",
    col: "md:col-span-3",
    h: "h-[220px] md:h-[300px]",
    offset: "md:mt-10",
    ratio: "aspect-[4/5]",
  },
  {
    src: lifestyleFragrance,
    alt: "Fragrance still life, warm side light",
    label: "Fragrance",
    index: "02",
    col: "md:col-span-5",
    h: "h-[240px] md:h-[360px]",
    ratio: "aspect-[16/10]",
  },
  {
    src: lifestyleFashion,
    alt: "Cropped editorial fashion detail in a neutral coat",
    label: "Apparel",
    index: "03",
    col: "md:col-span-2",
    h: "h-[200px] md:h-[260px]",
    offset: "md:mt-16",
    ratio: "aspect-[3/4]",
  },
  {
    src: lifestyleTech,
    alt: "Consumer technology accessories on a warm desk surface",
    label: "Electronics",
    index: "04",
    col: "md:col-span-2",
    h: "h-[180px] md:h-[220px]",
    offset: "md:mt-4",
    ratio: "aspect-square",
  },
];

const LifestyleStripSection = () => (
  <section
    aria-label="Parleo commerce context"
    className="relative overflow-hidden bg-background py-16 md:py-24"
  >
    {/* faded mega background image, layered behind everything */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        backgroundImage: `url(${lifestyleVanity})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        opacity: 0.08,
        filter: "grayscale(40%) contrast(1.05)",
        maskImage:
          "radial-gradient(80% 60% at 50% 40%, #000 0%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(80% 60% at 50% 40%, #000 0%, transparent 78%)",
      }}
    />

    <div className="relative mx-auto max-w-content px-6 md:px-20">
      {/* eyebrow */}
      <div className="mb-8 flex items-baseline gap-4 md:mb-10">
        <span className="font-mono text-[10px] tracking-[0.22em] text-foreground/40">
          FIG. 02 / VERTICALS
        </span>
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-[10px] tracking-[0.22em] text-foreground/40">
          BEAUTY · FRAGRANCE · APPAREL · ELECTRONICS
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5"
      >
        {tiles.map((t, i) => (
          <motion.figure
            key={t.alt}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`group relative ${t.col} ${t.offset ?? ""}`}
          >
            <div
              className={`relative overflow-hidden rounded-lg border border-border/70 bg-secondary/50 ${t.h}`}
            >
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                style={{
                  filter: "grayscale(30%) contrast(1.04) saturate(0.85)",
                }}
              />
              {/* color restoration on hover */}
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                style={{
                  backgroundImage: `url(${t.src})`,
                  filter: "contrast(1.05) saturate(1)",
                }}
              />
              {/* warm bottom wash */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/30 via-foreground/0 to-transparent opacity-60"
              />
              {/* label badge */}
              <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 text-background">
                <span className="font-mono text-[10px] tracking-[0.18em] opacity-70">
                  {t.index}
                </span>
                <span className="h-px w-4 bg-background/40" />
                <span className="text-[12px] font-medium tracking-tight">
                  {t.label}
                </span>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  </section>
);

export default LifestyleStripSection;
