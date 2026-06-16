import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const blurbs = [
  {
    title: "Your value, structured",
    desc: "Normalized product, loyalty, and incentive data, indexed for agent retrieval.",
  },
  {
    title: "One place to check",
    desc: "A single endpoint covering catalog, deals, and resolved true cost.",
  },
  {
    title: "Shopping-specific semantics",
    desc: "Built for retail context: SKUs, tiers, card-linked offers, segment hints.",
  },
];

const DeveloperApiSection = () => (
  <AnimatedSection
    id="developer-api"
    className="relative py-16 md:py-24"
    style={{ background: "#EAE8E5" }}
  >
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-3 md:grid-cols-3 md:gap-5">
        {blurbs.map((b) => (
          <div key={b.title} className="rounded-xl border border-border/70 bg-card p-5 md:p-6">
            <h3 className="text-[15px] font-semibold text-foreground">{b.title}</h3>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-foreground/65">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Code panel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-8 overflow-hidden rounded-xl bg-code-bg"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        <div
          className="flex items-center gap-2 border-b px-5 py-3"
          style={{ borderColor: "hsl(260 11% 18%)" }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: "#3a3a3a" }} />
          <span className="h-2 w-2 rounded-full" style={{ background: "#3a3a3a" }} />
          <span className="h-2 w-2 rounded-full" style={{ background: "#3a3a3a" }} />
          <span className="ml-3 font-mono text-[10px]" style={{ color: "#555" }}>
            parleo-query.json
          </span>
        </div>
        <div className="p-5">
          <pre className="overflow-x-auto font-mono text-[11.5px] leading-[1.8]">
{/* eslint-disable react/jsx-no-comment-textnodes */}
<span style={{ color: "#555" }}>{"// Query"}</span>{"\n"}
<span style={{ color: "#7a7890" }}>{"{"}</span>{"\n"}
{"  "}<span style={{ color: "#7a7890" }}>"merchant_id"</span>: <span style={{ color: "#6bb3ff" }}>"nordstrom_us"</span>,{"\n"}
{"  "}<span style={{ color: "#7a7890" }}>"product_sku"</span>: <span style={{ color: "#6bb3ff" }}>"SKII-FTE-230"</span>,{"\n"}
{"  "}<span style={{ color: "#7a7890" }}>"agent_context"</span>: {"{"}{"\n"}
{"    "}<span style={{ color: "#7a7890" }}>"card_signal"</span>: <span style={{ color: "#6bb3ff" }}>"nordstrom_visa"</span>,{"\n"}
{"    "}<span style={{ color: "#7a7890" }}>"segment"</span>: <span style={{ color: "#6bb3ff" }}>"icon_tier"</span>{"\n"}
{"  "}{"}"}{"\n"}
{"}"}{"\n"}{"\n"}
<span style={{ color: "#555" }}>{"// Response · 48ms"}</span>{"\n"}
<span style={{ color: "#7a7890" }}>{"{"}</span>{"\n"}
{"  "}<span style={{ color: "#7a7890" }}>"incentives"</span>: [{"\n"}
{"    "}{"{ "}<span style={{ color: "#7a7890" }}>"apply"</span>: <span style={{ color: "#6ec87a" }}>"3x_base_beauty"</span>{" },"}{"\n"}
{"    "}{"{ "}<span style={{ color: "#7a7890" }}>"apply"</span>: <span style={{ color: "#6ec87a" }}>"visa_3pts_per_$1"</span>{" }"}{"\n"}
{"  "}],{"\n"}
{"  "}<span style={{ color: "#7a7890" }}>"true_cost"</span>: <span style={{ color: "#6bb3ff" }}>222.95</span>,{"\n"}
{"  "}<span style={{ color: "#7a7890" }}>"pii"</span>: <span style={{ color: "#6ec87a" }}>false</span>{"\n"}
{"}"}
          </pre>
        </div>
        <div
          className="flex flex-wrap gap-4 border-t px-5 py-3 text-[10.5px]"
          style={{ borderColor: "hsl(260 11% 18%)", color: "#777" }}
        >
          <span>60% fewer tokens than direct crawling</span>
          <span>hourly refresh</span>
          <span>sub-50ms response</span>
          <span>Zero PII leaves your environment</span>
        </div>
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href="#developers"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.05] px-5 text-[14px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/[0.08]"
        >
          Read the docs
          <span className="text-primary">→</span>
        </a>
        <a
          href="/demo"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-[14px] font-medium text-foreground transition-colors hover:border-foreground/30"
        >
          See how it works
        </a>
      </div>
    </div>
  </AnimatedSection>
);

export default DeveloperApiSection;
