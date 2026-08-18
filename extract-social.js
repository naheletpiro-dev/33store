const fs = require('fs');

const pages = [
  { name: 'Instagram Boost',   id: 1231, step: '1276' },
  { name: 'TikTok Boost',      id: 1232, step: '1291' },
  { name: 'X (Twitter) Boost', id: 1233, step: '1299' },
  { name: 'Facebook Boost',    id: 1234, step: '1301' },
  { name: 'YouTube Boost',     id: 1235, step: '1303' },
  { name: 'Telegram Boost',    id: 1236, step: '1305' },
  { name: 'Spotify Boost',     id: 1237, step: '1307' },
];

const stepsBase = 'C:/Users/Nahele/.gemini/antigravity/brain/f752c895-5493-4874-949e-2498c9d9beef/.system_generated/steps';

const results = {};

pages.forEach(page => {
  try {
    const content = fs.readFileSync(`${stepsBase}/${page.step}/content.md`, 'utf8');
    
    // Extract JSON-LD
    const jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    let variants = [];
    let desc = "";
    if (jsonLdMatch) {
      try {
        const data = JSON.parse(jsonLdMatch[1]);
        const productData = Array.isArray(data) ? data.find(d => d['@type'] === 'ProductGroup' || d['@type'] === 'Product') : data;
        
        if (productData) {
          desc = productData.description || "";
          if (productData.hasVariant) {
             variants = productData.hasVariant.map(v => ({
               name: v.name,
               price: v.offers ? v.offers.price : null,
               description: v.description
             }));
          } else if (productData.offers && productData.offers['@type'] === 'AggregateOffer') {
             // Sometimes variants are structured differently
          }
        }
      } catch(e) {}
    }

    results[page.id] = {
      name: page.name,
      description: desc,
      variants: variants
    };
  } catch(e) {
    console.error(`Error on ${page.name}: ${e.message}`);
  }
});

console.log(JSON.stringify(results, null, 2));
