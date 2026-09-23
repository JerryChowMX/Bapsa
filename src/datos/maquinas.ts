/**
 * El equipo real de BAPSA.
 *
 * Cada cifra de este archivo está copiada de la ficha técnica del fabricante
 * que BAPSA entregó, no de un catálogo genérico ni de una estimación. La
 * `fuente` de cada máquina dice de qué documento salió, y el sitio la muestra
 * al pie de la tabla: en un giro donde el número es el producto, decir de
 * dónde sale el número es parte del producto.
 *
 * Si un dato no venía en la ficha, no está aquí. No se completó ninguno.
 *
 * Dos excepciones, ambas por instrucción de BAPSA (reunión del 23 de
 * septiembre de 2026):
 *   · La carga: en todas las máquinas BAPSA trabaja con 220 kg entre personas,
 *     herramienta y material, y lo recomendado es una o dos personas. Es menos
 *     de lo que permite el fabricante, y es lo que se publica.
 *   · Las llantas: no todas las unidades traen llanta no marcante, así que el
 *     sitio no lo promete en ninguna. Se confirma por unidad al cotizar.
 */

export type FilaEspec = { concepto: string; valor: string };
export type GrupoEspec = { grupo: string; filas: FilaEspec[] };

export type Maquina = {
  slug: string;
  marca: "Genie" | "JLG";
  modelo: string;
  familia: string;
  tipo: string;

  titulo: string;
  descripcion: string;
  h1: string;

  /** Abre la página. Es la frase que un motor generativo extrae y cita. */
  definicion: string;
  resumen: string;
  /** Para qué la pide la gente, en su lenguaje. */
  paraQue: string[];

  /** Cifras de comparación. Se usan en la tabla del catálogo y en la placa. */
  alturaTrabajo: string;
  alturaTrabajoM: number;
  capacidad: string;
  ancho: string;
  alimentacion: string;
  /** Año de la unidad. Opcional: BAPSA todavía no lo entregó, así que no se
   *  pinta en ninguna tarjeta. Ver DATOS-POR-CONFIRMAR.md. */
  anio?: string;

  especificaciones: GrupoEspec[];
  fuente: string;
  fotoAlt: string;
  fotoClave: string;
};

