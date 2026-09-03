# Design System

Extracted directly from the `const C = {...}` and `const F = {...}` token objects that appear at the top of every prototype file (identical across all six). Use these values verbatim — do not approximate or "close enough" a hex code.

## Color tokens

```ts
export const colors = {
  dark:     '#1C0A06', // primary dark background (navbar, footer, dark hero slides), primary text on light backgrounds
  copper:   '#BF5E18', // primary brand accent — CTAs, active states, marquee background, category header eyebrows
  ivory:    '#F5EFE6', // primary light background (page background, text on dark)
  gold:     '#D4880A', // secondary accent — small eyebrow labels, icons, alpona motif strokes, footer column titles
  muted:    '#8C6A55', // secondary/tertiary text, scrollbar thumb, muted borders
  cream:    '#EDE3D6', // section background for alternating bands (Browse by Category, Instagram Strip, Trust Strip)
  whatsapp: '#25D366', // WhatsApp icon only — nowhere else
};
```

Common derived values seen throughout (reuse the same alpha patterns rather than inventing new ones):
- `rgba(212,136,10,0.18)` — subtle gold borders (navbar bottom border, marquee top/bottom border)
- `rgba(140,106,85,0.2)` – `0.5` — muted dividers, breadcrumb separators, disabled-looking text
- `rgba(28,10,6,0.62)` → transparent — gradient scrim over hero imagery for text legibility
- `rgba(245,239,230,0.3)` – `0.4` — faint ivory text/lines on dark backgrounds (photo placeholder captions, marquee dots)

## Typography

```ts
export const fonts = {
  display: "'Cormorant Garamond', serif", // headings, product names, big statement copy — used with italic for emphasis words
  ui:      "'DM Sans', sans-serif",        // body copy, nav, buttons, labels, prices
  bn:      "'Hind', sans-serif",           // every Bengali-script line — never render Bengali text in the other two fonts
};
```

Google Fonts import (identical across all prototypes):
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Hind:wght@300;400&display=swap" rel="stylesheet" />
```
Weights actually used: Cormorant Garamond 300/400/600 (+ italics 300/400/600), DM Sans 300/400/500, Hind 300/400. Don't pull in weights that aren't used.

### Type patterns observed
- Section eyebrow labels: `fontFamily: ui, fontSize: 10, fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase', color: copper` (e.g. "BROWSE BY CATEGORY", "FOLLOW @SUMAMSBOUTIQUE")
- Section headings: `fontFamily: display, fontSize: 'clamp(30px,3vw,42px)', fontWeight: 300, color: dark`, with an `<em>` emphasis word in `copper` italic
- Bilingual sub-header (`SubHeader` component): a short Bengali phrase in `Hind 11px gold`, a 16×1px gold divider line, then the English label in `DM Sans 10px uppercase 0.25em muted`
- Footer column titles: `DM Sans 9px, weight 500, letterSpacing 0.25em, uppercase, color gold`
- Prices: `DM Sans`, no currency conversion — always `₹` formatted with commas (e.g. `₹24,500`)

## Spacing

- Section horizontal padding: `clamp(40px, 6vw, 86px)` on desktop pages (stored as a `PAD` constant in the PDP file) — reuse this fluid clamp everywhere a section needs edge padding instead of fixed breakpoint values
- `Sumams_Boutique.html` homepage sections use a slightly different clamp: `clamp(32px, 6vw, 85px)` — treat both as "the same fluid padding pattern," implement as one shared Tailwind spacing token
- Section vertical padding is typically `80px`–`96px` top/bottom on desktop content sections

## Motifs & iconography

- **Alpona motifs** (`AlponaDivider`, `AlponaHero`, `AlponaMotif`) — hand-drawn inline SVGs using nested polygons/ellipses stroked in `gold`/`copper` at low opacity (0.25–0.45), referencing Bengali alpona (rice-paste floor art) patterns. These are custom SVG components, not an icon font or third-party icon set — port them as literal SVG React components.
- **Saree-draped figure** — the brand icon from `logo_transparent.png` / `saree_figure.png`, used as the navbar logo, footer watermark, and decorative accents.
- Custom inline SVG icons for: search, cart (with item-count badge), account, heart/wishlist (toggleable filled state), hamburger menu, WhatsApp — all hand-drawn to match stroke weight (`strokeWidth: 1.25`) and style, not from an icon library. Keep this convention for any new icons the real build needs (checkout, filters chevrons already follow this pattern).

## Motion

- **Marquee**: continuous horizontal scroll, items tripled in the array (`[...items, ...items, ...items]`) to loop seamlessly; pauses on hover (`.marquee-track:hover` in the injected stylesheet)
- **Hero**: auto-advances between `SLIDES` on a `SLIDE_DURATION = 5000` (ms) timer
- **Category/product tile hover**: image scales `1 → 1.03` over `0.55s ease`, with a dark overlay fade-in
- **Filter accordion (PLP sidebar)**: expand/collapse via `open` state, `+`/`−` toggle glyph, no animation library — CSS handles the transition
- **PDP accordion rows** (`Fabric & Weave`, `Occasion`, `Dimensions`, `Care`, `Shipping & Returns`): same expand/collapse pattern, `Fabric & Weave` defaults open, the rest closed
- **Sticky bottom bar (mobile PDP)**: appears after the user scrolls past the inline "Add to Bag" CTA — implement as a scroll-position-triggered fixed bar, not always-visible

## Placeholder imagery convention

Every image in every prototype is a CSS `gradient` string plus a dashed-border label describing the intended photography (e.g. `"Saree photography — Benarasi hero"`). There are no real photos anywhere in the prototypes. When building the real product/media system: keep the same aspect ratios the placeholders use (PDP gallery images default to `aspect-ratio: 3/4`) so that swapping in real photography later doesn't reflow any layout.

## Accessibility notes to carry forward

- Copper-on-ivory (`#BF5E18` on `#F5EFE6`) and gold-on-dark (`#D4880A` on `#1C0A06`) are the two color combinations used for interactive/emphasis text — verify both meet WCAG AA contrast at the font sizes actually used (many labels are 9–11px, which raises the bar); this is called out explicitly in the Build Prompt's Engineering Standards and must be checked in Phase 7 (Hardening).
