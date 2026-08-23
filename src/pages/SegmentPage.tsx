import { useEffect, useRef, useState } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import {
  getSegment,
  SEGMENTS,
  WHATSAPP,
  PORTFOLIO,
  portfolioImageAlt,
  segmentImageAlt,
  type Segment,
} from "../data/site"
import { useSeo, SITE_URL, breadcrumb } from "../lib/seo"
import { img } from "../lib/images"
import Reveal from "../components/Reveal"
import Gallery from "../components/Gallery"
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
  ).slice(0, 6)
  const portfolioGroups = (seg.portfolioGroups ?? [])
    .map((group) => ({
      ...group,
      cases: group.caseSlugs
        .map((caseSlug) => PORTFOLIO.find((p) => p.caseSlug === caseSlug))
        .filter((item): item is (typeof PORTFOLIO)[number] => Boolean(item)),
    }))
    .filter((group) => group.cases.length > 0)

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

  // service modal
  const [openService, setOpenService] = useState<typeof seg.services[0] | null>(
    null,
  )

  const galleryPhotos = Array.from(
    new Set([seg.heroPhoto, ...(seg.mosaicPhotos ?? seg.photos)]),
  ).slice(0, 3)
  const portfolioPhotos = seg.galleryPreviewLimit
    ? seg.photos.slice(0, seg.galleryPreviewLimit)
    : [...seg.photos]
  const serviceCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!openService) return
    serviceCloseRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenService(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [openService])

  return (
    <div className="relative overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[74svh] items-end overflow-hidden">
        <img
          src={img(seg.heroPhoto, 2000, 1200)}
          alt=""
          aria-hidden="true"
          width={2000}
          height={1200}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,10,13,0.34) 0%, rgba(5,10,13,0.18) 46%, rgba(5,10,13,0.78) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pb-12 pt-28 lg:px-10 lg:pb-16">
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
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              to="/diagnostico-visual"
              viewTransition
              className="inline-flex min-h-[44px] items-center justify-center border border-teal bg-teal px-6 py-3 text-center text-sm font-medium font-head text-off transition-colors hover:border-teal-400 hover:bg-teal-400"
            >
              Falar sobre o projeto
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 border-b border-transparent pb-1 text-sm font-medium font-head text-off transition-colors hover:border-teal hover:text-teal-400"
            >
              Falar no WhatsApp <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM ─────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1320px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <Reveal>
            <Gallery photos={galleryPhotos} label={seg.nav} featured />
          </Reveal>

          {/* Text & Deliverables summary */}
          <Reveal className="flex flex-col lg:sticky lg:top-28">
            <p className="u-eyebrow text-mist">Para quem é</p>
            <h2
              className="mt-4 text-balance text-off"
              style={{
                fontSize: "clamp(26px, 3.4vw, 40px)",
                fontWeight: 800,
                lineHeight: 1.14,
                letterSpacing: "-0.01em",
              }}
            >
              {seg.audienceTitle}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-mist">
              {seg.audienceText}
            </p>
            <ul className="mt-6 space-y-3">
              {seg.audienceList.map((b) => (
                <li key={b} className="flex gap-3 text-mist">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l border-teal bg-surface/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy">
                Diretriz de Produção
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy">
                Cada ensaio e produção de {seg.nav} conta com planejamento
                estético prévio, curadoria de locações e entrega organizada nos
                padrões de uso.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEMA / SOLUÇÃO ────────────────────────────── */}
      <section className="relative z-10 border-y border-off/10 bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <Reveal className="grid gap-px border-y border-line bg-line sm:grid-cols-2">
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
      <section className="relative z-10 border-b border-off/10 bg-transparent py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <Reveal className="mb-12 max-w-2xl">
            <p className="u-eyebrow text-mist">Serviços inclusos</p>
            <h2 className="mt-4 text-3xl leading-tight text-off sm:text-4xl lg:text-5xl">
              {seg.servicesTitle}
            </h2>
          </Reveal>
          <Reveal className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {seg.services.map((s) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setOpenService(s)}
                aria-label={`${s.title} — entender serviço`}
                className="group relative bg-off p-7 text-left transition-colors duration-300 ease-out hover:bg-surface lg:p-8"
              >
                <span className="u-display text-sm font-semibold text-navy">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy">
                  {s.desc}
                </p>
                <span className="mt-4 block text-xs font-medium text-navy opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
        <section className="u-defer-render relative z-10 border-b border-off/10 bg-ink py-20 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="u-eyebrow text-mist">Cases em destaque</p>
                <h2 className="mt-4 text-3xl leading-tight text-off sm:text-4xl lg:text-5xl">
                  Projetos reais de {seg.nav}.
                </h2>
                <p className="mt-3 text-mist">
                  Conheça como traduzimos a identidade e os objetivos de cada
                  cliente em resultados visuais de alto impacto.
                </p>
              </div>
              <Link
                to="/portfolio"
                viewTransition
                className="text-sm font-medium text-mist transition-colors hover:text-off"
              >
                Ver todos os cases →
              </Link>
            </Reveal>

            <Reveal className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCases.map((c) => {
                const cardInner = (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                      <img
                        src={img(c.photo, 800, 500)}
                        alt={portfolioImageAlt(c)}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-4">
                      <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-teal-400">
                        {c.city}
                      </p>
                      <h3 className="text-xl font-semibold leading-snug text-off">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-wider text-mist">
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
                    className="group flex flex-col"
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <article key={c.title} className="group flex flex-col">
                    {cardInner}
                  </article>
                )
              })}
            </Reveal>
          </div>
        </section>
      )}

      {/* ── PORTFÓLIO RELACIONADO / GALERIA DE FOTOS ─────── */}
      <section className="u-defer-render relative z-10 border-b border-off/10 bg-transparent py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <Reveal className="mb-10">
            <p className="u-eyebrow text-mist">Galeria visual</p>
            <h2 className="mt-4 text-3xl leading-tight text-off sm:text-4xl">
              {seg.nav} em imagens.
            </h2>
            <p className="mt-3 max-w-xl text-mist">
              {seg.galleryIntro ?? seg.intro}
            </p>
          </Reveal>

          {seg.slug === "artistas-videoclipes" && (
            <Reveal className="mb-12 overflow-hidden border-y border-line bg-navy">
              <video
                controls
                playsInline
                preload="metadata"
                poster={img(seg.photos[0], 1400, 800)}
                className="aspect-video w-full object-cover"
              >
                <source src="/videos/hero.webm" type="video/webm" />
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </Reveal>
          )}

          <Reveal>
            <Gallery photos={portfolioPhotos} label={seg.nav} />
          </Reveal>

          {portfolioGroups.length > 0 && (
            <Reveal className="mt-16 space-y-12">
              <div className="max-w-3xl border-t border-off/10 pt-8">
                <h3 className="text-2xl font-semibold leading-tight text-off sm:text-3xl">
                  Projetos por tipo de entrega.
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
                  Cada grupo abre uma leitura mais completa dos cases, com
                  capa, contexto e prévias do material entregue.
                </p>
              </div>

              {portfolioGroups.map((group) => (
                <section
                  key={group.title}
                  className="border-t border-off/10 pt-8"
                  aria-labelledby={`portfolio-group-${group.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <div className="mb-6 max-w-3xl">
                    <h4
                      id={`portfolio-group-${group.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`}
                      className="text-xl font-semibold text-off"
                    >
                      {group.title}
                    </h4>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">
                      {group.description}
                    </p>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-3">
                    {group.cases.map((project) => {
                      const previewPhotos = (
                        project.gallery ?? [project.photo]
                      ).slice(0, group.previewCount ?? 6)
                      const imageCount = project.gallery?.length ?? 1
                      const imageCountLabel =
                        imageCount === 1
                          ? "1 imagem"
                          : `${imageCount} imagens`

                      return (
                        <article
                          key={project.title}
                          className="group border-t border-off/10 pt-4"
                        >
                          <Link
                            to={`/portfolio/${project.caseSlug}`}
                            viewTransition
                            className="block"
                          >
                            <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                              <img
                                src={img(project.photo, 900, 560)}
                                alt={portfolioImageAlt(project)}
                                width={900}
                                height={560}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                            </div>
                          </Link>

                          <div className="pt-4">
                            <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-teal-400">
                              {project.city}
                            </p>
                            <h5 className="mt-1 text-lg font-semibold leading-snug text-off">
                              {project.title}
                            </h5>
                            <p className="mt-2 text-sm text-mist">
                              {imageCountLabel} no case
                            </p>
                          </div>

                          <div className="mt-4 grid grid-cols-4 gap-1">
                            {previewPhotos.map((photo, index) => (
                              <img
                                key={photo}
                                src={img(photo, 420, 300)}
                                alt={`${project.title} - prévia ${index + 1}`}
                                width={420}
                                height={300}
                                loading="lazy"
                                decoding="async"
                                className="aspect-square w-full object-cover"
                              />
                            ))}
                          </div>

                          <Link
                            to={`/portfolio/${project.caseSlug}`}
                            viewTransition
                            className="mt-4 inline-flex min-h-[44px] items-center gap-2 border-b border-transparent pb-1 text-sm font-medium font-head text-mist transition-colors hover:border-teal hover:text-off"
                          >
                            Ver case completo <span aria-hidden>→</span>
                          </Link>
                        </article>
                      )
                    })}
                  </div>
                </section>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      {/* ── PROCESSO ──────────────────────────────────────── */}
      <section
        id="processo"
        className="relative z-10 border-b border-off/10 bg-ink py-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <Reveal className="mb-12 max-w-2xl">
            <p className="u-eyebrow text-mist">Processo de trabalho</p>
            <h2 className="mt-4 text-3xl leading-tight text-off sm:text-4xl lg:text-5xl">
              Do briefing à entrega, com método.
            </h2>
          </Reveal>
          <Reveal className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {seg.process.map((p) => (
              <div key={p.n} className="bg-surface p-7 lg:p-8">
                <span className="u-display text-5xl text-teal/20">{p.n}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {p.title}
                </h3>
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
                className="border-l border-off/20 pl-3 text-xs text-mist"
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
      <section className="relative z-10 border-b border-off/10 bg-transparent py-20 lg:py-28">
        <div className="mx-auto max-w-[900px] px-5 lg:px-10">
          <Reveal>
            <p className="u-eyebrow text-mist">Dúvidas comuns</p>
            <h2 className="mb-10 mt-4 text-3xl leading-tight text-off sm:text-4xl">
              {seg.faqTitle}
            </h2>
            <FAQAccordion items={seg.faqs} tone="dark" />
          </Reveal>
        </div>
      </section>

      {/* ── OUTROS SEGMENTOS ─────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="u-eyebrow mb-8 text-mist">Explore outros segmentos</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/${o.slug}`}
                viewTransition
                className="group relative aspect-[16/10] overflow-hidden border-y border-line"
              >
                <img
                  src={img(o.heroPhoto || o.photos[0], 700, 440)}
                  alt={segmentImageAlt(o)}
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

      {/* ── SERVICE MODAL ─────────────────────────────────── */}
      {openService && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          onClick={() => setOpenService(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-line bg-off p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={serviceCloseRef}
              type="button"
              onClick={() => setOpenService(null)}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-line text-navy transition-all duration-200 ease-out hover:border-teal hover:text-teal"
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
            <h3
              id="service-modal-title"
              className="mt-3 text-2xl font-bold text-ink"
            >
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
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-teal px-6 py-3 font-medium font-head text-off transition-all duration-200 ease-out hover:bg-teal-400"
              >
                Solicitar diagnóstico →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
