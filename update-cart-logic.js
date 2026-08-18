const fs = require('fs');
let content = fs.readFileSync('js/cartManager.js', 'utf8');

// Remove the 0.75 discount block in addItem
content = content.replace(/\s*\/\/\s*Regla de negocio de 33store\s*if\s*\(quantity\s*>=\s*1000\)\s*\{\s*finalPrice\s*=\s*finalPrice\s*\*\s*0\.75;\s*\}/g, '');

// Remove the 0.75 discount block inside the existing check
content = content.replace(/\s*if\s*\(existing\.quantity\s*>=\s*1000\)\s*\{\s*existing\.price\s*=\s*existing\.price\s*\*\s*0\.75;\s*\/\/\s*Simplificacin\s*\}/g, '');
content = content.replace(/\s*if\s*\(existing\.quantity\s*>=\s*1000\)\s*\{\s*existing\.price\s*=\s*existing\.price\s*\*\s*0\.75;\s*\/\/\s*Simplificaci.n\s*\}/g, '');

// Just in case it has slightly different formatting:
content = content.replace(/if\s*\(quantity\s*>=\s*1000\)\s*\{\s*finalPrice\s*=\s*finalPrice\s*\*\s*0\.75;\s*\}/g, '');
content = content.replace(/if\s*\(existing\.quantity\s*>=\s*1000\)\s*\{\s*existing\.price\s*=\s*existing\.price\s*\*\s*0\.75;[^}]*\}/g, '');


fs.writeFileSync('js/cartManager.js', content, 'utf8');
console.log('Discount logic removed');
