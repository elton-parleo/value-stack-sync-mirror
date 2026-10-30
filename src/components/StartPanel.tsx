import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AuditForm from "./AuditForm";
import { EASE } from "./primitives";
import { START_EVENT } from "./start";
import { App, Icon, type IconName } from "@/site/v4kit";
import "./start-panel.css";

/* Start with your top SKUs: what the first engagement is, step by step, and the form to begin it.
   Opened from any "Start with your top SKUs" button, or from #start in the address. */
const FREE: { i: IconName; k: string; d: string }[] = [
  { i: "record", k: "Pick your top SKUs", d: "Up to 20 products that matter most, and the competitors you lose answers to." },
  { i: "eye", k: "We run the study", d: "Real shopper questions across five assistants, each answer checked against your own pages that day." },
  { i: "dollar", k: "You get the Agentic Value Report", d: "Your score, every answer next to its source, revenue at stake and who fixes what. Yours to keep." },
];
const PAID: { i: IconName; k: string; d: string }[] = [
  { i: "check", k: "Parleo builds each record, your team approves", d: "Price, member value, offers and terms. Nothing reaches an assistant until you sign off." },
  { i: "fork", k: "Syndicated everywhere agents read", d: "Feeds, markup and protocols compiled from the same record." },
  { i: "trend", k: "Re-asked every week", d: "The same questions across five assistants, and a readout in dollars." },
];

export default function StartPanel() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener(START_EVENT, on);
    if (window.location.hash === "#start") setOpen(true);
    return () => window.removeEventListener(START_EVENT, on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="sp7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setOpen(false)}>
          <motion.aside
            className="sp7__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Start with your top SKUs"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="sp7__x" aria-label="Close" onClick={() => setOpen(false)}>
              <Icon n="cross" size={16} />
            </button>
            <div className="sp7__intro">
              <h2 className="sh sh--m">
                Start with your <span className="sh__more">top SKUs</span>
                <i className="sq" aria-hidden="true" />
              </h2>
              <p>
                The fastest way to see Parleo work on your own catalog. <b>The study and the report are free.</b> Pick the products that matter most and see what five AI assistants say about them, checked against your own pages.
              </p>
              <div className="sp7__ags">
                {["ChatGPT", "Gemini", "AI Mode", "Perplexity", "Copilot"].map((a) => (
                  <App key={a} a={a} size={20} />
                ))}
                <span>Measured across five assistants</span>
              </div>
            </div>
            <div className="sp8__phase">
              <span className="sp8__tag is-free">Free</span>
              <b>The study and the report</b>
            </div>
            <ol className="sp7__steps">
              {FREE.map((s, i) => (
                <li key={s.k} style={{ ["--d" as string]: `${0.15 + i * 0.07}s` }}>
                  <span className="sp7__no">{i + 1}</span>
                  <span className="sp7__i">
                    <Icon n={s.i} size={16} />
                  </span>
                  <b>{s.k}</b>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
            <p className="sp8__gate">
              <Icon n="arrow" size={13} /> If you like what you see, we talk about working together. No commitment before then.
            </p>
            <div className="sp8__phase is-paid">
              <span className="sp8__tag">Then, if you go ahead</span>
              <b>Records, syndication, weekly runs</b>
            </div>
            <ol className="sp7__steps sp8__later">
              {PAID.map((s, i) => (
                <li key={s.k} style={{ ["--d" as string]: `${0.4 + i * 0.07}s` }}>
                  <span className="sp7__no">{i + 4}</span>
                  <span className="sp7__i">
                    <Icon n={s.i} size={16} />
                  </span>
                  <b>{s.k}</b>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
            <div className="sp7__form">
              <AuditForm source="start-top-skus" kind="start" />
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
