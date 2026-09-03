-- Sumam's Boutique — seed data
-- Run AFTER 001_initial_schema.sql
-- Uses fixed UUIDs so foreign keys resolve. Idempotent: ON CONFLICT DO NOTHING.

-- ── CATEGORIES ──

-- Parent categories
insert into categories (id, name, name_bn, slug, display_order) values
  ('a0000000-0000-0000-0000-000000000001', 'Sarees', 'শাড়ি', 'sarees', 1),
  ('a0000000-0000-0000-0000-000000000002', 'Jewellery', 'গহনা', 'jewellery', 2)
on conflict (id) do nothing;

-- Saree subcategories
insert into categories (id, name, name_bn, slug, parent_id, is_hero_tile, tile_gradient_fallback, display_order) values
  ('b0000000-0000-0000-0000-000000000001', 'Benarasi', 'বেনারসি', 'benarasi', 'a0000000-0000-0000-0000-000000000001', true,  'linear-gradient(155deg, #2A0D06, #6B2410 35%, #A04514 70%, #BF5E18)', 1),
  ('b0000000-0000-0000-0000-000000000002', 'Tant',     'তাঁত',   'tant',     'a0000000-0000-0000-0000-000000000001', false, 'linear-gradient(170deg, #F5EFE6, #DCC9A8 45%, #B8956A 80%, #8C6A55)', 2),
  ('b0000000-0000-0000-0000-000000000003', 'Muslin',    'মসলিন',  'muslin',   'a0000000-0000-0000-0000-000000000001', false, 'linear-gradient(170deg, #EDE3D6, #C9B488 50%, #8E6F4A 90%)', 3),
  ('b0000000-0000-0000-0000-000000000004', 'Silk',      'সিল্ক',   'silk',     'a0000000-0000-0000-0000-000000000001', false, 'linear-gradient(155deg, #2A1008, #5A2A14 40%, #A04A18 75%, #D4880A)', 4),
  ('b0000000-0000-0000-0000-000000000005', 'Kantha',    'কাঁথা',  'kantha',   'a0000000-0000-0000-0000-000000000001', false, 'linear-gradient(155deg, #1C0A06, #4A2010 45%, #8C6A55 90%)', 5),
  ('b0000000-0000-0000-0000-000000000006', 'Jamdani',   'জামদানি', 'jamdani',  'a0000000-0000-0000-0000-000000000001', false, 'linear-gradient(170deg, #EDE3D6, #C4A878 55%, #6B5238)', 6),
  ('b0000000-0000-0000-0000-000000000007', 'Garad',     'গরদ',    'garad',    'a0000000-0000-0000-0000-000000000001', false, 'linear-gradient(170deg, #F5EFE6, #E8D5B0 50%, #BF5E18 95%)', 7)
on conflict (id) do nothing;

-- Jewellery subcategories
insert into categories (id, name, name_bn, slug, parent_id, is_hero_tile, tile_gradient_fallback, display_order) values
  ('b0000000-0000-0000-0000-000000000008', 'Temple',       'মন্দির গহনা', 'temple',       'a0000000-0000-0000-0000-000000000002', false, 'linear-gradient(165deg, #4A2010, #8B3A14 40%, #C4611A 70%, #7A2C0C)', 1),
  ('b0000000-0000-0000-0000-000000000009', 'Contemporary', 'সমসাময়িক', 'contemporary', 'a0000000-0000-0000-0000-000000000002', false, 'linear-gradient(165deg, #5A2A14, #8B3A14 40%, #C4611A 70%, #4A2010)', 2),
  ('b0000000-0000-0000-0000-00000000000a', 'Gold-Plated',  'সোনার মোড়ক', 'gold-plated',  'a0000000-0000-0000-0000-000000000002', false, 'linear-gradient(165deg, #4A3810, #8B5E10 40%, #E8A820 70%, #BF5E18)', 3)
on conflict (id) do nothing;

-- ── PRODUCTS ──

-- Sarees (type inferred from category parent)
insert into products (id, name, slug, category_id, short_description, price, badge_text, badge_color, is_featured_large, stock_status, is_active, is_published, occasion_tags, fabric_weave_details) values

