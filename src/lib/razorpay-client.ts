export interface RazorpayCheckoutProps {
  keyId: string
  orderId: string // Razorpay order id
  amountPaise: number
  name: string
  prefill?: { name?: string; email?: string; contact?: string }
  onSuccess: (paymentId: string, signature: string) => void
  onFail: (message: string) => void
  onDismiss: () => void
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void
      on: (event: string, cb: (data: { error?: { description?: string } }) => void) => void
    }
  }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve()
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Could not load the payment gateway.'))
    document.head.appendChild(script)
  })
}

export async function openRazorpayCheckout(props: RazorpayCheckoutProps): Promise<void> {
  await loadRazorpayScript()
  const rzp = new window.Razorpay!({
    key: props.keyId,
    order_id: props.orderId,
    amount: props.amountPaise,
    currency: 'INR',
    name: props.name,
    prefill: props.prefill,
    theme: { color: '#BF5E18' },
    handler: (res: { razorpay_payment_id: string; razorpay_signature: string }) => {
      props.onSuccess(res.razorpay_payment_id, res.razorpay_signature)
    },
    modal: { ondismiss: () => props.onDismiss() },
  })
  rzp.on('payment.failed', (data) => props.onFail(data?.error?.description ?? 'Payment failed. Please try again.'))
  rzp.open()
}