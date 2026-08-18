const fs = require('fs');

// 1. UPDATE PREMIUM-DATA.JS
let dataContent = fs.readFileSync('js/premium-data.js', 'utf8');

dataContent = dataContent.replace(/\{"name":"2000 MEMBERS","priceText":"ARS 11\.320"/g, 
  '{"name":"2000 MEMBERS","priceText":"ARS 11.320", "originalPriceText":"ARS 15.093", "originalPriceNum": 15093, "discountBadge":"-25%"');

dataContent = dataContent.replace(/\{"name":"3000 MEMBERS","priceText":"ARS 16\.585"/g, 
  '{"name":"3000 MEMBERS","priceText":"ARS 16.585", "originalPriceText":"ARS 22.113", "originalPriceNum": 22113, "discountBadge":"-25%"');

dataContent = dataContent.replace(/\{"name":"4000 MEMBERS","priceText":"ARS 20\.972"/g, 
  '{"name":"4000 MEMBERS","priceText":"ARS 20.972", "originalPriceText":"ARS 27.963", "originalPriceNum": 27963, "discountBadge":"-25%"');

dataContent = dataContent.replace(/\{"name":"5000 MEMBERS","priceText":"ARS 25\.360"/g, 
  '{"name":"5000 MEMBERS","priceText":"ARS 25.360", "originalPriceText":"ARS 33.813", "originalPriceNum": 33813, "discountBadge":"-25%"');

dataContent = dataContent.replace(/\{"name":"6000 MEMBERS","priceText":"ARS 27\.466"/g, 
  '{"name":"6000 MEMBERS","priceText":"ARS 27.466", "originalPriceText":"ARS 36.621", "originalPriceNum": 36621, "discountBadge":"-25%"');

dataContent = dataContent.replace(/\{"name":"7000 MEMBERS","priceText":"ARS 32\.029"/g, 
  '{"name":"7000 MEMBERS","priceText":"ARS 32.029", "originalPriceText":"ARS 42.705", "originalPriceNum": 42705, "discountBadge":"-25%"');

dataContent = dataContent.replace(/\{"name":"8000 MEMBERS","priceText":"ARS 36\.241"/g, 
  '{"name":"8000 MEMBERS","priceText":"ARS 36.241", "originalPriceText":"ARS 48.321", "originalPriceNum": 48321, "discountBadge":"-25%"');

dataContent = dataContent.replace(/\{"name":"9000 MEMBERS","priceText":"ARS 40\.804"/g, 
  '{"name":"9000 MEMBERS","priceText":"ARS 40.804", "originalPriceText":"ARS 54.405", "originalPriceNum": 54405, "discountBadge":"-25%"');

fs.writeFileSync('js/premium-data.js', dataContent, 'utf8');

// 2. UPDATE PRODUCTO.JS
let prodContent = fs.readFileSync('js/producto.js', 'utf8');

// Update renderVariants
prodContent = prodContent.replace(
  /<div class="variant-name">\$\{v\.name\}<\/div>/,
  '`<div class="variant-name">${v.name} ${v.discountBadge ? `<span style="color:var(--color-success); font-weight:800; font-size:0.8em; margin-left:0.5rem">${v.discountBadge}</span>` : \'\'}</div>`'
);

// Wait, doing replace like this with backticks can be tricky.
// Better to replace the entire variant-box innerHTML assignment.
