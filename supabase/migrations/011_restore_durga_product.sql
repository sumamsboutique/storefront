-- Restore Durga Temple Necklace Set (00000000-...-0004) which was deleted
-- from the DB. Idempotent, matches 002_seed_data.sql style.

insert into products (id, name, slug, category_id, short_description, price, badge_text, badge_color, is_featured_large, stock_status, is_active, is_published, occasion_tags, fabric_weave_details) values
('00000000-0000-0000-0000-000000000004', 'Durga Temple Necklace Set', 'durga-temple-necklace-set',
 'b0000000-0000-0000-0000-000000000008', 'Temple Collection', 18750.00, null, null, false, 'in_stock', true, true,
 ARRAY['Festive'], 'Antique-finish brass base, Hand-plated 24k gold, Traditional temple motifs')
on conflict (id) do nothing;

insert into product_images (product_id, storage_path, alt_text, display_order, is_primary)
select '00000000-0000-0000-0000-000000000004', '/Products/jewellery/durga-temple-necklace-set.png', 'Durga Temple Necklace Set', 0, true
where not exists (select 1 from product_images where storage_path = '/Products/jewellery/durga-temple-necklace-set.png');