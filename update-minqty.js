const fs = require('fs');
const file = 'js/premium-data.js';
let content = fs.readFileSync(file, 'utf8');

// The Monedas de Juegos block starts around ID 130. We want to find variants with minQty: 1000 inside those subproducts and change them to 8000.
// Let's use string replacement for the specific block.
const startIndex = content.indexOf('id: 130, category: "Gaming"');
if (startIndex !== -1) {
  let before = content.slice(0, startIndex);
  let after = content.slice(startIndex);
  
  // Replace minQty: 1000 with minQty: 8000 in the 'after' block (which is the last block of the file)
  after = after.replace(/"minQty":\s*1000/g, '"minQty": 8000');
  // Also change the description just in case it's confusing.
  after = after.replace(/"desc":"1000 Monedas = \$2.5 USD"/g, '"desc":"Min. 8000 | 1000 Monedas = $2.5 USD"');
  
  fs.writeFileSync(file, before + after, 'utf8');
  console.log("Updated minQty to 8000 for Game Currency.");
} else {
  console.log("Could not find ID 130.");
}
