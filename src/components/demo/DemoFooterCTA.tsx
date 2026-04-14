import { useState } from "react";
import ContactFormDialog from "../ContactFormDialog";
import BrandLogo from "../BrandLogo";
import lifestylePortrait from "@/assets/lifestyle-editorial-portrait.jpg";

const DemoFooterCTA = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        background: "radial-gradient(ellipse at center, hsl(213 99% 50%), transparent 70%)"
      }} />

      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] items-center">
          {/* Editorial image */}
          <div className="hidden overflow-hidden rounded-lg md:block">
            <img
              src={lifestylePortrait}
              alt="Editorial fashion portrait"
              className="h-[260px] w-[200px] object-cover"
              style={{ filter: 'grayscale(30%) contrast(1.05)', mixBlendMode: 'multiply' }}
              loading="lazy"
              width={800}
              height={1024}
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="font-display text-[32px] text-foreground md:text-[48px]">
              The true cost layer your agents are missing.
            </h2>
            <p className="mt-3 max-w-[560px] text-[15px] text-foreground/60 md:text-[17px] md:mx-0 mx-auto" style={{ lineHeight: 1.7 }}>
              With Parleo, agents call a single /true-cost endpoint that returns normalized products, effective price, and ready-to-use rationales.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2">
              {["200+ merchants", "<50ms", "60% token savings", "Zero PII"].map((s) => (
                <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-[12px] font-medium text-foreground/70" style={{ boxShadow: "var(--shadow-sm)" }}>
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
              <button
                onClick={() => setContactOpen(true)}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-[14px] font-medium text-background transition-colors hover:bg-foreground/85 active:scale-[0.98]"
              >
                Request Demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {[
                  { name: "MCP", logo: "Anthropic" },
                  { name: "ACP", logo: "Stripe" },
                  { name: "OpenAPI", logo: "OpenAI" },
                ].map((p) => (
                  <span key={p.name} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-[12px] font-medium text-foreground/70">
                    <BrandLogo name={p.logo} size={12} />
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default DemoFooterCTA;
