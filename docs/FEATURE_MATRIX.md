# Feature matrix — Sumam's Boutique

Statuses describe evidence in the local repository and checks run on 2026-10-26. They do not assert live service readiness.

| Area / feature | Status | Evidence | Remaining gap / verification |
|---|---|---|---|
| Storefront home, nav, footer, policy pages | IMPLEMENTED, NOT VERIFIED | `src/app/(client)/*`; storefront components | Responsive/accessibility browser pass needed |
| Saree/jewellery listing and category routes | IMPLEMENTED, NOT VERIFIED | `sarees`, `jewellery`, `collections`, category route | Query behavior verified by code; no E2E |
| Product detail, metadata, structured product data | IMPLEMENTED, NOT VERIFIED | `products/[slug]/page.tsx`, `Pdp.tsx` | Confirm all structured-data values match visible price/availability and actual DB data |
| Search | PARTIAL | `/search`, `SearchResults.tsx` | Client-side/catalog search; no autocomplete/search service/pagination evidence |
| Product variants and variant galleries | PARTIAL | `CatalogProduct`, `data.ts`, `Pdp.tsx`, current user edits, migrations 020/023/026 | Selection/order/stock end-to-end and concurrent inventory not yet proven |
| Cart add/update/remove/persist | IMPLEMENTED, NOT VERIFIED | `src/lib/store.ts`; cart tests | No server-side account cart or merge-on-login evidence |
| Wishlist | IMPLEMENTED, NOT VERIFIED | wishlist route/client and Zustand store | Browser flow not E2E tested; persistence scope is client-side |
| Authenticated customer checkout | PARTIAL | `checkout/page.tsx`; `orders.ts`; SQL migration 025/026 | Payment/ownership/inventory critical checks remain open |
| Guest checkout | NOT APPLICABLE | Current UI and SQL require a session; historical migration 005 differs | Do not restore without explicit business decision |
| Server-side order pricing/shipping/coupon calculation | PARTIAL | `create_pending_order` SQL; `coupon_quote`; migrations 026/029/033 | Pending retries now require the exact item multiset and pricing snapshot; coupon usage is locked/rechecked at settlement and exhausted discounts enter manual review. Pending coupon/stock reservations, expiry, SQL execution and concurrency tests remain unverified |
| Razorpay initiation | PARTIAL | `src/lib/payments.ts`; `razorpay-client.ts`; `payments.test.ts`; migration 033 | Owner check, exact line-item/pricing snapshot reuse, and conditional first-link write implemented; orphan provider orders from simultaneous first requests are not returned to callers; no authorized sandbox evidence |
| Payment callback HMAC + captured-state verification | IMPLEMENTED, NOT VERIFIED | `razorpay-signature.ts`; `payments.ts`; `payments.test.ts` | Callback checks server-fetched payment capture, order ID, amount, and INR; provider sandbox remains untested |
| Razorpay signed webhook and duplicate-paid guard | PARTIAL | `/api/razorpay/webhook`; migrations 028/029; `route.test.ts` | Stable provider order reference and concrete payment ID are required for settlement; an `order.paid` event without a payment ID is acknowledged and ignored so a later capture is not misclassified as an extra payment. Additional captures and inventory/coupon conflicts enter a durable staff queue; provider replay/order and SQL integration tests remain open |
| Refund operations | PARTIAL | migration 029 and `/admin/reconciliation` | App does not issue refunds; staff can record a refund already completed in Razorpay. General full/partial refund operations remain unimplemented |
| Inventory by product variant | PARTIAL | variant schema; migrations 026/029; payment review queue | Exact-variant locked decrement and captured-payment manual recovery are implemented locally; pending-order reservation/expiry and SQL concurrency verification remain |
| Shipping fees | IMPLEMENTED, NOT VERIFIED | store settings and order SQL | Flat rate/free threshold only; verify business boundary around threshold |
| Carrier labels, tracking provider, delivery webhooks | NOT IMPLEMENTED | No provider integration found | Business/vendor choice required |
| Returns/exchanges/cancellations workflow | PARTIAL | policy pages/admin order status support | No customer returns flow or refund/restock state machine verified |
| Customer profile/password/email/avatar | IMPLEMENTED, NOT VERIFIED | `src/lib/account.ts`; `src/lib/safe-redirect.ts` | Same-origin login/OAuth redirect validation has regression tests; Supabase email confirmation/password reset settings and live account flows remain unverified |
| Saved addresses/order history/reviews | IMPLEMENTED, NOT VERIFIED | `account.ts`, migrations 013/014 | Database integration and RLS tests needed |
| CRM/customer directory | PARTIAL | admin customers, orders, profiles | No segmentation, tasks, timeline, consent center, LTV/repeat metrics evidence |
| Admin dashboard data availability | PARTIAL | `src/lib/admin/queries.ts`; `/admin` | Live query failures now display unavailable states instead of zeros or demo inventory; revenue definition, date filters and dashboard browser verification remain open |
| Admin role checks and bootstrap | PARTIAL | `admin/auth.ts`, action guards, migrations 015/030, `scripts/promote-admin.mjs` | User/staff role enforcement exists; trusted service-role promotion path is implemented locally. Migration 030 and the staff/admin/customer action matrix are not database-tested |
| Admin catalog/category management | PARTIAL | `src/lib/admin/actions.ts`; `reorder_categories()` in migration 031; product/category forms | Product image/variant writes check database errors and scope updates to the owning product; partial multi-request writes invalidate caches and report failure. Category ordering uses an authenticated atomic RPC with duplicate/set validation and action tests; SQL needs isolated PostgreSQL verification. Category/content save transactions and multi-instance cache invalidation remain open |
| Admin order management/notes | PARTIAL | order list/detail/actions; `/admin/reconciliation` | Manual captured-payment resolution is surfaced to staff; migration 029, SQL behavior, and full transition matrix remain unverified |
| Homepage structured CMS | PARTIAL | `ContentManagerClient`; `content_blocks`; migration 032; `src/lib/content-publishing.ts`; `src/lib/data.ts`; `saveContentBlock()` | Draft content is isolated from the published snapshot; storefront reads only `published_content` through a limited public view, and direct base-table reads are staff-only. Unit tests cover app publication behavior; grants/RLS require PostgreSQL verification. Preview, revision, and scheduled publishing are not implemented |
| General static-page CMS/blog | NOT IMPLEMENTED | Static app routes | No requirement established; policy pages currently code-based |
| Media management | PARTIAL | media manager, image uploader, `image-files.ts`, `image-files.test.ts` | Server validates declared JPG/PNG/WebP type against file signature and enforces size limits; test real Storage bucket policies, image decoding/dimensions, deletion safety and shared-library behavior |
| Newsletter | PARTIAL | `newsletter.ts`, migration 007, optional email | Rate limit/bot controls and consent/unsubscribe handling not established |
| Transactional email | PARTIAL | `src/lib/email.ts` | Resend credentials/deliverability and idempotent delivery not verified |
| Analytics | PARTIAL | `GoogleAnalytics.tsx`, GA4 env | Consent rules and real property events not verified |
| Sitemap/robots/SEO metadata | IMPLEMENTED, NOT VERIFIED | `sitemap.ts`, `robots.ts`, metadata routes | Verify generated entries and canonical host against deployment |
| Health/monitoring | PARTIAL | `/api/health` | Process-only health, no dependency/alert integration |
| CI static checks/tests/build | PARTIAL | `.github/workflows/ci.yml`; local test/lint/typecheck/build results in audit | Latest Webpack build failed with Windows `EPERM` creating a `.next` route directory; last successful build predates category/CMS changes. Default Turbopack worker startup remains unresolved; neither build exercises DB, provider, or browser flows |
| Browser E2E/security/concurrency tests | NOT IMPLEMENTED | No configured E2E runner / integration suite found | Add against isolated test project after credentials/test fixtures available |
| Deployment/setup docs | PARTIAL | `DEPLOYMENT.md`, `ADMIN_SETUP.md` | Migration order, backup/restore, rollback, secrets and verified environment need reconciliation |
| Backup/restore | BLOCKED | No repository procedure/infrastructure evidence | Requires Supabase project access and a safe restore target |
| Production readiness certification | BLOCKED | Critical P0 payment/inventory items and external integration evidence remain | Resolve P0; run sandbox and deployment checks |
