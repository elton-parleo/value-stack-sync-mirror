import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import BrandLogo from "./BrandLogo";

const protocols = [
  { name: "MCP", desc: "Model Context Protocol", logo: "Anthropic" },
  { name: "OpenAPI", desc: "REST standard", logo: "OpenAI" },
  { name: "ACP", desc: "Agent Commerce Protocol", logo: "Stripe" },
  { name: "AP2", desc: "Agent Payments Protocol", logo: "Google" },
  { name: "UCP", desc: "Unified Commerce Protocol", logo: "Google" },
  { name: "Visa TAP", desc: "Token Auth Protocol", logo: "Visa" },
  { name: "Shopify", desc: "Commerce platform", logo: "Shopify" },
  { name: "Stripe", desc: "Payments", logo: "Stripe" },
  { name: "Oracle", desc: "Enterprise stack", logo: "Oracle" },
];

const IntegrationSection = () => (
  <AnimatedSection
    id="integration"
    className="relative py-16 md:py-24"
    style={{ background: "#EAE8E5" }}
  >
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-14">
        <h2
          className="font-heading text-[32px] text-foreground md:text-[52px]"
          style={{ lineHeight: 1.05 }}
        >
          Ships on every protocol that matters.
        </h2>
        <p className="text-[16px] leading-[1.65] text-foreground/70 md:text-[18px]">
          Live on OpenAI, Perplexity, Claude, and custom systems across ACP, MCP, AP2, UCP, and TAP. Zero cross-protocol incentive resolution exists today. Parleo is the layer that resolves it.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {protocols.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3.5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/[0.06]">
              <BrandLogo name={t.logo} size={18} />
            </div>
            <div>
              <span className="text-[13.5px] font-semibold text-foreground">{t.name}</span>
              <p className="text-[10.5px] text-foreground/55">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default IntegrationSection;
