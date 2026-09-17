import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileCustomerDeck from "./MobileCustomerDeck";

const CustomerDeck = () => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <main className="min-h-[100dvh] w-full bg-code-bg">
      <Helmet>
        <title>Parleo Customer Introduction</title>
        <meta
          name="description"
          content="Private Parleo customer introduction presentation."
        />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>
      {isMobile ? (
        <MobileCustomerDeck />
      ) : (
        <div className="flex h-[100dvh] flex-col">
          <nav className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-background/10 bg-code-bg px-6 text-background lg:px-10" aria-label="Presentation links">
            <Link to="/" className="text-[15px] font-bold tracking-normal">PARLEO</Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-background/65 transition-colors hover:text-background">Homepage</Link>
              <Link to="/insights" className="text-sm text-background/65 transition-colors hover:text-background">Insights</Link>
              <Button asChild size="sm">
                <a href="https://parleo.io/audit/">Free audit <ArrowUpRight className="h-3.5 w-3.5" /></a>
              </Button>
            </div>
          </nav>
          <iframe
            src="/customerdeck-presentation.html"
            title="Parleo customer introduction presentation"
            className="block min-h-0 flex-1 w-full border-0"
            allow="fullscreen"
          />
        </div>
      )}
    </main>
  );
};

export default CustomerDeck;