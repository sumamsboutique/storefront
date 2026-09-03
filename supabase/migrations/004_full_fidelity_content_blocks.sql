-- Full-fidelity homepage content: replace the placeholder content_blocks rows
-- with JSON that mirrors EXACTLY what each storefront component renders, so
-- every string/image on the homepage traces back to a Supabase row.
-- Idempotent: re-running updates the existing rows.

-- HERO (4 slides)
insert into content_blocks (section_key, content, is_published, published_content) values
('hero', '[
  {
    "id": 1,
    "gradient": "linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)",
    "image": "/Banners/spring-edit.jpeg",
    "imageMobile": "/Banners/spring-edit-mob.jpeg",
    "eyebrow": "FEATURED COLLECTION · বসন্ত ২০২৫",
    "bengali": "বসন্তের রঙে রাঙা",
    "parts": ["The Spring Edit — Draped in ", {"italic": true, "copper": true, "text": "Heritage"}],
    "subtitle": "A curated story of bloom-season weaves and gold.",
    "cta": "SHOP THE COLLECTION",
    "href": "/collections"
  },
  {
    "id": 2,
    "gradient": "linear-gradient(155deg, #1C0A06, #4A2010, #8C6A55)",
    "image": "/Banners/banarasi-saree.png",
    "imageMobile": "/Banners/banarasi-saree-mob.jpeg",
    "eyebrow": "BENARASI · বেনারসি",
    "bengali": "রাজকীয় বেনারসি",
    "parts": ["Royal Crimson, ", {"italic": true, "copper": true, "text": "Handwoven"}, " in Varanasi"],
    "subtitle": "Pure silk. Kadwa Jangla weave. Wedding-ready.",
    "cta": "SHOP BENARASI",
    "href": "/sarees?weave=Benarasi"
  },
  {
    "id": 3,
    "gradient": "linear-gradient(155deg, #2A1008, #5A2A14, #D4880A)",
    "image": "/Banners/tant-saree.jpeg",
    "imageMobile": "/Banners/tant-saree-mob.jpeg",
    "eyebrow": "TANT · তাঁত",
    "bengali": "বাংলার মাটির ছোঁয়া",
    "parts": ["Everyday ", {"italic": true, "copper": true, "text": "Tant"}, ", Woven on Bengali Looms"],
    "subtitle": "Breathable cotton handlooms from Shantipur.",
    "cta": "SHOP TANT",
    "href": "/sarees?weave=Tant"
  },
  {
    "id": 4,
    "gradient": "linear-gradient(155deg, #3D1C0A, #6B2E0E, #C4611A)",
    "image": "/Banners/temple-jewellery.jpeg",
    "imageMobile": "/Banners/temple-jewellery-mob.jpeg",
    "eyebrow": "TEMPLE JEWELLERY · মন্দির গহনা",
    "bengali": "ঐতিহ্যের গহনা",
    "parts": ["Heirloom ", {"italic": true, "copper": true, "text": "Temple"}, " Pieces in Antique Gold"],
    "subtitle": "Hand-cast designs inspired by Bengal terracotta temples.",
    "cta": "SHOP JEWELLERY",
    "href": "/jewellery"
  }
]', true, '[
  {
    "id": 1,
    "gradient": "linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)",
    "image": "/Banners/spring-edit.jpeg",
    "imageMobile": "/Banners/spring-edit-mob.jpeg",
    "eyebrow": "FEATURED COLLECTION · বসন্ত ২০২৫",
    "bengali": "বসন্তের রঙে রাঙা",
    "parts": ["The Spring Edit — Draped in ", {"italic": true, "copper": true, "text": "Heritage"}],
    "subtitle": "A curated story of bloom-season weaves and gold.",
    "cta": "SHOP THE COLLECTION",
    "href": "/collections"
  },
  {
    "id": 2,
    "gradient": "linear-gradient(155deg, #1C0A06, #4A2010, #8C6A55)",
    "image": "/Banners/banarasi-saree.png",
    "imageMobile": "/Banners/banarasi-saree-mob.jpeg",
    "eyebrow": "BENARASI · বেনারসি",
    "bengali": "রাজকীয় বেনারসি",
    "parts": ["Royal Crimson, ", {"italic": true, "copper": true, "text": "Handwoven"}, " in Varanasi"],
    "subtitle": "Pure silk. Kadwa Jangla weave. Wedding-ready.",
    "cta": "SHOP BENARASI",
    "href": "/sarees?weave=Benarasi"
  },
  {
    "id": 3,
    "gradient": "linear-gradient(155deg, #2A1008, #5A2A14, #D4880A)",
    "image": "/Banners/tant-saree.jpeg",
    "imageMobile": "/Banners/tant-saree-mob.jpeg",
    "eyebrow": "TANT · তাঁত",
    "bengali": "বাংলার মাটির ছোঁয়া",
    "parts": ["Everyday ", {"italic": true, "copper": true, "text": "Tant"}, ", Woven on Bengali Looms"],
    "subtitle": "Breathable cotton handlooms from Shantipur.",
    "cta": "SHOP TANT",
    "href": "/sarees?weave=Tant"
  },
  {
    "id": 4,
    "gradient": "linear-gradient(155deg, #3D1C0A, #6B2E0E, #C4611A)",
    "image": "/Banners/temple-jewellery.jpeg",
    "imageMobile": "/Banners/temple-jewellery-mob.jpeg",
    "eyebrow": "TEMPLE JEWELLERY · মন্দির গহনা",
    "bengali": "ঐতিহ্যের গহনা",
    "parts": ["Heirloom ", {"italic": true, "copper": true, "text": "Temple"}, " Pieces in Antique Gold"],
    "subtitle": "Hand-cast designs inspired by Bengal terracotta temples.",
    "cta": "SHOP JEWELLERY",
    "href": "/jewellery"
  }
]')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;

