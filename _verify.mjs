// Verifies migration 021 against the live DB. Creates real data, checks each
// claim, then cleans up.
import { createClient } from '@supabase/supabase-js'

const sb = createClient(process.env.SUPABASE_URL, process.env.SRV)
const addr = { name: 'Verify Bot', phone: '9999999999', email: 'verify@example.com', address: '1 Test Rd', city: 'Nagpur', pin: '440001' }

const { data: prod } = await sb.from('products').select('id, name, price').eq('is_published', true).limit(1)
const product = prod[0]
console.log('product:', product.name, '₹' + product.price)

// ── helper ────────────────────────────────────────────────────────────────
const mk = async () => {
  const { data, error } = await sb.rpc('create_pending_order', {
    p_address: addr, p_items: [{ product_id: product.id, quantity: 1 }],
    p_coupon: null, p_free_threshold: 0, p_flat_shipping: 0,
  })
  if (error) throw new Error(error.message)
  return data.order_id
}

// ── 1. duplicate retry reuses the same pending order ──────────────────────
const startStock = (await sb.from('product_variants').select('id, stock_quantity').eq('product_id', product.id)).data ?? []
const a = await mk()
const b = await mk()
console.log('\n[1] duplicate retry ->', a === b ? 'PASS (same order reused)' : `FAIL (${a} != ${b})`)

// ── 2. fulfill_order_stock on a pending order must refuse ─────────────────
const { error: e1 } = await sb.rpc('fulfill_order_stock', { p_order_id: a })
console.log('[2] stock on PENDING ->', e1 ? `PASS (refused: ${e1.message.slice(0, 40)})` : 'FAIL (allowed!)')

// ── 3. mark_order_paid applies once, idempotently ─────────────────────────
const PAY1 = 'pay_verify_' + Date.now()
const { data: stockBefore } = await sb.from('product_variants').select('stock_quantity').eq('product_id', product.id)
const totalBefore = (stockBefore ?? []).reduce((s, v) => s + v.stock_quantity, 0)

const { data: m1, error: m1e } = await sb.rpc('mark_order_paid', { p_order_id: a, p_payment_id: PAY1 })
const { data: m2, error: m2e } = await sb.rpc('mark_order_paid', { p_order_id: a, p_payment_id: PAY1 })
console.log('[3] first mark  ->', JSON.stringify(m1), m1e ? 'ERR: ' + m1e.message : '')
console.log('[3] second mark ->', JSON.stringify(m2), m2?.applied === false ? 'PASS (idempotent)' : 'FAIL (applied twice)', m2e ? 'ERR: ' + m2e.message : '')

const { data: stockAfter } = await sb.from('product_variants').select('stock_quantity').eq('product_id', product.id)
const totalAfter = (stockAfter ?? []).reduce((s, v) => s + v.stock_quantity, 0)
console.log('[3] stock', totalBefore, '->', totalAfter, totalBefore - totalAfter === 1 ? 'PASS (exactly 1 consumed)' : 'FAIL')

// ── 4. variant bug: did stock actually move, or raise? ────────────────────
console.log('[4] variant decrement ->', totalAfter < totalBefore ? 'PASS (no crash, stock moved)' : 'FAIL')

// ── 5. coupon consumed only on paid ───────────────────────────────────────
const code = 'VERIFY' + Date.now().toString().slice(-6)
const { error: insErr } = await sb.from('coupons').insert({
  code, discount_type: 'amount', value: 100, min_subtotal: 0,
  is_active: true, used_count: 0, max_uses: 100, expires_at: null,
})
if (insErr) { console.log('[5] coupon insert err:', insErr.message); process.exit(1) }
const { data: orderWithCoupon, error: ce } = await sb.rpc('create_pending_order', {
  p_address: addr, p_items: [{ product_id: product.id, quantity: 1 }],
  p_coupon: code, p_free_threshold: 0, p_flat_shipping: 0,
})
if (ce) { console.log('[5] coupon order err:', ce.message) }
const pendingId = orderWithCoupon?.order_id
const { data: c1 } = await sb.from('coupons').select('used_count').eq('code', code).single()
console.log('[5] used_count while PENDING ->', c1.used_count, c1.used_count === 0 ? 'PASS (not burned)' : 'FAIL')

await sb.rpc('mark_order_paid', { p_order_id: pendingId, p_payment_id: 'pay_verify_c_' + Date.now() })
const { data: c2 } = await sb.from('coupons').select('used_count').eq('code', code).single()
console.log('[5] used_count after  PAID   ->', c2.used_count, c2.used_count === 1 ? 'PASS (consumed once)' : 'FAIL')

// ── cleanup ───────────────────────────────────────────────────────────────
// Sweep by payment_reference prefix too: if an earlier run crashed before
// cleanup, its order must not be left holding a unique payment_reference.
const { data: leftovers } = await sb.from('orders').select('id').like('payment_reference', 'pay_verify_%')
for (const id of [a, pendingId, ...(leftovers ?? []).map((o) => o.id)]) {
  await sb.from('order_items').delete().eq('order_id', id)
  await sb.from('orders').delete().eq('id', id)
}
await sb.from('coupons').delete().eq('code', code)
// restore the stock the test consumed, back to the values captured before it ran
for (const v of startStock) {
  await sb.from('product_variants').update({ stock_quantity: v.stock_quantity }).eq('id', v.id)
}
console.log('\ncleanup done (orders deleted, coupon deleted, variant stock restored)')
