import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ContactFormDialog from "./ContactFormDialog";
import wavePattern from "@/assets/wave-pattern.png";
import lifestyleRetail from "@/assets/lifestyle-retail-moment.jpg";

const CTASection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <AnimatedSection id="cta" className="relative overflow-hidden py-10 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        background: 'radial-gradient(ellipse at center, hsl(213 99% 50%), transparent 70%)'
      }} />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-[0.12]">
        <img src={wavePattern} alt="" className="w-full" loading="lazy" />
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[10%] top-[20%] hidden md:block"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card opacity-40" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute right-[12%] top-[30%] hidden md:block"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card opacity-30" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
      </motion.div>

      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src={lifestyleRetail} alt="" className="h-full w-full object-cover opacity-[0.06]" />
      </div>

      <div className="mx-auto max-w-content px-6 md:px-20">
        <div>
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
            <p className="mt-3 text-[17px] text-foreground/55" style={{ lineHeight: 1.7 }}>
              Working with merchants getting ahead of the agentic shift.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setContactOpen(true)}
                className="group inline-flex h-12 items-center gap-2 rounded-[4px] bg-primary px-7 text-[15px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97]"
                style={{ boxShadow: '0 4px 16px -4px hsl(213 99% 50% / 0.3)' }}
              >
                Request Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>

          
        </div>
      </div>
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </AnimatedSection>
  );
};

export default CTASection;
