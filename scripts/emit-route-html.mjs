import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const SITE_URL = "https://www.versavisual.com.br"
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/foto-a-producao-nao-falha.webp`

export function absoluteUrl(pathname = "/") {
  if (!pathname || pathname === "/") return `${SITE_URL}/`
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `${SITE_URL}${clean.replace(/\/+$/, "")}`
}

export function escapeHtmlAttribute(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function escapeJsonLd(value) {
  const jsonStr =
    typeof value === "string" ? value : JSON.stringify(value, null, 2)
  return jsonStr
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/<\/script/gi, "<\\/script")
}

export function renderSeoHead(meta) {
  const canonical = absoluteUrl(meta.canonicalPath || meta.path || "/")
  const imagePath = meta.image || "/images/foto-a-producao-nao-falha.webp"
  const ogImage = imagePath.startsWith("http")
    ? imagePath
    : `${SITE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`
  const ogType = meta.ogType || "website"
  const robots = meta.robots || "index, follow, max-image-preview:large"
  const title = meta.title || "VERSAVISUAL"
  const description = meta.description || ""

  const tags = [
    `    <title>${escapeHtmlAttribute(title)}</title>`,
    `    <meta name="description" content="${escapeHtmlAttribute(description)}" />`,
    `    <link rel="canonical" href="${escapeHtmlAttribute(canonical)}" />`,
    `    <meta name="robots" content="${escapeHtmlAttribute(robots)}" />`,
    `    <meta property="og:type" content="${escapeHtmlAttribute(ogType)}" />`,
    `    <meta property="og:url" content="${escapeHtmlAttribute(canonical)}" />`,
    `    <meta property="og:title" content="${escapeHtmlAttribute(title)}" />`,
    `    <meta property="og:description" content="${escapeHtmlAttribute(description)}" />`,
    `    <meta property="og:image" content="${escapeHtmlAttribute(ogImage)}" />`,
    `    <meta property="og:site_name" content="VERSAVISUAL" />`,
    `    <meta property="og:locale" content="pt_BR" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:url" content="${escapeHtmlAttribute(canonical)}" />`,
    `    <meta name="twitter:title" content="${escapeHtmlAttribute(title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtmlAttribute(description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtmlAttribute(ogImage)}" />`,
  ]

  if (meta.jsonLd && (!Array.isArray(meta.jsonLd) || meta.jsonLd.length > 0)) {
    const escapedJson = escapeJsonLd(meta.jsonLd)
    tags.push(
      `    <script type="application/ld+json" id="vv-jsonld-route">\n${escapedJson}\n    </script>`,
    )
  }

  return tags.join("\n")
}

export function injectSeoHead(html, renderedHead) {
  const startMarker = "<!-- vv:seo:start -->"
  const endMarker = "<!-- vv:seo:end -->"
  const startIndex = html.indexOf(startMarker)
  const endIndex = html.indexOf(endMarker)

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(
      "Missing or invalid SEO boundary markers (<!-- vv:seo:start --> and <!-- vv:seo:end -->) in HTML template",
    )
  }

  const before = html.slice(0, startIndex + startMarker.length)
  const after = html.slice(endIndex)
  return `${before}\n${renderedHead}\n    ${after}`
}

export function routeOutputPath(distDir, routePath) {
  const clean = (routePath || "/").replace(/^\/+|\/+$/g, "")
  if (!clean) {
    return path.join(distDir, "index.html")
  }
  return path.join(distDir, clean, "index.html")
}

