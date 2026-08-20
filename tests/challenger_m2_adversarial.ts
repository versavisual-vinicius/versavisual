import {
  SEGMENTS,
  SEGMENT_ALIASES,
  SEGMENT_NAV,
  PORTFOLIO,
  CASE_ALIASES,
  getSegment,
  getCase,
  matchesFilter,
  PORTFOLIO_FILTERS,
  HOME_SERVICES,
  HOME_PROCESS,
  HOME_STATS,
} from "../src/data/site.ts"
import { readFileSync } from "node:fs"
import path from "node:path"

let passed = 0
let failed = 0
const errors: string[] = []

function assert(condition: boolean, msg: string) {
  if (condition) {
    passed++
    console.log(`  ✓ ${msg}`)
  } else {
    failed++
    errors.push(msg)
    console.error(`  ✗ FAIL: ${msg}`)
  }
}

console.log("\n========================================================")
console.log("🔥 CHALLENGER M2 ADVERSARIAL & EMPIRICAL STRESS TEST SUITE")
console.log("========================================================\n")

// 1. SEGMENTS TAXONOMY INTEGRITY (EXACT 8 CANONICAL SEGMENTS)
console.log("▶ [TEST GROUP 1] Canonical 8 Segments Taxonomy")
assert(
  SEGMENTS.length === 8,
  `Expected exactly 8 canonical segments, found ${SEGMENTS.length}`,
)

const EXPECTED_SLUGS = [
  "ativacoes-eventos",
  "moda-campanhas",
  "artistas-videoclipes",
  "posicionamento-profissional",
  "imagem-pessoal-lifestyle",
  "casamentos",
  "gestantes",
  "hotelaria-lifestyle",
]

const actualSlugs = SEGMENTS.map((s) => s.slug)
for (const expected of EXPECTED_SLUGS) {
  assert(actualSlugs.includes(expected), `Canonical slug present: ${expected}`)
}

for (let i = 0; i < SEGMENTS.length; i++) {
  const seg = SEGMENTS[i]
  const expectedIndex = `0${i + 1}`
  assert(
    seg.index === expectedIndex,
    `Segment ${seg.slug} has correct index '${expectedIndex}' (got '${seg.index}')`,
  )
  assert(
    typeof seg.nav === "string" && seg.nav.length > 0,
    `Segment ${seg.slug} has nav`,
  )
  assert(
    typeof seg.category === "string" && seg.category.length > 0,
    `Segment ${seg.slug} has category`,
  )
  assert(
    typeof seg.seoTitle === "string" && seg.seoTitle.length > 0,
    `Segment ${seg.slug} has seoTitle`,
  )
  assert(
    typeof seg.seoDesc === "string" && seg.seoDesc.length > 0,
    `Segment ${seg.slug} has seoDesc`,
  )
  assert(
    Array.isArray(seg.services) && seg.services.length === 6,
    `Segment ${seg.slug} has exactly 6 services`,
  )
  assert(
    Array.isArray(seg.process) && seg.process.length === 4,
    `Segment ${seg.slug} has exactly 4 process steps`,
  )
  assert(
    Array.isArray(seg.faqs) && seg.faqs.length >= 3,
    `Segment ${seg.slug} has at least 3 FAQs`,
  )
  assert(
    typeof seg.heroPhoto === "string" && seg.heroPhoto.length > 0,
    `Segment ${seg.slug} has heroPhoto`,
  )
  assert(
    Array.isArray(seg.photos) && seg.photos.length > 0,
    `Segment ${seg.slug} has photos`,
  )
  assert(
    Array.isArray(seg.regions) && seg.regions.length > 0,
    `Segment ${seg.slug} has regions`,
  )
}

// 2. GET_SEGMENT RESOLUTION & ADVERSARIAL VARIATIONS
console.log("\n▶ [TEST GROUP 2] getSegment() Adversarial & Alias Resolution")
// Canonical direct
for (const slug of EXPECTED_SLUGS) {
  const resolved = getSegment(slug)
  assert(
    resolved !== undefined && resolved.slug === slug,
    `getSegment('${slug}') resolves to canonical segment`,
  )
}

