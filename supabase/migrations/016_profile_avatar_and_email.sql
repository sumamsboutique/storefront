-- 016 ── Profile avatar + email change support
--
-- 1. profiles.avatar_url holds a public URL in the new `avatars` bucket.
-- 2. The `avatars` bucket is public-read; writes are scoped to the caller's
--    own folder (<auth.uid()>/...), so nobody can write into another profile.
-- 3. claim_guest_orders() permanently links guest orders (user_id is null) to
--    the signed-in user. Until this existed, order history depended on the
--    shipping email still matching auth.jwt()->>'email', so a confirmed email
--    change silently orphaned pre-signup orders.
-- 4. sync_profile_email() mirrors a confirmed auth email change into profiles.
--    The app has no auth webhook, and Supabase only flips auth.users.email
--    after the user clicks the confirmation link.

-- ── 1. avatar column ─────────────────────────────────────────────────────────

alter table profiles add column if not exists avatar_url text;

-- ── 2. avatars bucket ────────────────────────────────────────────────────────
-- public = true because Next's optimizer and <Image> need to fetch it without
-- a session. The bucket only ever holds avatars, so public read is acceptable.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read" on storage.objects
  for select
  using (bucket_id = 'avatars');

-- foldername('uuid/avatar.jpg') -> {uuid}, so [1] must be the caller's id.
drop policy if exists "avatars own insert" on storage.objects;
create policy "avatars own insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars own update" on storage.objects;
create policy "avatars own update" on storage.objects
  for update to authenticated
  using      (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars own delete" on storage.objects;
create policy "avatars own delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- ── 3. claim guest orders so email changes cannot orphan history ─────────────
-- Idempotent and self-scoped: only rows that are still unclaimed AND carry the
-- caller's own current auth email are touched. Once user_id is set the email
-- branch is no longer needed and history survives any later email change.

create or replace function public.claim_guest_orders()
returns void
language sql
security definer
set search_path = public
as $$
  update orders o
     set user_id = auth.uid()
   where o.user_id is null
     and auth.uid() is not null
     and lower(coalesce(o.shipping_address->>'email','')) =
         lower(coalesce(auth.jwt() ->> 'email',''))
     and lower(coalesce(auth.jwt() ->> 'email','')) <> '';
$$;

-- Claim on every read so the invariant holds even if a future caller forgets.
create or replace function public.get_customer_orders()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.claim_guest_orders();
  return coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'id', o.id,
          'status', o.status,
          'subtotal', o.subtotal,
          'shipping_fee', o.shipping_fee,
          'discount', o.discount,
          'coupon_code', o.coupon_code,
          'total', o.total,
          'shipping_address', o.shipping_address,
          'created_at', o.created_at,
          'items', coalesce((
            select jsonb_agg(jsonb_build_object(
              'product_id', oi.product_id,
              'quantity', oi.quantity,
              'unit_price', oi.unit_price,
              'name', oi.product_name_snapshot
            ))
            from order_items oi
            where oi.order_id = o.id
          ), '[]'::jsonb)
        )
        order by o.created_at desc
      )
      from orders o
      where auth.uid() is not null
        and (
          o.user_id = auth.uid()
          or lower(o.shipping_address->>'email') = lower(auth.jwt() ->> 'email')
        )
    ),
    '[]'::jsonb
  );
end;
$$;

-- ── 4. keep profiles.email in step with a confirmed auth change ─────────────
create or replace function public.sync_profile_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles set email = new.email where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_auth_email_sync on auth.users;
create trigger trg_auth_email_sync
  after update of email on auth.users
  for each row
  execute function public.sync_profile_email();