export function buildRouteJsonLd(route, meta) {
  if (route === "/404" || meta.robots?.includes("noindex")) {
    return null
  }

  const cleanPath = route === "/" ? "/" : route.replace(/\/$/, "")

  // Organization definition
  const organizationId = `${SITE_URL}/#professional-service`
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VERSAVISUAL",
    image: `${SITE_URL}/brand-assets/vv-profilelogo-dark-square.png`,
    "@id": organizationId,
    url: SITE_URL,
    telephone: "+5522997624631",
    email: "hub@versavisual.com.br",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.9068,
      longitude: -43.1729,
    },
    sameAs: ["https://wa.me/5522997624631"],
  }

  if (cleanPath === "/") {
    return [
      orgSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "VERSAVISUAL",
        url: SITE_URL,
        description:
          "Hub audiovisual autoral no Rio de Janeiro com operação nacional. Fotografia, vídeo, storymaking e direção visual para marcas, ativações, artistas e pessoas.",
        inLanguage: "pt-BR",
      },
    ]
  }

  if (cleanPath === "/sobre") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sobre",
            item: `${SITE_URL}/sobre`,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/sobre#profile`,
        mainEntity: {
          "@type": "Person",
          name: "Vinicius Cunha",
          jobTitle: "Fundador & Diretor Criativo",
          image: `${SITE_URL}/images/foto-a-producao-nao-falha.webp`,
          worksFor: {
            "@type": "Organization",
            name: "VERSAVISUAL",
            url: SITE_URL,
          },
        },
      },
    ]
  }

  if (cleanPath === "/portfolio" || cleanPath === "/portfolio/canvas") {
    const isCanvas = cleanPath === "/portfolio/canvas"
    const items = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfólio",
        item: `${SITE_URL}/portfolio`,
      },
    ]
    if (isCanvas) {
      items.push({
        "@type": "ListItem",
        position: 3,
        name: "Canvas Infinito 360°",
        item: `${SITE_URL}/portfolio/canvas`,
      })
    }
    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
      },
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: meta.title,
        description: meta.description,
        url: absoluteUrl(cleanPath),
        author: {
          "@type": "Organization",
          name: "VERSAVISUAL",
          url: SITE_URL,
        },
      },
    ]
  }

  if (cleanPath === "/diagnostico-visual") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Diagnóstico Visual",
            item: `${SITE_URL}/diagnostico-visual`,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Diagnóstico Visual Gratuito",
        description: meta.description,
        url: `${SITE_URL}/diagnostico-visual`,
      },
    ]
  }

  // Segment route (e.g. /ativacoes-eventos)
  if (!cleanPath.startsWith("/portfolio/")) {
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: meta.navTitle || meta.title,
            item: absoluteUrl(cleanPath),
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: meta.navTitle || meta.title,
        description: meta.description,
        provider: {
          "@type": "ProfessionalService",
          "@id": organizationId,
          name: "VERSAVISUAL",
          url: SITE_URL,
        },
        areaServed: "BR",
        url: absoluteUrl(cleanPath),
        potentialAction: {
          "@type": "Action",
          name: "Solicitar Diagnóstico para este Segmento",
          target: `${SITE_URL}/diagnostico-visual`,
        },
      },
    ]

    if (meta.faqs && Array.isArray(meta.faqs) && meta.faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: meta.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      })
    }

    return schemas
  }

  // Case route (e.g. /portfolio/ativacao-drinkball)
  const caseSlug = cleanPath.replace(/^\/portfolio\//, "")
  const caseImg = meta.image.startsWith("http")
    ? meta.image
    : `${SITE_URL}${meta.image.startsWith("/") ? meta.image : `/${meta.image}`}`

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Portfólio",
          item: `${SITE_URL}/portfolio`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: meta.caseTitle || meta.title,
          item: absoluteUrl(cleanPath),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: meta.caseTitle || meta.title,
      headline: meta.title,
      description: meta.description,
      about: meta.category,
      contentLocation: meta.city,
      image: [caseImg],
      creator: {
        "@type": "Organization",
        name: "VERSAVISUAL",
        url: SITE_URL,
      },
      url: absoluteUrl(cleanPath),
    },
  ]
}

export async function loadSeoManifest(projectRoot) {
  const findDataFile = async (filename) => {
    try {
      return await readFile(path.join(projectRoot, "data", filename), "utf8")
    } catch {
      return await readFile(
        path.join(projectRoot, "src", "data", filename),
        "utf8",
      )
    }
  }

  const seoRoutesRaw = await findDataFile("seo-routes.json")
  const catalogSeoRaw = await findDataFile("catalog-seo.json")

  const seoRoutes = JSON.parse(seoRoutesRaw)
  const catalogSeo = JSON.parse(catalogSeoRaw)

  const manifest = new Map()

  for (const [route, data] of Object.entries(seoRoutes)) {
    const meta = { ...data }
    meta.jsonLd = buildRouteJsonLd(route, meta)
    manifest.set(route, meta)
  }

  for (const seg of catalogSeo.segments) {
    const meta = { ...seg }
    meta.jsonLd = buildRouteJsonLd(seg.canonicalPath, meta)
    manifest.set(seg.canonicalPath, meta)
  }

  for (const c of catalogSeo.cases) {
    const meta = { ...c }
    meta.jsonLd = buildRouteJsonLd(c.canonicalPath, meta)
    manifest.set(c.canonicalPath, meta)
  }

  return manifest
}

export async function emitAllRouteHtml(projectRoot = process.cwd()) {
  const distDir = path.join(projectRoot, "dist")
  const templatePath = path.join(distDir, "index.html")
  const sitemapPath = path.join(projectRoot, "public", "sitemap.xml")

  const indexHtml = await readFile(templatePath, "utf8")
  const sitemap = await readFile(sitemapPath, "utf8")
  const manifest = await loadSeoManifest(projectRoot)

  const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => new URL(match[1]))
    .filter(
      (url) => url.hostname.replace(/^www\./, "") === "versavisual.com.br",
    )
    .map((url) => {
      const clean = url.pathname.replace(/\/$/, "")
      return clean === "" ? "/" : clean
    })

  // Validate that all sitemap routes have metadata
  const missingRoutes = []
  for (const route of sitemapRoutes) {
    if (!manifest.has(route)) {
      missingRoutes.push(route)
    }
  }

  if (missingRoutes.length > 0) {
    throw new Error(
      `SSG Build Error: ${missingRoutes.length} sitemap routes missing metadata: ${missingRoutes.join(", ")}`,
    )
  }

  // All routes to emit: all sitemap routes + /404
  const routesToEmit = new Set(sitemapRoutes)
  if (manifest.has("/404")) {
    routesToEmit.add("/404")
  }

  let count = 0
  await Promise.all(
    [...routesToEmit].map(async (route) => {
      const meta = manifest.get(route)
      const renderedHead = renderSeoHead(meta)
      const modifiedHtml = injectSeoHead(indexHtml, renderedHead)
      const outPath = routeOutputPath(distDir, route)
      const outDir = path.dirname(outPath)

      await mkdir(outDir, { recursive: true })
      await writeFile(outPath, modifiedHtml, "utf8")
      count++
    }),
  )

  console.log(`Emitted ${count} route HTML files with static SEO head.`)
  return count
}

// CLI Execution if run directly
const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isMain) {
  emitAllRouteHtml().catch((err) => {
    console.error("Failed to emit route HTML files:", err)
    process.exit(1)
  })
}
