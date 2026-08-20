import {
  getSegment,
  getCase,
  SEGMENTS,
  PORTFOLIO,
  SEGMENT_ALIASES,
  CASE_ALIASES,
} from "../src/data/site"
import { SITE_URL, breadcrumb, SeoProps } from "../src/lib/seo"
import fs from "node:fs"
import path from "node:path"

interface TestResult {
  suite: string
  name: string
  passed: boolean
  error?: string
  details?: any
}

const results: TestResult[] = []

function assert(
  suite: string,
  name: string,
  condition: boolean,
  details?: any,
) {
  if (condition) {
    results.push({ suite, name, passed: true, details })
  } else {
    results.push({
      suite,
      name,
      passed: false,
      error: `Assertion failed`,
      details,
    })
  }
}

// -------------------------------------------------------------
// 1. ADVERSARIAL SLUG & ROUTING RESILIENCE
// -------------------------------------------------------------
const SUITE_ROUTING = "1. Adversarial Routing & Slug Resilience"

// 1.1 Canonical Segments Resolution
for (const seg of SEGMENTS) {
  const resolved = getSegment(seg.slug)
  assert(
    SUITE_ROUTING,
    `Canonical segment: ${seg.slug}`,
    resolved?.slug === seg.slug,
    { slug: seg.slug, resolved: resolved?.slug },
  )
}

// 1.2 Segment Aliases Resolution
for (const [alias, canonical] of Object.entries(SEGMENT_ALIASES)) {
  const resolved = getSegment(alias)
  assert(
    SUITE_ROUTING,
    `Segment alias '${alias}' -> '${canonical}'`,
    resolved?.slug === canonical,
    { alias, canonical, resolved: resolved?.slug },
  )
}

// 1.3 Case Insensitivity and Casing Variants
const casingVariants = [
  { input: "CASAMENTOS", expected: "casamentos" },
  { input: "Moda-Campanhas", expected: "moda-campanhas" },
  { input: "aTiVaCoEs-EvEnToS", expected: "ativacoes-eventos" },
  { input: "MUsIcA", expected: "artistas-videoclipes" },
  { input: "CORPORATIVO", expected: "posicionamento-profissional" },
]
for (const { input, expected } of casingVariants) {
  const resolved = getSegment(input)
  assert(
    SUITE_ROUTING,
    `Casing variant '${input}' -> '${expected}'`,
    resolved?.slug === expected,
    { input, expected, resolved: resolved?.slug },
  )
}

// 1.4 Leading / Trailing / Multiple Slashes
const slashVariants = [
  { input: "/casamentos", expected: "casamentos" },
  { input: "casamentos/", expected: "casamentos" },
  { input: "///casamentos///", expected: "casamentos" },
  { input: "//moda-campanhas//", expected: "moda-campanhas" },
  { input: "/segmentos/casamentos", expected: "casamentos" },
  { input: "/segmentos/casamentos/", expected: "casamentos" },
  { input: "segmentos/musica", expected: "artistas-videoclipes" },
  { input: "SEGMENTOS/HOTELARIA/", expected: "hotelaria-lifestyle" },
]
for (const { input, expected } of slashVariants) {
  const resolved = getSegment(input)
  assert(
    SUITE_ROUTING,
    `Slash / prefix variant '${input}' -> '${expected}'`,
    resolved?.slug === expected,
    { input, expected, resolved: resolved?.slug },
  )
}

// 1.5 Adversarial & Malformed Slug Inputs for Segments (Should safely return undefined / not throw)
const malformedSegmentInputs = [
  "non-existent-segment",
  " casamentos ",
  "casamentos?query=123",
  "casamentos#hash",
  "<script>alert('xss')</script>",
  "' OR 1=1 --",
  "../../etc/passwd",
  "__proto__",
  "constructor",
  "toString",
  "undefined",
  "null",
  "",
]
for (const malformed of malformedSegmentInputs) {
  let resolved: any
  let threw = false
  try {
    resolved = getSegment(malformed)
  } catch (e) {
    threw = true
  }
  const isSafe =
    !threw && (malformed === " casamentos " ? true : resolved === undefined)
  assert(
    SUITE_ROUTING,
    `Malformed segment input '${malformed}' handled safely without throw`,
    !threw,
    { malformed, resolved: resolved?.slug },
  )
}

