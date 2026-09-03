# Build Plan: Sumam's Boutique — E-Commerce Website + Admin CMS

Execution roadmap for the project specified in `Sumams_Boutique_Build_Prompt.md`. That document is the *what/how*; this document is the *in what order, with what checkpoints*.

Timeline estimates assume a **small team of 1–2 full-stack developers** working focused sprints. If you're solo, roughly double the durations. Each phase ends with an explicit exit checklist — don't move to the next phase until it's satisfied, since later phases (data layer, admin) build directly on earlier ones (design tokens, schema).

---

## 0. Pre-Kickoff Setup (Day 0–1)

Infrastructure and accounts must exist before any code is written.

- [ ] Create GitHub repo, protected `main` branch, PR-required merges
- [ ] Create two Supabase projects: `sumams-staging`, `sumams-production`
- [ ] Create Vercel project, link to repo, connect both Supabase projects as separate environments (Preview → staging, Production → production)
- [ ] Register Razorpay account (test + live keys) and Stripe account (test + live keys)
- [ ] Set up Sentry project (one for storefront, or shared with tags)
- [ ] Decide analytics: Vercel Analytics (zero-config) or GA4 (needs a property + consent banner if targeting EU traffic)
- [ ] Domain + DNS pointed at Vercel (can be done later, doesn't block dev)
- [ ] Scaffold `.env.example` covering: Supabase URL/anon/service keys, Razorpay key/secret, Stripe key/secret/webhook secret, Sentry DSN

**Exit criteria:** repo exists, CI runner has access to a staging Supabase instance, `next dev` runs a blank app locally.

---

## Phase 1 — Foundation (Days 1–4)

**Goal:** empty but fully wired skeleton — nothing visual yet, but every tool in the stack is proven to work together.

- [ ] `create-next-app` with TypeScript strict, App Router, Tailwind
- [ ] Route groups scaffolded: `app/(storefront)/`, `app/(admin)/admin/`
- [ ] Tailwind config extended with tokens from Build Prompt §2.1 (colors, fonts, `clamp()` spacing scale)
- [ ] Google Fonts (Cormorant Garamond, DM Sans, Hind) wired via `next/font`
- [ ] ESLint + Prettier + Husky pre-commit hook (`lint-staged`)
- [ ] Supabase CLI initialized, first migration: `profiles` table + `role` enum + RLS scaffolding
- [ ] Supabase client helpers: `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (server components/actions), typed via `supabase gen types typescript`
- [ ] GitHub Actions workflow: `lint → typecheck → build` (tests added once they exist)
- [ ] Deploy the empty skeleton to Vercel — confirm staging URL loads

**Exit criteria:** a blank Next.js page deploys successfully to a Vercel preview URL, connected to `sumams-staging`, with CI green.

---

## Phase 2 — Storefront Static Build (Days 5–14)

**Goal:** all six prototype screens rebuilt pixel-accurate in Next.js/Tailwind, using hardcoded placeholder data. No database calls yet — this phase is pure design-fidelity work, kept isolated so fidelity bugs aren't tangled up with data-fetching bugs later.

- [ ] Shared components first: `Navbar`, `Footer`, `AlponaDivider`/`AlponaHero`/`AlponaMotif` (as SVG components), `ProductCard`, `CartDrawer` shell, `MobileNav`
- [ ] Homepage (`app/(storefront)/page.tsx`) — Hero (with auto-advance), Marquee (auto-scroll, pause-on-hover), Featured Collection, Browse by Category, Our Heritage, Jewellery Spotlight, Instagram Strip
- [ ] PLP (`app/(storefront)/[category]/page.tsx`) — sidebar filters, product grid, pagination
- [ ] PDP (`app/(storefront)/products/[slug]/page.tsx`) — gallery, product info, trust strip, Style This With, More From Benarasi, sticky bottom bar (mobile)
- [ ] Responsive pass: confirm mobile breakpoint matches `*_Mobile*.html` exactly and desktop matches the non-mobile files exactly (side-by-side comparison, not just "looks close")
- [ ] Brand assets (`logo_transparent.png`, `saree_figure.png`) placed in `public/brand/`, used in Navbar/Footer/motifs

**Exit criteria:** side-by-side screenshot comparison against all six prototype files at their respective breakpoints shows no visible layout/color/type deviation. This is a hard gate — don't proceed with real data until this is signed off, since retrofitting fidelity fixes after wiring the CMS is much slower.

---

## Phase 3 — Data Layer (Days 15–22)

**Goal:** replace all placeholder data with live Supabase data.

- [ ] Migrations: `categories`, `products`, `product_images`, `product_variants`, `content_blocks` (full schema per Build Prompt §5)
- [ ] RLS policies: public can `SELECT` published/active rows only; writes restricted to `admin`/`staff`
- [ ] Seed script: enough dummy products + one full `content_blocks` row per homepage section, matching the prototype's placeholder content, so the storefront renders identically to Phase 2 but now from the DB
- [ ] Wire Homepage sections to `content_blocks` (ISR, revalidate on-demand via a tag)
- [ ] Wire PLP to `products`/`categories` (filtering, pagination against real queries)
- [ ] Wire PDP to a single product query (images, variants, related products)
- [ ] Sitemap.xml + robots.txt generated from live product/category data
- [ ] Metadata API + JSON-LD structured data per PDP

**Exit criteria:** storefront still looks identical to Phase 2's screenshots, but every string of copy and every image now traces back to a Supabase row, not a hardcoded constant.

---

## Phase 4 — Cart & Checkout (Days 23–30)

**Goal:** a customer can go from PLP to a completed, paid order.

- [ ] Zustand cart store (add/remove/update quantity, persisted to `localStorage` for guest carts)
- [ ] Cart drawer wired to the store, matching prototype's slide-in interaction
- [ ] `/checkout` page (new design, same token/font system): address → shipping method → payment → confirmation
- [ ] `orders` / `order_items` tables + Zod-validated Server Action to create a pending order
- [ ] Razorpay integration: order creation, checkout widget, webhook handler (signature verification, idempotent via `payment_reference` uniqueness)
- [ ] Stripe integration: same pattern, as the secondary/international path
- [ ] Order confirmation page + confirmation email (can stub email provider for now, e.g. Resend)
- [ ] Inventory decrement on confirmed payment (webhook-driven, not client-side)

**Exit criteria:** a full guest checkout completes in Razorpay test mode and Stripe test mode, produces a correct `orders` row, and a retried webhook does not create a duplicate order.

---

## Phase 5 — Auth (Days 31–35)

**Goal:** customers and admins can both log in, scoped correctly.

- [ ] Supabase Auth: email/password + optional magic link for customers
- [ ] `/account`, `/account/orders` — customer-facing, RLS-scoped to `auth.uid()`
- [ ] Admin/staff accounts created via invite only (no public admin signup route)
- [ ] Next.js middleware protecting `/admin/*`, redirecting unauthenticated or wrong-role users
- [ ] Server-side role check added to every existing write Server Action from Phases 3–4 (defense in depth, not just RLS)
- [ ] Optional: 2FA enrollment flow for admin accounts

**Exit criteria:** a customer session cannot reach any `/admin` route (verified by manually hitting the URL while logged in as a customer), and a `staff` session correctly reaches `/admin/products` but not `/admin/users`.

---

## Phase 6 — Admin Panel (Days 36–50)

**Goal:** the full CMS and product management experience.

- [ ] Admin shell: sidebar nav, auth-aware layout, role-based nav item visibility
- [ ] `/admin` dashboard: order summary, low-stock alerts, recent activity feed (from `audit_log`)
- [ ] `/admin/content` — one purpose-built editor per section (Hero slides, Marquee, Featured Collection, Browse by Category, Our Heritage, Jewellery Spotlight, Instagram Strip, Footer), each with draft/publish state and a preview link
- [ ] `/admin/products` — list (search/filter/sort/paginate), editor (images w/ drag-reorder, variants, pricing, SEO fields), bulk actions
- [ ] `/admin/categories` — CRUD + reordering
- [ ] `/admin/orders` — list + detail + status transitions
- [ ] `/admin/media` — shared image library/uploader (Supabase Storage, used by both content and product forms)
- [ ] `/admin/users` — admin-only, invite/manage staff accounts
- [ ] `/admin/settings` — site-wide config (shipping rules, payment key references, etc.)
- [ ] Every write path here logged to `audit_log` (who changed what, when)

**Exit criteria:** an admin can edit every homepage section and see the change live on staging without a redeploy; a full product (with images and variants) can be created from scratch in the admin and immediately appears correctly on the PLP/PDP.

---

## Phase 7 — Hardening (Days 51–58)

**Goal:** production-readiness pass across security, performance, and accessibility.

- [ ] Full RLS audit: attempt cross-tenant reads/writes as each role, confirm all denied except intended
- [ ] Rate limiting on `/auth`, `/checkout`, and all `/admin` write endpoints
- [ ] Secure headers (CSP, HSTS, X-Frame-Options) via `next.config.js`
- [ ] Sanitize CMS rich-text fields before render (stored XSS check)
- [ ] Sentry wired on both storefront and admin, test a thrown error reaches the dashboard
- [ ] Accessibility pass: keyboard-only walkthrough of storefront + admin, contrast check on copper/gold-on-ivory and ivory-on-dark combinations, alt text present on every image field
- [ ] Lighthouse pass on Homepage, PLP, PDP — target ≥90 Performance/Accessibility/SEO; fix regressions

**Exit criteria:** Lighthouse scores meet target, a manual pen-test-style pass on RLS finds no privilege escalation, Sentry captures a deliberately thrown test error in both apps.

---

## Phase 8 — Testing (Days 51–58, parallel with Phase 7)

**Goal:** automated safety net before launch.

- [ ] Vitest: cart totals, discount/pricing logic, inventory checks, Zod schema edge cases
- [ ] Playwright E2E — storefront: browse → PDP → add to cart → checkout → order confirmation (Razorpay + Stripe test mode)
- [ ] Playwright E2E — admin: login → edit a content block → publish → verify live on storefront; create a product → verify on PLP/PDP
- [ ] Wire both suites into the GitHub Actions pipeline as required checks before merge to `main`

**Exit criteria:** CI blocks a PR if lint, typecheck, unit tests, or the two critical E2E flows fail.

---

## Phase 9 — Launch Prep (Days 59–63)

**Goal:** go live.

- [ ] Real product catalog and real CMS content entered (replacing seed/placeholder data) on staging, QA'd
- [ ] Final side-by-side design QA against all six original prototype files, one more time, on production-like data (real photos change layout more than placeholders do — re-check aspect ratios/crops)
- [ ] Staging → production promotion process documented (migration order, content/product data migration or re-entry)
- [ ] DNS cutover to production Vercel deployment
- [ ] Live Razorpay/Stripe keys swapped in (production env vars only, never committed)
- [ ] Post-launch monitoring checklist: Sentry alerts routed (email/Slack), Vercel Analytics or GA4 confirmed tracking, order webhook success rate spot-checked for 48 hours

**Exit criteria:** site is live on the real domain, a real (or fully-refunded test) order completes end-to-end in production, monitoring is confirmed receiving data.

---

## Timeline Summary

| Phase | Duration | Cumulative |
|---|---|---|
| 0. Pre-kickoff | 1 day | Day 1 |
| 1. Foundation | 3 days | Day 4 |
| 2. Storefront static build | 10 days | Day 14 |
| 3. Data layer | 7 days | Day 22 |
| 4. Cart & checkout | 8 days | Day 30 |
| 5. Auth | 5 days | Day 35 |
| 6. Admin panel | 14 days | Day 50 |
| 7. Hardening + 8. Testing | 8 days (parallel) | Day 58 |
| 9. Launch prep | 5 days | Day 63 |

**≈ 9 weeks** for a small (1–2 dev) team at a focused pace. Solo: budget **14–16 weeks**. This excludes real product photography/copywriting turnaround, which usually runs in parallel with Phases 3–6 rather than blocking them (seed data covers dev needs until real assets are ready).

---

## Risk Register

| Risk | Mitigation |
|---|---|
| Design fidelity drifts once real data replaces placeholders | Hard gate at end of Phase 2; re-verify at end of Phase 9 with real photos specifically |
| Webhook double-fires double-fulfill an order | Idempotency via unique `payment_reference` constraint, enforced at DB level, not just app logic |
| RLS policy gap exposes another customer's order | Dedicated adversarial RLS test pass in Phase 7, not just happy-path testing |
| Scope creep on "admin should also edit X" | Admin CMS is scoped to the sections listed in Build Prompt §6; new sections go through the same `content_blocks` JSON pattern rather than one-off code, keeping additions cheap |
| Real product photography delays launch | Seed/placeholder data unblocks Phases 3–6; only Phase 9 is actually gated on real assets |
| Razorpay/Stripe account verification delays (India business KYC can take days) | Start Phase 0 account creation immediately — it's the most likely external blocker on the whole timeline |

---

## Definition of Done (project-level)

- All Phase exit criteria above met
- CI green on `main`
- Both payment providers tested end-to-end in test mode; at least one in live mode with a real transaction
- Admin can perform every content/product/order task without developer involvement
- Lighthouse ≥90 across Performance/Accessibility/SEO on Homepage/PLP/PDP
- Design QA sign-off against all six original prototypes

---

## Post-Launch (ongoing, not a phase)

- Weekly dependency updates (Dependabot or manual)
- Monitor Sentry for new error clusters
- Quarterly Lighthouse re-check (dependencies and content changes can regress performance)
- Backlog candidates not in this build: wishlist-to-cart, product reviews, Instagram API live sync (vs. manual CMS entry), loyalty/referral program, multi-currency
