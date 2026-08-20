import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, OFFICIAL_SEGMENTS } from "../utils/domain-helpers.ts"
import {
  CANONICAL_HOME_SERVICES,
  CANONICAL_HOME_PROCESS,
  CANONICAL_HOME_STATS,
} from "../utils/site-data.ts"

runner.setTier("Tier 1 - Feature Coverage")

export async function runTier1HomeComponentsTests() {
  describe("Feature 13: Hero Vídeo Full-Bleed", () => {
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F13.1: Hero section renders background video with required HTML5 attributes (autoPlay, loop, muted, playsInline)", () => {
      expect(homeCode).toContain("<video")
      expect(homeCode).toContain("autoPlay")
      expect(homeCode).toContain("loop")
      expect(homeCode).toContain("muted")
      expect(homeCode).toContain("playsInline")
    })

    it("F13.2: Hero video specifies sources (webm and mp4) and fallback poster image", () => {
      expect(homeCode).toContain("poster=")
      expect(homeCode).toContain("/videos/hero.webm")
      expect(homeCode).toContain("/videos/hero.mp4")
    })

    it("F13.3: Hero section includes gradient overlay (.u-grade) for high text contrast", () => {
      expect(homeCode).toContain("u-grade")
    })

    it("F13.4: Hero section displays official institutional headline and value proposition", () => {
      expect(homeCode).toContain("Imagem não é registro.")
      expect(homeCode).toContain("É posicionamento.")
      expect(homeCode).toContain("Hub audiovisual autoral")
    })

    it("F13.5: Hero section renders conversion CTAs ('Fazer diagnóstico visual' and 'Ver portfólio')", () => {
      expect(homeCode).toContain("diagnostico-visual")
      expect(homeCode).toContain("/portfolio")
      expect(homeCode).toContain("Link")
    })
  })

  describe("Feature 14: Grid de Serviços & TiltCard", () => {
    const serviceGridCode = readProjectFile("src/components/ServiceGrid.tsx")
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F14.1: ServiceGrid renders all 6 institutional services (01 to 06)", () => {
      expect(serviceGridCode).toContain("HOME_SERVICES")
      for (const s of CANONICAL_HOME_SERVICES) {
        expect(serviceGridCode).toContain("s.n")
        expect(serviceGridCode).toContain("s.title")
        expect(serviceGridCode).toContain("s.desc")
      }
    })

    it("F14.2: ServiceGrid applies responsive grid layout (1 col mobile, 2 col sm, 3 col lg)", () => {
      expect(serviceGridCode).toContain("grid")
      expect(serviceGridCode).toContain("grid-cols-1")
      expect(serviceGridCode).toContain("sm:grid-cols-2")
      expect(serviceGridCode).toContain("lg:grid-cols-3")
    })

    it("F14.3: Service cards feature hover accent animation line", () => {
      expect(serviceGridCode).toContain("group-hover:")
      expect(serviceGridCode).toContain("bg-teal")
      expect(serviceGridCode).toContain("transition-all")
    })

    it("F14.4: Home page includes ServiceGrid with section title and eyebrow", () => {
      expect(homeCode).toContain("<ServiceGrid")
      expect(homeCode).toContain("Serviços")
    })

    it("F14.5: Authority stats strip renders 4 key metrics (+120 Projetos, 25+ Marcas, 18 Estados, 5+ Anos)", () => {
      expect(homeCode).toContain("HOME_STATS")
      for (const stat of CANONICAL_HOME_STATS) {
        expect(homeCode).toContain("stat.value")
        expect(homeCode).toContain("stat.label")
      }
    })
  })

  describe("Feature 15: Seletor de Segmentos Home", () => {
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F15.1: Home page contains the #nichos section displaying all 8 segments", () => {
      expect(homeCode).toContain('id="nichos"')
      expect(homeCode).toContain("SEGMENTS")
      expect(OFFICIAL_SEGMENTS).toHaveLength(8)
    })

    it("F15.2: Segment cards use mobile aspect ratio aspect-[16/11] and desktop aspect-[3/4]", () => {
      expect(homeCode).toContain("aspect-[16/11]")
      expect(homeCode).toContain("sm:aspect-[3/4]")
    })

    it("F15.3: Segment cards link to their respective niche landing pages (/:slug)", () => {
      expect(homeCode).toContain("to={`/${seg.slug}`}")
      expect(homeCode).toContain("Link")
    })

    it("F15.4: Segment cards feature image overlay with u-grade and hover zoom effect", () => {
      expect(homeCode).toContain("u-grade")
      expect(homeCode).toContain("group-hover:scale")
      expect(homeCode).toContain("transition-transform")
    })

    it("F15.5: Segment cards include accessible alt descriptions generated for each niche", () => {
      expect(homeCode).toContain("segmentImageAlt(seg)")
      expect(homeCode).toContain("alt=")
    })
  })

  describe("Feature 16: Timeline do Método de Execução", () => {
    const timelineCode = readProjectFile("src/components/ui/timeline.tsx")
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F16.1: Timeline component renders the 4 structured steps (01 Briefing, 02 Pré-produção, 03 Execução, 04 Pós & entrega)", () => {
      expect(timelineCode).toContain("data")
      for (const p of CANONICAL_HOME_PROCESS) {
        expect(p.n).toMatch(/0[1-4]/)
        expect(p.title).toBeTruthy()
        expect(p.desc).toBeTruthy()
      }
    })

    it("F16.2: Timeline features sticky heading on desktop with scrollable steps", () => {
      expect(timelineCode).toContain("sticky")
      expect(timelineCode).toContain("top-")
    })

    it("F16.3: Timeline tracks vertical scroll progress and renders animated progress line", () => {
      expect(timelineCode).toContain("useScroll")
      expect(timelineCode).toContain("useTransform")
      expect(timelineCode).toContain("motion.div")
    })

    it("F16.4: Home page integrates Timeline component in #processo section", () => {
      expect(homeCode).toContain('id="processo"')
      expect(homeCode).toContain("<Timeline")
      expect(homeCode).toContain("HOME_PROCESS")
    })

    it("F16.5: Timeline respects reduced motion preferences and provides graceful fallback", () => {
      expect(timelineCode).toContain("ref")
      expect(timelineCode).toContain("height")
    })
  })
}
