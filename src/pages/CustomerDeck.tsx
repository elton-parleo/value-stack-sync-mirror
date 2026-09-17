import { Helmet } from "react-helmet-async";
import MobileCustomerDeck from "./MobileCustomerDeck";

const CustomerDeck = () => (
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
    <MobileCustomerDeck />
    <iframe
      src="/customerdeck-presentation.html"
      title="Parleo customer introduction presentation"
      className="hidden h-[100dvh] w-full border-0 md:block"
      allow="fullscreen"
    />
  </main>
);

export default CustomerDeck;