# Content Data Model

Every hardcoded data array/object found across the six prototype files, verbatim. This is the seed data for local/staging development, and the exact shape that `content_blocks.content` (JSON) and the `products`/`categories` tables need to support. Bengali script is preserved as-is — do not drop it or treat it as optional.

Nothing in this file is final marketing copy — it's the prototype's placeholder content, written by Claude to demonstrate the design. Confirm with the client which of this ships as real launch copy vs. gets replaced.

---

## Navigation

**Desktop top nav** (`Navbar`, `Sumams_Boutique.html`): `SAREES`, `JEWELLERY`, `COLLECTIONS`, `STORY`

**Mobile hamburger drawer** (`HamburgerDrawer`, `Sumams_Boutique_Mobile.html`):
- Nav items: `SAREES`, `JEWELLERY`, `COLLECTIONS`, `OUR STORY`
- Secondary items: `Account / Sign In`, `Wishlist (0)`, `Track Order`
- Wordmark block: "SUMAM'S BOUTIQUE" + Bengali tagline "সুমাম'স বুটিক"

**Breadcrumb pattern** (PDP, both breakpoints) — e.g. on the Royal Crimson Benarasi PDP: `Sarees / Benarasi / Royal Crimson Benarasi` (category → sub-category → current product, last segment not a link)

---

## Homepage — Hero (`SLIDES`, auto-advances every `5000ms`)

4 slides, each with: `id`, `gradient` (placeholder art direction), `eyebrow` (bilingual label), `bengali` (standalone Bengali headline), `parts` (English headline as an array of plain strings + `{ italic, copper, text }` emphasis runs), `subtitle`, `cta`.

| # | Eyebrow | Bengali | English headline | Subtitle | CTA |
|---|---|---|---|---|---|
| 1 | FEATURED COLLECTION · বসন্ত ২০২৫ | বসন্তের রঙে রাঙা | The Spring Edit — Draped in *Heritage* | A curated story of bloom-season weaves and gold. | SHOP THE COLLECTION |
| 2 | BENARASI · বেনারসি | রাজকীয় বেনারসি | Royal Crimson, *Handwoven* in Varanasi | Pure silk. Kadwa Jangla weave. Wedding-ready. | SHOP BENARASI |
| 3 | TANT · তাঁত | বাংলার মাটির ছোঁয়া | Everyday *Tant*, Woven on Bengali Looms | Breathable cotton handlooms from Shantipur. | SHOP TANT |
| 4 | TEMPLE JEWELLERY · মন্দির গহনা | ঐতিহ্যের গহনা | Heirloom *Temple* Pieces in Antique Gold | Hand-cast designs inspired by Bengal's terracotta temples. | SHOP JEWELLERY |

→ CMS section: **Hero** — reorderable slide list, each field editable, image replaces `gradient`.

## Homepage — Marquee (`MARQUEE_ITEMS`, tripled + looped, pauses on hover)

`Benarasi/বেনারসি`, `Tant/তাঁত`, `Muslin/মসলিন`, `Kantha/কাঁথা`, `Free Shipping Above ₹5,000` (English-only), `Silk/সিল্ক`, `Temple Jewellery/মন্দির গহনা`, `Handwoven Heritage/হস্তনির্মিত ঐতিহ্য`

→ CMS section: **Marquee** — ordered list of `{ en, bn? }` phrases (Bengali optional per item, per the "Free Shipping" example).

## Homepage — Featured Collection (`PRODUCTS`)

3 sample products, shape: `{ id, large: bool, badge: string|null, badgeColor, gradient, name, sub, price, label }`

| Name | Sub | Price | Badge |
|---|---|---|---|
| Royal Crimson Benarasi | Pure Silk · Handwoven · Varanasi | ₹24,500 | NEW ARRIVAL (copper) |
| Ivory Tant Handloom | Cotton Tant · West Bengal | ₹4,800 | — |
| Indigo Kantha Stitch | Kantha Embroidery · Hand-stitched | ₹8,200 | FEATURED (gold) |

`large: true` marks the hero-sized card in the grid layout (Royal Crimson Benarasi).

→ Maps to `products` table fields: `name`, `short_description` (`sub`), `price`, `badge_text`/`badge_color` (or a `featured_badge` enum), `is_large`/`is_hero` flag for the featured-grid layout only.

## Homepage — Browse by Category

**`SAREE_CATEGORIES`** (7 items, `{ id, hero?, bn, en, gradient, dark }`) — one marked `hero: true` (larger tile):
Benarasi/বেনারসি *(hero)*, Tant/তাঁত, Muslin/মসলিন, Silk/সিল্ক, Kantha/কাঁথা, Jamdani/জামদানি, Garad/গরদ

