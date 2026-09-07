import React from 'react'
import Link from 'next/link'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

function Step({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-copper/10 text-copper text-[11px] font-sans font-semibold flex items-center justify-center">
        •
      </span>
      <span className="text-xs font-sans text-dark/85 leading-relaxed">{children}</span>
    </li>
  )
}

function Guide({
  title,
  summary,
  steps,
  link,
  linkLabel,
}: {
  title: string
  summary: string
  steps: React.ReactNode[]
  link: string
  linkLabel: string
}) {
  return (
    <div className="border border-[#DCC9A8]/50 bg-[#FDFBF7] p-5 shadow-[0_1px_3px_rgba(28,10,6,0.03)]">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <h2 className="font-sans text-[13px] font-semibold text-dark">{title}</h2>
        <Link href={link} className="text-[11px] font-sans text-copper hover:underline shrink-0">
          {linkLabel} →
        </Link>
      </div>
      <p className="text-[11px] font-sans text-muted mb-3">{summary}</p>
      <ul className="space-y-2">
        {steps.map((s, i) => (
          <Step key={i}>{s}</Step>
        ))}
      </ul>
    </div>
  )
}

export default async function AdminHelpPage() {
  await requireAdminOrStaff()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Help & Guides' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Plain-language guides" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          How to use the <span className="italic text-copper">Admin Panel</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1 max-w-2xl">
          Short walkthroughs for the daily tasks. None of these steps can break the website —
          changes stay as drafts until you deliberately publish them.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Guide
          title="1. Put a new product in the shop"
          summary="What happens when a saree or piece of jewellery is ready to sell."
          link="/admin/products/new"
          linkLabel="Open the form"
          steps={[
            <>Click <b>Products</b> in the left menu, then <b>“+ Add Product”</b>.</>,
            <>Type the <b>Product Name</b> and the selling <b>Price</b> — these two are required. The web address (slug) is filled in for you.</>,
            <>Pick the <b>Category</b> (e.g. <i>Sarees → Handloom</i>). If it isn’t listed, see the categories guide below.</>,
            <>Add <b>photos</b> in “Product Imagery” — a nicely-lit front shot plus a close-up of the border or weave. Leave “Alt text” describing each photo (this helps search engines show the product).</>,
            <>Fill the description boxes in your own words; they’re optional — customers read them on the product page.</>,
            <>Click <b>“Create Product”</b>. It is saved as <i>Draft</i> — invisible to customers until you tick <b>Published</b> when you’re happy with how it looks.</>,
          ]}
        />

        <Guide
          title="2. Process an order"
          summary="What to do from the moment an order arrives until it reaches the customer."
          link="/admin/orders"
          linkLabel="Open orders"
          steps={[
            <>Click <b>Orders</b> in the left menu. New orders show as <b>Pending</b> at the top.</>,
            <>Open the order to check what was bought, who the customer is, and the delivery address.</>,
            <>When payment clears, set status to <b>Paid</b>.</>,
            <>When you hand the package to the courier, note the tracking number (if you have one) and set <b>Shipped</b>.</>,
            <>Once the customer confirms delivery, set <b>Delivered</b>. Statuses only allow sensible next steps, so you can’t skip ahead by accident.</>,
            <>You can add a <b>staff note</b> on an order for your own records — customers don’t see these.</>,
          ]}
        />

        <Guide
          title="3. Change homepage text"
          summary="Announcements, hero banner, testimonials, and everything else on the homepage."
          link="/admin/content"
          linkLabel="Open homepage editor"
          steps={[
            <>Click <b>Homepage CMS</b> in the left menu.</>,
            <>Pick the section from the list — e.g. <b>2. Announcement Marquee</b> for the scrolling ticker, or <b>7. Customer Testimonials</b> to change reviews.</>,
            <>Edit the text boxes. For headlines, the “accent word” appears in copper italics.</>,
            <>Use <b>“Save Draft”</b> to keep your work without showing it yet. When it looks right, press <b>“Publish to Live Store”</b> — only then do customers see it.</>,
            <>Preview any section by clicking <b>“Live Preview ↗”</b> in the top right.</>,
          ]}
        />

        <Guide
          title="4. Manage categories, coupons & settings"
          summary="Organising the shop, creating discount codes, and store basics."
          link="/admin/categories"
          linkLabel="Open categories"
          steps={[
            <><b>Categories</b> — group products (e.g. <i>Sarees → Bridal</i>). Create one before adding products that need it, and it appears in the website menu.</>,
            <><b>Discount Coupons</b> — create codes like <i>WEDDING10</i>. Choose <b>percent</b> or a flat <b>amount</b> off, and an optional expiry date. Turn it <b>Active</b> to start accepting it.</>,
            <><b>Store Settings</b> — store name, phone, shipping amounts, and Instagram link. Only the owner should change these.</>,
            <><b>Customers & Staff</b> — view customer details and manage the accounts of people who help run the shop.</>,
          ]}
        />
      </div>

      <div className="border border-[#DCC9A8]/40 bg-cream/40 p-5 text-xs font-sans text-muted">
        <span className="text-dark font-medium">Tip:</span> almost nothing here goes live by itself.
        Products are drafts until <b>Published</b>, homepage edits stay drafts until <b>Publish to Live Store</b>,
        and coupons only work when they are <b>Active</b>. When in doubt, save a draft and ask the
        experienced admin to review before publishing.
      </div>
    </div>
  )
}