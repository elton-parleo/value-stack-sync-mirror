import { useState } from "react";
import { Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import AuditScorecard from "./AuditScorecard";

const AUDIT_URL = "https://parleo.io/audit/";
const SAMPLE_REPORT = "https://parleo.io/audit/r/b41eb69930a14d97b2a7e7a306a17440";

const deliverables = [
  { n: "01", label: "Per retailer price truth", copy: "Every price, promo, and loyalty offset an agent can resolve today." },
  { n: "02", label: "Feed diagnostics", copy: "What agents parse, what they skip, and where the structure breaks." },
  { n: "03", label: "Recoverable points", copy: "The exact fixes ranked by score impact, heaviest first." },
];

const AuditSection = () => {
  const [url, setUrl] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const domain = url.trim();
    window.location.href = domain ? `${AUDIT_URL}?url=${encodeURIComponent(domain)}` : AUDIT_URL;
  };

  return (
    <AnimatedSection id="audit" className="relative max-w-full overflow-hidden border-y border-border py-14 md:py-20">
      {/* soft blue light burn, orthographic and flat */}
      <div
        className="pointer-events-none hidden h-[520px] w-[620px] opacity-[0.07] lg:block"
        style={{
          position: "absolute",
          right: "-10rem",
          top: 0,
          background: "radial-gradient(closest-side, hsl(213 99% 50%), transparent 72%)",
        }}
        aria-hidden
      />


      <div className="relative mx-auto min-w-0 max-w-content px-6 md:px-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:gap-16">
          <div className="min-w-0 max-w-[540px]">
            <h2 className="section-heading text-foreground">Score how agents read your brand</h2>
            <p className="section-copy mt-5 max-w-[440px]">
              One Free Agentic Audit returns a 100 point readiness score across visibility, accessibility, and true value.
            </p>

            <form onSubmit={submit} className="mt-8 max-w-[460px]">
              <label htmlFor="audit-domain" className="sr-only">Brand domain</label>
              <div className="flex min-w-0 items-center gap-2 border-b border-foreground/25 pb-2.5 transition-colors focus-within:border-primary">
                <span className="font-mono text-[12px] text-muted-foreground">https://</span>
                <input
                  id="audit-domain"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="yourbrand.com"
                  inputMode="url"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-foreground/35"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-base btn-primary group">
                  Free Agentic Audit
                  <span data-slot="arrow" aria-hidden>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <a href={SAMPLE_REPORT} target="_blank" rel="noreferrer" className="link-more">
                  <span data-rule />
                  See a sample report
                </a>
              </div>
            </form>

            <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-success" /> No login to start
            </span>

            {/* what the report returns */}
            <dl className="mt-10 border-t border-foreground/10">
              {deliverables.map((d) => (
                <div key={d.n} className="flex gap-5 border-b border-foreground/10 py-4">
                  <span className="mt-[3px] font-mono text-[10.5px] tracking-[0.12em] text-primary">{d.n}</span>
                  <div className="min-w-0">
                    <dt className="text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">{d.label}</dt>
                    <dd className="mt-1 text-[12.5px] leading-[1.5] text-foreground/55">{d.copy}</dd>
                  </div>
                </div>
              ))}
            </dl>

          </div>

          <div className="relative min-w-0 max-w-full lg:pt-2">
            <AuditScorecard />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AuditSection;
