'use server'

import { z } from 'zod'
import { createAdminServerClient, type AdminProfile } from './admin/auth'
import { AddressSchema, AvatarSchema, EmailChangeSchema, PasswordSchema, ProfileSchema } from './schemas'

export type OrderLine = {
  product_id: string
  quantity: number
  unit_price: number
  name: string
}

export type CustomerOrder = {
  id: string
  status: string
  subtotal: number
  shipping_fee: number
  discount: number
  coupon_code: string | null
  total: number
  shipping_address: {
    name: string
    phone: string
    email: string
    address: string
    city: string
    pin: string
  }
  created_at: string
  items: OrderLine[]
}

export type SavedAddress = {
  id: string
  label: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  pin: string
}

export type ActionResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export async function getMyOrders(): Promise<ActionResult<CustomerOrder[]>> {
  const supabase = await createAdminServerClient()
  const { data, error } = await supabase.rpc('get_customer_orders')
  if (error) return { ok: false, error: 'Could not load your orders.' }
  return { ok: true, data: (data ?? []) as CustomerOrder[] }
}

export async function getSavedAddresses(): Promise<ActionResult<SavedAddress[]>> {
  const supabase = await createAdminServerClient()
  const { data, error } = await supabase
    .from('customer_addresses')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return { ok: false, error: 'Could not load your addresses.' }
  return { ok: true, data: (data ?? []) as SavedAddress[] }
}

const SaveAddressSchema = AddressSchema.extend({
  label: z.string().trim().min(1, 'Label is required').max(30).default('Home'),
})

export async function saveAddress(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = SaveAddressSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid address.' }
  }
  const supabase = await createAdminServerClient()
  const { data, error } = await supabase
    .from('customer_addresses')
    .insert({
      label: parsed.data.label,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      address: parsed.data.address,
      city: parsed.data.city,
      pin: parsed.data.pin,
    })
    .select('id')
    .single()
  if (error) return { ok: false, error: 'Could not save your address.' }
  return { ok: true, data: { id: data.id } }
}

const DeleteAddressSchema = z.object({ id: z.string().uuid() })

export async function deleteAddress(input: unknown): Promise<ActionResult<Record<string, never>>> {
  const parsed = DeleteAddressSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'Invalid address id.' }
  const supabase = await createAdminServerClient()
  const { error } = await supabase.from('customer_addresses').delete().eq('id', parsed.data.id)
  if (error) return { ok: false, error: 'Could not delete your address.' }
  return { ok: true, data: {} }
}

// ── Profile ──
// Schemas live in ./schemas: a 'use server' module may only export async functions.

// Matches the bucket limits in 016_profile_avatar_and_email.sql.
const AVATAR_BUCKET = 'avatars'
const AVATAR_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}
const AVATAR_MAX_BYTES = 2 * 1024 * 1024


export async function updateMyProfile(input: unknown): Promise<ActionResult<AdminProfile>> {
  const parsed = ProfileSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid details.' }
  }
  const supabase = await createAdminServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Please sign in again.' }

  const { data, error } = await supabase
    .from('profiles')
    .update({ full_name: parsed.data.fullName, phone: parsed.data.phone })
    .eq('id', user.id)
    .select('id, role, full_name, email, phone, avatar_url, created_at, updated_at')
    .single()
  if (error) return { ok: false, error: 'Could not save your details.' }
  return { ok: true, data: data as AdminProfile }
}

export async function changeMyPassword(input: unknown): Promise<ActionResult<Record<string, never>>> {
  const parsed = PasswordSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid password.' }
  }
  const supabase = await createAdminServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Please sign in again.' }

  // Re-authenticate before rotating. updateUser({ password }) alone would let
  // anyone holding a stolen session cookie lock the owner out permanently.
  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: parsed.data.currentPassword,
  })
  if (reauthError) return { ok: false, error: 'Your current password is incorrect.' }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.newPassword })
  if (error) return { ok: false, error: 'Could not update your password.' }
  return { ok: true, data: {} }
}

