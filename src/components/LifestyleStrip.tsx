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
  <section aria-hidden className="relative bg-background py-14 md:py-20">
    {/* hairline top */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.08) 50%, transparent 100%)",
      }}
    />
    {/* faint architectural grid wash */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground) / 0.045) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.045) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage:
          "radial-gradient(70% 80% at 50% 50%, #000 0%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(70% 80% at 50% 50%, #000 0%, transparent 80%)",
      }}
    />
    {/* cool light burn */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(40% 60% at 85% 50%, hsl(213 99% 50% / 0.07) 0%, transparent 70%), radial-gradient(35% 55% at 12% 50%, hsl(213 99% 50% / 0.05) 0%, transparent 70%)",
      }}
    />

    <div className="relative mx-auto max-w-content px-6 md:px-20">
      <div className="flex h-[180px] gap-2 md:h-[220px] md:gap-3">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
            {/* hairline inner border */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.06]"
            />
          </motion.div>
        ))}
      </div>
    </div>

    {/* hairline bottom */}
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

export default LifestyleStrip;
