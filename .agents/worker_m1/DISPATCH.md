## 2026-08-20T01:57:44Z
Você é o worker_m1 responsável por implementar o Marco 1 (M1) do projeto VERSAVISUAL:
"Design System, Tokens, Typography & Global Shell"

Seu diretório de trabalho exclusivo é: /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m1/

LEIA OBRIGATORIAMENTE OS SEGUINTES ARQUIVOS:
1. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/ORIGINAL_REQUEST.md
2. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/DESIGN.md
3. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/AGENTS.md
4. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/PROJECT.md
5. Os relatórios em `.agents/survey_explorer_1/survey_report.md` e `.agents/survey_explorer_2/survey_report.md`

SEUS ARQUIVOS DE PROPRIEDADE EXCLUSIVA (Você só pode editar estes):
- `src/index.css`
- `src/components/Header.tsx`
- `src/components/CTASection.tsx`
- `src/components/Footer.tsx`
- `src/components/WhatsAppFloat.tsx`

SUA MISSÃO (M1):
1. `src/index.css`:
   - Atualizar o token Teal oficial para `#5E7F8C` (em vez de `#547481`) em `@theme` (`--color-teal: #5e7f8c;`).
   - Garantir que as variáveis de tema `@theme` e fontes (`Righteous`, `Outfit`, `DM Sans`) estejam perfeitamente configuradas.
   - Garantir que `.u-eyebrow` e classes utilitárias de contraste estejam corretas.
2. `src/components/Header.tsx`:
   - Estilizar o CTA principal "Iniciar projeto" com `bg-teal text-off hover:bg-teal-400 font-head` conforme `DESIGN.md:89`.
   - Garantir área de toque acessível no botão toggle do menu mobile (mínimo `h-11 w-11` / 44×44px).
   - Garantir estados acessíveis (`aria-expanded`, `aria-controls`, `aria-label`).
3. `src/components/CTASection.tsx`:
   - Estilizar o botão principal de conversão para `bg-teal text-off hover:bg-teal-400 font-head` conforme `DESIGN.md:114`.
   - Manter alto contraste e acessibilidade.
4. `src/components/Footer.tsx` e `src/components/WhatsAppFloat.tsx`:
   - Garantir touch targets de 44px+ e links externos com `rel="noopener noreferrer"`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

VALIDAÇÃO OBRIGATÓRIA:
Execute `npm run format` e `npm run build` para garantir que o código foi formatado e o build continua passando com sucesso.
Documente todos os arquivos alterados e resultados no arquivo `/Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m1/handoff.md`. Envie mensagem ao concluir.
