const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

const descDisney = "Disney+ / Hulu / ESPN+ - Todo el Entretenimiento y Deporte con 33Store.\\nDisfrutá del mundo mágico de Disney, las series de Hulu y los deportes de ESPN en un solo lugar.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Opciones a Medida: Elegí el combo que mejor se adapte a vos (Solo Disney+, con Hulu o el bundle completo con ESPN+).\\n  Máxima Resolución: Reproducción en 4K UHD para aprovechar tu Smart TV al máximo.\\n  Cuentas Seguras: Acceso premium garantizado y administrado por 33Store.\\n\\nCALIDAD Y ENTREGA\\n  Activación Inmediata: Recibís las credenciales apenas se aprueba tu pago.\\n  Perfiles Premium: Disfrutá sin cortes, sin publicidades y con el catálogo completamente liberado.\\n\\nSOPORTE\\n  Cobertura total. Ante cualquier inconveniente, nuestro equipo de soporte te lo resuelve en minutos.";

const descDazn = "DAZN Lifetime - La Casa del Deporte en Vivo con 33Store.\\nAccedé a la plataforma de streaming deportivo más grande del mundo, incluyendo fútbol, motor, boxeo y más, con un solo pago.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Pago Único (Lifetime): Olvidate de las cuotas mensuales. Pagás una vez y mirás siempre.\\n  Opciones Regionales (ESP): Elegí tu paquete favorito (Motor, Fútbol o Total) para disfrutar del contenido de España.\\n  Garantía Lifetime 33Store: Con nuestro sistema de reposición, asegurás tu inversión a largo plazo.\\n\\nCALIDAD Y ENTREGA\\n  Transmisión en Alta Calidad: Partidos y carreras en HD sin retrasos.\\n  Entrega Instantánea: Recibís usuario y contraseña apenas el sistema procesa tu orden.\\n\\nSOPORTE\\n  Asistencia técnica 24/7. Nuestro equipo de 33Store está siempre listo para ayudarte con configuraciones de región o reposiciones.";

const descCrunchy = "Crunchyroll Premium Lifetime - El Mejor Anime de por Vida con 33Store.\\nMirá tus animes favoritos el mismo día de su estreno en Japón, en Full HD y sin publicidad.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Pago Único (Lifetime): Una suscripción definitiva sin pagar mes a mes.\\n  Planes Fan & Mega Fan: Elegí el plan Mega Fan (Keys Auto Replace) para aplicarlo directamente a tu propia cuenta y tener descargas offline.\\n  Catálogo Completo: Todo el anime subtitulado y doblado, con lanzamientos simultáneos (Simulcast).\\n\\nCALIDAD Y ENTREGA\\n  Garantía 33Store: Nuestro sistema asegura que siempre tengas acceso mediante reposiciones si fuesen necesarias.\\n  Entrega Rápida: Recibís tu acceso al instante tras la compra.\\n\\nSOPORTE\\n  Soporte especializado 24/7 mediante nuestro servidor de Discord o tickets directos.";

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

// Disney+ IDs: 1101, 1102, 1103
injectDesc([1101, 1102, 1103], descDisney);

// DAZN IDs: 1081, 1082, 1083, 1084, 1085
injectDesc([1081, 1082, 1083, 1084, 1085], descDazn);

// Crunchyroll IDs: 1071, 1072
injectDesc([1071, 1072], descCrunchy);


fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log("Batch 5 descriptions injected.");
