/**
 * Las cuatro familias de equipo.
 *
 * Regla de honestidad de este archivo: las tablas son RANGOS TÍPICOS DE LA
 * CATEGORÍA, no el inventario de BAPSA, y así se rotulan en la página. El
 * inventario exacto (modelos, números económicos, alturas y tarifas) todavía
 * no está en el repositorio; en cuanto llegue, sustituye a los rangos.
 * Ver DATOS-POR-CONFIRMAR.md.
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
      "Brazos articulados eléctricos en renta para interior: sin gases, sin marcar el piso y con alcance sobre obstáculos. Entrega en Ramos Arizpe y Saltillo.",
    definicion:
      "Un brazo articulado eléctrico es una plataforma de elevación con pluma de varias secciones y motor de baterías, que levanta a uno o dos operadores y les permite librar un obstáculo por encima o por un costado en lugar de rodearlo.",
    resumen:
      "Es el equipo para trabajo en interior sobre piso terminado: no emite gases de escape y su llanta no marca el concreto.",
    cuandoSi: [
      "Mantenimiento de luminarias, ductos o rociadores dentro de una nave en operación.",
      "Trabajo sobre piso terminado, epóxico o pulido, donde una llanta neumática dejaría marca.",
      "Espacios cerrados o con poca ventilación: no emite gases y opera por debajo de 70 dBA.",
      "Alcanzar un punto que está arriba de una máquina, un rack o una banda que no se puede mover.",
    ],
    cuandoNo: [
      "Terreno sin compactar, lodo o pendiente fuerte: este equipo está hecho para piso firme.",
      "Jornadas continuas de más de un turno sin acceso a toma de carga.",
      "Alturas por encima de 16 m: el catálogo llega hasta 15.94 m con el Genie Z-45/25J DC.",
    ],
    medidas: [
      { concepto: "Altura de trabajo", valor: "11 – 20 m", nota: "36 – 66 pies" },
      { concepto: "Alcance horizontal", valor: "5 – 11 m" },
      { concepto: "Capacidad de canastilla", valor: "200 – 230 kg", nota: "dos operadores con herramienta" },
      { concepto: "Ancho de la máquina", valor: "1.2 – 1.5 m" },
      { concepto: "Tracción", valor: "Eléctrica", nota: "llanta no marcante" },
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
    h1: "Renta de plataformas de tijera en Ramos Arizpe, Saltillo y Arteaga",
    titulo: "Renta de plataformas de tijera",
    descripcion:
      "Plataformas de tijera eléctricas y de terreno irregular en renta, con área de trabajo amplia para instalación y mantenimiento en nave. Entrega el mismo día.",
    definicion:
      "Una plataforma de tijera es un equipo de elevación que sube en vertical sobre un mecanismo de aspas cruzadas y ofrece una superficie de trabajo amplia, pensada para cuando hay que subir a dos o tres personas con material y trabajar a lo largo de un tramo.",
    resumen:
      "Elevación vertical con la mayor área de trabajo por metro de altura. Para instalación y mantenimiento en nave.",
    cuandoSi: [
      "Instalación de ductos, tubería o charolas a lo largo de un tramo recto.",
      "Trabajo que requiere subir material y dos o tres personas al mismo tiempo.",
      "Puntos de trabajo directamente arriba, sin obstáculos que librar.",
      "Piso firme y nivelado, dentro de nave o sobre losa.",
    ],
    cuandoNo: [
      "Cuando hay que pasar por encima o alrededor de un obstáculo: para eso está el brazo articulado.",
      "Terreno con desnivel mayor al que tolera el modelo sin estabilizadores.",
      "Espacios con menos de un metro de ancho libre de paso.",
    ],
    medidas: [
      { concepto: "Altura de trabajo · eléctrica", valor: "6 – 14 m", nota: "20 – 46 pies" },
      { concepto: "Altura de trabajo · terreno irregular", valor: "10 – 18 m" },
      { concepto: "Capacidad · eléctrica", valor: "230 – 450 kg" },
      { concepto: "Capacidad · terreno irregular", valor: "450 – 680 kg" },
      { concepto: "Ancho de la máquina", valor: "0.8 – 1.8 m", nota: "las angostas pasan por pasillo de rack" },
      { concepto: "Extensión de plataforma", valor: "0.9 – 1.5 m", nota: "corredera al frente" },
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
      "Elevador personal de BAPSA en el pasillo de un almacén, con un operador trabajando sobre el nivel alto de un rack.",
    fotoClave: "FOTO-04",
  },
  {
    slug: "maquinaria-pesada",
    etiquetaFiltro: "Maquinaria pesada",
    nombre: "Maquinaria pesada",
    h1: "Renta de maquinaria ligera y pesada en Coahuila",
    titulo: "Renta de maquinaria ligera y pesada",
    descripcion:
      "Maquinaria ligera y pesada en renta para obra civil e industrial en Ramos Arizpe, Saltillo y Arteaga. Disponibilidad confirmada por teléfono el mismo día.",
    definicion:
      "Además del equipo de elevación, BAPSA renta maquinaria ligera y pesada para obra civil e industrial. Esta línea se cotiza y se confirma caso por caso, porque la disponibilidad depende del equipo que esté libre en la fecha que usted necesita.",
    resumen:
      "Equipo para obra civil e industrial, cotizado y confirmado caso por caso.",
    cuandoSi: [
      "Movimiento de tierra, nivelación y preparación de terreno.",
      "Manejo de materiales dentro de planta o patio de maniobras.",
      "Obra donde conviene un solo proveedor para elevación y para el resto del equipo.",
    ],
    cuandoNo: [
      "Cuando necesita la confirmación en firme sin hablar con nadie: esta línea siempre pasa por una llamada.",
    ],
    medidas: [],
    incluye: [
      "Cotización el mismo día hábil con disponibilidad confirmada.",
      "Flete propio dentro de la zona de cobertura.",
      "Respaldo de servicio durante el periodo de renta.",
    ],
    icono: "refacciones",
    fotoAlt:
      "Patio de maniobras de BAPSA en Ramos Arizpe con maquinaria lista para entrega.",
    fotoClave: "FOTO-05",
  },
];

export const porSlug = (slug: string) => FAMILIAS_DATOS.find((f) => f.slug === slug);
