# Datos por confirmar con BAPSA

Todo lo que hay en el sitio salió de una fuente verificable. Este archivo
lista lo que **no** pudimos verificar, dónde vive cada hueco en el código, y
por qué importa. La regla que seguimos al construir: **antes que inventar un
dato, se omite**. Un teléfono equivocado, unas coordenadas en la cuadra de
al lado o un año de fundación inventado hacen más daño en SEO local y en
respuestas de IA que la ausencia del campo.

---

## 1. Bloqueantes — el sitio no debe publicarse sin esto

### 1.1 A dónde llegan las solicitudes del formulario
- **Archivo:** `src/config/formulario.ts` → `FORMULARIO.ACCION`
- **Estado:** vacío. El formulario se pinta pero el botón sale deshabilitado y
  la página muestra un aviso, para que nadie crea que envió algo que no salió.
- **Qué hace falta:** decidir el destino (Netlify Forms, Formspree o un
  endpoint propio) y un buzón que alguien de BAPSA revise a diario.
- **Por qué importa:** un formulario que traga solicitudes en silencio cuesta
  ventas y no deja rastro de que se perdieron.

### 1.2 Razón social exacta — confirmada
- **Archivo:** `src/config/seo.ts` → `SITE.legalName`
- **Valor:** `Brazos Articulados para Servicios en Alturas, S.A. de C.V.`
- **Origen:** confirmada por Sarape el 23 de septiembre de 2026, junto con la
  sede en Ramos Arizpe y el giro (renta y venta de equipo de elevación).
- **Pendiente menor:** que la puntuación («S.A. de C.V.») coincida con la del
  RFC y con Google Business Profile.
- **Por qué importa:** `legalName` va en el JSON-LD y en el pie. Si no coincide
  con lo que BAPSA declara en otros lados, debilita la resolución de entidad,
  que es justo lo que hace que un modelo cite a BAPSA con confianza.

### 1.3 Fotografías
- Ver `FOTOS-PENDIENTES.md`. Hay **dieciséis** huecos rotulados en el sitio:
  nueve de secciones y siete de máquina, uno por modelo del catálogo.

---

## 2. Importantes — el sitio funciona, pero rinde menos

### 2.1 Coordenadas del negocio
- **Archivo:** `src/config/seo.ts` → `SITE.geo` (hoy `null`)
- **Qué hace falta:** latitud y longitud copiadas **tal cual** del Google
  Business Profile de BAPSA, no de una búsqueda de la dirección.
- **Por qué se dejó vacío:** unas coordenadas aproximadas ponen el pin en la
  cuadra equivocada. Sin `geo`, Google usa la dirección postal, que es
  correcta. Con `geo` mal, contradice a su propio mapa.

### 2.2 Perfiles para `sameAs`
- **Archivo:** `src/config/seo.ts` → `SITE.sameAs` (hoy `[]`)
- **Qué hace falta:** las URL de Google Business Profile, Facebook, LinkedIn de
  empresa, y los directorios del sector donde BAPSA ya aparece.
- **Por qué importa:** `sameAs` es lo que amarra este sitio con la entidad que
  ya existe fuera de él. Es de lo que más pesa cuando un modelo decide a quién
  citar, y hoy es el campo más valioso que está vacío.

### 2.3 Año de constitución
- **Archivo:** `src/lib/schema.ts` → `foundingDate`, comentado
- **Estado:** omitido a propósito. El sitio dice "más de 20 años", que es lo
  que BAPSA sostiene; restar 20 al año en curso habría inventado una fecha.
- **Nota de dirección:** el sitio anterior decía *más de 15 años*. En todo el
  material nuevo va **más de 20 años**, que es el dato correcto y el que
  sostiene el argumento de la marca. Está en `SITE.aniosOperacion`.

### 2.4 WhatsApp — subió de prioridad
- **Archivo:** `src/config/seo.ts` → `SITE.whatsapp` (hoy `""`)
- **Por qué importa ahora:** BAPSA pidió que el cliente reciba precio y
  disponibilidad **directo**, sin intermediarios. El bloque de contacto directo
  ya está en cada ficha de máquina y en el catálogo, con el teléfono en grande;
  el botón de WhatsApp está programado y **aparece solo** en cuanto haya número,
  con el mensaje ya redactado y el modelo de la máquina precargado.
- Es el canal de mayor conversión en este giro y hoy es lo único que le falta
  al circuito que el cliente pidió.

### 2.5 Condiciones comerciales de renta
- **Dónde aparece hoy:** las páginas dicen "se confirma al cotizar".
- **Qué hace falta:** plazo mínimo de renta, depósito o anticipo, qué cubre el
  seguro y qué pasa con el combustible en equipo de combustión.
