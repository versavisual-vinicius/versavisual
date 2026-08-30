# Project: VersaVisual Website Redesign & Production Consolidation

## 1. Visão Geral & Arquitetura

O projeto **VERSAVISUAL Website** é uma aplicação web autoral de alta performance e apelo estético desenvolvida para a marca e estúdio de fotografia, vídeo e direção criativa **VERSAVISUAL**, liderado pelo fotógrafo e diretor criativo **Vinicius Cunha (Vini)**.

### Stack Tecnológica & Decisões de Arquitetura:
- **Framework & Core**: React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`).
- **Roteamento & Resolução de URLs**: React Router 7 (`react-router-dom`), suporte a rotas estáticas e dinâmicas, canonicalização de aliases legados e fallback para página 404 sem quebra de estado.
- **Navegação Espacial (Infinite Canvas 360°)**: Experiência interativa de tela cheia sem libs 3D pesadas, calculada via matemática vetorial, aceleração por GPU (`transform: translate3d(...)`), inércia com desaceleração exponencial, zoom dinâmico (mouse wheel / pinch gesture) e minimap radar HUD interativo.
- **Tratamento de Imagem & Color Science (BeforeAfterSlider)**: Comparador de tratamento fotográfico e color grading com especificações reais (ex: ACEScc / DaVinci Resolve, Dodge & Burn manual, Separação de Frequências e emulação Kodak 2383).
- **Design System & Tokens**: Tailwind v4 `@theme` com tokens de cores calibrados (`ink: #050A0D`, `navy: #253540`, `teal: #5E7F8C`, `teal-400: #70909C`, `mist: #A4B8BF`, `off: #F2F2F2`), tipografia self-hosted WOFF2 (`Righteous`, `Outfit`, `DM Sans`) e garantia de contraste estrito WCAG AA (`bg-teal text-off`).
- **SEO Técnico & SSG (Static Site Generation)**: Pós-processador ESM `scripts/emit-route-html.mjs` que lê o catálogo SEO (`src/data/catalog-seo.json`, `src/data/seo-routes.json` e `public/sitemap.xml`), pré-renderizando **47 arquivos HTML estáticos** em `dist/` com metadados `<title>`, `<meta name="description">`, OpenGraph, Twitter Cards, Canonical URLs e dados estruturados Schema.org JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `CreativeWork`, `ImageGallery`).
- **Conversão & Triagem de Leads**: Formulário `/diagnostico-visual` com validação de campos client-side, proteção anti-spam via honeypot invisível, gerador de link formatado para WhatsApp direto e endpoint serverless `/api/diagnostico` integrado ao Resend.
- **Testes & Qualidade**: Suíte com 256 testes automatizados (Tiers 1 a 5), cobrindo contratos unitários, limites de segurança, combinações cross-feature, jornadas reais e hardening adversarial.

---

## 2. Estrutura de Código (Code Layout)

- `src/main.tsx` — Ponto de entrada da aplicação, carregamento de fontes locais e CSS global.
- `src/App.tsx` — Shell raiz da aplicação com layout global, `ScrollToTop`, `SkipLink`, roteador com lazy loading e Vercel Analytics.
- `src/index.css` — Estilos globais, importação do Tailwind v4 (`@import "tailwindcss";`), tokens `@theme`, regras tipográficas e utilitários (`.u-grade`, custom scrollbars).
- `src/data/` — Dicionários de dados e metadados centralizados:
  - `site.ts` — Dicionário principal: navegação, 8 segmentos, 19 cases de portfólio, serviços, dados do fundador, depoimentos e FAQ.
  - `beforeAfter.ts` — Dados dos ensaios com comparativo antes/depois, especificações de color grading e tratamentos.
  - `catalog-seo.json` — Base central de metadados, títulos, descrições, imagens de compartilhamento e FAQs por rota.
  - `seo-routes.json` — Manifesto ordenado das 47 rotas estáticas indexáveis.
