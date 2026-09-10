/**
 * Destino del formulario de cotización.
 *
 * POR CONFIRMAR antes de publicar. Mientras `ACCION` esté vacío, el
 * formulario se pinta pero no envía, y en su lugar se muestran el teléfono y
 * el correo, que es lo que de verdad usa un jefe de obra a las siete de la
 * mañana. Un formulario que traga solicitudes en silencio es peor que no
 * tenerlo.
 *
 * Opciones habituales, en orden de menor fricción:
 *   · Netlify Forms  → ACCION = "/gracias" y METODO_NETLIFY = true
 *   · Formspree      → ACCION = "https://formspree.io/f/xxxxxxx"
 *   · Endpoint propio → ACCION = "https://api.bapsa.com.mx/cotizaciones"
 */
export const FORMULARIO = {
  ACCION: "",
  METODO_NETLIFY: false,
  /** A dónde llega la solicitud. Debe ser un buzón que alguien revise a diario. */
  correoDestino: "bapsa@prodigy.net.mx",
  rutaGracias: "/gracias",
} as const;
