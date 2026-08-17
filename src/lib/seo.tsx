import { useEffect } from "react"

export const SITE_URL = "https://www.versavisual.com.br"
export const OG_IMAGE = `${SITE_URL}/images/foto-a-producao-nao-falha.webp`

type Seo = {
  title: string
  description: string
  path: string // e.g. "/portfolio"
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

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
export function useSeo({ title, description, path, noindex, jsonLd }: Seo) {
  const jsonLdContent = jsonLd ? JSON.stringify(jsonLd) : ""

  useEffect(() => {
    const canonical = `${SITE_URL}${path === "/" ? "/" : path}`
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

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}
