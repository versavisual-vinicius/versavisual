# Inventário Exaustivo de Especificações e Features — VERSAVISUAL Website

> **Documento de Especificação e Mineração de Requisitos**
> **Autor:** survey_spec_miner (Antigravity Teamwork)
> **Data:** 2026-08-20T01:55:00Z
> **Fontes de Verdade:** `ORIGINAL_REQUEST.md`, `DESIGN.md`, `AGENTS.md`, `README.md`, `src/imports/pasted_text/versavisual-spec.md`, Codebase (`src/`, `api/`, `public/`).

---

## 1. Visão Geral e Princípio de Marca

O website da **VERSAVISUAL** é um hub audiovisual autoral focado em fotografia, vídeo, storymaking e direção visual para marcas, eventos, artistas e pessoas.
- **Assinatura Verbal:** *"Imagem não é registro. É posicionamento."*
- **Diretriz Estética:** Escuro, fotográfico, direto e comercial. A imagem real é o principal argumento; a interface apoia o portfólio sem competir com ele.
- **Stack Tecnológica:** React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`), React Router 7 (`react-router-dom`), Framer Motion 13, Lucide React, Vercel Analytics (`@vercel/analytics`).

---

## 2. Matriz Completa de Rotas e Páginas

| Rota | Componente | Descrição / Função | Requisitos de Acessibilidade & Interatividade | SEO / Metadados |
|---|---|---|---|---|
| `/` | `Home.tsx` | Página inicial institucional e roteadora com Hero em vídeo full-bleed, grid de serviços, métricas de autoridade, seletor de 8 segmentos, timeline do método de produção e CTA principal. | Video autoplay muted loop com playsInline; skip-link; observer de hash para `#nichos` e `#processo`; links com viewTransition. | Title: `VERSAVISUAL — Fotografia, Vídeo e Storymaking para Marcas`<br>JSON-LD: `Organization`, `WebSite`. |
| `/portfolio` | `Portfolio.tsx` | Portfólio completo com sistema de abas de filtro por segmento, banner de vídeo em destaque para videoclipes e grid de 27+ cases/projetos com card links para estudos detalhados. | `role="tablist"` com `aria-selected` nas abas; navegação por teclado; lazy loading com `fetchPriority="high"` nos primeiros 3 itens. | Title: `Portfólio — Fotografia, Vídeo e Direção Visual \| VERSAVISUAL`<br>JSON-LD: `BreadcrumbList`. |
| `/portfolio/:caseSlug` | `CaseStudy.tsx` | Página de estudo de caso individual com galeria do projeto, dados de ficha técnica (segmento, cidade, escopo), texto editorial sobre o projeto, vídeo (se houver) e cases relacionados. | Breadcrumb acessível; player de vídeo com controls; galeria com modal lightbox interativo; link de retorno ao segmento pai. | Title: `{title} — {category} \| VERSAVISUAL`<br>JSON-LD: `BreadcrumbList`, `CreativeWork`. |
| `/diagnostico-visual` | `Diagnostico.tsx` | Formulário de diagnóstico visual gratuito em split screen (desktop) ou stacked (mobile), com captação de dados de briefing, validação em tempo real e redirecionamento formatado para WhatsApp e e-mail. | `aria-describedby` para erros de campo; `aria-live="polite"` para anúncio de status; input honeypot anti-spam; foco e scroll automático no primeiro erro. | Title: `Diagnóstico Visual Gratuito \| VERSAVISUAL`<br>JSON-LD: `BreadcrumbList`. |
| `/:slug` ou `/segmentos/:slug` | `SegmentPage.tsx` | Landing page temática para cada um dos 8 segmentos de atuação (Ativações & Eventos, Moda & Campanhas, Artistas & Videoclipes, Posicionamento Profissional, Imagem Pessoal & Lifestyle, Casamentos, Gestantes, Hotelaria & Lifestyle). | Hero com imagem full-bleed; galeria em mosaico com lightbox; comparativo problema/solução; grid de 6 serviços com modal de detalhe; cases relacionados; galeria completa; timeline de processo; FAQ accordion; exploração de outros segmentos. | Title: `{seoTitle} \| VERSAVISUAL`<br>JSON-LD: `BreadcrumbList`, `Service`, `FAQPage`. |
| `/404` e `*` | `NotFound.tsx` | Página de erro 404 personalizada para rotas inexistentes, com visual imersivo ("Essa cena saiu do enquadramento"), links de recuperação de navegação e atalhos rápidos para todos os 8 segmentos. | Foco acessível; botões de navegação para Início, Portfólio e Diagnóstico; links diretos para todos os segmentos. | Title: `Página não encontrada \| VERSAVISUAL`<br>Meta: `robots: noindex, nofollow`. |

