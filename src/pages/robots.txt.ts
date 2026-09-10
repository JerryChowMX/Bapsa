import type { APIRoute } from "astro";
import { SITE, NOINDEX_ROUTES } from "../config/seo";

/**
 * robots.txt generado, nunca estático: así el `Disallow: /` de un preview no
 * puede llegar a producción por descuido, que es el error más caro de esta capa.
 *
 * Decisión sobre bots de IA, tomada con el cliente (septiembre 2026):
 * se permiten TODOS, los de búsqueda en vivo y también los de entrenamiento.
 * BAPSA no tiene contenido propietario que proteger y sí le conviene que su
 * catálogo, alturas y cobertura queden asociados a la entidad dentro de los
 * modelos. Los de scraping agresivo sin contrapartida sí se bloquean.
 *
 * En una preview o staging: exportar ROBOTS_BLOQUEAR=1 en el entorno de build.
 */
export const prerender = true;

export const GET: APIRoute = () => {
  const bloquear = process.env.ROBOTS_BLOQUEAR === "1";

  const cuerpo = bloquear
    ? [
        "# Entorno de preview — fuera del índice a propósito.",
        "User-agent: *",
        "Disallow: /",
        "",
      ].join("\n")
    : [
        "# BAPSA · Equipo de Elevación — https://www.bapsa.com.mx",
        "",
        "User-agent: *",
        "Allow: /",
        ...NOINDEX_ROUTES.map((r) => `Disallow: ${r}`),
        "Disallow: /*?utm_",
        "",
        "# Búsqueda generativa: permitida a propósito. Son los bots que",
        "# consultan el sitio en el momento en que alguien pregunta y los que",
        "# producen la cita con enlace.",
        "User-agent: OAI-SearchBot",
        "Allow: /",
        "User-agent: ChatGPT-User",
        "Allow: /",
        "User-agent: Claude-SearchBot",
        "Allow: /",
        "User-agent: Claude-User",
        "Allow: /",
        "User-agent: PerplexityBot",
        "Allow: /",
        "User-agent: Perplexity-User",
        "Allow: /",
        "User-agent: Applebot",
        "Allow: /",
        "",
        "# Entrenamiento: permitido por decisión del cliente.",
        "User-agent: GPTBot",
        "Allow: /",
        "User-agent: ClaudeBot",
        "Allow: /",
        "User-agent: Google-Extended",
        "Allow: /",
        "User-agent: Applebot-Extended",
        "Allow: /",
        "User-agent: CCBot",
        "Allow: /",
        "",
        "# Scraping sin contrapartida.",
        "User-agent: Bytespider",
        "Disallow: /",
        "User-agent: Amazonbot",
        "Disallow: /",
        "User-agent: Meta-ExternalAgent",
        "Disallow: /",
        "",
        `Sitemap: ${SITE.url}/sitemap-index.xml`,
        "",
      ].join("\n");

  return new Response(cuerpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
