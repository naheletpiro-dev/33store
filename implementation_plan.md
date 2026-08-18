# Implementar "Moneda de Juegos"

Crear una nueva categoría principal de productos dedicada a monedas de juegos y agregar 5 subproductos específicos.

## User Review Required
> [!IMPORTANT]
> El sistema de carrito actualmente funciona íntegramente en **ARS**. Mencionaste que cada 1000 monedas costarían **2,5 USD**. 
> ¿Preferís que convierta esos 2,5 USD a ARS (por ejemplo, a $2.600 ARS usando un cambio de $1040) para mantener todo el sitio en una sola moneda, o querés que modifique el sistema de carrito para soportar pagos/totales en dólares (USD)?

## Proposed Changes

### Imágenes Generadas (Nuevas)
Se generarán 6 imágenes con inteligencia artificial manteniendo el estilo oscuro y neón (`glassmorphism`) de la tienda:
1. `monedas_juegos_main.webp` (Categoría principal)
2. `vbucks_fortnite.webp`
3. `robux_roblox.webp`
4. `rocket_league_credits.webp`
5. `riot_points.webp`
6. `valorant_points.webp`

### Base de Datos (`js/premium-data.js`)
#### [MODIFY] `premium-data.js`
- Agregar la categoría padre: `{ id: 130, category: "Gaming", title: "Moneda de Juegos", ... }`
- Agregar los 5 subproductos.
- Cada subproducto tendrá una sola variante por defecto llamada "Monedas".
- `minQty` será configurado en `1000`.
- El precio base será configurado para que 1000 unidades resulten en el equivalente a 2.5 USD.

### Lógica de Compra (`js/producto.js`)
#### [MODIFY] `producto.js`
- Ajustar el parser de precios (`parsePriceNum`) en caso de que decidamos mostrar el texto como `USD 2.50` pero cobrar en ARS, o adaptarlo según tu respuesta a la pregunta de arriba.
- Asegurar que la matemática de la cantidad x precio no sufra problemas con valores fraccionarios muy chicos (0.0025 USD por unidad).

## Verification Plan
1. Corroborar que las imágenes se generaron y ubicaron correctamente.
2. Validar que la nueva categoría aparece en la página principal (`index.html`).
3. Entrar a cada subproducto y tipear `1000`, `2000` y `5000` para verificar que el cálculo de precio es exacto (ej: 1000 = $2.5 USD, 2000 = $5 USD).
