# parleo.io v2

The Parleo marketing site: Home, Product (TrueSync), the Agentic Value Audit, Insights, and the agentic commerce field guide. Vite 5, React 18, TypeScript, React Router 6, Framer Motion 11. No CMS, no Tailwind, no component library. Design tokens live in `src/styles/tokens.css` and follow the Parleo master design prompt.

## Run it

```
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build into dist/
npm run preview    # serve dist/ on http://localhost:4173
```

`ARTIFACT=1 npx vite build` produces `dist-artifact/`, a relative-path, hash-routed copy used for claude.ai artifact previews. Never deploy that one.

## Deploy

GitHub to Vercel, framework preset Vite, build `npm run build`, output `dist`. `vercel.json` carries:

- the SPA fallback (every unknown path serves `index.html`)
- rewrites that keep the instant audit tool alive at `/audit` and `/api/public/soa-lite` (proxied to `soa-audit.vercel.app`)
- a `/demo` to `/product` redirect
- `noindex` headers on `/customerdeck*`
- immutable cache headers on `/img`, `/fonts`, `/logos`, `/insights`

Environment: `VITE_POSTHOG_KEY` (public PostHog project key, also in `.env`). Add it in the Vercel project settings; it is safe in the client bundle.

The audit request form posts to the Formspree endpoint in `src/components/AuditForm.tsx`, which delivers to samar@parleo.io. The OpenAI pixel and the lemlist tracker are in `index.html`.

## Where things live

- `src/pages/` one file per route: `Home`, `Product`, `Audit` (`/agentic-value-audit`), `Insights`, `InsightPost`, `WhatIsAgenticCommerce`, `CustomerDeck` (serves the static deck HTML in `public/`), `NotFound`
- `src/sections/` the eleven home sections (`Hero`, `Shift`, `Doors`, `Scoreboard`, `Machine`, `Findings`, `Tail` for the rest)
- `src/components/` nav, footer, the audit form, the agent window, the insight post renderer (`PostBody`), the guide charts, and `primitives.tsx` (wordmark, logos, reveal, count-up, buttons, glyphs, responsive picture)
- `src/content/findings.ts` the audit findings on the home page, every figure lifted from the shipped report named in `source`
- `src/content/insights/` one file per post, newest first in `index.ts`
- `public/img/` generated photography (sizes made by `scripts/images.mjs` from the originals in the Parleo workspace), `public/logos/` favicons fetched once and committed, `public/insights/` post art, `public/fonts/` Inter Tight, Newsreader and JetBrains Mono as variable TTFs

## Rules this site keeps

Every number on the site traces to a source named beside it or in `src/content/findings.ts`; modeled figures say modeled. Named companies are audited companies, not customers, and the site says so wherever they appear. No em dashes, no semicolons in prose, no eyebrows above headlines. Inter Tight everywhere, Newsreader only for title moments, JetBrains Mono only for machine values. Blue is the one precision signal, status colors are chips only.

## Adding an insight

Copy an existing file in `src/content/insights/`, give it a slug, date, category, image and body blocks (`p`, `h`, `list`, `stat`, `quote`, `pillars`, `leaks`, `flow`, `bars`, `ladder`, `record`, `eras`, `grid`, `sources`), add the image to `public/insights/`, import it in `index.ts` at the front of `posts`, and add the URL to `public/sitemap.xml`.
