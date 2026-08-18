const fs = require('fs');

let content = fs.readFileSync('js/premium-data.js', 'utf8');

// 1. Update priceText strings
content = content.replace(/priceText:\s*"([^"]+)"/g, (match, priceStr) => {
    let newPriceStr = priceStr.replace(/ARS ([\d\.,]+)/g, (m, numberStr) => {
        let isDecimal = numberStr.includes(',');
        if (isDecimal) {
            let num = parseFloat(numberStr.replace(/\./g, '').replace(',', '.'));
            num = num * 1.3;
            let parts = num.toFixed(2).split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return 'ARS ' + parts.join(',');
        } else {
            let num = parseInt(numberStr.replace(/\./g, ''), 10);
            num = Math.round(num * 1.3);
            let formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return 'ARS ' + formatted;
        }
    });
    return `priceText: "${newPriceStr}"`;
});

// 2. Update priceNum fields
content = content.replace(/"priceNum":\s*([\d\.]+)/g, (match, numStr) => {
    let num = parseFloat(numStr);
    num = num * 1.3;
    // Round to 3 decimals
    num = Math.round(num * 1000) / 1000;
    return `"priceNum": ${num}`;
});

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Increased all prices by 30%.');
