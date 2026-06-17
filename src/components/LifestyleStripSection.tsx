import { motion } from "framer-motion";
import lifestyleSkincare from "@/assets/lifestyle-skincare.jpg";
import lifestyleFragrance from "@/assets/lifestyle-fragrance.jpg";
import lifestyleFashion from "@/assets/lifestyle-fashion.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";

const images = [
  {
    src: lifestyleSkincare,
    alt: "Editorial skincare bottles on stone with directional sunlight",
    className: "w-[260px] md:w-[300px] lg:w-[320px]",
  },
  {
    src: lifestyleFragrance,
    alt: "Beauty products and fragrance photographed from above on a textured surface",
    className: "w-[420px] md:w-[520px] lg:w-[620px]",
  },
  {
    src: lifestyleFashion,
    alt: "Cropped editorial fashion detail in a neutral coat",
    className: "w-[300px] md:w-[380px] lg:w-[420px]",
  },
  {
    src: lifestyleTech,
    alt: "Consumer technology accessories on a warm desk surface",
    className: "w-[230px] md:w-[260px] lg:w-[280px]",
  },
];

const LifestyleStripSection = () => (
  <section aria-label="Parleo commerce context" className="relative overflow-hidden bg-background py-8 md:py-12">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex gap-4 overflow-x-auto pb-2 md:gap-5 md:overflow-visible md:pb-0"
      >
        {images.map((image) => (
          <figure
            key={image.alt}
            className={`${image.className} h-[250px] shrink-0 overflow-hidden rounded-lg border border-border/70 bg-secondary/50 md:h-[280px]`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(18%) contrast(1.04) saturate(0.9)", mixBlendMode: "multiply" }}
              loading="lazy"
              width={1024}
              height={1024}
            />
          </figure>
        ))}
      </motion.div>
    </div>
  </section>
);

export default LifestyleStripSection;