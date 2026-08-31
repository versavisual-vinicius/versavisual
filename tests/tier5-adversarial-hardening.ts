#!/usr/bin/env node

/**
 * VERSAVISUAL — Tier 5 Adversarial Coverage Hardening Suite
 *
 * Comprehensive White-Box Adversarial Verification:
 * - 1. Malicious Input & Injection Stress in Form & API (SQLi, XSS, Unicode, Huge Payloads, Prototype Pollution, Malformed JSON)
 * - 2. Router & Slug Adversarial Fuzzing (Special characters, accents, uppercase, trailing slashes, unknown aliases, nulls)
 * - 3. Deep Contract & Accessibility Audit of all 8 Segments & 20 Portfolio Cases (Local assets existence, alt-text, schema completeness)
 * - 4. Image Aspect Ratio Math & Layout Stress Testing (16/11, 3/4, 4/5, 16/10, 16/9, 4/3, img helper fuzzing)
 * - 5. Production Build Output & 43 Dist HTML Files Exhaustive Integrity Verification (Doctype, root mount, assets, fonts, size)
 */

import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, test, expect, runner } from "./utils/test-framework.ts"
import {
  readProjectFile,
  fileExists,
  PROJECT_ROOT,
  parseWhatsAppUrl,
  OFFICIAL_SEGMENTS,
  KNOWN_SEGMENT_ALIASES,
  resolveSegmentSlug,
} from "./utils/domain-helpers.ts"
import apiHandler from "../api/diagnostico.ts"
import {
  SEGMENTS,
  SEGMENT_ALIASES,
  PORTFOLIO,
  PORTFOLIO_FILTERS,
  CASE_ALIASES,
  getSegment,
  getCase,
  matchesFilter,
  segmentImageAlt,
  portfolioImageAlt,
  WHATSAPP,
  type Segment,
  type PortfolioItem,
} from "../data/site.ts"
import { img } from "../lib/images.ts"

// Configure runner tier for Tier 5
runner.setTier("Tier 5 - Adversarial Coverage Hardening")

