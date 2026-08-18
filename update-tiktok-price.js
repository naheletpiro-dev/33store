const fs = require('fs');
const file = 'js/premium-data.js';
let content = fs.readFileSync(file, 'utf8');

const replacement = `{ id: 1232, title: "TikTok Boost", priceText: "ARS 10,40", badge: "In stock", image: "./img/socialboost/tiktok.webp" , description: "Servicios de Crecimiento en TikTok\\\\nInteracciones de alta calidad para videos y perfiles de TikTok, procesadas automáticamente después del pago.\\\\n\\\\nCARACTERÍSTICAS DEL SERVICIO\\\\n• Elige entre visualizaciones de video, me gusta y seguidores.\\\\n• Inicio rápido con velocidades de entrega escalables.\\\\n• Cuentas reales o de alta calidad donde se indique.\\\\n\\\\nCALIDAD Y ENTREGA\\\\n• Seleccionados por su confiabilidad, velocidad y valor competitivo.\\\\n• Ingresa el enlace público correcto del video o perfil de TikTok.\\\\n• Mantén el contenido y la cuenta públicos durante la entrega.\\\\n• No realices otro pedido para el mismo enlace hasta que se complete el primero.\\\\n\\\\nSOPORTE\\\\n• Soporte disponible para problemas funcionales del pedido.", variants: [{"name":"Visualizaciones","priceText":"ARS 10,40 c/u","desc":"Inicio rápido · Baja caída · Hasta 10M/día", "minQty": 1000, "priceNum": 10.4},{"name":"Me Gusta","priceText":"ARS 10,40 c/u","desc":"Cuentas de alta calidad · Inicio instantáneo", "minQty": 1000, "priceNum": 10.4},{"name":"Seguidores","priceText":"ARS 10,40 c/u","desc":"Cuentas reales · Caída muy baja", "minQty": 1000, "priceNum": 10.4}] }`;

const startIndex = content.indexOf('{ id: 1232, title: "TikTok Boost"');
const endIndex = content.indexOf('{ id: 1233,');

if(startIndex !== -1 && endIndex !== -1) {
  content = content.slice(0, startIndex) + replacement + ',\n      ' + content.slice(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log("Updated TikTok Boost prices.");
} else {
  console.log("Could not find boundaries.");
}
