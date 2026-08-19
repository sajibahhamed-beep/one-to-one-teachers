const fs = require('fs');
const content = fs.readFileSync('app/admin/page.tsx', 'utf8');

const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.match(/function\s+\w+|const\s+\w+\s*=\s*\(/) || l.includes('export default')) {
    console.log(`Line ${idx + 1}: ${l.slice(0, 100).trim()}`);
  }
});
