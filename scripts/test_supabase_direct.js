const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

function loadEnv(file) {
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    for (const l of lines) {
      const match = l.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const val = match[2].trim().replace(/^["'](.*)["']$/, '$1');
        process.env[key] = val;
      }
    }
  }
}

loadEnv('.env.local');
loadEnv('.env');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  "";

console.log('supabaseUrl:', supabaseUrl);
console.log('has supabaseKey:', Boolean(supabaseKey));

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function test() {
  if (supabase) {
    try {
      const { data: blogs, error } = await supabase.from('blogs').select('*');
      console.log('Supabase blogs count:', blogs ? blogs.length : 'null', error ? error.message : '');
      if (blogs && blogs.length > 0) {
        console.log('Blogs in Supabase:', blogs.map(b => b.slug || b.id));
      }
    } catch (e) {
      console.error(e);
    }
  }
}

test();
