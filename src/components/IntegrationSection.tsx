import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import BrandLogo from "./BrandLogo";

const integrations = [
  { name: "MCP", desc: "Model Context Protocol", logo: "Anthropic" },
  { name: "OpenAPI", desc: "REST standard", logo: "OpenAI" },
  { name: "ACP", desc: "Agent Commerce Protocol", logo: "Stripe" },
  { name: "AP2", desc: "Agent Payments Protocol", logo: "Google" },
  { name: "UCP", desc: "Google Unified Commerce", logo: "Google" },
  { name: "Visa TAP", desc: "Token Auth Protocol", logo: "Visa" },
  { name: "Shopify", desc: "Commerce platform", logo: "Shopify" },
  { name: "Stripe", desc: "Payments", logo: "Stripe" },
  { name: "Oracle", desc: "Enterprise stack", logo: "Oracle" },
];

const IntegrationSection = () => (
  <AnimatedSection id="integration" className="relative bg-background py-16 md:py-24">
    <div className="pointer-events-none absolute right-[10%] top-[15%] hidden md:block">
      <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-[0.06]">
        {[0, 20, 40].map(x => [0, 20, 40].map(y => (
          <circle key={`${x}-${y}`} cx={x + 5} cy={y + 5} r="2" fill="hsl(213,99%,50%)" />
        )))}
      </svg>
    </div>

    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
        {/* Left */}
        <div>
          <SectionHeading
            eyebrowNumber="05"
            eyebrow="Protocols"
            accent="that matters"
            body="Live on OpenAI, Perplexity, Claude, and custom systems across ACP, MCP, AP2, UCP, and TAP."
            bodyMaxWidth="520px"
          >
            Ships on every protocol
          </SectionHeading>
          <p className="mt-3 max-w-[460px] text-[13.5px] leading-[1.55] text-foreground/55">
            Six protocols. Zero cross-protocol incentive resolution. Parleo is the layer that resolves it.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {integrations.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group flex items-center gap-2.5 rounded-lg border border-border bg-card px-3.5 py-3 transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
              >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/[0.06] transition-colors group-hover:bg-primary/[0.12]">
                  <BrandLogo name={t.logo} size={16} />
                </div>
                <div>
                  <span className="text-[13px] font-medium text-foreground">{t.name}</span>
                  <p className="text-[10px] text-parleo-muted">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="hsl(213,99%,50%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-[12px] text-parleo-muted">Zero PII leaves your environment. Logic only.</p>
          </div>
        </div>

        {/* Right - code block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-xl bg-code-bg transition-shadow duration-300 hover:shadow-elevated"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          <div className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: 'hsl(260 11% 18%)' }}>
            <span className="h-2 w-2 rounded-full" style={{ background: "#3a3a3a" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "#3a3a3a" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "#3a3a3a" }} />
            <span className="ml-3 font-mono text-[10px]" style={{ color: '#555' }}>parleo-query.json</span>
          </div>
          <div className="p-5">
            <pre className="overflow-x-auto font-mono text-[11px] leading-[1.8]">
<span style={{ color: '#555' }}>{"// Query"}</span>{"\n"}
<span style={{ color: '#7a7890' }}>{"{"}</span>{"\n"}
{"  "}<span style={{ color: '#7a7890' }}>"merchant_id"</span>: <span style={{ color: '#6bb3ff' }}>"nike_us"</span>,{"\n"}
{"  "}<span style={{ color: '#7a7890' }}>"product_sku"</span>: <span style={{ color: '#6bb3ff' }}>"AIR-MAX-90"</span>,{"\n"}
{"  "}<span style={{ color: '#7a7890' }}>"agent_context"</span>: {"{"}{"\n"}
{"    "}<span style={{ color: '#7a7890' }}>"card_signal"</span>: <span style={{ color: '#6bb3ff' }}>"amex_plat"</span>,{"\n"}
{"    "}<span style={{ color: '#7a7890' }}>"segment"</span>: <span style={{ color: '#6bb3ff' }}>"likely_vip"</span>{"\n"}
{"  "}{"}"}{"\n"}
{"}"}{"\n"}
{"\n"}
<span style={{ color: '#555' }}>{"// Response · 48ms"}</span>{"\n"}
<span style={{ color: '#7a7890' }}>{"{"}</span>{"\n"}
{"  "}<span style={{ color: '#7a7890' }}>"incentives"</span>: [{"\n"}
{"    "}{"{ "}<span style={{ color: '#7a7890' }}>"apply"</span>: <span style={{ color: '#6ec87a' }}>"-$20"</span>{" },"}{"\n"}
{"    "}{"{ "}<span style={{ color: '#7a7890' }}>"apply"</span>: <span style={{ color: '#6ec87a' }}>"2x_pts"</span>{" }"}{"\n"}
{"  "}],{"\n"}
{"  "}<span style={{ color: '#7a7890' }}>"net"</span>: <span style={{ color: '#6bb3ff' }}>107.00</span>,{"\n"}
{"  "}<span style={{ color: '#7a7890' }}>"pii"</span>: <span style={{ color: '#6ec87a' }}>false</span>{"\n"}
{"}"}</pre>
          </div>
          <div className="flex gap-4 border-t px-5 py-3 text-[10px]" style={{ borderColor: 'hsl(260 11% 18%)', color: '#555' }}>
            <span>✓ Zero PII</span>
            <span>✓ {"<"}50ms</span>
            <span>✓ Single contract</span>
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatedSection>
);

export default IntegrationSection;
