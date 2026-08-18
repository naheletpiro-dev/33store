const fs = require('fs');

let content = fs.readFileSync('js/premium-data.js', 'utf8');

// Manual fixes
content = content.replace(/title: "Apple Music",\s*priceText: "[^"]*"/, 'title: "Apple Music", priceText: "ARS 1.350"');
content = content.replace(/title: "Microsoft Codes",\s*priceText: "[^"]*"/, 'title: "Microsoft Codes", priceText: "ARS 666"');
content = content.replace(/title: "Telepizza",\s*priceText: "[^"]*"/, 'title: "Telepizza", priceText: "ARS 450 - ARS 1.710"');

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Manual updates complete.');
