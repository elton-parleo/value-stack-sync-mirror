import { motion } from "framer-motion";
import editorialPortrait from "@/assets/lifestyle-editorial-portrait.jpg";
import retailMoment from "@/assets/lifestyle-retail-moment.jpg";

const EditorialBreakSection = () => (
  <section aria-label="Brand moment" className="atmos-warm relative bg-background py-20 md:py-28">
    {/* faint architectural dot field in the top-right quadrant */}
    <div
      aria-hidden
      className="texture-dots-faint pointer-events-none absolute right-0 top-0 hidden h-[260px] w-[40%] md:block"
      style={{
        maskImage: "linear-gradient(225deg, #000 0%, transparent 70%)",
        WebkitMaskImage: "linear-gradient(225deg, #000 0%, transparent 70%)",
      }}
    />
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
        {/* Left: tall editorial portrait */}
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative md:col-span-5"
        >
          <div className="overflow-hidden rounded-lg border border-border/70 bg-secondary/40">
            <img
              src={editorialPortrait}
              alt="Editorial portrait, cropped"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
              style={{ filter: "grayscale(15%) contrast(1.04) saturate(0.92)", mixBlendMode: "multiply" }}
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-3 font-label text-foreground/45">
            <span className="font-mono text-[10px] tracking-[0.18em]">FIG. 01</span>
            <span className="h-px w-8 bg-border" />
            <span>The consumer the agent shops for</span>
          </figcaption>
        </motion.figure>

        {/* Right: pull-quote + secondary image */}
        <div className="md:col-span-7 md:pl-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="font-display text-[28px] leading-[1.18] tracking-[-0.01em] text-foreground md:text-[40px]"
          >
            <span className="text-foreground/35">&ldquo;</span>
            Agents will negotiate, compare and transact on behalf of every shopper. The brands that win are the ones whose true value is legible to them.
            <span className="text-foreground/35">&rdquo;</span>
          </motion.blockquote>

          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="group mt-8 overflow-hidden rounded-lg border border-border/70 bg-secondary/40"
          >
            <img
              src={retailMoment}
              alt="Retail moment, editorial framing"
              loading="lazy"
              className="aspect-[16/9] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              style={{ filter: "grayscale(12%) contrast(1.04) saturate(0.92)", mixBlendMode: "multiply" }}
            />
          </motion.figure>
        </div>
      </div>
    </div>
  </section>
);

export default EditorialBreakSection;
