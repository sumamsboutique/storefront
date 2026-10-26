/** Require a deliberate, exact project confirmation before a script mutates Supabase. */
export function requireExplicitSupabaseMutationTarget(supabaseUrl, args, usage) {
  let projectRef
  try {
    const url = new URL(supabaseUrl)
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      projectRef = 'local'
    } else if (url.hostname.endsWith('.supabase.co')) {
      projectRef = url.hostname.slice(0, -'.supabase.co'.length)
    }
  } catch {
    // The safe failure below deliberately avoids printing the supplied URL.
  }

  const confirmIndex = args.indexOf('--confirm-project-ref')
  const confirmedRef = confirmIndex >= 0 ? args[confirmIndex + 1] : null
  if (!projectRef || !args.includes('--apply') || confirmedRef !== projectRef) {
    throw new Error(
      `Refusing Supabase mutation. Review the target, then run with --apply --confirm-project-ref <exact-project-ref>. Usage: ${usage}`
    )
  }

  return projectRef
}
