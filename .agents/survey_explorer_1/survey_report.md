# Relatório de Survey Técnico e Análise de Base de Código — VERSAVISUAL

**Data da Investigação:** 2026-08-20  
**Ambiente:** React 19 + Vite 8 + Tailwind CSS v4 (Modo SPA com Pré-emissão de Rotas Estáticas)  
**Diretório de Trabalho:** `/Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website`  
**Agente Responsável:** `survey_explorer_1`

---

## 1. Sumário Executivo

A base de código do projeto de Redesign do website da **VERSAVISUAL** encontra-se em estágio avançado de consolidação estrutural, com arquitetura limpa em React 19, Vite 8 e Tailwind CSS v4. A estrutura de páginas, componentes visuais, assets locais (fontes self-hosted, fotografias de acervo real e vídeos locais) e dados centralizados foi amplamente mapeada.

Embora o comando de build padrão (`npm run build`) complete devido à tolerância de bundling do Vite/Rolldown, **a checagem estrita de tipos do TypeScript (`npx tsc --noEmit`) falha com 9 erros de sintaxe de tipos em `src/data/site.ts` e `src/lib/seo.tsx`**. Além disso, foram identificados pequenos desalinhamentos entre os slugs de cases do `public/sitemap.xml` e os dados em `src/data/site.ts`, além de ajustes pontuais no token de cor do tom `teal` em relação ao `DESIGN.md`.

---

## 2. Arquitetura Atual e Árvore de Componentes

### 2.1 Ponto de Entrada e Configuração de Rotas

- **Ponto de Entrada (`src/main.tsx`):**
  - Monta o componente `App` no elemento `#root` via `ReactDOM.createRoot` com `React.StrictMode`.
  - Importa `src/index.css` (Tailwind v4 e fontes locais).
- **Roteador e Layout Principal (`src/App.tsx`):**
  - Utiliza `BrowserRouter` do `react-router-dom` (v7.18.2).
  - Inclui acessibilidade nativa com link de bypass (`.skip-link` apontando para `#main`).
  - Controla o topo de página com `ScrollToTop`.
  - Estrutura global:
    ```
    <BrowserRouter>
      <div className="fixed inset-0 z-0 bg-ink" />
      <a href="#main" className="skip-link">Pular para o conteúdo</a>
      <ScrollToTop />
      <Header />
      <main id="main" className="relative z-10" tabIndex={-1}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:caseSlug" element={<CaseStudy />} />
            <Route path="/diagnostico-visual" element={<Diagnostico />} />
            <Route path="/segmentos/:slug" element={<SegmentPage />} />
            <Route path="/:slug" element={<SegmentPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
      <Analytics />
    </BrowserRouter>
    ```

### 2.2 Árvore de Páginas (`src/pages/`)

| Página | Arquivo | Responsabilidade e Estrutura Principal |
| :--- | :--- | :--- |
| **Home** | `src/pages/Home.tsx` | Hero full-bleed com `<video>` em loop e fallback de overlay `u-grade`, seção de serviços (`ServiceGrid`), métricas de autoridade (`HOME_STATS`), grade de segmentos (`aspect-[16/11]` mobile / `aspect-[3/4]` desktop), linha do tempo do método de produção (`Timeline` lazy com efeito parallax) e `CTASection`. |
| **Portfólio** | `src/pages/Portfolio.tsx` | Cabeçalho editorial, barra de filtros por categoria com tabs acessíveis (`role="tablist"`), exibição de vídeo para videoclipes e grade responsiva de cards (`aspect-[4/5]`) com links diretos para cases de estudo. |
| **CaseStudy** | `src/pages/CaseStudy.tsx` | Página dinâmica de case (`/portfolio/:caseSlug`), hero editorial com fotografia de capa, trilha breadcrumb, texto sobre a direção visual do projeto, player de vídeo (se houver), galeria lightbox (`Gallery`), grade de cases relacionados e CTA de conversão. |
| **SegmentPage** | `src/pages/SegmentPage.tsx` | Página dinâmica e rica para cada um dos 8 segmentos da marca. Contém Hero segmentado, seção "Para quem é", mosaico de fotos, comparativo "Problema vs Solução", grade interativa de "Serviços inclusos" com modal de detalhamento, cases em destaque, galeria de fotos, processo, `CTASection`, `FAQAccordion` (`tone="dark"`) e carrossel de outros segmentos. |
| **Diagnóstico Visual** | `src/pages/Diagnostico.tsx` | Formulário de briefing comercial de alta conversão. Layout em 2 colunas no desktop (aside com foto e argumentos de valor; form em card claro `bg-off/94`). Validação inline, honeypot anti-spam, envio para `/api/diagnostico` (Resend) e tela de sucesso pós-envio com botão de redirecionamento direto para WhatsApp com mensagem pré-formatada. |
| **NotFound** | `src/pages/NotFound.tsx` | Página 404 estilizada com mensagem contextualizada ("Essa cena saiu do enquadramento"), botões de ação rápida e grade de links para todos os segmentos. |

