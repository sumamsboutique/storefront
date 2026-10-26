-- RLS policies filter rows, not columns. The old public SELECT policy allowed
-- readers of published rows to select `content` as well as `published_content`,
-- exposing draft edits after saving a draft on an already-published section.
drop policy if exists "content_blocks_select_public" on public.content_blocks;
drop policy if exists "content_blocks_select_staff" on public.content_blocks;
create policy "content_blocks_select_staff"
  on public.content_blocks for select
  using (public.is_admin_or_staff());

-- The storefront gets only the explicit published snapshot through a
-- security-barrier view. The view is intentionally owner-rights (the default),
-- while its predicate and projection constrain the public surface.
create or replace view public.published_content_blocks
with (security_barrier = true)
as
select section_key, published_content
from public.content_blocks
where is_published is true
  and published_content is not null;

revoke all on public.published_content_blocks from public, anon, authenticated;
grant select on public.published_content_blocks to anon, authenticated;

-- Anonymous clients must use the restricted view. Authenticated users retain
-- table privileges, but the staff-only RLS policies prevent customer access.
revoke all on public.content_blocks from public, anon;
