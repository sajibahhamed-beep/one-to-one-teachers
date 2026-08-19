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

async function inspectSupabase() {
  const tables = [
    'enrollments',
    'pricing_requests',
    'contacts',
    'teachers',
    'faqs',
    'blogs',
    'settings',
    'teacher_applications',
    'inquiries',
    'payments',
    'pages'
  ];

  for (const t of tables) {
    try {
      const { data, error } = await supabase.from(t).select('*');
      if (error) {
        console.log(`Table ${t}: Error -> ${error.message}`);
      } else {
        console.log(`Table ${t}: ${data.length} rows`);
      }
    } catch (e) {
      console.log(`Table ${t}: Exception -> ${e.message}`);
    }
  }
}

inspectSupabase();
