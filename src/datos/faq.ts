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
      "Cinco modelos eléctricos de Genie y JLG, con altura de trabajo de 9.77 m a 15.94 m. Tres son brazos articulados —Genie Z-45/25J DC de 15.94 m, JLG E450A de 15.72 m y JLG n40E de 14.19 m— y dos son plataformas de tijera: Genie GS-3246 de 11.75 m y JLG 2630ES de 9.77 m. Todas trabajan con 220 kg de carga, que es una o dos personas con su material.",
  },
  {
    pregunta: "¿Qué altura de máquina necesito para mi trabajo?",
    respuesta:
      "Reste 2 metros a la altura del punto donde va a trabajar y ese es el alcance de plataforma que necesita. La altura de trabajo que declaran los fabricantes ya incluye a una persona de pie en la canastilla, que son esos 2 metros. Si va a cambiar una luminaria a 12 metros, necesita una máquina de 12 metros de altura de trabajo, no de 14.",
  },
  {
    pregunta: "¿Rento un brazo articulado o una plataforma de tijera?",
    respuesta:
      "La tijera si el punto de trabajo está directamente arriba y necesita superficie para material y para una o dos personas; el brazo articulado si tiene que librar un obstáculo por encima o por un costado. Esa es la única diferencia que importa al elegir: la tijera sube en vertical, el brazo alcanza en diagonal.",
  },
  {
    pregunta: "¿Cuál es la máquina más alta que renta BAPSA?",
    respuesta:
      "El brazo articulado eléctrico Genie Z-45/25J DC, con 15.94 m de altura de trabajo, 7.65 m de alcance horizontal y 220 kg de carga de trabajo. Le sigue el JLG E450A con 15.72 m. Entre las plataformas de tijera, la más alta es la Genie GS-3246 con 11.75 m.",
  },
  {
    pregunta: "¿Cuánto peso puede subir una máquina de BAPSA?",
    respuesta:
      "220 kg en todas las máquinas, sea brazo articulado o plataforma de tijera. Ese número incluye a las personas, la herramienta y el material, y en la práctica son una o dos personas con lo que necesitan para trabajar. Algunas fichas de fabricante declaran más, pero 220 kg es la carga con la que BAPSA entrega y recomienda trabajar.",
  },
  {
    pregunta: "¿Se puede meter una plataforma a una nave en operación?",
    respuesta:
      "Sí. Todo el equipo de renta de BAPSA es eléctrico: no emite gases de escape y trabaja con poco ruido, así que puede entrar a una planta sin parar la producción alrededor. Si el piso es epóxico o concreto pulido, dígalo al cotizar: no todas las unidades traen llanta no marcante, y le asignamos la que corresponde.",
  },
  {
    pregunta: "¿BAPSA renta equipo de combustión o diésel?",
    respuesta:
      "No. Por ahora BAPSA renta únicamente equipo de elevación eléctrico. Si su obra es a la intemperie sobre terreno firme y nivelado, el equipo eléctrico funciona; si el terreno está sin compactar o tiene pendiente fuerte, llame al 844 181 9171 y le decimos con franqueza si le podemos servir.",
  },
  {
    pregunta: "¿Entregan el equipo en obra?",
    respuesta:
      "Sí. BAPSA entrega y recoge con flete propio en Ramos Arizpe, Saltillo, Derramadero, Arteaga y Santa Catarina, N.L., y cotiza el traslado para obras fuera de esa zona. Que el flete sea propio significa que la fecha de entrega no depende de la agenda de un transportista externo.",
  },
  {
    pregunta: "¿Se necesita capacitación para operar una plataforma de elevación?",
    respuesta:
      "Sí. La NOM-009-STPS-2011 obliga al patrón a capacitar y autorizar por escrito a quien realiza trabajos en altura, y a verificar el equipo antes de cada uso. BAPSA entrega la máquina con revisión de puesta en marcha en sitio y explica su operación al personal que la va a usar; la autorización del operador la emite la empresa que contrata el trabajo.",
  },
  {
    pregunta: "¿Qué pasa si la máquina falla en medio de la obra?",
    respuesta:
      "BAPSA tiene taller propio y área de servicio, y respalda la falla mecánica durante el periodo de renta. Reporte la falla al 844 181 9171 en horario de lunes a viernes de 8:30 a 18:00 y sábado de 8:30 a 13:00.",
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
        "Depende de la llanta de la unidad: unas traen llanta no marcante y otras no. Si va a trabajar sobre piso epóxico o concreto pulido, dígalo al cotizar y le asignamos una unidad con llanta no marcante.",
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
        "220 kg, tanto en la Genie GS-3246 como en la JLG 2630ES. Ese número incluye a las personas, la herramienta y el material: lo recomendado es una o dos personas con su material, no tres.",
    },
    {
      pregunta: "¿Pasa una tijera por el pasillo de un rack?",
      respuesta:
        "Sí, con la JLG 2630ES, que mide 0.76 m de ancho y pasa por una puerta estándar. Mida el paso libre real del pasillo —no el nominal— porque el ancho de la máquina no incluye lo que sobresale al abrir la extensión de 0.90 m.",
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
  "traslado-de-maquinaria": [
    {
      pregunta: "¿BAPSA traslada maquinaria que no es suya?",
      respuesta:
        "Sí. El traslado se cotiza aparte de la renta, para equipo propio del cliente o de otro proveedor. Llame al 844 181 9171 con el equipo, el peso aproximado, el origen y el destino, y le confirmamos fecha y precio.",
    },
    {
      pregunta: "¿Hasta dónde llega el traslado?",
      respuesta:
        "Ramos Arizpe, Saltillo, Derramadero, Arteaga y Santa Catarina, N.L. son la zona de siempre. Fuera de ella se cotiza según la distancia y el tipo de equipo.",
    },
  ],
};
