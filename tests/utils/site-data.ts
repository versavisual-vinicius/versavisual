import { readProjectFile } from "./domain-helpers.ts"

export const CANONICAL_HOME_SERVICES = [
  {
    n: "01",
    title: "Estratégia & Direção",
    desc: "Diagnóstico de posicionamento, estrutura narrativa, roteiro e direção de cena. A intenção visual é definida antes da câmera ligar.",
  },
  {
    n: "02",
    title: "Produção & Captação",
    desc: "Fotografia editorial e institucional, produção em vídeo e cobertura de presença. Execução disciplinada com equipamentos Nikon e ópticas prime.",
  },
  {
    n: "03",
    title: "Pós & Distribuição",
    desc: "Color Science e tratamento autoral, storymaking, reels e formatos sociais verticais pensados para converter e reter atenção.",
  },
]

export const CANONICAL_HOME_PROCESS = [
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

export const CANONICAL_HOME_STATS = [
  { value: "+120", label: "Projetos Realizados" },
  { value: "25+", label: "Marcas Atendidas" },
  { value: "18", label: "Estados Alcançados" },
  { value: "5+", label: "Anos em Operação" },
]

export const CANONICAL_PORTFOLIO_FILTERS = [
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

export const CANONICAL_CASES = [
  {
    caseSlug: "videoclipes-oficiais-e-o-tchan-babado-novo",
    title: "Videoclipes Oficiais — É O Tchan & Babado Novo",
    category: "Artistas & Videoclipes",
    segmentSlug: "artistas-videoclipes",
  },
  {
    caseSlug: "babado-novo-sururu",
    title: "Babado Novo — Clipe Sururu",
    category: "Artistas & Videoclipes",
    segmentSlug: "artistas-videoclipes",
  },
  {
    caseSlug: "camarote-ondina-salvador",
    title: "Camarote Ondina — Carnaval Salvador",
    category: "Ativações & Eventos",
    segmentSlug: "ativacoes-eventos",
  },
  {
    caseSlug: "megabloco-cha-da-alice",
    title: "Megabloco Chá da Alice — Rio de Janeiro",
    category: "Ativações & Eventos",
    segmentSlug: "ativacoes-eventos",
  },
  {
    caseSlug: "festival-jeans-toritama",
    title: "Festival do Jeans de Toritama",
    category: "Ativações & Eventos",
    segmentSlug: "ativacoes-eventos",
  },
  {
    caseSlug: "lancamento-drinkball",
    title: "Lançamento Drinkball Brasil",
    category: "Ativações & Eventos",
    segmentSlug: "ativacoes-eventos",
  },
  {
    caseSlug: "syn-ice-camarote",
    title: "Syn Ice — Cobertura de Camarote",
    category: "Ativações & Eventos",
    segmentSlug: "ativacoes-eventos",
  },
  {
    caseSlug: "moda-santalola-verao",
    title: "Santa Lolla — Coleção de Verão",
    category: "Moda & Campanhas",
    segmentSlug: "moda-campanhas",
  },
  {
    caseSlug: "loja-frida-sao-joao",
    title: "Loja Frida — Campanha São João",
    category: "Moda & Campanhas",
    segmentSlug: "moda-campanhas",
  },
  {
    caseSlug: "fashion-manners-editorial",
    title: "Fashion Manners — Editorial Urbano",
    category: "Moda & Campanhas",
    segmentSlug: "moda-campanhas",
  },
  {
    caseSlug: "ensaio-street-sp",
    title: "Ensaio Street — São Paulo",
    category: "Imagem Pessoal & Lifestyle",
    segmentSlug: "imagem-pessoal-lifestyle",
  },
  {
    caseSlug: "ensaio-autoral-estudio",
    title: "Ensaio Autoral em Estúdio",
    category: "Imagem Pessoal & Lifestyle",
    segmentSlug: "imagem-pessoal-lifestyle",
  },
  {
    caseSlug: "casamento-destination-wedding",
    title: "Destination Wedding — Costa dos Corais",
    category: "Casamentos",
    segmentSlug: "casamentos",
  },
  {
    caseSlug: "casamento-urbano-contemporaneo",
    title: "Casamento Urbano Contemporâneo",
    category: "Casamentos",
    segmentSlug: "casamentos",
  },
  {
    caseSlug: "maternidade-ensaio-intimo",
    title: "Maternidade — Luz Natural",
    category: "Gestantes",
    segmentSlug: "gestantes",
  },
  {
    caseSlug: "bonfim-house-boutique",
    title: "Bonfim House — Hotelaria Boutique",
    category: "Hotelaria & Lifestyle",
    segmentSlug: "hotelaria-lifestyle",
  },
]
