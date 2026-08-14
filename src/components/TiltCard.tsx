import {
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
  style?: CSSProperties
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  glare = true,
  style,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5 })

  const applyTilt = () => {
    rafRef.current = null
    const card = cardRef.current
    if (!card) return

    const { x, y } = pointerRef.current
    const rotX = ((0.5 - y) * maxTilt).toFixed(2)
    const rotY = ((x - 0.5) * maxTilt).toFixed(2)

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0.14"
      glareRef.current.style.setProperty("--glare-x", `${x * 100}%`)
      glareRef.current.style.setProperty("--glare-y", `${y * 100}%`)
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const rect = card.getBoundingClientRect()
    pointerRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(applyTilt)
    }
  }

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    cardRef.current.style.transition = "transform 120ms ease-out"
  }

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (cardRef.current) {
      cardRef.current.style.transition =
        "transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1)"
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0"
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-150"
          style={
            {
              "--glare-x": "50%",
              "--glare-y": "50%",
              background:
                "radial-gradient(circle 320px at var(--glare-x) var(--glare-y), rgba(255, 255, 255, 0.4), transparent 80%)",
            } as CSSProperties
          }
          aria-hidden="true"
        />
      )}
    </div>
  )
}