---

## 3. Matriz de Componentes e Especificações Comportamentais

| Componente | Arquivo | Responsabilidade | Comportamento e Interatividade | Critérios de Aceitação & Estilo |
|---|---|---|---|---|
| `Header` | `src/components/Header.tsx` | Cabeçalho global fixo | - Fundo transparente com `backdrop-blur-md` no topo em páginas com Hero; escurece para `bg-ink/95` no scroll (>12px) ou em páginas sem Hero (`/portfolio`, `/diagnostico-visual`, `/404`).<br>- Menu mobile em drawer com toggle animado, `aria-expanded`, `aria-controls="mobile-navigation-drawer"`, listener de tecla `Escape` e bloqueio de scroll no `body`.<br>- Destaque de link ativo por rota ou por visibilidade da seção hash (`#nichos`, `#processo`).<br>- Botão CTA `Iniciar projeto` levando a `/diagnostico-visual`. | - Sem overflow horizontal.<br>- Área de clique mínima de 44x44px no mobile.<br>- Contraste WCAG AA. |
| `Footer` | `src/components/Footer.tsx` | Rodapé global | - 3 colunas estruturadas: Marca (Logo + resumo de posicionamento + WhatsApp + E-mail), Segmentos (links para os 8 segmentos), Contato/Navegação (WhatsApp, E-mail, Portfólio, Diagnóstico).<br>- Barra inferior com copyright © 2026 e selo "Rio de Janeiro · Brasil". | - Links externos com `rel="noopener noreferrer"` e `target="_blank"`.<br>- Links internos com `viewTransition`. |
| `WhatsAppFloat` | `src/components/WhatsAppFloat.tsx` | Botão flutuante WhatsApp | - Fixo no canto inferior direito (`bottom-5 right-5 z-40`).<br>- Abre link `https://wa.me/5511950747192` em nova aba.<br>- Transição de cor no hover com ícone SVG nítido. | - `aria-label="Falar no WhatsApp"`.<br>- `rel="noopener noreferrer"` e `target="_blank"`.<br>- Dimensão mínima de toque (44x44px). |
| `CTASection` | `src/components/CTASection.tsx` | Bloco reutilizável de conversão | - Foto de fundo com parallax sutil (`useParallax`), opacidade controlada e overlay escuro `bg-ink/80`.<br>- Eyebrow em `text-mist`, H2 em `text-off`, texto explicativo em `text-mist`.<br>- Dois botões: primário (`bg-teal text-off` / `bg-off text-ink`) para `/diagnostico-visual` e secundário para WhatsApp. | - Foto decorativa com `alt=""` e `aria-hidden="true"`.<br>- Botões com alto contraste e estados de foco/hover. |
| `FAQAccordion` | `src/components/FAQAccordion.tsx` | Acordeão de perguntas frequentes | - Exibe lista de itens de FAQ com perguntas fechadas por padrão.<br>- Alterna expansão com rotação suave do ícone `+` em 45 graus.<br>- Suporte a variantes `tone="light"` e `tone="dark"`. | - Elementos `<details>` / `<summary>` nativos ou `aria-expanded` para acessibilidade de leitores de tela.<br>- Foco visível com outline teal. |
| `Gallery` & `shared-element-gallery` | `src/components/Gallery.tsx`<br>`src/components/ui/shared-element-gallery.tsx` | Galeria de fotos e modal Lightbox | - Grid responsivo de fotos (modo padrão 2 a 3 colunas ou modo `featured` com primeira foto em destaque `col-span-2 aspect-[16/10]`).<br>- Clique na foto abre Lightbox full-screen em portal React com `AnimatePresence`.<br>- Fechamento via: botão Fechar (`X`), clique no backdrop, tecla `Escape` e gesto de arrastar vertical (drag-to-dismiss).<br>- Bloqueia scroll do body enquanto o modal estiver aberto. | - `aria-label` descritivo em cada botão de ampliar.<br>- `aria-modal="true"` e `role="dialog"` no modal.<br>- `alt` correto em todas as imagens. |
| `PortfolioGrid` | `src/components/PortfolioGrid.tsx` | Grid interativo de portfólio | - Abas de filtro (`Todos`, `Ativações & Eventos`, `Moda & Campanhas`, `Artistas & Videoclipes`, `Posicionamento`, `Imagem Pessoal`, `Casamentos`, `Gestantes`, `Hotelaria & Lifestyle`).<br>- Banner de vídeo com autoplay em loop quando o filtro `Artistas & Videoclipes` está ativo.<br>- Grid com transição suave `u-fade-in` ao trocar de filtro.<br>- Cards com links para estudo de caso (`/portfolio/:caseSlug`) quando disponível. | - Imagens em `aspect-[4/5]`.<br>- `fetchPriority="high"` no primeiro card acima da dobra.<br>- Tags de categoria em `text-teal-400`. |
| `ServiceGrid` | `src/components/ServiceGrid.tsx` | Grid de serviços institucionais | - 6 cards de serviços com número (`01`..`06`), título, descrição e animação de sublinhado em teal no hover.<br>- Suporte a efeito sutil de inclinação (TiltCard). | - Grid com bordas e divisórias consistentes com o design system.<br>- Tipografia refinada (`Outfit` nos títulos, `DM Sans` no corpo). |
| `Timeline` | `src/components/ui/timeline.tsx` | Timeline do método de execução | - Apresentação sticky de título/método à esquerda e passos cronológicos à direita.<br>- Linha de progresso vertical que se preenche e acende gradiente com base no scroll do usuário.<br>- Efeito parallax na fotografia de bastidores. | - Indicadores numéricos claros.<br>- Suporte a modo de movimento reduzido (`prefers-reduced-motion`). |
| `Logo` | `src/components/Logo.tsx` | Wordmark oficial da marca | - SVG vetorial renderizando `VERSAVISUAL` com a tipografia `Righteous`.<br>- Variantes de cor: `white`, `black`, `navy`, `teal`, `color` (`VERSA` em ink, `VISUAL` em teal) e `inverse`. | - `role="img"` e `aria-label="VERSAVISUAL"`. |
| `ScrollToTop` | `src/components/ScrollToTop.tsx` | Controlador de rolagem de página | - Ao mudar de rota, redefine o scroll para o topo `(0, 0)`.<br>- Se houver hash na URL (ex: `/#nichos`), rola suavemente até o elemento compensando os `76px` de altura do header fixo. | - Sem saltos visuais abruptos. |
| `Reveal` | `src/components/Reveal.tsx` | Revelação progressiva no scroll | - Aplica classe `.in` via `IntersectionObserver` quando o elemento entra no viewport.<br>- Respeita `prefers-reduced-motion` desativando a animação.<br>- Timeout de segurança (400ms) para evitar elementos invisíveis em caso de falha de observer. | - Animação suave de opacidade e translação Y. |

