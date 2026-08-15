import type { CSSProperties, ReactNode } from "react"

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
  style,
}: TiltCardProps) {
  return (
    <div style={style} className={`relative ${className}`}>
      {children}
    </div>
  )
}
