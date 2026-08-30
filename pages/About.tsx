import { Link } from "react-router-dom"
import { ArrowUpRight, Camera, Film, Cpu, Sparkles, Sliders, CheckCircle2, ChevronRight } from "lucide-react"
import { FOUNDER_DATA } from "../data/site"
import { img } from "../lib/images"
import { useSeo, breadcrumb, SITE_URL } from "../lib/seo"
import CTASection from "../components/CTASection"

export default function About() {
  useSeo({
    title: "Sobre Vinicius Cunha — Fundador & Diretor Criativo | VERSAVISUAL",
    description:
      "Conheça Vinicius Cunha, fundador e diretor criativo da VERSAVISUAL. Trajetória híbrida entre direção cinematográfica, fotografia autoral Nikon/ACEScc e tecnologia criativa.",
    path: "/sobre",
    jsonLd: [
      breadcrumb([
        { name: "Início", path: "/" },
        { name: "Sobre", path: "/sobre" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/sobre#profile`,
        mainEntity: {
          "@type": "Person",
          name: FOUNDER_DATA.name,
          jobTitle: FOUNDER_DATA.title,
          description: FOUNDER_DATA.bioShort,
          image: `${SITE_URL}${FOUNDER_DATA.photo}`,
          worksFor: {
            "@type": "Organization",
            name: "VERSAVISUAL",
            url: SITE_URL,
          },
        },
      },
    ],
  })

  return (
    <>
      {/* ── HERO & BREADCRUMB ─────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-off/10 bg-ink pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.1),transparent_65%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-mist">
            <Link to="/" viewTransition className="hover:text-off transition-colors">
              Início
            </Link>
            <ChevronRight className="size-3.5 text-mist/60" />
            <span className="text-teal-400">Sobre o Fundador</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-teal-400 animate-pulse" />
              <p className="u-eyebrow text-teal-400">Dossier Autoral · Direção Geral</p>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-off sm:text-5xl lg:text-[4rem] leading-[1.08]">
              A mente criativa e técnica por trás da VERSAVISUAL.
            </h1>
            <p className="mt-5 text-pretty text-base text-mist sm:text-lg lg:text-xl leading-relaxed">
              Fotografia de precisão, direção cinematográfica e arquitetura de tecnologia unidas para criar experiências visuais que posicionam marcas e artistas no topo.
            </p>
          </div>
        </div>
      </section>

      {/* ── DOSSIER PRINCIPAL / SPLIT VIEW ────────────────── */}
      <section className="mx-auto max-w-[1320px] px-5 py-14 sm:py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Portrait & Live Specs */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="group relative aspect-[4/5] w-full overflow-hidden border border-off/15 bg-navy shadow-2xl">
                <img
                  src={img(FOUNDER_DATA.photo, 900, 1125)}
                  alt={`${FOUNDER_DATA.name} — ${FOUNDER_DATA.title} VERSAVISUAL`}
                  width={900}
                  height={1125}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover grayscale contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90" />

                {/* Badges */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded border border-off/20 bg-ink/85 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-widest text-off backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-teal-400" />
                  Dossier Oficial
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-400">
                    {FOUNDER_DATA.title}
                  </span>
                  <h2 className="mt-1 text-2xl font-semibold text-off sm:text-3xl">
                    {FOUNDER_DATA.name}
                  </h2>
                  <p className="mt-1 text-xs text-mist font-mono">
                    {FOUNDER_DATA.location}
                  </p>
                </div>
              </div>

              {/* Quick Specs Box */}
              <div className="border border-off/10 bg-navy/30 p-5 backdrop-blur-sm">
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-teal-400">
                  Resumo de Atuação
                </p>
                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex items-start justify-between border-b border-off/10 pb-2.5">
                    <span className="text-mist">Especialidade:</span>
                    <span className="font-medium text-off text-right">Direção, Foto & Tech</span>
                  </div>
                  <div className="flex items-start justify-between border-b border-off/10 pb-2.5">
                    <span className="text-mist">Color Pipeline:</span>
                    <span className="font-medium text-off text-right">DaVinci Resolve / ACEScc</span>
                  </div>
                  <div className="flex items-start justify-between border-b border-off/10 pb-2.5">
                    <span className="text-mist">Câmera Principal:</span>
                    <span className="font-medium text-off text-right">Nikon D780 Full Frame</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-mist">Filosofia:</span>
                    <span className="font-medium text-teal-400 text-right">A produção não falha.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Manifesto */}
          <div className="space-y-12 lg:col-span-7">
            {/* Manifesto Quote Box */}
            <div className="border-l-2 border-teal bg-navy/20 p-6 sm:p-8">
              <p className="text-xs font-mono uppercase tracking-widest text-teal-400">
                Manifesto Pessoal
              </p>
              <blockquote className="mt-3 text-xl font-medium italic leading-snug text-off sm:text-2xl lg:text-3xl">
                &ldquo;{FOUNDER_DATA.manifestoQuote}&rdquo;
              </blockquote>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-mist">
              {FOUNDER_DATA.bioFull.map((p, idx) => (
                <p key={idx} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>

            {/* Hybrid Pillars Breakdown */}
            <div className="space-y-6 pt-6">
              <div>
                <p className="u-eyebrow text-teal-400">Tríade de Competência</p>
                <h3 className="mt-2 text-2xl font-semibold text-off sm:text-3xl">
                  O Perfil Híbrido em 3 Pilares
                </h3>
              </div>

              <div className="space-y-4">
                {FOUNDER_DATA.pillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="group border border-off/10 bg-navy/30 p-6 transition-all duration-200 hover:border-off/25"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-teal-400">
                          {pillar.number}
                        </span>
                        <h4 className="text-base font-semibold text-off sm:text-lg">
                          {pillar.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-mist/80">
                        {pillar.subtitle}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-mist">
                      {pillar.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 pt-2">
                      {pillar.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 border border-off/15 bg-ink px-2.5 py-1 text-[0.7rem] font-mono text-mist transition-colors group-hover:border-teal/40 group-hover:text-off"
                        >
                          <CheckCircle2 className="size-3 text-teal-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL DOSSIER / SPECS & GEAR ──────────────── */}
      <section className="border-y border-off/10 bg-navy/20 py-16 sm:py-24">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="u-eyebrow text-teal-400">Ficha Técnica & Rigor Operacional</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-off sm:text-4xl">
              Equipamentos de ponta e color science cinema.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-mist">
              Sem amadorismo ou filtros genéricos. Cada imagem passa por uma cadeia técnica calibrada para preservar texturas, cores fiéis e impacto dramático.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FOUNDER_DATA.specs.map((spec, idx) => (
              <div
                key={idx}
                className="border border-off/10 bg-ink/70 p-6 transition-colors duration-200 hover:border-off/25"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] font-mono uppercase tracking-widest text-teal-400">
                    {spec.category}
                  </span>
                  <Sliders className="size-3.5 text-mist/60" />
                </div>
                <h3 className="mt-3 text-xs font-mono uppercase text-mist">
                  {spec.label}
                </h3>
                <p className="mt-1 text-base font-semibold text-off">
                  {spec.value}
                </p>
                {spec.description && (
                  <p className="mt-2 text-xs leading-relaxed text-mist/90 border-t border-off/10 pt-2">
                    {spec.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE / MILESTONES ─────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 sm:py-24 lg:px-10 lg:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="u-eyebrow text-teal-400">Trajetória & Marcos</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-off sm:text-4xl">
            Construção contínua de relevância visual.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-mist">
            De sets independentes às maiores ativações de marca e videoclipes de projeção nacional.
          </p>
        </div>

        <div className="space-y-6">
          {FOUNDER_DATA.milestones.map((m, idx) => (
            <div
              key={idx}
              className="grid gap-4 border border-off/10 bg-navy/30 p-6 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-8"
            >
              <div className="sm:col-span-3">
                <span className="inline-block rounded border border-teal/30 bg-teal/10 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-teal-400">
                  {m.period}
                </span>
                <p className="mt-2 text-xs font-mono uppercase tracking-wide text-mist">
                  {m.tag}
                </p>
              </div>

              <div className="sm:col-span-4">
                <h3 className="text-base font-semibold text-off sm:text-lg">
                  {m.title}
                </h3>
                <p className="text-xs text-teal-400 font-mono mt-0.5">
                  {m.role}
                </p>
              </div>

              <div className="sm:col-span-5">
                <p className="text-xs sm:text-sm text-mist leading-relaxed">
                  {m.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────── */}
      <CTASection
        eyebrow="Diagnóstico & Briefing Direto"
        title="Vamos construir o próximo capítulo visual do seu projeto."
        text="Converse diretamente com nossa direção para entender como alinhar estética, narrativa e execução técnica na sua marca ou lançamento."
        primaryLabel="Fazer diagnóstico visual"
        secondaryLabel="Conversar no WhatsApp"
      />
    </>
  )
}
