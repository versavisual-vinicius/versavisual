import { readProjectFile } from "./domain-helpers"

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

import { PORTFOLIO } from "../data/site"

export const CANONICAL_CASES = PORTFOLIO.filter((p) => Boolean(p.caseSlug)).map(
  (p) => ({
    caseSlug: p.caseSlug!,
    title: p.title,
    category: p.category,
    segmentSlug: p.segmentSlug,
  }),
)
