const LEAD_RECIPIENT = "mayconviniciuscunha@icloud.com"

const REQUIRED_FIELDS = ["nome", "whatsapp", "email"] as const

type Lead = {
  nome: string
  empresa: string
  whatsapp: string
  email: string
  cidade: string
  segmento: string
  tipo: string
  data: string
  uso: string
  objetivo: string
  investimento: string
  mensagem: string
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  })
}

function value(input: unknown, maxLength = 2_000) {
  return typeof input === "string" ? input.trim().slice(0, maxLength) : ""
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }
    return entities[character]
  })
}

function emailHtml(lead: Lead) {
  const fields: [string, string][] = ([
    ["Nome", lead.nome],
    ["Empresa", lead.empresa],
    ["WhatsApp", lead.whatsapp],
    ["E-mail", lead.email],
    ["Cidade", lead.cidade],
    ["Segmento", lead.segmento],
    ["Tipo de projeto", lead.tipo],
    ["Data desejada", lead.data],
    ["Onde será usado", lead.uso],
    ["Objetivo", lead.objetivo],
    ["Faixa de investimento", lead.investimento],
    ["Mensagem", lead.mensagem],
  ] as [string, string][]).filter(([, fieldValue]) => Boolean(fieldValue))

  const rows = fields
    .map(
      ([label, fieldValue]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#52606b;font-weight:600;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#111827;white-space:pre-wrap">${escapeHtml(fieldValue)}</td></tr>`,
    )
    .join("")

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827">
    <main style="max-width:680px;margin:32px auto;background:#ffffff">
      <header style="padding:28px 32px;background:#050A0D;color:#ffffff">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.6px;text-transform:uppercase;color:#A4B8BF">VERSAVISUAL</p>
        <h1 style="margin:0;font-size:26px">Novo diagnóstico visual</h1>
      </header>
      <section style="padding:8px 18px 28px">
        <table style="width:100%;border-collapse:collapse;font-size:15px">${rows}</table>
      </section>
    </main>
  </body>
</html>`
}

function emailText(lead: Lead) {
  return [
    "NOVO DIAGNÓSTICO VISUAL — VERSAVISUAL",
    "",
    `Nome: ${lead.nome}`,
    lead.empresa && `Empresa: ${lead.empresa}`,
    `WhatsApp: ${lead.whatsapp}`,
    `E-mail: ${lead.email}`,
    lead.cidade && `Cidade: ${lead.cidade}`,
    lead.segmento && `Segmento: ${lead.segmento}`,
    lead.tipo && `Tipo de projeto: ${lead.tipo}`,
    lead.data && `Data desejada: ${lead.data}`,
    lead.uso && `Onde será usado: ${lead.uso}`,
    lead.objetivo && `Objetivo: ${lead.objetivo}`,
    lead.investimento && `Faixa de investimento: ${lead.investimento}`,
    lead.mensagem && `Mensagem: ${lead.mensagem}`,
  ]
    .filter(Boolean)
    .join("\n")
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json({ error: "Método não permitido." }, 405)
    }

    const contentLength = Number(request.headers.get("content-length") || 0)
    if (contentLength > 40_000) {
      return json({ error: "Solicitação muito grande." }, 413)
    }

    let input: Record<string, unknown>
    try {
      const parsed = await request.json()
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return json({ error: "Dados inválidos." }, 400)
      }
      input = (parsed as Record<string, unknown>)
    } catch {
      return json({ error: "Dados inválidos." }, 400)
    }

    if (value(input._gotcha)) {
      return json({ ok: true })
    }

    const lead: Lead = {
      nome: value(input.nome, 160),
      empresa: value(input.empresa, 160),
      whatsapp: value(input.whatsapp, 60),
      email: value(input.email, 320),
      cidade: value(input.cidade, 160),
      segmento: value(input.segmento, 160),
      tipo: value(input.tipo, 160),
      data: value(input.data, 80),
      uso: value(input.uso, 500),
      objetivo: value(input.objetivo, 500),
      investimento: value(input.investimento, 160),
      mensagem: value(input.mensagem),
    }

    if (REQUIRED_FIELDS.some((field) => !lead[field])) {
      return json({ error: "Preencha os campos obrigatórios." }, 400)
    }

    const EMAIL_REGEX =
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/
    if (!EMAIL_REGEX.test(lead.email)) {
      return json({ error: "Informe um e-mail válido." }, 400)
    }

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM_EMAIL
    if (!apiKey || !from) {
      console.error("Email service is not configured")
      return json({ error: "Serviço de e-mail indisponível." }, 503)
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [LEAD_RECIPIENT],
        reply_to: lead.email,
        subject: `Novo diagnóstico visual — ${lead.nome}`,
        html: emailHtml(lead),
        text: emailText(lead),
      }),
    })

    if (!response.ok) {
      console.error("Resend could not deliver diagnostic lead", response.status)
      return json({ error: "Não foi possível encaminhar o diagnóstico." }, 502)
    }

    return json({ ok: true })
  },
}
