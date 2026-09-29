-- 014_product_reviews.sql
-- Customer reviews + ratings on the product page.
-- - reviews: public read, write only via the security-definer RPC (owns user_id).
-- - submit_product_review(): one review per customer per product (upsert = edit).
-- - reviewer_name is denormalized at insert because profiles RLS is select-own only.

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  comment text not null default '',
  reviewer_name text not null default 'A Customer',
  created_at timestamptz default now()
);

alter table reviews enable row level security;

create unique index if not exists reviews_one_per_product on reviews (product_id, user_id);

drop policy if exists "reviews_select_all" on reviews;
create policy "reviews_select_all" on reviews for select using (true);

revoke all on reviews from public;
grant select on reviews to anon, authenticated;
grant insert on reviews to authenticated;

create or replace function public.submit_product_review(p_product_id uuid, p_rating int, p_comment text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_name text;
begin
  if v_uid is null then
    return jsonb_build_object('ok', false, 'error', 'Please sign in to review.');
  end if;
  if p_product_id is null or p_rating is null or p_rating not between 1 and 5 then
    return jsonb_build_object('ok', false, 'error', 'Invalid rating.');
  end if;
  if not exists (select 1 from products where id = p_product_id) then
    return jsonb_build_object('ok', false, 'error', 'Product not found.');
  end if;
  p_comment := btrim(coalesce(p_comment, ''));
  if char_length(p_comment) > 1000 then
    return jsonb_build_object('ok', false, 'error', 'Review must be under 1000 characters.');
  end if;

  select full_name into v_name from profiles where id = v_uid;
  if v_name is null or btrim(v_name) = '' then
    v_name := 'Verified Shopper';
  end if;

  insert into reviews (product_id, user_id, rating, comment, reviewer_name)
  values (p_product_id, v_uid, p_rating, p_comment, v_name)
  on conflict (product_id, user_id)
  do update set rating = excluded.rating, comment = excluded.comment, reviewer_name = excluded.reviewer_name, created_at = now();

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.submit_product_review(uuid, int, text) from public;
grant execute on function public.submit_product_review(uuid, int, text) to anon, authenticated;