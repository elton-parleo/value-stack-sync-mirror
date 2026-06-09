
# Hero section rebuild

Scope: replace only `HeroSection` on `/`. Keep the existing design system, type, color, spacing, motion vocabulary, navbar, trust strip, and every section below. Do not touch any other file except the hero and its new sub-pieces.

## Copy (verbatim)

- Eyebrow: none.
- H1: `The incentive layer for AI commerce.`
- Subhead: `AI agents are the new comparison shopper. They see your list price, not your real one. Parleo makes loyalty, card-linked offers + true value machine-readable across every agent surface.`
- Primary CTA: `Request a demo` (opens existing `ContactFormDialog`).
- Secondary ghost CTA: `For developers →` (links to `/developers`; route does not exist yet, leave the link as `/developers` — out of scope to build).
- Microcopy under buttons: `Works across ChatGPT, Gemini, Perplexity & Copilot` rendered with small grayscale brand marks via existing `BrandLogo`.

No other stats, badges, or trust lines in the hero (the existing trust strip section directly below handles social proof). Remove the current MCP/ACP/OpenAPI/UCP protocol chip row and the editorial product image strip from the hero — they belong to other sections of the new page map.

## Layout

Single full-width hero, two-column on `md+`, stacked on mobile.

- Left column (≈42% on desktop): H1, subhead, CTA pair, microcopy with logo row. Keep `font-display` H1 at the current `44 / 64 px` scale, subhead at `17–18px` (raise from 16 to honor ≥18 body floor), `text-foreground/70`. Buttons reuse existing pill styles from current hero (foreground-fill primary + animate-border-pulse ghost), label updated.
- Right column (≈58%): the artifact (see below). Vertically center; on mobile it stacks below copy with the same artifact rendered at full width.
- Reuse `section-grid` background, the existing diffusion-glow, and the floating decorative icons. Drop `LiveDataWidget` import; the artifact replaces it.

## The artifact — ChatGPT recommendation flip

A single realistic ChatGPT window, not two side-by-side. Reuses the same `ChatWindow` chrome already proven in `ProblemSection` (window chrome, composer, share button, avatar) but lives in its own file so the Problem section is unaffected.

Sequence (auto-plays on mount, then loops every ~9s; pauses on hover; respects `prefers-reduced-motion` by rendering the end state immediately):

1. `t=0` — user bubble streams in: `Find me the best price on Tatcha The Water Cream.`
2. `t=0.6s` — assistant typing dots (~0.8s).
3. `t=1.4s` — assistant replies as a "standard agent" answer card:
   - Product header: Tatcha thumbnail (reuse `@/assets/tatcha-water-cream.png`), brand + name + 50ml line.
   - 4 retailer rows via `BrandLogo`: Amazon `$28.00` highlighted "Recommended", Sephora `$30.00`, Ulta `$30.00`, Nordstrom `$30.00`.
   - Footer line: `Recommending Amazon — lowest listed price.`
4. `t=3.5s` — a thin pill animates in above the answer card: `Parleo true-price layer active` with a pulsing primary dot. The card morphs (height-animated, content cross-fades) into the Parleo-enhanced version:
   - Same product header.
   - Retailer rows re-rank with Sephora at top, badge `True best deal`, price struck-through `$30.00` → `$14.64` in primary.
   - Compact incentive stack (3 lines max so it stays legible at ≥12.5px): `Rouge member −$6.00`, `Sephora Visa 4% back −$0.96`, `Birthday GWP value −$8.40`.
   - Recommendation line flips: `Recommending Sephora — beats Amazon by $13.36 after incentives.`
5. Holds ~3s, then resets.

Visual rules:
- Use the existing chat chrome verbatim (title bar, share pill, composer). Width capped at `max-w-[560px]` on desktop so it sits comfortably beside the copy; full width on mobile. All artifact text ≥12.5px; body in the assistant message ≥14px.
- Use `motion` `layout` + `AnimatePresence` for the card morph, `framer-motion`'s `useReducedMotion` to short-circuit to the final Parleo state.
- No live counters, ms badges, or "zero PII" line in the hero artifact — those belong on `/developers`. Keep the card calm.
- A small `Replay` text button (`text-[11px] text-foreground/40 hover:text-foreground/70`) sits under the chat window for users who want to re-trigger.

## Files

- Edit `src/components/HeroSection.tsx`:
  - Remove `LiveDataWidget` import, protocol chip row, product image strip, decorative floating icons stay.
  - Render new `<HeroChatArtifact />` in the right column.
  - Update subhead copy, secondary CTA label/link, microcopy.
- New `src/components/hero/HeroChatArtifact.tsx`:
  - Extracts the existing `ChatWindow`, `UserMessage`, `AssistantAvatar`, `RetailerRow`, `TypingDots` patterns (re-implemented locally to avoid coupling to `ProblemSection`).
  - Owns the auto-play state machine described above.
- New `src/components/hero/AgentLogosRow.tsx` (small): renders the four agent marks for the microcopy line using `BrandLogo` (`OpenAI`, `Google`, `Perplexity`, `Microsoft`).

No changes to `index.css`, tokens, navbar, or any other section. `ProblemSection` keeps using its own internal chat for the Why-now/Value-gap narrative; the hero artifact is a separate, calmer instance.

## Out of scope

- `/developers` route (link only).
- Removing or restyling sections below the hero.
- Changing tokens, fonts, or shadow variables.
