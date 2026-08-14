import { Link } from "react-router-dom"
import { useSeo, SITE_URL } from "../lib/seo"
import { img, HERO_PHOTO, PHOTOS } from "../lib/images"
import {
  HOME_SERVICES,
  HOME_PROCESS,
  HOME_STATS,
  SEGMENTS,
  WHATSAPP,
} from "../data/site"
import ServiceGrid from "../components/ServiceGrid"
import CTASection from "../components/CTASection"
import TiltCard from "../components/TiltCard"
import { useParallax } from "../lib/useParallax"

export default function Home() {
  useSeo({
    title: "VERSAVISUAL — Hub Audiovisual: Fotografia, Vídeo e Direção Visual",
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
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={img(HERO_PHOTO, 2000, 1200)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="u-grade absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-20 pt-32 lg:px-10 lg:pb-28">
          <p className="u-eyebrow u-fade-in text-mist">
            Hub audiovisual autoral · Rio de Janeiro · Operação nacional
          </p>
          <h1 className="u-fade-in mt-5 max-w-4xl text-balance text-4xl leading-[0.98] text-off sm:text-6xl lg:text-[5.2rem]">
            Imagem não é registro.
            <br />
            <span className="text-teal-400">É posicionamento.</span>
          </h1>
          <p className="u-fade-in mt-6 max-w-xl text-pretty text-lg text-mist">
            Fotografia, vídeo, storymaking e direção visual para marcas,
            artistas e pessoas que tratam a própria imagem como decisão
            estratégica.
          </p>
          <div className="u-fade-in mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/diagnostico-visual"
              viewTransition
              className="rounded-xs bg-teal px-7 py-3.5 text-center font-medium text-ink transition-all duration-200 ease-out hover:bg-teal-400 hover:shadow-lg"
            >
              Fazer diagnóstico visual
            </Link>
            <Link
              to="/portfolio"
              viewTransition
              className="rounded-xs border border-off/30 px-7 py-3.5 text-center font-medium text-off transition-all duration-200 ease-out hover:border-teal-400 hover:text-teal-400"
            >
              Ver portfólio
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-px bg-line px-0 lg:grid-cols-4">
          {HOME_STATS.map((s) => (
            <div
              key={s.label}
              className="bg-surface px-5 py-8 text-center lg:py-10"
            >
              <p className="u-display text-3xl text-ink lg:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-navy">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="u-eyebrow">O que fazemos</p>
          <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            Uma estrutura audiovisual completa, do briefing à entrega.
          </h2>
          <p className="mt-4 text-navy">
            Reunimos direção, captação e pós-produção em uma operação só — para
            que a imagem comunique com coerência em cada ponto de contato.
          </p>
        </div>
        <ServiceGrid items={HOME_SERVICES} />
      </section>

      {/* SEGMENTS */}
      <section id="nichos" className="border-y border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="u-eyebrow">Segmentos</p>
              <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
                Escolha o seu contexto. A linguagem muda com ele.
              </h2>
            </div>
            <Link
              to="/portfolio"
              viewTransition
              className="text-sm text-teal transition-colors hover:text-ink"
            >
              Ver portfólio completo →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SEGMENTS.map((s) => (
              <TiltCard key={s.slug} className="aspect-[3/4] rounded-xl">
                <Link
                  to={`/${s.slug}`}
                  viewTransition
                  className="group relative flex h-full w-full overflow-hidden rounded-xl border border-line transition-shadow duration-300 ease-out hover:shadow-2xl"
                >
                  <img
                    src={img(s.photos[0], 700, 900)}
                    alt=""
                    width={700}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="u-grade absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="u-display text-xs text-teal-400/80">
                      {s.index}
                    </span>
                    <h3 className="mt-1.5 text-lg font-semibold leading-tight text-off">
                      {s.nav}
                    </h3>
                    <span className="mt-2 inline-block text-sm text-teal-400 opacity-0 transition-opacity group-hover:opacity-100">
                      Ver mais →
                    </span>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — sticky stacked cards */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid items-start md:grid-cols-2 md:gap-12">
          <div className="top-24 md:sticky md:py-6">
            <p className="u-eyebrow">Método</p>
            <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              A produção falha antes da câmera ligar.
            </h2>
            <p className="mt-4 max-w-sm text-navy">
              Por isso o planejamento é parte do produto. Cada etapa existe para
              que a captação chegue ao set já resolvida.
            </p>
            <div
              ref={btsParallaxRef}
              style={btsParallaxStyle}
              className="mt-8 hidden overflow-hidden rounded-xl border border-line md:block"
            >
              <img
                src={img(PHOTOS.bts[0], 900, 700)}
                alt="Bastidores de produção audiovisual da VERSAVISUAL"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover scale-105"
              />
            </div>
          </div>

          <div className="mt-10 space-y-5 md:mt-0">
            {HOME_PROCESS.map((p) => (
              <div
                key={p.n}
                className="flex min-h-[200px] flex-col justify-between rounded-xl border border-line bg-off/95 p-7 shadow-xs backdrop-blur-md transition-shadow duration-300 hover:shadow-md lg:p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="u-display text-3xl font-semibold text-teal-700 lg:text-4xl">
                    {p.n}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-teal" aria-hidden />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-ink lg:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-navy">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Não sabe por onde começar? Comece pelo diagnóstico."
        text="Conte o seu contexto e o seu objetivo. Devolvemos um caminho visual claro e uma proposta sob medida — sem compromisso."
      />
    </>
  )
}