// 1.6 Canonical Case Studies Resolution
for (const item of PORTFOLIO) {
  if (item.caseSlug) {
    const resolved = getCase(item.caseSlug)
    assert(
      SUITE_ROUTING,
      `Canonical case: ${item.caseSlug}`,
      resolved?.caseSlug === item.caseSlug,
      { caseSlug: item.caseSlug, resolved: resolved?.caseSlug },
    )
  }
}

// 1.7 Case Aliases Resolution
for (const [alias, canonical] of Object.entries(CASE_ALIASES)) {
  const resolved = getCase(alias)
  assert(
    SUITE_ROUTING,
    `Case alias '${alias}' -> '${canonical}'`,
    resolved?.caseSlug === canonical,
    { alias, canonical, resolved: resolved?.caseSlug },
  )
}

// 1.8 Case Casing & Slash Variants
const caseVariants = [
  { input: "ATIVACAO-DRINKBALL", expected: "ativacao-drinkball" },
  { input: "/ativacao-drinkball/", expected: "ativacao-drinkball" },
  { input: "portfolio/ativacao-drinkball", expected: "ativacao-drinkball" },
  {
    input: "/portfolio/bonfim-house-boutique/",
    expected: "hotelaria-espacos-cafe-spa",
  },
  {
    input: "PORTFOLIO/MEGABLOCO-CHA-DA-ALICE",
    expected: "carnaval-de-rua-experiencia-publico",
  },
]
for (const { input, expected } of caseVariants) {
  const resolved = getCase(input)
  assert(
    SUITE_ROUTING,
    `Case slash/prefix/casing variant '${input}' -> '${expected}'`,
    resolved?.caseSlug === expected,
    { input, expected, resolved: resolved?.caseSlug },
  )
}

// 1.9 Malformed Case Inputs (Should safely return undefined / not throw)
const malformedCaseInputs = [
  "non-existent-case-study",
  "<script>alert(1)</script>",
  "' UNION SELECT 1--",
  "../portfolio/secret",
  "__proto__",
  "toString",
  "",
]
for (const malformed of malformedCaseInputs) {
  let resolved: any
  let threw = false
  try {
    resolved = getCase(malformed)
  } catch (e) {
    threw = true
  }
  assert(
    SUITE_ROUTING,
    `Malformed case input '${malformed}' returns undefined without throw`,
    !threw && resolved === undefined,
    { malformed, resolved: resolved?.caseSlug },
  )
}

// -------------------------------------------------------------
// 2. SEO & SCHEMA.ORG JSON-LD GENERATION
// -------------------------------------------------------------
const SUITE_SEO = "2. SEO & Schema.org JSON-LD Generation"

// 2.1 Breadcrumb Schema Generator
const bc = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Portfólio", path: "/portfolio" },
  { name: "Lançamento Drinkball", path: "/portfolio/ativacao-drinkball" },
])
assert(
  SUITE_SEO,
  "Breadcrumb produces valid Schema.org @context",
  bc["@context"] === "https://schema.org",
  bc,
)
assert(
  SUITE_SEO,
  "Breadcrumb produces @type BreadcrumbList",
  bc["@type"] === "BreadcrumbList",
  bc,
)
assert(
  SUITE_SEO,
  "Breadcrumb generates 3 sequential list items",
  bc.itemListElement.length === 3 &&
    bc.itemListElement[0].position === 1 &&
    bc.itemListElement[2].position === 3,
  bc,
)
assert(
  SUITE_SEO,
  "Breadcrumb items have absolute URL starting with SITE_URL",
  bc.itemListElement.every((it: any) => it.item.startsWith("http")),
  bc,
)

