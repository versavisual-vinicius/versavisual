import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Logo from "./Logo"

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#nichos", label: "Segmentos", hash: true },
  { href: "/#processo", label: "Processo", hash: true },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hiddenHeader, setHiddenHeader] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    setHiddenHeader(false)
  }, [pathname])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 12)

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastY
          if (currentY > 80 && delta > 6) {
            setHiddenHeader(true)
          } else if (delta < -4 || currentY <= 40) {
            setHiddenHeader(false)
          }
          lastY = currentY
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.25, rootMargin: "-72px 0px -40% 0px" },
    )

    const elNichos = document.getElementById("nichos")
    const elProcesso = document.getElementById("processo")
    if (elNichos) observer.observe(elNichos)
    if (elProcesso) observer.observe(elProcesso)

    return () => observer.disconnect()
  }, [pathname])

  const isNoHero =
    pathname === "/portfolio" ||
    pathname.startsWith("/diagnostico-visual") ||
    pathname.startsWith("/404")
  const isHeroPage = !isNoHero
  const transparent = !scrolled && !open && isHeroPage

  const isActive = (href: string, hash?: boolean) => {
    if (hash) {
      if (pathname !== "/") return false
      const targetId = href.replace("/#", "")
      return activeSection === targetId
    }
    if (href === "/") return pathname === "/" && !activeSection
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transform transition-all duration-300 ease-out ${
        hiddenHeader && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        transparent
          ? "border-b border-off/10 bg-ink/60 backdrop-blur-md"
          : "border-b border-off/10 bg-ink/95"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          viewTransition
          aria-label="VERSAVISUAL — página inicial"
          className="flex items-center"
        >
          <Logo
            variant="white"
            className="block h-7 w-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              viewTransition={!l.hash}
              className={`text-sm transition-colors duration-200 ease-out ${
                isActive(l.href, l.hash)
                  ? transparent
                    ? "text-off"
                    : "text-off"
                  : transparent
                    ? "text-mist/90 hover:text-off"
                    : "text-mist hover:text-off"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/diagnostico-visual"
            viewTransition
            className="inline-flex min-h-[44px] items-center justify-center border border-teal bg-teal px-5 py-2.5 text-sm font-head font-medium text-off transition-colors duration-200 ease-out hover:border-teal-400 hover:bg-teal-400"
          >
            Iniciar projeto
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center text-off lg:hidden focus-visible:ring-2 focus-visible:ring-teal"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-[72px] z-40 bg-ink/60 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-navigation-drawer"
            className="relative z-50 max-h-[calc(100vh-72px)] overflow-y-auto border-t border-off/10 bg-ink lg:hidden"
          >
            <nav aria-label="Navegação móvel" className="px-5 py-6">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  viewTransition={!l.hash}
                  onClick={() => setOpen(false)}
                  className="block border-b border-off/10 py-3.5 text-lg text-off transition-colors hover:text-teal"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/diagnostico-visual"
                viewTransition
                onClick={() => setOpen(false)}
                className="mt-6 flex min-h-[44px] items-center justify-center border border-teal bg-teal px-4 py-3 text-center font-head font-medium text-off transition-colors duration-200 hover:border-teal-400 hover:bg-teal-400"
              >
                Iniciar projeto
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
