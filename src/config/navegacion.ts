/** Navegación del sitio. Una sola definición: la usan el encabezado, el pie,
 *  el sitemap y las migas, así que no puede haber una página huérfana. */

export type Entrada = { nombre: string; ruta: string; resumen?: string };

/** La barra. Seis entradas y un solo relleno: "Cotizar". */
export const NAV_PRINCIPAL: Entrada[] = [
  { nombre: "Renta", ruta: "/renta" },
  { nombre: "Equipo", ruta: "/equipo" },
  { nombre: "Venta", ruta: "/venta" },
  { nombre: "Servicio", ruta: "/servicio" },
  { nombre: "Refacciones", ruta: "/refacciones" },
  { nombre: "Nosotros", ruta: "/nosotros" },
];

/** Las cuatro familias de equipo. Cada una responde una consulta distinta. */
export const FAMILIAS: Required<Entrada>[] = [
  {
    nombre: "Brazos articulados eléctricos",
    ruta: "/renta/brazos-articulados-electricos",
    resumen:
      "Para trabajo en interior sobre piso terminado: no emiten gases y no marcan el concreto.",
  },
  {
    nombre: "Plataformas de tijera",
    ruta: "/renta/plataformas-de-tijera",
    resumen:
      "Elevación vertical con área de trabajo amplia, para instalación y mantenimiento en nave.",
  },
  {
    nombre: "Elevadores personales",
    ruta: "/renta/elevadores-personales",
    resumen:
      "Un operador, huella mínima y paso por puerta estándar. Para almacén, oficina y comercio.",
  },
  {
    nombre: "Maquinaria pesada",
    ruta: "/renta/maquinaria-pesada",
    resumen:
      "Equipo de movimiento de tierra y manejo de materiales para obra civil e industrial.",
  },
];

export const NAV_PIE: { titulo: string; entradas: Entrada[] }[] = [
  {
    titulo: "Equipo en renta",
    entradas: [
      { nombre: "Catálogo completo", ruta: "/equipo" },
      ...FAMILIAS.map(({ nombre, ruta }) => ({ nombre, ruta })),
    ],
  },
  {
    titulo: "Servicios",
    entradas: [
      { nombre: "Renta de equipo", ruta: "/renta" },
      { nombre: "Venta de equipo", ruta: "/venta" },
      { nombre: "Servicio y pólizas", ruta: "/servicio" },
      { nombre: "Refacciones multimarca", ruta: "/refacciones" },
    ],
  },
  {
    titulo: "BAPSA",
    entradas: [
      { nombre: "Nosotros", ruta: "/nosotros" },
      { nombre: "Zona de cobertura", ruta: "/cobertura" },
      { nombre: "Preguntas frecuentes", ruta: "/preguntas-frecuentes" },
      { nombre: "Contacto y cotización", ruta: "/contacto" },
    ],
  },
];