---

## 4. Especificações do Fluxo de Diagnóstico Visual e API

### 4.1. Formulário `/diagnostico-visual`

#### Campos do Formulário
1. `_gotcha`: Campo honeypot oculto (`className="hidden" tabIndex={-1}`). Se preenchido por spambots, o envio é descartado silenciosamente com retorno `{ ok: true }`.
2. `nome` (Obrigatório): Texto, autocomplete `name`. Validação: não-vazio.
3. `empresa` (Opcional): Texto, autocomplete `organization`.
4. `whatsapp` (Obrigatório): Telefone, inputMode `tel`, autocomplete `tel`. Validação: não-vazio.
5. `email` (Obrigatório): E-mail, autocomplete `email`. Validação: regex de e-mail padrão.
6. `cidade` (Opcional): Texto, autocomplete `address-level2`.
7. `segmento` (Opcional): Select dropdown com as 8 opções oficiais + "Outro / não sei".
8. `tipo` (Opcional): Select dropdown com 10 opções de tipo de projeto.
9. `data` (Opcional): Data desejada (input tipo `date`).
10. `uso` (Opcional): Texto livre sobre canais de veiculação do conteúdo.
11. `objetivo` (Opcional): Texto livre sobre metas de comunicação da marca.
12. `investimento` (Opcional): Radio group com 6 faixas de investimento:
    - *Até R$ 1.500*
    - *R$ 1.500 – 3.000*
    - *R$ 3.000 – 6.000*
    - *R$ 6.000 – 10.000*
    - *Acima de R$ 10.000*
    - *Ainda não sei*
13. `mensagem` (Opcional): Textarea de mensagem adicional (4 linhas).

#### Comportamento e Estados do Formulário
- **Validação Client-Side:** Se campos obrigatórios estiverem ausentes ou inválidos, define mapa de erros `errors`, foca no primeiro campo com erro e rola suavemente até ele.
- **Acessibilidade de Erros:** Inputs com erro recebem `aria-invalid="true"` e `aria-describedby="{campo}-error"`, com mensagem de erro visual renderizada abaixo do campo.
- **Estado de Carregamento:** Botão de submit exibe spinner animado e texto `Enviando...`, desabilitando novos cliques (`disabled={isSubmitting}`).
- **Estado de Sucesso:**
  - Exibe tela de confirmação com ícone de check `✓` e resumo completo do lead preenchido.
  - CTA principal `Continuar no WhatsApp com Briefing` gerando link `https://wa.me/5511950747192?text=...` formatado com todos os dados preenchidos.
  - CTA secundário `Ver portfólio` para navegação contínua.
  - Botão `Enviar outro diagnóstico` para resetar o formulário.
