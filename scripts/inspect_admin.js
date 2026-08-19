const fs = require('fs');
const path = require('path');

function inspectFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=== File: ${filePath} (${content.length} bytes) ===`);
  
  // Find tabs
  const tabMatches = content.match(/activeTab\s*===?\s*["']([^"']+)["']/g);
  if (tabMatches) {
    console.log('Tabs matched:', Array.from(new Set(tabMatches)));
  }
}

inspectFile('app/admin/page.tsx');
