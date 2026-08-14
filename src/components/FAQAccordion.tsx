import { useState } from "react"
import type { Faq } from "../data/site"

export default function FAQAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 ease-out hover:text-teal"
            >
              <span className="text-lg font-medium text-ink">{it.q}</span>
              <span
                aria-hidden
                className={`shrink-0 rounded-full border border-line p-1 text-teal transition-all duration-300 ease-out ${
                  isOpen ? "rotate-45 border-teal bg-teal/10" : ""
                }`}
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
            </button>
            <div
              className="overflow-hidden transition-all duration-500 ease-out"
              style={{
                maxHeight: isOpen ? "600px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className="max-w-2xl text-pretty pb-6 text-navy">{it.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
