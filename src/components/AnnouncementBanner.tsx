import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AnnouncementBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative z-50 bg-primary"
      >
        <div className="mx-auto flex max-w-content items-center justify-center px-6 py-2 md:px-20">
          <Link
            to="/demo"
            className="group flex items-center gap-2 text-[13px] font-medium uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
          >
            Honey for Agents — Try the Live Demo
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              setDismissed(true);
            }}
            className="absolute right-4 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
