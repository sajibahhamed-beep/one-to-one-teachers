const fs = require('fs');
const content = fs.readFileSync('app/admin/page.tsx', 'utf8');

// Find all modals/forms in admin page
const modalMatches = content.match(/showAdd\w+|editing\w+|isEditing\w+/g);
console.log('Modal state variables:', Array.from(new Set(modalMatches)));

// Check how blog creation and edit work
console.log('\n--- Checking Blog Add / Edit Form in Admin ---');
const blogFormMatch = content.match(/handleSaveBlog|handleUpdateBlog|handleSubmitBlog|handleAddBlog/g);
console.log('Blog handler names:', Array.from(new Set(blogFormMatch || [])));