-- c1: Chandrakala Benarasi Silk
('00000000-0000-0000-0000-000000000001', 'Chandrakala Benarasi Silk', 'chandrakala-benarasi-silk',
 'b0000000-0000-0000-0000-000000000001', 'Benarasi · Bridal', 42500.00, 'Featured', 'gold', false, 'in_stock', true, true,
 ARRAY['Bridal'], 'Pure Mulberry Silk, Banarasi Kadwa Jangla weave, 24-carat gold zari work'),

-- c2: Nilima Tant Cotton
('00000000-0000-0000-0000-000000000002', 'Nilima Tant Cotton', 'nilima-tant-cotton',
 'b0000000-0000-0000-0000-000000000002', 'Tant · Everyday', 3800.00, 'New Arrival', 'copper', false, 'in_stock', true, true,
 ARRAY['Everyday'], 'Fine cotton yarn, Traditional tant handloom weave, Lightweight breathable drape'),

-- c3: Aarohi Muslin Drape
('00000000-0000-0000-0000-000000000003', 'Aarohi Muslin Drape', 'aarohi-muslin-drape',
 'b0000000-0000-0000-0000-000000000003', 'Muslin · Festive', 12200.00, null, null, false, 'in_stock', true, true,
 ARRAY['Festive'], 'Air-light mull cotton, Handspun muslin weave, Delicate sheer body'),

-- c4: Durga Temple Necklace Set
('00000000-0000-0000-0000-000000000004', 'Durga Temple Necklace Set', 'durga-temple-necklace-set',
 'b0000000-0000-0000-0000-000000000008', 'Temple Collection', 18750.00, null, null, false, 'in_stock', true, true,
 ARRAY['Festive'], 'Antique-finish brass base, Hand-plated 24k gold, Traditional temple motifs'),

-- c5: Priya Kantha Stitch
('00000000-0000-0000-0000-000000000005', 'Priya Kantha Stitch', 'priya-kantha-stitch',
 'b0000000-0000-0000-0000-000000000005', 'Kantha · Everyday', 8900.00, null, null, false, 'sold', true, true,
 ARRAY['Everyday'], 'Hand-embroidered kantha stitch, Recycled cotton sari base, Threadwork built in layers'),

-- c6: Madhubani Silk Weave
('00000000-0000-0000-0000-000000000006', 'Madhubani Silk Weave', 'madhubani-silk-weave',
 'b0000000-0000-0000-0000-000000000004', 'Silk · Festive', 28000.00, 'New Arrival', 'copper', false, 'in_stock', true, true,
 ARRAY['Festive'], 'Mulberry silk base, Madhubani-inspired hand-painted motifs, Gold zari border'),

-- c7: Rukmini Jamdani Cotton
('00000000-0000-0000-0000-000000000007', 'Rukmini Jamdani Cotton', 'rukmini-jamdani-cotton',
 'b0000000-0000-0000-0000-000000000006', 'Jamdani · Puja', 14500.00, null, null, false, 'in_stock', true, true,
 ARRAY['Puja'], 'Fine cotton warp, Jamdani resist-weave technique, Geometric floral patterns'),

-- c8: Shankha Garad Silk
('00000000-0000-0000-0000-000000000008', 'Shankha Garad Silk', 'shankha-garad-silk',
 'b0000000-0000-0000-0000-000000000007', 'Garad · Wedding Guest', 19200.00, null, null, false, 'in_stock', true, true,
 ARRAY['Wedding Guest'], 'Traditional garad silk, Red border with white body, Auspicious wedding drape'),

-- c9: Annapurna Benarasi Silk
('00000000-0000-0000-0000-000000000009', 'Annapurna Benarasi Silk', 'annapurna-benarasi-silk',
 'b0000000-0000-0000-0000-000000000001', 'Benarasi · Puja', 36800.00, 'Featured', 'gold', false, 'in_stock', true, true,
 ARRAY['Puja'], 'Pure silk Kadwa weave, 24-carat gold zari, Puja-appropriate rich tones'),

