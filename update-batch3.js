const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

// Gemini
content = content.replace(/title:\s*"Gemini Pro\+ Keys 12 Months \[Own Account\]",\s*priceText:\s*"[^"]*"/, 'title: "Gemini Pro+ Keys 12 Months [Own Account]", priceText: "ARS 9.243"');
content = content.replace(/title:\s*"Gemini Pro\+ Keys 18 Months \[Own Account\]",\s*priceText:\s*"[^"]*"/, 'title: "Gemini Pro+ Keys 18 Months [Own Account]", priceText: "ARS 11.583"');

// ChatGPT
content = content.replace(/title:\s*"ChatGPT Unlimited \[1 Day\]",\s*priceText:\s*"[^"]*"/, 'title: "ChatGPT Unlimited [1 Day]", priceText: "ARS 2.223"');
content = content.replace(/title:\s*"ChatGPT Unlimited \[7 Days\]",\s*priceText:\s*"[^"]*"/, 'title: "ChatGPT Unlimited [7 Days]", priceText: "ARS 6.435"');
content = content.replace(/title:\s*"ChatGPT Unlimited \[30 Days\]",\s*priceText:\s*"[^"]*"/, 'title: "ChatGPT Unlimited [30 Days]", priceText: "ARS 15.093"');

// Netflix
content = content.replace(/title:\s*"Netflix Lifetime Keys 4K Plan \[Lifetime Warranty \+ Auto Replace\]",\s*priceText:\s*"[^"]*"/, 'title: "Netflix Lifetime Keys 4K Plan [Lifetime Warranty + Auto Replace]", priceText: "ARS 6.903"');
content = content.replace(/title:\s*"Netflix Lifetime Keys \[Lifetime Warranty \+ Auto Replace\]",\s*priceText:\s*"[^"]*"/, 'title: "Netflix Lifetime Keys [Lifetime Warranty + Auto Replace]", priceText: "ARS 2.925"');
content = content.replace(/title:\s*"Netflix Lifetime \[Random Sub\]",\s*priceText:\s*"[^"]*"/, 'title: "Netflix Lifetime [Random Sub]", priceText: "ARS 445"');
content = content.replace(/title:\s*"Netflix Lifetime \[UHQ\]",\s*priceText:\s*"[^"]*"/, 'title: "Netflix Lifetime [UHQ]", priceText: "ARS 1.053"');
content = content.replace(/title:\s*"Netflix Lifetime \[Espa.a\]",\s*priceText:\s*"[^"]*"/, 'title: "Netflix Lifetime [España]", priceText: "ARS 2.223"');

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Batch 3 (Gemini, ChatGPT, Netflix) updated.');
