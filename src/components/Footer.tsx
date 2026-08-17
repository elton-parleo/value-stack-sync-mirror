import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="mx-auto max-w-content px-6 py-12 md:px-20">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="8" height="20" rx="1.5" fill="hsl(213,99%,50%)" />
              <rect x="14" y="6" width="8" height="12" rx="1.5" fill="hsl(213,99%,50%)" opacity="0.4" />
            </svg>
            <span className="text-[13px] font-bold tracking-tight text-foreground">PARLEO</span>
          </div>
          <p className="mt-3 max-w-[280px] text-[13px] leading-[1.55] text-foreground/55">
            The incentive intelligence layer for agentic commerce.
          </p>
        </div>

        <FooterCol title="Product">
          <FooterLink to="/#problem">Overview</FooterLink>
          <FooterLink to="/#dashboard">Console</FooterLink>
          <FooterLink to="/#architecture">API</FooterLink>
          <FooterExternal href="https://parleo.io/demo">How it works</FooterExternal>
        </FooterCol>

        <FooterCol title="Insights">
          <FooterLink to="/insights">All posts</FooterLink>
          <FooterLink to="/insights/incentives-are-becoming-pricing-rails">Pricing rails</FooterLink>
          <FooterLink to="/insights/how-agents-pick-the-best-price">Best price</FooterLink>
        </FooterCol>

        <FooterCol title="Company">
          <FooterExternal href="https://audit.parleo.io/">Free Audit</FooterExternal>
          <FooterLink to="/#team">Team</FooterLink>
        </FooterCol>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <span className="text-[11px] text-parleo-muted">© 2026 Parleo, Inc.</span>
        <span className="text-[11px] text-parleo-muted">Zero PII · {"<"}50ms</span>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <span className="text-[11px] font-medium tracking-[0.14em] text-foreground/40">
      {title.toUpperCase()}
    </span>
    <div className="mt-3 flex flex-col gap-2">{children}</div>
  </div>
);

const linkClass =
  "text-[13px] text-foreground/60 transition-colors hover:text-foreground";

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className={linkClass}>{children}</Link>
);

const FooterExternal = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className={linkClass}>{children}</a>
);

export default Footer;
