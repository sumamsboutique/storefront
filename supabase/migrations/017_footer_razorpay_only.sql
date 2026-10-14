-- Razorpay is the only gateway — drop the STRIPE badge from the seeded footer
-- content (002/004 still seed it; this scrubs rows already applied).
update content_blocks
set
  content = jsonb_set(
    content,
    '{paymentMethods}',
    (select coalesce(jsonb_agg(v order by ord), '[]'::jsonb)
       from jsonb_array_elements_text(content->'paymentMethods') with ordinality as t(v, ord)
      where v <> 'STRIPE')
  ),
  published_content = jsonb_set(
    published_content,
    '{paymentMethods}',
    (select coalesce(jsonb_agg(v order by ord), '[]'::jsonb)
       from jsonb_array_elements_text(published_content->'paymentMethods') with ordinality as t(v, ord)
      where v <> 'STRIPE')
  )
where section_key = 'footer'
  and (content->'paymentMethods') ? 'STRIPE';