### 2.3 Árvore de Componentes (`src/components/`)

- `Header.tsx`: Navegação com detecção de scroll (transparente no topo sobre heros, escuro `bg-ink/95` ao rolar), logo SVG responsivo, menu desktop, botão CTA "Iniciar projeto", e drawer mobile animado com suporte a teclado (ESC) e trava de scroll no body.
- `Footer.tsx`: Rodapé escuro (`bg-ink`), logotipo em vetor, manifesto da marca, links rápidos para os 8 segmentos, links de contato e copyright com indicação geográfica ("Rio de Janeiro · Brasil").
- `Logo.tsx`: Componente SVG versátil da marca com tipografia `Righteous` e suporte às variantes `white`, `black`, `navy`, `teal`, `color` e `inverse`.
- `CTASection.tsx`: Faixa de encerramento e conversão reutilizável com imagem de fundo sutil em parallax, overlay escuro `bg-ink/80` e botões de ação (Diagnóstico e WhatsApp).
- `PortfolioGrid.tsx`: Grade de portfólio interativa com filtros em tempo real, suporte a vídeo em destaque e renderização condicional de cards com links para cases.
- `Gallery.tsx` & `src/components/ui/shared-element-gallery.tsx`: Galeria de fotos com integração a modal lightbox, animação suave em Framer Motion, navegação por teclado e bloqueio de scroll de fundo.
- `FAQAccordion.tsx`: Acordeão nativo acessível baseado na tag HTML `<details name="versavisual-faq">` com variações de tema `light` e `dark`, animações de rotação do ícone em SVG.
- `ServiceGrid.tsx` & `TiltCard.tsx`: Grade de serviços com efeito de micro-interação de inclinação 3D (`TiltCard`) e sublinhado animado no hover.
- `Reveal.tsx`: Utilitário de scroll reveal baseado em `IntersectionObserver` que respeita `prefers-reduced-motion`.
- `ScrollToTop.tsx`: Garante reset de scroll nas transições de rota e suporte a âncoras hash com offset do header fixo (76px).
- `WhatsAppFloat.tsx`: Botão flutuante fixo no canto inferior direito com ícone SVG oficial do WhatsApp.
- `HeroGridLines.tsx`: Linhas de grade animadas decorativas para enriquecer o fundo do hero.
- `src/components/ui/timeline.tsx`: Componente de linha do tempo vertical com barra de progresso preenchida conforme o scroll da página.
- `src/components/ui/beams-background.tsx` & `src/components/ui/cards-stack.tsx`: Componentes visuais adicionais disponíveis no repositório.

---

## 3. Estado das Rotas e Navegação

### 3.1 Mapeamento de Rotas Ativas

1. **Rotas Estáticas Principais:**
   - `/` → Home institucional
   - `/portfolio` → Galeria geral de portfólio e filtros
   - `/diagnostico-visual` → Formulário completo de diagnóstico e briefing
   - `/404` → Página de erro 404
2. **Rotas Canônicas de Segmentos (8 nichos):**
   - `/ativacoes-eventos`
   - `/moda-campanhas`
   - `/artistas-videoclipes`
   - `/posicionamento-profissional`
   - `/imagem-pessoal-lifestyle`
   - `/casamentos`
   - `/gestantes`
   - `/hotelaria-lifestyle`
   *(Também suportadas sob o prefixo `/segmentos/:slug`)*
