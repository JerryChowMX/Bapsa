/**
 * Qué foto va en cada lugar del sitio. Una sola tabla para el home, las
 * fichas de familia, las de máquina y las páginas de sección.
 *
 * Todas salen del material de BAPSA (~/Desktop/Sarape Clients/BAPSA). Se
 * dejaron fuera a propósito las 13–24 de esa carpeta: son las generadas con
 * atardeceres y una fachada «BAPSA» que no es la oficina real, y en la
 * reunión del 23 de septiembre de 2026 la cliente pidió no usar fotos que se
 * vean hechas con IA.
 *
 * El material no trae cada modelo exacto del catálogo, así que la foto de
 * máquina es de su familia y se rotula como ilustrativa donde se muestra.
 */
import brazoCervecera from "../fotos/51_jlg_brazo_articulado_planta_cervecera.jpg";
import brazoZ30Patio from "../fotos/32_genie_z30_brazo_articulado_patio.jpg";
import brazoGenieCatedral from "../fotos/49_genie_brazo_articulado_vista_trasera_catedral.jpg";
import brazosJlgFlota from "../fotos/10_jlg_flota_brazos_articulados.jpg";
import brazosAndenes from "../fotos/25_jlg_brazos_articulados_andenes_carga.jpg";
import tijeraAvion from "../fotos/29_jlg_plataforma_tijera_mantenimiento_avion.jpg";
import tijera3220 from "../fotos/07_jlg_3220_plataforma_tijera.jpg";
import tijera2632 from "../fotos/01_jlg_2632es_plataforma_tijera.jpg";
import compactas from "../fotos/09_jlg_plataformas_compactas_dobles.jpg";
import lowboy from "../fotos/36_jlg_1200sjp_sobre_lowboy_planta.jpg";
import oficina from "../fotos/38_jlg_brazo_articulado_fachada_oficinas_bapsa.jpg";
import flotaPatio from "../fotos/35_flota_plataformas_genie_jlg_patio.jpg";
import articulacion from "../fotos/02_jlg_600aj_articulacion_hidraulica.jpg";
import canastilla from "../fotos/06_jlg_canastilla_y_controles.jpg";

export const FOTO_HEROE = brazoCervecera;

export const FOTO_FAMILIA: Record<string, ImageMetadata> = {
  "brazos-articulados-electricos": brazoZ30Patio,
  "plataformas-de-tijera": tijeraAvion,
  "elevadores-personales": compactas,
  "traslado-de-maquinaria": lowboy,
};

export const FOTO_MAQUINA: Record<string, ImageMetadata> = {
  "genie-z-45-25j-dc": brazoGenieCatedral,
  "jlg-e450a": brazosJlgFlota,
  "jlg-n40e": brazosAndenes,
  "genie-gs-3246": tijera3220,
  "jlg-2630es": tijera2632,
};

export const FOTO_SECCION = {
  nosotros: oficina,
  venta: flotaPatio,
  servicio: articulacion,
  refacciones: canastilla,
} as const;
