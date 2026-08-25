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
        <div className="space-y-2.5 sm:hidden">
          {mobileGroups.map((group, idx) => (
            <details
              key={group.title}
              className="group border border-line bg-off transition-all open:border-teal/40 open:shadow-xs"
            >
              <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 px-4.5 py-4 text-ink marker:content-none select-none active:bg-line/20">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 font-mono text-xs font-semibold text-teal">
                    0{idx + 1}
                  </span>
                  <span className="font-semibold text-base leading-snug">
                    {group.title}
                  </span>
                </div>
                <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-navy/70">
                  <span className="rounded-full bg-navy/5 px-2 py-0.5 text-[0.7rem]">
                    {group.items.length} entregas
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 text-navy transition-transform duration-200 group-open:rotate-180 group-open:text-teal"
                  />
                </span>
              </summary>
              <div className="border-t border-line/60 bg-surface/30 px-5 py-4">
                <ul className="space-y-2.5 text-sm leading-relaxed text-navy">
                  {group.items.map((item, itemIdx) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      <span className="font-medium text-ink/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
