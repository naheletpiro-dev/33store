const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

const descSpotify = "Spotify Premium Individual - Tu Música Sin Anuncios con 33Store.\\nDisfrutá de Spotify Premium sin interrupciones, con saltos ilimitados y descargas offline.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Beneficios Full: Audio en máxima calidad (320 kbps), sin publicidad y modo sin conexión.\\n  Variedad de Planes: Opciones de corto plazo o modalidad Lifetime (de por vida).\\n  En Tu Propia Cuenta (Keys): Si elegís las opciones 'Own Account' o 'Keys', la mejora se aplica directamente sobre tu cuenta personal actual.\\n\\nCALIDAD Y ENTREGA\\n  Activación Inmediata: Te entregamos las keys o las credenciales apenas se procesa el pago.\\n  Sistema Auto Replace: Los planes Lifetime cuentan con reposición automática garantizada por 33Store ante cualquier eventualidad.\\n\\nSOPORTE\\n  Asistencia prioritaria. Si una cuenta o key presenta inconvenientes, el equipo de 33Store te asiste de inmediato.";

const descHBO = "Max (ex HBO Max) Premium Lifetime - Cine y Series de por Vida con 33Store.\\nAccedé a todo el contenido exclusivo de HBO, Warner Bros y DC con un único pago definitivo.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Pago Único: Sin suscripciones mensuales. Pagás hoy y disfrutás sin vencimiento.\\n  Máxima Calidad: Streaming fluido y en la más alta resolución disponible (según dispositivo).\\n  Garantía Lifetime 33Store: Nuestro sistema Auto Replace asegura un reemplazo al instante si la cuenta original llega a presentar cambios.\\n\\nCALIDAD Y ENTREGA\\n  Activación Inmediata: Recibís los datos de acceso al instante de confirmar tu compra.\\n  Acceso Asegurado: Disfrutá desde tus dispositivos favoritos (Smart TV, Celular, PC).\\n\\nSOPORTE\\n  Soporte técnico 24/7 de 33Store para solucionar dudas o realizar reposiciones si es necesario.";

// Function to inject description into subproducts
function injectDesc(ids, descStr) {
    ids.forEach(id => {
        let regex = new RegExp(`\\{ id: ${id}, title: "[^"]+"([^\}]+) \\}`);
        content = content.replace(regex, (match) => {
            if (!match.includes('description:')) {
                return match.replace(/image: "[^"]+"/, (imgMatch) => {
                    return `${imgMatch}, description: "${descStr}"`;
                });
            }
            return match;
        });
    });
}

// Spotify Premium IDs: 1161, 1162, 1163, 1164
injectDesc([1161, 1162, 1163, 1164], descSpotify);

// HBO Max IDs: 1141, 1142
injectDesc([1141, 1142], descHBO);


fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log("Batch 3 descriptions injected.");
