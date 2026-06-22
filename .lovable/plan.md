
# Redesign: Atmosphere + Chrome Pass

Goal: evolve the current site into something that feels handcrafted by a Landor-meets-Aesop design studio — quiet authority, editorial pacing, deliberate detailing — while keeping the existing tech-infra credibility, color system, and Inter Tight typography.

No new fonts. No palette change. No restructured sections. The work is in the connective tissue: how sections open, how they breathe, how the eye moves between them, and the micro-details that signal a single authoring hand.

---

## 1. A unifying section-chrome system

Every major section on the landing page (`HeroSection`, `SocialProofSection`, `ProblemSection`, `ShareOfAlgorithmSection`, `DashboardSection`, `LifestyleStrip`, `FeedSection`, `IntegrationSection`, `TeamSection`, `CTASection`) gets the same opening "header block" so the page reads as one composition instead of stacked modules.

Components of the header block (built once, reused):

- A monospaced section index in the top-left margin: `01 — Index`, `02 — Problem`, `03 — Mechanism`, etc. Small, `#8A8996`, letter-spaced.
- A short kicker label on the right margin (e.g. `Field guide / 2026`, `Mechanism`, `Network`) acting as a running header, magazine-style.
- A single hairline rule (1px, `#E5E0DA`) spanning the content column directly under the kicker row.
- The section H2 sits below the rule with generous space above (clear `pt-` rhythm).
- An optional one-line standfirst in a slightly larger, looser body weight, capped at a narrow measure (~ 52ch).

This single repeated frame is the biggest single move — it's the device that makes the whole page feel authored.

## 2. Section dividers and page rhythm

- Replace the current ad-hoc spacing with a strict vertical scale: 120px desktop / 72px mobile between sections, 40px between header block and content.
- Introduce a "breath" divider between sections: full-width hairline + a single mono caption centered or right-aligned underneath (e.g. `↓ continue`, `§ 03`). No decorative SVGs.
- Audit and remove the noisier ambient effects that currently fight each other (overlapping `light-burn-*`, `bg-grid-fine`, `section-grid`, `texture-dots`, `diffusion-glow`, `animate-shimmer`). Keep at most one atmospheric layer per section, and only where it earns its place (hero, CTA). Most sections should sit on the flat warm `#F2F0EF`.

## 3. Micro-typography and caption system

- New `<Caption>` primitive: 11px mono (`JetBrains Mono`, already approved for code), `#8A8996`, uppercase, +0.12em tracking. Used for: figure labels, image credits, "Fig. 01", "Live data", "Source: …", running headers.
- Pull-quote / standfirst variant: 20–22px Inter Tight, weight 400, looser leading, used once per section maximum.
- Numerals get tabular-nums everywhere they appear in tables, stats, prices (Dashboard, ShareOfAlgorithm, FeedSection).
- Hanging punctuation on the hero H1 and any other large display headline (negative text-indent trick) — a small detail, but very Pentagram.

## 4. Hero refinements

- Add the new section header chrome: `00 — Parleo` top-left, `Field guide / 2026` top-right, hairline, then the existing H1.
- Tighten H1 tracking by another notch on desktop and reduce the warm/cool burn intensity so the headline carries the weight, not the background.
- Replace the two CTAs' current pill+pill pairing with a slightly more editorial treatment: primary stays pill, secondary becomes a text link with the `link-reveal` underline already in CSS and a small mono prefix (e.g. `→ How it works`). Keeps hierarchy clearer.
- Add a thin mono caption under the artifact: `Fig. 01 — Agent response with Parleo true-cost layer`.

## 5. LifestyleStrip → editorial moment

Currently feels like a decorative band. Convert it into one of the two sanctioned photography moments:

- Wrap it in the new section chrome (`05 — Field`, kicker `Where this lives`).
- Add a single mono caption under the strip: 3–4 short comma-separated nouns describing the imagery world (e.g. `Beauty counters. Apparel floors. Loyalty desks.`). No headlines.
- Keep the variable-width / fixed-height layout. Slow the hover from current to ~1200ms with the existing `img-editorial` easing. Add a very subtle grayscale-to-color transition on hover, off by default, so the strip reads as a tonal band at rest.

