# parleo.io design rules

v2 · Oct 23, 2026 · owner Samar

Decided Oct 23: Inter Tight only, P&G brands and baby care retired from the site, slop-list patterns in the design system retired on the site (system update proposed separately), new photography before the hero round.

Authority order: `parleo_design_prompt.md` (binding) > master context anchor §13 > this file. This file translates both for the website and adds what the seven reference sites taught. Where a reference conflicts with the system, the system wins. Run `node scripts/design-lint.mjs` before every review. It enforces sections 7 and 8 mechanically.

## 1. The bar

The site should feel like a company that has taste and has done the work. Every reference that reads as expensive does the same four things.

- **One dominant object per viewport.** A photo, a working demo, or a number. Never three competing panels.
- **Type carries the page.** One sans, one optional upright display face, few sizes, big jumps between them. Decoration is close to zero.
- **The product shows up doing one thing.** A cropped, composed moment of real function, sized so the point reads in three seconds.
- **Motion explains or it doesn't ship.** Each animation shows a change of state the visitor needs to understand. Everything else is still.

## 2. What each reference teaches (craft, not look)

| Site | What it does at a high level of craft | Where it applies to Parleo | Leave behind |
|---|---|---|---|
| new-gen.ai (Bakken & Baeck) | Four sections. Tiny UI type against huge negative space. The page background turns from cream to near-black at the narrative turn. A live query types out and resolves. | Home gets 7 sections at most. One background transition at the turn from "the shelf" to "the answer." | The scattering photo collage, the custom typeface |
| clay.com | The input box is a working toy. A table fills itself in as you watch. | The "ask the agent" demo (section 3) lets the visitor run a real audited query. | 3D clay mascots, pastel cards, pill tags |
| superhuman.com | Real product states in a tabbed carousel with a progress bar. One quote band. A footer wordmark at full width. | The console section: 3 or 4 tabs, each one real state, auto-advancing. | Maroon palette, serif headlines |
| stripe.com | Headline = dark lead sentence + muted continuation. Product cards whose UI changes in place (price and product swap). One numbers band. | Headline pattern sitewide (already in Samar's web-hero template). The list price to true price swap is Parleo's signature micro-interaction. | Wave gradient (mesh gradients are banned), the live GDP counter |
| mercury.com | Cinematic photo hero. A sticky, scroll-linked feature list where the right side morphs per step. | TrueSync's four modules as one sticky scroll-linked sequence instead of four cards. | AI-generated landscapes, soft rendered blobs |
| trychannel3.com | The search box is the hero. A line chart draws itself once. Three channels as a triad with big numerals. | A single chart that draws on entry (Share of Algorithm over a pilot, labeled modeled until real). | Stack Sans, the triad layout for two doors |
| aesop.com | One grotesk (Suisse) plus one upright humanist serif for section titles only. Cream canvas. Half-bleed photo beside a quiet text panel, alternating sides. Square outline buttons. Hovers are 250 to 500ms color changes. Almost no scroll animation. Product shot as material still life. The "Finder" is a tool, not a feature list. | Lifestyle sections use the half-bleed pair. Hover discipline sitewide. Restraint as the default. | Product grid carousels, retail chrome |

### Samar's three 2026 themes, translated

- **Frictionless demo.** One working demo on Home: pick an audited brand, watch the agent's real answer arrive, then see the price it missed. Data comes only from `src/content/findings.ts`. No invented queries.
- **Immersive micro-interactions.** Rationed (section 6). The signature moments are the background turn, the price swap, and the sticky module sequence. Grain lives only on dark photo panels. Color-shifting gradients are off-system, so the background transition does that job.
- **Contextual visual proof.** Each door shows evidence for its own audience. Brands see brand answers, retailers see member-price answers. Video, when used, is a composed product sequence or art-directed footage, never a raw screen recording.

## 3. Type

- **Inter Tight** for everything by default. Display: weight 600, tracking -0.035em, line-height 1.0. Body 17 to 18px, line-height 1.55.
- **Headline pattern:** dark lead + muted continuation in the same weight (`--muted`). No accent word in blue except once per page.
- **No serif.** Inter Tight carries every headline. Weight and scale make the hierarchy (decided Oct 23).
- **JetBrains Mono** only for machine text: agent queries, JSON, source lines. Not for labels above headings.
- Scale: hero 76 to 88px, section 48 to 56px, sub-head 22px, body 17px, small 14px. Five sizes per page, no more.

## 4. Color

- Canvas `#F2F0EF`, surfaces white, ink `#1E1E2E`. Beige frames the product and never becomes the product surface.
- Blue `#0166FF` is the precision signal. At most one blue element per viewport.
- Status colors (seen, partial, invisible, wrong) appear only inside status chips and data.
- Dark sections: ink over a photograph, two per page at most.

## 5. Imagery

The role split in `20261023_parleo_site_v2_design_brief_v2.md` stands.

- **Reference image:** the customer deck cover (`public/customerdeck-title-desktop.jpg`). Rich real goods on ink, blank tags on blue thread converging to one point, one product half turned to wireframe. Samar's favorite (Oct 25).

- **Lifestyle** sets context and mood: material, hands, shelves, real retail. Half-bleed, art-directed, one per section that needs it.
- **Product visuals** are purpose-built: cropped features and composed sequences, one story each, function accurate.
- The design system's four lifestyle images are blurred placeholders. New photography gets commissioned through `parleo-imagegen` per section brief before build, not reused across sections. The hero round starts with its photography (decided Oct 23).

## 6. Motion budget (per page)

| Allowed | Count |
|---|---|
| Signature scroll scene (background turn or sticky sequence) | 1 |
| Working demo | 1 on Home |
| Micro-interactions (price swap, tab progress, chart draw) | 3 |
| Section reveals | first object of a section only, opacity + 12px, 500ms |
| Hovers | color and opacity, 200 to 300ms, ease-out |

Easing `cubic-bezier(0.22, 1, 0.36, 1)`. No stagger longer than 60ms. `prefers-reduced-motion` turns every one of these off.

## 7. Layout

- Home: 7 sections at most. Each section states one idea and anchors on one object.
- No two consecutive sections share an anatomy. Rotate between half-bleed pair, full-width object, asymmetric 7/5 split, and single centered statement.
- Cards: hairline or fill, never both, never with a soft shadow. No row of three identical cards.
- The blue-square heading signature appears on 3 headings per page at most.

## 8. Do not use

- Italic type of any kind, serif or sans
- These design system pieces, even where the system offers them: `bg-grid-fine`, `site-texture`, `diffusion-glow`, `light-burn-*`, `atmos-*`, `texture-dots`, sitewide `grain-overlay`, and the `pulse-dot`, `float`, `shimmer`, `caret-blink`, `border-pulse` keyframes
- Eyebrow or kicker labels above headings
- 01 / 02 / 03 numerals on content that isn't a sequence
- Pulsing dots, blinking cursors, floating or bobbing elements, typewriter text outside the demo
- Count-up numbers outside one numbers band
- Glows, radial halos, glassmorphism, blur, mesh gradients, 3D, soft drop shadows
- Grid-line page backgrounds (a grid may sit inside a diagram)
- Fade-up on every element
- Stock icons, logo walls, rounded pill badges
- Invented data, unlabeled sample data, fake-precise numbers
- Em dashes, en dashes, semicolons in prose, and the banned word list

## 9. Content guardrails that shape design

- Every number on the page carries its source or the word "modeled."
- P&G portfolio brands (Pampers, Gillette, Oral-B and the rest) and baby care stay off the site while the pilot is live, per anchor §17 rule 16 (confirmed Oct 23). Evidence comes from Petco, adidas, Gap, Ulta, Nordstrom and Kimberly-Clark.
- Sephora is never framed as a partner.
- Verb triad: scores, tracks, optimizes.
- Examples come from the categories Parleo sells into: footwear, apparel, beauty, outdoor and specialty retail, where member value and promotions decide the sale. Never cheap grocery consumables (Samar, Oct 25).

## 10. Process

1. Keep/kill on every past section (pick board).
2. One section at a time. Two or three rendered directions, Samar picks, then build.
3. Each build is checked side by side against its named reference and the lint before Samar sees it.
4. No full-site rebuilds. Changes land as a revertible commit with a changelog line.
