import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
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
  const [height, setHeight] = useState(0)
  const shouldReduceMotion = useReducedMotion()

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 55%", "end 65%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
          <div className="top-24 lg:sticky">
            {eyebrow && <p className="u-eyebrow">{eyebrow}</p>}
            <h2 className="mt-4 max-w-xl text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {text && <p className="mt-4 max-w-sm text-navy">{text}</p>}
            {media && <div className="mt-8 hidden lg:block">{media}</div>}
          </div>

          <div ref={contentRef} className="relative pb-8">
            {data.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="relative flex justify-start pt-10 first:pt-0 md:gap-10 md:pt-20"
              >
                <div className="sticky top-28 z-10 hidden w-48 shrink-0 self-start md:block lg:w-56">
                  <div className="pl-20">
                    {item.eyebrow && (
                      <span className="u-display text-sm text-navy/80">
                        {item.eyebrow}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`absolute left-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-off shadow-xs md:left-4 ${
                    index === 0 ? "top-0 md:top-0" : "top-10 md:top-20"
                  }`}
                  aria-hidden="true"
                >
                  <span className="h-3 w-3 rounded-full bg-teal" />
                </div>

                <div className="w-full pl-16 md:pl-4">
                  <div className="rounded-xl border border-line bg-off/95 p-6 shadow-xs backdrop-blur-sm transition-shadow duration-300 hover:shadow-md lg:p-8">
                    <div className="mb-5 flex items-baseline justify-between gap-4">
                      <div>
                        {item.eyebrow && (
                          <span className="u-display text-sm text-navy md:hidden">
                            {item.eyebrow}
                          </span>
                        )}
                        <h3 className="mt-2 text-2xl font-semibold text-ink lg:text-3xl">
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
              className="absolute left-8 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-line-strong to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
              aria-hidden="true"
            >
              {shouldReduceMotion ? (
                <div className="absolute inset-x-0 top-0 h-full w-[2px] rounded-full bg-teal/70" />
              ) : (
                <motion.div
                  style={{
                    height: heightTransform,
                    opacity: opacityTransform,
                  }}
                  className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-teal via-navy to-transparent"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
