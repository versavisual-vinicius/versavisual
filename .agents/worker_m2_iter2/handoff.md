# Relatório de Handoff — Marco 2 (M2) / Iteração 2
**Harmonização de Domínio Canônico, Emissão Estática SSG e Atualização do Sitemap**

**Agente:** `worker_m2_iter2`  
**Data:** 2026-08-20T02:27:00Z  
**Status:** `DONE` / `READY_FOR_VERIFICATION`

---

## 1. Observation

Durante a auditoria adversarial dos challengers M2 (`challenger_m2_1` e `challenger_m2_2`), foram identificados dois pontos de atenção:
1. `src/lib/seo.tsx` e `scripts/emit-route-html.mjs` mantinham a constante `SITE_URL`/`siteUrl` como `https://www.versavisual.com.br`, enquanto `public/sitemap.xml` utilizava `https://versavisual.com.br`, causando a rejeição de todas as URLs do sitemap no filtro de emissão SSG (`Emitted 0 route HTML files`).
2. O case study `fjt-fashion-desfile-colecoes` ("FJT Fashion — Desfile & Coleções", Toritama · PE), presente no array `PORTFOLIO` em `src/data/site.ts`, não possuía entrada correspondente em `public/sitemap.xml`.

### Modificações Realizadas:
1. **`src/lib/seo.tsx` (Linha 3):**
   - Atualizado `export const SITE_URL = "https://versavisual.com.br"`.
2. **`scripts/emit-route-html.mjs` (Linhas 6 e 12):**
   - Atualizado `const siteUrl = "https://versavisual.com.br"`.
   - Adicionada normalização de host: `.filter((url) => url.hostname.replace(/^www\./, "") === "versavisual.com.br")`.
3. **`public/sitemap.xml` (Linha 24):**
   - Inserida a entrada canônica:
     `<url><loc>https://versavisual.com.br/portfolio/fjt-fashion-desfile-colecoes</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`.

---

## 2. Logic Chain

1. A unificação da origem em `https://versavisual.com.br` assegura consistência absoluta entre tags `<link rel="canonical">`, OpenGraph `og:url`, schemas Schema.org JSON-LD e o `public/sitemap.xml`.
2. A normalização com `.filter((url) => url.hostname.replace(/^www\./, "") === "versavisual.com.br")` em `scripts/emit-route-html.mjs` torna o script pós-build resiliente tanto a URLs sem www quanto com www.
3. A inclusão de `fjt-fashion-desfile-colecoes` no `sitemap.xml` alinha 100% dos 19 itens canônicos de `PORTFOLIO` e todos os aliases com as rotas rastreáveis pelo motor de busca.
4. O comando `npm run build` agora processa todas as rotas com sucesso, gerando e populando 41 diretórios de rota em `dist/` com seus respectivos arquivos `index.html`.

---

## 3. Caveats

- **No caveats.** Nenhuma biblioteca externa foi introduzida. Apenas os três arquivos permitidos foram alterados, mantendo 100% de compatibilidade com React 19, Vite 8 e Tailwind CSS v4.

---

## 4. Conclusion

A Iteração 2 do Marco 2 (M2) foi concluída com êxito total:
- **0 erros de tipagem TypeScript** (`npx tsc --noEmit`).
- **Build de produção emitindo 41 rotas estáticas** (`npm run build` gerando `dist/` com todos os `index.html`).
- **100% de aprovação na suíte adversarial M2** (114/114 testes em `tests/adversarial-m2.ts`).
- **100% de aprovação na auditoria challenger M2** (541/541 verificações em `tests/challenger_m2_adversarial.ts`).
- **100% de aprovação na suíte geral E2E Tiers 1-4** (196/196 testes em `tests/run-all.ts`).

---

## 5. Verification Method

Para verificar e reproduzir independentemente:

1. **Formatação:**
   ```bash
   npm run format
   ```
2. **Checagem de Tipagem:**
   ```bash
   npx tsc --noEmit
   ```
3. **Build e Emissão Estática:**
   ```bash
   npm run build
   # Saída esperada: "Emitted 41 route HTML files."
   ```
4. **Baterias de Testes Adversariais e E2E:**
   ```bash
   npx tsx tests/adversarial-m2.ts
   npx tsx tests/challenger_m2_adversarial.ts
   node --experimental-strip-types tests/run-all.ts
   ```
