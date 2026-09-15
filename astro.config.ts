import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE, NOINDEX_ROUTES } from "./src/config/seo";
import { lastmodDeRuta } from "./src/lib/lastmod";

// Decisiones de arquitectura de URL, tomadas una sola vez:
//   · Dominio canónico CON www — es el que ya tiene historial indexado.
//   · Sin barra final. `format: "file"` emite /contacto.html, que los hosts
//     estáticos sirven en /contacto sin una redirección de por medio.
export default defineConfig({
  site: SITE.url,
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "auto" },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [
    protegerPreview(),
    sitemap({
      filter: (page) => {
        const ruta = new URL(page).pathname.replace(/\.html$/, "") || "/";
        return !NOINDEX_ROUTES.some((r) => ruta === r || ruta.startsWith(r + "/"));
      },
      // changefreq y priority se ignoran en la práctica y se omiten a propósito.
      // lastmod sí pesa, y por eso sale del último commit que tocó ese
      // contenido, nunca de la fecha del build.
      serialize: (item) => {
        const ruta = new URL(item.url).pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
        return {
          ...item,
          changefreq: undefined,
          priority: undefined,
          lastmod: lastmodDeRuta(ruta)?.toISOString(),
        };
      },
    }),
  ],
});

/**
 * Protección del preview.
 *
 * Con ROBOTS_BLOQUEAR=1 el sitio emite un `_headers` de Cloudflare Pages con
 * `X-Robots-Tag: noindex, nofollow` para todas las rutas.
 *
 * Por qué además del robots.txt: un `Disallow` solo pide al crawler que no
 * entre, y una URL enlazada desde fuera puede quedar indexada igual, sin
 * contenido y con el dominio de preview. La cabecera sí saca la página del
 * índice. Un dominio `pages.dev` se indexa antes de que nadie lo note, y no
 * queremos que Google conozca a BAPSA por una versión con huecos de foto.
 *
 * En producción la variable no se define y este archivo no se genera.
 */
function protegerPreview() {
  return {
    name: "bapsa:proteger-preview",
    hooks: {
      "astro:build:done": ({ dir, logger }: { dir: URL; logger: { info: (m: string) => void } }) => {
        if (process.env.ROBOTS_BLOQUEAR !== "1") return;
        writeFileSync(
          fileURLToPath(new URL("./_headers", dir)),
          "/*\n  X-Robots-Tag: noindex, nofollow\n"
        );
        logger.info("preview protegido: _headers con X-Robots-Tag noindex");
      },
    },
  };
}