-- c10: Kolkata Contemporary Studs
('00000000-0000-0000-0000-00000000000a', 'Kolkata Contemporary Studs', 'kolkata-contemporary-studs',
 'b0000000-0000-0000-0000-000000000009', 'Contemporary Collection', 6400.00, null, null, false, 'in_stock', true, true,
 ARRAY['Everyday'], 'Contemporary design, Modern Kolkata atelier, Versatile everyday wear'),

-- c11: Meera Tant Handloom
('00000000-0000-0000-0000-00000000000b', 'Meera Tant Handloom', 'meera-tant-handloom',
 'b0000000-0000-0000-0000-000000000002', 'Tant · Everyday', 4200.00, null, null, false, 'sold', true, true,
 ARRAY['Everyday'], 'Traditional tant handloom, Cotton weave, Daily wear lightweight'),

-- c12: Devika Silk Drape
('00000000-0000-0000-0000-00000000000c', 'Devika Silk Drape', 'devika-silk-drape',
 'b0000000-0000-0000-0000-000000000004', 'Silk · Bridal', 52000.00, null, null, false, 'in_stock', true, true,
 ARRAY['Bridal'], 'Bridal mulberry silk, Rich gold zari pallu, Heirloom-quality weave'),

-- PDP resolve targets
-- p1: Royal Crimson Benarasi
('00000000-0000-0000-0000-00000000000d', 'Royal Crimson Benarasi', 'royal-crimson-benarasi',
 'b0000000-0000-0000-0000-000000000001', 'Benarasi · Bridal', 24500.00, null, null, false, 'in_stock', true, true,
 ARRAY['Bridal'], 'Pure Mulberry Silk, Banarasi Kadwa Jangla weave, 24-carat gold zari work'),

-- p2: Emerald Benarasi Silk
('00000000-0000-0000-0000-00000000000e', 'Emerald Benarasi Silk', 'emerald-benarasi-silk',
 'b0000000-0000-0000-0000-000000000001', 'Benarasi · Festive', 26800.00, 'New Arrival', 'copper', false, 'in_stock', true, true,
 ARRAY['Festive'], 'Pure silk with silver zari, Emerald green body, Festive Benarasi weave'),

-- p3: Maroon Heritage Benarasi
('00000000-0000-0000-0000-00000000000f', 'Maroon Heritage Benarasi', 'maroon-heritage-benarasi',
 'b0000000-0000-0000-0000-000000000001', 'Benarasi · Festive', 22400.00, null, null, false, 'in_stock', true, true,
 ARRAY['Festive'], 'Classic maroon pallu, Kadwa weave, Traditional Benarasi heritage'),

-- p4: Ivory Royal Benarasi
('00000000-0000-0000-0000-000000000010', 'Ivory Royal Benarasi', 'ivory-royal-benarasi',
 'b0000000-0000-0000-0000-000000000001', 'Benarasi · Bridal', 28500.00, 'Featured', 'gold', false, 'in_stock', true, true,
 ARRAY['Bridal'], 'Ivory body with gold zari, Royal bridal Benarasi, Kadwa Jangla weave'),

-- p5: Rust Antique Benarasi
('00000000-0000-0000-0000-000000000011', 'Rust Antique Benarasi', 'rust-antique-benarasi',
 'b0000000-0000-0000-0000-000000000001', 'Benarasi · Festive', 19800.00, null, null, false, 'in_stock', true, true,
 ARRAY['Festive'], 'Rust antique gold work, Pure silk base, Festive Benarasi weave'),

-- j1: Lakshmi Temple Necklace
('00000000-0000-0000-0000-000000000012', 'Lakshmi Temple Necklace', 'lakshmi-temple-necklace',
 'b0000000-0000-0000-0000-000000000008', 'Temple Collection', 3200.00, null, null, false, 'in_stock', true, true,
 ARRAY['Festive'], 'Antique-finish brass, Hand-plated 24k gold, Lakshmi temple motif'),

