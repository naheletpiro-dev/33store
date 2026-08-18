const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

function replaceTitlePrice(title, newPrice) {
    let titleEscaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let regex = new RegExp(`title:\\s*"${titleEscaped}",\\s*priceText:\\s*"[^"]*"`, 'g');
    content = content.replace(regex, `title: "${title}", priceText: "ARS ${newPrice}"`);
}

// Spotify Premium
replaceTitlePrice("Spotify Premium Keys [12 Months]", "8.775");
replaceTitlePrice("Spotify Premium Keys [Lifetime + Autoreplace]", "14.017");
replaceTitlePrice("Spotify Premium FA [1 month]", "2.270");
replaceTitlePrice("Spotify Premium FA [AUTOPAY]", "9.243");

// HboMax
replaceTitlePrice("HboMax Keys [Lifetime + Autoreplace]", "4.329");
replaceTitlePrice("HboMax Lifetime", "585");

// Prime Video
replaceTitlePrice("Prime Video Head FA [1 month]", "2.223");
replaceTitlePrice("Prime Video FA [6 months]", "7.371");

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Batch 4 (Spotify, HBO, Prime) updated.');
