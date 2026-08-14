import { Link } from "react-router-dom"
import { SEGMENT_NAV, WHATSAPP, EMAIL } from "../data/site"
import logo from "../imports/logo-white.png"

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1320px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="VERSAVISUAL"
              width={220}
              height={55}
              className="block h-14 w-auto invert"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy">
              Hub Criativo · Vídeo · Fotografia · Storymaking. Da cena ao frame,
              em todo o Brasil.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block text-sm text-teal transition-colors duration-200 ease-out hover:text-ink"
            >
              WhatsApp · 11 95074-7192
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-2 block text-sm text-navy transition-colors duration-200 ease-out hover:text-ink"
            >
              {EMAIL}
            </a>
          </div>

          {/* Segments */}
          <nav aria-label="Segmentos">
            <p className="u-eyebrow mb-4">Segmentos</p>
            <ul className="grid gap-2.5">
              {SEGMENT_NAV.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    viewTransition
                    className="text-sm text-navy transition-colors duration-200 ease-out hover:text-ink"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <nav aria-label="Contato e navegação">
            <p className="u-eyebrow mb-4">Contato</p>
            <ul className="grid gap-2.5">
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-navy transition-colors duration-200 ease-out hover:text-ink"
                >
                  WhatsApp · 11 95074-7192
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-navy transition-colors duration-200 ease-out hover:text-ink"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  viewTransition
                  className="text-sm text-navy transition-colors duration-200 ease-out hover:text-ink"
                >
                  Portfólio
                </Link>
              </li>
              <li>
                <Link
                  to="/diagnostico-visual"
                  viewTransition
                  className="text-sm text-navy transition-colors duration-200 ease-out hover:text-ink"
                >
                  Diagnóstico gratuito
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-navy sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 VERSAVISUAL — Hub Criativo Audiovisual</span>
          <span className="u-wordmark tracking-widest text-navy/50">
            Rio de Janeiro · Brasil
          </span>
        </div>
      </div>
    </footer>
  )
}