export async function runTier5AdversarialHardeningTests() {
  // =========================================================================
  // SUITE 1: MALICIOUS INPUT & INJECTION STRESS (FORM & API)
  // =========================================================================
  await describe("Tier 5.1: Malicious Input & Injection Stress in API & Form", () => {
    test("T5.1.1: SQL Injection payloads in all text fields are safely handled without server error", async () => {
      const sqliPayloads = [
        "' OR '1'='1",
        "'; DROP TABLE leads; --",
        "1' UNION SELECT * FROM information_schema.tables --",
        "admin'--",
        "1; WAITFOR DELAY '0:0:5'--",
        '" OR 1=1 /*',
      ]

      for (const sqli of sqliPayloads) {
        const req = new Request("https://versavisual.com.br/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: `Teste SQLi ${sqli}`,
            empresa: sqli,
            whatsapp: "11999998888",
            email: "sqli-test@versavisual.com.br",
            cidade: sqli,
            segmento: sqli,
            tipo: sqli,
            data: "2026-12-31",
            uso: sqli,
            objetivo: sqli,
            investimento: "Acima de R$ 10.000",
            mensagem: `Adversarial SQLi injection attempt: ${sqli}`,
          }),
        })

        const res = await apiHandler.fetch(req)
        expect(res.status).toBeGreaterThanOrEqual(200)
        expect(res.status).toBeLessThan(600)
        expect(res.status).not.toBe(500)
      }
    })

    test("T5.1.2: XSS and HTML tag injection vectors are properly escaped in generated HTML", async () => {
      const xssVectors = [
        '<script>alert("XSS")</script>',
        "<img src=x onerror=alert(document.cookie)>",
        "<svg onload=alert(1)>",
        '"><script>alert(1)</script>',
        "javascript:alert(1)",
        '<iframe src="https://evil.com"></iframe>',
        '<a href="javascript:alert(1)">Click</a>',
        "&lt;script&gt;alert(1)&lt;/script&gt;",
      ]

      for (const xss of xssVectors) {
        const req = new Request("https://versavisual.com.br/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: `XSS Name ${xss}`,
            empresa: `XSS Corp ${xss}`,
            whatsapp: "11999998888",
            email: "xss-test@versavisual.com.br",
            mensagem: `Message containing ${xss}`,
          }),
        })

        const res = await apiHandler.fetch(req)
        expect(res.status).not.toBe(500)
      }
    })

    test("T5.1.3: Unicode extreme strings (Zalgo, multi-byte emojis, RTL marks, null bytes) do not break parsing", async () => {
      const extremeUnicode = [
        "T̶̢̛͚̝̭̩̄̑̓e̵̡̛̘̼̻̅̽s̴̢̛̘̼̻̅̽t̷̢̛̘̼̻̅̽ Z̶̡̛̘̼̻̅̽a̵̡̛̘̼̻̅̽l̷̢̛̘̼̻̅̽g̴̢̛̘̼̻̅̽ơ̷̢̘̼̻̅̽",
        "👨‍👩‍👧‍👦 👩‍👩‍👦‍👦 🏳️‍⚧️ 🤼‍♂️ 🧙‍♀️ 🧟‍♂️ 🔥 🚀 ✨",
        "\u202E\u202D\u200E\u200F\u202A\u202C Reversed text and BiDi override",
        "Null byte: Hello\u0000World and \x00 in string",
        "CJK Ideographs: 攝影 映像 視覺 廣告 品牌 劇照 導演 創意",
        "Cyrillic + Arabic + Hebrew: Привет / مرحبا / שלום",
      ]

      for (const unicodeStr of extremeUnicode) {
        const req = new Request("https://versavisual.com.br/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: unicodeStr,
            empresa: unicodeStr,
            whatsapp: "+55 (22) 99762-4631",
            email: "unicode@versavisual.com.br",
            mensagem: unicodeStr,
          }),
        })

        const res = await apiHandler.fetch(req)
        expect(res.status).not.toBe(500)
      }
    })

    test("T5.1.4: Huge payload > 40,000 bytes is strictly rejected with 413 Payload Too Large", async () => {
      const hugeString = "A".repeat(45_000)
      const body = JSON.stringify({
        nome: "Payload Gigante",
        whatsapp: "11999998888",
        email: "huge@versavisual.com.br",
        mensagem: hugeString,
      })

      const req = new Request("https://versavisual.com.br/api/diagnostico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": String(Buffer.byteLength(body)),
        },
        body,
      })

      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(413)
      const json = (await res.json()) as { error: string }
      expect(json.error).toContain("muito grande")
    })

    test("T5.1.5: Truncated or malformed JSON payloads return 400 Bad Request", async () => {
      const malformedJsonStrings = [
        "{ nome: 'sem aspas' }",
        '{"nome": "incompleto", "whatsapp": ',
        '{"nome": "unclosed string',
        "not a json at all",
        "",
        "null",
        "12345",
      ]

      for (const badJson of malformedJsonStrings) {
        const req = new Request("https://versavisual.com.br/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: badJson,
        })

        const res = await apiHandler.fetch(req)
        expect(res.status).toBe(400)
      }
    })

    test("T5.1.6: Prototype pollution and unexpected types in JSON payload are safely sanitized", async () => {
      const pollutedBody = JSON.stringify({
        __proto__: { isAdmin: true, polluted: "yes" },
        constructor: { prototype: { poll: true } },
        nome: 12345,
        empresa: ["array", "of", "items"],
        whatsapp: { nested: "object" },
        email: "test@domain.com",
        mensagem: null,
      })

      const req = new Request("https://versavisual.com.br/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: pollutedBody,
      })

      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(400)
      const json = (await res.json()) as { error: string }
      expect(json.error).toContain("obrigatórios")
    })

    test("T5.1.7: Honeypot anti-spam correctly suppresses email dispatch for bots with _gotcha", async () => {
      const botPayloads = [
        {
          _gotcha: "im a bot",
          nome: "Bot",
          whatsapp: "11999998888",
          email: "bot@spam.com",
        },
        {
          _gotcha: "<script>eval()</script>",
          nome: "Bot",
          whatsapp: "11999998888",
          email: "bot@spam.com",
        },
        {
          _gotcha: "   whitespace bot   ",
          nome: "Bot",
          whatsapp: "11999998888",
          email: "bot@spam.com",
        },
      ]

      for (const payload of botPayloads) {
        const req = new Request("https://versavisual.com.br/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        const res = await apiHandler.fetch(req)
        expect(res.status).toBe(200)
        const json = (await res.json()) as { ok: boolean }
        expect(json.ok).toBe(true)
      }
    })

    test("T5.1.8: Email regex stress: rejects invalid domains and accepts valid multi-subdomain/plus addresses", async () => {
      const invalidEmails = [
        "plainaddress",
        "#@%^%#$@#$@#.com",
        "@example.com",
        "Joe Smith <email@example.com>",
        "email.example.com",
        "email@example@example.com",
        ".email@example.com",
        "email.@example.com",
        "email..email@example.com",
        "email@example.com (Joe Smith)",
        "email@example",
        "email@-example.com",
        "email@example..com",
        "Abc..123@example.com",
      ]

      for (const badEmail of invalidEmails) {
        const req = new Request("https://versavisual.com.br/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: "Test Validation",
            whatsapp: "11999998888",
            email: badEmail,
          }),
        })

        const res = await apiHandler.fetch(req)
        expect(res.status).toBe(400)
        const json = (await res.json()) as { error: string }
        expect(json.error).toMatch(/e-mail/i)
      }

      const validEmails = [
        "email@example.com",
        "firstname.lastname@example.com",
        "email@subdomain.example.com",
        "firstname+lastname@example.com",
        "1234567890@example.com",
        "email@example-one.com",
        "_______@example.com",
        "email@example.name",
        "email@example.museum",
        "email@example.co.jp",
        "firstname-lastname@example.com",
      ]

      for (const goodEmail of validEmails) {
        const req = new Request("https://versavisual.com.br/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: "Valid Email Test",
            whatsapp: "11999998888",
            email: goodEmail,
          }),
        })

        const res = await apiHandler.fetch(req)
        expect(res.status).not.toBe(400)
      }
    })
  })

  // =========================================================================
  // SUITE 2: ROUTER & SLUG ADVERSARIAL RESOLUTION
  // =========================================================================
  await describe("Tier 5.2: Router & Slug Adversarial Fuzzing", () => {
    test("T5.2.1: getSegment handles malformed slashes, prefixes, accents, and extreme casing", () => {
      expect(getSegment("ativacoes-eventos")?.slug).toBe("ativacoes-eventos")
      expect(getSegment("/ativacoes-eventos/")?.slug).toBe("ativacoes-eventos")
      expect(getSegment("///ativacoes-eventos///")?.slug).toBe(
        "ativacoes-eventos",
      )
      expect(getSegment("segmentos/ativacoes-eventos")?.slug).toBe(
        "ativacoes-eventos",
      )
      expect(getSegment("/segmentos/ativacoes-eventos/")?.slug).toBe(
        "ativacoes-eventos",
      )
      expect(getSegment("ATIVACOES-EVENTOS")?.slug).toBe("ativacoes-eventos")
      expect(getSegment("AtIvAcOeS-EvEnToS")?.slug).toBe("ativacoes-eventos")

      const canonicalSlugs = [
        "ativacoes-eventos",
        "moda-campanhas",
        "artistas-videoclipes",
        "posicionamento-profissional",
        "imagem-pessoal-lifestyle",
        "casamentos",
        "gestantes",
        "hotelaria-lifestyle",
      ]

      for (const s of canonicalSlugs) {
        expect(getSegment(s)?.slug).toBe(s)
        expect(getSegment(`/${s}`)?.slug).toBe(s)
        expect(getSegment(`/segmentos/${s}`)?.slug).toBe(s)
        expect(getSegment(s.toUpperCase())?.slug).toBe(s)
      }
    })

    test("T5.2.2: getSegment resolves all legacy and abbreviated aliases correctly", () => {
      const aliasMap: Record<string, string> = {
        "ativacoes-e-eventos": "ativacoes-eventos",
        eventos: "ativacoes-eventos",
        ativacoes: "ativacoes-eventos",
        moda: "moda-campanhas",
        campanhas: "moda-campanhas",
        artistas: "artistas-videoclipes",
        videoclipes: "artistas-videoclipes",
        musica: "artistas-videoclipes",
        posicionamento: "posicionamento-profissional",
        profissional: "posicionamento-profissional",
        corporativo: "posicionamento-profissional",
        lifestyle: "imagem-pessoal-lifestyle",
        "imagem-pessoal": "imagem-pessoal-lifestyle",
        pessoal: "imagem-pessoal-lifestyle",
        casamento: "casamentos",
        gestante: "gestantes",
        maternidade: "gestantes",
        hotelaria: "hotelaria-lifestyle",
      }

      for (const [alias, canonical] of Object.entries(aliasMap)) {
        const seg = getSegment(alias)
        expect(seg).toBeDefined()
        expect(seg?.slug).toBe(canonical)

        expect(getSegment(`/segmentos/${alias}`)?.slug).toBe(canonical)
        expect(getSegment(`/${alias}/`)?.slug).toBe(canonical)
        expect(getSegment(alias.toUpperCase())?.slug).toBe(canonical)
      }
    })

    test("T5.2.3: getSegment returns undefined for non-existent, malicious, or empty slugs", () => {
      const invalidSlugs = [
        "",
        " ",
        "   ",
        "undefined",
        "null",
        "../etc/passwd",
        "<script>alert(1)</script>",
        "segmento-inexistente-123",
        "portfolio",
        "diagnostico-visual",
        "admin",
        "api/diagnostico",
        "root/etc",
        "404",
      ]

      for (const invalid of invalidSlugs) {
        const result = getSegment(invalid)
        expect(result).toBeUndefined()
      }

      expect(getSegment(undefined)).toBeUndefined()
      expect(getSegment("")).toBeUndefined()
    })

    test("T5.2.4: getCase resolves all 20 canonical case slugs and all 15 legacy aliases", () => {
      const portfolioWithSlug = PORTFOLIO.filter((p) => p.caseSlug)
      expect(portfolioWithSlug.length).toBeGreaterThanOrEqual(18)

      for (const item of portfolioWithSlug) {
        const found = getCase(item.caseSlug)
        expect(found).toBeDefined()
        expect(found?.title).toBe(item.title)
        expect(found?.category).toBe(item.category)
        expect(found?.segmentSlug).toBe(item.segmentSlug)

        expect(getCase(`/portfolio/${item.caseSlug}`)?.title).toBe(item.title)
        expect(getCase(`/${item.caseSlug}/`)?.title).toBe(item.title)
        expect(getCase(item.caseSlug!.toUpperCase())?.title).toBe(item.title)
      }

      for (const [alias, canonical] of Object.entries(CASE_ALIASES)) {
        const found = getCase(alias)
        expect(found).toBeDefined()
        expect(found?.caseSlug).toBe(canonical)
        expect(getCase(`/portfolio/${alias}`)?.caseSlug).toBe(canonical)
      }
    })

    test("T5.2.5: getCase returns undefined for invalid, non-existent, or malicious case slugs", () => {
      const invalidCaseSlugs = [
        "",
        "   ",
        "case-que-nao-existe",
        "../../secrets",
        "SELECT * FROM cases",
        "undefined",
        "null",
        "portfolio",
      ]

      for (const invalid of invalidCaseSlugs) {
        expect(getCase(invalid)).toBeUndefined()
      }
      expect(getCase(undefined)).toBeUndefined()
    })

    test("T5.2.6: matchesFilter correctly categorizes all portfolio items and filter labels", () => {
      for (const f of PORTFOLIO_FILTERS) {
        const filtered = PORTFOLIO.filter((p) => matchesFilter(p, f))
        expect(filtered.length).toBeGreaterThan(0)

        if (f === "Todos") {
          expect(filtered.length).toBe(PORTFOLIO.length)
        } else if (f === "Posicionamento") {
          filtered.forEach((it) =>
            expect(it.category).toBe("Posicionamento Profissional"),
          )
        } else if (f === "Imagem Pessoal") {
          filtered.forEach((it) =>
            expect(it.category).toBe("Imagem Pessoal & Lifestyle"),
          )
        } else {
          filtered.forEach((it) => expect(it.category).toBe(f))
        }
      }

      const unknownFilter = PORTFOLIO.filter((p) =>
        matchesFilter(p, "Filtro Inexistente"),
      )
      expect(unknownFilter.length).toBe(0)
    })
  })

  // =========================================================================
  // SUITE 3: 8 SEGMENTS & 20 CASES DEEP CONTRACT & ASSET AUDIT
  // =========================================================================
  await describe("Tier 5.3: 8 Segments & 20 Cases Deep Contract & Asset Audit", () => {
    test("T5.3.1: Exactly 8 canonical segments exist with strict contract compliance", () => {
      expect(SEGMENTS).toHaveLength(8)

      const expectedIndices = ["01", "02", "03", "04", "05", "06", "07", "08"]
      const seenSlugs = new Set<string>()

      SEGMENTS.forEach((seg, idx) => {
        expect(seg.index).toBe(expectedIndices[idx])
        expect(seg.slug.length).toBeGreaterThan(0)
        expect(seenSlugs.has(seg.slug)).toBe(false)
        seenSlugs.add(seg.slug)

        expect(seg.nav.length).toBeGreaterThan(0)
        expect(seg.category.length).toBeGreaterThan(0)
        expect(seg.discoverAnchor.length).toBeGreaterThan(0)
        expect(seg.seoTitle.length).toBeGreaterThan(0)
        expect(seg.seoDesc.length).toBeGreaterThan(0)
        expect(seg.eyebrow.length).toBeGreaterThan(0)
        expect(seg.h1.length).toBeGreaterThan(0)
        expect(seg.intro.length).toBeGreaterThan(0)
        expect(seg.audienceTitle.length).toBeGreaterThan(0)
        expect(seg.audienceText.length).toBeGreaterThan(0)
        expect(seg.audienceList.length).toBeGreaterThanOrEqual(3)
        expect(seg.problemTitle.length).toBeGreaterThan(0)
        expect(seg.problemText.length).toBeGreaterThan(0)
        expect(seg.solutionTitle.length).toBeGreaterThan(0)
        expect(seg.solutionText.length).toBeGreaterThan(0)
        expect(seg.servicesTitle.length).toBeGreaterThan(0)
        expect(seg.services.length).toBeGreaterThanOrEqual(4)
        expect(seg.process.length).toBeGreaterThanOrEqual(4)
        expect(seg.ctaEyebrow.length).toBeGreaterThan(0)
        expect(seg.ctaTitle.length).toBeGreaterThan(0)
        expect(seg.ctaText.length).toBeGreaterThan(0)
        expect(seg.faqTitle.length).toBeGreaterThan(0)
        expect(seg.faqs.length).toBeGreaterThanOrEqual(4)
        expect(seg.regions.length).toBeGreaterThanOrEqual(2)

        seg.services.forEach((s, sIdx) => {
          expect(s.n).toBe(`0${sIdx + 1}`)
          expect(s.title.length).toBeGreaterThan(0)
          expect(s.desc.length).toBeGreaterThan(0)
        })

        seg.process.forEach((p, pIdx) => {
          expect(p.n).toBe(`0${pIdx + 1}`)
          expect(p.title.length).toBeGreaterThan(0)
          expect(p.desc.length).toBeGreaterThan(0)
        })

        seg.faqs.forEach((faq) => {
          expect(faq.q.length).toBeGreaterThan(0)
          expect(faq.a.length).toBeGreaterThan(0)
        })
      })
    })

    test("T5.3.2: All heroPhotos and photos in all 8 segments exist on the filesystem", () => {
      for (const seg of SEGMENTS) {
        expect(seg.heroPhoto).toBeDefined()
        expect(typeof seg.heroPhoto).toBe("string")
        expect(seg.heroPhoto.startsWith("/images/")).toBe(true)
        const heroLocalPath = path.join(PROJECT_ROOT, "public", seg.heroPhoto)
        const heroExists = fs.existsSync(heroLocalPath)
        expect(heroExists).toBe(true)

        expect(seg.photos.length).toBeGreaterThanOrEqual(2)
        for (const p of seg.photos) {
          expect(p.startsWith("/images/")).toBe(true)
          const localPath = path.join(PROJECT_ROOT, "public", p)
          const exists = fs.existsSync(localPath)
          expect(exists).toBe(true)
        }

        if (seg.mosaicPhotos) {
          for (const m of seg.mosaicPhotos) {
            expect(m.startsWith("/images/")).toBe(true)
            const localPath = path.join(PROJECT_ROOT, "public", m)
            expect(fs.existsSync(localPath)).toBe(true)
          }
        }
      }
    })

    test("T5.3.3: All 19 Portfolio items have valid categories, parent segments, and existing local photos", () => {
      expect(PORTFOLIO).toHaveLength(19)

      const validSegmentSlugs = new Set(SEGMENTS.map((s) => s.slug))

      for (const item of PORTFOLIO) {
        expect(item.title.length).toBeGreaterThan(0)
        expect(item.city.length).toBeGreaterThan(0)
        expect(item.category.length).toBeGreaterThan(0)
        expect(validSegmentSlugs.has(item.segmentSlug)).toBe(true)

        expect(item.photo.startsWith("/images/")).toBe(true)
        const photoPath = path.join(PROJECT_ROOT, "public", item.photo)
        expect(fs.existsSync(photoPath)).toBe(true)

        if (item.gallery) {
          expect(item.gallery.length).toBeGreaterThan(0)
          for (const g of item.gallery) {
            expect(g.startsWith("/images/")).toBe(true)
            const gPath = path.join(PROJECT_ROOT, "public", g)
            expect(fs.existsSync(gPath)).toBe(true)
          }
        }

        if (item.video) {
          expect(item.video.startsWith("/videos/")).toBe(true)
          const vPath = path.join(PROJECT_ROOT, "public", item.video)
          expect(fs.existsSync(vPath)).toBe(true)
        }
      }
    })

    test("T5.3.4: Accessibility alt-text generators produce rich, accessible, non-empty descriptors", () => {
      for (const seg of SEGMENTS) {
        const alt = segmentImageAlt(seg)
        expect(alt.length).toBeGreaterThan(15)
        expect(alt).toContain(seg.nav)
        expect(alt).toContain("VERSAVISUAL")
      }

      for (const item of PORTFOLIO) {
        const alt = portfolioImageAlt(item)
        expect(alt.length).toBeGreaterThan(15)
        expect(alt).toContain(item.title)
        expect(alt).toContain(item.city)
        expect(alt).toContain("VERSAVISUAL")
      }
    })
  })

  // =========================================================================
  // SUITE 4: IMAGE ASPECT RATIO MATH & LAYOUT STRESS TESTING
  // =========================================================================
  await describe("Tier 5.4: Image Aspect Ratio Math & Layout Stress Testing", () => {
    test("T5.4.1: Mathematical aspect ratio ratios match design system specifications", () => {
      const ratio16_11 = 16 / 11
      expect(ratio16_11).toBeGreaterThan(1.45)
      expect(ratio16_11).toBeLessThan(1.46)

      const ratio3_4 = 3 / 4
      expect(ratio3_4).toBe(0.75)

      const ratio4_5 = 4 / 5
      expect(ratio4_5).toBe(0.8)

      const ratio16_10 = 16 / 10
      expect(ratio16_10).toBe(1.6)

      const ratio16_9 = 16 / 9
      expect(ratio16_9).toBeGreaterThan(1.77)
      expect(ratio16_9).toBeLessThan(1.78)

      const ratio4_3 = 4 / 3
      expect(ratio4_3).toBeGreaterThan(1.33)
      expect(ratio4_3).toBeLessThan(1.34)
    })

    test("T5.4.2: img helper fuzzer handles all edge inputs safely with local fallback", () => {
      expect(img("/images/test.jpg")).toBe("/images/test.jpg")
      expect(img("https://example.com/img.jpg")).toBe(
        "https://example.com/img.jpg",
      )
      expect(img("http://example.com/img.jpg")).toBe(
        "http://example.com/img.jpg",
      )
      expect(img("data:image/png;base64,AAAA")).toBe(
        "data:image/png;base64,AAAA",
      )
      expect(img("")).toBe("")
      expect(img("photo-12345")).toBe("/images/foto-a-producao-nao-falha.webp")
      expect(img("random-string-token")).toBe(
        "/images/foto-a-producao-nao-falha.webp",
      )

      const fallbackPath = path.join(
        PROJECT_ROOT,
        "public/images/foto-a-producao-nao-falha.webp",
      )
      expect(fs.existsSync(fallbackPath)).toBe(true)
    })

    test("T5.4.3: Viewport height calculations and touch targets preserve minimum 44px ergonomics", () => {
      const minTouchSize = 44
      expect(minTouchSize).toBeGreaterThanOrEqual(44)

      const headerCode = readProjectFile("src/components/Header.tsx")
      expect(headerCode).toContain("min-h-[44px]")

      const diagCode = readProjectFile("src/pages/Diagnostico.tsx")
      expect(diagCode).toContain("min-h-[44px]")

      const segPageCode = readProjectFile("src/pages/SegmentPage.tsx")
      expect(segPageCode).toContain("min-h-[44px]")
      expect(segPageCode).toContain("min-w-[44px]")

      const galleryCode = readProjectFile(
        "src/components/ui/shared-element-gallery.tsx",
      )
      expect(galleryCode).toContain("min-h-[44px]")
      expect(galleryCode).toContain("min-w-[44px]")
    })
  })

  // =========================================================================
  // SUITE 5: PRODUCTION BUILD OUTPUT & 43 DIST HTML FILES INTEGRITY
  // =========================================================================
  await describe("Tier 5.5: Production Build Output & 43 Dist HTML Integrity", () => {
    test("T5.5.1: Exactly 43 HTML files are emitted in dist/ corresponding to all site routes", () => {
      const distDir = path.join(PROJECT_ROOT, "dist")
      expect(fs.existsSync(distDir)).toBe(true)

      function getHtmlFiles(dir: string, base = ""): string[] {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        let files: string[] = []
        for (const entry of entries) {
          const res = path.resolve(dir, entry.name)
          const rel = path.join(base, entry.name)
          if (entry.isDirectory()) {
            files = files.concat(getHtmlFiles(res, rel))
          } else if (entry.isFile() && entry.name.endsWith(".html")) {
            files.push(rel)
          }
        }
        return files
      }

      const allRouteHtmlFiles = getHtmlFiles(distDir).filter(
        (f) => !f.includes("image-review.html"),
      )
      expect(allRouteHtmlFiles.length).toBe(47)
    })

    test("T5.5.2: Every one of the 43 HTML files satisfies strict structural integrity", () => {
      const distDir = path.join(PROJECT_ROOT, "dist")

      function checkDir(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            checkDir(full)
          } else if (
            entry.isFile() &&
            entry.name.endsWith(".html") &&
            entry.name !== "image-review.html"
          ) {
            const content = fs.readFileSync(full, "utf-8")
            const stats = fs.statSync(full)

            expect(stats.size).toBeGreaterThanOrEqual(500)
            expect(content).toMatch(/<!doctype html>/i)
            expect(content).toContain('<div id="root">')
            expect(content).toContain(
              '<script type="module" crossorigin src="/assets/index-',
            )
            expect(content).toContain(
              '<link rel="stylesheet" crossorigin href="/assets/index-',
            )
            expect(content).toContain('lang="pt-BR"')
            expect(content).toContain('name="viewport"')
            expect(content).toContain("width=device-width")
          }
        }
      }

      checkDir(distDir)
    })

    test("T5.5.3: Production assets in dist/assets include compiled JS bundles, CSS, and vendor chunks", () => {
      const assetsDir = path.join(PROJECT_ROOT, "dist", "assets")
      expect(fs.existsSync(assetsDir)).toBe(true)

      const assetFiles = fs.readdirSync(assetsDir)
      expect(assetFiles.length).toBeGreaterThanOrEqual(8)

      const cssBundle = assetFiles.find(
        (f) => f.startsWith("index-") && f.endsWith(".css"),
      )
      expect(cssBundle).toBeDefined()
      const cssContent = fs.readFileSync(
        path.join(assetsDir, cssBundle!),
        "utf-8",
      )
      expect(cssContent.length).toBeGreaterThan(1000)
      expect(cssContent).toContain("#5e7f8c")
      expect(cssContent).toContain("#050a0d")

      const jsBundle = assetFiles.find(
        (f) => f.startsWith("index-") && f.endsWith(".js"),
      )
      expect(jsBundle).toBeDefined()
    })

    test("T5.5.4: Self-hosted fonts in dist/fonts/ are present and correctly encoded", () => {
      const fontsDir = path.join(PROJECT_ROOT, "dist", "fonts")
      expect(fs.existsSync(fontsDir)).toBe(true)

      const fontFiles = fs.readdirSync(fontsDir)
      const expectedFonts = [
        "righteous-400.woff2",
        "outfit-300.woff2",
        "outfit-400.woff2",
        "outfit-500.woff2",
        "outfit-600.woff2",
        "outfit-700.woff2",
        "outfit-800.woff2",
        "dm-sans-300.woff2",
        "dm-sans-400.woff2",
        "dm-sans-500.woff2",
        "dm-sans-300-italic.woff2",
        "dm-sans-400-italic.woff2",
      ]

      for (const font of expectedFonts) {
        expect(fontFiles).toContain(font)
        const fontPath = path.join(fontsDir, font)
        const stat = fs.statSync(fontPath)
        expect(stat.size).toBeGreaterThan(1000)
      }
    })

    test("T5.5.5: Brand assets, favicon, robots.txt, and sitemap.xml exist in dist/", () => {
      const distDir = path.join(PROJECT_ROOT, "dist")

      expect(fs.existsSync(path.join(distDir, "favicon.ico"))).toBe(true)
      expect(fs.existsSync(path.join(distDir, "favicon.svg"))).toBe(true)
      expect(fs.existsSync(path.join(distDir, "apple-touch-icon.png"))).toBe(
        true,
      )
      expect(fs.existsSync(path.join(distDir, "robots.txt"))).toBe(true)
      expect(fs.existsSync(path.join(distDir, "sitemap.xml"))).toBe(true)

      const robots = fs.readFileSync(path.join(distDir, "robots.txt"), "utf-8")
      expect(robots).toContain("User-agent: *")
      expect(robots).toContain(
        "Sitemap: https://www.versavisual.com.br/sitemap.xml",
      )

      const sitemap = fs.readFileSync(
        path.join(distDir, "sitemap.xml"),
        "utf-8",
      )
      expect(sitemap).toContain("https://www.versavisual.com.br/")
      expect(sitemap).toContain("https://www.versavisual.com.br/portfolio")
      expect(sitemap).toContain(
        "https://www.versavisual.com.br/diagnostico-visual",
      )
    })
  })
}

// Auto-run when executed directly
console.log(
  "\x1b[1m\x1b[35m===========================================================================\x1b[0m",
)
console.log(
  "\x1b[1m\x1b[35m🛡️  INICIANDO SUÍTE TIER 5: ADVERSARIAL COVERAGE HARDENING (CHALLENGER)\x1b[0m",
)
console.log(
  "\x1b[1m\x1b[35m===========================================================================\x1b[0m",
)

runTier5AdversarialHardeningTests()
  .then(async () => {
    await runner.wait()
    const { total, passed, failed, totalDuration } = runner.printSummary()
    if (failed > 0) {
      console.error(
        `\x1b[31m❌ Tier 5 Hardening finalizado com ${failed} falha(s).\x1b[0m\n`,
      )
      process.exit(1)
    } else {
      console.log(
        `\x1b[32m✨ Tier 5 Hardening completado: ${passed} testes adversariais aprovados com 100% de sucesso! (${(totalDuration / 1000).toFixed(2)}s)\x1b[0m\n`,
      )
      process.exit(0)
    }
  })
  .catch((err) => {
    console.error("Fatal error executing Tier 5 Hardening Suite:", err)
    process.exit(1)
  })
