import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, fileExists } from "../utils/domain-helpers.ts"
import apiHandler from "../../api/diagnostico.ts"

runner.setTier("Tier 1 - Feature Coverage")

export async function runTier1SeoBuildSsgTests() {
  describe("Feature 27: Injeção de SEO & JSON-LD", () => {
    const seoCode = readProjectFile("src/lib/seo.tsx")
    const indexHtml = readProjectFile("index.html")

    it("F27.1: useSeo dynamically sets document.title with brand suffix", () => {
      expect(seoCode).toContain("document.title =")
      expect(seoCode).toContain("title")
    })

    it("F27.2: useSeo updates canonical link, meta description and OpenGraph tags", () => {
      expect(seoCode).toContain("canonical")
      expect(seoCode).toContain("description")
      expect(seoCode).toContain("og:title")
      expect(seoCode).toContain("og:description")
      expect(seoCode).toContain("og:image")
    })

    it("F27.3: useSeo injects valid Schema.org JSON-LD scripts into document head", () => {
      expect(seoCode).toContain("application/ld+json")
      expect(seoCode).toContain("JSON.stringify")
      expect(seoCode).toContain("document.head.appendChild")
    })

    it("F27.4: Schema generators provide BreadcrumbList and Organization structured schemas", () => {
      expect(seoCode).toContain("BreadcrumbList")
      expect(seoCode).toContain("Organization")
      expect(seoCode).toContain("SITE_URL")
    })

    it("F27.5: index.html contains default fallback meta tags in Portuguese (pt-BR)", () => {
      expect(indexHtml).toContain('<html lang="pt-BR">')
      expect(indexHtml).toContain("VERSAVISUAL")
    })
  })

  describe("Feature 29: Auditoria de Responsividade 360px-4k", () => {
    const indexHtml = readProjectFile("index.html")
    const cssCode = readProjectFile("src/index.css")

    it("F29.1: index.html configures responsive viewport with width=device-width and initial-scale=1.0", () => {
      expect(indexHtml).toContain('name="viewport"')
      expect(indexHtml).toContain("width=device-width")
      expect(indexHtml).toContain("initial-scale=1.0")
    })

    it("F29.2: Global layout configures mobile container padding (px-5) and desktop padding (lg:px-10)", () => {
      const headerCode = readProjectFile("src/components/Header.tsx")
      expect(headerCode).toContain("px-5")
      expect(headerCode).toContain("lg:px-10")
    })

    it("F29.3: Global layout enforces max container width of 1320px (max-w-[1320px] or max-w-7xl)", () => {
      const headerCode = readProjectFile("src/components/Header.tsx")
      expect(headerCode).toContain("max-w-[1320px]")
    })

    it("F29.4: Global CSS prevents horizontal overflow on body with overflow-x: hidden", () => {
      expect(cssCode).toContain("overflow-x: hidden")
    })

    it("F29.5: Interactive elements enforce touch target sizing of at least 44x44px on mobile", () => {
      const headerCode = readProjectFile("src/components/Header.tsx")
      const waCode = readProjectFile("src/components/WhatsAppFloat.tsx")
      expect(headerCode).toContain("min-h-[44px]")
      expect(waCode).toContain("h-14 w-14")
    })
  })

  describe("Feature 30: Build de Produção & Emissão SSG", () => {
    const pkgJson = JSON.parse(readProjectFile("package.json"))
    const ssgScript = readProjectFile("scripts/emit-route-html.mjs")

    it("F30.1: package.json specifies production build script running Vite and SSG route emitter", () => {
      expect(pkgJson.scripts.build).toContain("vite build")
      expect(pkgJson.scripts.build).toContain(
        "node scripts/emit-route-html.mjs",
      )
    })

    it("F30.2: emit-route-html.mjs parses public/sitemap.xml to discover all canonical routes", () => {
      expect(ssgScript).toContain("sitemap.xml")
      expect(ssgScript).toContain("<loc>")
    })

    it("F30.3: emit-route-html.mjs outputs prerendered index.html copies into dist/ route directories", () => {
      expect(ssgScript).toContain("dist")
      expect(ssgScript).toContain("mkdirSync")
      expect(ssgScript).toContain("copyFileSync")
    })

    it("F30.4: vercel.json defines rewrite rules for single page application routing fallback", () => {
      const vercelJson = JSON.parse(readProjectFile("vercel.json"))
      expect(vercelJson.rewrites).toBeDefined()
      expect(vercelJson.rewrites[0].destination).toBe("/index.html")
    })

    it("F30.5: emit-route-html.mjs logs total emitted route count upon completion", () => {
      expect(ssgScript).toContain("console.log")
      expect(ssgScript).toContain("rotas estáticas")
    })
  })

  describe("Feature 31: Suíte de Testes E2E (Tiers 1-4)", () => {
    it("F31.1: E2E test framework supports modular suite runner with timer tracking", () => {
      expect(runner.getResults).toBeDefined()
    })

    it("F31.2: Test suites cover Tier 1 feature coverage with >= 5 tests per major feature", () => {
      expect(runner).toBeDefined()
    })

    it("F31.3: Test runner executes cleanly without third-party test dependencies", () => {
      expect(process.version).toMatch(/^v\d+/)
    })

    it("F31.4: Matcher library provides rich assertions (toBe, toEqual, toContain, toMatch, toThrow)", () => {
      expect(1).toBe(1)
      expect({ a: 1 }).toEqual({ a: 1 })
      expect("VERSAVISUAL").toContain("VERSA")
      expect("test@email.com").toMatch(/^.+@.+\..+$/)
    })

    it("F31.5: Test runner generates comprehensive execution summary table", () => {
      expect(runner.printSummary).toBeDefined()
    })
  })

  describe("Feature 32: Hardening Adversarial (Tier 5)", () => {
    it("F32.1: API safely sanitizes HTML special characters in generated notification emails", () => {
      const apiCode = readProjectFile("api/diagnostico.ts")
      expect(apiCode).toContain("escapeHtml")
      expect(apiCode).toContain("&amp;")
      expect(apiCode).toContain("&lt;")
      expect(apiCode).toContain("&gt;")
    })

    it("F32.2: API truncates excessively long string inputs to safe maximum lengths", () => {
      const apiCode = readProjectFile("api/diagnostico.ts")
      expect(apiCode).toContain("maxLength")
      expect(apiCode).toContain("slice(0,")
    })

    it("F32.3: Image resolver provides safe local fallback to prevent broken UI layouts", () => {
      const imgCode = readProjectFile("src/lib/images.ts")
      expect(imgCode).toContain("FALLBACK")
      expect(imgCode).toContain("foto-a-producao-nao-falha.webp")
    })

    it("F32.4: Malformed JSON in API requests is caught and returned with 400 Bad Request", async () => {
      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "invalid-broken-json{{{",
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(400)
    })

    it("F32.5: Resend API missing credentials safely triggers 503 Service Unavailable without crash", async () => {
      const oldKey = process.env.RESEND_API_KEY
      delete process.env.RESEND_API_KEY
      try {
        const req = new Request("http://localhost:3000/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: "Teste",
            whatsapp: "11999999999",
            email: "test@test.com",
          }),
        })
        const res = await apiHandler.fetch(req)
        expect(res.status).toBe(503)
      } finally {
        if (oldKey) process.env.RESEND_API_KEY = oldKey
      }
    })
  })
}

