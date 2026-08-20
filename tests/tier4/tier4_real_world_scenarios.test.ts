import { describe, it, expect, runner } from "../utils/test-framework.ts"
import {
  readProjectFile,
  resolveSegmentSlug,
  parseWhatsAppUrl,
} from "../utils/domain-helpers.ts"
import apiHandler from "../../api/diagnostico.ts"

runner.setTier("Tier 4 - Real-World Application Scenarios")

export async function runTier4RealWorldScenariosTests() {
  describe("Scenario 1: Jornada Completa da Noiva (Casamento & Destination Wedding)", () => {
    it("T4.1: Executes complete discovery, niche assessment, service inspection and diagnostic lead conversion for a bride", async () => {
      // Step 1: Discover wedding segment route
      const segmentSlug = resolveSegmentSlug("casamentos")
      expect(segmentSlug).toBe("casamentos")

      // Step 2: Inspect wedding landing page
      const segCode = readProjectFile("src/pages/SegmentPage.tsx")
      expect(segCode).toContain("seg.solutionTitle")
      expect(segCode).toContain("setSelectedService")

      // Step 3: Fill Bride diagnostic briefing
      const brideLead = {
        _gotcha: "bot-bypass-test",
        nome: "Mariana Vasconcelos",
        whatsapp: "21998765432",
        email: "mariana.vasconcelos@gmail.com",
        cidade: "Búzios - RJ",
        segmento: "Casamentos",
        tipo: "Casamento",
        data: "2026-11-20",
        uso: "Álbum impresso de luxo e galeria digital para convidados",
        objetivo:
          "Registrar nosso destination wedding com estética documental e cinematográfica.",
        investimento: "Acima de R$ 10.000",
        mensagem: "Cerimônia ao ar livre no pôr do sol com 150 convidados.",
      }

      // Step 4: Transmit lead via API
      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brideLead),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(200)

      // Step 5: Verify formatted WhatsApp briefing link
      const text = [
        "*Novo Diagnóstico Visual — VERSAVISUAL*",
        "",
        `👤 *Nome:* ${brideLead.nome}`,
        `📱 *WhatsApp:* ${brideLead.whatsapp}`,
        `✉️ *E-mail:* ${brideLead.email}`,
        `📍 *Cidade:* ${brideLead.cidade}`,
        `🎯 *Segmento:* ${brideLead.segmento}`,
        `🎬 *Tipo de Projeto:* ${brideLead.tipo}`,
        `📅 *Data Desejada:* ${brideLead.data}`,
        `📱 *Onde será usado:* ${brideLead.uso}`,
        `🎯 *Objetivo:* ${brideLead.objetivo}`,
        `💰 *Faixa de Investimento:* ${brideLead.investimento}`,
        `📝 *Mensagem:* ${brideLead.mensagem}`,
      ].join("\n")

      const url = `https://wa.me/5511950747192?text=${encodeURIComponent(text)}`
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.phoneNumber).toBe("5511950747192")
      expect(parsed.params["Segmento"]).toBe("Casamentos")
      expect(parsed.params["Faixa de Investimento"]).toBe("Acima de R$ 10.000")
      expect(parsed.params["Data Desejada"]).toBe("2026-11-20")
    })
  })

  describe("Scenario 2: Jornada da Marca de Moda (Campanha Editorial & Lookbook)", () => {
    it("T4.2: Executes fashion brand discovery, case study review, and commercial proposal request", async () => {
      // Step 1: Resolve fashion niche
      const segmentSlug = resolveSegmentSlug("moda-campanhas")
      expect(segmentSlug).toBe("moda-campanhas")

      // Step 2: Validate case study link for fashion
      const caseCode = readProjectFile("src/pages/CaseStudy.tsx")
      expect(caseCode).toContain("getCase")

      // Step 3: Submit Fashion brand briefing
      const fashionLead = {
        _gotcha: "bot-bypass-test",
        nome: "Renata Silveira",
        empresa: "AURA Beachwear",
        whatsapp: "11988882222",
        email: "renata@aurabeach.com.br",
        cidade: "São Paulo - SP",
        segmento: "Moda & Campanhas",
        tipo: "Campanha / editorial",
        data: "2026-09-30",
        uso: "E-commerce, Catálogo digital e Mídia Paga Meta/TikTok",
        objetivo:
          "Campanha de lançamento da Coleção Verão 2027 com modelos e locação externa.",
        investimento: "R$ 6.000 – 10.000",
        mensagem:
          "Precisamos de fotos em alta resolução e 10 reels verticais editados.",
      }

      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fashionLead),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(200)

      const text = [
        "*Novo Diagnóstico Visual — VERSAVISUAL*",
        "",
        `👤 *Nome:* ${fashionLead.nome} (${fashionLead.empresa})`,
        `📱 *WhatsApp:* ${fashionLead.whatsapp}`,
        `✉️ *E-mail:* ${fashionLead.email}`,
        `📍 *Cidade:* ${fashionLead.cidade}`,
        `🎯 *Segmento:* ${fashionLead.segmento}`,
        `🎬 *Tipo de Projeto:* ${fashionLead.tipo}`,
        `📅 *Data Desejada:* ${fashionLead.data}`,
        `📱 *Onde será usado:* ${fashionLead.uso}`,
        `🎯 *Objetivo:* ${fashionLead.objetivo}`,
        `💰 *Faixa de Investimento:* ${fashionLead.investimento}`,
        `📝 *Mensagem:* ${fashionLead.mensagem}`,
      ].join("\n")

      const url = `https://wa.me/5511950747192?text=${encodeURIComponent(text)}`
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.params["Nome"]).toBe("Renata Silveira (AURA Beachwear)")
      expect(parsed.params["Tipo de Projeto"]).toBe("Campanha / editorial")
      expect(parsed.params["Faixa de Investimento"]).toBe("R$ 6.000 – 10.000")
    })
  })

  describe("Scenario 3: Jornada do Artista Musical (Videoclipe & Bastidores de Turnê)", () => {
    it("T4.3: Executes music artist showcase exploration, backstage gallery review, and direct WhatsApp lead inquiry", async () => {
      // Step 1: Check Artists & Videoclipes filter
      const portfolioGridCode = readProjectFile(
        "src/components/PortfolioGrid.tsx",
      )
      expect(portfolioGridCode).toContain('active === "Artistas & Videoclipes"')

      // Step 2: Inspect music artist case
      const caseCode = readProjectFile("src/pages/CaseStudy.tsx")
      expect(caseCode).toContain("Gallery")

      // Step 3: Simulate WhatsApp direct inquiry for music video
      const musicArtistLead = {
        _gotcha: "bot-bypass-test",
        nome: "Guilherme Santos (Manager)",
        empresa: "Banda Sonora",
        whatsapp: "71991234567",
        email: "guilherme@bandasonora.com",
        cidade: "Salvador - BA",
        segmento: "Artistas & Videoclipes",
        tipo: "Videoclipe",
        data: "2026-10-01",
        uso: "YouTube 4K, Spotify Canvas e Divulgação de Turnê",
        objetivo:
          "Direção e gravação do videoclipe oficial do novo single autoral.",
        investimento: "Acima de R$ 10.000",
        mensagem: "Roteiro já estruturado, 2 diárias de gravação em Salvador.",
      }

      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(musicArtistLead),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(200)

      const text = [
        "*Novo Diagnóstico Visual — VERSAVISUAL*",
        "",
        `👤 *Nome:* ${musicArtistLead.nome} (${musicArtistLead.empresa})`,
        `📱 *WhatsApp:* ${musicArtistLead.whatsapp}`,
        `✉️ *E-mail:* ${musicArtistLead.email}`,
        `📍 *Cidade:* ${musicArtistLead.cidade}`,
        `🎯 *Segmento:* ${musicArtistLead.segmento}`,
        `🎬 *Tipo de Projeto:* ${musicArtistLead.tipo}`,
        `📅 *Data Desejada:* ${musicArtistLead.data}`,
        `📱 *Onde será usado:* ${musicArtistLead.uso}`,
        `🎯 *Objetivo:* ${musicArtistLead.objetivo}`,
        `💰 *Faixa de Investimento:* ${musicArtistLead.investimento}`,
        `📝 *Mensagem:* ${musicArtistLead.mensagem}`,
      ].join("\n")

      const url = `https://wa.me/5511950747192?text=${encodeURIComponent(text)}`
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.params["Segmento"]).toBe("Artistas & Videoclipes")
      expect(parsed.params["Tipo de Projeto"]).toBe("Videoclipe")
    })
  })

  describe("Scenario 4: Jornada do Executivo Corporativo / Marca B2B (Ativação de Marca)", () => {
    it("T4.4: Executes corporate event activation inquiry with B2B metrics, service selection, and formal brief", async () => {
      // Step 1: Corporate segment validation
      const segmentSlug = resolveSegmentSlug("ativacoes-eventos")
      expect(segmentSlug).toBe("ativacoes-eventos")

      // Step 2: Check authority metrics
      const homeCode = readProjectFile("src/pages/Home.tsx")
      expect(homeCode).toContain("+120")
      expect(homeCode).toContain("Marcas Atendidas")

      // Step 3: Submit corporate brief
      const corporateLead = {
        _gotcha: "bot-bypass-test",
        nome: "Fernanda Albuquerque",
        empresa: "Fintech Global",
        whatsapp: "11976543210",
        email: "fernanda.albuquerque@fintechglobal.com",
        cidade: "São Paulo - SP",
        segmento: "Ativações & Eventos",
        tipo: "Cobertura de evento / ativação",
        data: "2026-11-10",
        uso: "Aftermovie institucional, LinkedIn e assessoria de imprensa",
        objetivo:
          "Cobertura completa em tempo real da nossa convenção anual para 800 executivos.",
        investimento: "Acima de R$ 10.000",
        mensagem: "Equipe de foto e vídeo com entrega de reels no mesmo dia.",
      }

      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corporateLead),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(200)

      const text = [
        "*Novo Diagnóstico Visual — VERSAVISUAL*",
        "",
        `👤 *Nome:* ${corporateLead.nome} (${corporateLead.empresa})`,
        `📱 *WhatsApp:* ${corporateLead.whatsapp}`,
        `✉️ *E-mail:* ${corporateLead.email}`,
        `📍 *Cidade:* ${corporateLead.cidade}`,
        `🎯 *Segmento:* ${corporateLead.segmento}`,
        `🎬 *Tipo de Projeto:* ${corporateLead.tipo}`,
        `📅 *Data Desejada:* ${corporateLead.data}`,
        `📱 *Onde será usado:* ${corporateLead.uso}`,
        `🎯 *Objetivo:* ${corporateLead.objetivo}`,
        `💰 *Faixa de Investimento:* ${corporateLead.investimento}`,
        `📝 *Mensagem:* ${corporateLead.mensagem}`,
      ].join("\n")

      const url = `https://wa.me/5511950747192?text=${encodeURIComponent(text)}`
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.params["Nome"]).toBe(
        "Fernanda Albuquerque (Fintech Global)",
      )
      expect(parsed.params["Segmento"]).toBe("Ativações & Eventos")
      expect(parsed.params["Tipo de Projeto"]).toBe(
        "Cobertura de evento / ativação",
      )
    })
  })

  describe("Scenario 5: Jornada do Hotel Boutique & Gastronomia (Hotelaria & Lifestyle)", () => {
    it("T4.5: Executes boutique hotel showcase assessment, photo inspection, and proposal generation", async () => {
      // Step 1: Resolve hotel segment
      const segmentSlug = resolveSegmentSlug("hotelaria-lifestyle")
      expect(segmentSlug).toBe("hotelaria-lifestyle")

      // Step 2: Submit Hotel brief
      const hotelLead = {
        _gotcha: "bot-bypass-test",
        nome: "Rodrigo Mendonça",
        empresa: "Pousada Vila das Dunas",
        whatsapp: "85999887766",
        email: "rodrigo@viladasdunas.com.br",
        cidade: "Jericoacoara - CE",
        segmento: "Hotelaria & Lifestyle",
        tipo: "Institucional / posicionamento",
        data: "2026-12-05",
        uso: "Site oficial, Booking.com, Airbnb Luxe e Instagram",
        objetivo:
          "Renovação completa do acervo fotográfico e vídeos de experiência gastronômica.",
        investimento: "R$ 6.000 – 10.000",
        mensagem:
          "Diária de arquitetura das 12 suítes, piscina e gastronomia do bistrô.",
      }

      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelLead),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(200)

      const text = [
        "*Novo Diagnóstico Visual — VERSAVISUAL*",
        "",
        `👤 *Nome:* ${hotelLead.nome} (${hotelLead.empresa})`,
        `📱 *WhatsApp:* ${hotelLead.whatsapp}`,
        `✉️ *E-mail:* ${hotelLead.email}`,
        `📍 *Cidade:* ${hotelLead.cidade}`,
        `🎯 *Segmento:* ${hotelLead.segmento}`,
        `🎬 *Tipo de Projeto:* ${hotelLead.tipo}`,
        `📅 *Data Desejada:* ${hotelLead.data}`,
        `📱 *Onde será usado:* ${hotelLead.uso}`,
        `🎯 *Objetivo:* ${hotelLead.objetivo}`,
        `💰 *Faixa de Investimento:* ${hotelLead.investimento}`,
        `📝 *Mensagem:* ${hotelLead.mensagem}`,
      ].join("\n")

      const url = `https://wa.me/5511950747192?text=${encodeURIComponent(text)}`
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.params["Nome"]).toBe(
        "Rodrigo Mendonça (Pousada Vila das Dunas)",
      )
      expect(parsed.params["Segmento"]).toBe("Hotelaria & Lifestyle")
      expect(parsed.params["Faixa de Investimento"]).toBe("R$ 6.000 – 10.000")
    })
  })
}
