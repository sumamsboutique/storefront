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

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const NIL_UUID = '00000000-0000-0000-0000-000000000000'

export async function logAudit({
  tableName,
  recordId,
  action,
  userId,
  diff,
}: AuditLogParams): Promise<void> {
  try {
    const supabase = await createAdminServerClient()
    
    const isUuid = UUID_RE.test(recordId)
    const isUserUuid = Boolean(userId && UUID_RE.test(userId))

    // Clean sensitive keys if any
    const baseDiff = diff ? sanitizeDiff(diff) : null
    const safeDiff = isUuid
      ? baseDiff
      : { ...(baseDiff ?? {}), record_key: recordId }

    await supabase.from('audit_log').insert({
      table_name: tableName,
      record_id: isUuid ? recordId : NIL_UUID,
      action,
      changed_by: isUserUuid ? userId : null,
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
