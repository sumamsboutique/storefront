'use client'

// Schema-driven form editor for homepage content blocks.
// Each section spec describes its JSON shape; widgets bind to dot paths.
// '#.#' in a path is replaced with the actual list index (e.g. 'items.#.name').

import React from 'react'

type W =
  | { kind: 'text'; p: string; l: string; hint?: string; nullable?: boolean }
  | { kind: 'area'; p: string; l: string; rows?: number }
  | { kind: 'num'; p: string; l: string; min?: number; max?: number; step?: number; hint?: string }
  | { kind: 'bool'; p: string; l: string }
  | { kind: 'image'; p: string; l: string; index?: number }
  | { kind: 'parts'; p: string; l: string }
  | { kind: 'price'; p: string; priceP: string; l: string }
  | { kind: 'enbn'; en: string; bn: string; l: string }
  | { kind: 'strlist'; p: string; l: string; hint?: string }
  | { kind: 'list'; p: string; l: string; item?: string; max?: number; w: W[] }
  | { kind: 'group'; l: string; hint?: string; w: W[] }

const ENBN_FIELDS: W[] = [
  { kind: 'enbn', en: '#.en', bn: '#.bn', l: 'Name (EN / BN)' },
]

const TILE_FIELDS: W[] = [
  { kind: 'text', p: '#.id', l: 'ID' },
  ...ENBN_FIELDS,
  { kind: 'image', p: '#.image', l: 'Image' },
  { kind: 'bool', p: '#.dark', l: 'Dark overlay' },
  { kind: 'text', p: '#.gradient', l: 'Gradient' },
]