-- j2: Heirloom Maangtikka
('00000000-0000-0000-0000-000000000013', 'Heirloom Maangtikka', 'heirloom-maangtikka',
 'b0000000-0000-0000-0000-00000000000a', 'Gold-Plated', 1950.00, null, null, false, 'in_stock', true, true,
 ARRAY['Festive'], 'Gold-plated brass, Traditional forehead ornament design'),

-- j3: Drop Temple Earrings
('00000000-0000-0000-0000-000000000014', 'Drop Temple Earrings', 'drop-temple-earrings',
 'b0000000-0000-0000-0000-000000000008', 'Temple Collection', 2400.00, null, null, false, 'in_stock', true, true,
 ARRAY['Bridal'], 'Temple drop style, Antique gold finish, Traditional motifs')

on conflict (id) do nothing;

-- ── PRODUCT IMAGES ──
-- One primary image per product, matching the paths from catalog.ts

insert into product_images (product_id, storage_path, alt_text, display_order, is_primary) values
('00000000-0000-0000-0000-000000000001',  '/Products/Banarasi/chandrakala-benarasi-silk.png',       'Chandrakala Benarasi Silk saree', 0, true),
('00000000-0000-0000-0000-000000000002',  '/Products/Handlooms/nilima-tant-cotton.png',            'Nilima Tant Cotton saree', 0, true),
('00000000-0000-0000-0000-000000000003',  '/Products/Handlooms/aarohi-muslin-drape.png',           'Aarohi Muslin Drape saree', 0, true),
('00000000-0000-0000-0000-000000000004',  '/Products/jewellery/durga-temple-necklace-set.png',      'Durga Temple Necklace Set', 0, true),
('00000000-0000-0000-0000-000000000005',  '/Products/Handlooms/priya-kantha-stitch.png',           'Priya Kantha Stitch saree', 0, true),
('00000000-0000-0000-0000-000000000006',  '/Products/Handlooms/madhubani-silk-weave.png',          'Madhubani Silk Weave saree', 0, true),
('00000000-0000-0000-0000-000000000007',  '/Products/Handlooms/rukmini-jamdani-cotton.png',        'Rukmini Jamdani Cotton saree', 0, true),
('00000000-0000-0000-0000-000000000008',  '/Products/Handlooms/shankha-garad-silk.png',            'Shankha Garad Silk saree', 0, true),
('00000000-0000-0000-0000-000000000009',  '/Products/Banarasi/annapurna-benarasi-silk.png',        'Annapurna Benarasi Silk saree', 0, true),
('00000000-0000-0000-0000-00000000000a', '/Products/jewellery/kolkata-contemporary-studs.png',     'Kolkata Contemporary Studs', 0, true),
('00000000-0000-0000-0000-00000000000b', '/Products/Handlooms/meera-tant-handloom.png',           'Meera Tant Handloom saree', 0, true),
('00000000-0000-0000-0000-00000000000c', '/Products/Handlooms/devika-silk-drape.png',             'Devika Silk Drape saree', 0, true),
('00000000-0000-0000-0000-00000000000d',  '/Products/Banarasi/royal-crimson-benarasi.png',         'Royal Crimson Benarasi saree', 0, true),
('00000000-0000-0000-0000-00000000000e',  '/Products/Banarasi/emerald-benarasi-silk.png',          'Emerald Benarasi Silk saree', 0, true),
('00000000-0000-0000-0000-00000000000f',  '/Products/Banarasi/maroon-heritage-benarasi.png',       'Maroon Heritage Benarasi saree', 0, true),
('00000000-0000-0000-0000-000000000010',  '/Products/Banarasi/ivory-royal-benarasi.png',           'Ivory Royal Benarasi saree', 0, true),
('00000000-0000-0000-0000-000000000011',  '/Products/Banarasi/rust-antique-benarasi.png',          'Rust Antique Benarasi saree', 0, true),
('00000000-0000-0000-0000-000000000012',  '/Products/jewellery/lakshmi-temple-necklace.png',       'Lakshmi Temple Necklace', 0, true),
('00000000-0000-0000-0000-000000000013',  '/Products/jewellery/heirloom-maangtikka.png',           'Heirloom Maangtikka', 0, true),
('00000000-0000-0000-0000-000000000014',  '/Products/jewellery/drop-temple-earrings.png',          'Drop Temple Earrings', 0, true)
on conflict do nothing;

