# Progress — Sumam's Boutique

Mark items `[x]` as they finish. Checked off below is where we stand today (Sep 2026).

## Build phases (from `repo-docs/Sumams_Boutique_Build_Plan.md`)

### Phase 1 — Project Setup
- [x] Scaffold Next.js 14 app (App Router, strict TS, Tailwind, fonts)
- [x] Design tokens (colors, fonts, spacing) in Tailwind config
- [x] Folder structure (`shared/`, `storefront/home/`, `icons/`)
  - `shared/primitives.tsx`: PAD, Eyebrow, AlponaMotif, AlponaDivider, SareeBorderDivider
  - `icons/index.tsx`: all SVG icons
  - `storefront/home/`: Hero, Marquee, FeaturedCollection, BrowseByCategory, OurHeritage, JewellerySpotlight, InstagramStrip
  - `storefront/` root: page-level + cross-page (Navbar, Footer, CartDrawer, ProductCard, PlpCard, PdpCard, Plp, Pdp)
  - `pdp/` subfolder not created — Pdp is one monolithic unit, splitting its internal sub-components added no reuse
- [x] GitHub repo + CI (Vitest + Playwright + GitHub Actions)

### Phase 2 — Storefront pixel fidelity
- [x] Homepage section order matches `page-specs.md` exactly
- [x] Navbar / Footer / Marquee / Hero (auto-advance)
- [x] Desktop + mobile versions via `hidden md:*`
- [x] Hydration error fixed (BrowseByCategory)
- [x] PDP rebuilt to spec (60/40 hero, gallery, 5 accordions, TrustStrip, StyleThisWith, MoreFrom, sticky bar, WhatsApp)
- [x] FeaturedCollection right-card clipping fixed
- [ ] Screenshot-verified parity vs. 6 prototype HTML files
- [ ] WCAG AA check on small labels (9–11px)

### Phase 2.5 — Live imagery
- [x] `Sarees/` renamed → `Products/`, all paths normalized
- [x] All 20 products have image paths (`CatalogProduct.images`)
- [x] Images wired into: PDP Gallery, PdpCard, ProductCard, PlpCard, JewellerySpotlight, BrowseByCategory (all 6 tiles)
- [x] No placeholder "Saree photography" labels anywhere
- [x] Audit: all 28 referenced images (8 Banners + 20 Products) exist on disk — none missing
  - `saree_figure.png` exists but unreferenced in code (kept: brand reference asset per CLAUDE.md)

### Phase 3 — Data layer (Supabase)
- [ ] Apply `database-schema.md` migrations + RLS
- [ ] Seed `products` / `categories` / `product_images` from `content-data-model.md`
- [ ] Storefront reads real data (plp, pdp, home) instead of static `catalog.ts`

### Phase 4 — Admin CMS
- [ ] `/admin` dashboard (order summary, low-stock, audit feed)
- [ ] `/admin/content` (hero, marquee, featured, category, heritage, jewellery, instagram, footer)
- [ ] `/admin/products` (list + editor)
- [ ] `/admin/categories`
- [ ] `/admin/orders`
- [ ] `/admin/media`
- [ ] `/admin/users` (admin only)
- [ ] `/admin/settings` (admin only)
- [ ] Draft vs. published + preview_token

### Phase 5 — Commerce
- [ ] Cart drawer → checkout flow
- [ ] Address → shipping → payment
- [ ] Razorpay (primary) + Stripe (secondary) integration
- [ ] Webhook-driven order status (paid transition not manual)
- [ ] Account pages (login, `/account`, `/account/orders`)

### Phase 6 — Static + CMS pages
- [ ] `/our-story`, `/shipping-returns`, `/size-guide`, `/care-instructions`, `/contact`, `/faqs`

### Phase 7 — Hardening
- [ ] Zod server-side validation on every write path
- [ ] WCAG AA + accessibility
- [ ] Performance (Core Web Vitals)
- [ ] Sentry + observability
- [ ] Security review (never-exposed keys in env)

### Phase 8 — Launch
- [ ] Pre-launch checklist
- [ ] Monitoring + rollback plan
- [ ] Production deploy to Vercel

## Open notes
- Pagination: already works inline in `Plp.tsx:205` for both `/sarees` + `/jewellery` — standalone `Pagination.tsx` only if a 2nd consumer appears.
- Folder reorg (`shared/`, `pdp/`, `icons/`) is cosmetic, not required for function.
