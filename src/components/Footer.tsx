const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="mx-auto flex h-14 max-w-content items-center justify-between px-6 md:px-20">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
          <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
        </svg>
        <span className="text-[13px] font-bold tracking-tight text-foreground">PARLEO</span>
      </div>
      <span className="text-[11px] text-parleo-muted">© 2026 Parleo, Inc.</span>
    </div>
  </footer>
);

export default Footer;
