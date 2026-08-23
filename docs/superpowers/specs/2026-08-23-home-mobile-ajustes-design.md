# Home Mobile Ajustes Design

## Objetivo

Reduzir o comprimento e a densidade da home em telas mobile, preservando a composicao desktop e mantendo servicos, galerias, assets e rotas existentes disponiveis em seus destinos atuais.

## Escopo

### Hero

- Em telas abaixo de `sm` (640px), o video ocupa um bloco proprio e todo o conteudo textual do hero aparece em uma faixa escura imediatamente abaixo dele.
- A partir de `sm`, o hero continua full-bleed, com texto e CTAs sobre o video e altura minima de `88svh`.
- O video preserva `autoPlay`, `loop`, `muted`, `playsInline`, `preload="auto"`, fontes WebM/MP4 e ausencia de `poster`.

### Servicos

- Em telas abaixo de `sm`, os seis cards deixam de ser exibidos individualmente e sao substituidos por dois grupos expansivos, fechados por padrao.
- `Fotografia` contem `Cobertura de eventos` e `Direcao`.
- `Video` contem `Direcao`, `Roteiro`, `Videomaking`, `Storymaking` e `Cobertura de eventos`.
- O controle usa semantica nativa de disclosure, e navegavel por teclado e tem alvo de toque minimo de 44px.
- A partir de `sm`, o grid atual de seis cards e seu hover permanecem inalterados.

### Prova social

- As quatro metricas passam a ser exibidas em um banner horizontal continuo, em loop, em todos os breakpoints.
- A duplicacao visual necessaria ao loop fica oculta de tecnologias assistivas; uma lista unica continua disponivel para leitores de tela.
- `prefers-reduced-motion: reduce` interrompe a animacao sem ocultar o conteudo.
- A implementacao usa CSS e os dados `HOME_STATS`, sem dependencia nova.

### Escolha seu contexto

- Em telas abaixo de `sm`, a secao mostra um seletor compacto em duas colunas, sem imagens, com os oito contextos e links para `/${segment.slug}`.
- A partir de `sm`, os cards fotograficos atuais permanecem visiveis.
- Nenhuma rota nova e criada. Os destinos continuam sendo as paginas de segmento existentes, que preservam galerias, cases e conteudo.

## Limites

- Nao excluir galerias, assets, segmentos, cases ou rotas.
- Nao alterar `SegmentPage`, `Gallery`, `PortfolioGrid` ou o roteamento.
- Nao adicionar dependencia.
- Nao realizar redesign geral, alterar copy institucional fora dos agrupamentos solicitados ou reintroduzir poster no hero.

## Validacao

- Testes automatizados devem cobrir os agrupamentos, o comportamento responsivo declarado no markup, o loop com fallback de movimento reduzido e os links canonicos dos oito contextos.
- Executar `node --experimental-strip-types tests/run-all.ts`, `npm run format`, `npm run build` e `21st review` nos arquivos alterados.
- Verificar visualmente a home em 390x844, 430x932 e desktop, incluindo ausencia de overflow horizontal, ordem video-copy no mobile, disclosure por teclado e destinos dos contextos.
