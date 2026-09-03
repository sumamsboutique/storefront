import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      dark: '#1C0A06',
      copper: '#BF5E18',
      ivory: '#F5EFE6',
      gold: '#D4880A',
      muted: '#8C6A55',
      cream: '#EDE3D6',
      whatsapp: '#25D366',
    },
    fontFamily: {
      display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      bengali: ['var(--font-hind)', 'Hind', 'sans-serif'],
      bengali2: ['var(--font-hind-siliguri)', 'Hind Siliguri', 'sans-serif'],
    },
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