// Variations with slashes and prefixes
for (const slug of EXPECTED_SLUGS) {
  assert(
    getSegment(`/${slug}`)?.slug === slug,
    `getSegment('/${slug}') resolves`,
  )
  assert(
    getSegment(`/${slug}/`)?.slug === slug,
    `getSegment('/${slug}/') resolves`,
  )
  assert(
    getSegment(`segmentos/${slug}`)?.slug === slug,
    `getSegment('segmentos/${slug}') resolves`,
  )
  assert(
    getSegment(`/segmentos/${slug}/`)?.slug === slug,
    `getSegment('/segmentos/${slug}/') resolves`,
  )
  assert(
    getSegment(slug.toUpperCase())?.slug === slug,
    `getSegment('${slug.toUpperCase()}') resolves uppercase`,
  )
}

// Aliases
const ALIAS_TEST_CASES: Record<string, string> = {
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

for (const [alias, expectedCanonical] of Object.entries(ALIAS_TEST_CASES)) {
  const res = getSegment(alias)
  assert(
    res !== undefined && res.slug === expectedCanonical,
    `getSegment('${alias}') -> canonical '${expectedCanonical}'`,
  )
  assert(
    getSegment(`/${alias}/`)?.slug === expectedCanonical,
    `getSegment('/${alias}/') -> canonical '${expectedCanonical}'`,
  )
  assert(
    getSegment(`segmentos/${alias}`)?.slug === expectedCanonical,
    `getSegment('segmentos/${alias}') -> canonical '${expectedCanonical}'`,
  )
}

// Adversarial Invalid inputs
const INVALID_SEGMENT_INPUTS = [
  "",
  "   ",
  "slug-completamente-inexistente",
  "12345",
  "null",
  "undefined",
  "../traversal",
  "../../src/data/site",
  "<script>alert(1)</script>",
  "__proto__",
  "constructor",
  "prototype",
  "toString",
  "valueOf",
]

for (const inv of INVALID_SEGMENT_INPUTS) {
  const res = getSegment(inv)
  assert(res === undefined, `getSegment('${inv}') safely returns undefined`)
}
assert(
  getSegment(undefined) === undefined,
  `getSegment(undefined) safely returns undefined`,
)

// 3. PORTFOLIO & GET_CASE RESOLUTION
console.log("\n▶ [TEST GROUP 3] Portfolio & getCase() Resolution")
assert(
  PORTFOLIO.length >= 10,
  `PORTFOLIO contains ${PORTFOLIO.length} items (expected >= 10)`,
)

const caseSlugs = new Set<string>()
for (const item of PORTFOLIO) {
  assert(
    typeof item.caseSlug === "string" && item.caseSlug.length > 0,
    `Portfolio item '${item.title}' has defined caseSlug: '${item.caseSlug}'`,
  )
  assert(
    !caseSlugs.has(item.caseSlug!),
    `Portfolio caseSlug '${item.caseSlug}' is unique in PORTFOLIO`,
  )
  caseSlugs.add(item.caseSlug!)

  assert(
    EXPECTED_SLUGS.includes(item.segmentSlug),
    `Portfolio item '${item.title}' segmentSlug '${item.segmentSlug}' is one of 8 canonical segments`,
  )
  assert(
    typeof item.photo === "string" && item.photo.length > 0,
    `Portfolio item '${item.title}' has photo`,
  )
  assert(
    typeof item.category === "string" && item.category.length > 0,
    `Portfolio item '${item.title}' has category`,
  )
}

// getCase for each canonical item
for (const item of PORTFOLIO) {
  const resolved = getCase(item.caseSlug)
  assert(
    resolved !== undefined && resolved.caseSlug === item.caseSlug,
    `getCase('${item.caseSlug}') resolves to '${item.title}'`,
  )
  assert(
    getCase(`/${item.caseSlug}`)?.caseSlug === item.caseSlug,
    `getCase('/${item.caseSlug}') resolves`,
  )
  assert(
    getCase(`/portfolio/${item.caseSlug}/`)?.caseSlug === item.caseSlug,
    `getCase('/portfolio/${item.caseSlug}/') resolves`,
  )
  assert(
    getCase(item.caseSlug!.toUpperCase())?.caseSlug === item.caseSlug,
    `getCase('${item.caseSlug!.toUpperCase()}') resolves uppercase`,
  )
}

// getCase for aliases
for (const [alias, targetSlug] of Object.entries(CASE_ALIASES)) {
  const resolved = getCase(alias)
  assert(
    resolved !== undefined &&
      (resolved.caseSlug === targetSlug || resolved.caseSlug === alias),
    `getCase('${alias}') resolves to case with slug '${resolved?.caseSlug}' (expected '${targetSlug}')`,
  )
  assert(
    getCase(`portfolio/${alias}`)?.caseSlug === resolved?.caseSlug,
    `getCase('portfolio/${alias}') resolves`,
  )
}

// Invalid case inputs
const INVALID_CASE_INPUTS = [
  "",
  "   ",
  "case-totalmente-inexistente-xyz",
  "null",
  "undefined",
  "portfolio/inexistente",
  "../secret",
  "<script>xss</script>",
  "__proto__",
  "constructor",
  "prototype",
  "toString",
]

for (const inv of INVALID_CASE_INPUTS) {
  const res = getCase(inv)
  assert(res === undefined, `getCase('${inv}') safely returns undefined`)
}
assert(
  getCase(undefined) === undefined,
  `getCase(undefined) safely returns undefined`,
)

// 4. SITEMAP.XML AUDIT
console.log("\n▶ [TEST GROUP 4] public/sitemap.xml Empirical Audit")
const sitemapContent = readFileSync(
  path.join(process.cwd(), "public", "sitemap.xml"),
  "utf8",
)

const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1],
)
assert(locMatches.length > 0, `sitemap.xml has ${locMatches.length} URLs`)

