import { useState } from "react";
import { Link } from "react-router-dom";

const DISMISSED_KEY = "parleo_banner_dismissed";

const AnnouncementBanner = () => {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(DISMISSED_KEY) === "1");

  if (dismissed) return null;

  return (
    <div className="relative flex items-center justify-center bg-primary px-4 py-2">
      <Link to="/demo" className="text-[13px] font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-80">
        Honey for Agents · Try the Live Demo →
      </Link>
      <button
        onClick={(e) => { e.stopPropagation(); sessionStorage.setItem(DISMISSED_KEY, "1"); setDismissed(true); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
};

export default AnnouncementBanner;
