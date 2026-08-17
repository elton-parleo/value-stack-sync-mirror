import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import AuditScorecard from "./AuditScorecard";
import BrandLogo from "./BrandLogo";

const AUDIT_URL = "https://audit.parleo.io/";
const SAMPLE_URL = "https://audit.parleo.io/r/b41eb69930a14d97b2a7e7a306a17440";

const deliverables = [
  {
    n: "01",
    title: "Agentic Value Score",
    copy: "One number out of 100, scored across three pillars. The readiness bar sits at 60.",
    meta: "0 to 100",
  },
  {
    n: "02",
    title: "Ranked fixes",
    copy: "What to ship first, ordered by the points and the value each one puts back in the answer.",
    meta: "3 in priority order",
  },
  {
    n: "03",
    title: "Dollar exposure",
    copy: "Modeled revenue sitting behind incentives agents cannot resolve today.",
    meta: "Modeled annually",
  },
];

const pillarWeights = [
  { name: "Visibility", pts: 32, note: "Whether agents mention you at all" },
  { name: "Accessibility", pts: 18, note: "Whether they can read your pages" },
  { name: "True Value", pts: 50, note: "Whether they can quote your real price", own: true },
];

const audited = ["allbirds.com", "nike.com", "sephora.com", "patagonia.com", "bestbuy.com", "ulta.com", "lululemon.com", "dyson.com"];

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
              body="Free, no login to start. We test ChatGPT across the purchase funnel, then simulate how agents crawl your site and read your offers."
              bodyMaxWidth="440px"
            >
              See what agents actually quote for your brand
            </SectionHeading>

            <form onSubmit={submit} className="mt-8 flex w-full max-w-[460px] flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 font-mono text-[13px] text-foreground/30">
                  https://
                </span>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="yourbrand.com"
                  aria-label="Your brand domain"
                  inputMode="url"
                  className="h-12 w-full rounded-full border border-foreground/15 bg-card pl-[74px] pr-5 text-[15px] text-foreground shadow-[inset_0_1px_2px_0_hsl(243_10%_30%/0.05)] outline-none transition-all placeholder:text-foreground/35 focus:border-primary/60 focus:shadow-[0_0_0_4px_hsl(213_99%_50%/0.10)]"
                />
              </div>
              <button type="submit" className="btn-base btn-primary group">
                Run free audit
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px] text-foreground/45">
              <span>Measured on</span>
              <BrandLogo name="OpenAI" size={13} grayscale />
              <span className="text-foreground/60">ChatGPT</span>
              <span className="h-1 w-1 rounded-full bg-foreground/20" />
              <span>Gemini, Perplexity and Claude in the full analysis</span>
            </div>

            {/* what you get */}
            <div className="mt-9 flex flex-col divide-y divide-border border-t border-border">
              {deliverables.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group grid grid-cols-[28px_1fr] gap-4 py-4 transition-colors"
                >
                  <span className="mt-[3px] font-mono text-[11px] tabular-nums text-foreground/35 transition-colors group-hover:text-primary">
                    {d.n}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <div className="card-subheading text-foreground">{d.title}</div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/35">
                        {d.meta}
                      </span>
                    </div>
                    <p className="mt-1 text-[13.5px] leading-[1.5] text-foreground/58">{d.copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* scoring weights, in sync with the audit tool */}
            <div className="mt-8 rounded-2xl border border-border bg-card/70 p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                  How the 100 points split
                </span>
                <span className="font-mono text-[10px] tabular-nums text-foreground/40">Bar 60</span>
              </div>
              <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-foreground/[0.08]">
                {pillarWeights.map((p) => (
                  <motion.div
                    key={p.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.pts}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full ${p.own ? "bg-primary" : "bg-foreground/25"} ${p.own ? "" : "border-r border-background/60"}`}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {pillarWeights.map((p) => (
                  <div key={p.name} className="flex items-baseline gap-3">
                    <span className={`h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-sm ${p.own ? "bg-primary" : "bg-foreground/25"}`} />
                    <span className={`text-[13px] font-medium ${p.own ? "text-primary" : "text-foreground/80"}`}>
                      {p.name}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-foreground/45">{p.note}</span>
                    <span className="font-mono text-[12px] tabular-nums text-foreground/60">{p.pts}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a href={SAMPLE_URL} className="link-more">
                <span data-rule />
                See the full sample report
              </a>
              <Link to="/insights" className="link-more">
                <span data-rule />
                Read the research behind the score
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <AuditScorecard />

            {/* stores we audit */}
            <div className="rounded-2xl border border-border bg-card/60 px-5 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                Stores we audit
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {audited.map((d) => (
                  <BrandLogo key={d} name={d.replace(".com", "")} domain={d} size={20} grayscale />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AuditSection;
