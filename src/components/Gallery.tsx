import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react"
import { img } from "../lib/images"

type Props = {
  photos: readonly string[]
  label: string
}

export default function Gallery({ photos, label }: Props) {
  const [active, setActive] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [dragY, setDragY] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const close = useCallback(() => {
    setActive(null)
    setDragY(0)
    setDragX(0)
  }, [])

  const go = useCallback(
    (dir: number) => {
      setActive((cur) => {
        if (cur === null) return cur
        return (cur + dir + photos.length) % photos.length
      })
      setDragX(0)
      setDragY(0)
    },
    [photos.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (active !== null) {
      if (dialog && !dialog.open) {
        dialog.showModal()
      }
      document.body.style.overflow = "hidden"
    } else {
      if (dialog?.open) {
        dialog.close()
      }
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [active])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
    }
  }, [active, go])

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
    setTouchStartY(e.touches[0].clientY)
    setIsSwiping(true)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const diffX = currentX - touchStartX
    const diffY = currentY - touchStartY

    // If pulling down
    if (diffY > 0 && Math.abs(diffY) > Math.abs(diffX) * 0.8) {
      setDragY(diffY)
    } else if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragX(diffX * 0.4)
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    setIsSwiping(false)
    if (touchStartX === null || touchStartY === null) return
    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY
    const diffX = touchStartX - endX
    const diffY = endY - touchStartY

    // Swipe down to dismiss
    if (diffY > 110) {
      close()
      return
    }

    // Horizontal swipe to navigate
    if (Math.abs(diffX) > 50) {
      go(diffX > 0 ? 1 : -1)
    }

    setDragY(0)
    setDragX(0)
    setTouchStartX(null)
    setTouchStartY(null)
  }

  const bgOpacity = dragY > 0 ? Math.max(0.3, 0.95 - dragY / 300) : 0.95

  return (
    <>
      <div className="grid grid-cols-2 gap-px border-y border-off/10 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[4/5] overflow-hidden bg-navy focus-visible:outline-teal-400"
            aria-label={`Ampliar imagem ${i + 1} de ${label}`}
          >
            <img
              src={img(p, 900)}
              alt={`${label} — imagem ${i + 1}`}
              loading={i < 3 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        {...{ closedby: "any" } as Record<string, unknown>}
        onClose={close}
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            close()
          }
        }}
        aria-label={`${label} — visualização ampliada`}
        className="fixed inset-0 m-0 h-screen w-screen max-h-none max-w-none border-none bg-transparent p-0 overflow-hidden backdrop:bg-ink/85 backdrop:backdrop-blur-md focus:outline-none"
      >
        {active !== null && (
          <div
            className="relative flex h-full w-full select-none items-center justify-center p-4 transition-colors duration-200"
            style={{ backgroundColor: `rgba(5, 10, 13, ${bgOpacity})` }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                close()
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-ink/40 text-off backdrop-blur-sm transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/20 hover:text-teal-400 focus-visible:ring-2 focus-visible:ring-teal"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Previous button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              aria-label="Imagem anterior"
              className="absolute left-3 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-ink/40 text-off backdrop-blur-sm transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/20 hover:text-teal-400 focus-visible:ring-2 focus-visible:ring-teal sm:flex sm:left-6"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Image Figure */}
            <figure
              onClick={(e) => e.stopPropagation()}
              style={{
                transform: `translate3d(${dragX}px, ${dragY}px, 0) scale(${
                  dragY > 0 ? Math.max(0.85, 1 - dragY / 800) : 1
                })`,
                transition: isSwiping
                  ? "none"
                  : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              className="max-h-[86vh] max-w-5xl will-change-transform"
            >
              <img
                src={img(photos[active], 1600)}
                alt={`${label} — imagem ${active + 1}`}
                decoding="async"
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              <figcaption className="mt-4 text-center text-xs tracking-wider text-mist">
                {label} ·{" "}
                <span className="font-semibold text-off">{active + 1}</span> /{" "}
                {photos.length}
              </figcaption>
            </figure>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              aria-label="Próxima imagem"
              className="absolute right-3 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-ink/40 text-off backdrop-blur-sm transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/20 hover:text-teal-400 focus-visible:ring-2 focus-visible:ring-teal sm:flex sm:right-6"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </>
  )
}
