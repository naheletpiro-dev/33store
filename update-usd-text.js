const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

// Replace "$3.25 USD" with "$3.60 USD" globally
content = content.replace(/\$3\.25 USD/g, '$3.60 USD');

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Replaced $3.25 USD with $3.60 USD');
