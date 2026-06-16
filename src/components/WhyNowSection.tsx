import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import lifestyleVanity from "@/assets/lifestyle-vanity.jpg";
import lifestyleUnboxing from "@/assets/lifestyle-unboxing.jpg";
import lifestyleRetail from "@/assets/lifestyle-retail-moment.jpg";

const WhyNowSection = () => (
  <AnimatedSection id="why-now" className="relative bg-background py-16 md:py-24">
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-14">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
            Why now
          </span>
          <h2
            className="mt-3 font-heading text-[32px] text-foreground md:text-[52px]"
            style={{ lineHeight: 1.05 }}
          >
            The early-mover advantage is closing fast.
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-foreground/65 md:text-[19px]">
            Agents anchor on the merchants they surface first. Those defaults are being set right now, query by query.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-3 gap-2"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-md">
            <img
              src={lifestyleVanity}
              alt="Editorial vanity composition"
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(20%) contrast(1.05)" }}
              loading="lazy"
            />
          </div>
          <div className="mt-8 aspect-[3/4] overflow-hidden rounded-md">
            <img
              src={lifestyleRetail}
              alt="Retail interior, architectural framing"
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(20%) contrast(1.05)" }}
              loading="lazy"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden rounded-md">
            <img
              src={lifestyleUnboxing}
              alt="Unboxing, close-up"
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(20%) contrast(1.05)" }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatedSection>
);

export default WhyNowSection;
