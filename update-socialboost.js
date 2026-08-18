const fs = require('fs');

let content = fs.readFileSync('js/premium-data.js', 'utf8');

// Update top-level YouTube Boost priceText to be a range
content = content.replace(/title: "YouTube Boost",\s*priceText: "[^"]*"/, 'title: "YouTube Boost", priceText: "ARS 23,40 - ARS 117,00"');

// Fix variant price texts
content = content.replace(/"priceText":"ARS 18,00 c\/u"/g, '"priceText":"ARS 23,40 c/u"');
content = content.replace(/"priceText":"ARS 90,00 c\/u"/g, '"priceText":"ARS 117,00 c/u"');

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Social Boost subproducts fixed.');
