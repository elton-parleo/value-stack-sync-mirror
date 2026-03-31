import { useState } from "react";
import { codeSnippets } from "./scenarioData";
import BrandLogo from "../BrandLogo";

const agentPrompt = `You have access to the Parleo API.
Before ranking products, call
parleo.enrich() with the user's
loyalty and card context.

Use the true_cost field to re-rank
results by best effective price.`;

const ForDevelopers = () => {
  const [tab, setTab] = useState<"js" | "python">("js");
  const [copiedKey, setCopiedKey] = useState(false);

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-content px-5 md:px-20">
        <div className="overflow-hidden rounded-xl bg-code-bg" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <div className="p-5 md:p-8">
            <h2 className="font-heading mb-6 text-[26px] text-white md:text-[36px]">
              One call. Full value stack.
            </h2>

            <div className="flex flex-col gap-6 md:flex-row">
              {/* Code snippet */}
              <div className="flex-1">
                <div className="mb-2 flex gap-1">
                  {(["js", "python"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-all ${
                        tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      {t === "js" ? "JavaScript" : "Python"}
                    </button>
                  ))}
                </div>
                <pre className="overflow-x-auto rounded-lg bg-white/[0.04] p-4 font-mono text-[12px] leading-relaxed text-white/70">
                  {codeSnippets[tab]}
                </pre>
              </div>

              {/* Agent prompt card */}
              <div className="w-full md:w-[300px]">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-2 text-[12px] font-semibold text-white/80">Agent Prompt Template</div>
                  <pre className="mb-3 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/50">
                    {agentPrompt}
                  </pre>
                  <div className="h-px bg-white/10" />
                  <div className="mt-3 flex flex-col gap-2">
                    <button
                      onClick={() => { navigator.clipboard.writeText("pk_demo_parleo_key"); setCopiedKey(true); setTimeout(() => setCopiedKey(false), 2000); }}
                      className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-[12px] font-medium text-white/60 transition-colors hover:bg-white/5"
                    >
                      {copiedKey ? "✓ Copied" : "Copy API Key"}
                    </button>
                    <a href="#" className="text-[12px] font-medium text-primary transition-opacity hover:opacity-80">
                      View OpenAPI Spec →
                    </a>
                    <a href="#" className="text-[12px] font-medium text-primary transition-opacity hover:opacity-80">
                      GitHub: Starter SDK →
                    </a>
                  </div>
                  <div className="mt-3 h-px bg-white/10" />
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-white/30">
                    <span>Works with</span>
                    {[
                      { name: "ChatGPT", logo: "OpenAI" },
                      { name: "Claude", logo: "Anthropic" },
                      { name: "Perplexity", logo: "Perplexity" },
                    ].map((a) => (
                      <span key={a.name} className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-white/50">
                        <BrandLogo name={a.logo} size={10} />
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForDevelopers;