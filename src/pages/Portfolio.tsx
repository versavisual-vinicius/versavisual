import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { LayoutGrid, Sparkles } from "lucide-react"
import { useSeo, breadcrumb, imageGallerySchema } from "../lib/seo"
import PortfolioGrid from "../components/PortfolioGrid"
import InfiniteCanvas from "../components/InfiniteCanvas"
import CTASection from "../components/CTASection"

type PortfolioProps = {
  initialView?: "grid" | "canvas"
}

export default function Portfolio({ initialView }: PortfolioProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const viewQuery = searchParams.get("view")

  const [viewMode, setViewMode] = useState<"grid" | "canvas">(
    initialView || (viewQuery === "canvas" ? "canvas" : "grid"),
  )

  useEffect(() => {
    if (viewQuery === "canvas" && viewMode !== "canvas") {
      setViewMode("canvas")
    } else if (viewQuery === "grid" && viewMode !== "grid") {
      setViewMode("grid")
    }
  }, [viewQuery, viewMode])

  const handleModeChange = (mode: "grid" | "canvas") => {
    setViewMode(mode)
    const newParams = new URLSearchParams(searchParams)
    if (mode === "canvas") {
      newParams.set("view", "canvas")
    } else {
      newParams.delete("view")
    }
    setSearchParams(newParams, { replace: true })
  }

  useSeo({
    title:
      viewMode === "canvas"
        ? "Galeria 360° — Infinite Canvas de Fotografia e Audiovisual | VERSAVISUAL"
        : "Portfólio — Fotografia, Vídeo e Direção Visual | VERSAVISUAL",
    description:
      "Cases de fotografia, vídeo, ativações, campanhas, videoclipes, casamentos e mais. Explore no Grid tradicional ou navegue no Canvas Infinito 360°.",
    path: viewMode === "canvas" ? "/portfolio?view=canvas" : "/portfolio",
    jsonLd: breadcrumb([
      { name: "Início", path: "/" },
      { name: "Portfólio", path: "/portfolio" },
    ]),
  })

  return (
    <>
      <section className="border-b border-off/10 bg-ink pt-[72px]">
        <div className="mx-auto max-w-[1320px] px-5 py-12 lg:px-10 lg:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="u-eyebrow text-mist">Portfólio & Acervo</p>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl leading-[1.04] text-off sm:text-5xl lg:text-5xl">
                O trabalho fala. Cada segmento tem a sua linguagem.
              </h1>
              <p className="mt-5 max-w-xl text-mist">
                Uma seleção de cases autorais em fotografia, vídeo, ativações,
                campanhas e projetos pessoais. Alterne entre o grid tradicional
                e o Canvas 360° para uma exploração não-linear do acervo.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 self-start md:self-end rounded-full border border-off/20 bg-navy/80 p-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={() => handleModeChange("grid")}
                className={`flex min-h-[38px] items-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-teal text-off shadow-md"
                    : "text-mist hover:text-off"
                }`}
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Grid</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange("canvas")}
                className={`flex min-h-[38px] items-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  viewMode === "canvas"
                    ? "bg-teal text-off shadow-md"
                    : "text-mist hover:text-off"
                }`}
                aria-pressed={viewMode === "canvas"}
              >
                <Sparkles className="h-4 w-4" />
                <span>Canvas 360°</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-10 lg:px-10 lg:py-16">
        {viewMode === "canvas" ? <InfiniteCanvas /> : <PortfolioGrid />}
      </section>

      <CTASection
        title="Viu algo com a linguagem certa para você?"
        text="Comece pelo diagnóstico visual: contamos qual formato, direção e produção fazem sentido para o seu objetivo."
      />
    </>
  )
}
