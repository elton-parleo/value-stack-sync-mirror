# parleo.io: instructions for any AI agent working in this repo

Lovable, Claude and any other agent read this file before changing anything here. It is the source of truth for how this site is built and what it must never lose. Keep it short and current. When a rule here conflicts with a general habit of yours, this file wins.

## What this is

The marketing site for **Parleo, the agentic commerce platform for brands and retailers**. Parleo publishes a company's catalog, pricing, promotions and member value to every surface AI agents read, checks what the agents say back every week, and shows the result in revenue.

- **Buyer:** CMOs, VPs of ecommerce, pricing and loyalty leaders at consumer brands and retailers. Write and design for them, not for developers.
- **Product, in the site's order:** Measure (Share of Algorithm, a 100-point score), TrueSync (one checked record published everywhere agents read), Value (member prices, points, funded offers in the answer), Fix (every fix ranked by dollars, owned and approved), Prove (a weekly readout in dollars).
- **Free entry offer:** the Agentic Value Report. The study and the report are free. A paid engagement is discussed only after.
- **Category term Parleo owns:** Share of Algorithm. Visibility 32 points, Accessibility 18, True Value 50.

## Stack and conventions

- Vite + React 18 + TypeScript + framer-motion. React Router. `react-helmet-async` for per-page meta.
- **Plain CSS, not Tailwind, not shadcn.** Styles live in `src/site/*.css`, `src/components/*.css`, `src/styles/tokens.css`. Files are layered by version (`v3.css` up to `v8.css`) and imported in that order on each page. Later files override earlier ones on purpose. Add new rules to the newest file. Do not convert to Tailwind and do not add a UI kit.
- Pages: `src/pages/*.tsx`. Home sections: `src/site/home/`. Product chapters: `src/site/product/`. Shared kit: `src/site/kit.tsx` (Head, Stat, Scan, useOnce, useReveal) and `src/site/v4kit.tsx` (Icon, Mark logos, App icons).
- Images: `public/img/vN/...` with `-900/-1440/-2048.webp` sizes. Fonts: `public/fonts/*.woff2` (TTF kept as fallback).
- `plugins/prerender-social.ts` writes a static HTML file per route with its own title, description, canonical and OG tags. Add every new public route to its `ROUTES` list and to `public/sitemap.xml`.
- `npm run build` must pass (`tsc -b && vite build`). Dev server runs on port 8080.

## Never remove or break (integrations)

- `index.html`: the OpenAI pixel (`oaiq`, pixel `UGrzczfCw4YFL1c76AUUoH`), the lemlist visitor tracking script, the Google Search Console verification meta.
- PostHog analytics in `src/lib/analytics.ts` (key from `VITE_LOVABLE_CONNECTOR_POSTHOG_API_KEY`), page views in `App.tsx`, UTM capture appended to every form.
- Formspree endpoint `https://formspree.io/f/xyklyajq` used by `AuditForm.tsx` and the careers form. Each form sends a `source` field.
- `vercel.json`: `/audit` and `/api/public/soa-lite` rewrites to the audit app, `/reports/*` proxied to the audit reports (noindex), `/customerdeck` noindex headers, `/demo` redirect, SPA fallback. parleo.io is served by Vercel, not by Lovable hosting.
- `.github/workflows/mirror.yml` (pushes `main` to the deploy repo). Do not edit or delete.
- `src/lib/mcp/`, `supabase/`, `.lovable/mcp/`: Parleo's public MCP server. Keep.
- `/customerdeck`, `public/customerdeck-*`: the unlisted customer deck. Keep the URL and the noindex.

## Design rules (short form; `DESIGN.md` has the long form)

- Canvas `#F2F0EF`, surfaces white, ink `#15161F`, one accent `#0166FF`. Dark sections are navy `#0B0E1A` to `#11141F`.
- Inter Tight for everything, JetBrains Mono only for machine text (labels, sources, code). No serif.
- Headlines: ink lead + grey continuation, a blue square as the full stop (`<Head lead more sq />`).
- Product UI is drawn at console grade: navy statement module with a blue top rule and one focal number, beside a white data panel with tinted verdict rows. One focal number per card. Vary text sizes so the eye knows where to land.
- Real brands, real products, real logos. No placeholder boxes, no stock icons (lightbulbs, rockets, handshakes), no blob people, no 3D.
- Motion explains a change of state or it doesn't ship. Respect `prefers-reduced-motion` for decorative motion.
- Every screen must look finished on a 390px phone. Never hide an image on mobile that desktop shows unless a phone version replaces it.

## Copy rules

- Plain, specific, confident. Written for a senior commerce executive. Lead with the point.
- **Never use em dashes or en dashes.** No semicolons in prose. Write number ranges as "15 to 25%".
- Banned words: unlock, elevate, empower, leverage (verb), seamless, game-changer, transformative, revolutionary, synergy, paradigm, holistic, delve, tapestry, testament, beacon, realm, foster, embark, pivotal, journey and landscape (metaphorical), "sticker price" (say list price).
- **Every number traces to a source or is labeled modeled.** Never invent a statistic, a quote, a customer, or an answer an assistant gave. If a fact isn't in the repo, ask.
- Never describe Sephora as a partner or customer. Never name a prospect as a customer.
- Source lines are a handful of words. No dates that make content look stale.

## Working with two editors (Lovable and Claude)

- `main` is the source of truth and the branch Lovable syncs. A merge to `main` goes live on parleo.io through the mirror workflow and Vercel.
- Claude works on a branch and opens a pull request. Merge with a merge commit, never squash or rebase, and never force-push `main`.
- Before handing over in either direction, let the other side finish and sync.
- Log meaningful changes at the top of `CHANGELOG.md`.
