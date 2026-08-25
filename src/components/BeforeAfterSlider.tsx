import { useState, useRef, useEffect, useCallback } from "react"
import {
  ChevronsLeftRight,
  Sparkles,
  Camera,
  Sliders,
  Layers,
  Layers2,
  Film,
} from "lucide-react"
import {
  BEFORE_AFTER_ITEMS,
  BEFORE_AFTER_CATEGORIES,
  type BeforeAfterItem,
} from "../data/beforeAfter"

export default function BeforeAfterSlider() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeItemId, setActiveItemId] = useState<string>(
    BEFORE_AFTER_ITEMS[0].id,
  )
  const [sliderPosition, setSliderPosition] = useState<number>(50)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [hasSwept, setHasSwept] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const isInteractedRef = useRef<boolean>(false)
  const animationFrameRef = useRef<number | null>(null)

  // Filter items based on active category
  const filteredItems =
    selectedCategory === "all"
      ? BEFORE_AFTER_ITEMS
      : BEFORE_AFTER_ITEMS.filter(
          (item) => item.categorySlug === selectedCategory,
        )

  // Get active item
  const activeItem =
    BEFORE_AFTER_ITEMS.find((item) => item.id === activeItemId) ||
    filteredItems[0] ||
    BEFORE_AFTER_ITEMS[0]

  // Update position based on pointer coordinates
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPosition(percent)
  }, [])

  // Auto-sweep animation on first viewport entrance
  useEffect(() => {
    const container = containerRef.current
    if (!container || hasSwept) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasSwept && !isInteractedRef.current) {
          setHasSwept(true)
          observer.disconnect()

          const startTime = performance.now()
          const duration = 1600

          const animateSweep = (currentTime: number) => {
            if (isInteractedRef.current) return

            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Sine curve: 50% -> 28% -> 72% -> 50%
            const offset = Math.sin(progress * Math.PI * 2) * 22
            setSliderPosition(50 + offset)

            if (progress < 1) {
              animationFrameRef.current = requestAnimationFrame(animateSweep)
            } else {
              setSliderPosition(50)
            }
          }

          animationFrameRef.current = requestAnimationFrame(animateSweep)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [hasSwept])

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isInteractedRef.current = true
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsDragging(true)
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    updatePosition(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false)
      try {
        ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
      } catch {
        // Safe fallback if pointer capture was already released
      }
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    isInteractedRef.current = true
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      const step = e.shiftKey ? 10 : 3
      setSliderPosition((prev) => Math.max(0, prev - step))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      const step = e.shiftKey ? 10 : 3
      setSliderPosition((prev) => Math.min(100, prev + step))
    } else if (e.key === "Home") {
      e.preventDefault()
      setSliderPosition(0)
    } else if (e.key === "End") {
      e.preventDefault()
      setSliderPosition(100)
    }
  }

  return (
    <div className="w-full">
      {/* Category Pills Header */}
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Categorias do comparador de pós-produção"
          className="-mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 scrollbar-none"
        >
          {BEFORE_AFTER_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedCategory(cat.id)
                  const matching =
                    cat.id === "all"
                      ? BEFORE_AFTER_ITEMS[0]
                      : BEFORE_AFTER_ITEMS.find(
                          (item) => item.categorySlug === cat.id,
                        )
                  if (matching) setActiveItemId(matching.id)
                }}
                className={`min-h-[38px] shrink-0 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider font-head transition-all duration-200 ${
                  isActive
                    ? "border border-teal bg-teal text-off shadow-sm"
                    : "border border-mist/20 bg-ink/60 text-mist hover:border-teal/40 hover:text-off"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Quick Position Presets */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs font-mono text-mist">
          <span className="hidden sm:inline text-mist/60 mr-1">
            Ajuste rápido:
          </span>
          <button
            onClick={() => {
              isInteractedRef.current = true
              setSliderPosition(0)
            }}
            className={`px-2.5 py-1 transition-colors ${
              sliderPosition <= 5
                ? "bg-teal/20 text-teal-400 font-bold border border-teal/40"
                : "bg-navy/40 text-mist hover:text-off border border-transparent"
            }`}
            title="Exibir imagem RAW completa"
          >
            0% RAW
          </button>
          <button
            onClick={() => {
              isInteractedRef.current = true
              setSliderPosition(50)
            }}
            className={`px-2.5 py-1 transition-colors ${
              Math.abs(sliderPosition - 50) <= 5
                ? "bg-teal/20 text-teal-400 font-bold border border-teal/40"
                : "bg-navy/40 text-mist hover:text-off border border-transparent"
            }`}
            title="Divisão 50/50"
          >
            50% Split
          </button>
          <button
            onClick={() => {
              isInteractedRef.current = true
              setSliderPosition(100)
            }}
            className={`px-2.5 py-1 transition-colors ${
              sliderPosition >= 95
                ? "bg-teal/20 text-teal-400 font-bold border border-teal/40"
                : "bg-navy/40 text-mist hover:text-off border border-transparent"
            }`}
            title="Exibir imagem Master Final completa"
          >
            100% Master
          </button>
        </div>
      </div>

      {/* Main Split Slider Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] w-full select-none overflow-hidden border border-mist/20 bg-ink touch-pan-y ${
          isDragging ? "cursor-ew-resize" : "cursor-col-resize"
        }`}
      >
        {/* Layer 1: AFTER / MASTER GRADED (Base background layer) */}
        <div className="absolute inset-0 h-full w-full">
          <img
            src={activeItem.afterImage}
            alt={`${activeItem.title} - Master Final Graded`}
            className="h-full w-full object-cover"
            style={{
              filter: activeItem.afterFilter || "none",
              objectPosition: activeItem.objectPosition || "center",
            }}
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Layer 2: BEFORE / RAW (Clipped on top) */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden will-change-[clip-path]"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <img
            src={activeItem.beforeImage}
            alt={`${activeItem.title} - RAW Original`}
            className="h-full w-full object-cover"
            style={{
              filter: activeItem.beforeFilter || "none",
              objectPosition: activeItem.objectPosition || "center",
            }}
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Badge: RAW (Left side) */}
        <div
          className="pointer-events-none absolute left-3 top-3 sm:left-5 sm:top-5 z-10 transition-opacity duration-200"
          style={{ opacity: sliderPosition < 8 ? 0 : 1 }}
        >
          <div className="flex items-center gap-1.5 rounded-none border border-mist/30 bg-ink/80 px-2.5 py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-mist backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-mist/60 animate-pulse" />
            <span className="font-semibold text-off">RAW NEF</span>
            <span className="hidden sm:inline text-mist/60">
              · {activeItem.beforeLabel}
            </span>
          </div>
        </div>

        {/* Badge: MASTER (Right side) */}
        <div
          className="pointer-events-none absolute right-3 top-3 sm:right-5 sm:top-5 z-10 transition-opacity duration-200"
          style={{ opacity: sliderPosition > 92 ? 0 : 1 }}
        >
          <div className="flex items-center gap-1.5 rounded-none border border-teal/50 bg-teal/90 px-2.5 py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-off shadow-lg backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-off" />
            <span className="font-bold">MASTER FINAL</span>
            <span className="hidden sm:inline text-off/80">
              · {activeItem.afterLabel}
            </span>
          </div>
        </div>

        {/* Draggable Divider Line & Handle */}
        <div
          role="slider"
          aria-label="Divisor interativo de Antes e Depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="absolute top-0 bottom-0 z-20 w-0 -translate-x-1/2 outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Laser Divider Line */}
          <div className="h-full w-[2px] bg-teal-400 shadow-[0_0_12px_rgba(112,144,156,0.8)]" />

          {/* Central Grabber Handle */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border border-teal bg-ink/90 text-off shadow-2xl backdrop-blur-md transition-transform duration-150 ${
              isDragging
                ? "scale-110 border-teal-400 bg-teal text-off ring-4 ring-teal/30"
                : "group-hover:scale-105"
            }`}
          >
            <ChevronsLeftRight className="h-5 w-5 text-off" />
          </div>
        </div>

        {/* Mobile Interaction Hint */}
        <div
          className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 sm:hidden transition-opacity duration-300"
          style={{ opacity: isDragging || isInteractedRef.current ? 0 : 0.9 }}
        >
          <span className="bg-ink/80 text-mist text-[10px] uppercase font-mono px-3 py-1 border border-mist/20 backdrop-blur-sm">
            Arraste lateralmente
          </span>
        </div>
      </div>

      {/* Thumbnails Selector (Horizontal Scroll on Mobile, Grid on Desktop) */}
      <div className="-mx-5 mt-4 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 scrollbar-none snap-x snap-mandatory">
        {filteredItems.map((item) => {
          const isCurrent = item.id === activeItem.id
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveItemId(item.id)
                setSliderPosition(50)
              }}
              className={`group relative flex w-[210px] shrink-0 snap-start items-center gap-2.5 overflow-hidden border p-2 text-left transition-all duration-200 sm:w-auto ${
                isCurrent
                  ? "border-teal bg-navy/60 text-off ring-1 ring-teal"
                  : "border-mist/20 bg-ink/40 text-mist hover:border-mist/50 hover:bg-navy/30"
              }`}
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-mist/10">
                <img
                  src={item.afterImage}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  style={{
                    objectPosition: item.objectPosition || "center",
                  }}
                  loading="lazy"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-xs font-semibold font-head ${
                    isCurrent ? "text-off" : "text-mist group-hover:text-off"
                  }`}
                >
                  {item.title}
                </p>
                <p className="truncate text-[10px] font-mono text-mist/70">
                  {item.category}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Technical Specs & Production Details Card */}
      <div className="mt-5 border border-mist/15 bg-navy/30 p-4 sm:mt-6 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-teal-400">
                <Layers className="h-3 w-3" /> Ficha Técnica de Tratamento
              </span>
            </div>
            <h3 className="mt-1 text-lg font-medium font-head text-off sm:text-xl">
              {activeItem.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-mist sm:text-sm">
              {activeItem.description}
            </p>
          </div>

          {/* Technical Specs Pill Matrix (2 Columns on Mobile) */}
          <div className="grid grid-cols-2 gap-3 border-t border-mist/10 pt-4 lg:border-t-0 lg:pt-0 lg:border-l lg:border-mist/10 lg:pl-6">
            <div className="flex items-start gap-2">
              <Camera className="h-4 w-4 shrink-0 text-teal-400 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-mist/60">
                  Câmera & Óptica
                </p>
                <p className="text-xs font-medium text-off">
                  {activeItem.specs.camera}
                </p>
                <p className="text-[11px] text-mist/80">
                  {activeItem.specs.lens}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Sliders className="h-4 w-4 shrink-0 text-teal-400 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-mist/60">
                  Color Science & Grade
                </p>
                <p className="text-xs font-medium text-off">
                  {activeItem.specs.colorScience}
                </p>
                {activeItem.specs.isoSpeed && (
                  <p className="text-[11px] font-mono text-mist/80">
                    {activeItem.specs.isoSpeed}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2 flex items-start gap-2 border-t border-mist/10 pt-2.5">
              <Layers2 className="h-4 w-4 shrink-0 text-teal-400 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-mist/60">
                  Pós-Produção & Retouch
                </p>
                <p className="text-xs font-medium text-off">
                  {activeItem.specs.postProduction}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
