import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const integrations = [
  {
    name: "MCP",
    desc: "Model Context Protocol",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "OpenAPI",
    desc: "REST standard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "ACP",
    desc: "Agent Commerce Protocol",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Shopify",
    desc: "Commerce platform",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Oracle",
    desc: "Enterprise stack",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    desc: "Payments",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="1.5">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

const IntegrationSection = () => (
  <AnimatedSection id="integration" className="section-grid relative bg-background py-16 md:py-24">
    <div className="diffusion-glow pointer-events-none absolute left-[20%] top-[40%]" />
    <div className="decorative-line" />

    {/* Subtle decorative dots */}
    <div className="pointer-events-none absolute right-[10%] top-[15%] hidden md:block">
      <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-[0.06]">
        {[0, 20, 40].map(x => [0, 20, 40].map(y => (
          <circle key={`${x}-${y}`} cx={x + 5} cy={y + 5} r="2" fill="hsl(213,99%,50%)" />
        )))}
      </svg>
    </div>

    <div className="mx-auto max-w-content px-6 pt-8 md:px-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.08]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(213,99%,50%)" strokeWidth="2">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-label text-parleo-muted">PROTOCOL NATIVE</span>
          </div>
          <h2 className="mt-4 font-heading text-[28px] text-foreground md:text-[44px]" style={{ lineHeight: 1.1 }}>
            Live in two weeks.<br />No data migration.
          </h2>
          <p className="mt-4 max-w-[420px] text-[17px] leading-[1.7] text-foreground/50">
            One API contract covers every agent. OpenAI, Perplexity, Claude, and custom systems built on ACP, MCP, or AP2.
          </p>

          {/* Integration grid */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                  {t.icon}
                </div>
                <div>
                  <span className="text-[13px] font-medium text-foreground">{t.name}</span>
                  <p className="text-[10px] text-parleo-muted">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2">
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
          {/* Code header */}
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
