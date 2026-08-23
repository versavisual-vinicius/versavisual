# Home Mobile Ajustes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar a home mobile mais curta e progressiva sem alterar o comportamento desktop nem remover conteudo ou destinos existentes.

**Architecture:** Os agrupamentos mobile de servicos ficam em `src/data/site.ts` e sao consumidos opcionalmente pelo `ServiceGrid`, que preserva seu grid desktop. A home usa variantes responsivas no mesmo markup para separar video e copy, trocar cards fotograficos por links compactos no mobile e transformar `HOME_STATS` em marquee CSS acessivel.

**Tech Stack:** React 19, TypeScript 5.7, React Router 7, Tailwind CSS v4, Lucide React, CSS nativo e runner de testes Node existente.

**Spec:** `docs/superpowers/specs/2026-08-23-home-mobile-ajustes-design.md`

## Global Constraints

- O breakpoint entre mobile e desktop e `sm` (640px).
- Nao excluir galerias, assets, segmentos, cases ou rotas.
- Nao alterar `SegmentPage`, `Gallery`, `PortfolioGrid` ou `src/App.tsx`.
- Nao adicionar dependencia.
- Preservar o hero desktop full-bleed com copy sobre o video.
- Preservar `autoPlay`, `loop`, `muted`, `playsInline`, `preload="auto"`, WebM/MP4 e ausencia de `poster` no hero.
- Preservar o grid desktop atual de seis servicos e os cards fotograficos desktop dos oito segmentos.
- Todo controle mobile deve ter foco visivel e alvo de toque minimo de 44px.
- `prefers-reduced-motion: reduce` deve interromper o loop da prova social.

---

### Task 1: Agrupamentos progressivos de servicos no mobile

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/components/ServiceGrid.tsx`
- Modify: `tests/tier1/tier1_home_components.test.ts`

**Interfaces:**
- Consumes: `Service` e `HOME_SERVICES` existentes.
- Produces: `ServiceGroup`, `HOME_SERVICE_GROUPS` e prop opcional `mobileGroups?: readonly ServiceGroup[]` em `ServiceGrid`.

- [ ] **Step 1: Escrever testes que falham para os grupos e o disclosure mobile**

Adicionar assercoes que importem `HOME_SERVICE_GROUPS` e exijam exatamente:

```ts
expect(HOME_SERVICE_GROUPS).toEqual([
  {
    title: "Fotografia",
    items: ["Cobertura de eventos", "Direção"],
  },
  {
    title: "Vídeo",
    items: [
      "Direção",
      "Roteiro",
      "Videomaking",
      "Storymaking",
      "Cobertura de eventos",
    ],
  },
])
expect(serviceGridCode).toContain("<details")
expect(serviceGridCode).toContain("<summary")
expect(serviceGridCode).toContain("sm:hidden")
expect(serviceGridCode).toContain("hidden sm:grid")
expect(serviceGridCode).toContain("min-h-[44px]")
```

- [ ] **Step 2: Executar o teste e confirmar RED**

Run: `node --experimental-strip-types tests/run-all.ts`

Expected: FAIL porque `HOME_SERVICE_GROUPS` e o disclosure ainda nao existem.

- [ ] **Step 3: Adicionar o modelo de dados exato**

Em `src/data/site.ts`, adicionar:

```ts
export type ServiceGroup = {
  title: string
  items: readonly string[]
}