3. **Rotas Dinâmicas de Cases de Portfólio:**
   - `/portfolio/:caseSlug` (ex: `/portfolio/ativacao-drinkball`, `/portfolio/babado-novo-sururu`, etc.)

### 3.2 Pré-geração de Arquivos HTML Estáticos

O script `scripts/emit-route-html.mjs` é executado logo após o build do Vite (`npm run build`). Ele lê `public/sitemap.xml` e replica o arquivo `dist/index.html` em pastas correspondentes a cada rota (ex: `dist/ativacoes-eventos/index.html`), permitindo roteamento direto limpo em servidores estáticos sem depender exclusivamente de rewrites de SPA.

---

## 4. Design System, Tokens CSS e Estilos Globais

### 4.1 Configuração do Tailwind CSS v4

- Configurado via plugin `@tailwindcss/vite` em `vite.config.ts`.
- Ponto de entrada CSS em `src/index.css` usando a sintaxe moderna `@import 'tailwindcss';` e bloco `@theme`.
- **Paleta de Cores e Tokens Configurados:**
  - `--color-ink`: `#050a0d` (Brand Black oficial)
  - `--color-navy`: `#253540` (Deep Navy)
  - `--color-teal`: `#547481` *(Nota: `DESIGN.md` e `Logo.tsx` definem `#5E7F8C` como o tom teal principal)*
  - `--color-teal-400`: `#70909c`
  - `--color-teal-700`: `#3f5d68`
  - `--color-mist`: `#a4b8bf` (Mist de apoio)
  - `--color-off`: `#f2f2f2` (Off-white para fundos e textos)
  - `--color-surface`: `#f2f2f2`
  - `--color-line`: `rgba(37, 53, 64, 0.10)`
  - `--color-line-strong`: `rgba(37, 53, 64, 0.20)`

### 4.2 Tipografia e Fontes Self-Hosted

Todas as fontes estão localmente hospedadas em `public/fonts/` no formato otimizado `.woff2` e declaradas via `@font-face` com `font-display: swap`:
- **Display / Wordmark:** `Righteous` (`righteous-400.woff2`) — utilizada na classe `.u-wordmark` e nos elementos da marca.
- **Headlines / UI / Botões:** `Outfit` (`outfit-300.woff2` a `outfit-800.woff2`) — definida em `--font-head` e aplicada automaticamente a `h1`–`h6`, botões e inputs.
- **Corpo de Texto / Legendas:** `DM Sans` (`dm-sans-300.woff2` a `dm-sans-500.woff2` + versões itálicas) — definida em `--font-body` e aplicada ao `body`.

Fontes críticas (`outfit-800.woff2` e `dm-sans-400.woff2`) já possuem tags de `<link rel="preload">` configuradas no `<head>` do `index.html`.

### 4.3 Utilitários Visuais e Animações

- `.u-grade` / `.u-grade-soft`: Gradiente escuro em overlay para manter contraste de texto sobre fotografias.
- `.u-defer-render`: Utiliza `content-visibility: auto` com `contain-intrinsic-size` para otimização de renderização e métricas Core Web Vitals (CWV).
- `View Transitions API`: Configurado em `src/index.css` para transições sutis de página em navegadores modernos, com desativação automática para usuários com `prefers-reduced-motion`.

---

## 5. Mapeamento de Assets, Dependências e Tipagem

### 5.1 Dependências (`package.json`)

- **Produção:**
  - `react`: `^19.0.0`
  - `react-dom`: `^19.0.0`
  - `react-router-dom`: `^7.18.2`
  - `framer-motion`: `^13.1.0`
  - `lucide-react`: `^1.31.0`
  - `@vercel/analytics`: `^2.0.1`
- **Desenvolvimento:**
  - `vite`: `^8.0.0`
  - `@vitejs/plugin-react`: `^6.0.0`
  - `@tailwindcss/vite`: `^4.0.0`
  - `tailwindcss`: `^4.0.0`
  - `typescript`: `^5.7.0`
  - `oxfmt`: `^0.2.0`
  - `@types/react`: `^19.0.0`
  - `@types/react-dom`: `^19.0.0`
  - `@types/node`: `^22.0.0`

