import { createAdminServerClient } from './auth'

export type AuditActionType =
  | 'create'
  | 'update'
  | 'delete'
  | 'publish'
  | 'unpublish'
  | 'status_change'
  | 'role_change'
  | 'settings_update'

export type AuditLogParams = {
  tableName: string
  recordId: string
  action: AuditActionType
  userId?: string | null
  diff?: Record<string, unknown> | null
}

export async function logAudit({
  tableName,
  recordId,
  action,
  userId,
  diff,
}: AuditLogParams): Promise<void> {
  try {
    const supabase = await createAdminServerClient()
    
    // Clean sensitive keys if any
    const safeDiff = diff ? sanitizeDiff(diff) : null

    await supabase.from('audit_log').insert({
      table_name: tableName,
      record_id: recordId,
      action,
      changed_by: userId || null,
      diff: safeDiff,
    })
  } catch (err) {
    // Audit log should never crash the main operation, but print to server logs
    console.error('[audit_log] failed to record audit entry:', err)
  }
}

function sanitizeDiff(diff: Record<string, unknown>): Record<string, unknown> {
  const SENSITIVE_KEYS = ['password', 'token', 'secret', 'key', 'auth']
  const clean: Record<string, unknown> = {}

  for (const [k, v] of Object.entries(diff)) {
    if (SENSITIVE_KEYS.some((s) => k.toLowerCase().includes(s))) {
      clean[k] = '[REDACTED]'
    } else if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      clean[k] = sanitizeDiff(v as Record<string, unknown>)
    } else {
      clean[k] = v
    }
  }

  return clean
}
