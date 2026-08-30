# AGENTS.md — Guia de Desenvolvimento & Diretrizes Técnicas

Este documento estabelece as diretrizes de código, arquitetura, padrões visuais e regras operacionais para qualquer agente de inteligência artificial ou desenvolvedor trabalhando no repositório **VERSAVISUAL Website**.

---

## 1. Visão Geral do Projeto & Stack

- **Aplicação**: Website institucional, portfólio autoral e plataforma de posicionamento da **VERSAVISUAL**.
- **Fundador & Diretor Criativo**: **Vinicius Cunha (Vini)** — Fotógrafo, diretor criativo, fundador da VersaVisual e desenvolvedor de automações e produtos digitais.
- **Stack**: React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion 13, Lucide React.
- **Roteamento**: React Router 7 (`react-router-dom`).
- **Geração Estática**: Pré-renderização SSG de 47 rotas estáticas via `scripts/emit-route-html.mjs`.

---

## 2. Comunicação & Diretrizes de Atuação

- **Tratamento**: Chame o usuário de **Vini** de forma natural e profissional.
- **Idioma**: Responda SEMPRE em **Português do Brasil (pt-BR)**.
- **Estilo**: Comece pelo resultado. Seja conciso, direto ao ponto, técnico e orientado à ação prática sem enrolação.
- **Terminal & Execução**: Sempre informe o diretório correto (`Cwd`) ao propor comandos. Valide alterações com testes e verificação de tipos antes de concluir a tarefa.

---

## 3. Padrões Técnicos & Identidade VersaVisual

### 3.1. Equipamentos & Filosofia de Imagem
- **Câmeras & Ópticas**: Equipamento base **Nikon D780 Full Frame** e lentes **Nikkor** prime/zoom (85mm f/1.4G, 50mm f/1.4G, 24-70mm f/2.8).
- **Color Science & Retouching**: ACEScc / DaVinci Resolve, emulações de película (ex: Kodak 2383), Dodge & Burn manual e Separação de Frequências (preservação de microtexturas e tons de pele naturais sem suavização artificial).

### 3.2. Estrutura de Dados e Assets
- **Centralização de Dados**: Todo o conteúdo institucional, nichos, cases e depoimentos residem em `src/data/site.ts`, `src/data/beforeAfter.ts` e `src/data/catalog-seo.json`.
- **Assets de Imagem**: Todas as fotos ficam armazenadas localmente sob `public/images/` e são resolvidas via helper seguro `src/lib/images.ts`. Nunca depender de imagens externas ou Unsplash.
- **Segregação de Ensaios (`images.ts`)**: Manter constantes isoladas para cada ensaio/campanha específica. Nunca misturar fotos com propósitos distintos em um mesmo array genérico.
- **Mídia em Vídeo**: Videoclipes de artistas devem usar a estrutura `youtubeVideos` (com IDs e títulos corretos) para embeds dedicados em `CaseStudy.tsx`. Reservar `/videos/hero.mp4` para destaques institucionais globais ou do segmento.

### 3.3. Design System & Contraste
- **Tokens**: `ink: #050A0D`, `navy: #253540`, `teal: #5E7F8C`, `teal-400: #70909C`, `mist: #A4B8BF`, `off: #F2F2F2`.
- **Regra de Contraste**: Botões e CTAs com fundo `bg-teal` DEVEM OBRIGATORIAMENTE ter texto `text-off`. Nunca utilizar `text-ink` ou `text-navy` sobre `bg-teal`.
- **Tipografia**: Fontes locais em WOFF2 sem dependências externas (`Righteous`, `Outfit`, `DM Sans`).

### 3.4. Ergonomia Mobile
- Cards de segmentos usam `aspect-[16/11]` no mobile e `aspect-[3/4]` a partir de `sm`.
- Touch targets mínimos de **44x44px** em todos os botões e áreas interativas.
- Zero overflow horizontal em todas as larguras de tela (de 360px a 4K).

---

## 4. Roteamento, SEO e SSG

- O sitemap canônico reside em `public/sitemap.xml`.
- O catálogo de SEO com títulos, descrições e schemas JSON-LD reside em `src/data/catalog-seo.json`.
- Sempre que novas rotas, nichos ou cases forem adicionados ou renomeados:
  1. Atualizar `src/data/site.ts` com os novos slugs e dados.
  2. Atualizar `src/data/catalog-seo.json` e `src/data/seo-routes.json`.
  3. Atualizar `public/sitemap.xml`.
  4. Atualizar os utilitários de teste em `tests/utils/site-data.ts`.
  5. Rodar `npm run build` e validar a emissão com `node scripts/verify-built-seo.mjs`.

---

## 5. Fluxo de Verificação & Testes

Antes de finalizar qualquer alteração no código:
```bash
# 1. Checagem estrita de tipos
npx tsc --noEmit

# 2. Build de produção e emissão SSG das 47 rotas estáticas
npm run build

# 3. Validação dos arquivos HTML gerados
node scripts/verify-built-seo.mjs

# 4. Execução da suíte completa de testes E2E (230 testes)
npx tsx tests/run-all.ts

# 5. Execução do Tier 5 de testes adversariais (26 testes)
npx tsx tests/tier5-adversarial-hardening.ts
```
