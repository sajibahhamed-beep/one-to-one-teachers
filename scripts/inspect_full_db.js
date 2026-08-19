const fs = require('fs');

const dbData = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
console.log('=== DB.JSON CONTENTS ===');
for (const [key, val] of Object.entries(dbData)) {
  if (Array.isArray(val)) {
    console.log(`- ${key}: ${val.length} items`);
    if (val.length > 0 && val.length <= 5) {
      console.log(`  Sample IDs/titles:`, val.map(x => x.id || x.name || x.studentName || x.fullName || x.titleBn || x.slug));
    }
  } else if (typeof val === 'object' && val !== null) {
    console.log(`- ${key}: Object with keys ${Object.keys(val).join(', ')}`);
  } else {
    console.log(`- ${key}: ${val}`);
  }
}
