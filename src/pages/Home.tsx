import { lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { useSeo, SITE_URL } from "../lib/seo"
import { img, HERO_PHOTO } from "../lib/images"
import {
  HOME_SERVICES,
  HOME_PROCESS,
  HOME_STATS,
  SEGMENTS,
  WHATSAPP,
  segmentImageAlt,
} from "../data/site"
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
      "Hub audiovisual autoral. Fotografia, vídeo, storymaking e direção visual para marcas, artistas e pessoas. Diagnóstico visual gratuito e portfólio por segmento.",
    path: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "VERSAVISUAL",
        url: SITE_URL,
        description:
          "Hub audiovisual autoral: fotografia, vídeo, storymaking e direção visual.",
        sameAs: [WHATSAPP],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "VERSAVISUAL",
        url: SITE_URL,
      },
    ],
  })

  const { ref: btsParallaxRef, style: btsParallaxStyle } = useParallax({
    speed: 0.08,
  })

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={img(HERO_PHOTO, 2000, 1200)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="u-grade absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-12 pt-28 lg:px-10 lg:pb-16">
          <p className="u-eyebrow u-fade-in text-mist/90">
            Hub audiovisual autoral · Rio de Janeiro · Operação nacional
          </p>
          <h1 className="u-fade-in mt-5 max-w-3xl text-balance text-4xl leading-[1.02] text-off sm:text-5xl lg:text-[4.2rem]">
            Imagem não é registro. É posicionamento.
          </h1>
          <p className="u-fade-in mt-6 max-w-xl text-pretty text-lg text-mist">
            Fotografia, vídeo, storymaking e direção visual para marcas,
            artistas e pessoas que tratam a própria imagem como decisão
            estratégica.
          </p>
          <div className="u-fade-in mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              to="/diagnostico-visual"
              viewTransition
              className="border border-off bg-off px-6 py-3 text-center text-sm font-medium text-ink transition-colors duration-200 hover:border-teal hover:bg-teal hover:text-off"
            >
              Fazer diagnóstico visual
            </Link>
            <Link
              to="/portfolio"
              viewTransition
              className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-medium text-off transition-colors duration-200 hover:border-teal hover:text-teal-400"
            >
              Ver portfólio <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="u-eyebrow text-mist">O que fazemos</p>
          <h2 className="mt-4 text-3xl leading-tight text-off sm:text-4xl lg:text-5xl">
            Uma estrutura audiovisual completa, do briefing à entrega.
          </h2>
          <p className="mt-4 text-mist">
            Reunimos direção, captação e pós-produção em uma operação só — para
            que a imagem comunique com coerência em cada ponto de contato.
          </p>
        </div>
        <ServiceGrid items={HOME_SERVICES} />
      </section>

      {/* STATS */}
      <section className="border-y border-off/10">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 divide-x divide-y divide-off/10 px-5 lg:grid-cols-4 lg:px-10">
          {HOME_STATS.map((s) => (
            <div key={s.label} className="py-7 lg:py-8">
              <p className="u-display text-2xl text-off lg:text-3xl">
                {s.value}
              </p>
              <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-mist">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEGMENTS */}
      <section id="nichos" className="border-y border-off/10 bg-ink">
        <div className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="u-eyebrow text-mist">Segmentos</p>
              <h2 className="mt-4 text-3xl leading-tight text-off sm:text-4xl lg:text-5xl">
                Escolha o seu contexto. A linguagem muda com ele.
              </h2>
            </div>
            <Link
              to="/portfolio"
              viewTransition
              className="text-sm font-medium text-mist transition-colors hover:text-off"
            >
              Ver portfólio completo →
            </Link>
          </div>
          <div className="grid gap-px border-y border-off/10 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* PROCESS */}
      <section id="processo">
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
                  loading="lazy"
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
