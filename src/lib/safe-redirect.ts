/** Return only a same-origin path suitable for a post-authentication redirect. */
export function safeLocalRedirectPath(value: string | null | undefined, fallback = '/account'): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return fallback
  }
  if (/[\u0000-\u001f\u007f]/.test(value)) return fallback

  try {
    const parsed = new URL(value, 'https://sumams-local.invalid')
    if (parsed.origin !== 'https://sumams-local.invalid') return fallback
    return `${parsed.pathname}${parsed.search}${parsed.hash}`
  } catch {
    return fallback
  }
}
