

# Plan: Messaging Refresh + Aspirational Imagery

## Summary

Two workstreams: (1) update copy across both pages to use your sharper CTAs, and (2) generate and integrate high-end lifestyle/beauty imagery using AI image generation to break up the text-heavy feel, inspired by New Gen's editorial product photography aesthetic.

---

## Part 1: Copy & Messaging Updates

The goal is to weave your new CTAs into existing sections without adding bulk. Replace or evolve current copy rather than stacking more text.

### Homepage

| Section | Current Copy | New Copy |
|---------|-------------|----------|
| **HeroSection** subhead | "AI agents see prices. They can't see your loyalty program..." | "Parleo gives agents a pre-computed true-cost and product-intelligence layer in a single API call." |
| **ProblemSection** h2 | "Agents are already shopping for your customers." | Keep h2, update body to: "Without Parleo, agents rank by headline price and sparse specs, missing loyalty, promos, and card-linked value." |
| **FeedSection** h2 body | "Loyalty programs, card offers, and incentive logic from 38+ merchants..." | "One API call instead of 8-12 tools: Parleo pre-computes product identity, true-cost deal signals, and semantic content so your agent can skip web search and focus tokens on last-mile personalization." |
| **FeedSection** card 1 (Structured Feed) desc | "Public offers, loyalty tiers..." | "Unified product graph: our taxonomy normalizes SKUs across merchants into canonical objects your tools/skills layer can reuse across many agents and query patterns." |
| **FeedSection** card 3 (Semantic Intelligence-ish) | Current "Full control when you're ready" | "Shopping-specific semantics: cached briefs, review digests, ranked shortlists, and clarifying questions help your agent ask smarter questions and give clearer answers." |
| **DashboardSection** body | "Margin floors. Liability targets..." | "Control economics in agent channels: set guardrails on margin, liability burn, and offer exposure instead of leaving decisions to opaque ranking logic." |
| **HowItWorks** body | "AI agents are already making purchase recommendations..." | "Make loyalty, promos, and card-linked offers visible to agents, so your best customers don't see you as 'just another price' in Gemini, ChatGPT, or Perplexity." |
| **HowItWorks** benefit card "Keep full control" body | Current text | "See which incentives move the needle: the Command Center shows which programs and offers actually shift agent recommendations and conversions." |
| **CTASection** subhead | "Working with merchants getting ahead..." | "The result: Parleo changes which merchant wins the recommendation, not just the price shown." |

### Demo Page

| Section | Current Copy | New Copy |
|---------|-------------|----------|
| **DemoHero** body | "AI agents research products across dozens..." | "See how agents use Parleo to compute true cost across merchants in one step." |
| **ShoppingIntelligence** h2 | "Three layers of intelligence. One API call." | Keep h2, update subline to: "Everything an agent needs pre-computed: product identity, true-cost deal signals, and semantic content." |
| **ShoppingIntelligence** card bodies | Tighten to match the unified-graph / deal-signals / semantics language from your CTAs |
| **DemoFooterCTA** h2 | "The true cost layer your agents are missing." | Keep. Update body to: "With Parleo, agents call a single /true-cost endpoint that returns normalized products, effective price, and ready-to-use rationales." |

---

## Part 2: Aspirational Lifestyle Imagery

### Approach
Use AI image generation (Gemini model) to create 4-5 high-end, studio-quality lifestyle images. Inspired by New Gen's editorial aesthetic: warm tones, beauty/luxury products, textural close-ups, aspirational but grounded.

### Images to generate

1. **Hero background accent** (homepage): Abstract luxury beauty still-life, soft warm lighting, beauty products arranged artfully. Placed as a subtle background image behind the right side of the hero (behind or replacing the LiveDataWidget area on wider screens), with low opacity so it doesn't compete with text.

2. **ProblemSection accent**: Close-up lifestyle shot of someone using a phone/device while shopping, high-end editorial feel. Placed as a small inset image next to the chat mockup or as a subtle background.

3. **DemoHero hero image**: Aspirational beauty/retail lifestyle image, editorial quality. Placed to the right of the demo hero copy (currently empty space), similar to how New Gen uses product imagery alongside their hero text.

4. **ShoppingIntelligence section**: A curated flat-lay of luxury products (beauty, outdoor gear, electronics depending on which feels most universal). Used as a background or accent strip.

5. **CTASection / DemoFooterCTA**: A warm, textural close-up (fabric, product surface, hands) used as a subtle background element to add warmth.

### Integration pattern
- Images stored in `src/assets/` (or `public/images/`)
- Used with low opacity (0.08-0.15) as background accents, or as contained editorial images in dedicated image blocks
- Responsive: hidden or scaled on mobile to avoid layout issues
- Applied with `object-cover`, rounded corners, and subtle shadow to match the design system

### Image generation process
- Use the Gemini image generation API via `code--exec` to create each image
- Save to `public/images/` for static serving
- Prompts will emphasize: studio lighting, warm tones, editorial quality, no text in images, luxury/aspirational feel, muted color palette compatible with the site's warm background (#F2F0EF)

---

## Technical Details

### Files modified
- `src/components/HeroSection.tsx` — copy update + hero lifestyle image
- `src/components/ProblemSection.tsx` — copy update + optional accent image
- `src/components/FeedSection.tsx` — copy updates on h2 body + card descriptions
- `src/components/DashboardSection.tsx` — copy update on body
- `src/components/HowItWorks.tsx` — copy updates on body + benefit card
- `src/components/CTASection.tsx` — copy update + background image accent
- `src/components/demo/DemoHero.tsx` — copy update + hero image placement
- `src/components/demo/ShoppingIntelligence.tsx` — copy updates + accent image
- `src/components/demo/DemoFooterCTA.tsx` — copy update

### Files created
- `public/images/hero-lifestyle.png`
- `public/images/demo-hero-lifestyle.png`
- `public/images/shopping-editorial.png`
- `public/images/cta-texture.png`
- Up to 5 generated images total

### Approach
- Copy changes first (quick, high-impact)
- Image generation second (iterative, with QA)
- Each image tested for visual harmony with the warm background and blue accent palette

