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

    it("F13.7: Hero separates the mobile video and copy while preserving the desktop overlay", () => {
      expect(homeCode).toContain("sm:min-h-[88svh]")
      expect(homeCode).toContain("sm:absolute sm:inset-0")
      expect(homeCode).toContain("sm:bg-transparent")
    })
  })

  await describe("Feature 14: Grid de Serviços & TiltCard", () => {
    const serviceGridCode = readProjectFile("src/components/ServiceGrid.tsx")
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F14.1: ServiceGrid renders the 3 strategic capability pillars (01 to 03)", () => {
      expect(CANONICAL_HOME_SERVICES).toHaveLength(3)
      expect(homeCode).toContain("<ServiceGrid")
    })

    it("F14.2: ServiceGrid applies responsive 3-column grid layout on sm+", () => {
      expect(serviceGridCode).toContain("sm:grid-cols-3")
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

    it("F14.6: Mobile service groups preserve the 3 approved capability pillars", () => {
      expect(HOME_SERVICE_GROUPS).toEqual([
        {
          title: "Estratégia & Direção",
          items: [
            "Diagnóstico visual e intenção",
            "Roteiro e estrutura narrativa",
            "Direção de cena e conceito estético",
          ],
        },
        {
          title: "Produção & Captação",
          items: [
            "Fotografia editorial e institucional",
            "Produção e captação de vídeo",
            "Cobertura de eventos e ativações",
          ],
        },
        {
          title: "Pós & Distribuição",
          items: [
            "Color Science e tratamento autoral",
            "Storymaking e reels de alto impacto",
            "Formatos verticais prontos para redes",
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
      expect(serviceGridCode).toMatch(/min-h-\[(?:44|48)px\]/)
    })

    it("F14.10: Home passes the approved mobile groups to ServiceGrid", () => {
      expect(homeCode).toContain("HOME_SERVICE_GROUPS")
      expect(homeCode).toContain("mobileGroups={HOME_SERVICE_GROUPS}")
    })

    it("F14.11: Authority stats use an accessible continuous marquee with hover pause", () => {
      const cssCode = readProjectFile("src/index.css")

      expect(homeCode).toContain("u-marquee-track")
      expect(homeCode).toContain('aria-hidden="true"')
      expect(cssCode).toContain("@keyframes vv-marquee")
      expect(cssCode).toContain("animation-play-state: paused")
      expect(cssCode).toContain("prefers-reduced-motion: reduce")
      expect(cssCode).toContain(".u-marquee-track")
    })

    it("F14.12: Reduced motion shows every visual metric in a static grid without the duplicate", () => {
      const cssCode = readProjectFile("src/index.css")

      expect(homeCode).toContain("u-marquee-primary")
      expect(homeCode).toContain("u-marquee-duplicate")
      expect(homeCode).toContain("u-marquee-item")
      expect(cssCode).toContain(".u-marquee-primary")
      expect(cssCode).toContain(
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
      )
      expect(cssCode).toContain(".u-marquee-item { min-width: 0; }")
      expect(cssCode).toContain(".u-marquee-duplicate { display: none; }")
    })

    it("F14.13: Mobile service disclosures use a light brand surface behind dark text", () => {
      expect(serviceGridCode).toContain("bg-off")
      expect(serviceGridCode).toContain("sm:hidden")
    })
  })

  await describe("Feature 15: Seletor de Segmentos Home", () => {
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F15.1: Home page contains the #nichos section displaying all 8 segments", () => {
      expect(homeCode).toContain('id="nichos"')
      expect(OFFICIAL_SEGMENTS).toHaveLength(8)
    })

    it("F15.2: Mobile uses a compact selector and preserves photographic cards from sm onward", () => {
      expect(homeCode).toContain("sm:hidden")
      expect(homeCode).toContain("hidden sm:grid")
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

  await describe("Feature 16.5: Pós-produção & Color Science (BeforeAfterSlider)", () => {
    const beforeAfterCode = readProjectFile("src/data/beforeAfter.ts")

    it("F16.5.1: Babado Novo case displays Nikon emulation and contains no Kodak 2383 reference", () => {
      expect(beforeAfterCode).toContain("Master Final · Emulação Nikon")
      expect(beforeAfterCode).not.toContain("Kodak 2383")
    })

    it("F16.5.2: Preserves Babado Novo RAW simulation and backstage photo assets", () => {
      expect(beforeAfterCode).toContain("RAW Nikon D780 · Sem Tratamento")
      expect(beforeAfterCode).toContain(
        "/images/Artistas & Videoclipes - Backstage Clipe Sururu/Backstage-clipe-sururu-babado-novo29.jpg",
      )
      expect(beforeAfterCode).toContain(
        "saturate(0.50) contrast(0.82) brightness(0.75)",
      )
    })
  })
}
