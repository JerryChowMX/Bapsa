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

Requiere Node 18+ y Python 3 (las pruebas de SEO usan solo la stdlib).

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Construye a `dist/` **y corre las pruebas**. Falla el build si algo no pasa. |
| `npm run build:only` | Construye sin correr pruebas. |
| `npm run test` | Las dos baterías, contra `dist/`. |
| `npm run test:seo` | Title, description, canonical, OG, h1, JSON-LD, alt, duplicados. |
| `npm run test:enlaces` | Enlaces internos rotos, referencias `@id`, contenido en HTML crudo. |
| `npm run preview` | Sirve `dist/` localmente. |

---

## Cómo está armado

**Astro 7, salida estática.** Todo el contenido se genera en build. No hay una
sola ruta cuyo contenido principal dependa de JavaScript, y el único
JavaScript del sitio es el `<details>` nativo del menú de celular — es decir,
ninguno.

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
    familias.ts       ← las cinco familias de equipo y sus rangos
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
curl -s  https://www.bapsa.com.mx/renta | grep -i "cinco familias"
curl -sI https://bapsa.com.mx                       # 301 al dominio con www
curl -sI https://www.bapsa.com.mx/brazos-articulados-electricos.html  # 301, un solo salto
```

Y después: validar la home y una ficha en
[validator.schema.org](https://validator.schema.org) y en el
[Rich Results Test](https://search.google.com/test/rich-results).

---

## Contacto

Sarape Estudio Web · Gerardo Garza · jerry@sarapeweb.com
