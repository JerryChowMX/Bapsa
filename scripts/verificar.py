#!/usr/bin/env python3
"""
Comprobaciones que audit.py no cubre. Rompen el build si fallan.

1. Enlaces internos rotos: todo href interno tiene que resolver a un archivo
   del build. Una página huérfana no se rastrea, y un enlace roto se lleva por
   delante el presupuesto de rastreo.
2. Referencias @id del JSON-LD: un @id referenciado que no existe en ningún
   grafo del sitio deja el nodo colgando. Un JSON-LD con un error se descarta
   entero y en silencio, por eso esto no es opcional.
3. Contenido en el HTML crudo: se verifica que el primer párrafo de cada
   página exista sin ejecutar JavaScript.
4. Imágenes: ninguna sin alt, ninguna sin width y height.
5. Texto pegado: Astro recorta el espacio entre un texto y una etiqueta en
   línea cuando la etiqueta abre en el renglón siguiente, y sale "revise la
   venta" convertido en "revise laventa". Se ve mal y ensucia el fragmento
   que un motor generativo extrae.

Uso: python3 scripts/verificar.py ./dist
"""
import json
import os
import re
import sys
from html.parser import HTMLParser

RAIZ = sys.argv[1] if len(sys.argv) > 1 else "./dist"


class Lector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.enlaces = []
        self.anclas_sin_href = 0
        self.imgs = []
        self.jsonld = []
        self._en_ld = False
        self.h1 = 0
        self.headings = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a":
            # Un <a> sin href no es un enlace: no se puede seguir, no se puede
            # tabular y no lo rastrea nadie. Casi siempre es una variable que
            # llegó `undefined` y el atributo se cayó en silencio.
            if a.get("href"):
                self.enlaces.append(a["href"])
            elif "name" not in a and "id" not in a:
                self.anclas_sin_href += 1
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._en_ld = True
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.headings.append(int(tag[1]))
            if tag == "h1":
                self.h1 += 1

    def handle_endtag(self, tag):
        if tag == "script":
            self._en_ld = False

    def handle_data(self, data):
        if self._en_ld and data.strip():
            self.jsonld.append(data)


def rutas_del_build(raiz):
    """Mapa de ruta pública -> archivo, tal como lo sirve un host estático."""
    mapa = {}
    for dirpath, _, files in os.walk(raiz):
        for f in files:
            ruta_fs = os.path.join(dirpath, f)
            rel = os.path.relpath(ruta_fs, raiz).replace(os.sep, "/")
            mapa["/" + rel] = ruta_fs
            if rel.endswith(".html"):
                sin_ext = "/" + re.sub(r"\.html$", "", rel)
                mapa[sin_ext] = ruta_fs
                if rel == "index.html":
                    mapa["/"] = ruta_fs
    return mapa


def main():
    if not os.path.isdir(RAIZ):
        print(f"No existe el directorio {RAIZ}", file=sys.stderr)
        return 1

    mapa = rutas_del_build(RAIZ)
    paginas = sorted({v for k, v in mapa.items() if v.endswith(".html")})

    errores, avisos = [], []
    ids_definidos, ids_referenciados = set(), {}

    for archivo in paginas:
        rel = "/" + os.path.relpath(archivo, RAIZ).replace(os.sep, "/")
        html = open(archivo, encoding="utf-8").read()
        p = Lector()
        p.feed(html)

        # 1. Enlaces internos
        if p.anclas_sin_href:
            errores.append(f"{rel}: {p.anclas_sin_href} etiqueta(s) <a> sin href")

        for href in p.enlaces:
            if re.match(r"^(https?:|mailto:|tel:|#|data:)", href):
                continue
            destino = href.split("#")[0].split("?")[0]
            if not destino or not destino.startswith("/"):
                continue
            if destino not in mapa:
                errores.append(f"{rel}: enlace interno roto -> {href}")

        # 2. JSON-LD
        for bruto in p.jsonld:
            try:
                datos = json.loads(bruto)
            except json.JSONDecodeError as e:
                errores.append(f"{rel}: JSON-LD no parsea ({e})")
                continue
            nodos = datos.get("@graph", [datos])
            for n in nodos:
                if not isinstance(n, dict):
                    continue
                if "@type" not in n:
                    errores.append(f"{rel}: nodo JSON-LD sin @type")
                if "@id" in n and len(n) > 1:
                    ids_definidos.add(n["@id"])

                def recolectar(v):
                    if isinstance(v, dict):
                        if set(v.keys()) == {"@id"}:
                            ids_referenciados.setdefault(v["@id"], rel)
                        for x in v.values():
                            recolectar(x)
                    elif isinstance(v, list):
                        for x in v:
                            recolectar(x)

                recolectar(n)

        # 3. Un solo h1 y jerarquía sin saltos
        if p.h1 != 1:
            errores.append(f"{rel}: {p.h1} etiquetas h1 (debe haber exactamente 1)")
        anterior = 0
        for nivel in p.headings:
            if anterior and nivel > anterior + 1:
                avisos.append(f"{rel}: salto de encabezado h{anterior} -> h{nivel}")
            anterior = nivel

        # 4. Imágenes
        for img in p.imgs:
            if not img.get("alt") and img.get("alt") != "":
                errores.append(f"{rel}: <img> sin alt ({img.get('src')})")
            if not img.get("width") or not img.get("height"):
                errores.append(f"{rel}: <img> sin width/height ({img.get('src')})")

        # 5. Texto pegado a una etiqueta en línea
        cuerpo = re.sub(r"<(script|style|head)[\s\S]*?</\1>", "", html)
        for pat in (
            # Cualquier carácter que no sea espacio ni cierre de etiqueta
            # pegado a una etiqueta en línea que abre.
            r"[^\s>]<(?:a |strong>|em>|code>|b>)",
            r"</(?:a|strong|em|code|b)>[^\s<.,;:!?)\]]",
        ):
            for m in re.finditer(pat, cuerpo):
                ctx = cuerpo[max(0, m.start() - 45) : m.end() + 35].replace("\n", " ")
                errores.append(f"{rel}: texto pegado a una etiqueta -> …{ctx}…")

        # 6. Contenido en el HTML crudo: tiene que haber texto real fuera de
        #    scripts y estilos, no solo un contenedor que se llene con JS.
        sin_script = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", html)
        texto = re.sub(r"<[^>]+>", " ", sin_script)
        if len(re.sub(r"\s+", " ", texto).strip()) < 600:
            errores.append(f"{rel}: menos de 600 caracteres de texto en el HTML crudo")

    for id_, donde in ids_referenciados.items():
        if id_ not in ids_definidos:
            errores.append(f"{donde}: @id referenciado que no existe en ningún grafo -> {id_}")

    for a in avisos:
        print(f"⚠ {a}")
    for e in errores:
        print(f"✗ {e}")

    print(
        f"\n═══ {len(paginas)} páginas · {len(errores)} errores · {len(avisos)} avisos ═══"
    )
    print(f"@id definidos: {len(ids_definidos)} · referenciados: {len(ids_referenciados)}")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())