- `src/lib/` — Módulos utilitários:
  - `images.ts` — Resolução segura de URLs de fotos com fallback local (`/images/foto-a-producao-nao-falha.webp`) e segregação de ensaios.
  - `seo.tsx` — Hook `useSeo` para injeção dinâmica de metadados no `<head>` e geração de schemas JSON-LD.
  - `useParallax.ts` — Hook de efeito de profundidade reativo ao scroll.
  - `utils.ts` — Utilitários para concatenação de classes e helpers.
- `src/components/` — Componentes reutilizáveis de interface:
  - `Header.tsx` — Cabeçalho fixo com detecção de scroll (>12px) para efeito glassmorphism e menu mobile drawer acessível.
  - `Footer.tsx` — Rodapé com mapa de segmentos, links de contato, dados da marca e botão de políticas de privacidade.
  - `FounderSection.tsx` — Seção institucional com foto, biografia, visão do diretor criativo Vini Cunha e equipamentos Nikon.
  - `BeforeAfterSlider.tsx` — Slider interativo antes/depois com suporte a drag, touch, zoom e alternância de modos.
  - `InfiniteCanvas.tsx` — Canvas espacial 360° com arrasto acelerado por GPU, inércia, zoom e minimap radar HUD.
  - `PortfolioGrid.tsx` — Grid de portfólio com filtros por nicho, spotlight para vídeos e links para estudos de caso.
  - `ServiceGrid.tsx` — Grid de serviços institucionais com cards interativos e linhas de acento no hover.
  - `Gallery.tsx` / `ui/shared-element-gallery.tsx` — Galeria de imagens de alta resolução com Lightbox fullscreen em portal (Framer Motion).
  - `CTASection.tsx` — Banner de conversão de alto impacto com fotografia de fundo e botões de alta legibilidade.
  - `FAQAccordion.tsx` — Acordeão acessível de perguntas frequentes com animação de altura.
  - `PrivacyModal.tsx` — Modal de termos de serviço e privacidade com foco gerenciado e tecla Escape.
  - `WhatsAppFloat.tsx` — Botão flutuante direto de WhatsApp no canto inferior direito.
  - `Logo.tsx` — Wordmark vetorial oficial com tipografia Righteous.
  - `ScrollToTop.tsx` — Gerenciador de scroll em trocas de rotas e compensador de âncoras.
  - `Reveal.tsx` — Observador de interseção para animações de entrada suaves com suporte a `prefers-reduced-motion`.
- `src/pages/` — Páginas da aplicação:
  - `Home.tsx` — Página inicial institucional completa com hero em vídeo full-bleed, nichos, serviços, timeline, fundador e CTAs.
  - `About.tsx` — Página Sobre Nós dedicada com visão, manifesto, perfil de Vini Cunha, linha do tempo e câmeras Nikon.
  - `Portfolio.tsx` — Página de portfólio com alternador de modo (Grid Tradicional vs. Canvas 360°).
  - `CaseStudy.tsx` — Estudo de caso autoral detalhado com galeria técnica, ficha de produção, embeds de vídeo oficial e cases relacionados.
  - `SegmentPage.tsx` — Landing pages completas para os 8 nichos de atuação com comparativo de mercado, serviços detalhados, modal, galeria e FAQ.
  - `Diagnostico.tsx` — Formulário de briefing e onboarding guiado com validação em tempo real e redirecionamento para WhatsApp.
  - `NotFound.tsx` — Página 404 personalizada e estilizada com links rápidos de recuperação.
- `api/diagnostico.ts` — Endpoint serverless Vercel para envio seguro de e-mails de lead via Resend.
- `scripts/` — Ferramentas de automação e validação:
  - `emit-route-html.mjs` — Gerador SSG pós-build que injeta `<head>` estático e schemas em todos os 47 arquivos HTML.
  - `verify-built-seo.mjs` — Validador de integridade das 47 rotas emitidas em `dist/`.
- `tests/` — Infraestrutura de testes automatizados com suítes Tiers 1 a 5.

---

## 3. Inventário de Features

