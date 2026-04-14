import { motion, AnimatePresence } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClass =
  "h-10 w-full rounded-md border border-border bg-background px-3 text-[14px] text-foreground outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)] focus:border-primary";

const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const [state, handleSubmit, reset] = useForm("xyklyajq");

  const handleClose = () => {
    if (state.succeeded) reset();
    onOpenChange(false);
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
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-6 md:p-8"
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

            {state.succeeded ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="hsl(213,99%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-foreground">Message sent</p>
                <p className="mt-2 text-[14px] text-foreground/60">
                  We'll get back to you shortly.
                </p>
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
                      <label htmlFor="fs-name" className="mb-1.5 block text-[12px] font-medium text-foreground/60">
                        Name *
                      </label>
                      <input id="fs-name" name="name" required className={inputClass} placeholder="Jane Smith" />
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-[12px] text-destructive" />
                    </div>
                    <div>
                      <label htmlFor="fs-email" className="mb-1.5 block text-[12px] font-medium text-foreground/60">
                        Email *
                      </label>
                      <input id="fs-email" name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-[12px] text-destructive" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fs-company" className="mb-1.5 block text-[12px] font-medium text-foreground/60">
                      Company *
                    </label>
                    <input id="fs-company" name="company" required className={inputClass} placeholder="Acme Corp" />
                    <ValidationError prefix="Company" field="company" errors={state.errors} className="mt-1 text-[12px] text-destructive" />
                  </div>
                  <div>
                    <label htmlFor="fs-message" className="mb-1.5 block text-[12px] font-medium text-foreground/60">
                      Message
                    </label>
                    <textarea
                      id="fs-message"
                      name="message"
                      rows={3}
                      className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(213,99%,50%,0.15)] focus:border-primary resize-none"
                      placeholder="Tell us about your use case..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-[12px] text-destructive" />
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="h-11 w-full rounded-full bg-foreground text-[15px] font-medium text-background transition-all hover:bg-foreground/85 active:scale-[0.98] disabled:opacity-60"
                  >
                    {state.submitting ? "Sending..." : "Send message"}
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
