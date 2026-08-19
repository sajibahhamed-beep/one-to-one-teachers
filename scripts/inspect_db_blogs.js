const fs = require('fs');

const dbData = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
console.log('=== DB.JSON BLOGS ===');
dbData.blogs.forEach((b, idx) => {
  console.log(`\nBlog #${idx + 1}:`);
  console.log(`  ID: ${b.id}`);
  console.log(`  Slug: ${b.slug}`);
  console.log(`  Title (BN): ${b.titleBn || b.title_bn}`);
  console.log(`  Title (EN): ${b.titleEn || b.title_en}`);
  console.log(`  Category: ${b.category}`);
  console.log(`  Has intro: ${Boolean(b.introBn || b.intro_bn)}`);
  console.log(`  Sections count: ${Array.isArray(b.sectionsBn || b.sections_bn) ? (b.sectionsBn || b.sections_bn).length : 0}`);
  console.log(`  Key takeaways count: ${Array.isArray(b.keyTakeawaysBn || b.key_takeaways_bn) ? (b.keyTakeawaysBn || b.key_takeaways_bn).length : 0}`);
});
