-- 020_product_image_variants.sql
-- Lets the PDP swap galleries when a variant is picked: a photo row may now
-- belong to one variant. Null = shared gallery (every other product).
-- Heads-up: the admin product editor re-inserts product_images without
-- variant_id, so re-saving a product there clears these links (the gallery
-- then falls back to showing all of the product's photos).

alter table product_images
  add column if not exists variant_id uuid references product_variants(id) on delete set null;
