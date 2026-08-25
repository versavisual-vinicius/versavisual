import { lazy, Suspense } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useSeo, SITE_URL, professionalServiceSchema } from "../lib/seo"
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
      "Hub audiovisual autoral no Rio de Janeiro com operação nacional. Fotografia, vídeo, storymaking e direção visual para marcas, artistas e pessoas.",
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
          "Hub audiovisual autoral: fotografia, vídeo, storymaking e direção visual.",
        inLanguage: "pt-BR",
      },
    ],
  })

  const { ref: btsParallaxRef, style: btsParallaxStyle } = useParallax({
    speed: 0.08,
  })

  return (
    <>
      {/* HERO */}
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
            Hub audiovisual autoral · Rio de Janeiro · Operação nacional
          </p>
          <h1 className="u-fade-in mt-4 max-w-3xl text-balance text-3xl leading-[1.05] text-off sm:mt-5 sm:text-5xl lg:text-[4.2rem]">
            Imagem não é registro. É posicionamento.
          </h1>
          <p className="u-fade-in mt-4 max-w-xl text-pretty text-base text-mist sm:mt-6 sm:text-lg">
            Fotografia, vídeo, storymaking e direção visual para marcas,
            artistas e pessoas que tratam a própria imagem como decisão
            estratégica.
          </p>
          <div className="u-fade-in mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/diagnostico-visual"
              viewTransition
              className="inline-flex min-h-[46px] items-center justify-center border border-teal bg-teal px-6 py-3 text-center text-sm font-medium font-head text-off transition-colors duration-200 hover:border-teal-400 hover:bg-teal-400"
            >
              Fazer diagnóstico visual
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

      {/* SERVICES */}
      <section className="mx-auto max-w-[1320px] px-5 py-14 sm:py-20 lg:px-10 lg:py-28">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="u-eyebrow text-mist">O que fazemos</p>
          <h2 className="mt-3 text-2xl leading-tight text-off sm:mt-4 sm:text-4xl lg:text-5xl">
            Uma estrutura audiovisual completa, do briefing à entrega.
          </h2>
          <p className="mt-3 text-sm text-mist sm:mt-4 sm:text-base">
            Reunimos direção, captação e pós-produção em uma operação só — para
            que a imagem comunique com coerência em cada ponto de contato.
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
                    className="u-marquee-item flex min-w-[170px] shrink-0 items-center gap-2.5 border-r border-off/10 px-4 py-5 sm:min-w-[240px] sm:gap-3 sm:px-8 lg:py-8"
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

      {/* SEGMENTS */}
      <section
        id="nichos"
        className="u-defer-render border-y border-off/10 bg-ink"
      >
        <div className="mx-auto max-w-[1320px] px-5 py-14 sm:py-20 lg:px-10 lg:py-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
            <div className="max-w-2xl">
              <p className="u-eyebrow text-mist">Segmentos</p>
              <h2 className="mt-3 text-2xl leading-tight text-off sm:mt-4 sm:text-4xl lg:text-5xl">
                Escolha o seu contexto. A linguagem muda com ele.
              </h2>
            </div>
            <Link
              to="/portfolio"
              viewTransition
              className="inline-flex min-h-[44px] items-center text-sm font-medium text-mist transition-colors hover:text-off"
            >
              Ver portfólio completo →
            </Link>
          </div>

          {/* Mobile Visual Cards Carousel */}
          <div
            aria-label="Escolha seu contexto"
            className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 sm:hidden snap-x snap-mandatory scrollbar-none"
          >
            {SEGMENTS.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}`}
                viewTransition
                className="group relative flex aspect-[4/5] w-[230px] shrink-0 snap-start overflow-hidden border border-off/10 bg-navy"
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
                <span className="u-grade absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-xs font-medium text-teal-400/90">
                    {s.index}
                  </span>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold leading-tight text-off">
                      {s.nav}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
                className="group relative flex aspect-[16/11] overflow-hidden bg-navy sm:aspect-[3/4]"
              >
                <img
                  src={img(s.heroPhoto || s.photos[0], 700, 900)}
                  alt={segmentImageAlt(s)}
                  width={700}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
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
        <div className="mx-auto max-w-[1320px] px-5 py-14 sm:py-20 lg:px-10 lg:py-28">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <p className="u-eyebrow text-mist">Pós-Produção & Color Science</p>
            <h2 className="mt-4 text-3xl leading-tight text-off sm:text-4xl lg:text-5xl">
              A imagem ganha peso e intenção na pós.
            </h2>
            <p className="mt-4 text-mist">
              Do sensor RAW ao master final calibrado. Arraste o divisor para
              comparar o sinal bruto da câmera com a direção de cor,
              texturização e retoque autoral da VERSAVISUAL.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* PROCESS */}
      <section id="processo" className="u-defer-render">
        <Suspense
          fallback={
            <div className="mx-auto min-h-[640px] max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28" />
          }
        >
          <Timeline
            eyebrow="Método"
            title="A produção falha antes da câmera ligar."
            text="Por isso o planejamento é parte do produto. Cada etapa existe para que a captação chegue ao set já resolvida."
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

      <CTASection
        title="Não sabe por onde começar? Comece pelo diagnóstico."
        text="Conte o seu contexto e o seu objetivo. Devolvemos um caminho visual claro e uma proposta sob medida — sem compromisso."
      />
    </>
  )
}
