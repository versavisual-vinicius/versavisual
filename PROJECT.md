# Project: VersaVisual Website Redesign & Production Consolidation

## 1. Visão Geral & Arquitetura

O projeto **VERSAVISUAL Website** é uma aplicação web autoral de alta performance e apelo estético desenvolvida para a marca e estúdio de fotografia, vídeo e direção criativa **VERSAVISUAL**, liderado pelo fotógrafo e diretor criativo **Vinicius Cunha (Vini)**.

### Stack Tecnológica & Decisões de Arquitetura:
- **Framework & Core**: React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`).
- **Roteamento & Resolução de URLs**: React Router 7 (`react-router-dom`), suporte a rotas estáticas e dinâmicas, canonicalização de aliases legados e fallback para página 404 sem quebra de estado.
- **Navegação Espacial (Infinite Canvas 360°)**: Experiência interativa de tela cheia sem libs 3D pesadas, calculada via matemática vetorial, aceleração por GPU (`transform: translate3d(...)`), inércia com desaceleração exponencial, zoom dinâmico (mouse wheel / pinch gesture) e minimap radar HUD interativo.
- **Tratamento de Imagem & Color Science (BeforeAfterSlider)**: Comparador de tratamento fotográfico e color grading com especificações reais (ex: ACEScc / DaVinci Resolve, Dodge & Burn manual, Separação de Frequências e emulação Kodak 2383).
- **Design System & Tokens**: Tailwind v4 `@theme` com tokens de cores calibrados (`ink: #050A0D`, `navy: #253540`, `teal: #5E7F8C`, `teal-400: #70909C`, `mist: #A4B8BF`, `off: #F2F2F2`), tipografia self-hosted WOFF2 (`Righteous`, `Outfit`, `DM Sans`) e garantia de contraste estrito WCAG AA (`bg-teal text-off`).
- **SEO Técnico & SSG (Static Site Generation)**: Pós-processador ESM `scripts/emit-route-html.mjs` que lê o catálogo SEO (`src/data/catalog-seo.json`, `src/data/seo-routes.json` e `public/sitemap.xml`), pré-renderizando **33 arquivos HTML estáticos** em `dist/` com metadados `<title>`, `<meta name="description">`, OpenGraph, Twitter Cards, Canonical URLs e dados estruturados Schema.org JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `CreativeWork`, `ImageGallery`).
- **Conversão & Triagem de Leads**: Formulário `/diagnostico-visual` com validação de campos client-side, proteção anti-spam via honeypot invisível, gerador de link formatado para WhatsApp direto e endpoint serverless `/api/diagnostico` integrado ao Resend.
- **Testes & Qualidade**: Suíte com 256 testes automatizados (Tiers 1 a 5), cobrindo contratos unitários, limites de segurança, combinações cross-feature, jornadas reais e hardening adversarial.

---

## 2. Arquitetura de SEO e Geração Estática

O projeto combina metadados dinâmicos no cliente com geração de HTML estático após o build do Vite.

### Fontes de Dados
- `src/data/site.ts`: segmentos, cases, aliases e conteúdo institucional.
- `src/data/catalog-seo.json`: metadados SEO por rota.
- `src/data/seo-routes.json`: manifesto de rotas estáticas.
- `public/sitemap.xml`: URLs canônicas publicadas.
- `src/lib/seo.tsx`: metadados e schemas usados em navegação SPA.
- `scripts/emit-route-html.mjs`: geração de HTML estático por rota.
- `scripts/verify-built-seo.mjs`: validação do resultado em `dist/`.

### Invariantes
1. Apenas URLs canônicas podem aparecer no sitemap.
2. Aliases históricos não devem ser indexáveis.
3. Aliases conhecidos devem redirecionar permanentemente para o destino canônico.
4. Toda URL do sitemap deve responder com HTTP 200.
5. Uma URL desconhecida deve responder com HTTP 404 e usar `noindex`.
6. Cada página indexável deve possuir:
   - title;
   - description;
   - canonical;
   - Open Graph;
   - Twitter Card;
   - JSON-LD apropriado.
7. Imagens referenciadas em Open Graph e JSON-LD devem existir em `public/`.
8. A versão canônica do domínio deve ser sempre `www.versavisual.com.br`.

### Composição das Rotas

