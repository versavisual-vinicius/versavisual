# VERSAVISUAL — Website Institucional & Portfólio de Luxo

Plataforma digital e portfólio autoral da **VERSAVISUAL**, estruturada em React 19, Vite 8, TypeScript e Tailwind CSS v4, com foco em estética minimalista de alto contraste, navegação espacial não-linear (**Infinite Canvas 360°**) e funil de conversão com **Diagnóstico Visual**.

> *Imagem não é registro. É posicionamento.*

---

## ⚡ Stack Tecnológica

- **Framework & Core**: React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`).
- **Roteamento**: React Router 7 (`react-router-dom`), resolução dinâmica de segmentos e estudos de caso.
- **Interação & Física**: Infinite Canvas 360° com aceleração por GPU (`translate3d`), inércia física exponencial, zoom contínuo e minimap radar HUD.
- **Mídia & Animação**: Vídeos em loop nativos com poster fallback, Framer Motion 13 lightbox fullscreen em Portal com drag-to-dismiss.
- **Analytics & Deploy**: Vercel Analytics (`@vercel/analytics/react`), pré-renderização SSG de 42 rotas estáticas (`scripts/emit-route-html.mjs`).
- **Brand Typography**: Fontes self-hosted em WOFF2 sem dependências externas (`Righteous`, `Outfit`, `DM Sans`).

---

## 🎨 Design System & Identidade Visual

A interface segue estritamente as diretrizes do **Brand System v3 da VERSAVISUAL**:

### Paleta de Cores
- `Brand Black (ink)`: `#050A0D` (fundo principal e molduras)
- `Deep Navy (navy)`: `#253540` (cards, elevações e modais)
- `Accent Teal (teal)`: `#5E7F8C` (acento e botões primários com `text-off`)
- `Teal Light (teal-400)`: `#70909C` (badges e subtítulos de destaque)
- `Mist (mist)`: `#A4B8BF` (textos secundários e metadados)
- `Off-White (off)`: `#F2F2F2` (textos de títulos e superfícies claras)

### Tipografia
- **Display & Wordmark**: `Righteous` (identidade e logotipo)
- **Headlines, UI, Botões e Eyebrows**: `Outfit` (títulos e elementos interativos)
- **Corpo, Legendas e Rodapé**: `DM Sans` (parágrafos e leitura)

---

## 🗺️ Mapa de Rotas

| Rota | Descrição |
|---|---|
| `/` | Home institucional com hero full-bleed, nichos, serviços, timeline e CTAs |
| `/portfolio` | Portfólio com alternador de visualização (**Grid Tradicional** ↔ **Canvas 360°**) |
| `/portfolio/canvas` | Acesso direto ao **Infinite Canvas 360°** em tela cheia |
| `/portfolio/:caseSlug` | Estudo de caso autoral detalhado com galeria técnica e fichas |
| `/diagnostico-visual` | Formulário interativo de onboarding e briefing guiado para WhatsApp |
| `/:slug` ou `/segmentos/:slug` | Landing pages dedicadas para os 8 nichos de atuação |
| `/404` | Página de erro 404 personalizada com atalhos de recuperação |

---

## 📁 Estrutura do Projeto

```text
home-mobile-ajustes/
├── api/
│   └── diagnostico.ts         # Endpoint serverless para triagem de leads
├── dist/                      # Bundle de produção e páginas estáticas (SSG)
├── public/
│   ├── brand-assets/          # Logos e ícones exportados
│   ├── images/                # Fotografias de alta resolução catalogadas
│   ├── logos/                 # Wordmarks vetoriais
│   ├── fonts/                 # Righteous, Outfit e DM Sans em WOFF2
│   ├── videos/                # Mídias em vídeo (Hero e videoclipes)
│   ├── robots.txt             # Diretivas de indexação
│   └── sitemap.xml            # Sitemap canônico com todas as rotas
├── scripts/
│   └── emit-route-html.mjs    # Gerador SSG de rotas estáticas pós-build
├── src/
│   ├── components/
│   │   ├── InfiniteCanvas.tsx # Canvas 360° interativo com física e minimap
│   │   ├── PortfolioGrid.tsx  # Grid de portfólio com filtros e spotlight
│   │   ├── Header.tsx         # Header com blur no scroll e menu mobile acessível
│   │   ├── Footer.tsx         # Rodapé com links e contatos
│   │   ├── Gallery.tsx        # Galeria com Lightbox em portal
│   │   ├── WhatsAppFloat.tsx  # Botão flutuante direto de WhatsApp
│   │   └── ...
│   ├── data/
│   │   └── site.ts            # Dicionário único de segmentos, cases e dados
│   ├── lib/
│   │   ├── images.ts          # Helper e fallback seguro de imagens
│   │   ├── seo.tsx            # Injeção dinâmica de SEO, OpenGraph e JSON-LD
│   │   └── utils.ts           # Utilitários globais
│   ├── pages/                 # Home, Portfolio, SegmentPage, CaseStudy, Diagnostico, NotFound
│   ├── App.tsx                # Roteador principal e shell da aplicação
│   ├── index.css              # Tokens do Tailwind v4 (@theme) e utilitários
│   └── main.tsx               # Ponto de entrada da aplicação
├── tests/                     # Suíte de testes automatizados (Tiers 1 a 5)
├── AGENTS.md                  # Diretrizes locais de código e desenvolvimento
├── DESIGN.md                  # Especificação oficial do Design System
├── PROJECT.md                 # Arquitetura detalhada e inventário de features
├── package.json               # Dependências e scripts de execução
├── pnpm-lock.yaml             # Lockfile de dependências
├── tsconfig.json              # Configuração estrita do TypeScript
├── vercel.json                # Configuração de deploy da Vercel
└── vite.config.ts             # Configuração otimizada do Vite 8 + Tailwind v4
```

---

## 🛠️ Comandos de Desenvolvimento

### Instalação
```bash
pnpm install
# ou
npm install
```

### Executar em Desenvolvimento
```bash
pnpm run dev
# ou
npm run dev
```

### Build de Produção & Geração SSG
```bash
pnpm run build
# ou
npm run build
```

### Suíte de Testes Automatizados
```bash
# Executar todos os testes E2E (Tiers 1 a 4 — 209 testes)
npx tsx tests/run-all.ts

# Executar testes adversariais de estresse (Tier 5 — 26 testes)
npx tsx tests/tier5-adversarial-hardening.ts

# Checagem estrita de tipos TypeScript
npx tsc --noEmit
```

---

## 📋 Checklist de Publicação em Produção

- [ ] `npx tsc --noEmit` executa com **0 erros de tipagem**.
- [ ] `pnpm run build` conclui gerando todas as rotas estáticas em `dist/`.
- [ ] Testes E2E `npx tsx tests/run-all.ts` aprovados com 100% de sucesso.
- [ ] Contraste WCAG AA verificado em botões (`bg-teal text-off`).
- [ ] Navegação mobile responsiva (360px a 4K) sem overflow horizontal.
- [ ] Infinite Canvas 360° fluido com arraste, zoom e Lightbox responsivo.
- [ ] Formulário `/diagnostico-visual` validado com honeypot anti-spam.

---

## 📞 Atendimento & Contato

- **WhatsApp**: [+55 (22) 99762-4631](https://wa.me/5522997624631)
- **E-mail**: [hub@versavisual.com.br](mailto:hub@versavisual.com.br)
- **Diagnóstico Visual**: [`/diagnostico-visual`](https://versavisual.com.br/diagnostico-visual)

---

© 2026 **VERSAVISUAL**. Todos os direitos reservados.
