import { useEffect, useRef, type ReactNode, type ElementType } from "react"

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

    // Immediate check if element is already in or near viewport
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 150) {
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
      { threshold: 0, rootMargin: "0px 0px 80px 0px" },
    )

    observer.observe(el)

    // Safety timeout to guarantee content becomes visible
    const timer = setTimeout(() => {
      if (el) el.classList.add("in")
    }, 400)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <Tag ref={ref} data-reveal className={className} style={style}>
      {children}
    </Tag>
  )
}
