const fs = require('fs');
const dataFile = 'js/premium-data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const socialData = {
  1231: {
    description: 'Servicios de Crecimiento en Instagram\\nInteracciones Premium de Instagram para perfiles, publicaciones, Reels y videos con procesamiento rápido y automatizado.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n• Elige entre visualizaciones, me gusta y seguidores.\\n• Cantidades flexibles con límites mínimos y máximos claros.\\n• Inicio rápido y alta capacidad de entrega.\\n\\nCALIDAD Y ENTREGA\\n• Los servicios son seleccionados por su gran valor, estabilidad y rendimiento confiable.\\n• Los pedidos se envían automáticamente después del pago.\\n• Se requiere un enlace público válido de Instagram.\\n• Mantén el perfil, publicación, Reel o video público hasta que se complete la entrega.\\n\\nSOPORTE\\n• Soporte disponible para problemas relacionados con el pedido.',
    variants: [{name: 'Visualizaciones', priceText: 'ARS 1.040', desc: 'Reels y videos · Sin caídas'}, {name: 'Me Gusta', priceText: 'ARS 1.040', desc: 'Cuentas reales · Baja caída'}, {name: 'Seguidores', priceText: 'ARS 1.040', desc: 'Cuentas con publicaciones · Sin caídas'}]
  },
  1232: {
    description: 'Servicios de Crecimiento en TikTok\\nInteracciones de alta calidad para videos y perfiles de TikTok, procesadas automáticamente después del pago.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n• Elige entre visualizaciones de video, me gusta y seguidores.\\n• Inicio rápido con velocidades de entrega escalables.\\n• Cuentas reales o de alta calidad donde se indique.\\n\\nCALIDAD Y ENTREGA\\n• Seleccionados por su confiabilidad, velocidad y valor competitivo.\\n• Ingresa el enlace público correcto del video o perfil de TikTok.\\n• Mantén el contenido y la cuenta públicos durante la entrega.\\n• No realices otro pedido para el mismo enlace hasta que se complete el primero.\\n\\nSOPORTE\\n• Soporte disponible para problemas funcionales del pedido.',
    variants: [{name: 'Visualizaciones', priceText: 'ARS 1.040', desc: 'Inicio rápido · Baja caída · Hasta 10M/día'}, {name: 'Me Gusta', priceText: 'ARS 1.040', desc: 'Cuentas de alta calidad · Inicio instantáneo'}, {name: 'Seguidores', priceText: 'ARS 1.040', desc: 'Cuentas reales · Caída muy baja'}]
  },
  1233: {
    description: 'Servicios de Crecimiento en X / Twitter\\nInteracciones profesionales para perfiles, publicaciones y videos de X con procesamiento automático rápido.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n• Elige entre visualizaciones, me gusta y seguidores.\\n• Compatible con publicaciones y contenido de video donde se indique.\\n• Se utilizan perfiles reales o de alta calidad para los servicios de seguidores y me gusta.\\n\\nCALIDAD Y ENTREGA\\n• Seleccionados por su velocidad, estabilidad y gran valor.\\n• Ingresa la URL pública correcta de la publicación, video o perfil.\\n• Mantén la cuenta y el contenido públicos hasta su finalización.\\n• Evita cambiar nombres de usuario o eliminar contenido durante la entrega.\\n\\nSOPORTE\\n• Soporte disponible para problemas funcionales del pedido.',
    variants: [{name: 'Visualizaciones', priceText: 'ARS 1.300', desc: 'Publicaciones y videos · Inicio instantáneo'}, {name: 'Me Gusta', priceText: 'ARS 1.300', desc: 'Cuentas de alta calidad · Baja caída'}, {name: 'Seguidores', priceText: 'ARS 1.300', desc: 'Perfiles reales · Baja caída'}]
  },
  1234: {
    description: 'Servicios de Crecimiento en Facebook\\nInteracciones de alta calidad en Facebook para perfiles, páginas y Reels con procesamiento automático.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n• Elige entre visualizaciones de Reels y seguidores.\\n• Compatible con perfiles y páginas de Facebook donde se indique.\\n• Cantidades flexibles para diferentes tamaños de campaña.\\n\\nCALIDAD Y ENTREGA\\n• Seleccionados por su confiabilidad, velocidad y precios competitivos.\\n• Ingresa la URL pública correcta del perfil, página o Reel.\\n• Mantén el destino público durante la entrega.\\n• No elimines ni restrinjas el contenido antes de su finalización.\\n\\nSOPORTE\\n• Soporte disponible para problemas funcionales del pedido.',
    variants: [{name: 'Visualizaciones de Reels', priceText: 'ARS 1.040', desc: 'Alta calidad · Entrega rápida'}, {name: 'Seguidores', priceText: 'ARS 1.040', desc: 'Perfiles y páginas · Cuentas de alta calidad'}]
  },
  1235: {
    description: 'Servicios de Crecimiento en YouTube\\nInteracciones confiables en YouTube para videos, Shorts y canales con procesamiento automático de pedidos.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n• Elige entre visualizaciones, me gusta y suscriptores.\\n• Adecuado para videos, Shorts y crecimiento de canales.\\n• Cantidades flexibles para campañas pequeñas y grandes.\\n\\nCALIDAD Y ENTREGA\\n• Seleccionados por su rendimiento estable y precios competitivos.\\n• Ingresa la URL pública correcta del video, Short o canal.\\n• Mantén el contenido público y no cambies la URL durante la entrega.\\n• La velocidad de entrega puede variar según el tamaño del pedido y la actividad de la plataforma.\\n\\nSOPORTE\\n• Soporte disponible para problemas relacionados con el pedido.',
    variants: [{name: 'Visualizaciones', priceText: 'ARS 1.560', desc: 'Videos y Shorts · Sin caídas'}, {name: 'Me Gusta', priceText: 'ARS 1.560', desc: 'Me gusta de alta calidad'}, {name: 'Suscriptores', priceText: 'ARS 7.800', desc: 'Sin caídas · Inicio instantáneo'}]
  },
  1236: {
    description: 'Servicios de Crecimiento en Telegram\\nInteracciones rápidas en Telegram para canales, grupos y publicaciones con entrega automática.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n• Elige entre miembros del canal o grupo y visualizaciones de publicaciones.\\n• Inicio rápido y alta capacidad de entrega.\\n• Los servicios de visualización están diseñados para la última publicación elegible.\\n\\nCALIDAD Y ENTREGA\\n• Seleccionados por su rendimiento confiable y valor competitivo.\\n• Ingresa un enlace público válido del canal, grupo o publicación de Telegram.\\n• Mantén el destino accesible hasta que se complete la entrega.\\n• Los enlaces de invitación privados o vencidos pueden impedir la entrega.\\n\\nSOPORTE\\n• Soporte disponible para problemas relacionados con el pedido.',
    variants: [{name: 'Miembros', priceText: 'ARS 1.040', desc: 'Miembros sin caída · Inicio instantáneo'}, {name: 'Visualizaciones', priceText: 'ARS 1.040', desc: 'Solo última publicación · Inicio súper rápido'}]
  },
  1237: {
    description: 'Servicios de Crecimiento en Spotify\\nPromoción Premium en Spotify para artistas, canciones, listas de reproducción, álbumes y perfiles de usuario.\\n\\nCARACTERÍSTICAS DEL SERVICIO\\n• Elige entre seguidores y reproducciones premium de EE. UU.\\n• Admite artistas, usuarios, listas, canciones y álbumes elegibles.\\n• Inicio rápido con capacidad de entrega escalable.\\n\\nCALIDAD Y ENTREGA\\n• Seleccionados por su rendimiento estable y gran valor.\\n• Ingresa la URL pública exacta de Spotify para el destino seleccionado.\\n• Mantén la canción, artista, lista de reproducción, álbum o perfil disponible durante la entrega.\\n• La velocidad de entrega puede variar según el tamaño de la campaña.\\n\\nSOPORTE\\n• Soporte disponible para problemas relacionados con el pedido.',
    variants: [{name: 'Seguidores', priceText: 'ARS 1.300', desc: 'Artistas, usuarios y listas de reproducción'}, {name: 'Reproducciones USA', priceText: 'ARS 1.300', desc: 'Reproducciones premium de EE. UU. · Canciones, artistas, listas y álbumes'}]
  }
};

for (const id in socialData) {
  const productData = socialData[id];
  const regex = new RegExp(`({ id: ${id}.*?)}`, 'g');
  content = content.replace(regex, (match, p1) => {
    // Remove existing description and variants to avoid duplication
    let cleaned = match.replace(/, description:.*?variants:.*?\] }/g, ' }');
    // Re-add the Spanish ones
    return cleaned.replace(/ }$/, `, description: ${JSON.stringify(productData.description)}, variants: ${JSON.stringify(productData.variants)} }`);
  });
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Updated premium-data.js with SPANISH descriptions and variants.');
