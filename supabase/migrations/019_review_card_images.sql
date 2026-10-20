-- 019_review_card_images.sql
-- Redesigned Community/Reviews/Instagram cards show a post thumbnail. Backfill
-- image paths into the seeded content blocks (idempotent, same pattern as 008).

insert into content_blocks (section_key, content, is_published, published_content) values
('testimonials', '[
  {
    "id": 1,
    "quote": "The Benarasi arrived wrapped like a gift and draped even better than I dreamed. Worth every rupee.",
    "name": "Ananya Sen",
    "detail": "Bride, Kolkata · Chandrakala Benarasi Silk",
    "rating": 5,
    "image": "/Products/Banarasi/chandrakala-benarasi-silk.png"
  },
  {
    "id": 2,
    "quote": "Sumam personally helped me choose a Tant for my mother-in-law. You can feel the loom in every thread.",
    "name": "Ishita Roy",
    "detail": "Patron, Bengaluru · Nilima Tant Cotton",
    "rating": 5,
    "image": "/Products/Handlooms/nilima-tant-cotton.png"
  },
  {
    "id": 3,
    "quote": "The temple jewellery is even more beautiful in person. Hand-finished, heirloom quality.",
    "name": "Priya Chatterjee",
    "detail": "Festive Patron, Mumbai · Lakshmi Temple Necklace",
    "rating": 5,
    "image": "/Products/jewellery/lakshmi-temple-necklace.png"
  }
]', true, '[
  {
    "id": 1,
    "quote": "The Benarasi arrived wrapped like a gift and draped even better than I dreamed. Worth every rupee.",
    "name": "Ananya Sen",
    "detail": "Bride, Kolkata · Chandrakala Benarasi Silk",
    "rating": 5,
    "image": "/Products/Banarasi/chandrakala-benarasi-silk.png"
  },
  {
    "id": 2,
    "quote": "Sumam personally helped me choose a Tant for my mother-in-law. You can feel the loom in every thread.",
    "name": "Ishita Roy",
    "detail": "Patron, Bengaluru · Nilima Tant Cotton",
    "rating": 5,
    "image": "/Products/Handlooms/nilima-tant-cotton.png"
  },
  {
    "id": 3,
    "quote": "The temple jewellery is even more beautiful in person. Hand-finished, heirloom quality.",
    "name": "Priya Chatterjee",
    "detail": "Festive Patron, Mumbai · Lakshmi Temple Necklace",
    "rating": 5,
    "image": "/Products/jewellery/lakshmi-temple-necklace.png"
  }
]')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;

insert into content_blocks (section_key, content, is_published, published_content) values
('instagram_strip', '{
  "handle": "sumams.boutique",
  "url": "https://instagram.com/sumams.boutique",
  "posts": [
    {"img": 1, "user": "@sumams.boutique", "capt": "Benarasi in the morning light — pure mulberry silk bathed in Shantiniketan dawn #handloom", "gradient": "linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)", "image": "https://khtldflelxzwljigsowu.supabase.co/storage/v1/object/public/banners/banarasi-saree.jpeg"},
    {"img": 2, "user": "@sumams.boutique", "capt": "Founder Sumam supervising the cutting of a fine Shantiniketan Tant drape #craft", "gradient": "linear-gradient(145deg,#F5EFE6,#D4B896 55%,#8C6A55)", "image": "https://khtldflelxzwljigsowu.supabase.co/storage/v1/object/public/banners/spring-edit.jpeg"},
    {"img": 3, "user": "@sumams.boutique", "capt": "The Shantiniketan pit loom at work — two weeks for a single Jamdani pallu #heritage", "gradient": "linear-gradient(145deg,#EDE3D6,#C4A87A 55%,#6B5238)", "image": "https://khtldflelxzwljigsowu.supabase.co/storage/v1/object/public/banners/tant-saree.jpeg"},
    {"img": 4, "user": "@sumams.boutique", "capt": "Brass temple jewellery fresh from the artisan forge — chased and finished by hand #finejewels", "gradient": "linear-gradient(145deg,#4A2010,#D4880A 55%,#5A2A14)", "image": "https://khtldflelxzwljigsowu.supabase.co/storage/v1/object/public/banners/temple-jewellery.jpeg"}
  ]
}', true, '{
  "handle": "sumams.boutique",
  "url": "https://instagram.com/sumams.boutique",
  "posts": [
    {"img": 1, "user": "@sumams.boutique", "capt": "Benarasi in the morning light — pure mulberry silk bathed in Shantiniketan dawn #handloom", "gradient": "linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)", "image": "https://khtldflelxzwljigsowu.supabase.co/storage/v1/object/public/banners/banarasi-saree.jpeg"},
    {"img": 2, "user": "@sumams.boutique", "capt": "Founder Sumam supervising the cutting of a fine Shantiniketan Tant drape #craft", "gradient": "linear-gradient(145deg,#F5EFE6,#D4B896 55%,#8C6A55)", "image": "https://khtldflelxzwljigsowu.supabase.co/storage/v1/object/public/banners/spring-edit.jpeg"},
    {"img": 3, "user": "@sumams.boutique", "capt": "The Shantiniketan pit loom at work — two weeks for a single Jamdani pallu #heritage", "gradient": "linear-gradient(145deg,#EDE3D6,#C4A87A 55%,#6B5238)", "image": "https://khtldflelxzwljigsowu.supabase.co/storage/v1/object/public/banners/tant-saree.jpeg"},
    {"img": 4, "user": "@sumams.boutique", "capt": "Brass temple jewellery fresh from the artisan forge — chased and finished by hand #finejewels", "gradient": "linear-gradient(145deg,#4A2010,#D4880A 55%,#5A2A14)", "image": "https://khtldflelxzwljigsowu.supabase.co/storage/v1/object/public/banners/temple-jewellery.jpeg"}
  ]
}')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;
