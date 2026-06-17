import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ContactFormDialog from "./ContactFormDialog";

const CTASection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <AnimatedSection id="cta" className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#0E0E14] px-8 py-14 md:px-16 md:py-20"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(213 99% 50% / 0.28) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          {/* Grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <h2
                className="font-display text-[44px] font-medium text-white md:text-[72px]"
                style={{ lineHeight: 0.98 }}
              >
                Be the answer agents recommend.
              </h2>
              <p className="mt-5 max-w-[520px] text-[16px] leading-[1.65] text-white/65 md:text-[17px]">
                Working with a small group of merchants and infra teams setting the defaults for agentic commerce.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <button
                onClick={() => setContactOpen(true)}
                className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-7 text-[14px] font-medium text-[#0E0E14] transition-all hover:bg-white/90 active:scale-[0.98]"
              >
                Request a demo
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-60 transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <a
                href="#architecture"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-7 text-[14px] font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="opacity-70">
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                For developers
              </a>
              <div className="mt-2 flex items-center gap-4 text-[11px] text-white/40 md:justify-end">
                <span>Zero PII</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{"<"}50ms</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>SOC 2 in progress</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </AnimatedSection>
  );
};

export default CTASection;
