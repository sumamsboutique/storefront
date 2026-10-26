# Operations, deployment, and recovery

This is a repository-grounded handoff. It documents safe steps and known gaps; it does not claim access to or validation of the live hosting/Supabase accounts.

## Environment setup

Use the variable names and public/server-only split in [`.env.example`](../.env.example). Do not commit `.env.local`/`.env.production`, print secret values, or put service-role/Razorpay/Resend secrets in `NEXT_PUBLIC_*` variables. The deployment docs describe Vercel and standalone Docker targets; confirm which target the business actually uses before changing production settings.

Minimum application configuration for real authenticated checkout includes Supabase URL and anon key, Supabase service-role key (server-only), Razorpay public key ID, server Razorpay key ID/secret, and webhook secret. Resend variables are optional for email. A successful local build without credentials does not establish real authentication, payment, webhook, or email operation.

## Database migration procedure

The SQL files in `supabase/migrations/` are versioned changes. Repository review on 2026-10-26 found files 001–033 and no `supabase/config.toml` or recorded live migration history. The user confirmed the configured Supabase database is live and instructed that it must not be broken. Its applied versions are unknown from this checkout; do not apply migrations or perform write-based tests against it.

Before applying:

1. Identify the exact Supabase project and whether it is local, staging, or production.
2. Confirm a recent backup and a tested restore path; a backup that has not been restored is not proven recoverable.
3. Compare live schema and migration history with the repository. Resolve drift explicitly.
4. Apply only unapplied versions in order, first to an isolated/staging database.
5. Run RLS, SQL function, webhook, payment state, inventory concurrency, and checkout integration checks against that database.
6. Schedule production application with an owner and recovery window. Do not use a blind SQL paste of all files.

Migrations 026–033 are local changes in this working tree and have not been run against PostgreSQL. Migration 026 changes stock fulfillment; migration 027 blocks unauthorized payment/refund status changes; migration 028 separates payment IDs from provider order references and preserves old captured payment IDs; migration 029 adds durable payment review, coupon-limit checks, and staff reconciliation RPCs; migration 030 allows the trusted service role to perform initial admin promotion without weakening customer role protection; migration 031 makes staff category reordering atomic; migration 032 makes direct content-block reads staff-only and provides a published-only view for storefront reads; migration 033 binds pending-order reuse to an exact line-item and pricing snapshot. Review and test them against a separate isolated Supabase project before deployment. The Supabase CLI is present, but this checkout has no `supabase/config.toml`; `psql` and Docker were not available for isolated SQL tests.

## Deployment verification

Available local checks are `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. On the latest audited tree, lint and typecheck passed and 114 unit tests passed across 16 files. The latest `pnpm exec next build --webpack` failed with Windows `EPERM` creating `.next/server/app/admin/products/[id]`. A prior attempt compiled and passed TypeScript, then failed during prerender with the same class of error. The last successful Webpack build generated 52 routes before migration 031/category reordering and the CMS publication/privacy changes. The default Turbopack build previously encountered a worker-spawn failure on this Windows host. Treat both current build paths as unresolved until verified in the intended CI/deployment target.

Before deploy, verify in the real target environment:

- production environment-variable names and scopes are present (never expose values in tickets/logs);
- the Supabase project has the intended migration history and RLS policies;
- Razorpay uses the intended test/live key pair, registered webhook URL, and matching webhook secret;
- webhook delivery, duplicate events, amount mismatch, and payment retry are tested in Razorpay test mode;
- any configured email sender domain is verified and delivery failures are observable;
- both public and admin hostnames, TLS, redirects, and canonical site URL match the deployment;
- CI uses the same build command/bundler as the intended production deployment.

The `/api/health` route reports process status only. It does not establish Supabase, Razorpay, or email health.

## Rollback and recovery

- No automatic down migrations are present. Treat schema changes as forward-only; prepare a corrective migration or restore plan for each change.
- Keep the prior application release available for rollback, but do not assume the old code is compatible with a newer schema. Check compatibility before reverting an app build.
- Preserve order/payment history. Never delete orders to make a migration pass.
- If Razorpay reports a captured payment but the application cannot mark the order paid, retain provider/order references, inspect inventory and webhook logs, and reconcile manually with an authorized operator. Do not create a second charge as a retry.
- For email delivery failures, the current code has no durable queue/retry ledger; inspect provider delivery logs and resend only after deduplicating against the paid-order state.
- Backups, retention, point-in-time recovery, and restore were not verified because no Supabase project access or isolated restore target was available.

## Manual verification still required

The production operator should run a sandbox transaction through authenticated checkout, verify the signed callback and webhook, replay the webhook, test a failed/dismissed payment, and confirm only one paid transition, one stock deduction, and one customer notification. Also test denial of another customer's order ID and the admin status matrix. Repeat the inventory race against a disposable database before applying migration 026.
