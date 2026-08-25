import {
  PHOTOS,
  BACKSTAGE_CLIPE_SURURU_PHOTOS,
  BONFIM_HOUSE_PHOTOS,
  CAMAROTE_ONDINA_PHOTOS,
  ENSAIO_AUTORAL_PHOTOS,
  ENSAIO_STREET_PHOTOS,
  FASHION_MANNERS_PHOTOS,
  FESTIVAL_JEANS_TORITAMA_PHOTOS,
  HOTELARIA_LIFESTYLE_PHOTOS,
  LANCAMENTO_DRINKBALL_PHOTOS,
  LOJA_FRIDA_PHOTOS,
  MATERNITY_PHOTOS,
  MEGABLOCO_CHA_DA_ALICE_PHOTOS,
  MODA_SANTALOLA_PHOTOS,
  SYN_ICE_PHOTOS,
} from "../lib/images.ts"

export const WHATSAPP = "https://wa.me/5511950747192"
export const WHATSAPP_LABEL = "11 95074-7192"
export const EMAIL = "hub@versavisual.com.br"

export type NavItem = {
  label: string
  to: string
  hash?: boolean
}

export interface SegmentNavItem {
  label: string
  to: string
}

export const SEGMENT_NAV: SegmentNavItem[] = [
  { label: "Ativações & Eventos", to: "/ativacoes-eventos" },
  { label: "Moda & Campanhas", to: "/moda-campanhas" },
  { label: "Artistas & Videoclipes", to: "/artistas-videoclipes" },
  { label: "Posicionamento Profissional", to: "/posicionamento-profissional" },
  { label: "Imagem Pessoal & Lifestyle", to: "/imagem-pessoal-lifestyle" },
  { label: "Casamentos", to: "/casamentos" },
  { label: "Gestantes", to: "/gestantes" },
  { label: "Hotelaria & Lifestyle", to: "/hotelaria-lifestyle" },
]

export type Service = {
  n: string
  title: string
  desc: string
}

export const HOME_SERVICES: Service[] = [
  {
    n: "01",
    title: "Fotografia",
    desc: "Direção de cena, leitura de luz e sensibilidade editorial. Imagens com peso, presença e intenção.",
  },
  {
    n: "02",
    title: "Storymaking",
    desc: "Narrativas visuais para redes sociais. Posts, carrosséis e reels que comunicam com coerência.",
  },
  {
    n: "03",
    title: "Videomaking",
    desc: "Cobertura completa com equipe técnica, operação multicâmera e entrega editada com identidade.",
  },
  {
    n: "04",
    title: "Roteiros",
    desc: "Roteiros para vídeos institucionais, conteúdo e coberturas temáticas. A narrativa começa antes da câmera ligar.",
  },
  {
    n: "05",
    title: "Direção",
    desc: "Tradução de um objetivo de comunicação em escolhas concretas de enquadramento, luz, movimento e composição.",
  },
  {
    n: "06",
    title: "Cobertura de Eventos",
    desc: "Presença completa nos eventos dos clientes — antes, durante e depois.",
  },
]

export type ServiceGroup = {
  title: string
  items: readonly string[]
}

export const HOME_SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    title: "Fotografia",
    items: ["Cobertura de eventos", "Direção"],
  },
  {
    title: "Vídeo",
    items: [
      "Direção",
      "Roteiro",
      "Videomaking",
      "Storymaking",
      "Cobertura de eventos",
    ],
  },
]

export const HOME_PROCESS = [
  {
    n: "01",
    title: "Briefing",
    desc: "A maioria das produções falha não na captação — falha no que veio antes dela. Na VERSAVISUAL, o planejamento é parte do produto entregue.",
  },
  {
    n: "02",
    title: "Pré-produção",
    desc: "Alinhamento de briefing, roteiro ou pauta de cobertura, reconhecimento de locação, definição de linguagem visual e organização logística da equipe.",
  },
  {
    n: "03",
    title: "Execução",
    desc: "Chegamos ao set com briefing definido, pauta estruturada e linguagem visual alinhada. A execução em campo é disciplinada — mas sensível.",
  },
  {
    n: "04",
    title: "Pós & entrega",
    desc: "Transformamos material bruto em entrega com identidade — tratamento de cor coeso, curadoria autoral e formatos por plataforma.",
  },
]

export const HOME_STATS = [
  { value: "+120", label: "Projetos Autorais" },
  { value: "25+", label: "Marcas Atendidas" },
  { value: "18", label: "Estados Cobertos" },
  { value: "5+", label: "Anos de Operação" },
]

export type Faq = {
  q: string
  a: string
}
export type SegProcess = {
  n: string
  title: string
  desc: string
}

export type SegmentPortfolioGroup = {
  title: string
  description: string
  caseSlugs: readonly string[]
  previewCount?: number
}

export type Segment = {
  slug: string
  index: string // 01..08
  nav: string
  category: string // portfolio category name
  discoverAnchor: string // enriched anchor text
  seoTitle: string
  seoDesc: string
  eyebrow: string
  h1: string
  intro: string
  audienceTitle: string
  audienceText: string
  audienceList: string[]
  problemTitle: string
  problemText: string
  solutionTitle: string
  solutionText: string
  servicesTitle: string
  services: Service[]
  process: SegProcess[]
  mosaicPhotos?: readonly string[]
  mosaicPhotoFits?: readonly ("cover" | "contain")[]
  galleryIntro?: string
  galleryPreviewLimit?: number
  portfolioGroups?: readonly SegmentPortfolioGroup[]
  creativeProposal?: string
  artDirection?: string
  creativeConcept?: string
  ctaEyebrow: string
  ctaTitle: string
  ctaText: string
  faqTitle: string
  faqs: Faq[]
  heroPhoto: string
  photos: readonly string[]
  regions: string[]
}

