import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Btn, Wordmark } from "@/components/primitives";

export default function CustomerDeck() {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px)");
    const f = (e: MediaQueryListEvent) => setMobile(e.matches);
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  const head = (
    <Helmet>
      <title>Parleo Customer Introduction</title>
      <meta name="description" content="Private Parleo customer introduction presentation." />
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
    </Helmet>
  );
  if (mobile) {
    return (
      <main style={{ height: "100dvh", background: "#0E0E14" }}>
        {head}
        <iframe src="/customerdeck-mobile.html" title="Parleo customer introduction" style={{ display: "block", width: "100%", height: "100%", border: 0 }} />
      </main>
    );
  }
  return (
    <main style={{ minHeight: "100dvh", background: "#0E0E14", display: "flex", flexDirection: "column" }}>
      {head}
      <nav style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid rgba(242,240,239,.1)" }} aria-label="Presentation links">
        <Link to="/" aria-label="Parleo home">
          <Wordmark size={14} dark />
        </Link>
        <div style={{ display: "flex", gap: 18, alignItems: "center", fontSize: 14, color: "rgba(242,240,239,.65)" }}>
          <Link to="/">Homepage</Link>
          <Link to="/insights">Insights</Link>
          <Btn to="/agentic-value-report" variant="blue" size="sm">
            Get your report
          </Btn>
        </div>
      </nav>
      <iframe src="/customerdeck-presentation.html" title="Parleo customer introduction" style={{ display: "block", flex: 1, width: "100%", border: 0 }} allow="fullscreen" />
    </main>
  );
}
