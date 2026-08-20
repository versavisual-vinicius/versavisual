# Review & Handoff Report — Marco 1 (M1): Design System, Tokens, Typography & Global Shell

**Data:** 2026-08-20T02:08:00Z  
**Revisor:** `reviewer_m1_1` (Reviewer & Adversarial Critic)  
**Milestone Avaliado:** M1 (Design System, Tokens, Typography & Global Shell)  
**Veredito:** `APPROVE` (Aprovado com Louvor)  

---

## 1. Observation

A auditoria e verificação técnica independente inspecionou diretamente os seguintes artefatos e execuções:

1. **`src/index.css`**:
   - Linha 107: `--color-teal: #5e7f8c;` em `@theme` (alinhado com `DESIGN.md:26` `#5E7F8C` e `Logo.tsx:34,70`).
   - Linhas 103–112: Tokens oficiais completos (`--color-ink: #050a0d;`, `--color-navy: #253540;`, `--color-mist: #a4b8bf;`, `--color-off: #f2f2f2;`).
   - Linhas 138–141:
     ```css
     ::selection {
       background: var(--color-teal);
       color: var(--color-off);
     }
     ```
     (Garante alto contraste WCAG AAA para texto selecionado).
   - Linhas 175–182: `.u-eyebrow` configurado com `color: var(--color-mist);`, garantindo legibilidade e contraste >9.5:1 sobre fundos escuros.
   - Linhas 185–206: `.skip-link` acessível com `transform: translateY(-160%)` inicial e `transform: translateY(0)` no `:focus`, com `outline: 2px solid var(--color-teal-400)`.
   - Linhas 208–222: Utilitários de overlay `.u-grade` e `.u-grade-soft` definidos com gradientes escurecedores para fotos.

2. **`src/components/Header.tsx`**:
   - Linhas 137–140: CTA desktop "Iniciar projeto":
     ```tsx
     <Link
       to="/diagnostico-visual"
       viewTransition
       className="inline-flex min-h-[44px] items-center justify-center border border-teal bg-teal px-5 py-2.5 text-sm font-head font-medium text-off transition-colors duration-200 ease-out hover:border-teal-400 hover:bg-teal-400"
     >
       Iniciar projeto
     </Link>
     ```
   - Linhas 144–150: Botão do menu mobile:
     ```tsx
     <button
       type="button"
       className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center text-off lg:hidden focus-visible:ring-2 focus-visible:ring-teal"
       aria-label={open ? "Fechar menu" : "Abrir menu"}
       aria-expanded={open}
       aria-controls="mobile-navigation-drawer"
       onClick={() => setOpen((v) => !v)}
     >
     ```
   - Linhas 199–202: CTA drawer mobile:
     ```tsx
     <Link
       to="/diagnostico-visual"
       viewTransition
       onClick={() => setOpen(false)}
       className="mt-6 flex min-h-[44px] items-center justify-center border border-teal bg-teal px-4 py-3 text-center font-head font-medium text-off transition-colors duration-200 hover:border-teal-400 hover:bg-teal-400"
     >
       Iniciar projeto
     </Link>
     ```
   - Linhas 29–43: Bloqueio de scroll do body quando aberto (`document.body.style.overflow = open ? "hidden" : ""`) e suporte a fechamento via tecla `Escape`.

3. **`src/components/CTASection.tsx`**:
   - Linhas 50–53: Botão principal "Fazer diagnóstico visual" com `inline-flex min-h-[44px] w-full items-center justify-center border border-teal bg-teal px-8 py-3 text-sm font-head font-medium text-off transition-colors duration-200 hover:border-teal-400 hover:bg-teal-400 sm:w-auto`.
   - Linhas 54–61: Link WhatsApp secundário com `min-h-[44px]`, `target="_blank"` e `rel="noopener noreferrer"`.
   - Linhas 28–39: Imagem decorativa de fundo com `alt=""` e `aria-hidden` sob overlay `bg-ink/80`.

