-- Guest checkout: a narrow, server-validated pathway to create a PENDING order.
--
-- Anon users cannot insert into `orders`/`order_items` directly (RLS requires
-- `user_id = auth.uid()`, which is null for guests). This SECURITY DEFINER
-- function is the ONLY route guests use to open an order, and it hard-scopes to:
--   - guest only (auth.uid() must be null)
--   - status = 'pending' (payment confirmation happens later, webhook-driven)
--   - prices recomputed from the products table (never trusted from the client)
--   - order + items inserted atomically in one transaction
create or replace function public.create_pending_order(p_address jsonb, p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_product_id uuid;
  v_qty int;
  v_price numeric(10,2);
  v_name text;
  v_subtotal numeric(10,2) := 0;
  v_shipping numeric(10,2);
  v_total numeric(10,2);
  v_order_id uuid;
begin
  -- Guest-only: authenticated users must use their own account flow.
  if auth.uid() is not null then
    raise exception 'GUEST_ONLY';
  end if;

  if p_address is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'INVALID_PAYLOAD';
  end if;

  -- Validate + price each line from the DB (server-side, untrusted client prices).
  for v_item in select * from jsonb_array_elements(p_items) loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_qty := (v_item->>'quantity')::int;

    if v_product_id is null or v_qty is null or v_qty <= 0 then
      raise exception 'INVALID_ITEM';
    end if;

    select p.price, p.name into v_price, v_name
    from products p
    where p.id = v_product_id and p.is_active and p.is_published;

    if v_price is null then
      raise exception 'PRODUCT_NOT_FOUND';
    end if;

    v_subtotal := v_subtotal + (v_price * v_qty);
  end loop;

  if v_subtotal <= 0 then
    raise exception 'EMPTY_ORDER';
  end if;

  v_shipping := case when v_subtotal > 10000 then 0 else 199 end;
  v_total := v_subtotal + v_shipping;

  insert into orders (status, subtotal, shipping_fee, total, shipping_address)
  values ('pending', v_subtotal, v_shipping, v_total, p_address)
  returning id into v_order_id;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_qty := (v_item->>'quantity')::int;

    select p.price, p.name into v_price, v_name
    from products p
    where p.id = v_product_id and p.is_active and p.is_published;

    insert into order_items (order_id, product_id, quantity, unit_price, product_name_snapshot)
    values (v_order_id, v_product_id, v_qty, v_price, v_name);
  end loop;

  return jsonb_build_object(
    'order_id', v_order_id,
    'subtotal', v_subtotal,
    'shipping', v_shipping,
    'total', v_total
  );
end;
$$;

revoke all on function public.create_pending_order(jsonb, jsonb) from public;
grant execute on function public.create_pending_order(jsonb, jsonb) to anon, authenticated;
