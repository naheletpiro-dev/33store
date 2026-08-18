const fs = require('fs');
const file = 'js/premium-data.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/badge:\s*"In stock"/g, 'badge: "En stock"');

fs.writeFileSync(file, content, 'utf8');
console.log("All In stock badges set to En stock.");