const SECTION_SPECS: Record<string, { l: string; hint: string; w: W[] }> = {
  hero: {
    l: 'Hero Slides',
    hint: 'Main carousel slides. "Before" and "After" text frame the accent word rendered in italic copper.',
    w: [
      {
        kind: 'list',
        p: '$',
        l: 'Slides',
        item: 'Slide',
        max: 8,
        w: [
          { kind: 'num', p: '#.id', l: 'Slide ID' },
          { kind: 'image', p: '#.image', l: 'Desktop image' },
          { kind: 'image', p: '#.imageMobile', l: 'Mobile image' },
          { kind: 'text', p: '#.eyebrow', l: 'Eyebrow', hint: 'Small label above the headline, e.g. FEATURED COLLECTION' },
          { kind: 'text', p: '#.bengali', l: 'Bengali tagline' },
          { kind: 'parts', p: '#.parts', l: 'Headline' },
          { kind: 'text', p: '#.subtitle', l: 'Subtitle' },
          { kind: 'text', p: '#.cta', l: 'Button text' },
          { kind: 'text', p: '#.href', l: 'Button link' },
          { kind: 'text', p: '#.gradient', l: 'Background gradient' },
        ],
      },
    ],
  },
  marquee: {
    l: 'Announcement Marquee',
    hint: 'Scrolling banner items. Bengali is optional; blank Bengali falls back to English.',
    w: [
      { kind: 'list', p: '$', l: 'Items', item: 'Item', max: 12, w: ENBN_FIELDS },
    ],
  },
  browse_by_category: {
    l: 'Browse By Category',
    hint: 'One featured Sarees tile plus small grid tiles for Sarees and Jewellery.',
    w: [
      {
        kind: 'group',
        l: 'Sarees — Hero Tile',
        w: [
          { kind: 'text', p: 'sarees.hero.id', l: 'ID' },
          { kind: 'enbn', en: 'sarees.hero.en', bn: 'sarees.hero.bn', l: 'Name (EN / BN)' },
          { kind: 'image', p: 'sarees.hero.image', l: 'Image' },
          { kind: 'bool', p: 'sarees.hero.dark', l: 'Dark overlay' },
          { kind: 'text', p: 'sarees.hero.gradient', l: 'Gradient' },
        ],
      },
      { kind: 'group', l: 'Sarees — Small Tiles', w: [{ kind: 'list', p: 'sarees.small', l: 'Tiles', item: 'Tile', w: TILE_FIELDS }] },
      { kind: 'group', l: 'Jewellery Tiles', w: [{ kind: 'list', p: 'jewellery', l: 'Tiles', item: 'Tile', w: TILE_FIELDS }] },
    ],
  },
  featured_collection: {
    l: 'Featured Collection',
    hint: 'Products by slug. "Large" cards span two grid columns and pull the hero badge.',
    w: [
      {
        kind: 'list',
        p: '$',
        l: 'Featured Products',
        item: 'Product',
        w: [
          { kind: 'text', p: '#.slug', l: 'Product slug', hint: 'Matches a product in the catalog' },
          { kind: 'text', p: '#.badge', l: 'Badge (optional)', nullable: true, hint: 'e.g. Summer Collector’s Edit' },
          { kind: 'num', p: '#.aspect', l: 'Aspect ratio', step: 0.01, hint: 'Column span multiplier (1 = standard, 2 = wide)' },
          { kind: 'bool', p: '#.large', l: 'Large card' },
        ],
      },
    ],
  },
  our_heritage: {
    l: 'Our Heritage',
    hint: 'Founder story, blockquote, paragraphs (one per line), and archival photo.',
    w: [
      { kind: 'text', p: 'eyebrow', l: 'Eyebrow' },
      { kind: 'parts', p: 'headlineParts', l: 'Headline' },
      { kind: 'area', p: 'blockquote', l: 'Blockquote', rows: 3 },
      { kind: 'strlist', p: 'paragraphs', l: 'Paragraphs', hint: 'One paragraph per line' },
      { kind: 'image', p: 'image', l: 'Atelier photo' },
      { kind: 'text', p: 'founder.en', l: 'Founder name (EN)' },
      { kind: 'text', p: 'founder.bn', l: 'Founder name (BN)' },
      { kind: 'text', p: 'photoLabel', l: 'Photo caption' },
    ],
  },
  jewellery_spotlight: {
    l: 'Jewellery Spotlight',
    hint: 'Curated antique temple jewellery pieces. Each piece links to its catalog page.',
    w: [
      { kind: 'text', p: 'eyebrow', l: 'Eyebrow' },
      { kind: 'parts', p: 'headlineParts', l: 'Headline' },
      { kind: 'text', p: 'sub', l: 'Subcopy' },
      {
        kind: 'list',
        p: 'items',
        l: 'Pieces',
        item: 'Piece',
        w: [
          { kind: 'num', p: '#.id', l: 'Piece ID' },
          { kind: 'text', p: '#.tag', l: 'Tag' },
          { kind: 'text', p: '#.label', l: 'Label' },
          { kind: 'text', p: '#.name', l: 'Name' },
          { kind: 'price', p: '#.priceNum', priceP: '#.price', l: 'Price (₹)' },
          { kind: 'text', p: '#.slug', l: 'Catalog slug' },
          { kind: 'image', p: '#.images', l: 'Image', index: 0 },
        ],
      },
    ],
  },
  testimonials: {
    l: 'Customer Testimonials',
    hint: 'Handpicked patron stories shown on the storefront.',
    w: [
      {
        kind: 'list',
        p: '$',
        l: 'Testimonials',
        item: 'Testimonial',
        w: [
          { kind: 'num', p: '#.id', l: 'ID' },
          { kind: 'area', p: '#.quote', l: 'Quote', rows: 3 },
          { kind: 'text', p: '#.name', l: 'Name' },
          { kind: 'text', p: '#.detail', l: 'Detail', hint: 'e.g. Married in Varanasi' },
          { kind: 'num', p: '#.rating', l: 'Rating', min: 1, max: 5, step: 1 },
        ],
      },
    ],
  },
  instagram_strip: {
    l: 'Instagram Gallery',
    hint: 'Handle and lifestyle posts. Image # points to the built-in gallery image (1–4).',
    w: [
      { kind: 'text', p: 'handle', l: 'Handle', hint: 'e.g. sumams.boutique' },
      { kind: 'text', p: 'url', l: 'Profile URL' },
      {
        kind: 'list',
        p: 'posts',
        l: 'Posts',
        item: 'Post',
        w: [
          { kind: 'num', p: '#.img', l: 'Image #' },
          { kind: 'text', p: '#.user', l: 'Username' },
          { kind: 'text', p: '#.capt', l: 'Caption' },
          { kind: 'text', p: '#.gradient', l: 'Gradient' },
        ],
      },
    ],
  },
  footer: {
    l: 'Footer & Brand Copy',
    hint: 'Brand tagline, newsletter box, link columns, and legal line.',
    w: [
      { kind: 'group', l: 'Brand', w: [
        { kind: 'text', p: 'brand.title', l: 'Title' },
        { kind: 'text', p: 'brand.tagline', l: 'Tagline (EN)' },
        { kind: 'text', p: 'brand.taglineBn', l: 'Tagline (BN)' },
      ] },
      { kind: 'group', l: 'Newsletter', w: [
        { kind: 'text', p: 'newsletter.title', l: 'Title' },
        { kind: 'area', p: 'newsletter.body', l: 'Body', rows: 3 },
        { kind: 'text', p: 'newsletter.noteBn', l: 'Note (BN)' },
      ] },
      { kind: 'group', l: 'Sarees Links', w: [LINK_LIST('sarees')] },
      { kind: 'group', l: 'Jewellery Links', w: [LINK_LIST('jewellery')] },
      { kind: 'group', l: 'Help Links', w: [LINK_LIST('help')] },
      { kind: 'strlist', p: 'paymentMethods', l: 'Payment methods', hint: 'One per line' },
      { kind: 'text', p: 'copyright', l: 'Copyright line' },
      { kind: 'text', p: 'madeIn', l: 'Made-in badge (EN)' },
      { kind: 'text', p: 'madeInBn', l: 'Made-in badge (BN)' },
    ],
  },
}