-- MARQUEE
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
]')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;

-- JEWELLERY SPOTLIGHT (3 items)
insert into content_blocks (section_key, content, is_published, published_content) values
('jewellery_spotlight', '{
  "eyebrow": "JEWELLERY · গহনা",
  "headlineParts": ["The ", {"italic": true, "copper": true, "text": "Golden"}, " Touch"],
  "sub": "Heirloom pieces, hand-cast and never repeated",
  "items": [
    {
      "id": 1,
      "tag": "TEMPLE COLLECTION",
      "gradient": "linear-gradient(165deg, #4A2010, #8B3A14 40%, #C4611A 70%, #7A2C0C)",
      "label": "Lakshmi temple necklace, antique gold finish",
      "name": "Lakshmi Temple Necklace",
      "price": "₹3,200",
      "priceNum": 3200,
      "slug": "lakshmi-temple-necklace",
      "catalogId": "j1",
      "images": ["/Products/jewellery/lakshmi-temple-necklace.png"]
    },
    {
      "id": 2,
      "tag": "CONTEMPORARY",
      "gradient": "linear-gradient(165deg, #5A2A14, #8B5E10 40%, #D4880A 70%, #4A3810)",
      "label": "Drop temple earrings, hammered copper tone",
      "name": "Drop Temple Earrings",
      "price": "₹2,400",
      "priceNum": 2400,
      "slug": "drop-temple-earrings",
      "catalogId": "j3",
      "images": ["/Products/jewellery/drop-temple-earrings.png"]
    },
    {
      "id": 3,
      "tag": "GOLD-PLATED",
      "gradient": "linear-gradient(165deg, #4A3810, #8B5E10 40%, #E8A820 70%, #BF5E18)",
      "label": "Gold-plated maangtikka · forehead ornament",
      "name": "Heirloom Maangtikka",
      "price": "₹1,950",
      "priceNum": 1950,
      "slug": "heirloom-maangtikka",
      "catalogId": "j2",
      "images": ["/Products/jewellery/heirloom-maangtikka.png"]
    }
  ]
}', true, '{
  "eyebrow": "JEWELLERY · গহনা",
  "headlineParts": ["The ", {"italic": true, "copper": true, "text": "Golden"}, " Touch"],
  "sub": "Heirloom pieces, hand-cast and never repeated",
  "items": [
    {
      "id": 1,
      "tag": "TEMPLE COLLECTION",
      "gradient": "linear-gradient(165deg, #4A2010, #8B3A14 40%, #C4611A 70%, #7A2C0C)",
      "label": "Lakshmi temple necklace, antique gold finish",
      "name": "Lakshmi Temple Necklace",
      "price": "₹3,200",
      "priceNum": 3200,
      "slug": "lakshmi-temple-necklace",
      "catalogId": "j1",
      "images": ["/Products/jewellery/lakshmi-temple-necklace.png"]
    },
    {
      "id": 2,
      "tag": "CONTEMPORARY",
      "gradient": "linear-gradient(165deg, #5A2A14, #8B5E10 40%, #D4880A 70%, #4A3810)",
      "label": "Drop temple earrings, hammered copper tone",
      "name": "Drop Temple Earrings",
      "price": "₹2,400",
      "priceNum": 2400,
      "slug": "drop-temple-earrings",
      "catalogId": "j3",
      "images": ["/Products/jewellery/drop-temple-earrings.png"]
    },
    {
      "id": 3,
      "tag": "GOLD-PLATED",
      "gradient": "linear-gradient(165deg, #4A3810, #8B5E10 40%, #E8A820 70%, #BF5E18)",
      "label": "Gold-plated maangtikka · forehead ornament",
      "name": "Heirloom Maangtikka",
      "price": "₹1,950",
      "priceNum": 1950,
      "slug": "heirloom-maangtikka",
      "catalogId": "j2",
      "images": ["/Products/jewellery/heirloom-maangtikka.png"]
    }
  ]
}')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;

