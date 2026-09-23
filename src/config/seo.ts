/**
 * Fuente única de verdad del sitio de BAPSA.
 *
 * Nombre, descripción, NAP (nombre-dirección-teléfono) y defaults viven aquí y
 * en ningún otro lado. La consistencia literal de estos valores entre el sitio,
 * el JSON-LD, Google Business Profile, redes y directorios es lo que permite a
 * un motor generativo resolver "quién es esta entidad" y citarla con confianza.
 * Cualquier discrepancia la diluye.
 *
 * Los campos marcados POR CONFIRMAR están documentados en DATOS-POR-CONFIRMAR.md.
 */

export const SITE = {
  name: "BAPSA Equipo de Elevación",
  shortName: "BAPSA",
  legalName: "Brazos Articulados para Servicios en Alturas, S.A. de C.V.",
  url: "https://www.bapsa.com.mx",
  locale: "es_MX",
  lang: "es-MX",

  // 146 caracteres. Idéntica en meta description del home, JSON-LD,
  // Google Business Profile y directorios. No se edita en un solo lugar.
  description:
    "Renta de brazos articulados, plataformas de tijera y elevadores personales en Ramos Arizpe, Saltillo, Arteaga y Santa Catarina, N.L. Flete propio.",

  logo: "/brand/bapsa-logo-512.png",
  ogImage: "/og/default.jpg",
  ogImageAlt:
    "Brazo articulado de BAPSA con la canastilla elevada sobre una nave industrial en Ramos Arizpe.",

  // El principal es el WhatsApp y va con su logo; las tres líneas de oficina
  // se quedan debajo. Confirmado por BAPSA (Ing. Elsa) el 23 sep 2026.
  telephone: "+528441819171",
  telephoneDisplay: "844 181 9171",
  whatsapp: "+528441819171" as string,
  oficinas: [
    { telephone: "+528444308845", display: "844 430 8845" },
    { telephone: "+528444880408", display: "844 488 0408" },
    { telephone: "+528444885943", display: "844 488 5943" },
  ],
  email: "bapsa@prodigy.net.mx",

  address: {
    street: "Blvd. Miguel Ramos Arizpe 104",
    district: "Col. La Esmeralda",
    city: "Ramos Arizpe",
    region: "Coahuila de Zaragoza",
    postalCode: "25902",
    country: "MX",
  },

  /**
   * POR CONFIRMAR. Se deja vacío a propósito: unas coordenadas aproximadas
   * ponen el pin en la cuadra equivocada, y eso hace más daño que no tenerlas.
   * Se copian tal cual del Google Business Profile de BAPSA.
   */
  geo: null as { lat: number; lng: number } | null,

  /**
   * POR CONFIRMAR. `sameAs` es lo que amarra este sitio con la entidad que ya
   * existe fuera de él (GBP, Facebook, LinkedIn, directorios del sector).
   * Es de lo que más pesa para que un modelo decida citar a BAPSA.
   */
  sameAs: [] as string[],

  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:00" },
    { days: ["Saturday"], opens: "08:30", closes: "13:00" },
  ],
  openingHoursDisplay: "Lunes a viernes 8:30–18:00 · Sábado 8:30–13:00",

  /** Años de operación. El material nuevo dice más de 20; el sitio viejo decía 15. */
  aniosOperacion: 20,

  /** Donde BAPSA entrega con flete propio, en orden de cercanía. Derramadero
   *  es de Saltillo, pero se nombra aparte porque así lo busca la gente. */
  ciudades: [
    { nombre: "Ramos Arizpe", estado: "Coahuila" },
    { nombre: "Saltillo", estado: "Coahuila" },
    { nombre: "Derramadero", estado: "Coahuila" },
    { nombre: "Arteaga", estado: "Coahuila" },
    { nombre: "Santa Catarina", estado: "Nuevo León" },
  ] as const,
  estado: "Coahuila",

  /** Marcas que atiende el área de servicio y refacciones. */
  marcas: ["Genie", "JLG", "Haulotte", "Skyjack", "Snorkel", "Toyota", "Caterpillar"] as const,
} as const;

/** Rutas que salen con `noindex, follow` y quedan fuera del sitemap. */
export const NOINDEX_ROUTES = ["/gracias"] as const;

/** Enlace de WhatsApp al número principal. */
export const urlWhatsapp = `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`;

/** "Ramos Arizpe, Saltillo, Derramadero, Arteaga y Santa Catarina, N.L." */
export const ciudadesTexto = (() => {
  const n = SITE.ciudades.map((c) => (c.estado === "Nuevo León" ? `${c.nombre}, N.L.` : c.nombre));
  return `${n.slice(0, -1).join(", ")} y ${n[n.length - 1]}`;
})();

/** Dirección en una línea, para el pie y para los directorios. */
export const direccionUnaLinea =
  `${SITE.address.street}, ${SITE.address.district}, ${SITE.address.city}, ` +
  `${SITE.address.region}, C.P. ${SITE.address.postalCode}`;

/**
 * URL absoluta y canónica de una ruta.
 *
 * Sin barra final en todo el sitio, con una sola excepción: la raíz, que
 * siempre es "/" porque una URL sin path no existe. Esa es exactamente la
 * forma que emite el sitemap, así que canonical y sitemap no pueden
 * discrepar.
 */
export function urlAbsoluta(ruta: string): string {
  const limpia = "/" + ruta.replace(/^\/+/, "").replace(/\/+$/, "");
  return SITE.url + limpia;
}
