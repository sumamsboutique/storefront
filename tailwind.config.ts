import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      dark: '#1C0A06',
      copper: '#BF5E18',
      ivory: '#F5EFE6',
      gold: '#D4880A',
      muted: '#8C6A55',
      cream: '#EDE3D6',
    },
    fontFamily: {
      display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      bengali: ['var(--font-bengali)', 'Hind Siliguri', 'sans-serif'],
    },
  },
}
export default config
