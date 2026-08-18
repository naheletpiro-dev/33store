const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

const descriptionStr = "Real Discord Members - Key-Based System\\nHigh-quality service providing 100% real and active Discord members through a secure, scalable key-based delivery system.\\n\\nCARACTERÍSTICAS PRINCIPALES\\n  100% Miembros Reales: Solo usuarios genuinos y activos. Sin bots ni actividad falsa.\\n  Cantidad Garantizada: Recibes exactamente el número de miembros comprados.\\n  Usuarios Frescos: Miembros recién cultivados obtenidos orgánicamente.\\n  Privado y Seguro: Seguro, transparente y totalmente confiable.\\n  Entrega Rápida y Segura: Crecimiento inmediato sin arriesgar la integridad de tu servidor.\\n\\nSISTEMA AVANZADO DE KEYS\\n  Acceso Único por Key: Los miembros se entregan mediante llaves privadas.\\n  Sistema de Memoria Persistente: Rastreo exacto de miembros restantes.\\n  No Expiran: Las keys nunca vencen.\\n  Saldo Exacto Restante: Cada key retiene el número preciso de miembros.\\n\\nLISTO PARA REVENDEDORES\\n  Sin Marca de Agua: Totalmente White-Label, seguro para revender a tus clientes.";

const variantsStr = `variants: [
        {"name":"500 MEMBERS","priceText":"ARS 4.563","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 4563},
        {"name":"1000 MEMBERS","priceText":"ARS 8.073","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 8073},
        {"name":"2000 MEMBERS","priceText":"ARS 15.093","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 15093},
        {"name":"3000 MEMBERS","priceText":"ARS 22.113","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 22113},
        {"name":"4000 MEMBERS","priceText":"ARS 27.963","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 27963},
        {"name":"5000 MEMBERS","priceText":"ARS 33.813","desc":"Entrega Inmediata", "minQty": 1, "priceNum": 33813},
        {"name":"6000 MEMBERS","priceText":"ARS 36.621","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 36621},
        {"name":"7000 MEMBERS","priceText":"ARS 42.705","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 42705},
        {"name":"8000 MEMBERS","priceText":"ARS 48.321","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 48321},
        {"name":"9000 MEMBERS","priceText":"ARS 54.405","desc":"Agotado temporalmente", "minQty": 1, "priceNum": 54405}
      ]`;

const regex = /\{ id: 1091, title: "Discord Real Server Members \[KEYS\]", priceText: "ARS 4.563 - ARS 54.405", badge: "En stock", image: "\.\/img\/products\/discord\/discmembers\.webp" \}/;

const replacement = `{ id: 1091, title: "Discord Real Server Members [KEYS]", priceText: "ARS 4.563 - ARS 54.405", badge: "En stock", image: "./img/products/discord/discmembers.webp", description: "${descriptionStr}", ${variantsStr} }`;

content = content.replace(regex, replacement);

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log('Discord Real Members variants added.');
