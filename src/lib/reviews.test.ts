import { describe, it, expect } from 'vitest'
import { splitReviewDetail } from './reviews'

describe('splitReviewDetail', () => {
  it('takes the product after the last separator', () => {
    expect(splitReviewDetail('Bride, Kolkata · Chandrakala Benarasi')).toEqual({
      context: 'Bride, Kolkata',
      product: 'Chandrakala Benarasi',
    })
  })

  it('joins multiple context segments', () => {
    expect(splitReviewDetail('Patron · Bengaluru · Shantiniketan Tant')).toEqual({
      context: 'Patron · Bengaluru',
      product: 'Shantiniketan Tant',
    })
  })

  it('treats a lone value as the product', () => {
    expect(splitReviewDetail('Shantiniketan Tant')).toEqual({ context: '', product: 'Shantiniketan Tant' })
  })

  it('handles empty and whitespace-only input', () => {
    expect(splitReviewDetail('')).toEqual({ context: '', product: '' })
    expect(splitReviewDetail('   ·  ')).toEqual({ context: '', product: '' })
  })
})
