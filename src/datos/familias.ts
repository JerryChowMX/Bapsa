/**
 * Las tres familias de equipo en renta y el traslado de maquinaria.
 *
 * Brazos y tijeras ya salen del inventario real (ver maquinas.ts). Los
 * elevadores personales siguen como RANGOS TÍPICOS DE LA CATEGORÍA hasta que
 * BAPSA entregue los modelos. Ver DATOS-POR-CONFIRMAR.md.
 *
 * Cada `definicion` está escrita como "X es Y que hace Z" y va de primer
 * párrafo bajo el h1: es la frase que un motor generativo extrae y cita.
 */

export type Fila = { concepto: string; valor: string; nota?: string };

export type Familia = {
  slug: string;
  nombre: string;
  /** Nombre corto para la pestaña del filtro del catálogo. */
  etiquetaFiltro: string;
  h1: string;
  titulo: string;
  descripcion: string;
  definicion: string;
  resumen: string;
  cuandoSi: string[];
  cuandoNo: string[];
  medidas: Fila[];
  incluye: string[];
  icono: "brazo-articulado" | "plataforma-tijera" | "placa-datos" | "refacciones" | "flete";
  fotoAlt: string;
  fotoClave: string;
};

export const FAMILIAS_DATOS: Familia[] = [
  {
    slug: "brazos-articulados-electricos",
    etiquetaFiltro: "Brazos articulados",
    nombre: "Brazos articulados eléctricos",
    h1: "Renta de brazos articulados eléctricos en Ramos Arizpe y Saltillo",
    titulo: "Renta de brazos articulados eléctricos",
    descripcion:
      "Brazos articulados eléctricos en renta para interior: sin gases, con alcance sobre obstáculos y 220 kg de carga. Entrega en Ramos Arizpe y Saltillo.",
    definicion:
      "Un brazo articulado eléctrico es una plataforma de elevación con pluma de varias secciones y motor de baterías, que levanta a uno o dos operadores y les permite librar un obstáculo por encima o por un costado en lugar de rodearlo.",
    resumen:
      "Es el equipo para trabajo en interior: no emite gases de escape y libra obstáculos por encima o por un costado.",
    cuandoSi: [
      "Mantenimiento de luminarias, ductos o rociadores dentro de una nave en operación.",
      "Trabajo sobre piso terminado, epóxico o pulido: se asigna una unidad con llanta no marcante.",
      "Espacios cerrados o con poca ventilación: no emite gases y opera por debajo de 70 dBA.",
      "Alcanzar un punto que está arriba de una máquina, un rack o una banda que no se puede mover.",
    ],
    cuandoNo: [
      "Terreno sin compactar, lodo o pendiente fuerte: este equipo está hecho para piso firme.",
      "Jornadas continuas de más de un turno sin acceso a toma de carga.",
      "Alturas por encima de 16 m: el catálogo llega hasta 15.94 m con el Genie Z-45/25J DC.",
    ],
    medidas: [
      { concepto: "Altura de trabajo", valor: "14.19 – 15.94 m" },
      { concepto: "Alcance horizontal", valor: "6.25 – 7.69 m" },
      { concepto: "Carga de trabajo", valor: "220 kg", nota: "una o dos personas con su material" },
      { concepto: "Ancho de la máquina", valor: "1.50 – 1.79 m" },
      { concepto: "Tracción", valor: "Eléctrica", nota: "llanta según la unidad" },
      { concepto: "Autonomía", valor: "Un turno de trabajo", nota: "con carga completa" },
    ],
    incluye: [
      "Entrega y recolección con flete propio dentro de la zona de cobertura.",
      "Revisión de puesta en marcha en sitio antes de dejar la máquina.",
      "Respaldo por falla mecánica durante el periodo de renta.",
    ],
    icono: "brazo-articulado",
    fotoAlt:
      "Brazo articulado eléctrico de BAPSA con la canastilla elevada dentro de una nave industrial, sobre piso de concreto pulido.",
    fotoClave: "FOTO-01",
  },
  {
    slug: "plataformas-de-tijera",
    etiquetaFiltro: "Tijeras",
    nombre: "Plataformas de tijera",
    h1: "Renta de plataformas de tijera en Ramos Arizpe, Saltillo y Santa Catarina",
    titulo: "Renta de plataformas de tijera",
    descripcion:
      "Plataformas de tijera eléctricas en renta: Genie GS-3246 de 11.75 m y JLG 2630ES angosta de 9.77 m, con 220 kg de carga. Entrega el mismo día.",
    definicion:
      "Una plataforma de tijera es un equipo de elevación que sube en vertical sobre un mecanismo de aspas cruzadas y ofrece una superficie de trabajo amplia, pensada para cuando hay que subir a una o dos personas con su material y trabajar a lo largo de un tramo.",
    resumen:
      "Elevación vertical con la mayor área de trabajo por metro de altura. Para instalación y mantenimiento en nave.",
    cuandoSi: [
      "Instalación de ductos, tubería o charolas a lo largo de un tramo recto.",
      "Trabajo que requiere subir material y una o dos personas al mismo tiempo.",
      "Puntos de trabajo directamente arriba, sin obstáculos que librar.",
      "Piso firme y nivelado, dentro de nave o sobre losa.",
    ],
    cuandoNo: [
      "Cuando hay que pasar por encima o alrededor de un obstáculo: para eso está el brazo articulado.",
      "Terreno sin compactar o con desnivel: estas tijeras son eléctricas, para piso firme.",
      "Más de dos personas arriba, o más de 220 kg entre personas y material.",
      "Espacios con menos de un metro de ancho libre de paso.",
    ],
    medidas: [
      { concepto: "Altura de trabajo", valor: "9.77 – 11.75 m" },
      { concepto: "Carga de trabajo", valor: "220 kg", nota: "una o dos personas con su material" },
      { concepto: "Ancho de la máquina", valor: "0.76 – 1.15 m", nota: "la 2630ES pasa por pasillo de rack" },
      { concepto: "Extensión de plataforma", valor: "0.90 – 0.91 m", nota: "corredera al frente" },
      { concepto: "Tracción", valor: "Eléctrica", nota: "llanta según la unidad" },
    ],
    incluye: [
      "Entrega y recolección con flete propio dentro de la zona de cobertura.",
      "Revisión de puesta en marcha en sitio antes de dejar la máquina.",
      "Respaldo por falla mecánica durante el periodo de renta.",
    ],
    icono: "plataforma-tijera",
    fotoAlt:
      "Plataforma de tijera eléctrica de BAPSA elevada en el pasillo de una nave industrial, con dos operadores instalando tubería.",
    fotoClave: "FOTO-03",
  },
  {
    slug: "elevadores-personales",
    etiquetaFiltro: "Elevadores personales",
    nombre: "Elevadores personales",
    h1: "Renta de elevadores personales para almacén, oficina y comercio",
    titulo: "Renta de elevadores personales",
    descripcion:
      "Elevadores personales en renta: un operador, huella mínima y paso por puerta estándar. Para almacén, tienda y oficina en Saltillo y Ramos Arizpe.",
    definicion:
      "Un elevador personal es un equipo de elevación vertical para un solo operador, con base angosta y peso ligero, hecho para entrar por una puerta estándar y trabajar sobre piso terminado sin dañarlo.",
    resumen:
      "Un operador, huella mínima y paso por puerta de 80 cm. Para almacén, tienda y oficina.",
    cuandoSi: [
      "Cambio de luminarias o mantenimiento de plafón en oficina y comercio.",
      "Inventario y acomodo en rack alto de almacén.",
      "Espacios donde una tijera no cabe o su peso excede la carga del entrepiso.",
      "Trabajo de una sola persona con herramienta ligera.",
    ],
    cuandoNo: [
      "Trabajo que requiere más de un operador arriba.",
      "Cargas por encima de 160 kg incluyendo persona, herramienta y material.",
      "Exteriores con viento o piso irregular.",
    ],
    medidas: [
      { concepto: "Altura de trabajo", valor: "4 – 12 m", nota: "13 – 40 pies" },
      { concepto: "Capacidad", valor: "110 – 160 kg", nota: "un operador con herramienta" },
      { concepto: "Ancho de la máquina", valor: "0.75 – 0.8 m", nota: "pasa por puerta estándar" },
      { concepto: "Peso de la máquina", valor: "250 – 700 kg", nota: "apto para entrepiso y elevador de carga" },
      { concepto: "Tracción", valor: "Eléctrica o empujada a mano" },
    ],
    incluye: [
      "Entrega y recolección con flete propio dentro de la zona de cobertura.",
      "Instrucción de uso en sitio al personal que la va a operar.",
      "Respaldo por falla mecánica durante el periodo de renta.",
    ],
    icono: "plataforma-tijera",
    fotoAlt:
      "Elevador personal de mástil Genie AWP-25S con plataforma para un operador.",
    fotoClave: "FOTO-04",
  },
  {
    slug: "traslado-de-maquinaria",
    etiquetaFiltro: "Traslado",
    nombre: "Traslado de maquinaria y equipo",
    h1: "Traslado de maquinaria y equipo en Coahuila y Nuevo León",
    titulo: "Traslado de maquinaria y equipo",
    descripcion:
      "Traslado de maquinaria y equipo con camión propio en Ramos Arizpe, Saltillo, Derramadero, Arteaga y Santa Catarina, N.L. Cotización el mismo día hábil.",
    definicion:
      "Además de rentar equipo de elevación, BAPSA traslada maquinaria y equipo con camión propio: plataformas, brazos y otra maquinaria del cliente o de otro proveedor, de un patio a una obra o entre plantas.",
    resumen:
      "Camión propio para mover maquinaria y equipo, cotizado caso por caso.",
    cuandoSi: [
      "Mover un brazo articulado o una plataforma de tijera propia entre plantas u obras.",
      "Llevar a obra equipo rentado con otro proveedor que no incluye el flete.",
      "Mover maquinaria dentro del corredor Saltillo–Ramos Arizpe–Monterrey con fecha programada.",
    ],
    cuandoNo: [
      "Cuando necesita la confirmación en firme sin hablar con nadie: el traslado siempre pasa por una llamada, porque depende del equipo, el peso y la ruta.",
    ],
    medidas: [],
    incluye: [
      "Cotización el mismo día hábil con fecha confirmada.",
      "Carga y descarga con personal de BAPSA.",
      "Camión propio: la fecha no depende de un transportista externo.",
    ],
    icono: "flete",
    fotoAlt:
      "Camión plataforma de BAPSA trasladando el montacargas de un cliente dentro de una planta de acero.",
    fotoClave: "FOTO-05",
  },
];

export const porSlug = (slug: string) => FAMILIAS_DATOS.find((f) => f.slug === slug);
