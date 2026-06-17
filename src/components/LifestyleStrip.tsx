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
  <section aria-hidden className="bg-background py-10 md:py-14">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="flex h-[180px] gap-2 md:h-[220px] md:gap-3">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative flex-1 overflow-hidden rounded-[2px] bg-[#EAE8E5] ${t.flex}`}
          >
            <img
              src={t.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-all duration-[1100ms] ease-out group-hover:scale-[1.06]"
              style={{ filter: "saturate(0.9) contrast(1.02)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-foreground/10 opacity-100 transition-opacity duration-500 group-hover:opacity-0"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LifestyleStrip;
