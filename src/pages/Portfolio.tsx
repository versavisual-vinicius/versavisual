import { useSeo, SITE_URL, breadcrumb } from "../lib/seo"
import PortfolioGrid from "../components/PortfolioGrid"
import CTASection from "../components/CTASection"

export default function Portfolio() {
  useSeo({
    title: "Portfólio — Fotografia, Vídeo e Direção Visual | VERSAVISUAL",
    description:
      "Cases de fotografia, vídeo, ativações, campanhas, videoclipes, casamentos e mais. Filtre o portfólio da VERSAVISUAL por segmento.",
    path: "/portfolio",
    jsonLd: breadcrumb([
      { name: "Início", path: "/" },
      { name: "Portfólio", path: "/portfolio" },
    ]),
  })

  return (
    <>
      <section className="border-b border-line bg-surface pt-[72px]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 lg:px-10 lg:py-24">
          <p className="u-eyebrow">Portfólio</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl leading-[1.0] text-ink sm:text-5xl lg:text-6xl">
            O trabalho fala. Cada segmento tem a sua linguagem.
          </h1>
          <p className="mt-5 max-w-xl text-navy">
            Uma seleção de cases autorais em fotografia, vídeo, ativações,
            campanhas e projetos pessoais. Filtre por segmento e abra os cases
            para ver a história completa.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-14 lg:px-10 lg:py-20">
        <PortfolioGrid />
      </section>

      <CTASection
        title="Viu algo com a linguagem certa para você?"
        text="Comece pelo diagnóstico visual: contamos qual formato, direção e produção fazem sentido para o seu objetivo."
      />
    </>
  )
}
