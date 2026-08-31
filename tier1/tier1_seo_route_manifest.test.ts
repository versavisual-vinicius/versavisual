import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, fileExists } from "../utils/domain-helpers.ts"
import { SEGMENTS, PORTFOLIO, getCase } from "../data/site.ts"
import path from "node:path"
import fs from "node:fs"

export async function runTier1SeoRouteManifestTests() {
  runner.setTier("Tier 1 - Feature Coverage")
  await describe("Feature: Contrato & Integridade do Manifesto SEO por Rota", () => {
    const sitemapContent = readProjectFile("public/sitemap.xml")
    const seoRoutes = JSON.parse(readProjectFile("src/data/seo-routes.json"))
    const catalogSeo = JSON.parse(readProjectFile("src/data/catalog-seo.json"))

    const sitemapUrls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => new URL(m[1]))
      .filter(
        (url) => url.hostname.replace(/^www\./, "") === "versavisual.com.br",
      )
      .map((url) => {
        const clean = url.pathname.replace(/\/$/, "")
        return clean === "" ? "/" : clean
      })

    // Combine all manifest entries
    const manifestMap = new Map<
      string,
      {
        title: string
        description: string
        canonicalPath: string
        ogType?: string
        image: string
        robots: string
      }
    >()

    for (const [route, meta] of Object.entries(seoRoutes)) {
      manifestMap.set(route, meta as any)
    }
    for (const seg of catalogSeo.segments) {
      manifestMap.set(seg.canonicalPath, seg)
    }
    for (const c of catalogSeo.cases) {
      manifestMap.set(c.canonicalPath, c)
    }

    it("SEO.M1: sitemap contains valid canonical URLs matching sitemap.xml contract", () => {
      expect(sitemapUrls.length).toBe(32)
      expect(sitemapUrls).toContain("/")
      expect(sitemapUrls).toContain("/sobre")
      expect(sitemapUrls).toContain("/portfolio")
      expect(sitemapUrls).toContain("/portfolio/canvas")
      expect(sitemapUrls).toContain("/diagnostico-visual")
    })

    it("SEO.M2: every indexable sitemap route has a corresponding entry in manifest with unique canonicalPath", () => {
      const canonicalsSeen = new Set<string>()

      for (const route of sitemapUrls) {
        const entry = manifestMap.get(route)
        expect(Boolean(entry)).toBe(true)
        if (entry) {
          expect(entry.canonicalPath).toBe(route)
          expect(canonicalsSeen.has(entry.canonicalPath)).toBe(false)
          canonicalsSeen.add(entry.canonicalPath)
        }
      }
    })

    it("SEO.M3: every manifest entry defines non-empty title, description, image, and robots", () => {
      for (const [route, entry] of manifestMap.entries()) {
        expect(entry.title.trim().length).toBeGreaterThan(0)
        expect(entry.description.trim().length).toBeGreaterThan(0)
        expect(entry.image.trim().length).toBeGreaterThan(0)
        expect(entry.robots.trim().length).toBeGreaterThan(0)
        if (route !== "/") {
          expect(entry.title).toContain("VERSAVISUAL")
        }
      }
    })

    it("SEO.M4: all manifest social images exist as physical files inside public/", () => {
      for (const [route, entry] of manifestMap.entries()) {
        const cleanImagePath = entry.image.replace(/^\/+/, "")
        const diskPath = path.join(process.cwd(), "public", cleanImagePath)
        const exists = fs.existsSync(diskPath)
        expect(exists).toBe(true)
      }
    })

    it("SEO.M5: all SEGMENTS and all PORTFOLIO cases have mapped SEO metadata", () => {
      for (const seg of SEGMENTS) {
        const segPath = `/${seg.slug}`
        const entry = manifestMap.get(segPath)
        expect(Boolean(entry)).toBe(true)
        if (entry) {
          expect(entry.title).toContain(seg.seoTitle)
        }
      }

      for (const item of PORTFOLIO) {
        if (item.caseSlug) {
          const casePath = `/portfolio/${item.caseSlug}`
          const entry = manifestMap.get(casePath)
          expect(Boolean(entry)).toBe(true)
          if (entry) {
            expect(entry.title).toContain(item.title)
          }
        }
      }
    })

    it("SEO.M6: 404 route is defined with noindex, nofollow and canonical /404", () => {
      const notFound = seoRoutes["/404"]
      expect(Boolean(notFound)).toBe(true)
      expect(notFound.canonicalPath).toBe("/404")
      expect(notFound.robots).toContain("noindex")
      expect(notFound.robots).toContain("nofollow")
    })
  })
}
