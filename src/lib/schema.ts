/**
 * Grafo JSON-LD del sitio.
 *
 * Un solo grafo enlazado por `@id` estables, no bloques sueltos repetidos por
 * página. Las páginas hijas referencian por `@id` en vez de volver a escribir
 * el objeto completo.
 *
 * Regla que no se rompe: aquí solo se marca lo que el usuario VE en la página.
 * Marcar precios, reseñas o datos que no existen es penalizable.
 */

import { SITE, urlAbsoluta } from "../config/seo";

export const ID_ORG = `${SITE.url}/#organization`;
export const ID_WEB = `${SITE.url}/#website`;

type Nodo = Record<string, unknown>;

/** Organization + LocalBusiness. Vive en el layout raíz, en todas las rutas. */
export function nodoOrganizacion(): Nodo {
  const nodo: Nodo = {
    "@type": ["Organization", "LocalBusiness"],
    "@id": ID_ORG,
    name: SITE.name,
    alternateName: SITE.shortName,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: urlAbsoluta(SITE.logo),
      width: 512,
      height: 512,
    },
    image: urlAbsoluta(SITE.ogImage),
    description: SITE.description,
    telephone: SITE.telephone,
    email: SITE.email,
    // foundingDate se omite a propósito: "más de 20 años" es lo que BAPSA
    // sostiene, y restarlo del año en curso inventaría una fecha exacta que
    // nadie confirmó. Se agrega cuando el cliente dé el año de constitución.
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.street}, ${SITE.address.district}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: SITE.ciudades.map((c) => ({
      "@type": "City",
      name: c,
      containedInPlace: { "@type": "State", name: SITE.estado },
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.telephone,
        contactType: "sales",
        areaServed: "MX",
        availableLanguage: ["Spanish"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.telephoneAlt,
        contactType: "customer service",
        areaServed: "MX",
        availableLanguage: ["Spanish"],
      },
    ],
    knowsAbout: [
      "Renta de brazos articulados",
      "Renta de plataformas de tijera",
      "Elevadores personales",
      "Mantenimiento de equipo de elevación",
      "Refacciones para plataformas aéreas",
    ],
  };

  // Solo se emiten si están confirmados: un dato inventado en el grafo hace
  // más daño que su ausencia.
  if (SITE.geo) {
    nodo.geo = { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng };
  }
  if (SITE.sameAs.length > 0) nodo.sameAs = [...SITE.sameAs];

  return nodo;
}

export function nodoSitio(): Nodo {
  return {
    "@type": "WebSite",
    "@id": ID_WEB,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ID_ORG },
    inLanguage: SITE.lang,
  };
}

export type Miga = { nombre: string; ruta: string };

/** Acompaña SIEMPRE a migas visibles. Marcar migas que nadie ve es lo que Google sanciona. */
export function nodoMigas(migas: Miga[], rutaActual: string): Nodo {
  return {
    "@type": "BreadcrumbList",
    "@id": `${urlAbsoluta(rutaActual)}#breadcrumb`,
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: urlAbsoluta(m.ruta),
    })),
  };
}

export function nodoServicio(s: {
  nombre: string;
  descripcion: string;
  ruta: string;
  tipo: string;
}): Nodo {
  return {
    "@type": "Service",
    "@id": `${urlAbsoluta(s.ruta)}#service`,
    name: s.nombre,
    description: s.descripcion,
    serviceType: s.tipo,
    provider: { "@id": ID_ORG },
    areaServed: SITE.ciudades.map((c) => ({ "@type": "City", name: c })),
    url: urlAbsoluta(s.ruta),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: urlAbsoluta("/contacto"),
      servicePhone: { "@type": "ContactPoint", telephone: SITE.telephone },
    },
  };
}

export type ParFaq = { pregunta: string; respuesta: string };

/** Solo si el FAQ es visible en la página. */
export function nodoFaq(pares: ParFaq[], ruta: string): Nodo {
  return {
    "@type": "FAQPage",
    "@id": `${urlAbsoluta(ruta)}#faq`,
    mainEntity: pares.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };
}

/**
 * Producto de catálogo. Sin `offers` con precio: BAPSA cotiza por proyecto y
 * marcar un precio que no está en la página es exactamente lo que causa el
 * retiro de rich results.
 */
export function nodoMaquina(m: {
  nombre: string;
  descripcion: string;
  ruta: string;
  marca?: string;
  modelo?: string;
  imagen?: string;
  propiedades: { nombre: string; valor: string; unidad?: string }[];
}): Nodo {
  const nodo: Nodo = {
    "@type": "Product",
    "@id": `${urlAbsoluta(m.ruta)}#product`,
    name: m.nombre,
    description: m.descripcion,
    url: urlAbsoluta(m.ruta),
    category: "Equipo de elevación",
    additionalProperty: m.propiedades.map((p) => ({
      "@type": "PropertyValue",
      name: p.nombre,
      value: p.valor,
      ...(p.unidad ? { unitText: p.unidad } : {}),
    })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "MXN",
      priceSpecification: {
        "@type": "PriceSpecification",
        // Sin cifra: el precio se cotiza. Se declara la moneda y nada más.
        valueAddedTaxIncluded: false,
      },
      seller: { "@id": ID_ORG },
      url: urlAbsoluta("/contacto"),
      areaServed: SITE.ciudades.map((c) => ({ "@type": "City", name: c })),
    },
  };
  if (m.marca) nodo.brand = { "@type": "Brand", name: m.marca };
  if (m.modelo) nodo.model = m.modelo;
  if (m.imagen) nodo.image = urlAbsoluta(m.imagen);
  return nodo;
}

export function nodoPaginaContacto(ruta: string): Nodo {
  return {
    "@type": "ContactPage",
    "@id": `${urlAbsoluta(ruta)}#contactpage`,
    url: urlAbsoluta(ruta),
    name: "Contacto",
    isPartOf: { "@id": ID_WEB },
    about: { "@id": ID_ORG },
  };
}

/** Envuelve los nodos de la ruta con el grafo base. */
export function construirGrafo(...nodos: Nodo[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [nodoOrganizacion(), nodoSitio(), ...nodos],
  };
}
