# BAPSA · Equipo de Elevación

Sitio de [BAPSA](https://www.bapsa.com.mx), renta y venta de equipo de
elevación en Ramos Arizpe, Coahuila.

Construido por [Sarape Estudio Web](https://sarapeweb.com) sobre la dirección
visual aprobada en septiembre de 2026, y preparado desde el arranque para
buscadores (SEO) y para motores generativos (GEO).

---

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # construye y corre toda la batería de pruebas
```

Requiere **Node 22.12 o superior** (lo exige Astro 7; está fijado en `.nvmrc`)
y Python 3 para las pruebas, que usan solo la librería estándar.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Construye a `dist/`. Nada más — es lo que corre cualquier plataforma de despliegue. |
| `npm run verify` | Construye **y corre las pruebas**. Es lo que se usa en local y en CI. |
| `npm run test` | Las pruebas solas, contra un `dist/` ya construido. |
| `npm run test:seo` | Title, description, canonical, OG, h1, JSON-LD, alt, duplicados. |
| `npm run test:enlaces` | Enlaces internos rotos, referencias `@id`, contenido en HTML crudo. |
| `npm run preview` | Sirve `dist/` localmente. |

---

## Cómo está armado

**Astro 7, salida estática.** Todo el contenido se genera en build. **No hay
una sola ruta cuyo contenido principal dependa de JavaScript.** El menú de
celular es un `<details>` nativo y el filtro del catálogo son radios con CSS:
ninguno de los dos ejecuta código. Lo único que se descarga es el script de
prefetch de Astro, que adelanta la siguiente página al pasar el cursor y no
pinta nada — si se quita, el sitio funciona idéntico, solo navega más lento
(`prefetch` en `astro.config.ts`).

Eso no es una preferencia estética. Los crawlers generativos —`GPTBot`,
`ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`— **no ejecutan JavaScript**:
reciben el HTML crudo y ahí termina. De ahí sale la única regla que no se
negocia en este repositorio:

> **Si el contenido no está en el HTML que llega por la red, no existe.**

Se verifica así, contra el sitio publicado:

```bash
curl -s https://www.bapsa.com.mx/renta/plataformas-de-tijera | grep -i "sube en vertical"
```

### Estructura

```
src/
  config/
    seo.ts            ← FUENTE ÚNICA DE VERDAD: marca, NAP, descripción
    navegacion.ts     ← la navegación, usada por barra, pie y migas
    formulario.ts     ← a dónde llegan las solicitudes  (POR CONFIRMAR)
  datos/
    maquinas.ts       ← EL CATÁLOGO REAL: 7 máquinas con su ficha de fabricante
    familias.ts       ← las cuatro familias de equipo y sus rangos
    faq.ts            ← preguntas frecuentes
  lib/
    schema.ts         ← constructores del grafo JSON-LD
    lastmod.ts        ← lastmod real, sacado del último commit
  layouts/Base.astro  ← el <head> completo. Ninguna página escribe metadatos a mano
  components/         ← Encabezado, PiePagina, PlacaDatos, Estado, Foto, Faq…
  styles/
    tokens.css        ← los tokens de la dirección visual, uno a uno
    base.css          ← base y componentes
  pages/              ← una ruta por archivo, más robots.txt y llms.txt generados
scripts/
  audit.py            ← auditoría SEO/GEO
  verificar.py        ← enlaces, @id, HTML crudo, imágenes
```

### La regla de `maquinas.ts`

Cada cifra de ese archivo está copiada de la ficha técnica del fabricante que
BAPSA entregó, y el campo `fuente` dice de qué documento salió. El sitio la
muestra al pie de cada ficha: en un giro donde el número es el producto, decir
de dónde sale el número es parte del producto.

**Si un dato no venía en la ficha, no va.** No se completa con un catálogo
genérico, no se estima y no se redondea de otra fuente. Cuando falta, se omite
y se anota en `DATOS-POR-CONFIRMAR.md`.

**No edite metadatos, teléfonos ni la descripción fuera de `src/config/seo.ts`.**
Ese archivo alimenta el `<head>`, el JSON-LD, el pie, el `llms.txt` y el
`sitemap`. La consistencia literal entre todos ellos es lo que permite a un
modelo resolver quién es esta entidad y citarla; una discrepancia la diluye.

---

## Decisiones tomadas

| Decisión | Valor | Por qué |
|---|---|---|
| Dominio canónico | `https://www.bapsa.com.mx` | Es el que ya tiene historial indexado. El otro se redirige con 301. |
| Barra final | Sin barra, salvo la raíz | `build.format: "file"` emite `/contacto.html`, que los hosts sirven en `/contacto` sin redirigir. |
| Bots de búsqueda de IA | Permitidos | Son los que producen la cita con enlace. Bloquearlos deja a BAPSA fuera de las respuestas generadas. |
| Bots de entrenamiento de IA | Permitidos | Decisión del cliente. No hay contenido propietario que proteger y conviene que el catálogo quede asociado a la entidad. |
| Scraping agresivo | Bloqueado | `Bytespider`, `Amazonbot`, `Meta-ExternalAgent`: se llevan el ancho de banda sin devolver nada. |
| `noindex` | Solo `/gracias` | Declarado en `NOINDEX_ROUTES`. Sale del sitemap automáticamente. |
| Equipo de combustión | Fuera del sitio | BAPSA confirmó que hoy solo renta equipo eléctrico. El sitio lo usa como argumento en vez de esconderlo. |
| Etiqueta de estado por máquina | No se usa | BAPSA no tiene de dónde alimentar «disponible / en mantenimiento / rentada», y una etiqueta que nadie actualiza miente a los pocos días. En su lugar va el bloque de contacto directo. |
| Filtro del catálogo | Radios + CSS, sin JS | Las siete tarjetas están siempre en el HTML. Un filtro con JavaScript deja la página vacía para los crawlers generativos. |
| Radio de esquina | `0` en todo | La palabra BAPSA está dibujada con esquinas en pico. Redondear la interfaz mientras la marca es angular hace que el logotipo se vea pegado encima de una plantilla. |

---

## La dirección visual, en corto

Dos colores salidos del logotipo y diez escalones de esos dos y del papel.
Ninguno se inventó. Ningún blanco puro, ningún negro puro, ningún gris.

- **Azul BAPSA `#05025E`** — manda: titulares y todo texto sobre naranja.
- **Canastilla `#F38735`** — **solo relleno**. Como texto da 2.31:1 y no se lee.
- **Señal `#A85D25`** — el mismo naranja, en versión legible (4.52:1): enlaces,
  teléfono, etiquetas.

La proporción de uso es `54 aire · 14 azul · 10 neblina · 8 chasis · 5 placa ·
4 cielo bajo · 3 reflejante · **2 canastilla**`. Ese 2 % es la decisión más
fuerte del sistema: el naranja aparece dos o tres veces por página y por eso
el ojo va directo ahí.

**Reglas que no se rompen:**

- Un solo botón relleno por pantalla. Relleno naranja actúa, contorno azul
  revisa, contorno acero sale, contorno rojo destruye.
- **Nunca** texto claro sobre canastilla; sobre naranja siempre va Azul BAPSA.
- **Nunca** Señal sobre Neblina (4.08:1): en banda gris-azul los enlaces van en azul.
- **Nunca** Riel como texto ni como borde de control: es filete de 1px y nada más.
- Sin sombras. La profundidad se hace con los tres escalones de papel.
- Iconos con `stroke-linecap: butt` y `stroke-linejoin: miter`, siempre. Si el
  trazo termina en punta redonda, no es de BAPSA.
- **Sin `box-shadow` en ningún hover.** Una tarjeta que se levanta lo hace
  subiendo un escalón de superficie y cambiando el borde a Azul BAPSA, no con
  una sombra.
- Cifras tabulares en toda tabla de alturas y capacidades.

Las tres voces: **Archivo** titula, **Public Sans** explica, **JetBrains Mono**
solo para el dato de máquina. No hay cuarta.

---

## Cómo se escribe el contenido

El sitio está redactado para ser **extraído y citado**, no solo rankeado. Si
agrega una página, respete esto:

- La primera frase responde la pregunta implícita del título. Pirámide
  invertida: la respuesta primero, el contexto después.
- Los `<h2>` se formulan como la pregunta real del usuario, no como una
  categoría. «¿Qué altura de máquina necesito?», no «Alturas».
- Párrafos autocontenidos de 40 a 80 palabras. Un fragmento que arranca con
  «como mencionamos arriba» es incitable.
- Definiciones explícitas: «X es Y que hace Z».
- Al menos un dato verificable por sección: cifra, unidad, plazo, norma.
- Tablas en `<table>` real, listas en `<ul>`. **Cero datos dentro de imágenes.**
- Una intención de búsqueda por página. Dos temas en una URL compiten y ninguno gana.

**Y lo que no se hace:** no se inventa un dato que BAPSA no haya confirmado.
Cuando falta, se omite y se anota en `DATOS-POR-CONFIRMAR.md`. Un rango
rotulado como rango es honesto; una cifra inventada es una mentira que además
se detecta.

---

## Desplegar a Cloudflare Pages

### Preview para enseñarle al cliente

Desde el dashboard (**Workers & Pages → Create → Pages → Connect to Git**):

| Campo | Valor |
|---|---|
| Repositorio | `JerryChowMX/Bapsa` |
| Rama de producción | `claude/exciting-bardeen-tqqw6h` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Variable de entorno | `ROBOTS_BLOQUEAR` = `1` |
| Variable de entorno | `NODE_VERSION` = `22.12.0` |

**No agregues un `wrangler.toml` a este repositorio.** Cuando Pages encuentra
uno, lee de ahí la configuración de build y **deja de leer la del dashboard**:
tu build command y tus variables de entorno se ignoran en silencio. El build
command no es un campo de `wrangler.toml` para Pages, así que el resultado es
que se salta la construcción y falla con `Output directory "dist" not found`.
Ya pasó una vez. Si algún día hace falta el archivo, la configuración de build
completa tiene que vivir dentro de él.

O desde la terminal, sin tocar el dashboard:

```bash
ROBOTS_BLOQUEAR=1 npm run build
npx wrangler pages deploy dist --project-name bapsa
```

**La versión de Node no es opcional.** Astro 7 exige **Node ≥ 22.12.0** y
Cloudflare Pages arranca con Node 18 si no encuentra nada que le diga otra
cosa: el build truena ahí, no en el código, y el error no lo parece. El
repositorio trae un `.nvmrc` con `22.12.0` y `engines` en el `package.json`,
que Pages respeta; la variable `NODE_VERSION` es el cinturón además del
tirante, por si el proyecto quedó creado con una imagen de build vieja.

**`npm run build` solo construye.** Las pruebas viven en `npm run verify`, que
es lo que se corre en local y en integración continua. Es a propósito: el
comando por defecto de Cloudflare, Vercel y Netlify es `npm run build`, y
colgarle ahí una batería que necesita Python convierte cualquier despliegue en
una ruleta.

**`ROBOTS_BLOQUEAR=1` no es opcional en un preview.** Hace dos cosas: saca el
`robots.txt` con `Disallow: /` y genera un `_headers` con
`X-Robots-Tag: noindex, nofollow`. La cabecera importa tanto como el
`robots.txt`: un `Disallow` solo pide al crawler que no entre, pero una URL
enlazada desde fuera puede quedar indexada igual, vacía y con el dominio
`pages.dev`. Un preview se indexa antes de que nadie lo note.

### El día que se publique de verdad

1. Quitar la variable `ROBOTS_BLOQUEAR` del proyecto y redesplegar. Verificar
   con `curl` que el `robots.txt` ya no diga `Disallow: /` y que no salga
   ninguna cabecera `X-Robots-Tag`.
2. Apuntar `www.bapsa.com.mx` al proyecto de Pages y dejar el 301 del dominio
   sin `www`.
3. Correr los siete `curl` de la sección de abajo.

---

## Antes de publicar

Lo que falta para poder publicar está en **`DATOS-POR-CONFIRMAR.md`** y
**`FOTOS-PENDIENTES.md`**. Lo bloqueante es corto: el destino del formulario,
la razón social y las nueve fotos.

En una preview o staging, construya con `ROBOTS_BLOQUEAR=1` para que el
`robots.txt` salga con `Disallow: /`. Nunca en producción.

Cinco minutos en el primer deploy que evitan semanas de invisibilidad:

```bash
curl -s  https://www.bapsa.com.mx/robots.txt        # que NO diga Disallow: /
curl -sI https://www.bapsa.com.mx                   # sin X-Robots-Tag: noindex
curl -s  https://www.bapsa.com.mx | grep -i noindex # vacío
curl -s  https://www.bapsa.com.mx/sitemap-index.xml # dominio de producción
curl -s  https://www.bapsa.com.mx/renta | grep -i "cuatro familias"
curl -sI https://bapsa.com.mx                       # 301 al dominio con www
curl -sI https://www.bapsa.com.mx/brazos-articulados-electricos.html  # 301, un solo salto
```

Y después: validar la home y una ficha en
[validator.schema.org](https://validator.schema.org) y en el
[Rich Results Test](https://search.google.com/test/rich-results).

---

## Contacto

Sarape Estudio Web · Gerardo Garza · jerry@sarapeweb.com
