-- 008_testimonials_content.sql
-- Customer testimonials homepage section, managed as a content block (idempotent).

insert into content_blocks (section_key, content, is_published, published_content) values
('testimonials', '[
  {
    "id": 1,
    "quote": "The Benarasi arrived wrapped like a gift and draped even better than I dreamed. Worth every rupee.",
    "name": "Ananya Sen",
    "detail": "Bride, Kolkata · Banarasi",
    "rating": 5
  },
  {
    "id": 2,
    "quote": "Sumam personally helped me choose a Tant for my mother-in-law. You can feel the loom in every thread.",
    "name": "Ishita Roy",
    "detail": "Shantiniketan Tant",
    "rating": 5
  },
  {
    "id": 3,
    "quote": "The temple jewellery is even more beautiful in person. Hand-finished, heirloom quality.",
    "name": "Priya Chatterjee",
    "detail": "Lakshmi Temple Necklace",
    "rating": 5
  }
]', true, '[
  {
    "id": 1,
    "quote": "The Benarasi arrived wrapped like a gift and draped even better than I dreamed. Worth every rupee.",
    "name": "Ananya Sen",
    "detail": "Bride, Kolkata · Banarasi",
    "rating": 5
  },
  {
    "id": 2,
    "quote": "Sumam personally helped me choose a Tant for my mother-in-law. You can feel the loom in every thread.",
    "name": "Ishita Roy",
    "detail": "Shantiniketan Tant",
    "rating": 5
  },
  {
    "id": 3,
    "quote": "The temple jewellery is even more beautiful in person. Hand-finished, heirloom quality.",
    "name": "Priya Chatterjee",
    "detail": "Lakshmi Temple Necklace",
    "rating": 5
  }
]')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;