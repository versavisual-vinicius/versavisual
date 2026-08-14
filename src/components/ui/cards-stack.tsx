import { forwardRef } from "react"
import type { HTMLAttributes } from "react"

function cn(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ")
}

/**
 * Scroll container for a stack of sticky cards. Give it enough height
 * (e.g. min-h-[400vh]) so each child card has room to pin and stack.
 */
export const ContainerScroll =
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
      </div>
    ),
  )
ContainerScroll.displayName = "ContainerScroll"

interface CardStickyProps
  extends HTMLAttributes<HTMLDivElement> {
  /** vertical offset (px) added per index so pinned cards fan downward */
  /** z-index offset per index so later cards stack above */
  index: number
  incrementY?: number
  incrementZ?: number
}

/**
 * A single card that pins to the top of the viewport while scrolling,
 * stacking beneath the following cards.
 */
export const CardSticky = forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 16,
      incrementZ = 10,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("sticky", className)}
      style={{
        top: `calc(6rem + ${index * incrementY}px)`,
        zIndex: index * incrementZ,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
)
CardSticky.displayName = "CardSticky"
