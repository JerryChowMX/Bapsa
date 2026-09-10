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
    pregunta: "¿Qué equipo de elevación tiene BAPSA en renta?",
    respuesta:
      "Siete modelos eléctricos de Genie y JLG, con altura de trabajo de 8.10 m a 15.94 m. Tres son brazos articulados —Genie Z-45/25J DC de 15.94 m, JLG E450A de 15.72 m y JLG n40E de 14.19 m— y cuatro son plataformas de tijera: Genie GS-3246 de 11.75 m, GS-2646 y GS-2632 de 9.96 m, y GS-2046 de 8.10 m. Todas son eléctricas y con neumáticos que no dejan marcas.",
  },
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
    pregunta: "¿Cuál es la máquina más alta que renta BAPSA?",
    respuesta:
      "El brazo articulado eléctrico Genie Z-45/25J DC, con 15.94 m de altura de trabajo, 7.65 m de alcance horizontal y 227 kg de capacidad. Le sigue el JLG E450A con 15.72 m. Entre las plataformas de tijera, la más alta es la Genie GS-3246 con 11.75 m.",
  },
  {
    pregunta: "¿Cuánto peso puede subir una máquina de BAPSA?",
    respuesta:
      "Hasta 545 kg con la plataforma de tijera Genie GS-2046, que es la de mayor capacidad del catálogo. Le siguen la GS-2646 con 454 kg y la GS-3246 con 318 kg. Los brazos articulados van de 227 a 230 kg, porque su ventaja es el alcance, no la carga. Ese número incluye a las personas, la herramienta y el material.",
  },
  {
    pregunta: "¿Se puede meter una plataforma a una nave en operación?",
    respuesta:
      "Sí. Todo el equipo de BAPSA es eléctrico y con neumáticos que no dejan marcas: no emite gases de escape, opera por debajo de 70 dBA y no marca el concreto pulido ni el piso epóxico. Por eso puede trabajar dentro de una planta sin parar la producción alrededor.",
  },
  {
    pregunta: "¿BAPSA renta equipo de combustión o diésel?",
    respuesta:
      "No. Por ahora BAPSA renta únicamente equipo de elevación eléctrico. Si su obra es a la intemperie sobre terreno firme y nivelado, el equipo eléctrico funciona; si el terreno está sin compactar o tiene pendiente fuerte, llame al 844 488 0408 y le decimos con franqueza si le podemos servir.",
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
      pregunta: "¿Hasta dónde alcanza de lado un brazo articulado eléctrico?",
      respuesta:
        "Hasta 7.69 m de alcance horizontal con el JLG E450A y 7.65 m con el Genie Z-45/25J DC. El JLG n40E llega a 6.25 m de alcance a 6.10 m de altura, que es la medida que importa cuando hay que pasar por encima de un obstáculo y volver a bajar del otro lado.",
    },
    {
      pregunta: "¿Cuánto dura la carga de un brazo articulado eléctrico?",
      respuesta:
        "Un turno completo de trabajo con la batería cargada al inicio. Si la obra corre dos o tres turnos seguidos sin pausa para recargar, hay que programar la recarga entre turnos o el cambio de equipo.",
    },
  ],
  "plataformas-de-tijera": [
    {
      pregunta: "¿Cuánto peso aguanta una plataforma de tijera?",
      respuesta:
        "En el catálogo de BAPSA, entre 227 kg y 545 kg según el modelo: la Genie GS-2046 sube 545 kg, la GS-2646 454 kg, la GS-3246 318 kg y la angosta GS-2632 227 kg. Ese número incluye a las personas, la herramienta y el material, y baja a 113 kg cuando se usa la extensión de plataforma.",
    },
    {
      pregunta: "¿Pasa una tijera por el pasillo de un rack?",
      respuesta:
        "Sí, con la Genie GS-2632, que mide 0.81 m de ancho y pasa por una puerta estándar. Con las barandillas abatidas queda en 1.94 m de alto, así que también pasa bajo un dintel bajo. Mida el paso libre real del pasillo —no el nominal— porque el ancho de la máquina no incluye lo que sobresale al abrir la corredera de 0.91 m.",
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
