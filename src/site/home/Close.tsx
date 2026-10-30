import { useState, type FormEvent } from "react";
import AuditForm from "@/components/AuditForm";
import { Logo } from "@/components/primitives";
import { Head, Img } from "../kit";
import { Icon } from "../v4kit";

/* 10 · Close. One product lit after hours, the report request, and the report card that fills with
   your brand as you type it. The card shows what the report will answer, never made-up results. */
const AGENTS = ["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot"];
const ROWS = ["How they describe", "Who they pick before", "The price they quote for", "The offers they leave out for"];

export default function Close({ source = "home-close" }: { source?: string }) {
  const [brand, setBrand] = useState("");
  const onInput = (e: FormEvent<HTMLDivElement>) => {
    const t = e.target as HTMLInputElement;
    if (t.name === "company") setBrand(t.value.slice(0, 40));
  };
  const b = brand.trim();
  const name = b || "your brand";

  return (
    <section className="sec cl" id="audit">
      <Img name="v4/close" widths={[900, 1600, 2048]} sizes="100vw" alt="" className="cl__img" />
      <div className="cl__wash" />
      <div className="wrap cl__grid">
        <div className="cl__copy">
          <Head lead="See what AI tells your shoppers," more="and what it&rsquo;s costing you." dark sq />
          <p className="body body--dark cl6__body">
            Your Agentic Value Report asks five AI assistants the questions your shoppers ask about your top SKUs, checks every answer against your own pages and your competitors, and <b>puts a dollar figure on what to fix first.</b> Free, from public data, back in hours.
          </p>
        </div>
        <div className="cl__form" onInput={onInput}>
          <AuditForm compact source={source} />
        </div>

        <figure className={`cl__card cl6 ${b ? "is-typed" : ""}`} aria-label="A preview of what the report answers">
          <header>
            <div className="cl6__top">
              <span>Agentic Value Report</span>
              <em>
                <Icon n="clock" size={13} /> Back in hours
              </em>
            </div>
            <b className="cl__brand">
              <span key={name}>{name}</span>
              <i className="cl__caret" aria-hidden="true" />
            </b>
          </header>
          <div className="cl6__score">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="27" className="cl6__track" />
              <circle cx="32" cy="32" r="27" className="cl6__arc" />
            </svg>
            <span className="cl6__q">
              <b>?</b>
              <small>/100</small>
            </span>
            <span className="cl6__sk">
              <b>Share of Algorithm</b>
              <em>Do assistants recommend {name}, read your site and get your real offer right</em>
            </span>
          </div>
          <div className="cl__agents">
            <span>Asked of</span>
            {AGENTS.map((a) => (
              <i key={a} title={a}>
                <Logo name={a} size={15} />
              </i>
            ))}
          </div>
          <ul>
            {ROWS.map((r, i) => (
              <li key={r} style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <span>
                  {r} <b>{name}</b>
                </span>
                <em aria-hidden="true" />
              </li>
            ))}
          </ul>
          <footer className="cl6__foot">
            <Icon n="dollar" size={15} />
            <span>Revenue at stake, and the fixes ranked by what each one is worth</span>
          </footer>
        </figure>
      </div>
    </section>
  );
}
