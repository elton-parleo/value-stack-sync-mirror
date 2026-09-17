import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
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
        <iframe
          src="/customerdeck-presentation.html"
          title="Parleo customer introduction presentation"
          className="block h-[100dvh] w-full border-0"
          allow="fullscreen"
        />
      )}
    </main>
  );
};

export default CustomerDeck;