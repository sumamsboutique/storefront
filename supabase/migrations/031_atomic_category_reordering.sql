-- Reorder the complete category list in one transaction. The previous server
-- action performed one PostgREST update per row and ignored update errors.
create or replace function public.reorder_categories(p_ordered_ids uuid[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total int;
  v_found int;
begin
  if auth.uid() is null or not public.is_admin_or_staff() then
    return jsonb_build_object('ok', false, 'error', 'FORBIDDEN');
  end if;

  -- Keep the checked category set stable until the batch update commits.
  lock table public.categories in share row exclusive mode;

  if p_ordered_ids is null
     or cardinality(p_ordered_ids) = 0
     or cardinality(p_ordered_ids) > 500
     or array_position(p_ordered_ids, null) is not null
     or cardinality(p_ordered_ids) <> (
       select count(distinct id) from unnest(p_ordered_ids) as ids(id)
     ) then
    return jsonb_build_object('ok', false, 'error', 'INVALID_CATEGORY_ORDER');
  end if;

  select count(*) into v_total from public.categories;
  select count(*) into v_found
  from public.categories
  where id = any(p_ordered_ids);
  if v_found <> v_total or v_found <> cardinality(p_ordered_ids) then
    return jsonb_build_object('ok', false, 'error', 'CATEGORY_SET_CHANGED');
  end if;

  update public.categories as category
  set display_order = ordered.ordinality::int - 1,
      updated_at = now()
  from unnest(p_ordered_ids) with ordinality as ordered(id, ordinality)
  where category.id = ordered.id;

  return jsonb_build_object('ok', true, 'updated', v_found);
end;
$$;

revoke all on function public.reorder_categories(uuid[]) from public, anon;
grant execute on function public.reorder_categories(uuid[]) to authenticated;
