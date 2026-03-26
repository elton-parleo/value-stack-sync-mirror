import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ContactFormDialog from "./ContactFormDialog";

const navLinks = [
  { label: "The Channel", href: "#problem" },
  { label: "The Window", href: "#how-it-works" },
  { label: "Command Center", href: "#dashboard" },
  { label: "Protocol", href: "#integration" },
  { label: "Team", href: "#team" },
];

const Navbar = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-12 border-b border-border bg-background/90 backdrop-blur-xl"
            : "h-14 bg-background/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-full max-w-content items-center justify-between px-6 md:px-20">
          <a href="#hero" className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-foreground">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
              <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
            </svg>
            PARLEO
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-medium text-foreground/55 transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/demo"
              className="relative flex items-center gap-1.5 text-[13px] font-medium text-primary transition-colors hover:text-primary/80"
            >
              See it Live
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="ml-2 inline-flex items-center rounded-[4px] bg-foreground px-4 text-[13px] font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.97]"
              style={{ height: 34 }}
            >
              Get in touch
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-foreground"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-5 bg-foreground"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-foreground"
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-card p-8 pt-20"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-md px-3 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <Link
                  to="/demo"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-[15px] font-medium text-primary transition-colors hover:bg-secondary"
                >
                  See it Live
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse-dot" />
                </Link>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => { setMobileOpen(false); setContactOpen(true); }}
                  className="h-12 w-full rounded-[4px] bg-primary text-[15px] font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Get in touch
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default Navbar;
