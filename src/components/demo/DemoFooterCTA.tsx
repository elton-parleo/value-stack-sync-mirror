import { useState } from "react";
import ContactFormDialog from "../ContactFormDialog";

const DemoFooterCTA = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        background: "radial-gradient(ellipse at center, hsl(213 99% 50%), transparent 70%)"
      }} />

      <div className="mx-auto max-w-[560px] px-6 text-center">
        <h2 className="font-display text-[32px] text-foreground md:text-[48px]">
          The true cost layer your agents are missing.
        </h2>
        <p className="mt-4 text-[17px] text-foreground/60" style={{ lineHeight: 1.7 }}>
          Ship agent-native commerce without building the data layer.
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {["38+ merchants", "<50ms", "60% token savings", "Zero PII"].map((s) => (
            <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-[13px] font-medium text-foreground/70" style={{ boxShadow: "var(--shadow-sm)" }}>
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => setContactOpen(true)}
            className="group inline-flex h-12 items-center gap-2 rounded-[4px] bg-primary px-7 text-[15px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97]"
            style={{ boxShadow: "0 4px 16px -4px hsl(213 99% 50% / 0.3)" }}
          >
            Request Demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Protocol badges */}
        <div className="mt-7 flex items-center justify-center gap-2">
          {["MCP", "ACP", "OpenAPI"].map((p) => (
            <span key={p} className="rounded-md border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-foreground/70">
              {p}
            </span>
          ))}
        </div>
      </div>

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default DemoFooterCTA;
