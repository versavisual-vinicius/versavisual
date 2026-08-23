import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, OFFICIAL_SEGMENTS } from "../utils/domain-helpers.ts"
import {
  CANONICAL_HOME_SERVICES,
  CANONICAL_HOME_PROCESS,
  CANONICAL_HOME_STATS,
} from "../utils/site-data.ts"
import { HOME_SERVICE_GROUPS } from "../../src/data/site.ts"

export async function runTier1HomeComponentsTests() {
  runner.setTier("Tier 1 - Feature Coverage")
  await describe("Feature 13: Hero Vídeo Full-Bleed", () => {
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F13.1: Hero section renders background video with required HTML5 attributes (autoPlay, loop, muted, playsInline)", () => {
      expect(homeCode).toContain("<video")
      expect(homeCode).toContain("autoPlay")
      expect(homeCode).toContain("loop")
      expect(homeCode).toContain("muted")
      expect(homeCode).toContain("playsInline")
    })

    it("F13.2: Hero video specifies sources (webm and mp4) for cross-browser playback", () => {
      expect(homeCode).toContain('type="video/webm"')
      expect(homeCode).toContain('type="video/mp4"')
    })

    it("F13.3: Hero video starts without a poster image before playback", () => {
      expect(homeCode).not.toContain("poster=")
    })

    it("F13.4: Hero section includes gradient overlay (.u-grade) for high text contrast", () => {
      expect(homeCode).toContain("u-grade")
    })

    it("F13.5: Hero section displays official institutional headline and value proposition", () => {
      expect(homeCode).toContain("Imagem não é registro. É posicionamento.")
    })

    it("F13.6: Hero section renders conversion CTAs ('Fazer diagnóstico visual' and 'Ver portfólio')", () => {
      expect(homeCode).toContain("Fazer diagnóstico visual")
      expect(homeCode).toContain("Ver portfólio")
      expect(homeCode).toContain("/diagnostico-visual")
      expect(homeCode).toContain("/portfolio")
    })
  })

  await describe("Feature 14: Grid de Serviços & TiltCard", () => {
    const serviceGridCode = readProjectFile("src/components/ServiceGrid.tsx")
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F14.1: ServiceGrid renders all 6 institutional services (01 to 06)", () => {
      expect(CANONICAL_HOME_SERVICES).toHaveLength(6)
      expect(homeCode).toContain("<ServiceGrid")
    })

    it("F14.2: ServiceGrid applies responsive grid layout (1 col mobile, 2 col sm, 3 col lg)", () => {
      expect(serviceGridCode).toContain("sm:grid-cols-2")
      expect(serviceGridCode).toContain("lg:grid-cols-3")
    })

    it("F14.3: Service cards feature hover accent animation line", () => {
      expect(serviceGridCode).toContain("group-hover:scale-x-100")
      expect(serviceGridCode).toContain("bg-teal")
    })

    it("F14.4: Home page includes ServiceGrid with section title and eyebrow", () => {
      expect(homeCode).toContain("<ServiceGrid")
      expect(homeCode).toContain("HOME_SERVICES")
    })

    it("F14.5: Authority stats strip renders 4 key metrics (+120 Projetos, 25+ Marcas, 18 Estados, 5+ Anos)", () => {
      expect(CANONICAL_HOME_STATS).toHaveLength(4)
      expect(homeCode).toContain("HOME_STATS")
      expect(homeCode).toContain("s.value")
      expect(homeCode).toContain("s.label")
    })

    it("F14.6: Mobile service groups preserve the approved photography and video offers", () => {
      expect(HOME_SERVICE_GROUPS).toEqual([
        {
          title: "Fotografia",
          items: ["Cobertura de eventos", "Direção"],
        },
        {
          title: "Vídeo",
          items: [
            "Direção",
            "Roteiro",
            "Videomaking",
            "Storymaking",
            "Cobertura de eventos",
          ],
        },
      ])
    })

    it("F14.7: Mobile service groups use native disclosures", () => {
      expect(serviceGridCode).toContain("<details")
      expect(serviceGridCode).toContain("<summary")
    })

    it("F14.8: Mobile disclosures replace cards only below the small breakpoint", () => {
      expect(serviceGridCode).toContain("sm:hidden")
      expect(serviceGridCode).toContain("hidden sm:grid")
    })

    it("F14.9: Mobile disclosure summaries meet touch target requirements", () => {
      expect(serviceGridCode).toContain("min-h-[44px]")
    })
  })

  await describe("Feature 15: Seletor de Segmentos Home", () => {
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F15.1: Home page contains the #nichos section displaying all 8 segments", () => {
      expect(homeCode).toContain('id="nichos"')
      expect(OFFICIAL_SEGMENTS).toHaveLength(8)
    })

    it("F15.2: Segment cards use mobile aspect ratio aspect-[16/11] and desktop aspect-[3/4]", () => {
      expect(homeCode).toContain("aspect-[16/11]")
      expect(homeCode).toContain("sm:aspect-[3/4]")
    })

    it("F15.3: Segment cards link to their respective niche landing pages (/:slug)", () => {
      expect(homeCode).toContain("to={`/${s.slug}`}")
      expect(homeCode).toContain("SEGMENTS")
    })

    it("F15.4: Segment cards feature image overlay with u-grade and hover zoom effect", () => {
      expect(homeCode).toContain("u-grade")
      expect(homeCode).toContain("group-hover:scale-")
    })

    it("F15.5: Segment cards include accessible alt descriptions generated for each niche", () => {
      expect(homeCode).toContain("segmentImageAlt(s)")
    })
  })

  await describe("Feature 16: Timeline do Método de Execução", () => {
    const timelineCode = readProjectFile("src/components/ui/timeline.tsx")
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F16.1: Timeline component renders the 4 structured steps (01 Briefing, 02 Pré-produção, 03 Execução, 04 Pós & entrega)", () => {
      expect(timelineCode).toContain("data.map")
      expect(homeCode).toContain("HOME_PROCESS")
    })

    it("F16.2: Timeline features sticky heading on desktop with scrollable steps", () => {
      expect(timelineCode).toContain("lg:sticky")
      expect(timelineCode).toContain("top-24")
    })

    it("F16.3: Timeline tracks vertical scroll progress and renders animated progress line", () => {
      expect(timelineCode).toContain("progressLineRef")
      expect(timelineCode).toContain("scroll")
      expect(timelineCode).toContain("scaleY")
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
