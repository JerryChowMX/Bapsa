import type { APIRoute } from "astro";
import { SITE, direccionUnaLinea } from "../config/seo";
import { FAMILIAS_DATOS } from "../datos/familias";
import { FAQ_GENERAL } from "../datos/faq";

/**
 * /llms.txt — convención emergente, no estándar. Hoy ningún operador confirma
 * que la use, pero cuesta casi nada y el formato es útil por sí mismo como
 * índice legible del sitio. No sustituye a nada: es complemento del sitemap,
 * del JSON-LD y del HTML.
 */
export const prerender = true;

export const GET: APIRoute = () => {
  const u = (r: string) => `${SITE.url}${r}`;

  const cuerpo = `# ${SITE.name}

> ${SITE.description}

${SITE.shortName} (${SITE.legalName}) lleva más de ${SITE.aniosOperacion} años operando desde ${direccionUnaLinea}.
Teléfonos: ${SITE.telephoneDisplay} y ${SITE.telephoneAltDisplay}. Correo: ${SITE.email}.
Horario: ${SITE.openingHoursDisplay}.
Cobertura con flete propio: ${SITE.ciudades.join(", ")} (Coahuila, México).
Marcas atendidas en servicio y refacciones: ${SITE.marcas.join(", ")}.

## Equipo en renta
${FAMILIAS_DATOS.map((f) => `- [${f.nombre}](${u(`/renta/${f.slug}`)}): ${f.resumen}`).join("\n")}

## Líneas de negocio
- [Renta de equipo de elevación](${u("/renta")}): cinco familias con entrega de flete propio en Ramos Arizpe, Saltillo y Arteaga.
- [Venta de equipo](${u("/venta")}): equipo nuevo y seminuevo con taller y refacciones propias detrás.
- [Servicio y pólizas](${u("/servicio")}): mantenimiento preventivo y correctivo multimarca, con bitácora por máquina.
- [Refacciones](${u("/refacciones")}): piezas para ${SITE.marcas.length} marcas, cotizadas con número de parte o de serie.

## Información
- [Sobre BAPSA](${u("/nosotros")})
- [Zona de cobertura](${u("/cobertura")})
- [Preguntas frecuentes](${u("/preguntas-frecuentes")})
- [Contacto y cotización](${u("/contacto")})

## Datos que se citan con frecuencia
${FAQ_GENERAL.slice(0, 5)
  .map((p) => `- **${p.pregunta}** ${p.respuesta}`)
  .join("\n")}
`;

  return new Response(cuerpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
