const fs = require('fs');
let content = fs.readFileSync('js/producto.js', 'utf8');

// Replace the block
const regex = /\/\/\s*25%\s*discount\s*if\s*qty\s*is\s*1000\s*or\s*more[\s\S]*?if\s*\(newQty\s*>=\s*1000\)\s*\{[\s\S]*?\}\s*else\s*if\s*\(currentVariant\s*&&\s*currentVariant\.originalPriceNum\)\s*\{/g;

content = content.replace(regex, 'if (currentVariant && currentVariant.originalPriceNum) {');

fs.writeFileSync('js/producto.js', content, 'utf8');
console.log('Removed 25% discount UI logic');