- **Estado de Erro de Rede / Servidor:** Exibe banner de aviso em vermelho com `role="status"` e `aria-live="polite"` sugerindo contato direto por WhatsApp.

### 4.2. Endpoint `/api/diagnostico`

- **Método:** `POST`
- **Headers Requeridos:** `Content-Type: application/json`
- **Validação de Payload:**
  - Rejeita requisições maiores que 40KB (Status `413`).
  - Rejeita métodos diferentes de POST (Status `405`).
  - Valida campos obrigatórios `nome`, `whatsapp`, `email` (Status `400` se faltar).
  - Valida sintaxe de `email` via regex (Status `400`).
- **Envio de E-mail via Resend API:**
  - Destinatário: `LEAD_RECIPIENT` (`mayconviniciuscunha@icloud.com`).
  - Reply-To: e-mail do lead.
  - Formata corpo em HTML estilizado (tabela com cores da marca `#050A0D` e `#A4B8BF`) e texto puro alternativo.
  - Trata falhas do provedor retornando Status `502` / `503`.

---

## 5. Design System e Restrições de Tokens (`DESIGN.md`)

### 5.1. Paleta de Cores

| Token | Hex | Uso Principal | Regra Obrigatória |
|---|---|---|---|
| `ink` | `#050A0D` | Fundo principal (`bg-ink`), textos em cards claros (`text-ink`). | Fundo padrão do site e de seções escuras. |
| `navy` | `#253540` | Superfícies secundárias, bordas escuras, texto secundário em fundos claros (`text-navy`). | Utilizado para corpo de texto em cards claros. |
| `teal` | `#547481` / `#5E7F8C` | Acentos, CTAs (`bg-teal`), bordas de foco e estados ativos. | **REGRA CRÍTICA DE CONTRASTE:** Texto sobre `bg-teal` DEVE ser SEMPRE branco/off-white (`text-off`). NUNCA usar `text-ink` ou `text-navy` sobre `bg-teal`. |
| `teal-400` | `#70909c` | Links de acento em fundos escuros, etiquetas de categoria, outline de foco. | Destaque visual em fundos escuros. |
| `mist` | `#A4B8BF` | Texto secundário em fundos escuros, legendas, eyebrows e bordas translúcidas. | Uso em `text-mist` sobre `bg-ink`. |
| `off` / `surface` | `#F2F2F2` | Fundo de cards claros, texto primário sobre fundos escuros (`text-off`). | Base clara para leitura de formulários e cards de serviço. |

### 5.2. Tipografia

1. **Display / Wordmark:** `Righteous` (self-hosted em `/fonts/righteous-400.woff2`).
2. **Headlines, UI, Botões, Eyebrows:** `Outfit` (pesos 300, 400, 500, 600, 700, 800 em `/fonts/outfit-*.woff2`).
3. **Corpo, Legendas Longas, Rodapé:** `DM Sans` (pesos 300, 400, 500, 300i, 400i em `/fonts/dm-sans-*.woff2`).

---

## 6. Features Discovered (Matriz de Inventário de Recursos)

