# Component Inventory

Every `function ComponentName()` found in the six prototype files, grouped by source file, with what it becomes in the real Next.js app. Components that repeat across files (identical or near-identical) are noted once with all source locations, so they become **one shared component**, not six copies.

## Shared components (appear in 3+ files — build these first)

| Prototype component | Found in | Becomes |
|---|---|---|
| `AlponaDivider` | All 6 files | `components/shared/AlponaDivider.tsx` |
| `Navbar` | Desktop Home, PLP, PDP | `components/storefront/Navbar.tsx` (desktop variant) |
| `MobileNav` | Mobile Home, PLP, PDP | `components/storefront/MobileNav.tsx` |
| `NavLink` | Desktop Home, PLP, PDP | Internal to `Navbar.tsx` |
| `Footer` | Desktop Home, PLP, PDP | `components/storefront/Footer.tsx` (desktop variant) |
| `MobileFooter` / `FooterAccordionRow` | Mobile Home, PLP, PDP | `components/storefront/MobileFooter.tsx` |
| `FooterColTitle`, `FooterLink` | Desktop Home, PLP, PDP | Internal to `Footer.tsx` |
| `SocialIcon` | Desktop Home, PLP, PDP | Internal to `Footer.tsx` |
| `ProductCard` | Desktop Home, PLP; `MobileSareeCard` in Mobile Home | `components/storefront/ProductCard.tsx` (responsive) |
| `JewelleryCard` | Desktop Home, PDP | `components/storefront/JewelleryCard.tsx` |
| `Pagination` | Desktop PLP, Mobile PLP | `components/storefront/Pagination.tsx` |
| `SareeBorderDivider` | Desktop/Mobile Home, Mobile PDP | `components/shared/SareeBorderDivider.tsx` |
| `AccordionRow` | Desktop PDP, Mobile PDP | `components/shared/AccordionRow.tsx` |
| `TrustStrip`, `TrustIcon` | Desktop PDP, Mobile PDP | `components/storefront/TrustStrip.tsx` |
| `StyleThisWith` | Desktop PDP, Mobile PDP | `components/storefront/pdp/StyleThisWith.tsx` |
| `MoreFromBenarasi`, `SareeCard` | Desktop PDP, Mobile PDP | `components/storefront/pdp/MoreFromBenarasi.tsx` |
| `Gallery` | Desktop PDP, Mobile PDP (as `ProductImage` on mobile) | `components/storefront/pdp/Gallery.tsx` (responsive) |
| `Breadcrumb` | Desktop PDP, Mobile PDP | `components/shared/Breadcrumb.tsx` |
| `PhotoPlaceholder` / `PlaceholderImage` | PDP, Mobile Home | Temporary dev-only component — **replace with real `next/image` product photography; do not ship to production** |
| `IconSearch`, `IconCart`, `IconAccount`, `HeartBtn`/`HeartIcon` | Desktop Home, PDP | `components/icons/*.tsx` |
| `OurHeritage` | Desktop & Mobile Home | `components/storefront/home/OurHeritage.tsx` (responsive) |
| `JewellerySpotlight`, `JewelleryCategoryTile` | Desktop & Mobile Home | `components/storefront/home/JewellerySpotlight.tsx` |
| `InstagramStrip` | Desktop & Mobile Home | `components/storefront/home/InstagramStrip.tsx` |
| `BrowseByCategory`, `CategoryTileHero`, `CategoryTileSmall`/`CategoryTile` | Desktop & Mobile Home | `components/storefront/home/BrowseByCategory.tsx` |
| `SubHeader` | Desktop Home (as `SubHeader`), same pattern used inline elsewhere | `components/shared/SubHeader.tsx` |

## `Sumams_Boutique.html` (Desktop Homepage) — unique to this file