export const HOME_SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    title: "Fotografia",
    items: ["Cobertura de eventos", "Direção"],
  },
  {
    title: "Vídeo",
    items: [
      "Direção",
      "Roteiro",
      "Videomaking",
      "Storymaking",
      "Cobertura de eventos",
    ],
  },
]
```

- [ ] **Step 4: Implementar o disclosure mobile e preservar o grid desktop**

Atualizar a assinatura para:

```ts
type ServiceGridProps = {
  items: Service[]
  mobileGroups?: readonly ServiceGroup[]
}
```

Quando `mobileGroups` existir, renderizar antes do grid um bloco `sm:hidden` com um `<details>` por grupo, `<summary>` com `min-h-[44px]`, titulo, quantidade de itens e `ChevronDown`. Dentro, renderizar uma lista ordenada visualmente com os nomes recebidos. O grid existente deve receber `hidden sm:grid`; sem `mobileGroups`, deve manter o comportamento atual em todos os breakpoints.

- [ ] **Step 5: Executar testes, formatar e confirmar GREEN**

Run: `node --experimental-strip-types tests/run-all.ts`

Expected: 200 testes mais os novos testes passando.

Run: `npm run format -- src/data/site.ts src/components/ServiceGrid.tsx tests/tier1/tier1_home_components.test.ts`

- [ ] **Step 6: Commit**

```bash
git add src/data/site.ts src/components/ServiceGrid.tsx tests/tier1/tier1_home_components.test.ts
git commit -m "feat: group home services on mobile"
```

### Task 2: Hero responsivo, prova social em loop e seletor compacto

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/index.css`
- Modify: `tests/tier1/tier1_home_components.test.ts`

**Interfaces:**
- Consumes: `HOME_SERVICE_GROUPS` produzido na Task 1, alem de `HOME_STATS`, `SEGMENTS`, `segmentImageAlt` e as rotas `/${s.slug}` existentes.
- Produces: composicao responsiva final da home e classes CSS `.u-marquee-track`/`vv-marquee`.

- [ ] **Step 1: Escrever testes que falham para os quatro comportamentos da home**

Adicionar assercoes que exijam:

```ts
expect(homeCode).toContain("HOME_SERVICE_GROUPS")
expect(homeCode).toContain("mobileGroups={HOME_SERVICE_GROUPS}")
expect(homeCode).toContain("sm:min-h-[88svh]")
expect(homeCode).toContain("sm:absolute sm:inset-0")
expect(homeCode).toContain("sm:bg-transparent")
expect(homeCode).toContain("u-marquee-track")
expect(homeCode).toContain('aria-hidden="true"')
expect(cssCode).toContain("@keyframes vv-marquee")
expect(cssCode).toContain("prefers-reduced-motion: reduce")
expect(cssCode).toContain(".u-marquee-track")
expect(homeCode).toContain("sm:hidden")
expect(homeCode).toContain("hidden sm:grid")
expect(homeCode).toContain("to={`/${s.slug}`}")
```

Remover ou atualizar as assercoes antigas que obrigam o grid de segmentos a usar cards fotograficos no mobile; manter as assercoes que protegem os cards fotograficos a partir de `sm`.

- [ ] **Step 2: Executar o teste e confirmar RED**

Run: `node --experimental-strip-types tests/run-all.ts`

Expected: FAIL porque as variantes responsivas, o marquee e a integracao dos grupos ainda nao existem.

- [ ] **Step 3: Reestruturar o hero com um unico bloco de copy**

Manter um unico `<section>` e um unico conjunto de texto/CTAs. No mobile, usar um wrapper de video com `h-[62svh] min-h-[440px] max-h-[620px]` e um bloco de copy `bg-ink px-5 py-10`; em `sm+`, transformar o video em `sm:absolute sm:inset-0 sm:h-full`, o section em `sm:flex sm:min-h-[88svh] sm:items-end` e o bloco de copy em `sm:bg-transparent` com os paddings desktop atuais. Mostrar `u-grade` apenas em `sm+` para contraste do texto sobre o video.

- [ ] **Step 4: Integrar os grupos no ServiceGrid**

Importar `HOME_SERVICE_GROUPS` e usar:

```tsx
<ServiceGrid items={HOME_SERVICES} mobileGroups={HOME_SERVICE_GROUPS} />
```

- [ ] **Step 5: Substituir o grid de metricas pelo banner continuo acessivel**

