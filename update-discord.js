const fs = require('fs');

let content = fs.readFileSync('js/premium-data.js', 'utf8');

// Discord Real Server Members [KEYS]: ARS 4.563 - ARS 54.405
content = content.replace(/title:\s*"Discord Real Server Members \[KEYS\]",\s*priceText:\s*"[^"]*"/, 'title: "Discord Real Server Members [KEYS]", priceText: "ARS 4.563 - ARS 54.405"');

// Nitro Promocode [3 Months]: ARS 2.083
content = content.replace(/title:\s*"Nitro Promocode \[3 Months\]",\s*priceText:\s*"[^"]*"/, 'title: "Nitro Promocode [3 Months]", priceText: "ARS 2.083"');

// Nitro Tokens: ARS 2.925 - ARS 4.680
content = content.replace(/title:\s*"Nitro Tokens",\s*priceText:\s*"[^"]*"/, 'title: "Nitro Tokens", priceText: "ARS 2.925 - ARS 4.680"');

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Discord subproducts prices updated.');
