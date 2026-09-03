# Database Schema (Supabase Postgres)

Full schema, implemented via versioned Supabase CLI migrations — never edited by hand in the dashboard. Every table has `created_at timestamptz default now()`, `updated_at timestamptz default now()` (bump via trigger), `updated_by uuid references profiles(id)`, and Row Level Security enabled. Fields below are the columns beyond that shared baseline. Types are Postgres types; adjust nullability to taste but keep the fields listed — they all trace back to real fields in the prototype source (see `content-data-model.md`).

```sql
-- ── AUTH / ROLES ──
create type user_role as enum ('admin', 'staff', 'customer');

create table profiles (
  id uuid primary key references auth.users(id),
  role user_role not null default 'customer',
  full_name text,
  email text,
  phone text
);

-- ── CATALOG ──
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,               -- e.g. "Benarasi"
  name_bn text,                     -- e.g. "বেনারসি" — Bengali label, shown in SubHeader/marquee-style UI
  slug text not null unique,
  parent_id uuid references categories(id), -- e.g. "Sarees" is the parent of "Benarasi"
  is_hero_tile boolean default false,        -- matches SAREE_CATEGORIES' `hero: true` flag
  tile_gradient_fallback text,               -- CSS gradient string, used until a real image is uploaded
  display_order int default 0,
  is_active boolean default true
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_id uuid references categories(id),
  short_description text,           -- PLP/home card "sub" line, e.g. "Pure Silk · Handwoven · Varanasi"
  description text,                 -- long-form PDP description
  fabric_weave_details text,        -- PDP accordion: Fabric & Weave
  occasion_tags text[],             -- Bridal / Festive / Everyday / Puja / Wedding Guest (multi-select, filterable)
  dimensions text,                  -- PDP accordion: Dimensions
  care_instructions text,           -- PDP accordion: Care
  shipping_returns_note text,       -- PDP accordion: Shipping & Returns (nullable — falls back to a site-wide CMS default)
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),   -- for showing a strikethrough/discount
  sku text unique,
  badge_text text,                  -- "NEW ARRIVAL", "FEATURED", etc. — free text, not enum, so new badges don't need a migration
  badge_color text,                 -- token name: 'copper' | 'gold' | ... validated in Zod, not a DB constraint
  is_featured_large boolean default false, -- matches homepage PRODUCTS' `large: true` flag
  stock_status text default 'in_stock', -- 'in_stock' | 'sold' — matches AVAILABILITY filter
  is_active boolean default true,
  is_published boolean default false,
  seo_title text,
  seo_description text
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  storage_path text not null,       -- Supabase Storage path
  alt_text text not null,           -- required at the DB level — accessibility is not optional per Build Prompt §Engineering Standards
  display_order int default 0,
  is_primary boolean default false,
  aspect_ratio text default '3/4'   -- PDP gallery default; keep configurable per prototype's aspectRatio prop
);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  variant_type text not null,       -- 'size' | 'color' | 'fabric' — confirm with client which variants sarees/jewellery actually need
  variant_value text not null,
  stock_quantity int not null default 0,
  price_override numeric(10,2)      -- nullable — falls back to product.price
);

-- ── CMS ──
create table content_blocks (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique, -- 'hero', 'marquee', 'featured_collection', 'browse_by_category',
                                     -- 'our_heritage', 'jewellery_spotlight', 'instagram_strip', 'footer'
  content jsonb not null,           -- shape matches the corresponding array/object in content-data-model.md exactly
  is_published boolean default false,
  published_content jsonb,          -- last-published snapshot, so a draft edit doesn't affect the live site until published
  preview_token text                -- lets an admin share an unpublished preview link
);

-- ── COMMERCE ──
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id), -- nullable for guest checkout
  status text not null default 'pending', -- 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_provider text,            -- 'razorpay' | 'stripe'
  payment_reference text unique,    -- gateway's payment/order id — UNIQUE is the idempotency guard for webhooks
  subtotal numeric(10,2) not null,
  shipping_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  shipping_address jsonb,
  billing_address jsonb
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  quantity int not null,
  unit_price numeric(10,2) not null,
  product_name_snapshot text not null -- freeze the name at time of purchase; product name may change later
);

create table wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  unique (user_id, product_id)
);

-- ── AUDIT ──
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id uuid not null,
  action text not null,             -- 'insert' | 'update' | 'delete'
  changed_by uuid references profiles(id),
  diff jsonb,
  created_at timestamptz default now()
);
```

## RLS policy summary

| Table | Public (anon) | Customer | Staff | Admin |
|---|---|---|---|---|
| `categories`, `products`, `product_images`, `product_variants` | `select` where `is_active` (and `is_published` on products) | same as public | full CRUD | full CRUD |
| `content_blocks` | `select` `published_content` only | same as public | full CRUD (drafts + publish) | full CRUD |
| `orders`, `order_items` | none | `select`/`insert` own rows only (`user_id = auth.uid()`) | `select`/`update` all | full CRUD |
| `wishlists` | none | own rows only | — | — |
| `profiles` | none | own row only (read/update non-role fields) | `select` all | full CRUD, only role that can change `role` |
| `audit_log` | none | none | `select` | full |

## Notes tying back to the prototypes

- `content_blocks.section_key` values map 1:1 to the CMS sections enumerated in `docs/admin-cms-spec.md`, which in turn map 1:1 to the data constants documented in `docs/content-data-model.md` (`SLIDES` → `hero`, `MARQUEE_ITEMS` → `marquee`, etc.) — this alignment is intentional so an admin edit requires zero frontend code changes.
- `categories.name_bn` and the bilingual pattern throughout: the prototypes never show English without an available Bengali counterpart for category/weave names — keep `name_bn` as a first-class field, not an afterthought translation layer.
- `products.badge_text`/`badge_color` are free text rather than an enum specifically because the prototype shows two different badges (`NEW ARRIVAL` in copper, `FEATURED` in gold) with no indication that's an exhaustive list — validate the *set of allowed values* in the Zod schema (app layer), where it's cheap to extend, rather than a DB enum (where it isn't).
