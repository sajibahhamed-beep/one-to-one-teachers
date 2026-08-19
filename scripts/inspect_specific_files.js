const fs = require('fs');

const files = [
  'components/StudentTeacherSection.tsx',
  'components/ImpactSection.tsx',
  'components/SuccessStories.tsx',
  'app/ssc-online-tuition/SscClient.tsx',
  'app/hsc-online-tuition/page.tsx',
  'app/female-online-tutors/page.tsx',
  'app/about/page.tsx',
  'app/become-teacher/page.tsx',
  'app/contact/page.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    console.log(`\n=== FILE: ${f} (${c.length} bytes) ===`);
    const lines = c.split('\n');
    console.log(`Total lines: ${lines.length}`);
    const apiCalls = c.match(/\/api\/[\w\-]+/g);
    if (apiCalls) console.log('  API calls:', Array.from(new Set(apiCalls)));
  }
});
