const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

function replaceTitlePrice(title, newPrice) {
    let titleEscaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let regex = new RegExp(`title:\\s*"${titleEscaped}",\\s*priceText:\\s*"[^"]*"`, 'g');
    content = content.replace(regex, `title: "${title}", priceText: "ARS ${newPrice}"`);
}

// YouTube Premium
replaceTitlePrice("Youtube Premium Keys [ Your Own Account ]", "2.925");
replaceTitlePrice("Youtube Premium Family Owner Keys [ Your Own Account ]", "4.563");
replaceTitlePrice("Youtube Premium FA [1 Month]", "2.223");
replaceTitlePrice("Youtube Premium FA [3 Months]", "6.903");

// Movistar+
replaceTitlePrice("Movistar+ Lifetime", "1.521");
replaceTitlePrice("Movistar+ Lifetime [La Liga+]", "1.872");

// Disney+
replaceTitlePrice("Disney+ [Only Disney+]", "281");
replaceTitlePrice("Disney+ [DISNEY+ & HULU]", "585");
replaceTitlePrice("Disney+ [DISNEY+ & HULU & ESPN+]", "1.287");

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Batch 5 (YouTube, Movistar, Disney) updated.');
