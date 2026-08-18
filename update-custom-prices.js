const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

const replacements = [
  { id: 103, newPrice: "ARS 1.500" }, // CapCut Pro
  { id: 111, newPrice: "ARS 1.000" }, // Duolingo
  { id: 101, newPrice: "ARS 2.000" }, // Apple Music
  { id: 1071, newPrice: "ARS 1.000" }, // Crunchyroll Lifetime [FAN]
  { id: 118, newPrice: "ARS 1.000" }, // NBA Pass Lifetime
  { id: 1193, newPrice: "ARS 900" }, // Netflix Lifetime [Random Sub]
  { id: 1194, newPrice: "ARS 2.500" }, // Netflix Lifetime [UHQ]
  { id: 1192, newPrice: "ARS 3.500" }, // Netflix Lifetime Keys [Lifetime Warranty + Auto Replace]
  { id: 117, newPrice: "ARS 2.000" }, // Movistar+
  { id: 121, newPrice: "ARS 1.000" }, // Paramount+
  { id: 1222, newPrice: "ARS 7.500" }, // Prime Video FA [6 months]
  { id: 1221, newPrice: "ARS 2.500" }, // Prime Video Head FA [1 month]
  { id: 1253, newPrice: "ARS 130" }, // Steam Lifetime [Counter Strike]
  { id: 1254, newPrice: "ARS 1.750" }, // Steam Lifetime [GTA 5]
  { id: 1255, newPrice: "ARS 1.750" }, // Steam Lifetime [Rainbow Six]
  { id: 1263, newPrice: "ARS 1.750" }, // Steam Lifetime [Rainbow Six] New
  { id: 107, newPrice: "ARS 1.000 - ARS 1.521" }, // Crunchyroll Parent
  { id: 119, newPrice: "ARS 445 - ARS 6.903", calculate: true }, // Netflix Parent - wait, let's just do dynamic
  { id: 122, newPrice: "ARS 2.500 - ARS 7.500" } // Prime Video Parent
];

// For Netflix parent, we updated 1193 to 900. But 1195 might be something else. 
// Currently Netflix Parent is ARS 445 - ARS 6.903. 1193 was 445. If we bumped 445 to 900, the new min is 900, assuming no other product is < 900.
replacements.push({ id: 119, newPrice: "ARS 900 - ARS 6.903" });

replacements.forEach(rep => {
  const regex = new RegExp(`(id:\\s*${rep.id}[\\s\\S]*?priceText:\\s*")[^"]+(")`);
  content = content.replace(regex, `$1${rep.newPrice}$2`);
});

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Prices updated');
