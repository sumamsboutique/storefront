// Homepage review cards show the purchased product separately from the
// reviewer's context (role/city). The CMS stores both in one `detail` string,
// e.g. "Bride, Kolkata · Chandrakala Benarasi" — product after the last "·".

export function splitReviewDetail(detail: string): { context: string; product: string } {
  const parts = detail.split('·').map((s) => s.trim()).filter(Boolean)
  if (!parts.length) return { context: '', product: '' }
  return { context: parts.slice(0, -1).join(' · '), product: parts[parts.length - 1] }
}
