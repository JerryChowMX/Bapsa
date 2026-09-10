/**
 * Preguntas frecuentes.
 *
 * Redactadas en el lenguaje del usuario, no en el de la marca: nadie busca
 * "soluciones integrales de elevación". Cada respuesta abre con la respuesta
 * —cifra, regla o condición— y explica después, para que el fragmento se
 * entienda sacado de contexto y se pueda citar tal cual.
 *
 * Las respuestas que dependen de una política interna de BAPSA (tarifas,
 * plazo mínimo, depósito, seguro) están marcadas en DATOS-POR-CONFIRMAR.md.
 * No se inventó ninguna cifra que BAPSA no haya publicado.
 */
import type { ParFaq } from "../lib/schema";

export const FAQ_GENERAL: ParFaq[] = [
  {
    pregunta: "¿Qué altura de máquina necesito para mi trabajo?",
    respuesta:
      "Reste 2 metros a la altura del punto donde va a trabajar y ese es el alcance de plataforma que necesita. La altura de trabajo que declaran los fabricantes ya incluye a una persona de pie en la canastilla, que son esos 2 metros. Si va a cambiar una luminaria a 12 metros, necesita una máquina de 12 metros de altura de trabajo, no de 14.",
  },
  {
    pregunta: "¿Rento un brazo articulado o una plataforma de tijera?",
    respuesta:
      "La tijera si el punto de trabajo está directamente arriba y necesita superficie para material y para dos o tres personas; el brazo articulado si tiene que librar un obstáculo por encima o por un costado. Esa es la única diferencia que importa al elegir: la tijera sube en vertical, el brazo alcanza en diagonal.",
  },
  {
    pregunta: "¿Eléctrico o de combustión?",
    respuesta:
      "Eléctrico para interior y piso terminado; de combustión para intemperie y terreno irregular. El eléctrico no emite gases y su llanta no marca el concreto, así que puede entrar a una nave en operación. El de combustión tiene tracción 4×4 y llega hasta 120 pies, pero no puede trabajar en un espacio cerrado.",
  },
  {
    pregunta: "¿Entregan el equipo en obra?",
    respuesta:
      "Sí. BAPSA entrega y recoge con flete propio en Ramos Arizpe, Saltillo y Arteaga, y cotiza el traslado para obras fuera de esa zona. Que el flete sea propio significa que la fecha de entrega no depende de la agenda de un transportista externo.",
  },
  {
    pregunta: "¿Se necesita capacitación para operar una plataforma de elevación?",
    respuesta:
      "Sí. La NOM-009-STPS-2011 obliga al patrón a capacitar y autorizar por escrito a quien realiza trabajos en altura, y a verificar el equipo antes de cada uso. BAPSA entrega la máquina con revisión de puesta en marcha en sitio y explica su operación al personal que la va a usar; la autorización del operador la emite la empresa que contrata el trabajo.",
  },
  {
    pregunta: "¿Qué pasa si la máquina falla en medio de la obra?",
    respuesta:
      "BAPSA tiene taller propio y área de servicio, y respalda la falla mecánica durante el periodo de renta. Reporte la falla al 844 488 0408 en horario de lunes a viernes de 8:30 a 18:00 y sábado de 8:30 a 13:00.",
  },
  {
    pregunta: "¿BAPSA da servicio a equipo que no rentó ahí?",
    respuesta:
      "Sí. El área de servicio y refacciones atiende equipo multimarca —Genie, JLG, Haulotte, Skyjack, Snorkel, Toyota y Caterpillar— sea propio del cliente o rentado a otro proveedor. También hay pólizas de mantenimiento preventivo para flotas propias.",
  },
  {
    pregunta: "¿Dónde está BAPSA?",
    respuesta:
      "En Blvd. Miguel Ramos Arizpe 104, Col. La Esmeralda, Ramos Arizpe, Coahuila, C.P. 25902, sobre el corredor industrial entre Saltillo y Monterrey. El horario es de lunes a viernes de 8:30 a 18:00 y sábado de 8:30 a 13:00.",
  },
];

/** Se muestran en la ficha de cada familia, además de las generales. */
export const FAQ_POR_FAMILIA: Record<string, ParFaq[]> = {
  "brazos-articulados-electricos": [
    {
      pregunta: "¿Un brazo eléctrico marca el piso de una nave?",
      respuesta:
        "No, si trae llanta no marcante, que es como se entregan estos equipos. Por eso es la categoría que entra a nave en operación, piso epóxico y concreto pulido sin dejar huella de tracción.",
    },
    {
      pregunta: "¿Cuánto dura la carga de un brazo articulado eléctrico?",
      respuesta:
        "Un turno completo de trabajo con la batería cargada al inicio. Si la obra corre dos o tres turnos seguidos sin pausa para recargar, conviene una máquina de combustión o programar el cambio de equipo.",
    },
  ],
  "brazos-articulados-de-combustion": [
    {
      pregunta: "¿Hasta qué altura llega un brazo articulado de combustión?",
      respuesta:
        "Hasta 120 pies, alrededor de 38 metros de altura de trabajo, en la configuración más alta que renta BAPSA. Por debajo de eso hay escalones intermedios desde los 50 pies, y la selección depende también del alcance horizontal que necesite librar.",
    },
    {
      pregunta: "¿Qué diferencia hay entre 4×2 y 4×4?",
      respuesta:
        "El 4×2 mueve dos ruedas y sirve en terreno compactado y con poca pendiente; el 4×4 mueve las cuatro y sube pendiente y terreno suelto. Si la obra está en terracería, en lodo o con desnivel, la máquina que necesita es la 4×4.",
    },
  ],
  "plataformas-de-tijera": [
    {
      pregunta: "¿Cuánto peso aguanta una plataforma de tijera?",
      respuesta:
        "Entre 230 y 450 kg en las eléctricas de interior, y entre 450 y 680 kg en las de terreno irregular. Ese número incluye a las personas, la herramienta y el material que suba: es el dato que más se subestima al elegir máquina.",
    },
    {
      pregunta: "¿Pasa una tijera por el pasillo de un rack?",
      respuesta:
        "Sí, con los modelos angostos de 0.8 metros de ancho. Mida el paso libre real del pasillo —no el nominal— porque el ancho de la máquina no incluye lo que sobresale al abrir la corredera de plataforma.",
    },
  ],
  "elevadores-personales": [
    {
      pregunta: "¿Un elevador personal pasa por una puerta normal?",
      respuesta:
        "Sí. Los elevadores personales miden entre 0.75 y 0.8 metros de ancho, que es lo que pasa por una puerta estándar de 0.80 metros. Es la razón por la que se usan en oficina, tienda y almacén con pasillos angostos.",
    },
    {
      pregunta: "¿Cuántas personas suben a un elevador personal?",
      respuesta:
        "Una. La capacidad va de 110 a 160 kg e incluye al operador, la herramienta y el material. Si el trabajo requiere dos personas arriba, la máquina que corresponde es una plataforma de tijera.",
    },
  ],
  "maquinaria-pesada": [
    {
      pregunta: "¿Qué maquinaria pesada tiene BAPSA disponible?",
      respuesta:
        "La disponibilidad de esta línea se confirma por teléfono para la fecha que usted necesita, porque depende del equipo que esté libre. Llame al 844 488 0408 con la fecha, el trabajo y el lugar, y le confirmamos el mismo día hábil.",
    },
  ],
};