-- BROWSE BY CATEGORY
insert into content_blocks (section_key, content, is_published, published_content) values
('browse_by_category', '{
  "sarees": {
    "hero": {
      "id": "benarasi", "bn": "বেনারসি", "en": "Benarasi",
      "gradient": "linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)",
      "image": "/Products/Banarasi/royal-crimson-benarasi.png", "dark": true, "hero": true
    },
    "small": [
      {"id": "tant", "bn": "তাঁত", "en": "Tant", "gradient": "linear-gradient(175deg, #F5EFE6, #D4B896 50%, #8C6A55)", "image": "/Products/Handlooms/nilima-tant-cotton.png", "dark": false},
      {"id": "muslin", "bn": "মসলিন", "en": "Muslin", "gradient": "linear-gradient(175deg, #EDE3D6, #C4A87A 60%, #8C6A55)", "image": "/Products/Handlooms/aarohi-muslin-drape.png", "dark": false},
      {"id": "silk", "bn": "সিল্ক", "en": "Silk", "gradient": "linear-gradient(175deg, #2A1008, #6B2E0E 50%, #BF5E18)", "image": "/Products/Handlooms/madhubani-silk-weave.png", "dark": true},
      {"id": "kantha", "bn": "কাঁথা", "en": "Kantha", "gradient": "linear-gradient(175deg, #1C0A06, #4A2010 50%, #8C6A55)", "image": "/Products/Handlooms/priya-kantha-stitch.png", "dark": true},
      {"id": "jamdani", "bn": "জামদানি", "en": "Jamdani", "gradient": "linear-gradient(175deg, #EDE3D6, #BFA678 60%, #6B5238)", "image": "/Products/Handlooms/rukmini-jamdani-cotton.png", "dark": false},
      {"id": "garad", "bn": "গরদ", "en": "Garad", "gradient": "linear-gradient(175deg, #F5EFE6, #E8D5B0 50%, #BF5E18)", "image": "/Products/Handlooms/shankha-garad-silk.png", "dark": false}
    ]
  },
  "jewellery": [
    {"id": "temple", "bn": "মন্দির গহনা", "en": "Temple", "gradient": "linear-gradient(175deg, #1C0A06, #4A2010 50%, #BF5E18)", "image": "/Products/jewellery/lakshmi-temple-necklace.png", "dark": true},
    {"id": "contemporary", "bn": "সমসাময়িক", "en": "Contemporary", "gradient": "linear-gradient(175deg, #2A1008, #5A2A14 50%, #D4880A)", "image": "/Products/jewellery/kolkata-contemporary-studs.png", "dark": true},
    {"id": "gold-plated", "bn": "সোনার মোড়ক", "en": "Gold-Plated", "gradient": "linear-gradient(175deg, #1C1406, #4A3810 50%, #D4880A)", "image": "/Products/jewellery/heirloom-maangtikka.png", "dark": true}
  ]
}', true, '{
  "sarees": {
    "hero": {
      "id": "benarasi", "bn": "বেনারসি", "en": "Benarasi",
      "gradient": "linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)",
      "image": "/Products/Banarasi/royal-crimson-benarasi.png", "dark": true, "hero": true
    },
    "small": [
      {"id": "tant", "bn": "তাঁত", "en": "Tant", "gradient": "linear-gradient(175deg, #F5EFE6, #D4B896 50%, #8C6A55)", "image": "/Products/Handlooms/nilima-tant-cotton.png", "dark": false},
      {"id": "muslin", "bn": "মসলিন", "en": "Muslin", "gradient": "linear-gradient(175deg, #EDE3D6, #C4A87A 60%, #8C6A55)", "image": "/Products/Handlooms/aarohi-muslin-drape.png", "dark": false},
      {"id": "silk", "bn": "সিল্ক", "en": "Silk", "gradient": "linear-gradient(175deg, #2A1008, #6B2E0E 50%, #BF5E18)", "image": "/Products/Handlooms/madhubani-silk-weave.png", "dark": true},
      {"id": "kantha", "bn": "কাঁথা", "en": "Kantha", "gradient": "linear-gradient(175deg, #1C0A06, #4A2010 50%, #8C6A55)", "image": "/Products/Handlooms/priya-kantha-stitch.png", "dark": true},
      {"id": "jamdani", "bn": "জামদানি", "en": "Jamdani", "gradient": "linear-gradient(175deg, #EDE3D6, #BFA678 60%, #6B5238)", "image": "/Products/Handlooms/rukmini-jamdani-cotton.png", "dark": false},
      {"id": "garad", "bn": "গরদ", "en": "Garad", "gradient": "linear-gradient(175deg, #F5EFE6, #E8D5B0 50%, #BF5E18)", "image": "/Products/Handlooms/shankha-garad-silk.png", "dark": false}
    ]
  },
  "jewellery": [
    {"id": "temple", "bn": "মন্দির গহনা", "en": "Temple", "gradient": "linear-gradient(175deg, #1C0A06, #4A2010 50%, #BF5E18)", "image": "/Products/jewellery/lakshmi-temple-necklace.png", "dark": true},
    {"id": "contemporary", "bn": "সমসাময়িক", "en": "Contemporary", "gradient": "linear-gradient(175deg, #2A1008, #5A2A14 50%, #D4880A)", "image": "/Products/jewellery/kolkata-contemporary-studs.png", "dark": true},
    {"id": "gold-plated", "bn": "সোনার মোড়ক", "en": "Gold-Plated", "gradient": "linear-gradient(175deg, #1C1406, #4A3810 50%, #D4880A)", "image": "/Products/jewellery/heirloom-maangtikka.png", "dark": true}
  ]
}')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;

