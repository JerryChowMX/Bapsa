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
