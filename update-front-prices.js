const fs = require('fs');

const rate = 1800;

function formatARS(num) {
  return 'ARS ' + num.toLocaleString('es-AR');
}

function parseEurToArs(eurStr) {
  // eurStr could be "€0.89" or "€0.89 – €23.25" or "€0.89 - €23.25"
  let parts = eurStr.split(/[-–]/).map(s => s.trim());
  
  if (parts.length === 1) {
    let eur = parseFloat(parts[0].replace('€', '').trim());
    return formatARS(Math.round(eur * rate));
  } else {
    let eur1 = parseFloat(parts[0].replace('€', '').trim());
    let eur2 = parseFloat(parts[1].replace('€', '').trim());
    return formatARS(Math.round(eur1 * rate)) + ' - ' + formatARS(Math.round(eur2 * rate));
  }
}

const updates = [
  { title: "Discord Services", eur: "€0.89 - €23.25" },
  { title: "Claude", eur: "€2.29 - €139.45" },
  { title: "Gemini", eur: "€3.95 - €4.95" },
  { title: "ChatGPT", eur: "€0.95 - €6.45" },
  { title: "Netflix Lifetime", eur: "€0.19 - €2.95" },
  { title: "Spotify Premium", eur: "€0.97 - €5.99" },
  { title: "HboMax", eur: "€0.25 - €1.85" },
  { title: "Apple Music+ Head [1 Month]", eur: "€0.75" },
  { title: "Prime Video", eur: "€0.95 - €3.15" },
  { title: "YouTube Premium", eur: "€0.95 - €2.95" },
  { title: "Movistar+", eur: "€0.65 - €0.80" },
  { title: "Disney+ Lifetime", eur: "€0.12 - €0.55" },
  { title: "Dazn Lifetime", eur: "€0.35 - €2.45" },
  { title: "UFC Pass Lifetime", eur: "€0.65" },
  { title: "NBA League Pass Lifetime", eur: "€0.25" },
  { title: "NordVPN Lifetime", eur: "€0.55" },
  { title: "ExpressVPN Lifetime", eur: "€0.19" },
  { title: "Paramount+ Lifetime", eur: "€0.22 - €0.25" },
  { title: "Crunchyroll", eur: "€0.12 - €0.65" },
  { title: "Canva Premium", eur: "€0.55 - €2.45" },
  { title: "CapCut Pro Lifetime", eur: "€0.37" },
  { title: "Cheats", eur: "€9.95 - €29.95" },
  { title: "Steam Accounts", eur: "€0.02 - €0.65" },
  { title: "Minecraft Account Lifetime", eur: "€4.45" },
  { title: "Microsoft Random Codes", eur: "€0.37" },
  { title: "Uber Eats [Discounts]", eur: "€3.95" },
  { title: "Telepizza Accounts", eur: "€0.25 - €0.95" },
  { title: "Duolingo Lifetime", eur: "€0.10" }
];

let content = fs.readFileSync('js/premium-data.js', 'utf8');

// We will find each title in the parent object and update its priceText.
updates.forEach(upd => {
  let newPriceText = parseEurToArs(upd.eur);
  // Match: title: "Discord Services", priceText: "ARS 1.157 - ARS 30.225",
  // Using Regex to safely replace the priceText following the title.
  // Note: some titles might have escaped brackets in JS? No.
  
  // Create a regex to match the exact title and its priceText
  let titleRegexEscaped = upd.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Target pattern: title: "Spotify Premium", priceText: "ARS 1.261 - ARS 7.787"
  let regex = new RegExp(`title:\\s*"${titleRegexEscaped}",\\s*priceText:\\s*"[^"]*"`, 'g');
  
  let replaced = false;
  content = content.replace(regex, (match) => {
    replaced = true;
    return `title: "${upd.title}", priceText: "${newPriceText}"`;
  });
  
  if (!replaced) {
    // maybe title is slightly different in our DB?
    console.log(`Could not find parent for: ${upd.title}`);
    
    // Try fuzzy search for title in the content
    let simpleTitle = upd.title.replace(/ Lifetime| \[.*\]/g, '');
    let fuzzyRegex = new RegExp(`title:\\s*"${simpleTitle}[^"]*",\\s*priceText:\\s*"[^"]*"`, 'g');
    let fuzzyReplaced = false;
    content = content.replace(fuzzyRegex, (match) => {
        fuzzyReplaced = true;
        // Keep the original title, just update price
        return match.replace(/priceText:\s*"[^"]*"/, `priceText: "${newPriceText}"`);
    });
    
    if (fuzzyReplaced) {
        console.log(` -> Fuzzy replaced using: ${simpleTitle}`);
    } else {
        console.log(` -> Failed fuzzy replace for: ${simpleTitle}`);
    }
  }
});

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Update complete.');
