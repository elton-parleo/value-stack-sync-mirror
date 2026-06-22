
# Visual refinement plan

Goal: make the site feel handcrafted and quietly premium — Landor restraint with Aesop warmth, rendered through a technology-infrastructure lens. No new components, no eyebrows, no numbered markers, no gimmicks. Restore the atmospheric layer that was stripped, tighten the typography, and unify the rhythm between sections.

## What I will NOT do
- Not change fonts (Inter Tight stays). Not add Instrument Serif or any new typeface.
- Not add new sections, eyebrows, badges, kickers, numbered markers, or icon chrome.
- Not change copy.
- Not redesign individual components (HeroChatArtifact, DashboardSection internals stay as-is).
- Not introduce purple, glow, glassmorphism, or any prohibited effects.

## 1. Restore the atmospheric layer (globally, not per-section)

Right now `bg-grid-fine`, `light-burn-warm`, `atmos-warm`, `texture-dots`, and `section-divider` exist in `index.css` but are only used in the hero. Re-deploy them as a quiet, consistent system across the page so every section sits on the same crafted ground.

- **Page-level paper texture**: add one extremely faint global noise/dot layer fixed under `main` (opacity ~0.025), warm-neutral. Replaces the feeling that sections are just stacked white rectangles.
- **Per-section atmospherics**: assign each major section ONE atmospheric treatment, alternating quietly:
  - Hero — keep current grid + cool burn (already there).
  - ProblemSection — `texture-dots-faint` top-left, single warm burn bottom-right.
  - ShareOfAlgorithm — `bg-grid-fine` masked to the right edge only.
  - DashboardSection — flat warm surface, one hairline light-burn behind the artifact.
  - LifestyleStrip — no atmosphere (let the images breathe).
  - FeedSection — `texture-dots-faint` only.
  - IntegrationSection — single cool burn top-right.
  - TeamSection — flat, with hairline rules above and below.
  - CTASection — keep dark, add `atmos-cool-dark` (already exists, currently unused).
- **Hairline section dividers**: insert the existing `.section-divider` between every adjacent section so transitions feel deliberate instead of abrupt. One 1px gradient rule, centered, ~70% width.
- **Floating quiet marks**: bring back 2–3 very small, slow-floating geometric marks (a 1px circle, a 1px square, a single dot) using existing `animate-float`. Placed once in hero, once around DashboardSection, once near CTA. No icons, no metaphors — pure geometric punctuation.

## 2. Elevate typographic treatment (no font swap)

Inter Tight stays. The refinement is in *treatment*:

- **Display headlines**: increase tracking tightness (`tracking-[-0.045em]` on h1, `-0.035em` on section headings), bump display weight contrast (h1 stays 800, but section heads drop to 600 with larger size — currently they're 800/30–40px, which reads heavy and uniform). New scale: h1 unchanged, section heads 36/52px weight 600, card heads 18/20 weight 600.
- **Optical line-height**: h1 1.02 (currently 1.05), section heads 1.08, body unchanged.
- **Quiet color shift on headings**: headings render at `hsl(var(--foreground))` full strength; supporting paragraphs already at /70 — increase the contrast gap by moving section copy to /60. Makes the page feel composed instead of evenly gray.
- **Numeric treatment**: enable `font-feature-settings: "ss01", "tnum", "cv11"` on the body. Inter Tight has tabular and stylistic alternates that immediately read as "designed" — zero markup cost.
- **First-letter / first-line refinement**: on the first paragraph after each section heading, apply a subtle `text-balance` and a slightly heavier first line via `first-line:font-medium`. Editorial micro-touch, invisible until you notice it.
- **Remove uppercase clutter**: audit `font-label`/`font-label-wide` (uppercase 11px) usages. Where they're decorative rather than functional, drop to small caps via `font-feature-settings: "smcp"` or remove. Aesop-quiet, not SaaS-shouty.

## 3. Unify section rhythm

- **Vertical padding system**: standardize all major sections to `py-24 md:py-32` (currently inconsistent — some 16, some 24, some 20). Same breathing pattern everywhere.
- **Container**: every section uses `max-w-content` (1120px) with `px-5 md:px-20`. Audit and fix the 2–3 sections that drift wider.
- **Section heading block**: standardize the heading + lead-paragraph block to a single max-width (`max-w-[640px]`) and left-aligned. No centered headings, no full-width leads. Reads as a designed system, not a template.

## 4. Color discipline

- **Reserve `--primary` (#0166FF)** for: links, one accent rule per section, the single emphasis word per heading (if any already exists). Remove primary tint from large soft backgrounds where it's currently used as decoration.
- **Add one warm punctuation**: the existing `--accent-warm` (32 95% 52%) is defined but barely used. Use it exactly twice in the whole page — once as a 1px underline on a single word in the hero, once as a tiny dot marker in CTA. Restraint as the signature.

## 5. Micro-interactions (keep, don't add)

Existing `btn-lift`, `link-reveal`, `img-editorial`, `animate-shimmer`, `animate-float`, `animate-caret` all stay. Just audit that they're applied consistently:
- Every text link → `link-reveal`.
- Every pill button → `btn-lift`.
- Every editorial image → `img-editorial`.

No new animations.

## Files touched
- `src/index.css` — add page-level paper texture utility, refine type scale utilities (`section-heading`, `card-heading`), add `font-feature-settings` to body, add small-caps utility.
- `src/pages/Index.tsx` — insert `<div className="section-divider" />` between sections; wrap `<main>` with the paper-texture layer; standardize section spacing wrapper.
- Section components (`ProblemSection`, `ShareOfAlgorithmSection`, `DashboardSection`, `FeedSection`, `IntegrationSection`, `TeamSection`, `CTASection`) — add the one atmospheric treatment per section, standardize padding/container, apply the new heading max-width and weight.
- `src/components/HeroSection.tsx` — tighten h1 tracking, add warm-accent underline on one word, add one floating geometric mark.
- 2–3 small floating-mark elements added inline (pure divs, no new components).

## Technical notes
- All atmospheric layers use existing CSS utilities already defined in `index.css`. No new dependencies, no new assets.
- All changes are presentation-only (CSS + JSX class changes). No logic, no content, no new components.
- Mobile: every atmospheric layer uses `mask-image` fades and `opacity` low enough that it never adds visual weight on small screens; padding scale already responsive.
