import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ContactFormDialog from "./ContactFormDialog";

const CTASection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <AnimatedSection id="cta" className="relative overflow-hidden py-14 md:py-20">
      <div className="mx-auto max-w-content px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="atmos-cool-dark relative overflow-hidden rounded-3xl bg-code-bg px-8 py-14 md:px-16 md:py-20"
        >
          {/* faint dot texture — architectural, not decorative */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(hsl(0 0% 100%) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(80% 70% at 50% 40%, #000 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(80% 70% at 50% 40%, #000 0%, transparent 75%)",
            }}
          />
          <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <h2 className="section-heading section-heading-dark">
                Be the answer agents recommend
              </h2>
              <p className="section-copy section-copy-dark mt-5 max-w-[520px]">
                Working with a small group of merchants and infra teams setting the defaults for agentic commerce.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="https://parleo.io/audit/"
                className="btn-base btn-primary group"
              >
                Free Agentic Audit
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-90 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                onClick={() => setContactOpen(true)}
                className="btn-base inline-flex border border-background/20 bg-background/[0.05] text-background/85 transition-all hover:-translate-y-[1.5px] hover:border-background/40 hover:bg-background/[0.1]"
              >
                Request a demo
              </button>

              <a
                href="https://parleo.io/audit/r/b41eb69930a14d97b2a7e7a306a17440"
                className="text-[13px] text-background/50 underline decoration-background/25 underline-offset-4 transition-colors hover:text-background"
              >
                How it works
              </a>

              <div className="mt-2 flex items-center gap-4 text-[11px] text-background/40 md:justify-end">
                <span>Zero PII</span>
                <span className="h-1 w-1 rounded-full bg-background/20" />
                <span>{"<"}50ms</span>
                <span className="h-1 w-1 rounded-full bg-background/20" />
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
