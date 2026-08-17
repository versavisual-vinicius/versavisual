import { useState } from "react"
import { Link } from "react-router-dom"
import { useSeo, breadcrumb } from "../lib/seo"
import { SEGMENT_NAV, WHATSAPP, WHATSAPP_LABEL } from "../data/site"
import { img, PHOTOS } from "../lib/images"

const PROJECT_TYPES = [
  "Fotografia",
  "Vídeo / Videomaking",
  "Cobertura de evento / ativação",
  "Campanha / editorial",
  "Videoclipe",
  "Ensaio pessoal / lifestyle",
  "Casamento",
  "Ensaio gestante",
  "Institucional / posicionamento",
  "Ainda não sei",
]

const BUDGETS = [
  "Até R$ 1.500",
  "R$ 1.500 – 3.000",
  "R$ 3.000 – 6.000",
  "R$ 6.000 – 10.000",
  "Acima de R$ 10.000",
  "Ainda não sei",
]

function fieldErrorId(name: string) {
  return `${name}-error`
}

const field =
  "w-full rounded-xs border border-line-strong bg-white px-4 py-3 text-ink placeholder:text-navy/40 transition-colors focus:border-teal focus:ring-2 focus:ring-teal/30 focus:outline-none"
const labelCls = "mb-2 block text-sm text-ink font-medium"

interface LeadData {
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
  submittedAt: string
}

