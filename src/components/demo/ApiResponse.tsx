import { useState } from "react";
import { motion } from "framer-motion";
import { Scenario } from "@/data/demoData";

interface ApiResponseProps {
  scenario: Scenario;
}

const ApiResponse = ({ scenario }: ApiResponseProps) => {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(scenario.apiResponse, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="font-label text-parleo-muted">STEP 4</span>
        <span className="text-[13px] text-foreground/40">— API Response · Winner Object</span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border" style={{ background: "hsl(240 20% 10%)" }}>
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <span className="text-[11px] font-medium text-white/40">response.json</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Copied
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="overflow-x-auto p-5 text-[13px] leading-[1.7]">
          <code className="text-white/80">{json}</code>
        </pre>
      </div>
    </div>
  );
};

export default ApiResponse;
