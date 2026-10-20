// One-off: refresh every object in the `sarees` bucket from public/products/,
// rewrite product_images to point at the new files (one 4-photo set per
// product), and turn semi-tusser-bulien-work's placeholder variant into two
// design variants, each with its own gallery.
// Run: node --env-file=.env.local scripts/upload-product-images.mjs
// Idempotent: uploads use upsert, image/variant rows are rebuilt each run.
import { createClient } from '@supabase/supabase-js'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!URL_ || !KEY) {
  console.error('Missing env. Run: node --env-file=.env.local scripts/upload-product-images.mjs')
  process.exit(1)
}

const BUCKET = 'sarees'
const SRC = 'public/products'
const MAX_BYTES = 5 * 1024 * 1024 // bucket file_size_limit (5 MB)

// Source folder -> upload targets. `sub` files land in a sub-folder of the
// slug. Folder names are typo-heavy, so map by hand:
//  - 'Semi tusser bulien work-2' is the product's second design variant (v2).
//  - the ghicha folder is shared by both ghicha products (same as seed-sarees.mjs).
const FOLDERS = {
  'Assam silk': [{ slug: 'assam-silk' }],
  'Balu churi saree': [{ slug: 'balu-churi' }],
  'Bangalore silk Gujaratri stitch': [{ slug: 'bangalore-silk-gujarati' }],
  'Bangalore silk Katha': [{ slug: 'bangalore-silk-katha' }],
  'Cotton silk pashmina': [{ slug: 'cotton-silk-pashmina' }],
  'ghicha tusser mabhubani': [{ slug: 'ghicha-tusser-madhubani' }, { slug: 'madhubani-ghicha' }],
  'Jaal katan saree': [{ slug: 'jaal-katal' }],
  'Kalamkari saree': [{ slug: 'kalamkari' }],
  'Kardana jam dani': [{ slug: 'kardana-jamdani' }],
  'Muslite cotton saree': [{ slug: 'muslin-cotton' }],
  'Pashmina silk': [{ slug: 'pashmina-silk' }],
  'Patola silk': [{ slug: 'patola-silk' }],
  'Semi tussar parshi work': [{ slug: 'semi-tusser-pashi-work' }],
  'Semi tusser bulien work': [{ slug: 'semi-tusser-bulien-work', sub: 'v1' }],
  'Semi tusser bulien work-2': [{ slug: 'semi-tusser-bulien-work', sub: 'v2' }],
  'Tusser Katha saree': [{ slug: 'tusser-katha' }],
}

// Only bulien gets real variants; it previously had one placeholder row
// (Size/Standard, stock 10) — replaced with two designs keeping stock total 10.
const BULIEN = 'semi-tusser-bulien-work'
const BULIEN_VARIANTS = [
  { value: 'Design 1', sub: 'v1', stock: 5 },
  { value: 'Design 2', sub: 'v2', stock: 5 },
]

const mime = (file) => (file.endsWith('.png') ? 'image/png' : 'image/jpeg')
const altBase = (file) => file.replace(/\.[^.]+$/, '').replace(/^0\d_/, '').replace(/_/g, ' ')

