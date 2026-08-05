import { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/xyklyajq";

/** Editorial newsletter capture. Posts to the same Formspree endpoint as Request Demo. */
const NewsletterSignup = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    try {
      const body = new FormData();
      body.append("email", email);
      body.append("_subject", "Parleo blog subscribe");
      body.append("source", "blog-newsletter");
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-t-2 border-primary bg-secondary/70 ${
        compact ? "px-6 py-7" : "px-7 py-9 md:px-10 md:py-11"
      }`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="pointer-events-none absolute inset-0 texture-dots-faint opacity-60" />
      <div className="relative">
        <h3
          className={`font-heading text-foreground ${
            compact ? "text-[19px]" : "text-[22px] md:text-[27px]"
          }`}
        >
          The agentic commerce brief
        </h3>
        <p className="section-copy mt-2 max-w-[46ch]">
          One email when we publish. Benchmarks, protocol changes, and what true cost resolution
          looks like in practice.
        </p>
        <form onSubmit={submit} className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@brand.com"
            aria-label="Email address"
            className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-[14px] text-foreground outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)]"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="btn-lift h-11 rounded-full bg-foreground px-6 text-[14px] font-medium text-background transition-colors hover:bg-foreground/85 disabled:opacity-60"
          >
            <span>{state === "sending" ? "Subscribing" : "Subscribe"}</span>
          </button>
        </form>
        {state === "done" && (
          <p className="mt-3 text-[13px] text-primary">You are on the list.</p>
        )}
        {state === "error" && (
          <p className="mt-3 text-[13px] text-destructive">
            Something went wrong. Try again or email samar@parleo.io.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
