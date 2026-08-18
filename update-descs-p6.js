const fs = require('fs');
let content = fs.readFileSync('js/premium-data.js', 'utf8');

const descCanva = "Canva Premium - Diseñá como un Profesional con 33Store.\\nLlevá tus diseños al siguiente nivel con acceso a todas las herramientas premium, plantillas exclusivas y elementos pro de Canva.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Herramientas Pro: Removedor de fondos, redimensionamiento mágico y organizador de marca.\\n  En Tu Propia Cuenta: La mejora se aplica directamente a tu correo electrónico personal de Canva mediante un enlace de invitación.\\n  Sin Marca de Agua: Exportá todos tus trabajos en máxima calidad y sin limitaciones.\\n\\nCALIDAD Y ENTREGA\\n  Activación Inmediata: Te enviamos la invitación a tu email al instante.\\n  Garantía Lifetime (Auto Replace): Para los planes Lifetime, 33Store asegura una reposición inmediata en caso de perder el acceso al equipo pro.\\n\\nSOPORTE\\n  Asistencia garantizada para que nunca te quedes a mitad de un diseño. Contactanos vía Discord o Web.";

const descCheats = "Cheats Premium & Software - Ventaja Competitiva Segura con 33Store.\\nHerramientas de asistencia premium, seguras y actualizadas para los juegos más competitivos del mercado.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Opciones Disponibles: Fortnite, Black Ops / Warzone, y más.\\n  Funciones Avanzadas: Aimbot preciso, ESP (Wallhack), Radar y configuraciones personalizables para jugar Legit o Rage.\\n  Undetected: Software privado y constantemente actualizado para evitar baneos.\\n\\nCALIDAD Y ENTREGA\\n  Entrega Instantánea: Descargá tu software y key de activación ni bien finaliza tu compra.\\n  Fácil Instalación: Instrucciones paso a paso incluidas.\\n\\nSOPORTE\\n  Aviso Importante: El uso de software de terceros siempre conlleva un riesgo. En 33Store te asesoramos sobre configuraciones seguras, pero el uso final es bajo tu propia responsabilidad.";

const descTelepizza = "Telepizza Puntos - Disfrutá de la Mejor Pizza con 33Store.\\nCuentas cargadas con puntos listos para canjear por pizzas, entradas y bebidas en tus sucursales favoritas.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n  Puntos Listos para Usar: Comprá una cuenta y usá los puntos inmediatamente desde la app oficial de Telepizza.\\n  Diferentes Saldos: Elegí cuentas desde 500 puntos hasta más de 90k puntos según el banquete que quieras armar.\\n  Ahorro Masivo: Comés mucho más por una fracción del precio real.\\n\\nCALIDAD Y ENTREGA\\n  Entrega Automática: Recibís el usuario y contraseña (Email:Pass) de la cuenta con los puntos.\\n  Garantía de Saldo: Garantizamos que la cuenta tendrá exactamente los puntos que compraste al momento de la entrega.\\n\\nSOPORTE\\n  Soporte 33Store. Debés revisar la cuenta dentro de los primeros 15 minutos de la entrega para validar la garantía.";

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

// Canva IDs: 1021, 1022
injectDesc([1021, 1022], descCanva);

// Cheats IDs: 1051, 1052
injectDesc([1051, 1052], descCheats);


// Fix Telepizza (It currently has no subProducts, it's just a main object, we need to convert it into subproducts)
// id: 126
let telepizzaRegex = /\{ id: 126, category: "Food & Discounts", title: "Telepizza", priceText: "ARS 585 - ARS 2\.223", badge: "En stock", image: "\.\/img\/products\/telepizza\.webp", link: "#" \},/;
let telepizzaReplacement = `{ 
    id: 126, category: "Food & Discounts", title: "Telepizza", priceText: "ARS 585 - ARS 2.223", badge: "2 products", image: "./img/products/telepizza.webp", link: "#",
    subProducts: [
      { id: 1261, title: "Telepizza [500-4K POINTS]", priceText: "ARS 585", badge: "En stock", image: "./img/products/telepizza.webp", description: "${descTelepizza}" },
      { id: 1262, title: "Telepizza [4K-90K POINTS]", priceText: "ARS 2.223", badge: "En stock", image: "./img/products/telepizza.webp", description: "${descTelepizza}" }
    ]
  },`;
content = content.replace(telepizzaRegex, telepizzaReplacement);


fs.writeFileSync('js/premium-data.js', content, 'utf8');
console.log("Batch 6 descriptions injected.");
