import type { Service } from "../data/site"
import TiltCard from "./TiltCard"

export default function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <TiltCard
          key={s.n}
          maxTilt={5}
          className="group relative flex h-full flex-col justify-between bg-off p-7 transition-colors duration-300 ease-out hover:bg-surface lg:p-8"
        >
          <div>
            <span className="u-display text-sm font-semibold text-navy">
              {s.n}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy">{s.desc}</p>
          </div>
          <span className="mt-4 block h-px w-full scale-x-0 bg-teal transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </TiltCard>
      ))}
    </div>
  )
}
