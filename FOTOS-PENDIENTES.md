# Fotos del sitio

**No queda ningún hueco de foto** (23 de septiembre de 2026). La tabla de qué
foto va en cada lugar vive en `src/datos/fotos.ts`: el home, las fichas de
familia, las de máquina, las tarjetas del catálogo y las páginas de venta,
servicio y nosotros la leen de ahí.

## De dónde salen

Del material de BAPSA en `~/Desktop/Sarape Clients/BAPSA`, convertido a JPEG en
`src/fotos/`. Astro genera los anchos en AVIF y WebP al construir.

**Las 13–24 de esa carpeta no se usan.** Son las generadas (atardeceres, una
fachada «BAPSA» sobre una nave que no es la oficina real). En la reunión del 23
de septiembre la cliente pidió no usar fotos que se vean hechas con IA; la de la
tijera sobre el camión frente a esa fachada estaba en el home y se quitó.

## Lo que sigue abierto

- **Ninguna foto es del modelo exacto** de su ficha. Cada máquina lleva una
  foto de su familia con el rótulo «Foto ilustrativa». En cuanto BAPSA mande
  fotos de sus unidades (Genie Z-45/25J DC, JLG E450A, JLG n40E, Genie GS-3246
  y JLG 2630ES), se cambian en `src/datos/fotos.ts`.
- **Servicio no tiene foto del taller.** La única que lo mostraba era generada;
  hoy lleva el detalle de la articulación hidráulica de un JLG 600AJ.
- **La imagen para redes (`/og/default.jpg`) sigue sin existir.**
