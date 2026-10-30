import "./styles/tokens.css";
import "./styles/base.css";
import "./ds/ds.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { captureUtms, initPostHog } from "./lib/analytics";

declare const __HASH_ROUTER__: boolean;
const Router = __HASH_ROUTER__ ? HashRouter : BrowserRouter;

captureUtms();
initPostHog();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
);
