// Mientras BAPSA no tenga dominio propio, *.pages.dev muestra "sitio en construcción".
// Un dominio personalizado (www.bapsa.com.mx) pasa derecho al sitio real.
// Para revisar el sitio en pages.dev: definir ACCESO_PREVIO en Pages y abrir
// cualquier página con ?previo=<valor>; queda una cookie de sesión.

const PAGINA = `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>BAPSA · Sitio en construcción</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
  :root { --azul:#05025E; --chasis:#0B0A24; --acero:#545C7A; --aire:#F2F5FC; --canastilla:#F38735; }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100svh; display:grid; place-items:center; padding:24px;
    background:var(--aire); color:var(--chasis); font:400 18px/1.5 "Public Sans", system-ui, -apple-system, sans-serif; }
  main { max-width:34rem; border-top:8px solid var(--canastilla); padding-top:32px; }
  img { display:block; width:min(220px,60vw); height:auto; margin-bottom:32px; }
  h1 { margin:0 0 12px; color:var(--azul); font:800 clamp(2rem,7vw,3rem)/1.05 "Archivo","Helvetica Neue",Arial,sans-serif; text-transform:uppercase; }
  p { margin:0; color:var(--acero); }
</style>
</head>
<body>
<main>
  <img src="/brand/bapsa-logo.png" alt="BAPSA · Equipo de Elevación" width="220">
  <h1>Sitio en construcción</h1>
  <p>Estamos terminando el sitio de BAPSA. Muy pronto estará disponible.</p>
</main>
</body>
</html>`;

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  if (!url.hostname.endsWith('.pages.dev')) return next();

  const clave = env.ACCESO_PREVIO;
  if (clave) {
    if (url.searchParams.get('previo') === clave) {
      const limpia = new URL(url);
      limpia.searchParams.delete('previo');
      return new Response(null, {
        status: 302,
        headers: {
          Location: limpia.toString(),
          'Set-Cookie': `previo=${encodeURIComponent(clave)}; Path=/; Secure; HttpOnly; SameSite=Lax`,
        },
      });
    }
    if ((request.headers.get('Cookie') || '').split(/;\s*/).includes(`previo=${encodeURIComponent(clave)}`)) return next();
  }

  if (url.pathname === '/favicon.svg' || url.pathname === '/brand/bapsa-logo.png') return next();

  return new Response(PAGINA, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': '86400',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
