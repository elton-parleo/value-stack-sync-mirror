import { useState } from "react";
import { codeSnippets } from "./scenarioData";

const agentPrompt = `You have access to the Parleo API.
Before ranking products, call
parleo.enrich() with the user's
loyalty and card context.

Use the true_cost field to re-rank
results by best effective price.`;

const ForDevelopers = () => {
  const [tab, setTab] = useState<"js" | "python">("js");
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-20">
        <div className="overflow-hidden rounded-xl bg-code-bg" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <div className="p-6 md:p-10">
            <div className="font-label mb-3 text-white/40">For Developers</div>
            <h2 className="font-heading mb-8 text-[28px] text-white md:text-[40px]">
              One call. Full value stack.
            </h2>

            <div className="flex flex-col gap-8 md:flex-row">
              {/* Code snippet */}
              <div className="flex-1">
                <div className="mb-3 flex gap-1">
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
                <pre className="overflow-x-auto rounded-lg bg-white/[0.04] p-5 font-mono text-[13px] leading-relaxed text-white/70">
                  {codeSnippets[tab]}
                </pre>
              </div>

              {/* Agent prompt card */}
              <div className="w-full md:w-[320px]">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-3 text-[13px] font-semibold text-white/80">Agent Prompt Template</div>
                  <pre className="mb-4 whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-white/50">
                    {agentPrompt}
                  </pre>
                  <div className="h-px bg-white/10" />
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      onClick={() => { navigator.clipboard.writeText(agentPrompt); setCopiedPrompt(true); setTimeout(() => setCopiedPrompt(false), 2000); }}
                      className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5"
                    >
                      {copiedPrompt ? "✓ Copied Prompt" : "Copy Prompt"}
                    </button>
                    <button
                      onClick={() => { navigator.clipboard.writeText("pk_demo_parleo_key"); setCopiedKey(true); setTimeout(() => setCopiedKey(false), 2000); }}
                      className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5"
                    >
                      {copiedKey ? "✓ Copied" : "Copy API Key"}
                    </button>
                    <a href="#" className="text-[13px] font-medium text-primary transition-opacity hover:opacity-80">
                      View OpenAPI Spec →
                    </a>
                    <a href="#" className="text-[13px] font-medium text-primary transition-opacity hover:opacity-80">
                      GitHub: Starter SDK →
                    </a>
                  </div>
                  <div className="mt-4 h-px bg-white/10" />
                  <div className="mt-3 text-[11px] text-white/30">
                    Works with ChatGPT, Claude, Perplexity, and any MCP-compatible agent.
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
