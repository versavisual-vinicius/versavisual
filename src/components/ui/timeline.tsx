import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

export interface TimelineEntry {
  eyebrow?: string
  title: string
  content: ReactNode
}

interface TimelineProps {
  eyebrow?: string
  title: string
  text?: string
  media?: ReactNode
  data: TimelineEntry[]
}

export function Timeline({ eyebrow, title, text, media, data }: TimelineProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!contentRef.current) return

    const updateHeight = () => {
      if (!contentRef.current) return
      setHeight(contentRef.current.getBoundingClientRect().height)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [data.length])

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      frame = 0
      const element = containerRef.current
      const line = progressLineRef.current
      if (!element || !line) return
      const rect = element.getBoundingClientRect()
      const start = window.innerHeight * 0.55
      const end = window.innerHeight * 0.65
      const value =
        (start - rect.top) / Math.max(1, rect.height - (end - start))
      const progress = Math.min(1, Math.max(0, value))
      line.style.opacity =
        progress > 0 ? String(Math.min(1, progress * 12)) : "0"
      line.style.transform = `scaleY(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }
    updateProgress()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [height])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:py-20 lg:px-10 lg:py-28">
        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
          <div className="top-24 lg:sticky">
            {eyebrow && <p className="u-eyebrow text-mist">{eyebrow}</p>}
            <h2 className="mt-3 text-2xl leading-tight text-off sm:mt-4 sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {text && (
              <p className="mt-3 max-w-sm text-sm text-mist sm:mt-4 sm:text-base">
                {text}
              </p>
            )}
            {media && <div className="mt-6 block lg:mt-8">{media}</div>}
          </div>

          <div ref={contentRef} className="relative pb-8">
            {data.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="relative flex justify-start pt-8 first:pt-0 sm:pt-10 md:gap-10 md:pt-20"
              >
                <div className="sticky top-28 z-10 hidden w-48 shrink-0 self-start md:block lg:w-56">
                  <div className="pl-20">
                    {item.eyebrow && (
                      <span className="u-display text-sm text-mist/80">
                        {item.eyebrow}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`absolute left-1 z-20 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-off/15 bg-ink shadow-xs sm:left-4 md:left-4 ${
                    index === 0 ? "top-0 md:top-0" : "top-8 sm:top-10 md:top-20"
                  }`}
                  aria-hidden="true"
                >
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-teal" />
                </div>

                <div className="w-full pl-10 sm:pl-16 md:pl-4">
                  <div className="border-l border-line bg-off p-4 sm:p-6 lg:p-8">
                    <div className="mb-3 sm:mb-5 flex items-baseline justify-between gap-4">
                      <div>
                        {item.eyebrow && (
                          <span className="u-display text-xs sm:text-sm text-navy md:hidden">
                            {item.eyebrow}
                          </span>
                        )}
                        <h3 className="mt-1 sm:mt-2 text-xl font-semibold text-ink sm:text-2xl lg:text-3xl">
                          {item.title}
                        </h3>
                      </div>
                      <span className="h-2 w-2 shrink-0 rounded-full bg-teal" />
                    </div>
                    {item.content}
                  </div>
                </div>
              </article>
            ))}

            <div
              style={{ height }}
              className="absolute left-4.5 sm:left-8 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-off/25 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
              aria-hidden="true"
            >
              <div
                ref={progressLineRef}
                style={{
                  height: "100%",
                  opacity: 0,
                  transform: "scaleY(0)",
                  transformOrigin: "top",
                }}
                className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-teal via-mist to-transparent will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
