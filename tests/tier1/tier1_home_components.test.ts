import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, OFFICIAL_SEGMENTS } from "../utils/domain-helpers.ts"
import {
  CANONICAL_HOME_SERVICES,
  CANONICAL_HOME_PROCESS,
  CANONICAL_HOME_STATS,
} from "../utils/site-data.ts"
import { HOME_SERVICE_GROUPS } from "../../data/site.ts"

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

    it("F13.3: Hero video configures poster image and metadata preload for initial paint", () => {
      expect(homeCode).toContain('poster="/images/foto-a-producao-nao-falha.webp"')
      expect(homeCode).toContain('preload="metadata"')
    })

    it("F13.4: Hero section includes gradient overlay (hero-gradient) for high text contrast", () => {
      expect(homeCode).toContain("hero-gradient")
    })

    it("F13.5: Hero section displays official institutional headline and value proposition", () => {
      expect(homeCode).toContain("Imagem não é registro.")
      expect(homeCode).toContain("É posicionamento.")
    })

    it("F13.6: Hero section renders conversion CTAs ('Iniciar projeto' and 'Ver trabalhos')", () => {
      expect(homeCode).toContain("Iniciar projeto")
      expect(homeCode).toContain("Ver trabalhos")
      expect(homeCode).toContain("/diagnostico-visual")
      expect(homeCode).toContain("/portfolio")
    })

    it("F13.7: Hero separates the mobile video and copy while preserving full bleed overlay", () => {
      expect(homeCode).toContain("min-h-screen")
      expect(homeCode).toContain("pb-16 md:pb-24 pt-28")
      expect(homeCode).toContain("max-w-7xl")
    })
  })

  await describe("Feature 14: Grid de Serviços & Capacidades", () => {
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F14.1: Home renders the 3 strategic capability pillars (01 to 03)", () => {
      expect(homeCode).toContain("01. Direção visual")
      expect(homeCode).toContain("02. Fotografia & vídeo")
      expect(homeCode).toContain("03. Pós & entrega")
    })

    it("F14.2: Capability pillars apply responsive 3-column grid layout on md+", () => {
      expect(homeCode).toContain("grid-cols-1 md:grid-cols-3")
    })

    it("F14.3: Service cards feature structured descriptions with clean typography", () => {
      expect(homeCode).toContain("Conceituação de cena, paleta de cor")
      expect(homeCode).toContain("Operação em grandes eventos")
      expect(homeCode).toContain("Tratamento de cor cinematográfico")
    })

    it("F14.4: Home page includes section title and eyebrow for capabilities", () => {
      expect(homeCode).toContain("O que entra no projeto")
    })

    it("F14.5: Authority stats strip renders 4 key metrics (+120 Projetos, 25+ Marcas, 18 Estados, 5+ Anos)", () => {
      expect(homeCode).toContain("+120")
      expect(homeCode).toContain("projetos entregues")
      expect(homeCode).toContain("25+")
      expect(homeCode).toContain("marcas e artistas")
      expect(homeCode).toContain("18")
      expect(homeCode).toContain("estados atendidos")
      expect(homeCode).toContain("5+")
      expect(homeCode).toContain("anos de operação")
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
            "Storymaking (quando previsto no escopo)",
            "Formatos verticais prontos para redes",
          ],
        },
      ])
    })

    it("F14.7: Stats grid is fully responsive across mobile and desktop", () => {
      expect(homeCode).toContain("grid-cols-2 md:grid-cols-4")
    })

    it("F14.8: Stats strip uses high contrast off-white display typography", () => {
      expect(homeCode).toContain("font-head font-extrabold text-4xl sm:text-5xl text-off")
    })

    it("F14.9: Founder section card features responsive layout and link to /sobre", () => {
      expect(homeCode).toContain('to="/sobre"')
      expect(homeCode).toContain("Vinicius Cunha")
      expect(homeCode).toContain("“A produção não falha.”")
    })

    it("F14.10: Founder photo uses lazy loading and async decoding", () => {
      expect(homeCode).toContain("FOUNDER_PHOTO")
      expect(homeCode).toContain('loading="lazy"')
      expect(homeCode).toContain('decoding="async"')
    })

    it("F14.11: Final CTA Section renders direct briefing and WhatsApp action buttons", () => {
      expect(homeCode).toContain("Diagnóstico Visual")
      expect(homeCode).toContain("Conte o projeto.")
      expect(homeCode).toContain("Devolvemos o caminho.")
      expect(homeCode).toContain("/diagnostico-visual")
      expect(homeCode).toContain("wa.me/5522997624631")
    })

    it("F14.12: Reduced motion styling is configured in global CSS", () => {
      const cssCode = readProjectFile("src/index.css")
      expect(cssCode).toContain("prefers-reduced-motion: reduce")
    })

    it("F14.13: Global design tokens and gradients are properly declared", () => {
      const cssCode = readProjectFile("src/index.css")
      expect(cssCode).toContain(".hero-gradient")
      expect(cssCode).toContain(".case-gradient")
      expect(cssCode).toContain(".cta-gradient")
    })
  })

  await describe("Feature 15: Curadoria e Trabalhos Selecionados na Home", () => {
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F15.1: Home page contains the #trabalhos section displaying featured projects", () => {
      expect(homeCode).toContain('id="trabalhos"')
      expect(OFFICIAL_SEGMENTS).toHaveLength(8)
    })

    it("F15.2: Featured cases showcase major brand partnerships and live productions", () => {
      expect(homeCode).toContain("Megabloco Chá da Alice")
      expect(homeCode).toContain("É O Tchan — Clipe Jogadinha")
      expect(homeCode).toContain("Fashion Manners")
      expect(homeCode).toContain("Drinkball")
      expect(homeCode).toContain("Camarote Ondina")
    })

    it("F15.3: Featured case cards link directly to their portfolio case studies", () => {
      expect(homeCode).toContain("/portfolio/carnaval-de-rua-experiencia-publico")
      expect(homeCode).toContain("/portfolio/e-o-tchan-jogadinha")
      expect(homeCode).toContain("/portfolio/fashion-week-passarela-bastidor")
      expect(homeCode).toContain("/portfolio/ativacao-drinkball")
      expect(homeCode).toContain("/portfolio/camarote-ondina-salvador")
    })

    it("F15.4: Featured cases use responsive multi-column image grids with aspect ratio preservation", () => {
      expect(homeCode).toContain("aspect-[16/10]")
      expect(homeCode).toContain("aspect-[4/3]")
    })

    it("F15.5: All featured case images include descriptive alt attributes", () => {
      expect(homeCode).toContain('alt="Megabloco Chá da Alice - Rio de Janeiro"')
      expect(homeCode).toContain('alt="Fashion Manners - Moda e Campanha"')
      expect(homeCode).toContain('alt="Lançamento Drinkball - Ativações & Eventos"')
    })
  })

  await describe("Feature 16: Assinatura do Fundador & Diagnóstico Visual", () => {
    const homeCode = readProjectFile("src/pages/Home.tsx")

    it("F16.1: Sobre section renders founder credentials and scope of operation", () => {
      expect(homeCode).toContain('id="sobre"')
      expect(homeCode).toContain("Fundador e diretor de cena · Rio de Janeiro · operação nacional")
    })

    it("F16.2: Founder quote 'A produção não falha' is prominently highlighted", () => {
      expect(homeCode).toContain("“A produção não falha.”")
    })

    it("F16.3: Founder metrics display validated track record (+120 projetos, 25+ marcas, 5+ anos)", () => {
      expect(homeCode).toContain("+120")
      expect(homeCode).toContain("projetos")
      expect(homeCode).toContain("25+")
      expect(homeCode).toContain("marcas")
      expect(homeCode).toContain("5+")
      expect(homeCode).toContain("anos")
    })

    it("F16.4: Contact CTA integrates background photo with blur and cta-gradient", () => {
      expect(homeCode).toContain('id="contato"')
      expect(homeCode).toContain("cta-gradient")
      expect(homeCode).toContain("LANCAMENTO_DRINKBALL_PHOTOS")
    })

    it("F16.5: Diagnostico Visual action button includes viewTransition enabled", () => {
      expect(homeCode).toContain('to="/diagnostico-visual" viewTransition')
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
        "/images/artistas-videoclipes/backstage-clipe-sururu/Backstage-clipe-sururu-babado-novo29.jpg",
      )
      expect(beforeAfterCode).toContain(
        "saturate(0.50) contrast(0.82) brightness(0.75)",
      )
    })
  })
}
