"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/ativacoes-eventos", label: "Ativações & Eventos" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#nichos", label: "Segmentos" },
  { href: "/#processo", label: "Processo" },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-wm">
          <Image
            src="/logos/logo-white-original-transparent.png"
            alt="VERSAVISUAL"
            width={112}
            height={28}
            style={{ display: "block" }}
            priority
            unoptimized
          />
        </Link>

        <nav className={`nav-links${open ? " open" : ""}`}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link${
                pathname === l.href ||
                (l.href !== "/" && pathname.startsWith(l.href))
                  ? " active"
                  : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/diagnostico-visual"
            className="nav-cta"
            onClick={() => setOpen(false)}
          >
            Iniciar projeto
          </Link>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
    </header>
  )
}
