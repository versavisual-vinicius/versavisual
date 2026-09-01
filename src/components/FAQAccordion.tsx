import type { Faq } from "../data/site"

export default function FAQAccordion({
  items,
  tone = "light",
}: {
  items: Faq[]
  tone?: "light" | "dark"
}) {
  const isDark = tone === "dark"
  return (
    <div
      className={`divide-y border-y ${
        isDark ? "divide-off/15 border-off/15" : "divide-line border-line"
      }`}
    >
      {items.map((it, i) => (
        <details key={i} name="versavisual-faq" className="group">
          <summary
            className={`flex min-h-[44px] w-full cursor-pointer list-none items-center justify-between gap-6 py-5 text-left transition-colors duration-200 ease-out hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal [&::-webkit-details-marker]:hidden ${
              isDark ? "text-off" : "text-ink"
            }`}
          >
            <span className="text-lg font-medium">{it.q}</span>
            <span
              aria-hidden="true"
              className={`shrink-0 rounded-full border p-1 text-teal transition-all duration-300 ease-out ${
                isDark ? "border-off/15" : "border-line"
              } group-open:rotate-45 group-open:border-teal group-open:bg-teal/10`}
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
          </summary>
          <div className="pb-6 pt-1 will-change-[block-size,opacity]">
            <p
              className={`max-w-2xl text-pretty ${
                isDark ? "text-mist" : "text-navy"
              }`}
            >
              {it.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}
