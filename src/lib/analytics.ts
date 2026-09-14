import posthog from "posthog-js";

const PROJECT_TOKEN = import.meta.env.VITE_LOVABLE_CONNECTOR_POSTHOG_API_KEY;
const REGION = import.meta.env.VITE_LOVABLE_CONNECTOR_POSTHOG_REGION || "us";

const API_HOST = REGION === "us" ? "https://us.i.posthog.com" : "https://eu.i.posthog.com";

export const isPostHogEnabled = Boolean(PROJECT_TOKEN);

export const initPostHog = () => {
  if (!PROJECT_TOKEN) {
    if (import.meta.env.DEV) {
      console.warn("PostHog project token is not configured.");
    }
    return;
  }

  posthog.init(PROJECT_TOKEN, {
    api_host: API_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    loaded: (ph) => {
      if (typeof window !== "undefined") {
        (window as unknown as { posthog?: unknown }).posthog = ph;
      }
    },
  });
};

export const capturePageView = (pathname: string) => {
  if (!isPostHogEnabled) return;
  posthog.capture("$pageview", { pathname });
};

export const captureEvent = (event: string, properties?: Record<string, unknown>) => {
  if (!isPostHogEnabled) return;
  posthog.capture(event, properties);
};

export const identifyUser = (email: string, properties?: Record<string, unknown>) => {
  if (!isPostHogEnabled) return;
  posthog.identify(email, properties);
};

export default posthog;
