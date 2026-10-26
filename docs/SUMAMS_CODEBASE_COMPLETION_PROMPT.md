# Sumam's Boutique: Codebase-Specific Audit and Completion Brief

## Mission

Audit and complete the existing Sumam's Boutique application using the repository's actual architecture and business scope. Work in the existing repository, preserve the current stack and business behavior unless evidence supports a documented change, and complete the highest-priority safe remediation work. Keep an evidence-based record of what is verified, partial, blocked, or not implemented. Do not claim production readiness while critical risks, required live integrations, or operational checks remain unverified.

This brief is tailored to the repository at `D:\DEVELOPMENT\Sumams`. The attached generic master prompt is a source for audit coverage, not an assertion that every listed enterprise feature belongs to this boutique.

## Grounded codebase profile

- Storefront and admin: Next.js 16 App Router, React 18, TypeScript, Tailwind CSS.
- Runtime/data services: Supabase PostgreSQL, Supabase Auth, Supabase Storage, PostgREST and SQL RPCs; no separate application server or ORM is present.
- State and validation: Zustand for client cart/wishlist state; Zod at action boundaries.
- Payments: Razorpay INR checkout, server-side signature verification, and a Razorpay webhook. No Stripe implementation is present.
- Email: optional Resend integration. Analytics: optional GA4. Hosting targets described in the repo include Vercel and a standalone Docker deployment.
- Automated checks: ESLint, TypeScript, Vitest, production Next build, and GitHub Actions CI. Playwright/E2E configuration, Sentry, a job queue, and shipping-provider integration are not currently established.
- Storefront routes include home, saree/jewellery listings and product detail, collections/search, cart drawer, authenticated checkout, account/orders/addresses, wishlist, order lookup, and policy/information pages.
- Admin includes dashboard, products, categories, orders, customers, coupons, homepage content blocks, media, subscribers, settings, and profile. Admin/staff/customer roles exist; this is a boutique-scale admin/CMS, not a general-purpose CRM or page-builder.
- Database evolution is maintained as ordered SQL migrations under `supabase/migrations/`. The current local set is numbered through 033. The user confirmed the configured Supabase database is live and instructed that it must not be broken; keep all migration application and write-based integration tests off that target. Verify live migration state only with a read-only, explicitly scoped check.

## Scope boundaries and applicability

Treat requirements as applicable only when supported by current business rules, existing interfaces/data, or an explicit user decision. Do not add enterprise features merely because the generic prompt lists them.

- Current checkout requires an authenticated customer, as implemented in the UI and current SQL migration. Older guest-checkout migrations are historical and must not be treated as current product behavior.
- The current payment path is Razorpay only. Do not add Stripe, COD, UPI-specific branches, refunds, or additional payment methods without a demonstrated requirement and verified provider/configuration needs.
- Shipping is currently settings-driven flat/free-threshold pricing, with address capture; carrier labels, serviceability API, tracking provider, and multi-warehouse workflows are not evidenced. Document these as unsupported or blocked where appropriate; do not fabricate fulfillment integrations.
- Return/refund policy pages exist, but a customer return-request workflow or provider refund workflow must be verified before describing it as implemented. If absent, mark it partial/not implemented and seek business rules before inventing eligibility/state transitions.
- CMS currently uses structured homepage content blocks and product/category data. Do not assume arbitrary static policy pages, blog, revisions, scheduled publication, draft previews, or a generic page builder are editable unless code and schema confirm it.
- Customer operations comprise profiles, saved addresses, order history, reviews, and an admin customer directory. Do not label this a full CRM unless segmentation, tasks, communications timeline, consent workflows, and analytics exist.
- Inventory is product-variant based in SQL. The cart persists client-side; no authenticated server-side cart/merge behavior is established unless verified.
- The user selected manual reconciliation for captured payments that cannot fulfill due to stock/coupon conflicts or additional captures. The application must record and surface these cases; a staff resolution may fulfill after a fresh stock check or record a refund already completed externally. The application must not issue a refund automatically.
- A static/demo catalog fallback may support development or outage rendering. It must never be allowed to create a real order or claim real catalog/payment success when backend configuration is absent.

## Working rules

1. Inspect the actual working tree, including existing modifications, before editing. Changes already present belong to the user; preserve them and build on them carefully.
   Treat `repo-docs/` as archived reference material; the active application and authoritative operational docs are at the repository root and under `docs/`.
2. Read repository `AGENTS.md` and the relevant installed Next.js 16 guides under `node_modules/next/dist/docs/` before changing Next.js source or conventions. The migration and architecture are version-sensitive.
3. Map the UI → server action/route → Supabase/RPC → payment/webhook → resulting UI path for checkout, account, catalog/admin, CMS, and customer/order operations.
4. Validate all untrusted inputs and enforce authorization server-side. Never expose service-role credentials, payment secrets, customer PII, or secrets in logs. Treat client-visible prices as display-only; SQL/server calculations are authoritative.
   Map expected RPC/provider failures to safe user-facing messages. Logs must not include raw provider response bodies, secrets, or customer payment/contact payloads.
