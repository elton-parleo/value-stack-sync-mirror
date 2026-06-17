import { motion } from "framer-motion";
import lifestyleSkincare from "@/assets/lifestyle-skincare.jpg";
import lifestyleFragrance from "@/assets/lifestyle-fragrance.jpg";
import lifestyleFashion from "@/assets/lifestyle-fashion.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";

/**
 * Editorial backdrop band. Images are layered into the background of a
 * full-bleed section, faded into the page color via radial + linear masks,
 * never floating as cards. The whole band sits behind a quiet headline.
 */
const tiles = [
  { src: lifestyleSkincare, alt: "", area: "left", className: "left-[-4%] top-[8%] w-[28%]" },
  { src: lifestyleFragrance, alt: "", area: "center", className: "left-[28%] top-0 w-[42%]" },
  { src: lifestyleFashion, alt: "", area: "right-1", className: "right-[10%] top-[14%] w-[18%]" },
  { src: lifestyleTech, alt: "", area: "right-2", className: "right-[-4%] top-[6%] w-[20%]" },
];

const LifestyleStripSection = () => (
  <section
    aria-label="Parleo commerce verticals"
    className="relative overflow-hidden bg-background"
  >
    {/* full-bleed editorial backdrop, 320px tall on mobile / 460px on desktop */}
    <div className="relative h-[280px] w-full md:h-[440px]">
      {tiles.map((t, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute hidden md:block ${t.className}`}
          style={{ height: "100%" }}
        >
          <img
            src={t.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{
              opacity: 0.42,
              filter: "grayscale(35%) contrast(1.02) saturate(0.85)",
              mixBlendMode: "multiply",
              maskImage:
                "radial-gradient(60% 60% at 50% 50%, #000 0%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(60% 60% at 50% 50%, #000 0%, transparent 78%)",
            }}
          />
        </motion.div>
      ))}

      {/* mobile: single soft backdrop image, center-blended */}
      <div
        aria-hidden
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url(${lifestyleFragrance})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.32,
          filter: "grayscale(35%) contrast(1.02) saturate(0.85)",
          mixBlendMode: "multiply",
          maskImage:
            "radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 80%)",
        }}
      />

      {/* vertical fade-to-bg top/bottom so the band reads as continuous */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background)) 0%, transparent 18%, transparent 82%, hsl(var(--background)) 100%)",
        }}
      />

      {/* warm-cool subtle wash, restoring the blue light burn */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 78% 30%, hsl(213 99% 50% / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* eyebrow + headline floats inside */}
      <div className="relative z-10 mx-auto flex h-full max-w-content flex-col justify-center px-6 md:px-20">
        <span className="font-mono text-[10px] tracking-[0.22em] text-foreground/45">
          VERTICALS — BEAUTY · FRAGRANCE · APPAREL · ELECTRONICS
        </span>
        <h2 className="mt-3 max-w-[640px] font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[40px]">
          The product worlds agents now shop on your behalf.
        </h2>
      </div>
    </div>
  </section>
);

export default LifestyleStripSection;
