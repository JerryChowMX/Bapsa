/**
 * Destino del formulario de cotización.
 *
 * Mientras `ACCION` esté vacío, la solicitud sale por WhatsApp al número de
 * BAPSA (SITE.whatsapp): el formulario arma el mensaje con los datos y abre
 * la conversación, y el visitante solo tiene que darle enviar. Así no hay
 * servidor que pueda tragarse una solicitud en silencio. Si algún día se
 * conecta un servicio de formularios, basta con llenar `ACCION`.
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