Renderizar uma lista unica `sr-only` a partir de `HOME_STATS`. Para a camada visual, renderizar dois grupos identicos dentro de `.u-marquee-track`, com o container visual marcado `aria-hidden="true"`. Cada metrica deve manter valor e label; os grupos devem usar `shrink-0` e largura de conteudo para o loop nao saltar.

Em `src/index.css`, adicionar:

```css
.u-marquee-track {
  display: flex;
  width: max-content;
  animation: vv-marquee 24s linear infinite;
  will-change: transform;
}

@keyframes vv-marquee {
  to { transform: translateX(-50%); }
}
```

Dentro do media query de movimento reduzido, definir `.u-marquee-track { animation: none; transform: none; }`.

- [ ] **Step 6: Criar o seletor mobile usando as rotas existentes**

Antes do grid fotografico, renderizar um `nav` `sm:hidden` com `aria-label="Escolha seu contexto"`, grid de duas colunas e um `Link` por `SEGMENTS`, contendo indice, `s.nav` e `ArrowUpRight`. Cada link deve ter `min-h-[64px]` e `to={`/${s.slug}`}`. Alterar o grid fotografico atual para `hidden sm:grid`; manter imagem, `segmentImageAlt(s)`, overlay e hover sem mudancas funcionais.

- [ ] **Step 7: Executar testes, formatar e build**

Run: `node --experimental-strip-types tests/run-all.ts`

Expected: todos os testes passando.

Run: `npm run format -- src/pages/Home.tsx src/index.css tests/tier1/tier1_home_components.test.ts`

Run: `npm run build`

Expected: build Vite concluido e 42 rotas HTML emitidas.

- [ ] **Step 8: Commit**

```bash
git add src/pages/Home.tsx src/index.css tests/tier1/tier1_home_components.test.ts
git commit -m "feat: shorten and simplify mobile home"
```

### Task 3: Validacao visual e de interacao

**Files:**
- Modify only if a defect is found: `src/pages/Home.tsx`, `src/components/ServiceGrid.tsx`, `src/index.css`, `tests/tier1/tier1_home_components.test.ts`

**Interfaces:**
- Consumes: a home completa das Tasks 1 e 2.
- Produces: evidencia visual e correcoes estritamente necessarias para cumprir a spec.

- [ ] **Step 1: Executar a revisao automatica de UI**

Run: `21st review src/pages/Home.tsx src/components/ServiceGrid.tsx src/index.css`

Expected: nenhuma falha critica de acessibilidade, responsividade ou consistencia com os tokens do projeto.

- [ ] **Step 2: Verificar a home em 390x844 e 430x932**

Confirmar visualmente: video antes da copy; copy e CTAs fora do video; dois disclosures fechados por padrao; pagina sem overflow horizontal; metricas em banner; oito contextos em seletor compacto; nenhum grid fotografico de segmentos no mobile.

- [ ] **Step 3: Verificar desktop em largura minima de 1280px**

Confirmar visualmente: hero full-bleed com copy sobre o video; grid de seis servicos; banner de metricas; oito cards fotograficos de segmentos; links e hover preservados.

- [ ] **Step 4: Verificar teclado e movimento reduzido**

Usar Tab/Enter para abrir os disclosures e seguir links do seletor. Em `prefers-reduced-motion: reduce`, confirmar que as metricas permanecem legiveis e sem animacao.

- [ ] **Step 5: Corrigir somente defeitos reproduzidos, com teste RED antes da correcao**

Para cada defeito encontrado, adicionar uma assercao especifica em `tests/tier1/tier1_home_components.test.ts`, executar a suite para observar a falha, aplicar a menor correcao e executar novamente a suite e o build.

- [ ] **Step 6: Commit da validacao se houver correcoes**

```bash
git add src/pages/Home.tsx src/components/ServiceGrid.tsx src/index.css tests/tier1/tier1_home_components.test.ts
git commit -m "fix: refine responsive home interactions"
```
