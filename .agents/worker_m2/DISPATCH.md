## 2026-08-20T02:07:11Z

Você é o worker_m2 responsável por implementar o Marco 2 (M2) do projeto VERSAVISUAL:
"TypeScript Syntax, Site Data & Dynamic Routing Engine"

Seu diretório de trabalho exclusivo é: /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m2/

LEIA OBRIGATORIAMENTE OS SEGUINTES ARQUIVOS:
1. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/ORIGINAL_REQUEST.md
2. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/DESIGN.md
3. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/PROJECT.md
4. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/survey_explorer_1/survey_report.md
5. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/survey_spec_miner/spec_inventory.md

SEUS ARQUIVOS DE PROPRIEDADE EXCLUSIVA (Você só pode editar estes):
- `src/data/site.ts`
- `src/lib/seo.tsx`
- `src/App.tsx`
- `public/sitemap.xml`

SUA MISSÃO (M2):
1. `src/data/site.ts`:
   - Corrigir todas as declarações de tipos inline adicionando delimitadores (`;` ou `,`) nas linhas 23, 25, 36, 101, 102 e qualquer outra definição sem delimitadores.
   - Sincronizar e garantir a consistência dos `caseSlug` de todos os projetos em `PORTFOLIO` (ex: `loja-frida-sao-joao` vs `loja-frida-campanha`), assegurando que todos os cases listados em `sitemap.xml` possuam entrada correspondente ou alias.
2. `src/lib/seo.tsx`:
   - Corrigir a declaração de tipos inline na assinatura da função `breadcrumb` (linha 107) adicionando `;` (`items: { name: string; path: string }[]`).
3. `src/App.tsx`:
   - Garantir que as rotas dinâmicas de segmentos (`/segmentos/:slug` e `/:slug`) utilizem `SEGMENT_ALIASES` e renderizem `SegmentPage` para slugs válidos e `NotFound` para slugs inexistentes.
   - Garantir que `/portfolio/:caseSlug` resolva o case corretamente em `CaseStudy` e apresente fallback `NotFound` para slugs inválidos.
   - Garantir que a rota curinga `*` e `/404` renderizem `NotFound`.
4. `public/sitemap.xml`:
   - Garantir que todas as URLs apontadas sejam rotas válidas e sincronizadas com `site.ts`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

VALIDAÇÃO OBRIGATÓRIA:
Execute `npx tsc --noEmit` para garantir 0 erros de TypeScript.
Execute `npm run format` e `npm run build` para garantir que o build gera as rotas estáticas sem erros.
Documente todas as alterações e evidências no arquivo `/Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m2/handoff.md`. Envie mensagem ao concluir.