## 6. SocialProof, Team, Integration polish

- SocialProof: replace the marquee energy with a static, evenly distributed logo row under the new section chrome. Mono caption above: `In use with`. Logos at a single consistent height, grayscale at rest, no hover color change (quieter than current).
- Team: add `08 — Authors` index, kicker `Who's building this`. Founder cards keep current structure but lose any drop-shadow; sit on hairline borders only. Logos under each founder stay grayscale, single height.
- Integration: add `07 — Surfaces` index. Protocol chips already exist; align them to a strict grid and add a mono caption row above each group.

## 7. Motion: less, slower, more deliberate

- Standardize all entrance animations on a single easing (`cubic-bezier(0.22, 1, 0.36, 1)`) and a single duration (700ms), with a 60–80ms stagger between siblings.
- Remove `animate-float`, `animate-shimmer` ambient loops from non-hero contexts.
- Keep `btn-lift`, `link-reveal`, `img-editorial`. These are already on-brand.
- Add one new shared primitive: `<SectionReveal>` — wraps a section's header block and fades + lifts it 12px on first intersection. Used by every section so the page has a single, recognizable arrival cadence.

## 8. Mobile detailing

- Section index + kicker stack vertically on mobile, both at 10px mono, with the hairline still spanning full width.
- Vertical rhythm collapses from 120px → 72px between sections, 32px between header block and content.
- All H2s clamp to a tighter scale on mobile so the page no longer feels like blown-up desktop type.

---

## Technical section (for implementation)

New files:

- `src/components/editorial/SectionHeader.tsx` — props: `index` (e.g. `"02"`), `title`, `kicker`, `standfirst?`. Renders mono index left, kicker right, hairline, H2, optional standfirst.
- `src/components/editorial/Caption.tsx` — mono caption primitive with `align` prop.
- `src/components/editorial/SectionReveal.tsx` — Framer Motion wrapper with the standardized fade+lift.
- `src/components/editorial/SectionDivider.tsx` — full-width hairline with optional centered mono label.

CSS additions in `src/index.css` (no token changes, only new utilities):

- `.font-mono-caption` — JetBrains Mono, 11px, uppercase, +0.12em tracking, `text-foreground/55`.
- `.rule-hairline` — 1px, `hsl(var(--border) / 0.7)`, full width.
- `.measure-narrow` — `max-width: 52ch`.
- `.hanging-quote` — negative text-indent helper for display headlines.
- Remove or scope down: `.diffusion-glow`, `.animate-shimmer` global usage, `.section-grid` where it duplicates `.bg-grid-fine`.

Tailwind config: add JetBrains Mono via `@fontsource/jetbrains-mono` (install with `bun add @fontsource/jetbrains-mono`, import in `src/main.tsx`, add `mono: ['"JetBrains Mono"', 'monospace']` to `fontFamily`).

Sections to refactor to use `SectionHeader` + `SectionReveal` + the new spacing scale:

```text
HeroSection                 00 — Parleo        kicker: Field guide / 2026
SocialProofSection          01 — In use        kicker: Partners
ProblemSection              02 — Problem       kicker: The gap
ShareOfAlgorithmSection     03 — Mechanism     kicker: Share of algorithm
DashboardSection            04 — Console       kicker: Merchant view
LifestyleStrip              05 — Field         kicker: Where this lives
FeedSection                 06 — Signal        kicker: Live feed
IntegrationSection          07 — Surfaces      kicker: Protocols
TeamSection                 08 — Authors       kicker: Who's building this
CTASection                  09 — Begin         kicker: Request access
```

Ambient-effect audit (pass per file): remove any `light-burn-*`, `texture-dots*`, `bg-grid-fine`, `section-grid`, `animate-shimmer`, `diffusion-glow` that isn't doing visible, intentional work. Target: at most one ambient layer in Hero and CTA; everything else flat.

Out of scope (explicit):

- No font swap. Inter Tight stays as primary; JetBrains Mono only added for captions/indices.
- No color token changes.
- No section additions, deletions, or reordering.
- No copy rewrites in this pass (only the new chrome labels: indices, kickers, captions).
- No new images generated — LifestyleStrip uses existing assets.
