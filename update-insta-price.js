const fs = require('fs');
const file = 'js/premium-data.js';
let content = fs.readFileSync(file, 'utf8');

const replacement = `      { id: 1231, title: "Instagram Boost", priceText: "ARS 10,40", badge: "In stock", image: "./img/socialboost/instagram.webp" , description: "Servicios de Crecimiento en Instagram\\\\nInteracciones Premium de Instagram para perfiles, publicaciones, Reels y videos con procesamiento rápido y automatizado.\\\\n\\\\nCARACTERÍSTICAS DEL SERVICIO\\\\n• Elige entre visualizaciones, me gusta y seguidores.\\\\n• Cantidades flexibles con límites mínimos y máximos claros.\\\\n• Inicio rápido y alta capacidad de entrega.\\\\n\\\\nCALIDAD Y ENTREGA\\\\n• Los servicios son seleccionados por su gran valor, estabilidad y rendimiento confiable.\\\\n• Los pedidos se envían automáticamente después del pago.\\\\n• Se requiere un enlace público válido de Instagram.\\\\n• Mantén el perfil, publicación, Reel o video público hasta que se complete la entrega.\\\\n\\\\nSOPORTE\\\\n• Soporte disponible para problemas relacionados con el pedido.", variants: [{"name":"Visualizaciones","priceText":"ARS 10,40 c/u","desc":"Reels y videos · Sin caídas", "minQty": 1000, "priceNum": 10.4},{"name":"Me Gusta","priceText":"ARS 10,40 c/u","desc":"Cuentas reales · Baja caída", "minQty": 1000, "priceNum": 10.4},{"name":"Seguidores","priceText":"ARS 10,40 c/u","desc":"Cuentas con publicaciones · Sin caídas", "minQty": 1000, "priceNum": 10.4}] },`;

const startIndex = content.indexOf('{ id: 1231, title: "Instagram Boost"');
const endIndex = content.indexOf('{ id: 1232,');

content = content.slice(0, startIndex) + replacement + '\n' + content.slice(endIndex);
fs.writeFileSync(file, content, 'utf8');
console.log("Updated Instagram Boost with minQty and floats.");
