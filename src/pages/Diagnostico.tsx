import { useState } from "react";
import { useSeo, SITE_URL, breadcrumb } from "../lib/seo";
import { SEGMENT_NAV, WHATSAPP, WHATSAPP_LABEL } from "../data/site";
import { img, PHOTOS } from "../lib/images";

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
];

const BUDGETS = [
  "Até R$ 1.500",
  "R$ 1.500 – 3.000",
  "R$ 3.000 – 6.000",
  "R$ 6.000 – 10.000",
  "Acima de R$ 10.000",
  "Ainda não sei",
];

const field =
  "w-full rounded-xs border border-line-strong bg-white px-4 py-3 text-ink placeholder:text-navy/40 transition-colors focus:border-teal focus:outline-none";
const labelCls = "mb-2 block text-sm text-ink";

export default function Diagnostico() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useSeo({
    title: "Diagnóstico Visual Gratuito | VERSAVISUAL",
    description:
      "Conte seu contexto e objetivo. Devolvemos um caminho visual claro e uma proposta sob medida em fotografia, vídeo e direção visual. Sem compromisso.",
    path: "/diagnostico-visual",
    jsonLd: breadcrumb([
      { name: "Início", path: "/" },
      { name: "Diagnóstico Visual", path: "/diagnostico-visual" },
    ]),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const required = ["nome", "whatsapp", "email"];
    const next: Record<string, boolean> = {};
    required.forEach((r) => {
      if (!String(data.get(r) ?? "").trim()) next[r] = true;
    });
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (sent) {
    return (
      <section className="mx-auto flex min-h-[90svh] max-w-[720px] flex-col items-center justify-center px-5 py-32 text-center lg:px-10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-teal-400 text-3xl text-teal-400">
          ✓
        </span>
        <h1 className="mt-6 text-4xl leading-tight sm:text-5xl">Diagnóstico recebido.</h1>
        <p className="mt-5 text-pretty text-navy">
          Obrigado. Vamos analisar o seu contexto e retornar com um caminho visual e uma proposta
          sob medida. Para agilizar, você também pode falar agora mesmo no WhatsApp.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xs bg-teal px-7 py-3.5 font-medium text-ink transition-colors hover:bg-teal-400"
          >
            Falar no WhatsApp · {WHATSAPP_LABEL}
          </a>
          <a
            href="/portfolio"
            className="rounded-xs border border-line-strong px-7 py-3.5 font-medium text-ink transition-colors hover:border-teal"
          >
            Ver portfólio
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[72px]">
      <div className="mx-auto grid max-w-[1320px] gap-0 px-0 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Aside */}
        <aside className="relative hidden overflow-hidden border-r border-line lg:block">
          <img
            src={img(PHOTOS.professional[0], 1000, 1400)}
            alt="Direção visual VERSAVISUAL"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="u-grade absolute inset-0" />
          <div className="relative flex h-full flex-col justify-end p-10">
            <p className="u-eyebrow">Diagnóstico Visual</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.02]">
              Antes da câmera, uma conversa que vale a produção inteira.
            </h1>
            <p className="mt-5 max-w-sm text-mist/90">
              O diagnóstico é gratuito e sem compromisso. Quanto mais contexto você der, mais
              preciso será o caminho visual que devolvemos.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-mist/90">
              {["Leitura do seu objetivo de comunicação", "Recomendação de formato e linguagem", "Proposta por faixa de investimento"].map(
                (li) => (
                  <li key={li} className="flex gap-3">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                    {li}
                  </li>
                ),
              )}
            </ul>
          </div>
        </aside>

        {/* Form */}
        <div className="px-5 py-14 lg:px-12 lg:py-20">
          <div className="lg:hidden">
            <p className="u-eyebrow">Diagnóstico Visual</p>
            <h1 className="mb-8 mt-3 text-3xl leading-tight sm:text-4xl">
              Conte seu contexto. Devolvemos um caminho visual.
            </h1>
          </div>

          <form onSubmit={onSubmit} noValidate className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className={labelCls}>
                  Nome <span className="text-teal-400">*</span>
                </label>
                <input id="nome" name="nome" className={field} placeholder="Seu nome" />
                {errors.nome && <p className="mt-1.5 text-xs text-teal-400">Informe seu nome.</p>}
              </div>
              <div>
                <label htmlFor="empresa" className={labelCls}>
                  Empresa / Projeto
                </label>
                <input id="empresa" name="empresa" className={field} placeholder="Marca, projeto ou artista" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="whatsapp" className={labelCls}>
                  WhatsApp <span className="text-teal-400">*</span>
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  inputMode="tel"
                  className={field}
                  placeholder="(00) 00000-0000"
                />
                {errors.whatsapp && (
                  <p className="mt-1.5 text-xs text-teal-400">Informe um WhatsApp para contato.</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  E-mail <span className="text-teal-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={field}
                  placeholder="voce@email.com"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-teal-400">Informe um e-mail válido.</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="cidade" className={labelCls}>
                  Cidade
                </label>
                <input id="cidade" name="cidade" className={field} placeholder="Cidade / Estado" />
              </div>
              <div>
                <label htmlFor="segmento" className={labelCls}>
                  Segmento
                </label>
                <select id="segmento" name="segmento" className={field} defaultValue="">
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
              <legend className={labelCls}>Faixa de investimento</legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {BUDGETS.map((b) => (
                  <label
                    key={b}
                    className="flex cursor-pointer items-center gap-3 rounded-xs border border-line-strong bg-white px-4 py-3 text-sm text-navy transition-colors hover:border-teal/60 has-[:checked]:border-teal has-[:checked]:text-ink"
                  >
                    <input type="radio" name="investimento" value={b} className="accent-teal-400" />
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
                className="rounded-xs bg-teal px-8 py-3.5 font-medium text-ink transition-colors hover:bg-teal-400"
              >
                Enviar diagnóstico
              </button>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-navy transition-colors hover:text-teal"
              >
                Prefere falar direto? Chame no WhatsApp →
              </a>
            </div>
            <p className="text-xs text-navy/60">
              Ao enviar, você concorda em ser contatado pela VERSAVISUAL sobre este diagnóstico.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
