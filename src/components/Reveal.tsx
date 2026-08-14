import { useEffect, useRef, ReactNode, ElementType } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  as?: ElementType
  style?: React.CSSProperties
}

export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReduced) {
      el.classList.add("in")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} data-reveal className={className} style={style}>
      {children}
    </Tag>
  )
}
