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
    <AnimatedSection id="audit" className="overflow-hidden border-y border-border py-14 md:py-20">
      <div className="mx-auto max-w-content px-6 md:px-20">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <div className="max-w-[470px]">
            <h2 className="section-heading text-foreground">See what agents actually quote for your brand</h2>
            <p className="section-copy mt-5 max-w-[420px]">
              One free audit. A clear view of the value agents can see, and the value they miss.
            </p>

            <form onSubmit={submit} className="mt-8 max-w-[450px]">
              <label htmlFor="audit-domain" className="sr-only">Brand domain</label>
              <div className="flex min-h-14 items-center rounded-full border border-foreground/20 bg-card p-1.5 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                <span className="pl-4 text-[13px] text-muted-foreground">https://</span>
                <input
                  id="audit-domain"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="yourbrand.com"
                  inputMode="url"
                  className="min-w-0 flex-1 bg-transparent px-1.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
                />
                <Button type="submit" size="sm" className="shrink-0 px-5">Run free audit</Button>
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

          <div className="relative">
            <div className="absolute -left-5 top-10 hidden h-[78%] w-px bg-primary/30 lg:block" aria-hidden />
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-card">
              <div className="flex items-center justify-between border-b border-border bg-card/70 px-5 py-3.5 md:px-7">
                <div className="flex items-center gap-2.5">
                  <BrandLogo name="OpenAI" size={16} grayscale />
                  <span className="text-[12px] font-medium text-foreground">Agent answer</span>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  Value resolved
                </span>
              </div>

              <div className="grid md:grid-cols-[1fr_0.9fr]">
                <div className="border-b border-border p-6 md:border-b-0 md:border-r md:p-8">
                  <p className="max-w-[340px] text-[15px] leading-[1.55] text-foreground/70">
                    “What’s the best price on Tatcha Water Cream?”
                  </p>
                  <div className="mt-8 flex items-end justify-between gap-4 border-b border-foreground/10 pb-4">
                    <div>
                      <BrandLogo name="Tatcha" domain="tatcha.com" size={20} grayscale />
                      <div className="mt-3 text-[13px] text-muted-foreground">The Water Cream, 50 ml</div>
                    </div>
                    <span className="text-[18px] font-semibold tabular-nums text-foreground line-through decoration-foreground/30">$68.00</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground">Quoted true value</span>
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                      className="text-[32px] font-semibold leading-none tabular-nums text-primary"
                    >
                      $49.80
                    </motion.span>
                  </div>
                </div>

                <div className="bg-card/45 p-6 md:p-8">
                  <div className="space-y-4">
                    {valueRows.map((row, index) => (
                      <motion.div
                        key={row.label}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.16 + index * 0.12, duration: 0.35 }}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="text-[12px] text-muted-foreground">{row.label}</span>
                        <span className={`text-[13px] font-medium tabular-nums ${index ? "text-success" : "text-foreground"}`}>{row.value}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-7 border-t border-foreground/10 pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[12px] font-medium text-foreground">Agent-visible savings</span>
                      <span className="text-[15px] font-semibold tabular-nums text-success">$18.20</span>
                    </div>
                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-foreground/10">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: "74%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <a href={AUDIT_URL} className="group flex items-center justify-between border-t border-border px-5 py-3.5 text-[12px] font-medium text-foreground transition-colors hover:bg-card md:px-7">
                Audit your brand against the same journey
                <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AuditSection;