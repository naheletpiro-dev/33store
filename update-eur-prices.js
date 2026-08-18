const fs = require('fs');
const file = 'js/premium-data.js';
let content = fs.readFileSync(file, 'utf8');

// The Social Boost products are from ID 1231 to 1237.
// We need to change ARS 10,40 to ARS 18,00 and priceNum: 10.4 to priceNum: 18.0
// We also need to change ARS 52,00 to ARS 90,00 and priceNum: 52.0 to priceNum: 90.0 (for Youtube Subscribers)

// We can just globally replace the exact strings in the file since 10.4 and 52.0 were very specific to these.
// Wait, 10,40 might appear elsewhere? "ARS 10,40 c/u" is very specific. "ARS 10,40" is also specific.
// Let's replace:
content = content.replace(/ARS 10,40 c\/u/g, 'ARS 18,00 c/u');
content = content.replace(/ARS 10,40"/g, 'ARS 18,00"'); // for the product level priceText
content = content.replace(/"priceNum":\s*10\.4/g, '"priceNum": 18.0');

content = content.replace(/ARS 52,00 c\/u/g, 'ARS 90,00 c/u');
content = content.replace(/"priceNum":\s*52\.0/g, '"priceNum": 90.0');

fs.writeFileSync(file, content, 'utf8');
console.log("Updated Social Boost EUR prices to new 1800 ARS rate.");
