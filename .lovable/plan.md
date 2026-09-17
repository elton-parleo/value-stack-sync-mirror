# Responsive customer deck

## Goal
Make `/customerdeck` genuinely readable on phones without weakening or changing the existing desktop presentation.

## Experience
- Detect narrow screens automatically using responsive layout rules, not browser or device-name detection.
- Keep the current 16:9 presentation unchanged on tablet and desktop.
- Deliver a dedicated vertical story on phones, using the same 13-slide sequence and preserving every claim, label, statistic, citation, and presenter detail.
- Let visitors scroll naturally rather than pinch, zoom, or rotate their phone.

## Mobile design
- Recompose each slide as one or more portrait sections with readable type, generous spacing, and clear hierarchy.
- Preserve the deck’s dark opening, warm editorial body, blue signal color, product photography, diagrams, comparison tables, and closing call to action.
- Convert wide diagrams and dense tables into stacked mobile-native sequences without removing information.
- Add a compact sticky progress indicator and a discreet option to open the desktop presentation.
- Keep the page private and unlinked, with all existing search-engine blocking intact.

## Technical approach
- Build the mobile story as a React presentation using structured content extracted from the existing deck, rather than trying to override fixed 1920×1080 coordinates.
- Use CSS media queries to select mobile or desktop immediately and respond correctly to rotation or window resizing.
- Keep the existing embedded deck as the desktop source, avoiding risky changes to its presentation engine.
- Use the existing Parleo tokens, imagery, and typography so both versions feel like one presentation.

## Validation
- Compare all 13 mobile sections against the original slides to confirm no content is lost.
- Test at representative phone widths, including 320px, 390px, and 430px.
- Verify readable text, no horizontal overflow, working links, sticky progress, orientation changes, and preserved desktop behavior.
- Confirm `/customerdeck` and its presentation assets remain excluded from search indexing and site navigation.
