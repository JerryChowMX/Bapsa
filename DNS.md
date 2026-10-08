# DNS y salida a producción de bapsa.com.mx

Preparado el 8 de octubre de 2026. Plan: **Cloudflare Pages**, como dice el
`README.md`. Dominio canónico: `https://www.bapsa.com.mx`.

> No pude consultar el DNS actual desde el entorno de la sesión (no hay `dig`
> y el proxy bloquea las consultas externas), y el dominio no está en la cuenta
> de Vercel conectada. **Antes de cambiar nada, exporte la zona actual** (ver
> paso 0): ahí puede haber correo (`bapsa@prodigy.net.mx` es de Telmex, pero
> puede haber MX propios) y otros servicios que no se deben pisar.

## Paso 0 · Respaldo (obligatorio)

1. En el registrador/DNS actual de `bapsa.com.mx`, exportar o capturar **todos**
   los registros (A, AAAA, CNAME, MX, TXT, SRV, CAA).
2. Anotar quién es el registrador (en `.mx` se consulta en `rdap.mx`) y dónde
   están hoy los nameservers.
3. Bajar el TTL de los registros A/CNAME actuales a 300 s, 24 h antes del cambio.

## Paso 1 · Proyecto en Cloudflare Pages

| Campo | Valor |
|---|---|
| Repositorio | `JerryChowMX/Bapsa` |
| Rama de producción | la que se decida mergear (hoy `claude/friendly-babbage-e9u3iv`) |
| Build command | `npm run build` |
| Output directory | `dist` |
| `NODE_VERSION` | `22.12.0` |
| `ROBOTS_BLOQUEAR` | **No definirla en producción** (solo en preview) |

No agregar `wrangler.toml` (rompe el build; ver README).

## Paso 2 · Registros DNS

Dos caminos. El **A** es el recomendado porque deja la zona completa en Cloudflare
y permite la redirección del dominio sin `www`.

### A. Cambiar nameservers a Cloudflare (recomendado)

1. Agregar `bapsa.com.mx` a Cloudflare (plan Free) y **copiar ahí todos los
   registros del paso 0**, sobre todo MX y TXT de correo.
2. Cambiar los NS en el registrador a los dos que Cloudflare asigne.
3. En Pages → Custom domains, agregar `www.bapsa.com.mx` (crea solo el CNAME).
4. Registros resultantes:

| Tipo | Nombre | Destino | Proxy | Nota |
|---|---|---|---|---|
| CNAME | `www` | `<proyecto>.pages.dev` | Sí | Sitio |
| A | `@` | `192.0.2.1` | Sí | Ficticia; solo para que la redirección del apex pase por Cloudflare |
| MX / TXT (SPF, DKIM, DMARC) | `@` | los actuales | n/a | **Copiar sin tocar** |
| TXT | `@` | verificación de Search Console / Bing | n/a | Ver paso 4 |
| CAA | `@` | opcional; si existe, debe permitir `letsencrypt.org`, `pki.goog`, `digicert.com` | n/a | |

5. **Redirección del apex** (Pages no la hace con `_redirects`, que no distingue
   host): Rules → Redirect Rules →
   *Si* `Hostname equals bapsa.com.mx` → *Redirigir a* dinámico
   `concat("https://www.bapsa.com.mx", http.request.uri.path)` → **301**,
   conservando query string.

### B. Mantener el DNS donde está

Solo se puede si el proveedor permite CNAME en el apex (CNAME flattening / ALIAS).

| Tipo | Nombre | Destino |
|---|---|---|
| CNAME | `www` | `<proyecto>.pages.dev` |
| ALIAS/ANAME | `@` | `<proyecto>.pages.dev` |

Sin eso, el apex no puede apuntar a Pages y la redirección 301 no es posible
con Pages; habría que usar el redireccionador del propio proveedor.
Pages solo da certificado al dominio si el DNS está en Cloudflare para el apex.

## Paso 3 · Antes de apuntar el dominio

- [ ] Preview en `*.pages.dev` revisado por BAPSA, con `ROBOTS_BLOQUEAR=1`.
- [ ] Quitar `ROBOTS_BLOQUEAR` y redesplegar.
- [ ] Generar `public/og/default.jpg` (1200×630, <300 KB). **Hoy no existe** y
      todas las páginas lo declaran en `og:image`: WhatsApp y redes salen sin imagen.
- [ ] URLs viejas del sitio anterior: `public/_redirects` solo cubre las 4 de
      septiembre. El README menciona `/brazos-articulados-electricos.html`
      → 301, pero **esa regla no existe**. Hay que listar las URLs que Google
      ya tiene indexadas (Search Console o `site:bapsa.com.mx`) y agregarlas.
- [ ] Coordenadas (`SITE.geo`) y `sameAs` (GBP, Facebook, etc.) siguen vacíos.

## Paso 4 · Después de apuntar

Los siete `curl` del README, más:

```bash
curl -sI http://bapsa.com.mx            # 301 -> https://www.bapsa.com.mx/ (un solo salto)
curl -sI https://bapsa.com.mx/equipo    # 301 -> https://www.bapsa.com.mx/equipo
curl -sI https://www.bapsa.com.mx       # 200, sin X-Robots-Tag
curl -s  https://www.bapsa.com.mx/robots.txt | head -4   # sin "Disallow: /"
```

Luego: verificar Search Console y Bing Webmaster **por DNS (TXT)** y enviar
`https://www.bapsa.com.mx/sitemap-index.xml`; revisar que el correo siga
llegando (prueba de envío/recepción).

## Reversa

Si algo falla, restaurar los registros del paso 0 (por eso el TTL bajo). El
sitio anterior sigue intacto mientras no se borre.
