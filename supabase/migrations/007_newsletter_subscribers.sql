-- 007_newsletter_subscribers.sql
-- Newsletter signup captures. Public can subscribe; only staff can read/delete.

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'footer',
  is_active boolean not null default true,
  created_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;

drop policy if exists "newsletter_insert_anyone" on newsletter_subscribers;
create policy "newsletter_insert_anyone" on newsletter_subscribers
for insert with check (true);

drop policy if exists "newsletter_select_staff" on newsletter_subscribers;
create policy "newsletter_select_staff" on newsletter_subscribers
for select using (public.is_admin_or_staff());

drop policy if exists "newsletter_delete_staff" on newsletter_subscribers;
create policy "newsletter_delete_staff" on newsletter_subscribers
for delete using (public.is_admin_or_staff());