import { useState } from "react"
import { Link } from "react-router-dom"
import { SEGMENT_NAV, WHATSAPP, WHATSAPP_LABEL, EMAIL } from "../data/site"
import Logo from "./Logo"
import PrivacyModal from "./PrivacyModal"

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-off/10 bg-ink">
        <div className="mx-auto max-w-[1320px] px-5 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1.4fr_0.9fr]">
            {/* Brand & Direct Contact */}
            <div>
              <Logo variant="white" className="block h-10 w-auto" />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
                Estratégia, Produção Audiovisual & Pós-Produção Autoral. Da cena ao frame,
                no Rio de Janeiro e em todo o Brasil.
              </p>
              <div className="mt-6 flex flex-col gap-1.5">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
                >
                  <span className="font-mono text-xs text-teal">WhatsApp</span>
                  <span>{WHATSAPP_LABEL}</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex min-h-[44px] items-center gap-2 text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
                >
                  <span className="font-mono text-xs text-teal">E-mail</span>
                  <span>{EMAIL}</span>
                </a>
              </div>
            </div>

            {/* Segments (2-Column Grid) */}
            <nav aria-label="Segmentos">
              <p className="u-eyebrow mb-4 text-mist">Segmentos</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {SEGMENT_NAV.map((s) => (
                  <li key={s.to}>
                    <Link
                      to={s.to}
                      viewTransition
                      className="inline-flex min-h-[44px] items-center py-1 text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Navigation & Governance */}
            <nav aria-label="Navegação e governança">
              <p className="u-eyebrow mb-4 text-mist">Navegação & Governança</p>
              <ul className="grid gap-1">
                <li>
                  <Link
                    to="/portfolio"
                    viewTransition
                    className="inline-flex min-h-[44px] items-center text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
                  >
                    Portfólio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/diagnostico-visual"
                    viewTransition
                    className="inline-flex min-h-[44px] items-center text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
                  >
                    Diagnóstico & Proposta
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsPrivacyOpen(true)}
                    className="inline-flex min-h-[44px] cursor-pointer items-center text-left text-sm text-mist transition-colors duration-200 ease-out hover:text-teal"
                  >
                    Privacidade & LGPD
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-off/10 pt-6 text-xs text-mist/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span>© 2026 VERSAVISUAL — Operação Audiovisual</span>
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="cursor-pointer text-mist/70 underline transition-colors hover:text-off"
              >
                Termos de Privacidade (LGPD)
              </button>
            </div>
            <span className="u-wordmark tracking-widest text-mist/80">
              Rio de Janeiro — RJ · Brasil
            </span>
          </div>
        </div>
      </footer>

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  )
}
