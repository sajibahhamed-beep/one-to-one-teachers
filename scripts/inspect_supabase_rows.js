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

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectRows() {
  const { data: blogs } = await supabase.from('blogs').select('*');
  console.log('=== BLOGS IN SUPABASE ===');
  console.log(JSON.stringify(blogs, null, 2));

  const { data: faqs } = await supabase.from('faqs').select('*');
  console.log('=== FAQS IN SUPABASE ===');
  console.log(JSON.stringify(faqs, null, 2));

  const { data: payments } = await supabase.from('payments').select('*');
  console.log('=== PAYMENTS IN SUPABASE ===');
  console.log(JSON.stringify(payments, null, 2));
}

inspectRows();