| Categoria | Quantidade |
|---|---:|
| Rotas principais | 5 |
| Segmentos | 8 |
| Cases canônicos | 19 |
| Total indexável | 32 |
| Página 404 | 1 |
| Total de HTMLs emitidos | 33 |

### Redirects de Cases Publicados (HTTP 308 Permanente)
```text
/portfolio/lancamento-drinkball
→ /portfolio/ativacao-drinkball

/portfolio/megabloco-cha-da-alice
→ /portfolio/carnaval-de-rua-experiencia-publico

/portfolio/festival-jeans-toritama
→ /portfolio/evento-fjt-palco-camarote

/portfolio/syn-ice-camarote
→ /portfolio/symbh-evento-corporativo

/portfolio/moda-santalola-verao
→ /portfolio/editorial-lifestyle-campanha

/portfolio/fashion-manners-editorial
→ /portfolio/fashion-week-passarela-bastidor

/portfolio/loja-frida-campanha
→ /portfolio/loja-frida-sao-joao

/portfolio/ensaio-feminino-frida
→ /portfolio/loja-frida-sao-joao

/portfolio/ensaio-autoral-estudio
→ /portfolio/ensaio-autoral-lifestyle-instagram

/portfolio/casamento-destination-wedding
→ /portfolio/casamento-ao-ar-livre

/portfolio/casamento-urbano-contemporaneo
→ /portfolio/casamento-ao-ar-livre

/portfolio/maternidade-ensaio-intimo
→ /portfolio/ensaio-gestante-praia

/portfolio/bonfim-house-boutique
→ /portfolio/festival-bon-cobertura-corporativa

/portfolio/videoclipes-oficiais-e-o-tchan-babado-novo
→ /portfolio/e-o-tchan-jogadinha

/portfolio/clipe-e-o-tchan-jogadinha
→ /portfolio/e-o-tchan-jogadinha

/portfolio/clipe-babado-novo-sururu
→ /portfolio/babado-novo-sururu
```
*Todos esses redirects foram verificados externamente com HTTP 308 e destino correto.*

---

## 3. Diagnóstico Visual e API

O formulário `/diagnostico-visual` envia o briefing para `/api/diagnostico`.

### Campos Obrigatórios
- `nome`
- `whatsapp`
- `email`

### Proteções Implementadas
- honeypot `_gotcha`;
- limite de payload de 40 KB;
- validação sintática de e-mail;
- truncamento de campos;
- escape de HTML;
- rejeição de métodos diferentes de POST;
- respostas sem cache;
- tratamento de indisponibilidade do Resend.

O destinatário configurado no código é:
```text
hub@versavisual.com.br
```

---

## 4. Assets Estruturados

O schema `ProfessionalService` utiliza:
```text
/brand-assets/vv-profilelogo-dark-square.png
```
O asset foi verificado em produção com HTTP 200.

A referência antiga abaixo não deve voltar a ser utilizada:
```text
/brand-assets/logo-og.png
```
Ela não existe e retorna HTTP 404.

---

## 5. Estrutura de Código (Code Layout)

- `src/main.tsx` — Ponto de entrada da aplicação, carregamento de fontes locais e CSS global.
- `src/App.tsx` — Shell raiz da aplicação com layout global, `ScrollToTop`, `SkipLink`, roteador com lazy loading e Vercel Analytics.
- `src/index.css` — Estilos globais, importação do Tailwind v4 (`@import "tailwindcss";`), tokens `@theme`, regras tipográficas e utilitários (`.u-grade`, custom scrollbars).
- `src/data/` — Dicionários de dados e metadados centralizados:
  - `site.ts` — Dicionário principal: navegação, 8 segmentos, 19 cases de portfólio, serviços, dados do fundador, depoimentos e FAQ.
  - `beforeAfter.ts` — Dados dos ensaios com comparativo antes/depois, especificações de color grading e tratamentos.
  - `catalog-seo.json` — Base central de metadados, títulos, descrições, imagens de compartilhamento e FAQs por rota.
  - `seo-routes.json` — Manifesto ordenado das rotas estáticas.
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
  - `emit-route-html.mjs` — Gerador SSG pós-build que injeta `<head>` estático e schemas em todos os 33 arquivos HTML.
  - `verify-built-seo.mjs` — Validador de integridade das rotas emitidas em `dist/`.
- `tests/` — Infraestrutura de testes automatizados com suítes Tiers 1 a 5 (256 testes).
