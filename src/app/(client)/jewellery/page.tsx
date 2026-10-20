import { redirect } from 'next/navigation'

// Jewellery range is deferred; old links land on the saree collection instead of a 404.
export default function Jewellery() {
  redirect('/sarees')
}