export const SEGMENTS: Segment[] = [
  {
    slug: "ativacoes-eventos",
    index: "01",
    nav: "Ativações & Eventos",
    category: "Ativações & Eventos",
    discoverAnchor: "Ver fotografia para ativações e eventos",
    seoTitle:
      "Fotografia e Vídeo para Ativações de Marca e Eventos Corporativos",
    seoDesc:
      "Cobertura audiovisual para ativações, feiras, lançamentos e eventos corporativos com fotografia, vídeo, storymaking em tempo real e direção visual.",
    eyebrow: "Início · Ativações & Eventos",
    h1: "Cobertura audiovisual para ativações de marca e eventos corporativos.",
    intro:
      "Fotografia, vídeo, storymaking e direção visual para marcas que precisam registrar, comunicar e ampliar a percepção de valor de suas ativações, feiras, lançamentos e experiências presenciais.",
    audienceTitle: "Marcas, agências e equipes de marketing de eventos.",
    audienceText:
      "Se a sua marca investe em presença física — ativações, feiras, summits, lançamentos — mas o registro não acompanha a qualidade da experiência, o conteúdo perde valor no momento que mais importa.",
    audienceList: [
      "Agências que precisam entregar conteúdo de qualidade ao cliente final.",
      "Marcas com calendário de eventos e ativações recorrentes.",
      "Times de marketing que querem conteúdo em tempo real para redes.",
    ],
    problemTitle: "A experiência foi incrível. E o registro?",
    problemText:
      "Equipes generalistas, sem direção, gerando volume de fotos sem narrativa. Conteúdo que chega tarde demais para as redes. Material bruto que ninguém edita. A ativação acaba e a marca não tem o que mostrar.",
    solutionTitle: "Direção, captação e entrega — integradas.",
    solutionText:
      "Chegamos com pauta de cobertura definida, hierarquia de momentos e linguagem visual alinhada. Operação multicâmera, storymaking em tempo real para as redes e entrega editada por formato e plataforma.",
    servicesTitle: "Uma operação, cobertura completa.",
    services: [
      {
        n: "01",
        title: "Fotografia",
        desc: "Registro com direção de cena: equipe, interação com público, detalhes de marca e momentos-chave.",
      },
      {
        n: "02",
        title: "Vídeo",
        desc: "Cobertura multicâmera, aftermovie e cortes verticais para redes. Identidade visual da marca preservada.",
      },
      {
        n: "03",
        title: "Storymaking",
        desc: "Conteúdo em tempo real durante o evento — stories, reels e posts publicados enquanto a ação acontece.",
      },
      {
        n: "04",
        title: "Direção visual",
        desc: "Linguagem alinhada ao posicionamento da marca, do enquadramento ao tratamento de cor.",
      },
      {
        n: "05",
        title: "Conteúdo p/ redes",
        desc: "Entregáveis nos formatos certos: 9:16, 1:1 e 16:9, prontos para publicar.",
      },
      {
        n: "06",
        title: "Relatório de uso",
        desc: "Material organizado por momento e câmera, com curadoria e nomenclatura para o time da marca.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Briefing",
        desc: "Entendemos a ativação, os momentos prioritários e onde o conteúdo será usado.",
      },
      {
        n: "02",
        title: "Pauta",
        desc: "Hierarquia de captação, posicionamento de câmera e estimativa por cena.",
      },
      {
        n: "03",
        title: "Operação",
        desc: "Equipe coordenada em campo, com storymaking publicado em tempo real.",
      },
      {
        n: "04",
        title: "Entrega",
        desc: "Edição por formato, curadoria de imagens e material organizado para o time.",
      },
    ],
    galleryIntro:
      "Uma seleção de coberturas para marcas, eventos e experiências presenciais. Organizamos os registros por tipo de entrega: presença de marca, público, produto, bastidores, palco e conteúdo em tempo real.",
    galleryPreviewLimit: 12,
    portfolioGroups: [
      {
        title: "Feiras & lançamentos",
        description:
          "Projetos com presença de marca, produto em evidência, interação com público e conteúdo de apoio para equipes comerciais.",
        caseSlugs: [
          "ativacao-drinkball",
          "symbh-evento-corporativo",
          "evento-fjt-palco-camarote",
        ],
        previewCount: 4,
      },
      {
        title: "Experiências de marca / carnaval",
        description:
          "Coberturas de grande fluxo, palco, público e experiência presencial com narrativa visual de escala.",
        caseSlugs: [
          "carnaval-de-rua-experiencia-publico",
          "camarote-ondina-salvador",
        ],
        previewCount: 4,
      },
      {
        title: "Corporativo / relacionamento",
        description:
          "Registros de ambiente, convidados, equipe e momentos de relacionamento para marcas e operações presenciais.",
        caseSlugs: ["festival-bon-cobertura-corporativa"],
        previewCount: 4,
      },
    ],
    creativeProposal:
      "Transformamos ativações e eventos corporativos em ativos perenes de posicionamento. Nossa proposta integra cobertura em tempo real para redes sociais e captação de alta fidelidade para relatórios e peças comerciais.",
    artDirection:
      "Direção de fotografia dinâmica que valoriza a cenografia, interação espontânea do público e detalhes da marca. Iluminação balanceada e color grading alinhado à identidade corporativa.",
    creativeConcept:
      "A narrativa visual foca no impacto da experiência humana e na grandiosidade do evento, convertendo momentos efêmeros em autoridade contínua e prova social indiscutível.",
    ctaEyebrow: "Próxima ativação",
    ctaTitle: "Sua próxima ativação merece um registro à altura.",
    ctaText:
      "Conte o que vem por aí. Montamos a operação audiovisual ideal para o seu evento.",
    faqTitle: "FAQ — Ativações & Eventos.",
    faqs: [
      {
        q: "Vocês entregam conteúdo durante o evento?",
        a: "Sim. O storymaking em tempo real é parte central do serviço — publicamos stories, reels e posts enquanto a ativação acontece, alinhados ao tom da marca.",
      },
      {
        q: "Atendem fora do Rio de Janeiro?",
        a: "Sim. A operação é nacional — vamos onde a história acontece. Logística e equipe são dimensionadas no briefing.",
      },
      {
        q: "Qual o prazo de entrega do material editado?",
        a: "Conteúdo em tempo real sai durante o evento. O material editado completo é definido em briefing conforme o uso — normalmente entre 3 e 10 dias úteis.",
      },
      {
        q: "Como funciona o orçamento?",
        a: "Pelo diagnóstico visual entendemos escopo, número de câmeras, duração e entregáveis. A partir daí montamos uma proposta personalizada por faixa de investimento.",
      },
    ],
    heroPhoto: PHOTOS.events[18],
    photos: PHOTOS.events,
    regions: [
      "Rio de Janeiro",
      "São Paulo",
      "Belo Horizonte",
      "Salvador",
      "Operação nacional",
    ],
  },
  {
    slug: "moda-campanhas",
    index: "02",
    nav: "Moda & Campanhas",
    category: "Moda & Campanhas",
    discoverAnchor: "Ver fotografia de moda e campanhas",
    seoTitle: "Fotografia de Moda, Beauty e Campanhas para Marcas",
    seoDesc:
      "Direção criativa, fotografia editorial, beauty, lifestyle, fashion film e campanhas para marcas de moda, beleza e lifestyle.",
    eyebrow: "Início · Moda & Campanhas",
    h1: "Fotógrafo de moda, beauty e campanhas para marcas.",
    intro:
      "Direção criativa, fotografia editorial, beauty, lifestyle e campanhas comerciais para marcas que precisam construir imagem com intenção, estética e posicionamento.",
    audienceTitle: "Marcas de moda, beauty e lifestyle que vendem por imagem.",
    audienceText:
      "Quando o produto é desejo, a imagem é o produto. Marcas que competem por percepção precisam de direção visual — não de fotos soltas sem conceito.",
    audienceList: [
      "Marcas de moda, beauty e acessórios em fase de campanha ou lançamento.",
      "Agências que precisam de produção e direção de imagem para clientes.",
      "Negócios lifestyle que constroem marca no Instagram e em mídia paga.",
    ],
    problemTitle: "Foto bonita não é o mesmo que campanha.",
    problemText:
      "Sem direção criativa, a imagem não comunica posicionamento. O resultado é um banco de fotos genérico que poderia ser de qualquer marca — e que envelhece em uma temporada.",
    solutionTitle: "Conceito, direção e estética comercial.",
    solutionText:
      "Partimos do posicionamento da marca para desenhar referência, styling, luz e tratamento. Cada frame serve à narrativa da campanha — do editorial ao fashion film, do beauty ao lifestyle.",
    servicesTitle: "Da referência ao frame final.",
    services: [
      {
        n: "01",
        title: "Direção criativa",
        desc: "Conceito visual, moodboard, referências e linguagem alinhados ao posicionamento da marca.",
      },
      {
        n: "02",
        title: "Fotografia editorial",
        desc: "Editorial de moda com leitura de luz e composição intencional. Imagens com assinatura.",
      },
      {
        n: "03",
        title: "Beauty",
        desc: "Fotografia de beauty com foco em pele, detalhe e textura — respeitando o produto.",
      },
      {
        n: "04",
        title: "Lifestyle",
        desc: "Imagens de lifestyle e produto em contexto, para feed, e-commerce e mídia.",
      },
      {
        n: "05",
        title: "Fashion film",
        desc: "Vídeo de moda e campanha — movimento, ritmo e estética para redes e mídia paga.",
      },
      {
        n: "06",
        title: "Tratamento",
        desc: "Correção e gradação de cor coesa entre todos os materiais da campanha.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Conceito",
        desc: "Posicionamento, referências e moodboard da campanha.",
      },
      {
        n: "02",
        title: "Pré-produção",
        desc: "Styling, locação, casting e linguagem visual definidos.",
      },
      {
        n: "03",
        title: "Produção",
        desc: "Direção ativa no set — luz, composição e estética sob controle.",
      },
      {
        n: "04",
        title: "Entrega",
        desc: "Tratamento de cor e entrega por formato e plataforma.",
      },
    ],
    creativeProposal:
      "Construímos campanhas e editoriais de moda com estética apurada e forte apelo comercial, conectando a identidade da coleção ao desejo do consumidor final em múltiplos canais.",
    artDirection:
      "Composição rigorosa, estudo refinado de luz e texturas têxteis, direção de casting e poses que valorizam caimento, conceito de styling e atmosfera da temporada.",
    creativeConcept:
      "A imagem como veículo principal de posicionamento da marca, traduzindo tendências globais e autenticidade autoral em frames de alto impacto para lookbooks, e-commerce e mídias pagas.",
    ctaEyebrow: "Sua próxima campanha",
    ctaTitle: "Sua marca merece uma imagem que vende.",
    ctaText:
      "Conte o conceito da campanha. Desenhamos a direção visual e a produção ideais.",
    faqTitle: "FAQ — Moda & Campanhas.",
    faqs: [
      {
        q: "Vocês fazem direção criativa ou só fotografam?",
        a: "Fazemos direção criativa completa — conceito, referências, styling e linguagem visual. A fotografia é a execução de uma estratégia, não um clique isolado.",
      },
      {
        q: "Atendem e-commerce e catálogo?",
        a: "Sim. Produzimos desde editorial de campanha até lifestyle de produto e imagens para e-commerce, com tratamento coeso entre os materiais.",
      },
      {
        q: "Fazem fashion film?",
        a: "Sim. Produzimos vídeo de moda e campanha para redes e mídia paga, com a mesma direção visual da fotografia.",
      },
      {
        q: "Como funciona o orçamento?",
        a: "Pelo diagnóstico visual entendemos escopo, número de looks, equipe e entregáveis, e montamos uma proposta por faixa de investimento.",
      },
    ],
    heroPhoto: FESTIVAL_JEANS_TORITAMA_PHOTOS[26],
    photos: PHOTOS.fashion,
    regions: ["Rio de Janeiro", "São Paulo", "Operação nacional"],
  },
  {
    slug: "artistas-videoclipes",
    index: "03",
    nav: "Artistas & Videoclipes",
    category: "Artistas & Videoclipes",
    discoverAnchor: "Ver produção audiovisual para artistas",
    seoTitle: "Videoclipes, Fotografia e Conteúdo para Artistas",
    seoDesc:
      "Direção e produção audiovisual para artistas, shows, videoclipes, press kits, teasers, making of e conteúdo para redes.",
    eyebrow: "Início · Artistas & Videoclipes",
    h1: "Direção e produção audiovisual para artistas, shows e videoclipes.",
    intro:
      "Criação visual para artistas que precisam transformar música, estética e narrativa em imagem — com direção, fotografia, vídeo, making of, capa, teaser e conteúdo para redes.",
    audienceTitle: "Artistas e selos que tratam imagem como parte da obra.",
    audienceText:
      "Música é som, mas o público também consome a imagem. Artistas que querem crescer precisam de uma identidade visual tão forte quanto a sonora.",
    audienceList: [
      "Artistas independentes lançando single, EP ou álbum.",
      "Selos e produtores que precisam de pacote visual para releases.",
      "Artistas em turnê que querem cobertura de shows e conteúdo para redes.",
    ],
    problemTitle: "O som está pronto. E a imagem?",
    problemText:
      "Lançar música sem direção visual é entregar metade da obra. Clipes amadores, capas sem conceito e ausência de conteúdo de bastidor enfraquecem o impacto do release.",
    solutionTitle: "Um universo visual para o release.",
    solutionText:
      "Construímos a imagem do artista em torno da música — videoclipe com direção, fotografia de divulgação, capa, teaser, making of e cortes para redes. Tudo coerente, do single ao show.",
    servicesTitle: "Do clipe ao conteúdo de redes.",
    services: [
      {
        n: "01",
        title: "Direção de clipe",
        desc: "Conceito, roteiro e direção de videoclipe alinhados à narrativa da música.",
      },
      {
        n: "02",
        title: "Captação de vídeo",
        desc: "Operação multicâmera com movimento e linguagem coerentes ao tom do projeto.",
      },
      {
        n: "03",
        title: "Fotografia",
        desc: "Fotos de divulgação, capa e ensaio do artista com direção de cena.",
      },
      {
        n: "04",
        title: "Cobertura de shows",
        desc: "Registro de shows e turnê — palco, bastidor e público.",
      },
      {
        n: "05",
        title: "Teaser & making of",
        desc: "Conteúdo de antecipação e bastidor para alimentar o lançamento.",
      },
      {
        n: "06",
        title: "Cortes para redes",
        desc: "Reels e cortes verticais para sustentar o release nas plataformas.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Conceito",
        desc: "Imersão na música, referências e universo visual do artista.",
      },
      {
        n: "02",
        title: "Roteiro",
        desc: "Roteiro do clipe, decupagem e plano de captação.",
      },
      {
        n: "03",
        title: "Captação",
        desc: "Direção ativa em set ou show, com operação multicâmera.",
      },
      {
        n: "04",
        title: "Pós & entrega",
        desc: "Montagem, cor e entrega de clipe, teaser e cortes para redes.",
      },
    ],
    creativeProposal:
      "Desenvolvemos a identidade audiovisual de artistas, bandas e selos por meio de videoclipes cinematográficos, capas conceituais, teasers e cobertura completa de shows e turnês.",
    artDirection:
      "Linguagem visual expressiva e dramática, jogos de luz e sombra, movimentação de câmera envolvente e montagem ritmada no compasso da música.",
    creativeConcept:
      "Materializar o universo sonoro em narrativa imagética envolvente, amplificando o alcance orgânico do release e consolidando a presença artística no ecossistema digital.",
    ctaEyebrow: "Seu próximo release",
    ctaTitle: "Transforme sua música em um universo visual.",
    ctaText:
      "Conte o conceito do seu lançamento. Montamos o pacote audiovisual ideal para o artista.",
    faqTitle: "FAQ — Artistas & Videoclipes.",
    faqs: [
      {
        q: "Vocês produzem o clipe do conceito à entrega?",
        a: "Sim. Fazemos conceito, roteiro, direção, captação e pós-produção do videoclipe, além do material de divulgação.",
      },
      {
        q: "Fazem cobertura de shows e turnê?",
        a: "Sim. Cobrimos shows e turnês com registro de palco, bastidor e público, entregando vídeo e fotografia.",
      },
      {
        q: "Entregam conteúdo para redes além do clipe?",
        a: "Sim. Teaser, making of e cortes verticais fazem parte do pacote para sustentar o lançamento nas plataformas.",
      },
      {
        q: "Como funciona o orçamento?",
        a: "Pelo diagnóstico visual entendemos o escopo do release, locações e equipe, e montamos uma proposta por faixa de investimento.",
      },
    ],
    heroPhoto: BACKSTAGE_CLIPE_SURURU_PHOTOS[7] || PHOTOS.artists[0],
    photos: PHOTOS.artists,
    mosaicPhotos: [
      BACKSTAGE_CLIPE_SURURU_PHOTOS[7],
      BACKSTAGE_CLIPE_SURURU_PHOTOS[1],
      BACKSTAGE_CLIPE_SURURU_PHOTOS[2],
    ],
    regions: ["Rio de Janeiro", "Salvador", "São Paulo", "Operação nacional"],
  },
  {
    slug: "posicionamento-profissional",
    index: "04",
    nav: "Posicionamento Profissional",
    category: "Posicionamento Profissional",
    discoverAnchor: "Ver retratos de posicionamento profissional",
    seoTitle: "Fotografia de Posicionamento para Profissionais e Clínicas",
    seoDesc:
      "Retratos corporativos, vídeo institucional e direção visual para profissionais, clínicas, equipes e marcas pessoais.",
    eyebrow: "Início · Posicionamento Profissional",
    h1: "Fotografia de posicionamento para profissionais, clínicas e marcas pessoais.",
    intro:
      "Retratos, vídeos institucionais e direção visual para profissionais que precisam comunicar autoridade, confiança e valor através da imagem.",
    audienceTitle: "Profissionais e clínicas que vendem confiança.",
    audienceText:
      "Em mercados de alto valor, a decisão começa pela percepção. Quem comunica autoridade na imagem conquista confiança antes da primeira conversa.",
    audienceList: [
      "Médicos, dentistas e clínicas que querem comunicar autoridade.",
      "Executivos e consultores construindo marca pessoal.",
      "Profissionais liberais que vendem serviço de alto valor.",
    ],
    problemTitle: "Sua imagem não comunica o seu valor.",
    problemText:
      "Retrato de celular, fundo improvisado e ausência de identidade visual passam a mensagem errada. Em mercados premium, isso custa autoridade — e clientes.",
    solutionTitle: "Imagem à altura da sua autoridade.",
    solutionText:
      "Construímos um sistema visual de posicionamento: retratos com direção, vídeo institucional e linguagem coerente para site, redes e materiais. Confiança que se vê antes de se contratar.",
    servicesTitle: "Retrato, vídeo e marca pessoal.",
    services: [
      {
        n: "01",
        title: "Retrato corporativo",
        desc: "Retratos com direção de pose, luz e expressão que comunicam autoridade e confiança.",
      },
      {
        n: "02",
        title: "Vídeo institucional",
        desc: "Vídeo de apresentação para clínicas e profissionais — claro, sóbrio e profissional.",
      },
      {
        n: "03",
        title: "Direção visual",
        desc: "Linguagem visual coerente para site, redes sociais e materiais de divulgação.",
      },
      {
        n: "04",
        title: "Ambiente & equipe",
        desc: "Registro de consultório, clínica e equipe para transmitir estrutura e cuidado.",
      },
      {
        n: "05",
        title: "Conteúdo p/ redes",
        desc: "Material de autoridade para alimentar perfis profissionais com consistência.",
      },
      {
        n: "06",
        title: "Tratamento",
        desc: "Tratamento de imagem que respeita a pele e mantém naturalidade profissional.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Briefing",
        desc: "Entendemos o posicionamento, o público e onde a imagem será usada.",
      },
      {
        n: "02",
        title: "Direção",
        desc: "Definição de locação, styling e linguagem visual do profissional.",
      },
      {
        n: "03",
        title: "Produção",
        desc: "Sessão com direção de pose, luz e expressão — sem improviso.",
      },
      {
        n: "04",
        title: "Entrega",
        desc: "Tratamento e entrega de retratos, vídeo e material para redes.",
      },
    ],
    creativeProposal:
      "Sistemas visuais completos para executivos, médicos, consultores e líderes que precisam comunicar credibilidade, sofisticação e autoridade inquestionável em seus mercados.",
    artDirection:
      "Iluminação dimensional suave, direção empática de expressão e postura, cenários contemporâneos e pós-produção que preserva a naturalidade da pele com acabamento premium.",
    creativeConcept:
      "Substituir retratos engessados por uma presença executiva autêntica e confiável, que fecha negócios e gera conexão antes do primeiro aperto de mão.",
    ctaEyebrow: "Sua marca pessoal",
    ctaTitle: "Comunique autoridade antes da primeira conversa.",
    ctaText:
      "Conte sobre o seu posicionamento. Desenhamos o sistema visual ideal para a sua marca pessoal.",
    faqTitle: "FAQ — Posicionamento Profissional.",
    faqs: [
      {
        q: "Atendem clínicas e equipes, não só indivíduos?",
        a: "Sim. Produzimos retratos individuais, de equipe e registro de ambiente para clínicas e consultórios.",
      },
      {
        q: "Fazem vídeo institucional além de foto?",
        a: "Sim. Produzimos vídeo de apresentação e conteúdo de autoridade alinhados à identidade visual.",
      },
      {
        q: "A sessão é dirigida? Não sou modelo.",
        a: "Totalmente dirigida. Conduzimos pose, expressão e luz — você não precisa saber posar, nós conduzimos.",
      },
      {
        q: "Como funciona o orçamento?",
        a: "Pelo diagnóstico visual entendemos escopo, entregáveis e uso, e montamos uma proposta por faixa de investimento.",
      },
    ],
    heroPhoto: BONFIM_HOUSE_PHOTOS[1] || PHOTOS.professional[0],
    photos: PHOTOS.professional,
    regions: ["Rio de Janeiro", "São Paulo", "Operação nacional"],
  },
  {
    slug: "imagem-pessoal-lifestyle",
    index: "05",
    nav: "Imagem Pessoal & Lifestyle",
    category: "Imagem Pessoal & Lifestyle",
    discoverAnchor: "Ver ensaio de imagem pessoal e lifestyle",
    seoTitle: "Ensaio Fotográfico Lifestyle e Imagem Pessoal",
    seoDesc:
      "Ensaio fotográfico com direção de pose, luz natural e estética pessoal para Instagram, autoestima, perfil pessoal e momentos de vida.",
    eyebrow: "Início · Imagem Pessoal & Lifestyle",
    h1: "Ensaio lifestyle e imagem pessoal para quem quer se ver bem.",
    intro:
      "Fotografia com direção de pose, luz natural e olhar sensível para pessoas que querem fotos para Instagram, ensaio autoral, autoestima, dating profile ou um momento de vida bem registrado.",
    audienceTitle: "Pessoas que querem se reconhecer na própria imagem.",
    audienceText:
      "Você não precisa ser modelo, influenciador ou ter uma marca pronta. A sessão existe para traduzir presença, beleza e personalidade em imagens que parecem suas de verdade.",
    audienceList: [
      "Quem quer fotos bonitas e naturais para Instagram ou perfil pessoal.",
      "Pessoas em fase nova de vida, aniversário, recomeço ou autoestima.",
      "Criadores e profissionais que querem conteúdo leve sem parecer corporativo.",
    ],
    problemTitle: "A câmera intimida quando falta direção.",
    problemText:
      "Muita gente quer fotos boas, mas trava porque não sabe posar, não sabe que roupa usar ou tem medo de parecer artificial. O resultado vira foto bonita dos outros — nunca sua.",
    solutionTitle: "Direção para você se sentir bem em cena.",
    solutionText:
      "Conduzimos pose, expressão, movimento, locação e ritmo da sessão. A ideia não é fabricar personagem: é encontrar uma imagem bonita, honesta e publicável de quem você já é.",
    servicesTitle: "Da autoestima ao feed.",
    services: [
      {
        n: "01",
        title: "Ensaio autoral",
        desc: "Sessão fotográfica com conceito leve, direção de pose e estética pessoal.",
      },
      {
        n: "02",
        title: "Fotos para Instagram",
        desc: "Imagens pensadas para feed, stories, perfil e presença digital.",
      },
      {
        n: "03",
        title: "Direção de pose",
        desc: "Condução completa de corpo, olhar, mãos e expressão. Você não precisa saber posar.",
      },
      {
        n: "04",
        title: "Lifestyle externo",
        desc: "Locações urbanas, praia, casa, hotel ou espaços com luz natural e atmosfera.",
      },
      {
        n: "05",
        title: "Beauty natural",
        desc: "Retratos com foco em pele, presença e beleza real, sem descaracterizar.",
      },
      {
        n: "06",
        title: "Curadoria",
        desc: "Seleção e tratamento de imagens para entregar um conjunto coeso e fácil de usar.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Conversa",
        desc: "Entendemos seu momento, referências, inseguranças e onde as fotos serão usadas.",
      },
      {
        n: "02",
        title: "Direção",
        desc: "Definimos clima, locação, roupa e caminho visual da sessão.",
      },
      {
        n: "03",
        title: "Sessão",
        desc: "Condução leve de pose e movimento para você relaxar e se reconhecer.",
      },
      {
        n: "04",
        title: "Entrega",
        desc: "Curadoria, tratamento e entrega das imagens para usar no feed, perfil ou memória pessoal.",
      },
    ],
    creativeProposal:
      "Ensaios autorais e retratos lifestyle com direção acolhedora, capturando personalidade, estilo e beleza natural para redes sociais, novos momentos de vida e autoestima.",
    artDirection:
      "Luz natural, locações urbanas e arquitetônicas marcantes, direção de pose fluida e color grading caloroso que destaca o melhor ângulo de quem está em cena.",
    creativeConcept:
      "A celebração da individualidade sem filtros artificiais: imagens espontâneas e honestas que constroem uma presença digital marcante e autêntica.",
    ctaEyebrow: "Seu ensaio",
    ctaTitle: "Você merece se ver bem na própria imagem.",
    ctaText:
      "Conte o que você quer sentir quando olhar para as fotos. A gente desenha uma sessão que combine com você.",
    faqTitle: "FAQ — Imagem Pessoal & Lifestyle.",
    faqs: [
      {
        q: "Eu nunca fiz ensaio. Vocês dirigem tudo?",
        a: "Sim. A sessão é totalmente dirigida: pose, expressão, movimento e ritmo. Você não precisa chegar sabendo o que fazer.",
      },
      {
        q: "Serve para fotos de Instagram?",
        a: "Sim. Pensamos a entrega para perfil, feed, stories e presença digital, sem deixar a imagem artificial.",
      },
      {
        q: "Pode ser um ensaio sem objetivo profissional?",
        a: "Pode. O ensaio pode ser por autoestima, aniversário, fase nova, dating profile ou simplesmente para se ver bem.",
      },
      {
        q: "Como funciona o orçamento?",
        a: "Pelo diagnóstico visual entendemos locação, duração, número de looks e quantidade de imagens, e montamos uma proposta por faixa de investimento.",
      },
    ],
    heroPhoto: ENSAIO_AUTORAL_PHOTOS[69] || PHOTOS.personal[0],
    photos: PHOTOS.personal,
    mosaicPhotos: [
      ENSAIO_AUTORAL_PHOTOS[25],
      ENSAIO_AUTORAL_PHOTOS[41],
      ENSAIO_AUTORAL_PHOTOS[42],
    ],
    mosaicPhotoFits: ["contain", "cover", "cover"],
    regions: ["Rio de Janeiro", "Operação sob consulta"],
  },
  {
    slug: "casamentos",
    index: "06",
    nav: "Casamentos",
    category: "Casamentos",
    discoverAnchor: "Ver fotografia e vídeo de casamento",
    seoTitle: "Fotografia e Vídeo de Casamento com Direção Sensível",
    seoDesc:
      "Cobertura de casamento com fotografia, filme, making of, cerimônia, festa, retratos do casal e curadoria de entrega.",
    eyebrow: "Início · Casamentos",
    h1: "Fotografia e vídeo de casamento para viver, lembrar e sentir.",
    intro:
      "Registro de casamento com olhar narrativo: direção leve, presença discreta, retratos naturais, cerimônia, festa, detalhes e atmosfera do dia sem transformar afeto em pose dura.",
    audienceTitle: "Casais que querem memória com verdade e beleza.",
    audienceText:
      "O casamento passa rápido. A imagem precisa guardar o que aconteceu e também o que foi sentido: a espera, o encontro, o riso, o abraço, o cenário e a energia de quem estava ali.",
    audienceList: [
      "Casais que querem fotos elegantes, naturais e com direção sensível.",
      "Casamentos ao ar livre, mini weddings, destination e celebrações íntimas.",
      "Famílias que valorizam álbum, filme e memória visual com acabamento editorial.",
    ],
    problemTitle: "Um dia irrepetível não pode virar registro genérico.",
    problemText:
      "Quando falta direção e sensibilidade, as fotos ficam posadas demais ou soltas demais. O casal não se reconhece, os detalhes se perdem e a história do dia vira uma sequência sem emoção.",
    solutionTitle: "Presença discreta, narrativa e direção quando precisa.",
    solutionText:
      "Acompanhamos o dia com leitura de momento e direção leve nos retratos. O resultado é um conjunto coeso: espontâneo quando a cena pede, editorial quando a memória merece.",
    servicesTitle: "Do making of à última dança.",
    services: [
      {
        n: "01",
        title: "Making of",
        desc: "Preparação, detalhes, vestido, encontro com família e clima antes da cerimônia.",
      },
      {
        n: "02",
        title: "Cerimônia",
        desc: "Registro atento aos votos, entradas, emoção, gestos pequenos e momentos-chave.",
      },
      {
        n: "03",
        title: "Retratos do casal",
        desc: "Direção leve para fotos naturais, elegantes e sem rigidez.",
      },
      {
        n: "04",
        title: "Festa",
        desc: "Energia da pista, convidados, brindes, abraços e acontecimentos reais.",
      },
      {
        n: "05",
        title: "Filme",
        desc: "Vídeo de casamento com narrativa, ritmo e sensibilidade para reviver o dia.",
      },
      {
        n: "06",
        title: "Curadoria",
        desc: "Entrega organizada, tratamento coeso e seleção pensada para álbum e redes.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Conversa",
        desc: "Entendemos o estilo do casal, roteiro do dia e prioridades emocionais.",
      },
      {
        n: "02",
        title: "Plano",
        desc: "Mapeamos horários, locações, família, entradas e momentos que não podem faltar.",
      },
      {
        n: "03",
        title: "Cobertura",
        desc: "Registro do dia com direção leve, presença atenta e cuidado com os detalhes.",
      },
      {
        n: "04",
        title: "Entrega",
        desc: "Curadoria, tratamento e organização das imagens e filmes para guardar e compartilhar.",
      },
    ],
    creativeProposal:
      "Documentação sensível e sofisticada de casamentos e destination weddings, registrando o afeto genuíno e a atmosfera inesquecível da celebração com olhar cinematográfico.",
    artDirection:
      "Estética documental com acabamento editorial, leitura precisa da luz natural, enquadramentos poéticos e paleta atemporal que resiste ao passar das décadas.",
    creativeConcept:
      "Contar a história real do dia — das lágrimas discretas da cerimônia à euforia da pista —, criando uma herança visual viva que emociona por gerações.",
    ctaEyebrow: "Seu casamento",
    ctaTitle: "O dia passa. A imagem fica.",
    ctaText:
      "Conte como será a celebração. A gente desenha uma cobertura com o tamanho, a sensibilidade e o ritmo do seu casamento.",
    faqTitle: "FAQ — Casamentos.",
    faqs: [
      {
        q: "Vocês dirigem os retratos do casal?",
        a: "Sim. A direção é leve e natural, para o casal se sentir confortável sem perder espontaneidade.",
      },
      {
        q: "Fazem foto e vídeo no mesmo pacote?",
        a: "Sim. Montamos cobertura integrada de fotografia e vídeo conforme o tamanho do casamento e os momentos prioritários.",
      },
      {
        q: "Atendem mini wedding e casamento ao ar livre?",
        a: "Sim. A linguagem funciona muito bem para celebrações íntimas, externas e destination weddings.",
      },
      {
        q: "Como funciona o orçamento?",
        a: "Pelo diagnóstico entendemos data, local, duração, número de convidados e entregáveis, e montamos uma proposta por faixa de investimento.",
      },
    ],
    heroPhoto: PHOTOS.weddings[7],
    photos: PHOTOS.weddings,
    regions: ["Rio de Janeiro", "Macaé", "Destination weddings"],
  },
  {
    slug: "gestantes",
    index: "07",
    nav: "Gestantes",
    category: "Gestantes",
    discoverAnchor: "Ver ensaio gestante",
    seoTitle: "Ensaio Gestante com Direção Natural e Sensível",
    seoDesc:
      "Fotografia de maternidade com direção de pose, luz natural, família, beauty natural e entrega para memória, álbum e redes.",
    eyebrow: "Início · Gestantes",
    h1: "Ensaio gestante para guardar a beleza desse corpo em transformação.",
    intro:
      "Fotografia de maternidade com direção sensível, luz natural e estética leve para registrar presença, vínculo, corpo e memória sem pose artificial.",
    audienceTitle: "Mulheres e famílias vivendo uma fase que merece imagem.",
    audienceText:
      "A gestação muda o corpo, o tempo e a forma de se olhar. A sessão existe para transformar essa fase em memória bonita, acolhedora e verdadeira.",
    audienceList: [
      "Gestantes que querem se sentir bonitas e seguras diante da câmera.",
      "Famílias que querem registrar vínculo, espera e afeto.",
      "Ensaios na praia, natureza, casa, hotel ou locações com luz natural.",
    ],
    problemTitle: "Nem todo ensaio gestante precisa parecer igual.",
    problemText:
      "Muita sessão vira repetição de poses prontas. A mulher se sente personagem, não protagonista. O registro fica bonito, mas não parece dela.",
    solutionTitle: "Direção de pose com escuta e naturalidade.",
    solutionText:
      "Criamos uma sessão em torno do corpo, do ritmo e da personalidade da gestante. Dirigimos postura, mãos, olhar e movimento para a imagem ficar bonita sem perder verdade.",
    servicesTitle: "Do cuidado à memória.",
    services: [
      {
        n: "01",
        title: "Conceito",
        desc: "Definição de clima, locação, referências e intenção do ensaio.",
      },
      {
        n: "02",
        title: "Direção de pose",
        desc: "Condução sensível de corpo, mãos, olhar e movimento para trazer conforto.",
      },
      {
        n: "03",
        title: "Luz natural",
        desc: "Uso de praia, natureza ou ambientes claros para valorizar pele e atmosfera.",
      },
      {
        n: "04",
        title: "Família",
        desc: "Possibilidade de incluir parceiro, filhos e vínculos importantes no registro.",
      },
      {
        n: "05",
        title: "Beauty natural",
        desc: "Retratos com estética leve, respeitando pele, corpo e momento.",
      },
      {
        n: "06",
        title: "Entrega",
        desc: "Curadoria e tratamento de imagens para álbum, impressão, redes e lembrança.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Conversa",
        desc: "Entendemos fase da gestação, referências, conforto e pessoas que participam.",
      },
      {
        n: "02",
        title: "Preparação",
        desc: "Definimos locação, horário de luz, roupa e caminho visual da sessão.",
      },
      {
        n: "03",
        title: "Sessão",
        desc: "Direção tranquila para pose, movimento e expressão sem pressa.",
      },
      {
        n: "04",
        title: "Entrega",
        desc: "Curadoria, tratamento natural e imagens prontas para guardar, imprimir e compartilhar.",
      },
    ],
    creativeProposal:
      "Ensaios de maternidade que honram o corpo, a transformação e a poesia da espera, criando memórias íntimas e acolhedoras com profundo respeito ao tempo da mulher.",
    artDirection:
      "Minimalismo visual, iluminação suave, tons orgânicos e direção delicada de mãos, curvas e expressões, valorizando a conexão familiar e o vínculo materno.",
    creativeConcept:
      "Eternizar a transição para a maternidade com elegância atemporal e sensibilidade artística, livre de clichês e centrada na potência feminina.",
    ctaEyebrow: "Seu ensaio gestante",
    ctaTitle: "Você merece lembrar dessa fase com carinho.",
    ctaText:
      "Conte em que momento da gestação você está. A gente desenha uma sessão confortável, bonita e possível para você.",
    faqTitle: "FAQ — Gestantes.",
    faqs: [
      {
        q: "Qual o melhor período para fazer o ensaio?",
        a: "Geralmente entre 28 e 34 semanas, mas ajustamos conforme conforto, saúde e intenção visual da gestante.",
      },
      {
        q: "Eu não sei posar. Vocês dirigem?",
        a: "Sim. A sessão é totalmente dirigida com cuidado para corpo, mãos, olhar e movimento.",
      },
      {
        q: "Pode incluir família?",
        a: "Pode. Parceiro, filhos e vínculos importantes podem entrar no ensaio de forma natural.",
      },
      {
        q: "Como funciona o orçamento?",
        a: "Pelo diagnóstico entendemos locação, duração, participantes e quantidade de imagens, e montamos uma proposta por faixa de investimento.",
      },
    ],
    heroPhoto: MATERNITY_PHOTOS[20] || PHOTOS.maternity[0],
    photos: PHOTOS.maternity,
    mosaicPhotos: [
      PHOTOS.maternity[0],
      PHOTOS.maternity[1],
      PHOTOS.maternity[3],
    ],
    mosaicPhotoFits: ["cover", "cover", "contain"],
    regions: ["Rio de Janeiro", "Praia e natureza", "Operação nacional"],
  },
  {
    slug: "hotelaria-lifestyle",
    index: "08",
    nav: "Hotelaria & Lifestyle",
    category: "Hotelaria & Lifestyle",
    discoverAnchor: "Ver fotografia para hotelaria e lifestyle",
    seoTitle: "Fotografia e Vídeo Lifestyle para Hotéis e Experiências",
    seoDesc:
      "Produção audiovisual para hotéis, pousadas, resorts, gastronomia, turismo e experiências com foco em desejo, atmosfera e conversão.",
    eyebrow: "Início · Hotelaria & Lifestyle",
    h1: "Fotografia e vídeo lifestyle para hotéis, resorts e experiências.",
    intro:
      "Produção de imagens para hotelaria, gastronomia, turismo e experiências, com foco em desejo, atmosfera, lifestyle e conversão comercial.",
    audienceTitle: "Hotéis, resorts e experiências que vendem atmosfera.",
    audienceText:
      "Em turismo e hospitalidade, o cliente compra antes de chegar. A imagem precisa transmitir desejo, atmosfera e o sentimento de estar ali — não apenas mostrar o espaço.",
    audienceList: [
      "Hotéis, pousadas e resorts que vendem por reserva online.",
      "Restaurantes e experiências gastronômicas premium.",
      "Operadoras de turismo e marcas de lifestyle e hospitalidade.",
    ],
    problemTitle: "Fotos de imobiliária não vendem experiência.",
    problemText:
      "Imagens frias, sem gente e sem atmosfera, mostram o espaço mas não despertam desejo. O hóspede não se imagina ali — e a reserva vai para o concorrente com imagem melhor.",
    solutionTitle: "Desejo, atmosfera e conversão.",
    solutionText:
      "Produzimos imagem de lifestyle: luz natural, momento real, gastronomia, detalhe e experiência. Conteúdo que faz o hóspede se imaginar no lugar — e converter em reserva.",
    servicesTitle: "Da diária ao desejo.",
    services: [
      {
        n: "01",
        title: "Fotografia lifestyle",
        desc: "Imagens de hospedagem, áreas e experiências com atmosfera e luz natural.",
      },
      {
        n: "02",
        title: "Vídeo institucional",
        desc: "Vídeo de apresentação do hotel ou resort para site, OTAs e mídia.",
      },
      {
        n: "03",
        title: "Gastronomia",
        desc: "Fotografia e vídeo de gastronomia e bar com foco em desejo e detalhe.",
      },
      {
        n: "04",
        title: "Conteúdo p/ redes",
        desc: "Reels e posts para alimentar redes e sustentar a marca o ano todo.",
      },
      {
        n: "05",
        title: "Direção visual",
        desc: "Linguagem coesa para site, reservas, mídia paga e materiais.",
      },
      {
        n: "06",
        title: "Tratamento",
        desc: "Gradação de cor que valoriza atmosfera sem perder a verdade do espaço.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Briefing",
        desc: "Entendemos o público, a atmosfera desejada e os canais de venda.",
      },
      {
        n: "02",
        title: "Reconhecimento",
        desc: "Mapeamos luz, áreas e melhores horários de captação.",
      },
      {
        n: "03",
        title: "Produção",
        desc: "Captação com momento real, gente e experiência em cena.",
      },
      {
        n: "04",
        title: "Entrega",
        desc: "Tratamento e entrega por formato para site, OTAs e redes.",
      },
    ],
    creativeProposal:
      "Produção audiovisual para hotéis boutique, resorts, gastronomia e experiências turísticas, traduzindo hospitalidade e conforto em imagens que impulsionam reservas.",
    artDirection:
      "Fotografia e vídeo que exaltam arquitetura, luz de golden hour, texturas gastronômicas e o lifestyle do hóspede vivenciando cada espaço.",
    creativeConcept:
      "Vender a experiência sensorial antes do check-in: despertar o desejo irresistível de estar presente, relaxar e vivenciar cada detalhe do destino.",
    ctaEyebrow: "Sua próxima temporada",
    ctaTitle: "Faça o hóspede desejar antes de chegar.",
    ctaText:
      "Conte sobre o seu espaço e a experiência. Produzimos as imagens que convertem em reserva.",
    faqTitle: "FAQ — Hotelaria & Lifestyle.",
    faqs: [
      {
        q: "Vocês produzem para site e OTAs (Booking, Airbnb)?",
        a: "Sim. Entregamos imagens nos formatos certos para site próprio, OTAs e mídia, com tratamento coeso.",
      },
      {
        q: "Fotografam gastronomia além do espaço?",
        a: "Sim. Gastronomia, bar e experiências fazem parte do pacote, com foco em desejo e detalhe.",
      },
      {
        q: "Conseguem captar com hóspedes no local?",
        a: "Sim. Trabalhamos com momento real e direção discreta, respeitando a operação e a privacidade.",
      },
      {
        q: "Como funciona o orçamento?",
        a: "Pelo diagnóstico visual entendemos escopo, diárias de captação e entregáveis, e montamos uma proposta por faixa de investimento.",
      },
    ],
    heroPhoto: HOTELARIA_LIFESTYLE_PHOTOS[1],
    photos: PHOTOS.hotel,
    regions: ["Rio de Janeiro", "Litoral e resorts", "Operação nacional"],
  },
]