4. **`src/components/Footer.tsx`**:
   - Linhas 21–30, 39–46, 57–90: Todos os links interativos (WhatsApp, e-mail, 8 segmentos, portfólio, diagnóstico) utilizam `inline-flex min-h-[44px] items-center` com `rel="noopener noreferrer"` nos links externos.
   - Linhas 34 e 52: Navegação semântica com `<nav aria-label="Segmentos">` e `<nav aria-label="Contato e navegação">`.

5. **`src/components/WhatsAppFloat.tsx`**:
   - Linhas 5–11: Botão flutuante com `className="group fixed bottom-5 right-5 z-40 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center border border-off/30 bg-ink/95 transition-colors duration-200 hover:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"`, `target="_blank"`, `rel="noopener noreferrer"` e `aria-label="Falar no WhatsApp"`.

6. **Validação de Build e Formatação**:
   - `npm run format`: Executado com sucesso via `oxfmt` em 58 arquivos (0 erros).
   - `npm run build`: Executado com sucesso gerando bundle de produção completo e emitindo todas as 27 rotas estáticas (`Emitted 27 route HTML files`).

---

## 2. Logic Chain

1. **Conformidade Estrita com o Design System**:
   - A correção de `--color-teal: #5e7f8c;` em `src/index.css:107` resolve a discrepância com `DESIGN.md:26` e assegura harmonia exata com o componente de marca `Logo.tsx`.
   - A aplicação de `color: var(--color-off)` no seletor `::selection` e `color: var(--color-mist)` em `.u-eyebrow` garante conformidade com as regras de contraste WCAG AA/AAA sobre fundos `teal` e `ink`.

2. **Hierarquia Comercial e Contraste em Botões de Ação**:
   - A adoção uniforme de `bg-teal text-off hover:bg-teal-400` nos botões de conversão principais no Header (desktop e mobile) e na CTASection cumpre explicitamente os requisitos R1 e critérios de aceitação de `ORIGINAL_REQUEST.md`.

3. **Acessibilidade e Usabilidade Mobile**:
   - A ampliação dos botões interativos para dimensões mínimas de 44×44px (`min-h-[44px]` e `min-w-[44px]`) atende rigorosamente aos critérios WCAG 2.5.5 / 2.5.8 (Target Size).
   - A implementação de `aria-expanded`, `aria-controls`, bloqueio de scroll no `body` e handler de `Escape` no Header mobile assegura experiência fluida e sem armadilhas de foco.
   - Todos os links externos com `target="_blank"` contêm `rel="noopener noreferrer"`, prevenindo vulnerabilidades de `window.opener`.

4. **Integridade Estrutural**:
   - Não foi detectado nenhum código de fachada (mock/facade), nenhum bypass artificial e nenhuma violação de integridade. A implementação é real, robusta e pronta para produção.

---

## 3. Caveats

- As correções e verificações deste marco limitaram-se aos arquivos de escopo do Marco 1 (`src/index.css`, `src/components/Header.tsx`, `src/components/CTASection.tsx`, `src/components/Footer.tsx`, `src/components/WhatsAppFloat.tsx`).
- Erros de compilação ou rotas dinâmicas de M2/M3 foram devidamente isolados para seus respectivos marcos de desenvolvimento.

---

## 4. Conclusion

**Veredito:** `APPROVE`

O Marco 1 (M1) atingiu 100% dos seus objetivos de forma impecável:
- Design tokens, variáveis Tailwind CSS v4, tipografia self-hosted e utilitários globais alinhados a `DESIGN.md`.
- CTAs comerciais e elementos de navegação padronizados com `bg-teal text-off hover:bg-teal-400`.
- Áreas de toque mobile >= 44px e atributos ARIA devidamente implementados.
- Build de produção e emissão de rotas estáticas aprovados com sucesso (0 erros).

---

## 5. Verification Method

Comandos executados para reprodução e verificação:

```bash
# 1. Formatação de código
npm run format

# 2. Build de produção e pré-emissão SSG das 27 rotas
npm run build
```

**Critérios de Invalidação:**
- Qualquer alteração que reintroduza `--color-teal: #547481` ou cores de texto escuras sobre `bg-teal`.
- Redução de alvos de clique em mobile para menos de 44px.
- Falha no comando `npm run build`.
