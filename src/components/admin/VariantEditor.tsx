'use client'

import React from 'react'

export type VariantItem = {
  id?: string
  variant_type: string
  variant_value: string
  stock_quantity: number
  price_override?: number | null
}

export function VariantEditor({
  variants,
  onChange,
}: {
  variants: VariantItem[]
  onChange: (variants: VariantItem[]) => void
}) {
  const handleAdd = () => {
    const newVariant: VariantItem = {
      variant_type: 'Option',
      variant_value: 'Standard',
      stock_quantity: 1,
      price_override: null,
    }
    onChange([...variants, newVariant])
  }

  const handleRemove = (index: number) => {
    onChange(variants.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: keyof VariantItem, value: unknown) => {
    const updated = [...variants]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      {variants.length === 0 ? (
        <div className="p-4 text-center border border-dashed border-[#DCC9A8]/60 bg-ivory/30">
          <p className="text-xs font-sans text-muted">
            No variants created. Add variants if this product has size, blouse piece, or color options.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-[#DCC9A8]/60">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-cream/60 border-b border-[#DCC9A8]/50 text-muted uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-3 py-2">Variant Type</th>
                <th className="px-3 py-2">Value</th>
                <th className="px-3 py-2">Stock Qty</th>
                <th className="px-3 py-2">Price Override (₹)</th>
                <th className="px-3 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCC9A8]/40 bg-white">
              {variants.map((v, idx) => (
                <tr key={idx} className="hover:bg-ivory/20">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={v.variant_type}
                      onChange={(e) => handleChange(idx, 'variant_type', e.target.value)}
                      placeholder="e.g. Blouse Piece"
                      className="w-full px-2 py-1 border border-[#DCC9A8]/60 text-xs text-dark focus:outline-none focus:border-copper"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={v.variant_value}
                      onChange={(e) => handleChange(idx, 'variant_value', e.target.value)}
                      placeholder="e.g. Unstitched"
                      className="w-full px-2 py-1 border border-[#DCC9A8]/60 text-xs text-dark focus:outline-none focus:border-copper"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      value={v.stock_quantity}
                      onChange={(e) =>
                        handleChange(idx, 'stock_quantity', parseInt(e.target.value) || 0)
                      }
                      className="w-24 px-2 py-1 border border-[#DCC9A8]/60 text-xs text-dark focus:outline-none focus:border-copper"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      value={v.price_override ?? ''}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          'price_override',
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                      placeholder="Optional"
                      className="w-28 px-2 py-1 border border-[#DCC9A8]/60 text-xs text-dark focus:outline-none focus:border-copper"
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="text-xs text-[#A62719] hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 text-xs font-sans font-medium uppercase tracking-wider border border-dark text-dark hover:bg-dark hover:text-ivory transition-colors"
        >
          + Add Variant Option
        </button>
      </div>
    </div>
  )
}
