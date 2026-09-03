# CLAUDE.md — Sumam's Boutique

Instructions for Claude (via Claude Code or any coding agent) working in this repository.

## What this project is

A production e-commerce website + admin CMS for **Sumam's Boutique**, a Bengal-heritage saree and jewellery brand. The visual design already exists as **six approved static HTML/React prototype files**, originally generated with Claude, plus two brand image assets. Your job is to rebuild that exact design as a real Next.js application with a live database and admin panel — not to redesign it.

## Read these first, in order

1. `docs/design-system.md` — exact colors, fonts, spacing tokens, motifs, animation timings
2. `docs/component-inventory.md` — every component that exists in the six prototype files, and what it becomes in the new codebase
3. `docs/content-data-model.md` — every hardcoded data array in the prototypes (hero slides, products, categories, filters, footer links, trust items, etc.) — this *is* the schema for `content_blocks` and the seed data
4. `docs/page-specs.md` — section-by-section breakdown of each page, mapped to routes
5. `docs/database-schema.md` — full Postgres schema
6. `docs/admin-cms-spec.md` — what the admin panel edits and how it maps back to the data model
7. `Sumams_Boutique_Build_Prompt.md` — the full technical specification (tech stack, engineering standards, phase list)
8. `Sumams_Boutique_Build_Plan.md` — the execution roadmap (day-by-day phases, exit criteria, timeline)

Docs 1–6 are **extracted directly from the prototype source code** (not paraphrased from memory) — treat them as ground truth over your own assumptions about what "a saree boutique site" should look like.

## Source prototype files (reference, do not delete)

| File | What it is |
|---|---|
| `prototypes/Sumams_Boutique.html` | Desktop homepage |
| `prototypes/Sumams_Boutique_PLP.html` | Desktop product listing page |
| `prototypes/Sumams_Boutique_PDP.html` | Desktop product detail page |
| `prototypes/Sumams_Boutique_Mobile.html` | Mobile homepage |
| `prototypes/Sumams_Boutique_Mobile_PLP.html` | Mobile product listing page |
| `prototypes/Sumams_Boutique_Mobile_PDP.html` | Mobile product detail page |
| `prototypes/logo_transparent.png` | Full wordmark + saree-draped woman icon |
| `prototypes/saree_figure.png` | Icon/motif alone |

These are standalone Babel-in-browser React files (`<script type="text/babel">`), not a Next.js app. Do not serve them directly — port their JSX/logic into the real app per `docs/component-inventory.md`.

## Non-negotiable rules

1. **Design fidelity is a hard requirement, not a suggestion.** Every color, font, spacing value, and animation in `docs/design-system.md` must be reproduced exactly. If you think something should look different, ask — don't silently improve it.
2. **Don't invent content that already exists in the prototypes.** Hero copy, footer links, filter categories, trust-strip text, Bengali script lines — all of it is in `docs/content-data-model.md`. Use it verbatim as seed data.
3. **All placeholder imagery in the prototypes is a CSS gradient**, labeled with a photography brief (e.g. "Saree photography — Benarasi hero"). None of it is a real photo. Build the product/CMS image fields so real photography drops in later without layout changes — do not treat the gradients as final art.
4. **Desktop and mobile are two deliberate, separate designs**, not one responsive compromise. The prototypes ship them as separate files on purpose. Rebuild as one responsive codebase, but the output at each breakpoint must match its corresponding prototype file exactly — see `docs/page-specs.md` §"Responsive strategy".
5. **Every write path (storefront checkout, admin CRUD) is validated server-side with Zod, regardless of client-side validation.** See the Build Prompt for the full engineering standards.
6. **Follow the phase order in `Sumams_Boutique_Build_Plan.md`.** In particular: do not wire real data into the storefront until the static pixel-fidelity pass (Phase 2) is signed off — mixing fidelity bugs with data bugs makes both harder to debug.

## Tech stack (fixed)

Next.js 14+ (App Router, TypeScript strict) · Tailwind CSS · Zustand (cart/wishlist) · Supabase (Postgres + Auth + Storage) · Zod · Razorpay (primary) + Stripe (secondary) · Vercel · Vitest + Playwright · GitHub Actions · Sentry.

Full rationale and standards in `Sumams_Boutique_Build_Prompt.md`.

## When something is ambiguous

- If the prototypes and the docs disagree, the **prototype source code wins** — the docs were extracted from it, so a mismatch means the doc extraction missed something; flag it rather than guessing.
- If a feature is needed for a working store but has no prototype (checkout, account pages, order confirmation), build it in the same visual language (tokens from `docs/design-system.md`) and flag it as a new screen needing design sign-off.
- If in doubt about scope, the Build Prompt's Acceptance Criteria section is the definition of "done."
