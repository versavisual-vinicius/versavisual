import type { Service } from "../data/site";

export default function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <div
          key={s.n}
          className="group relative bg-off p-7 transition-colors duration-300 ease-out hover:bg-surface lg:p-9"
        >
          <span className="u-display text-sm text-teal-400/70">{s.n}</span>
          <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-navy">{s.desc}</p>
          <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-teal transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </div>
      ))}
    </div>
  );
}
