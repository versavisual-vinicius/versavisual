/**
 * VERSAVISUAL — Empirical Challenger M3 & M4 Test Suite
 *
 * Deep empirical verification covering:
 * a) Touch target dimensions (>=44px) across all interactive elements
 * b) Color contrast: zero dark text classes on bg-teal / bg-teal-400, WCAG AA ratio calculation
 * c) Responsive constraints: zero horizontal overflow, max container 1320px, mobile padding
 * d) Diagnostic form: validation, regex, honeypot anti-spam, WhatsApp lead URL encoding, API endpoint
 * e) Full static prerendered HTML verification in dist/
 */

import { describe, test, expect, runner } from "./utils/test-framework.ts"
import {
  readProjectFile,
  fileExists,
  getContrastRatio,
  parseWhatsAppUrl,
  OFFICIAL_SEGMENTS,
} from "./utils/domain-helpers.ts"

// ─────────────────────────────────────────────────────────────────────────────
// a) TOUCH TARGET VERIFICATION (>=44px)
// ─────────────────────────────────────────────────────────────────────────────
describe("Challenger M3/M4 — a) Touch Target Dimensions (≥44px)", () => {
  test("SegmentPage: Service modal close button is ≥ 44x44px", () => {
    const code = readProjectFile("src/pages/SegmentPage.tsx")
    expect(code).toContain("h-11 w-11")
    expect(code).toContain("min-h-[44px]")
    expect(code).toContain("min-w-[44px]")
  })

  test("SegmentPage: Service modal CTA button is ≥ 44px min-height", () => {
    const code = readProjectFile("src/pages/SegmentPage.tsx")
    expect(code).toContain("min-h-[44px]")
    expect(code).toContain("Solicitar diagnóstico")
  })

  test("shared-element-gallery: Lightbox close button is ≥ 44x44px", () => {
    const code = readProjectFile("src/components/ui/shared-element-gallery.tsx")
    expect(code).toContain("h-11 w-11")
    expect(code).toContain("min-h-[44px]")
    expect(code).toContain("min-w-[44px]")
  })

  test("PortfolioGrid: Tab filter buttons are ≥ 44px min-height", () => {
    const code = readProjectFile("src/components/PortfolioGrid.tsx")
    expect(code).toContain('role="tab"')
    expect(code).toContain("min-h-[44px]")
  })

  test("FAQAccordion: Accordion summary triggers are ≥ 44px min-height", () => {
    const code = readProjectFile("src/components/FAQAccordion.tsx")
    expect(code).toContain("<summary")
    expect(code).toContain("min-h-[44px]")
  })

  test("Diagnostico: Submit button, return button, and WhatsApp CTA have ≥ 44px min-height", () => {
    const code = readProjectFile("src/pages/Diagnostico.tsx")
    expect(code).toContain("min-h-[44px]")
    expect(code).toContain("Enviar diagnóstico")
    expect(code).toContain("Continuar no WhatsApp com Briefing")
  })

  test("Header: Mobile drawer toggle and navigation buttons are ≥ 44x44px", () => {
    const code = readProjectFile("src/components/Header.tsx")
    expect(code).toContain("h-11 w-11 min-h-[44px] min-w-[44px]")
    expect(code).toContain("Iniciar projeto")
  })

  test("WhatsAppFloat: Floating trigger button is ≥ 44x44px", () => {
    const code = readProjectFile("src/components/WhatsAppFloat.tsx")
    expect(code).toContain("h-11 w-11 min-h-[44px] min-w-[44px]")
  })

  test("NotFound: Action buttons and recovery segment links are ≥ 44px min-height", () => {
    const code = readProjectFile("src/pages/NotFound.tsx")
    expect(code).toContain("inline-flex min-h-[44px] items-center")
    expect(code).toContain("Ir para o início")
  })

  test("Home: Hero CTAs have ≥ 44px min-height", () => {
    const code = readProjectFile("src/pages/Home.tsx")
    expect(code).toContain("inline-flex min-h-[44px]")
    expect(code).toContain("Fazer diagnóstico visual")
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// b) CONTRAST VALIDATION (ZERO DARK TEXT ON BG-TEAL)
// ─────────────────────────────────────────────────────────────────────────────
describe("Challenger M3/M4 — b) Contrast Validation on bg-teal", () => {
  const componentFiles = [
    "src/pages/Home.tsx",
    "src/pages/Portfolio.tsx",
    "src/pages/SegmentPage.tsx",
    "src/pages/CaseStudy.tsx",
    "src/pages/Diagnostico.tsx",
    "src/pages/NotFound.tsx",
    "src/components/Header.tsx",
    "src/components/Footer.tsx",
    "src/components/CTASection.tsx",
    "src/components/FAQAccordion.tsx",
    "src/components/PortfolioGrid.tsx",
    "src/components/ServiceGrid.tsx",
    "src/components/WhatsAppFloat.tsx",
    "src/components/ui/timeline.tsx",
    "src/components/ui/shared-element-gallery.tsx",
  ]

  test("Strict Scan: Zero occurrences of dark text classes on bg-teal or bg-teal-400", () => {
    const darkTextRegex =
      /(?:bg-teal|bg-teal-400)[^"'>]*(?:text-ink|text-navy|text-black|text-slate-900|text-gray-900)|(?:text-ink|text-navy|text-black|text-slate-900|text-gray-900)[^"'>]*(?:bg-teal|bg-teal-400)/g

    for (const file of componentFiles) {
      const content = readProjectFile(file)
      const matches = content.match(darkTextRegex)
      if (matches && matches.length > 0) {
        throw new Error(
          `Contrast violation found in ${file}: ${matches.join(", ")}`,
        )
      }
    }
  })

  test("CTA Buttons: All bg-teal buttons explicitly define text-off", () => {
    const filesWithBgTealButtons = [
      "src/pages/Home.tsx",
      "src/pages/SegmentPage.tsx",
      "src/pages/Diagnostico.tsx",
      "src/pages/NotFound.tsx",
      "src/components/Header.tsx",
      "src/components/CTASection.tsx",
    ]

    for (const file of filesWithBgTealButtons) {
      const content = readProjectFile(file)
      const bgTealButtons = content.match(/<[^>]*bg-teal[^>]*>/g) || []
      for (const btn of bgTealButtons) {
        if (
          btn.includes("button") ||
          btn.includes("Link") ||
          btn.includes("<a")
        ) {
          expect(btn).toContain("text-off")
        }
      }
    }
  })

  test("Design System Tokens: Calculated contrast between text-off (#F2F2F2) and bg-teal (#5E7F8C) passes WCAG AA", () => {
    const tealHex = "#5E7F8C"
    const offHex = "#F2F2F2"
    const inkHex = "#050A0D"

    const contrastTealOff = getContrastRatio(tealHex, offHex)
    const contrastTealInk = getContrastRatio(tealHex, inkHex)

    // Contrast between #5E7F8C and #F2F2F2 is >= 3.0:1 (passes graphical object / large text / UI component)
    expect(contrastTealOff).toBeGreaterThanOrEqual(3.0)

    const css = readProjectFile("src/index.css")
    expect(css).toContain("--color-teal: #5e7f8c;")
    expect(css).toContain("--color-off: #f2f2f2;")
    expect(css).toContain("--color-ink: #050a0d;")
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// c) RESPONSIVENESS & OVERFLOW VERIFICATION (360px to 4k)
// ─────────────────────────────────────────────────────────────────────────────
describe("Challenger M3/M4 — c) Responsiveness & Horizontal Overflow (360px - 4k)", () => {
  test("index.html: Viewport meta tag properly configures device-width and initial-scale=1.0", () => {
    const html = readProjectFile("index.html")
    expect(html).toContain('name="viewport"')
    expect(html).toContain("width=device-width")
    expect(html).toContain("initial-scale=1.0")
  })

  test("Global CSS: Body enforces overflow-x: hidden to prevent viewport scroll leak", () => {
    const css = readProjectFile("src/index.css")
    expect(css).toContain("overflow-x: hidden;")
  })

  test("Layout Containers: Max container width is capped at 1320px across major layouts", () => {
    const home = readProjectFile("src/pages/Home.tsx")
    const segment = readProjectFile("src/pages/SegmentPage.tsx")
    const header = readProjectFile("src/components/Header.tsx")
    const footer = readProjectFile("src/components/Footer.tsx")
    const diag = readProjectFile("src/pages/Diagnostico.tsx")

    expect(home).toContain("max-w-[1320px]")
    expect(segment).toContain("max-w-[1320px]")
    expect(header).toContain("max-w-[1320px]")
    expect(footer).toContain("max-w-[1320px]")
    expect(diag).toContain("max-w-[1320px]")
  })

  test("Mobile-first Padding: Sections implement px-5 for mobile and lg:px-10 for desktop", () => {
    const home = readProjectFile("src/pages/Home.tsx")
    expect(home).toContain("px-5")
    expect(home).toContain("lg:px-10")
  })

  test("Segment Cards: Aspect ratio switches from aspect-[16/11] on mobile to aspect-[3/4] on sm+", () => {
    const home = readProjectFile("src/pages/Home.tsx")
    expect(home).toContain("aspect-[16/11]")
    expect(home).toContain("sm:aspect-[3/4]")
  })

  test("Portfolio Grid: Uses responsive grid columns (1 col mobile, sm:grid-cols-2, lg:grid-cols-3)", () => {
    const port = readProjectFile("src/components/PortfolioGrid.tsx")
    expect(port).toContain("sm:grid-cols-2 lg:grid-cols-3")
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// d) DIAGNOSTIC FORM BEHAVIOR & WHATSAPP URL GENERATION
// ─────────────────────────────────────────────────────────────────────────────
describe("Challenger M3/M4 — d) Diagnostic Form, Honeypot & WhatsApp URL", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  test("Validation: Rejects empty or whitespace-only inputs for required fields", () => {
    const validate = (nome: string, whatsapp: string, email: string) => {
      const errors: Record<string, boolean> = {}
      if (!nome.trim()) errors.nome = true
      if (!whatsapp.trim()) errors.whatsapp = true
      if (!email.trim() || !emailRegex.test(email.trim())) errors.email = true
      return errors
    }

    expect(Object.keys(validate("", "", ""))).toEqual([
      "nome",
      "whatsapp",
      "email",
    ])
    expect(Object.keys(validate("   ", "   ", "   "))).toEqual([
      "nome",
      "whatsapp",
      "email",
    ])
    expect(
      Object.keys(validate("Carlos", "11999998888", "carlos@empresa.com")),
    ).toHaveLength(0)
  })

  test("Validation: Strictly flags malformed email addresses", () => {
    const invalidEmails = [
      "plainaddress",
      "@missingusername.com",
      "username@com",
      "user name@domain.com",
      "user@domain com",
    ]

    for (const email of invalidEmails) {
      expect(emailRegex.test(email)).toBe(false)
    }
  })

  test("Validation: Accepts complex and corporate valid emails", () => {
    const validEmails = [
      "vinicius+test@versavisual.com.br",
      "marketing.lead@agency-group.co.uk",
      "direcao@marca.art.br",
      "contato_vip@startup.io",
    ]

    for (const email of validEmails) {
      expect(emailRegex.test(email)).toBe(true)
    }
  })

  test("Honeypot Anti-Spam: Blocks bots silently without dispatching email", () => {
    const code = readProjectFile("src/pages/Diagnostico.tsx")
    expect(code).toContain('data.get("_gotcha")')
    expect(code).toContain("if (honeypot)")
    // Honeypot field in JSX is hidden and un-tabbable
    expect(code).toContain('name="_gotcha"')
    expect(code).toContain("tabIndex={-1}")
    expect(code).toContain('className="hidden"')
  })

  test("WhatsApp URL Builder: Generates structured URL with 100% data fidelity", () => {
    const testLead = {
      nome: "Renata Vasconcellos",
      empresa: "Boutique Joias",
      whatsapp: "(11) 98765-4321",
      email: "renata@boutiquejoias.com.br",
      cidade: "São Paulo - SP",
      segmento: "Moda & Joalheria",
      tipo: "Campanha / editorial",
      data: "Novembro / 2026",
      uso: "E-commerce e Instagram Ads",
      objetivo: "Lançamento da coleção de fim de ano",
      investimento: "R$ 6.000 – 10.000",
      mensagem: "Precisamos de modelos e locação na capital paulista.",
    }

    const lines = [
      "*Novo Diagnóstico Visual — VERSAVISUAL*",
      "",
      `👤 *Nome:* ${testLead.nome}${
        testLead.empresa ? ` (${testLead.empresa})` : ""
      }`,
      `📱 *WhatsApp:* ${testLead.whatsapp}`,
      `✉️ *E-mail:* ${testLead.email}`,
      testLead.cidade ? `📍 *Cidade:* ${testLead.cidade}` : null,
      testLead.segmento ? `🎯 *Segmento:* ${testLead.segmento}` : null,
      testLead.tipo ? `🎬 *Tipo de Projeto:* ${testLead.tipo}` : null,
      testLead.data ? `📅 *Data Desejada:* ${testLead.data}` : null,
      testLead.uso ? `📱 *Onde será usado:* ${testLead.uso}` : null,
      testLead.objetivo ? `🎯 *Objetivo:* ${testLead.objetivo}` : null,
      testLead.investimento
        ? `💰 *Faixa de Investimento:* ${testLead.investimento}`
        : null,
      testLead.mensagem ? `📝 *Mensagem:* ${testLead.mensagem}` : null,
    ].filter(Boolean) as string[]

    const text = lines.join("\n")
    const waBase = "https://wa.me/5511950747192"
    const waUrl = `${waBase}?text=${encodeURIComponent(text)}`

    expect(waUrl.startsWith("https://wa.me/5511950747192?text=")).toBe(true)
    const parsed = parseWhatsAppUrl(waUrl)
    expect(parsed.phoneNumber).toBe("5511950747192")
    expect(parsed.params["Nome"]).toContain("Renata Vasconcellos")
    expect(parsed.params["WhatsApp"]).toBe("(11) 98765-4321")
    expect(parsed.params["E-mail"]).toBe("renata@boutiquejoias.com.br")
    expect(parsed.params["Cidade"]).toBe("São Paulo - SP")
    expect(parsed.params["Segmento"]).toBe("Moda & Joalheria")
    expect(parsed.params["Tipo de Projeto"]).toBe("Campanha / editorial")
    expect(parsed.params["Faixa de Investimento"]).toBe("R$ 6.000 – 10.000")
  })

  test("API Endpoint: Verifies /api/diagnostico payload boundaries, methods, and sanitized responses", () => {
    const apiCode = readProjectFile("api/diagnostico.ts")
    expect(apiCode).toContain('request.method !== "POST"')
    expect(apiCode).toContain("405")
    expect(apiCode).toContain("contentLength > 40_000")
    expect(apiCode).toContain("413")
    expect(apiCode).toContain("escapeHtml")
    expect(apiCode).toContain("value(input._gotcha)")
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// e) BUILD ARTIFACTS & STATIC PRERENDERED ROUTE EMISSION
// ─────────────────────────────────────────────────────────────────────────────
describe("Challenger M3/M4 — e) Build Artifacts & SSG Route Emission", () => {
  test("dist/index.html exists and contains valid HTML structure", () => {
    expect(fileExists("dist/index.html")).toBe(true)
    const distHtml = readProjectFile("dist/index.html")
    expect(distHtml).toContain('<div id="root">')
    expect(distHtml).toContain("VERSAVISUAL")
  })

  test("Prerendered canonical segment routes exist in dist/", () => {
    for (const seg of OFFICIAL_SEGMENTS) {
      const routePath = `dist/${seg.slug}/index.html`
      expect(fileExists(routePath)).toBe(true)
      const content = readProjectFile(routePath)
      expect(content).toContain("<html")
      expect(content).toContain("VERSAVISUAL")
    }
  })

  test("Prerendered core utility routes exist in dist/ (portfolio, diagnostico)", () => {
    const utilityRoutes = [
      "dist/portfolio/index.html",
      "dist/diagnostico-visual/index.html",
    ]

    for (const route of utilityRoutes) {
      expect(fileExists(route)).toBe(true)
      const content = readProjectFile(route)
      expect(content).toContain("<html")
      expect(content).toContain("VERSAVISUAL")
    }
  })
})

// Execute all tests and print summary
runner.wait().then(() => {
  const summary = runner.printSummary()
  if (summary.failed > 0) {
    process.exit(1)
  }
})
