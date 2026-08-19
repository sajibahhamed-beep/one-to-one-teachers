const fs = require('fs');

console.log('=== CHECKING data/db.json ===');
if (fs.existsSync('data/db.json')) {
  try {
    const dbJson = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
    console.log('Keys in db.json:', Object.keys(dbJson));
    console.log('enrollments count:', dbJson.enrollments?.length);
    console.log('pricingRequests count:', dbJson.pricingRequests?.length);
    console.log('contacts count:', dbJson.contacts?.length);
    console.log('teachers count:', dbJson.teachers?.length);
    console.log('faqs count:', dbJson.faqs?.length);
    console.log('teacherApplications count:', dbJson.teacherApplications?.length);
    console.log('inquiries count:', dbJson.inquiries?.length);
    console.log('payments count:', dbJson.payments?.length);
    console.log('pages count:', dbJson.pages?.length);
    console.log('blogs count:', dbJson.blogs?.length);
    if (dbJson.blogs) {
      console.log('Blog slugs in db.json:', dbJson.blogs.map(b => b.slug || b.id));
    }
  } catch (e) {
    console.error('Error reading db.json:', e);
  }
} else {
  console.log('data/db.json does NOT exist');
}

console.log('\n=== CHECKING app/api/blogs/route.ts ===');
if (fs.existsSync('app/api/blogs/route.ts')) {
  console.log(fs.readFileSync('app/api/blogs/route.ts', 'utf8'));
}

console.log('\n=== CHECKING app/blogs/page.tsx ===');
if (fs.existsSync('app/blogs/page.tsx')) {
  console.log(fs.readFileSync('app/blogs/page.tsx', 'utf8'));
}

console.log('\n=== CHECKING app/blogs/[id]/page.tsx ===');
if (fs.existsSync('app/blogs/[id]/page.tsx')) {
  console.log(fs.readFileSync('app/blogs/[id]/page.tsx', 'utf8'));
}
