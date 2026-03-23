# Memory: index.md
Updated: now

Parleo landing page design system, constraints, and key decisions.

## Design Tokens
- Background: #F2F0EF (HSL 30 8% 95%)
- Ink: #464555 (HSL 243 10% 22%) — darkened for readability
- Primary/Accent: #0166ff (HSL 213 99% 50%)
- Muted: #9896A8 (HSL 243 6% 63%)
- Font: Inter Tight everywhere
- Base body: 17px, line-height 1.7
- Body copy opacity: /50 (not /55 or /60)
- No glassmorphism, no gradients on bg, no pill shapes

## Contact
- All CTA buttons open ContactFormDialog, email goes to samar@parleo.io
- No "Read the docs" link (not available yet)

## Removals
- Removed "Read the docs →" link from hero
- Removed default App.css Vite styles
- Removed heavy parallax/scroll transforms (caused mobile issues)

## Copy Direction
- Infrastructure-confident, not pitch-deck
- Succinct, not story-like
- Product-first, Stripe/Plaid register

## Card Hover Effects
- All cards: hover:shadow-card-hover, hover:border-primary/20
- Bottom accent line on HowItWorks cards
- Code blocks: hover:shadow-elevated