export const SEGMENT_ALIASES: Record<string, string> = {
  "ativacoes-e-eventos": "ativacoes-eventos",
  eventos: "ativacoes-eventos",
  ativacoes: "ativacoes-eventos",
  moda: "moda-campanhas",
  campanhas: "moda-campanhas",
  artistas: "artistas-videoclipes",
  videoclipes: "artistas-videoclipes",
  musica: "artistas-videoclipes",
  posicionamento: "posicionamento-profissional",
  profissional: "posicionamento-profissional",
  corporativo: "posicionamento-profissional",
  lifestyle: "imagem-pessoal-lifestyle",
  "imagem-pessoal": "imagem-pessoal-lifestyle",
  pessoal: "imagem-pessoal-lifestyle",
  casamento: "casamentos",
  gestante: "gestantes",
  maternidade: "gestantes",
  hotelaria: "hotelaria-lifestyle",
}

export function getSegment(slug?: string): Segment | undefined {
  if (!slug) return undefined
  const clean = slug
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^segmentos\//, "")
  const target = SEGMENT_ALIASES[clean] || clean
  return SEGMENTS.find((s) => s.slug === target)
}

export function segmentImageAlt(segment: Segment): string {
  return `${segment.nav} — Direção visual e produção audiovisual autoral de ${segment.category.toLowerCase()} pela VERSAVISUAL`
}

