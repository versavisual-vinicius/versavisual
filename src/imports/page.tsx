import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroGridLines from "@/components/HeroGridLines";
import Reveal from "@/components/Reveal";
import { optimizedPhotoSrc, resolvePhotoSrc } from "@/data/photoLibrary";

export const metadata: Metadata = {
  title: "VERSAVISUAL | Fotografia, Vídeo e Storymaking para Marcas",
  description:
    "Hub criativo audiovisual especializado em fotografia, vídeo, direção visual e storymaking para marcas, artistas, eventos, campanhas e experiências no Rio de Janeiro e em todo o Brasil.",
};

const niches = [
  {
    num: "01",
    label: "Segmento",
    title: "Ativações & Eventos",
    href: "/ativacoes-eventos",
    src: resolvePhotoSrc("/photos/site-melhores/trio-ativacao/ch-161.jpg"),
    alt: "Cobertura de trio elétrico e ativação com artistas e público",
  },
  {
    num: "02",
    label: "Segmento",
    title: "Moda & Campanhas",
    href: "/moda-campanhas",
    src: resolvePhotoSrc("/photos/site-melhores/moda/ftj-159.jpg"),
    alt: "Campanha de moda com direção visual editorial",
  },
  {
    num: "03",
    label: "Segmento",
    title: "Artistas & Videoclipes",
    href: "/artistas-videoclipes",
    src: resolvePhotoSrc("/photos/site-melhores/videoclipes/sururu-147.jpg"),
    alt: "Artista em performance de videoclipe com figurino rosa",
  },
  {
    num: "04",
    label: "Segmento",
    title: "Posicionamento Profissional",
    href: "/posicionamento-profissional",
    src: resolvePhotoSrc("/photos/site-melhores/posicionamento/od-14.jpg"),
    alt: "Retrato profissional com direção de pose e luz natural",
  },
  {
    num: "05",
    label: "Segmento",
    title: "Imagem Pessoal & Lifestyle",
    href: "/imagem-pessoal-lifestyle",
    src: resolvePhotoSrc(
      "/photos/site-melhores/retratos/trabalho-retrato-030.jpg",
    ),
    alt: "Retrato lifestyle com luz natural e expressão dirigida",
  },
  {
    num: "06",
    label: "Novo segmento",
    title: "Casamentos",
    href: "/casamentos",
    src: resolvePhotoSrc(
      "/photos/site-melhores/casamentos/trabalho-casamento-012.jpg",
    ),
    alt: "Casal em ensaio de casamento ao ar livre",
  },
  {
    num: "07",
    label: "Novo segmento",
    title: "Gestantes",
    href: "/gestantes",
    src: resolvePhotoSrc(
      "/photos/site-melhores/gestante/trabalho-gestante-003.jpg",
    ),
    alt: "Ensaio gestante na praia com luz natural",
  },
  {
    num: "08",
    label: "Segmento",
    title: "Hotelaria & Lifestyle",
    href: "/hotelaria-lifestyle",
    src: resolvePhotoSrc(
      "/photos/site-melhores/hotelaria-wellness/hotelaria1.jpg",
    ),
    alt: "Sala de hotel com luz natural, plantas e atmosfera acolhedora",
  },
];

const services = [
  {
    num: "01",
    title: "Fotografia",
    desc: "Direção de cena, leitura de luz e sensibilidade editorial. Imagens com peso, presença e intenção.",
  },
  {
    num: "02",
    title: "Storymaking",
    desc: "Narrativas visuais para redes sociais. Posts, carrosséis e reels que comunicam com coerência.",
  },
  {
    num: "03",
    title: "Videomaking",
    desc: "Cobertura completa com equipe técnica, operação multicâmera e entrega editada com identidade.",
  },
  {
    num: "04",
    title: "Roteiros",
    desc: "Roteiros para vídeos institucionais, conteúdo e coberturas temáticas. A narrativa começa antes da câmera ligar.",
  },
  {
    num: "05",
    title: "Direção",
    desc: "Direção visual não é estética pela estética. É a tradução de um objetivo de comunicação em escolhas concretas de enquadramento, luz, movimento e composição.",
  },
  {
    num: "06",
    title: "Cobertura de Eventos",
    desc: "Presença completa nos eventos dos clientes — antes, durante e depois.",
  },
];

