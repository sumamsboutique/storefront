# Client info needed before launch

Send this to the client. Each item says **where it lands** so nothing sits in an inbox.
"Admin → Settings" means the client can enter it themselves post-launch — we just need the value.

## 1. Business identity (⚠️ currently placeholder in code)

Everything below ships as fake data if the client doesn't answer. The defaults live in
`src/lib/admin/queries.ts` and are entered via **Admin → Settings → General**:

| Item | Current value | Notes |
|---|---|---|
| Store legal name | Sumam's Boutique | Confirm exact registered name |
| Phone / WhatsApp number | ✅ +91 70205 52557 | Drives footer, WhatsApp FAB, PDP "Chat on WhatsApp" button |
| Support email | ✅ hello@sumamsboutique.com | Shown in footer and contact page |
| Store address | Nagpur, India (city confirmed, street missing) | Needed for invoices + footer |
| Tagline (EN + Bengali) | "Bengal-heritage sarees…" | Confirm wording |

✅ Footer line is now `© 2026 Sumam's Boutique · Nagpur, India · Ships Pan-India`
and the "Made in Bengal · বাংলায় তৈরি" credit is in place.

## 2. Legal (🚫 nothing exists yet — needs a build decision)

No privacy policy or terms pages exist. Indian DPA + Razorpay both expect them.

- [ ] Privacy policy text (or approval to generate a standard e-commerce draft)
- [ ] Terms & conditions text (same)
- [ ] Returns/refunds policy — the real rules (see §4), which the policy page will state
- [ ] **GSTIN / GST registration number** — required to show tax on invoices; is the business GST-registered?
- [ ] Registered business address + entity type (sole proprietor / firm / Pvt Ltd) for invoices

## 3. Payments (Razorpay)

The checkout flow is fully built; it just has no live keys. Client must provide:

- [ ] Razorpay account (KYC-complete) → Key ID + Key Secret (**env vars**)
- [ ] Webhook secret for `/api/razorpay/webhook` (**env var**)
- [ ] Confirm settlement bank details are done on Razorpay's side
- [ ] Confirm payment methods to enable (site badges currently say: Razorpay, Visa, Mastercard, UPI — plus **COD? yes/no**)

## 4. Commerce rules (Admin → Settings → Commerce)

- [ ] Free-shipping threshold (currently defaults to ₹10,000)
- [ ] Flat shipping rate (defaults to ₹199) — and any COD surcharge
- [ ] Delivery timelines per pincode/zone (needed for shipping-returns page copy)
- [ ] Return/exchange window and conditions (7 days? no returns on jewellery?)
- [ ] Prices + stock for the real catalog (right now: 18 products; client confirms the final launch assortment and MRP/sale prices)

## 5. Brand & content assets

- [ ] Logo files (SVG + PNG; current logo is a code-drawn placeholder)
- [ ] Favicon / app icons
- [ ] Homepage banner images + banner link targets (Admin → Content covers text; confirm which 8 banners are final)
- [ ] Product photography for the final catalog (upload script exists: `scripts/upload-product-images.mjs`)
- [ ] "Our Story" copy approval — `/story` has 305 lines written by us
- [ ] FAQ list — 5 Q&As are drafted; client approves or supplies the real ones
- [ ] Instagram / Facebook / YouTube handles (Admin → Settings → Social; placeholders point at @sumamsboutique)
- [x] Founder name + photo — supplied (served from the `avatars` bucket, on `/story`)

## 6. Domain & email

- [ ] Domain name confirmed and accessible in their registrar
- [ ] DNS pointed to Vercel (or approval for us to do it)
- [ ] `NEXT_PUBLIC_SITE_URL` set to the final domain (**env var**)
- [ ] Confirm `hello@sumamsboutique.com` is a real, monitored mailbox (or where it should forward).

### Resend (transactional email) — code complete, **credentials required**

All templates are built and wired; email is simply **disabled until the two env vars below are set**. Everything degrades quietly while they are empty.

- [ ] Create a Resend account and add `sumamsboutique.com`
- [ ] Add the DNS records Resend gives you (SPF + DKIM), then verify the domain
- [ ] Set `RESEND_API_KEY` (**env var**, server-only — never `NEXT_PUBLIC_`)
- [ ] Set `EMAIL_FROM`, e.g. `Sumam's Boutique <orders@sumamsboutique.com>` (**env var**)

Emails already implemented:

| Email | Trigger | Sends from |
|---|---|---|
| Order confirmation + itemised invoice | Payment captured (Razorpay webhook) | `orders@…` |
| New-order alert to the boutique | Payment captured | Notification address in Admin → Settings |
| Order status update | Admin changes status to processing / shipped / delivered / cancelled / refunded | `orders@…` |
| Welcome | New customer account created | `orders@…` |
| Newsletter thank-you | Footer subscribe form | `orders@…` |

- [ ] Send one real test order end-to-end once the key is set (nothing has been emailed in production yet)

## 7. Analytics & marketing (optional, but ask)

- [ ] GA4 measurement ID (**env var** — optional, site works without it)
- [ ] Meta/Google pixel IDs if they'll run ads
- [ ] Newsletter: do they actually want it? Needs a Resend account + verified domain

## 8. Operations

- [ ] Who receives new-order notification emails? (Admin → Settings → Notifications, defaults to orders@sumamsboutique.com)
- [ ] Who will run the admin panel? Create their login (`supabase/create_admin_user.sql` / Admin → Customers)
- [ ] Support hours (contact page says "one business day" — confirm)
- [x] Business name + year for the footer copyright — set to 2026

---

**Minimum to launch today:** §3 (Razorpay live keys), §4 shipping/return rules, §6 domain. Contact details are in. Everything else can be filled in post-launch via the admin panel — except the privacy/terms pages, which we have to build.
