const MARQUEE_ITEMS: { en: string; bn?: string }[] = [
  { en: 'Benarasi', bn: 'বেনারসি' },
  { en: 'Tant', bn: 'তাঁত' },
  { en: 'Muslin', bn: 'মসলিন' },
  { en: 'Kantha', bn: 'কাঁথা' },
  { en: 'Free Shipping Above ₹10,000' },
  { en: 'Silk', bn: 'সিল্ক' },
  { en: 'Temple Jewellery', bn: 'মন্দির গহনা' },
  { en: 'Handwoven Heritage', bn: 'হস্তনির্মিত ঐতিহ্য' },
]

export default function Marquee({ items = MARQUEE_ITEMS }: { items?: { en: string; bn?: string }[] }) {
  const list = items.length ? items : MARQUEE_ITEMS
  const tripled = [...list, ...list, ...list]
  return (
    <div className="w-full h-[36px] md:h-[38px] bg-ivory md:bg-copper border-y border-[rgba(212,136,10,0.3)] overflow-hidden flex items-center">
      {/* Desktop: copper bg, ivory text. Mobile (md:hidden): ivory bg, copper+dark text */}
      <div className="marquee-track hidden md:flex gap-0">
        {tripled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 pl-2 whitespace-nowrap"
          >
            <span className="font-sans text-[11px] font-normal tracking-[0.18em] uppercase text-ivory">
              {item.en}
            </span>
            {item.bn && (
              <span className="font-bengali text-[13px] font-light text-[rgba(245,239,230,0.78)]">
                {item.bn}
              </span>
            )}
            <span className="text-[rgba(245,239,230,0.4)] text-sm pl-2">·</span>
          </span>
        ))}
      </div>

      {/* Mobile marquee */}
      <div className="marquee-track flex md:hidden gap-0">
        {tripled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 pl-4 whitespace-nowrap">
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-copper">
              {item.en}
            </span>
            {item.bn && (
              <span className="font-bengali text-[12px] font-light text-[rgba(28,10,6,0.75)]">
                {item.bn}
              </span>
            )}
            <span className="text-[rgba(140,106,85,0.5)] text-xs pl-1.5">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