-- FEATURED COLLECTION (product references by slug; server resolves to product rows)
insert into content_blocks (section_key, content, is_published, published_content) values
('featured_collection', '[
  {"slug": "royal-crimson-benarasi", "badge": null, "aspect": 0.666, "large": true},
  {"slug": "nilima-tant-cotton", "badge": null, "aspect": 0.75, "large": false},
  {"slug": "priya-kantha-stitch", "badge": null, "aspect": 0.75, "large": false}
]', true, '[
  {"slug": "royal-crimson-benarasi", "badge": null, "aspect": 0.666, "large": true},
  {"slug": "nilima-tant-cotton", "badge": null, "aspect": 0.75, "large": false},
  {"slug": "priya-kantha-stitch", "badge": null, "aspect": 0.75, "large": false}
]')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;

-- OUR HERITAGE
insert into content_blocks (section_key, content, is_published, published_content) values
('our_heritage', '{
  "eyebrow": "OUR HERITAGE",
  "headlineParts": ["A Boutique Born from ", {"italic": true, "copper": true, "text": "Love"}, " of Weave"],
  "blockquote": "Each saree we curate carries a piece of Shantiniketan — the same red soil where Tagore once walked, the same looms that have hummed for generations.",
  "paragraphs": [
    "Sumam''s Boutique began not as a business, but as a search — for sarees that still held the warmth of Bengali earth, the patience of handloom weavers, and the quiet grace of traditions passed down through generations.",
    "We travel each season to artisan families in Shantiniketan, Murshidabad, Bishnupur, and Shantipur — sourcing weaves that carry not just thread, but memory. Every piece is one-of-one. Once gone, never woven again."
  ],
  "image": "/Products/Banarasi/royal-crimson-benarasi.png",
  "founder": {"en": "Sumam", "bn": "সুমাম"},
  "photoLabel": "Founder Sumam at the / Shantiniketan loom"
}', true, '{
  "eyebrow": "OUR HERITAGE",
  "headlineParts": ["A Boutique Born from ", {"italic": true, "copper": true, "text": "Love"}, " of Weave"],
  "blockquote": "Each saree we curate carries a piece of Shantiniketan — the same red soil where Tagore once walked, the same looms that have hummed for generations.",
  "paragraphs": [
    "Sumam''s Boutique began not as a business, but as a search — for sarees that still held the warmth of Bengali earth, the patience of handloom weavers, and the quiet grace of traditions passed down through generations.",
    "We travel each season to artisan families in Shantiniketan, Murshidabad, Bishnupur, and Shantipur — sourcing weaves that carry not just thread, but memory. Every piece is one-of-one. Once gone, never woven again."
  ],
  "image": "/Products/Banarasi/royal-crimson-benarasi.png",
  "founder": {"en": "Sumam", "bn": "সুমাম"},
  "photoLabel": "Founder Sumam at the / Shantiniketan loom"
}')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;

