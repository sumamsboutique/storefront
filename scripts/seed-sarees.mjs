// One-off: seed the new saree products + their photos into Supabase.
// Run:  node --env-file=.env.local scripts/seed-sarees.mjs
// Idempotent: uploads use upsert, products upsert on slug, images are re-inserted.
import { createClient } from '@supabase/supabase-js'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
// shortcut: sharp is a transitive dep of Next (used for image optimisation). If
// it ever disappears, add it as an explicit dependency.
import sharp from 'sharp'

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!URL_ || !KEY) {
  console.error('Missing env. Run: node --env-file=.env.local scripts/seed-sarees.mjs')
  process.exit(1)
}

const CSV = 'C:/Users/adity/Downloads/saree_products_supabase.csv'
const IMG_ROOT = 'C:/Users/adity/Downloads/products'
const BUCKET = 'sarees'

// slug -> image folder(s) under IMG_ROOT. Folder names are messy typos, so map by hand.
// 'Fault/' is deliberately excluded (defect shots). madhubani-ghicha shares the one
// ghicha folder with ghicha-tusser-madhubani until real photos exist.
const FOLDERS = {
  'bangalore-silk-katha': ['Bangalore silk Katha'],
  'madhubani-ghicha': ['ghicha tusser mabhubani'],
  'ghicha-tusser-madhubani': ['ghicha tusser mabhubani'],
  'pashmina-silk': ['Pashmina silk'],
  'assam-silk': ['Assam silk'],
  'semi-tusser-bulien-work': ['Semi tusser bulien work', 'Semi tusser bulien work-2'],
  'tusser-katha': ['Tusser Katha saree'],
  'bangalore-silk-gujarati': ['Bangalore silk Gujaratri stitch'],
  'kalamkari': ['Kalamkari saree'],
  'jaal-katal': ['Jaal katan saree'],
  'kardana-jamdani': ['Kardana jam dani'],
  'cotton-silk-pashmina': ['Cotton silk pashmina'],
  'balu-churi': ['Balu churi saree'],
  'patola-silk': ['Patola silk'],
  'semi-tusser-pashi-work': ['Semi tussar parshi work'],
  'muslin-cotton': ['Muslite cotton saree'],
}

const ALT_ROLES = {
  '01': 'main product view',
  '02': 'saree on model',
  '03': 'fabric detail',
  '04': 'pallu and border',
}

// Minimal CSV parser: handles quoted fields containing commas/newlines.
function parseCsv(text) {
  const rows = []
  let row = [], field = '', quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else quoted = false
      } else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      if (row.some((f) => f !== '')) rows.push(row)
      row = []
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

// Product photos are 2-4MB; compress to webp so they fit the 2MB bucket cap and
// load fast. 1600px wide covers the largest PDP/large-card render.
async function compress(abs) {
  return sharp(await readFile(abs))
    .rotate()
    .resize({ width: 1600, height: 2133, fit: 'cover', position: 'center' })
    .webp({ quality: 82 })
    .toBuffer()
}

async function main() {
  const supabase = createClient(URL_, KEY, { auth: { persistSession: false } })

  const { data: buckets } = await supabase.storage.listBuckets()
  if (!buckets?.some((b) => b.id === BUCKET)) {
    console.error(`Bucket "${BUCKET}" not found — create it in the Supabase dashboard first.`)
    process.exit(1)
  }

  // Parent "Sarees" category: reuse whatever row owns the slug (002 seed or hand-made).
  await supabase
    .from('categories')
    .upsert({ name: 'Sarees', slug: 'sarees' }, { onConflict: 'slug', ignoreDuplicates: true })
  const { data: cat } = await supabase.from('categories').select('id').eq('slug', 'sarees').single()
  if (!cat) throw new Error('Could not resolve the Sarees category')
  const categoryId = cat.id

  const rows = parseCsv(await readFile(CSV, 'utf8'))
  const header = rows.shift()
  const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]))

  let productCount = 0
  let imageCount = 0
  let firstPublicPath = null

  for (const r of rows) {
    const name = r[idx.product_name].trim()
    const slug = r[idx.slug].trim()
    const folders = FOLDERS[slug]
    if (!folders) {
      console.warn(`! no image folder mapped for "${slug}" — skipped`)
      continue
    }

    // Collect photos in display order across the mapped folders.
    const files = []
    for (const folder of folders) {
      const dir = path.join(IMG_ROOT, folder)
      const names = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort()
      for (const f of names) files.push(path.join(dir, f))
    }

    const publicUrls = []
    // Clear the slug prefix first so re-runs leave no orphaned objects.
    const { data: existing } = await supabase.storage.from(BUCKET).list(slug)
    if (existing?.length) {
      await supabase.storage.from(BUCKET).remove(existing.map((o) => `${slug}/${o.name}`))
    }
    for (const abs of files) {
      const dest = `${slug}/${path.basename(abs).replace(/\.[^.]+$/, '.webp')}`
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(dest, await compress(abs), { contentType: 'image/webp', upsert: true })
      if (error) throw new Error(`upload ${dest}: ${error.message}`)
      publicUrls.push(`${URL_}/storage/v1/object/public/${BUCKET}/${dest}`)
      if (!firstPublicPath) firstPublicPath = dest
    }

    const { error: prodErr } = await supabase.from('products').upsert(
      {
        name,
        slug,
        category_id: categoryId,
        short_description: 'Handloom · Traditional',
        description: r[idx.description].trim(),
        fabric_weave_details: 'Traditional handloom weave',
        occasion_tags: ['Festive'],
        price: Number(r[idx.price_inr]),
        stock_status: 'in_stock',
        is_active: true,
        is_published: true,
      },
      { onConflict: 'slug' }
    )
    if (prodErr) throw new Error(`product ${slug}: ${prodErr.message}`)

    const { data: prod } = await supabase.from('products').select('id').eq('slug', slug).single()
    await supabase.from('product_images').delete().eq('product_id', prod.id)
    const imageRows = publicUrls.map((url, i) => {
      const role = ALT_ROLES[path.basename(url).slice(0, 2)] ?? 'product photo'
      return {
        product_id: prod.id,
        storage_path: url,
        alt_text: `${name} — ${role}`,
        display_order: i,
        is_primary: i === 0,
        aspect_ratio: '3/4',
      }
    })
    const { error: imgErr } = await supabase.from('product_images').insert(imageRows)
    if (imgErr) throw new Error(`images ${slug}: ${imgErr.message}`)

    productCount++
    imageCount += imageRows.length
    console.log(`✓ ${slug} (${imageRows.length} images)`)
  }

  // Self-check: a public bucket must serve the first upload without auth.
  if (firstPublicPath) {
    const res = await fetch(`${URL_}/storage/v1/object/public/${BUCKET}/${firstPublicPath}`, { method: 'HEAD' })
    if (!res.ok) console.warn(`! image fetch returned ${res.status} — the "${BUCKET}" bucket may be private (set it to Public in Storage settings)`)
  }
  console.log(`\nDone: ${productCount} products, ${imageCount} product images.`)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
