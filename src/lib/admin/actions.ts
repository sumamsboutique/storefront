'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  requireAdminOrStaff,
  requireAdmin,
  createAdminServerClient,
} from './auth'
import {
  ProductFormSchema,
  CategoryFormSchema,
  SaveContentBlockSchema,
  UpdateOrderStatusSchema,
  UpdateUserRoleSchema,
  StoreSettingsSchema,
  CouponFormSchema,
  isValidOrderTransition,
  type OrderStatus,
} from './schemas'
import { logAudit } from './audit'

export type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

// ── Auth Actions ─────────────────────────────────────────────────────────────
export async function adminLoginAction(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please enter both email and password.' }
  }

  const supabase = await createAdminServerClient()
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (authError || !authData.user) {
    return { error: authError?.message || 'Invalid credentials.' }
  }

  // Verify role is admin or staff
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .maybeSingle()

  if (profileError || !profile || (profile.role !== 'admin' && profile.role !== 'staff')) {
    await supabase.auth.signOut()
    return { error: 'Access restricted. You do not have admin or staff permissions.' }
  }

  redirect('/admin')
}

export async function adminLogoutAction() {
  const supabase = await createAdminServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// ── Product Actions ──────────────────────────────────────────────────────────
export async function saveProduct(
  id: string | null,
  rawPayload: unknown
): Promise<ActionResult<{ id: string }>> {
  const session = await requireAdminOrStaff()
  const parsed = ProductFormSchema.safeParse(rawPayload)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  const { images, variants, ...productData } = parsed.data
  const supabase = await createAdminServerClient()

  try {
    let productId = id

    if (productId) {
      // Update existing
      const { error: prodErr } = await supabase
        .from('products')
        .update({
          ...productData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', productId)

      if (prodErr) return { success: false, error: prodErr.message }

      await logAudit({
        tableName: 'products',
        recordId: productId,
        action: 'update',
        userId: session.user.id,
        diff: productData as Record<string, unknown>,
      })
    } else {
      // Create new
      const { data: newProd, error: prodErr } = await supabase
        .from('products')
        .insert(productData)
        .select('id')
        .single()

      if (prodErr || !newProd) return { success: false, error: prodErr?.message || 'Failed to create product' }
      productId = newProd.id

      await logAudit({
        tableName: 'products',
        recordId: newProd.id,
        action: 'create',
        userId: session.user.id,
        diff: productData as Record<string, unknown>,
      })
    }

    if (!productId) return { success: false, error: 'Product ID resolution failed' }

    // Sync Images
    if (images && images.length >= 0) {
      // Delete old images not in incoming list
      const incomingIds = images.map((i) => i.id).filter(Boolean) as string[]
      if (incomingIds.length > 0) {
        await supabase
          .from('product_images')
          .delete()
          .eq('product_id', productId)
          .not('id', 'in', `(${incomingIds.join(',')})`)
      } else {
        await supabase.from('product_images').delete().eq('product_id', productId)
      }

      // Upsert current images
      for (const [idx, img] of images.entries()) {
        if (img.id) {
          await supabase
            .from('product_images')
            .update({
              storage_path: img.storage_path,
              alt_text: img.alt_text,
              display_order: idx,
              is_primary: img.is_primary,
              aspect_ratio: img.aspect_ratio || '3/4',
            })
            .eq('id', img.id)
        } else {
          await supabase.from('product_images').insert({
            product_id: productId,
            storage_path: img.storage_path,
            alt_text: img.alt_text,
            display_order: idx,
            is_primary: img.is_primary,
            aspect_ratio: img.aspect_ratio || '3/4',
          })
        }
      }
    }

    // Sync Variants
    if (variants && variants.length >= 0) {
      const incomingVarIds = variants.map((v) => v.id).filter(Boolean) as string[]
      if (incomingVarIds.length > 0) {
        await supabase
          .from('product_variants')
          .delete()
          .eq('product_id', productId)
          .not('id', 'in', `(${incomingVarIds.join(',')})`)
      } else {
        await supabase.from('product_variants').delete().eq('product_id', productId)
      }

      for (const v of variants) {
        if (v.id) {
          await supabase
            .from('product_variants')
            .update({
              variant_type: v.variant_type,
              variant_value: v.variant_value,
              stock_quantity: v.stock_quantity,
              price_override: v.price_override ?? null,
            })
            .eq('id', v.id)
        } else {
          await supabase.from('product_variants').insert({
            product_id: productId,
            variant_type: v.variant_type,
            variant_value: v.variant_value,
            stock_quantity: v.stock_quantity,
            price_override: v.price_override ?? null,
          })
        }
      }
    }

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${productId}`)
    revalidatePath('/')
    revalidatePath('/sarees')
    revalidatePath('/jewellery')
    revalidatePath(`/products/${productData.slug}`)

    return { success: true, data: { id: productId } }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Operation failed' }
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const session = await requireAdmin()
  const supabase = await createAdminServerClient()

  try {
    // Check if product is in any order_items
    const { count } = await supabase
      .from('order_items')
      .select('id', { count: 'exact', head: true })
      .eq('product_id', id)

    if (count && count > 0) {
      return {
        success: false,
        error: `Cannot delete this product because it is referenced in ${count} existing order(s). You may deactivate or unpublish it instead.`,
      }
    }

    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) return { success: false, error: error.message }

    await logAudit({
      tableName: 'products',
      recordId: id,
      action: 'delete',
      userId: session.user.id,
    })

    revalidatePath('/admin/products')
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Failed to delete' }
  }
}

export async function bulkUpdateProducts(
  ids: string[],
  action: 'publish' | 'unpublish' | 'activate' | 'deactivate'
): Promise<ActionResult> {
  const session = await requireAdminOrStaff()
  const supabase = await createAdminServerClient()

  try {
    const updateObj: Record<string, boolean> = {}
    if (action === 'publish') updateObj.is_published = true
    if (action === 'unpublish') updateObj.is_published = false
    if (action === 'activate') updateObj.is_active = true
    if (action === 'deactivate') updateObj.is_active = false

    const { error } = await supabase
      .from('products')
      .update(updateObj)
      .in('id', ids)

    if (error) return { success: false, error: error.message }

    for (const pid of ids) {
      await logAudit({
        tableName: 'products',
        recordId: pid,
        action: 'update',
        userId: session.user.id,
        diff: { bulkAction: action },
      })
    }

    revalidatePath('/admin/products')
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Bulk operation failed' }
  }
}

// ── Category Actions ─────────────────────────────────────────────────────────
export async function saveCategory(
  id: string | null,
  rawPayload: unknown
): Promise<ActionResult<{ id: string }>> {
  const session = await requireAdminOrStaff()
  const parsed = CategoryFormSchema.safeParse(rawPayload)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  const data = parsed.data
  const supabase = await createAdminServerClient()

  // Prevent parent self-nesting
  if (id && data.parent_id === id) {
    return { success: false, error: 'A category cannot be its own parent.' }
  }

  try {
    let categoryId = id
    if (categoryId) {
      const { error } = await supabase
        .from('categories')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', categoryId)

      if (error) return { success: false, error: error.message }

      await logAudit({
        tableName: 'categories',
        recordId: categoryId,
        action: 'update',
        userId: session.user.id,
        diff: data as Record<string, unknown>,
      })
    } else {
      const { data: newCat, error } = await supabase
        .from('categories')
        .insert(data)
        .select('id')
        .single()

      if (error || !newCat) return { success: false, error: error?.message || 'Failed to create' }
      categoryId = newCat.id

      await logAudit({
        tableName: 'categories',
        recordId: newCat.id,
        action: 'create',
        userId: session.user.id,
        diff: data as Record<string, unknown>,
      })
    }

    if (!categoryId) return { success: false, error: 'Category ID resolution failed' }

    revalidatePath('/admin/categories')
    revalidatePath('/admin/products')
    revalidatePath('/')
    return { success: true, data: { id: categoryId } }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Failed to save category' }
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const session = await requireAdmin()
  const supabase = await createAdminServerClient()

  try {
    // Check if products are linked
    const { count: prodCount } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', id)

    if (prodCount && prodCount > 0) {
      return {
        success: false,
        error: `Cannot delete: ${prodCount} product(s) are assigned to this category. Reassign or delete those products first.`,
      }
    }

    // Check if subcategories are linked
    const { count: childCount } = await supabase
      .from('categories')
      .select('id', { count: 'exact', head: true })
      .eq('parent_id', id)

    if (childCount && childCount > 0) {
      return {
        success: false,
        error: `Cannot delete: This category has ${childCount} subcategory(ies). Reassign or delete them first.`,
      }
    }

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) return { success: false, error: error.message }

    await logAudit({
      tableName: 'categories',
      recordId: id,
      action: 'delete',
      userId: session.user.id,
    })

    revalidatePath('/admin/categories')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Failed to delete' }
  }
}

export async function reorderCategories(orderedIds: string[]): Promise<ActionResult> {
  await requireAdminOrStaff()
  const supabase = await createAdminServerClient()

  try {
    for (const [idx, id] of orderedIds.entries()) {
      await supabase
        .from('categories')
        .update({ display_order: idx })
        .eq('id', id)
    }

    revalidatePath('/admin/categories')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Failed to reorder' }
  }
}

// ── Content Blocks (Homepage CMS) ────────────────────────────────────────────
export async function saveContentBlock(rawPayload: unknown): Promise<ActionResult> {
  const session = await requireAdminOrStaff()
  const parsed = SaveContentBlockSchema.safeParse(rawPayload)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  const { section_key, content, publishNow } = parsed.data
  const supabase = await createAdminServerClient()

  try {
    const updateObj: Record<string, unknown> = {
      content,
      updated_at: new Date().toISOString(),
    }

    if (publishNow) {
      updateObj.published_content = content
      updateObj.is_published = true
    }

    // Upsert by section_key
    const { data: existing } = await supabase
      .from('content_blocks')
      .select('id')
      .eq('section_key', section_key)
      .maybeSingle()

    let recordId: string
    if (existing) {
      recordId = existing.id
      const { error } = await supabase
        .from('content_blocks')
        .update(updateObj)
        .eq('id', recordId)

      if (error) return { success: false, error: error.message }
    } else {
      const { data: inserted, error } = await supabase
        .from('content_blocks')
        .insert({
          section_key,
          ...updateObj,
        })
        .select('id')
        .single()

      if (error || !inserted) return { success: false, error: error?.message || 'Failed to save block' }
      recordId = inserted.id
    }

    await logAudit({
      tableName: 'content_blocks',
      recordId,
      action: publishNow ? 'publish' : 'update',
      userId: session.user.id,
      diff: { section_key, publishNow },
    })

    revalidatePath('/admin/content')
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Failed to save content block' }
  }
}

// ── Orders ───────────────────────────────────────────────────────────────────
export async function updateOrderStatus(rawPayload: unknown): Promise<ActionResult> {
  const session = await requireAdminOrStaff()
  const parsed = UpdateOrderStatusSchema.safeParse(rawPayload)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  const { order_id, status, staff_notes } = parsed.data
  const supabase = await createAdminServerClient()

  try {
    const { data: currentOrder, error: fetchErr } = await supabase
      .from('orders')
      .select('status, staff_notes')
      .eq('id', order_id)
      .single()

    if (fetchErr || !currentOrder) {
      return { success: false, error: 'Order not found' }
    }

    const currentStatus = currentOrder.status as OrderStatus
    if (!isValidOrderTransition(currentStatus, status)) {
      return {
        success: false,
        error: `Invalid transition from "${currentStatus}" to "${status}".`,
      }
    }

    const updateData: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    }

    if (staff_notes !== undefined) {
      updateData.staff_notes = staff_notes
    }

    const { error: updateErr } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', order_id)

    if (updateErr) return { success: false, error: updateErr.message }

    await logAudit({
      tableName: 'orders',
      recordId: order_id,
      action: 'status_change',
      userId: session.user.id,
      diff: { from: currentStatus, to: status, staff_notes },
    })

    revalidatePath('/admin/orders')
    revalidatePath(`/admin/orders/${order_id}`)
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Status update failed' }
  }
}

// ── Subscribers ──────────────────────────────────────────────────────────────
export async function removeSubscriber(id: string): Promise<ActionResult> {
  const session = await requireAdminOrStaff()
  const supabase = await createAdminServerClient()
  try {
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    await logAudit({
      tableName: 'newsletter_subscribers',
      recordId: id,
      action: 'delete',
      userId: session.user.id,
    })
    revalidatePath('/admin/subscribers')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Delete failed' }
  }
}

// ── Coupons ──────────────────────────────────────────────────────────────────
export async function saveCoupon(rawPayload: unknown): Promise<ActionResult> {
  const session = await requireAdminOrStaff()
  const parsed = CouponFormSchema.safeParse(rawPayload)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }
  const supabase = await createAdminServerClient()
  try {
    const { code, ...data } = parsed.data
    const { data: row, error } = await supabase
      .from('coupons')
      .insert({
        code: code.toUpperCase(),
        expires_at: parsed.data.expires_at ?? null,
        ...data,
      })
      .select('id')
      .single()
    if (error || !row) return { success: false, error: error?.message || 'Create failed' }
    await logAudit({
      tableName: 'coupons',
      recordId: row.id,
      action: 'create',
      userId: session.user.id,
      diff: { code: code.toUpperCase() },
    })
    revalidatePath('/admin/coupons')
    return { success: true, data: { id: row.id } }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Save failed' }
  }
}

export async function toggleCoupon(id: string, isActive: boolean): Promise<ActionResult> {
  const session = await requireAdminOrStaff()
  const supabase = await createAdminServerClient()
  try {
    const { error } = await supabase
      .from('coupons')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return { success: false, error: error.message }
    await logAudit({
      tableName: 'coupons',
      recordId: id,
      action: 'update',
      userId: session.user.id,
      diff: { is_active: isActive },
    })
    revalidatePath('/admin/coupons')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Update failed' }
  }
}

export async function deleteCoupon(id: string): Promise<ActionResult> {
  const session = await requireAdminOrStaff()
  const supabase = await createAdminServerClient()
  try {
    const { error } = await supabase.from('coupons').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    await logAudit({
      tableName: 'coupons',
      recordId: id,
      action: 'delete',
      userId: session.user.id,
    })
    revalidatePath('/admin/coupons')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Delete failed' }
  }
}

// ── Customer / User Role ─────────────────────────────────────────────────────
export async function updateUserRole(rawPayload: unknown): Promise<ActionResult> {
  const session = await requireAdmin() // strictly admin-only
  const parsed = UpdateUserRoleSchema.safeParse(rawPayload)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  const { user_id, role } = parsed.data
  const supabase = await createAdminServerClient()

  // Prevent self-demotion
  if (user_id === session.user.id && role !== 'admin') {
    return { success: false, error: 'You cannot remove your own admin privileges.' }
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role, updated_at: new Date().toISOString() })
      .eq('id', user_id)

    if (error) return { success: false, error: error.message }

    await logAudit({
      tableName: 'profiles',
      recordId: user_id,
      action: 'role_change',
      userId: session.user.id,
      diff: { new_role: role },
    })

    revalidatePath('/admin/customers')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Role update failed' }
  }
}

// ── Store Settings ───────────────────────────────────────────────────────────
export async function saveStoreSettings(rawPayload: unknown): Promise<ActionResult> {
  const session = await requireAdminOrStaff()
  const parsed = StoreSettingsSchema.safeParse(rawPayload)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  const supabase = await createAdminServerClient()
  const data = parsed.data

  try {
    const entries = [
      { key: 'general', value: data.general },
      { key: 'commerce', value: data.commerce },
      { key: 'social', value: data.social },
      { key: 'notifications', value: data.notifications },
    ]

    for (const item of entries) {
      await supabase.from('store_settings').upsert({
        key: item.key,
        value: item.value,
        updated_at: new Date().toISOString(),
        updated_by: session.user.id,
      })
    }

    await logAudit({
      tableName: 'store_settings',
      recordId: 'all',
      action: 'settings_update',
      userId: session.user.id,
      diff: data as unknown as Record<string, unknown>,
    })

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Failed to save settings' }
  }
}
