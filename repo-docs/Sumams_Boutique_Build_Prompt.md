# Build Prompt: Sumam's Boutique — E-Commerce Website + Admin CMS

Use this document as the full specification. Build in the phases listed at the end. Ask before deviating from the design fidelity or schema sections — everything else can be adapted with judgment as long as it stays within the stated tech stack and standards.

---

## 1. Project Summary

Build a production-grade e-commerce website for **Sumam's Boutique**, a Bengal-heritage saree and jewellery brand, plus a full admin panel with a CMS for homepage content and product management.

**Non-negotiable requirement: the storefront must look pixel-accurate to the six provided static HTML prototypes.** These are not moodboards or references to "draw inspiration from" — they are the approved final design, signed off by the client. Reproduce them exactly (layout, spacing, colors, typography, motion, copy, iconography), rebuilt as a proper Next.js application instead of standalone Babel-in-browser React.

### Reference files (attached)
- `Sumams_Boutique.html` — Desktop Homepage
- `Sumams_Boutique_PLP.html` — Desktop Product Listing Page
- `Sumams_Boutique_PDP.html` — Desktop Product Detail Page
- `Sumams_Boutique_Mobile.html` — Mobile Homepage
- `Sumams_Boutique_Mobile_PLP.html` — Mobile Product Listing Page
- `Sumams_Boutique_Mobile_PDP.html` — Mobile Product Detail Page
- `logo_transparent.png` — full wordmark + saree-draped woman icon
- `saree_figure.png` — icon/motif alone

---

## 2. Design Fidelity Mandate

Treat every component function already written in the prototypes (`Hero`, `Navbar`, `FeaturedCollection`, `ProductCard`, `Gallery`, `ProductInfo`, `CartDrawer`, `Footer`, `AlponaDivider`, etc.) as the literal source of truth for that component's JSX structure, inline styles, and behavior. Port them into proper Tailwind-based components rather than re-imagining them — extract the same layout, same breakpoints, same copy (including the Bengali-script lines), same iconography (the hand-drawn Alpona/SVG motifs), and same interaction details (marquee auto-scroll, hero auto-advance, accordions, sticky bottom bar on mobile PDP, cart drawer slide-in, etc.).

