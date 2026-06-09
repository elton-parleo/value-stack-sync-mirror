import BrandLogo from "@/components/BrandLogo";

const agents = [
  { name: "ChatGPT", domain: "openai.com" },
  { name: "Gemini", domain: "gemini.google.com" },
  { name: "Perplexity", domain: "perplexity.ai" },
  { name: "Copilot", domain: "copilot.microsoft.com" },
];

const AgentLogosRow = () => (
  <div className="flex items-center gap-2.5">
    {agents.map((a) => (
      <span key={a.name} title={a.name} className="opacity-70">
        <BrandLogo name={a.name} domain={a.domain} size={16} grayscale />
      </span>
    ))}
  </div>
);

export default AgentLogosRow;
