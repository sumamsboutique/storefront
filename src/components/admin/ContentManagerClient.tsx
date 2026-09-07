'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { AdminContentBlock } from '@/lib/admin/queries'
import { AdminCard } from '@/components/admin/AdminCard'
import { PublicationBadge } from '@/components/admin/AdminBadge'
import { useToast } from '@/components/admin/AdminToast'
import { saveContentBlock } from '@/lib/admin/actions'

const SECTIONS = [
  { key: 'hero', label: '1. Hero Banner Slides', desc: 'Main carousel slides, headline typography, and action links.' },
  { key: 'marquee', label: '2. Announcement Marquee', desc: 'Scrolling bilingual banner items below the hero.' },
  { key: 'browse_by_category', label: '3. Browse By Category', desc: 'Hero and grid tiles for Sarees and Fine Jewellery.' },
  { key: 'featured_collection', label: '4. Featured Collection', desc: 'Selected featured products and 2x large card layout.' },
  { key: 'our_heritage', label: '5. Our Heritage & Story', desc: 'Founder story, blockquote, and atelier archival photo.' },
  { key: 'jewellery_spotlight', label: '6. Jewellery Spotlight', desc: 'Curated antique temple jewellery showcase.' },
  { key: 'testimonials', label: '7. Customer Testimonials', desc: 'Handpicked patron stories and reviews from the storefront.' },
  { key: 'instagram_strip', label: '8. Instagram Gallery', desc: 'Social handle and live lifestyle photo feed.' },
  { key: 'footer', label: '9. Footer & Brand Copy', desc: 'Brand tagline, newsletter text, and copyright.' },
]

export function ContentManagerClient({
  blocks,
}: {
  blocks: AdminContentBlock[]
}) {
  const router = useRouter()
  const { success, error } = useToast()
  const [isPending, startTransition] = useTransition()

  // Selected section tab
  const [activeTab, setActiveTab] = useState('hero')

  // Find block for current tab
  const currentBlock = blocks.find((b) => b.section_key === activeTab)

  // Local editor JSON string
  const [jsonString, setJsonString] = useState(() => {
    return currentBlock?.content
      ? JSON.stringify(currentBlock.content, null, 2)
      : '[]'
  })

  // When active tab changes, update editor string
  const handleTabSelect = (key: string) => {
    setActiveTab(key)
    const b = blocks.find((x) => x.section_key === key)
    setJsonString(b?.content ? JSON.stringify(b.content, null, 2) : '[]')
  }

  const handleSave = (publishNow: boolean) => {
    let parsed: unknown
    try {
      parsed = JSON.parse(jsonString)
    } catch {
      error('Invalid JSON. Please verify formatting before saving.')
      return
    }

    startTransition(async () => {
      const res = await saveContentBlock({
        section_key: activeTab,
        content: parsed,
        publishNow,
      })

      if (res.success) {
        success(
          publishNow
            ? `Published "${activeTab}" directly to storefront!`
            : `Saved draft for "${activeTab}".`
        )
        router.refresh()
      } else {
        error(res.error || 'Failed to save content block.')
      }
    })
  }

  const activeSectionMeta = SECTIONS.find((s) => s.key === activeTab)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Sidebar: Section Tabs */}
      <div className="lg:col-span-1 space-y-2">
        <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-muted px-2 block mb-2">
          Homepage Sections
        </span>
        {SECTIONS.map((sec) => {
          const b = blocks.find((x) => x.section_key === sec.key)
          const isSelected = activeTab === sec.key

          return (
            <button
              key={sec.key}
              onClick={() => handleTabSelect(sec.key)}
              className={`w-full text-left p-3.5 border transition-all text-xs font-sans ${
                isSelected
                  ? 'bg-copper text-ivory border-copper shadow-sm'
                  : 'bg-[#FDFBF7] text-dark border-[#DCC9A8]/60 hover:bg-cream/50'
              }`}
            >
              <div className="font-medium">{sec.label}</div>
              <div
                className={`text-[10px] mt-0.5 truncate ${
                  isSelected ? 'text-ivory/80' : 'text-muted'
                }`}
              >
                {sec.desc}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.2 tracking-wider ${
                    isSelected
                      ? 'bg-black/20 text-ivory'
                      : b?.is_published
                      ? 'bg-[#EAF5EC] text-[#1E6B2C]'
                      : 'bg-cream text-muted'
                  }`}
                >
                  {b?.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Right 3 Cols: Editor */}
      <div className="lg:col-span-3 space-y-6">
        <AdminCard
          title={activeSectionMeta?.label}
          subtitle={activeSectionMeta?.desc}
          action={
            <div className="flex items-center gap-2">
              <PublicationBadge isPublished={currentBlock?.is_published ?? false} />
              <Link
                href="/"
                target="_blank"
                className="text-xs font-sans text-muted hover:text-copper border border-[#DCC9A8]/60 px-2.5 py-1"
              >
                Live Preview ↗
              </Link>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted">
                Structured JSON Content
              </label>
              <span className="text-[10px] font-sans text-muted">
                Strict storefront schema compliance
              </span>
            </div>

            <textarea
              rows={18}
              value={jsonString}
              onChange={(e) => setJsonString(e.target.value)}
              className="w-full p-4 font-mono text-xs bg-[#1C0A06] text-[#F5EFE6] border border-[#DCC9A8]/40 focus:outline-none focus:border-copper leading-relaxed selection:bg-copper selection:text-white"
              spellCheck={false}
            />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DCC9A8]/40">
              <div className="text-[11px] font-sans text-muted">
                Last updated:{' '}
                {currentBlock?.updated_at
                  ? new Date(currentBlock.updated_at).toLocaleString('en-IN')
                  : 'Pre-seeded'}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  disabled={isPending}
                  className="px-5 py-2 text-xs font-sans font-medium uppercase tracking-wider bg-white border border-[#DCC9A8] hover:border-dark text-dark transition-colors disabled:opacity-50"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={isPending}
                  className="px-5 py-2 text-xs font-sans font-medium uppercase tracking-wider bg-copper hover:bg-[#A04A18] text-ivory transition-colors disabled:opacity-50 shadow-sm"
                >
                  {isPending ? 'Publishing...' : 'Publish to Live Store'}
                </button>
              </div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  )
}
