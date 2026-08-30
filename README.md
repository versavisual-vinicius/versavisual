# VERSAVISUAL — Website Institucional & Portfólio de Luxo

Plataforma digital, hub de posicionamento e portfólio autoral da **VERSAVISUAL**, desenvolvida em React 19, Vite 8, TypeScript 5.7 e Tailwind CSS v4. Projetada com estética minimalista de alto contraste, navegação espacial não-linear (**Infinite Canvas 360°**), comparador interativo de tratamento de cor e fotografia (**Before/After Slider**), arquitetura de SEO técnico com **SSG de 33 rotas estáticas** e funil de conversão com **Diagnóstico Visual**.

> *Imagem não é registro. É posicionamento.*

---

## ⚡ Stack Tecnológica

- **Framework & Core**: React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`).
- **Roteamento**: React Router 7 (`react-router-dom`), resolução dinâmica de segmentos canônicos, estudos de caso e aliases de URL.
- **Navegação Espacial & Física**: Infinite Canvas 360° com aceleração por GPU (`translate3d`), inércia física exponencial, zoom contínuo com pinch/scroll e minimap radar HUD interativo.
- **Interatividade & Tratamento Visual**: `BeforeAfterSlider` para inspeção comparativa de tratamento RAW vs. Color Grading (ACEScc / DaVinci Resolve, Dodge & Burn e Separação de Frequências).
- **Mídia & Animação**: Framer Motion 13 lightbox fullscreen em Portal com suporte a drag-to-dismiss, touch gestures, teclado e vídeos em loop com poster fallback.
- **SEO Técnico & SSG**: Pré-renderização SSG de **33 rotas estáticas** pós-build (`scripts/emit-route-html.mjs`), injeção dinâmica de metadados OpenGraph, Twitter Cards, Canonical e dados estruturados Schema.org JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `CreativeWork`, `ImageGallery`).
- **Analytics & Deploy**: Vercel Analytics (`@vercel/analytics/react`), headers de cache imutável para assets estáticos e redirects 308 permanentes para URLs legadas em `vercel.json`.
- **Brand Typography**: Fontes self-hosted em WOFF2 sem dependências externas (`Righteous`, `Outfit`, `DM Sans`).

---

## 🚀 SEO Técnico, Rotas Canônicas e Redirects

A VERSAVISUAL utiliza `https://www.versavisual.com.br` como domínio canônico oficial.

O sitemap público contém exclusivamente **32 URLs canônicas indexáveis**:
- 5 rotas institucionais e funcionais;
- 8 landing pages de segmentos;
- 19 estudos de caso do portfólio.

O build gera também uma página 404 estática, totalizando **33 arquivos HTML emitidos**.

### Estado Validado em Produção
- `https://www.versavisual.com.br/sitemap.xml`: HTTP 200.
- Todas as 32 URLs do sitemap: HTTP 200.
- Rotas inexistentes: HTTP 404 real.
- Canonicals da home e dos cases: apontam para URLs com `www`.
- Imagem usada no schema `ProfessionalService`: asset local válido (`/brand-assets/vv-profilelogo-dark-square.png`).
- Aliases antigos não aparecem mais no sitemap.
- 16 aliases históricos de cases redirecionam por HTTP 308 para os respectivos cases canônicos.
- Aliases de segmentos também utilizam redirects permanentes.

### Domínio Oficial
```text
https://www.versavisual.com.br
```

O domínio apex redireciona para a versão com `www`:
```text
https://versavisual.com.br
→ https://www.versavisual.com.br/
```

No momento da última validação, esse redirect ainda respondia com HTTP 307. A alteração para HTTP 308 permanente permanece como configuração operacional pendente no painel da Vercel.

---

## 🎨 Design System & Identidade Visual

A interface segue estritamente as diretrizes do **Brand System da VERSAVISUAL**:

### Paleta de Cores

| Token | Hex | Aplicação |
|---|---|---|
| `Brand Black (ink)` | `#050A0D` | Fundo principal da aplicação, molduras e containers base |
| `Deep Navy (navy)` | `#253540` | Cards secundários, elevações e modais |
| `Accent Teal (teal)` | `#5E7F8C` | Acentos visuais e botões de ação primária com `text-off` |
| `Teal Light (teal-400)` | `#70909C` | Badges, indicadores de status e subtítulos de destaque |
| `Mist (mist)` | `#A4B8BF` | Textos secundários, legendas e metadados |
| `Off-White (off)` | `#F2F2F2` | Textos de títulos, superfícies claras e texto em botões `bg-teal` |

### Regra de Ouro de Contraste (WCAG AA / AAA)
- **Botões e CTAs com `bg-teal`**: Utilizam OBRIGATORIAMENTE `text-off` para garantir legibilidade e conformidade de contraste.
- **Fundos escuros (`bg-ink`)**: Títulos em `text-off` e textos auxiliares em `text-mist`.

### Tipografia
- **Display & Wordmark**: `Righteous` (identidade, logo e números de impacto)
- **Headlines, UI, Botões e Eyebrows**: `Outfit` (títulos H1/H2/H3, menus e elementos interativos)
- **Corpo, Legendas e Rodapé**: `DM Sans` (parágrafos, fichas técnicas e leitura longa)

