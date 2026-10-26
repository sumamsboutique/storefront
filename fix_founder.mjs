import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
const env = readFileSync('.env.local','utf8');
const get = (k)=>{const m=env.match(new RegExp(k+'=(.*)')); return m?m[1].trim():'';};
const url = get('NEXT_PUBLIC_SUPABASE_URL');
const s = createClient(url, get('SUPABASE_SERVICE_ROLE_KEY'));
const base = `${url}/storage/v1/object/public/avatars`;
const { data } = await s.from('published_content_blocks').select('published_content').eq('section_key','our_heritage').single();
const cur = data?.published_content || {};
const updated = { ...cur, image: cur.image || `${base}/founder_portrait.webp` };
const { error } = await s.from('published_content_blocks').update({ published_content: updated }).eq('section_key','our_heritage');
if (error) { console.error('ERR',error); process.exit(1); }
console.log('ok');
process.exit(0);