Do not "improve," simplify, or restyle anything without explicit sign-off. If a genuine implementation conflict arises (e.g., the prototype relies on a browser-only Babel pattern that doesn't translate cleanly to Next.js SSR), resolve it in the way that preserves the *visual and interaction* outcome, and flag the deviation.

### 2.1 Design tokens (extracted from the prototypes — use these exactly)

```ts
// theme tokens — do not alter without client approval
export const colors = {
  dark:     '#1C0A06', // primary dark background / text on light
  copper:   '#BF5E18', // primary brand accent
  ivory:    '#F5EFE6', // primary light background
  gold:     '#D4880A', // secondary accent, icons, dividers
  muted:    '#8C6A55', // secondary text, scrollbar thumb
  cream:    '#EDE3D6', // card/section backgrounds
  whatsapp: '#25D366', // WhatsApp icon only
};

export const fonts = {
  display: "'Cormorant Garamond', serif", // headings, product names
  ui:      "'DM Sans', sans-serif",       // body, UI chrome
  bn:      "'Hind', sans-serif",          // Bengali-script lines
};
```

- Google Fonts: Cormorant Garamond (300/400/600, italic variants), DM Sans (300/400/500), Hind (300/400)
- Section horizontal padding pattern: `clamp(40px, 6vw, 86px)` — reuse this fluid clamp pattern everywhere the prototypes use it instead of fixed breakpoint padding
- Preserve the hand-drawn SVG Alpona motifs (`AlponaDivider`, `AlponaHero`, `AlponaMotif`) as inline SVG components, colored via the token variables above — do not replace with icon-font substitutes
- Preserve marquee auto-scroll (30s linear infinite, pause on hover), hero auto-advance behavior, and all hover/transition timings as implemented in the prototypes

### 2.2 Assets
- `logo_transparent.png` and `saree_figure.png` go into the Next.js `public/` (or Supabase Storage `brand` bucket, referenced via CDN URL) exactly as used in the prototypes — as navbar logo, footer watermark, and decorative motif.
- All other imagery (hero slides, product photos, category tiles, Instagram strip, Our Heritage section) is currently placeholder in the prototypes — build the CMS/product schema so these are all replaceable via the admin panel rather than hardcoded, but the **placeholder-to-real-image swap must not change layout, aspect ratios, or crop framing** already established in the prototypes.

### 2.3 Responsive behavior
The prototypes ship desktop and mobile as **separate files** with separate component trees. In the rebuild, unify this into one responsive codebase per page (`app/page.tsx`, `app/sarees/page.tsx`, `app/sarees/[slug]/page.tsx`) using Tailwind breakpoints — but the mobile breakpoint output must match `Sumams_Boutique_Mobile*.html` exactly, and the desktop breakpoint output must match the non-mobile files exactly. Do not blend the two into a single "responsive-ish" compromise layout — they are two distinct, deliberate designs that must both be preserved at their respective breakpoints.

---

## 3. Tech Stack (fixed — do not substitute)

| Layer | Choice |
|---|---|
| Framework | Next.js 14+, App Router, TypeScript strict mode |
| Styling | Tailwind CSS (config extended with the tokens in §2.1) |
| State (storefront) | Zustand (cart, wishlist) |
| Database / Auth / Storage | Supabase (Postgres, Supabase Auth, Supabase Storage) |
| Validation | Zod (shared schemas between client forms and server actions) |
| Payments | Razorpay (primary — UPI/cards/netbanking), Stripe (secondary — international cards) |
| Hosting | Vercel (app), Supabase managed infra (DB/storage) |
| Testing | Vitest (unit), Playwright (E2E) |
| CI/CD | GitHub Actions → Vercel preview deployments |
| Error tracking | Sentry |
| Analytics | Vercel Analytics or GA4 |

---

## 4. Information Architecture

### 4.1 Storefront routes
- `/` — Homepage → `Sumams_Boutique.html` / `Sumams_Boutique_Mobile.html`
- `/sarees`, `/jewellery` (or a shared `/[category]` route with category param) — PLP → `Sumams_Boutique_PLP.html` / `Sumams_Boutique_Mobile_PLP.html`
- `/products/[slug]` — PDP → `Sumams_Boutique_PDP.html` / `Sumams_Boutique_Mobile_PDP.html`
- `/cart` — cart drawer already exists as an overlay in the mobile prototype; keep it as a drawer/overlay on both breakpoints rather than a separate page, unless checkout requires a dedicated page
- `/checkout` — new (not in prototypes) — build in the same visual language (tokens, fonts, spacing) since no prototype exists; keep it minimal (address → shipping → payment → confirmation)
- `/account`, `/account/orders` — new, same treatment as checkout
- Static pages referenced in the footer: `/our-story`, `/shipping-returns`, `/size-guide`, `/care-instructions`, `/contact`, `/faqs` — all CMS-editable (see §6)

### 4.2 Admin routes (all under `/admin`, auth-gated)
- `/admin` — dashboard: order summary, low-stock alerts, recent activity
- `/admin/content` — CMS (see §6)
- `/admin/products` — product list, filters, bulk actions
- `/admin/products/new`, `/admin/products/[id]` — product editor
- `/admin/categories` — category management
- `/admin/orders`, `/admin/orders/[id]` — order list + status updates
- `/admin/media` — image library (or folded into product/content forms via a shared uploader component)
- `/admin/users` — admin/staff account management (admin-role only)
- `/admin/settings` — site-wide settings (payment keys, shipping rules, etc.)

---

## 5. Database Schema (Supabase Postgres)

Implement via versioned SQL migrations (Supabase CLI) — no manual dashboard schema edits. Every table gets `created_at`, `updated_at`, `updated_by` (FK to `profiles`), and RLS enabled.

```
profiles
  id (uuid, FK auth.users)
  role: enum('admin','staff','customer')
  full_name, email, phone

categories
  id, name, slug, parent_id (nullable, self-FK for sub-categories),
  display_order, is_active

products
  id, name, slug, category_id (FK),
  description, short_description,
  price, compare_at_price, sku,
  fabric_type, is_active, is_featured,
  meta_title, meta_description (SEO),
  deleted_at (soft delete)

product_variants
  id, product_id (FK), size, color, stock_quantity, sku_suffix, price_override

product_images
  id, product_id (FK), storage_url, alt_text, display_order, is_primary

content_blocks
  id, page (enum: 'home','sarees_plp','jewellery_plp','footer','our_story', ...),
  section_key (e.g. 'hero_slides','marquee_text','browse_by_category',
               'our_heritage','jewellery_spotlight','instagram_strip','newsletter_copy'),
  content (jsonb — structured per section: text, image refs, ordering, links),
  is_published, published_at

orders
  id, user_id (FK, nullable for guest checkout), status enum
    ('pending','paid','processing','shipped','delivered','cancelled','refunded'),
  subtotal, shipping_cost, total, currency,
  payment_provider enum('razorpay','stripe'), payment_reference,
  shipping_address (jsonb), billing_address (jsonb)

order_items
  id, order_id (FK), product_id (FK), variant_id (FK, nullable),
  quantity, unit_price, product_name_snapshot

wishlists
  id, user_id (FK), product_id (FK)

audit_log
  id, table_name, record_id, action, changed_by (FK profiles), diff (jsonb), created_at
```

`content_blocks.content` JSON shape should map 1:1 to the prototype's own data structures — e.g. the prototype's `FOOTER_SAREES`, `FOOTER_JEWELLERY`, `FOOTER_HELP` arrays, hero slide arrays, category tile arrays — so admin edits require no frontend code changes, just new JSON rows.

---

## 6. CMS Requirements (`/admin/content`)

One editable panel per homepage/site section, mirroring the prototype's actual component breakdown — not a generic "page builder," but purpose-built forms for each known section:

- **Hero** — slide list (image, headline, subtext, CTA link), reorderable, auto-advance toggle (this already exists as a "Tweaks" concept in the prototype — formalize it as a real CMS-controlled setting instead of a dev-only panel)
- **Marquee** — scrolling text/phrase list
- **Featured Collection** — which products/categories are pulled in, grid height/behavior
- **Browse by Category** — category tiles (image, label, link)
- **Our Heritage** — rich text + image
- **Jewellery Spotlight** — product picks + copy
- **Instagram Strip** — image URLs + links (or Instagram API integration if desired later)
- **Footer** — nav link groups (Sarees, Jewellery, Help), newsletter copy, social links, payment method badges, Bengali tagline text

Every field editable in plain forms (no code, no markdown-in-a-textbox where a structured field will do). Image fields upload directly to Supabase Storage with automatic optimization. Changes support **draft vs. published state** (`is_published`) so admins can stage content before it goes live, with a preview link.

---

## 7. Product Management (`/admin/products`)

- List view: search, filter by category/stock/status, sortable columns, pagination
- Editor: name, slug (auto-generated, editable), category, description/short description, price, compare-at price (for showing discounts), SKU, fabric type, variants (size/color with per-variant stock), image gallery (drag-to-reorder, set primary), SEO fields, active/featured toggles
- Bulk actions: activate/deactivate, delete (soft), category reassignment
- Stock changes and price changes logged to `audit_log`

---

## 8. Auth & Authorization

- Supabase Auth for both customers and admin/staff — admins are invite-only (created via `/admin/users`, never public signup)
- Roles: `admin` (full access), `staff` (products + orders + content, no user management or settings), `customer`
- Enforce at three layers, always:
  1. **RLS policies** in Postgres — the real boundary, never trust the app layer alone
  2. **Next.js middleware** on `/admin/*` — redirect unauthenticated/unauthorized users before render
  3. **Server-side checks** inside every Server Action / Route Handler that writes data
- Optional 2FA for admin accounts

---

## 9. Payments

- Razorpay as primary checkout method (UPI, cards, netbanking)
- Stripe as secondary (international cards)
- Webhook handlers for both providers: verify signatures, process idempotently (a retried webhook must never double-fulfill an order — use `payment_reference` uniqueness as the guard)
- Order status transitions driven by webhook events, not client-side confirmation alone

---

## 10. Engineering Standards

**Code quality**
- TypeScript strict mode, no `any`
- Feature-based structure: `/app`, `/components/storefront`, `/components/admin`, `/lib`, `/server`, `/types`
- ESLint + Prettier via Husky pre-commit hooks; Conventional Commits

**Validation**
- Zod schemas shared between client forms and server actions/route handlers — every write path validated server-side regardless of client validation

**Testing & CI**
- Vitest: cart totals, pricing/discount logic, inventory checks
- Playwright E2E: storefront (browse → PDP → cart → checkout) and admin (login → edit content → publish → verify live on storefront)
- GitHub Actions: lint → typecheck → test → build on every PR; Vercel preview deployments per branch; separate staging and production Supabase projects

**Security**
- Secrets only in Vercel encrypted env vars
- Rate limiting on auth, checkout, and admin write endpoints
- Secure headers (CSP, HSTS, X-Frame-Options) via Next.js config
- Sanitize any rich-text CMS fields before render (stored XSS prevention)
- Webhook signature verification (Razorpay + Stripe)

**Performance & SEO**
- ISR for PLP/PDP so pages are fast but reflect admin content/stock changes without a full redeploy
- `next/image` for all product and CMS imagery, correct `sizes`, lazy-loaded below the fold
- Metadata API per page; JSON-LD structured data for products (price, availability); sitemap.xml + robots.txt generated from the live product/content data
- Target: Lighthouse 90+ on Performance, Accessibility, SEO

**Accessibility**
- WCAG 2.1 AA target: semantic HTML, full keyboard navigation, verified contrast ratios for the copper/gold-on-ivory and ivory-on-dark combinations used throughout, alt text required on every image field in the CMS and product uploader (not optional/afterthought)

**Observability**
- Sentry on both storefront and admin
- Vercel Analytics or GA4 for traffic/conversion funnel

---

## 11. Build Phases

1. **Foundation** — Next.js + TypeScript + Tailwind scaffold with the design tokens from §2.1 wired into `tailwind.config`; Supabase project + initial migrations (`profiles`, RLS scaffolding); CI pipeline skeleton (lint/typecheck/test/build)
2. **Storefront static build** — rebuild Homepage, PLP, PDP as responsive Next.js pages matching the six prototypes pixel-for-pixel, using placeholder/hardcoded data first to lock in fidelity before wiring to the database
3. **Data layer** — full schema migrations for products, categories, content_blocks, orders; connect storefront pages to live Supabase data (products, CMS content) via ISR
4. **Cart & checkout** — Zustand cart store, cart drawer (matching prototype interaction), checkout flow, Razorpay + Stripe integration with webhook handling
5. **Auth** — Supabase Auth for customers (account/order history) and admin/staff (role-gated)
6. **Admin panel** — dashboard, product CRUD, CMS content editors (section by section per §6), order management, media library, user management
7. **Hardening** — RLS audit, rate limiting, security headers, Sentry wiring, accessibility pass, Lighthouse pass
8. **Testing** — Vitest unit coverage on business logic, Playwright E2E on both critical storefront and admin flows
9. **Launch prep** — staging → production Supabase promotion process, seed real product/content data, final design QA against the six prototype files side-by-side

---

## 12. Acceptance Criteria

- Every page, at both desktop and mobile breakpoints, is visually indistinguishable from the corresponding prototype file when compared side-by-side (same layout, colors, type, spacing, motifs, copy, motion)
- All homepage content sections are editable from `/admin/content` and reflect live on the storefront without a code deploy
- Products can be fully managed (create/edit/stock/images/pricing) from `/admin/products` and appear correctly on PLP/PDP
- Checkout completes successfully via both Razorpay and Stripe in test mode, with correct order records and idempotent webhook handling
- RLS policies verified: a `customer`-role user cannot read/write another customer's orders or any admin data; a `staff`-role user cannot access `/admin/users` or `/admin/settings`
- CI pipeline passes (lint, typecheck, unit tests, E2E critical paths) before any merge to main
- Lighthouse scores ≥90 on Performance, Accessibility, SEO for Homepage, PLP, and PDP
