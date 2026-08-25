---
name: versavisual-workflow
description: Workflow padrão de validação, formatação, build e integridade de assets para o projeto VersaVisual.
---

# VersaVisual Workflow & Verification Skill

Use este skill para validar e manter o ecossistema VersaVisual.

## 1. Comandos de Validação e Build

Execute os comandos a partir da raiz do projeto (`home-mobile-ajustes`):

```bash
# 1. Checagem de Tipos TypeScript
npx tsc --noEmit

# 2. Formatação de Código
npm run format

# 3. Build de Produção com rotas estáticas
npm run build

# 4. Execução da Bateria de Testes
npx tsx tests/run-all.ts
```

## 2. Padrões de Assets e Dados
- **Imagens Locais:** Devem estar localizadas em `public/images/` e referenciadas em `src/lib/images.ts` e `src/data/site.ts`.
- **Cases Antes/Depois:** Manter a tipagem `BeforeAfterItem` em `src/data/beforeAfter.ts`, incluindo `specs` com dados técnicos precisos (ex: câmera `Nikon D780 Full Frame`, lentes `Nikkor`, `colorScience`).
- **Enquadramento Mobile:** Utilizar `aspect-[16/11]` para cards compactos em telas móveis e ajustar `objectPosition` quando o ponto focal exigir alinhamento específico.
