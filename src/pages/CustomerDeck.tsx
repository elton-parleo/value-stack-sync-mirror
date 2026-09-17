import { Helmet } from "react-helmet-async";

const CustomerDeck = () => (
  <main className="h-[100dvh] w-full overflow-hidden bg-code-bg">
    <Helmet>
      <title>Parleo Customer Introduction</title>
      <meta
        name="description"
        content="Private Parleo customer introduction presentation."
      />
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
    </Helmet>
    <iframe
      src="/customerdeck-presentation.html"
      title="Parleo customer introduction presentation"
      className="block h-full w-full border-0"
      allow="fullscreen"
    />
  </main>
);

export default CustomerDeck;