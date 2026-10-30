import { useState, type FormEvent } from "react";
import { Btn } from "./primitives";
import { appendUtms, captureEvent } from "@/lib/analytics";
import "./audit-form.css";

const FORMSPREE_URL = "https://formspree.io/f/xyklyajq";

/**
 * The Agentic Value Report request, and the "Start with your top SKUs" request (kind="start").
 * Both post to the same Formspree endpoint the previous site used.
 */
export default function AuditForm({ source, compact = false, kind = "report" }: { source: string; compact?: boolean; kind?: "report" | "start" }) {
  const start = kind === "start";
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    setErr(null);
    try {
      const fd = new FormData(form);
      fd.append("source", source);
      appendUtms(fd);
      fd.append("_subject", start ? "Start with top SKUs request" : "Agentic Value Report request");
      const res = await fetch(FORMSPREE_URL, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.errors?.[0]?.message || "Something went wrong. Please try again in a moment.");
      }
      setState("done");
      try {
        captureEvent("audit_requested", { source });
        (window as unknown as { oaiq?: (...a: unknown[]) => void }).oaiq?.("measure", "appointment_scheduled", { type: "customer_action" });
      } catch {
        /* analytics never blocks the form */
      }
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Network error. Please try again.");
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className={`af af--done ${compact ? "af--compact" : ""}`} aria-live="polite">
        <div className="af__check">✓</div>
        <h3>{start ? "Got it. We'll be in touch to pick your SKUs." : "Got it. Your report is on its way."}</h3>
        <p>{start ? "We'll start from public data, so there's nothing to set up on your side until you want records published." : "The report runs on public data, so there's nothing to set up on your side. It arrives as a private link and a PDF."}</p>
      </div>
    );
  }

  return (
    <form className={`af ${compact ? "af--compact" : ""}`} onSubmit={submit}>
      <div className="af__head">
        <h3>{start ? "Tell us where to start" : compact ? "Get your Agentic Value Report" : "Where should we start?"}</h3>
        <p>{start ? "Takes a minute. We reply within a day." : compact ? "Three fields. Your report comes back in hours." : "Takes a minute. Your report comes back in hours."}</p>
      </div>
      <div className="af__grid">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
        </label>
        <label className={compact ? "af__wide" : ""}>
          <span>Company</span>
          <input name="company" autoComplete="organization" required placeholder="Brand or retailer" />
        </label>
        {!compact && (
          <label>
            <span>Your role</span>
            <input name="role" placeholder="VP Ecommerce, CMO, Head of Digital Shelf" />
          </label>
        )}
      </div>
      {!compact && (
        <label className="af__wide">
          <span>{start ? "Your top SKUs, or a category" : "Products or categories to start with"}</span>
          <textarea name="skus" rows={3} placeholder="Top SKUs, a category, or the competitor you keep losing the answer to" />
        </label>
      )}
      <div className="af__row">
        <fieldset className="af__mode">
          <legend className="sr-only">You are a</legend>
          <label>
            <input type="radio" name="mode" value="brand" defaultChecked />
            <span>Brand</span>
          </label>
          <label>
            <input type="radio" name="mode" value="retailer" />
            <span>Retailer</span>
          </label>
        </fieldset>
      </div>
      {err && (
        <p className="af__err" role="alert">
          {err}
        </p>
      )}
      <Btn type="submit" variant="blue" size="lg" arrow disabled={state === "sending"} className="af__submit">
        {state === "sending" ? "Sending" : start ? "Start my free study" : "Get your report"}
      </Btn>
      <p className="af__fine">{start ? "Nothing publishes until your team approves it." : "Free, from public data, with no access to your systems."}</p>
    </form>
  );
}
