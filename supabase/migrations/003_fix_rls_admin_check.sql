-- Fix RLS infinite recursion on `profiles`.
-- The admin/staff policies referenced `profiles` inline, which triggers RLS
-- on `profiles` inside the subquery → infinite recursion. Use SECURITY DEFINER
-- helper functions (canonical Supabase pattern) to read the role without
-- re-entering profiles RLS.

create or replace function public.app_role_has(role user_role)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles p
    where p.id = auth.uid()
      and p.role = role
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

create or replace function public.is_admin_or_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'staff')
  );
$$;

-- Drop the recursion-prone policies and recreate them against the helpers.
drop policy if exists "categories_all_admin" on categories;
create policy "categories_all_admin" on categories for all
using (public.is_admin_or_staff());

drop policy if exists "products_all_admin" on products;
create policy "products_all_admin" on products for all
using (public.is_admin_or_staff());

drop policy if exists "product_images_all_admin" on product_images;
create policy "product_images_all_admin" on product_images for all
using (public.is_admin_or_staff());

drop policy if exists "product_variants_all_admin" on product_variants;
create policy "product_variants_all_admin" on product_variants for all
using (public.is_admin_or_staff());

drop policy if exists "content_blocks_all_admin" on content_blocks;
create policy "content_blocks_all_admin" on content_blocks for all
using (public.is_admin_or_staff());

drop policy if exists "orders_select_staff" on orders;
create policy "orders_select_staff" on orders for select
using (public.is_admin_or_staff());

drop policy if exists "orders_update_staff" on orders;
create policy "orders_update_staff" on orders for update
using (public.is_admin_or_staff());

drop policy if exists "orders_delete_admin" on orders;
create policy "orders_delete_admin" on orders for delete
using (public.is_admin());

drop policy if exists "order_items_all_staff" on order_items;
create policy "order_items_all_staff" on order_items for all
using (public.is_admin_or_staff());

drop policy if exists "audit_log_select_staff" on audit_log;
create policy "audit_log_select_staff" on audit_log for select
using (public.is_admin_or_staff());

drop policy if exists "audit_log_insert_staff" on audit_log;
create policy "audit_log_insert_staff" on audit_log for insert
with check (public.is_admin_or_staff());

drop policy if exists "profiles_all_admin" on profiles;
create policy "profiles_all_admin" on profiles for all
using (public.is_admin());
