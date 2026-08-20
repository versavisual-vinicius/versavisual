import { describe, it, expect, runner } from "../utils/test-framework.ts"
import {
  readProjectFile,
  fileExists,
  getContrastRatio,
} from "../utils/domain-helpers.ts"

runner.setTier("Tier 1 - Feature Coverage")

export async function runTier1DesignTokensTypographyTests() {
  describe("Feature 6: Tokens & Tema Tailwind v4", () => {
    const cssCode = readProjectFile("src/index.css")

    it("F6.1: @theme defines official brand color tokens (ink, navy, teal, mist, off)", () => {
      expect(cssCode).toContain("--color-ink: #050a0d")
      expect(cssCode).toContain("--color-navy: #253540")
      expect(cssCode).toContain("--color-mist: #a4b8bf")
      expect(cssCode).toContain("--color-off: #f2f2f2")
      expect(cssCode).toContain("--color-teal:")
    })

    it("F6.2: @theme defines font families for display, headlines and body", () => {
      expect(cssCode).toContain("--font-display: 'Righteous'")
      expect(cssCode).toContain("--font-head: 'Outfit'")
      expect(cssCode).toContain("--font-body: 'DM Sans'")
    })

    it("F6.3: @theme defines border radii tokens (radius-xs, radius-sm)", () => {
      expect(cssCode).toContain("--radius-xs: 8px")
      expect(cssCode).toContain("--radius-sm: 16px")
    })

    it("F6.4: Utility overlays (.u-grade, .u-wordmark, .u-eyebrow) are defined in CSS layers", () => {
      expect(cssCode).toContain(".u-grade")
      expect(cssCode).toContain(".u-wordmark")
      expect(cssCode).toContain(".u-eyebrow")
    })

    it("F6.5: Body background defaults to var(--color-ink) with overflow-x hidden", () => {
      expect(cssCode).toContain("background-color: var(--color-ink)")
      expect(cssCode).toContain("overflow-x: hidden")
    })
  })

  describe("Feature 7: Tipografia Self-Hosted", () => {
    const cssCode = readProjectFile("src/index.css")
    const indexHtml = readProjectFile("index.html")

    it("F7.1: All required self-hosted font files exist in public/fonts/", () => {
      const fontFiles = [
        "public/fonts/righteous-400.woff2",
        "public/fonts/outfit-300.woff2",
        "public/fonts/outfit-400.woff2",
        "public/fonts/outfit-500.woff2",
        "public/fonts/outfit-600.woff2",
        "public/fonts/outfit-700.woff2",
        "public/fonts/outfit-800.woff2",
        "public/fonts/dm-sans-300.woff2",
        "public/fonts/dm-sans-400.woff2",
        "public/fonts/dm-sans-500.woff2",
        "public/fonts/dm-sans-300-italic.woff2",
        "public/fonts/dm-sans-400-italic.woff2",
      ]
      for (const font of fontFiles) {
        expect(fileExists(font)).toBe(true)
      }
    })

    it("F7.2: index.css defines @font-face rules with font-display: swap", () => {
      expect(cssCode).toContain("font-family: 'Righteous'")
      expect(cssCode).toContain("font-family: 'Outfit'")
      expect(cssCode).toContain("font-family: 'DM Sans'")
      expect(cssCode).toContain("font-display: swap")
      expect(cssCode).toContain("format('woff2')")
    })

    it("F7.3: index.html does not rely on external Google Fonts CDN links", () => {
      expect(indexHtml).not.toContain("fonts.googleapis.com")
      expect(indexHtml).not.toContain("fonts.gstatic.com")
    })

    it("F7.4: index.html preloads key self-hosted fonts for performance", () => {
      expect(indexHtml).toContain('rel="preload"')
      expect(indexHtml).toContain('as="font"')
      expect(indexHtml).toContain('type="font/woff2"')
      expect(indexHtml).toContain("crossorigin")
    })

    it("F7.5: Typography styles enforce text-wrap: balance on headings and pretty on body", () => {
      expect(cssCode).toContain("text-wrap: balance")
      expect(cssCode).toContain("text-wrap: pretty")
    })
  })

  describe("Feature 28: Auditoria Estrita de Contraste (WCAG AA)", () => {
    it("F28.1: Contrast ratio between white/off-white (#F2F2F2) and brand ink (#050A0D) exceeds 15:1", () => {
      const ratio = getContrastRatio("#F2F2F2", "#050A0D")
      expect(ratio).toBeGreaterThan(15.0)
    })

    it("F28.2: Contrast ratio between brand teal (#547481 / #5E7F8C) and off-white (#FFFFFF / #F2F2F2) meets WCAG AA (>= 4.5:1)", () => {
      const ratio1 = getContrastRatio("#547481", "#FFFFFF")
      const ratio2 = getContrastRatio("#5E7F8C", "#FFFFFF")
      expect(ratio1).toBeGreaterThanOrEqual(4.5)
      expect(ratio2).toBeGreaterThanOrEqual(3.5)
    })

    it("F28.3: Components using bg-teal pair strictly with text-off or text-white (no text-ink or text-navy on bg-teal)", () => {
      const componentFiles = [
        "src/components/Header.tsx",
        "src/components/CTASection.tsx",
        "src/pages/Diagnostico.tsx",
        "src/pages/SegmentPage.tsx",
        "src/pages/Home.tsx",
        "src/pages/Portfolio.tsx",
      ]
      for (const file of componentFiles) {
        const content = readProjectFile(file)
        // Verify no bg-teal is accompanied by text-ink or text-navy on the same class line
        expect(content).not.toMatch(/bg-teal[^"']*text-ink/)
        expect(content).not.toMatch(/bg-teal[^"']*text-navy/)
      }
    })

    it("F28.4: Overlays on photography (u-grade, bg-ink/75, bg-ink/80) ensure text legibility", () => {
      const cssCode = readProjectFile("src/index.css")
      expect(cssCode).toContain(".u-grade")
      expect(cssCode).toContain("linear-gradient")
    })

    it("F28.5: Focus visible outlines use high contrast brand teal-400 outline", () => {
      const cssCode = readProjectFile("src/index.css")
      expect(cssCode).toContain(":focus-visible")
      expect(cssCode).toContain("var(--color-teal-400)")
    })
  })
}
