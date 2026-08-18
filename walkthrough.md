# 🎮 Categoría: Moneda de Juegos

## Cambios Realizados

- **Catálogo de Juegos:** Se ha añadido exitosamente la nueva categoría padre **"Moneda de Juegos"** al catálogo principal.
- **Nuevos Productos:** Adentro de esa categoría ahora existen 5 nuevos subproductos:
  - V-Bucks (Fortnite)
  - Robux (Roblox)
  - Rocket League Points
  - Riot Points (League of Legends)
  - Valorant Points
- **Imágenes Exclusivas:** Generé imágenes temáticas 3D neon-glassmorphism para la portada del catálogo y para cada una de las 5 monedas de los juegos, y las inserté en la carpeta del proyecto.
- **Lógica de Conversión USD a ARS:** 
  - La tienda y el carrito manejan los montos internamente de forma impecable usando un factor de **1 USD = 1650 ARS**.
  - Seteamos un precio de **4,125 ARS por unidad**, lo que hace que cada vez que el usuario ingresa una base de **1000** unidades (el mínimo bloqueado), la plataforma cobre exactamente **4.125 ARS** ($2.5 USD).

## Cómo verificarlo
1. Ingresá a la página principal y abrí el catálogo **Moneda de Juegos**.
2. Elegí, por ejemplo, **V-Bucks Fortnite**.
3. Verás la caja de cantidad bloqueada en **1000**. El precio mostrará ARS 4.125 (que con el descuento de -25% por llevar más de 1000 queda en **ARS 3.093,75** en el botón).
4. Tipé una cantidad diferente, por ejemplo `2000` unidades, y el precio va a escalar de forma automática ($5 USD -> 8250 ARS, descontado: 6187,50 ARS).
