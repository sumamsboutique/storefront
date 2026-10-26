export type PublishedContentRow = {
  section_key: string
  published_content: unknown
  content?: unknown
}

/** Build the storefront map only from the explicitly published payload. */
export function publishedContentMap(rows: readonly PublishedContentRow[]): Record<string, unknown> {
  const content: Record<string, unknown> = {}
  for (const row of rows) {
    if (row.published_content !== null && row.published_content !== undefined) {
      content[row.section_key] = row.published_content
    }
  }
  return content
}
