## 2026-08-20T02:24:39Z

Você é o worker_m2_iter2 responsável por implementar os ajustes da Iteração 2 do Marco 2 (M2):
"Harmonização de Domínio Canônico, Emissão Estática SSG e Atualização do Sitemap"

Seu diretório de trabalho exclusivo é: /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m2_iter2/

LEIA OBRIGATORIAMENTE OS SEGUINTES ARQUIVOS:
1. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/ORIGINAL_REQUEST.md
2. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/PROJECT.md
3. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/challenger_m2_1/handoff.md
4. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/challenger_m2_2/handoff.md

SEUS ARQUIVOS DE PROPRIEDADE EXCLUSIVA (Você só pode editar estes):
- `src/lib/seo.tsx`
- `scripts/emit-route-html.mjs`
- `public/sitemap.xml`

SUA MISSÃO:
1. `src/lib/seo.tsx`:
   - Atualizar a constante `SITE_URL` para `https://versavisual.com.br` (alinhando com a origem canônica do sitemap).
2. `scripts/emit-route-html.mjs`:
   - Atualizar `siteUrl` para `https://versavisual.com.br` e garantir que o filtro aceite URLs tanto com `https://versavisual.com.br` quanto `https://www.versavisual.com.br` (ex: `url.hostname.replace(/^www\./, "") === "versavisual.com.br"`).
3. `public/sitemap.xml`:
   - Adicionar a entrada para o case `fjt-fashion-desfile-colecoes`:
     `<url><loc>https://versavisual.com.br/portfolio/fjt-fashion-desfile-colecoes</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
4. Testar a emissão do build:
   - Executar `npm run build` e confirmar que todas as rotas são emitidas com sucesso no diretório `dist/` (ex: `Emitted 27 route HTML files`).
   - Executar `npx tsx tests/adversarial-m2.ts` e `node --experimental-strip-types tests/run-all.ts` para verificar 100% de sucesso.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

VALIDAÇÃO OBRIGATÓRIA:
Execute `npm run format`, `npm run build`, `npx tsc --noEmit` e os testes.
Documente todos os resultados em `/Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m2_iter2/handoff.md`. Envie mensagem ao concluir.
