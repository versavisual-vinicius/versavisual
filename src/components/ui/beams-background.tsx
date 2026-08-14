import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"
import { useEffect, useRef } from "react"

function cn(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ")
}

type BeamIntensity = "subtle" | "medium" | "strong"

interface BeamsBackgroundProps {
  className?: string
  children?: ReactNode
  intensity?: BeamIntensity
}

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

const opacityMap: Record<BeamIntensity, number> = {
  subtle: 0.75,
  medium: 1,
  strong: 1.25,
}

function createBeam(width: number, height: number): Beam {
  return {
    x: Math.random() * width * 1.4 - width * 0.2,
    y: Math.random() * height * 1.4 - height * 0.2,
    width: 80 + Math.random() * 120,
    length: height * 1.9,
    angle: -31 + Math.random() * 8,
    speed: 0.22 + Math.random() * 0.36,
    opacity: 0.14 + Math.random() * 0.12,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.012 + Math.random() * 0.018,
  }
}

export function BeamsBackground({
  className,
  children,
  intensity = "medium",
}: BeamsBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = root.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const totalBeams = Math.max(8, Math.round(width / 140))
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(width, height),
      )
    }

    const resetBeam = (beam: Beam, index: number, totalBeams: number) => {
      const rect = root.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      const column = index % 4
      const spacing = width / 4

      beam.y = height + 90
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.6
      beam.width = 90 + Math.random() * 120
      beam.length = height * 1.9
      beam.speed = 0.2 + Math.random() * 0.32
      beam.opacity = 0.14 + Math.random() * 0.12

      return totalBeams
    }

    const drawBeam = (beam: Beam) => {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const pulsingOpacity =
        beam.opacity *
        (0.82 + Math.sin(beam.pulse) * 0.18) *
        opacityMap[intensity]

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)
      gradient.addColorStop(0, "rgba(94, 127, 140, 0)")
      gradient.addColorStop(0.16, `rgba(164, 184, 191, ${pulsingOpacity})`)
      gradient.addColorStop(0.46, `rgba(94, 127, 140, ${pulsingOpacity})`)
      gradient.addColorStop(0.74, `rgba(37, 53, 64, ${pulsingOpacity * 0.8})`)
      gradient.addColorStop(1, "rgba(5, 10, 13, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    const paintStatic = () => {
      const rect = root.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.filter = "blur(28px)"
      beamsRef.current.slice(0, 8).forEach(drawBeam)
      ctx.filter = "none"
    }

    const animate = () => {
      const rect = root.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.filter = "blur(30px)"

      const totalBeams = beamsRef.current.length
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed

        if (beam.y + beam.length < -80) {
          resetBeam(beam, index, totalBeams)
        }

        drawBeam(beam)
      })

      ctx.filter = "none"
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)

    if (shouldReduceMotion) {
      paintStatic()
    } else {
      animate()
    }

    return () => {
      resizeObserver.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [intensity, shouldReduceMotion])

  return (
    <div
      ref={rootRef}
      className={cn(
        className || "relative min-h-screen w-full",
        "overflow-hidden bg-ink",
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-0 bg-ink/0"
        animate={
          shouldReduceMotion
            ? { opacity: 0.08 }
            : { opacity: [0.06, 0.14, 0.06] }
        }
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{
          backdropFilter: "blur(28px)",
        }}
        aria-hidden="true"
      />

      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}
