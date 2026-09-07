# Sumam's Boutique — Admin CRM & CMS Setup Guide

This guide covers setting up, authenticating, and operating the Admin CRM and CMS panel for **Sumam's Boutique**.

---

## 1. Environment Variables

Ensure `.env.local` contains your Supabase project credentials:

```bash
# Public Supabase URL & Key
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# Optional Site URL (for metadata & link generation)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> [!IMPORTANT]
> The admin panel leverages **Row Level Security (RLS)** with user role validation (`profiles.role in ('admin', 'staff')`). No service-role key is exposed to browser code.

---

## 2. Database Migrations

Apply the migrations in order using either the Supabase CLI (`supabase db push`) or by pasting them sequentially into the **Supabase SQL Editor**:

1. `supabase/migrations/001_initial_schema.sql` — Profiles, categories, products, images, variants, content blocks, orders, audit log.
2. `supabase/migrations/002_seed_data.sql` — Initial catalog and categories seed.
3. `supabase/migrations/003_fix_rls_admin_check.sql` — Role checking security definer functions and recursion-safe RLS policies.
4. `supabase/migrations/004_full_fidelity_content_blocks.sql` — Full-fidelity homepage content blocks.
5. `supabase/migrations/005_guest_checkout_orders.sql` — Secure guest order creation RPC.
6. `supabase/migrations/006_store_settings_and_order_notes.sql` — Store settings table, order staff notes, and staff profile view permissions.

---

## 3. Creating & Promoting the First Admin User

Admin access is restricted to authenticated users with `role = 'admin'` or `role = 'staff'` in the `profiles` table.

### Step 1: Create a User Account
1. Open Supabase Dashboard → **Authentication** → **Users** → **Add User** (or sign up via the app).
2. Enter the email (e.g. `admin@sumamsboutique.com`) and a secure password.
3. Auto-confirm the user's email address.

### Step 2: Promote User to Admin Role
Execute the following query in the **Supabase SQL Editor**:

```sql
-- Ensure profile exists and assign 'admin' role
insert into public.profiles (id, role, full_name, email)
select id, 'admin', 'Atelier Director', email
from auth.users
where email = 'admin@sumamsboutique.com'
on conflict (id) do update
set role = 'admin', full_name = 'Atelier Director';
```

Verify the role:
```sql
select id, email, role, full_name from public.profiles where role in ('admin', 'staff');
```

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
