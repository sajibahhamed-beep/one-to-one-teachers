const fs = require('fs');
const content = fs.readFileSync('app/admin/page.tsx', 'utf8');

console.log('=== ADMIN DASHBOARD SECTION ANALYSIS ===');
const dashboardMatch = content.match(/activeTab\s*===\s*["']dashboard["'][\s\S]*?(?=activeTab\s*===)/);
if (dashboardMatch) {
  console.log('Dashboard block length:', dashboardMatch[0].length);
  // Let's write dashboard block to scratch for inspection
  fs.writeFileSync('scripts/scratch_dashboard.txt', dashboardMatch[0]);
  console.log('Written dashboard block to scripts/scratch_dashboard.txt');
} else {
  console.log('Could not isolate dashboard match with simple regex');
}

console.log('=== ADMIN BLOGS SECTION ANALYSIS ===');
const blogsMatch = content.match(/activeTab\s*===\s*["']blogs["'][\s\S]*?(?=activeTab\s*===)/);
if (blogsMatch) {
  console.log('Blogs block length:', blogsMatch[0].length);
  fs.writeFileSync('scripts/scratch_blogs.txt', blogsMatch[0]);
  console.log('Written blogs block to scripts/scratch_blogs.txt');
}
