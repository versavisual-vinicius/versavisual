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
      "Equalização de altas luzes no tecido, separação de frequências em microtexturas de pele e calibração de paleta tonal fria com destaque aos detalhes da alta costura.",
    beforeImage:
      "/images/Moda & Campanhas - Fashion Manners/Fashion-Manners1.jpg",
    afterImage:
      "/images/Moda & Campanhas - Fashion Manners/Fashion-Manners1.jpg",
    beforeFilter: "saturate(0.5) contrast(0.72) brightness(1.1) sepia(0.06)",
    afterFilter: "none",
    beforeLabel: "RAW Nikon Z9 · N-Log Flat",
    afterLabel: "Master Editorial · Color Graded",
    specs: {
      camera: "Nikon Z9 Full Frame",
      lens: "Nikkor Z 85mm f/1.2 S",
      colorScience: "DaVinci Resolve / ACEScc",
      postProduction: "Dodge & Burn + Separação de Frequências",
      isoSpeed: "ISO 64 · 1/250s · f/2.0",
    },
    tags: ["Editorial", "Separação de Frequência", "High Fashion"],
  },
  {
    id: "artistas-clipe-sururu",
    category: "Artistas & Cinema",
    categorySlug: "videoclipe",
    title: "Clipe Babado Novo — Direção de Cor",
    subtitle: "Color Grading cinematográfico para palco e iluminação cênica",
    description:
      "Transformação do sinal plano de câmera (flat log) em uma curva tonal densa, com preservação dos tons de pele sob luzes saturadas de LED e emulação de filme Kodak 2383.",
    beforeImage:
      "/images/Artistas & Videoclipes - Backstage Clipe Sururu/Backstage-clipe-sururu-babado-novo1.jpg",
    afterImage:
      "/images/Artistas & Videoclipes - Backstage Clipe Sururu/Backstage-clipe-sururu-babado-novo1.jpg",
    beforeFilter: "saturate(0.48) contrast(0.68) brightness(1.12)",
    afterFilter: "none",
    beforeLabel: "Sensor RAW · Perfil Flat N-Log",
    afterLabel: "Master Final · Emulação Kodak 2383",
    specs: {
      camera: "Nikon Cinema Rig / 4K ProRes",
      lens: "Nikkor Z 50mm f/1.2 S",
      colorScience: "ACEScc Color Managed / DCI-P3",
      postProduction: "Halation, Film Grain & Split Toning",
      isoSpeed: "ISO 800 · 1/50s · 24fps",
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
      "Remoção de imperfeições preservando poros naturais, iluminação de contorno enfatizada com dodge & burn manual e equilíbrio cromatico de sombras.",
    beforeImage:
      "/images/Imagem Pessoal & Lifestyle - Ensaio Autoral/Ensaio-Autoral41.jpg",
    afterImage:
      "/images/Imagem Pessoal & Lifestyle - Ensaio Autoral/Ensaio-Autoral41.jpg",
    beforeFilter: "saturate(0.55) contrast(0.74) brightness(1.08)",
    afterFilter: "none",
    beforeLabel: "RAW 45.7MP · Sem Tratamento",
    afterLabel: "Master Retouch · 100% Autoral",
    specs: {
      camera: "Nikon Z9 High Resolution",
      lens: "Nikkor Z 70-200mm f/2.8 VR S",
      colorScience: "Capture One Pro / Versa Profile",
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
      "/images/Hotelaria & Lifestyle - Bonfim House/Bonfim-house1.jpg",
    afterImage:
      "/images/Hotelaria & Lifestyle - Bonfim House/Bonfim-house1.jpg",
    beforeFilter: "saturate(0.52) contrast(0.7) brightness(1.14)",
    afterFilter: "none",
    beforeLabel: "RAW Arquitetura · Flat",
    afterLabel: "Master Comercial · Atmosfera Quente",
    specs: {
      camera: "Nikon Z9 Full Frame",
      lens: "Nikkor Z 14-24mm f/2.8 S",
      colorScience: "Custom LUT / Daylight Balanced",
      postProduction: "Remoção de Flare + Mapeamento de Tons",
      isoSpeed: "ISO 64 · 1/60s · f/8.0",
    },
    tags: ["Arquitetura", "Lifestyle", "Hotelaria"],
  },
]
