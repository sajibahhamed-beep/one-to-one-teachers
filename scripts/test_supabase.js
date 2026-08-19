const fs = require('fs');

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

const { isSupabaseConfigured, supabase } = require('./lib/supabase');
console.log('isSupabaseConfigured:', isSupabaseConfigured());
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

async function testSupabase() {
  if (supabase) {
    try {
      const { data: blogs, error } = await supabase.from('blogs').select('*');
      console.log('Supabase blogs count:', blogs ? blogs.length : 'error/null', error ? error.message : '');
      const { data: enr } = await supabase.from('enrollments').select('*');
      console.log('Supabase enrollments count:', enr ? enr.length : 'null');
      const { data: tch } = await supabase.from('teachers').select('*');
      console.log('Supabase teachers count:', tch ? tch.length : 'null');
      const { data: faqs } = await supabase.from('faqs').select('*');
      console.log('Supabase faqs count:', faqs ? faqs.length : 'null');
    } catch (e) {
      console.error('Supabase query exception:', e.message);
    }
  }
}

testSupabase();