export const MAQUINAS: Maquina[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "genie-z-45-25j-dc",
    marca: "Genie",
    modelo: "Z-45/25J DC",
    familia: "brazos-articulados-electricos",
    tipo: "Brazo articulado eléctrico",
    titulo: "Renta de brazo articulado Genie Z-45/25J DC",
    descripcion:
      "Brazo articulado eléctrico Genie Z-45/25J DC en renta: 15.94 m de altura de trabajo, 220 kg y voladizo posterior cero. Entrega en Ramos Arizpe y Saltillo.",
    h1: "Renta de brazo articulado eléctrico Genie Z-45/25J DC",
    definicion:
      "El Genie Z-45/25J DC es un brazo articulado eléctrico de 15.94 m de altura de trabajo y 7.65 m de alcance horizontal, con voladizo posterior cero: la torreta no sobresale al girar, así que puede trabajar pegado a una pared o entre dos filas de rack sin necesidad de acordonar por detrás.",
    resumen:
      "La máquina más alta del catálogo: 15.94 m, eléctrica y con voladizo posterior cero.",
    paraQue: [
      "Mantenimiento de luminarias, ductos y rociadores en nave alta, con la máquina trabajando entre estructura.",
      "Puntos de trabajo tapados por una máquina, un rack o una banda: el plumín de 1.52 m con rotación vertical de 135° entra donde no entra una tijera.",
      "Trabajo pegado a pared o a fachada, gracias al voladizo posterior cero.",
      "Nave en operación: es eléctrica y trabaja por debajo de 70 dBA de ruido.",
    ],
    alturaTrabajo: "15.94 m",
    alturaTrabajoM: 15.94,
    capacidad: "220 kg",
    ancho: "1.79 m",
    alimentacion: "48 V DC",
    especificaciones: [
      {
        grupo: "Dimensiones",
        filas: [
          { concepto: "Altura máxima de trabajo", valor: "15.94 m" },
          { concepto: "Altura máxima de la cesta", valor: "13.94 m" },
          { concepto: "Alcance horizontal máximo", valor: "7.65 m" },
          { concepto: "Altura de articulación máxima", valor: "7.24 m" },
          { concepto: "Longitud de la cesta", valor: "0.76 m" },
          { concepto: "Anchura de la cesta", valor: "1.83 m" },
          { concepto: "Altura replegada", valor: "2.00 m" },
          { concepto: "Longitud replegada", valor: "6.83 m" },
          { concepto: "Anchura", valor: "1.79 m" },
          { concepto: "Distancia entre ejes", valor: "2.03 m" },
          { concepto: "Altura libre sobre el suelo", valor: "0.24 m" },
        ],
      },
      {
        grupo: "Productividad",
        filas: [
          { concepto: "Carga de trabajo BAPSA", valor: "220 kg" },
          { concepto: "Personas a bordo", valor: "1 o 2, con su material" },
          { concepto: "Rotación de cesta", valor: "160°" },
          { concepto: "Longitud de plumín", valor: "1.52 m" },
          { concepto: "Rotación vertical del plumín", valor: "135°" },
          { concepto: "Rotación de la torreta", valor: "355°" },
          { concepto: "Voladizo posterior de torreta", valor: "0 cm" },
          { concepto: "Velocidad de desplazamiento replegada", valor: "4.8 km/h" },
          { concepto: "Velocidad de desplazamiento elevada", valor: "1.0 km/h" },
          { concepto: "Pendiente superable replegada", valor: "30 %" },
          { concepto: "Radio de giro interior / exterior", valor: "1.8 m / 4.27 m" },
          { concepto: "Neumáticos sólidos", valor: "0.23 × 0.37 m" },
        ],
      },
      {
        grupo: "Alimentación",
        filas: [
          { concepto: "Alimentación", valor: "48 V DC (8 × 6 V 350 Ah)" },
          { concepto: "Unidad de alimentación auxiliar", valor: "24 V DC" },
          { concepto: "Capacidad del depósito hidráulico", valor: "30.3 L" },
        ],
      },
      {
        grupo: "Peso, ruido y vibración",
        filas: [
          { concepto: "Peso", valor: "7,400 kg" },
          { concepto: "Presión sobre el suelo", valor: "15.08 kPa" },
          { concepto: "Nivel de presión sonora (suelo y cesta)", valor: "< 70 dBA" },
          { concepto: "Vibraciones", valor: "2.5 m/s²" },
        ],
      },
    ],
    fuente: "Genie · Z-45/25J DC, especificaciones técnicas 2025",
    fotoAlt:
      "Brazo articulado eléctrico Genie Z-45/25J DC de BAPSA con la cesta elevada dentro de una nave industrial.",
    fotoClave: "MAQ-Z4525J",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "jlg-e450a",
    marca: "JLG",
    modelo: "E450A",
    familia: "brazos-articulados-electricos",
    tipo: "Brazo articulado eléctrico",
    titulo: "Renta de brazo articulado JLG E450A",
    descripcion:
      "Brazo articulado eléctrico JLG E450A en renta: 15.72 m de altura de trabajo, 220 kg, giro de cola cero y chasis de 1.75 m. Entrega en Ramos Arizpe y Saltillo.",
    h1: "Renta de brazo articulado eléctrico JLG E450A",
    definicion:
      "El JLG E450A es un brazo articulado eléctrico de 15.72 m de altura de trabajo y 7.69 m de alcance, con giro de cola cero y plataforma que rota 180°: se puede reorientar el trabajo sin mover la máquina de sitio, que es lo que hace la diferencia en un pasillo angosto.",
    resumen:
      "15.72 m de altura, giro de cola cero y plataforma giratoria de 180°. Chasis estrecho de 1.75 m.",
    paraQue: [
      "Trabajo en pasillo angosto donde no hay espacio para reposicionar la máquina: la plataforma gira 180° sola.",
      "Naves en operación: es eléctrica, sin gases de escape dentro de la nave.",
      "Puntos altos con obstáculo de por medio, con 7.49 m de altura de articulación para librar por encima.",
      "Obra donde importa la maniobra: 0.61 m de radio de giro interno y giro de cola cero.",
    ],
    alturaTrabajo: "15.72 m",
    alturaTrabajoM: 15.72,
    capacidad: "220 kg",
    ancho: "1.75 m",
    alimentacion: "48 V CC",
    especificaciones: [
      {
        grupo: "Prestaciones",
        filas: [
          { concepto: "Altura de trabajo", valor: "15.72 m" },
          { concepto: "Alcance de trabajo", valor: "7.69 m" },
          { concepto: "Altura de articulación", valor: "7.49 m" },
          { concepto: "Rotación (no continua)", valor: "360°" },
          { concepto: "Carga de trabajo BAPSA", valor: "220 kg" },
          { concepto: "Personas a bordo", valor: "1 o 2, con su material" },
          { concepto: "Giro de plataforma (hidráulico)", valor: "180°" },
        ],
      },
      {
        grupo: "Dimensiones",
        filas: [
          { concepto: "Tamaño de la plataforma", valor: "0.76 × 1.52 m" },
          { concepto: "Anchura total", valor: "1.75 m" },
          { concepto: "Giro de cola en posición de trabajo", valor: "Cero" },
          { concepto: "Altura recogida", valor: "1.99 m" },
          { concepto: "Longitud recogida", valor: "5.82 m" },
          { concepto: "Distancia entre ejes", valor: "2.01 m" },
          { concepto: "Distancia al suelo", valor: "0.20 m" },
        ],
      },
      {
        grupo: "Desplazamiento y peso",
        filas: [
          { concepto: "Peso de la máquina", valor: "5,940 kg" },
          { concepto: "Máxima presión sobre el suelo", valor: "4.5 kg/cm²" },
          { concepto: "Velocidad de traslación", valor: "5.2 km/h" },
          { concepto: "Pendiente superable", valor: "30 %" },
          { concepto: "Radio de giro interno / externo", valor: "0.61 m / 3.15 m" },
        ],
      },
      {
        grupo: "Alimentación y ruedas",
        filas: [
          { concepto: "Sistema eléctrico", valor: "48 V CC" },
          { concepto: "Baterías de ciclo prolongado", valor: "8 × 6 V 370 Ah" },
          { concepto: "Motores de tracción", valor: "Doble tracción CA" },
          { concepto: "Motor hidráulico", valor: "Imán permanente" },
          { concepto: "Ruedas", valor: "240/55-17.5 rellenas de espuma" },
        ],
      },
    ],
    fuente: "JLG · Modelo E450A, plataformas elevadoras articuladas",
    fotoAlt:
      "Brazo articulado eléctrico JLG E450A de BAPSA trabajando dentro de una nave, con la plataforma girada.",
    fotoClave: "MAQ-E450A",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "jlg-n40e",
    marca: "JLG",
    modelo: "n40E",
    familia: "brazos-articulados-electricos",
    tipo: "Brazo articulado eléctrico angosto",
    titulo: "Renta de brazo articulado angosto JLG n40E",
    descripcion:
      "Brazo articulado eléctrico JLG n40E en renta: 14.19 m de altura, 1.50 m de ancho y 0.13 m de giro de cola. El más angosto del catálogo de BAPSA.",
    h1: "Renta de brazo articulado eléctrico angosto JLG n40E",
    definicion:
      "El JLG n40E es un brazo articulado eléctrico angosto de 14.19 m de altura de trabajo y apenas 1.50 m de ancho, con 0.13 m de giro de cola. Es el que entra donde no cabe un brazo estándar: pasillos entre rack, puertas de nave y espacios donde ya hay maquinaria instalada.",
    resumen:
      "El más angosto: 1.50 m de ancho y 0.13 m de giro de cola, con 14.19 m de altura.",
    paraQue: [
      "Pasillos entre rack y espacios donde un brazo de 1.75 m de ancho ya no pasa.",
      "Alcanzar por encima y por un costado: 6.25 m de alcance horizontal a 6.10 m de altura.",
      "Naves con maquinaria instalada, donde el giro de cola de 0.13 m evita tener que acordonar por detrás.",
      "Trabajo de precisión: velocidades proporcionales de traslación y de pluma.",
    ],
    alturaTrabajo: "14.19 m",
    alturaTrabajoM: 14.19,
    capacidad: "220 kg",
    ancho: "1.50 m",
    alimentacion: "48 V CC",
    especificaciones: [
      {
        grupo: "Prestaciones",
        filas: [
          { concepto: "Altura de trabajo", valor: "14.19 m" },
          { concepto: "Altura de plataforma", valor: "12.19 m" },
          { concepto: "Carga de trabajo BAPSA", valor: "220 kg" },
          { concepto: "Personas a bordo", valor: "1 o 2, con su material" },
          { concepto: "Alcance horizontal por encima y por un costado", valor: "6.25 m a 6.10 m de altura" },
        ],
      },
      {
        grupo: "Dimensiones",
        filas: [
          { concepto: "Tamaño de la plataforma", valor: "0.76 × 1.22 m" },
          { concepto: "Ancho", valor: "1.50 m" },
          { concepto: "Giro de cola", valor: "0.13 m" },
          { concepto: "Longitud replegada", valor: "5.28 m" },
          { concepto: "Altura replegada", valor: "2.0 m" },
          { concepto: "Altura libre al suelo", valor: "100 mm" },
        ],
      },
      {
        grupo: "Desplazamiento y peso",
        filas: [
          { concepto: "Peso", valor: "5,366 kg" },
          { concepto: "Velocidad de traslación", valor: "4.0 km/h" },
          { concepto: "Pendiente superable", valor: "25 %" },
        ],
      },
      {
        grupo: "Alimentación",
        filas: [
          { concepto: "Fuente de alimentación", valor: "48 V CC" },
          { concepto: "Control", valor: "Velocidades proporcionales de traslación y de pluma" },
        ],
      },
    ],
    fuente: "JLG · n40E Electric Z Boom, ficha de especificaciones",
    fotoAlt:
      "Brazo articulado eléctrico angosto JLG n40E de BAPSA maniobrando en el pasillo de un almacén con rack alto.",
    fotoClave: "MAQ-N40E",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "genie-gs-3246",
    marca: "Genie",
    modelo: "GS-3246",
    familia: "plataformas-de-tijera",
    tipo: "Plataforma de tijera eléctrica",
    titulo: "Renta de plataforma de tijera Genie GS-3246",
    descripcion:
      "Plataforma de tijera eléctrica Genie GS-3246 en renta: 11.75 m de altura de trabajo y 220 kg de carga. La tijera más alta del catálogo de BAPSA.",
    h1: "Renta de plataforma de tijera eléctrica Genie GS-3246",
    definicion:
      "La Genie GS-3246 es una plataforma de tijera eléctrica de 11.75 m de altura de trabajo y 220 kg de carga de trabajo. Es la tijera más alta del catálogo de BAPSA y la que corresponde cuando el punto de trabajo está arriba de los 10 metros y hace falta superficie para material.",
    resumen: "La tijera más alta: 11.75 m de altura de trabajo y cesta de 2.26 m de largo.",
    paraQue: [
      "Instalación y mantenimiento por encima de 10 m dentro de nave, con material arriba.",
      "Tramos rectos largos de ducto, tubería o charola, donde la superficie de la cesta rinde más que un brazo.",
      "Trabajo con una o dos personas arriba, con su material, sobre piso firme y nivelado.",
    ],
    alturaTrabajo: "11.75 m",
    alturaTrabajoM: 11.75,
    capacidad: "220 kg",
    ancho: "1.15 m",
    alimentacion: "24 V DC",
    especificaciones: [
      {
        grupo: "Dimensiones y capacidad",
        filas: [
          { concepto: "Altura de trabajo", valor: "11.75 m" },
          { concepto: "Carga de trabajo BAPSA", valor: "220 kg" },
          { concepto: "Personas a bordo", valor: "1 o 2, con su material" },
          { concepto: "Cesta", valor: "2.26 × 1.15 m" },
          { concepto: "Extensión de la plataforma", valor: "0.91 m" },
        ],
      },
      {
        grupo: "Potencia y transmisión",
        filas: [
          { concepto: "Baterías", valor: "24 V DC (4 baterías de 6 V 225 Ah)" },
          { concepto: "Cargador", valor: "Inteligente universal de 20 A" },
          { concepto: "Tracción", valor: "En las ruedas delanteras" },
          { concepto: "Neumáticos", valor: "Sólidos" },
        ],
      },
    ],
    fuente: "Genie · Tijeras autopropulsadas GS-2046, GS-2646 y GS-3246",
    fotoAlt:
      "Plataforma de tijera eléctrica Genie GS-3246 de BAPSA elevada dentro de una nave industrial.",
    fotoClave: "MAQ-GS3246",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "jlg-2630es",
    marca: "JLG",
    modelo: "2630ES",
    familia: "plataformas-de-tijera",
    tipo: "Plataforma de tijera eléctrica angosta",
    titulo: "Renta de plataforma de tijera angosta JLG 2630ES",
    descripcion:
      "Plataforma de tijera eléctrica JLG 2630ES en renta: 9.77 m de altura de trabajo y 0.76 m de ancho. Pasa por una puerta estándar y por pasillo de rack.",
    h1: "Renta de plataforma de tijera angosta JLG 2630ES",
    definicion:
      "La JLG 2630ES es una plataforma de tijera eléctrica angosta de 9.77 m de altura de trabajo y apenas 0.76 m de ancho. Es la tijera que pasa por una puerta estándar y por el pasillo de un rack, y que sube a una o dos personas con su material.",
    resumen:
      "La angosta: 0.76 m de ancho para pasar por puerta estándar, con 9.77 m de altura.",
    paraQue: [
      "Pasillos de rack y puertas estándar, donde una tijera de 1.15 m ya no pasa.",
      "Almacén, tienda y oficina: entra por accesos normales sin desmontar nada.",
      "Tramos de instalación con la extensión de 0.90 m, para alcanzar sin mover la máquina.",
      "Trabajo continuo en interior: es eléctrica, sin gases de escape.",
    ],
    alturaTrabajo: "9.77 m",
    alturaTrabajoM: 9.77,
    capacidad: "220 kg",
    ancho: "0.76 m",
    alimentacion: "24 V DC",
    especificaciones: [
      {
        grupo: "Dimensiones",
        filas: [
          { concepto: "Altura de trabajo", valor: "9.77 m" },
          { concepto: "Altura de plataforma", valor: "7.77 m" },
          { concepto: "Ancho", valor: "0.76 m" },
          { concepto: "Largo", valor: "2.30 m" },
          { concepto: "Altura replegada con barandillas", valor: "2.20 m" },
          { concepto: "Distancia entre ejes", valor: "1.88 m" },
          { concepto: "Altura libre sobre el suelo", valor: "0.09 m" },
        ],
      },
      {
        grupo: "Productividad",
        filas: [
          { concepto: "Carga de trabajo BAPSA", valor: "220 kg" },
          { concepto: "Personas a bordo", valor: "1 o 2, con su material" },
          { concepto: "Extensión de la plataforma", valor: "0.90 m" },
          { concepto: "Radio de giro", valor: "2.06 m" },
          { concepto: "Velocidad de desplazamiento", valor: "4.8 km/h" },
          { concepto: "Tiempo de elevación / descenso", valor: "40 s / 40 s" },
        ],
      },
      {
        grupo: "Alimentación y peso",
        filas: [
          { concepto: "Alimentación", valor: "24 V DC (4 baterías de 200 Ah)" },
          { concepto: "Cargador", valor: "20 A" },
          { concepto: "Neumáticos sólidos", valor: "16 × 5 pulg." },
          { concepto: "Peso", valor: "2,155 kg" },
        ],
      },
    ],
    fuente: "JLG · 2630ES, especificaciones publicadas por RitchieSpecs",
    fotoAlt:
      "Plataforma de tijera angosta JLG 2630ES de BAPSA en el pasillo de una nave industrial.",
    fotoClave: "MAQ-2630ES",
  },

];

/** Ordenadas de mayor a menor altura de trabajo, que es como se comparan. */
export const MAQUINAS_POR_ALTURA = [...MAQUINAS].sort(
  (a, b) => b.alturaTrabajoM - a.alturaTrabajoM
);

export const maquinasDeFamilia = (familia: string) =>
  MAQUINAS_POR_ALTURA.filter((m) => m.familia === familia);

export const maquinaPorSlug = (slug: string) => MAQUINAS.find((m) => m.slug === slug);

/** Marcas presentes en el catálogo de renta, no las que atiende el taller. */
export const MARCAS_CATALOGO = [...new Set(MAQUINAS.map((m) => m.marca))].sort();
