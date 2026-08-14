import { Link } from "react-router-dom"
import { useSeo } from "../lib/seo"
import { SEGMENT_NAV } from "../data/site"

export default function NotFound() {
  useSeo({
    title: "Página não encontrada | VERSAVISUAL",
    description:
      "A página que você procura não existe. Volte para o início ou explore o portfólio.",
    path: "/404",
    noindex: true,
  })

  return (
    <section className="mx-auto flex min-h-[90svh] max-w-[820px] flex-col justify-center px-5 py-32 lg:px-10">
      <span className="u-display text-6xl text-teal/70 sm:text-8xl">404</span>
      <h1 className="mt-5 text-balance text-4xl leading-tight text-off sm:text-5xl">
        Essa cena saiu do enquadramento.
      </h1>
      <p className="mt-5 max-w-lg text-mist">
        A página que você procura não existe ou mudou de lugar. Vamos te
        reposicionar:
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-xs bg-teal px-6 py-3 font-medium text-ink transition-colors hover:bg-teal-400"
        >
          Ir para o início
        </Link>
        <Link
          to="/portfolio"
          className="rounded-xs border border-off/20 px-6 py-3 font-medium text-off transition-colors hover:border-teal"
        >
          Ver portfólio
        </Link>
        <Link
          to="/diagnostico-visual"
          className="rounded-xs border border-off/20 px-6 py-3 font-medium text-off transition-colors hover:border-teal"
        >
          Diagnóstico visual
        </Link>
      </div>

      <p className="u-eyebrow mb-4 mt-14 text-mist">Segmentos</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {SEGMENT_NAV.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="text-mist transition-colors hover:text-off"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
