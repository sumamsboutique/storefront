-- 006_store_settings_and_order_notes.sql
-- Additive migration for Sumam's Boutique Admin CRM

-- 1. Add staff internal notes column to orders if not present
alter table orders add column if not exists staff_notes text;

-- 2. Store-wide settings table for boutique configuration
create table if not exists store_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now(),
  updated_by uuid references profiles(id)
);

-- Enable RLS
alter table store_settings enable row level security;

-- Policies for store_settings
drop policy if exists "store_settings_select" on store_settings;
create policy "store_settings_select" on store_settings for select using (true);

drop policy if exists "store_settings_insert_staff" on store_settings;
create policy "store_settings_insert_staff" on store_settings for insert
with check (public.is_admin_or_staff());

drop policy if exists "store_settings_update_staff" on store_settings;
create policy "store_settings_update_staff" on store_settings for update
using (public.is_admin_or_staff());

-- 3. Allow staff to view profiles (for CRM and order customer details)
drop policy if exists "profiles_select_staff" on profiles;
create policy "profiles_select_staff" on profiles for select
using (public.is_admin_or_staff());

-- 4. Seed default boutique configuration
insert into store_settings (key, value) values
('general', '{
  "store_name": "Sumam''s Boutique",
  "tagline": "Bengal-heritage sarees and fine jewellery",
  "email": "concierge@sumamsboutique.com",
  "phone": "+91 98300 12345",
  "whatsapp": "+91 98300 12345",
  "address": "42 Southern Avenue, Kolkata 700029, West Bengal"
}'::jsonb),
('commerce', '{
  "free_shipping_threshold": 10000,
  "flat_shipping_rate": 199,
  "currency_symbol": "₹",
  "currency_code": "INR",
  "tax_inclusive": true
}'::jsonb),
('social', '{
  "instagram": "https://instagram.com/sumamsboutique",
  "facebook": "https://facebook.com/sumamsboutique",
  "youtube": "https://youtube.com/@sumamsboutique"
}'::jsonb),
('notifications', '{
  "order_alert_email": "orders@sumamsboutique.com",
  "low_stock_threshold": 3,
  "notify_on_new_order": true
}'::jsonb)
on conflict (key) do nothing;
