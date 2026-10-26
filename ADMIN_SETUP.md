# Sumam's Boutique — Admin CRM & CMS Setup Guide

This guide covers setting up, authenticating, and operating the Admin CRM and CMS panel for **Sumam's Boutique**.

---

## 1. Environment Variables

Ensure `.env.local` contains your Supabase project credentials:

```bash
# Public Supabase URL & Key
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# Server-only; needed for trusted payment processing and the admin bootstrap script
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional Site URL (for metadata & link generation)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> [!IMPORTANT]
> The admin panel uses **Row Level Security (RLS)** with server-side role checks. The service-role key is server-only and must never be exposed to browser code.

---

## 2. Database Migrations

The repository contains ordered migrations 001–033. Do **not** blindly run all files or paste them into the live SQL Editor. The configured Supabase database is live, and its applied migration history has not been verified in this checkout. Follow [the operations guide](docs/OPERATIONS.md) and test schema changes against a separate project first. Guest checkout in migration 005 is historical; current checkout requires sign-in.

---

## 3. Creating & Promoting the First Admin User

Admin access is restricted to authenticated users with `role = 'admin'` or `role = 'staff'` in the `profiles` table.

1. Create the Auth user in Supabase Dashboard → **Authentication** → **Users**, or use the app signup. Confirm the email according to the project’s Auth settings.
2. After migration 030 is verified on the intended database, run `node --env-file=.env.local scripts/promote-admin.mjs <email>` from the repository. The script requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, prints no secret values, and promotes an existing profile.
3. Do not run it against production unless an authorized operator intends that role change. `supabase/create_admin_user.sql` is read-only; direct SQL role promotion is blocked by the profile guard.

---

## 4. Running the Admin Panel Locally

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Navigate to:
   ```
   http://localhost:3000/admin
   ```
3. If unauthenticated, you will be redirected to:
   ```
   http://localhost:3000/admin/login
   ```
4. Sign in with the credentials created in Step 3.

---

## 5. Admin Panel Structure & Features

| Route | Section | Description |
|---|---|---|
| `/admin` | **Dashboard** | Real-time KPIs (revenue, orders, active catalog, low stock alerts), recent orders stream, and audit log. |
| `/admin/products` | **Products List** | Search, filter by category/stock/status, pagination, bulk publish/activate actions, and delete safety. |
| `/admin/products/new` | **New Product** | Complete product creation with 5 PDP accordions, pricing, SKU, image gallery with alt text, variants, and SEO. |
| `/admin/products/[id]` | **Product Editor** | In-depth product editing with primary image management and custom variants. |
| `/admin/categories` | **Categories** | Parent/child category hierarchy, Bengali script labels, reordering, hero showcase flags, and product count checks. |
| `/admin/content` | **Homepage CMS** | Structured editor for all 8 homepage content blocks (Hero, Marquee, Browse By Category, Featured Collection, Our Heritage, Jewellery Spotlight, Instagram Strip, Footer) with Draft vs. Published states. |
| `/admin/orders` | **Orders CRM** | Filterable order queue with search by order ID, status badges, and transaction summary. |
| `/admin/orders/[id]` | **Order Details** | Line item snapshots, customer address, financial breakdown, controlled status workflow, and staff notes. |
| `/admin/reconciliation` | **Payment Review** | Captured-payment cases; staff may confirm available stock or record a refund already completed in Razorpay. This page does not issue refunds. |
| `/admin/customers` | **Customers & Staff** | User directory with order count, total spend, and admin-only role promotions/demotions. |
| `/admin/media` | **Media Library** | Brand asset browser with instant path copying, alt text tracking, and active usage detection. |
| `/admin/settings` | **Store Settings** | Atelier details, free shipping threshold (₹), flat shipping fee (₹), social links, and alert emails. |

---

## 6. Testing & Quality Assurance

Run the test suite:
```bash
npm test
```

Run TypeScript strict check:
```bash
npm run typecheck
```
