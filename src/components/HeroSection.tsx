import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LiveDataWidget from "./LiveDataWidget";
import ContactFormDialog from "./ContactFormDialog";
import BrandLogo from "./BrandLogo";
import lifestyleSkincare from "@/assets/lifestyle-skincare.jpg";
import lifestyleBeauty from "@/assets/lifestyle-beauty-flatlay.jpg";
import lifestyleFashion from "@/assets/lifestyle-fashion.jpg";
import lifestyleTech from "@/assets/lifestyle-tech.jpg";

const FloatingIcon = ({ children, className, delay = 0 }: {children: React.ReactNode;className?: string;delay?: number;}) =>
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  className={`absolute hidden md:flex items-center justify-center rounded-xl border border-border bg-card ${className}`}
  style={{ boxShadow: 'var(--shadow-md)' }}
  whileHover={{ scale: 1.1 }}>
    <motion.div
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  </motion.div>;

const productImages = [
  { src: lifestyleSkincare, alt: "Luxury skincare textures", label: "Skincare" },
  { src: lifestyleBeauty, alt: "Beauty cosmetics flat lay", label: "Beauty" },
  { src: lifestyleFashion, alt: "Designer fashion", label: "Fashion" },
  { src: lifestyleTech, alt: "Premium tech", label: "Tech" },
];

const HeroSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="hero" className="section-grid relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute -right-[300px] -top-[100px] h-[700px] w-[700px] rounded-full opacity-[0.07]" style={{
        background: 'radial-gradient(circle, hsl(213 99% 50%) 0%, transparent 70%)'
      }} />
      <div className="diffusion-glow pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2" />

      <FloatingIcon className="left-[8%] top-[18%] h-10 w-10" delay={0.4}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </FloatingIcon>
      <FloatingIcon className="right-[6%] top-[12%] h-9 w-9" delay={0.6}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5" opacity="0.6">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
      </FloatingIcon>
      <FloatingIcon className="left-[12%] bottom-[22%] h-8 w-8" delay={0.8}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5" opacity="0.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </FloatingIcon>

      <div className="mx-auto flex w-full max-w-content flex-col px-5 pb-6 pt-6 md:flex-row md:items-center md:justify-between md:px-20 md:pb-10 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[560px]">

          {/* Status badge — linked to demo */}
          <Link to="/demo">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 transition-colors hover:border-primary/30 hover:bg-primary/[0.03] cursor-pointer"
              style={{ boxShadow: 'var(--shadow-sm)' }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-[11px] font-medium text-foreground/60">Honey for Agents · Live</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.div>
          </Link>

          <h1 className="font-display text-[44px] text-foreground md:text-[64px]" style={{ lineHeight: 1.05 }}>
            The incentive layer<br />for AI commerce.
          </h1>
          <p className="mt-4 max-w-[460px] text-[16px] leading-[1.7] text-foreground/65 md:text-[17px]">
            Parleo gives agents a pre-computed true-cost and product-intelligence layer in a single API call. Your loyalty programs, card offers, and real value: readable and transactable.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setContactOpen(true)}
              className="group inline-flex h-11 items-center gap-2 rounded-[4px] bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97]"
              style={{ boxShadow: '0 2px 12px -3px hsl(213 99% 50% / 0.35)' }}>
              Request Demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link
              to="/demo"
              className="group relative inline-flex h-11 items-center gap-2 rounded-[4px] border border-accent-warm/40 bg-accent-warm/[0.06] px-6 text-[15px] font-medium text-foreground transition-all hover:border-accent-warm/60 hover:bg-accent-warm/[0.1] active:scale-[0.97] animate-glow-pulse"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-warm animate-pulse-dot" />
              How it Works
            </Link>
          </div>

          {/* Protocol badges */}
          <div className="mt-7 flex items-center gap-3">
            <span className="text-[13px] text-foreground/50">Works with</span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "MCP", logo: "Anthropic" },
                { name: "ACP", logo: "Stripe" },
                { name: "OpenAPI", logo: "OpenAI" },
                { name: "UCP", logo: "Google" },
              ].map((p) => (
                <span key={p.name} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-foreground/70">
                  <BrandLogo name={p.logo} size={14} />
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right side: Live widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 md:mt-0 md:block">
          <LiveDataWidget />
        </motion.div>
      </div>

      {/* Editorial product image strip */}
      <div className="mx-auto w-full max-w-content px-5 pb-10 md:px-20 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex gap-2 md:gap-3"
          style={{ height: 'clamp(160px, 18vw, 220px)' }}
        >
          {productImages.map((img, i) => {
            const flexValues = ['1.2', '1.8', '1.5', '1'];
            return (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                className="group relative overflow-hidden rounded-lg"
                style={{ flex: flexValues[i] }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'grayscale(15%) contrast(1.05)', mixBlendMode: 'multiply' }}
                  loading="lazy"
                  width={800}
                  height={1024}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="decorative-line" />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>);
};

export default HeroSection;