function LINK_LIST(p: string): W {
  return {
    kind: 'list',
    p,
    l: 'Links',
    item: 'Link',
    w: [
      { kind: 'text', p: '#.label', l: 'Label' },
      { kind: 'text', p: '#.href', l: 'Link' },
    ],
  }
}

// --- path helpers (p = dot path; '#.#' replaced in order by list indexes; '$' = root) ---
type PathPart = string | number

function pathOf(p: string, replaces: number[]): PathPart[] {
  let j = 0
  return p
    .split('.')
    .filter((t) => t !== '$')
    .map((t) => (t === '#' ? replaces[j++] : t))
}

function getAt(obj: unknown, base: PathPart[]): unknown {
  return base.reduce<any>((acc, k) => (acc == null ? undefined : acc[k]), obj)
}

function setAt(obj: any, base: PathPart[], value: unknown): any {
  if (base.length === 0) return value
  const [first, ...rest] = base
  const cloned = Array.isArray(obj) ? [...obj] : { ...(obj ?? {}) }
  cloned[first] = setAt(cloned[first], rest, value)
  return cloned
}

// --- tiny primitives ---
const inputCls =
  'w-full px-3 py-2 text-xs font-sans bg-white border border-[#DCC9A8]/70 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper/30'

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-dark">
        {children}
      </label>
      {hint && <p className="text-[10px] font-sans text-muted mt-0.5 leading-relaxed">{hint}</p>}
    </div>
  )
}

function FieldShell({ label, hint, children }: { label: React.ReactNode; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {hint && <p className="text-[10px] font-sans text-muted -mt-1 leading-relaxed">{hint}</p>}
      {children}
    </div>
  )
}

