// Genera las imágenes para redes (Open Graph, 1200×630) de cada sección.
//   node scripts/generar-og.mjs
// Requiere `npm i --no-save playwright-core` y Chromium (PLAYWRIGHT_BROWSERS_PATH).
// Cada tarjeta: panel Azul BAPSA a la izquierda con el texto, foto real a la
// derecha. Sin sombras, sin degradados, esquinas rectas, naranja solo en la
// barra de acento. Los márgenes de 56 px evitan el recorte de WhatsApp.
import { chromium } from "playwright-core";
import { mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const foto = (n) => `data:image/jpeg;base64,${readFileSync(resolve(raiz, "src/fotos", n)).toString("base64")}`;
const logo = `data:image/png;base64,${readFileSync(resolve(raiz, "public/brand/bapsa-logo-claro.png")).toString("base64")}`;

const TARJETAS = [
  ["default", "Ramos Arizpe, Coahuila", "Renta de plataformas aéreas", "Brazos articulados, tijeras y elevadores. Flete propio.", "51_jlg_brazo_articulado_planta_cervecera.jpg"],
  ["renta", "Renta", "Equipo de elevación en renta", "Por día, mes o año, con entrega en obra.", "10_jlg_flota_brazos_articulados.jpg"],
  ["brazos-articulados-electricos", "Renta", "Brazos articulados eléctricos", "Hasta 15.94 m de altura de trabajo.", "32_genie_z30_brazo_articulado_patio.jpg"],
  ["plataformas-de-tijera", "Renta", "Plataformas de tijera", "Suben en vertical para trabajo en nave y obra.", "29_jlg_plataforma_tijera_mantenimiento_avion.jpg"],
  ["elevadores-personales", "Renta", "Elevadores personales", "Equipo ligero para trabajo en altura.", "genie_awp_25s_elevador_personal.jpg"],
  ["traslado-de-maquinaria", "Traslado", "Traslado de maquinaria y equipo", "Con camión propio de BAPSA.", "bapsa_camion_traslado_montacargas.jpg"],
  ["venta", "Venta", "Venta y renta anual", "Si se usa todo el año, la renta anual sale mejor.", "35_flota_plataformas_genie_jlg_patio.jpg"],
  ["servicio", "Servicio", "Servicio y pólizas", "Mantenimiento multimarca en taller propio.", "02_jlg_600aj_articulacion_hidraulica.jpg"],
  ["refacciones", "Refacciones", "Refacciones multimarca", "Genie, JLG, Haulotte, Skyjack, Snorkel, Toyota y Caterpillar.", "06_jlg_canastilla_y_controles.jpg"],
  ["nosotros", "Nosotros", "Más de 20 años en Ramos Arizpe", "Renta, venta, servicio y refacciones.", "bapsa_fachada_oficinas.jpg"],
  ["cobertura", "Cobertura", "Entrega con flete propio", "Ramos Arizpe, Saltillo, Arteaga y Santa Catarina, N.L.", "25_jlg_brazos_articulados_andenes_carga.jpg"],
  ["contacto", "Contacto", "Cotice hoy mismo", "WhatsApp 844 181 9171 · Respuesta el mismo día hábil.", "09v_genie_z30_brazo_articulado_patio_9x16.jpg"],
  ["equipo", "Catálogo", "Catálogo de equipo en renta", "Fichas de fabricante. Todo eléctrico.", "49_genie_brazo_articulado_vista_trasera_catedral.jpg"],
  ["preguntas-frecuentes", "Preguntas frecuentes", "¿Qué plataforma necesito?", "Altura, tijera o brazo, normas y entrega.", "07_jlg_3220_plataforma_tijera.jpg"],
];

const html = ([, etiqueta, titulo, sub, img]) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Public+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;display:flex;background:#05025E;overflow:hidden;font-family:"Public Sans",Arial,sans-serif}
.p{width:560px;height:630px;padding:56px;display:flex;flex-direction:column;color:#FAFBFE}
.p img{width:150px;height:auto}
.t{margin-top:auto}
.e{font:700 18px/1 Archivo,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#F5D2B4}
h1{margin-top:18px;font:800 46px/1.06 Archivo,Arial,sans-serif;text-transform:uppercase;overflow-wrap:break-word}
.b{width:72px;height:10px;background:#F38735;margin:22px 0 18px}
.s{font-size:22px;line-height:1.35;color:#E4EAF4;max-width:440px}
.f{flex:1;height:630px;background:url("${foto(img)}") center/cover}
</style></head><body>
<div class="p"><img src="${logo}" alt=""><div class="t"><div class="e">${etiqueta}</div><h1>${titulo}</h1><div class="b"></div><div class="s">${sub}</div></div></div>
<div class="f"></div></body></html>`;

mkdirSync(resolve(raiz, "public/og"), { recursive: true });
const nav = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const pag = await nav.newPage({ viewport: { width: 1200, height: 630 } });
for (const t of TARJETAS) {
  await pag.setContent(html(t), { waitUntil: "networkidle" });
  await pag.evaluate(() => document.fonts.ready);
  await pag.screenshot({ path: resolve(raiz, `public/og/${t[0]}.jpg`), type: "jpeg", quality: 84 });
  console.log("✓", t[0]);
}
await nav.close();
