const fs = require('fs');
const content = fs.readFileSync('app/admin/page.tsx', 'utf8');

const tabs = [
  "notifications",
  "dashboard",
  "enrollments",
  "teacher-applications",
  "teachers",
  "inquiries",
  "contacts",
  "payments",
  "blogs",
  "pages",
  "faqs",
  "settings",
  "seo"
];

tabs.forEach(t => {
  const re = new RegExp(`activeTab\\s*===\\s*["']${t}["'][\\s\\S]*?(?=activeTab\\s*===|$)`);
  const m = content.match(re);
  if (m) {
    console.log(`\n================= TAB: ${t} (${m[0].length} chars) =================`);
    const lines = m[0].split('\n').filter(l => l.includes('text-xl') || l.includes('admin-stat-num') || l.includes('font-mono font-black') || l.includes('Total') || l.includes('Sum') || l.includes('৳') || l.includes('$') || l.includes('Chart') || l.includes('Progress'));
    console.log(`Sample metric lines in tab ${t}:`, lines.slice(0, 10));
  }
});
