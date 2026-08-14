import { useEffect, useRef, useState, type CSSProperties } from "react"

interface ParallaxOptions {
  speed?: number // -0.2 (slower/counter) to 0.2 (faster)
  disabled?: boolean
}

export function useParallax({
  speed = 0.08,
  disabled = false,
}: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    if (disabled || typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let rafId: number

    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Only calculate if visible within or near viewport
      if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
        const centerOffset = rect.top + rect.height / 2 - windowHeight / 2
        setOffsetY(centerOffset * speed)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScroll)
    }

    handleScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [speed, disabled])

  const style: CSSProperties = {
    transform: `translate3d(0, ${offsetY.toFixed(2)}px, 0)`,
    willChange: "transform",
    transition: "transform 0.1s linear",
  }

  return { ref, style }
}
