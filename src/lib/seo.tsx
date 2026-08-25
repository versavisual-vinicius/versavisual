import { useEffect } from "react"

export const SITE_URL = "https://www.versavisual.com.br"
export const OG_IMAGE = `${SITE_URL}/images/foto-a-producao-nao-falha.webp`

export interface SeoProps {
  title: string
  description: string
  path: string // e.g. "/portfolio"
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export type Seo = SeoProps

function upsertMeta(
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

const JSON_LD_ID = "vv-jsonld-route"

/** Per-route metadata, canonical, Open Graph and JSON-LD injection. */
export function useSeo({
  title,
  description,
  path,
  noindex,
  jsonLd,
}: SeoProps) {
  const jsonLdContent = jsonLd ? JSON.stringify(jsonLd) : ""

  useEffect(() => {
    const cleanPath =
      path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`
    const canonical = `${SITE_URL}${cleanPath}`
    document.title = title
    document.documentElement.lang = "pt-BR"

    upsertMeta('meta[name="description"]', "name", "description", description)
    upsertLink("canonical", canonical)

    if (noindex) {
      upsertMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow")
    } else {
      upsertMeta(
        'meta[name="robots"]',
        "name",
        "robots",
        "index, follow, max-image-preview:large",
      )
    }

    upsertMeta('meta[property="og:title"]', "property", "og:title", title)
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description,
    )
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website")
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonical)
    upsertMeta('meta[property="og:image"]', "property", "og:image", OG_IMAGE)
    upsertMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      "VERSAVISUAL",
    )
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", "pt_BR")
    upsertMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    )
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title)
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description,
    )
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", OG_IMAGE)

    const prev = document.getElementById(JSON_LD_ID)
    if (prev) prev.remove()
    if (jsonLdContent) {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.id = JSON_LD_ID
      script.textContent = jsonLdContent
      document.head.appendChild(script)
    }
  }, [title, description, path, noindex, jsonLdContent])
}

export interface BreadcrumbItem {
  name: string
  path: string
}

export function breadcrumb(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path.startsWith("/") ? it.path : `/${it.path}`}`,
    })),
  }
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VERSAVISUAL",
    image: `${SITE_URL}/brand-assets/logo-og.png`,
    "@id": `${SITE_URL}/#corporation`,
    url: SITE_URL,
    telephone: "+5511950747192",
    email: "hub@versavisual.com.br",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.55052,
      longitude: -46.633308,
    },
    sameAs: ["https://wa.me/5511950747192"],
  }
}

export function serviceSchema(options: {
  name: string
  description: string
  slug: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    provider: {
      "@type": "Organization",
      name: "VERSAVISUAL",
      url: SITE_URL,
    },
    areaServed: "BR",
    url: `${SITE_URL}/${options.slug.replace(/^\/+/, "")}`,
    potentialAction: {
      "@type": "Action",
      name: "Solicitar Diagnóstico para este Segmento",
      target: `${SITE_URL}/diagnostico-visual`,
    },
  }
}

export function creativeWorkSchema(options: {
  name: string
  category: string
  city?: string
  description?: string
  image: string
  gallery?: readonly string[]
  url: string
}) {
  const images = [
    options.image.startsWith("http")
      ? options.image
      : `${SITE_URL}${
          options.image.startsWith("/") ? options.image : `/${options.image}`
        }`,
    ...(options.gallery ?? []).map((img) =>
      img.startsWith("http")
        ? img
        : `${SITE_URL}${img.startsWith("/") ? img : `/${img}`}`,
    ),
  ]

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: options.name,
    headline: options.name,
    description:
      options.description ||
      `Case ${options.name} em ${options.city || "Brasil"} — projeto de ${options.category} produzido pela VERSAVISUAL.`,
    about: options.category,
    contentLocation: options.city,
    image: Array.from(new Set(images)),
    creator: {
      "@type": "Organization",
      name: "VERSAVISUAL",
      url: SITE_URL,
    },
    url: options.url.startsWith("http")
      ? options.url
      : `${SITE_URL}${
          options.url.startsWith("/") ? options.url : `/${options.url}`
        }`,
  }
}

export function imageGallerySchema(options: {
  name: string
  description?: string
  photos: readonly string[]
  url: string
}) {
  const images = options.photos.map((img) =>
    img.startsWith("http")
      ? img
      : `${SITE_URL}${img.startsWith("/") ? img : `/${img}`}`,
  )

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: options.name,
    description:
      options.description ||
      `Galeria de imagens do projeto ${options.name} — VERSAVISUAL`,
    url: options.url.startsWith("http")
      ? options.url
      : `${SITE_URL}${
          options.url.startsWith("/") ? options.url : `/${options.url}`
        }`,
    image: images,
    author: {
      "@type": "Organization",
      name: "VERSAVISUAL",
      url: SITE_URL,
    },
  }
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  }
}
