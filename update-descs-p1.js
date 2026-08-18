const fs = require('fs');

let content = fs.readFileSync('js/premium-data.js', 'utf8');

const descMembers = "Real Discord Members - Sistema por Keys exclusivo de 33Store.\\nServicio de alta calidad que provee miembros 100% reales y activos para tu servidor a través del sistema de keys más seguro del mercado.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  100% Miembros Reales: Solo usuarios genuinos. Cero bots, cero riesgo.\\n  Garantía 33Store: Recibís exactamente la cantidad comprada, respaldada por nuestro equipo.\\n  Entrega Inmediata: Procesamiento ultra rápido sin poner en riesgo tu servidor.\\n\\nCALIDAD Y ENTREGA\\n  Sistema Avanzado de Keys: Los miembros se reclaman cuando vos quieras mediante llaves privadas.\\n  Sin Vencimiento: Las keys nunca expiran, tu saldo queda guardado para siempre.\\n  Marca Blanca: Ideal para revendedores. Entregá a tus clientes sin que vean nuestra marca.\\n\\nSOPORTE\\n  Soporte 24/7 en español mediante nuestro canal oficial de Discord o tickets directos en 33Store.";

const descNitroPromo = "Discord Nitro Promocode (3 Meses) - Activación Inmediata con 33Store.\\nDisfrutá de todos los beneficios premium de Discord por 3 meses enteros con nuestro sistema automatizado.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Nitro Full: 2 Mejoras de servidor (Boosts), avatares animados, emojis globales y streaming en HD.\\n  Activación Rápida: Recibís un código promocional oficial listo para canjear en tu cuenta.\\n  Calidad 33Store: Garantizamos la validez y origen lícito de todos nuestros códigos.\\n\\nCALIDAD Y ENTREGA\\n  Requisitos: Tu cuenta no debe haber tenido Nitro activo en los últimos 12 meses. Requiere método de pago para activar (no te cobran).\\n  Entrega Instantánea: Recibís tu link apenas confirmás el pago en 33Store.\\n\\nSOPORTE\\n  Garantía y ayuda paso a paso desde nuestro centro de soporte.";

const descNitroToken = "Discord Nitro Tokens - Sistema Avanzado para Desarrolladores y Servidores.\\nTokens de Discord Nitro de alta calidad y verificados, listos para integraciones y herramientas.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Tokens 100% Verificados: Cuentas estables para uso profesional con Nitro activo.\\n  Entrega Segura: Sistema automatizado que entrega directamente el token sin intermediarios.\\n\\nCALIDAD Y ENTREGA\\n  Durabilidad 33Store: Probados rigurosamente para garantizar su tiempo de vida útil.\\n  Formato Limpio: Formato estándar compatible con la mayoría de herramientas del mercado.\\n\\nSOPORTE\\n  Soporte especializado de 33Store para garantizar que el token entregado funciona al 100%.";

const descClaude = "Claude Pro Unlimited - IA Avanzada Sin Límites gracias a 33Store.\\nAccedé a toda la potencia del modelo Claude (Anthropic) sin restricciones de uso y con entrega inmediata.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Acceso Pro: Respuestas más rápidas, ventanas de contexto enormes y cero límites molestos.\\n  Suscripción Asegurada: Tu cuenta funcionará ininterrumpidamente durante todo el período contratado.\\n  Garantía 33Store: Renuevos y reemplazos inmediatos si surge cualquier inconveniente.\\n\\nCALIDAD Y ENTREGA\\n  Activación Inmediata: Te entregamos las credenciales de acceso apenas se procesa el pago.\\n  Privacidad Total: Tu entorno es seguro y cuenta con el respaldo de 33Store.\\n\\nSOPORTE\\n  Soporte prioritario 24/7. Nuestro equipo de 33Store te asiste ante cualquier caída de plataforma.";


// Update 1091 (Discord Members)
// It currently has a description already, we will replace it.
content = content.replace(/description: "Real Discord Members - Key-Based System[^"]+"/, `description: "${descMembers}"`);

// Update 1092 (Nitro Promo)
content = content.replace(/\{ id: 1092, title: "Nitro Promocode \[3 Months\]"[^\}]+ \}/, (match) => {
    return match.replace('badge: "En stock", image: "./img/products/discord/nitropromocode.webp"', `badge: "En stock", image: "./img/products/discord/nitropromocode.webp", description: "${descNitroPromo}"`);
});

// Update 1093 (Nitro Tokens)
content = content.replace(/\{ id: 1093, title: "Nitro Tokens"[^\}]+ \}/, (match) => {
    return match.replace('badge: "En stock", image: "./img/products/discord/nitrotoken.webp"', `badge: "En stock", image: "./img/products/discord/nitrotoken.webp", description: "${descNitroToken}"`);
});


// Update Claude (1061 to 1065)
const claudeIds = [1061, 1062, 1063, 1064, 1065];
claudeIds.forEach(id => {
    let regex = new RegExp(`\\{ id: ${id}, title: "Claude [^\}]+ \\}`);
    content = content.replace(regex, (match) => {
        if (!match.includes('description:')) {
            return match.replace('badge: "En stock", image: "./img/products/claude.webp"', `badge: "En stock", image: "./img/products/claude.webp", description: "${descClaude}"`);
        }
        return match;
    });
});


fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log("Descriptions injected successfully.");
