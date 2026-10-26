import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
const env = readFileSync('.env.local','utf8');
const get = (k)=>{const m=env.match(new RegExp(k+'=(.*)')); return m?m[1].trim():'';};
const url = get('NEXT_PUBLIC_SUPABASE_URL');
const s = createClient(url, get('SUPABASE_SERVICE_ROLE_KEY'));

const base = `${url}/storage/v1/object/public/banners`;
const hero = [
  {
    id: 1,
    gradient: 'linear-gradient(155deg, #2A0D06, #6B2E0E 50%, #BF5E18)',
    image: `${base}/spring-edit.jpeg`,
    imageMobile: `${base}/spring-edit-mob.jpeg`,
    eyebrow: 'SILK SAREES · রেশম শাড়ি',
    bengali: 'রেশমের ঐতিহ্য',
    parts: ['Pure Silk, Woven in ', { italic: true, copper: true, text: 'Bengal' }],
    subtitle: 'Mulberry silks and Bangalore weaves, festive-ready.',
    cta: 'SHOP SILK SAREES',
    href: '/sarees/silk-sarees',
  },
  {
    id: 2,
    gradient: 'linear-gradient(155deg, #2A1408, #6B4A1E 55%, #A07038)',
    image: `${base}/banarasi-saree.jpeg`,
    imageMobile: `${base}/banarasi-saree-mob.jpeg`,
    eyebrow: 'TUSSAR & GHICHA · তসর ও ঘিচা',
    bengali: 'সোনালি তসর',
    parts: ['The Golden ', { italic: true, copper: true, text: 'Tussar' }, ' Weave'],
    subtitle: 'Handloom tussar and ghicha, straight from the loom.',
    cta: 'SHOP TUSSAR & GHICHA',
    href: '/sarees/tussar-ghicha-sarees',
  },
  {
    id: 3,
    gradient: 'linear-gradient(155deg, #1A1C14, #3E4432 55%, #6E7455)',
    image: `${base}/tant-saree.jpeg`,
    imageMobile: `${base}/tant-saree-mob.jpeg`,
    eyebrow: 'COTTON & BLENDED · সুতি ও মিশ্র',
    bengali: 'মাটির ছোঁয়া সুতি',
    parts: ['Everyday Cotton, Woven ', { italic: true, copper: true, text: 'Light' }],
    subtitle: 'Breathable cotton and blends for the daily drape.',
    cta: 'SHOP COTTON SAREES',
    href: '/sarees/cotton-blended-sarees',
  },
  {
    id: 4,
    gradient: 'linear-gradient(155deg, #1C0A06, #4A2010 55%, #8C6A55)',
    image: `${base}/temple-jewellery.jpeg`,
    imageMobile: `${base}/temple-jewellery-mob.jpeg`,
    eyebrow: 'TRADITIONAL WEAVES · ঐতিহ্যবাহী বুনন',
    bengali: 'নকশার ঐতিহ্য',
    parts: ['Special Designs in ', { italic: true, copper: true, text: 'Handloom' }],
    subtitle: 'Jamdani, Katal and heirloom weaves worth passing down.',
    cta: 'EXPLORE TRADITIONAL WEAVES',
    href: '/sarees/traditional-weaves-special-designs',
  },
];

const { error } = await s.from('published_content_blocks')
  .update({ published_content: hero })
  .eq('section_key', 'hero');

if (error) { console.error('ERR', error); process.exit(1); }
console.log('updated hero');
process.exit(0);
