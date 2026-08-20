import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, fileExists } from "../utils/domain-helpers.ts"

export async function runTier1NavigationShellTests() {
  runner.setTier("Tier 1 - Feature Coverage")
  await describe("Feature 1: Header Responsivo & Scroll Blur", () => {
    const headerCode = readProjectFile("src/components/Header.tsx")
    const appCode = readProjectFile("src/App.tsx")

    it("F1.1: Header renders brand Logo and navigation container", () => {
      expect(headerCode).toContain("<Logo")
      expect(headerCode).toContain("<header")
      expect(headerCode).toContain("fixed")
      expect(appCode).toContain("<Header />")
    })

    it("F1.2: Header includes primary CTA 'Iniciar projeto' linking to /diagnostico-visual", () => {
      expect(headerCode).toContain("Iniciar projeto")
      expect(headerCode).toContain("/diagnostico-visual")
      expect(headerCode).toContain("bg-teal")
      expect(headerCode).toContain("text-off")
    })

    it("F1.3: Header implements dynamic scroll state with backdrop-blur", () => {
      expect(headerCode).toContain("scrolled")
      expect(headerCode).toContain("backdrop-blur")
      expect(headerCode).toContain("window.addEventListener")
      expect(headerCode).toContain("scroll")
    })

    it("F1.4: Header links support active route and hash highlighting", () => {
      expect(headerCode).toContain("pathname")
      expect(headerCode).toContain("activeSection")
      expect(headerCode).toContain("text-off")
    })

    it("F1.5: Header maintains fixed positioning and top z-index layer", () => {
      expect(headerCode).toContain("z-50")
      expect(headerCode).toContain("top-0")
      expect(headerCode).toContain("fixed")
    })
  })

  await describe("Feature 2: Menu Mobile Drawer Acessível", () => {
    const headerCode = readProjectFile("src/components/Header.tsx")

    it("F2.1: Mobile menu toggle button declares aria-expanded attribute", () => {
      expect(headerCode).toContain("aria-expanded")
      expect(headerCode).toContain("setOpen")
      expect(headerCode).toContain("aria-label")
    })

    it("F2.2: Mobile menu drawer binds aria-controls for screen reader accessibility", () => {
      expect(headerCode).toContain("aria-controls")
      expect(headerCode).toContain("mobile-navigation-drawer")
      expect(headerCode).toContain('id="mobile-navigation-drawer"')
    })

    it("F2.3: Mobile menu drawer listens for Escape key to dismiss", () => {
      expect(headerCode).toContain("Escape")
      expect(headerCode).toContain("setOpen(false)")
    })

    it("F2.4: Mobile menu drawer prevents body background scrolling when opened", () => {
      expect(headerCode).toContain("document.body.style.overflow")
      expect(headerCode).toContain('"hidden"')
    })

    it("F2.5: Mobile menu drawer renders accessible navigation links with minimum touch targets", () => {
      expect(headerCode).toContain("min-h-[44px]")
      expect(headerCode).toContain("setOpen(false)")
      expect(headerCode).toContain("navLinks")
    })
  })

  await describe("Feature 3: Skip Link para Conteúdo Principal", () => {
    const appCode = readProjectFile("src/App.tsx")
    const cssCode = readProjectFile("src/index.css")

    it("F3.1: Root application renders a skip link targeting #main", () => {
      expect(appCode).toContain('href="#main"')
      expect(appCode).toContain("skip-link")
      expect(appCode).toContain("Pular para o conteúdo")
    })

    it("F3.2: Main element declares id='main' and accessible tabIndex=-1", () => {
      expect(appCode).toContain('<main id="main"')
      expect(appCode).toContain("tabIndex={-1}")
    })

    it("F3.3: Skip link CSS is positioned off-screen by default with transform", () => {
      expect(cssCode).toContain(".skip-link")
      expect(cssCode).toContain("translateY(-160%)")
      expect(cssCode).toContain("position: fixed")
    })

    it("F3.4: Skip link becomes visible on keyboard :focus", () => {
      expect(cssCode).toContain(".skip-link:focus")
      expect(cssCode).toContain("translateY(0)")
    })

    it("F3.5: Skip link follows design system tokens (bg-off, text-ink, high z-index)", () => {
      expect(cssCode).toContain("var(--color-off)")
      expect(cssCode).toContain("var(--color-ink)")
      expect(cssCode).toContain("z-index: 100")
    })
  })

  await describe("Feature 4: Scroll To Top & Anchor Offset", () => {
    const scrollToTopCode = readProjectFile("src/components/ScrollToTop.tsx")
    const appCode = readProjectFile("src/App.tsx")

    it("F4.1: ScrollToTop component is mounted in root App shell", () => {
      expect(appCode).toContain("<ScrollToTop />")
    })

    it("F4.2: ScrollToTop resets window scroll to (0, 0) on route pathname change", () => {
      expect(scrollToTopCode).toContain("window.scrollTo({ top: 0, left: 0")
      expect(scrollToTopCode).toContain("pathname")
    })

    it("F4.3: ScrollToTop compensates fixed header height (76px offset) when navigating to hashes", () => {
      expect(scrollToTopCode).toContain("76")
      expect(scrollToTopCode).toContain("hash")
      expect(scrollToTopCode).toContain("getBoundingClientRect")
    })

    it("F4.4: ScrollToTop uses smooth scrolling behavior for anchors", () => {
      expect(scrollToTopCode).toContain("smooth")
      expect(scrollToTopCode).toContain("scrollTo")
    })

    it("F4.5: ScrollToTop gracefully handles non-existent hash targets without runtime errors", () => {
      expect(scrollToTopCode).toContain("document.querySelector")
      expect(scrollToTopCode).toContain("if (el)")
    })
  })

  await describe("Feature 5: Botão Flutuante de WhatsApp", () => {
    const waCode = readProjectFile("src/components/WhatsAppFloat.tsx")
    const appCode = readProjectFile("src/App.tsx")

    it("F5.1: WhatsAppFloat is mounted in root App shell", () => {
      expect(appCode).toContain("<WhatsAppFloat />")
    })

    it("F5.2: WhatsAppFloat renders official direct conversation link reference", () => {
      expect(waCode).toContain("href={WHATSAPP}")
    })

    it("F5.3: WhatsAppFloat sets secure target='_blank' and rel='noopener noreferrer'", () => {
      expect(waCode).toContain('target="_blank"')
      expect(waCode).toContain('rel="noopener noreferrer"')
    })

    it("F5.4: WhatsAppFloat includes descriptive aria-label for accessibility", () => {
      expect(waCode).toContain('aria-label="Falar no WhatsApp"')
    })

    it("F5.5: WhatsAppFloat uses fixed positioning (bottom-5 right-5 z-40) with touch target >= 44px", () => {
      expect(waCode).toContain("fixed")
      expect(waCode).toContain("bottom-5")
      expect(waCode).toContain("right-5")
      expect(waCode).toContain("z-40")
      expect(waCode).toContain("min-h-[44px]")
      expect(waCode).toContain("min-w-[44px]")
    })
  })
}
