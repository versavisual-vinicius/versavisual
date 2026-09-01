import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useSeo, SITE_URL, professionalServiceSchema, itemListSchema } from "../lib/seo"
import { img } from "../lib/images"
import { SEGMENTS } from "../data/site"
import {
  MEGABLOCO_CHA_DA_ALICE_PHOTOS,
  CLIPE_E_O_TCHAN_COVER,
  FASHION_MANNERS_PHOTOS,
  LANCAMENTO_DRINKBALL_PHOTOS,
  CAMAROTE_ONDINA_PHOTOS,
  BACKSTAGE_CLIPE_SURURU_PHOTOS,
  FOUNDER_PHOTO
} from "../lib/images"

export default function Home() {
  useSeo({
    title: "VERSAVISUAL — Fotografia, Vídeo e Storymaking para Marcas",
    description:
      "VERSAVISUAL · Rio de Janeiro · operação nacional. Fotografia, vídeo, storymaking e direção visual para marcas, eventos e entretenimento.",
    path: "/",
    jsonLd: [
      professionalServiceSchema(),
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "VERSAVISUAL",
        url: SITE_URL,
        description:
          "Operação audiovisual: fotografia, vídeo, storymaking e direção visual.",
        inLanguage: "pt-BR",
      },
      itemListSchema(
        SEGMENTS.map((s) => ({
          name: s.nav,
          url: `/${s.slug}`,
          description: s.intro,
        })),
        "Segmentos Audiovisuais VERSAVISUAL"
      ),
    ],
  })

  return (
    <>
      {/* 2. HERO SECTION */}
      <section id="inicio" className="relative min-h-screen flex items-end pb-16 md:pb-24 pt-28 overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata"
            poster="/images/foto-a-producao-nao-falha.webp"
            className="w-full h-full object-cover object-top filter brightness-[0.95]"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Overlays de Contraste e Atmosfera */}
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="absolute inset-0 bg-ink/30"></div>
        </div>

        {/* Conteúdo do Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal"></span>
              <p className="font-head text-xs md:text-sm font-semibold uppercase tracking-widest text-mist">
                Rio de Janeiro · operação nacional
              </p>
            </div>

            {/* Headline Principal */}
            <h1 className="font-head font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-off tracking-tight text-balance">
              Imagem não é registro.<br/>
              <span className="text-off">É posicionamento.</span>
            </h1>

            {/* Linha de Apoio Curta */}
            <p className="font-body text-base sm:text-lg md:text-xl text-mist leading-relaxed max-w-2xl text-pretty">
              Fotografia, vídeo, storymaking e direção visual para marcas, eventos e entretenimento — do briefing à entrega final.
            </p>

            {/* Botões de Ação */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link to="/diagnostico-visual" viewTransition className="px-7 py-3.5 rounded-full text-base font-head font-semibold bg-teal text-off hover:bg-teal-400 transition shadow-xl shadow-teal/20">
                Iniciar projeto
              </Link>
              <Link to="/portfolio" viewTransition className="px-6 py-3.5 rounded-full text-base font-head font-medium text-off hover:text-white bg-navy/60 hover:bg-navy/90 border border-navy transition flex items-center gap-2">
                <span>Ver trabalhos</span>
                <ArrowRight className="w-4 h-4 text-mist" />
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* 3. PÓS-HERO & TRANSIÇÃO */}
      <section className="relative bg-ink py-24 md:py-32 border-t border-navy/30">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-4xl space-y-4">
            <p className="font-head text-xs md:text-sm font-semibold uppercase tracking-widest text-teal-400">
              Depois do palco
            </p>
            <h2 className="font-head font-bold text-3xl sm:text-5xl lg:text-6xl text-off leading-tight tracking-tight text-balance">
              A imagem que a marca, o palco e o artista passam a usar depois.
            </h2>
          </div>

          <div className="mt-16 pt-10 border-t border-navy/60 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-head font-extrabold text-4xl sm:text-5xl text-off tracking-tight">+120</p>
              <p className="font-body text-sm text-mist mt-1">projetos entregues</p>
            </div>
            <div>
              <p className="font-head font-extrabold text-4xl sm:text-5xl text-off tracking-tight">25+</p>
              <p className="font-body text-sm text-mist mt-1">marcas e artistas</p>
            </div>
            <div>
              <p className="font-head font-extrabold text-4xl sm:text-5xl text-off tracking-tight">18</p>
              <p className="font-body text-sm text-mist mt-1">estados atendidos</p>
            </div>
            <div>
              <p className="font-head font-extrabold text-4xl sm:text-5xl text-off tracking-tight">5+</p>
              <p className="font-body text-sm text-mist mt-1">anos de operação</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. TRABALHOS SELECIONADOS */}
      <section id="trabalhos" className="py-24 bg-ink border-t border-navy/20">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="font-head text-xs md:text-sm font-semibold uppercase tracking-widest text-teal-400">
                Curadoria
              </p>
              <h2 className="font-head font-bold text-3xl sm:text-4xl text-off tracking-tight">
                Trabalhos selecionados
              </h2>
            </div>
            <p className="font-body text-sm md:text-base text-mist max-w-md text-pretty">
              Ativações, grandes palcos, campanhas de moda e videoclipes com direção visual cinematográfica.
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Bloco 1: Widescreen Panorâmico */}
            <Link to="/portfolio/carnaval-de-rua-experiencia-publico" className="block group relative rounded-2xl overflow-hidden bg-navy/20 border border-navy/40 transition duration-500 hover:border-teal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
              <div className="aspect-[21/9] sm:aspect-[21/8] w-full overflow-hidden">
                <img 
                  src={img(MEGABLOCO_CHA_DA_ALICE_PHOTOS[0], 1600)} 
                  alt="Megabloco Chá da Alice - Rio de Janeiro" 
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex items-end p-6 md:p-10">
                <div>
                  <p className="font-head text-xs uppercase tracking-widest text-teal-400 font-semibold">Grandes Palcos & Ativação</p>
                  <h3 className="font-head font-bold text-xl md:text-3xl text-off mt-1">Megabloco Chá da Alice</h3>
                  <p className="font-body text-sm text-mist mt-1">Rio de Janeiro · Babado Novo & Christian Chávez</p>
                </div>
              </div>
            </Link>

            {/* Bloco 2: 2/3 + 1/3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <Link to="/portfolio/e-o-tchan-jogadinha" className="block md:col-span-2 group relative rounded-2xl overflow-hidden bg-navy/20 border border-navy/40 transition duration-500 hover:border-teal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img 
                    src={img(CLIPE_E_O_TCHAN_COVER, 1200)} 
                    alt="É O Tchan - Clipe Jogadinha" 
                    className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex items-end p-6 md:p-8">
                  <div>
                    <p className="font-head text-xs uppercase tracking-widest text-teal-400 font-semibold">Artistas & Videoclipe</p>
                    <h3 className="font-head font-bold text-xl md:text-2xl text-off mt-1">É O Tchan — Clipe Jogadinha</h3>
                    <p className="font-body text-sm text-mist mt-1">Direção de cena e cobertura audiovisual</p>
                  </div>
                </div>
              </Link>

              <Link to="/portfolio/fashion-week-passarela-bastidor" className="block md:col-span-1 group relative rounded-2xl overflow-hidden bg-navy/20 border border-navy/40 transition duration-500 hover:border-teal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
                <div className="aspect-[16/10] md:aspect-[3/4] w-full overflow-hidden">
                  <img 
                    src={img(FASHION_MANNERS_PHOTOS[0], 800)} 
                    alt="Fashion Manners - Moda e Campanha" 
                    className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex items-end p-6 md:p-8">
                  <div>
                    <p className="font-head text-xs uppercase tracking-widest text-teal-400 font-semibold">Moda & Campanha</p>
                    <h3 className="font-head font-bold text-xl text-off mt-1">Fashion Manners</h3>
                    <p className="font-body text-sm text-mist mt-1">Editorial · Rio de Janeiro</p>
                  </div>
                </div>
              </Link>

            </div>

            {/* Bloco 3: 1/3 + 2/3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <Link to="/portfolio/ativacao-drinkball" className="block md:col-span-1 group relative rounded-2xl overflow-hidden bg-navy/20 border border-navy/40 transition duration-500 hover:border-teal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
                <div className="aspect-[16/10] md:aspect-[3/4] w-full overflow-hidden">
                  <img 
                    src={img(LANCAMENTO_DRINKBALL_PHOTOS[0], 800)} 
                    alt="Lançamento Drinkball - Ativações & Eventos" 
                    className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex items-end p-6 md:p-8">
                  <div>
                    <p className="font-head text-xs uppercase tracking-widest text-teal-400 font-semibold">Ativação de Marca</p>
                    <h3 className="font-head font-bold text-xl text-off mt-1">Drinkball</h3>
                    <p className="font-body text-sm text-mist mt-1">Feira APAS · São Paulo</p>
                  </div>
                </div>
              </Link>

              <Link to="/portfolio/camarote-ondina-salvador" className="block md:col-span-2 group relative rounded-2xl overflow-hidden bg-navy/20 border border-navy/40 transition duration-500 hover:border-teal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img 
                    src={img(CAMAROTE_ONDINA_PHOTOS[0], 1200)} 
                    alt="Camarote Ondina - Carnaval de Salvador" 
                    className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex items-end p-6 md:p-8">
                  <div>
                    <p className="font-head text-xs uppercase tracking-widest text-teal-400 font-semibold">Eventos & Hospitalidade</p>
                    <h3 className="font-head font-bold text-xl md:text-2xl text-off mt-1">Camarote Ondina</h3>
                    <p className="font-body text-sm text-mist mt-1">Carnaval · Salvador</p>
                  </div>
                </div>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* 5. CASE EM DESTAQUE */}
      <section id="case" className="py-24 bg-ink border-t border-navy/30">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="rounded-3xl p-8 md:p-14 border border-navy/50 case-gradient relative overflow-hidden group transition duration-500 hover:border-teal/50">
            {/* Absolute link to cover the entire card */}
            <Link to="/portfolio/babado-novo-sururu" className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-teal" aria-label="Ver case completo Babado Novo - Clipe Sururu"></Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-0">
              
              <div className="lg:col-span-6 space-y-8">
                
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-head font-semibold uppercase tracking-wider bg-teal/20 text-teal-400 border border-teal/30">
                    Case em Destaque
                  </span>
                  <h2 className="font-head font-extrabold text-3xl sm:text-5xl text-off mt-4 tracking-tight text-balance">
                    Babado Novo —<br/>Clipe Sururu
                  </h2>
                  <p className="font-body text-sm text-mist mt-2">
                    Artistas & Videoclipes · Rio de Janeiro / Salvador
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-navy/60">
                  <div>
                    <p className="font-head text-xs uppercase tracking-wider text-teal-400 font-semibold">Pedido</p>
                    <p className="font-body text-sm md:text-base text-off mt-0.5 text-pretty">Direção de imagem para clipe e backstage.</p>
                  </div>
                  <div>
                    <p className="font-head text-xs uppercase tracking-wider text-teal-400 font-semibold">Contexto</p>
                    <p className="font-body text-sm md:text-base text-off mt-0.5 text-pretty">Artista em set. Palco, luz de alta pressão e estúdio.</p>
                  </div>
                  <div>
                    <p className="font-head text-xs uppercase tracking-wider text-teal-400 font-semibold">O que foi feito</p>
                    <p className="font-body text-sm md:text-base text-off mt-0.5 text-pretty">Fotografia · Vídeo · Direção de cena em tempo real.</p>
                  </div>
                  <div>
                    <p className="font-head text-xs uppercase tracking-wider text-teal-400 font-semibold">Resultado visual</p>
                    <p className="font-body text-sm md:text-base text-off mt-0.5 text-pretty">A imagem que o trabalho e a turnê passam a usar depois.</p>
                  </div>
                </div>

                <div className="pt-4 relative z-20">
                  <Link to="/diagnostico-visual" className="inline-flex items-center gap-2 font-head text-sm font-semibold text-teal-400 hover:text-off transition">
                    <span>Solicitar estudo semelhante</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-xl overflow-hidden border border-navy/40 aspect-[16/10]">
                  <img 
                    src={img(BACKSTAGE_CLIPE_SURURU_PHOTOS[0], 1000)} 
                    alt="Babado Novo - Clipe Sururu Still 1" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="col-span-1 rounded-xl overflow-hidden border border-navy/40 aspect-[4/3]">
                  <img 
                    src={img(BACKSTAGE_CLIPE_SURURU_PHOTOS[1], 600)} 
                    alt="Babado Novo - Backstage e Câmera" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="col-span-1 rounded-xl overflow-hidden border border-navy/40 aspect-[4/3]">
                  <img 
                    src={img(BACKSTAGE_CLIPE_SURURU_PHOTOS[2], 600)} 
                    alt="Babado Novo - Set de Gravação" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. CAPACIDADES & ASSINATURA DO FUNDADOR */}
      <section id="sobre" className="py-24 bg-ink border-t border-navy/30 u-defer-render">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          
          <div className="space-y-6">
            <p className="font-head text-xs uppercase tracking-widest text-teal-400 font-semibold">
              O que entra no projeto
            </p>
            <div className="pt-6 border-t border-navy/60 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-head font-bold text-2xl text-off">01. Direção visual</h3>
                <p className="font-body text-sm text-mist mt-2 leading-relaxed text-pretty">
                  Conceituação de cena, paleta de cor, moodboard e posicionamento de marca antes de ligar a câmera.
                </p>
              </div>
              <div>
                <h3 className="font-head font-bold text-2xl text-off">02. Fotografia & vídeo</h3>
                <p className="font-body text-sm text-mist mt-2 leading-relaxed text-pretty">
                  Operação em grandes eventos, palcos, sets de clipe e campanhas com agilidade e alta precisão técnica.
                </p>
              </div>
              <div>
                <h3 className="font-head font-bold text-2xl text-off">03. Pós & entrega</h3>
                <p className="font-body text-sm text-mist mt-2 leading-relaxed text-pretty">
                  Tratamento de cor cinematográfico, finalização editorial e entrega estruturada para múltiplos canais.
                </p>
              </div>
            </div>
          </div>

          <Link to="/sobre" className="block p-8 md:p-12 rounded-3xl bg-navy/20 border border-navy/40 transition duration-500 hover:border-teal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal group">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              <div className="md:col-span-5">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-navy/50">
                  <img 
                    src={img(FOUNDER_PHOTO, 800)} 
                    alt="Vinicius Cunha no set de gravação com headset e câmera" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="md:col-span-7 space-y-6">
                <div>
                  <p className="font-head text-xs uppercase tracking-widest text-teal-400 font-semibold">Direção Criativa</p>
                  <h3 className="font-head font-extrabold text-3xl sm:text-4xl text-off mt-1">Vinicius Cunha</h3>
                  <p className="font-body text-sm text-mist">Fundador e diretor de cena · Rio de Janeiro · operação nacional</p>
                </div>

                <p className="font-body text-base text-off/90 leading-relaxed text-pretty">
                  Fundador da VERSAVISUAL. Une direção visual cinematográfica à disciplina rigorosa de produção. Atuação em campanhas nacionais, videoclipes de grandes artistas e eventos com público massivo.
                </p>

                <blockquote className="font-head text-xl font-bold text-teal-400 italic">
                  “A produção não falha.”
                </blockquote>

                <div className="pt-4 border-t border-navy/60 flex items-center gap-8">
                  <div>
                    <p className="font-head font-extrabold text-2xl text-off">+120</p>
                    <p className="font-body text-xs text-mist">projetos</p>
                  </div>
                  <div>
                    <p className="font-head font-extrabold text-2xl text-off">25+</p>
                    <p className="font-body text-xs text-mist">marcas</p>
                  </div>
                  <div>
                    <p className="font-head font-extrabold text-2xl text-off">5+</p>
                    <p className="font-body text-xs text-mist">anos</p>
                  </div>
                </div>

              </div>

            </div>
          </Link>

        </div>
      </section>

      {/* 7. CTA & DIAGNÓSTICO FINAL */}
      <section id="contato" className="relative py-28 md:py-36 bg-ink border-t border-navy/40 overflow-hidden u-defer-render">
        
        {/* Background Texture/Vignette */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={img(LANCAMENTO_DRINKBALL_PHOTOS[0], 1600)} 
            alt="" 
            className="w-full h-full object-cover filter blur-sm"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 cta-gradient"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-head font-semibold uppercase tracking-widest bg-navy/80 text-teal-400 border border-teal/30">
            Diagnóstico Visual
          </span>

          <h2 className="font-head font-black text-4xl sm:text-6xl text-off leading-tight tracking-tight text-balance">
            Conte o projeto.<br/>
            <span className="text-off">Devolvemos o caminho.</span>
          </h2>

          <p className="font-body text-base sm:text-lg text-mist max-w-xl mx-auto leading-relaxed text-pretty">
            Direção de imagem para marcas, eventos e artistas com cronograma estruturado e resposta rápida.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/diagnostico-visual" viewTransition className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-head font-semibold bg-teal text-off hover:bg-teal-400 transition shadow-2xl shadow-teal/30">
              Iniciar projeto
            </Link>
            <a href="https://wa.me/5522997624631" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-head font-medium text-off bg-navy/60 hover:bg-navy/90 border border-navy transition flex items-center justify-center gap-2">
              <span>Conversa no WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-mist" />
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