---

## 🗺️ Mapa de Rotas do Projeto

O site conta com **33 rotas estáticas** pré-renderizadas via SSG para máxima velocidade e indexação (32 canônicas indexáveis + página 404):

| Rota | Descrição |
|---|---|
| `/` | Home institucional com hero full-bleed, seletor de nichos, serviços, timeline de método, fundador e CTAs |
| `/sobre` | Página institucional com visão autoral, manifesto, biografia do fundador Vini Cunha, timeline e equipamentos Nikon |
| `/portfolio` | Portfólio com alternador de visualização (**Grid Tradicional** ↔ **Canvas 360°**) e filtros por nicho |
| `/portfolio/canvas` | Acesso direto ao **Infinite Canvas 360°** em tela cheia com minimap radar |
| `/portfolio/:caseSlug` | 19 estudos de caso detalhados com galeria de alta resolução, fichas técnicas e vídeos oficiais |
| `/diagnostico-visual` | Formulário interativo de onboarding e briefing guiado com direcionamento para WhatsApp |
| `/:slug` | 8 landing pages dedicadas aos nichos de atuação (veja lista abaixo) |
| `/404` | Página de erro 404 personalizada com atalhos de recuperação inteligentes |

### Landing Pages de Nichos (Segmentos)
1. `/ativacoes-eventos` — Cobertura estratégica para festivais, ativações e marcas corporativas.
2. `/moda-campanhas` — Ensaios editoriais, lookbooks e campanhas de moda autoral.
3. `/artistas-videoclipes` — Direção criativa, capas de lançamentos e videoclipes para artistas musicais.
4. `/posicionamento-profissional` — Retratos executivos de alto impacto e posicionamento de líderes.
5. `/imagem-pessoal-lifestyle` — Ensaios autorais e narrativas visuais para personalidades.
6. `/casamentos` — Cobertura cinematográfica para casamentos e destination weddings.
7. `/gestantes` — Ensaios conceituais e elegantes de maternidade.
8. `/hotelaria-lifestyle` — Fotografia e vídeo para hotéis boutique, resorts e gastronomia premium.

---

## 📁 Estrutura do Projeto

```text
seo-tecnico-rotas/
├── api/
│   └── diagnostico.ts            # Endpoint serverless Vercel para triagem de leads com Resend
├── dist/                         # Bundle de produção e 33 páginas estáticas pré-renderizadas (SSG)
├── public/
│   ├── brand-assets/             # Logos vetoriais e ícones da marca (vv-profilelogo-dark-square.png)
│   ├── fonts/                    # Fontes locais em WOFF2 (Righteous, Outfit, DM Sans)
│   ├── images/                   # Acervo fotográfico de alta resolução catalogado
│   ├── videos/                   # Vídeos em loop nativos (Hero e videoclipes)
│   ├── favicon.svg / favicon.ico # Ícones de navegação
│   ├── robots.txt                # Diretivas de indexação para motores de busca
│   └── sitemap.xml               # Sitemap XML canônico com as 32 rotas indexáveis
├── scripts/
│   ├── emit-route-html.mjs       # Gerador SSG de 33 rotas estáticas pós-build
│   └── verify-built-seo.mjs      # Validador automatizado de integridade SEO dos arquivos dist
├── src/
│   ├── components/
│   │   ├── BeforeAfterSlider.tsx # Comparador interativo de tratamento RAW vs Color Grading
│   │   ├── CTASection.tsx        # Seção de conversão com fundo parallax e CTAs de alto contraste
│   │   ├── FAQAccordion.tsx      # Acordeão de perguntas frequentes acessível (WAI-ARIA)
│   │   ├── Footer.tsx            # Rodapé institucional com links de navegação e redes
│   │   ├── FounderSection.tsx    # Seção sobre o fundador (Vini Cunha), visão e equipamentos
│   │   ├── Gallery.tsx           # Galeria de fotos com Lightbox em portal
│   │   ├── Header.tsx            # Header com blur no scroll e menu drawer mobile acessível
│   │   ├── InfiniteCanvas.tsx    # Canvas 360° interativo com aceleração GPU, inércia e radar HUD
│   │   ├── Logo.tsx              # Wordmark vetorial oficial com tipografia Righteous
│   │   ├── PortfolioGrid.tsx     # Grid de portfólio com filtros por categoria e spotlight
│   │   ├── PrivacyModal.tsx      # Modal acessível com políticas e termos de privacidade
│   │   ├── Reveal.tsx            # Wrapper de animação suave na rolagem com reduced-motion
│   │   ├── ScrollToTop.tsx       # Reset de rolagem e compensador de âncoras em trocas de rota
│   │   ├── ServiceGrid.tsx       # Grid de serviços institucionais com hover effects
│   │   ├── WhatsAppFloat.tsx     # Botão flutuante para conversão direta no WhatsApp
│   │   └── ui/
│   │       ├── shared-element-gallery.tsx # Lightbox fullscreen com Framer Motion
│   │       └── timeline.tsx               # Linha do tempo de processo com scroll progress
│   ├── data/
│   │   ├── beforeAfter.ts        # Dados dos comparativos antes/depois e especificações técnicas
│   │   ├── catalog-seo.json      # Catálogo centralizado de metadados SEO, descrições e FAQs
│   │   ├── seo-routes.json       # Manifesto de rotas para geração SSG
│   │   └── site.ts               # Dicionário de dados da marca: segmentos, cases, serviços e FAQ
│   ├── lib/
│   │   ├── images.ts             # Helper de resolução segura de fotos locais com fallback
│   │   ├── seo.tsx               # Injetor de tags SEO, OpenGraph e Schema.org JSON-LD
│   │   ├── useParallax.ts        # Hook de efeito parallax reativo ao scroll
│   │   └── utils.ts              # Utilitários de classes CSS e formatação
│   ├── pages/
│   │   ├── About.tsx             # Página Sobre Nós com biografia, manifesto e equipamentos
│   │   ├── CaseStudy.tsx         # Página de Estudo de Caso individual com galeria e ficha
│   │   ├── Diagnostico.tsx       # Formulário de diagnóstico visual e gerador de lead WhatsApp
│   │   ├── Home.tsx              # Página inicial institucional completa
│   │   ├── NotFound.tsx          # Página 404 personalizada com atalhos de recuperação
│   │   ├── Portfolio.tsx         # Página de portfólio com alternador Grid / Canvas 360°
│   │   └── SegmentPage.tsx       # Landing page temática dos 8 nichos de atuação
│   ├── App.tsx                   # Roteador raiz da aplicação e lazy loading de páginas
│   ├── index.css                 # Import Tailwind v4, tokens `@theme`, fontes e classes utilitárias
│   └── main.tsx                  # Ponto de entrada da aplicação React 19
├── tests/                        # Suíte de testes automatizados (Tiers 1 a 5 — 256 testes)
├── AGENTS.md                     # Guia de desenvolvimento e regras técnicas para agentes AI
├── DECISIONS.md                  # Registro de decisões de arquitetura e design
├── DESIGN.md                     # Especificação oficial do Design System VersaVisual
├── PROJECT.md                    # Arquitetura detalhada, inventário de features e contratos
├── ROADMAP.md                    # Histórico de entregas e fases futuras
├── TEST_INFRA.md                 # Documentação da infraestrutura de testes automatizados
├── TODO.md                       # Status de tarefas, checklist e pendências operacionais
├── package.json                  # Dependências e scripts de execução
├── tsconfig.json                 # Configuração estrita do compilador TypeScript
├── vercel.json                   # Configuração de headers, redirecionamentos e deploy Vercel
└── vite.config.ts                # Configuração do Vite 8 com Tailwind CSS v4
```

