# DESIGN.md

# VERSAVISUAL Website - Direcao de Design

## Principio

O site da VERSAVISUAL deve parecer um hub audiovisual autoral: escuro, fotografico, direto e comercial. A imagem real e o principal argumento. A interface deve apoiar o portfolio, nao competir com ele.

Assinatura verbal:

> Imagem nao e registro. E posicionamento.

## Stack visual

- React 19 + Vite 8.
- Tailwind CSS v4 em `src/index.css`.
- Tokens de cor e fontes definidos no `@theme`.
- Conteudo, segmentos, cases e imagens centralizados em `src/data/site.ts` e `src/lib/images.ts`.

## Paleta

Tokens principais:

- `ink`: `#050A0D`
- `navy`: `#253540`
- `teal`: `#5E7F8C`
- `mist`: `#A4B8BF`
- `off`: `#F2F2F2`

Uso:

- Fundo principal: `bg-ink`.
- Secoes escuras translúcidas: `bg-ink/35`, `bg-ink/75`, `bg-ink/85`.
- Cards claros: `bg-off`, `bg-surface`.
- Acento e CTAs: `bg-teal`.
- Texto em fundos escuros: `text-off` ou `text-mist`.
- Texto em fundos `bg-teal`: sempre `text-off`.
- Texto em fundos claros: `text-ink` para titulos e `text-navy` para corpo.

Evitar:

- Texto `text-ink` ou `text-navy` sobre `bg-teal`.
- Texto escuro sobre foto escura sem overlay.
- Gradientes genericos sem relacao com a marca.
- Dependencia de imagens externas para assets principais.

## Tipografia

Fontes self-hosted em `public/fonts`:

- Display/wordmark: `Righteous`.
- Headlines, UI, botoes e eyebrows: `Outfit`.
- Corpo, legendas longas e rodape: `DM Sans`.

Regras:

- Headlines grandes usam `Outfit` 800, line-height apertado e `text-wrap: balance`.
- Corpo usa `DM Sans`, com leitura curta e direta.
- Eyebrows usam uppercase, tracking amplo e peso 600.
- Evitar texto hero-scale dentro de cards ou paineis compactos.

## Layout

Containers:

- Max-width principal: `1320px`.
- Padding mobile: `px-5`.
- Padding desktop: `lg:px-10`.

Secoes:

- Hero deve usar imagem/video real full-bleed.
- Segmentos devem mostrar imagem forte e card clicavel.
- Cards de portfolio usam imagem como protagonista e texto em overlay.
- CTA final deve ter overlay escuro suficiente para leitura.

Mobile:

- A secao Segmentos usa cards compactos com `aspect-[16/11]`.
- Em `sm+`, segmentos podem voltar para `aspect-[3/4]`.
- Evitar alturas fixas excessivas que gerem vazios.
- Texto e CTA devem ficar visiveis sem depender de hover.

## Componentes

### Header

- Fundo transparente no topo e escurecido no scroll.
- CTA principal `Iniciar projeto` usa `bg-teal text-off`.
- Menu mobile deve manter `aria-expanded` e label correto.

### Segment cards

- Imagem obrigatoria.
- Overlay `u-grade`.
- Titulo em `text-off`.
- CTA/indicador em `text-teal-400`.
- Alt text gerado por `segmentImageAlt`.

### Portfolio cards

- Imagem em `aspect-[4/5]`.
- Overlay escuro.
- Titulo em `text-off`.
- Cidade em `text-mist`.
- Alt text gerado por `portfolioImageAlt`.

### CTASection

- Foto decorativa com `aria-hidden`.
- Overlay `bg-ink/80`.
- Eyebrow em `text-mist`.
- H2 em `text-off`.
- Botao principal em `bg-teal text-off`.

### Formulario de diagnostico

- Fundo claro para leitura: `bg-off/94`.
- Labels em `text-ink`.
- Campos com `bg-white text-ink`.
- Erros inline com `aria-describedby`.
- Feedback global em `aria-live="polite"`.
- CTAs em `bg-teal text-off`.

## Acessibilidade

Obrigatorio:

- `main#main`.
- Skip link: `Pular para o conteudo`.
- Foco visivel em links, botoes e controles.
- Alt text em imagens relevantes.
- `alt=""` apenas para imagem decorativa com `aria-hidden`.
- Contraste minimo WCAG AA:
  - 4.5:1 para texto normal.
  - 3:1 para texto grande.

Regra de contraste da marca:

- Sempre que o fundo estiver no tom `teal` (`#5E7F8C`) ou muito proximo, o texto deve ser branco/off-white (`text-off`).
- Em fundos escuros ou fotografias escuras, usar `text-off` para titulo e `text-mist` para apoio.

## SEO visual/social

- `og:title`: `VERSAVISUAL - Fotografia, Video e Storymaking para Marcas`.
- `og:description`: em portugues.
- `og:image`: asset proprio do projeto, nao imagem externa.
- Imagens relevantes devem ter alt descritivo para acessibilidade e SEO de imagem.

## Imagens

- Usar acervo local em `public/images`.
- `src/lib/images.ts` nao deve depender de Unsplash ou outros fornecedores externos.
- Fallback local atual: `/images/foto-a-producao-nao-falha.webp`.
- Preservar imagens reais de producao como principal sinal visual da marca.

## Validacao

Antes de publicar:

- `npm run format`
- `npm run build`
- Conferir mobile em 390x844 e 430x932.
- Conferir que nao existe `bg-teal` com `text-ink` ou `text-navy`.
- Conferir que nao existe `Figma Make App`, description em ingles ou `unsplash` nos arquivos publicos.
- Conferir `/robots.txt` e `/sitemap.xml` no dominio canonico.
- Conferir rota inexistente retornando HTTP 404 em producao.
