import { Head } from "../kit";
import { App, Icon, Mark } from "../v4kit";

/* Works with. Where the record comes from, where it goes, and the assistants it is checked in. */
const AGENTS = [
  { k: "ChatGPT", a: "ChatGPT" },
  { k: "Gemini", a: "Gemini" },
  { k: "Perplexity", a: "Perplexity" },
  { k: "Copilot", a: "Copilot" },
  { k: "Claude", a: "Claude" },
  { k: "Google AI Mode", a: "AI Mode" },
];
const SURFACES: { k: string; d: string; g: React.ReactNode }[] = [
  { k: "Site markup", d: "schema.org Offer", g: <Icon n="record" size={18} /> },
  { k: "Merchant Center", d: "The feed Gemini and AI Mode read", g: <Mark k="gmc" h={11} /> },
  { k: "OpenAI feed", d: "Behind ChatGPT shopping", g: <Mark k="openai" h={11} /> },
  { k: "UCP", d: "Google's checkout profile", g: <App a="AI Mode" size={18} /> },
  { k: "Deals API", d: "Program prices, live", g: <Icon n="tag" size={18} /> },
  { k: "MCP server", d: "Agents that call you", g: <Icon n="fork" size={18} /> },
  { k: "WebMCP", d: "Agents on your own site", g: <Icon n="eye" size={18} /> },
];
const SOURCES: { k: string; i: "record" | "dollar" | "tag" | "people" | "layers" }[] = [
  { k: "Product catalog", i: "record" },
  { k: "Price book", i: "dollar" },
  { k: "Promotions", i: "tag" },
  { k: "Loyalty program", i: "people" },
  { k: "Order data", i: "layers" },
];

export default function PWorks() {
  return (
    <section className="sec pdw pdw6" id="works-with">
      <div className="wrap in6">
        <Head lead="Works with every agent" more="and every protocol." sq />
        <div className="in6__body">
          <p className="body">
            ChatGPT, Gemini, Perplexity, Copilot, Claude and Google AI Mode. Merchant Center, the OpenAI feed, UCP, MCP and your own site. <b>Nothing personal leaves your systems.</b>
          </p>
        </div>
      </div>
      <div className="wrap pdw__grid">
        <div className="pdw__group">
          <span className="pdw__k">Checked in</span>
          <div className="pdw__cells">
            {AGENTS.map((a) => (
              <div key={a.k} className="pdw__cell">
                <App a={a.a} size={24} />
                <span>{a.k}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pdw__group">
          <span className="pdw__k">Publishes to</span>
          <div className="pdw__cells pdw__cells--7">
            {SURFACES.map((p) => (
              <div key={p.k} className="pdw__cell pdw__cell--s">
                <i className="pdw__g">{p.g}</i>
                <span>
                  <b>{p.k}</b>
                  <em>{p.d}</em>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="pdw__group">
          <span className="pdw__k">Reads from</span>
          <div className="pdw__cells pdw__cells--5">
            {SOURCES.map((p) => (
              <div key={p.k} className="pdw__cell pdw__cell--s">
                <i className="pdw__g">
                  <Icon n={p.i} size={18} />
                </i>
                <span>
                  <b>{p.k}</b>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
