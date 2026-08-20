# Project: VersaVisual Website Redesign & Production Consolidation

## Architecture
- **Framework & Core**: React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`).
- **Routing**: React Router 7 (`react-router-dom`), Hash navigation, dynamic segment aliases, case study lookup, custom 404 handler.
- **Styling & Design System**: Tailwind v4 `@theme` with strict brand tokens (`ink: #050A0D`, `navy: #253540`, `teal: #5E7F8C`, `teal-400: #70909c`, `mist: #A4B8BF`, `off: #F2F2F2`), Self-hosted fonts (`Righteous`, `Outfit`, `DM Sans`), WCAG AA contrast compliance (`bg-teal text-off`).
- **Media & Animation**: Full-bleed background video with fallback poster, Framer Motion 13 lightbox & scroll animations, Lucide React icons.
- **Conversion & API**: Diagnostic form with client-side validation, honeypot spam protection, structured WhatsApp lead encoding, Resend serverless endpoint `/api/diagnostico`.
- **SSG / Static Generation**: Post-build route prerenderer `scripts/emit-route-html.mjs` generating static HTML for all sitemap routes in `dist/`.

## Code Layout
- `src/main.tsx` — Application entrypoint, font wiring and global CSS mounting.
- `src/App.tsx` — Root router shell, Layout wrapper, Skip-link and route switch.
- `src/index.css` — Global styles, Tailwind v4 theme variables (`@theme`), typography rules, utility overlays (`.u-grade`).
- `src/data/site.ts` — Central data dictionary: navigation, segments, services, portfolio, case studies, FAQ, metrics.
- `src/lib/` — Helper utilities:
  - `seo.tsx` — Dynamic SEO meta tags, OpenGraph, Canonical and JSON-LD schema injector.
  - `images.ts` — Image path helper with safe local fallback.
  - `motion.ts` — Viewport & animation configurations.
- `src/components/` — Shared UI components:
  - `Header.tsx` — Sticky header with scroll blur, desktop nav, accessible mobile drawer.
  - `Footer.tsx` — 3-column footer with brand, segments and contact links.
  - `WhatsAppFloat.tsx` — Fixed floating WhatsApp direct conversion button.
  - `Logo.tsx` — Vector Righteous wordmark component.
  - `CTASection.tsx` — Conversion banner with parallax background and high-contrast CTAs.
  - `FAQAccordion.tsx` — Accessible question/answer accordion.
  - `PortfolioGrid.tsx` — Filterable portfolio grid with video feature.
  - `ServiceGrid.tsx` — Institutional service grid with hover effects.
  - `Gallery.tsx` / `ui/shared-element-gallery.tsx` — Photo gallery with full-screen portal lightbox.
  - `ui/timeline.tsx` — Execution process timeline with scroll progress.
  - `ScrollToTop.tsx` — Route transition scroll reset and anchor compensator.
  - `Reveal.tsx` — Progressive scroll observer with reduced-motion support.
- `src/pages/` — Core route pages:
  - `Home.tsx` — Institutional home with full-bleed hero video, segments, services, timeline and CTAs.
  - `Portfolio.tsx` — Filterable portfolio showcase with videoclip spotlight.
  - `CaseStudy.tsx` — Dedicated case study page with photo gallery and production metadata.
  - `SegmentPage.tsx` — Niche landing page for each of the 8 segments with problem/solution, services, modal, FAQ.
  - `Diagnostico.tsx` — Split-screen diagnostic form with validation and WhatsApp briefing builder.
  - `NotFound.tsx` — Immersive 404 recovery page with segment shortcuts.