- **Por qué importa:** son de las preguntas más buscadas del giro y hoy el
  sitio no las responde con un dato. Cada una que se pueda responder con una
  cifra concreta es un fragmento citable más.

### 2.6 El inventario — resuelto a medias
**Resuelto (septiembre 2026).** BAPSA entregó las fichas técnicas de siete
máquinas y el sitio ya las publica con la cifra exacta del fabricante, cada
una con su página, su tabla completa y su `Product` en el JSON-LD:

| Modelo | Familia | Altura de trabajo | Fuente |
|---|---|---|---|
| Genie Z-45/25J DC | Brazo articulado eléctrico | 15.94 m | Ficha Genie 2025 |
| JLG E450A | Brazo articulado eléctrico | 15.72 m | Ficha JLG E450A |
| JLG n40E | Brazo articulado eléctrico angosto | 14.19 m | Ficha JLG n40E |
| Genie GS-3246 | Plataforma de tijera | 11.75 m | Folleto Genie GS-2046/2646/3246 |
| Genie GS-2646 | Plataforma de tijera | 9.96 m | Ficha Genie GS-2632 y GS-2646 E-Drive |
| Genie GS-2632 | Plataforma de tijera angosta | 9.96 m | Ficha Genie GS-2632 y GS-2646 E-Drive |
| Genie GS-2046 | Plataforma de tijera | 8.10 m | Folleto Genie GS-2046/2646/3246 |

**Lo que sigue abierto de esas siete:**

- **Cuántas unidades hay de cada modelo.** El sitio dice qué modelos renta
  BAPSA, no cuántos. Con el número económico de cada unidad se puede llegar a
  una ficha por máquina, que es el siguiente escalón.
- **GS-2046, GS-2646 y GS-3246 vienen de un folleto de familia**, no de una
  ficha por modelo. Hay que confirmar cuáles de los tres están de verdad en la
  flota; los tres están publicados asumiendo que sí.
- **Variante del GS-2646.** El folleto de familia declara 9.92 m y la ficha del
  GS-2646 E-Drive declara 9.96 m en interior. El sitio usa la ficha, que es la
  más detallada. Conviene confirmar cuál variante tiene BAPSA.

### 2.7 Las familias que siguen sin ficha
**Combustión: resuelto y retirado (10 sep 2026).** BAPSA confirmó por escrito
que «ya no manejamos equipos de combustión por ahora, solo eléctricos». La
familia entera salió del sitio: la página, la entrada del menú, sus preguntas
frecuentes y las doce menciones que había repartidas. En su lugar el sitio
afirma lo contrario y lo usa como argumento: **todo el equipo es eléctrico, y
por eso entra a una nave en operación**. Hay una pregunta frecuente que lo dice
sin rodeos, para que nadie pida una máquina que BAPSA no tiene.

