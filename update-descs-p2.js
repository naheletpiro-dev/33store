const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

const descGemini = "Gemini Advanced / Pro+ - Inteligencia Artificial de Google con 33Store.\\nLlevá tu productividad al siguiente nivel con el modelo más potente de Google directamente en tu propia cuenta.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  En Tu Propia Cuenta: Activamos la suscripción premium directamente en tu correo personal.\\n  Acceso a Gemini Advanced: Respuestas más precisas, razonamiento lógico complejo y creación de código avanzado.\\n  Garantía 33Store: Cobertura total durante todo el período contratado.\\n\\nCALIDAD Y ENTREGA\\n  Seguridad Total: El proceso de activación es 100% seguro y privado.\\n  Sin Renovaciones Automáticas Sorpresa: Pagás por el tiempo pactado y lo usás sin preocupaciones.\\n\\nSOPORTE\\n  Soporte en español y resolución de consultas a través del equipo de 33Store.";

const descChatGPT = "ChatGPT Plus / Unlimited - Respuestas Rápidas sin Límites con 33Store.\\nAccedé a GPT-4 y las herramientas avanzadas de OpenAI sin restricciones molestos.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Sin Límites Prácticos: Olvidate del mensaje de limitación constante.\\n  Herramientas Plus: Acceso a DALL-E 3, análisis de datos avanzado y navegación web.\\n  Confiabilidad 33Store: Accesos premium configurados para alta disponibilidad.\\n\\nCALIDAD Y ENTREGA\\n  Entrega Inmediata: Recibís los datos de acceso al instante tras tu compra.\\n  Privacidad: Acceso seguro mediante nuestro sistema verificado.\\n\\nSOPORTE\\n  Reemplazo inmediato garantizado ante cualquier fallo temporal gracias a la política de 33Store.";

const descNetflix = "Netflix Premium de por Vida - Entretenimiento Ilimitado con 33Store.\\nDisfrutá del catálogo completo de Netflix en máxima calidad con un solo pago y sin cuotas mensuales.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Pago Único: Olvidate de pagar mes a mes. Disfrutá sin vencimiento fijo.\\n  Calidad de Imagen: Opciones desde HD hasta 4K Ultra HD según la variante elegida.\\n  Garantía Lifetime 33Store: Sistema de auto-reemplazo (Auto Replace) que garantiza que siempre tengas una cuenta funcional si elegís los planes premium.\\n\\nCALIDAD Y ENTREGA\\n  Activación Rápida: Recibís tus credenciales apenas se procesa el pedido.\\n  Opciones Variadas: Desde perfiles Random hasta calidad UHQ o cuentas geolocalizadas.\\n\\nSOPORTE\\n  Soporte 24/7. Si la cuenta llega a fallar, el equipo de 33Store o nuestro bot te resuelven el problema.";

// Function to inject description into subproducts
function injectDesc(ids, descStr) {
    ids.forEach(id => {
        let regex = new RegExp(`\\{ id: ${id}, title: "[^"]+"([^\}]+) \\}`);
        content = content.replace(regex, (match) => {
            if (!match.includes('description:')) {
                // We find the image part and append description after it
                return match.replace(/image: "[^"]+"/, (imgMatch) => {
                    return `${imgMatch}, description: "${descStr}"`;
                });
            }
            return match;
        });
    });
}

// Gemini IDs: 1131, 1132
injectDesc([1131, 1132], descGemini);

// ChatGPT IDs: 1041, 1042, 1043
injectDesc([1041, 1042, 1043], descChatGPT);

// Netflix IDs: 1191, 1192, 1193, 1194, 1195
injectDesc([1191, 1192, 1193, 1194, 1195], descNetflix);

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log("Batch 2 descriptions injected.");
