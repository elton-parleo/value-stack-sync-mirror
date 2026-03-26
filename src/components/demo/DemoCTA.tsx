import { useState } from "react";
import ContactFormDialog from "@/components/ContactFormDialog";
import AnimatedSection from "@/components/AnimatedSection";

const DemoCTA = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <AnimatedSection className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-content px-6 md:px-20 text-center">
        <h2 className="font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
          38 merchants. 3 protocols. One call.
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.7] text-foreground/50 md:text-[17px]">
          Parleo is live and indexing loyalty programs, card offers, and incentive logic across beauty, outdoor, electronics, and more. Refreshed hourly.
        </p>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-[700px] grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "MERCHANTS", value: "38+" },
            { label: "RESPONSE TIME", value: "<50ms" },
            { label: "TOKEN SAVINGS", value: "60%" },
            { label: "PII TRANSMITTED", value: "Zero" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="text-[22px] font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-parleo-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setContactOpen(true)}
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-[4px] bg-primary px-8 text-[15px] font-medium text-primary-foreground transition-all hover:opacity-[0.88] active:scale-[0.97]"
          style={{ boxShadow: "0 2px 12px -3px hsl(213 99% 50% / 0.35)" }}
        >
          Request Demo
        </button>

        {/* Protocol badges */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-[13px] text-parleo-muted">Works with</span>
          {["MCP", "ACP", "OpenAPI"].map((p) => (
            <span key={p} className="rounded-md border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-foreground/70">
              {p}
            </span>
          ))}
        </div>
      </div>
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </AnimatedSection>
  );
};

export default DemoCTA;