-- ── CONTENT BLOCKS ──
-- Homepage sections as JSONB, matching the prototype data exactly

-- Hero slides
insert into content_blocks (section_key, content, is_published, published_content) values
('hero', '[
  {
    "id": 1,
    "eyebrow": "FEATURED COLLECTION · বসন্ত ২০২৫",
    "bengali": "বসন্তের রঙে রাঙা",
    "parts": ["The Spring Edit — Draped in ", {"italic": true, "copper": true, "text": "Heritage"}],
    "subtitle": "A curated story of bloom-season weaves and gold.",
    "cta": "SHOP THE COLLECTION",
    "gradient": "linear-gradient(160deg, #2A0D06 0%, #6B2410 35%, #BF5E18 70%, #D4880A 100%)"
  },
  {
    "id": 2,
    "eyebrow": "BENARASI · বেনারসি",
    "bengali": "রাজকীয় বেনারসি",
    "parts": ["Royal Crimson, ", {"italic": true, "copper": true, "text": "Handwoven"}, " in Varanasi"],
    "subtitle": "Pure silk. Kadwa Jangla weave. Wedding-ready.",
    "cta": "SHOP BENARASI",
    "gradient": "linear-gradient(155deg, #2A0D06 0%, #7A2C0C 50%, #BF5E18 100%)"
  },
  {
    "id": 3,
    "eyebrow": "TANT · তাঁত",
    "bengali": "বাংলার মাটির ছোঁয়া",
    "parts": ["Everyday ", {"italic": true, "copper": true, "text": "Tant"}, ", Woven on Bengali Looms"],
    "subtitle": "Breathable cotton handlooms from Shantipur.",
    "cta": "SHOP TANT",
    "gradient": "linear-gradient(170deg, #F5EFE6 0%, #DCC9A8 45%, #B8956A 80%, #8C6A55 100%)"
  },
  {
    "id": 4,
    "eyebrow": "TEMPLE JEWELLERY · মন্দির গহনা",
    "bengali": "ঐতিহ্যের গহনা",
    "parts": ["Heirloom ", {"italic": true, "copper": true, "text": "Temple"}, " Pieces in Antique Gold"],
    "subtitle": "Hand-cast designs inspired by Bengal terracotta temples.",
    "cta": "SHOP JEWELLERY",
    "gradient": "linear-gradient(165deg, #4A2010 0%, #8B3A14 40%, #C4611A 70%, #7A2C0C 100%)"
  }
]', true, '[
  {
    "id": 1,
    "eyebrow": "FEATURED COLLECTION · বসন্ত ২০২৫",
    "bengali": "বসন্তের রঙে রাঙা",
    "parts": ["The Spring Edit — Draped in ", {"italic": true, "copper": true, "text": "Heritage"}],
    "subtitle": "A curated story of bloom-season weaves and gold.",
    "cta": "SHOP THE COLLECTION",
    "gradient": "linear-gradient(160deg, #2A0D06 0%, #6B2410 35%, #BF5E18 70%, #D4880A 100%)"
  },
  {
    "id": 2,
    "eyebrow": "BENARASI · বেনারসি",
    "bengali": "রাজকীয় বেনারসি",
    "parts": ["Royal Crimson, ", {"italic": true, "copper": true, "text": "Handwoven"}, " in Varanasi"],
    "subtitle": "Pure silk. Kadwa Jangla weave. Wedding-ready.",
    "cta": "SHOP BENARASI",
    "gradient": "linear-gradient(155deg, #2A0D06 0%, #7A2C0C 50%, #BF5E18 100%)"
  },
  {
    "id": 3,
    "eyebrow": "TANT · তাঁত",
    "bengali": "বাংলার মাটির ছোঁয়া",
    "parts": ["Everyday ", {"italic": true, "copper": true, "text": "Tant"}, ", Woven on Bengali Looms"],
    "subtitle": "Breathable cotton handlooms from Shantipur.",
    "cta": "SHOP TANT",
    "gradient": "linear-gradient(170deg, #F5EFE6 0%, #DCC9A8 45%, #B8956A 80%, #8C6A55 100%)"
  },
  {
    "id": 4,
    "eyebrow": "TEMPLE JEWELLERY · মন্দির গহনা",
    "bengali": "ঐতিহ্যের গহনা",
    "parts": ["Heirloom ", {"italic": true, "copper": true, "text": "Temple"}, " Pieces in Antique Gold"],
    "subtitle": "Hand-cast designs inspired by Bengal terracotta temples.",
    "cta": "SHOP JEWELLERY",
    "gradient": "linear-gradient(165deg, #4A2010 0%, #8B3A14 40%, #C4611A 70%, #7A2C0C 100%)"
  }
]') on conflict (section_key) do nothing;