### 5.2 Acervo de Imagens e Vídeos Locais

- **Imagens:** 15 pastas de produções reais organizadas em `public/images/`:
  - `Artistas & Videoclipes - Backstage Clipe Sururu`
  - `Ativações & Eventos - Bonfim House`
  - `Ativações & Eventos - Camarote Ondina`
  - `Ativações & Eventos - Lançamento Drinkball`
  - `Ativações & Eventos - Mega Bloco Chá da Alice`
  - `Ativações & Eventos - Syn Ice`
  - `Casamentos`
  - `Gestantes`
  - `Hotelaria & Lifestyle`
  - `Imagem Pessoal & Lifestyle - Ensaio Autoral`
  - `Imagem Pessoal & Lifestyle - Ensaio Street`
  - `Moda & Campanhas - Fashion Manners`
  - `Moda & Campanhas - Festival Jeans Toritama`
  - `Moda & Campanhas - Santa Lolla`
  - `Posicionamento Profissional - Loja Frida`
  - Imagem de fallback e método: `foto-a-producao-nao-falha.webp`.
- **Vídeos:** 5 arquivos de vídeo em `public/videos/`, com `hero.mp4` e `hero.webm` para reprodução leve no topo.
- **Zero dependência externa:** Nenhuma requisição a serviços de terceiros como Unsplash.

---

## 6. Diagnóstico de Gaps, Débitos Técnicos e Erros Encontrados

| ID | Categoria | Gravidade | Descrição do Problema | Impacto |
| :--- | :--- | :--- | :--- | :--- |
| **GAP-01** | TypeScript | **Crítico** | Falta de separadores (`;` ou `,`) nas definições de tipos em `src/data/site.ts` (linhas 23, 25, 36, 101, 102) e em `src/lib/seo.tsx` (linha 107). | `npx tsc --noEmit` falha com 9 erros de compilação. |
| **GAP-02** | Roteamento / SEO | **Médio** | Descompasso de slugs em `public/sitemap.xml` vs `PORTFOLIO` em `src/data/site.ts`: `loja-frida-campanha` vs `loja-frida-sao-joao`; cases de posicionamento sem `caseSlug` definido. | O script `emit-route-html.mjs` gera páginas HTML estáticas cujo conteúdo em runtime pode renderizar a tela de `NotFound`. |
| **GAP-03** | Design Tokens | **Baixo** | Inconsistência do valor hexadecimal de `--color-teal` em `src/index.css` (`#547481`) vs o `DESIGN.md` e `Logo.tsx` (`#5E7F8C`). | Leve divergência de saturação/tom no teal em relação à identidade visual do Brandbook. |
| **GAP-04** | Acessibilidade / Contraste | **Baixo** | A classe `.u-eyebrow` em `src/index.css` define `color: var(--color-navy)`. Se aplicada diretamente sobre fundos escuros (`bg-ink`) sem sobrescrita explícita de `text-mist`, o contraste fica abaixo de 3:1. | Risco de legibilidade reduzida em subtítulos de seções escuras. |
| **GAP-05** | Limpeza de Código | **Informativo** | Presença de componentes não utilizados (`beams-background.tsx`, `cards-stack.tsx`) e arquivos de legado/Next.js em `src/imports/`. | Não quebra o build, mas adiciona ruído ao repositório. |

---

## 7. Recomendações e Próximos Passos

1. **Correção Imediata de Sintaxe TypeScript:** Ajustar as tipagens em `src/data/site.ts` e `src/lib/seo.tsx` para zerar todos os erros no `npx tsc --noEmit`.
2. **Sincronização de Slugs de Cases:** Harmonizar os slugs em `sitemap.xml` com a lista `PORTFOLIO` de `site.ts`.
3. **Alinhamento do Token Teal:** Atualizar `--color-teal` em `src/index.css` para `#5E7F8C`.
4. **Verificação de Build e Testes Finais:** Executar `npm run format`, `npx tsc --noEmit` e `npm run build` para garantir 100% de sucesso e integridade.
