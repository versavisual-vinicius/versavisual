import fs from "node:fs"
import path from "node:path"

export const PROJECT_ROOT = path.resolve(import.meta.dirname, "../..")

export function readProjectFile(relPath: string): string {
  const fullPath = path.join(PROJECT_ROOT, relPath)
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`)
  }
  return fs.readFileSync(fullPath, "utf-8")
}

export function fileExists(relPath: string): boolean {
  return fs.existsSync(path.join(PROJECT_ROOT, relPath))
}

/**
 * Calculates WCAG 2.1 relative luminance for an sRGB hex color.
 */
export function getLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "").trim()
  const r = parseInt(cleanHex.slice(0, 2), 16) / 255
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * Calculates WCAG 2.1 contrast ratio between two hex colors.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1)
  const lum2 = getLuminance(hex2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

export interface ParsedWhatsAppMessage {
  rawUrl: string
  phoneNumber: string
  text: string
  lines: string[]
  params: Record<string, string>
}

export function parseWhatsAppUrl(url: string): ParsedWhatsAppMessage {
  const parsed = new URL(url)
  const phone = parsed.pathname.replace(/^\//, "")
  const text = parsed.searchParams.get("text") || ""
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
  const params: Record<string, string> = {}

  for (const line of lines) {
    if (line.includes(":")) {
      const idx = line.indexOf(":")
      const key = line
        .slice(0, idx)
        .replace(/[*👤📱✉️📍🎯🎬📅💰📝]/g, "")
        .trim()
      const val = line
        .slice(idx + 1)
        .replace(/[*]/g, "")
        .trim()
      params[key] = val
    }
  }

  return {
    rawUrl: url,
    phoneNumber: phone,
    text,
    lines,
    params,
  }
}

/**
 * Validates route mapping according to the specification.
 */
export const OFFICIAL_SEGMENTS = [
  {
    slug: "ativacoes-eventos",
    name: "Ativações & Eventos",
    category: "Ativações & Eventos",
    index: "01",
  },
  {
    slug: "moda-campanhas",
    name: "Moda & Campanhas",
    category: "Moda & Campanhas",
    index: "02",
  },
  {
    slug: "artistas-videoclipes",
    name: "Artistas & Videoclipes",
    category: "Artistas & Videoclipes",
    index: "03",
  },
  {
    slug: "posicionamento-profissional",
    name: "Posicionamento Profissional",
    category: "Posicionamento Profissional",
    index: "04",
  },
  {
    slug: "imagem-pessoal-lifestyle",
    name: "Imagem Pessoal & Lifestyle",
    category: "Imagem Pessoal & Lifestyle",
    index: "05",
  },
  {
    slug: "casamentos",
    name: "Casamentos",
    category: "Casamentos",
    index: "06",
  },
  { slug: "gestantes", name: "Gestantes", category: "Gestantes", index: "07" },
  {
    slug: "hotelaria-lifestyle",
    name: "Hotelaria & Lifestyle",
    category: "Hotelaria & Lifestyle",
    index: "08",
  },
]

export const KNOWN_SEGMENT_ALIASES: Record<string, string> = {
  ativacoes: "ativacoes-eventos",
  eventos: "ativacoes-eventos",
  moda: "moda-campanhas",
  campanhas: "moda-campanhas",
  artistas: "artistas-videoclipes",
  videoclipes: "artistas-videoclipes",
  musica: "artistas-videoclipes",
  posicionamento: "posicionamento-profissional",
  corporativo: "posicionamento-profissional",
  lifestyle: "imagem-pessoal-lifestyle",
  pessoal: "imagem-pessoal-lifestyle",
  casamento: "casamentos",
  gestante: "gestantes",
  maternidade: "gestantes",
  hotelaria: "hotelaria-lifestyle",
}

export function resolveSegmentSlug(inputSlug: string): string | null {
  if (!inputSlug) return null
  const clean = inputSlug
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^segmentos\//, "")
  const resolved = KNOWN_SEGMENT_ALIASES[clean] || clean
  const match = OFFICIAL_SEGMENTS.find((s) => s.slug === resolved)
  return match ? match.slug : null
}