-- Marquee
insert into content_blocks (section_key, content, is_published, published_content) values
('marquee', '[
  {"en": "Benarasi", "bn": "বেনারসি"},
  {"en": "Tant", "bn": "তাঁত"},
  {"en": "Muslin", "bn": "মসলিন"},
  {"en": "Kantha", "bn": "কাঁথা"},
  {"en": "Free Shipping Above ₹5,000"},
  {"en": "Silk", "bn": "সিল্ক"},
  {"en": "Temple Jewellery", "bn": "মন্দির গহনা"},
  {"en": "Handwoven Heritage", "bn": "হস্তনির্মিত ঐতিহ্য"}
]', true, '[
  {"en": "Benarasi", "bn": "বেনারসি"},
  {"en": "Tant", "bn": "তাঁত"},
  {"en": "Muslin", "bn": "মসলিন"},
  {"en": "Kantha", "bn": "কাঁথা"},
  {"en": "Free Shipping Above ₹5,000"},
  {"en": "Silk", "bn": "সিল্ক"},
  {"en": "Temple Jewellery", "bn": "মন্দির গহনা"},
  {"en": "Handwoven Heritage", "bn": "হস্তনির্মিত ঐতিহ্য"}
]') on conflict (section_key) do nothing;

-- Featured Collection (product references by slug)
insert into content_blocks (section_key, content, is_published, published_content) values
('featured_collection', '[
  {"productSlug": "royal-crimson-benarasi", "large": true, "aspect": 0.667},
  {"productSlug": "nilima-tant-cotton", "large": false},
  {"productSlug": "priya-kantha-stitch", "large": false}
]', true, '[
  {"productSlug": "royal-crimson-benarasi", "large": true, "aspect": 0.667},
  {"productSlug": "nilima-tant-cotton", "large": false},
  {"productSlug": "priya-kantha-stitch", "large": false}
]') on conflict (section_key) do nothing;

-- Browse by Category (tile definitions)
insert into content_blocks (section_key, content, is_published, published_content) values
('browse_by_category', '{
  "sarees": [
    {"slug": "benarasi", "en": "Benarasi", "bn": "বেনারসি", "hero": true},
    {"slug": "tant", "en": "Tant", "bn": "তাঁত"},
    {"slug": "muslin", "en": "Muslin", "bn": "মসলিন"},
    {"slug": "silk", "en": "Silk", "bn": "সিল্ক"},
    {"slug": "kantha", "en": "Kantha", "bn": "কাঁথা"},
    {"slug": "jamdani", "en": "Jamdani", "bn": "জামদানি"},
    {"slug": "garad", "en": "Garad", "bn": "গরদ"}
  ],
  "jewellery": [
    {"slug": "temple", "en": "Temple", "bn": "মন্দির গহনা"},
    {"slug": "contemporary", "en": "Contemporary", "bn": "সমসাময়িক"},
    {"slug": "gold-plated", "en": "Gold-Plated", "bn": "সোনার মোড়ক"}
  ]
}', true, '{
  "sarees": [
    {"slug": "benarasi", "en": "Benarasi", "bn": "বেনারসি", "hero": true},
    {"slug": "tant", "en": "Tant", "bn": "তাঁত"},
    {"slug": "muslin", "en": "Muslin", "bn": "মসলিন"},
    {"slug": "silk", "en": "Silk", "bn": "সিল্ক"},
    {"slug": "kantha", "en": "Kantha", "bn": "কাঁথা"},
    {"slug": "jamdani", "en": "Jamdani", "bn": "জামদানি"},
    {"slug": "garad", "en": "Garad", "bn": "গরদ"}
  ],
  "jewellery": [
    {"slug": "temple", "en": "Temple", "bn": "মন্দির গহনা"},
    {"slug": "contemporary", "en": "Contemporary", "bn": "সমসাময়িক"},
    {"slug": "gold-plated", "en": "Gold-Plated", "bn": "সোনার মোড়ক"}
  ]
}') on conflict (section_key) do nothing;