5. SQL changes must be forward-only, versioned migrations. Preserve historical order data. Do not run migrations against a remote database, production, or destructive operations without explicit authorization and a recovery plan.
6. Do not make a test pass by weakening security. Use isolated test fixtures and test-mode providers. Do not send actual customer email or initiate real financial transactions during tests.
7. Keep code changes focused and reviewable. Add regression coverage where the existing test setup allows it. Report commands actually run and their results; distinguish unit tests from database/provider integration tests.
8. Do not claim a live integration works without credentials and an end-to-end sandbox test. Record configuration needs by variable name only; never print values.
9. Maintain the documentation below as findings change. If the full mission cannot fit in one execution window, finish a coherent milestone and leave concrete remaining acceptance criteria in the plan.

## Audit and completion workstreams

### P0 — Security, money, identity, and data integrity

- Verify access control on every server action and route, especially order ownership before creating or verifying Razorpay orders, customer address/profile mutations, admin/staff boundaries, and service-role usage.
- Review Supabase RLS, `SECURITY DEFINER` RPCs, grants, `search_path`, input checks, and all recent order/payment migrations together. Check payment amount/order-reference binding, callback/webhook races, replay/idempotency, pending-order reuse, and order state transitions.
- Verify inventory checks and decrements for selected variants, duplicate cart lines, concurrent orders, and insufficient stock at payment capture. No oversell, cross-variant substitution, or false successful order may occur.
- Ensure a pending order reused on checkout retry has the same line items and financial snapshot; do not rewrite line items on a payment-linked order.
- Verify coupon limits and race behavior, server-calculated price/shipping/discounts, safe order retries, and failure recovery.
- Identify production blockers from environment/deployment configuration without revealing secret values.

### P1 — Essential storefront and admin flows

- Product/category lifecycle, media validation and alt text, publication, cache invalidation, search/listing, variant selection, and cart persistence/quantity constraints.
- Authenticated account lifecycle and saved addresses; clearly document unimplemented email verification/reset behavior if it depends on Supabase configuration.
- Checkout → pending order → Razorpay order → verified payment/webhook → paid order → inventory/coupon update → confirmation/email. Test both success and failure/retry paths in the available safe environment.
- Admin order handling and audit trail; verify status transitions and prevent staff from performing admin-only or payment-sensitive actions.
- Verify current homepage content editing/publishing and the actual content path to storefront rendering.

### P2 — Store operations and discoverability

- Settings-driven shipping, order lookup/tracking behavior, email failure handling, coupon maintenance, customer administration, product SEO/structured data, sitemap/robots, and operational health endpoint.
- Document returns, refunds, shipping carrier integration, tax/invoice requirements, CRM segmentation/communications, content revisions/scheduling, data export/deletion, backups, and restore as applicable gaps unless verified in implementation.
- Check accessibility and performance in the implemented flows; use measured evidence and mark untested browser/device scenarios as unverified.

### P3 — Maintainability and scale

- Review process-local caches and invalidation across multiple app instances, query limits/pagination, logging/monitoring, dependency/CI posture, and deployment/recovery docs.
- Recommend infrastructure only when a concrete current requirement warrants it.

## Required documentation in `docs/`

- `CODEBASE_AUDIT.md`: executive summary, actual architecture, severity-ranked findings with file/schema evidence, status, risks, and verified/blocked boundaries.
- `ARCHITECTURE.md`: current component/data-flow map, trust boundaries, integrations, environment-variable names (never values), deployment assumptions, and failure behavior.
- `FEATURE_MATRIX.md`: storefront, catalog, cart, checkout, payments, inventory, shipping, account, admin/CRM, CMS, SEO/accessibility, operations; each item has `VERIFIED`, `IMPLEMENTED, NOT VERIFIED`, `PARTIAL`, `BLOCKED`, `NOT IMPLEMENTED`, or `NOT APPLICABLE`, plus evidence and gap.
- `IMPLEMENTATION_PLAN.md`: ordered work, dependencies, acceptance criteria, completed changes, validation commands/results, remaining work, and external prerequisites.
- This file is the tailored execution prompt. Keep its scope grounded as the codebase changes.

## Verification standard

Use existing commands (`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`) when validation is requested or needed for a code change, and run the smallest relevant checks first. Add DB/RPC integration, concurrency, security, and browser E2E checks only where they can run against isolated/test infrastructure. Never infer database runtime correctness from TypeScript tests alone.

For every completed item, record:

1. The observed defect or gap and its evidence.
2. The change and impacted files/migration.
3. Regression coverage or why it could not be run.
4. Actual command or manual verification result.
5. Remaining risk and any required live/sandbox/manual verification.

## Final completion report

Report what is verified, implemented but unverified, partial, blocked, missing, or not applicable. Include findings by severity, verification evidence, required environment setup, safe migration/deployment/rollback notes, backup/restore caveats, and the exact blockers to production readiness. “Production ready” is allowed only after critical security/data-integrity findings are resolved and critical payment/order/inventory flows are verified in an authorized sandbox or equivalent integration environment.
