export function IconSearch({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke={color} strokeWidth="1.25" strokeLinecap="round">
      <circle cx="7.5" cy="7.5" r="5" />
      <line x1="11.5" y1="11.5" x2="16" y2="16" />
    </svg>
  )
}

export function IconAccount({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke={color} strokeWidth="1.25" strokeLinecap="round">
      <circle cx="9" cy="6.5" r="3" />
      <path d="M2.5 17c0-3.5 2.9-6.5 6.5-6.5s6.5 3 6.5 6.5" />
    </svg>
  )
}

export function IconCart({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <path d="M1.5 1.5h2.3l2.2 9.2a1 1 0 00.97.8h7.5a1 1 0 00.97-.76L17 6H4.5" />
      <circle cx="7.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconMenu({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  )
}

export function HeartIcon({ filled, color = '#BF5E18', outline = '#F5EFE6' }: { filled?: boolean; color?: string; outline?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? color : 'none'} stroke={filled ? color : outline} strokeWidth="1.2">
      <path d="M7 12.5S1 8.5 1 4.8A3 3 0 017 2.9 3 3 0 0113 4.8C13 8.5 7 12.5 7 12.5z" />
    </svg>
  )
}

export function TrashIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <polyline points="2,4 14,4" />
      <polyline points="5,4 5,2 11,2 11,4" />
      <rect x="3" y="4" width="10" height="10" rx="1" />
    </svg>
  )
}

export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  )
}

export function YouTubeGlyph({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function InstagramCamera({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}
