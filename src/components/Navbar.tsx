import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ContactFormDialog from "./ContactFormDialog";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Framework", href: "#share-of-algorithm" },
  { label: "Console", href: "#dashboard" },
  { label: "API", href: "#architecture" },
  { label: "Protocols", href: "#integration" },
  { label: "Team", href: "#team" },
];

const Navbar = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-12 border-b border-primary/10 backdrop-blur-xl"
            : "h-14 backdrop-blur-md"
        }`}
        style={{
          background: scrolled
            ? 'linear-gradient(135deg, hsl(213 99% 50% / 0.08) 0%, hsl(213 99% 50% / 0.04) 50%, hsl(213 99% 50% / 0.06) 100%)'
            : 'linear-gradient(135deg, hsl(213 99% 50% / 0.05) 0%, hsl(213 99% 50% / 0.02) 50%, hsl(213 99% 50% / 0.04) 100%)',
        }}
      >
        <div className="mx-auto flex h-full max-w-content items-center justify-between px-6 md:px-20">
          {isHome ? (
            <a href="#hero" className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
              </svg>
              PARLEO
            </a>
          ) : (
            <Link to="/" className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
                <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
              </svg>
              PARLEO
            </Link>
          )}

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {isHome && navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-medium text-foreground/55 transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            {!isHome && (
              <Link to="/" className="text-[13px] text-foreground/50 transition-colors hover:text-foreground">← Home</Link>
            )}
            <a
              href="#architecture"
              className="animate-border-pulse group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.04] px-3.5 text-[13px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/[0.07]"
              style={{ height: 32 }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              For developers
            </a>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center rounded-full bg-foreground px-4 text-[13px] font-medium text-background transition-colors hover:bg-foreground/85"
              style={{ height: 32 }}
            >
              Request Demo
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

      {/* Spacer to offset fixed nav */}
      <div className="h-14" />

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
                {isHome && navLinks.map((link, i) => (
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
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
                  How it Works
                </Link>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => { setMobileOpen(false); setContactOpen(true); }}
                  className="h-12 w-full rounded-full bg-foreground text-[15px] font-medium text-background transition-all hover:bg-foreground/85 active:scale-[0.98]"
                >
                  Request Demo
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