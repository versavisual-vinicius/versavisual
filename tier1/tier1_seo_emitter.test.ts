// @ts-nocheck
import { describe, it, expect, runner } from "../utils/test-framework.ts"
import {
  absoluteUrl,
  escapeHtmlAttribute,
  escapeJsonLd,
  renderSeoHead,
  injectSeoHead,
  routeOutputPath,
  buildRouteJsonLd,
  SITE_URL,
} from "../../scripts/emit-route-html.mjs"
import path from "node:path"

export async function runTier1SeoEmitterTests() {
  runner.setTier("Tier 1 - Feature Coverage")
  await describe("Feature: Emissor de Head Estático por Rota (SSG)", () => {
    it("SEO.E1: absoluteUrl normalizes root and internal paths with https://www.versavisual.com.br", () => {
      expect(absoluteUrl("/")).toBe("https://www.versavisual.com.br/")
      expect(absoluteUrl("")).toBe("https://www.versavisual.com.br/")
      expect(absoluteUrl("/sobre")).toBe("https://www.versavisual.com.br/sobre")
      expect(absoluteUrl("sobre")).toBe("https://www.versavisual.com.br/sobre")
      expect(absoluteUrl("/portfolio/canvas")).toBe(
        "https://www.versavisual.com.br/portfolio/canvas",
      )
    })

    it("SEO.E2: escapeHtmlAttribute escapes special HTML characters safely", () => {
      const unsafe = '<script>alert("XSS & fun")</script>'
      const escaped = escapeHtmlAttribute(unsafe)
      expect(escaped).not.toContain("<")
      expect(escaped).not.toContain(">")
      expect(escaped).not.toContain('"')
      expect(escaped).toContain("&lt;script&gt;")
      expect(escaped).toContain("&amp;")
      expect(escaped).toContain("&quot;XSS")
    })

    it("SEO.E3: escapeJsonLd escapes angle brackets, ampersands, and script closing tags", () => {
      const testObj = {
        title: "Test </script><script>alert(1)</script>",
        desc: "A & B < C > D",
      }
      const escaped = escapeJsonLd(testObj)
      expect(escaped).not.toContain("</script>")
      expect(escaped).not.toContain("<script>")
      expect(escaped).toContain("\\u003c")
      expect(escaped).toContain("\\u003e")
    })

    it("SEO.E4: renderSeoHead produces valid canonical, title, robots, OG, and JSON-LD tags", () => {
      const meta = {
        title: "Sobre Vinicius Cunha | VERSAVISUAL",
        description: "Diretor Criativo",
        canonicalPath: "/sobre",
        image: "/images/foto-a-producao-nao-falha.webp",
        ogType: "website",
        robots: "index, follow, max-image-preview:large",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            name: "Sobre",
          },
        ],
      }
      const rendered = renderSeoHead(meta)
      expect(rendered).toContain("<title>Sobre Vinicius Cunha | VERSAVISUAL</title>")
      expect(rendered).toContain('rel="canonical" href="https://www.versavisual.com.br/sobre"')
      expect(rendered).toContain('name="robots" content="index, follow, max-image-preview:large"')
      expect(rendered).toContain('property="og:type" content="website"')
      expect(rendered).toContain('property="og:url" content="https://www.versavisual.com.br/sobre"')
      expect(rendered).toContain('property="og:image" content="https://www.versavisual.com.br/images/foto-a-producao-nao-falha.webp"')
      expect(rendered).toContain('type="application/ld+json"')
      expect(rendered).toContain('"ProfilePage"')
    })

    it("SEO.E5: injectSeoHead replaces only content between vv:seo markers and throws if missing", () => {
      const mockHtml = `<!doctype html><html><head><meta charset="utf-8" /><!-- vv:seo:start --><title>Old</title><!-- vv:seo:end --><link rel="icon" href="/fav.ico" /></head><body><div id="root"></div></body></html>`
      const newHead = `<title>New Title</title>`
      const injected = injectSeoHead(mockHtml, newHead)

      expect(injected).toContain("<title>New Title</title>")
      expect(injected).not.toContain("<title>Old</title>")
      expect(injected).toContain('<link rel="icon" href="/fav.ico" />')
      expect(injected).toContain('<div id="root"></div>')

      const invalidHtml = `<!doctype html><html><head><title>No markers</title></head></html>`
      expect(() => injectSeoHead(invalidHtml, newHead)).toThrow()
    })

    it("SEO.E6: routeOutputPath resolves correct index.html paths in dist directory", () => {
      const dist = "/app/dist"
      expect(routeOutputPath(dist, "/")).toBe(path.join("/app/dist", "index.html"))
      expect(routeOutputPath(dist, "/sobre")).toBe(
        path.join("/app/dist", "sobre", "index.html"),
      )
      expect(routeOutputPath(dist, "/portfolio/canvas")).toBe(
        path.join("/app/dist", "portfolio", "canvas", "index.html"),
      )
      expect(routeOutputPath(dist, "/404")).toBe(
        path.join("/app/dist", "404", "index.html"),
      )
    })
  })
}
