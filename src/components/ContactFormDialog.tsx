import { useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { captureEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FORMSPREE_URL = "https://formspree.io/f/xyklyajq";
const inputClass = "h-11 w-full rounded-md border border-input bg-background px-3.5 text-[14px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10";

const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setSucceeded(false);
      setError(null);
    }
    onOpenChange(next);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
      setSucceeded(true);
      try {
        (window as unknown as { oaiq?: (...args: unknown[]) => void }).oaiq?.("measure", "appointment_scheduled", { type: "customer_action" });
      } catch {
        // Analytics must never interrupt the form.
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="top-auto bottom-0 max-h-[92dvh] w-full max-w-none translate-y-0 overflow-y-auto rounded-t-2xl border-border bg-card p-0 shadow-elevated data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:bottom-auto sm:top-1/2 sm:max-h-[88dvh] sm:max-w-[520px] sm:-translate-y-1/2 sm:rounded-xl">
        <div className="h-1 w-full bg-primary" />
        <div className="p-6 sm:p-9">
          {succeeded ? (
            <div className="py-8 text-center" aria-live="polite">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Check /></div>
              <DialogTitle className="mt-5 text-[24px] font-heading">Message sent</DialogTitle>
              <DialogDescription className="mt-2 text-[14px]">We’ll get back to you shortly.</DialogDescription>
            </div>
          ) : (
            <>
              <DialogTitle className="max-w-[400px] text-[25px] font-heading leading-[1.08] text-foreground sm:text-[30px]">
                Let’s explore what Parleo can do for your business
              </DialogTitle>
              <DialogDescription className="mt-3 max-w-[390px] text-[14px] leading-[1.55] text-muted-foreground">
                Tell us where agentic commerce matters most to your team.
              </DialogDescription>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fs-name" className="mb-1.5 block text-[12px] font-medium text-foreground">Name</label>
                    <input id="fs-name" name="name" autoComplete="name" required className={inputClass} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label htmlFor="fs-email" className="mb-1.5 block text-[12px] font-medium text-foreground">Work email</label>
                    <input id="fs-email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="jane@company.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="fs-company" className="mb-1.5 block text-[12px] font-medium text-foreground">Company</label>
                  <input id="fs-company" name="company" autoComplete="organization" required className={inputClass} placeholder="Company name" />
                </div>
                <div>
                  <label htmlFor="fs-message" className="mb-1.5 block text-[12px] font-medium text-foreground">What would you like to solve?</label>
                  <textarea id="fs-message" name="message" rows={3} className={`${inputClass} h-auto resize-none py-3`} placeholder="A short note about your priorities" />
                </div>
                {error && <p className="text-[13px] text-destructive" role="alert">{error}</p>}
                <Button type="submit" size="lg" disabled={submitting} className="w-full">
                  {submitting ? "Sending…" : "Send request"}
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;