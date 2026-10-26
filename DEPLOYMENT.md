# Production Deployment Guide — Sumam's Boutique

Comprehensive guide for building, configuring, and deploying **Sumam's Boutique** to production.

---

## 1. System Architecture & Prerequisites

- **Framework**: Next.js 16 (App Router) + React 18
- **Runtime**: Node.js 22 LTS
- **Package Manager**: pnpm (`11.17.0`+)
- **Image Processing**: `sharp` (hardware-accelerated WebP & AVIF generation)
- **Database & Auth**: Supabase (PostgreSQL 15+)
- **Payments**: Razorpay (India INR)
- **Build Mode**: Standalone output (`output: 'standalone'`)

---

## 2. Environment Variables Configuration

Copy `.env.example` to your production environment configuration (or configure within your cloud provider's dashboard):

```env
# ── Supabase Backend (Required) ─────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# ── Payments: Razorpay (India INR) ─────────────────────────────────────────
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_yourKeyId
RAZORPAY_KEY_ID=rzp_live_yourKeyId
RAZORPAY_KEY_SECRET=yourRazorpaySecretKey
RAZORPAY_WEBHOOK_SECRET=yourRazorpayWebhookSecret

# ── Transactional Email: Resend (Optional) ─────────────────────────────────
RESEND_API_KEY=re_yourApiKey
EMAIL_FROM=Sumam's Boutique <orders@sumamsboutique.com>

# ── Analytics: Google Analytics 4 (Optional) ──────────────────────────────
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ── Canonical Application URL ──────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://sumamsboutique.com

# ── Admin Panel Host (Optional) ────────────────────────────────────────────
# Hostname only, no protocol/port. Empty keeps /admin on the main host.
ADMIN_HOST=admin.sumamsboutique.com
```

---

## 3. Deployment Options

### Option A: Vercel (Recommended PaaS)

Vercel provides zero-configuration deployment with automatic edge asset distribution and image optimization.

1. **Push Code to Git**:
   Push your repository to GitHub, GitLab, or Bitbucket.
2. **Import Project**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select the `sumams-boutique` repository.
3. **Project Settings**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
4. **Environment Variables**:
   Add all environment variables from Section 2 in **Project Settings → Environment Variables**.
5. **Admin subdomain** (when `ADMIN_HOST` is set):
   - **Settings → Domains** → add `admin.sumamsboutique.com` to the same project (one deployment, not a second project).
   - Point its DNS record (CNAME) as Vercel instructs.
   - `/admin/*` on the public host then 308-redirects to the admin host; the admin host serves both `/admin/*` and clean paths (`/products`, `/orders`, …).
6. **Deploy**:
   Click **Deploy**. Vercel will automatically build and serve the application globally.

---

### Option B: Docker Container (AWS, GCP, Railway, DigitalOcean, VPS)

The project includes a production-grade multi-stage `Dockerfile` creating a lightweight, non-root Alpine container.

#### 1. Build the Docker Image
```bash
docker build -t sumams-boutique:latest .
```

#### 2. Run the Container
```bash
docker run -d \
  --name sumams-boutique \
  -p 3000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  sumams-boutique:latest
```

#### 3. Verify Container Health
The container includes a built-in health check:
```bash
curl http://localhost:3000/api/health
```
Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-09-22T10:00:00.000Z",
  "uptime": 45,
  "environment": "production",
  "service": "Sumam's Boutique"
}
```

---

### Option C: Linux Virtual Private Server (VPS with PM2 & Nginx)

1. **Install Node.js 22 and pnpm**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   corepack enable
   corepack prepare pnpm@11.17.0 --activate
   ```

2. **Clone and Install**:
   ```bash
   git clone https://github.com/your-org/sumams-boutique.git /var/www/sumams
   cd /var/www/sumams
   pnpm install --frozen-lockfile
   ```

3. **Build the Standalone App**:
   ```bash
   pnpm run build
   ```

4. **Run with PM2**:
   ```bash
   sudo npm install -g pm2
   pm2 start .next/standalone/server.js --name "sumams" -i max
   pm2 save
   pm2 startup
   ```

5. **Nginx Reverse Proxy Config** (`/etc/nginx/sites-available/sumams`):
   ```nginx
   server {
       listen 80;
       server_name sumamsboutique.com www.sumamsboutique.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

---

## 4. Supabase Database Migration & Seeding

The current workspace is configured for a live Supabase database. Do not run migrations or write-based checks against it. The repository has migrations 001–033, no `supabase/config.toml`, and no recorded applied-version snapshot; use [the operations guide](docs/OPERATIONS.md) to compare state and validate against a separate staging/test project before any production change.

Do not paste all migration files into the SQL Editor or use `supabase db push` without confirming the linked project and unapplied versions. Product image uploads expect the `sarees` bucket; profile avatars are provisioned by migration 016. Existing homepage image URLs may point to previously configured storage. Verify bucket names, public-read needs, upload MIME/size restrictions, and RLS on staging instead of creating generic `products`, `banners`, or `cms` buckets by assumption.

Create the initial Auth user through Supabase Auth or the app signup. The profile role is assigned by the server-only `scripts/promote-admin.mjs` after migration 030 has been reviewed and applied to the intended environment. That script requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` and does not accept or print a password. Do not point it at production without an authorized operator change.

---

## 5. Pre-Deployment Verification Checklist

Before deploying any new version to production, verify all automated checks:

```bash
# 1. Type check
pnpm run typecheck

# 2. Lint check
pnpm run lint

# 3. Unit tests
pnpm test

# 4. Production build
pnpm run build
```
Ensure all 4 commands complete with **0 errors**.
