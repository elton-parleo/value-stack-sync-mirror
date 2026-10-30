import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { capturePageView } from "./lib/analytics";

/* The home page ships in the main bundle; every other route loads on demand. */
const Product = lazy(() => import("./pages/Product"));
const Audit = lazy(() => import("./pages/Audit"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightPost = lazy(() => import("./pages/InsightPost"));
const WhatIsAgenticCommerce = lazy(() => import("./pages/WhatIsAgenticCommerce"));
const CustomerDeck = lazy(() => import("./pages/CustomerDeck"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    capturePageView(pathname);
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const t = window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
        return () => window.clearTimeout(t);
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div>
      <ScrollManager />
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/agentic-value-report" element={<Audit />} />
          <Route path="/agentic-value-audit" element={<Navigate to="/agentic-value-report" replace />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightPost />} />
          <Route path="/what-is-agentic-commerce" element={<WhatIsAgenticCommerce />} />
          <Route path="/about" element={<About />} />
          <Route path="/customerdeck" element={<CustomerDeck />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
