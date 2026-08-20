# Relatório de Desafio Adversarial — Marco 2 (M2)
**TypeScript Syntax, Site Data & Dynamic Routing Engine**

**Agente:** `challenger_m2_1`  
**Data:** 2026-08-20T02:24:00Z  
**Veredito:** `REJECT` (Rejeição técnica preventiva até alinhamento de 2 itens objetivos)

---

## 1. Observation

Foram executadas baterias de testes empíricos estritos, suites de testes E2E e testes adversariais automatizados (`tests/run-all.ts` e `tests/challenger_m2_adversarial.ts`).

### Observações Positivas (Aprovadas):
1. **Tipagem TypeScript Estrita (`npx tsc --noEmit`):**
   - Execução: `npx tsc --noEmit`
   - Resultado: Saída limpa, código de retorno `0`. Todos os 9 erros `TS1005` anteriores foram eliminados.
2. **Taxonomia dos 8 Segmentos Canônicos:**
   - Todos os 8 segmentos canônicos definidos em `DESIGN.md` (`ativacoes-eventos`, `moda-campanhas`, `artistas-videoclipes`, `posicionamento-profissional`, `imagem-pessoal-lifestyle`, `casamentos`, `gestantes`, `hotelaria-lifestyle`) estão presentes em `SEGMENTS` com estrutura completa (índices `01` a `08`, 6 serviços, 4 etapas de processo, 3+ FAQs, fotos locais e regiões).
3. **Resolução de Segmentos e Aliases (`getSegment`):**
   - Resolução de slugs diretos, prefixos `segmentos/`, barras no início/fim (`/casamentos/`), caixa alta/baixa (`MODA-CAMPANHAS`) e todos os 18 aliases (`eventos`, `musica`, `lifestyle`, `pessoal`, `gestante`, `maternidade`, etc.) validados com 100% de sucesso.
   - Entradas adversariais (`""`, `null`, `undefined`, `"../traversal"`, `"<script>"`, `"__proto__"`, `"constructor"`) retornam seguramente `undefined` sem lançar exceções.
4. **Resolução de Cases de Portfólio (`getCase`):**
   - Todos os 19 itens de `PORTFOLIO` possuem `caseSlug` único e mapeado para um segmento canônico válido.
   - Resolução de slugs canônicos e todos os aliases de `CASE_ALIASES` validados. Entradas maliciosas retornam seguramente `undefined`.
5. **Roteador e Fallback 404 (`src/App.tsx`):**
   - As rotas `/portfolio/:caseSlug`, `/segmentos/:slug`, `/:slug` e rotas inexistentes redirecionam adequadamente para o componente `<NotFound />` caso o slug não seja resolvido.
6. **Ausência de URLs Quebradas em `public/sitemap.xml`:**
   - Todas as 43 URLs atualmente presentes em `public/sitemap.xml` são válidas e resolvem para rotas reais no código.

---

### Observações Adversariais Críticas (Falhas Encontradas):

1. **Item de Portfólio Ausente no `sitemap.xml`:**
   - **Arquivo:** `src/data/site.ts` (linhas 1206-1213) vs `public/sitemap.xml`
   - **Evidência:** O item `PORTFOLIO` indexado com `caseSlug: "fjt-fashion-desfile-colecoes"` (Título: *"FJT Fashion — Desfile & Coleções"*, Cidade: *"Toritama · PE"*) está presente no catálogo de dados, mas **NÃO** possui entrada correspondente em `public/sitemap.xml`.
   - **Teste com falha:** `tests/challenger_m2_adversarial.ts`
     ```
     ✗ FAIL: Canonical portfolio case /portfolio/fjt-fashion-desfile-colecoes is present in sitemap.xml
     ```

2. **Inconsistência de Domínio Canônico causando Emissão de 0 Rotas Estáticas no Build:**
   - **Arquivos:** `public/sitemap.xml`, `src/lib/seo.tsx` (linha 3) e `scripts/emit-route-html.mjs` (linha 6).
   - **Evidência:**
     - O worker M2 atualizou `public/sitemap.xml` para o domínio canônico sem www: `https://versavisual.com.br/`.
     - Contudo, `src/lib/seo.tsx` manteve: `export const SITE_URL = "https://www.versavisual.com.br"` (com www).
     - E `scripts/emit-route-html.mjs` manteve: `const siteUrl = "https://www.versavisual.com.br"` (com www).
   - **Impacto no Build:**
     - Ao rodar `npm run build`, o script `emit-route-html.mjs` executa o filtro `url.origin === siteUrl`.
     - Como a URL do sitemap é `https://versavisual.com.br` e `siteUrl` é `https://www.versavisual.com.br`, o filtro rejeita 100% das URLs do sitemap.
     - Saída do build:
       ```
       Emitted 0 route HTML files.
       ```
     - Além disso, as tags `<link rel="canonical">` e `og:url` geradas pelo hook `useSeo` injetam `https://www.versavisual.com.br/...`, gerando divergência com o sitemap.

---

## 2. Logic Chain

1. **Premissa da Taxonomia & Slugs:** Todo projeto cadastrado no array canônico `PORTFOLIO` em `src/data/site.ts` com `caseSlug` ativo deve ter sua rota indexável presente em `public/sitemap.xml`.
2. **Observação 1:** `fjt-fashion-desfile-colecoes` existe no array `PORTFOLIO` de `src/data/site.ts`, mas foi omitido do `public/sitemap.xml`.
3. **Premissa do Build & SEO:** O domínio canônico definido em `public/sitemap.xml` deve ser rigorosamente o mesmo em `src/lib/seo.tsx` (`SITE_URL`) e `scripts/emit-route-html.mjs` (`siteUrl`).
4. **Observação 2:** A discrepância de `www.` vs não-`www.` quebra a geração estática no script de pós-build (`Emitted 0 route HTML files`) e gera conflito de canonical tag de SEO.
5. **Conclusão Lógica:** O Marco 2 atingiu excelência na tipagem e nos resolvers dinâmicos, mas necessita da correção desses dois itens de alinhamento para ser homologado como apto para produção.

---

## 3. Caveats

- **No caveats.** O teste adversarial foi executado contra o código real em execução em runtime Node/TypeScript sem mocks fictícios.

---

## 4. Conclusion

**Veredito:** `REJECT`

### Ações requeridas para aprovação imediata pelo Worker:
1. **Adicionar o case faltante em `public/sitemap.xml`:**
   ```xml
   <url><loc>https://versavisual.com.br/portfolio/fjt-fashion-desfile-colecoes</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
   ```
2. **Harmonizar o domínio canônico em `src/lib/seo.tsx` e `scripts/emit-route-html.mjs`:**
   - Em `src/lib/seo.tsx`: `export const SITE_URL = "https://versavisual.com.br"` (ou compatibilizar).
   - Em `scripts/emit-route-html.mjs`: `const siteUrl = "https://versavisual.com.br"` (ou aceitar tanto com quanto sem `www`).
3. **Verificar que `npm run build` emite as 27+ rotas estáticas** (`Emitted 27 route HTML files`).

---

## 5. Verification Method

Para reproduzir e confirmar as observações:

1. **Checagem de Tipagem:**
   ```bash
   npx tsc --noEmit
   # Retorna código 0 (OK)
   ```

2. **Execução do Harness Adversarial:**
   ```bash
   npx tsx tests/challenger_m2_adversarial.ts
   # Demonstra a falha em fjt-fashion-desfile-colecoes
   ```

3. **Verificação do Emissor SSG no Build:**
   ```bash
   node scripts/emit-route-html.mjs
   # Deve emitir as rotas estáticas sem zerar a contagem
   ```
