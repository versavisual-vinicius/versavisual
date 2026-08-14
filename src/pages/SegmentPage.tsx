import { useEffect, useState } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import {
  getSegment,
  SEGMENTS,
  WHATSAPP,
  PORTFOLIO,
  type Segment,
} from "../data/site"
import { useSeo, SITE_URL, breadcrumb } from "../lib/seo"
import { img } from "../lib/images"
import Reveal from "../components/Reveal"
import HeroGridLines from "../components/HeroGridLines"
import FAQAccordion from "../components/FAQAccordion"
import CTASection from "../components/CTASection"
import NotFound from "./NotFound"

interface SegmentPageProps {
  segment?: Segment
}

export default function SegmentPage({
  segment: propSegment,
}: SegmentPageProps) {
  const { slug = "" } = useParams()
  const location = useLocation()
  const pathSlug = location.pathname.replace(/^\/+|\/+$/g, "")
  const seg = propSegment ?? getSegment(slug) ?? getSegment(pathSlug)

  if (!seg) {
    return <NotFound />
  }

  const others = SEGMENTS.filter((s) => s.slug !== seg.slug).slice(0, 3)
  const relatedCases = PORTFOLIO.filter(
    (p) => p.segmentSlug === seg.slug || p.category === seg.category,
  )

  useSeo({
    title: `${seg.seoTitle} | VERSAVISUAL`,
    description: seg.seoDesc,
    path: `/${seg.slug}`,
    jsonLd: [
      breadcrumb([
        { name: "Início", path: "/" },
        { name: seg.nav, path: `/${seg.slug}` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: seg.seoTitle,
        description: seg.seoDesc,
        provider: {
          "@type": "Organization",
          name: "VERSAVISUAL",
          url: SITE_URL,
        },
        areaServed: "BR",
        url: `${SITE_URL}/${seg.slug}`,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seg.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  })

  // photo lightbox
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  // service modal
  const [openService, setOpenService] = useState<typeof seg.services[0] | null>(
    null,
  )

  useEffect(() => {
    if (lightboxIdx === null && !openService) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIdx(null)
        setOpenService(null)
      }
      if (e.key === "ArrowRight" && lightboxIdx !== null)
        setLightboxIdx((i) => ((i ?? 0) + 1) % seg.photos.length)
      if (e.key === "ArrowLeft" && lightboxIdx !== null)
        setLightboxIdx(
          (i) => ((i ?? 0) - 1 + seg.photos.length) % seg.photos.length,
        )
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
    }
  }, [lightboxIdx, openService, seg.photos.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || lightboxIdx === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        setLightboxIdx((i) => ((i ?? 0) + 1) % seg.photos.length)
      } else {
        setLightboxIdx(
          (i) => ((i ?? 0) - 1 + seg.photos.length) % seg.photos.length,
        )
      }
    }
    setTouchStart(null)
  }

  const galleryPhotos = [...seg.photos].slice(0, 4)
  const portfolioPhotos = [...seg.photos]

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink">
        {/* glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(94,127,140,0.28) 0%, transparent 70%)",
          }}
        />
        <HeroGridLines />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-20 pt-32 lg:px-10 lg:pb-28">
          <nav
            aria-label="Trilha"
            className="u-eyebrow mb-5 flex items-center gap-2"
          >
            <Link to="/" viewTransition className="hover:text-off">
              Início
            </Link>
            <span aria-hidden>/</span>
            <span className="text-mist">{seg.nav}</span>
          </nav>
          <h1 className="mt-3 max-w-4xl text-balance text-4xl leading-[1.0] text-off sm:text-5xl lg:text-[3.8rem]">
            {seg.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-mist/90">
            {seg.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/diagnostico-visual"
              viewTransition
              className="rounded-xl bg-teal px-7 py-3.5 text-center font-medium text-ink transition-all duration-200 ease-out hover:bg-teal-400"
            >
              Falar sobre o projeto
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-off/30 px-7 py-3.5 text-center font-medium text-off transition-all duration-200 ease-out hover:border-teal-400 hover:text-teal-400"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Gallery */}
          <Reveal
            className={`grid gap-2 ${
              galleryPhotos.length === 1
                ? "grid-cols-1"
                : galleryPhotos.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2"
            }`}
          >
            {galleryPhotos.map((photoId, index) => (
              <button
                key={photoId}
                type="button"
                onClick={() => setLightboxIdx(index)}
                aria-label={`Ampliar imagem ${index + 1}`}
                className={`group relative overflow-hidden rounded-xl bg-navy focus-visible:outline-teal-400 ${
                  index === 0 && galleryPhotos.length >= 3
                    ? "col-span-2 aspect-[16/10]"
                    : "aspect-[4/5]"
                }`}
              >
                <img
                  src={img(photoId, 900)}
                  alt={`${seg.nav} — imagem ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
              </button>
            ))}
          </Reveal>

          {/* Text */}
          <Reveal className="flex flex-col justify-center">
            <p className="u-eyebrow">Para quem é</p>
            <h2
              className="mt-4 text-balance text-ink"
              style={{
                fontSize: "clamp(26px, 3.4vw, 40px)",
                fontWeight: 800,
                lineHeight: 1.14,
                letterSpacing: "-0.01em",
              }}
            >
              {seg.audienceTitle}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-navy">
              {seg.audienceText}
            </p>
            <ul className="mt-6 space-y-3">
              {seg.audienceList.map((b) => (
                <li key={b} className="flex gap-3 text-navy">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEMA / SOLUÇÃO ────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <Reveal className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            <div className="bg-surface p-8 lg:p-10">
              <p className="u-eyebrow">O problema</p>
              <h3
                className="mt-4 text-ink"
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {seg.problemTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy">
                {seg.problemText}
              </p>
            </div>
            <div className="bg-off p-8 lg:p-10">
              <p className="u-eyebrow">Como resolvemos</p>
              <h3
                className="mt-4 text-ink"
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {seg.solutionTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy">
                {seg.solutionText}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVIÇOS ──────────────────────────────────────── */}
      <section className="border-b border-line bg-off py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <Reveal className="mb-12 max-w-2xl">
            <p className="u-eyebrow">Serviços inclusos</p>
            <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              {seg.servicesTitle}
            </h2>
          </Reveal>
          <Reveal className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {seg.services.map((s) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setOpenService(s)}
                aria-label={`Entender serviço: ${s.title}`}
                className="group relative bg-off p-7 text-left transition-colors duration-300 ease-out hover:bg-surface lg:p-8"
              >
                <span className="u-display text-sm text-teal-400/70">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy">
                  {s.desc}
                </p>
                <span className="mt-4 block text-xs font-medium text-teal opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Entender serviço →
                </span>
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-teal transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── CASES EM DESTAQUE DO SEGMENTO ─────────────────── */}
      {relatedCases.length > 0 && (
        <section className="border-b border-line bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="u-eyebrow">Cases em destaque</p>
                <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
                  Projetos reais de {seg.nav}.
                </h2>
                <p className="mt-3 text-navy">
                  Conheça como traduzimos a identidade e os objetivos de cada
                  cliente em resultados visuais de alto impacto.
                </p>
              </div>
              <Link
                to="/portfolio"
                viewTransition
                className="text-sm font-medium text-teal transition-colors hover:text-ink"
              >
                Ver todos os cases →
              </Link>
            </Reveal>

            <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCases.map((c) => {
                const cardInner = (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                      <img
                        src={img(c.photo, 800, 500)}
                        alt={c.title}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="u-grade absolute inset-0" />
                      <span className="u-eyebrow absolute left-4 top-4 text-teal-400">
                        {c.city}
                      </span>
                      {c.caseSlug && (
                        <span className="absolute bottom-4 right-4 rounded-full border border-off/40 bg-ink/40 px-3 py-1 text-xs text-off opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                          Ver case →
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold leading-snug text-ink">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-wider text-teal">
                        {c.category} · {c.city}
                      </p>
                    </div>
                  </>
                )

                return c.caseSlug ? (
                  <Link
                    key={c.title}
                    to={`/portfolio/${c.caseSlug}`}
                    viewTransition
                    className="group flex flex-col overflow-hidden rounded-xl border border-line bg-off transition-shadow duration-300 ease-out hover:shadow-lg"
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <article
                    key={c.title}
                    className="group flex flex-col overflow-hidden rounded-xl border border-line bg-off"
                  >
                    {cardInner}
                  </article>
                )
              })}
            </Reveal>
          </div>
        </section>
      )}

      {/* ── PORTFÓLIO RELACIONADO / GALERIA DE FOTOS ─────── */}
      <section className="border-b border-line bg-off py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <Reveal className="mb-10">
            <p className="u-eyebrow">Galeria visual</p>
            <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl">
              {seg.nav} em imagens.
            </h2>
            <p className="mt-3 max-w-xl text-navy">{seg.intro}</p>
          </Reveal>

          {seg.slug === "artistas-videoclipes" && (
            <Reveal className="mb-12 overflow-hidden rounded-xl border border-line bg-navy shadow-2xl">
              <video
                controls
                playsInline
                poster={img(seg.photos[0], 1400, 800)}
                className="aspect-video w-full object-cover"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </Reveal>
          )}

          <Reveal className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {portfolioPhotos.map((photoId, i) => (
              <button
                key={photoId}
                type="button"
                onClick={() => setLightboxIdx(i)}
                aria-label={`Ampliar imagem ${i + 1} de ${seg.nav}`}
                className={`group relative overflow-hidden rounded-xl bg-navy focus-visible:outline-teal-400 ${
                  i % 5 === 0
                    ? "col-span-2 aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-square"
                    : "aspect-[4/5]"
                }`}
              >
                <img
                  src={img(photoId, 900)}
                  alt={`${seg.nav} — imagem ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── PROCESSO ──────────────────────────────────────── */}
      <section
        id="processo"
        className="border-b border-line bg-surface py-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <Reveal className="mb-12 max-w-2xl">
            <p className="u-eyebrow">Processo de trabalho</p>
            <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              Do briefing à entrega, com método.
            </h2>
          </Reveal>
          <Reveal className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {seg.process.map((p) => (
              <div key={p.n} className="bg-surface p-7 lg:p-8">
                <span className="u-display text-5xl text-teal/20">{p.n}</span>
                <h4 className="mt-4 text-lg font-semibold text-ink">
                  {p.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-navy">
                  {p.desc}
                </p>
              </div>
            ))}
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {seg.regions.map((r) => (
              <span
                key={r}
                className="rounded-full border border-line-strong px-4 py-1.5 text-xs text-navy"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────── */}
      <CTASection
        eyebrow={seg.ctaEyebrow}
        title={seg.ctaTitle}
        text={seg.ctaText}
        photo={seg.photos[1] ?? seg.photos[0]}
      />

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="border-b border-line bg-off py-20 lg:py-28">
        <div className="mx-auto max-w-[900px] px-5 lg:px-10">
          <Reveal>
            <p className="u-eyebrow">Dúvidas comuns</p>
            <h2 className="mb-10 mt-4 text-3xl leading-tight text-ink sm:text-4xl">
              {seg.faqTitle}
            </h2>
            <FAQAccordion items={seg.faqs} />
          </Reveal>
        </div>
      </section>

      {/* ── OUTROS SEGMENTOS ─────────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="u-eyebrow mb-8">Explore outros segmentos</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/${o.slug}`}
                viewTransition
                className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-line transition-shadow duration-300 ease-out hover:shadow-lg"
                aria-label={o.discoverAnchor}
              >
                <img
                  src={img(o.photos[0], 700, 440)}
                  alt={o.nav}
                  width={700}
                  height={440}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="u-grade absolute inset-0" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 text-lg font-semibold text-off">
                  {o.nav}
                </h3>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PHOTO LIGHTBOX ───────────────────────────────── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[60] flex select-none items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${seg.nav} — visualização ampliada`}
          onClick={() => setLightboxIdx(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-off transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/10 hover:text-teal-400"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIdx(
                (i) =>
                  ((i ?? 0) - 1 + portfolioPhotos.length) %
                  portfolioPhotos.length,
              )
            }}
            aria-label="Imagem anterior"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-off transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/10 hover:text-teal-400 sm:left-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-5xl"
          >
            <img
              src={img(portfolioPhotos[lightboxIdx], 1600)}
              alt={`${seg.nav} — imagem ${lightboxIdx + 1}`}
              decoding="async"
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center text-xs text-mist">
              {seg.nav} · {lightboxIdx + 1} / {portfolioPhotos.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIdx((i) => ((i ?? 0) + 1) % portfolioPhotos.length)
            }}
            aria-label="Próxima imagem"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-off transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/10 hover:text-teal-400 sm:right-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* ── SERVICE MODAL ─────────────────────────────────── */}
      {openService && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={openService.title}
          onClick={() => setOpenService(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-line bg-off p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenService(null)}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line text-navy transition-all duration-200 ease-out hover:border-teal hover:text-teal"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <p className="u-eyebrow">Serviço {openService.n}</p>
            <h3 className="mt-3 text-2xl font-bold text-ink">
              {openService.title}
            </h3>
            <p className="mt-3 leading-relaxed text-navy">{openService.desc}</p>
            <p className="mt-3 text-sm text-navy/70">
              Cada serviço tem função específica dentro da produção. Não
              trabalhamos com cliques soltos — cada entrega faz parte de uma
              operação com briefing, execução e curadoria.
            </p>
            <div className="mt-6">
              <Link
                to="/diagnostico-visual"
                onClick={() => setOpenService(null)}
                className="inline-block rounded-xl bg-teal px-6 py-3 font-medium text-ink transition-all duration-200 ease-out hover:bg-teal-400"
              >
                Solicitar diagnóstico →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
