import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FORMSPREE_URL = "https://formspree.io/f/xyklyajq";

const inputClass =
  "h-10 w-full rounded-md border border-border bg-background px-3 text-[14px] text-foreground outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)] focus:border-primary";

const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (succeeded) setSucceeded(false);
    setError(null);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSucceeded(true);
        try {
          (window as unknown as { oaiq?: (...args: unknown[]) => void }).oaiq?.(
            "measure",
            "appointment_scheduled",
            { type: "customer_action" },
          );
        } catch {
          // no-op
        }
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 mx-auto flex max-h-[100dvh] w-full max-w-[480px] flex-col overflow-y-auto overscroll-contain rounded-none border border-border bg-card p-5 pb-8 sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-h-[92vh] sm:rounded-lg sm:p-8"
            style={{ boxShadow: "var(--shadow-elevated)" }}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-foreground/40 transition-colors hover:text-foreground"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {succeeded ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="hsl(213,99%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-foreground">Message sent</p>
                <p className="mt-2 text-[14px] text-foreground/60">We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <span className="font-label-wide text-primary">REQUEST DEMO</span>
                  <h3 className="mt-2 text-xl font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                    Let's explore what Parleo can do for your business.
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fs-name" className="mb-1.5 block text-[12px] font-medium text-foreground/60">Name *</label>
                      <input id="fs-name" name="name" required className={inputClass} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label htmlFor="fs-email" className="mb-1.5 block text-[12px] font-medium text-foreground/60">Email *</label>
                      <input id="fs-email" name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fs-company" className="mb-1.5 block text-[12px] font-medium text-foreground/60">Company *</label>
                    <input id="fs-company" name="company" required className={inputClass} placeholder="Acme Corp" />
                  </div>
                  <div>
                    <label htmlFor="fs-message" className="mb-1.5 block text-[12px] font-medium text-foreground/60">Message</label>
                    <textarea
                      id="fs-message"
                      name="message"
                      rows={3}
                      className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)] focus:border-primary resize-none"
                      placeholder="Tell us about your use case..."
                    />
                  </div>
                  {error && (
                    <p className="text-[13px] text-destructive">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-11 w-full rounded-full bg-foreground text-[15px] font-medium text-background transition-all hover:bg-foreground/85 active:scale-[0.98] disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send message"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactFormDialog;