const steps = [
  {
    num: "01",
    title: "Briefing",
    desc: "O planejamento não é pré-produção. É o produto.",
  },
  {
    num: "02",
    title: "Pré-produção",
    desc: "Briefing, roteiro, locação, linguagem visual e logística alinhados. Antes de ligar a câmera.",
  },
  {
    num: "03",
    title: "Execução",
    desc: "Set com briefing definido e linguagem alinhada. Disciplinados no processo, sensíveis ao momento.",
  },
  {
    num: "04",
    title: "Pós & entrega",
    desc: "Tratamento de cor coeso, curadoria autoral e entrega por formato e plataforma.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-desktop-bg" aria-hidden="true">
          <video
            poster={optimizedPhotoSrc(
              "/photos/site-melhores/trio-ativacao/ch-161.jpg",
              1200,
            )}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-glow" />
        <HeroGridLines />
        <div className="container hero-content">
          <div className="eyebrow">
            Hub Criativo Audiovisual · Rio de Janeiro · Brasil
          </div>
          <h1 className="hero-title-full">
            Imagem forte não se improvisa.{" "}
            <span className="teal" style={{ fontStyle: "italic" }}>
              Se dirige.
            </span>
          </h1>
          <h1 className="hero-title-mobile">
            Imagem que posiciona. Produção que comunica.
          </h1>
          <p className="lede hero-copy-full">
            Fotografia, vídeo e storymaking com direção, processo e entrega
            integrados. Do briefing ao frame final.
          </p>
          <p className="lede hero-copy-mobile">
            Da campanha ao ensaio — imagem com direção, processo e intenção.
          </p>
          <div className="hero-mobile-visual" aria-hidden="true">
            <div className="hero-mobile-photo hero-mobile-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimizedPhotoSrc(
                  "/photos/site-melhores/moda/slide-05-trabalho-retrato-115.jpg",
                  1200,
                )}
                alt=""
                fetchPriority="high"
              />
            </div>
            <div className="hero-mobile-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimizedPhotoSrc(
                  "/photos/site-melhores/moda/ftj-159.jpg",
                  800,
                )}
                alt=""
              />
            </div>
            <div className="hero-mobile-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimizedPhotoSrc(
                  "/photos/site-melhores/ativacao-marca/drinkball-vin-303day-2.jpg",
                  800,
                )}
                alt=""
              />
            </div>
          </div>
          <div className="hero-ctas">
            <Link
              href="/diagnostico-visual"
              className="btn btn-primary btn-arrow"
            >
              Falar sobre meu projeto
            </Link>
            <Link href="#nichos" className="btn btn-outline">
              Ver trabalhos
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="num">+120</div>
              <div className="lbl">Projetos Autorais</div>
            </div>
            <div className="stat">
              <div className="num">25+</div>
              <div className="lbl">Marcas Atendidas</div>
            </div>
            <div className="stat">
              <div className="num">18</div>
              <div className="lbl">Estados Cobertos</div>
            </div>
            <div className="stat">
              <div className="num">5+</div>
              <div className="lbl">Anos de Operação</div>
            </div>
          </div>
        </div>
      </section>

      {/* POSICIONAMENTO */}
      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="eyebrow">Quem somos</div>
              <h2
                style={{
                  fontSize: "clamp(26px,3.4vw,40px)",
                  fontWeight: 800,
                  lineHeight: 1.14,
                  letterSpacing: "-0.01em",
                  margin: "14px 0 18px",
                }}
              >
                Onde a cena <span className="teal">vira</span> narrativa.
              </h2>
              <p className="lede">
                Nossa entrega reflete essa dualidade: a força bruta dos palcos e
                a precisão técnica que marcas exigentes precisam. Do briefing ao
                frame final, cada decisão tem peso e intenção.
              </p>
              <ul className="bullets">
                <li>
                  Direção ativa em campo — não chegamos para registrar, chegamos
                  para interpretar.
                </li>
                <li>
                  Operação multicâmera com papéis definidos e visão
                  compartilhada.
                </li>
                <li>
                  Tratamento de cor coeso: sombras frias tendendo ao teal, pele
                  respeitada.
                </li>
              </ul>
            </Reveal>
            <Reveal className="split-media">
              <Image
                src={resolvePhotoSrc("/photos/CH-161.jpg")}
                alt="Cobertura audiovisual de evento de rua com artista, público e trio elétrico"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* NICHOS */}
      <section id="nichos" className="section on-light">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Segmentos</div>
            <h2>Cada público, uma especialidade.</h2>
            <p className="lede">
              Cada segmento tem linguagem visual própria. Aqui ela vem com
              direção, processo e entrega integrados.
            </p>
          </Reveal>
          <Reveal>
            <div className="niche-grid">
              {niches.map((n) => (
                <Link key={n.href} href={n.href} className="niche">
                  <div className="niche-img-wrap">
                    <Image
                      src={n.src}
                      alt={n.alt}
                      fill
                      style={{
                        objectFit: "cover",
                        filter: "saturate(0.9) contrast(1.05)",
                      }}
                      sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, 20vw"
                    />
                  </div>
                  <div className="niche-body">
                    <span className="k">
                      {n.num} — {n.label}
                    </span>
                    <h3>{n.title}</h3>
                    <span className="go">Ver página →</span>
                  </div>
                </Link>
              ))}
              <Link href="/portfolio" className="niche niche-diagnostic">
                <div className="niche-body">
                  <span className="k">Portfólio completo</span>
                  <h3>Veja todos os projetos.</h3>
                  <p>
                    Explore cases por segmento e veja a entrega audiovisual em
                    movimento.
                  </p>
                  <span className="go">Abrir portfólio →</span>
                </div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">02 — O que entregamos</div>
            <h2>6 serviços. Uma entrega.</h2>
            <p className="lede">
              Cada serviço existe de forma independente — e se potencializa
              quando combinado com os demais. Do roteiro à edição final, da
              lente ao story publicado.
            </p>
          </Reveal>
          <Reveal className="grid-cells grid-cells-3">
            {services.map((s) => (
              <div key={s.num} className="cell">
                <div className="num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="section on-off">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">03 — Modelo de execução</div>
            <h2>Mestria não se improvisa. Se constrói quadro a quadro.</h2>
          </Reveal>
          <Reveal className="steps">
            {steps.map((s) => (
              <div key={s.num} className="step">
                <div className="n">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section cta-band">
        <div className="glow" />
        <Reveal className="container cta-band-inner">
          <div className="eyebrow">Vamos conversar</div>
          <h2>A produção começa antes do set. Começa aqui.</h2>
          <p className="lede">
            Conte o projeto. A gente entende o momento, mapeia o escopo e indica
            o caminho.
          </p>
          <div className="hero-ctas">
            <Link
              href="/diagnostico-visual"
              className="btn btn-light btn-arrow"
            >
              Falar sobre meu projeto
            </Link>
            <a href="https://wa.me/5511950747192" className="btn btn-outline">
              WhatsApp direto
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
