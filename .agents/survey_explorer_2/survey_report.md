# Relatório de Auditoria e Fidelidade Visual — survey_explorer_2

**Data:** 2026-08-20T01:53:00Z  
**Autor:** `survey_explorer_2` (Teamwork Explorer / Visual Auditor)  
**Escopo:** Avaliação completa de fidelidade visual, conformidade com `DESIGN.md`, `ORIGINAL_REQUEST.md`, `AGENTS.md` e implementação em `src/`.

---

## Sumário Executivo

A implementação atual da VERSAVISUAL em React 19 + Tailwind CSS v4 apresenta uma base sólida, com layout estruturado, tipografia self-hosted completa, componentes responsivos e aplicação generalizada de overlays escuros (`u-grade`). No entanto, a investigação minuciosa identificou desvios em tokens de cor fundamentais, discrepâncias nos estilos padrão de CTAs em relação ao `DESIGN.md`, alvos de toque mobile abaixo do limiar acessível de 44px e erros de sintaxe TypeScript em tipos inline que quebram a checagem `npx tsc --noEmit`.

---

## 1. Conformidade de Cores e Tokens

### 1.1 Comparativo da Paleta Oficial (`DESIGN.md` vs Implementação Real)

| Token da Marca | Hex Oficial (`DESIGN.md`) | Implementação (`src/index.css`) | Status | Observação / Impacto |
|---|---|---|---|---|
| `ink` | `#050A0D` | `#050a0d` | ✅ Conforme | Aplicado como fundo principal (`bg-ink`) e texto escuro (`text-ink`). |
| `navy` | `#253540` | `#253540` | ✅ Conforme | Usado em bordas, texto de apoio em fundos claros e cartões secundários. |
| `teal` | **`#5E7F8C`** | **`#547481`** (`--color-teal`) | ⚠️ **Divergência** | `src/index.css:107` define `#547481` em vez do oficial `#5E7F8C`. Em `Logo.tsx` e `BeamsBackground.tsx`, o valor `#5E7F8C` é usado diretamente. |
| `teal-400` | Token derivado | `#70909c` | ✅ Conforme | Usado em texto de destaque, anéis de foco e indicadores de cidade. |
| `teal-700` | Token derivado | `#3f5d68` | ✅ Conforme | Definido para estados de sombra/hover profundos. |
| `mist` | `#A4B8BF` | `#a4b8bf` | ✅ Conforme | Usado em texto secundário e eyebrows sobre fundos escuros (`text-mist`). |
| `off` | `#F2F2F2` | `#f2f2f2` | ✅ Conforme | Usado em cartões claros (`bg-off`), superfícies e texto sobre escuro (`text-off`). |
| `surface` | `#F2F2F2` | `#f2f2f2` | ✅ Conforme | Alias para o fundo claro de cards e modais. |
| `line` | `rgba(37, 53, 64, 0.10)` | `rgba(37, 53, 64, 0.10)` | ✅ Conforme | Divisores sutis e bordas estruturais. |
| `line-strong` | `rgba(37, 53, 64, 0.20)` | `rgba(37, 53, 64, 0.20)` | ✅ Conforme | Bordas de inputs e caixas em destaque. |

### 1.2 Regras de Aplicação e Contraste de Cores

1. **Texto sobre fundos escuros (`bg-ink`, `bg-navy`, fotos com overlay):**
   - Headings utilizam `text-off` (`#F2F2F2`), alcançando contraste superior a **17:1** (WCAG AAA).
   - Textos de apoio e eyebrows utilizam `text-mist` (`#A4B8BF`), com contraste de **9.5:1** (WCAG AAA).
2. **Texto sobre fundos claros (`bg-off`, `bg-surface`, `bg-white`):**
   - Títulos utilizam `text-ink` (`#050A0D`), com contraste **17:1** (WCAG AAA).
   - Corpo de texto utiliza `text-navy` (`#253540`), com contraste **10.2:1** (WCAG AAA).
