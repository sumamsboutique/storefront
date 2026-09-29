import { describe, it, expect, vi, beforeEach } from 'vitest'

const SESSION_USER = { id: 'user-123', email: 'patron@ncleap.com' }

const state = {
  user: SESSION_USER as { id: string; email: string } | null,
  updates: [] as Record<string, unknown>[],
  eqIds: [] as string[],
  signInError: null as { message: string } | null,
  updateUserError: null as { message: string } | null,
  selectError: null as { message: string } | null,
  singleRow: { full_name: 'Aparna Sen', phone: '+91 98765 43210' },
  // storage
  uploads: [] as { path: string; type: string }[],
  uploadError: null as { message: string } | null,
  removed: [] as string[],
  storageRow: { avatar_url: null as string | null },
  // email
  profileEmailTaken: false as boolean,
  rpcError: null as { message: string } | null,
  rpcCalls: [] as string[],
  emailUpdates: [] as string[],
}

// Rows are keyed by the exact column list, so "read my avatar_url" and
// "is this email taken?" each get their own stub.
function rowFor(cols: string) {
  if (cols === 'avatar_url') return { data: state.storageRow, error: null }
  if (cols === 'id') return { data: state.profileEmailTaken ? { id: 'other' } : null, error: null }
  return { data: state.singleRow, error: state.selectError }
}

// One object serves every query shape: awaitable on its own (bare update),
// and chainable into select/single/maybeSingle.
function filter(cols: string) {
  return {
    maybeSingle: async () => rowFor(cols),
    single: async () => rowFor(cols),
    select: () => ({ single: async () => rowFor(cols), maybeSingle: async () => rowFor(cols) }),
    then: (res: (v: unknown) => unknown, rej: (e: unknown) => unknown) =>
      Promise.resolve({ error: state.selectError }).then(res, rej),
  }
}

vi.mock('./admin/auth', () => ({
  createAdminServerClient: async () => ({
    auth: {
      getUser: async () => ({ data: { user: state.user }, error: null }),
      signInWithPassword: async () => ({ error: state.signInError }),
      updateUser: async (p: { password?: string; email?: string }) => {
        if (p.email) state.emailUpdates.push(p.email)
        return { error: state.updateUserError }
      },
    },
    storage: {
      from: () => ({
        upload: async (path: string, _file: File, opts: { contentType: string }) => {
          state.uploads.push({ path, type: opts.contentType })
          return { error: state.uploadError }
        },
        getPublicUrl: (path: string) => ({ data: { publicUrl: `https://cdn.test/avatars/${path}` } }),
        remove: async (paths: string[]) => {
          state.removed.push(...paths)
          return { error: null }
        },
      }),
    },
    rpc: async (fn: string) => {
      state.rpcCalls.push(fn)
      return { error: state.rpcError }
    },
    from: () => ({
      select: (cols: string) => ({
        eq: (_c: string, v: string) => {
          state.eqIds.push(v)
          return filter(cols)
        },
      }),
      update: (values: Record<string, unknown>) => {
        state.updates.push(values)
        return {
          eq: (_c: string, v: string) => {
            state.eqIds.push(v)
            return filter('id, role, full_name, email, phone, avatar_url, created_at, updated_at')
          },
        }
      },
    }),
  }),
}))

const importActions = () => import('./account')

beforeEach(() => {
  state.user = SESSION_USER
  state.updates = []
  state.eqIds = []
  state.signInError = null
  state.updateUserError = null
  state.selectError = null
  state.singleRow = { full_name: 'Aparna Sen', phone: '+91 98765 43210' }
  state.uploads = []
  state.uploadError = null
  state.removed = []
  state.storageRow = { avatar_url: null }
  state.profileEmailTaken = false
  state.rpcError = null
  state.rpcCalls = []
  state.emailUpdates = []
})

