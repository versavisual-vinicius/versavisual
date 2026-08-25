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
          {mobileGroups.map((group) => (
            <details
              key={group.title}
              className="group border-b border-line last:border-b-0"
            >
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-ink marker:content-none">
                <span className="font-semibold">{group.title}</span>
                <span className="flex items-center gap-2 text-sm text-navy">
                  {group.items.length} serviços
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform group-open:rotate-180"
                  />
                </span>
              </summary>
              <ol className="list-decimal space-y-2 px-10 pb-5 text-sm leading-relaxed text-navy">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
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