-- Instagram Strip
insert into content_blocks (section_key, content, is_published, published_content) values
('instagram_strip', '{
  "handle": "@SUMAMSBOUTIQUE",
  "tiles": [
    {"image": "/Products/Banarasi/royal-crimson-benarasi.png"},
    {"image": "/Products/Handlooms/nilima-tant-cotton.png"},
    {"image": "/Products/Handlooms/aarohi-muslin-drape.png"},
    {"image": "/Products/jewellery/lakshmi-temple-necklace.png"},
    {"image": "/Products/Banarasi/emerald-benarasi-silk.png"},
    {"image": "/Products/Handlooms/priya-kantha-stitch.png"}
  ]
}', true, '{
  "handle": "@SUMAMSBOUTIQUE",
  "tiles": [
    {"image": "/Products/Banarasi/royal-crimson-benarasi.png"},
    {"image": "/Products/Handlooms/nilima-tant-cotton.png"},
    {"image": "/Products/Handlooms/aarohi-muslin-drape.png"},
    {"image": "/Products/jewellery/lakshmi-temple-necklace.png"},
    {"image": "/Products/Banarasi/emerald-benarasi-silk.png"},
    {"image": "/Products/Handlooms/priya-kantha-stitch.png"}
  ]
}') on conflict (section_key) do nothing;

-- Trust Strip (PDP)
insert into content_blocks (section_key, content, is_published, published_content) values
('trust_strip', '[
  {"type": "auth", "title": "AUTHENTICITY CERTIFIED", "subtitle": "Each piece, hand-verified by Sumam"},
  {"type": "ship", "title": "FREE SHIPPING", "subtitle": "On orders above ₹5,000"},
  {"type": "returns", "title": "7-DAY RETURNS", "subtitle": "Easy returns, subject to inspection"},
  {"type": "chat", "title": "WHATSAPP SUPPORT", "subtitle": "Personal assistance from our boutique"}
]', true, '[
  {"type": "auth", "title": "AUTHENTICITY CERTIFIED", "subtitle": "Each piece, hand-verified by Sumam"},
  {"type": "ship", "title": "FREE SHIPPING", "subtitle": "On orders above ₹5,000"},
  {"type": "returns", "title": "7-DAY RETURNS", "subtitle": "Easy returns, subject to inspection"},
  {"type": "chat", "title": "WHATSAPP SUPPORT", "subtitle": "Personal assistance from our boutique"}
]') on conflict (section_key) do nothing;

