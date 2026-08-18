const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

// Discord Real Server Members [KEYS]
// Apply 25% discount to variants >= 2000
// Update top level priceText

// 2000 MEMBERS: 15093 * 0.75 = 11320
content = content.replace(/\{"name":"2000 MEMBERS","priceText":"ARS 15\.093","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 15093\}/g, 
  '{"name":"2000 MEMBERS","priceText":"ARS 11.320","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 11320}');

// 3000 MEMBERS: 22113 * 0.75 = 16585
content = content.replace(/\{"name":"3000 MEMBERS","priceText":"ARS 22\.113","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 22113\}/g, 
  '{"name":"3000 MEMBERS","priceText":"ARS 16.585","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 16585}');

// 4000 MEMBERS: 27963 * 0.75 = 20972
content = content.replace(/\{"name":"4000 MEMBERS","priceText":"ARS 27\.963","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 27963\}/g, 
  '{"name":"4000 MEMBERS","priceText":"ARS 20.972","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 20972}');

// 5000 MEMBERS: 33813 * 0.75 = 25360
content = content.replace(/\{"name":"5000 MEMBERS","priceText":"ARS 33\.813","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 33813\}/g, 
  '{"name":"5000 MEMBERS","priceText":"ARS 25.360","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 25360}');

// 6000 MEMBERS: 36621 * 0.75 = 27466
content = content.replace(/\{"name":"6000 MEMBERS","priceText":"ARS 36\.621","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 36621\}/g, 
  '{"name":"6000 MEMBERS","priceText":"ARS 27.466","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 27466}');

// 7000 MEMBERS: 42705 * 0.75 = 32029
content = content.replace(/\{"name":"7000 MEMBERS","priceText":"ARS 42\.705","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 42705\}/g, 
  '{"name":"7000 MEMBERS","priceText":"ARS 32.029","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 32029}');

// 8000 MEMBERS: 48321 * 0.75 = 36241
content = content.replace(/\{"name":"8000 MEMBERS","priceText":"ARS 48\.321","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 48321\}/g, 
  '{"name":"8000 MEMBERS","priceText":"ARS 36.241","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 36241}');

// 9000 MEMBERS: 54405 * 0.75 = 40804
content = content.replace(/\{"name":"9000 MEMBERS","priceText":"ARS 54\.405","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 54405\}/g, 
  '{"name":"9000 MEMBERS","priceText":"ARS 40.804","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 40804}');

// Top level update
content = content.replace(/title: "Discord Real Server Members \[KEYS\]", priceText: "ARS 4\.563 - ARS 54\.405"/g, 
  'title: "Discord Real Server Members [KEYS]", priceText: "ARS 4.563 - ARS 40.804"');

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Discord discount applied.');
