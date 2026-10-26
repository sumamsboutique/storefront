// One-off: refresh mapped saree photos and their product image rows. The Bulien
// product's two stock-bearing design variants must already exist in admin.
// Run only after review: node --env-file=.env.local scripts/upload-product-images.mjs --apply --confirm-project-ref <project-ref>
// Uploads use upsert. Variant IDs are preserved, and old bucket objects are not pruned.
import { createClient } from '@supabase/supabase-js'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { requireExplicitSupabaseMutationTarget } from './require-explicit-supabase-target.mjs'

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!URL_ || !KEY) {
  console.error('Missing environment. Configure the Supabase URL and service-role key first.')
  process.exit(1)
}
try {
  requireExplicitSupabaseMutationTarget(URL_, process.argv.slice(2), 'upload-product-images.mjs --apply --confirm-project-ref <project-ref>')
} catch (err) {
  console.error(err.message)
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

// The product must already have these variants configured. This script only
// associates galleries; it never deletes/recreates stock-bearing variant rows.
const BULIEN = 'semi-tusser-bulien-work'
const BULIEN_VARIANTS = [
  { value: 'Design 1', sub: 'v1' },
  { value: 'Design 2', sub: 'v2' },
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
    const files = (await readdir(path.join(SRC, entry.name)))
      .filter((file) => /\.(png|jpe?g)$/i.test(file))
      .sort()
    if (!files.length) throw new Error(`no supported image files in ${entry.name}`)
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

  const { data: bulien, error: bErr } = await supabase
    .from('products').select('id').eq('slug', BULIEN).single()
  if (bErr || !bulien) throw new Error(`product ${BULIEN}: ${bErr?.message ?? 'not found'}`)
  const { data: existingVariants, error: variantReadError } = await supabase
    .from('product_variants')
    .select('id, variant_type, variant_value')
    .eq('product_id', bulien.id)
  if (variantReadError || !existingVariants) throw new Error(`variants ${BULIEN}: ${variantReadError?.message ?? 'not found'}`)
  const variantIds = {}
  for (const variant of BULIEN_VARIANTS) {
    const row = existingVariants.find((candidate) =>
      candidate.variant_type === 'Design' && candidate.variant_value === variant.value
    )
    if (!row) throw new Error(`Configure the ${variant.value} variant for ${BULIEN} in admin before refreshing its images.`)
    variantIds[variant.sub] = row.id
  }

  // 2. Upload first, so no product ever points at a missing file.
  for (const u of uploads) {
    const buf = await readFile(u.abs)
    const { error } = await supabase.storage.from(BUCKET).upload(u.dest, buf, {
      contentType: mime(u.file),
      upsert: true,
    })
    if (error) throw new Error(`upload ${u.dest}: ${error.message}`)
    console.log(`↑ ${u.dest} (${(buf.length / 1048576).toFixed(1)} MB)`)
  }

  // 4. Rewrite image rows: one set of 4 per product (bulien: 4 per variant).
  for (const slug of [...new Set(uploads.map((u) => u.slug))]) {
    const { data: prod, error: pErr } = await supabase
      .from('products').select('id, name').eq('slug', slug).single()
    if (pErr || !prod) throw new Error(`product ${slug}: ${pErr?.message ?? 'not found'}`)
    const { data: oldImages, error: oldImagesError } = await supabase
      .from('product_images').select('id').eq('product_id', prod.id)
    if (oldImagesError || !oldImages) throw new Error(`read images ${slug}: ${oldImagesError?.message ?? 'failed'}`)

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
    const { data: insertedImages, error: insErr } = await supabase.from('product_images').insert(rows).select('id')
    if (insErr) throw new Error(`insert images ${slug}: ${insErr.message}`)
    if (!insertedImages || insertedImages.length !== rows.length) {
      throw new Error(`image rows ${slug}: expected ${rows.length}, inserted ${insertedImages?.length ?? 0}`)
    }
    if (oldImages.length) {
      const { error: delErr } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', prod.id)
        .in('id', oldImages.map((image) => image.id))
      if (delErr) throw new Error(`remove previous image rows ${slug}: ${delErr.message}`)
    }
    console.log(`✓ ${slug}: ${rows.length} images`)
  }

  // Self-check: a public bucket serves the image without auth.
  const firstDest = uploads[0]?.dest
  if (!firstDest) throw new Error('No image uploads were prepared.')
  const res = await fetch(`${URL_}/storage/v1/object/public/${BUCKET}/${firstDest}`, { method: 'HEAD' })
  if (!res.ok) console.warn(`! image fetch returned ${res.status} — the "${BUCKET}" bucket may be private`)

  console.log(`\nDone: ${new Set(uploads.map((u) => u.dest)).size} objects across ${new Set(uploads.map((u) => u.slug)).size} products. Previous unlinked bucket objects were preserved.`)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
