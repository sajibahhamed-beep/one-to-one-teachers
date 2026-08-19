const fs = require('fs');
const path = require('path');

console.log('--- AUDITING CODEBASE FOR STATIC/FAKE DATA ---');

function searchFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchFiles(fullPath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = searchFiles('.');
console.log(`Total files to check: ${allFiles.length}`);

// Let's inspect components
const components = searchFiles('components');
console.log('\n--- COMPONENTS ---');
components.forEach(c => {
  const content = fs.readFileSync(c, 'utf8');
  console.log(`\nComponent: ${c}`);
  // Check for any fetch/API or props or hardcoded stats
  if (content.includes('BLOG_POSTS')) console.log('  -> references BLOG_POSTS');
  if (content.includes('/api/')) console.log('  -> calls API');
  if (content.match(/mock|dummy|fake|sample/i)) console.log('  -> contains mock/dummy/fake/sample keywords');
});

// Let's inspect app routes
const appFiles = searchFiles('app');
console.log('\n--- APP FILES ---');
appFiles.forEach(c => {
  const content = fs.readFileSync(c, 'utf8');
  if (content.includes('BLOG_POSTS')) console.log(`  -> ${c} references BLOG_POSTS`);
  if (content.match(/mock|dummy|fake|sample/i)) console.log(`  -> ${c} contains mock/dummy/fake/sample keywords`);
});
