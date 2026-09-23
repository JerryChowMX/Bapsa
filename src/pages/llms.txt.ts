import type { APIRoute } from "astro";
import { SITE, direccionUnaLinea, ciudadesTexto } from "../config/seo";
import { FAMILIAS_DATOS } from "../datos/familias";
import { MAQUINAS_POR_ALTURA, MARCAS_CATALOGO } from "../datos/maquinas";
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
WhatsApp (principal): ${SITE.telephoneDisplay}. Oficina: ${SITE.oficinas.map((o) => o.display).join(", ")}. Correo: ${SITE.email}.
Horario: ${SITE.openingHoursDisplay}.
Cobertura con flete propio: ${ciudadesTexto} (México).
Marcas atendidas en servicio y refacciones: ${SITE.marcas.join(", ")}.

## Catálogo de máquinas en renta
Marcas en catálogo: ${MARCAS_CATALOGO.join(", ")}. Todo el equipo listado es eléctrico. Carga de trabajo: 220 kg en todas las máquinas (una o dos personas con su material). La llanta no marcante depende de la unidad y se confirma al cotizar.
Las demás cifras vienen de la ficha técnica de cada fabricante.

${MAQUINAS_POR_ALTURA.map(
  (m) =>
    `- [${m.marca} ${m.modelo}](${u(`/equipo/${m.slug}`)}) — ${m.tipo}. Altura de trabajo ${m.alturaTrabajo}, capacidad ${m.capacidad}, ancho ${m.ancho}, alimentación ${m.alimentacion}. ${m.resumen}`
).join("\n")}

## Familias de equipo
${FAMILIAS_DATOS.map((f) => `- [${f.nombre}](${u(`/renta/${f.slug}`)}): ${f.resumen}`).join("\n")}

## Líneas de negocio
- [Renta de equipo de elevación](${u("/renta")}): brazos articulados, plataformas de tijera y elevadores personales, por día, mes o año, con entrega de flete propio en ${ciudadesTexto}. Todo el equipo de elevación es eléctrico; BAPSA no renta equipo de combustión.
- [Catálogo completo](${u("/equipo")}): las ${MAQUINAS_POR_ALTURA.length} máquinas comparadas por altura, capacidad y ancho.
- [Traslado de maquinaria y equipo](${u("/renta/traslado-de-maquinaria")}): camión propio, cotizado caso por caso.
- [Venta de equipo](${u("/venta")}): venta bajo pedido; para uso continuo BAPSA ofrece renta anual con tarifa especial.
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
