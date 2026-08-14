import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { PORTFOLIO, PORTFOLIO_FILTERS, matchesFilter } from "../data/site"
import { img } from "../lib/images"
import TiltCard from "./TiltCard"

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

  return (
    <div>
      <div
        className="mb-9 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:pb-0"
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
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                on
                  ? "border-teal bg-teal font-medium text-ink shadow-xs"
                  : "border-line-strong text-navy hover:border-teal hover:text-ink"
              }`}
            >
              {f}
            </button>
          )
        })}
      </div>

      <div
        key={filter}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 u-fade-in"
      >
        {items.map((it, idx) => {
          const isAboveFold = idx < 3
          const inner = (
            <>
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <img
                  src={img(it.photo, 800, 1000)}
                  alt=""
                  width={800}
                  height={1000}
                  loading={isAboveFold ? "eager" : "lazy"}
                  decoding="async"
                  {...(idx === 0 ? { fetchPriority: "high" as const } : {})}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="u-grade absolute inset-0" />
                <span className="u-eyebrow absolute left-4 top-4 text-teal-400">
                  {it.category}
                </span>
                {it.caseSlug && (
                  <span className="absolute bottom-4 right-4 rounded-full border border-off/40 bg-ink/40 px-3 py-1 text-xs text-off opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    Ver case →
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-semibold leading-tight text-off">
                  {it.title}
                </h3>
                <p className="mt-1 text-sm text-mist">{it.city}</p>
              </div>
            </>
          )
          const cls =
            "group relative flex h-full w-full flex-col overflow-hidden rounded-sm border border-line"
          return (
            <TiltCard key={it.title} className="rounded-sm">
              {it.caseSlug ? (
                <Link
                  to={`/portfolio/${it.caseSlug}`}
                  viewTransition
                  className={cls}
                >
                  {inner}
                </Link>
              ) : (
                <article className={cls}>{inner}</article>
              )}
            </TiltCard>
          )
        })}
      </div>
    </div>
  )
}
