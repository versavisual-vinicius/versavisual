import { lazy, Suspense } from "react"
import { ArrowUpRight, Building2, Users } from "lucide-react"
import { Link } from "react-router-dom"
import {
  useSeo,
  SITE_URL,
  professionalServiceSchema,
  itemListSchema,
} from "../lib/seo"
import { img } from "../lib/images"
import {
  HOME_SERVICES,
  HOME_SERVICE_GROUPS,
  HOME_PROCESS,
  HOME_STATS,
  SEGMENTS,
  segmentImageAlt,
} from "../data/site"
import BeforeAfterSlider from "../components/BeforeAfterSlider"
import ServiceGrid from "../components/ServiceGrid"
import FounderSection from "../components/FounderSection"
import CTASection from "../components/CTASection"
import { useParallax } from "../lib/useParallax"

const METHOD_PHOTO = "/images/foto-a-producao-nao-falha.webp"

const Timeline = lazy(async () => {
  const module = await import("../components/ui/timeline")
  return { default: module.Timeline }
})

export default function Home() {
  useSeo({
    title: "VERSAVISUAL — Fotografia, Vídeo e Storymaking para Marcas",
    description:
      "VERSAVISUAL · Rio de Janeiro · operação nacional. Fotografia, vídeo, storymaking e direção visual para marcas, eventos e entretenimento.",
    path: "/",
    jsonLd: [
      professionalServiceSchema(),
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "VERSAVISUAL",
        url: SITE_URL,
        description:
          "Operação audiovisual: fotografia, vídeo, storymaking e direção visual.",
        inLanguage: "pt-BR",
      },
      itemListSchema(
        SEGMENTS.map((s) => ({
          name: s.nav,
          url: `/${s.slug}`,
          description: s.intro,
        })),
        "Segmentos Audiovisuais VERSAVISUAL",
      ),
    ],
  })

  const { ref: btsParallaxRef, style: btsParallaxStyle } = useParallax({
    speed: 0.08,
  })

  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden sm:flex sm:min-h-[88svh] sm:items-end">
        <div className="relative h-[44svh] min-h-[290px] max-h-[380px] sm:absolute sm:inset-0 sm:h-full sm:max-h-none sm:min-h-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="u-grade absolute inset-0 hidden sm:block" />
        </div>
        <div className="relative mx-auto w-full max-w-[1320px] bg-ink px-5 py-7 sm:bg-transparent sm:pb-12 sm:pt-28 lg:px-10 lg:pb-16">
          <p className="u-eyebrow u-fade-in text-mist/90">
            Rio de Janeiro · operação nacional
          </p>
          <h1 className="u-fade-in mt-4 max-w-3xl text-balance text-3xl leading-[1.05] text-off sm:mt-5 sm:text-5xl lg:text-[4.2rem]">
            Imagem não é registro. É posicionamento.
          </h1>
          <p className="u-fade-in mt-4 max-w-xl text-pretty text-base text-mist sm:mt-6 sm:text-lg">
            Fotografia, vídeo, storymaking e direção visual para marcas, eventos
            e entretenimento — do briefing à entrega final.
          </p>
          <div className="u-fade-in mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/diagnostico-visual"
              viewTransition
              className="inline-flex min-h-[46px] items-center justify-center border border-teal bg-teal px-6 py-3 text-center text-sm font-medium font-head text-off transition-colors duration-200 hover:border-teal-400 hover:bg-teal-400"
            >
              Iniciar projeto
            </Link>
            <Link
              to="/portfolio"
              viewTransition
              className="inline-flex min-h-[46px] items-center justify-center gap-2 border border-off/15 bg-navy/30 px-5 py-3 text-sm font-medium font-head text-off transition-colors duration-200 hover:border-teal hover:text-teal-400 sm:border-transparent sm:bg-transparent sm:px-0 sm:py-1 sm:border-b"
            >
              Ver portfólio <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. O QUE FAZEMOS */}
      <section className="mx-auto max-w-[1320px] px-5 py-12 sm:py-20 lg:px-10 lg:py-28">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="u-eyebrow text-mist">Operação integrada</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-off sm:mt-4 sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
            Uma só direção. Do briefing à cor final.
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-mist sm:mt-4 sm:text-base leading-relaxed">
            A VERSAVISUAL planeja, capta e finaliza a imagem do projeto como um
            sistema. Estratégia e direção visual, fotografia, vídeo, cobertura
            de ativações e eventos, storymaking (quando previsto no escopo),
            pós-produção e Color Science — com formatos prontos para campanha e
            canais digitais.
          </p>
          <p className="mt-3 text-sm text-mist/80">
            Não entregamos serviços soltos. Entregamos a imagem que a marca, o
            evento ou o artista passam a usar depois.
          </p>
        </div>
        <ServiceGrid items={HOME_SERVICES} mobileGroups={HOME_SERVICE_GROUPS} />
      </section>

      {/* STATS */}
      <section className="overflow-hidden border-y border-off/10">
        <ul className="sr-only">
          {HOME_STATS.map((s) => (
            <li key={s.label}>
              {s.value} {s.label}
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="overflow-hidden">
          <div className="u-marquee-track">
            {[0, 1].map((group) => (
              <div
                key={group}
                className={`${
                  group === 0 ? "u-marquee-primary" : "u-marquee-duplicate"
                } flex w-max shrink-0`}
              >
                {HOME_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="u-marquee-item flex min-w-[170px] shrink-0 items-center gap-2.5 border-r border-off/10 px-4 py-5 sm:min-w-[240px] sm:gap-3 sm:px-8 lg:py-7"
                  >
                    <p className="u-display text-xl text-off sm:text-2xl lg:text-3xl">
                      {s.value}
                    </p>
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-mist sm:text-[0.68rem] sm:tracking-[0.16em]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PARA QUEM */}
      <section className="border-b border-off/10 bg-ink/40 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="max-w-3xl">
            <p className="u-eyebrow text-mist">Quem contrata o projeto</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-off sm:mt-4 sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
              Falamos com quem decide a imagem — de grandes marcas a histórias
              reais.
            </h2>
            <p className="mt-4 text-pretty text-sm text-mist sm:text-base leading-relaxed">
              A VERSAVISUAL atua com o mesmo rigor de direção em duas frentes
              complementares:
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border border-off/10 bg-navy/20 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xs border border-teal/40 bg-teal/10 text-teal-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-off sm:text-xl">
                  Empresas e mercado
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-mist">
                Marketing de marcas, agências, produtoras de eventos, festivais
                e equipes de artistas que precisam de cobertura estratégica,
                presença em tempo real e ativos de campanha.
              </p>
            </div>

            <div className="border border-off/10 bg-navy/20 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xs border border-teal/40 bg-teal/10 text-teal-400">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-off sm:text-xl">
                  Pessoas e histórias
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-mist">
                Profissionais, pequenos empreendedores, noivas e famílias que
                buscam posicionamento, retrato autoral e memória sem fórmulas
                prontas.
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-mist/70">
            A escala da equipe e os equipamentos acompanham o porte de cada
            projeto. O cuidado estético e a precisão técnica são exatamente os
            mesmos.
          </p>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section
        id="nichos"
        className="u-defer-render border-y border-off/10 bg-ink"
      >
        <div className="mx-auto max-w-[1320px] px-5 py-12 sm:py-20 lg:px-10 lg:py-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
            <div className="max-w-2xl">
              <p className="u-eyebrow text-mist">Segmentos</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-off sm:mt-4 sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
                Escolha o seu contexto. A linguagem muda com ele.
              </h2>
            </div>
            <Link
              to="/portfolio"
              viewTransition
              className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-mist transition-colors duration-200 hover:text-off active:scale-[0.98]"
            >
              <span>Ver portfólio completo</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {/* Mobile Visual Cards Carousel */}
          <div
            aria-label="Escolha seu contexto"
            className="-mx-5 flex gap-3.5 overflow-x-auto px-5 pb-4 pt-1 sm:hidden snap-x snap-mandatory scrollbar-none"
          >
            {SEGMENTS.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}`}
                viewTransition
                className="group relative flex aspect-[4/5] w-[240px] shrink-0 snap-start overflow-hidden border border-off/15 bg-navy shadow-md transition-all duration-200 active:scale-[0.97]"
              >
                <img
                  src={img(s.heroPhoto || s.photos[0], 500, 625)}
                  alt={segmentImageAlt(s)}
                  width={500}
                  height={625}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4.5">
                  <span className="text-xs font-mono font-medium text-teal-400">
                    {s.index}
                  </span>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold leading-tight text-off">
                      {s.nav}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-mist transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-400"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid gap-px border-y border-off/10 sm:grid-cols-2 lg:grid-cols-4">
            {SEGMENTS.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}`}
                viewTransition
                className="group relative flex aspect-[16/11] overflow-hidden bg-navy transition-colors duration-200 sm:aspect-[3/4] active:scale-[0.99]"
              >
                <img
                  src={img(s.heroPhoto || s.photos[0], 700, 900)}
                  alt={segmentImageAlt(s)}
                  width={700}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <span className="u-grade absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="text-xs font-medium text-teal-400/90">
                    {s.index}
                  </span>
                  <h3 className="mt-1 text-base font-semibold leading-tight text-off sm:text-lg">
                    {s.nav}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER / COLOR GRADING SHOWCASE */}
      <section id="pos-producao" className="border-b border-off/10 bg-ink">
        <div className="mx-auto max-w-[1320px] px-5 py-12 sm:py-20 lg:px-10 lg:py-28">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <p className="u-eyebrow text-mist">Pós-Produção & Color Science</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-off sm:mt-4 sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
              A imagem ganha peso e intenção na pós.
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-sm text-mist sm:mt-4 sm:text-base leading-relaxed">
              Do sensor RAW ao master final calibrado. Arraste o divisor para
              comparar o sinal bruto da câmera com a direção de cor,
              texturização e retoque autoral da VERSAVISUAL.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* 4. COMO TRABALHAMOS / PROCESSO */}
      <section id="processo" className="u-defer-render">
        <Suspense
          fallback={
            <div className="mx-auto min-h-[640px] max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28" />
          }
        >
          <Timeline
            eyebrow="Processo"
            title="Antes do set, o recorte. Depois do set, a tese."
            text="Cada projeto entra por contexto e sai por entrega definida. A proposta é sob medida: duração, complexidade, equipe, deslocamento, formatos, volume, prazo e uso do material."
            media={
              <div
                ref={btsParallaxRef}
                style={btsParallaxStyle}
                className="overflow-hidden rounded-xs border border-line"
              >
                <img
                  src={img(METHOD_PHOTO, 900, 700)}
                  alt="Bastidores de produção audiovisual da VERSAVISUAL"
                  width={900}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover scale-105"
                />
              </div>
            }
            data={HOME_PROCESS.map((p) => ({
              eyebrow: p.n,
              title: p.title,
              content: (
                <p className="max-w-lg text-sm leading-relaxed text-navy">
                  {p.desc}
                </p>
              ),
            }))}
          />
        </Suspense>
      </section>

      {/* 8. SOBRE O FUNDADOR / OPERAÇÃO */}
      <FounderSection />

      {/* 9. DIAGNÓSTICO VISUAL / CTA */}
      <CTASection
        eyebrow="Briefing inicial · gratuito"
        title="Conte o projeto. Devolvemos o caminho."
        text="O Diagnóstico Visual é o briefing inicial da VERSAVISUAL. Serve para receber o contexto, qualificar a oportunidade, identificar objetivo, data e local, orientar o primeiro contato e preparar uma proposta sob medida."
        primaryLabel="Preencher briefing de projeto"
        secondaryLabel="Falar no WhatsApp"
      />
    </>
  )
}