// ---- Portfolio ----
export type PortfolioItem = {
  category: string
  title: string
  city: string
  photo: string
  caseSlug?: string
  segmentSlug: string
  gallery?: readonly string[]
  video?: string
  youtubeVideos?: readonly {
    id: string
    title: string
    list?: string
  }[]
}

export const CASE_ALIASES: Record<string, string> = {
  "lancamento-drinkball": "ativacao-drinkball",
  "megabloco-cha-da-alice": "carnaval-de-rua-experiencia-publico",
  "festival-jeans-toritama": "evento-fjt-palco-camarote",
  "syn-ice-camarote": "symbh-evento-corporativo",
  "moda-santalola-verao": "editorial-lifestyle-campanha",
  "fashion-manners-editorial": "fashion-week-passarela-bastidor",
  "loja-frida-campanha": "loja-frida-sao-joao",
  "ensaio-street-sp": "ensaio-street-sp",
  "ensaio-autoral-estudio": "ensaio-autoral-lifestyle-instagram",
  "casamento-destination-wedding": "casamento-ao-ar-livre",
  "casamento-urbano-contemporaneo": "casamento-urbano-contemporaneo",
  "maternidade-ensaio-intimo": "ensaio-gestante-praia",
  "bonfim-house-boutique": "hotelaria-espacos-cafe-spa",
  "retratos-posicionamento-marca-pessoal":
    "retratos-posicionamento-marca-pessoal",
  "ensaio-feminino-frida": "loja-frida-sao-joao",
}

