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
      <div className="relative mx-auto flex w-full max-w-content flex-col gap-12 px-5 pb-14 pt-10 md:grid md:grid-cols-12 md:items-start md:gap-10 md:px-8 md:pb-20 md:pt-14 lg:gap-14 lg:px-20">
        {/* Left: copy */}
        <div className="md:col-span-6">
          <h1
            className="font-display text-[44px] text-foreground md:text-[60px] lg:text-[72px]"
            style={{ lineHeight: 0.98, letterSpacing: '-0.04em', textWrap: 'balance', hyphens: 'none', overflowWrap: 'normal' }}
          >
            Your true value is{' '}
            <span className="text-primary" style={{ fontStyle: 'italic', fontWeight: 500 }}>invisible</span>
            {' '}to AI agents.
          </h1>


          <p className="mt-7 max-w-[460px] text-[15px] leading-[1.6] text-foreground/60 md:text-[16px]">
            Parleo scores, tracks, and optimizes how pricing, promotions, and incentives perform when{' '}
            <span className="relative whitespace-nowrap text-foreground/80">
              AI agents
              <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-px bg-primary/40" />
            </span>{' '}
            decide where to buy.
          </p>


          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="https://audit.parleo.io/" className="btn-base btn-primary group">
              Run your free audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-90 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button onClick={() => setContactOpen(true)} className="btn-base btn-secondary">
              Request a demo
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px] text-foreground/45">
            <span>Free</span>
            <span className="h-1 w-1 rounded-full bg-foreground/20" />
            <span>No email to start</span>
            <span className="h-1 w-1 rounded-full bg-foreground/20" />
            <span>Ready in 10 to 20 minutes</span>
            <a href="#audit" className="link-more">
              <span data-rule />
              How the score works
            </a>
          </div>



          <div className="mt-12 flex flex-col gap-3 border-t border-foreground/10 pt-6">
            <span className="font-label text-[10px] tracking-[0.22em] text-foreground/40">
              WORKS WITH
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "MCP", logo: "Anthropic" },
                { name: "ACP", logo: "Stripe" },
                { name: "OpenAPI", logo: "OpenAI" },
                { name: "UCP", logo: "Google" },
              ].map((p) => (
                <span
                  key={p.name}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/70 backdrop-blur-sm px-3 py-1.5 text-[12.5px] font-medium text-foreground/80 transition-colors hover:border-foreground/25"
                >
                  <BrandLogo name={p.logo} size={14} grayscale />
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>


        {/* Right: artifact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-6"
        >
          <div className="mx-auto w-full max-w-[580px]">
            <HeroChatArtifact />
          </div>
        </motion.div>

      </div>

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default HeroSection;