3. **Regra de contraste sobre `bg-teal`:**
   - O `DESIGN.md` exige categoricamente: *"Sempre que o fundo estiver no tom teal (#5E7F8C) ou muito próximo, o texto deve ser branco/off-white (text-off). Evitar: Texto text-ink ou text-navy sobre bg-teal."*
   - **Resultado do Audit:** Todos os botões e CTAs com `bg-teal` nas páginas (`Home.tsx:85`, `SegmentPage.tsx:133,523`, `Diagnostico.tsx:235,575`, `NotFound.tsx:27`) utilizam `text-off`. Nenhuma ocorrência de `text-ink` ou `text-navy` sobre `bg-teal` foi encontrada no projeto.

---

## 2. Conformidade Tipográfica e Fontes

### 2.1 Mapeamento e Disponibilidade de Fontes Self-Hosted

Todas as fontes estão corretamente hospedadas localmente em `public/fonts/` em formato `.woff2`, sem dependência de CDNs externos (Google Fonts).

| Família | Função Design System | Arquivos Presentes em `public/fonts/` | Declaração `@font-face` (`src/index.css`) | Preload em `index.html` |
|---|---|---|---|---|
| **Righteous** | Wordmark, display, badges de marca | `righteous-400.woff2` | Linhas 3–9 | Não pré-carregada (carregada sob demanda) |
| **Outfit** | Headlines, UI, botões, eyebrows | `outfit-300.woff2` até `outfit-800.woff2` (6 pesos) | Linhas 11–57 | `outfit-800.woff2` pré-carregada (`index.html:56-62`) |
| **DM Sans** | Corpo, legendas longas, rodapé, textos | `dm-sans-300.woff2`, `400.woff2`, `500.woff2`, `300-italic`, `400-italic` | Linhas 59–97 | `dm-sans-400.woff2` pré-carregada (`index.html:63-69`) |

### 2.2 Hierarquia e Estilos Tipográficos

- **Headlines (H1, H2, H3):** Definidas na camada base de `src/index.css:143-148` com `font-family: var(--font-head); font-weight: 700; line-height: 1.06; text-wrap: balance;`.
  - H1 da Home: `text-4xl sm:text-5xl lg:text-[4.2rem]` (`Home.tsx:73`).
  - H1 dos Segmentos: `text-4xl sm:text-5xl lg:text-[3.8rem]` (`SegmentPage.tsx:123`).
  - H1 dos Cases: `text-4xl sm:text-5xl lg:text-6xl` (`CaseStudy.tsx:87`).
- **Eyebrows:** Classe utilitária `.u-eyebrow` (`src/index.css:175-182`) com `font-weight: 600`, `font-size: 0.72rem`, `letter-spacing: 0.28em`, `text-transform: uppercase`.
- **Corpo (`p`, `li`):** Configurado na camada base com `font-family: var(--font-body); font-weight: 400; text-wrap: pretty;`.
- **Controles de UI (`button`, `input`, `select`, `textarea`, `a`):** Configurados para herdar `font-family: var(--font-head);`.

---

## 3. Conformidade de Responsividade e Mobile

### 3.1 Grid, Max-Width e Espaçamento de Containers

- **Container Max-Width:** O limite de `1320px` (`max-w-[1320px]`) é aplicado com consistência em todas as seções principais (`Home.tsx:69,101,117,136`, `SegmentPage.tsx:112,150,202,244,283,354,389,444`, `Portfolio.tsx:20,33`, `CaseStudy.tsx:72,145,151`, `Header.tsx:97`, `Footer.tsx:8`, `Timeline.tsx:71`).
- **Padding Responsivo:** Adota rigorosamente o padrão `px-5` no mobile (< 1024px) e `lg:px-10` no desktop (>= 1024px).
- **Overflow Horizontal:** `src/index.css:136` possui `overflow-x: hidden;` no `body`. Grades que poderiam gerar overflow no mobile (ex: `PortfolioGrid.tsx:26`) utilizam `overflow-x-auto` com `scrollbar-none` ou quebra automática (`sm:flex-wrap`).

### 3.2 Proporções de Cards e Imagens

- **Cards de Segmento (Home):**
  - Mobile (< 640px): `aspect-[16/11]` (`Home.tsx:158`).
  - Desktop (`sm+`): `sm:aspect-[3/4]`.
  - **Avaliação:** Atende 100% ao requisito de DESIGN.md (linha 79–80).
