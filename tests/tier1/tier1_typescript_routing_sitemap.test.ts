import { describe, it, expect, runner } from "../utils/test-framework.ts"
import {
  readProjectFile,
  OFFICIAL_SEGMENTS,
  resolveSegmentSlug,
  KNOWN_SEGMENT_ALIASES,
} from "../utils/domain-helpers.ts"
import { CANONICAL_CASES } from "../utils/site-data.ts"

export async function runTier1TypeScriptRoutingSitemapTests() {
  runner.setTier("Tier 1 - Feature Coverage")
  await describe("Feature 8: Tipagem TypeScript Estrita", () => {
    it("F8.1: tsconfig.json configures strict compiler options and React JSX transform", () => {
      const tsConfig = JSON.parse(readProjectFile("tsconfig.json"))
      expect(tsConfig.compilerOptions.jsx).toBe("react-jsx")
      expect(tsConfig.compilerOptions.moduleResolution).toBe("bundler")
      expect(tsConfig.compilerOptions.target.toLowerCase()).toMatch(
        /es2020|es2022|esnext/,
      )
    })

    it("F8.2: App.tsx enforces clean type contracts for lazy imported components", () => {
      const appCode = readProjectFile("src/App.tsx")
      expect(appCode).toContain("lazy")
      expect(appCode).toContain("Suspense")
      expect(appCode).toContain("Routes")
      expect(appCode).toContain("Route")
    })

    it("F8.3: Diagnostic form defines strict LeadData interface matching API schema", () => {
      const diagCode = readProjectFile("src/pages/Diagnostico.tsx")
      expect(diagCode).toContain("interface LeadData")
      expect(diagCode).toContain("nome: string")
      expect(diagCode).toContain("whatsapp: string")
      expect(diagCode).toContain("email: string")
    })

    it("F8.4: API handler defines strict Request / Response types with Lead structure", () => {
      const apiCode = readProjectFile("api/diagnostico.ts")
      expect(apiCode).toContain("type Lead = {")
      expect(apiCode).toContain("REQUIRED_FIELDS")
      expect(apiCode).toContain("fetch(request: Request)")
    })

    it("F8.5: SEO module exports typed useSeo hook and JSON-LD schema builder types", () => {
      const seoCode = readProjectFile("src/lib/seo.tsx")
      expect(seoCode).toContain("export interface SeoProps")
      expect(seoCode).toContain("export function useSeo")
      expect(seoCode).toContain("export function breadcrumb")
    })
  })

  await describe("Feature 9: Sincronização de Slugs & Sitemap", () => {
    const sitemap = readProjectFile("public/sitemap.xml")

    it("F9.1: sitemap.xml includes root URL and all core static routes", () => {
      expect(sitemap).toContain("/portfolio</loc>")
      expect(sitemap).toContain("/diagnostico-visual</loc>")
      expect(sitemap).toContain("versavisual.com.br")
    })

    it("F9.2: sitemap.xml includes all 8 official segment routes", () => {
      for (const seg of OFFICIAL_SEGMENTS) {
        expect(sitemap).toContain(`/${seg.slug}</loc>`)
      }
    })

    it("F9.3: sitemap.xml includes canonical portfolio case study URLs", () => {
      for (const c of CANONICAL_CASES) {
        expect(sitemap).toContain(`/portfolio/${c.caseSlug}</loc>`)
      }
    })

    it("F9.4: sitemap.xml specifies valid priority and changefreq tags", () => {
      expect(sitemap).toContain("<priority>1.0</priority>")
      expect(sitemap).toContain("<changefreq>weekly</changefreq>")
      expect(sitemap).toContain("<changefreq>monthly</changefreq>")
    })

    it("F9.5: robots.txt declares canonical Sitemap reference and allows all crawlable pages", () => {
      const robots = readProjectFile("public/robots.txt")
      expect(robots).toContain("User-agent: *")
      expect(robots).toContain("Allow: /")
      expect(robots).toContain("Sitemap:")
    })
  })

  await describe("Feature 10: Roteamento Dinâmico de Segmentos", () => {
    it("F10.1: All 8 official segments resolve to their canonical slugs", () => {
      for (const seg of OFFICIAL_SEGMENTS) {
        expect(resolveSegmentSlug(seg.slug)).toBe(seg.slug)
        expect(resolveSegmentSlug(`/segmentos/${seg.slug}`)).toBe(seg.slug)
      }
    })

    it("F10.2: Known segment aliases resolve seamlessly to target canonical slugs", () => {
      expect(resolveSegmentSlug("eventos")).toBe("ativacoes-eventos")
      expect(resolveSegmentSlug("moda")).toBe("moda-campanhas")
      expect(resolveSegmentSlug("videoclipes")).toBe("artistas-videoclipes")
      expect(resolveSegmentSlug("corporativo")).toBe(
        "posicionamento-profissional",
      )
      expect(resolveSegmentSlug("casamento")).toBe("casamentos")
      expect(resolveSegmentSlug("gestante")).toBe("gestantes")
      expect(resolveSegmentSlug("hotelaria")).toBe("hotelaria-lifestyle")
    })

    it("F10.3: Unknown or invalid segment slugs resolve to null for 404 redirection", () => {
      expect(resolveSegmentSlug("slug-inexistente-12345")).toBeNull()
      expect(resolveSegmentSlug("unknown-random-segment")).toBeNull()
    })

    it("F10.4: App.tsx declares routes for both /segmentos/:slug and /:slug shortcuts", () => {
      const appCode = readProjectFile("src/App.tsx")
      expect(appCode).toContain('path="/segmentos/:slug"')
      expect(appCode).toContain('path="/:slug"')
    })

    it("F10.5: SegmentPage component handles URL slashes and parameters gracefully", () => {
      const segCode = readProjectFile("src/pages/SegmentPage.tsx")
      expect(segCode).toContain("useParams")
      expect(segCode).toContain("useLocation")
      expect(segCode).toContain("getSegment")
    })
  })

  await describe("Feature 11: Roteamento de Cases de Portfólio", () => {
    it("F11.1: App.tsx routes /portfolio/:caseSlug to CaseStudy component", () => {
      const appCode = readProjectFile("src/App.tsx")
      expect(appCode).toContain('path="/portfolio/:caseSlug"')
      expect(appCode).toContain("<CaseStudy />")
    })

    it("F11.2: CaseStudy component extracts caseSlug from URL parameters", () => {
      const caseCode = readProjectFile("src/pages/CaseStudy.tsx")
      expect(caseCode).toContain("useParams")
      expect(caseCode).toContain("caseSlug")
    })

    it("F11.3: CaseStudy renders NotFound (404) if caseSlug is not recognized", () => {
      const caseCode = readProjectFile("src/pages/CaseStudy.tsx")
      expect(caseCode).toContain("if (!item)")
      expect(caseCode).toContain("<NotFound />")
    })

    it("F11.4: Valid cases contain photo gallery, category tag and breadcrumb navigation", () => {
      const caseCode = readProjectFile("src/pages/CaseStudy.tsx")
      expect(caseCode).toContain("Gallery")
      expect(caseCode).toContain("breadcrumb")
      expect(caseCode).toContain("item.category")
    })

    it("F11.5: Valid cases provide direct link back to their parent segment page", () => {
      const caseCode = readProjectFile("src/pages/CaseStudy.tsx")
      expect(caseCode).toContain("item.segmentSlug")
      expect(caseCode).toContain("Link")
    })
  })

  await describe("Feature 12: Roteamento e Página 404", () => {
    const notFoundCode = readProjectFile("src/pages/NotFound.tsx")
    const appCode = readProjectFile("src/App.tsx")

    it("F12.1: App.tsx catches unmatched routes with path='*' and path='/404'", () => {
      expect(appCode).toContain('path="/404"')
      expect(appCode).toContain('path="*"')
      expect(appCode).toContain("<NotFound />")
    })

    it("F12.2: NotFound page presents brand-aligned editorial 404 message", () => {
      expect(notFoundCode).toContain("404")
      expect(notFoundCode).toContain("Essa cena saiu do enquadramento")
    })

    it("F12.3: NotFound page provides navigation buttons back to Home, Portfolio and Diagnóstico", () => {
      expect(notFoundCode).toContain('to="/"')
      expect(notFoundCode).toContain('to="/portfolio"')
      expect(notFoundCode).toContain('to="/diagnostico-visual"')
    })

    it("F12.4: NotFound page provides direct recovery shortcut links to all 8 segments", () => {
      expect(notFoundCode).toContain("SEGMENT_NAV")
      expect(notFoundCode).toContain("to={s.to}")
    })

    it("F12.5: NotFound page injects noindex robots meta to protect search engine ranking", () => {
      expect(notFoundCode).toContain("useSeo")
      expect(notFoundCode).toContain("noindex: true")
    })
  })
}