-- Footer
insert into content_blocks (section_key, content, is_published, published_content) values
('footer', '{
  "sarees": [
    {"label": "Benarasi", "bn": "বেনারসি", "href": "/sarees?weave=Benarasi"},
    {"label": "Tant", "bn": "তাঁত", "href": "/sarees?weave=Tant"},
    {"label": "Muslin", "bn": "মসলিন", "href": "/sarees?weave=Muslin"},
    {"label": "Kantha", "bn": "কাঁথা", "href": "/sarees?weave=Kantha"},
    {"label": "Silk", "bn": "সিল্ক", "href": "/sarees?weave=Silk"},
    {"label": "Jamdani", "bn": "জামদানি", "href": "/sarees?weave=Jamdani"},
    {"label": "Garad", "bn": "গরদ", "href": "/sarees?weave=Garad"}
  ],
  "jewellery": [
    {"label": "Temple Jewellery", "bn": "মন্দির গহনা", "href": "/jewellery?weave=Temple"},
    {"label": "Contemporary", "bn": "সমসাময়িক", "href": "/jewellery?weave=Contemporary"},
    {"label": "Gold-Plated", "bn": "সোনার মোড়ক", "href": "/jewellery?weave=Gold-Plated"},
    {"label": "Bridal Sets", "href": "/jewellery?occasion=Bridal"}
  ],
  "help": [
    {"label": "Our Story", "href": "/story"},
    {"label": "Shipping & Returns", "href": "/shipping-returns"},
    {"label": "Size Guide", "href": "/size-guide"},
    {"label": "Care Instructions", "href": "/care-instructions"},
    {"label": "Contact Us", "href": "/contact"},
    {"label": "FAQs", "href": "/faqs"}
  ],
  "paymentMethods": ["RAZORPAY", "STRIPE", "VISA", "MASTERCARD", "UPI"]
}', true, '{
  "sarees": [
    {"label": "Benarasi", "bn": "বেনারসি", "href": "/sarees?weave=Benarasi"},
    {"label": "Tant", "bn": "তাঁত", "href": "/sarees?weave=Tant"},
    {"label": "Muslin", "bn": "মসলিন", "href": "/sarees?weave=Muslin"},
    {"label": "Kantha", "bn": "কাঁথা", "href": "/sarees?weave=Kantha"},
    {"label": "Silk", "bn": "সিল্ক", "href": "/sarees?weave=Silk"},
    {"label": "Jamdani", "bn": "জামদানি", "href": "/sarees?weave=Jamdani"},
    {"label": "Garad", "bn": "গরদ", "href": "/sarees?weave=Garad"}
  ],
  "jewellery": [
    {"label": "Temple Jewellery", "bn": "মন্দির গহনা", "href": "/jewellery?weave=Temple"},
    {"label": "Contemporary", "bn": "সমসাময়িক", "href": "/jewellery?weave=Contemporary"},
    {"label": "Gold-Plated", "bn": "সোনার মোড়ক", "href": "/jewellery?weave=Gold-Plated"},
    {"label": "Bridal Sets", "href": "/jewellery?occasion=Bridal"}
  ],
  "help": [
    {"label": "Our Story", "href": "/story"},
    {"label": "Shipping & Returns", "href": "/shipping-returns"},
    {"label": "Size Guide", "href": "/size-guide"},
    {"label": "Care Instructions", "href": "/care-instructions"},
    {"label": "Contact Us", "href": "/contact"},
    {"label": "FAQs", "href": "/faqs"}
  ],
  "paymentMethods": ["RAZORPAY", "STRIPE", "VISA", "MASTERCARD", "UPI"]
}') on conflict (section_key) do nothing;

-- Our Heritage
insert into content_blocks (section_key, content, is_published, published_content) values
('our_heritage', '{
  "eyebrow": "OUR HERITAGE",
  "headline": "Woven into every thread, a story of Bengal",
  "body": "Sumam''s Boutique is a celebration of Bengal''s living textile traditions — from the gold-lustred Benarasi looms of Varanasi to the air-light muslin of Dhaka, from the narrative Kantha stitches of rural Bengal to the geometric Jamdani resist-weaves of Hazratpur. Every piece in our collection is handwoven, hand-finished, and carries the signature of the artisan who made it.",
  "image": "/Products/Banarasi/royal-crimson-benarasi.png"
}', true, '{
  "eyebrow": "OUR HERITAGE",
  "headline": "Woven into every thread, a story of Bengal",
  "body": "Sumam''s Boutique is a celebration of Bengal''s living textile traditions — from the gold-lustred Benarasi looms of Varanasi to the air-light muslin of Dhaka, from the narrative Kantha stitches of rural Bengal to the geometric Jamdani resist-weaves of Hazratpur. Every piece in our collection is handwoven, hand-finished, and carries the signature of the artisan who made it.",
  "image": "/Products/Banarasi/royal-crimson-benarasi.png"
}') on conflict (section_key) do nothing;
