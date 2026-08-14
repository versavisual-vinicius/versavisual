"use client" /* HERO */ /* PARA QUEM */ /* eslint-disable-next-line @next/next/no-img-element */ /* PROBLEMA / SOLUÇÃO */ /* SERVIÇOS INCLUSOS */ /* PORTFÓLIO RELACIONADO */ /* eslint-disable-next-line @next/next/no-img-element */ /* PROCESSO */ /* CTA BAND */ /* FAQ */
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type {
  NicheData,
  NichePortfolioPhoto,
  NicheService,
} from "@/data/niches"
import { resolvePhotoSrc } from "@/data/photoLibrary"
import Reveal from "./Reveal"
import FaqAccordion from "./FaqAccordion"

interface NichePageProps {
  niche: NicheData
}

export default function NichePage({ niche }: NichePageProps) {
  const {
    hero,
    paraQuem,
    problemaSolucao,
    servicos,
    portfolio,
    processo,
    cta,
    faq,
    breadcrumb,
  } = niche
  const [openPhoto, setOpenPhoto] = useState<NichePortfolioPhoto | null>(null)
  const [openService, setOpenService] = useState<NicheService | null>(null)

  const paraQuemPhotos = useMemo(
    () =>
      paraQuem.photos && paraQuem.photos.length > 0
        ? paraQuem.photos
        : [paraQuem.photo],
    [paraQuem.photo, paraQuem.photos],
  )

  useEffect(() => {
    if (!openPhoto && !openService) return

    document.body.style.overflow = "hidden"
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPhoto(null)
        setOpenService(null)
      }
    }

    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [openPhoto, openService])

  return (
    <>
      {}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-grid-lines">
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ top: `${16 + i * 17}%` }} />
          ))}
        </div>
        <div className="container hero-content">
          <div className="eyebrow">
            <Link href="/" style={{ color: "#5E7F8C" }}>
              Início
            </Link>{" "}
            · {breadcrumb}
          </div>
          <h1>{hero.h1}</h1>
          <p className="lede">{hero.lede}</p>
          <div className="hero-ctas">
            <Link
              href="/diagnostico-visual"
              className="btn btn-primary btn-arrow"
            >
              Falar sobre o projeto
            </Link>
            <a href="https://wa.me/5511950747192" className="btn btn-outline">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {}
      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal
              className={`split-gallery split-gallery-${Math.min(paraQuemPhotos.length, 3)}`}
            >
              {paraQuemPhotos.slice(0, 4).map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  className={`image-trigger split-gallery-item${
                    index === 0 ? " is-primary" : ""
                  }`}
                  onClick={() => setOpenPhoto(photo)}
                  aria-label={`Abrir imagem: ${photo.alt}`}
                >
                  {}
                  <img
                    src={resolvePhotoSrc(photo.src)}
                    alt={photo.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </button>
              ))}
            </Reveal>
            <Reveal>
              <div className="eyebrow">Para quem é</div>
              <h2
                style={{
                  fontSize: "clamp(26px,3.4vw,40px)",
                  fontWeight: 800,
                  lineHeight: 1.14,
                  letterSpacing: "-0.01em",
                  margin: "14px 0 18px",
                }}
              >
                {paraQuem.h2}
              </h2>
              <p className="lede">{paraQuem.lede}</p>
              <ul className="bullets">
                {paraQuem.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {}
      <section className="section on-light">
        <div className="container">
          <Reveal className="grid-cells grid-cells-2">
            <div className="cell">
              <div className="eyebrow">O problema</div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  textTransform: "none",
                  margin: "14px 0",
                  color: "#050A0D",
                }}
              >
                {problemaSolucao.problema.title}
              </h3>
              <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7 }}>
                {problemaSolucao.problema.desc}
              </p>
            </div>
            <div className="cell">
              <div className="eyebrow">Como resolvemos</div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  textTransform: "none",
                  margin: "14px 0",
                  color: "#050A0D",
                }}
              >
                {problemaSolucao.solucao.title}
              </h3>
              <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7 }}>
                {problemaSolucao.solucao.desc}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {}
      <section className="section on-light">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Serviços inclusos</div>
            <h2>{servicos.sectionTitle}</h2>
          </Reveal>
          <Reveal className="grid-cells grid-cells-3">
            {servicos.items.map((s) => (
              <button
                key={s.num}
                type="button"
                className="cell service-cell"
                onClick={() => setOpenService(s)}
                aria-label={`Abrir explicação do serviço: ${s.title}`}
              >
                <div className="num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="service-more">Entender serviço</span>
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {}
      <section className="section on-off">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Portfólio relacionado</div>
            <h2>{portfolio.h2}</h2>
            <p className="lede">{portfolio.lede}</p>
          </Reveal>
          <Reveal className="related-photo-grid">
            {portfolio.photos.map((ph) => (
              <button
                key={ph.src}
                type="button"
                className="image-trigger related-photo"
                onClick={() => setOpenPhoto(ph)}
                aria-label={`Abrir imagem: ${ph.alt}`}
              >
                {}
                <img
                  src={resolvePhotoSrc(ph.src)}
                  alt={ph.alt}
                  loading="lazy"
                />
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {}
      <section id="processo" className="section on-light">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Processo de trabalho</div>
            <h2>{processo.h2}</h2>
          </Reveal>
          <Reveal className="steps">
            {processo.steps.map((s) => (
              <div key={s.num} className="step">
                <div className="n">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {}
      <section className="section cta-band">
        <div className="glow" />
        <Reveal className="container cta-band-inner">
          <div className="eyebrow">{cta.eyebrow}</div>
          <h2>{cta.h2}</h2>
          <p className="lede">{cta.lede}</p>
          <div className="hero-ctas">
            <Link
              href="/diagnostico-visual"
              className="btn btn-light btn-arrow"
            >
              Falar sobre o projeto
            </Link>
            <a href="https://wa.me/5511950747192" className="btn btn-outline">
              WhatsApp direto
            </a>
          </div>
        </Reveal>
      </section>

      {}
      <section className="section on-off">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal className="section-head">
            <div className="eyebrow">Dúvidas comuns</div>
            <h2>{faq.h2}</h2>
          </Reveal>
          <Reveal>
            <FaqAccordion items={faq.items} />
          </Reveal>
        </div>
      </section>

      {openPhoto && (
        <div
          className="media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={openPhoto.alt}
          onClick={() => setOpenPhoto(null)}
        >
          <button
            className="modal-close"
            type="button"
            onClick={() => setOpenPhoto(null)}
          >
            Fechar
          </button>
          <figure
            className="media-lightbox-inner"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="media-lightbox-image">
              <Image
                src={resolvePhotoSrc(openPhoto.src)}
                alt={openPhoto.alt}
                fill
                style={{ objectFit: "contain" }}
                sizes="100vw"
              />
            </div>
            <figcaption>{openPhoto.alt}</figcaption>
          </figure>
        </div>
      )}

      {openService && (
        <div
          className="service-modal"
          role="dialog"
          aria-modal="true"
          aria-label={openService.title}
          onClick={() => setOpenService(null)}
        >
          <div
            className="service-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close modal-close-card"
              type="button"
              onClick={() => setOpenService(null)}
            >
              Fechar
            </button>
            <div className="eyebrow">Serviço {openService.num}</div>
            <h3>{openService.title}</h3>
            <p>{openService.desc}</p>
            <p>
              Cada serviço tem função específica dentro da produção. Não
              trabalhamos com cliques soltos — cada entrega faz parte de uma
              operação com briefing, execução e curadoria.
            </p>
            <div className="service-modal-actions">
              <Link
                href="/diagnostico-visual"
                className="btn btn-primary btn-arrow"
              >
                Solicitar diagnóstico
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