- **Cards de Portfólio (`PortfolioGrid.tsx:74`):**
  - Utilizam proporção vertical `aspect-[4/5]`, conforme especificado em `DESIGN.md:102`.
- **Cards de Cases Relacionados (`SegmentPage.tsx:307` e `CaseStudy.tsx:159`):**
  - Utilizam `aspect-[16/10]`.
- **Galeria Principal:**
  - Imagem em destaque: `aspect-[16/10]` em col-span-2.
  - Imagens de apoio: `aspect-[4/5]`.

---

## 4. Contraste Visual, Overlays (`u-grade`) e Tratamento de Fotos

### 4.1 Implementação de Overlays

- **Classe `.u-grade` (`src/index.css:208-215`):**
  ```css
  .u-grade::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(5, 10, 13, 0.15) 0%,
      rgba(5, 10, 13, 0.55) 60%,
      rgba(5, 10, 13, 0.92) 100%
    );
    pointer-events: none;
  }
  ```
- **Aplicação no Projeto:**
  - Hero da Home (`Home.tsx:68`): Sobrepõe o vídeo em loop com `.u-grade`.
  - Cards de Segmento (`Home.tsx:169`): Sobrepõem as fotos de capa garantindo legibilidade do número e título.
  - Hero das páginas de segmento (`SegmentPage.tsx:104-111`): Camada dupla `bg-ink/25` + gradiente específico `rgba(5,10,13,0.34)` a `0.78` para contraste pleno sobre fotografias diversas.
  - Banner CTA (`CTASection.tsx:39`): Fundo escurecido com `bg-ink/80` sobre a foto com opacidade reduzida (`opacity-[0.22]`).

---

## 5. Microinterações, Estados e Acessibilidade de Toque

### 5.1 Alvos de Toque (Touch Targets)

| Componente / Elemento | Dimensão Atual | Padrão Recomendado (WCAG / Mobile) | Status / Risco |
|---|---|---|---|
| Botão de menu mobile (`Header.tsx:150`) | `h-10 w-10` (40×40px) | Mínimo 44×44px | ⚠️ **Abaixo do ideal (40px)**. Recomenda-se `h-11 w-11` (44px). |
| Botão fechar modal de serviço (`SegmentPage.tsx:493`) | `h-9 w-9` (36×36px) | Mínimo 44×44px | ⚠️ **Abaixo do ideal (36px)**. |
| Botão flutuante WhatsApp (`WhatsAppFloat.tsx:7`) | `h-11 w-11` (44×44px) | Mínimo 44×44px | ✅ Conforme |
| Botões e CTAs primários (`Home`, `CTASection`, etc.) | `px-6 py-3` / `px-8 py-3.5` (~46 a 50px de altura) | Mínimo 44px | ✅ Conforme |
| Inputs e selects do formulário (`Diagnostico.tsx:34`) | `py-3` (~48px de altura) | Mínimo 44px | ✅ Conforme |
| Itens do menu mobile gaveta (`Header.tsx:194`) | `py-3.5` (~48px de altura por linha) | Mínimo 44px | ✅ Conforme |
| Abas de filtro de portfólio (`PortfolioGrid.tsx:39`) | `pb-1 text-sm` | Mínimo 44px de área clicável | ⚠️ **Área vertical reduzida**. Recomenda-se adicionar `py-2 px-3`. |

### 5.2 Estados Interativos e Animações

- **Foco Acessível (`:focus-visible`):** Globalmente configurado em `src/index.css:160-163` com `outline: 2px solid var(--color-teal-400) !important; outline-offset: 3px;`.
- **Skip Link (`Pular para o conteúdo`):** Implementado em `src/index.css:185-206` e `App.tsx:20-22`, com animação de descida no foco.
- **Accordion de FAQ (`FAQAccordion.tsx`):** Utiliza `<details name="versavisual-faq">` com rotação do ícone `+` em 45º (`group-open:rotate-45`) e transição suave de 300ms.
- **Scroll Reveal (`Reveal.tsx`):** Utiliza `IntersectionObserver` com desativação automática quando `prefers-reduced-motion: reduce` estiver ativo.
- **Efeito Parallax (`useParallax.ts`):** Otimizado com `requestAnimationFrame` e cancelamento em `prefers-reduced-motion`.

