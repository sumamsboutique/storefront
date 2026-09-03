# Page Specs

Section-by-section breakdown of each prototype, in DOM order, with the target route. Build each page in this exact section order — reordering changes the story the homepage tells (Featured → Category → Heritage → Jewellery → Instagram is a deliberate narrative arc, not an arbitrary stack).

## Homepage — `/`

Source: `Sumams_Boutique.html` (desktop) + `Sumams_Boutique_Mobile.html` (mobile)

1. **Navbar** — sticky, dark background, logo centered
2. **Hero** — auto-advancing 4-slide hero with thumbnail nav (desktop: `SlideThumbnails`; mobile: `SlideThumbRow`)
3. **Marquee** — scrolling brand/promo strip, copper background
4. **Featured Collection** — 3-product grid (mobile: `FeaturedSarees`)
5. **Browse by Category** — Sarees + Jewellery category tiles, cream background
6. **Our Heritage** — brand story section (rich text + image)
7. **Jewellery Spotlight** — jewellery product picks + copy
8. **Instagram Strip** — 6-tile grid, cream background, "FOLLOW @SUMAMSBOUTIQUE"
9. **Footer** (desktop: full multi-column; mobile: `MobileFooter` with `FooterAccordionRow` collapsible sections)

Mobile-only additions not present in the desktop DOM order: `MobileNav` (56px bar with hamburger/logo/search/cart), `HamburgerDrawer` (off-canvas), `CartDrawer` (off-canvas, slides from the right).

## Product Listing Page — `/[category]` (e.g. `/sarees`, `/sarees/benarasi`, `/jewellery`)

Source: `Sumams_Boutique_PLP.html` (desktop) + `Sumams_Boutique_Mobile_PLP.html` (mobile)

**Desktop:**
1. Navbar
2. `PageHeader` — category title, result count
3. Two-column layout: `Sidebar` (sticky, sort + `FilterGroup` list + reset link) | `ProductCard` grid
4. `Pagination`
5. Footer

**Mobile:**
1. `MobileNav`
2. `PageHeader`
3. `FilterSortBar` — mobile trigger for filters/sort (confirm exact interaction — likely opens a bottom sheet or full-screen overlay reusing the same `FILTER_GROUPS` data, rather than a permanent sidebar)
4. `ProductGrid` (likely 2-column on mobile vs. 3–4 column desktop — confirm against file)
5. `Pagination`
6. `MobileFooter`

Route param drives which `FILTER_GROUPS`/products are shown (Sarees vs. Jewellery have different filter sets per `content-data-model.md`).

## Product Detail Page — `/products/[slug]`

Source: `Sumams_Boutique_PDP.html` (desktop) + `Sumams_Boutique_Mobile_PDP.html` (mobile)

**Desktop:**
1. Navbar
2. `Breadcrumb`
3. `ProductHero` — two-column: `Gallery` (left) | `InfoPanel` (right: name, price, variant selectors, Add to Bag, `AccordionRow` list: Fabric & Weave / Occasion / Dimensions / Care / Shipping & Returns)
4. `TrustStrip` — 4-item, cream background, top/bottom gold border
5. `StyleThisWith` — cross-sell jewellery picks (`JewelleryCard`)
6. `MoreFromBenarasi` — related sarees (`SareeCard`)
7. Footer

**Mobile:**
1. `MobileNav`
2. `Breadcrumb`
3. `ProductImage`/`Gallery` (full-width, swipeable presumably — confirm)
4. `ProductInfo` — name, price, variants, Add to Bag
5. `Accordions` (same 5 sections as desktop)
6. `TrustStrip`
7. `StyleThisWith`
8. `MoreFromBenarasi`
9. `MobileFooter`
10. `StickyBottomBar` — fixed "Add to Bag" bar, appears once the user scrolls past the inline Add to Bag button in `ProductInfo` (not visible at page top)

## Pages with no prototype — build in the same visual language

Not covered by any of the six files; these need new screens using the tokens in `design-system.md` and the same component conventions (Navbar/Footer, `AlponaDivider`, bilingual `SubHeader` pattern where relevant):

- `/cart` — the `CartDrawer` from `Sumams_Boutique_Mobile.html` is the canonical reference for cart UI on both breakpoints; there's no evidence a full cart *page* (vs. drawer) exists in the prototypes — default to drawer-only unless checkout needs cart-as-page
- `/checkout` — address → shipping → payment → confirmation
- `/account`, `/account/orders` — customer account area
- `/our-story`, `/shipping-returns`, `/size-guide`, `/care-instructions`, `/contact`, `/faqs` — footer-linked static pages (all CMS-editable)
- All `/admin/*` routes — see `docs/admin-cms-spec.md`

Flag each of these to the client for design sign-off before building — don't treat "no prototype exists" as license to freelance the design; it means the design hasn't been approved yet.

## Responsive strategy

The prototypes intentionally ship desktop and mobile as **separate files with separate component trees** — e.g. `Hero` (desktop) vs. `MobileHero` (mobile) are different components with different layouts, not the same component with CSS media queries. When unifying into one responsive Next.js codebase:

- One route per page (`app/(storefront)/page.tsx`, not separate desktop/mobile routes)
- Internally, it's acceptable — and often correct — to keep the render logic branched by breakpoint (`useMediaQuery` or CSS-only `hidden md:block` / `block md:hidden` pairs) rather than forcing one JSX tree to serve both, **matching the prototype's own approach** of treating desktop and mobile as two designs, not one fluid design
- Whichever approach is used, the mobile breakpoint's rendered output must match `*_Mobile*.html` exactly, and the desktop breakpoint's output must match the non-mobile files exactly — verified by side-by-side screenshot comparison per the Build Plan's Phase 2 exit criteria
