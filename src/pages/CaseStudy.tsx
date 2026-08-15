import { useParams, Link } from "react-router-dom"
import {
  getCase,
  getSegment,
  PORTFOLIO,
  WHATSAPP,
  portfolioImageAlt,
} from "../data/site"
import { useSeo, SITE_URL, breadcrumb } from "../lib/seo"
import { img } from "../lib/images"
import Gallery from "../components/Gallery"
import CTASection from "../components/CTASection"
import NotFound from "./NotFound"

export default function CaseStudy() {
  const { caseSlug = "" } = useParams()
  const item = getCase(caseSlug)
  if (!item) return <NotFound />

  const seg = getSegment(item.segmentSlug)
  const gallery =
    item.gallery && item.gallery.length > 0
      ? item.gallery
      : seg
        ? seg.photos
        : [item.photo]
  const related = PORTFOLIO.filter(
    (p) =>
      p.caseSlug && p.caseSlug !== caseSlug && p.category === item.category,
  ).slice(0, 3)

  useSeo({
    title: `${item.title} — ${item.category} | VERSAVISUAL`,
    description: `Case ${item.title} em ${item.city}. Projeto de ${item.category.toLowerCase()} produzido pela VERSAVISUAL — fotografia, vídeo e direção visual.`,
    path: `/portfolio/${caseSlug}`,
    jsonLd: [
      breadcrumb([
        { name: "Início", path: "/" },
        { name: "Portfólio", path: "/portfolio" },
        { name: item.title, path: `/portfolio/${caseSlug}` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: item.title,
        about: item.category,
        contentLocation: item.city,
        image: img(item.photo, 1200, 800),
        creator: {
          "@type": "Organization",
          name: "VERSAVISUAL",
          url: SITE_URL,
        },
        url: `${SITE_URL}/portfolio/${caseSlug}`,
      },
    ],
  })

  return (
    <>
      <section className="relative flex min-h-[68svh] items-end overflow-hidden">
        <img
          src={img(item.photo, 2000, 1200)}
          alt={item.title}
          width={2000}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="u-grade absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-12 pt-28 lg:px-10 lg:pb-16">
          <nav
            aria-label="Trilha"
            className="u-eyebrow mb-5 flex flex-wrap items-center gap-2"
          >
            <Link to="/" viewTransition className="hover:text-off">
              Início
            </Link>
            <span aria-hidden>/</span>
            <Link to="/portfolio" viewTransition className="hover:text-off">
              Portfólio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-mist">{item.category}</span>
          </nav>
          <h1 className="max-w-4xl text-balance text-4xl leading-[1.0] text-off sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-mist">
            <span>
              <span className="text-teal-400">Segmento</span> · {item.category}
            </span>
            <span>
              <span className="text-teal-400">Local</span> · {item.city}
            </span>
            <span>
              <span className="text-teal-400">Entrega</span> · Foto · Vídeo ·
              Direção
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-5 py-12 lg:px-10 lg:py-16">
        <p className="u-eyebrow text-mist">Sobre o projeto</p>
        <p className="mt-5 text-pretty text-xl leading-relaxed text-off">
          {item.title} nasceu de um objetivo claro de comunicação. A VERSAVISUAL
          conduziu briefing, direção visual, captação e pós-produção para
          traduzir o contexto de {item.category.toLowerCase()} em uma narrativa
          coesa.
        </p>
        <p className="mt-5 text-pretty text-mist">
          Do reconhecimento de locação à gradação de cor, cada decisão serviu à
          intenção do projeto — enquadramento, luz, ritmo e curadoria pensados
          para o uso final, com entrega organizada por formato e plataforma.
        </p>

        {seg && (
          <Link
            to={`/${seg.slug}`}
            viewTransition
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-off"
          >
            Ver o segmento {seg.nav} →
          </Link>
        )}
      </section>

      {item.video && (
        <section className="mx-auto max-w-[1100px] px-5 pb-12 lg:px-10 lg:pb-16">
          <div className="relative overflow-hidden rounded-xl border border-off/10 bg-navy shadow-2xl">
            <video
              controls
              playsInline
              poster={img(item.photo, 1400, 800)}
              className="aspect-video w-full object-cover"
            >
              <source src={item.video} type="video/mp4" />
            </video>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1320px] px-5 pb-14 lg:px-10 lg:pb-20">
        <Gallery photos={gallery} label={item.title} />
      </section>

      {related.length > 0 && (
        <section className="border-t border-off/10 bg-ink/35 backdrop-blur-sm">
          <div className="mx-auto max-w-[1320px] px-5 py-12 lg:px-10 lg:py-16">
            <p className="u-eyebrow mb-8 text-mist">Cases relacionados</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.caseSlug}
                  to={`/portfolio/${r.caseSlug}`}
                  viewTransition
                  className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-off/10"
                >
                  <img
                    src={img(r.photo, 700, 440)}
                    alt={portfolioImageAlt(r)}
                    width={700}
                    height={440}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="u-grade absolute inset-0" />
                  <h3 className="absolute inset-x-0 bottom-0 p-5 text-base font-semibold text-off">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Quer um resultado assim para o seu projeto?"
        text="Comece pelo diagnóstico visual e receba uma proposta sob medida para o seu contexto e objetivo."
        photo={item.photo}
      />
    </>
  )
}
