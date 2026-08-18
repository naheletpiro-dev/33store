const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

const descPrime = "Amazon Prime Video - Series y Películas exclusivas con 33Store.\\nDisfrutá del catálogo completo de Prime Video en máxima resolución.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Cuentas FA (Full Access): Cuentas premium con acceso total a los perfiles.\\n  Calidad de Imagen: Streaming en la más alta resolución (4K/HD) disponible para tu dispositivo.\\n  Catálogo Original: Series exclusivas como The Boys, Invincible y producciones locales.\\n\\nCALIDAD Y ENTREGA\\n  Activación Rápida: Recibís el email y contraseña apenas se aprueba tu pago.\\n  Sin Tarjetas Requeridas: Nosotros ya nos ocupamos de los abonos, vos solo ingresás y mirás.\\n\\nSOPORTE\\n  Cobertura 33Store garantizada durante toda la duración de tu plan ante bloqueos o pérdida de acceso.";

const descYouTube = "YouTube Premium & Music - Videos sin Publicidad con 33Store.\\nOlvidate de los anuncios molestos, reproducí en segundo plano y descargá contenido para ver offline.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Sin Anuncios: Bloqueo oficial de toda la publicidad, tanto en PC como en la App móvil.\\n  En Tu Propia Cuenta (Keys): Si elegís las versiones 'Keys', la mejora se aplica directamente a tu correo personal mediante link de invitación.\\n  Plan Family Owner: Convertite en el administrador de un grupo familiar y repartí cupos premium a tus amigos o familiares.\\n\\nCALIDAD Y ENTREGA\\n  YouTube Music Incluido: Acceso ilimitado a millones de canciones sin cortes.\\n  Activación Inmediata: Te entregamos tu link de activación apenas confirmás la compra.\\n\\nSOPORTE\\n  Garantía de activación y asistencia técnica por parte del equipo de 33Store.";

const descMovistar = "Movistar+ Lifetime - Todo el Deporte y TV en Vivo con 33Store.\\nAccedé a la plataforma líder de televisión, canales en vivo y los mejores eventos deportivos con un pago único.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Pago Único (Lifetime): Mirá de por vida sin tener que pagar abonos todos los meses.\\n  Fútbol y Deportes: Acceso a eventos premium (seleccionando la opción La Liga+ para el mejor fútbol español).\\n  Televisión en Vivo: Canales de entretenimiento, documentales, series y películas de estreno.\\n\\nCALIDAD Y ENTREGA\\n  Garantía Lifetime 33Store: Nuestro sistema de reposición asegura que tu acceso se mantenga vigente a largo plazo.\\n  Activación Inmediata: Recibís usuario y contraseña apenas el sistema procesa el pago.\\n\\nSOPORTE\\n  Atención especializada. Nuestro equipo de 33Store te soluciona bloqueos de IP o caídas en tiempo récord.";

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

// Prime Video IDs: 1151, 1152
injectDesc([1151, 1152], descPrime);

// YouTube Premium IDs: 1171, 1172, 1173, 1174
injectDesc([1171, 1172, 1173, 1174], descYouTube);

// Movistar+ IDs: 1181, 1182
injectDesc([1181, 1182], descMovistar);

fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log("Batch 4 descriptions injected.");
