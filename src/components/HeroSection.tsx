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
      <div className="relative mx-auto flex w-full max-w-content flex-col gap-12 px-5 pb-16 pt-10 md:grid md:grid-cols-12 md:items-center md:gap-14 md:px-20 md:pb-24 md:pt-16">
        {/* Left: copy */}
        <div className="md:col-span-6">
          <h1
            className="font-display text-[36px] text-foreground md:text-[44px] lg:text-[52px]"
            style={{ lineHeight: 1.02, letterSpacing: '-0.035em', textWrap: 'balance', hyphens: 'none', overflowWrap: 'normal' }}
          >
            Your true price is{' '}
            <span className="text-primary" style={{ fontStyle: 'italic', fontWeight: 500 }}>invisible</span>
            {' '}to AI agents recommending you.
          </h1>


          <p className="mt-7 max-w-[500px] text-[19px] leading-[1.55] text-foreground/65">
            Parleo scores, tracks, and optimizes how pricing, promotions, and incentives perform when AI agents decide where to buy.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setContactOpen(true)}
              className="btn-lift group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background hover:bg-foreground/90"
            >
              Request a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="https://parleo.io/demo"
              className="btn-lift group inline-flex h-12 items-center gap-2 rounded-full border border-foreground/15 bg-transparent px-6 text-[15px] font-medium text-foreground hover:border-foreground/30 hover:bg-foreground/[0.03]"
            >
              How it works
              <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">→</span>
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
