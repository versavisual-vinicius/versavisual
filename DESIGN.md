# DESIGN.md — VERSAVISUAL Design System & Direção Visual

## 1. Princípio & Identidade da Marca

O site da **VERSAVISUAL** é projetado como um hub audiovisual autoral e contemporâneo: escuro, cinematográfico, direto, imersivo e comercial. A imagem real é o argumento central. A interface digital existe para sustentar, elevar e contextualizar o portfólio autoral, nunca para competir com ele.

Assinatura verbal institucional:
> *Imagem não é registro. É posicionamento.*

---

## 2. Stack Visual & Fundação

- **Framework**: React 19 + Vite 8.
- **Styling**: Tailwind CSS v4 através de `@theme` em `src/index.css`.
- **Animações**: Framer Motion 13 para transições de lightbox, drawers e física com suporte a `prefers-reduced-motion`.
- **Tipografia**: Fontes self-hosted em WOFF2 na pasta `public/fonts/`.
- **Assets**: Fotografias autorais locais de alta resolução em `public/images/` gerenciadas via `src/lib/images.ts` e `src/data/site.ts`.

---

## 3. Paleta de Cores & Tokens

| Token | Hexadecimal | Papel no Design System |
|---|---|---|
| `ink` | `#050A0D` | Fundo principal da aplicação, molduras escuras e fundos imersivos |
| `navy` | `#253540` | Superfícies elevadas, cards secundários, modais e containers |
| `teal` | `#5E7F8C` | Cor de acento primária, bordas ativas e botões de chamada para ação (CTA) |
| `teal-400` | `#70909C` | Badges, indicadores de status e subtítulos de ênfase |
| `mist` | `#A4B8BF` | Textos secundários, legendas, metadados e linhas divisórias suaves |
| `off` | `#F2F2F2` | Títulos principais, textos em fundos escuros e texto obrigatório sobre `bg-teal` |

### Regras Estritas de Aplicação de Cores
- **Fundo Principal**: Utilizar `bg-ink`.
- **Seções Translúcidas & Overlays**: `bg-ink/40`, `bg-ink/75`, `bg-ink/85` e a classe utilitária `.u-grade`.
- **Botões e CTAs com `bg-teal`**: Devem SEMPRE utilizar texto claro `text-off`. É estritamente proibido usar `text-ink` ou `text-navy` sobre `bg-teal` por razões de conformidade de contraste WCAG AA.
- **Textos em Fundos Escuros**: Títulos e headlines com `text-off`; parágrafos auxiliares, descrições e metadados com `text-mist`.
- **Cards e Formulários Claros**: `bg-off` com títulos em `text-ink` e parágrafos em `text-navy`.

---

## 4. Tipografia & Hierarquia

Fontes locais hospedadas em `public/fonts/`:

| Família | Arquivo | Uso no Sistema |
|---|---|---|
| `Righteous` | `Righteous-Regular.woff2` | Wordmark oficial da marca, números de destaque em métricas e logos |
| `Outfit` | `Outfit-*.woff2` (400, 500, 600, 700, 800) | Headlines (H1 a H4), UI, botões, labels, tabs e eyebrows |
| `DM Sans` | `DMSans-*.woff2` (400, 500, 700) | Corpo de texto, parágrafos, descrições de cases, FAQs e fichas técnicas |

### Regras de Composição Tipográfica
- **Headlines de Impacto**: `Outfit` com peso 800, line-height apertado (`leading-tight` ou `leading-[1.1]`) e `text-wrap: balance`.
- **Eyebrows (Super-títulos)**: `Outfit` em uppercase, tracking expandido (`tracking-wider` ou `tracking-widest`), tamanho `text-xs` ou `text-sm` e peso 600 em `text-mist` ou `text-teal-400`.
- **Corpo de Texto**: `DM Sans` com peso 400 ou 500, tamanho `text-base` a `text-lg` e entrelinha confortável (`leading-relaxed`).

---

## 5. Componentes Principais do Sistema

