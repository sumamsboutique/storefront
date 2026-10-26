import { describe, expect, it } from 'vitest'
import { publishedContentMap } from './content-publishing'

describe('publishedContentMap', () => {
  it('serves the published snapshot while a newer draft exists', () => {
    expect(publishedContentMap([{
      section_key: 'hero',
      published_content: [{ title: 'Live title' }],
      content: [{ title: 'Unpublished draft' }],
    }])).toEqual({
      hero: [{ title: 'Live title' }],
    })
  })

  it('does not expose draft content when no published snapshot exists', () => {
    expect(publishedContentMap([{
      section_key: 'hero',
      published_content: null,
    }])).toEqual({})
  })
})