// ── Avatar ──
// The storage path is built from the session id, never from client input, so a
// crafted call cannot write into another customer's folder. The bucket RLS in
// 016 enforces the same rule independently.
export async function uploadMyAvatar(input: unknown): Promise<ActionResult<{ avatarUrl: string }>> {
  const parsed = AvatarSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'Choose an image to upload.' }
  const { file } = parsed.data

  const ext = AVATAR_MIME[file.type]
  if (!ext) return { ok: false, error: 'Use a JPG, PNG or WebP image.' }
  if (file.size > AVATAR_MAX_BYTES) return { ok: false, error: 'Image must be under 2 MB.' }

  const supabase = await createAdminServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Please sign in again.' }

  const { data: current } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', user.id)
    .maybeSingle()
  const previous = current?.avatar_url as string | null

  // Versioned filename, not a stable one: reusing `{id}/avatar.{ext}` would hand
  // the browser and the storage CDN a URL it has already cached, so a replaced
  // photo would keep rendering the old one. A uuid rather than Date.now(), which
  // collides for two uploads inside the same millisecond. The old file goes below.
  const path = `${user.id}/avatar-${crypto.randomUUID()}.${ext}`
  const { error: upErr } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: true })
  if (upErr) return { ok: false, error: 'Could not upload that image.' }

  const { data: pub } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path)
  if (!pub?.publicUrl) return { ok: false, error: 'Could not read the uploaded image.' }
  const avatarUrl = pub.publicUrl

  const { error } = await supabase.from('profiles').update({ avatar_url: avatarUrl }).eq('id', user.id)
  if (error) return { ok: false, error: 'Could not save your photo.' }

  // Best-effort cleanup of the replaced file; a leftover is harmless.
  if (previous && previous !== avatarUrl) {
    const oldPath = previous.split(`/${AVATAR_BUCKET}/`)[1]
    if (oldPath) void supabase.storage.from(AVATAR_BUCKET).remove([oldPath])
  }
  return { ok: true, data: { avatarUrl } }
}

export async function removeMyAvatar(): Promise<ActionResult<Record<string, never>>> {
  const supabase = await createAdminServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Please sign in again.' }

  const { data: current } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', user.id)
    .maybeSingle()
  const previous = current?.avatar_url as string | null

  const { error } = await supabase.from('profiles').update({ avatar_url: null }).eq('id', user.id)
  if (error) return { ok: false, error: 'Could not remove your photo.' }

  const oldPath = previous?.split(`/${AVATAR_BUCKET}/`)[1]
  if (oldPath) void supabase.storage.from(AVATAR_BUCKET).remove([oldPath])
  return { ok: true, data: {} }
}

// ── Email change ──
// Supabase only flips auth.users.email after the user clicks the confirmation
// link, so this action requests the change rather than applying it. Guest orders
// are claimed first: once user_id is set, history no longer depends on the
// shipping email still matching, so a later change cannot orphan it.
export async function requestEmailChange(input: unknown): Promise<ActionResult<Record<string, never>>> {
  const parsed = EmailChangeSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid email.' }
  }
  const supabase = await createAdminServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Please sign in again.' }
  if (parsed.data.newEmail === (user.email ?? '').toLowerCase()) {
    return { ok: false, error: 'That is already your email address.' }
  }

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: parsed.data.currentPassword,
  })
  if (reauthError) return { ok: false, error: 'Your current password is incorrect.' }

  // Someone else already owns this address: refuse rather than sending a
  // confirmation link that would hint at which accounts exist.
  const { data: taken } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', parsed.data.newEmail)
    .maybeSingle()
  if (taken) return { ok: false, error: 'That email is already in use.' }

  // Fail closed: if the claim did not run, the pending email change would leave
  // guest orders matched only on the old address, which is exactly the orphaning
  // this ordering exists to prevent.
  const { error: claimError } = await supabase.rpc('claim_guest_orders')
  if (claimError) {
    return { ok: false, error: 'Could not link your recent guest orders. Try again shortly.' }
  }

  const { error } = await supabase.auth.updateUser({ email: parsed.data.newEmail })
  if (error) return { ok: false, error: 'Could not start the email change. Try again shortly.' }
  return { ok: true, data: {} }
}

const SubmitReviewSchema = z.object({
  productId: z.string().uuid('Invalid product.'),
  rating: z.number().int().min(1, 'Choose 1–5 stars.').max(5),
  comment: z.string().trim().max(1000, 'Review must be under 1000 characters.'),
})

export type ReviewResult = ActionResult<Record<string, never>>

export async function submitReview(input: unknown): Promise<ReviewResult> {
  const parsed = SubmitReviewSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid review.' }
  const supabase = await createAdminServerClient()
  const { data, error } = await supabase.rpc('submit_product_review', {
    p_product_id: parsed.data.productId,
    p_rating: parsed.data.rating,
    p_comment: parsed.data.comment,
  })
  if (error) return { ok: false, error: 'Could not submit your review.' }
  const res = data as { ok: boolean; error?: string }
  if (!res.ok) return { ok: false, error: res.error ?? 'Could not submit your review.' }
  return { ok: true, data: {} }
}