### 5.1. Infinite Canvas 360° (`src/components/InfiniteCanvas.tsx`)
- **Navegação Espacial**: Arraste contínuo (drag) acelerado por hardware (`translate3d`), inércia com amortecimento exponencial e zoom dinâmico via roda do mouse ou pinça touch.
- **Radar HUD / Minimap**: Minimap interativo no canto inferior mostrando o grid de obras e o viewport atual com clique para navegação rápida.
- **Cartões de Obras**: Molduras com acabamento `bg-navy/80`, efeito hover de profundidade e acionamento de lightbox ou navegação para o estudo de caso.

### 5.2. Comparador Before/After (`src/components/BeforeAfterSlider.tsx`)
- **Color Science & Retouching**: Visualização comparativa do arquivo RAW original versus o tratamento finalizado em ACEScc / DaVinci Resolve, Dodge & Burn manual e Separação de Frequências.
- **Interação**: Divisor central arrastável com suporte a mouse, touch, setas do teclado e alternância entre modos de visualização (Split-Screen e Toggle).
- **Especificações Técnicas**: Ficha embutida exibindo câmera, lente, software de cor, perfil de emulação e técnicas aplicadas.

### 5.3. Seção do Fundador (`src/components/FounderSection.tsx`)
- **Apresentação**: Retrato de Vinicius Cunha (Vini), biografia autoral, filosofia de trabalho e credenciais de direção criativa.
- **Equipamentos & Tecnologia**: Destaque para o ecossistema Nikon Full Frame (Nikon D780) e lentes Nikkor prime de alta abertura (85mm f/1.4G, 50mm f/1.4G, 24-70mm f/2.8).

### 5.4. Header Fixo & Mobile Drawer (`src/components/Header.tsx`)
- **Desktop**: Barra fixa com fundo transparente no topo, ativando efeito `bg-ink/80 backdrop-blur-md` ao rolar mais de 12px. Botão principal `Iniciar projeto` em `bg-teal text-off`.
- **Mobile Drawer**: Menu lateral deslizante acessível com gerenciamento de foco, fechamento via tecla `Escape` e bloqueio de rolagem do body quando aberto.

### 5.5. Galeria com Lightbox Fullscreen (`src/components/Gallery.tsx`)
- **Portal & Framer Motion**: Renderização isolada no body via React Portal, suporte a navegação por teclado (Setas e Escape) e gesto de arraste vertical para fechar (*drag-to-dismiss*).

### 5.6. Formulário de Diagnóstico Visual (`src/pages/Diagnostico.tsx`)
- **Layout**: Tela dividida em desktop (painel institucional à esquerda e formulário à direita).
- **Acessibilidade & Validação**: Campos claros com alto contraste, mensagens de erro inline com `aria-describedby`, status com `aria-live="polite"` e proteção anti-spam por honeypot.

---

## 6. Ergonomia Mobile & Responsividade

- **Limites de Tela**: Suporte integral desde smartphones compactos de 360px de largura até monitores ultrawide 4K sem qualquer quebra de layout ou overflow horizontal.
- **Touch Targets**: Todos os botões, links, abas e controles interativos possuem área de toque mínima de **44x44px**.
- **Aspect Ratios Adaptativos**:
  - Cards de segmentos: `aspect-[16/11]` no mobile e `aspect-[3/4]` em `sm+`.
  - Cards de portfólio: `aspect-[4/5]`.

---

## 7. Acessibilidade (WCAG 2.1 AA)

- Elemento principal semântico `<main id="main">` com skip-link no topo (`Pular para o conteúdo`).
- Textos alternativos descritivos e ricos em todas as fotografias gerados dinamicamente (`segmentImageAlt`, `portfolioImageAlt`).
- Imagens puramente decorativas marcadas com `aria-hidden="true"` e `alt=""`.
- Foco visível (`focus-visible:ring-2 focus-visible:ring-teal`) em todos os elementos clicáveis.

---

## 8. Checklist de Validação Visual & Publicação

Antes de publicar qualquer alteração:
1. Executar `npx tsc --noEmit` para garantir **zero erros de tipagem**.
2. Executar `npm run build` e validar que as **47 rotas estáticas** foram geradas em `dist/`.
3. Executar `node scripts/verify-built-seo.mjs` e `npx tsx tests/run-all.ts` para garantir 100% de sucesso nos testes.
4. Validar contraste de todos os novos botões (`bg-teal text-off`).
5. Inspecionar visualmente nos viewports móveis (390x844px e 430x932px).
