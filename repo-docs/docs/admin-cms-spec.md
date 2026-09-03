# Admin Panel & CMS Spec

What `/admin/*` needs to do, mapped directly to the data extracted in `content-data-model.md` and the schema in `database-schema.md`. The prototype homepage (`Sumams_Boutique.html`) actually ships a dev-only live-editing panel (`TweaksPanel`/`TweakSection`/`TweakSlider`/`TweakToggle`/`useTweaks`, gated behind an `EDITMODE` constant) — that panel is the strongest signal available for which fields the client considers "should be editable without a developer." Treat its field list as a floor, not a ceiling, for what `/admin/content` exposes.

## `/admin/content` — one purpose-built editor per section

Not a generic page builder — a fixed set of forms, one per `content_blocks.section_key`, matching the prototype's actual component breakdown:

| Section key | Editable fields | Source data reference |
|---|---|---|
| `hero` | Ordered slide list; per slide: image upload, eyebrow text (bilingual), Bengali headline, English headline (with emphasis-word marking), subtitle, CTA label + link; auto-advance interval; auto-advance on/off | `SLIDES`, `SLIDE_DURATION` |
| `marquee` | Ordered phrase list; per item: English text, Bengali text (optional) | `MARQUEE_ITEMS` |
| `featured_collection` | Which products are pulled in (manual picks or "auto: featured tag"); which one renders as the large card | `PRODUCTS` (homepage) |
| `browse_by_category` | Category tile list per parent (Sarees / Jewellery): image, English label, Bengali label, which tile is the hero tile | `SAREE_CATEGORIES`, `JEWELLERY_CATEGORIES` |
| `our_heritage` | Rich text body, image | — (no structured data constant in prototype; section exists as a component with hardcoded JSX copy — extract the current copy into this field as the starting draft) |
| `jewellery_spotlight` | Product picks + section copy | `JEWELLERY_PRODUCTS` |
| `instagram_strip` | Ordered image list, each with optional post link; handle text ("FOLLOW @...") | `IG_TILES` |
| `footer` | Three nav-link groups (Sarees / Jewellery / Help) — label + link per item; newsletter heading/subtext; social links; Bengali tagline text | `FOOTER_SAREES`, `FOOTER_JEWELLERY`, `FOOTER_HELP`, `PAYMENT_METHODS` (payment badges likely a fixed site setting rather than free-text, since they're tied to which gateways are actually integrated) |

Every section: **draft vs. published state**, matching `content_blocks.is_published`/`published_content`. Editing saves a draft; a separate "Publish" action copies draft → published and is what the storefront actually reads. A "Preview" link lets an admin view the draft state before publishing (via `preview_token`).

Every image field: uploads directly to Supabase Storage, requires **alt text** as a required field (not optional) — matches the accessibility requirement baked into `product_images.alt_text` being `not null`.

## `/admin/products`

**List view**
- Search (name/SKU), filter by category/stock status/published state, sortable columns (name, price, stock, created date), pagination
- Bulk actions: activate/deactivate, soft delete, category reassignment

**Editor** (create + edit, same form)
- Name, slug (auto-generated from name, manually editable — must stay unique)
- Category (single-select from `categories`, including sub-category level, e.g. Sarees → Benarasi)
- Short description (the PLP/home card "sub" line — keep this short, it's a card subtitle, not a paragraph)
- Full description
- Price, compare-at price (optional, drives any discount badge/strike-through)
- SKU
- Badge text + badge color (free text + a fixed color-token dropdown: copper/gold, per the two observed in the prototype — extendable later)
- Fabric & Weave / Occasion (multi-select tags) / Dimensions / Care / Shipping & Returns — the five PDP accordion fields, each its own form field, not one big blob (matches the prototype's accordion structure exactly, and lets the storefront render each section independently)
- "Featured — large card" toggle (homepage featured-grid layout flag)
- Image gallery: multi-upload, drag-to-reorder, "set as primary," required alt text per image
- Variants (size/color/fabric): add/remove rows, each with its own stock quantity and optional price override
- SEO title/description
- Active toggle, Published toggle

Every price/stock change writes an `audit_log` row (who, when, before/after) — this is a compliance/trust feature for a business selling ₹20,000+ items, not just a nice-to-have.

## `/admin/categories`

CRUD for `categories`: name, Bengali name, slug, parent category, hero-tile flag, display order, active toggle. Reordering via drag handles, persisted to `display_order`.

## `/admin/orders`

- List: search/filter by status/date/payment provider, pagination
- Detail: line items, customer/shipping info, payment reference, status history
- Status transitions: staff/admin can move an order forward (e.g. paid → shipped → delivered) or cancel/refund; the paid transition itself should remain webhook-driven (per Build Prompt §9), not manually clickable, to avoid an admin marking something "paid" that wasn't actually charged

## `/admin/media`

Shared image library backing both `/admin/content` and `/admin/products` uploaders — avoids re-uploading the same brand asset (e.g. `logo_transparent.png`) into multiple places. Can be a folded-in picker component rather than a standalone page if that's simpler to build first; promote to a full page later if the library grows unwieldy.

## `/admin/users` (admin-role only)

Invite-only staff/admin account creation (no public admin signup route exists or should exist), role assignment, deactivation. Not visible in `staff`-role nav.

## `/admin/settings` (admin-role only)

Site-wide configuration that doesn't belong to any one content section: shipping fee rules, payment gateway key references (the actual secret keys live in Vercel env vars, never in this table — this is for non-secret config like "free shipping threshold," which the prototype already hardcodes as ₹5,000 in both the marquee and the PDP trust strip — surfacing it here means changing it in one place updates both).

## `/admin` dashboard

Order summary (counts by status, revenue snapshot), low-stock alerts (variants below a configurable threshold), recent `audit_log` activity feed.
