import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import heroImage from "@/assets/structural-gap-hero.jpg";

/* ───────────────────────────────────────────────────────────
   Section A · The structural gap
   Compact editorial: one image, one number, one sentence.
   ─────────────────────────────────────────────────────────── */

const StructuralGapSection = () => (
  <AnimatedSection id="structural-gap" className="relative bg-background py-20 md:py-28">
    <div className="mx-auto max-w-content px-6 md:px-20">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 border-t border-foreground/15 pt-10 md:pt-14">
        <span className="h-px w-8 bg-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          The structural gap
        </span>
      </div>

      <div className="mt-8 grid items-center gap-10 md:mt-12 md:grid-cols-12 md:gap-14">
        {/* Image */}
        <div className="md:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[14px]"
          >
            <img
              src={heroImage}
              alt="A luxury product beside a stack of currency, illustrating the value invisible to AI agents."
              width={1536}
              height={1280}
              loading="lazy"
              className="block h-auto w-full object-cover"
            />
            {/* Caption tag */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-foreground/70">
                What the agent can't see
              </span>
            </div>
          </motion.div>
        </div>

        {/* Statement */}
        <div className="md:col-span-6">
          <h2
            className="font-heading text-[34px] tracking-tight text-foreground md:text-[56px]"
            style={{ lineHeight: 1.04 }}
          >
            Half a trillion in commerce value.{" "}
            <span className="text-foreground/45">Invisible to the agent.</span>
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-foreground/15 pt-8">
            <div>
              <div className="font-display text-[40px] font-semibold leading-none tabular-nums text-primary md:text-[52px]">
                $545B+
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">
                Trade promo + retail media, annual
              </div>
            </div>
            <div>
              <div className="font-display text-[40px] font-semibold leading-none tabular-nums text-foreground md:text-[52px]">
                $0
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">
                Surfaced in the product feed agents read
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-md text-[15px] leading-[1.6] text-foreground/65">
            The two largest conversion investments in commerce never reach the model deciding what
            to recommend. Parleo closes that gap.
          </p>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

export default StructuralGapSection;