**`JEWELLERY_CATEGORIES`** (3 items, same shape): Temple/মন্দির গহনা, Contemporary/সমসাময়িক, Gold-Plated/সোনার মোড়ক

→ Maps directly to the `categories` table: `name` (en), `name_bn`, `slug`, `parent_id` (Sarees/Jewellery as parents), `is_hero_tile`, `display_order`.

## Homepage — Instagram Strip

`IG_TILES` — 6 placeholder gradients, header copy "FOLLOW @SUMAMSBOUTIQUE". No captions/links in the prototype — real build should store image URL + optional post link per tile.

→ CMS section: **Instagram Strip** — ordered list of `{ image, link? }`, plus the handle text as a setting.

## Product Listing Page — Filters (`FILTER_GROUPS`)

4 groups, each `{ id, title, defaultOpen, options: [{ label, count, checked? }] }`:

- **WEAVE** *(open by default)*: Benarasi (12, ✓), Tant (8), Muslin (6), Jamdani (5), Kantha (4), Garad (3), Silk (9, ✓)
- **PRICE** *(open by default)*: Under ₹5,000 (7), ₹5,000–₹15,000 (14), ₹15,000–₹30,000 (11, ✓), ₹30,000–₹50,000 (8), Above ₹50,000 (7)
- **OCCASION** *(collapsed)*: Bridal (6), Festive (15), Everyday (12), Puja (8), Wedding Guest (6)
- **AVAILABILITY** *(collapsed)*: In Stock (38), Sold (9)

Sort control default: "Newest First" (dropdown, other options not enumerated in the prototype — confirm full sort list with client, e.g. Price Low–High, Price High–Low, Best Selling).

→ Filters are **derived from live product data** in the real build (weave, price bucket, occasion tag, stock status), not a separate hardcoded list — but the group structure/order/default-open state above should be preserved exactly.

## Product Detail Page — Trust Strip (`TRUST_ITEMS`)

| Type | Title | Subtitle |
|---|---|---|
| auth | AUTHENTICITY CERTIFIED | Each piece, hand-verified by Sumam |
| ship | FREE SHIPPING | On orders above ₹5,000 |
| returns | 7-DAY RETURNS | Easy returns, subject to inspection |
| chat | WHATSAPP SUPPORT | Personal assistance from our boutique |

→ CMS section: **Trust Strip** — 4 fixed slots (icon type + title + subtitle), editable text, icon type fixed to the 4 defined icons.

## Product Detail Page — Info Accordion sections

Fixed order, `Fabric & Weave` open by default, rest collapsed: **Fabric & Weave**, **Occasion**, **Dimensions**, **Care**, **Shipping & Returns**

→ Maps to `products` table long-form fields: `fabric_weave_details`, `occasion_tags`, `dimensions`, `care_instructions`, plus `shipping_returns_note` (likely a site-wide CMS default with a per-product override).

## Footer (identical across all desktop files)

- **Sarees column** (`FOOTER_SAREES`): Benarasi/বেনারসি, Tant/তাঁত, Muslin/মসলিন, Kantha/কাঁথা, Silk/সিল্ক, Jamdani/জামদানি, Garad/গরদ
- **Jewellery column** (`FOOTER_JEWELLERY`): Temple Jewellery/মন্দির গহনা, Contemporary/সমসাময়িক, Gold-Plated/সোনার মোড়ক, Bridal Sets
- **Help column** (`FOOTER_HELP`): Our Story, Shipping & Returns, Size Guide, Care Instructions, Contact Us, FAQs
- **Payment methods** (`PAYMENT_METHODS`): RAZORPAY, STRIPE, VISA, MASTERCARD, UPI — confirms the two-gateway approach already specified in the Build Prompt.

→ CMS section: **Footer** — 3 editable nav-link groups (label + link per item), payment badge list (likely fixed/site-setting rather than per-item editable), newsletter copy field, social links.

---

## Fields that appear on every product across files (union of all product-shaped objects seen)

Combining `PRODUCTS` (home), PLP's `PRODUCTS`/`GRADIENTS`, and PDP's product detail fields, a full product needs at minimum:

```
name, slug, category, sub-category (weave type),
short_description ("sub" field — e.g. "Pure Silk · Handwoven · Varanasi"),
price, compare_at_price (for badges like discounts — not seen explicitly but implied by PLP's price-bucket filter),
badge (NEW ARRIVAL / FEATURED / etc.) + badge_color,
occasion tags (Bridal / Festive / Everyday / Puja / Wedding Guest),
availability (In Stock / Sold),
fabric_weave_details, dimensions, care_instructions,
image gallery (multiple, aspect-ratio 3/4 on PDP),
is_large / is_hero (featured-grid layout flag, homepage only)
```

This union is the basis for the `products` + `product_images` + `product_variants` tables in `docs/database-schema.md`.