-- INSTAGRAM STRIP
insert into content_blocks (section_key, content, is_published, published_content) values
('instagram_strip', '{
  "handle": "sumams.boutique",
  "url": "https://instagram.com/sumams.boutique",
  "posts": [
    {"img": 1, "user": "@sumams.boutique", "capt": "Benarasi in the morning light #canvas", "gradient": "linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)"},
    {"img": 2, "user": "@sumams.boutique", "capt": "Founder Sumam cutting a Tant #weave", "gradient": "linear-gradient(145deg,#F5EFE6,#D4B896 55%,#8C6A55)"},
    {"img": 3, "user": "@sumams.boutique", "capt": "The Shantiniketan loom at work #loom", "gradient": "linear-gradient(145deg,#EDE3D6,#C4A87A 55%,#6B5238)"},
    {"img": 4, "user": "@sumams.boutique", "capt": "Brass temple jewellery #heritage", "gradient": "linear-gradient(145deg,#4A2010,#D4880A 55%,#5A2A14)"}
  ]
}', true, '{
  "handle": "sumams.boutique",
  "url": "https://instagram.com/sumams.boutique",
  "posts": [
    {"img": 1, "user": "@sumams.boutique", "capt": "Benarasi in the morning light #canvas", "gradient": "linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)"},
    {"img": 2, "user": "@sumams.boutique", "capt": "Founder Sumam cutting a Tant #weave", "gradient": "linear-gradient(145deg,#F5EFE6,#D4B896 55%,#8C6A55)"},
    {"img": 3, "user": "@sumams.boutique", "capt": "The Shantiniketan loom at work #loom", "gradient": "linear-gradient(145deg,#EDE3D6,#C4A87A 55%,#6B5238)"},
    {"img": 4, "user": "@sumams.boutique", "capt": "Brass temple jewellery #heritage", "gradient": "linear-gradient(145deg,#4A2010,#D4880A 55%,#5A2A14)"}
  ]
}')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;

