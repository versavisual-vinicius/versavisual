import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-wm">
              <Image
                src="/logos/logo-white-original-transparent.png"
                alt="VERSAVISUAL"
                width={220}
                height={55}
                style={{ display: "block" }}
              />
            </div>
            <p className="footer-tag">
              Hub Criativo · Vídeo · Fotografia · Storymaking. Da cena ao frame,
              em todo o Brasil.
            </p>
          </div>
          <div>
            <h5>Segmentos</h5>
            <ul>
              <li>
                <Link href="/ativacoes-eventos">Ativações &amp; Eventos</Link>
              </li>
              <li>
                <Link href="/moda-campanhas">Moda &amp; Campanhas</Link>
              </li>
              <li>
                <Link href="/artistas-videoclipes">
                  Artistas &amp; Videoclipes
                </Link>
              </li>
              <li>
                <Link href="/posicionamento-profissional">
                  Posicionamento Profissional
                </Link>
              </li>
              <li>
                <Link href="/imagem-pessoal-lifestyle">
                  Imagem Pessoal &amp; Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/casamentos">Casamentos</Link>
              </li>
              <li>
                <Link href="/gestantes">Gestantes</Link>
              </li>
              <li>
                <Link href="/hotelaria-lifestyle">
                  Hotelaria &amp; Lifestyle
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Contato</h5>
            <ul>
              <li>
                <a href="https://wa.me/5511950747192">
                  WhatsApp · 11 95074-7192
                </a>
              </li>
              <li>
                <a href="mailto:hub@versavisual.com.br">
                  hub@versavisual.com.br
                </a>
              </li>
              <li>
                <Link href="/portfolio">Portfólio</Link>
              </li>
              <li>
                <Link href="/diagnostico-visual">Diagnóstico gratuito</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 VERSAVISUAL — Hub Criativo Audiovisual</span>
          <span>Rio de Janeiro · Brasil</span>
        </div>
      </div>
    </footer>
  )
}
