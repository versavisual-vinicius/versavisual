import { readFile, access } from "node:fs/promises"
import path from "node:path"
import { routeOutputPath, SITE_URL } from "./emit-route-html.mjs"

async function main() {
  const root = process.cwd()
  const distDir = path.join(root, "dist")
  const sitemapRaw = await readFile(
    path.join(root, "public", "sitemap.xml"),
    "utf8",
  )
  const sitemapRoutes = [...sitemapRaw.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => new URL(match[1]))
    .filter(
      (url) => url.hostname.replace(/^www\./, "") === "versavisual.com.br",
    )
    .map((url) => {
      const clean = url.pathname.replace(/\/$/, "")
      return clean === "" ? "/" : clean
    })

  const routesToCheck = [...sitemapRoutes, "/404"]
  console.log(
    `\n🔍 Verificando ${routesToCheck.length} arquivos estáticos gerados em dist/...\n`,
  )

  let failed = 0
  const canonicalsSeen = new Map()

  for (const route of routesToCheck) {
    const htmlPath = routeOutputPath(distDir, route)
    try {
      await access(htmlPath)
    } catch {
      console.error(`❌ [${route}] Arquivo não encontrado: ${htmlPath}`)
      failed++
      continue
    }

    const html = await readFile(htmlPath, "utf8")

    // Check title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    if (!titleMatch || !titleMatch[1].trim()) {
      console.error(`❌ [${route}] Tag <title> vazia ou ausente.`)
      failed++
    }

    // Check canonical
    const canonicalMatch = html.match(
      /<link\s+rel="canonical"\s+href="([^"]+)"/,
    )
    if (!canonicalMatch) {
      console.error(`❌ [${route}] Tag <link rel="canonical"> ausente.`)
      failed++
    } else {
      const canonical = canonicalMatch[1]
      const expectedCanonical =
        route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`
      if (canonical !== expectedCanonical) {
        console.error(
          `❌ [${route}] Canonical incorreto: esperado "${expectedCanonical}", obtido "${canonical}"`,
        )
        failed++
      }

      if (canonicalsSeen.has(canonical)) {
        console.error(
          `❌ [${route}] Canonical duplicado com rota "${canonicalsSeen.get(canonical)}"`,
        )
        failed++
      }
      canonicalsSeen.set(canonical, route)
    }

    // Check description
    const descMatch = html.match(
      /<meta\s+name="description"\s+content="([^"]*)"/,
    )
    if (!descMatch || !descMatch[1].trim()) {
      console.error(`❌ [${route}] Meta description vazia ou ausente.`)
      failed++
    }

    // Check robots
    const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/)
    if (!robotsMatch) {
      console.error(`❌ [${route}] Meta robots ausente.`)
      failed++
    } else {
      if (route === "/404") {
        if (!robotsMatch[1].includes("noindex")) {
          console.error(`❌ [${route}] 404 deve ter noindex no robots.`)
          failed++
        }
      } else {
        if (!robotsMatch[1].includes("index")) {
          console.error(
            `❌ [${route}] Rota indexável deve ter index no robots.`,
          )
          failed++
        }
      }
    }

    // Check Open Graph
    const ogTitle = html.match(
      /<meta\s+property="og:title"\s+content="([^"]*)"/,
    )
    const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"/)
    const ogImage = html.match(
      /<meta\s+property="og:image"\s+content="([^"]*)"/,
    )
    if (!ogTitle || !ogUrl || !ogImage) {
      console.error(`❌ [${route}] Tags Open Graph incompletas.`)
      failed++
    }

    // Check JSON-LD
    const jsonLdMatch = html.match(
      /<script\s+type="application\/ld\+json"\s+id="vv-jsonld-route">([\s\S]*?)<\/script>/,
    )
    if (route === "/404") {
      if (jsonLdMatch) {
        console.error(`❌ [${route}] 404 não deve ter JSON-LD comercial.`)
        failed++
      }
    } else {
      if (!jsonLdMatch) {
        console.error(`❌ [${route}] JSON-LD ausente.`)
        failed++
      } else {
        try {
          JSON.parse(jsonLdMatch[1])
        } catch (err) {
          console.error(
            `❌ [${route}] JSON-LD inválido/malformado:`,
            err.message,
          )
          failed++
        }
      }
    }

    // Check React shell preservation
    if (!html.includes('<div id="root"></div>')) {
      console.error(
        `❌ [${route}] Shell React (<div id="root"></div>) corrompida.`,
      )
      failed++
    }
  }

  if (failed > 0) {
    console.error(`\n❌ Validação falhou com ${failed} erro(s).\n`)
    process.exit(1)
  } else {
    console.log(
      `✅ Todos os ${routesToCheck.length} arquivos estáticos foram validados com 100% DE SUCESSO!\n`,
    )
    process.exit(0)
  }
}

main().catch((err) => {
  console.error("Fatal error verifying built SEO:", err)
  process.exit(1)
})
