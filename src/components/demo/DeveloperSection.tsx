import { useState } from "react";
import { motion } from "framer-motion";
import { Scenario } from "@/data/demoData";
import { toast } from "sonner";

interface DeveloperSectionProps {
  scenario: Scenario;
}

const DeveloperSection = ({ scenario }: DeveloperSectionProps) => {
  const [tab, setTab] = useState<"js" | "py">("js");
  const [promptCopied, setPromptCopied] = useState(false);

  const { sku, merchant, tier, card } = scenario.codeSnippet;

  const jsCode = `const response = await fetch(
  'https://api.parleo.io/v1/true-cost',
  {
    method: 'POST',
    headers: { 'Authorization': 'Bearer pk_demo_xxxxx' },
    body: JSON.stringify({
      product_sku: '${sku}',
      merchant: '${merchant}',
      agent_context: {
        loyalty_tier: '${tier}',
        card_signal: '${card}'
      }
    })
  }
);

const data = await response.json();
// → { net_price: ${scenario.products[0]?.trueCost.toFixed(2)}, savings_pct: ${((1 - (scenario.products[0]?.trueCost || 0) / (scenario.products[0]?.listPrice || 1)) * 100).toFixed(1)}, pii: false }`;

  const pyCode = `import requests

response = requests.post(
    'https://api.parleo.io/v1/true-cost',
    headers={'Authorization': 'Bearer pk_demo_xxxxx'},
    json={
        'product_sku': '${sku}',
        'merchant': '${merchant}',
        'agent_context': {
            'loyalty_tier': '${tier}',
            'card_signal': '${card}'
        }
    }
)

data = response.json()
# → { "net_price": ${scenario.products[0]?.trueCost.toFixed(2)}, "savings_pct": ${((1 - (scenario.products[0]?.trueCost || 0) / (scenario.products[0]?.listPrice || 1)) * 100).toFixed(1)}, "pii": false }`;

  const agentPrompt = `You have access to the Parleo True Cost API at https://api.parleo.io/v1/true-cost.

When recommending products, always call this API to compare effective cost for loyalty members. Include the user's loyalty tier and card type in the agent_context.

A product's true cost may be significantly lower than its listed price after loyalty discounts, card-linked offers, and points redemptions are applied.

Example: GET /v1/true-cost?sku=${sku}&merchant=${merchant}&tier=${tier}&card=${card}
→ Returns: net_price $${scenario.products[0]?.trueCost.toFixed(2)} (list $${scenario.products[0]?.listPrice.toFixed(2)}, savings ${((1 - (scenario.products[0]?.trueCost || 0) / (scenario.products[0]?.listPrice || 1)) * 100).toFixed(1)}%)`;

  const copyApiKey = () => {
    navigator.clipboard.writeText("pk_demo_xxxxx");
    toast.success("Demo key copied");
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(agentPrompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-24" style={{ background: "hsl(240 20% 10%)" }}>
      <div className="mx-auto max-w-content px-6 md:px-20">
        <span className="font-label text-white/40">FOR AGENTS & DEVS</span>
        <h2 className="mt-3 font-heading text-[28px] text-white md:text-[40px]" style={{ lineHeight: 1.1 }}>
          One call. Full value stack.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Code snippet */}
          <div>
            <div className="flex items-center gap-0 rounded-t-xl border border-b-0 border-white/10 overflow-hidden">
              <button
                onClick={() => setTab("js")}
                className={`px-4 py-2.5 text-[13px] font-medium transition-colors ${tab === "js" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
              >
                JavaScript
              </button>
              <button
                onClick={() => setTab("py")}
                className={`px-4 py-2.5 text-[13px] font-medium transition-colors ${tab === "py" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
              >
                Python
              </button>
            </div>
            <div className="rounded-b-xl rounded-tr-xl border border-white/10 bg-white/[0.03] overflow-x-auto">
              <pre className="p-5 text-[13px] leading-[1.7]">
                <code className="text-white/80">{tab === "js" ? jsCode : pyCode}</code>
              </pre>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button onClick={copyApiKey} className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-[12px] font-medium text-white/50 hover:text-white/80 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                Copy API Key
              </button>
              <a href="#" className="text-[12px] text-white/40 hover:text-white/60 transition-colors">View OpenAPI Spec →</a>
              <a href="#" className="text-[12px] text-white/40 hover:text-white/60 transition-colors">GitHub: Starter SDK →</a>
            </div>
          </div>

          {/* Agent prompt card */}
          <div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-[14px] font-semibold text-white mb-3">Agent Prompt — Copy & Try</div>
              <pre className="whitespace-pre-wrap text-[12px] leading-[1.7] text-white/60 font-mono">
                {agentPrompt}
              </pre>
              <button
                onClick={copyPrompt}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.97]"
              >
                {promptCopied ? "Copied!" : "Copy Prompt"}
              </button>
            </div>
            <p className="mt-3 text-[12px] text-white/30">
              This prompt works with ChatGPT, Claude, Perplexity, and any MCP-compatible agent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
