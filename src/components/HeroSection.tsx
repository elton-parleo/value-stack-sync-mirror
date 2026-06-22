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
      <div className="relative mx-auto flex w-full max-w-content flex-col gap-12 px-5 pb-16 pt-10 md:grid md:grid-cols-12 md:items-center md:gap-10 md:px-20 md:pb-24 md:pt-16">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          {/* Editorial chrome */}
          <div className="flex items-center justify-between gap-4 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45 tabular-nums">
              00 <span className="text-foreground/25">/</span>{" "}
              <span className="text-foreground/55">Parleo</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/35 sm:inline">
              Field guide / 2026
            </span>
          </div>
          <div
            aria-hidden
            className="h-px w-full"
            style={{ background: "hsl(var(--border) / 0.85)" }}
          />

          <h1
            className="mt-8 font-display text-[44px] text-foreground md:text-[68px]"
            style={{ lineHeight: 1.02, letterSpacing: "-0.045em" }}
          >
            The incentive layer for AI commerce.
          </h1>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-foreground/70">
            Parleo makes loyalty programs, card-offers and true value of your products readable and transactable across every agent surface.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
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
              className="link-reveal group inline-flex items-center gap-2 text-[13px] font-medium text-foreground/75 hover:text-foreground"
            >
              <span className="font-mono text-[11px] text-foreground/40">→</span>
              How it works
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
            <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/40">
              Fig. 01 · Agent response with Parleo true-cost layer
            </p>
          </div>
        </motion.div>
      </div>


      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default HeroSection;