| Component | Purpose |
|---|---|
| `App` | Root — do not port structurally; becomes `app/(storefront)/page.tsx` |
| `Hero` | Auto-advancing hero (see `SLIDES` in content-data-model.md) |
| `SlideThumbnails` | Small thumbnail nav under the hero for jumping between slides |
| `Marquee` | Scrolling brand/promo strip (see `MARQUEE_ITEMS`) |
| `FeaturedCollection` | Product grid pulling from `PRODUCTS` |
| `AlponaHero` | Larger decorative alpona motif used near the hero |
| `TweaksPanel`, `TweakSection`, `TweakSlider`, `TweakToggle`, `useTweaks` | **Dev-only** live-editing panel used to design the prototype itself. Do not port — this is exactly what `/admin/content` (the real CMS) replaces. Useful only as a reference for which values were considered "should be editable" (see content-data-model.md, which is derived partly from `TWEAK_DEFAULTS`). |
| `MobileReference` | Dev-only side-by-side reference frame — discard |

## `Sumams_Boutique_PLP.html` (Desktop PLP) — unique to this file

| Component | Purpose |
|---|---|
| `Sidebar` | Sort dropdown + `FilterGroup` list + "Reset All Filters" |
| `FilterGroup`, `Checkbox` | Collapsible filter section with checkboxes and counts (see `FILTER_GROUPS`) |
| `PageHeader` | Category title + result count + breadcrumb-style header |

## `Sumams_Boutique_PDP.html` (Desktop PDP) — unique to this file

| Component | Purpose |
|---|---|
| `ProductHero` | Top section combining `Gallery` + `InfoPanel` |
| `InfoPanel` | Name, price, variant selectors, Add to Bag, accordions |
| `BulletList` | Small bullet list used inside accordion content |
| `Note` | Margin-annotation component (design-review artifact — decide with the client whether these ship in production or are dev-only; likely **not** production UI) |

## `Sumams_Boutique_Mobile.html` (Mobile Homepage) — unique to this file

| Component | Purpose |
|---|---|
| `Root`, `MobileHomepage` | Root wrappers — become `app/(storefront)/page.tsx`'s mobile breakpoint output |
| `HamburgerDrawer` | Slide-in nav drawer (88% width, dark scrim) — see content-data-model.md for its nav items |
| `CartDrawer`, `CartItem` | Slide-in cart — **this is the canonical cart drawer reference**; the desktop cart icon should open the same component |
| `MobileHero` | Mobile-specific hero layout (not identical to desktop `Hero`) |
| `MobileMarquee` | Mobile marquee variant |
| `FeaturedSarees` | Mobile equivalent of `FeaturedCollection` |
| `SlideThumbRow`, `Annotation`, `Eyebrow`, `AlponaMotif` | Supporting mobile hero elements |

## `Sumams_Boutique_Mobile_PDP.html` (Mobile PDP) — unique to this file

| Component | Purpose |
|---|---|
| `MobilePDP`, `PDPViewport` | Root — `PDPViewport` also contains dev-only artboard/state-demo scaffolding (`DCSection`, `DCArtboard` references around line 520+) — **discard, dev-only design-review harness** |
| `ProductInfo` | Mobile variant of `InfoPanel` |
| `Accordions` | Wrapper rendering the `AccordionRow` list on mobile |
| `StickyBottomBar` | Fixed "Add to Bag" bar that appears after scrolling past the inline CTA — see design-system.md Motion section |

## `Sumams_Boutique_Mobile_PLP.html` (Mobile PLP) — unique to this file

| Component | Purpose |
|---|---|
| `App` | Root for this file |
| `FilterSortBar` | Mobile equivalent of the desktop `Sidebar` — likely a bottom-sheet or top-bar trigger rather than a permanent sidebar (confirm exact interaction against the file before building) |
| `ProductGrid` | Mobile product grid wrapper |

## Notes on porting

- Every component above is currently written with **inline `style={{ }}` objects**, not classNames. Port to Tailwind utility classes using the tokens in `design-system.md`; don't leave inline styles in the production codebase except for truly dynamic values (e.g. a per-product gradient placeholder, which shouldn't exist in production anyway once real photography is wired in).
- Components named with a `Mobile` prefix are not automatically "the mobile version to keep" — some (`MobileReference`, dev-only wrappers) are prototype scaffolding. When in doubt, cross-check against `docs/page-specs.md`.
- Any component under a `TWEAK_*`/`Tweak*`/`DC*` naming pattern, or referencing `EDITMODE`, is a **prototype design-review tool**, not a production feature. It should never appear in the shipped app — its only value is telling you which fields the client cares about tweaking (which is exactly what belongs in the CMS instead).
