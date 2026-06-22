import { useState } from "react";
import { motion } from "framer-motion";

import ContactFormDialog from "./ContactFormDialog";
import HeroChatArtifact from "./hero/HeroChatArtifact";
import BrandLogo from "./BrandLogo";

const HeroSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      {/* fine architectural grid, masked to center */}
      <div aria-hidden className="bg-grid-fine pointer-events-none absolute inset-0 -z-0 opacity-60" />
      {/* subtle blue light burn, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(45% 50% at 85% 18%, hsl(213 99% 50% / 0.10) 0%, transparent 65%)",
        }}
      />
      {/* tiny floating geometric mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[18%] hidden h-1.5 w-1.5 rounded-full bg-foreground/15 animate-float md:block"
      />
      <div className="relative mx-auto flex w-full max-w-content flex-col gap-12 px-5 pb-16 pt-10 md:grid md:grid-cols-12 md:items-center md:gap-10 md:px-20 md:pb-24 md:pt-16">

        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <h1
            className="font-display text-[44px] tracking-[-0.045em] text-foreground md:text-[68px]"
            style={{ lineHeight: 1.02 }}
          >
            The{" "}
            <span className="relative inline-block">
              incentive
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] bg-[hsl(var(--accent-warm))]/70"
              />
            </span>{" "}
            layer for AI commerce.
          </h1>
          <p className="mt-6 max-w-[480px] text-[18px] leading-[1.6] text-foreground/65">
            Parleo makes loyalty programs, card-offers and true value of your products readable and transactable across every agent surface.
          </p>


          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setContactOpen(true)}
              className="btn-lift group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[14px] font-medium text-background hover:bg-foreground/90"
            >
              Request a demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="https://parleo.io/demo"
              className="btn-lift group inline-flex h-11 items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.04] px-5 text-[14px] font-medium text-foreground hover:border-primary/50 hover:bg-primary/[0.07]"
            >
              How it works
              <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border/60 pt-6">
            <span className="font-label text-foreground/45">Works with</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: "MCP", logo: "Anthropic" },
                { name: "ACP", logo: "Stripe" },
                { name: "OpenAPI", logo: "OpenAI" },
                { name: "UCP", logo: "Google" },
              ].map((p) => (
                <span
                  key={p.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[12px] font-medium text-foreground/75"
                >
                  <BrandLogo name={p.logo} size={13} grayscale />
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: artifact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-7"
        >
          <div className="mx-auto w-full max-w-[620px]">
            <HeroChatArtifact />
          </div>
        </motion.div>
      </div>

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default HeroSection;
