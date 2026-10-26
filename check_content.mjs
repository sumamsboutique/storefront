import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
const env = readFileSync('.env.local','utf8');
const get = (k)=>{const m=env.match(new RegExp(k+'=(.*)')); return m?m[1].trim():'';};
const s = createClient(get('NEXT_PUBLIC_SUPABASE_URL'), get('SUPABASE_SERVICE_ROLE_KEY'));
const r = await s.from('published_content_blocks').select('*');
console.log(JSON.stringify(r.data, null, 2));
process.exit(0);