BAPSA lo reconfirmó el 11 de septiembre. En esa segunda pasada salieron dos
rastros que habían quedado: la placa de `/nosotros` declaraba «Altura máxima
120 FT» —una cifra que ninguna máquina eléctrica alcanza— y la tabla de
`/refacciones` ofrecía piezas de motor de combustión. Las dos se corrigieron y
**ahora hay una guarda en las pruebas**: `scripts/verificar.py` rompe el build
si aparece «120 ft», «tracción 4×4», «motor diésel», «motor de combustión» o
«de gasolina` en cualquier página. La lista está en `FRASES_PROHIBIDAS`.

Lo que el sitio **sí** dice de combustión son dos negaciones, a propósito: una
pregunta frecuente que contesta «No, solo eléctrico» y una nota al pie del
catálogo. Sirven para que quien necesita diésel no pierda una llamada. Si
prefiere que el sitio ni lo mencione, se quitan en dos líneas.

*Si algún día vuelve la línea de combustión*, la familia se restaura desde el
historial de git — no hay que volver a escribirla.

**Siguen sin una sola máquina publicada:**

- **Elevadores personales.** Sin ficha de fabricante. La página describe la
  categoría con rangos y lo dice con esas palabras.
- **Maquinaria pesada.** Solo sabemos que existe. Es la página más pobre del
  sitio y se queda así hasta que haya datos.

Con una ficha de cada una, esas dos familias aparecerían como pestañas del
filtro del catálogo y tendrían su página por máquina, igual que las otras dos.

### 2.8 El brief del grid, punto por punto
El brief del catálogo filtrable llegó junto con el mensaje del cliente y se
implementó completo, salvo tres puntos que **contradicen algo que ya sabemos**.
Ninguno se inventó; quedan aquí para resolverse con BAPSA:

- **«Plataformas de 120 ft» y «Plataformas de 40 ft» como inventario nuevo.**
  Choca de frente con el mensaje del mismo día: no existe brazo articulado
  eléctrico de 120 pies, esa altura es forzosamente diésel. Se dejó fuera. Si
  BAPSA sí va a rentar equipo de 120 ft, vuelve la línea de combustión y hay
  que rehacer el discurso del sitio.
- **«Bailarinas» y «Torre de iluminación» como categorías.** Son categorías del
  sitio de referencia (lugon.com.mx), no de BAPSA. No hay ni una ficha ni una
  mención de que BAPSA las rente. Se dejaron fuera.
- **«Tijeras de 26 ft» como inventario nuevo.** Ya está: son la GS-2632 y la
  GS-2646, ambas de 26 pies de altura de plataforma. Publicadas.

**El campo `Año` de la tarjeta** está implementado y es opcional
(`anio` en `src/datos/maquinas.ts`), pero hoy no se pinta en ninguna tarjeta
porque BAPSA no ha dado el año de ninguna unidad. En cuanto lleguen, aparece
solo.

**Dos cosas del brief se resolvieron distinto, a propósito**, y están anotadas
en el código: el `hover` de la tarjeta **no** lleva `box-shadow` —este sistema
no tiene sombras, la profundidad se hace con los tres escalones de papel— y el
radio es **0**, no «ligeramente redondeado», porque la palabra BAPSA está
dibujada con esquinas en pico. El efecto de hover se resuelve subiendo un
escalón de superficie y cambiando el borde a Azul BAPSA.

### 2.9 Tarifas
Sigue sin haber una sola cifra de precio en el sitio. Es la pregunta más
buscada del giro. Aunque sea un rango por día y por familia —«una tijera de 10
metros va de X a Y pesos por día»—, cada cifra concreta es un fragmento
citable más, y hoy la competencia tampoco los publica.

---

## 3. Recomendado — para la fase de publicación

### 3.1 Logotipo en vectorial
El logotipo llegó como mapa de bits. Ninguna tipografía ni ningún CSS arregla
eso. Conviene redibujarlo en vectorial —una tarde de trabajo— para que se vea
limpio en pantallas grandes, en el favicon de 32 píxeles y en la rotulación de
las unidades, todo desde el mismo archivo.

Mientras tanto, el sitio usa un bloque azul con el brazo en naranja
(`public/favicon.svg` y el componente de marca en `src/components/Encabezado.astro`),
que es la misma lectura del logotipo: chasís bajo, pluma diagonal y canastilla.

**Faltan además:**
- `public/brand/bapsa-logo-512.png` — cuadrado, fondo sólido, para el JSON-LD
  y el manifest.
- `public/brand/apple-touch-icon.png` — 180×180.
- `public/og/default.jpg` — 1200×630, menos de 300 KB, con el logo lejos de los
  bordes porque WhatsApp recorta.

### 3.2 Consistencia de entidad (NAP)
El nombre, la dirección, el teléfono y la descripción tienen que ser
**idénticos, letra por letra**, en: este sitio, el JSON-LD, Google Business
Profile, Facebook, LinkedIn y los directorios del sector. La descripción
canónica está en `src/config/seo.ts` → `SITE.description` y es esta:

> Renta y venta de brazos articulados, plataformas de tijera y elevadores
> personales en Ramos Arizpe, Saltillo y Arteaga. Más de 20 años y flete propio.

Cualquier discrepancia diluye la entidad. Hoy los directorios traen "más de 15
años"; conviene corregirlos.

### 3.3 Instrumentación
- Google Search Console y Bing Webmaster Tools, verificados **por DNS** para
  que sobrevivan a un redeploy. Enviar `https://www.bapsa.com.mx/sitemap-index.xml`
  en ambos.
- IndexNow: una clave en `/{clave}.txt` y un POST al publicar. Bing alimenta
  parte de la búsqueda de ChatGPT, así que el efecto no se queda en Bing.
- Analítica con los eventos de conversión definidos desde el día uno: clic al
  teléfono, envío del formulario y clic a WhatsApp.
- Log de user-agents de bots de IA. Sin esto, el trabajo de GEO no es medible.

### 3.4 La migración del dominio
El dominio canónico es **`https://www.bapsa.com.mx`** (con `www`), que es el
que ya tiene historial indexado. Al publicar:
1. Redirect **301** de `bapsa.com.mx` a `www.bapsa.com.mx`.
2. Redirect **301** de las URL viejas con `.html` a las nuevas sin extensión
   (por ejemplo `/brazos-articulados-electricos.html` →
   `/renta/brazos-articulados-electricos`). Un solo salto, nunca cadenas.
3. Verificar en el primer deploy, con `curl`, los siete puntos de la sección
   "Antes de publicar" del `README.md`.
