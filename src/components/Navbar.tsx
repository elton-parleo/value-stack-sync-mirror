import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ContactFormDialog from "./ContactFormDialog";
import AnnouncementBanner from "./AnnouncementBanner";
import { Button } from "@/components/ui/button";

const AUDIT_URL = "https://audit.parleo.io/";
const BANNER_KEY = "parleo_audit_launch_dismissed";

type NavItem = { label: string; to: string; external?: boolean };

const navItems: NavItem[] = [
  { label: "Product", to: "/#problem" },
  { label: "How it works", to: "https://parleo.io/demo", external: true },
  { label: "Insights", to: "/insights" },
  { label: "Team", to: "/#team" },
];


const Wordmark = ({ size = 20 }: { size?: number }) => (
  <>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
      <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
    </svg>
    PARLEO
  </>
);

const Navbar = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(BANNER_KEY) !== "1",
  );
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const dismissBanner = () => {
    sessionStorage.setItem(BANNER_KEY, "1");
    setBannerOpen(false);
  };

  const renderItem = (item: NavItem, className: string, onClick?: () => void) =>
    item.external ? (
      <a key={item.label} href={item.to} className={className} onClick={onClick}>
        {item.label}
      </a>
    ) : (
      <Link key={item.label} to={item.to} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50">
        <AnimatePresence initial={false}>
          {bannerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 36, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <AnnouncementBanner onDismiss={dismissBanner} />
            </motion.div>
          )}
        </AnimatePresence>

        <nav
          className={`relative transition-all duration-300 ${
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
        <div className="mx-auto flex h-full max-w-content items-center justify-between px-6 md:px-8 lg:px-20">
          <Link to="/" className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-foreground">
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-4 md:flex lg:gap-7">
            <div className="hidden items-center gap-5 lg:flex lg:gap-7">
              {navItems.map((item) =>
                renderItem(
                  item,
                  "relative whitespace-nowrap text-[13px] font-medium text-foreground/55 transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                )
              )}
            </div>

            <Button asChild size="sm">
              <a href={AUDIT_URL}>Free audit</a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setContactOpen(true)}
            >
              Request demo
            </Button>
          </div>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 flex-col gap-1.5 md:hidden"
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
          </Button>
        </div>
        </nav>
      </div>

      {/* Spacer to offset fixed nav + banner */}
      <div style={{ height: bannerOpen ? 92 : 56 }} className="transition-all duration-300" />


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
                {navItems.map((item) =>
                  renderItem(
                    item,
                    "rounded-md px-3 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary",
                    () => setMobileOpen(false),
                  )
                )}
              </div>
              <div className="mt-auto flex flex-col gap-2.5">
                <Button asChild size="lg" className="w-full">
                  <a href={AUDIT_URL} onClick={() => setMobileOpen(false)}>Run your free audit</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => { setMobileOpen(false); setContactOpen(true); }}
                  className="w-full"
                >
                  Request demo
                </Button>

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
