import type { SVGProps } from "react"

export type LogoVariant = "white" | "black" | "navy" | "teal" | "color" | "inverse"

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: LogoVariant
  className?: string
}

export default function Logo({
  variant = "color",
  className = "h-7 w-auto",
  ...props
}: LogoProps) {
  if (variant === "color") {
    return (
      <svg
        viewBox="0 0 1200 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="VERSAVISUAL"
        role="img"
        {...props}
      >
        <text
          x="600"
          y="190"
          textAnchor="middle"
          fontFamily="Righteous, system-ui, sans-serif"
          fontSize="150"
        >
          <tspan fill="#050A0D">VERSA</tspan>
          <tspan fill="#5E7F8C">VISUAL</tspan>
        </text>
      </svg>
    )
  }

  if (variant === "inverse") {
    return (
      <svg
        viewBox="0 0 1200 300"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="VERSAVISUAL"
        role="img"
        {...props}
      >
        <rect width="1200" height="300" fill="#050A0D" />
        <text
          x="600"
          y="190"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Righteous, system-ui, sans-serif"
          fontSize="150"
        >
          VERSAVISUAL
        </text>
      </svg>
    )
  }

  const fillColors: Record<string, string> = {
    white: "#FFFFFF",
    black: "#050A0D",
    navy: "#253540",
    teal: "#5E7F8C",
  }

  const fill = fillColors[variant] || "#FFFFFF"

  return (
    <svg
      viewBox="0 0 1200 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="VERSAVISUAL"
      role="img"
      {...props}
    >
      <text
        x="600"
        y="190"
        textAnchor="middle"
        fill={fill}
        fontFamily="Righteous, system-ui, sans-serif"
        fontSize="150"
      >
        VERSAVISUAL
      </text>
    </svg>
  )
}
