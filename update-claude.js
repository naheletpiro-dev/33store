const fs = require('fs');

let content = fs.readFileSync('js/premium-data.js', 'utf8');

content = content.replace(/title:\s*"Claude Unlimited \[1 Day\]",\s*priceText:\s*"[^"]*"/, 'title: "Claude Unlimited [1 Day]", priceText: "ARS 5.359"');
content = content.replace(/title:\s*"Claude Unlimited \[7 Days\]",\s*priceText:\s*"[^"]*"/, 'title: "Claude Unlimited [7 Days]", priceText: "ARS 17.527"');
content = content.replace(/title:\s*"Claude Unlimited \[30 Days\]",\s*priceText:\s*"[^"]*"/, 'title: "Claude Unlimited [30 Days]", priceText: "ARS 39.663"');
content = content.replace(/title:\s*"Claude Unlimited \[6 Months\]",\s*priceText:\s*"[^"]*"/, 'title: "Claude Unlimited [6 Months]", priceText: "ARS 175.383"');
content = content.replace(/title:\s*"Claude Pro Account",\s*priceText:\s*"[^"]*"/, 'title: "Claude Unlimited [1 Year]", priceText: "ARS 326.313"');

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Claude subproducts updated.');