| # | Feature | Descrição Técnica | Status |
|---|---------|-------------------|--------|
| 1 | Header Responsivo & Scroll Blur | Header fixo com logo, links de navegação, blur dinâmico (>12px) e CTA `bg-teal text-off` | ✅ Concluído |
| 2 | Menu Mobile Drawer Acessível | Gaveta mobile com animação, aria-expanded, bloqueio de scroll no body e suporte a tecla Escape | ✅ Concluído |
| 3 | Skip Link de Acessibilidade | Atalho no topo visível por teclado via Tab (`href="#main"`) | ✅ Concluído |
| 4 | Scroll To Top & Anchor Offset | Reset de rolagem no topo em trocas de rota e compensação de altura do header em âncoras | ✅ Concluído |
| 5 | Botão Flutuante WhatsApp | Botão fixo no canto inferior direito com link direto seguro e aria-label | ✅ Concluído |
| 6 | Tokens & Tema Tailwind v4 | Variáveis de tema `@theme` (`ink`, `navy`, `teal`, `mist`, `off`) alinhadas ao DESIGN.md | ✅ Concluído |
| 7 | Tipografia Self-Hosted WOFF2 | Fontes `Righteous`, `Outfit` e `DM Sans` renderizadas localmente sem fontes externas | ✅ Concluído |
| 8 | Tipagem TypeScript Estrita | Compilação com `npx tsc --noEmit` sem qualquer erro de tipagem | ✅ Concluído |
| 9 | Sincronização de Slugs & Sitemap | Alinhamento de rotas, slugs de cases e sitemap.xml canônico | ✅ Concluído |
| 10 | Roteamento Dinâmico de 8 Segmentos | Suporte aos 8 nichos oficiais e aliases legados com resolução instantânea | ✅ Concluído |
| 11 | Roteamento de 19 Cases de Portfólio | Suporte a rotas `/portfolio/:caseSlug` com galeria e ficha de produção | ✅ Concluído |
| 12 | Página 404 Personalizada | Tratamento de rotas inexistentes com atalhos para todos os segmentos e HTTP 404 SSG | ✅ Concluído |
| 13 | Hero Vídeo Full-Bleed | Hero em vídeo loop com autoplay, muted, playsInline, poster fallback e overlay escuro | ✅ Concluído |
| 14 | Grid de Serviços Institucionais | Grid de 6 serviços com hover effects e linha de acento animada | ✅ Concluído |
| 15 | Seletor de Segmentos Home | Cards dos 8 segmentos com aspect-[16/11] no mobile e aspect-[3/4] em desktop | ✅ Concluído |
| 16 | Timeline do Método de Execução | Linha do tempo interativa com barra de progresso vertical reativa ao scroll | ✅ Concluído |
| 17 | Filtros de Portfólio por Aba | Sistema de abas com `role="tablist"` e `aria-selected` para filtragem instantânea | ✅ Concluído |
| 18 | Vídeo Destaque Artistas | Banner de vídeo integrado dinamicamente na aba de Artistas & Videoclipes | ✅ Concluído |
| 19 | Landing Pages dos 8 Nichos | Páginas temáticas completas com comparativo, serviços, modal, cases e FAQ | ✅ Concluído |
| 20 | Modal de Detalhes do Serviço | Modal interativo com foco acessível e touch targets de 44px+ | ✅ Concluído |
| 21 | Galeria com Lightbox Fullscreen | Lightbox em portal com Framer Motion, drag-to-dismiss e tecla Escape | ✅ Concluído |
| 22 | Acordeão de FAQ Acessível | Acordeão com expansão suave de perguntas e respostas | ✅ Concluído |
| 23 | Estudo de Caso Individual | Página detalhada com galeria, ficha técnica e cases relacionados | ✅ Concluído |
| 24 | Formulário de Diagnóstico Visual | Validação client-side em tempo real, honeypot anti-spam e aria-live de status | ✅ Concluído |
| 25 | Gerador de Lead WhatsApp | Geração de URL formatada com dados completos do briefing para atendimento | ✅ Concluído |
| 26 | Transmissão de Lead API Serverless | Endpoint `/api/diagnostico` com validação e envio via Resend | ✅ Concluído |
| 27 | Injeção Dinâmica de SEO & JSON-LD | Hook `useSeo` atualizando metadados, canonical e schemas Schema.org | ✅ Concluído |
| 28 | Auditoria Estrita de Contraste | Conformidade WCAG AA com `bg-teal text-off` em todos os botões e CTAs | ✅ Concluído |
| 29 | Responsividade 360px a 4K | Zero overflow horizontal em todas as páginas, touch targets >= 44px | ✅ Concluído |
| 30 | Build SSG de 47 Rotas Estáticas | `npm run build` gerando `dist/` e emitindo 47 rotas estáticas completas | ✅ Concluído |
| 31 | Infinite Canvas 360° | Navegação espacial 360° em tela cheia com aceleração GPU, inércia e minimap radar HUD | ✅ Concluído |
| 32 | Before/After Slider Interativo | Comparador de tratamento de imagem RAW vs Color Grading com especificações técnicas | ✅ Concluído |
| 33 | Página Sobre Nós (`/sobre`) | Página com visão autoral, manifesto, biografia de Vini Cunha e equipamentos Nikon | ✅ Concluído |
| 34 | Seção Founder (Vini Cunha) | Destaque do fundador, direção criativa, posicionamento e credenciais | ✅ Concluído |
| 35 | Modal de Privacidade & Termos | Componente de transparência com políticas de uso acessíveis | ✅ Concluído |
| 36 | Suíte de Testes E2E (Tiers 1-5) | 256 testes automatizados cobrindo todas as features e cenários com 100% de aprovação | ✅ Concluído |

