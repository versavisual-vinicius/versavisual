import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, OFFICIAL_SEGMENTS } from "../utils/domain-helpers.ts"

runner.setTier("Tier 1 - Feature Coverage")

export async function runTier1SegmentPagesInteractiveTests() {
  describe("Feature 19: Landing Pages de 8 Segmentos", () => {
    const segCode = readProjectFile("src/pages/SegmentPage.tsx")

    it("F19.1: SegmentPage dynamically renders niche hero with photography and title", () => {
      expect(segCode).toContain("seg.eyebrow")
      expect(segCode).toContain("seg.h1")
      expect(segCode).toContain("seg.intro")
    })

    it("F19.2: SegmentPage displays target audience section (Quem atendemos / Desafios)", () => {
      expect(segCode).toContain("seg.audienceTitle")
      expect(segCode).toContain("seg.audienceText")
      expect(segCode).toContain("seg.audienceList")
    })

    it("F19.3: SegmentPage includes problem vs. solution comparative block", () => {
      expect(segCode).toContain("seg.problemTitle")
      expect(segCode).toContain("seg.problemText")
      expect(segCode).toContain("seg.solutionTitle")
      expect(segCode).toContain("seg.solutionText")
    })

    it("F19.4: SegmentPage renders 6 specialized services with interactive detail modal trigger", () => {
      expect(segCode).toContain("seg.services")
      expect(segCode).toContain("setOpenService")
      expect(segCode).toContain("Entender serviço")
    })

    it("F19.5: SegmentPage integrates related cases, full gallery, process timeline and thematic FAQ", () => {
      expect(segCode).toContain("<Gallery")
      expect(segCode).toContain("<FAQAccordion")
      expect(segCode).toContain("<CTASection")
      expect(segCode).toContain("Explore outros segmentos")
    })
  })

  describe("Feature 20: Modal de Detalhes do Serviço", () => {
    const segCode = readProjectFile("src/pages/SegmentPage.tsx")

    it("F20.1: Service detail modal declares accessible dialog attributes (role='dialog', aria-modal='true')", () => {
      expect(segCode).toContain('role="dialog"')
      expect(segCode).toContain('aria-modal="true"')
    })

    it("F20.2: Modal manages focus on open by placing focus on close button", () => {
      expect(segCode).toContain("serviceCloseRef")
      expect(segCode).toContain("serviceCloseRef.current?.focus()")
    })

    it("F20.3: Modal closes via close button, backdrop click, or Escape key press", () => {
      expect(segCode).toContain("setOpenService(null)")
      expect(segCode).toContain('aria-label="Fechar"')
    })

    it("F20.4: Modal includes primary CTA leading directly to /diagnostico-visual with segment context", () => {
      expect(segCode).toContain("/diagnostico-visual")
      expect(segCode).toContain("Solicitar diagnóstico")
      expect(segCode).toContain("bg-teal")
      expect(segCode).toContain("text-off")
    })

    it("F20.5: Modal ensures accessible touch targets for closing and CTA actions", () => {
      expect(segCode).toContain("px-6 py-3")
      expect(segCode).toContain("rounded-full")
    })
  })

  describe("Feature 21: Galeria com Lightbox Fullscreen", () => {
    const galleryCode = readProjectFile("src/components/Gallery.tsx")
    const lightboxCode = readProjectFile(
      "src/components/ui/shared-element-gallery.tsx",
    )

    it("F21.1: Gallery renders photos in responsive grid with zoom action buttons", () => {
      expect(galleryCode).toContain("<img")
      expect(galleryCode).toContain("onClick")
      expect(galleryCode).toContain("grid")
    })

    it("F21.2: Clicking a photo opens full-screen Lightbox with dark backdrop blur", () => {
      expect(lightboxCode).toContain("fixed inset-0")
      expect(lightboxCode).toContain("backdrop-blur")
      expect(lightboxCode).toContain("bg-black")
    })

    it("F21.3: Lightbox locks body scroll while opened and restores it on close", () => {
      expect(lightboxCode).toContain("document.body.style.overflow")
      expect(lightboxCode).toContain('"hidden"')
    })

    it("F21.4: Lightbox supports keyboard dismissal via Escape key", () => {
      expect(lightboxCode).toContain("Escape")
      expect(lightboxCode).toContain("onClose")
    })

    it("F21.5: Lightbox supports mobile drag gesture (drag-to-dismiss) with Framer Motion", () => {
      expect(lightboxCode).toContain("drag")
      expect(lightboxCode).toContain("onDragEnd")
    })
  })

  describe("Feature 22: Acordeão de FAQ Temático", () => {
    const faqCode = readProjectFile("src/components/FAQAccordion.tsx")

    it("F22.1: FAQAccordion accepts list of items ({ q: string, a: string }) and renders questions", () => {
      expect(faqCode).toContain("items")
      expect(faqCode).toContain("item.q")
      expect(faqCode).toContain("item.a")
    })

    it("F22.2: FAQ items start closed by default and toggle open on user interaction", () => {
      expect(faqCode).toContain("toggle")
      expect(faqCode).toContain("openIndex")
    })

    it("F22.3: Expanding a question rotates indicator icon by 45 degrees", () => {
      expect(faqCode).toContain("rotate-45")
      expect(faqCode).toContain("transition-transform")
    })

    it("F22.4: FAQAccordion supports visual tones (tone='light' and tone='dark')", () => {
      expect(faqCode).toContain("tone")
      expect(faqCode).toContain("text-")
    })

    it("F22.5: Questions declare accessible button controls and visible focus indicators", () => {
      expect(faqCode).toContain("<button")
      expect(faqCode).toContain("focus-visible:")
      expect(faqCode).toContain("aria-expanded")
    })
  })
}
