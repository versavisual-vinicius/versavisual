# DECISIONS.md — Registro de Decisões de Arquitetura (ADR)

Este documento registra as decisões arquiteturais fundamentais tomadas durante o desenvolvimento do **VERSAVISUAL Website**, suas motivações e status operacional.

---

## DEC-SEO-001 — Domínio Canônico com `www`

**Status:** Aceita

O domínio canônico oficial da VERSAVISUAL é:
```text
https://www.versavisual.com.br
```

Titles, canonicals, Open Graph, JSON-LD, sitemap e redirects devem convergir para essa origem.

O domínio sem `www` deve existir somente como origem de redirect permanente.

---

## DEC-SEO-002 — Sitemap Somente com Rotas Canônicas

**Status:** Implementada

Aliases históricos foram removidos do sitemap. O sitemap não será usado como inventário de todas as URLs resolvíveis, mas somente das páginas que devem ser indexadas.

O sitemap atual contém **32 URLs canônicas** (5 rotas principais + 8 segmentos + 19 cases de portfólio).

---

## DEC-SEO-003 — Preservação de Aliases por Redirect

**Status:** Implementada

Aliases antigos de segmentos e cases não devem renderizar cópias indexáveis nem retornar 404 quando houver um destino histórico conhecido.

Essas URLs usam **HTTP 308 permanente** no `vercel.json` para preservar tráfego, backlinks e autoridade acumulada (16 redirects de cases históricos + aliases de segmentos).

---

## DEC-SEO-004 — Manifesto Central de Rotas & SSG

**Status:** Implementada

Rotas e metadados não devem ser mantidos manualmente em múltiplas listas incompatíveis. O catálogo SEO (`catalog-seo.json`), o manifesto de rotas (`seo-routes.json`), o sitemap (`sitemap.xml`) e o emissor estático (`emit-route-html.mjs`) permanecem sincronizados e validados automaticamente, gerando **33 arquivos HTML estáticos** (32 canônicos + 404).

---

## DEC-SEO-005 — Logo Estruturado Local

**Status:** Implementada

Schemas devem apontar somente para assets locais existentes. O logo oficial para dados estruturados é:
```text
/brand-assets/vv-profilelogo-dark-square.png
```
A referência antiga para `logo-og.png` foi permanentemente extirpada.

---

## DEC-SEO-006 — Redirect Apex Permanente

**Status:** Pendente operacional

`versavisual.com.br` deve redirecionar para `www.versavisual.com.br` por HTTP 308.

A mudança depende da configuração do domínio no painel da Vercel e não foi concluída durante esta sessão. A última resposta pública verificada permaneceu HTTP 307.

---

## DEC-CORE-001 — Tailwind CSS v4 com `@theme` e Fontes Self-Hosted WOFF2

**Status:** Implementada

Adotar Tailwind CSS v4 nativo com plugin `@tailwindcss/vite`, configurando todos os tokens de cor diretamente no `@theme` em `src/index.css` e hospedando os arquivos de fonte WOFF2 (`Righteous`, `Outfit`, `DM Sans`) localmente em `public/fonts/`.

---

## DEC-CORE-002 — Infinite Canvas 360° com Aceleração por GPU Nativa

**Status:** Implementada

Implementar o `InfiniteCanvas.tsx` utilizando transformações 2D aceleradas por GPU (`transform: translate3d(...)`), cálculos vetoriais em `requestAnimationFrame`, desaceleração física exponencial (inércia) e minimap radar HUD interativo em SVG, garantindo 60fps/120fps sem bibliotecas 3D pesadas.

---

## DEC-CORE-003 — Suíte de Testes com Opaque-Box Runner e Hardening Adversarial

**Status:** Implementada

Criar um test runner em TypeScript (`tsx`) estruturado em 5 Tiers de rigor crescente (Features, Limites, Combinações, Jornadas Reais e Adversarial Hardening), executando 256 testes em menos de 0.1 segundo.
