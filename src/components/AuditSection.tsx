import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";
import { Button } from "@/components/ui/button";

const AUDIT_URL = "https://audit.parleo.io/";

const valueRows = [
  { label: "List price", value: "$68.00" },
  { label: "Member reward", value: "− $10.20" },
  { label: "Card offer", value: "− $8.00" },
];

const AuditSection = () => {
  const [url, setUrl] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const domain = url.trim();
    window.location.href = domain ? `${AUDIT_URL}?url=${encodeURIComponent(domain)}` : AUDIT_URL;
  };

  return (
    <AnimatedSection id="audit" className="max-w-full overflow-hidden border-y border-border py-14 md:py-20">
      <div className="mx-auto min-w-0 max-w-content px-6 md:px-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-16">
          <div className="min-w-0 max-w-[520px]">
            <h2 className="section-heading text-foreground">Score how agents read your brand</h2>
            <p className="section-copy mt-5 max-w-[430px]">
              One free audit returns a 100 point readiness score across visibility, accessibility, and true value.
            </p>

            <form onSubmit={submit} className="mt-8 max-w-[450px]">
              <label htmlFor="audit-domain" className="sr-only">Brand domain</label>
              <div className="flex min-h-14 min-w-0 items-center rounded-full border border-foreground/20 bg-card p-1.5 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                <span className="pl-4 text-[13px] text-muted-foreground">https://</span>
                <input
                  id="audit-domain"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="yourbrand.com"
                  inputMode="url"
                  className="min-w-0 flex-1 bg-transparent px-1.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
                />
                <Button type="submit" size="sm" className="shrink-0 px-3.5 sm:px-5">Run free audit</Button>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href="https://parleo.io/demo" className="link-more">
                <span data-rule />
                How it works
              </a>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-success" /> No login to start
              </span>
            </div>
          </div>

          <div className="relative min-w-0 max-w-full">
            <div className="absolute -left-5 top-10 hidden h-[78%] w-px bg-primary/30 lg:block" aria-hidden />
            <AuditScorecard />
            <a
              href={AUDIT_URL}
              className="group mt-3 flex items-center justify-between gap-3 border-t border-foreground/10 pt-3 text-[12px] font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              Audit your brand against the same journey
              <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AuditSection;