-- FOOTER (navigation link groups + details)
insert into content_blocks (section_key, content, is_published, published_content) values
('footer', '{
  "brand": {
    "title": "SUMAM''S BOUTIQUE",
    "taglineBn": "বাংলার ঐতিহ্যের শাড়ি ও গহনা",
    "tagline": "Heritage sarees & jewellery, curated with love from Bengal."
  },
  "newsletter": {
    "title": "Stay in the Weave",
    "body": "Receive stories of new arrivals, weaver''s notes, and seasonal lookbooks.",
    "noteBn": "নতুন সংগ্রহের খবর সবার আগে"
  },
  "sarees": [
    {"label": "benarasi", "href": "#"},
    {"label": "tant", "href": "#"},
    {"label": "muslin", "href": "#"},
    {"label": "kantha", "href": "#"},
    {"label": "silk", "href": "#"},
    {"label": "jamdani", "href": "#"},
    {"label": "garad", "href": "#"}
  ],
  "jewellery": [
    {"label": "temple-jewellery", "href": "#"},
    {"label": "contemporary", "href": "#"},
    {"label": "gold-plated", "href": "#"},
    {"label": "bridal-sets", "href": "#"}
  ],
  "help": [
    {"label": "our-story", "href": "#"},
    {"label": "shipping-returns", "href": "#"},
    {"label": "size-guide", "href": "#"},
    {"label": "care-instructions", "href": "#"},
    {"label": "contact-us", "href": "#"},
    {"label": "faqs", "href": "#"}
  ],
  "paymentMethods": ["RAZORPAY", "STRIPE", "VISA", "MASTERCARD", "UPI"],
  "copyright": "© 2025 Sumam''s Boutique. All rights reserved.",
  "madeIn": "Made in Bengal",
  "madeInBn": "বাংলায় তৈরি"
}', true, '{
  "brand": {
    "title": "SUMAM''S BOUTIQUE",
    "taglineBn": "বাংলার ঐতিহ্যের শাড়ি ও গহনা",
    "tagline": "Heritage sarees & jewellery, curated with love from Bengal."
  },
  "newsletter": {
    "title": "Stay in the Weave",
    "body": "Receive stories of new arrivals, weaver''s notes, and seasonal lookbooks.",
    "noteBn": "নতুন সংগ্রহের খবর সবার আগে"
  },
  "sarees": [
    {"label": "benarasi", "href": "#"},
    {"label": "tant", "href": "#"},
    {"label": "muslin", "href": "#"},
    {"label": "kantha", "href": "#"},
    {"label": "silk", "href": "#"},
    {"label": "jamdani", "href": "#"},
    {"label": "garad", "href": "#"}
  ],
  "jewellery": [
    {"label": "temple-jewellery", "href": "#"},
    {"label": "contemporary", "href": "#"},
    {"label": "gold-plated", "href": "#"},
    {"label": "bridal-sets", "href": "#"}
  ],
  "help": [
    {"label": "our-story", "href": "#"},
    {"label": "shipping-returns", "href": "#"},
    {"label": "size-guide", "href": "#"},
    {"label": "care-instructions", "href": "#"},
    {"label": "contact-us", "href": "#"},
    {"label": "faqs", "href": "#"}
  ],
  "paymentMethods": ["RAZORPAY", "STRIPE", "VISA", "MASTERCARD", "UPI"],
  "copyright": "© 2025 Sumam''s Boutique. All rights reserved.",
  "madeIn": "Made in Bengal"
}')
on conflict (section_key) do update set content = excluded.content, published_content = excluded.published_content, is_published = true;
