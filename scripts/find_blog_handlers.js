const fs = require('fs');
const content = fs.readFileSync('app/admin/page.tsx', 'utf8');

const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('fetchData') || l.includes('handleUpdateBlog') || l.includes('handleDeleteBlog') || l.includes('setShowAddBlog')) {
    console.log(`Line ${idx+1}: ${l.trim().substring(0, 100)}`);
  }
});
