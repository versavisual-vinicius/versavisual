import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  PORTFOLIO,
  PORTFOLIO_FILTERS,
  matchesFilter,
  portfolioImageAlt,
} from "../data/site"
import { img } from "../lib/images"

export default function PortfolioGrid({
  initial = "Todos",
}: {
  initial?: string
}) {
  const [filter, setFilter] = useState(initial)
  const items = useMemo(
    () => PORTFOLIO.filter((p) => matchesFilter(p, filter)),
    [filter],
  )
  const featuredVideo = items.find((it) => it.video)

  return (
    <div>
      <div
        className="mb-10 flex items-center gap-5 overflow-x-auto border-b border-off/15 pb-3 scrollbar-none sm:flex-wrap"
        role="tablist"
        aria-label="Filtrar portfólio"
      >
        {PORTFOLIO_FILTERS.map((f) => {
          const on = f === filter
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap border-b pb-1 text-sm transition-colors duration-200 ${
                on
                  ? "border-teal font-medium text-off"
                  : "border-transparent text-mist hover:border-teal hover:text-off"
              }`}
            >
              {f}
            </button>
          )
        })}
      </div>

      {filter === "Artistas & Videoclipes" && featuredVideo?.video && (
        <div className="mb-10 overflow-hidden border-y border-off/10 bg-navy">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="aspect-video w-full object-cover"
          >
            <source src={featuredVideo.video} type="video/mp4" />
          </video>
        </div>
      )}

      <div
        key={filter}
        className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 u-fade-in"
      >
        {items.map((it, idx) => {
          const isAboveFold = idx < 3
          const inner = (
            <>
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <img
                  src={img(it.photo, 800, 1000)}
                  alt={portfolioImageAlt(it)}
                  width={800}
                  height={1000}
                  loading={isAboveFold ? "eager" : "lazy"}
                  decoding="async"
                  {...(idx === 0 ? { fetchPriority: "high" as const } : {})}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>
              <div className="pt-3">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-teal-400">
                  {it.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-tight text-off">
                  {it.title}
                </h3>
                <p className="mt-1 text-sm text-mist">{it.city}</p>
              </div>
            </>
          )
          const cls = "group block h-full w-full"
          return it.caseSlug ? (
            <Link
              key={it.title}
              to={`/portfolio/${it.caseSlug}`}
              viewTransition
              className={cls}
            >
              {inner}
            </Link>
          ) : (
            <article key={it.title} className={cls}>
              {inner}
            </article>
          )
        })}
      </div>
    </div>
  )
}
