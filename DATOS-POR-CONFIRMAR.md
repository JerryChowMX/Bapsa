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

### 1.2 Razón social exacta
- **Archivo:** `src/config/seo.ts` → `SITE.legalName`
- **Valor actual:** `Brazos Articulados para Servicios en Alturas, S.A. de C.V.`
- **Origen:** directorios de terceros, no un documento de BAPSA.
- **Qué hace falta:** confirmarlo contra el acta constitutiva o el RFC.
- **Por qué importa:** `legalName` va en el JSON-LD y en el pie. Si no coincide
  con lo que BAPSA declara en otros lados, debilita la resolución de entidad,
  que es justo lo que hace que un modelo cite a BAPSA con confianza.

### 1.3 Fotografías
- Ver `FOTOS-PENDIENTES.md`. Hay **nueve** huecos rotulados en el sitio.

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

### 2.4 WhatsApp
- **Archivo:** `src/config/seo.ts` → `SITE.whatsapp` (hoy `""`)
- Sin número no se pinta ningún botón de WhatsApp. Si BAPSA tiene una línea de
  ventas por WhatsApp, es el canal de mayor conversión en este giro.

### 2.5 Condiciones comerciales de renta
- **Dónde aparece hoy:** las páginas dicen "se confirma al cotizar".
- **Qué hace falta:** plazo mínimo de renta, depósito o anticipo, qué cubre el
  seguro y qué pasa con el combustible en equipo de combustión.
- **Por qué importa:** son de las preguntas más buscadas del giro y hoy el
  sitio no las responde con un dato. Cada una que se pueda responder con una
  cifra concreta es un fragmento citable más.

### 2.6 El inventario real
- **Archivo:** `src/datos/familias.ts` → campo `medidas` de cada familia
- **Estado:** los rangos de las tablas son **rangos típicos de la categoría**,
  y así se rotulan en la página ("Estos son los rangos con los que trabaja la
  categoría, no un modelo en particular").
- **Qué hace falta:** la lista real de máquinas con marca, modelo, número
  económico, altura de trabajo, alcance horizontal, capacidad y tracción.
- **Por qué importa:** es la mejora de mayor impacto que le queda al sitio.
  Con el inventario real, cada máquina puede tener su propia página y su
  propio `Product` en el JSON-LD, y ahí es donde se gana la consulta larga
  ("renta brazo articulado 45 pies Saltillo").
- **Nota especial · maquinaria pesada:** de esta familia solo sabemos que
  existe. La página `/renta/maquinaria-pesada` está escrita de forma honesta
  —dice que la disponibilidad se confirma por teléfono— pero es la más pobre
  del sitio y se queda así hasta que haya datos.

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
