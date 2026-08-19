const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === '.next' || f === '.git' || f === 'scripts') continue;
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      
      // Check if it renders blogs or calls api/blogs
      if (content.includes('blogs') || content.includes('BlogPost') || content.includes('BLOG_POSTS')) {
        console.log(`[BLOG USAGE] ${full}`);
      }

      // Check for hardcoded stats / numbers
      const matches = content.match(/\b(mock\w+|dummy\w+|fake\w+|sample\w+|demo\w+)\b/gi);
      if (matches) {
        console.log(`[MOCK/FAKE MATCH] ${full}:`, Array.from(new Set(matches)));
      }
    }
  }
}

console.log('--- SCANNING CODEBASE ---');
scanDir('.');
