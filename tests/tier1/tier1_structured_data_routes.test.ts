// @ts-nocheck
import { describe, it, expect, runner } from "../utils/test-framework.ts"
import {
  buildRouteJsonLd,
  escapeJsonLd,
  SITE_URL,
} from "../../scripts/emit-route-html.mjs"

export async function runTier1StructuredDataRoutesTests() {
  runner.setTier("Tier 1 - Feature Coverage")
  await describe("Feature: Estrutura & Integridade de Dados Estruturados (JSON-LD)", () => {
    it("LD.1: Home route defines ProfessionalService with #professional-service @id and WebSite schema", () => {
      const schemas = buildRouteJsonLd("/", {
        title: "Home",
        description: "Desc",
      }) as any[]

      expect(Array.isArray(schemas)).toBe(true)
      expect(schemas.length).toBe(2)

      const profService = schemas.find(
        (s) => s["@type"] === "ProfessionalService",
      )
      expect(Boolean(profService)).toBe(true)
      expect(profService["@id"]).toBe(`${SITE_URL}/#professional-service`)
      expect(profService.name).toBe("VERSAVISUAL")

      const website = schemas.find((s) => s["@type"] === "WebSite")
      expect(Boolean(website)).toBe(true)
      expect(website["@id"]).toBe(`${SITE_URL}/#website`)
    })

    it("LD.2: Segment routes generate BreadcrumbList, Service and FAQPage schema with linked provider", () => {
      const schemas = buildRouteJsonLd("/ativacoes-eventos", {
        title: "Ativações & Eventos | VERSAVISUAL",
        navTitle: "Ativações & Eventos",
        description: "Cobertura audiovisual",
        faqs: [
          { q: "Qual o prazo de entrega?", a: "Entrega prévia em 48h." },
          { q: "Atendem fora do Rio?", a: "Sim, atendemos todo o Brasil." },
        ],
      }) as any[]

      expect(Array.isArray(schemas)).toBe(true)
      expect(schemas.length).toBe(3)

      const breadcrumbs = schemas.find((s) => s["@type"] === "BreadcrumbList")
      expect(Boolean(breadcrumbs)).toBe(true)
      expect(breadcrumbs.itemListElement.length).toBe(2)
      expect(breadcrumbs.itemListElement[0].name).toBe("Início")
      expect(breadcrumbs.itemListElement[1].name).toBe("Ativações & Eventos")

      const service = schemas.find((s) => s["@type"] === "Service")
      expect(Boolean(service)).toBe(true)
      expect(service.provider["@id"]).toBe(`${SITE_URL}/#professional-service`)
      expect(service.areaServed).toBe("BR")

      const faqPage = schemas.find((s) => s["@type"] === "FAQPage")
      expect(Boolean(faqPage)).toBe(true)
      expect(faqPage.mainEntity.length).toBe(2)
      expect(faqPage.mainEntity[0].name).toBe("Qual o prazo de entrega?")
      expect(faqPage.mainEntity[0].acceptedAnswer.text).toBe(
        "Entrega prévia em 48h.",
      )
    })

    it("LD.3: Case study routes generate BreadcrumbList with 3 levels and CreativeWork schema", () => {
      const schemas = buildRouteJsonLd("/portfolio/ativacao-drinkball", {
        title: "Lançamento Drinkball | VERSAVISUAL",
        caseTitle: "Lançamento Drinkball",
        description: "Case Drinkball",
        category: "Ativações & Eventos",
        city: "São Paulo · SP",
        image: "/images/foto-a-producao-nao-falha.webp",
      }) as any[]

      expect(Array.isArray(schemas)).toBe(true)
      const breadcrumbs = schemas.find((s) => s["@type"] === "BreadcrumbList")
      expect(Boolean(breadcrumbs)).toBe(true)
      expect(breadcrumbs.itemListElement.length).toBe(3)
      expect(breadcrumbs.itemListElement[1].name).toBe("Portfólio")

      const creativeWork = schemas.find((s) => s["@type"] === "CreativeWork")
      expect(Boolean(creativeWork)).toBe(true)
      expect(creativeWork.name).toBe("Lançamento Drinkball")
      expect(creativeWork.about).toBe("Ativações & Eventos")
      expect(creativeWork.contentLocation).toBe("São Paulo · SP")
    })

    it("LD.4: Portfolio and Canvas routes generate ImageGallery schema", () => {
      const gridSchemas = buildRouteJsonLd("/portfolio", {
        title: "Portfólio | VERSAVISUAL",
        description: "Acervo",
      }) as any[]
      const gridGallery = gridSchemas.find((s) => s["@type"] === "ImageGallery")
      expect(Boolean(gridGallery)).toBe(true)

      const canvasSchemas = buildRouteJsonLd("/portfolio/canvas", {
        title: "Canvas | VERSAVISUAL",
        description: "360 Canvas",
      }) as any[]
      const canvasGallery = canvasSchemas.find(
        (s) => s["@type"] === "ImageGallery",
      )
      expect(Boolean(canvasGallery)).toBe(true)
    })

    it("LD.5: 404 route suppresses JSON-LD structured data", () => {
      const notFoundSchemas = buildRouteJsonLd("/404", {
        title: "404",
        robots: "noindex, nofollow",
      })
      expect(notFoundSchemas).toBe(null)
    })

    it("LD.6: JSON-LD serializer neutralizes XSS payload injection safely", () => {
      const malicious = {
        name: "Test</script><script>alert('pwned')</script>",
        nested: "<img src=x onerror=alert(1)>",
      }
      const serialized = escapeJsonLd(malicious)
      expect(serialized).not.toContain("</script>")
      expect(serialized).not.toContain("<script>")
      expect(serialized).not.toContain("<img")
    })
  })
}
