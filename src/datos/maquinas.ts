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
      "Brazo articulado eléctrico Genie Z-45/25J DC en renta: 15.94 m de altura de trabajo, 227 kg y voladizo posterior cero. Entrega en Ramos Arizpe y Saltillo.",
    h1: "Renta de brazo articulado eléctrico Genie Z-45/25J DC",
    definicion:
      "El Genie Z-45/25J DC es un brazo articulado eléctrico de 15.94 m de altura de trabajo y 7.65 m de alcance horizontal, con voladizo posterior cero: la torreta no sobresale al girar, así que puede trabajar pegado a una pared o entre dos filas de rack sin necesidad de acordonar por detrás.",
    resumen:
      "La máquina más alta del catálogo: 15.94 m, eléctrica y con voladizo posterior cero.",
    paraQue: [
      "Mantenimiento de luminarias, ductos y rociadores en nave alta, con la máquina trabajando entre estructura.",
      "Puntos de trabajo tapados por una máquina, un rack o una banda: el plumín de 1.52 m con rotación vertical de 135° entra donde no entra una tijera.",
      "Trabajo pegado a pared o a fachada, gracias al voladizo posterior cero.",
      "Nave en operación: es eléctrica, con neumáticos sólidos que no dejan marcas y menos de 70 dBA de ruido.",
    ],
    alturaTrabajo: "15.94 m",
    alturaTrabajoM: 15.94,
    capacidad: "227 kg",
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
          { concepto: "Capacidad de carga máxima", valor: "227 kg" },
          { concepto: "Rotación de cesta", valor: "160°" },
          { concepto: "Longitud de plumín", valor: "1.52 m" },
          { concepto: "Rotación vertical del plumín", valor: "135°" },
          { concepto: "Rotación de la torreta", valor: "355°" },
          { concepto: "Voladizo posterior de torreta", valor: "0 cm" },
          { concepto: "Velocidad de desplazamiento replegada", valor: "4.8 km/h" },
          { concepto: "Velocidad de desplazamiento elevada", valor: "1.0 km/h" },
          { concepto: "Pendiente superable replegada", valor: "30 %" },
          { concepto: "Radio de giro interior / exterior", valor: "1.8 m / 4.27 m" },
          { concepto: "Neumáticos sólidos, no dejan marcas", valor: "0.23 × 0.37 m" },
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
      "Brazo articulado eléctrico JLG E450A en renta: 15.72 m de altura de trabajo, 230 kg, giro de cola cero y chasis de 1.75 m. Entrega en Ramos Arizpe y Saltillo.",
    h1: "Renta de brazo articulado eléctrico JLG E450A",
    definicion:
      "El JLG E450A es un brazo articulado eléctrico de 15.72 m de altura de trabajo y 7.69 m de alcance, con giro de cola cero y plataforma que rota 180°: se puede reorientar el trabajo sin mover la máquina de sitio, que es lo que hace la diferencia en un pasillo angosto.",
    resumen:
      "15.72 m de altura, giro de cola cero y plataforma giratoria de 180°. Chasis estrecho de 1.75 m.",
    paraQue: [
      "Trabajo en pasillo angosto donde no hay espacio para reposicionar la máquina: la plataforma gira 180° sola.",
      "Naves en operación sobre piso terminado: es eléctrica y sus ruedas rellenas de espuma no dejan huella.",
      "Puntos altos con obstáculo de por medio, con 7.49 m de altura de articulación para librar por encima.",
      "Obra donde importa la maniobra: 0.61 m de radio de giro interno y giro de cola cero.",
    ],
    alturaTrabajo: "15.72 m",
    alturaTrabajoM: 15.72,
    capacidad: "230 kg",
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
          { concepto: "Capacidad de plataforma sin restricción", valor: "230 kg" },
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
          { concepto: "Ruedas", valor: "240/55-17.5 rellenas de espuma, no dejan huella" },
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
    capacidad: "230 kg",
    ancho: "1.50 m",
    alimentacion: "48 V CC",
    especificaciones: [
      {
        grupo: "Prestaciones",
        filas: [
          { concepto: "Altura de trabajo", valor: "14.19 m" },
          { concepto: "Altura de plataforma", valor: "12.19 m" },
          { concepto: "Capacidad", valor: "230 kg" },
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
      "Plataforma de tijera eléctrica Genie GS-3246 en renta: 11.75 m de altura de trabajo y hasta 318 kg. La tijera más alta del catálogo de BAPSA.",
    h1: "Renta de plataforma de tijera eléctrica Genie GS-3246",
    definicion:
      "La Genie GS-3246 es una plataforma de tijera eléctrica de 11.75 m de altura de trabajo y hasta 318 kg de capacidad. Es la tijera más alta del catálogo de BAPSA y la que corresponde cuando el punto de trabajo está arriba de los 10 metros y hace falta superficie para material.",
    resumen: "La tijera más alta: 11.75 m de altura de trabajo y hasta 318 kg.",
    paraQue: [
      "Instalación y mantenimiento por encima de 10 m dentro de nave, con material arriba.",
      "Tramos rectos largos de ducto, tubería o charola, donde la superficie de la cesta rinde más que un brazo.",
      "Trabajo con dos personas arriba sobre piso firme y nivelado.",
    ],
    alturaTrabajo: "11.75 m",
    alturaTrabajoM: 11.75,
    capacidad: "318 kg",
    ancho: "1.15 m",
    alimentacion: "24 V DC",
    especificaciones: [
      {
        grupo: "Dimensiones y capacidad",
        filas: [
          { concepto: "Altura de trabajo", valor: "11.75 m" },
          { concepto: "Capacidad de carga", valor: "Hasta 318 kg" },
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
          { concepto: "Neumáticos", valor: "Sólidos, no dejan marcas" },
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
    slug: "genie-gs-2646",
    marca: "Genie",
    modelo: "GS-2646",
    familia: "plataformas-de-tijera",
    tipo: "Plataforma de tijera eléctrica",
    titulo: "Renta de plataforma de tijera Genie GS-2646",
    descripcion:
      "Plataforma de tijera eléctrica Genie GS-2646 en renta: 9.96 m de altura en interior y 454 kg de capacidad. La de mayor carga del catálogo de BAPSA.",
    h1: "Renta de plataforma de tijera eléctrica Genie GS-2646",
    definicion:
      "La Genie GS-2646 es una plataforma de tijera eléctrica de 9.96 m de altura de trabajo en interior y 454 kg de capacidad, con cesta de 1.16 m de ancho. Es la de mayor carga del catálogo: la que corresponde cuando suben dos personas con material y herramienta al mismo tiempo.",
    resumen: "La de mayor carga: 454 kg y 9.96 m de altura de trabajo en interior.",
    paraQue: [
      "Trabajo con dos personas arriba más material: 454 kg de capacidad total.",
      "Instalación de ducto, tubería o charola a lo largo de un tramo, con la extensión de 0.91 m para alcanzar sin bajar.",
      "Naves y losas donde el peso importa: 1,971 kg de máquina y 9.83 kPa de presión al suelo.",
    ],
    alturaTrabajo: "9.96 m",
    alturaTrabajoM: 9.96,
    capacidad: "454 kg",
    ancho: "1.16 m",
    alimentacion: "24 V DC",
    especificaciones: [
      {
        grupo: "Dimensiones",
        filas: [
          { concepto: "Altura de trabajo máxima en interiores", valor: "9.96 m" },
          { concepto: "Altura de trabajo máxima en exteriores", valor: "7.99 m" },
          { concepto: "Altura de plataforma en interiores", valor: "7.96 m" },
          { concepto: "Altura de plataforma en exteriores", valor: "5.99 m" },
          { concepto: "Altura replegada", valor: "1.19 m" },
          { concepto: "Longitud de la cesta", valor: "2.26 m · 3.18 m extendida" },
          { concepto: "Extensión de cesta", valor: "0.91 m" },
          { concepto: "Ancho de la plataforma", valor: "1.16 m" },
          { concepto: "Ancho de la máquina", valor: "1.16 m" },
          { concepto: "Longitud replegada", valor: "2.44 m" },
          { concepto: "Distancia entre ejes", valor: "1.85 m" },
        ],
      },
      {
        grupo: "Productividad",
        filas: [
          { concepto: "Número máximo de personas (interior / exterior)", valor: "2 / 1" },
          { concepto: "Capacidad de carga máxima", valor: "454 kg" },
          { concepto: "Capacidad con la extensión extendida", valor: "113 kg" },
          { concepto: "Velocidad de traslación replegada / elevada", valor: "3.2 km/h / 0.8 km/h" },
          { concepto: "Pendiente superable replegada", valor: "25 %" },
          { concepto: "Radio de giro interior / exterior", valor: "0 / 2.29 m" },
          { concepto: "Velocidad de elevación / descenso", valor: "41 s / 30 s" },
          { concepto: "Neumáticos, no dejan marcas", valor: "38 × 13 cm" },
        ],
      },
      {
        grupo: "Alimentación y peso",
        filas: [
          { concepto: "Alimentación", valor: "24 V DC (4 × 6 V 225 Ah)" },
          { concepto: "Capacidad del depósito hidráulico", valor: "15 L" },
          { concepto: "Peso", valor: "1,971 kg" },
          { concepto: "Presión al suelo", valor: "9.83 kPa" },
          { concepto: "Nivel de presión sonora", valor: "< 70 dBA" },
        ],
      },
    ],
    fuente: "Genie · GS-2632 y GS-2646 E-Drive, ficha técnica",
    fotoAlt:
      "Plataforma de tijera eléctrica Genie GS-2646 de BAPSA con dos operadores instalando tubería en una nave.",
    fotoClave: "MAQ-GS2646",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "genie-gs-2632",
    marca: "Genie",
    modelo: "GS-2632",
    familia: "plataformas-de-tijera",
    tipo: "Plataforma de tijera eléctrica angosta",
    titulo: "Renta de plataforma de tijera angosta Genie GS-2632",
    descripcion:
      "Plataforma de tijera eléctrica Genie GS-2632 en renta: 9.96 m de altura y solo 0.81 m de ancho. Pasa por una puerta estándar y por pasillo de rack.",
    h1: "Renta de plataforma de tijera angosta Genie GS-2632",
    definicion:
      "La Genie GS-2632 es una plataforma de tijera eléctrica angosta de 9.96 m de altura de trabajo en interior y apenas 0.81 m de ancho, con las barandillas abatidas queda en 1.94 m de alto. Es la tijera que pasa por una puerta estándar y por el pasillo de un rack.",
    resumen:
      "La angosta: 0.81 m de ancho para pasar por puerta estándar, con 9.96 m de altura.",
    paraQue: [
      "Pasillos de rack y puertas estándar, donde una tijera de 1.16 m ya no pasa.",
      "Almacén, tienda y oficina: entra por accesos normales sin desmontar nada.",
      "Traslado en elevador de carga o sobre losa: 2,145 kg de máquina y 12.91 kPa de presión al suelo.",
      "Paso bajo dintel bajo: con las barandillas abatidas queda en 1.94 m de altura.",
    ],
    alturaTrabajo: "9.96 m",
    alturaTrabajoM: 9.96,
    capacidad: "227 kg",
    ancho: "0.81 m",
    alimentacion: "24 V DC",
    especificaciones: [
      {
        grupo: "Dimensiones",
        filas: [
          { concepto: "Altura de trabajo máxima en interiores", valor: "9.96 m" },
          { concepto: "Altura de trabajo máxima en exteriores", valor: "7.79 m" },
          { concepto: "Altura de plataforma en interiores", valor: "7.96 m" },
          { concepto: "Altura de plataforma en exteriores", valor: "5.79 m" },
          { concepto: "Altura replegada", valor: "1.19 m" },
          { concepto: "Longitud de la cesta", valor: "2.26 m · 3.18 m extendida" },
          { concepto: "Extensión de cesta", valor: "0.91 m" },
          { concepto: "Ancho de la plataforma", valor: "0.81 m" },
          { concepto: "Ancho de la máquina", valor: "0.81 m" },
          { concepto: "Altura de las barandillas", valor: "1.10 m" },
          { concepto: "Altura replegada con barandillas abatidas", valor: "1.94 m" },
          { concepto: "Longitud replegada", valor: "2.44 m · 3.33 m extendida" },
          { concepto: "Distancia entre ejes", valor: "1.85 m" },
          { concepto: "Altura libre sobre el suelo", valor: "12 cm" },
        ],
      },
      {
        grupo: "Productividad",
        filas: [
          { concepto: "Número máximo de personas (interior / exterior)", valor: "2 / 1" },
          { concepto: "Capacidad de carga máxima", valor: "227 kg" },
          { concepto: "Capacidad con la extensión extendida", valor: "113 kg" },
          { concepto: "Altura de conducción", valor: "7.96 m" },
          { concepto: "Velocidad de traslación replegada / elevada", valor: "3.2 km/h / 0.8 km/h" },
          { concepto: "Pendiente superable replegada", valor: "25 %" },
          { concepto: "Radio de giro interior / exterior", valor: "0 / 2.13 m" },
          { concepto: "Velocidad de elevación / descenso", valor: "43 s / 33 s" },
          { concepto: "Neumáticos, no dejan marcas", valor: "38 × 13 cm" },
        ],
      },
      {
        grupo: "Alimentación y peso",
        filas: [
          { concepto: "Alimentación", valor: "24 V DC (4 × 6 V 225 Ah)" },
          { concepto: "Capacidad del depósito hidráulico", valor: "15 L (E-Drive) · 17 L (hidráulico)" },
          { concepto: "Peso", valor: "2,145 kg" },
          { concepto: "Presión al suelo", valor: "12.91 kPa" },
          { concepto: "Nivel de presión sonora", valor: "< 70 dBA" },
        ],
      },
    ],
    fuente: "Genie · GS-2632 y GS-2646 E-Drive, ficha técnica",
    fotoAlt:
      "Plataforma de tijera angosta Genie GS-2632 de BAPSA pasando por el pasillo de un rack de almacén.",
    fotoClave: "MAQ-GS2632",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "genie-gs-2046",
    marca: "Genie",
    modelo: "GS-2046",
    familia: "plataformas-de-tijera",
    tipo: "Plataforma de tijera eléctrica",
    titulo: "Renta de plataforma de tijera Genie GS-2046",
    descripcion:
      "Plataforma de tijera eléctrica Genie GS-2046 en renta: 8.10 m de altura de trabajo y hasta 545 kg, la mayor capacidad del catálogo de BAPSA.",
    h1: "Renta de plataforma de tijera eléctrica Genie GS-2046",
    definicion:
      "La Genie GS-2046 es una plataforma de tijera eléctrica de 8.10 m de altura de trabajo y hasta 545 kg de capacidad. Es la de mayor carga de todo el catálogo de BAPSA: la que corresponde cuando lo que pesa no son las personas, sino el material que hay que subir con ellas.",
    resumen:
      "La de más carga de todo el catálogo: hasta 545 kg, con 8.10 m de altura.",
    paraQue: [
      "Subir material pesado con el personal: hasta 545 kg entre personas, herramienta y carga.",
      "Alturas medias en nave, alrededor de 8 m, donde no hace falta una tijera más alta.",
      "Trabajo continuo en interior sobre piso terminado, con neumáticos que no dejan marcas.",
    ],
    alturaTrabajo: "8.10 m",
    alturaTrabajoM: 8.1,
    capacidad: "545 kg",
    ancho: "1.15 m",
    alimentacion: "24 V DC",
    especificaciones: [
      {
        grupo: "Dimensiones y capacidad",
        filas: [
          { concepto: "Altura de trabajo", valor: "8.10 m" },
          { concepto: "Capacidad de carga", valor: "Hasta 545 kg" },
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
          { concepto: "Neumáticos", valor: "Sólidos, no dejan marcas" },
        ],
      },
    ],
    fuente: "Genie · Tijeras autopropulsadas GS-2046, GS-2646 y GS-3246",
    fotoAlt:
      "Plataforma de tijera eléctrica Genie GS-2046 de BAPSA cargada con material dentro de una nave.",
    fotoClave: "MAQ-GS2046",
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
