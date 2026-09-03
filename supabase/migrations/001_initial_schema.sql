-- Sumam's Boutique — initial schema
-- Run via Supabase SQL Editor or `supabase db push`

-- ── TYPES ──
create type user_role as enum ('admin', 'staff', 'customer');

-- ── AUTH / ROLES ──
create table profiles (
  id uuid primary key references auth.users(id),
  role user_role not null default 'customer',
  full_name text,
  email text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── CATALOG ──
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_bn text,
  slug text not null unique,
  parent_id uuid references categories(id),
  is_hero_tile boolean default false,
  tile_gradient_fallback text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_id uuid references categories(id),
  short_description text,
  description text,
  fabric_weave_details text,
  occasion_tags text[],
  dimensions text,
  care_instructions text,
  shipping_returns_note text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  sku text unique,
  badge_text text,
  badge_color text,
  is_featured_large boolean default false,
  stock_status text default 'in_stock',
  is_active boolean default true,
  is_published boolean default false,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  storage_path text not null,
  alt_text text not null,
  display_order int default 0,
  is_primary boolean default false,
  aspect_ratio text default '3/4',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  variant_type text not null,
  variant_value text not null,
  stock_quantity int not null default 0,
  price_override numeric(10,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── CMS ──
create table content_blocks (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  content jsonb not null,
  is_published boolean default false,
  published_content jsonb,
  preview_token text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── COMMERCE ──
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  status text not null default 'pending',
  payment_provider text,
  payment_reference text unique,
  subtotal numeric(10,2) not null,
  shipping_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  shipping_address jsonb,
  billing_address jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  quantity int not null,
  unit_price numeric(10,2) not null,
  product_name_snapshot text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  unique (user_id, product_id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── AUDIT ──
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id uuid not null,
  action text not null,
  changed_by uuid references profiles(id),
  diff jsonb,
  created_at timestamptz default now()
);

-- ── UPDATED_AT TRIGGER ──
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at before update on profiles for each row execute function update_updated_at();
create trigger trg_categories_updated_at before update on categories for each row execute function update_updated_at();
create trigger trg_products_updated_at before update on products for each row execute function update_updated_at();
create trigger trg_product_images_updated_at before update on product_images for each row execute function update_updated_at();
create trigger trg_product_variants_updated_at before update on product_variants for each row execute function update_updated_at();
create trigger trg_content_blocks_updated_at before update on content_blocks for each row execute function update_updated_at();
create trigger trg_orders_updated_at before update on orders for each row execute function update_updated_at();
create trigger trg_order_items_updated_at before update on order_items for each row execute function update_updated_at();
create trigger trg_wishlists_updated_at before update on wishlists for each row execute function update_updated_at();

-- ── RLS ──
alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table content_blocks enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table wishlists enable row level security;
alter table audit_log enable row level security;

-- Categories: public read active, admin/staff full
create policy "categories_select_public" on categories for select using (is_active = true);
create policy "categories_all_admin" on categories for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);

-- Products: public read active+published, admin/staff full
create policy "products_select_public" on products for select using (is_active = true and is_published = true);
create policy "products_all_admin" on products for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);

-- Product images: public read, admin/staff full
create policy "product_images_select_public" on product_images for select using (true);
create policy "product_images_all_admin" on product_images for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);

-- Product variants: public read, admin/staff full
create policy "product_variants_select_public" on product_variants for select using (true);
create policy "product_variants_all_admin" on product_variants for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);

-- Content blocks: public read published_content only, admin/staff full
create policy "content_blocks_select_public" on content_blocks for select using (is_published = true);
create policy "content_blocks_all_admin" on content_blocks for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);

-- Orders: customer own rows, staff read all, admin full
create policy "orders_select_own" on orders for select using (user_id = auth.uid());
create policy "orders_insert_own" on orders for insert with check (user_id = auth.uid());
create policy "orders_select_staff" on orders for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);
create policy "orders_update_staff" on orders for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);
create policy "orders_delete_admin" on orders for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Order items: follow order-level access
create policy "order_items_select_own" on order_items for select using (
  exists (select 1 from orders where id = order_id and user_id = auth.uid())
);
create policy "order_items_all_staff" on order_items for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);

-- Wishlists: own rows only
create policy "wishlists_select_own" on wishlists for select using (user_id = auth.uid());
create policy "wishlists_insert_own" on wishlists for insert with check (user_id = auth.uid());
create policy "wishlists_delete_own" on wishlists for delete using (user_id = auth.uid());

-- Profiles: own row, admin full
create policy "profiles_select_own" on profiles for select using (id = auth.uid());
create policy "profiles_update_own" on profiles for update using (id = auth.uid());
create policy "profiles_all_admin" on profiles for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Audit log: staff read, admin full
create policy "audit_log_select_staff" on audit_log for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);
create policy "audit_log_insert_staff" on audit_log for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);
