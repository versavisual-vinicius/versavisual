## 2026-08-19T23:31:00Z
Você é o worker_m3 responsável por implementar e consolidar o Marco 3 (M3) do projeto VERSAVISUAL:
"Interactive Pages, Components & Conversion Flow"

Seu diretório de trabalho exclusivo é: /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m3/

LEIA OBRIGATORIAMENTE OS SEGUINTES ARQUIVOS:
1. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/ORIGINAL_REQUEST.md
2. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/DESIGN.md
3. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/PROJECT.md
4. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/survey_spec_miner/spec_inventory.md

SEUS ARQUIVOS DE PROPRIEDADE EXCLUSIVA (Você só pode editar estes):
- `src/pages/Home.tsx`
- `src/pages/Portfolio.tsx`
- `src/pages/SegmentPage.tsx`
- `src/pages/CaseStudy.tsx`
- `src/pages/Diagnostico.tsx`
- `src/pages/NotFound.tsx`
- `src/components/PortfolioGrid.tsx`
- `src/components/Gallery.tsx`
- `src/components/ui/shared-element-gallery.tsx`
- `src/components/FAQAccordion.tsx`
- `src/components/ServiceGrid.tsx`

SUA MISSÃO (M3):
1. `src/pages/Home.tsx`:
   - Assegurar que o `<video>` do Hero possua `poster="/images/foto-a-producao-nao-falha.webp"`, `autoPlay`, `loop`, `muted`, `playsInline` e overlay `u-grade`.
   - Garantir proporções dos cards de segmentos com `aspect-[16/11]` no mobile e `sm:aspect-[3/4]` em desktop.
   - Garantir que todos os botões de ação utilizem `bg-teal text-off hover:bg-teal-400 font-head` com touch targets de 44px+.
2. `src/pages/Portfolio.tsx` e `src/components/PortfolioGrid.tsx`:
   - Garantir `role="tablist"` e `aria-selected` nas abas de filtro com transição suave `u-fade-in`.
   - Garantir que o banner de vídeo seja exibido ao selecionar o filtro "Artistas & Videoclipes".
   - Garantir que todos os cards com `caseSlug` naveguem para `/portfolio/:caseSlug`.
3. `src/pages/SegmentPage.tsx`:
   - Assegurar que o modal de detalhes de serviço possua botão fechar com área de toque mínima de 44×44px (`h-11 w-11` ou padding acessível) e `aria-modal="true"`.
   - Garantir que todas as 8 landing pages de segmento renderizem com alta fidelidade visual, FAQ accordion e cases relacionados.
4. `src/pages/CaseStudy.tsx` e `src/components/ui/shared-element-gallery.tsx`:
   - Assegurar que a galeria lightbox suporte tela cheia com portal, fechamento por `Escape`, clique no backdrop e gesto drag-to-dismiss com bloqueio de scroll do body.
5. `src/pages/Diagnostico.tsx`:
   - Garantir validação client-side estrita (campos obrigatórios e regex de e-mail), honeypot anti-spam (`_gotcha`), estado de carregamento com spinner e anúncio acessível `aria-live="polite"`.
   - Garantir tela de confirmação de sucesso gerando link formatado com todos os dados do briefing para o WhatsApp (`https://wa.me/5511950747192?text=...`).
6. `src/pages/NotFound.tsx`:
   - Assegurar navegação de recuperação e links para todos os 8 segmentos.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

VALIDAÇÃO OBRIGATÓRIA:
Execute `npx tsc --noEmit`, `npm run format`, `npm run build` e a suíte `node --experimental-strip-types tests/run-all.ts` (196 testes).
Documente todas as alterações e evidências em `/Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m3/handoff.md`. Envie mensagem ao concluir.
