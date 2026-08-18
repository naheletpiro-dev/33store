const fs = require('fs');

let content = fs.readFileSync('js/premium-data.js', 'utf8');

function increasePriceStr(numStr) {
    let clean = numStr.replace(/\./g, '').replace(/,/g, '.');
    let val = parseFloat(clean);
    if (isNaN(val)) return numStr;
    val = val * 1.3;
    
    if (val < 1000 && numStr.includes(',')) {
        return val.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    } else {
        return Math.round(val).toLocaleString('es-AR', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    }
}

content = content.replace(/priceText:\s*"(.*?)"/g, (match, p1) => {
    let updated = p1.replace(/ARS\s([\d.,]+)/g, (m, numStr) => {
        return 'ARS ' + increasePriceStr(numStr);
    });
    return 'priceText: "' + updated + '"';
});

content = content.replace(/"priceNum":\s*([\d.]+)/g, (match, p1) => {
    let val = parseFloat(p1);
    val = val * 1.3;
    return '"priceNum": ' + parseFloat(val.toFixed(3));
});

content = content.replace(/=\s*\$([\d.]+)\s*USD/g, (match, p1) => {
    let val = parseFloat(p1);
    val = val * 1.3;
    return '= $' + val.toFixed(2) + ' USD';
});

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Prices updated successfully!');
