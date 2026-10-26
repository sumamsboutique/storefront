# Sumam's Boutique

A custom e-commerce storefront and staff admin for Sumam's Boutique. The app uses Next.js 16 App Router, React, TypeScript, Tailwind CSS, Supabase Auth/Postgres/Storage, and Razorpay INR checkout.

## Local development

1. Install the repository's pinned tools with pnpm and copy `.env.example` to `.env.local`.
2. Configure Supabase and Razorpay test-mode variables. Keep service-role, Razorpay secret, webhook, and Resend keys server-only.
3. Install dependencies and run the app:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Use the Supabase project configured for local development or an isolated staging project. The configured project in this workspace is live; do not use it for migrations, write-based tests, or test orders.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm exec next build --webpack
```

See [the codebase-specific completion brief](docs/SUMAMS_CODEBASE_COMPLETION_PROMPT.md), [audit](docs/CODEBASE_AUDIT.md), [feature matrix](docs/FEATURE_MATRIX.md), and [operations guide](docs/OPERATIONS.md) for scope, evidence, and production prerequisites.

**Production readiness has not been certified.** Database migrations 026–033 are local and unverified against PostgreSQL; checkout reservation/recovery, sandbox payment behavior, deployment settings, and backup/restore still need isolated verification.
