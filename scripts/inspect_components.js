const fs = require('fs');
const path = require('path');

const compDir = 'components';
const files = fs.readdirSync(compDir);

files.forEach(f => {
  if (!f.endsWith('.tsx')) return;
  const content = fs.readFileSync(path.join(compDir, f), 'utf8');
  console.log(`\n=== COMPONENT: ${f} (${content.length} bytes) ===`);
  
  // Check API calls
  const apiCalls = content.match(/\/api\/[\w\-]+/g);
  if (apiCalls) console.log('  API calls:', Array.from(new Set(apiCalls)));
  
  // Check useState / useEffect
  if (content.includes('useState') || content.includes('useEffect')) console.log('  Has client state/effects');
  
  // Check static arrays / objects that might represent platform data
  const constArrays = content.match(/const\s+\w+\s*=\s*\[/g);
  if (constArrays) console.log('  Const arrays:', constArrays);
});
