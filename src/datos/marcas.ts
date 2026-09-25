/**
 * Logotipos de las marcas que atiende el taller.
 *
 * Los archivos son blancos sobre transparente, recortados al borde y de
 * 96 px de alto. Sobre fondo azul se usan tal cual; sobre fondo claro se
 * pintan con `mask-image` para que tomen el azul de la marca.
 *
 * Un logotipo ancho a la misma altura que uno compacto pesa el doble, así
 * que el alto se ajusta con la raíz de la proporción: `escala` multiplica
 * el alto base de cada lugar donde se muestran.
 */
import { SITE } from "../config/seo";

type Marca = (typeof SITE.marcas)[number];

const ARCHIVOS: Record<Marca, { src: string; ancho: number; alto: number }> = {
  Genie: { src: "/marcas/genie.png", ancho: 332, alto: 96 },
  JLG: { src: "/marcas/jlg.png", ancho: 286, alto: 96 },
  Haulotte: { src: "/marcas/haulotte.png", ancho: 630, alto: 96 },
  Skyjack: { src: "/marcas/skyjack.png", ancho: 474, alto: 96 },
  Snorkel: { src: "/marcas/snorkel.png", ancho: 545, alto: 96 },
  Toyota: { src: "/marcas/toyota.png", ancho: 569, alto: 96 },
  Caterpillar: { src: "/marcas/caterpillar.png", ancho: 584, alto: 96 },
};

/** Proporción de referencia: la de un logotipo de peso medio. */
const PROPORCION_BASE = 4;

export const LOGOS_MARCAS = SITE.marcas.map((nombre) => {
  const { src, ancho, alto } = ARCHIVOS[nombre];
  const proporcion = ancho / alto;
  return {
    nombre,
    src,
    ancho,
    alto,
    proporcion,
    escala: Math.round(Math.sqrt(PROPORCION_BASE / proporcion) * 100) / 100,
  };
});
