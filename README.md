# VERSAVISUAL Website

Site institucional e portfólio da VERSAVISUAL, construído em React + Vite para apresentar serviços, segmentos, cases, galerias e o fluxo de Diagnóstico Visual.

> Imagem não é registro. É posicionamento.

## Estado Do Projeto

- Stack: React 19, Vite 8, TypeScript, Tailwind CSS v4 e React Router 7.
- Analytics: Vercel Analytics via `@vercel/analytics/react`.
- Design: tokens alinhados ao `Brand System RFC v3` da VERSAVISUAL.
- SEO: metadados dinâmicos, canonical, JSON-LD, `robots.txt` e `sitemap.xml`.
- Mídia: acervo local em `public/images`, logos em `public/logos` e vídeo em `public/videos`.
- Performance: fontes do brand system self-hosted em WOFF2 em `public/fonts`, sem stylesheet render-blocking do Google Fonts.

## Brand System

A interface segue o brandbook VERSAVISUAL v3:

- `Brand Black`: `#050A0D`
- `Deep Navy`: `#253540`
- `Accent Teal`: `#5E7F8C`
- `Mist`: `#A4B8BF`
- `Off-White`: `#F2F2F2`
- `White`: `#FFFFFF`

Tipografia:

- Display e wordmark: `Righteous`
- Headlines, UI, botões e eyebrows: `Outfit`
- Corpo, legenda longa, e-mail e rodapé: `DM Sans`

Observação de acessibilidade: `Accent Teal` não deve ser usado em texto pequeno sobre fundo claro, porque não atinge contraste WCAG AA. Nesses casos, use `Deep Navy`.

## Rotas

- `/`
- `/portfolio`
- `/portfolio/:caseSlug`
- `/diagnostico-visual`
- `/ativacoes-eventos`
- `/moda-campanhas`
- `/artistas-videoclipes`
- `/posicionamento-profissional`
- `/imagem-pessoal-lifestyle`
- `/casamentos`
- `/gestantes`
- `/hotelaria-lifestyle`

Também há compatibilidade para aliases em `/segmentos/:slug` e `/:slug`.

## Segmentos

1. Ativações & Eventos
2. Moda & Campanhas
3. Artistas & Videoclipes
4. Posicionamento Profissional
5. Imagem Pessoal & Lifestyle
6. Casamentos
7. Gestantes
8. Hotelaria & Lifestyle

## Estrutura

```text
├── public/
│   ├── brand-assets/          # Logos e ícones exportados
│   ├── images/                # Fotos organizadas por produção
│   ├── logos/                 # Wordmarks em SVG/PNG
│   ├── fonts/                 # Righteous, Outfit e DM Sans em WOFF2
│   ├── videos/                # Vídeos do site
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/            # Header, Footer, cards, galeria, CTA, FAQ
│   ├── data/
│   │   └── site.ts            # Conteúdo, segmentos, cases e contatos
│   ├── lib/
│   │   ├── images.ts          # Catálogo e helper de imagens
│   │   ├── seo.tsx            # SEO, canonical, OG e JSON-LD
│   │   └── useParallax.ts     # Parallax leve
│   ├── pages/                 # Home, Portfolio, SegmentPage, CaseStudy, Diagnostico
│   ├── App.tsx                # Rotas e Analytics
│   ├── index.css              # Tailwind v4 e tokens globais
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

## Desenvolvimento

Pré-requisitos:

- Node.js compatível com o projeto.
- npm.

Instalar dependências:

```bash
npm install
```

Rodar localmente:

```bash
npm run dev
```

No Figma Make, o servidor costuma rodar na porta definida pelo ambiente. Fora dele, o Vite informa a URL no terminal.

Build de produção:

```bash
npm run build
```

Formatar:

```bash
npm run format
```

## Checklist Antes De Publicar

- `npm run format`
- `npm run build`
- Conferir contraste WCAG AA em textos pequenos.
- Conferir navegação por âncoras: `/#nichos` e `/#processo`.
- Conferir vídeo do portfólio em loop no filtro `Artistas & Videoclipes`.
- Conferir formulário `/diagnostico-visual`.
- Conferir `robots.txt`, `sitemap.xml`, titles, descriptions e canonical.

## Contato

- WhatsApp: [11 95074-7192](https://wa.me/5511950747192)
- E-mail: [hub@versavisual.com.br](mailto:hub@versavisual.com.br)
- Diagnóstico Visual: `/diagnostico-visual`

© 2026 VERSAVISUAL.