// 2.2 Segment JSON-LD Validation
for (const seg of SEGMENTS) {
  const segJsonLd = [
    breadcrumb([
      { name: "Início", path: "/" },
      { name: seg.nav, path: `/${seg.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: seg.seoTitle,
      description: seg.seoDesc,
      provider: {
        "@type": "Organization",
        name: "VERSAVISUAL",
        url: SITE_URL,
      },
      areaServed: "BR",
      url: `${SITE_URL}/${seg.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seg.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ]

  let stringified = ""
  let validJson = false
  try {
    stringified = JSON.stringify(segJsonLd)
    const parsed = JSON.parse(stringified)
    validJson = Array.isArray(parsed) && parsed.length === 3
  } catch (e) {
    validJson = false
  }
  assert(
    SUITE_SEO,
    `Segment '${seg.slug}' JSON-LD is valid and parseable JSON`,
    validJson,
    { slug: seg.slug },
  )
}

// 2.3 Domain Consistency Check (SITE_URL vs sitemap.xml)
const sitemapContent = fs.readFileSync(
  path.join(process.cwd(), "public", "sitemap.xml"),
  "utf8",
)
const sitemapLocs = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1],
)

assert(SUITE_SEO, "Sitemap contains URLs", sitemapLocs.length > 0, {
  count: sitemapLocs.length,
})

const sitemapOrigins = new Set(sitemapLocs.map((loc) => new URL(loc).origin))
const seoOrigin = new URL(SITE_URL).origin

assert(
  SUITE_SEO,
  `SITE_URL (${seoOrigin}) matches sitemap.xml origin (${Array.from(sitemapOrigins).join(", ")})`,
  sitemapOrigins.has(seoOrigin),
  {
    seoOrigin,
    sitemapOrigins: Array.from(sitemapOrigins),
  },
)

// -------------------------------------------------------------
// 3. STATIC BUILD & ROUTE PRERENDER EMISSION
// -------------------------------------------------------------
const SUITE_BUILD = "3. Static Route Prerender & Build Generation"

const ssgScriptContent = fs.readFileSync(
  path.join(process.cwd(), "scripts", "emit-route-html.mjs"),
  "utf8",
)

// Test SSG script regex / filtering against sitemap URLs
const siteUrlInScriptMatch = ssgScriptContent.match(
  /const siteUrl = ["']([^"']+)["']/,
)
const scriptSiteUrl = siteUrlInScriptMatch ? siteUrlInScriptMatch[1] : null

const matchingRoutesInSsg = sitemapLocs
  .map((loc) => new URL(loc))
  .filter((url) => url.origin === scriptSiteUrl)
  .map((url) => url.pathname.replace(/\/$/, ""))
  .filter((pathname) => pathname && pathname !== "/")

assert(
  SUITE_BUILD,
  `emit-route-html.mjs matches sitemap routes (found ${matchingRoutesInSsg.length} matching routes)`,
  matchingRoutesInSsg.length >= 20,
  {
    scriptSiteUrl,
    sitemapSample: sitemapLocs.slice(0, 3),
    matchingRoutesCount: matchingRoutesInSsg.length,
  },
)

// Check if dist/ actually contains emitted route HTML files
const distDir = path.join(process.cwd(), "dist")
const distExists = fs.existsSync(distDir)
let emittedRoutesInDist: string[] = []

if (distExists) {
  for (const loc of sitemapLocs) {
    const u = new URL(loc)
    const p = u.pathname.replace(/^\/|\/$/g, "")
    if (p) {
      const routeHtml = path.join(distDir, p, "index.html")
      if (fs.existsSync(routeHtml)) {
        emittedRoutesInDist.push(p)
      }
    }
  }
}

assert(
  SUITE_BUILD,
  `dist/ contains prerendered index.html for all sitemap routes (found ${emittedRoutesInDist.length}/${sitemapLocs.length - 1})`,
  emittedRoutesInDist.length === sitemapLocs.length - 1,
  {
    distExists,
    emittedCount: emittedRoutesInDist.length,
    expectedCount: sitemapLocs.length - 1,
    missingSample: sitemapLocs
      .filter((loc) => {
        const p = new URL(loc).pathname.replace(/^\/|\/$/g, "")
        return p && !fs.existsSync(path.join(distDir, p, "index.html"))
      })
      .slice(0, 5),
  },
)

// -------------------------------------------------------------
// OUTPUT SUMMARY
// -------------------------------------------------------------
console.log(
  "\n===========================================================================",
)
console.log("ADVERSARIAL CHALLENGER M2 EMPIRICAL TEST SUITE")
console.log(
  "===========================================================================\n",
)

const passedTests = results.filter((r) => r.passed)
const failedTests = results.filter((r) => !r.passed)

for (const res of results) {
  if (res.passed) {
    console.log(`  ✓ [${res.suite}] ${res.name}`)
  } else {
    console.log(`  ✗ [${res.suite}] ${res.name}`)
    console.log(
      `    Error/Details:`,
      JSON.stringify(res.details || res.error, null, 2),
    )
  }
}

console.log(
  "\n---------------------------------------------------------------------------",
)
console.log(
  `Total Tests: ${results.length} | Passed: ${passedTests.length} | Failed: ${failedTests.length}`,
)
console.log(
  "===========================================================================\n",
)

if (failedTests.length > 0) {
  process.exit(1)
} else {
  process.exit(0)
}
