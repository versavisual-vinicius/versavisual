export interface BeforeAfterItem {
  id: string
  category: string
  categorySlug: string
  title: string
  subtitle: string
  description: string
  beforeImage: string
  afterImage: string
  beforeFilter?: string
  afterFilter?: string
  objectPosition?: string
  beforeLabel: string
  afterLabel: string
  specs: {
    camera: string
    lens: string
    colorScience: string
    postProduction: string
    isoSpeed?: string
  }
  tags: string[]
}

export const BEFORE_AFTER_CATEGORIES = [
  { id: "all", label: "Todos os Cases" },
  { id: "moda", label: "Moda & Editorial" },
  { id: "retrato", label: "Retrato & Direção" },
  { id: "videoclipe", label: "Artistas & Cinema" },
  { id: "lifestyle", label: "Gastronomia & Hotelaria" },
] as const

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: "fashion-manners-editorial",
    category: "Moda & Editorial",
    categorySlug: "moda",
    title: "Fashion Manners — Campanha Editorial",
    subtitle: "Tratamento de tom de pele, contraste zonal e textura de tecido",
    description:
      "Equalização de altas luzes no tecido, refinamento de microtexturas de pele e calibração de paleta tonal fria com destaque aos detalhes da alta costura.",
    beforeImage:
      "/images/Moda & Campanhas - Fashion Manners/Fashion-Manners16.jpg",
    afterImage:
      "/images/Moda & Campanhas - Fashion Manners/Fashion-Manners16.jpg",
    beforeFilter: "saturate(0.55) contrast(0.85) brightness(0.80)",
    afterFilter: "none",
    objectPosition: "center center",
    beforeLabel: "RAW Nikon D780 · Sem Tratamento",
    afterLabel: "Master Editorial · Color Graded",
    specs: {
      camera: "Nikon D780 Full Frame",
      lens: "Nikkor 85mm f/1.4G",
      colorScience: "Paleta Tonal Editorial",
      postProduction: "Dodge & Burn + Acabamento de Textura",
      isoSpeed: "ISO 100 · 1/250s · f/2.0",
    },
    tags: ["Editorial", "Acabamento de Textura", "High Fashion"],
  },
  {
    id: "artistas-clipe-sururu",
    category: "Artistas & Cinema",
    categorySlug: "videoclipe",
    title: "Clipe Babado Novo — Direção de Cor",
    subtitle: "Color Grading cinematográfico para palco e iluminação cênica",
    description:
      "Extração do alcance dinâmico em curva tonal densa, com preservação dos tons de pele sob iluminação cênica de LED e emulação Nikon.",
    beforeImage:
      "/images/Artistas & Videoclipes - Backstage Clipe Sururu/Backstage-clipe-sururu-babado-novo29.jpg",
    afterImage:
      "/images/Artistas & Videoclipes - Backstage Clipe Sururu/Backstage-clipe-sururu-babado-novo29.jpg",
    beforeFilter: "saturate(0.50) contrast(0.82) brightness(0.75)",
    afterFilter: "none",
    objectPosition: "center center",
    beforeLabel: "RAW Nikon D780 · Sem Tratamento",
    afterLabel: "Master Final · Emulação Nikon",
    specs: {
      camera: "Nikon D780 Full Frame",
      lens: "Nikkor 50mm f/1.4G",
      colorScience: "Direção de Cor Cinematográfica",
      postProduction: "Atmosphere, Halation & Gradação Tonal",
      isoSpeed: "ISO 800 · 1/125s · f/2.0",
    },
    tags: ["Audiovisual", "Color Science", "Cinema Look"],
  },
  {
    id: "retrato-autoral-executive",
    category: "Retrato & Direção",
    categorySlug: "retrato",
    title: "Posicionamento & Retrato Autoral",
    subtitle: "Micro-contraste escultural e preservação de textura natural",
    description:
      "Refinamento estético preservando poros e textura natural, iluminação de contorno enfatizada com dodge & burn manual e equilíbrio cromático de sombras.",
    beforeImage:
      "/images/Imagem Pessoal & Lifestyle - Ensaio Autoral/Ensaio-Autoral41.jpg",
    afterImage:
      "/images/Imagem Pessoal & Lifestyle - Ensaio Autoral/Ensaio-Autoral41.jpg",
    beforeFilter: "saturate(0.58) contrast(0.84) brightness(0.78)",
    afterFilter: "none",
    objectPosition: "center center",
    beforeLabel: "RAW Nikon D780 · Sem Tratamento",
    afterLabel: "Master Retouch · 100% Autoral",
    specs: {
      camera: "Nikon D780 Full Frame",
      lens: "Nikkor 70-200mm f/2.8G ED VR II",
      colorScience: "Perfil Autoral VersaVisual",
      postProduction: "Retoque Fine Art + Iluminação Zonal",
      isoSpeed: "ISO 100 · 1/200s · f/2.8",
    },
    tags: ["Retrato", "Dodge & Burn", "Posicionamento"],
  },
  {
    id: "hotelaria-bonfim-lifestyle",
    category: "Gastronomia & Hotelaria",
    categorySlug: "lifestyle",
    title: "Bonfim House — Arquitetura & Lifestyle",
    subtitle: "Fusão de luz ambiente, controle de reflexos e clima convidativo",
    description:
      "Harmonização da temperatura de cor entre luz natural das janelas e iluminação quente de tungstênio interior, com realce de texturas nobres de madeira e pedra.",
    beforeImage:
      "/images/Ativações & Eventos - Bonfim House/Bonfim-house-salvador-bahia-corporativo1.jpg",
    afterImage:
      "/images/Ativações & Eventos - Bonfim House/Bonfim-house-salvador-bahia-corporativo1.jpg",
    beforeFilter: "saturate(0.55) contrast(0.85) brightness(0.78)",
    afterFilter: "none",
    objectPosition: "center center",
    beforeLabel: "RAW Nikon D780 · Sem Tratamento",
    afterLabel: "Master Comercial · Atmosfera Quente",
    specs: {
      camera: "Nikon D780 Full Frame",
      lens: "Nikkor 14-24mm f/2.8G ED",
      colorScience: "Equilíbrio de Luz Natural & Quente",
      postProduction: "Controle de Reflexos + Mapeamento de Tons",
      isoSpeed: "ISO 100 · 1/60s · f/8.0",
    },
    tags: ["Arquitetura", "Lifestyle", "Hotelaria"],
  },
]
