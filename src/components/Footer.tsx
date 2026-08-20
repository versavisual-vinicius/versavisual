import { Link } from "react-router-dom"
import { SEGMENT_NAV, WHATSAPP, EMAIL } from "../data/site"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer className="border-t border-off/10 bg-ink">
      <div className="mx-auto max-w-[1320px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo variant="white" className="block h-10 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              Hub Criativo · Vídeo · Fotografia · Storymaking. Da cena ao frame,
              em todo o Brasil.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
            >
              WhatsApp · 11 95074-7192
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 inline-flex min-h-[44px] items-center text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
            >
              {EMAIL}
            </a>
          </div>

          {/* Segments */}
          <nav aria-label="Segmentos">
            <p className="u-eyebrow mb-4 text-mist">Segmentos</p>
            <ul className="grid gap-1">
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

          {/* Contact */}
          <nav aria-label="Contato e navegação">
            <p className="u-eyebrow mb-4 text-mist">Contato</p>
            <ul className="grid gap-1">
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
                >
                  WhatsApp · 11 95074-7192
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex min-h-[44px] items-center text-sm text-mist transition-colors duration-200 ease-out hover:text-off"
                >
                  {EMAIL}
                </a>
              </li>
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
                  Diagnóstico gratuito
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-off/10 pt-6 text-xs text-mist/80 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 VERSAVISUAL — Hub Criativo Audiovisual</span>
          <span className="u-wordmark tracking-widest text-mist/80">
            Rio de Janeiro · Brasil
          </span>
        </div>
      </div>
    </footer>
  )
}
