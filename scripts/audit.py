#!/usr/bin/env python3
"""
Auditoría SEO + GEO. Solo stdlib — no requiere instalar nada.

Uso:
    python audit.py https://ejemplo.com                  # sitio en vivo
    python audit.py ./dist --base-url https://ejemplo.com  # build local
    python audit.py https://ejemplo.com --strict          # exit 1 si hay errores
    python audit.py https://ejemplo.com --json            # salida JSON para CI

Comprueba, por ruta: title, description, canonical, Open Graph, conteo de h1,
saltos de heading, JSON-LD válido, imágenes sin alt o sin dimensiones, y
directivas noindex. Comprueba, globalmente: duplicados de title y description,
y presencia de robots.txt y sitemap.xml.

Lo que este script NO puede comprobar: si el contenido depende de JavaScript.
Descarga el HTML crudo, que es exactamente lo que ve un crawler generativo —
así que si una comprobación falla aquí y "se ve bien" en el navegador, el
problema es de renderizado.
"""

import argparse
import gzip
import json
import os
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

TITLE_MIN, TITLE_MAX = 30, 60
DESC_MIN, DESC_MAX = 120, 160
UA = "Mozilla/5.0 (compatible; SEO-GEO-WEBDEV-audit/1.0)"
MAX_PAGES_DEFAULT = 50


# --------------------------------------------------------------------------
# Parser
# --------------------------------------------------------------------------

