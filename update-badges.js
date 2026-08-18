const fs = require('fs');
const file = 'js/premium-data.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/badge:\s*"(?:\d+\s+in\s+stock|Out\s+of\s+stock)"/gi, 'badge: "In stock"');

fs.writeFileSync(file, content, 'utf8');
console.log("All stock badges set to In stock.");