function TextWidget({ value, onChange, placeholder }: { value: unknown; onChange: (v: unknown) => void; placeholder?: string }) {
  return (
    <input
      className={inputCls}
      value={typeof value === 'string' ? value : ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function AreaWidget({ value, onChange, rows = 4 }: { value: unknown; onChange: (v: unknown) => void; rows?: number }) {
  return (
    <textarea
      rows={rows}
      className={inputCls}
      value={typeof value === 'string' ? value : ''}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function NumWidget({ value, onChange, min, max, step, suffix }: { value: unknown; onChange: (v: unknown) => void; min?: number; max?: number; step?: number; suffix?: string }) {
  const raw = typeof value === 'number' ? value : ''
  return (
    <div className="flex items-center">
      {suffix && <span className="mr-2 text-xs font-sans text-muted">{suffix}</span>}
      <input
        type="number"
        className={inputCls}
        value={raw === '' ? '' : raw}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = e.target.value === '' ? Number(min ?? 0) : Number(e.target.value)
          onChange(Number.isFinite(n) ? n : Number(min ?? 0))
        }}
      />
    </div>
  )
}

function BoolWidget({ value, onChange, label }: { value: unknown; onChange: (v: unknown) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-sans border transition-colors ${
        value ? 'bg-copper text-ivory border-copper' : 'bg-white text-muted border-[#DCC9A8]/70 hover:border-copper'
      }`}
    >
      <span className="w-2 h-2 rounded-full bg-current" />
      {label} — {value ? 'On' : 'Off'}
    </button>
  )
}

function ImageWidget({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const path = typeof value === 'string' ? value : ''
  return (
    <div className="flex items-start gap-3">
      <div className="w-16 h-16 shrink-0 border border-[#DCC9A8]/60 bg-cream flex items-center justify-center overflow-hidden">
        {path ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={path.startsWith('http') ? path : `${path.startsWith('/') ? path : '/'}${path}`} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[9px] font-sans text-muted">No image</span>
        )}
      </div>
      <div className="flex-1">
        <TextWidget value={path} onChange={(v) => onChange(typeof v === 'string' ? v : '')} placeholder="/images/..." />
      </div>
    </div>
  )
}

function PartsWidget({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const parts = Array.isArray(value) ? value : []
  const strings = parts.filter((p): p is string => typeof p === 'string')
  const accent = parts.find((p): p is { italic?: boolean; copper?: boolean; text?: string } => !!p && typeof p === 'object')
  const before = strings[0] ?? ''
  const after = strings[1] ?? ''
  const emit = (before: string, text: string, after: string, italic: boolean, copper: boolean) => {
    const out: unknown[] = []
    if (before) out.push(before)
    if (text) out.push({ italic, copper, text })
    if (after) out.push(after)
    onChange(out)
  }
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <TextWidget value={before} onChange={(v) => emit(typeof v === 'string' ? v : '', accent?.text ?? '', after, accent?.italic ?? true, accent?.copper ?? true)} placeholder="Text before…" />
        <TextWidget value={after} onChange={(v) => emit(before, accent?.text ?? '', typeof v === 'string' ? v : '', accent?.italic ?? true, accent?.copper ?? true)} placeholder="Text after…" />
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <TextWidget value={accent?.text ?? ''} onChange={(v) => emit(before, typeof v === 'string' ? v : '', after, accent?.italic ?? true, accent?.copper ?? true)} placeholder="Accent word (italic copper)…" />
        </div>
        <button
          type="button"
          onClick={() => emit(before, accent?.text ?? '', after, !(accent?.italic ?? true), accent?.copper ?? true)}
          className={`px-3 py-2 text-[10px] font-sans font-medium uppercase tracking-wider border transition-colors ${
            accent?.italic ? 'bg-copper text-ivory border-copper' : 'bg-white text-muted border-[#DCC9A8]/70'
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => emit(before, accent?.text ?? '', after, accent?.italic ?? true, !(accent?.copper ?? true))}
          className={`px-3 py-2 text-[10px] font-sans font-medium uppercase tracking-wider border transition-colors ${
            accent?.copper ? 'bg-copper text-ivory border-copper' : 'bg-white text-muted border-[#DCC9A8]/70'
          }`}
        >
          Copper
        </button>
      </div>
    </div>
  )
}

function StrListWidget({ value, onChange, placeholder }: { value: unknown; onChange: (v: unknown) => void; placeholder?: string }) {
  const list = Array.isArray(value) ? value.filter((x) => typeof x === 'string') : []
  return (
    <textarea
      rows={Math.max(2, list.length + 1)}
      className={inputCls}
      value={list.join('\n')}
      placeholder={placeholder ?? 'One per line'}
      onChange={(e) => onChange(e.target.value.split('\n'))}
    />
  )
}

// --- renderer ---
function RenderWidget({
  spec,
  content,
  onChange,
  replaces,
}: {
  spec: W
  content: unknown
  onChange: (v: unknown) => void
  replaces: number[]
}) {
  switch (spec.kind) {
    case 'text': {
      const v = getAt(content, pathOf(spec.p, replaces))
      return (
        <FieldShell label={spec.l} hint={spec.hint}>
          <TextWidget
            value={typeof v === 'string' ? v : ''}
            onChange={(nv) => {
              let next = nv
              if (spec.nullable && (typeof nv !== 'string' || nv.trim() === '')) next = null
              onChange(setAt(content, pathOf(spec.p, replaces), next))
            }}
          />
        </FieldShell>
      )
    }
    case 'area': {
      const v = getAt(content, pathOf(spec.p, replaces))
      return (
        <FieldShell label={spec.l}>
          <AreaWidget value={typeof v === 'string' ? v : ''} onChange={(nv) => onChange(setAt(content, pathOf(spec.p, replaces), nv))} rows={spec.rows} />
        </FieldShell>
      )
    }
    case 'num': {
      const v = getAt(content, pathOf(spec.p, replaces))
      return (
        <FieldShell label={spec.l}>
          <NumWidget
            value={typeof v === 'number' ? v : undefined}
            min={spec.min}
            max={spec.max}
            step={spec.step}
            onChange={(nv) => onChange(setAt(content, pathOf(spec.p, replaces), nv))}
          />
        </FieldShell>
      )
    }
    case 'bool': {
      const v = getAt(content, pathOf(spec.p, replaces))
      return (
        <div className="pt-1">
          <BoolWidget value={!!v} onChange={(nv) => onChange(setAt(content, pathOf(spec.p, replaces), nv))} label={spec.l} />
        </div>
      )
    }
    case 'image': {
      const raw = getAt(content, pathOf(spec.p, replaces))
      const one = Array.isArray(raw) ? raw[spec.index ?? 0] : raw
      return (
        <FieldShell label={spec.l}>
          <ImageWidget
            value={typeof one === 'string' ? one : ''}
            onChange={(nv) => {
              const next = Array.isArray(raw)
                ? raw.map((x, i) => (i === (spec.index ?? 0) ? nv : x))
                : nv
              onChange(setAt(content, pathOf(spec.p, replaces), next))
            }}
          />
        </FieldShell>
      )
    }
    case 'parts': {
      const v = getAt(content, pathOf(spec.p, replaces))
      return (
        <FieldShell label={spec.l} hint="Accent word renders in italic copper. Text before/after stay plain.">
          <PartsWidget value={Array.isArray(v) ? v : []} onChange={(nv) => onChange(setAt(content, pathOf(spec.p, replaces), nv))} />
        </FieldShell>
      )
    }
    case 'price': {
      const v = getAt(content, pathOf(spec.p, replaces))
      return (
        <FieldShell label={spec.l}>
          <NumWidget
            value={typeof v === 'number' ? v : undefined}
            min={0}
            suffix="₹"
            onChange={(nv) => {
              const n = typeof nv === 'number' ? nv : 0
              onChange(setAt(content, pathOf(spec.p, replaces), nv))
              onChange(setAt(content, pathOf(spec.priceP, replaces), n ? `₹${n.toLocaleString('en-IN')}` : '₹0'))
            }}
          />
        </FieldShell>
      )
    }
    case 'enbn': {
      const enV = getAt(content, pathOf(spec.en, replaces))
      const bnV = getAt(content, pathOf(spec.bn, replaces))
      return (
        <div className="space-y-1.5">
          <Label>{spec.l}</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <TextWidget value={typeof enV === 'string' ? enV : ''} onChange={(nv) => onChange(setAt(content, pathOf(spec.en, replaces), nv))} placeholder="English" />
            <TextWidget value={typeof bnV === 'string' ? bnV : ''} onChange={(nv) => onChange(setAt(content, pathOf(spec.bn, replaces), nv))} placeholder="বাংলা" />
          </div>
        </div>
      )
    }
    case 'strlist': {
      const v = getAt(content, pathOf(spec.p, replaces))
      return (
        <FieldShell label={spec.l} hint={spec.hint}>
          <StrListWidget value={Array.isArray(v) ? v : []} onChange={(nv) => onChange(setAt(content, pathOf(spec.p, replaces), nv))} />
        </FieldShell>
      )
    }
    case 'list': {
      const v = getAt(content, pathOf(spec.p, replaces))
      const items = Array.isArray(v) ? v : []
      const renderIndexes = replaces.join(',')
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{spec.l}</Label>
            {spec.max && (
              <span className="text-[10px] font-sans text-muted">
                {items.length}/{spec.max}
              </span>
            )}
          </div>
          {items.length === 0 && <p className="text-[11px] font-sans text-muted">No {spec.l.toLowerCase()} yet — add one below.</p>}
          <div className="space-y-3">
            {items.map((item, i) => {
              const itemReplaces = [...replaces, i]
              const displayLabel = spec.item || 'Item'
              return (
                <div key={`${renderIndexes}-${i}`} className="border border-[#DCC9A8]/50 bg-[#FBF8F1] p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-copper">
                      {displayLabel} {i + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      {i > 0 && (
                        <button
                          type="button"
                          title="Move up"
                          onClick={() => onChange(swapAt(content, pathOf(spec.p, replaces) as number[], i, i - 1))}
                          className="w-6 h-6 text-[10px] font-sans border border-[#DCC9A8]/70 text-muted hover:text-dark hover:border-dark bg-white"
                        >
                          ↑
                        </button>
                      )}
                      {i < items.length - 1 && (
                        <button
                          type="button"
                          title="Move down"
                          onClick={() => onChange(swapAt(content, pathOf(spec.p, replaces) as number[], i, i + 1))}
                          className="w-6 h-6 text-[10px] font-sans border border-[#DCC9A8]/70 text-muted hover:text-dark hover:border-dark bg-white"
                        >
                          ↓
                        </button>
                      )}
                      <button
                        type="button"
                        title="Remove"
                        onClick={() => onChange(removeAt(content, pathOf(spec.p, replaces) as number[], i))}
                        className="w-6 h-6 text-[10px] font-sans border border-[#DCC9A8]/70 text-muted hover:text-[#A3392B] hover:border-[#A3392B] bg-white"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {spec.w.map((child, ci) => (
                      <div key={ci} className={child.kind === 'area' || child.kind === 'parts' ? 'sm:col-span-2' : undefined}>
                        <RenderWidget spec={child} content={content} onChange={onChange} replaces={itemReplaces} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          {(!spec.max || items.length < spec.max) && (
            <button
              type="button"
              onClick={() => onChange(insertAt(content, pathOf(spec.p, replaces) as number[], items.length, {}))}
              className="px-3 py-1.5 text-[10px] font-sans font-medium uppercase tracking-wider bg-white border border-dashed border-[#DCC9A8] hover:border-copper hover:text-copper text-muted"
            >
              + Add {displayLabel(spec.item)}
            </button>
          )}
        </div>
      )
    }
    case 'group': {
      return (
        <div className="border border-[#DCC9A8]/50 p-4 space-y-4">
          <div>
            <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-dark">{spec.l}</span>
            {spec.hint && <p className="text-[10px] font-sans text-muted mt-0.5">{spec.hint}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {spec.w.map((child, ci) => (
              <div key={ci} className={child.kind === 'area' || child.kind === 'group' || child.kind === 'list' || child.kind === 'parts' || child.kind === 'image' ? 'sm:col-span-2' : undefined}>
                <RenderWidget spec={child} content={content} onChange={onChange} replaces={replaces} />
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}

function displayLabel(item?: string): string {
  return item || 'Item'
}

// --- array mutation helpers (mutate the array at root via setAt on a fresh clone) ---
function insertAt(content: unknown, base: number[], index: number, item: unknown): unknown {
  const arr = Array.isArray(getAt(content, base)) ? (getAt(content, base) as unknown[]) : []
  const next = [...arr.slice(0, index), item, ...arr.slice(index)]
  return setAt(content, base, next)
}

function removeAt(content: unknown, base: number[], index: number): unknown {
  const arr = (getAt(content, base) as unknown[]) ?? []
  return setAt(content, base, arr.filter((_, i) => i !== index))
}

function swapAt(content: unknown, base: number[], a: number, b: number): unknown {
  const arr = [...((getAt(content, base) as unknown[]) ?? [])]
  ;[arr[a], arr[b]] = [arr[b], arr[a]]
  return setAt(content, base, arr)
}

export function ContentBlockForm({
  sectionKey,
  value,
  onChange,
}: {
  sectionKey: string
  value: unknown
  onChange: (v: unknown) => void
}) {
  const spec = SECTION_SPECS[sectionKey]
  if (!spec) return null
  const content = value ?? (sectionKey === 'testimonials' || sectionKey === 'marquee' || sectionKey === 'hero' || sectionKey === 'featured_collection' ? [] : {})
  return (
    <div className="space-y-5">
      <div className="text-[11px] font-sans text-muted pt-0.5">{spec.hint}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {spec.w.map((f, i) => (
          <div key={i} className={f.kind === 'group' ? 'sm:col-span-2' : f.kind === 'list' ? 'sm:col-span-2' : undefined}>
            <RenderWidget spec={f} content={content} onChange={onChange} replaces={[]} />
          </div>
        ))}
      </div>
      <div className="text-[10px] font-sans text-muted border-t border-[#DCC9A8]/40 pt-3">
        Changes save as a draft. Nothing reaches the storefront until you press “Publish to Live Store”.
      </div>
    </div>
  )
}