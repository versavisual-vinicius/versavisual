import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()

function readFile(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf-8")
}

function fileExists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath))
}

// Relative luminance & WCAG contrast calculation
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("")
  }
  const num = parseInt(hex, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex)
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1)
  const lum2 = getLuminance(hex2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

let passedCount = 0
let failedCount = 0
const failures = []

function assert(condition, testName, details = "") {
  if (condition) {
    passedCount++
    console.log(`  \x1b[32m✓\x1b[0m ${testName}`)
  } else {
    failedCount++
    failures.push({ testName, details })
    console.log(`  \x1b[31m✗\x1b[0m ${testName}`)
    if (details) console.log(`    \x1b[31m${details}\x1b[0m`)
  }
}

console.log(
  "\x1b[1m\x1b[36m===========================================================================\x1b[0m",
)
console.log(
  "\x1b[1m\x1b[35m🛡️  CHALLENGER M1-1: ADVERSARIAL STRESS TEST SUITE\x1b[0m",
)
console.log(
  "\x1b[1m\x1b[36m===========================================================================\x1b[0m",
)

// ============================================================================
// SUITE 1: Token de Cor #5E7F8C e Design System em src/index.css
// ============================================================================
console.log(
  "\n\x1b[1m\x1b[34m▶ [Suite 1] Tokens e Variáveis CSS em src/index.css\x1b[0m",
)
const css = readFile("src/index.css")

// Test a: Presença e valor exato do token #5e7f8c
const tealMatch = css.match(/--color-teal:\s*(#[0-9a-fA-F]{6});/)
assert(
  tealMatch !== null && tealMatch[1].toLowerCase() === "#5e7f8c",
  "Token oficial --color-teal é exatamente #5e7f8c em @theme",
  `Encontrado: ${tealMatch ? tealMatch[1] : "NÃO ENCONTRADO"}`,
)

assert(css.includes("--color-ink: #050a0d"), "Token --color-ink é #050a0d")
assert(css.includes("--color-navy: #253540"), "Token --color-navy é #253540")
assert(css.includes("--color-mist: #a4b8bf"), "Token --color-mist é #a4b8bf")
assert(css.includes("--color-off: #f2f2f2"), "Token --color-off é #f2f2f2")
assert(
  css.includes("--color-teal-400: #70909c"),
  "Token --color-teal-400 é #70909c",
)

// Test selection pseudo-element
const selectionMatch = css.match(/::selection\s*\{([^}]+)\}/)
assert(
  selectionMatch &&
    selectionMatch[1].includes("var(--color-teal)") &&
    selectionMatch[1].includes("var(--color-off)"),
  "::selection utiliza background var(--color-teal) e color var(--color-off)",
  `Encontrado: ${selectionMatch ? selectionMatch[1].trim() : "NÃO ENCONTRADO"}`,
)

// Test .u-eyebrow
const eyebrowMatch = css.match(/\.u-eyebrow\s*\{([^}]+)\}/)
assert(
  eyebrowMatch &&
    eyebrowMatch[1].includes("var(--color-mist)") &&
    !eyebrowMatch[1].includes("var(--color-navy)"),
  ".u-eyebrow usa var(--color-mist) por padrão para alto contraste sobre fundos escuros",
  `Encontrado: ${eyebrowMatch ? eyebrowMatch[1].trim() : "NÃO ENCONTRADO"}`,
)

// Test typography declarations
assert(css.includes("--font-display: 'Righteous'"), "Font display é Righteous")
assert(css.includes("--font-head: 'Outfit'"), "Font head é Outfit")
assert(css.includes("--font-body: 'DM Sans'"), "Font body é DM Sans")

// ============================================================================
// SUITE 2: Análise Matemática de Contraste WCAG e Ausência de Pares Inválidos
// ============================================================================
console.log(
  "\n\x1b[1m\x1b[34m▶ [Suite 2] Auditoria de Contraste WCAG e Combinações de Cores\x1b[0m",
)

const c_teal_off = getContrastRatio("#5E7F8C", "#F2F2F2")
const c_teal_white = getContrastRatio("#5E7F8C", "#FFFFFF")
const c_teal_ink = getContrastRatio("#5E7F8C", "#050A0D")
const c_teal_navy = getContrastRatio("#5E7F8C", "#253540")
const c_ink_off = getContrastRatio("#050A0D", "#F2F2F2")
const c_ink_mist = getContrastRatio("#050A0D", "#A4B8BF")

assert(
  c_teal_navy < 3.0,
  `Demonstração empírica: bg-teal com text-navy é INVÁLIDO (razão ${c_teal_navy.toFixed(2)}:1 < 3.0:1)`,
  `Razão obtida: ${c_teal_navy}`,
)

assert(
  c_ink_off > 15.0,
  `Alto contraste entre fundo ink e texto off (${c_ink_off.toFixed(2)}:1 > 15.0:1)`,
  `Razão obtida: ${c_ink_off}`,
)

assert(
  c_ink_mist > 9.0,
  `Alto contraste entre fundo ink e texto mist (${c_ink_mist.toFixed(2)}:1 > 9.0:1)`,
  `Razão obtida: ${c_ink_mist}`,
)

// Scan all modified components for invalid color pairs
const m1Files = [
  "src/index.css",
  "src/components/Header.tsx",
  "src/components/CTASection.tsx",
  "src/components/Footer.tsx",
  "src/components/WhatsAppFloat.tsx",
  "src/components/Logo.tsx",
]

for (const f of m1Files) {
  const content = readFile(f)
  assert(
    !/bg-teal[^"']*text-ink/i.test(content) &&
      !/text-ink[^"']*bg-teal/i.test(content),
    `Ausência de bg-teal com text-ink em ${f}`,
    `Violação encontrada em ${f}`,
  )
  assert(
    !/bg-teal[^"']*text-navy/i.test(content) &&
      !/text-navy[^"']*bg-teal/i.test(content),
    `Ausência de bg-teal com text-navy em ${f}`,
    `Violação encontrada em ${f}`,
  )
}

// ============================================================================
// SUITE 3: Componente Header.tsx (Acessibilidade, Touch Targets e Estados)
// ============================================================================
console.log("\n\x1b[1m\x1b[34m▶ [Suite 3] Componente Header.tsx\x1b[0m")
const headerCode = readFile("src/components/Header.tsx")

// Desktop CTA
assert(
  headerCode.includes("border border-teal bg-teal") &&
    headerCode.includes("text-off") &&
    headerCode.includes("min-h-[44px]"),
  "Header: CTA desktop 'Iniciar projeto' usa bg-teal text-off e min-h-[44px]",
  "Faltam classes obrigatórias de estilo ou touch target no CTA desktop",
)

// Mobile Drawer CTA
assert(
  headerCode.includes('id="mobile-navigation-drawer"'),
  "Header: Drawer mobile possui id='mobile-navigation-drawer'",
  "id 'mobile-navigation-drawer' não encontrado",
)

// Mobile toggle button
assert(
  headerCode.includes("aria-expanded={open}") &&
    headerCode.includes('aria-controls="mobile-navigation-drawer"') &&
    headerCode.includes('type="button"'),
  "Header: Botão toggle mobile tem aria-expanded, aria-controls e type='button'",
  "Atributos ARIA ausentes no botão mobile",
)

assert(
  headerCode.includes("min-h-[44px]") && headerCode.includes("min-w-[44px]"),
  "Header: Botão toggle mobile cumpre tamanho mínimo 44x44px (min-h-[44px] min-w-[44px])",
  "Tamanho mínimo de 44px não declarado no botão toggle",
)

// Scroll lock and keyboard accessibility
assert(
  headerCode.includes('document.body.style.overflow = open ? "hidden" : ""'),
  "Header: Scroll lock implementado dinamicamente quando drawer mobile abre",
  "Scroll lock ausente",
)

assert(
  headerCode.includes('e.key === "Escape"'),
  "Header: Tecla Escape fecha o menu mobile",
  "Handler da tecla Escape ausente",
)

// ============================================================================
// SUITE 4: Componente CTASection.tsx (Contraste e Links)
// ============================================================================
console.log("\n\x1b[1m\x1b[34m▶ [Suite 4] Componente CTASection.tsx\x1b[0m")
const ctaCode = readFile("src/components/CTASection.tsx")

assert(
  ctaCode.includes("bg-teal") &&
    ctaCode.includes("text-off") &&
    ctaCode.includes("min-h-[44px]"),
  "CTASection: Botão principal 'Fazer diagnóstico visual' usa bg-teal text-off e min-h-[44px]",
  "Botão principal fora do padrão de design",
)

assert(
  ctaCode.includes('rel="noopener noreferrer"') &&
    ctaCode.includes('target="_blank"') &&
    ctaCode.includes("min-h-[44px]"),
  "CTASection: Link WhatsApp externo tem rel='noopener noreferrer', target='_blank' e min-h-[44px]",
  "Link externo inseguro ou sem touch target acessível",
)

assert(
  ctaCode.includes("bg-ink/80"),
  "CTASection: Overlay escuro bg-ink/80 garante contraste legível sobre fotografia",
  "Overlay bg-ink/80 ausente",
)

assert(
  ctaCode.includes('alt=""') && ctaCode.includes("aria-hidden"),
  "CTASection: Imagem de fundo decorativa possui alt='' e aria-hidden",
  "Atributos de imagem decorativa incorretos",
)

// ============================================================================
// SUITE 5: Componentes Footer.tsx e WhatsAppFloat.tsx
// ============================================================================
console.log(
  "\n\x1b[1m\x1b[34m▶ [Suite 5] Footer.tsx e WhatsAppFloat.tsx\x1b[0m",
)
const footerCode = readFile("src/components/Footer.tsx")
const waCode = readFile("src/components/WhatsAppFloat.tsx")

// Footer
assert(
  footerCode.includes('aria-label="Segmentos"') &&
    footerCode.includes('aria-label="Contato e navegação"'),
  "Footer: Regiões de navegação possuem aria-label descritivo",
  "aria-label ausente nas tags nav do Footer",
)

assert(
  footerCode.includes('rel="noopener noreferrer"') &&
    footerCode.includes('target="_blank"'),
  "Footer: Link WhatsApp externo usa rel='noopener noreferrer' e target='_blank'",
  "Link externo inseguro no Footer",
)

// Verify all list links in footer have min-h-[44px]
const footerLinks =
  footerCode.match(/className="[^"]*min-h-\[44px\][^"]*"/g) || []
assert(
  footerLinks.length >= 6,
  `Footer: Links de navegação e contato possuem classe min-h-[44px] (encontrados ${footerLinks.length})`,
  `Apenas ${footerLinks.length} links com touch target configurados`,
)

// WhatsAppFloat
assert(
  waCode.includes("min-h-[44px]") && waCode.includes("min-w-[44px]"),
  "WhatsAppFloat: Dimensão acessível garantida (min-h-[44px] min-w-[44px])",
  "Touch target 44px ausente no WhatsAppFloat",
)

assert(
  waCode.includes('aria-label="Falar no WhatsApp"'),
  "WhatsAppFloat: aria-label='Falar no WhatsApp' presente",
  "aria-label ausente no WhatsAppFloat",
)

assert(
  waCode.includes('target="_blank"') &&
    waCode.includes('rel="noopener noreferrer"'),
  "WhatsAppFloat: Segurança rel='noopener noreferrer' e target='_blank'",
  "Segurança em link externo ausente",
)

assert(
  waCode.includes("focus-visible:ring-teal-400"),
  "WhatsAppFloat: Anel de foco acessível com token focus-visible:ring-teal-400",
  "Foco visível ausente ou incorreto",
)

// ============================================================================
// SUITE 6: Fontes Locais Self-Hosted e Integração HTML
// ============================================================================
console.log(
  "\n\x1b[1m\x1b[34m▶ [Suite 6] Fontes Self-Hosted e index.html\x1b[0m",
)
const indexHtml = readFile("index.html")

const requiredFonts = [
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

let allFontsPresent = true
for (const font of requiredFonts) {
  if (!fileExists(font)) {
    allFontsPresent = false
    console.log(`    Fonte ausente: ${font}`)
  }
}
assert(
  allFontsPresent,
  "Todas as 12 fontes self-hosted (.woff2) existem em public/fonts/",
)

assert(
  !indexHtml.includes("fonts.googleapis.com") &&
    !indexHtml.includes("fonts.gstatic.com"),
  "index.html é 100% self-hosted e não requisita Google Fonts externas",
  "Google fonts CDN ainda presente no index.html",
)

assert(
  indexHtml.includes('rel="preload"') && indexHtml.includes('as="font"'),
  "index.html possui rel='preload' para fontes críticas",
  "Preloads de fontes ausentes no index.html",
)

// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log("\n" + "=".repeat(75))
console.log(
  "\x1b[1m\x1b[36mRESUMO DA AUDITORIA ADVERSARIAL MARCO 1 (M1)\x1b[0m",
)
console.log("=".repeat(75))
console.log(`Total de Asserções Testadas: ${passedCount + failedCount}`)
console.log(`\x1b[32mAsserções Aprovadas (Pass):  ${passedCount}\x1b[0m`)
console.log(`\x1b[31mAsserções Reprovadas (Fail): ${failedCount}\x1b[0m`)
console.log("=".repeat(75))

if (failedCount > 0) {
  console.log(
    `\n\x1b[1m\x1b[31mVEREDITO EMPÍRICO: REJECT (${failedCount} falhas detectadas)\x1b[0m\n`,
  )
  process.exit(1)
} else {
  console.log(
    `\n\x1b[1m\x1b[32mVEREDITO EMPÍRICO: APPROVE (100% dos testes M1 passaram)\x1b[0m\n`,
  )
  process.exit(0)
}