class PageParser(HTMLParser):
    """Extrae del HTML crudo lo que necesita la auditoría."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = None
        self._in_title = False
        self.meta = {}          # name -> content
        self.props = {}         # property (og:, etc.) -> content
        self.canonical = None
        self.lang = None
        self.headings = []      # [(level, texto)]
        self._heading_level = None
        self._heading_buf = []
        self.images = []        # [{'alt':…, 'w':…, 'h':…, 'src':…}]
        self.jsonld_raw = []
        self._in_jsonld = False
        self._jsonld_buf = []
        self.links = []         # hrefs internos crudos
        self.text_chars = 0
        self._skip_depth = 0    # dentro de script/style

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            name = (a.get("name") or "").lower()
            prop = (a.get("property") or "").lower()
            content = a.get("content", "")
            if name:
                self.meta[name] = content
            if prop:
                self.props[prop] = content
        elif tag == "link":
            rels = (a.get("rel") or "").lower().split()
            if "canonical" in rels:
                self.canonical = a.get("href")
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._heading_level = int(tag[1])
            self._heading_buf = []
        elif tag == "img":
            self.images.append({
                "alt": a.get("alt"),
                "w": a.get("width"),
                "h": a.get("height"),
                "src": a.get("src", "")[:120],
                "loading": a.get("loading"),
            })
        elif tag == "a":
            href = a.get("href")
            if href:
                self.links.append(href)
        elif tag == "script":
            if (a.get("type") or "").lower() == "application/ld+json":
                self._in_jsonld = True
                self._jsonld_buf = []
            self._skip_depth += 1
        elif tag in ("style", "noscript", "template"):
            self._skip_depth += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6") and self._heading_level:
            text = " ".join("".join(self._heading_buf).split())
            self.headings.append((self._heading_level, text))
            self._heading_level = None
        elif tag == "script":
            if self._in_jsonld:
                self.jsonld_raw.append("".join(self._jsonld_buf))
                self._in_jsonld = False
            self._skip_depth = max(0, self._skip_depth - 1)
        elif tag in ("style", "noscript", "template"):
            self._skip_depth = max(0, self._skip_depth - 1)

    def handle_data(self, data):
        if self._in_title:
            self.title = (self.title or "") + data
        if self._in_jsonld:
            self._jsonld_buf.append(data)
        if self._heading_level:
            self._heading_buf.append(data)
        if self._skip_depth == 0:
            self.text_chars += len(data.strip())


# --------------------------------------------------------------------------
# Origen de páginas
# --------------------------------------------------------------------------

def fetch(url, timeout=20):
    req = Request(url, headers={"User-Agent": UA})
    with urlopen(req, timeout=timeout) as r:
        raw = r.read()
        if r.headers.get("Content-Encoding") == "gzip" or url.endswith(".gz"):
            try:
                raw = gzip.decompress(raw)
            except OSError:
                pass
        charset = r.headers.get_content_charset() or "utf-8"
        return raw.decode(charset, errors="replace"), dict(r.headers), r.status


def urls_from_sitemap(base, seen=None, depth=0):
    """Lee sitemap.xml, siguiendo índices de sitemaps un nivel."""
    seen = seen if seen is not None else set()
    if depth > 2:
        return []
    sm = urljoin(base, "/sitemap.xml")
    try:
        body, _, _ = fetch(sm)
    except (URLError, HTTPError, OSError):
        return []
    locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body)
    if "<sitemapindex" in body:
        out = []
        for child in locs[:10]:
            if child in seen:
                continue
            seen.add(child)
            try:
                cb, _, _ = fetch(child)
                out += re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", cb)
            except (URLError, HTTPError, OSError):
                continue
        return out
    return locs


def crawl_from_home(base, limit):
    """Fallback si no hay sitemap: BFS superficial desde la home."""
    host = urlparse(base).netloc
    queue, seen, pages = [base], {base}, []
    while queue and len(pages) < limit:
        url = queue.pop(0)
        try:
            body, headers, status = fetch(url)
        except (URLError, HTTPError, OSError):
            continue
        pages.append((url, body, headers, status))
        p = PageParser()
        try:
            p.feed(body)
        except Exception:
            pass
        for href in p.links:
            if href.startswith(("mailto:", "tel:", "#", "javascript:")):
                continue
            nxt = urljoin(url, href).split("#")[0]
            if urlparse(nxt).netloc != host or nxt in seen:
                continue
            if re.search(r"\.(jpg|jpeg|png|webp|avif|svg|pdf|zip|mp4|css|js)$", nxt, re.I):
                continue
            seen.add(nxt)
            queue.append(nxt)
    return pages


def collect_remote(base, limit):
    base = base.rstrip("/")
    urls = urls_from_sitemap(base)
    if not urls:
        print(f"  sin sitemap.xml usable — rastreando desde la home (máx {limit})", file=sys.stderr)
        return crawl_from_home(base, limit), False
    pages = []
    for u in urls[:limit]:
        try:
            body, headers, status = fetch(u)
            pages.append((u, body, headers, status))
        except HTTPError as e:
            pages.append((u, "", {}, e.code))
        except (URLError, OSError):
            pages.append((u, "", {}, 0))
    return pages, True


def collect_local(root, base_url, limit):
    pages = []
    for dirpath, _, files in os.walk(root):
        for f in files:
            if not f.endswith((".html", ".htm")):
                continue
            path = os.path.join(dirpath, f)
            rel = os.path.relpath(path, root).replace(os.sep, "/")
            route = "/" + re.sub(r"(^|/)index\.html?$", r"\1", rel)
            route = re.sub(r"\.html?$", "", route) or "/"
            url = urljoin(base_url.rstrip("/") + "/", route.lstrip("/")) if base_url else route
            with open(path, encoding="utf-8", errors="replace") as fh:
                pages.append((url, fh.read(), {}, 200))
            if len(pages) >= limit:
                return pages
    return pages


# --------------------------------------------------------------------------
# Comprobaciones
# --------------------------------------------------------------------------

def audit_page(url, body, headers, status):
    errors, warnings = [], []

    if status != 200:
        errors.append(f"status {status}")
        return {"url": url, "errors": errors, "warnings": warnings,
                "title": None, "description": None}

    p = PageParser()
    try:
        p.feed(body)
    except Exception as e:
        errors.append(f"HTML no parseable: {e}")

    title = (p.title or "").strip()
    desc = (p.meta.get("description") or "").strip()

    # noindex
    robots_meta = (p.meta.get("robots") or "").lower()
    xrt = (headers.get("X-Robots-Tag") or "").lower()
    noindex = "noindex" in robots_meta or "noindex" in xrt
    if noindex:
        warnings.append("noindex — verifica que sea intencional")

    # title
    if not title:
        errors.append("sin <title>")
    else:
        n = len(title)
        if n < TITLE_MIN:
            warnings.append(f"title corto ({n} car.)")
        elif n > TITLE_MAX:
            warnings.append(f"title largo ({n} car.) — se cortará en SERP")

    # description
    if not desc:
        errors.append("sin meta description")
    else:
        n = len(desc)
        if n < DESC_MIN:
            warnings.append(f"description corta ({n} car.)")
        elif n > DESC_MAX:
            warnings.append(f"description larga ({n} car.)")

    # canonical
    if not p.canonical:
        errors.append("sin canonical")
    else:
        if not p.canonical.startswith("http"):
            errors.append("canonical relativa — debe ser absoluta")
        else:
            a = urlparse(p.canonical)
            b = urlparse(url)
            if (a.netloc, a.path.rstrip("/")) != (b.netloc, b.path.rstrip("/")):
                warnings.append(f"canonical apunta a otra URL: {p.canonical}")

    # lang
    if not p.lang:
        errors.append("<html> sin atributo lang")

    # Open Graph
    for tag in ("og:title", "og:description", "og:image", "og:url"):
        if not p.props.get(tag):
            errors.append(f"falta {tag}")
    if p.props.get("og:image") and not p.props["og:image"].startswith("http"):
        warnings.append("og:image relativa — varias plataformas la ignoran")
    if not p.props.get("og:image:alt"):
        warnings.append("falta og:image:alt")

    # headings
    h1s = [t for lvl, t in p.headings if lvl == 1]
    if len(h1s) == 0:
        errors.append("sin <h1>")
    elif len(h1s) > 1:
        errors.append(f"{len(h1s)} elementos <h1> (debe haber 1)")
    prev = 0
    for lvl, _ in p.headings:
        if prev and lvl > prev + 1:
            warnings.append(f"salto de heading h{prev} → h{lvl}")
            break
        prev = lvl

    # JSON-LD
    if not p.jsonld_raw:
        errors.append("sin JSON-LD")
    types = []
    for i, blob in enumerate(p.jsonld_raw):
        try:
            data = json.loads(blob)
        except json.JSONDecodeError as e:
            errors.append(f"JSON-LD #{i+1} no parsea ({e.msg}) — se descarta entero")
            continue
        nodes = data.get("@graph", data) if isinstance(data, dict) else data
        nodes = nodes if isinstance(nodes, list) else [nodes]
        for node in nodes:
            if not isinstance(node, dict):
                continue
            t = node.get("@type")
            if not t:
                warnings.append("nodo JSON-LD sin @type")
            else:
                types += t if isinstance(t, list) else [t]

    # imágenes
    no_alt = [i for i in p.images if i["alt"] is None]
    empty_alt = [i for i in p.images if i["alt"] == ""]
    no_dim = [i for i in p.images if not (i["w"] and i["h"])]
    if no_alt:
        errors.append(f"{len(no_alt)} imagen(es) sin atributo alt")
    if empty_alt:
        warnings.append(f"{len(empty_alt)} imagen(es) con alt vacío (ok solo si son decorativas)")
    if no_dim:
        warnings.append(f"{len(no_dim)} imagen(es) sin width/height — riesgo de CLS")

    # contenido sin JS
    if p.text_chars < 500:
        errors.append(
            f"solo {p.text_chars} caracteres de texto en el HTML crudo — "
            "probable dependencia de JavaScript, invisible para crawlers generativos")

    return {
        "url": url,
        "title": title or None,
        "description": desc or None,
        "canonical": p.canonical,
        "schema_types": sorted(set(types)),
        "text_chars": p.text_chars,
        "noindex": noindex,
        "errors": errors,
        "warnings": warnings,
    }


def audit_site_files(base):
    errors, warnings, info = [], [], {}
    try:
        body, _, status = fetch(urljoin(base, "/robots.txt"))
        info["robots.txt"] = True
        if re.search(r"^\s*User-agent:\s*\*\s*$.*?^\s*Disallow:\s*/\s*$",
                     body, re.M | re.S | re.I):
            errors.append("robots.txt bloquea todo el sitio (Disallow: /)")
        if "sitemap:" not in body.lower():
            warnings.append("robots.txt no declara Sitemap:")
        blocked = [b for b in ("OAI-SearchBot", "ChatGPT-User", "PerplexityBot",
                               "Claude-User", "Claude-SearchBot")
                   if re.search(rf"User-agent:\s*{b}\s*\n\s*Disallow:\s*/", body, re.I)]
        if blocked:
            warnings.append("bots de búsqueda generativa bloqueados: " + ", ".join(blocked)
                            + " — el sitio queda fuera de las respuestas de IA")
    except (URLError, HTTPError, OSError):
        errors.append("sin robots.txt accesible")
        info["robots.txt"] = False

    try:
        body, _, _ = fetch(urljoin(base, "/sitemap.xml"))
        info["sitemap.xml"] = True
        n = len(re.findall(r"<loc>", body))
        info["sitemap_urls"] = n
        if n == 0:
            errors.append("sitemap.xml sin URLs")
    except (URLError, HTTPError, OSError):
        errors.append("sin sitemap.xml accesible")
        info["sitemap.xml"] = False

    try:
        fetch(urljoin(base, "/llms.txt"))
        info["llms.txt"] = True
    except (URLError, HTTPError, OSError):
        info["llms.txt"] = False

    return errors, warnings, info


# --------------------------------------------------------------------------
# Reporte
# --------------------------------------------------------------------------

def duplicates(results, field):
    seen = defaultdict(list)
    for r in results:
        if r.get(field):
            seen[r[field]].append(r["url"])
    return {k: v for k, v in seen.items() if len(v) > 1}


def main():
    ap = argparse.ArgumentParser(description="Auditoría SEO + GEO")
    ap.add_argument("target", help="URL del sitio o directorio del build")
    ap.add_argument("--base-url", default="", help="URL base si el target es un directorio")
    ap.add_argument("--limit", type=int, default=MAX_PAGES_DEFAULT, help="máximo de páginas")
    ap.add_argument("--strict", action="store_true", help="exit 1 si hay errores")
    ap.add_argument("--json", action="store_true", dest="as_json", help="salida JSON")
    args = ap.parse_args()

    is_url = args.target.startswith(("http://", "https://"))
    site_errors, site_warnings, site_info = [], [], {}

    if is_url:
        base = args.target.rstrip("/")
        if not args.as_json:
            print(f"Auditando {base}\n", file=sys.stderr)
        site_errors, site_warnings, site_info = audit_site_files(base)
        pages, _ = collect_remote(base, args.limit)
    else:
        pages = collect_local(args.target, args.base_url, args.limit)
        if not pages:
            print("No se encontraron archivos .html en ese directorio.", file=sys.stderr)
            return 2

    results = [audit_page(*p) for p in pages]

    dup_titles = duplicates(results, "title")
    dup_descs = duplicates(results, "description")

    n_err = sum(len(r["errors"]) for r in results) + len(site_errors)
    n_warn = sum(len(r["warnings"]) for r in results) + len(site_warnings)

    if args.as_json:
        print(json.dumps({
            "site": {"errors": site_errors, "warnings": site_warnings, "info": site_info},
            "pages": results,
            "duplicate_titles": dup_titles,
            "duplicate_descriptions": dup_descs,
            "totals": {"pages": len(results), "errors": n_err, "warnings": n_warn},
        }, ensure_ascii=False, indent=2))
    else:
        if site_errors or site_warnings or site_info:
            print("═══ Archivos de raíz ═══")
            for k, v in site_info.items():
                print(f"  {k}: {v}")
            for e in site_errors:
                print(f"  ✗ {e}")
            for w in site_warnings:
                print(f"  ⚠ {w}")
            print()

        for r in results:
            if not r["errors"] and not r["warnings"]:
                print(f"✓ {r['url']}")
                continue
            print(f"\n{r['url']}")
            if r.get("title"):
                print(f"  title ({len(r['title'])}): {r['title']}")
            if r.get("schema_types"):
                print(f"  schema: {', '.join(r['schema_types'])}")
            for e in r["errors"]:
                print(f"  ✗ {e}")
            for w in r["warnings"]:
                print(f"  ⚠ {w}")

        if dup_titles or dup_descs:
            print("\n═══ Duplicados ═══")
            for t, urls in dup_titles.items():
                print(f"  ✗ title repetido en {len(urls)} rutas: {t[:70]}")
                for u in urls[:5]:
                    print(f"      {u}")
            for d, urls in dup_descs.items():
                print(f"  ✗ description repetida en {len(urls)} rutas")
                for u in urls[:5]:
                    print(f"      {u}")

        print(f"\n═══ {len(results)} páginas · {n_err} errores · {n_warn} avisos ═══")
        if n_err == 0:
            print("Sin errores. Falta comprobar aparte: enlaces rotos, Lighthouse "
                  "y validación de rich results.")

    total_errors = n_err + len(dup_titles) + len(dup_descs)
    return 1 if (args.strict and total_errors) else 0


if __name__ == "__main__":
    sys.exit(main())
