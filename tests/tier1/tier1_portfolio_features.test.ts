import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile } from "../utils/domain-helpers.ts"
import {
  CANONICAL_PORTFOLIO_FILTERS,
  CANONICAL_CASES,
} from "../utils/site-data.ts"

runner.setTier("Tier 1 - Feature Coverage")

export async function runTier1PortfolioFeaturesTests() {
  describe("Feature 17: Filtros de Portfólio por Aba", () => {
    const portfolioGridCode = readProjectFile(
      "src/components/PortfolioGrid.tsx",
    )
    const portfolioPageCode = readProjectFile("src/pages/Portfolio.tsx")

    it("F17.1: Portfolio renders filter tabs with all 9 standard options", () => {
      expect(portfolioGridCode).toContain("PORTFOLIO_FILTERS")
      for (const filter of CANONICAL_PORTFOLIO_FILTERS) {
        expect(CANONICAL_PORTFOLIO_FILTERS).toContain(filter)
      }
      expect(CANONICAL_PORTFOLIO_FILTERS).toHaveLength(9)
    })

    it("F17.2: Filter tabs implement accessibility role='tablist' and dynamic aria-selected", () => {
      expect(portfolioGridCode).toContain('role="tablist"')
      expect(portfolioGridCode).toContain('role="tab"')
      expect(portfolioGridCode).toContain("aria-selected={on}")
    })

    it("F17.3: Active tab styling highlights with teal border and text-off", () => {
      expect(portfolioGridCode).toContain("border-teal")
      expect(portfolioGridCode).toContain("text-off")
    })

    it("F17.4: Filter changes trigger reactive state update without full page reload", () => {
      expect(portfolioGridCode).toContain("setFilter(f)")
      expect(portfolioGridCode).toContain("items =")
      expect(portfolioGridCode).toContain("matchesFilter")
    })

    it("F17.5: Portfolio page embeds PortfolioGrid and applies SEO metadata", () => {
      expect(portfolioPageCode).toContain("<PortfolioGrid")
      expect(portfolioPageCode).toContain("useSeo")
      expect(portfolioPageCode).toContain("Portfólio")
    })
  })

  describe("Feature 18: Vídeo Destaque Artistas & Videoclipes", () => {
    const portfolioGridCode = readProjectFile(
      "src/components/PortfolioGrid.tsx",
    )

    it("F18.1: Video banner is conditionally rendered when active filter is 'Artistas & Videoclipes'", () => {
      expect(portfolioGridCode).toContain('filter === "Artistas & Videoclipes"')
      expect(portfolioGridCode).toContain("<video")
    })

    it("F18.2: Spotlight video runs in silent loop with HTML5 attributes (autoPlay, loop, muted, playsInline)", () => {
      expect(portfolioGridCode).toContain("autoPlay")
      expect(portfolioGridCode).toContain("loop")
      expect(portfolioGridCode).toContain("muted")
      expect(portfolioGridCode).toContain("playsInline")
    })

    it("F18.3: Spotlight video references video asset", () => {
      expect(portfolioGridCode).toContain("featuredVideo.video")
    })

    it("F18.4: Video spotlight banner uses aspect-video and object-cover layout", () => {
      expect(portfolioGridCode).toContain("aspect-video")
      expect(portfolioGridCode).toContain("object-cover")
    })

    it("F18.5: Video spotlight is hidden on other filter categories", () => {
      expect(portfolioGridCode).toContain(
        'filter === "Artistas & Videoclipes" && featuredVideo?.video && (',
      )
    })
  })

  describe("Feature 23: Estudo de Caso Individual (CaseStudy)", () => {
    const caseCode = readProjectFile("src/pages/CaseStudy.tsx")

    it("F23.1: CaseStudy loads project data dynamically from URL param caseSlug", () => {
      expect(caseCode).toContain("useParams")
      expect(caseCode).toContain("getCase(caseSlug)")
    })

    it("F23.2: CaseStudy renders structured breadcrumb navigation (Início > Portfólio > Projeto)", () => {
      expect(caseCode).toContain("breadcrumb")
      expect(caseCode).toContain("Início")
      expect(caseCode).toContain("Portfólio")
    })

    it("F23.3: CaseStudy renders project photo gallery with Lightbox integration", () => {
      expect(caseCode).toContain("<Gallery")
      expect(caseCode).toContain("photos={gallery}")
    })

    it("F23.4: CaseStudy displays production metadata (category, city, client title)", () => {
      expect(caseCode).toContain("item.category")
      expect(caseCode).toContain("item.city")
      expect(caseCode).toContain("item.title")
    })

    it("F23.5: CaseStudy displays related cases from the same category/segment", () => {
      expect(caseCode).toContain("related")
      expect(caseCode).toContain("Cases relacionados")
    })
  })
}
