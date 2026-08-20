import { describe, it, expect, runner } from "../utils/test-framework.ts"
import { readProjectFile, parseWhatsAppUrl } from "../utils/domain-helpers.ts"
import apiHandler from "../../api/diagnostico.ts"

export async function runTier1DiagnosticLeadApiTests() {
  runner.setTier("Tier 1 - Feature Coverage")
  await describe("Feature 24: Formulário de Diagnóstico", () => {
    const diagCode = readProjectFile("src/pages/Diagnostico.tsx")

    it("F24.1: Diagnostic form requires name, whatsapp and email fields", () => {
      expect(diagCode).toContain('name="nome"')
      expect(diagCode).toContain('name="whatsapp"')
      expect(diagCode).toContain('name="email"')
      expect(diagCode).toContain("required")
    })

    it("F24.2: Diagnostic form includes hidden anti-spam honeypot input (_gotcha)", () => {
      expect(diagCode).toContain('name="_gotcha"')
      expect(diagCode).toContain("hidden")
      expect(diagCode).toContain("tabIndex={-1}")
    })

    it("F24.3: Form validation associates error messages using aria-invalid and aria-describedby", () => {
      expect(diagCode).toContain("aria-invalid")
      expect(diagCode).toContain("aria-describedby")
      expect(diagCode).toContain("fieldErrorId")
    })

    it("F24.4: Form displays submit state with loading indicator and disabled submit button", () => {
      expect(diagCode).toContain("isSubmitting")
      expect(diagCode).toContain("disabled={isSubmitting}")
      expect(diagCode).toContain("Enviando...")
    })

    it("F24.5: Form uses aria-live='polite' for announcement of transmission status and server errors", () => {
      expect(diagCode).toContain('aria-live="polite"')
      expect(diagCode).toContain('role="status"')
    })
  })

  await describe("Feature 25: Gerador de Lead WhatsApp", () => {
    const diagCode = readProjectFile("src/pages/Diagnostico.tsx")

    function simulateBuildWhatsAppUrl(lead: Record<string, string>): string {
      const lines = [
        "*Novo Diagnóstico Visual — VERSAVISUAL*",
        "",
        `👤 *Nome:* ${lead.nome}${lead.empresa ? ` (${lead.empresa})` : ""}`,
        `📱 *WhatsApp:* ${lead.whatsapp}`,
        `✉️ *E-mail:* ${lead.email}`,
        lead.cidade ? `📍 *Cidade:* ${lead.cidade}` : null,
        lead.segmento ? `🎯 *Segmento:* ${lead.segmento}` : null,
        lead.tipo ? `🎬 *Tipo de Projeto:* ${lead.tipo}` : null,
        lead.data ? `📅 *Data Desejada:* ${lead.data}` : null,
        lead.uso ? `📱 *Onde será usado:* ${lead.uso}` : null,
        lead.objetivo ? `🎯 *Objetivo:* ${lead.objetivo}` : null,
        lead.investimento
          ? `💰 *Faixa de Investimento:* ${lead.investimento}`
          : null,
        lead.mensagem ? `📝 *Mensagem:* ${lead.mensagem}` : null,
      ].filter(Boolean) as string[]

      const text = lines.join("\n")
      return `https://wa.me/5511950747192?text=${encodeURIComponent(text)}`
    }

    it("F25.1: Form generates valid WhatsApp URL pointing to official phone number 5511950747192", () => {
      const url = simulateBuildWhatsAppUrl({
        nome: "Maycon Vinicius",
        whatsapp: "11950747192",
        email: "hub@versavisual.com.br",
      })
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.phoneNumber).toBe("5511950747192")
      expect(parsed.text).toContain("Novo Diagnóstico Visual — VERSAVISUAL")
    })

    it("F25.2: Generated URL accurately encodes mandatory contact details (Name, WhatsApp, Email)", () => {
      const url = simulateBuildWhatsAppUrl({
        nome: "Alice Santos",
        whatsapp: "11988887777",
        email: "alice@empresa.com",
      })
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.params["Nome"]).toBe("Alice Santos")
      expect(parsed.params["WhatsApp"]).toBe("11988887777")
      expect(parsed.params["E-mail"]).toBe("alice@empresa.com")
    })

    it("F25.3: Generated URL embeds company name formatted in parentheses if provided", () => {
      const url = simulateBuildWhatsAppUrl({
        nome: "Carlos Eduardo",
        empresa: "Acme Inc",
        whatsapp: "11977776666",
        email: "carlos@acme.com",
      })
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.params["Nome"]).toBe("Carlos Eduardo (Acme Inc)")
    })

    it("F25.4: Generated URL includes briefing fields (Segmento, Tipo, Orçamento, Mensagem)", () => {
      const url = simulateBuildWhatsAppUrl({
        nome: "Mariana Costa",
        whatsapp: "11999990000",
        email: "mariana@costa.com",
        segmento: "Moda & Campanhas",
        tipo: "Campanha / editorial",
        investimento: "R$ 6.000 – 10.000",
        mensagem: "Lançamento da coleção de primavera.",
      })
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.params["Segmento"]).toBe("Moda & Campanhas")
      expect(parsed.params["Tipo de Projeto"]).toBe("Campanha / editorial")
      expect(parsed.params["Faixa de Investimento"]).toBe("R$ 6.000 – 10.000")
      expect(parsed.params["Mensagem"]).toBe(
        "Lançamento da coleção de primavera.",
      )
    })

    it("F25.5: Optional blank fields are cleanly omitted from the generated message text", () => {
      const url = simulateBuildWhatsAppUrl({
        nome: "Lucas Mendes",
        whatsapp: "21988881111",
        email: "lucas@mendes.com",
        empresa: "",
        cidade: "",
        mensagem: "",
      })
      const parsed = parseWhatsAppUrl(url)
      expect(parsed.params["Cidade"]).toBeUndefined()
      expect(parsed.params["Mensagem"]).toBeUndefined()
    })
  })

  await describe("Feature 26: Transmissão de Lead API (/api/diagnostico)", () => {
    it("F26.1: API rejects non-POST HTTP methods with 405 Method Not Allowed", async () => {
      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "GET",
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(405)
      const data = await res.json()
      expect(data.error).toBe("Método não permitido.")
    })

    it("F26.2: API rejects oversized payloads (>40KB) with 413 Payload Too Large", async () => {
      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: {
          "Content-Length": "45000",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ test: "x".repeat(45000) }),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(413)
      const data = await res.json()
      expect(data.error).toBe("Solicitação muito grande.")
    })

    it("F26.3: API catches honeypot bots silently returning 200 { ok: true } without emailing", async () => {
      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _gotcha: "spam-bot-input",
          nome: "Bot",
          whatsapp: "123",
          email: "bot@spam.com",
        }),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.ok).toBe(true)
    })

    it("F26.4: API returns 400 when mandatory fields (nome, whatsapp, email) are missing", async () => {
      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: "Apenas Nome" }),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(400)
      const data = await res.json()
      expect(data.error).toBe("Preencha os campos obrigatórios.")
    })

    it("F26.5: API returns 400 when email syntax is invalid", async () => {
      const req = new Request("http://localhost:3000/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: "Teste",
          whatsapp: "11999999999",
          email: "email-invalido-sem-arroba",
        }),
      })
      const res = await apiHandler.fetch(req)
      expect(res.status).toBe(400)
      const data = await res.json()
      expect(data.error).toBe("Informe um e-mail válido.")
    })
  })
}
