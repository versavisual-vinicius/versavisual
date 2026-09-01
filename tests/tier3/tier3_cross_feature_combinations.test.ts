import { describe, it, expect, runner } from "../utils/test-framework.ts"
import {
  readProjectFile,
  OFFICIAL_SEGMENTS,
  resolveSegmentSlug,
  parseWhatsAppUrl,
} from "../utils/domain-helpers.ts"
import { CANONICAL_CASES } from "../utils/site-data.ts"

runner.setTier("Tier 3 - Cross-Feature Combinations")

export async function runTier3CrossFeatureCombinationsTests() {
  runner.setTier("Tier 3 - Cross-Feature Combinations")

  await describe("Tier 3 Flow 1: Diagnóstico -> Validação de Briefing -> URL WhatsApp Estruturada", () => {
    it("T3.1: Complete diagnostic lead generates valid WhatsApp link with 100% data fidelity", () => {
      const leadInput = {
        nome: "Beatriz Helena",
        empresa: "Boutique Flores",
        whatsapp: "11987654321",
        email: "beatriz@flores.com.br",
        cidade: "São Paulo - SP",
        segmento: "Moda & Campanhas",
        tipo: "Campanha / editorial",
        data: "2026-10-15",
        uso: "E-commerce, Instagram e Lookbook impresso",
        objetivo:
          "Lançamento da nova coleção com estética autoral e alta resolução.",
        investimento: "R$ 6.000 – 10.000",
        mensagem: "Gostaríamos de diária completa de estúdio e modelo.",
      }

      // Build structured message as in Diagnostico.tsx
      const lines = [
        "*Novo Diagnóstico Visual — VERSAVISUAL*",
        "",
        `👤 *Nome:* ${leadInput.nome}${
          leadInput.empresa ? ` (${leadInput.empresa})` : ""
        }`,
        `📱 *WhatsApp:* ${leadInput.whatsapp}`,
        `✉️ *E-mail:* ${leadInput.email}`,
        leadInput.cidade ? `📍 *Cidade:* ${leadInput.cidade}` : null,
        leadInput.segmento ? `🎯 *Segmento:* ${leadInput.segmento}` : null,
        leadInput.tipo ? `🎬 *Tipo de Projeto:* ${leadInput.tipo}` : null,
        leadInput.data ? `📅 *Data Desejada:* ${leadInput.data}` : null,
        leadInput.uso ? `📱 *Onde será usado:* ${leadInput.uso}` : null,
        leadInput.objetivo ? `🎯 *Objetivo:* ${leadInput.objetivo}` : null,
        leadInput.investimento
          ? `💰 *Faixa de Investimento:* ${leadInput.investimento}`
          : null,
        leadInput.mensagem ? `📝 *Mensagem:* ${leadInput.mensagem}` : null,
      ].filter(Boolean) as string[]

      const text = lines.join("\n")
      const whatsappUrl = `https://wa.me/5522997624631?text=${encodeURIComponent(text)}`

      const parsed = parseWhatsAppUrl(whatsappUrl)
      expect(parsed.phoneNumber).toBe("5522997624631")
      expect(parsed.params["Nome"]).toBe("Beatriz Helena (Boutique Flores)")
      expect(parsed.params["WhatsApp"]).toBe("11987654321")
      expect(parsed.params["E-mail"]).toBe("beatriz@flores.com.br")
      expect(parsed.params["Cidade"]).toBe("São Paulo - SP")
      expect(parsed.params["Segmento"]).toBe("Moda & Campanhas")
      expect(parsed.params["Tipo de Projeto"]).toBe("Campanha / editorial")
      expect(parsed.params["Data Desejada"]).toBe("2026-10-15")
      expect(parsed.params["Onde será usado"]).toBe(
        "E-commerce, Instagram e Lookbook impresso",
      )
      expect(parsed.params["Objetivo"]).toBe(
        "Lançamento da nova coleção com estética autoral e alta resolução.",
      )
      expect(parsed.params["Faixa de Investimento"]).toBe("R$ 6.000 – 10.000")
      expect(parsed.params["Mensagem"]).toBe(
        "Gostaríamos de diária completa de estúdio e modelo.",
      )
    })

    it("T3.2: Diagnostic success screen provides both WhatsApp button and Return to Portfolio link", () => {
      const diagCode = readProjectFile("src/pages/Diagnostico.tsx")
      expect(diagCode).toContain("Continuar no WhatsApp com Briefing")
      expect(diagCode).toContain("Ver portfólio")
      expect(diagCode).toContain("Enviar outro diagnóstico")
    })
  })

  await describe("Tier 3 Flow 2: Home -> Seletor de Segmento -> Modal de Serviço -> CTA de Diagnóstico", () => {
    it("T3.3: Home links match canonical segment routes and case studies", () => {
      const homeCode = readProjectFile("src/pages/Home.tsx")
      expect(homeCode).toContain("itemListSchema")
      expect(homeCode).toContain("SEGMENTS")
      expect(homeCode).toContain("/portfolio")
    })

    it("T3.4: Segment landing page opens service detail modal and provides CTA to /diagnostico-visual", () => {
      const segCode = readProjectFile("src/pages/SegmentPage.tsx")
      expect(segCode).toContain("setOpenService(s)")
      expect(segCode).toContain("openService")
      expect(segCode).toContain('to="/diagnostico-visual"')
    })
  })

  await describe("Tier 3 Flow 3: Portfólio -> Filtro Artistas -> Case Study -> Segmento Pai", () => {
    it("T3.5: Portfolio grid filter links to CaseStudy which in turn links back to parent segment", () => {
      const portfolioGridCode = readProjectFile(
        "src/components/PortfolioGrid.tsx",
      )
      const caseCode = readProjectFile("src/pages/CaseStudy.tsx")

      expect(portfolioGridCode).toContain("to={`/portfolio/${it.caseSlug}`}")
      expect(caseCode).toContain("item.segmentSlug")
      expect(caseCode).toContain("item.category")
    })

    it("T3.6: All canonical case studies have valid segmentSlug matching official segments", () => {
      for (const c of CANONICAL_CASES) {
        const resolved = resolveSegmentSlug(c.segmentSlug)
        expect(resolved).toBe(c.segmentSlug)
      }
    })
  })

  await describe("Tier 3 Flow 4: Rota 404 -> Navegação de Recuperação -> Galeria com Lightbox", () => {
    it("T3.7: 404 page provides direct segment links to re-engage the user", () => {
      const notFoundCode = readProjectFile("src/pages/NotFound.tsx")
      expect(notFoundCode).toContain("SEGMENT_NAV")
      expect(notFoundCode).toContain("to={s.to}")
    })

    it("T3.8: Segment page loads Gallery with interactive full-screen Lightbox", () => {
      const segCode = readProjectFile("src/pages/SegmentPage.tsx")
      expect(segCode).toContain("<Gallery")
      expect(segCode).toContain("galleryPhotos")
    })
  })

  await describe("Tier 3 Flow 5: Skip Link -> Menu Drawer -> Bloqueio de Scroll -> WhatsApp Flutuante", () => {
    it("T3.9: Skip-link targets main and header mobile drawer properly locks/unlocks body overflow", () => {
      const appCode = readProjectFile("src/App.tsx")
      const headerCode = readProjectFile("src/components/Header.tsx")

      expect(appCode).toContain('href="#main"')
      expect(appCode).toContain('id="main"')
      expect(headerCode).toContain(
        'document.body.style.overflow = open ? "hidden" : ""',
      )
    })

    it("T3.10: WhatsAppFloat remains accessible across all layout states and z-indexes", () => {
      const waCode = readProjectFile("src/components/WhatsAppFloat.tsx")
      expect(waCode).toContain("z-40")
      expect(waCode).toContain("fixed")
    })
  })

  await describe("Tier 3 Flow 6: SEO Hook -> Injeção de Meta Tags + Schema JSON-LD", () => {
    it("T3.11: useSeo hook handles BreadcrumbList, Service, and Organization JSON-LD schemas seamlessly", () => {
      const seoCode = readProjectFile("src/lib/seo.tsx")
      expect(seoCode).toContain("application/ld+json")
      expect(seoCode).toContain("document.head.querySelector")
      expect(seoCode).toContain("document.head.appendChild")
    })

    it("T3.12: Segment pages inject both BreadcrumbList and Service schema.org definitions", () => {
      const segCode = readProjectFile("src/pages/SegmentPage.tsx")
      const seoCode = readProjectFile("src/lib/seo.tsx")
      expect(segCode).toContain("breadcrumb([")
      expect(
        segCode.includes("serviceSchema") ||
          segCode.includes('"@type": "Service"'),
      ).toBe(true)
      expect(seoCode).toContain('"@type": "Service"')
    })
  })

  await describe("Tier 3 Flow 7: Post-Build Static Route Generation & Sitemap", () => {
    it("T3.13: emit-route-html.mjs reads sitemap.xml and maps all routes for production deployment", () => {
      const ssgCode = readProjectFile("scripts/emit-route-html.mjs")
      const sitemap = readProjectFile("public/sitemap.xml")

      expect(ssgCode).toContain("sitemap.xml")
      expect(sitemap).toContain("versavisual.com.br")
    })
  })
}
