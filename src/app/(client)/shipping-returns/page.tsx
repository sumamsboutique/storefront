import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { PageHeader } from '@/components/storefront/InfoPage'
import { SareeBorderDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export const metadata = {
  title: "Shipping & Returns | Sumam's Boutique",
  description: "Shipping, delivery, returns, and exchange policy for Sumam's Boutique.",
}

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <PageHeader eyebrow="Help & Policies" title="Shipping &" em="Returns" />
      <section className={cn(PAD, 'pb-16')}>
        <div className="mx-auto max-w-[900px] space-y-10">
          <section className="space-y-4">
            <h2 className="font-display text-[28px] md:text-[34px] font-light text-dark">Shipping Policy</h2>
            <div className="space-y-3 font-ui text-[15px] leading-[1.9] text-[rgba(28,10,6,0.85)]">
              <p><strong>Domestic Shipping (India):</strong> Free shipping on orders above ₹10,000. A nominal shipping fee applies to orders below ₹10,000 and is calculated at checkout.</p>
              <p><strong>Dispatch Time:</strong> Orders are dispatched within 1–2 business days after order confirmation.</p>
              <p><strong>Delivery Time:</strong> Domestic orders typically arrive within 5–7 business days from dispatch. Delivery timelines may vary due to location, weather, or courier delays.</p>
              <p><strong>International Shipping:</strong> We ship internationally to select countries. Shipping charges, customs duties, and import taxes (if applicable) are the responsibility of the customer and will be shown at checkout where available.</p>
              <p><strong>Tracking:</strong> Once your order is shipped, you will receive a tracking link via email and/or SMS. You can also track your order on the <a href="/track-order" className="text-copper underline">Track Order</a> page.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-[28px] md:text-[34px] font-light text-dark">Returns & Exchanges</h2>
            <div className="space-y-3 font-ui text-[15px] leading-[1.9] text-[rgba(28,10,6,0.85)]">
              <p><strong>Return Window:</strong> Standard orders can be returned or exchanged within 3 days of delivery.</p>
              <p><strong>Eligibility:</strong> Items must be unworn, unwashed, unused, in original condition with all tags, labels, and original packaging intact. Sarees must be returned with their blouse piece.</p>
              <p><strong>One-of-One & Limited Edition:</strong> One-of-one, limited edition, or custom pieces are subject to inspection before acceptance. Returns may not be accepted if the piece shows signs of use.</p>
              <p><strong>Sale Items:</strong> Sale items are eligible for exchange only, unless stated otherwise at the time of purchase.</p>
              <p><strong>Damaged/Wrong Item:</strong> If you receive a damaged or incorrect item, please contact us within 48 hours of delivery with photos at <a href="mailto:hello@sumamsboutique.com" className="text-copper underline">hello@sumamsboutique.com</a>. We will arrange a replacement or resolution at the earliest.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-[28px] md:text-[34px] font-light text-dark">How to Initiate a Return</h2>
            <div className="space-y-3 font-ui text-[15px] leading-[1.9] text-[rgba(28,10,6,0.85)]">
              <ol className="list-decimal pl-6 space-y-2">
                <li>Email us at <a href="mailto:hello@sumamsboutique.com" className="text-copper underline">hello@sumamsboutique.com</a> with your order ID, reason for return/exchange, and photos (if damaged).</li>
                <li>Our team will review your request and share return instructions and the return address.</li>
                <li>Pack the item securely in original packaging and ship it as per instructions.</li>
                <li>Once received and inspected, we will process your exchange or refund as applicable.</li>
              </ol>
              <p><strong>Note:</strong> Return shipping costs are borne by the customer unless the item is damaged or incorrect.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-[28px] md:text-[34px] font-light text-dark">Refunds</h2>
            <div className="space-y-3 font-ui text-[15px] leading-[1.9] text-[rgba(28,10,6,0.85)]">
              <p>Approved refunds will be processed to the original payment method. Please allow 7–10 business days for the amount to reflect in your account, depending on your bank/payment provider.</p>
            </div>
          </section>
        </div>
      </section>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