- `api/diagnostico.ts` — Serverless function for email notification via Resend.
- `scripts/emit-route-html.mjs` — Static HTML route generator for production deployment.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Header Responsivo & Scroll Blur | Header fixo com logo, links de navegação, blur dinâmico no scroll (>12px) e CTA | M1 | survey |
| 2 | Menu Mobile Drawer Acessível | Gaveta mobile com animação, aria-expanded, bloqueio de scroll no body e tecla Escape | M1 | survey |
| 3 | Skip Link para Conteúdo | Link de acessibilidade no topo visível por teclado via Tab | M1 | survey |
| 4 | Scroll To Top & Anchor Offset | Redefinição de rolagem no topo em trocas de rota e offset de 76px para âncoras | M1 | survey |
| 5 | Botão Flutuante WhatsApp | Botão fixo no canto inferior direito com link direto seguro para WhatsApp | M1 | survey |
| 6 | Tokens & Tema Tailwind v4 | Variáveis de tema (@theme) com teal (#5E7F8C), ink, navy, mist e off alinhados ao DESIGN.md | M1 | survey |
| 7 | Tipografia Self-Hosted | Fontes Righteous, Outfit e DM Sans com preload e renderização sem fontes externas | M1 | survey |
| 8 | Tipagem TypeScript Estrita | Eliminação de 9 erros TS1005 em site.ts e seo.tsx, zero erros em tsc --noEmit | M2 | survey |
| 9 | Sincronização de Slugs & Sitemap | Alinhamento de caseSlugs e rotas entre site.ts e sitemap.xml | M2 | survey |
| 10 | Roteamento Dinâmico de Segmentos | Suporte aos 8 segmentos e aliases legados com resolução instantânea | M2 | survey |
| 11 | Roteamento de Cases de Portfólio | Suporte a rotas /portfolio/:caseSlug com fallback para 404 em slugs inválidos | M2 | survey |
| 12 | Roteamento e Página 404 | Página 404 personalizada para rotas inexistentes com atalhos para todos os segmentos | M2 | survey |
| 13 | Hero Vídeo Full-Bleed | Hero em vídeo loop com autoplay, muted, playsInline, poster de fallback e overlay | M3 | survey |
| 14 | Grid de Serviços & TiltCard | Grid de 6 serviços institucionais com linha de acento animada no hover | M3 | survey |
| 15 | Seletor de Segmentos Home | Cards dos 8 segmentos com aspect-[16/11] no mobile e aspect-[3/4] em desktop | M3 | survey |
| 16 | Timeline do Método de Execução | Timeline interativa com barra de progresso vertical reativa ao scroll | M3 | survey |
| 17 | Filtros de Portfólio por Aba | Sistema de abas com role="tablist" e aria-selected para filtragem instantânea | M3 | survey |
| 18 | Vídeo Destaque Artistas | Banner de vídeo exibido dinamicamente na aba de Artistas & Videoclipes | M3 | survey |
| 19 | Landing Pages de 8 Segmentos | Páginas temáticas completas com comparativo, serviços, modal, cases e FAQ | M3 | survey |
| 20 | Modal de Detalhes do Serviço | Modal interativo com aria-modal, foco acessível e touch targets de 44px+ | M3 | survey |
| 21 | Galeria com Lightbox Fullscreen | Lightbox em portal com Framer Motion, drag-to-dismiss e tecla Escape | M3 | survey |
| 22 | Acordeão de FAQ Temático | Acordeão acessível com perguntas e respostas sanfonadas | M3 | survey |
| 23 | Estudo de Caso Individual | Página detalhada com galeria, ficha técnica e cases relacionados | M3 | survey |
| 24 | Formulário de Diagnóstico | Validação client-side em tempo real, honeypot anti-spam e aria-live de status | M3 | survey |
| 25 | Gerador de Lead WhatsApp | Geração de URL formatada com dados completos do briefing para atendimento | M3 | survey |
| 26 | Transmissão de Lead API | Endpoint serverless /api/diagnostico com validação e envio via Resend | M3 | survey |
| 27 | Injeção de SEO & JSON-LD | Hook useSeo atualizando metadados, canonical e schemas Schema.org | M4 | survey |
| 28 | Auditoria Estrita de Contraste | Aplicação da regra WCAG AA com bg-teal text-off em todos os botões e CTAs | M4 | survey |
| 29 | Auditoria de Responsividade 360px-4k | Zero overflow horizontal em todas as páginas, touch targets >= 44px | M4 | survey |
| 30 | Build de Produção & Emissão SSG | Build npm run build gerando dist/ e emitindo todas as 27 rotas estáticas | M4 | survey |
| 31 | Suíte de Testes E2E (Tiers 1-4) | 100% de aprovação nos testes funcionais, de borda, combinatórios e cenários reais | M5 | survey |
| 32 | Hardening Adversarial (Tier 5) | Testes adversariais de estresse e cobertura completa de código | M5 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Design System, Tokens, Typography & Global Shell | Tokens Tailwind v4 (#5E7F8C), fontes locais, Header acessível com touch targets 44px, Footer, WhatsAppFloat, SkipLink, CTAs principais bg-teal text-off | none | DONE |
| M2 | TypeScript Syntax, Site Data & Dynamic Routing Engine | Eliminação de erros TS1005 em site.ts e seo.tsx, npx tsc --noEmit limpo, alinhamento de slugs e sitemap.xml, rotas dinâmicas de segmentos e cases com 404 | M1 | PLANNED |
| M3 | Interactive Pages, Components & Conversion Flow | Hero video poster/playsInline, PortfolioGrid com abas e vídeo, SegmentPage com modal acessível, Lightbox drag-to-dismiss, Timeline scroll, FAQ accordion, Diagnostico com validação/honeypot/WhatsApp lead | M2 | PLANNED |
| M4 | Performance, Contrast, Accessibility & SSG Build Verification | Auditoria rigorosa de contraste (bg-teal text-off), responsividade 360px-4k, touch targets 44px+, npm run build gerando 27 rotas estáticas em dist/ | M3 | PLANNED |
| M5 | 100% E2E Test Suite Pass & Adversarial Hardening | Execução e aprovação de 100% dos testes E2E Tiers 1-4 + Hardening de cobertura Tier 5 com Challenger | M4, E2E | PLANNED |
| E2E | E2E Testing Track: Infra & Test Suite (Tiers 1-4) | Criação da infraestrutura de testes opaque-box, runner automatizado, casos de teste Tiers 1-4 cobrindo todas as 32 features, publicação de TEST_READY.md | none | IN_PROGRESS |

## Interface Contracts
### Route Resolution Contract (`App.tsx` ↔ `src/data/site.ts`)
- `SEGMENTS`: Array<{ slug: string; name: string; title: string; subtitle: string; ... }>
- `SEGMENT_ALIASES`: Record<string, string> mapeando aliases de URL para o slug canônico.
- `PORTFOLIO`: Array<{ id: string; title: string; category: string; segment: string; caseSlug?: string; ... }>
- Rotas inválidas em `/:slug` ou `/portfolio/:caseSlug` devem retornar `NotFound` sem travar a renderização.

### Diagnostic Form & API Contract (`Diagnostico.tsx` ↔ `/api/diagnostico.ts`)
- Payload JSON: `{ nome: string, whatsapp: string, email: string, empresa?: string, cidade?: string, segmento?: string, tipo?: string, data?: string, uso?: string, objetivo?: string, investimento?: string, mensagem?: string, _gotcha?: string }`
- Honeypot `_gotcha`: Se presente e não-vazio, resposta imediata `200 { ok: true }` sem disparo de e-mail.
- Validação: Erro 400 se `nome`, `whatsapp` ou `email` estiverem ausentes ou e-mail inválido.
- Sucesso: Redirecionamento formatado para WhatsApp `https://wa.me/5511950747192?text=...`.