| # | Categoria | Feature | Descrição | Entradas | Saídas | Comportamento de Erro | Descoberto Via | Critérios de Teste |
|---|---|---|---|---|---|---|---|---|
| 1 | Navegação Global | Header Responsivo & Scroll Blur | Barra de navegação com logotipo, links de páginas/âncoras, CTA "Iniciar projeto" e transição de transparência no scroll (>12px). | Evento de scroll da janela, rota atual (`pathname`). | Header com classe `bg-ink/60` ou `bg-ink/95`, classes de link ativo atualizadas. | Fallback para opaco se evento de scroll falhar. | `src/components/Header.tsx`, `DESIGN.md` | - Header renderiza logo e 5 links no desktop.<br>- Rolar a página adiciona fundo escuro.<br>- Rota ativa tem estilo destacado. |
| 2 | Navegação Global | Menu Mobile Drawer Acessível | Gaveta de navegação móvel com botão hamburguer, trava de scroll no body e controle de foco. | Clique no botão hamburguer, toque fora, tecla `Escape`, clique em link. | Abre/fecha drawer com `aria-expanded` toggle; desativa scroll do body. | Se JS travar, fallback de estilo preserva visual. | `src/components/Header.tsx`, `ORIGINAL_REQUEST.md` | - Botão toggle possui `aria-expanded="false"` fechado e `"true"` aberto.<br>- Pressionar `Escape` fecha o drawer.<br>- Scroll do body trava quando aberto. |
| 3 | Navegação Global | Skip Link para Conteúdo Principal | Link oculto no topo da página visível ao receber foco por teclado, saltando para `main#main`. | Tecla `Tab` ao carregar a página. | Elemento salta para a tela e foca em `#main`. | Se `#main` não existir, foco permanece no skip link. | `src/App.tsx`, `DESIGN.md` | - `Tab` revela o link "Pular para o conteúdo".<br>- Ativação move o foco para `#main`. |
| 4 | Navegação Global | Scroll To Top & Anchor Offset | Redefinição automática da rolagem para o topo ao trocar de rota ou scroll suave com offset de 76px para âncoras. | Mudança de rota (`pathname`, `hash`). | Janela rola para `(0,0)` ou para a posição da âncora `-76px`. | Se elemento de âncora não for encontrado, rola para o topo. | `src/components/ScrollToTop.tsx` | - Navegar para `/portfolio` rola para o topo.<br>- Clicar em `/#nichos` rola até a seção compensando o header. |
| 5 | Conversão | Botão Flutuante de WhatsApp | Botão fixo no canto inferior direito com link direto para conversa no WhatsApp com a VERSAVISUAL. | Clique no botão. | Abre URL `https://wa.me/5511950747192` em nova aba com `noopener noreferrer`. | Fallback para URL estática se parâmetros faltarem. | `src/components/WhatsAppFloat.tsx`, `DESIGN.md` | - Botão presente em todas as páginas.<br>- `target="_blank"` e `rel="noopener noreferrer"` presentes.<br>- `aria-label="Falar no WhatsApp"`. |
| 6 | Home | Hero Vídeo Full-Bleed | Seção Hero de impacto com vídeo em loop de alta resolução, overlay gradiente `u-grade`, chamada institucional e CTAs. | Arquivos `/videos/hero.webm` e `/videos/hero.mp4`. | Renderização de vídeo em background com fallback e texto sobreposto legível. | Fallback para poster/imagem caso autoplay falhe no dispositivo. | `src/pages/Home.tsx`, `DESIGN.md` | - Vídeo tem atributos `autoPlay`, `loop`, `muted`, `playsInline`.<br>- H1 e texto legíveis com alto contraste sobre o vídeo. |
| 7 | Home | Grid de Serviços & TiltCard | Grid com 6 serviços principais da VERSAVISUAL com efeito de hover e linha de acento teal. | Array `HOME_SERVICES`. | Grid de 6 cards responsivos (`sm:grid-cols-2 lg:grid-cols-3`). | Fallback para cards estáticos se suporte a animação for desabilitado. | `src/components/ServiceGrid.tsx`, `src/pages/Home.tsx` | - 6 cards renderizados com números de `01` a `06`.<br>- Linha de acento anima no hover. |
| 8 | Home | Métricas de Autoridade (Stats) | Faixa com estatísticas da produtora (+120 Projetos, 25+ Marcas, 18 Estados, 5+ Anos). | Array `HOME_STATS`. | Grid de 4 blocos com divisórias em `off/10`. | N/A (conteúdo estático). | `src/pages/Home.tsx`, `src/data/site.ts` | - 4 métricas exibidas em grid 2x2 no mobile e 4x1 no desktop. |
| 9 | Home | Seletor de Segmentos | Grid de cards dos 8 segmentos com proporções mobile `aspect-[16/11]` e desktop `aspect-[3/4]`, com hover zoom. | Array `SEGMENTS`. | Cards clicáveis levando às rotas específicas de segmento (`/:slug`). | Se imagem falhar, exibe fallback local. | `src/pages/Home.tsx`, `DESIGN.md` | - 8 cards de segmento renderizados.<br>- Proporções `aspect-[16/11]` em telas <640px e `aspect-[3/4]` em >=640px. |
| 10 | Home | Timeline do Método de Execução | Componente interativo que exibe os 4 passos do processo de produção com linha de progresso vinculada ao scroll e foto com parallax. | Array `HOME_PROCESS` e elemento de mídia. | Linha vertical que acende gradiente durante a rolagem da página. | Modo reduzido de movimento desativa interpolação complexa. | `src/components/ui/timeline.tsx`, `src/pages/Home.tsx` | - 4 etapas renderizadas (`01` a `04`).<br>- Linha vertical atualiza escala no scroll. |
| 11 | Portfólio | Filtros de Portfólio por Segmento | Sistema de abas com 9 opções para filtrar a galeria de projetos em tempo real com animação de fade. | Clique em uma das abas de `PORTFOLIO_FILTERS`. | Filtra array `PORTFOLIO` e re-renderiza o grid com transição suave. | Aba padrão "Todos" exibe todos os itens se filtro inválido. | `src/components/PortfolioGrid.tsx`, `src/pages/Portfolio.tsx` | - Clique em aba altera filtro ativo.<br>- `role="tablist"` e `aria-selected` atualizados.<br>- Transição visual suave sem travamentos. |
| 12 | Portfólio | Vídeo Destaque em Artistas & Videoclipes | Player de vídeo em loop que surge acima do grid quando a aba "Artistas & Videoclipes" é selecionada. | Seleção da aba "Artistas & Videoclipes". | Renderiza `<video>` em loop com autoplay e muted. | Oculto em outros filtros. | `src/components/PortfolioGrid.tsx` | - Banner de vídeo aparece apenas no filtro de videoclipes.<br>- Vídeo roda em loop sem som. |
| 13 | Portfólio | Grid de Cards de Projetos & Links para Cases | Exibição de cards de projetos com imagem 4:5, tag de categoria, título, cidade e link para estudo de caso quando disponível. | Array `PORTFOLIO`. | Renderiza links para `/portfolio/:caseSlug` ou articles estáticos. | Alt descritivo gerado por `portfolioImageAlt`. | `src/components/PortfolioGrid.tsx` | - Cards com `caseSlug` são links navegáveis.<br>- Imagens com aspect ratio 4:5 consistente. |
| 14 | Segmentos | Landing Pages de 8 Segmentos | Páginas completas com conteúdo personalizado para cada nicho (Ativações, Moda, Artistas, Posicionamento, Lifestyle, Casamentos, Gestantes, Hotelaria). | Slug na URL (`/ativacoes-eventos`, etc.) ou prop `segment`. | Renderiza hero, público, problema/solução, serviços, cases, galeria, processo, FAQ e outros segmentos. | Rota com slug inexistente renderiza página `NotFound`. | `src/pages/SegmentPage.tsx`, `src/data/site.ts` | - As 8 URLs de segmento abrem com dados específicos.<br>- Aliases legados redirecionam/resolvem corretamente. |
| 15 | Segmentos | Modal de Detalhes do Serviço | Modal interativo acionado ao clicar em um card de serviço dentro da landing page do segmento. | Clique no botão do serviço. | Abre modal com descrição detalhada, foco no botão fechar e CTA para diagnóstico. | Fechamento via botão fechar, tecla `Escape` ou clique no backdrop. | `src/pages/SegmentPage.tsx` | - Clicar no serviço abre o modal com `aria-modal="true"`.<br>- Foco vai para o botão fechar.<br>- `Escape` fecha o modal. |
| 16 | Segmentos / Cases | Galeria de Fotos com Lightbox Fullscreen | Componente de galeria com zoom de imagens em tela cheia usando portal, Framer Motion e suporte a arrastar para fechar. | Clique na foto da galeria. | Modal fullscreen com foto ampliada em alta resolução, backdrop escuro com blur e botão fechar. | `Escape`, clique no fundo ou arrastar >100px fecha o modal. | `src/components/ui/shared-element-gallery.tsx` | - Imagem expande em modal de alta fidelidade.<br>- Scroll do body é bloqueado enquanto aberto.<br>- Fechamento por gesto de drag ou teclado. |
| 17 | Segmentos | Acordeão de FAQ Temático | Seção de dúvidas frequentes com perguntas e respostas sanfonadas nativas ou controladas. | Clique no item de pergunta. | Expande resposta e gira ícone de `+` em 45°. | N/A (nativa HTML ou estado React). | `src/components/FAQAccordion.tsx` | - 4 perguntas renderizadas por segmento.<br>- Clique expande o conteúdo sem saltos de layout. |
| 18 | Case Study | Estudo de Caso de Projeto Individual | Página detalhada de projeto com galeria completa, ficha técnica de produção e cases relacionados do mesmo segmento. | URL `/portfolio/:caseSlug`. | Renderiza hero com foto principal, metadados, texto descritivo, galeria e links relacionados. | Slug inexistente renderiza página `NotFound`. | `src/pages/CaseStudy.tsx`, `src/data/site.ts` | - 17+ cases mapeados abrem com sucesso.<br>- Breadcrumb e metadados OpenGraph injetados. |
| 19 | Diagnóstico | Validação em Tempo Real do Formulário | Validação client-side dos campos obrigatórios (`nome`, `whatsapp`, `email`) e sintaxe de e-mail antes do submit. | Evento de submit do formulário. | Destaca campos inválidos com borda vermelha, mensagem de erro e foco automático. | Impede envio e avisa usuário caso haja dados inválidos. | `src/pages/Diagnostico.tsx` | - Submeter vazio destaca Nome, WhatsApp e E-mail.<br>- E-mail inválido (ex: `teste@`) exibe erro de formato.<br>- Scroll automático leva ao primeiro erro. |
| 20 | Diagnóstico | Integração com WhatsApp (Gerador de Lead) | Após envio com sucesso ou via link direto, gera URL com mensagem estruturada contendo todos os dados do briefing. | Dados preenchidos no formulário (`LeadData`). | URL `https://wa.me/5511950747192?text=...` codificada com texto estruturado em Markdown. | Trata campos opcionais omitindo linhas nulas. | `src/pages/Diagnostico.tsx` | - Mensagem gerada inclui Nome, Empresa, WhatsApp, E-mail, Segmento, Tipo, Orçamento e Mensagem. |
| 21 | Diagnóstico | Honeypot Anti-Spam | Campo oculto `_gotcha` que captura bots automatizados sem atrapalhar a experiência do usuário real. | Preenchimento automático por robô. | Envio ignorado silenciosamente no client e retornado `{ ok: true }` no server sem disparar e-mail. | Nenhum e-mail de spam enviado. | `src/pages/Diagnostico.tsx`, `api/diagnostico.ts` | - Formulário com `_gotcha` preenchido não faz requisição de envio real. |
| 22 | Diagnóstico | Transmissão de Lead para Servidor (`/api/diagnostico`) | Envio assíncrono via `fetch` para API serverless que processa e encaminha o e-mail formatado via Resend. | Dados JSON do lead. | Retorno HTTP `200 { ok: true }` e transição para tela de sucesso. | Exibe mensagem de erro e sugere contato via WhatsApp em caso de falha de rede/servidor. | `src/pages/Diagnostico.tsx`, `api/diagnostico.ts` | - Envio com sucesso exibe tela de agradecimento.<br>- Falha de rede exibe banner de erro com `aria-live="polite"`. |
| 23 | Páginas de Erro | Página 404 Customizada | Tela de erro estilizada com código 404, mensagem temática e atalhos rápidos para recuperação do usuário. | URL inexistente ou rota não mapeada. | Renderiza página 404 com botões de ação e links para todos os 8 segmentos. | Metatag `robots: noindex, nofollow` injetada para evitar indexação por buscadores. | `src/pages/NotFound.tsx` | - Acessar `/rota-inexistente` exibe 404 sem erro de runtime.<br>- Todos os links de segmento na 404 funcionam. |
| 24 | SEO & Metadados | Injeção Dinâmica de SEO, Canonical e JSON-LD | Hook `useSeo` que atualiza dinamicamente `title`, `meta description`, `canonical`, OpenGraph, Twitter cards e script `application/ld+json`. | Objeto de configuração SEO por página. | `<head>` atualizado em cada navegação de rota SPA. | Tag anterior de JSON-LD é removida para evitar duplicação. | `src/lib/seo.tsx` | - Cada rota possui title e description exclusivos.<br>- Schema JSON-LD válido injetado no DOM. |
| 25 | Build & SSG | Pré-renderização Estática de Rotas HTML | Script pós-build (`scripts/emit-route-html.mjs`) que cria cópias de `index.html` em pastas de rota a partir do `sitemap.xml`. | `public/sitemap.xml` e `dist/index.html`. | Gera arquivos `dist/{rota}/index.html` para todas as URLs públicas. | Log de confirmação com total de rotas emitidas. | `scripts/emit-route-html.mjs`, `package.json` | - `npm run build` completa gerando os arquivos de rota em `dist/`. |

