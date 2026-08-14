"use client"

import { useEffect, useRef } from "react"

export default function HeroGridLines() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spans = containerRef.current?.querySelectorAll("span")
    if (!spans) return

    spans.forEach((s, i) => {
      const el = s as HTMLElement
      el.style.top = `${16 + i * 17}%`
      el.style.opacity = "0"
      el.style.transform = "scaleX(0.4)"
      el.style.transformOrigin = "left"
      el.style.transition =
        "opacity 1.4s ease, transform 1.8s cubic-bezier(0.25,0.46,0.45,0.94)"

      const timer = setTimeout(
        () => {
          el.style.opacity = "1"
          el.style.transform = "scaleX(1)"
        },
        250 + i * 160,
      )

      return () => clearTimeout(timer)
    })
  }, [])

  return (
    <div className="hero-grid-lines" ref={containerRef}>
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}
