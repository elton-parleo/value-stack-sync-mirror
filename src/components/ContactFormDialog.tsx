import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Parleo inquiry from ${form.name} at ${form.company}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`
    );
    window.location.href = `mailto:samar@parleo.io?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", company: "", message: "" });
      onOpenChange(false);
    }, 3000);
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
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-6 md:p-8"
            style={{ boxShadow: 'var(--shadow-elevated)' }}
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 text-foreground/40 transition-colors hover:text-foreground"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="hsl(213,99%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p className="text-lg font-semibold text-foreground">Opening your email client</p>
                <p className="mt-2 text-[14px] text-foreground/60">Complete sending in your email app.</p>
                <p className="mt-3 text-[13px] text-foreground/50">
                  If your email client didn't open, reach us directly at{" "}
                  <a href="mailto:samar@parleo.io" className="font-medium text-primary hover:underline">samar@parleo.io</a>
                </p>
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <span className="font-label-wide text-primary">GET IN TOUCH</span>
                  <h3 className="mt-2 text-xl font-bold text-foreground" style={{ letterSpacing: '-0.02em' }}>
                    Let's explore what Parleo can do for your business.
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="h-10 w-full rounded-md border border-border bg-background px-3 text-[14px] text-foreground outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)] focus:border-primary"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-10 w-full rounded-md border border-border bg-background px-3 text-[14px] text-foreground outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)] focus:border-primary"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Company *</label>
                    <input
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="h-10 w-full rounded-md border border-border bg-background px-3 text-[14px] text-foreground outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)] focus:border-primary"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)] focus:border-primary resize-none"
                      placeholder="Tell us about your use case..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-11 w-full rounded-[4px] bg-primary text-[15px] font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    Send message
                  </button>
                  <p className="text-center text-[12px] text-foreground/50">
                    Opens your default email client · Or email us at{" "}
                    <a href="mailto:samar@parleo.io" className="font-medium text-primary hover:underline">samar@parleo.io</a>
                  </p>
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