---

## 7. Matriz de Casos de Borda e Comportamentos Observados

| # | Feature / Contexto | Entrada / Condição de Borda | Comportamento Esperado / Observado | Ação Corretiva / Validação |
|---|---|---|---|---|
| 1 | `src/data/site.ts` (Tipagem) | Declarações de tipo sem separador (ex: `type NavItem = { label: string to: string }`). | `tsc --noEmit` falha com `error TS1005: ';' expected`. | **Correção necessária:** Adicionar `;` ou `,` em todas as definições de tipo em `site.ts` e `seo.tsx`. |
| 2 | `src/lib/seo.tsx` (Tipagem) | Assinatura de `breadcrumb` sem separador (`items: { name: string path: string }[]`). | `tsc --noEmit` falha com `error TS1005: ';' expected`. | **Correção necessária:** Corrigir para `{ name: string; path: string }[]`. |
| 3 | `/diagnostico-visual` | Envio de formulário com todos os campos em branco. | Impede envio; destaca `nome`, `whatsapp` e `email`; rola até o primeiro campo inválido; anuncia erro via `aria-live`. | Validar com teste de formulário vazio. |
| 4 | `/diagnostico-visual` | E-mail com formato inválido (ex: `usuario@invalido`). | Regex rejeita; campo `email` marcado com erro visual e mensagem descritiva. | Validar regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`. |
| 5 | `/diagnostico-visual` | Envio quando a API de e-mail está offline ou sem credenciais. | Exibe banner com erro de transmissão e disponibiliza link direto para WhatsApp com dados preservados. | Validar bloco `catch` e renderização de `submitError`. |
| 6 | Lightbox da Galeria | Pressionar tecla `Escape` ou clicar fora da imagem ampliada. | Fecha o modal instantaneamente e restaura o overflow do `body`. | Validar listener de `Escape` e limpeza de evento. |
| 7 | Lightbox da Galeria | Arrastar imagem verticalmente no mobile/touch (>100px). | Fecha o modal via gesto de arrasto (drag-to-dismiss). | Validar Framer Motion drag constraints. |
| 8 | Header / Navegação | Redimensionamento da janela entre mobile (<1024px) e desktop (>=1024px). | Menu drawer mobile se oculta automaticamente; navegação desktop surge sem quebras. | Testar breakpoints em 360px, 768px, 1024px e 1440px. |
| 9 | Portfólio | Alternar rapidamente entre filtros de categoria. | Animação suave `u-fade-in` sem duplicar elementos nem quebrar layout de grid. | Testar cliques rápidos nas abas de filtro. |
| 10 | Rotas Dinâmicas de Segmento | Acessar slug com variações (ex: `/eventos` ou `/segmentos/ativacoes-eventos`). | Resolver via mapa de aliases `SEGMENT_ALIASES` e carregar o segmento correspondente. | Testar aliases de URL no router. |
| 11 | Rotas Dinâmicas de Segmento | Acessar slug inválido (ex: `/segmentos/inexistente`). | Retorna e renderiza o componente `NotFound` (404) com opções de retorno. | Testar rota com slug inexistente. |
| 12 | Rota de Case Study | Acessar case slug inexistente (ex: `/portfolio/case-falso`). | Renderiza `NotFound` (404) em vez de travar a aplicação. | Testar rota `/portfolio/invalido`. |
| 13 | Acessibilidade / Contraste | Botão ou elemento com classe `bg-teal`. | O texto DEVE usar obrigatoriamente `text-off` ou `#FFFFFF` para atender WCAG AA (mínimo 4.5:1). | Auditar todo o CSS/JSX para proibir `bg-teal text-ink` ou `bg-teal text-navy`. |
| 14 | Mídia / Imagens Locais | Caminho de imagem local que não existe ou falha ao carregar. | Helper `img()` usa fallback local seguro `/images/foto-a-producao-nao-falha.webp`. | Auditar catálogo de imagens em `src/lib/images.ts`. |
| 15 | Movimento Reduzido | Sistema com `prefers-reduced-motion: reduce` ativo. | Desativa animações no `Reveal`, `useParallax`, `BeamsBackground` e transições de página para evitar desconforto. | Validar media queries `@media (prefers-reduced-motion: reduce)`. |