---

## 4. Contratos de Dados & Interfaces

### Contrato de Rotas e Segmentos (`src/data/site.ts`)
- `SEGMENTS`: Lista dos 8 nichos canônicos (`ativacoes-eventos`, `moda-campanhas`, `artistas-videoclipes`, `posicionamento-profissional`, `imagem-pessoal-lifestyle`, `casamentos`, `gestantes`, `hotelaria-lifestyle`).
- `SEGMENT_ALIASES`: Dicionário que mapeia aliases legados (ex: `/eventos`, `/moda`, `/posicionamento`) para os slugs canônicos.
- `PORTFOLIO`: Coleção de 19 itens de portfólio catalogados com fotos locais em `public/images/`, categorias, slugs de cases e metadados.
- `getSegment(slug)` e `getCase(caseSlug)`: Funções utilitárias seguras com tolerância a formatações e fallback limpo para `undefined` (acionando `NotFound`).

### Contrato de Diagnóstico e API (`src/pages/Diagnostico.tsx` ↔ `api/diagnostico.ts`)
- **Payload**:
  ```json
  {
    "nome": "string",
    "whatsapp": "string",
    "email": "string",
    "empresa": "string (opcional)",
    "cidade": "string (opcional)",
    "segmento": "string (opcional)",
    "tipo": "string (opcional)",
    "data": "string (opcional)",
    "uso": "string (opcional)",
    "objetivo": "string (opcional)",
    "investimento": "string (opcional)",
    "mensagem": "string (opcional)",
    "_gotcha": "string (honeypot invisível)"
  }
  ```
- **Honeypot `_gotcha`**: Se preenchido por robôs, a API responde `200 OK` silenciosamente sem disparar e-mail.
- **Validação**: Rejeita requisições com campos obrigatórios ausentes (`nome`, `whatsapp`, `email`) ou e-mail inválido com status `400 Bad Request`. Limita payloads a 40KB (`413 Payload Too Large`).
- **Sucesso no Cliente**: Exibe tela de confirmação e constrói link formatado para conversa no WhatsApp oficial `https://wa.me/5522997624631?text=...`.

### Contrato de Metadados e SEO (`src/data/catalog-seo.json` / `scripts/emit-route-html.mjs`)
- Cada rota mapeada possui: `title`, `description`, `canonicalPath`, `ogImage`, `robots` e schemas JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `CreativeWork`, `ImageGallery`).
- Scripts validam a existência física de todas as imagens sociais em `public/` e conformidade canônica com `public/sitemap.xml`.
