/**
 * PostHog loads after the page is interactive, off the critical path.
 * Events captured before it is ready are queued and flushed on init.
 */
import type { PostHog } from "posthog-js";

/* Same PostHog project as the previous site. Lovable's connector writes the key under its own name. */
const PROJECT_TOKEN = (import.meta.env.VITE_LOVABLE_CONNECTOR_POSTHOG_API_KEY || import.meta.env.VITE_POSTHOG_KEY) as string | undefined;
const API_HOST = (import.meta.env.VITE_LOVABLE_CONNECTOR_POSTHOG_REGION || "us") === "eu" ? "https://eu.i.posthog.com" : "https://us.i.posthog.com";

export const isPostHogEnabled = Boolean(PROJECT_TOKEN);

let client: PostHog | null = null;
const queue: Array<[string, Record<string, unknown> | undefined]> = [];

export const initPostHog = () => {
  if (!PROJECT_TOKEN || typeof window === "undefined") return;
  const load = () =>
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(PROJECT_TOKEN, {
        api_host: API_HOST,
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
      });
      client = posthog;
      for (const [e, p] of queue.splice(0)) posthog.capture(e, p);
    });
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(load, { timeout: 2500 });
  else window.setTimeout(load, 1200);
};

const capture = (event: string, properties?: Record<string, unknown>) => {
  if (!isPostHogEnabled) return;
  if (client) client.capture(event, properties);
  else queue.push([event, properties]);
};

export const capturePageView = (pathname: string) => capture("$pageview", { pathname });

export const captureEvent = (event: string, properties?: Record<string, unknown>) => capture(event, properties);

/* Campaign attribution: the first UTM set a visitor lands with rides along on every form they send. */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "li_fat_id"];
export const captureUtms = () => {
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = q.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length && !sessionStorage.getItem("pl_utm")) sessionStorage.setItem("pl_utm", JSON.stringify({ ...found, landing: window.location.pathname }));
  } catch {
    /* storage can be blocked; attribution is best effort */
  }
};
export const appendUtms = (fd: FormData) => {
  try {
    const raw = sessionStorage.getItem("pl_utm");
    if (!raw) return;
    Object.entries(JSON.parse(raw) as Record<string, string>).forEach(([k, v]) => fd.append(k, v));
  } catch {
    /* best effort */
  }
};
