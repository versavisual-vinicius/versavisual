# DECISIONS.md — Registro de Decisões de Arquitetura (ADR)

Este documento registra as decisões arquiteturais fundamentais tomadas durante o desenvolvimento do **VERSAVISUAL Website**, suas motivações e impactos no projeto.

---

## ADR 01: Pré-Renderização SSG com Script ESM Próprio vs. Framework SSR Pesado

- **Status**: Aprovado e Implementado
- **Contexto**: O projeto necessita de carregamento instantâneo, excelente indexação de SEO com meta tags ricas e dados estruturados Schema.org JSON-LD para 47 rotas, mantendo custos operacionais nulos de hospedagem estática.
- **Decisão**: Utilizar um script de pós-build leve em Node.js ESM (`scripts/emit-route-html.mjs`) que lê o catálogo SEO (`catalog-seo.json`) e emite 47 arquivos `.html` estáticos em `dist/`, em vez de migrar toda a base de código para frameworks com SSR de servidor ativo (como Next.js server runtime).
- **Consequências**: 
  - Deploy 100% estático na Vercel com TTFB ultrarrápido servido via CDN edge global.
  - Indexação garantida para rastreadores do Google, Bing e redes sociais sem depender de execução de JavaScript.
  - Zero custo de servidor e zero complexidade de infraestrutura.

---

## ADR 02: Tailwind CSS v4 com `@theme` e Fontes Self-Hosted WOFF2

- **Status**: Aprovado e Implementado
- **Contexto**: A identidade visual de luxo da VersaVisual exige controle tipográfico milimétrico e consistência de cores sem dependência de CDNs externos (Google Fonts) que possam causar bloqueio de renderização ou problemas de privacidade.
- **Decisão**: Adotar Tailwind CSS v4 nativo com plugin `@tailwindcss/vite`, configurando todos os tokens de cor diretamente no `@theme` em `src/index.css` e hospedando os arquivos de fonte WOFF2 (`Righteous`, `Outfit`, `DM Sans`) localmente em `public/fonts/`.
- **Consequências**: 
  - Zero requisições externas para carregar tipografia.
  - Maior velocidade de build e processamento de CSS otimizado.
  - Paleta restrita a 6 tokens semânticos (`ink`, `navy`, `teal`, `teal-400`, `mist`, `off`), eliminando cores arbitrárias no código.

---

## ADR 03: Infinite Canvas 360° com Aceleração por GPU Nativa

- **Status**: Aprovado e Implementado
- **Contexto**: Necessidade de proporcionar uma experiência inovadora e autoral de portfólio visual 360°, sem comprometer a performance em dispositivos móveis ou exigir bibliotecas 3D pesadas (como Three.js ou Babylon.js).
- **Decisão**: Implementar o `InfiniteCanvas.tsx` utilizando transformações 2D aceleradas por GPU (`transform: translate3d(...)`), cálculos vetoriais em `requestAnimationFrame`, desaceleração física exponencial (inércia) e minimap radar HUD interativo em SVG.
- **Consequências**: 
  - Carregamento instantâneo do bundle (sem centenas de kilobytes de engines 3D).
  - Taxa de quadros constante de 60fps / 120fps em navegadores móveis e desktop.
  - Interação fluida com suporte nativo a mouse drag, trackpad pan, pinch-to-zoom e touch mobile.

---

## ADR 04: Centralização de Dados e Catálogo de SEO Desacoplado

- **Status**: Aprovado e Implementado
- **Contexto**: Evitar dispersão de metadados, títulos, descrições e schemas JSON-LD espalhados por dezenas de componentes.
- **Decisão**: Isolar dados de negócio em `src/data/site.ts`, comparativos em `src/data/beforeAfter.ts` e toda a infraestrutura de metadados e Schema.org em `src/data/catalog-seo.json`.
- **Consequências**: 
  - Modificações de conteúdo e SEO são centralizadas em arquivos de fácil manutenção.
  - Reutilização automática tanto no hook de runtime `useSeo` (React) quanto no gerador pós-build `emit-route-html.mjs` (SSG).

---

## ADR 05: Suíte de Testes com Opaque-Box Runner e Hardening Adversarial

- **Status**: Aprovado e Implementado
- **Contexto**: Garantir a estabilidade de todas as 36 features do sistema contra regressões sem depender de ambientes pesados de browser headless em desenvolvimento local.
- **Decisão**: Criar um test runner em TypeScript (`tsx`) estruturado em 5 Tiers de rigor crescente (Features, Limites, Combinações, Jornadas Reais e Adversarial Hardening).
- **Consequências**: 
  - Execução instantânea dos 256 testes em menos de 0.2 segundos.
  - Verificação rigorosa de integridade de arquivos locais, contratos de rotas, injeção XSS/SQL e conformidade dos arquivos do build de produção.
