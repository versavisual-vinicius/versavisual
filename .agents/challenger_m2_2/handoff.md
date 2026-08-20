# Relatório de Avaliação Adversarial — Marco 2 (M2)
**Roteamento SPA, SEO & Resiliência a Inputs Malformados**

**Agente:** `challenger_m2_2`  
**Data:** 2026-08-20T02:23:45Z  
**Veredito:** `REJECT` ❌

---

## 1. Observation

Durante a execução da bateria de testes empíricos adversariais (`tests/adversarial-m2.ts`) e a auditoria do comando de build de produção (`npm run build`):

1. **Execução de `npm run build` gerou 0 arquivos estáticos de rotas:**
   ```
   > figma-make-app@1.0.0 build
   > vite build && node scripts/emit-route-html.mjs

   vite v8.2.1 building client environment for production...
   transforming...✓ 2230 modules transformed.
   rendering chunks...
   computing gzip size...
   ✓ built in 9.98s
   Emitted 0 route HTML files.
   ```
   Comando de verificação: `ls dist/portfolio dist/ativacoes-eventos`
   Resultado:
   ```
   ls: dist/ativacoes-eventos: No such file or directory
   ls: dist/portfolio: No such file or directory
   ```

2. **Inconsistência de Domínio Canônico entre `sitemap.xml`, `seo.tsx` e `emit-route-html.mjs`:**
   - Em `public/sitemap.xml` (linhas 3-5):
     ```xml
     <url><loc>https://versavisual.com.br/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
     <url><loc>https://versavisual.com.br/portfolio</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
     <url><loc>https://versavisual.com.br/diagnostico-visual</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
     ```
     Todas as URLs utilizam a origem `https://versavisual.com.br` (sem www).
   - Em `src/lib/seo.tsx` (linha 3):
     ```typescript
     export const SITE_URL = "https://www.versavisual.com.br"
     ```
     Injeta tags canônicas `<link rel="canonical" href="https://www.versavisual.com.br/..." />` conflitantes com o sitemap.
   - Em `scripts/emit-route-html.mjs` (linhas 6-14):
     ```javascript
     const siteUrl = "https://www.versavisual.com.br"
     ...
     const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
       .map((match) => new URL(match[1]))
       .filter((url) => url.origin === siteUrl)
       .map((url) => url.pathname.replace(/\/$/, ""))
       .filter((pathname) => pathname && pathname !== "/")
     ```
     O filtro `url.origin === siteUrl` falha para 100% das 26 URLs do sitemap porque `"https://versavisual.com.br" === "https://www.versavisual.com.br"` é `false`. Como consequência, o array `routes` fica vazio e 0 arquivos HTML são emitidos no diretório `dist/`.

3. **Resultados da Suíte Adversarial (`tests/adversarial-m2.ts`):**
   - Total de testes: **114**
   - Testes aprovados: **111**
   - Testes reprovados: **3**
     - ✗ `[2. SEO & Schema.org JSON-LD Generation] SITE_URL (https://www.versavisual.com.br) matches sitemap.xml origin (https://versavisual.com.br)`
     - ✗ `[3. Static Route Prerender & Build Generation] emit-route-html.mjs matches sitemap routes (found 0 matching routes)`
     - ✗ `[3. Static Route Prerender & Build Generation] dist/ contains prerendered index.html for all sitemap routes (found 0/40)`

4. **Comportamento Positivo do Roteamento e Resiliência (Aprovado):**
   - Resolução de slugs canônicos de segmentos (8/8) e cases (15/15): 100% OK.
   - Resolução de aliases legados e singulares (`SEGMENT_ALIASES` e `CASE_ALIASES`): 100% OK.
   - Variações de maiúsculas/minúsculas (`CASAMENTOS`, `Moda-Campanhas`): 100% OK.
   - Tratamento de barras extras e prefixos (`/segmentos/casamentos/`, `portfolio/ativacao-drinkball`): 100% OK.
   - Inputs maliciosos/inválidos (XSS `<script>`, SQLi `' OR 1=1`, path traversal `../../`, `__proto__`): 100% seguros, retornam `undefined` sem gerar exceções não capturadas.
   - Geração de BreadcrumbList e JSON-LD para segmentos: formato válido Schema.org e parseável via `JSON.parse`.

---

## 2. Logic Chain

1. A especificação do Marco 2 e `PROJECT.md` estabelecem como critério de aceitação mandatório que o comando `npm run build` gere todos os artefatos estáticos de rotas em `dist/` (Feature 30: "Build npm run build gerando dist/ e emitindo todas as 27 rotas estáticas").
2. O `worker_m2` atualizou `public/sitemap.xml` para o domínio canônico `https://versavisual.com.br`, mas não alinhou `SITE_URL` em `src/lib/seo.tsx` nem `siteUrl` em `scripts/emit-route-html.mjs` (que permaneceram como `https://www.versavisual.com.br`).
3. Quando `npm run build` executa o script `emit-route-html.mjs`, o filtro de URLs compara a origem de cada entrada do sitemap com `https://www.versavisual.com.br`. Devido à discrepância de subdomínio, nenhuma URL é capturada (`routes = []`), gerando a mensagem `"Emitted 0 route HTML files."`.
4. Isso impede a geração das pastas estáticas (`dist/portfolio/index.html`, `dist/ativacoes-eventos/index.html`, `dist/casamentos/index.html`, etc.) e gera conflito de SEO (sitemap apontando para o domínio sem `www` e tags canônicas do SPA apontando para `www`).
5. Portanto, o Marco 2 não cumpre o requisito de build e emissão estática completa, exigindo o veredito `REJECT`.

---

## 3. Caveats

- A lógica de resolução de rotas em `src/data/site.ts` (`getSegment` e `getCase`) e os schemas JSON-LD estão matematicamente corretos e resilientes a ataques e variações de case.
- A falha observada é exclusivamente decorrente do desalinhamento do domínio canônico entre `public/sitemap.xml`, `src/lib/seo.tsx` e `scripts/emit-route-html.mjs`.

---

## 4. Conclusion

**Veredito: `REJECT` ❌**

Ações imediatas para o `worker_m2`:
1. Harmonizar o domínio canônico (`https://versavisual.com.br` ou suportar tanto `versavisual.com.br` quanto `www.versavisual.com.br`) em:
   - `src/lib/seo.tsx`: atualizar `SITE_URL = "https://versavisual.com.br"` (ou extrair via variável de ambiente/configuração consistente).
   - `scripts/emit-route-html.mjs`: ajustar a validação de origem para aceitar as URLs de `public/sitemap.xml` (ex: comparar `url.hostname.replace(/^www\./, "") === "versavisual.com.br"` ou `url.origin === siteUrl || url.origin === "https://versavisual.com.br"`).
2. Executar `npm run build` e confirmar que a saída exibe a emissão de todas as rotas (ex: `"Emitted 26 route HTML files."`) e que diretórios como `dist/portfolio/index.html` e `dist/ativacoes-eventos/index.html` são gerados com sucesso.
3. Executar `npx tsx tests/adversarial-m2.ts` e verificar 100% de aprovação (114/114).

---

## 5. Verification Method

Para reproduzir e verificar de forma independente:

1. **Executar a suíte de testes adversariais:**
   ```bash
   npx tsx tests/adversarial-m2.ts
   ```
   *Falha esperada atualmente nos testes de consistência de domínio e emissão estática.*

2. **Executar o build de produção e inspecionar a saída:**
   ```bash
   npm run build
   ```
   *Verificar se exibe `Emitted 0 route HTML files.` e se pastas de rota em `dist/` estão ausentes.*
