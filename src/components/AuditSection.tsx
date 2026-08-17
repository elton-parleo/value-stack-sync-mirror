import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import AuditScorecard from "./AuditScorecard";

const AUDIT_URL = "https://audit.parleo.io/";

const deliverables = [
  { title: "Agentic Value Score", copy: "One number for how much of your funded value survives into an agent's answer." },
  { title: "Ranked fixes", copy: "What to ship first, ordered by the value it puts back in the answer." },
  { title: "Dollar exposure", copy: "Modeled revenue sitting behind incentives agents can't resolve." },
];

const AuditSection = () => {
  const [url, setUrl] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = url.trim();
    window.location.href = clean
      ? `${AUDIT_URL}?url=${encodeURIComponent(clean)}`
      : AUDIT_URL;
  };

  return (
    <AnimatedSection id="audit" className="relative overflow-hidden py-14 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 45% at 12% 30%, hsl(213 99% 50% / 0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-content px-6 md:px-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <div>
            <SectionHeading
              body="Free, no login to start. We run your catalog through the same benchmark we use with merchants and show you what an agent quotes back."
              bodyMaxWidth="440px"
            >
              See what agents actually quote for your brand
            </SectionHeading>

            <form onSubmit={submit} className="mt-8 flex w-full max-w-[440px] flex-col gap-3 sm:flex-row">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourbrand.com"
                aria-label="Your brand domain"
                inputMode="url"
                className="h-12 flex-1 rounded-full border border-foreground/15 bg-card px-5 text-[15px] text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-primary/60"
              />
              <button
                type="submit"
                className="btn-lift group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground hover:bg-primary/90"
              >
                Run free audit
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>

            <div className="mt-9 flex flex-col divide-y divide-border border-t border-border">
              {deliverables.map((d) => (
                <div key={d.title} className="py-4">
                  <div className="card-subheading text-foreground">{d.title}</div>
                  <p className="mt-1 text-[13.5px] leading-[1.5] text-foreground/58">{d.copy}</p>
                </div>
              ))}
            </div>

            <a
              href={AUDIT_URL}
              className="mt-6 inline-flex items-center gap-2 text-[13.5px] text-foreground/55 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground"
            >
              See a sample report
            </a>
          </div>

          <AuditScorecard />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AuditSection;