async function main() {
  const supabase = createClient(URL_, KEY, { auth: { persistSession: false } })

  // 1. Read + validate the source tree.
  const uploads = [] // { dest, abs, slug, sub, file }
  const seenFolders = new Set()
  for (const entry of await readdir(SRC, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const targets = FOLDERS[entry.name]
    if (!targets) throw new Error(`unmapped folder in ${SRC}: ${entry.name}`)
    seenFolders.add(entry.name)
    const files = (await readdir(path.join(SRC, entry.name))).sort()
    for (const file of files) {
      const abs = path.join(SRC, entry.name, file)
      const { size } = await stat(abs)
      if (size > MAX_BYTES) throw new Error(`${entry.name}/${file} is ${size} bytes — bucket cap is ${MAX_BYTES}`)
      for (const t of targets) {
        uploads.push({ dest: `${t.slug}${t.sub ? `/${t.sub}` : ''}/${file}`, abs, slug: t.slug, sub: t.sub ?? '', file })
      }
    }
  }
  const missing = Object.keys(FOLDERS).filter((k) => !seenFolders.has(k))
  if (missing.length) throw new Error(`missing source folder(s): ${missing.join(', ')}`)

  // 2. Upload first, so no product ever points at a missing file.
  const keep = new Set()
  for (const u of uploads) {
    const buf = await readFile(u.abs)
    const { error } = await supabase.storage.from(BUCKET).upload(u.dest, buf, {
      contentType: mime(u.file),
      upsert: true,
    })
    if (error) throw new Error(`upload ${u.dest}: ${error.message}`)
    keep.add(u.dest)
    console.log(`↑ ${u.dest} (${(buf.length / 1048576).toFixed(1)} MB)`)
  }

  // 3. Bulien: replace the placeholder variant with the two real designs.
  const { data: bulien, error: bErr } = await supabase
    .from('products').select('id').eq('slug', BULIEN).single()
  if (bErr || !bulien) throw new Error(`product ${BULIEN}: ${bErr?.message ?? 'not found'}`)
  const { error: vDelErr } = await supabase.from('product_variants').delete().eq('product_id', bulien.id)
  if (vDelErr) throw new Error(`clear variants: ${vDelErr.message}`)
  const variantIds = {}
  for (const v of BULIEN_VARIANTS) {
    const { data: row, error } = await supabase
      .from('product_variants')
      .insert({ product_id: bulien.id, variant_type: 'Design', variant_value: v.value, stock_quantity: v.stock })
      .select('id').single()
    if (error) throw new Error(`variant ${v.value}: ${error.message}`)
    variantIds[v.sub] = row.id
  }

  // 4. Rewrite image rows: one set of 4 per product (bulien: 4 per variant).
  for (const slug of [...new Set(uploads.map((u) => u.slug))]) {
    const { data: prod, error: pErr } = await supabase
      .from('products').select('id, name').eq('slug', slug).single()
    if (pErr || !prod) throw new Error(`product ${slug}: ${pErr?.message ?? 'not found'}`)
    const { error: delErr } = await supabase.from('product_images').delete().eq('product_id', prod.id)
    if (delErr) throw new Error(`clear images ${slug}: ${delErr.message}`)

    const rows = uploads
      .filter((u) => u.slug === slug)
      .sort((a, b) => a.sub.localeCompare(b.sub) || a.file.localeCompare(b.file))
      .map((u, i) => ({
        product_id: prod.id,
        storage_path: `${URL_}/storage/v1/object/public/${BUCKET}/${u.dest}`,
        alt_text: `${prod.name} — ${altBase(u.file)}`,
        display_order: i,
        is_primary: i === 0,
        aspect_ratio: '3/4',
        ...(variantIds[u.sub] ? { variant_id: variantIds[u.sub] } : {}),
      }))
    const { error: insErr } = await supabase.from('product_images').insert(rows)
    if (insErr) throw new Error(`insert images ${slug}: ${insErr.message}`)
    console.log(`✓ ${slug}: ${rows.length} images`)
  }

  // 5. Everything else in the bucket is now dead — remove it.
  const { data: root } = await supabase.storage.from(BUCKET).list('', { limit: 1000 })
  let removed = 0
  for (const entry of root ?? []) {
    if (!entry.metadata) {
      const { data: kids } = await supabase.storage.from(BUCKET).list(entry.name, { limit: 1000 })
      const paths = (kids ?? []).map((k) => `${entry.name}/${k.name}`).filter((p) => !keep.has(p))
      if (paths.length) {
        const { error } = await supabase.storage.from(BUCKET).remove(paths)
        if (error) throw new Error(`remove: ${error.message}`)
        removed += paths.length
      }
    } else if (!keep.has(entry.name)) {
      const { error } = await supabase.storage.from(BUCKET).remove([entry.name])
      if (error) throw new Error(`remove: ${error.message}`)
      removed++
    }
  }

  // Self-check: a public bucket serves the image without auth.
  const res = await fetch(`${URL_}/storage/v1/object/public/${BUCKET}/${[...keep][0]}`, { method: 'HEAD' })
  if (!res.ok) console.warn(`! image fetch returned ${res.status} — the "${BUCKET}" bucket may be private`)

  console.log(`\nDone: ${keep.size} objects across ${new Set(uploads.map((u) => u.slug)).size} products, ${removed} old objects removed.`)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