describe('updateMyProfile', () => {
  it('rejects invalid input without querying the database', async () => {
    const { updateMyProfile } = await importActions()
    const res = await updateMyProfile({ fullName: 'A', phone: 'nope' })
    expect(res.ok).toBe(false)
    expect(state.updates).toHaveLength(0)
  })

  it('writes only the editable fields', async () => {
    const { updateMyProfile } = await importActions()
    const res = await updateMyProfile({ fullName: 'Aparna Sen', phone: '+91 98765 43210' })
    expect(res.ok).toBe(true)
    expect(state.updates).toEqual([{ full_name: 'Aparna Sen', phone: '+91 98765 43210' }])
  })

  // The privilege boundary: a role in the payload must not reach the update.
  it('never forwards a role field, even when the caller supplies one', async () => {
    const { updateMyProfile } = await importActions()
    await updateMyProfile({ fullName: 'Aparna Sen', phone: '+91 98765 43210', role: 'admin' })
    expect(Object.keys(state.updates[0])).toEqual(['full_name', 'phone'])
  })

  // Scope must come from the session, never from the payload, or one customer
  // could rewrite another customer's row.
  it('scopes the write to the signed-in user id, ignoring any id in the payload', async () => {
    const { updateMyProfile } = await importActions()
    await updateMyProfile({ id: 'someone-else', fullName: 'Aparna Sen', phone: '+91 98765 43210' })
    expect(state.eqIds).toEqual(['user-123'])
  })

  it('refuses when there is no session', async () => {
    const { updateMyProfile } = await importActions()
    state.user = null
    const res = await updateMyProfile({ fullName: 'Aparna Sen', phone: '+91 98765 43210' })
    expect(res).toEqual({ ok: false, error: 'Please sign in again.' })
    expect(state.updates).toHaveLength(0)
  })

  it('surfaces a database failure instead of throwing', async () => {
    const { updateMyProfile } = await importActions()
    state.selectError = { message: 'RLS denied' }
    const res = await updateMyProfile({ fullName: 'Aparna Sen', phone: '+91 98765 43210' })
    expect(res).toEqual({ ok: false, error: 'Could not save your details.' })
  })
})

describe('changeMyPassword', () => {
  const creds = { currentPassword: 'old-pass-123', newPassword: 'new-pass-456', confirmPassword: 'new-pass-456' }

  it('rejects a too-short new password before any auth call', async () => {
    const { changeMyPassword } = await importActions()
    const res = await changeMyPassword({ ...creds, newPassword: 'short', confirmPassword: 'short' })
    expect(res.ok).toBe(false)
  })

  // The re-auth gate: a stolen session cookie alone must not allow a takeover.
  it('refuses when the current password is wrong', async () => {
    const { changeMyPassword } = await importActions()
    state.signInError = { message: 'Invalid login credentials' }
    const res = await changeMyPassword(creds)
    expect(res).toEqual({ ok: false, error: 'Your current password is incorrect.' })
  })

  it('rotates the password once re-auth succeeds', async () => {
    const { changeMyPassword } = await importActions()
    const res = await changeMyPassword(creds)
    expect(res.ok).toBe(true)
  })

  it('refuses when there is no session', async () => {
    const { changeMyPassword } = await importActions()
    state.user = null
    expect(await changeMyPassword(creds)).toEqual({ ok: false, error: 'Please sign in again.' })
  })
})

const img = (type: string, size = 1024) => {
  const f = new File([new Uint8Array(size)], 'a', { type })
  Object.defineProperty(f, 'size', { value: size })
  return f
}

describe('uploadMyAvatar', () => {
  it('writes under the session user id and returns the public URL', async () => {
    const { uploadMyAvatar } = await importActions()
    const res = await uploadMyAvatar({ file: img('image/jpeg') })
    expect(res.ok).toBe(true)
    // The path is derived from the session, never from anything the caller sent.
    expect(state.uploads[0].path).toMatch(/^user-123\/avatar-[0-9a-f-]{36}\.jpg$/)
    if (res.ok) {
      expect(res.data.avatarUrl).toBe(
        `https://cdn.test/avatars/${state.uploads[0].path}`,
      )
      expect(state.updates).toContainEqual({ avatar_url: res.data.avatarUrl })
    }
  })

  it('uses a fresh path on every upload so a replaced photo is not served from cache', async () => {
    const { uploadMyAvatar } = await importActions()
    await uploadMyAvatar({ file: img('image/jpeg') })
    await uploadMyAvatar({ file: img('image/jpeg') })
    expect(new Set(state.uploads.map((u) => u.path)).size).toBe(2)
  })

  it('maps each accepted mime type to its own extension', async () => {
    const { uploadMyAvatar } = await importActions()
    await uploadMyAvatar({ file: img('image/png') })
    await uploadMyAvatar({ file: img('image/webp') })
    expect(state.uploads[0].path).toMatch(/\.png$/)
    expect(state.uploads[1].path).toMatch(/\.webp$/)
  })

  it('rejects a non-image before touching storage', async () => {
    const { uploadMyAvatar } = await importActions()
    const res = await uploadMyAvatar({ file: img('application/pdf') })
    expect(res).toEqual({ ok: false, error: 'Use a JPG, PNG or WebP image.' })
    expect(state.uploads).toHaveLength(0)
  })

  it('rejects a file over the bucket size limit', async () => {
    const { uploadMyAvatar } = await importActions()
    const res = await uploadMyAvatar({ file: img('image/jpeg', 3 * 1024 * 1024) })
    expect(res).toEqual({ ok: false, error: 'Image must be under 2 MB.' })
    expect(state.uploads).toHaveLength(0)
  })

  it('rejects an empty file', async () => {
    const { uploadMyAvatar } = await importActions()
    const res = await uploadMyAvatar({ file: img('image/jpeg', 0) })
    expect(res.ok).toBe(false)
  })

  it('refuses when there is no session', async () => {
    const { uploadMyAvatar } = await importActions()
    state.user = null
    expect(await uploadMyAvatar({ file: img('image/jpeg') })).toEqual({
      ok: false,
      error: 'Please sign in again.',
    })
    expect(state.uploads).toHaveLength(0)
  })

  it('reports a storage failure without pretending it saved', async () => {
    const { uploadMyAvatar } = await importActions()
    state.uploadError = { message: 'bucket not found' }
    const res = await uploadMyAvatar({ file: img('image/jpeg') })
    expect(res).toEqual({ ok: false, error: 'Could not upload that image.' })
    expect(state.updates).toHaveLength(0)
  })

  it('deletes the replaced file so the bucket does not accumulate orphans', async () => {
    const { uploadMyAvatar } = await importActions()
    state.storageRow = { avatar_url: 'https://cdn.test/avatars/user-123/old-avatar.png' }
    await uploadMyAvatar({ file: img('image/jpeg') })
    expect(state.removed).toEqual(['user-123/old-avatar.png'])
  })
})