---

## 6. Gaps Visuais e de UX Identificados na Implementação Atual

Abaixo estão listados os gaps concretos identificados no código:

1. **Inconsistência de Valor Hex no Token `--color-teal` (`src/index.css:107`):**
   - **Observação:** `DESIGN.md:26` estabelece que o Teal oficial é `#5E7F8C`. No entanto, `src/index.css:107` declara `--color-teal: #547481;`.
   - **Impacto:** Leve dessaturação/escurecimento do tom de acento da marca em botões e elementos Tailwind em comparação com os assets de marca e `Logo.tsx`.

2. **Estilo do Botão Primário do Header (`src/components/Header.tsx:135-144, 200-206`):**
   - **Observação:** `DESIGN.md:89` dita explicitamente: *"CTA principal Iniciar projeto usa bg-teal text-off"*. No código atual, tanto no desktop quanto no drawer mobile, o botão é estilizado como outline vazado (`border border-off/35 bg-off/10 text-off` ou `border border-off/25 text-off`).
   - **Impacto:** Falta de destaque comercial para o CTA primário de conversão no topo da página.

3. **Estilo Base do Botão Primário em `CTASection.tsx:50`:**
   - **Observação:** `DESIGN.md:114` dita: *"Botao principal em bg-teal text-off"*. Em `CTASection.tsx:50`, o botão utiliza `bg-off text-ink` em estado de repouso, tornando-se `bg-teal text-off` apenas no hover.
   - **Impacto:** Divergência de hierarquia visual descrita no design system.

4. **Tamanho do Botão Hamburger Mobile (`src/components/Header.tsx:150`):**
   - **Observação:** O botão tem classe `h-10 w-10` (40×40px), ficando abaixo dos 44×44px exigidos no critério de aceitação de acessibilidade de toque mobile.
   - **Impacto:** Dificuldade pontual de toque em telas pequenas.

5. **Ausência de Poster no Vídeo do Hero da Home (`src/pages/Home.tsx:57-67`):**
   - **Observação:** O elemento `<video>` no Hero da Home não possui o atributo `poster="/images/foto-a-producao-nao-falha.webp"` (ou frame correspondente), diferentemente dos vídeos em `SegmentPage.tsx` e `CaseStudy.tsx`.
   - **Impacto:** Em conexões móveis lentas, pode ocorrer um instante de tela preta antes do início da reprodução do vídeo.

6. **Erros de Sintaxe de Tipagem TypeScript que Quebram `tsc --noEmit`:**
   - **Observação:** Em `src/data/site.ts` (linhas 23, 25, 36, 101, 102) e `src/lib/seo.tsx` (linha 107), declarações de tipos inline de objetos estão sem ponto-e-vírgula/vírgula entre propriedades (ex: `{ label: string to: string hash?: boolean }` em vez de `{ label: string; to: string; hash?: boolean }`).
   - **Impacto:** O comando `npx tsc --noEmit` falha com código 2 e 9 erros `TS1005: ';' expected`, violando o critério de aceitação R4.

---

## 7. Recomendações Priorizadas para Ajuste

1. **Corrigir tokens em `src/index.css`:**
   - Atualizar `--color-teal: #5E7F8C;` para equivalência 100% com `DESIGN.md`.
2. **Harmonizar os botões de CTA:**
   - Atualizar `Header.tsx` (desktop e mobile) para usar `bg-teal text-off hover:bg-teal-400`.
   - Atualizar `CTASection.tsx` para usar `bg-teal text-off hover:bg-teal-400`.
3. **Ajustar touch targets mobile:**
   - Mudar `h-10 w-10` para `h-11 w-11` (ou `min-h-[44px] min-w-[44px]`) no toggle do Header e botões de fechar modais.
   - Adicionar padding vertical nos botões de filtro de `PortfolioGrid.tsx`.
4. **Adicionar `poster` no Hero da Home:**
   - Inserir `poster="/images/foto-a-producao-nao-falha.webp"` no `<video>` do Hero.
5. **Corrigir sintaxe nos tipos TypeScript:**
   - Ajustar as declarações em `src/data/site.ts` e `src/lib/seo.tsx` para passar `npx tsc --noEmit` com 0 erros.