export default function Diagnostico() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedLead, setSubmittedLead] = useState<LeadData | null>(null)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  useSeo({
    title: "Diagnóstico Visual Gratuito | VERSAVISUAL",
    description:
      "Conte seu contexto e objetivo. Devolvemos um caminho visual claro e uma proposta sob medida em fotografia, vídeo e direção visual. Sem compromisso.",
    path: "/diagnostico-visual",
    jsonLd: breadcrumb([
      { name: "Início", path: "/" },
      { name: "Diagnóstico Visual", path: "/diagnostico-visual" },
    ]),
  })

  function buildWhatsAppUrl(lead: LeadData): string {
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
    return `${WHATSAPP}?text=${encodeURIComponent(text)}`
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    // Anti-spam honeypot
    const honeypot = String(data.get("_gotcha") ?? "").trim()
    if (honeypot) {
      // Silent ignore for bots
      return
    }

    const required = ["nome", "whatsapp", "email"]
    const next: Record<string, boolean> = {}
    required.forEach((r) => {
      if (!String(data.get(r) ?? "").trim()) next[r] = true
    })

    const emailVal = String(data.get("email") ?? "").trim()
    if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      next.email = true
    }

    setErrors(next)
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0]
      const el = document.getElementById(firstKey)
      el?.focus()
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    const lead: LeadData = {
      nome: String(data.get("nome") ?? "").trim(),
      empresa: String(data.get("empresa") ?? "").trim(),
      whatsapp: String(data.get("whatsapp") ?? "").trim(),
      email: emailVal,
      cidade: String(data.get("cidade") ?? "").trim(),
      segmento: String(data.get("segmento") ?? "").trim(),
      tipo: String(data.get("tipo") ?? "").trim(),
      data: String(data.get("data") ?? "").trim(),
      uso: String(data.get("uso") ?? "").trim(),
      objetivo: String(data.get("objetivo") ?? "").trim(),
      investimento: String(data.get("investimento") ?? "").trim(),
      mensagem: String(data.get("mensagem") ?? "").trim(),
      submittedAt: new Date().toISOString(),
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(lead),
      })
      const responseType = res.headers.get("content-type") || ""
      if (!res.ok || !responseType.includes("application/json")) {
        throw new Error("Erro ao enviar dados para o servidor")
      }

      const result = (await res.json()) as { ok?: boolean }
      if (!result.ok) {
        throw new Error("Erro ao enviar dados para o servidor")
      }

      setSubmittedLead(lead)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      console.error("Erro no envio do formulário:", err)
      setSubmitError(
        "Houve uma instabilidade temporária na transmissão. Você pode tentar novamente ou falar diretamente conosco pelo WhatsApp.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submittedLead) {
    const waLink = buildWhatsAppUrl(submittedLead)

    return (
      <section className="mx-auto flex min-h-[90svh] max-w-[760px] flex-col items-center justify-center px-5 py-32 text-center lg:px-10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-teal-400 bg-teal/10 text-3xl text-teal-400">
          ✓
        </span>
        <h1 className="mt-6 text-4xl leading-tight text-off sm:text-5xl">
          Diagnóstico enviado com sucesso!
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-lg text-mist">
          Recebemos o seu briefing com sucesso. Para acelerar o seu atendimento
          e tirar dúvidas imediatamente, você pode abrir a conversa no WhatsApp
          já com o resumo preenchido:
        </p>

        {/* Resumo do lead */}
        <div className="mt-8 w-full max-w-lg rounded-xl border border-line bg-surface p-6 text-left shadow-sm">
          <p className="u-eyebrow mb-3">Resumo do briefing</p>
          <div className="space-y-1.5 text-sm text-navy">
            <p>
              <strong className="text-ink">Nome:</strong> {submittedLead.nome}{" "}
              {submittedLead.empresa && `(${submittedLead.empresa})`}
            </p>
            <p>
              <strong className="text-ink">WhatsApp:</strong>{" "}
              {submittedLead.whatsapp}
            </p>
            <p>
              <strong className="text-ink">E-mail:</strong>{" "}
              {submittedLead.email}
            </p>
            {submittedLead.segmento && (
              <p>
                <strong className="text-ink">Segmento:</strong>{" "}
                {submittedLead.segmento}
              </p>
            )}
            {submittedLead.tipo && (
              <p>
                <strong className="text-ink">Tipo de projeto:</strong>{" "}
                {submittedLead.tipo}
              </p>
            )}
            {submittedLead.investimento && (
              <p>
                <strong className="text-ink">Investimento:</strong>{" "}
                {submittedLead.investimento}
              </p>
            )}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xs bg-teal px-8 py-3.5 font-medium text-off transition-colors hover:bg-teal-400 flex items-center justify-center gap-2 shadow-md"
          >
            <span>Continuar no WhatsApp com Briefing</span>
            <span aria-hidden>→</span>
          </a>
          <Link
            to="/portfolio"
            viewTransition
            className="flex items-center justify-center rounded-xs border border-off/20 px-7 py-3.5 font-medium text-off transition-colors hover:border-teal"
          >
            Ver portfólio
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setSubmittedLead(null)}
          className="mt-6 text-xs text-mist underline transition-colors hover:text-off"
        >
          Enviar outro diagnóstico
        </button>
      </section>
    )
  }

  return (
    <section className="pt-[72px]">
      <div className="mx-auto grid max-w-[1320px] items-start gap-0 px-0 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Aside */}
        <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] overflow-hidden border-r border-off/10 lg:block">
          <img
            src={img(PHOTOS.professional[0], 1000, 1400)}
            alt="Direção visual VERSAVISUAL"
            width={1000}
            height={1400}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="u-grade absolute inset-0" />
          <div className="relative flex h-full flex-col justify-end p-10 pb-14">
            <p className="u-eyebrow">Diagnóstico Visual</p>
            <p className="mt-4 text-balance text-4xl font-semibold leading-[1.02] text-off">
              Antes da câmera, uma conversa que vale a produção inteira.
            </p>
            <p className="mt-5 max-w-sm text-mist/90">
              O diagnóstico é gratuito e sem compromisso. Quanto mais contexto
              você der, mais preciso será o caminho visual que devolvemos.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-mist/90">
              {[
                "Leitura do seu objetivo de comunicação",
                "Recomendação de formato e linguagem",
                "Proposta por faixa de investimento",
              ].map((li) => (
                <li key={li} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"
                  />
                  {li}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Form */}
        <div className="bg-off/94 px-5 py-10 shadow-2xl backdrop-blur-md lg:min-h-[calc(100vh-72px)] lg:px-12 lg:py-14">
          <div>
            <p className="u-eyebrow">Diagnóstico Visual Gratuito</p>
            <h1 className="mb-8 mt-3 text-3xl leading-tight sm:text-4xl text-ink">
              Conte seu contexto. Devolvemos um caminho visual.
            </h1>
          </div>

          {submitError && (
            <div
              className="mb-6 rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800"
              role="status"
              aria-live="polite"
            >
              <p className="font-medium">Falha no envio</p>
              <p className="mt-1">{submitError}</p>
            </div>
          )}

          <div className="sr-only" role="status" aria-live="polite">
            {isSubmitting
              ? "Enviando diagnóstico."
              : submitError
                ? "Falha no envio do diagnóstico."
                : Object.keys(errors).length > 0
                  ? "Revise os campos obrigatórios destacados."
                  : ""}
          </div>

          <form onSubmit={onSubmit} noValidate className="grid gap-6">
            {/* Honeypot field for anti-spam */}
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className={labelCls}>
                  Nome <span className="text-navy">*</span>
                </label>
                <input
                  id="nome"
                  name="nome"
                  required
                  autoComplete="name"
                  className={`${field} ${
                    errors.nome
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                      : ""
                  }`}
                  placeholder="Seu nome"
                  aria-invalid={errors.nome || undefined}
                  aria-describedby={
                    errors.nome ? fieldErrorId("nome") : undefined
                  }
                />
                {errors.nome && (
                  <p
                    id={fieldErrorId("nome")}
                    className="mt-1.5 text-xs font-medium text-rose-600"
                  >
                    Informe seu nome.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="empresa" className={labelCls}>
                  Empresa / Projeto
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  autoComplete="organization"
                  className={field}
                  placeholder="Marca, projeto ou artista"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="whatsapp" className={labelCls}>
                  WhatsApp <span className="text-navy">*</span>
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  className={`${field} ${
                    errors.whatsapp
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                      : ""
                  }`}
                  placeholder="(00) 00000-0000"
                  aria-invalid={errors.whatsapp || undefined}
                  aria-describedby={
                    errors.whatsapp ? fieldErrorId("whatsapp") : undefined
                  }
                />
                {errors.whatsapp && (
                  <p
                    id={fieldErrorId("whatsapp")}
                    className="mt-1.5 text-xs font-medium text-rose-600"
                  >
                    Informe um WhatsApp para contato.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  E-mail <span className="text-navy">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`${field} ${
                    errors.email
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                      : ""
                  }`}
                  placeholder="voce@email.com"
                  aria-invalid={errors.email || undefined}
                  aria-describedby={
                    errors.email ? fieldErrorId("email") : undefined
                  }
                />
                {errors.email && (
                  <p
                    id={fieldErrorId("email")}
                    className="mt-1.5 text-xs font-medium text-rose-600"
                  >
                    Informe um e-mail válido.
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="cidade" className={labelCls}>
                  Cidade
                </label>
                <input
                  id="cidade"
                  name="cidade"
                  autoComplete="address-level2"
                  className={field}
                  placeholder="Cidade / Estado"
                />
              </div>
              <div>
                <label htmlFor="segmento" className={labelCls}>
                  Segmento
                </label>
                <select
                  id="segmento"
                  name="segmento"
                  className={field}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione um segmento
                  </option>
                  {SEGMENT_NAV.map((s) => (
                    <option key={s.to} value={s.label}>
                      {s.label}
                    </option>
                  ))}
                  <option value="Outro / não sei">Outro / não sei</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="tipo" className={labelCls}>
                  Tipo de projeto
                </label>
                <select id="tipo" name="tipo" className={field} defaultValue="">
                  <option value="" disabled>
                    Selecione o tipo
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="data" className={labelCls}>
                  Data desejada
                </label>
                <input id="data" name="data" type="date" className={field} />
              </div>
            </div>

            <div>
              <label htmlFor="uso" className={labelCls}>
                Onde o conteúdo será usado?
              </label>
              <input
                id="uso"
                name="uso"
                className={field}
                placeholder="Instagram, site, mídia paga, OTAs, impressão…"
              />
            </div>

            <div>
              <label htmlFor="objetivo" className={labelCls}>
                Qual o principal objetivo?
              </label>
              <input
                id="objetivo"
                name="objetivo"
                className={field}
                placeholder="Vender, posicionar, registrar, lançar…"
              />
            </div>

            <fieldset>
              <legend className={labelCls}>
                Faixa de investimento estimada
              </legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {BUDGETS.map((b, index) => (
                  <label
                    key={b}
                    htmlFor={`investimento-${index}`}
                    className="flex cursor-pointer items-center gap-3 rounded-xs border border-line-strong bg-white px-4 py-3 text-sm text-navy transition-colors hover:border-teal/60 has-[:checked]:border-teal has-[:checked]:text-ink"
                  >
                    <input
                      id={`investimento-${index}`}
                      type="radio"
                      name="investimento"
                      value={b}
                      className="accent-teal-400"
                    />
                    {b}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="mensagem" className={labelCls}>
                Mensagem adicional
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={4}
                className={`${field} resize-none`}
                placeholder="Conte mais sobre o seu projeto, referências e expectativas."
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xs bg-teal px-8 py-3.5 font-medium text-off transition-colors hover:bg-teal-400 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-off border-t-transparent" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  "Enviar diagnóstico"
                )}
              </button>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-navy transition-colors hover:text-teal"
              >
                Prefere falar direto? Chame no WhatsApp · {WHATSAPP_LABEL} →
              </a>
            </div>
            <p className="text-xs text-navy/60">
              Ao enviar, você concorda em ser contatado pela VERSAVISUAL sobre
              este diagnóstico.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
