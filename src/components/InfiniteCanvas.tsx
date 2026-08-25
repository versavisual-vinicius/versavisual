import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  Maximize2,
  Minimize2,
  Move,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  X,
  ExternalLink,
  Play,
} from "lucide-react"
import { PORTFOLIO, type PortfolioItem, portfolioImageAlt } from "../data/site"
import { img } from "../lib/images"

interface CanvasNode {
  item: PortfolioItem
  x: number
  y: number
  width: number
  height: number
  aspectRatio: string
}

const WORLD_WIDTH = 3800
const WORLD_HEIGHT = 2800
const MIN_SCALE = 0.4
const MAX_SCALE = 1.6
const FRICTION = 0.93

export default function InfiniteCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const transformRef = useRef({
    x: 0,
    y: 0,
    scale: 0.85,
    targetScale: 0.85,
  })

  const isDraggingRef = useRef(false)
  const startPointerRef = useRef({ x: 0, y: 0 })
  const startTransformRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ vx: 0, vy: 0 })
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 })
  const hasMovedRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)

  const touchDistanceRef = useRef<number | null>(null)
  const touchCenterRef = useRef<{ x: number y: number } | null>(null)

  const [scaleDisplay, setScaleDisplay] = useState(85)
  const [viewportBounds, setViewportBounds] = useState({
    vw: 1000,
    vh: 800,
    vx: 0,
    vy: 0,
  })
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("Todos")
  const [showHint, setShowHint] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nodes: CanvasNode[] = useMemo(() => {
    const items = PORTFOLIO
    const count = items.length
    if (count === 0) return []

    const centerX = WORLD_WIDTH / 2
    const centerY = WORLD_HEIGHT / 2
    const generated: CanvasNode[] = []

    const aspectRatios = [
      "aspect-[4/5]",
      "aspect-[16/10]",
      "aspect-[3/4]",
      "aspect-[1/1]",
    ]
    const dimensions = [
      { w: 320, h: 400 },
      { w: 460, h: 288 },
      { w: 340, h: 453 },
      { w: 360, h: 360 },
    ]

    const rings = [
      { radius: 360, itemsInRing: 5, startAngle: 0 },
      { radius: 760, itemsInRing: 7, startAngle: 0.4 },
      { radius: 1180, itemsInRing: 8, startAngle: 0.2 },
    ]

    let itemIdx = 0
    for (let r = 0; r < rings.length && itemIdx < count; r++) {
      const ring = rings[r]
      const step = (Math.PI * 2) / ring.itemsInRing

      for (let i = 0; i < ring.itemsInRing && itemIdx < count; i++) {
        const item = items[itemIdx]
        const angle = ring.startAngle + i * step
        const jitterR = (itemIdx % 3) * 35 - 35
        const currentRadius = ring.radius + jitterR

        const dimIdx = item.video ? 1 : itemIdx % dimensions.length
        const dim = dimensions[dimIdx]
        const aspect = aspectRatios[dimIdx]

        const x = centerX + Math.cos(angle) * currentRadius - dim.w / 2
        const y = centerY + Math.sin(angle) * currentRadius - dim.h / 2

        generated.push({
          item,
          x: Math.round(x),
          y: Math.round(y),
          width: dim.w,
          height: dim.h,
          aspectRatio: aspect,
        })

        itemIdx++
      }
    }

    return generated
  }, [])

  const categories = useMemo(() => {
    const set = new Set<string>()
    PORTFOLIO.forEach((it) => set.add(it.category))
    return ["Todos", ...Array.from(set)]
  }, [])

  const applyTransform = useCallback(() => {
    if (!contentRef.current || !containerRef.current) return
    const { x, y, scale } = transformRef.current
    contentRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`

    const containerRect = containerRef.current.getBoundingClientRect()
    setViewportBounds({
      vw: containerRect.width,
      vh: containerRect.height,
      vx: -x / scale,
      vy: -y / scale,
    })
    setScaleDisplay(Math.round(scale * 100))
  }, [])

  const centerCanvas = useCallback(
    (customScale?: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scale = customScale ?? (rect.width < 768 ? 0.65 : 0.85)

      const initialX = rect.width / 2 - (WORLD_WIDTH * scale) / 2
      const initialY = rect.height / 2 - (WORLD_HEIGHT * scale) / 2

      transformRef.current.x = initialX
      transformRef.current.y = initialY
      transformRef.current.scale = scale
      transformRef.current.targetScale = scale
      velocityRef.current = { vx: 0, vy: 0 }

      applyTransform()
    },
    [applyTransform],
  )

  useEffect(() => {
    let active = true

    const loop = () => {
      if (!active) return

      if (!isDraggingRef.current) {
        const { vx, vy } = velocityRef.current

        const scaleDiff =
          transformRef.current.targetScale - transformRef.current.scale
        if (Math.abs(scaleDiff) > 0.001) {
          transformRef.current.scale += scaleDiff * 0.15
        }

        if (Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) {
          transformRef.current.x += vx
          transformRef.current.y += vy
          velocityRef.current.vx *= FRICTION
          velocityRef.current.vy *= FRICTION
          applyTransform()
        }
      }

      rafIdRef.current = requestAnimationFrame(loop)
    }

    rafIdRef.current = requestAnimationFrame(loop)

    return () => {
      active = false
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [applyTransform])

  useEffect(() => {
    centerCanvas()
    const handleResize = () => applyTransform()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [centerCanvas, applyTransform])

  const zoomAtPoint = useCallback(
    (factor: number, clientX?: number, clientY?: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const originX =
        clientX !== undefined ? clientX - rect.left : rect.width / 2
      const originY =
        clientY !== undefined ? clientY - rect.top : rect.height / 2

      const currentScale = transformRef.current.scale
      const newScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, currentScale * factor),
      )

      if (newScale === currentScale) return

      const scaleRatio = newScale / currentScale
      const newX = originX - (originX - transformRef.current.x) * scaleRatio
      const newY = originY - (originY - transformRef.current.y) * scaleRatio

      transformRef.current.x = newX
      transformRef.current.y = newY
      transformRef.current.scale = newScale
      transformRef.current.targetScale = newScale
      velocityRef.current = { vx: 0, vy: 0 }

      applyTransform()
    },
    [applyTransform],
  )

  const focusNode = useCallback(
    (node: CanvasNode) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scale = transformRef.current.scale
      const nodeCenterX = node.x + node.width / 2
      const nodeCenterY = node.y + node.height / 2

      transformRef.current.x = rect.width / 2 - nodeCenterX * scale
      transformRef.current.y = rect.height / 2 - nodeCenterY * scale
      velocityRef.current = { vx: 0, vy: 0 }
      applyTransform()
    },
    [applyTransform],
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    startPointerRef.current = { x: e.clientX, y: e.clientY }
    startTransformRef.current = {
      x: transformRef.current.x,
      y: transformRef.current.y,
    }
    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    }
    velocityRef.current = { vx: 0, vy: 0 }

    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing"
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return

    const dx = e.clientX - startPointerRef.current.x
    const dy = e.clientY - startPointerRef.current.y

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedRef.current = true
      if (showHint) setShowHint(false)
    }

    const now = performance.now()
    const dt = Math.max(1, now - lastPointerRef.current.time)
    const instVx = (e.clientX - lastPointerRef.current.x) / (dt / 16)
    const instVy = (e.clientY - lastPointerRef.current.y) / (dt / 16)

    velocityRef.current = {
      vx: instVx * 0.7 + velocityRef.current.vx * 0.3,
      vy: instVy * 0.7 + velocityRef.current.vy * 0.3,
    }

    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: now }

    transformRef.current.x = startTransformRef.current.x + dx
    transformRef.current.y = startTransformRef.current.y + dy
    applyTransform()
  }

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab"
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92
    zoomAtPoint(zoomFactor, e.clientX, e.clientY)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      isDraggingRef.current = true
      hasMovedRef.current = false
      startPointerRef.current = { x: touch.clientX, y: touch.clientY }
      startTransformRef.current = {
        x: transformRef.current.x,
        y: transformRef.current.y,
      }
      lastPointerRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: performance.now(),
      }
      velocityRef.current = { vx: 0, vy: 0 }
      touchDistanceRef.current = null
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false
      const t1 = e.touches[0]
      const t2 = e.touches[1]
      touchDistanceRef.current = Math.hypot(
        t2.clientX - t1.clientX,
        t2.clientY - t1.clientY,
      )
      touchCenterRef.current = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const touch = e.touches[0]
      const dx = touch.clientX - startPointerRef.current.x
      const dy = touch.clientY - startPointerRef.current.y

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMovedRef.current = true
        if (showHint) setShowHint(false)
      }

      const now = performance.now()
      const dt = Math.max(1, now - lastPointerRef.current.time)
      const instVx = (touch.clientX - lastPointerRef.current.x) / (dt / 16)
      const instVy = (touch.clientY - lastPointerRef.current.y) / (dt / 16)

      velocityRef.current = {
        vx: instVx * 0.7 + velocityRef.current.vx * 0.3,
        vy: instVy * 0.7 + velocityRef.current.vy * 0.3,
      }

      lastPointerRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: now,
      }

      transformRef.current.x = startTransformRef.current.x + dx
      transformRef.current.y = startTransformRef.current.y + dy
      applyTransform()
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const t1 = e.touches[0]
      const t2 = e.touches[1]
      const newDist = Math.hypot(
        t2.clientX - t1.clientX,
        t2.clientY - t1.clientY,
      )
      const factor = newDist / touchDistanceRef.current

      if (touchCenterRef.current) {
        zoomAtPoint(factor, touchCenterRef.current.x, touchCenterRef.current.y)
      }

      touchDistanceRef.current = newDist
    }
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false
    touchDistanceRef.current = null
    touchCenterRef.current = null
  }

  const handleCardClick = (item: PortfolioItem) => {
    if (!hasMovedRef.current) {
      setActiveItem(item)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
    setTimeout(() => applyTransform(), 100)
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-ink select-none ${
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen"
          : "h-[74vh] min-h-[580px] rounded-sm border border-off/15 shadow-2xl"
      }`}
    >
      {/* 1. Header Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-full border border-off/15 bg-ink/80 p-1.5 backdrop-blur-md pointer-events-auto scrollbar-none max-w-full">
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <Sparkles className="h-3.5 w-3.5" />
            360°
          </span>
          {categories.map((cat) => {
            const active = filterCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 whitespace-nowrap min-h-[32px] ${
                  active
                    ? "bg-teal text-off shadow-md"
                    : "text-mist hover:bg-off/10 hover:text-off"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-off/15 bg-ink/80 text-off backdrop-blur-md transition-colors hover:bg-off/20"
            title={
              isFullscreen ? "Sair da Tela Cheia" : "Expandir em Tela Cheia"
            }
            aria-label={
              isFullscreen ? "Sair da Tela Cheia" : "Expandir em Tela Cheia"
            }
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Interactive Infinite Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="h-full w-full cursor-grab active:cursor-grabbing overflow-hidden touch-none relative"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(94, 127, 140, 0.08) 0%, transparent 80%),
            radial-gradient(rgba(164, 184, 191, 0.06) 1px, transparent 0)
          `,
          backgroundSize: "100% 100%, 32px 32px",
        }}
      >
        <div
          ref={contentRef}
          className="absolute will-change-transform origin-top-left"
          style={{
            width: WORLD_WIDTH,
            height: WORLD_HEIGHT,
            transform: `translate3d(${transformRef.current.x}px, ${transformRef.current.y}px, 0) scale(${transformRef.current.scale})`,
          }}
        >
          <div
            className="absolute -inset-40 rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(94, 127, 140, 0.15), rgba(5, 10, 13, 0.8) 70%)",
            }}
          />

          {nodes.map((node) => {
            const isMatch =
              filterCategory === "Todos" ||
              node.item.category === filterCategory
            const opacityClass = isMatch
              ? "opacity-100 scale-100"
              : "opacity-25 grayscale scale-95 pointer-events-none"

            return (
              <div
                key={node.item.title + node.x}
                onClick={() => handleCardClick(node.item)}
                className={`absolute group cursor-pointer transition-all duration-300 ${opacityClass}`}
                style={{
                  left: node.x,
                  top: node.y,
                  width: node.width,
                  height: node.height,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-sm border border-off/15 bg-navy/90 p-2 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:border-teal group-hover:shadow-teal/20 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="relative h-full w-full overflow-hidden rounded-xs bg-ink">
                    <img
                      src={img(node.item.photo, 900)}
                      alt={portfolioImageAlt(node.item)}
                      width={900}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      draggable={false}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                    {node.item.video && (
                      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-teal-400 border border-teal/40 backdrop-blur-md">
                        <Play className="h-3 w-3 fill-current" />
                        VÍDEO
                      </span>
                    )}

                    <div className="absolute bottom-0 inset-x-0 p-4 transition-transform duration-300">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-teal-400">
                        {node.item.category}
                      </p>
                      <h4 className="mt-1 text-base font-semibold leading-snug text-off">
                        {node.item.title}
                      </h4>
                      <p className="mt-1 text-xs text-mist">{node.item.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Onboarding Gesture Hint */}
      {showHint && (
        <div className="pointer-events-none absolute bottom-6 inset-x-0 flex justify-center z-20 transition-opacity duration-500 animate-pulse">
          <div className="flex items-center gap-2 rounded-full border border-off/20 bg-ink/90 px-4 py-2 text-xs font-medium text-off shadow-2xl backdrop-blur-md">
            <Move className="h-4 w-4 text-teal-400" />
            <span>Arraste para explorar · Scroll/Pinch para zoom</span>
          </div>
        </div>
      )}

      {/* 4. Floating HUD: Zoom Controls & Recenter */}
      <div className="absolute bottom-5 left-5 z-30 flex items-center gap-1.5 rounded-full border border-off/15 bg-ink/90 p-1.5 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => zoomAtPoint(1.2)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-off transition-colors hover:bg-off/15"
          title="Zoom In (+)"
          aria-label="Aproximar visualização"
        >
          <Plus className="h-4 w-4" />
        </button>

        <span className="px-2 text-xs font-mono text-mist">
          {scaleDisplay}%
        </span>

        <button
          type="button"
          onClick={() => zoomAtPoint(0.83)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-off transition-colors hover:bg-off/15"
          title="Zoom Out (-)"
          aria-label="Afastar visualização"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-off/20 my-auto" />

        <button
          type="button"
          onClick={() => centerCanvas(0.85)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-off transition-colors hover:bg-off/15"
          title="Centralizar Acervo"
          aria-label="Centralizar acervo na tela"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 5. Minimap HUD Radar */}
      <div className="hidden sm:block absolute bottom-5 right-5 z-30 overflow-hidden rounded-md border border-off/20 bg-ink/90 p-2 shadow-2xl backdrop-blur-md">
        <div className="relative h-24 w-32 overflow-hidden rounded-xs border border-off/10 bg-navy/60">
          {nodes.map((node, idx) => {
            const isMatch =
              filterCategory === "Todos" ||
              node.item.category === filterCategory
            const leftPct = (node.x / WORLD_WIDTH) * 100
            const topPct = (node.y / WORLD_HEIGHT) * 100
            return (
              <div
                key={idx}
                onClick={() => focusNode(node)}
                className={`absolute h-1.5 w-2 -translate-x-1/2 -translate-y-1/2 rounded-[1px] transition-colors cursor-pointer ${
                  isMatch ? "bg-teal-400 hover:bg-off" : "bg-off/15"
                }`}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                title={node.item.title}
              />
            )
          })}

          <div
            className="absolute pointer-events-none rounded-[1px] border border-off bg-teal/20"
            style={{
              left: `${Math.max(0, Math.min(100, (viewportBounds.vx / WORLD_WIDTH) * 100))}%`,
              top: `${Math.max(0, Math.min(100, (viewportBounds.vy / WORLD_HEIGHT) * 100))}%`,
              width: `${Math.max(4, Math.min(100, (viewportBounds.vw / transformRef.current.scale / WORLD_WIDTH) * 100))}%`,
              height: `${Math.max(4, Math.min(100, (viewportBounds.vh / transformRef.current.scale / WORLD_HEIGHT) * 100))}%`,
            }}
          />
        </div>
      </div>

      {/* 6. High-Res Item Inspection Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <div
            className="absolute inset-0 bg-ink/90 backdrop-blur-2xl transition-opacity duration-300"
            onClick={() => setActiveItem(null)}
          />

          <button
            type="button"
            onClick={() => setActiveItem(null)}
            className="absolute right-4 top-4 z-50 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-off/20 bg-off/10 text-off backdrop-blur-md transition-colors hover:bg-off/20 sm:right-6 sm:top-6"
            aria-label="Fechar visualização"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10 flex flex-col max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-sm border border-off/20 bg-navy shadow-2xl">
            <div className="relative flex-1 overflow-hidden bg-ink max-h-[62vh]">
              {activeItem.video ? (
                <video
                  src={activeItem.video}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <img
                  src={img(activeItem.photo, 1600)}
                  alt={portfolioImageAlt(activeItem)}
                  width={1600}
                  height={1200}
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            <div className="p-6 bg-navy border-t border-off/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                  {activeItem.category}
                </p>
                <h3 className="mt-1 text-xl font-bold text-off">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-mist">{activeItem.city}</p>
              </div>

              <div className="flex items-center gap-3">
                {activeItem.caseSlug && (
                  <Link
                    to={`/portfolio/${activeItem.caseSlug}`}
                    className="inline-flex items-center gap-2 rounded-xs bg-teal px-5 py-2.5 text-sm font-medium text-off transition-colors hover:bg-teal-400"
                  >
                    <span>Ver Estudo de Caso</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="rounded-xs border border-off/20 px-4 py-2.5 text-sm font-medium text-off hover:bg-off/10"
                >
                  Voltar ao Canvas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
