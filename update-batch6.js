const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

function replaceTitlePrice(title, newPrice) {
    let titleEscaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let regex = new RegExp(`title:\\s*"${titleEscaped}",\\s*priceText:\\s*"[^"]*"`, 'g');
    content = content.replace(regex, `title: "${title}", priceText: "ARS ${newPrice}"`);
}

// Dazn
replaceTitlePrice("Dazn Lifetime [ Random Sub ]", "1.053");
replaceTitlePrice("Dazn Lifetime ESP [ Random Sub ]", "819");
replaceTitlePrice("Dazn Lifetime ESP [ Motor ]", "1.404");
replaceTitlePrice("Dazn Lifetime ESP [ Futbol ]", "1.638");
replaceTitlePrice("Dazn Lifetime ESP [ Total ]", "5.733");

// Crunchyroll
replaceTitlePrice("Crunchyroll Lifetime [FAN]", "281");
replaceTitlePrice("Crunchyroll Lifetime Mega Fan Keys [Auto Replace]", "1.521");

// Canva
replaceTitlePrice("Canva Premium [1 month]", "1.287");
replaceTitlePrice("Canva Premium Keys Lifetime [Your Own Account]", "5.733");

// Steam Accounts
replaceTitlePrice("Steam Lifetime [0-3 games]", "47");
replaceTitlePrice("Steam Lifetime [+4 Games & Balance]", "140");
replaceTitlePrice("Steam Lifetime [Counter Strike]", "117");
replaceTitlePrice("Steam Lifetime [GTA 5]", "1.521");
replaceTitlePrice("Steam Lifetime [Rainbow Six]", "1.521");

// Fix Cheats (add subProducts)
let cheatsRegex = /\{ id: 105, category: "Gaming", title: "Cheats"[^\}]+link: "#" \},/;
let cheatsReplacement = `{ id: 105, category: "Gaming", title: "Cheats", priceText: "ARS 23.283 - ARS 70.083", badge: "2 products", image: "./img/products/cheats.webp", link: "#",
    subProducts: [
      { id: 1051, title: "Fortnite Cheat", priceText: "ARS 23.283 - ARS 70.083", badge: "En stock", image: "./img/products/cheats.webp" },
      { id: 1052, title: "Black Ops 7 & War Zone Cheat", priceText: "ARS 23.283 - ARS 70.083", badge: "En stock", image: "./img/products/cheats.webp" }
    ]
  },`;
content = content.replace(cheatsRegex, cheatsReplacement);

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Batch 6 updated.');
