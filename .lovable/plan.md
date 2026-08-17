# Site evolution: Free Audit funnel + Insights

Two additions and one structural change: promote the new free audit tool (audit.parleo.io) as the primary conversion path, restructure the nav for a multi-page site, and launch an Insights section seeded with the three LinkedIn posts.

## 1. Navigation restructure

Today the nav is a list of on-page anchors (Problem, Framework, Console, API, Protocols, Team). That doesn't scale once there are real pages. New structure:

```text
PARLEO    Product   Free Audit   Insights   Team          [Free Audit]  [Request demo]
```

- Anchors removed. Product is a link to the homepage product region; Free Audit, Insights, and Team become real routes.
- Persistent pill button "Free Audit" in primary blue-accented style, with "Request demo" beside it as the dark button.
- "How it works" is demoted from a nav button to a quieter text link (kept in the footer and inside the product sections, not in the top bar).
- Mobile drawer mirrors this: four links, then Free Audit as the primary full-width button and Request demo below it.
- Footer gains an Insights column and a Free Audit link.

## 2. Homepage changes

**Hero.** Primary CTA becomes "Run your free audit" (links to audit.parleo.io) with the arrow treatment. "Request a demo" becomes the secondary outlined button. "How it works" drops to a small underlined text link below the buttons. Under the buttons, a thin trust line: free, no email to start, ready in 10 to 20 minutes.

**New Agentic Value Audit section**, placed after the Share of Algorithm framework section (the audit is the proof of the framework) and before the console section. Design-forward interactive scorecard built in the Parleo system, modeled on the audit tool's sample report:

- Left column: headline "See what agents actually quote for your brand", short support copy, a URL input ("yourbrand.com") that on submit deep-links to `https://audit.parleo.io/?url=...`, plus three plain-language deliverables (Agentic Value Score, ranked fixes, dollar exposure).
- Right column: interactive scorecard card on the darker demo surface with the 2px blue top border. Animated score ring counting to 59/100 with the "readiness bar 60" tick, then three pillar bars filling in sequence: Visibility 25/32, Accessibility 14/18, True Value 15/50 with a "only Parleo measures this" marker in blue. A footer strip shows modeled dollar exposure counting up.
- Scroll-triggered once, Intersection Observer, 200ms fade-up, count-up on numbers. No new colors or effects outside the existing tokens.
- Section ends with a link to the public sample report on audit.parleo.io.

## 3. Insights section (blog)

Posts live as data files in the repo. Each new article you send gets added as one file; no CMS, no login.

**Index page `/insights`**: editorial listing. Featured lead post with its 1200x1200 card image, then a two-column list of the rest with date, read time, category (Research, Benchmark, Point of view), and title. Same warm background, hairline rules, no eyebrows.

**Article page `/insights/:slug`**: single-column measure-limited reading column, large headline, dateline, the accompanying visual full width inside the column, pull-quote treatment for the key stat lines, and a footer CTA block offering the free audit plus a link to the LinkedIn original.

**Seeded with the three posts:**

1. *The new shelf is being built for a customer that isn't human* (Aug 11) with the Patagonia blindspot image. Walmart/OpenAI Instant Checkout, Salesforce +200%, Adobe Prime Day, McKinsey $1T.
2. *Incentives are becoming pricing rails* (Aug 12) with the Chewy four-prices image. One bag, four published prices, agent quotes the worst one.
3. *How agents actually pick the "best price"* (Aug 12) with the Augustinus Bader card-status image. Profound feed vs scrape data, Nordstrom Anniversary Sale tiers, Salesforce 41%.

Copy is lightly edited from your LinkedIn text into web register: LinkedIn scaffolding ("More tomorrow", "This week we're going to share") removed, paragraphs kept, no em dashes, all numbers preserved exactly as published.

**Homepage tie-in**: a compact three-card Insights strip above the closing CTA, linking into `/insights`.

## Technical notes

- New routes in `src/App.tsx`: `/insights` and `/insights/:slug`. Both get per-route Helmet tags (title, description, self-referencing canonical, og:*) plus Article and BreadcrumbList JSON-LD. Note that social-preview crawlers only read the static `index.html` head on this stack, so link previews for individual articles will fall back to the sitewide tags.
- Content model: `src/content/insights/*.ts` exporting typed post objects (slug, title, dek, date, category, readTime, hero image, linkedInUrl, body blocks) plus an index. Body uses a small block union (paragraph, heading, list, stat, quote) rendered by one component, so no MDX toolchain is added.
- The three 1200x1200 images are uploaded as CDN assets via lovable-assets and referenced by pointer JSON, not committed as binaries.
- `public/sitemap.xml` updated with the new routes.
- New components: `Navbar` rewrite, `AuditSection.tsx`, `AuditScorecard.tsx`, `InsightsStrip.tsx`, `pages/Insights.tsx`, `pages/InsightPost.tsx`, `components/insights/PostBody.tsx`.
- All existing anchor IDs stay in place so in-page links from within sections keep working.
- Verified at mobile, tablet, and desktop widths with screenshots before handoff.

## Not included

- No changes to the existing Problem, Framework, Console, API, Protocols, or Team sections beyond removing their nav anchors.
- No standalone Product or Team page yet; those nav items scroll to the homepage regions until you want dedicated pages.
