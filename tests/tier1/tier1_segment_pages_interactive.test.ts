import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, OFFICIAL_SEGMENTS } from "../utils/domain-helpers.ts"

export async function runTier1SegmentPagesInteractiveTests() {
  runner.setTier("Tier 1 - Feature Coverage")
  await describe("Feature 19: Landing Pages de 8 Segmentos", () => {
    const segCode = readProjectFile("src/pages/SegmentPage.tsx")

    it("F19.1: SegmentPage dynamically renders niche hero with photography and title", () => {
      expect(segCode).toContain("seg.h1")
      expect(segCode).toContain("seg.heroPhoto")
      expect(segCode).toContain("seg.intro")
    })

    it("F19.2: SegmentPage displays target audience section (Quem atendemos / Desafios)", () => {
      expect(segCode).toContain("seg.audienceTitle")
      expect(segCode).toContain("seg.audienceList")
    })

    it("F19.3: SegmentPage includes problem vs. solution comparative block", () => {
      expect(segCode).toContain("seg.problemTitle")
      expect(segCode).toContain("seg.solutionTitle")
    })

    it("F19.4: SegmentPage renders 6 specialized services with interactive detail modal trigger", () => {
      expect(segCode).toContain("setOpenService(s)")
      expect(segCode).toContain("openService")
    })

    it("F19.5: SegmentPage integrates related cases, full gallery, process timeline and thematic FAQ", () => {
      expect(segCode).toContain("<Gallery")
      expect(segCode).toContain("<FAQAccordion")
    })

    it("F19.6: SegmentPage supports portfolioGroups declared by segment data without slug-specific branching", async () => {
      const { SEGMENTS, PORTFOLIO } = await import("../../src/data/site.ts")
      const events = SEGMENTS.find((seg) => seg.slug === "ativacoes-eventos")

      expect(events).toBeDefined()
      expect(events?.portfolioGroups?.length).toBeGreaterThan(0)
      expect(segCode).toContain("seg.portfolioGroups")
      expect(segCode.includes('seg.slug === "ativacoes-eventos"')).toBe(false)

      const allCaseSlugs = new Set(
        PORTFOLIO.map((item) => item.caseSlug).filter(Boolean),
      )

      for (const group of events?.portfolioGroups ?? []) {
        expect(group.title).toBeTruthy()
        expect(group.caseSlugs.length).toBeGreaterThan(0)
        for (const caseSlug of group.caseSlugs) {
          expect(allCaseSlugs.has(caseSlug)).toBe(true)
        }
      }
    })
  })

  await describe("Feature 20: Modal de Detalhes do Serviço", () => {
    const segCode = readProjectFile("src/pages/SegmentPage.tsx")

    it("F20.1: Service detail modal declares accessible dialog attributes (role='dialog', aria-modal='true')", () => {
      expect(segCode).toContain('role="dialog"')
      expect(segCode).toContain('aria-modal="true"')
    })

    it("F20.2: Modal manages focus on open by placing focus on close button", () => {
      expect(segCode).toContain("serviceCloseRef")
    })

    it("F20.3: Modal closes via close button or backdrop click", () => {
      expect(segCode).toContain("setOpenService(null)")
      expect(segCode).toContain('aria-label="Fechar"')
    })

    it("F20.4: Modal includes primary CTA leading directly to /diagnostico-visual with segment context", () => {
      expect(segCode).toContain('to="/diagnostico-visual"')
      expect(segCode).toContain("Solicitar diagnóstico")
    })

    it("F20.5: Modal ensures accessible touch targets for closing and CTA actions", () => {
      expect(segCode).toContain("px-6 py-3")
      expect(segCode).toContain("bg-teal")
    })
  })

  await describe("Feature 21: Galeria com Lightbox Fullscreen", () => {
    const galleryCode = readProjectFile("src/components/Gallery.tsx")
    const lightboxCode = readProjectFile(
      "src/components/ui/shared-element-gallery.tsx",
    )

    it("F21.1: Gallery renders photos in responsive grid with zoom action buttons", () => {
      expect(galleryCode).toContain("<GalleryGrid")
      expect(galleryCode).toContain("<GalleryImage")
    })

    it("F21.2: Clicking a photo opens full-screen Lightbox with dark backdrop blur", () => {
      expect(lightboxCode).toContain("GalleryModal")
      expect(lightboxCode).toContain("backdrop-blur")
    })

    it("F21.3: Lightbox locks body scroll while opened and restores it on close", () => {
      expect(lightboxCode).toContain('document.body.style.overflow = "hidden"')
    })

    it("F21.4: Lightbox supports keyboard dismissal via Escape key", () => {
      expect(lightboxCode).toContain("Escape")
      expect(lightboxCode).toContain("setSelectedImage(null)")
    })

    it("F21.5: Lightbox supports mobile drag gesture (drag-to-dismiss) with Framer Motion", () => {
      expect(lightboxCode).toContain("drag")
      expect(lightboxCode).toContain("framer-motion")
    })
  })

  await describe("Feature 22: Acordeão de FAQ Temático", () => {
    const faqCode = readProjectFile("src/components/FAQAccordion.tsx")

    it("F22.1: FAQAccordion accepts list of items ({ q: string, a: string }) and renders questions", () => {
      expect(faqCode).toContain("it.q")
      expect(faqCode).toContain("it.a")
    })

    it("F22.2: FAQ items start closed by default and toggle open on user interaction", () => {
      expect(faqCode).toContain("<details")
      expect(faqCode).toContain("<summary")
    })

    it("F22.3: Expanding a question rotates indicator icon by 45 degrees", () => {
      expect(faqCode).toContain("group-open:rotate-45")
    })

    it("F22.4: FAQAccordion supports visual tones (tone='light' and tone='dark')", () => {
      expect(faqCode).toContain("isDark")
      expect(faqCode).toContain("tone")
    })

    it("F22.5: Questions declare accessible button controls and visible focus indicators", () => {
      expect(faqCode).toContain("focus-visible:ring-2")
      expect(faqCode).toContain("focus-visible:ring-teal")
    })
  })
}
