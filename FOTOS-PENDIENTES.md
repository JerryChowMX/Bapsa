# Fotos pendientes

El sitio tiene **quince huecos de foto**: ocho de sección y siete de máquina. Cada uno se pinta como un recuadro
rotulado con la clave, la medida y el texto alternativo que le corresponde, así
que es imposible publicar sin darse cuenta de cuál falta.

> **Nota de la sesión en que se construyó esto:** el panel de cliente de Sarape
> (`sarapeweb.com/alcance/...`) quedó fuera de alcance por la política de red
> del entorno, así que las fotos que BAPSA ya subió ahí no llegaron al
> repositorio. Bájelas del panel y colóquelas como se indica abajo.

## Cómo meter una foto

1. Guarde el archivo en `public/fotos/` con el nombre de la columna **Archivo**.
2. En el código, agregue el atributo `src` al componente `<Foto>`
   correspondiente. El componente ya obliga a `alt`, `width` y `height`.
3. Vuelva a construir: `npm run build`. La auditoría falla si alguna imagen
   queda sin `alt` o sin dimensiones.

Ejemplo, en `src/datos/familias.ts` no hace falta tocar nada más que agregar el
campo `foto` si decide centralizarlo; en las páginas sueltas:

```astro
<Foto
  src="/fotos/taller-servicio.jpg"
  alt="Técnico de BAPSA revisando el sistema hidráulico de un brazo articulado…"
  ancho={800}
  alto={600}
/>
```

## Formato

- **AVIF o WebP**, con JPG de respaldo si el host no negocia formato.
- Las de 800×600 pesan menos de **150 KB**; la del héroe, menos de **200 KB**.
- **Nada de texto, cifras ni tablas dentro de la imagen.** Un dato dentro de un
  JPG es un hueco negro para cualquier crawler: no lo lee nadie.
- Recorte a la proporción indicada antes de subir; no confíe en el CSS.

## Los ocho huecos de sección

| Clave | Dónde | Medida | Qué debe mostrar |
|---|---|---|---|
| FOTO-01 | `/renta/brazos-articulados-electricos` (héroe) | 800×600 | Brazo articulado **eléctrico** con la canastilla elevada dentro de una nave, sobre piso terminado. |
| FOTO-03 | `/renta/plataformas-de-tijera` (héroe) | 800×600 | Plataforma de tijera elevada en pasillo de nave, con operadores trabajando. |
| FOTO-04 | `/renta/elevadores-personales` (héroe) | 800×600 | Elevador personal en almacén, un operador sobre el nivel alto de un rack. |
| FOTO-05 | `/renta/maquinaria-pesada` (héroe) | 800×600 | Patio de maniobras de BAPSA con maquinaria lista para entrega. |
| FOTO-06 | `/` (sección «Por qué BAPSA») | 800×600 | Taller de servicio, un técnico dando mantenimiento a un brazo articulado. |
| FOTO-07 | `/venta` (héroe) | 800×600 | Equipo formado en el patio, listo para entrega. |
| FOTO-08 | `/servicio` (héroe) | 800×600 | Técnico revisando el sistema hidráulico dentro del taller. |
| FOTO-09 | `/nosotros` (héroe) | 800×600 | Instalaciones sobre el Boulevard Miguel Ramos Arizpe, con equipo en el patio. |

## Los siete huecos de máquina

Uno por modelo del catálogo, todos de 800×600 en la ficha correspondiente.
**Estas son las más importantes del sitio**: son las que acompañan la ficha
técnica, y una foto real de la máquina de BAPSA vale más que cualquier render
del fabricante. Si solo se pueden conseguir algunas, empiece por las tres de
arriba, que son las que más se buscan.

| Clave | Máquina | Página | Qué debe mostrar |
|---|---|---|---|
| MAQ-Z4525J | Genie Z-45/25J DC | `/equipo/genie-z-45-25j-dc` | El brazo con la cesta elevada dentro de nave. Si se ve el plumín articulado, mejor. |
| MAQ-E450A | JLG E450A | `/equipo/jlg-e450a` | El brazo trabajando, idealmente con la plataforma girada, que es su ventaja. |
| MAQ-N40E | JLG n40E | `/equipo/jlg-n40e` | Maniobrando en pasillo angosto: lo que la vende es que quepa. |
| MAQ-GS3246 | Genie GS-3246 | `/equipo/genie-gs-3246` | La tijera elevada a altura completa, con algo que dé escala. |
| MAQ-GS2646 | Genie GS-2646 | `/equipo/genie-gs-2646` | Dos operadores arriba con material: es la de más carga de su familia. |
| MAQ-GS2632 | Genie GS-2632 | `/equipo/genie-gs-2632` | Pasando por una puerta o por pasillo de rack, que es su argumento entero. |
| MAQ-GS2046 | Genie GS-2046 | `/equipo/genie-gs-2046` | La cesta cargada con material: 545 kg es su cifra. |

Si de alguna máquina hay foto de la **placa remachada del chasís** con el
número de serie legible, mándela también: se puede usar en la ficha y refuerza
justo la idea que sostiene todo el sistema visual.

## Además hacen falta

| Archivo | Medida | Para qué |
|---|---|---|
| `public/og/default.jpg` | 1200×630 | La imagen que aparece al compartir cualquier ruta en WhatsApp, Facebook o LinkedIn. Menos de 300 KB, logo lejos de los bordes. |
| `public/brand/bapsa-logo-512.png` | 512×512 | Logo cuadrado con fondo sólido para el JSON-LD y el manifest. |
| `public/brand/apple-touch-icon.png` | 180×180 | Icono al guardar el sitio en la pantalla de inicio de un iPhone. |

## Qué buscar al elegir entre las fotos del cliente

La dirección visual descartó de forma explícita **la foto de banco de imágenes
con un obrero sonriendo con casco blanco**. Sirve el material real: máquinas de
BAPSA, en obras de la región, con la canastilla arriba y gente trabajando.
Entre dos fotos, gana la que deje ver **la máquina completa contra algo que dé
escala** —una nave, una fachada, un tráiler—, porque la altura es el producto y
una foto sin referencia no la comunica.

Fotos con la placa remachada del chasís visible son especialmente valiosas: la
placa de datos es el componente firma del sistema y verla en una foto real
refuerza el resto del sitio.
