import { ChevronDown } from "lucide-react"
import type { Service, ServiceGroup } from "../data/site"

type ServiceGridProps = {
  items: Service[]
  mobileGroups?: readonly ServiceGroup[]
}

export default function ServiceGrid({ items, mobileGroups }: ServiceGridProps) {
  return (
    <>
      {mobileGroups && (
        <div className="border-y border-line bg-off sm:hidden">
          {mobileGroups.map((group, idx) => (
            <details
              key={group.title}
              className="group border-b border-line last:border-b-0 transition-colors"
            >
              <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 text-ink marker:content-none select-none active:bg-line/20">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 text-xs font-mono font-medium text-teal">
                    0{idx + 1}
                  </span>
                  <span className="font-semibold text-sm leading-snug">{group.title}</span>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-navy/70">
                  <span>{group.items.length} itens</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 text-navy transition-transform duration-200 group-open:rotate-180"
                  />
                </span>
              </summary>
              <ol className="list-decimal space-y-2.5 px-9 pb-5 pt-1 text-sm leading-relaxed text-navy">
                {group.items.map((item) => (
                  <li key={item} className="pl-1">{item}</li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      )}

      <div
        className={`${
          mobileGroups ? "hidden sm:grid" : "grid"
        } gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3`}
      >
        {items.map((s) => (
          <div
            key={s.n}
            className="group relative flex h-full flex-col justify-between bg-off p-7 transition-colors duration-300 ease-out hover:bg-surface lg:p-8"
          >
            <div>
              <span className="text-sm font-medium text-navy">{s.n}</span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy">{s.desc}</p>
            </div>
            <span className="mt-4 block h-px w-full scale-x-0 bg-teal transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </>
  )
}