for (const loc of locMatches) {
  const url = new URL(loc)
  assert(
    url.origin === "https://versavisual.com.br" ||
      url.origin === "https://www.versavisual.com.br",
    `URL ${loc} uses versavisual.com.br domain`,
  )

  const pathname = url.pathname.replace(/\/$/, "") || "/"

  if (
    pathname === "/" ||
    pathname === "/portfolio" ||
    pathname === "/diagnostico-visual"
  ) {
    assert(true, `Core static URL valid: ${pathname}`)
  } else if (pathname.startsWith("/portfolio/")) {
    const slug = pathname.replace("/portfolio/", "")
    const resolvedCase = getCase(slug)
    assert(
      resolvedCase !== undefined,
      `Sitemap case URL ${pathname} resolves to case '${resolvedCase?.title}'`,
    )
  } else {
    const segSlug = pathname.replace(/^\//, "")
    const resolvedSeg = getSegment(segSlug)
    assert(
      resolvedSeg !== undefined,
      `Sitemap segment URL ${pathname} resolves to segment '${resolvedSeg?.nav}'`,
    )
  }
}

// Check all 8 canonical segments are represented in sitemap
for (const slug of EXPECTED_SLUGS) {
  const found = locMatches.some((loc) => loc.includes(`/${slug}`))
  assert(found, `Canonical segment /${slug} is present in sitemap.xml`)
}

// Check all canonical portfolio cases are in sitemap
for (const item of PORTFOLIO) {
  const found = locMatches.some((loc) =>
    loc.includes(`/portfolio/${item.caseSlug}`),
  )
  assert(
    found,
    `Canonical portfolio case /portfolio/${item.caseSlug} is present in sitemap.xml`,
  )
}

// 5. SUMMARY
console.log("\n========================================================")
console.log(
  `TOTAL CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`,
)
console.log("========================================================\n")

if (failed > 0) {
  console.error("FAILURES:")
  for (const err of errors) {
    console.error(` - ${err}`)
  }
  process.exit(1)
} else {
  console.log(
    "🎉 ALL EMPIRICAL CHALLENGER ASSERTIONS PASSED WITH 100% SUCCESS!",
  )
  process.exit(0)
}