describe('removeMyAvatar', () => {
  it('clears the column and removes the stored file', async () => {
    const { removeMyAvatar } = await importActions()
    state.storageRow = { avatar_url: 'https://cdn.test/avatars/user-123/avatar.png' }
    const res = await removeMyAvatar()
    expect(res.ok).toBe(true)
    expect(state.updates).toContainEqual({ avatar_url: null })
    expect(state.removed).toEqual(['user-123/avatar.png'])
  })

  it('is a no-op when there is no avatar', async () => {
    const { removeMyAvatar } = await importActions()
    state.storageRow = { avatar_url: null }
    expect((await removeMyAvatar()).ok).toBe(true)
    expect(state.removed).toHaveLength(0)
  })
})

describe('requestEmailChange', () => {
  const args = { currentPassword: 'old-pass-123', newEmail: 'new@patron.com' }

  it('rejects a malformed address before re-authenticating', async () => {
    const { requestEmailChange } = await importActions()
    const res = await requestEmailChange({ ...args, newEmail: 'not-an-email' })
    expect(res.ok).toBe(false)
    expect(state.emailUpdates).toHaveLength(0)
  })

  it('normalises case so the change request is idempotent', async () => {
    const { requestEmailChange } = await importActions()
    await requestEmailChange({ ...args, newEmail: '  New@Patron.COM ' })
    expect(state.emailUpdates).toEqual(['new@patron.com'])
  })

  it('refuses to request the address already in use', async () => {
    const { requestEmailChange } = await importActions()
    const res = await requestEmailChange({ ...args, newEmail: 'patron@ncleap.com' })
    expect(res).toEqual({ ok: false, error: 'That is already your email address.' })
    expect(state.emailUpdates).toHaveLength(0)
  })

  it('requires the current password', async () => {
    const { requestEmailChange } = await importActions()
    state.signInError = { message: 'Invalid login credentials' }
    const res = await requestEmailChange(args)
    expect(res).toEqual({ ok: false, error: 'Your current password is incorrect.' })
    expect(state.emailUpdates).toHaveLength(0)
  })

  it('refuses an address another profile already claims', async () => {
    const { requestEmailChange } = await importActions()
    state.profileEmailTaken = true
    const res = await requestEmailChange(args)
    expect(res).toEqual({ ok: false, error: 'That email is already in use.' })
    expect(state.emailUpdates).toHaveLength(0)
  })

  // Ordering matters: guest orders must be pinned to the user id before the
  // address flips, otherwise pre-signup history stops matching.
  it('claims guest orders before requesting the change', async () => {
    const { requestEmailChange } = await importActions()
    const res = await requestEmailChange(args)
    expect(res.ok).toBe(true)
    expect(state.rpcCalls).toEqual(['claim_guest_orders'])
    expect(state.emailUpdates).toEqual(['new@patron.com'])
  })

  it('does not start the change when the claim fails, or history is orphaned', async () => {
    const { requestEmailChange } = await importActions()
    state.rpcError = { message: 'function does not exist' }
    const res = await requestEmailChange(args)
    expect(res).toEqual({
      ok: false,
      error: 'Could not link your recent guest orders. Try again shortly.',
    })
    expect(state.emailUpdates).toHaveLength(0)
  })

  it('refuses when there is no session', async () => {
    const { requestEmailChange } = await importActions()
    state.user = null
    expect(await requestEmailChange(args)).toEqual({ ok: false, error: 'Please sign in again.' })
  })
})