---

## 8. Inventário de Discrepâncias e Gaps Técnicos Detectados

Durante a mineração rigorosa do código-fonte e documentações, foram identificadas as seguintes pendências técnicas que devem ser resolvidas nas etapas subsequentes:

1. **Erros de Sintaxe TypeScript em `src/data/site.ts`:**
   - Linha 23: `export type NavItem = { label: string to: string hash?: boolean }` (falta `;` entre campos).
   - Linha 25: `export const SEGMENT_NAV: { label: string to: string }[] = [` (falta `;` entre campos).
   - Linha 36: `export type Service = { n: string title: string desc: string }` (falta `;` entre campos).
   - Linha 101: `export type Faq = { q: string a: string }` (falta `;` entre campos).
   - Linha 102: `export type SegProcess = { n: string title: string desc: string }` (falta `;` entre campos).

2. **Erro de Sintaxe TypeScript em `src/lib/seo.tsx`:**
   - Linha 107: `export function breadcrumb(items: { name: string path: string }[])` (falta `;` entre campos).

3. **Consistência de Slugs no Sitemap vs Data:**
   - Em `public/sitemap.xml`, a rota `/portfolio/loja-frida-campanha` está listada, enquanto em `src/data/site.ts` o caseSlug está definido como `loja-frida-sao-joao`. Ambos devem estar alinhados ou suportados via alias para evitar links quebrados.

4. **Regras Estritas de Contraste:**
   - Todos os botões e CTAs com fundo `bg-teal` devem ser verificados para garantir que nenhuma ocorrência utilize classes de texto escuro (`text-ink` ou `text-navy`).

---

## 9. Conclusão da Mineração

O inventário acima consolida 100% dos requisitos de interface, acessibilidade, SEO, comportamento interativo e infraestrutura de build da VERSAVISUAL, servindo como especificação canônica para a implementação e criação da suíte de testes automatizados.