const P = PHOTOS
export const PORTFOLIO: PortfolioItem[] = [
  {
    category: "Ativações & Eventos",
    title: "Lançamento Drinkball — APAS Show com Gkay",
    city: "São Paulo · SP",
    photo: LANCAMENTO_DRINKBALL_PHOTOS[0] || P.events[0],
    caseSlug: "ativacao-drinkball",
    segmentSlug: "ativacoes-eventos",
    gallery: LANCAMENTO_DRINKBALL_PHOTOS,
  },
  {
    category: "Ativações & Eventos",
    title: "Megabloco Chá da Alice — Babado Novo & Christian Chávez (RBD)",
    city: "Rio de Janeiro · RJ",
    photo: MEGABLOCO_CHA_DA_ALICE_PHOTOS[0] || P.events[1],
    caseSlug: "carnaval-de-rua-experiencia-publico",
    segmentSlug: "ativacoes-eventos",
    gallery: MEGABLOCO_CHA_DA_ALICE_PHOTOS,
  },
  {
    category: "Ativações & Eventos",
    title: "Festival de Jeans de Toritama (FJT) — Passarela & Ativações",
    city: "Toritama · PE",
    photo: FESTIVAL_JEANS_TORITAMA_PHOTOS[0] || P.events[2],
    caseSlug: "evento-fjt-palco-camarote",
    segmentSlug: "ativacoes-eventos",
    gallery: FESTIVAL_JEANS_TORITAMA_PHOTOS,
  },
  {
    category: "Ativações & Eventos",
    title: "Bonfim House — Cobertura Corporativa",
    city: "Salvador · BA",
    photo: BONFIM_HOUSE_PHOTOS[0] || P.events[3],
    caseSlug: "festival-bon-cobertura-corporativa",
    segmentSlug: "ativacoes-eventos",
    gallery: BONFIM_HOUSE_PHOTOS,
  },
  {
    category: "Ativações & Eventos",
    title: "Camarote Ondina — Carnaval de Salvador",
    city: "Salvador · BA",
    photo: CAMAROTE_ONDINA_PHOTOS[0] || P.events[4],
    caseSlug: "camarote-ondina-salvador",
    segmentSlug: "ativacoes-eventos",
    gallery: CAMAROTE_ONDINA_PHOTOS,
  },
  {
    category: "Ativações & Eventos",
    title: "Syn Ice — Feiras Super Minas e Super Bahia",
    city: "Belo Horizonte · MG / Salvador · BA",
    photo: SYN_ICE_PHOTOS[0] || P.events[5],
    caseSlug: "symbh-evento-corporativo",
    segmentSlug: "ativacoes-eventos",
    gallery: SYN_ICE_PHOTOS,
  },
  {
    category: "Moda & Campanhas",
    title: "Fashion Manners — Editorial de Moda & Passarela",
    city: "Rio de Janeiro · RJ",
    photo: FASHION_MANNERS_PHOTOS[0] || P.fashion[0],
    caseSlug: "fashion-week-passarela-bastidor",
    segmentSlug: "moda-campanhas",
    gallery: FASHION_MANNERS_PHOTOS,
  },
  {
    category: "Moda & Campanhas",
    title: "Moda Santa Lolla — Editorial e Campanha",
    city: "Rio de Janeiro · RJ",
    photo: MODA_SANTALOLA_PHOTOS[0] || P.fashion[1],
    caseSlug: "editorial-lifestyle-campanha",
    segmentSlug: "moda-campanhas",
    gallery: MODA_SANTALOLA_PHOTOS,
  },
  {
    category: "Ativações & Eventos",
    title: "Loja Frida — Evento de São João da marca",
    city: "Rio de Janeiro · RJ",
    photo: LOJA_FRIDA_PHOTOS[0] || P.events[6],
    caseSlug: "loja-frida-sao-joao",
    segmentSlug: "ativacoes-eventos",
    gallery: LOJA_FRIDA_PHOTOS,
  },
  {
    category: "Moda & Campanhas",
    title: "FJT Fashion — Desfile & Coleções",
    city: "Toritama · PE",
    photo: FESTIVAL_JEANS_TORITAMA_PHOTOS[15] || P.fashion[3],
    caseSlug: "fjt-fashion-desfile-colecoes",
    segmentSlug: "moda-campanhas",
    gallery: FESTIVAL_JEANS_TORITAMA_PHOTOS.slice(15, 45),
  },
  {
    category: "Artistas & Videoclipes",
    title: "Videoclipes Oficiais — É O Tchan & Babado Novo",
    city: "Brasil",
    photo: BACKSTAGE_CLIPE_SURURU_PHOTOS[9] || P.artists[0],
    caseSlug: "videoclipes-oficiais-e-o-tchan-babado-novo",
    segmentSlug: "artistas-videoclipes",
    gallery: BACKSTAGE_CLIPE_SURURU_PHOTOS,
    youtubeVideos: [
      {
        id: "xaF6i9lGeSY",
        title: "É O TCHAN - Jogadinha (Clipe Oficial)",
        list: "RDxaF6i9lGeSY",
      },
      {
        id: "RqMfhBvezjE",
        title: "Babado Novo - Sururu [Clipe Oficial]",
        list: "RDRqMfhBvezjE",
      },
    ],
  },
  {
    category: "Artistas & Videoclipes",
    title: "Babado Novo — Clipe Sururu & Backstage",
    city: "Rio de Janeiro · RJ / Salvador · BA",
    photo: BACKSTAGE_CLIPE_SURURU_PHOTOS[9] || P.artists[0],
    caseSlug: "babado-novo-sururu",
    segmentSlug: "artistas-videoclipes",
    gallery: BACKSTAGE_CLIPE_SURURU_PHOTOS,
    video: "/videos/hero.mp4",
  },
  {
    category: "Artistas & Videoclipes",
    title: "Megabloco Babado Novo & Christian Chávez — Performance",
    city: "Rio de Janeiro · RJ",
    photo: MEGABLOCO_CHA_DA_ALICE_PHOTOS[10] || P.events[1],
    caseSlug: "babado-novo-christian-chavez",
    segmentSlug: "artistas-videoclipes",
    gallery: MEGABLOCO_CHA_DA_ALICE_PHOTOS,
    video: "/videos/hero.mp4",
  },
  {
    category: "Posicionamento Profissional",
    title: "Bonfim House — Liderança e Ambiente Corporativo",
    city: "Salvador · BA",
    photo: BONFIM_HOUSE_PHOTOS[1] || P.professional[1],
    caseSlug: "retratos-posicionamento-marca-pessoal",
    segmentSlug: "posicionamento-profissional",
    gallery: BONFIM_HOUSE_PHOTOS,
  },
  {
    category: "Imagem Pessoal & Lifestyle",
    title: "Ensaio Autoral — Lifestyle e Retratos para Redes",
    city: "Rio de Janeiro · RJ",
    photo: ENSAIO_AUTORAL_PHOTOS[0] || P.personal[0],
    caseSlug: "ensaio-autoral-lifestyle-instagram",
    segmentSlug: "imagem-pessoal-lifestyle",
    gallery: ENSAIO_AUTORAL_PHOTOS,
  },
  {
    category: "Imagem Pessoal & Lifestyle",
    title: "Retratos Urbanos — Street & Presença",
    city: "Rio de Janeiro · RJ",
    photo: ENSAIO_STREET_PHOTOS[2] || P.personal[2],
    caseSlug: "ensaio-street-sp",
    segmentSlug: "imagem-pessoal-lifestyle",
    gallery: ENSAIO_STREET_PHOTOS,
  },
  {
    category: "Casamentos",
    title: "Casamento ao Ar Livre — Memória e Afeto",
    city: "Rio de Janeiro · RJ",
    photo: P.weddings[0],
    caseSlug: "casamento-ao-ar-livre",
    segmentSlug: "casamentos",
    gallery: P.weddings,
  },
  {
    category: "Casamentos",
    title: "Casamento na Praia — Luz e Emoção",
    city: "Macaé · RJ",
    photo: P.weddings[1],
    caseSlug: "casamento-urbano-contemporaneo",
    segmentSlug: "casamentos",
    gallery: P.weddings,
  },
  {
    category: "Gestantes",
    title: "Ensaio Gestante — Corpo, Praia e Memória",
    city: "Rio de Janeiro · RJ",
    photo: MATERNITY_PHOTOS[20] || P.maternity[0],
    caseSlug: "ensaio-gestante-praia",
    segmentSlug: "gestantes",
    gallery: PHOTOS.maternity,
  },
  {
    category: "Hotelaria & Lifestyle",
    title: "Hotelaria Lifestyle — Experiências e Atmosfera",
    city: "Rio de Janeiro · RJ",
    photo: HOTELARIA_LIFESTYLE_PHOTOS[0] || P.hotel[0],
    caseSlug: "hotelaria-espacos-cafe-spa",
    segmentSlug: "hotelaria-lifestyle",
    gallery: HOTELARIA_LIFESTYLE_PHOTOS,
  },
]

export function portfolioImageAlt(item: PortfolioItem): string {
  return `${item.title} (${item.city}) — Fotografia e produção audiovisual de ${item.category.toLowerCase()} da VERSAVISUAL`
}

export const PORTFOLIO_FILTERS = [
  "Todos",
  "Ativações & Eventos",
  "Moda & Campanhas",
  "Artistas & Videoclipes",
  "Posicionamento",
  "Imagem Pessoal",
  "Casamentos",
  "Gestantes",
  "Hotelaria & Lifestyle",
]

// Map filter labels (short) to category names (full) used on items.
export function matchesFilter(item: PortfolioItem, filter: string): boolean {
  if (filter === "Todos") return true
  if (filter === "Posicionamento")
    return item.category === "Posicionamento Profissional"
  if (filter === "Imagem Pessoal")
    return item.category === "Imagem Pessoal & Lifestyle"
  return item.category === filter
}

export function getCase(slug?: string): PortfolioItem | undefined {
  if (!slug) return undefined
  const clean = slug
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^portfolio\//, "")
  const target = CASE_ALIASES[clean] || clean
  return (
    PORTFOLIO.find((p) => p.caseSlug === target) ||
    PORTFOLIO.find((p) => p.caseSlug === clean)
  )
}
