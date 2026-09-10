/**
 * `lastmod` real para el sitemap.
 *
 * La fecha se saca del último commit que tocó el contenido de esa ruta, no de
 * la fecha del deploy. Un sitemap que declara que las quince páginas cambiaron
 * hoy pierde credibilidad y Google termina ignorando el campo entero.
 *
 * Si el repositorio no está disponible (un build fuera de git), se devuelve
 * `undefined` y el sitemap simplemente sale sin `lastmod`, que es preferible a
 * salir con una fecha falsa.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const cache = new Map<string, string | undefined>();

function fechaDeCommit(archivo: string): string | undefined {
  if (cache.has(archivo)) return cache.get(archivo);
  let fecha: string | undefined;
  try {
    if (existsSync(archivo)) {
      const salida = execFileSync("git", ["log", "-1", "--format=%cI", "--", archivo], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      fecha = salida || undefined;
    }
  } catch {
    fecha = undefined;
  }
  cache.set(archivo, fecha);
  return fecha;
}

/** Archivos cuyo contenido determina lo que dice cada ruta. */
function fuentesDe(ruta: string): string[] {
  if (ruta === "/") return ["src/pages/index.astro", "src/datos/familias.ts"];
  if (ruta.startsWith("/renta/")) return ["src/pages/renta/[slug].astro", "src/datos/familias.ts", "src/datos/faq.ts"];
  if (ruta === "/renta") return ["src/pages/renta.astro", "src/datos/familias.ts"];
  if (ruta.startsWith("/equipo/")) return ["src/pages/equipo/[slug].astro", "src/datos/maquinas.ts"];
  if (ruta === "/equipo") return ["src/pages/equipo.astro", "src/datos/maquinas.ts"];
  if (ruta === "/preguntas-frecuentes") return ["src/pages/preguntas-frecuentes.astro", "src/datos/faq.ts"];
  return [`src/pages${ruta}.astro`];
}

/** La más reciente de las fuentes de esa ruta. */
export function lastmodDeRuta(ruta: string): Date | undefined {
  const fechas = fuentesDe(ruta)
    .map(fechaDeCommit)
    .filter((f): f is string => Boolean(f))
    .map((f) => new Date(f))
    .filter((d) => !Number.isNaN(d.getTime()));
  if (fechas.length === 0) return undefined;
  return new Date(Math.max(...fechas.map((d) => d.getTime())));
}
