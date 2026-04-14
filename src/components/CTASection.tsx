import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ContactFormDialog from "./ContactFormDialog";
import lifestyleRetail from "@/assets/lifestyle-retail-moment.jpg";

const CTASection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <AnimatedSection id="cta" className="relative overflow-hidden py-10 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        background: 'radial-gradient(ellipse at center, hsl(213 99% 50%), transparent 70%)'
      }} />

      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[560px]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-display text-[32px] text-foreground md:text-[48px]">
              Be visible to every agent.
            </h2>
            <p className="mt-3 text-[15px] text-foreground/55 md:text-[17px]" style={{ lineHeight: 1.7 }}>
              Working with merchants getting ahead of the agentic shift.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setContactOpen(true)}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-[14px] font-medium text-background transition-colors hover:bg-foreground/85 active:scale-[0.98]"
              >
                Request Demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Editorial accent image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="overflow-hidden rounded-2xl"
          >
            <img
              src={lifestyleRetail}
              alt="Luxury retail moment"
              className="h-[180px] w-full object-cover md:h-[280px] md:w-[220px]"
              style={{ filter: 'grayscale(30%) contrast(1.05)', mixBlendMode: 'multiply' }}
              loading="lazy"
              width={1024}
              height={800}
            />
          </motion.div>
        </div>
      </div>
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </AnimatedSection>
  );
};

export default CTASection;