---

## 🛠️ Comandos de Desenvolvimento

### Instalação de Dependências
```bash
npm install
```

### Executar Servidor Local de Desenvolvimento
```bash
npm run dev
```

### Build de Produção & Geração SSG
```bash
npm run build
```
*Executa o `vite build` e em seguida o script `scripts/emit-route-html.mjs`, gerando os 33 arquivos `.html` estáticos em `dist/` com metadados e Schema JSON-LD pré-injetados.*

### Verificação de SEO dos Arquivos Gerados
```bash
node scripts/verify-built-seo.mjs
```

### Suíte de Testes Automatizados
```bash
# Executar todos os testes E2E Tiers 1 a 4 (230 testes)
npx tsx tests/run-all.ts

# Executar testes adversariais de estresse Tier 5 (26 testes)
npx tsx tests/tier5-adversarial-hardening.ts

# Verificação estrita de tipos TypeScript (zero erros esperados)
npx tsc --noEmit
```

---

## 📋 Resumo da Cobertura de Testes

| Tier | Escopo de Teste | Testes | Status |
|---|---|---|---|
| **Tier 1** | Cobertura de Features & Contratos Unitários | 194 | ✅ 100% Pass |
| **Tier 2** | Limites, Casos de Borda, Validações e Fuzzing | 18 | ✅ 100% Pass |
| **Tier 3** | Combinações Cross-Feature e Fluxos de Navegação | 13 | ✅ 100% Pass |
| **Tier 4** | Cenários de Usuário Reais (Jornadas Completas de Conversão) | 5 | ✅ 100% Pass |
| **Tier 5** | Adversarial Hardening (Segurança, Injeção, Integridade SSG) | 26 | ✅ 100% Pass |
| **Total** | **Suíte Completa de Testes Automatizados** | **256** | **✅ 100% Pass (0 falhas)** |

---

## 📞 Atendimento & Contato

- **Diretor Criativo**: Vinicius Cunha (Vini)
- **WhatsApp Oficial**: [+55 (22) 99762-4631](https://wa.me/5522997624631)
- **E-mail**: [hub@versavisual.com.br](mailto:hub@versavisual.com.br)
- **Diagnóstico Visual**: [`/diagnostico-visual`](https://www.versavisual.com.br/diagnostico-visual)

---

© 2026 **VERSAVISUAL**. Todos os direitos reservados.
