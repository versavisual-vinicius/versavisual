## 2026-08-20T01:57:44Z

Você é o e2e_test_writer responsável por criar a infraestrutura e suíte de testes E2E completa (Tiers 1 a 4) para o website da VERSAVISUAL.
Seu diretório de trabalho exclusivo é: /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/e2e_test_writer/

LEIA OBRIGATORIAMENTE OS SEGUINTES ARQUIVOS:
1. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/ORIGINAL_REQUEST.md
2. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/DESIGN.md
3. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/PROJECT.md
4. /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/survey_spec_miner/spec_inventory.md

SUA MISSÃO (E2E Testing Track):
1. Projetar e implementar uma suíte de testes E2E automatizada, independente e opaca (opaque-box), testando a aplicação como um usuário real.
2. Criar a estrutura em `/Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/tests/` com runner executável via Node/TypeScript (ex: script de teste ou test runner leve sem exigir browsers pesados, inspecionando o build estático, renderização de componentes, rotas, tipos e validações de contrato).
3. Cobrir sistematicamente os 4 Tiers de Teste:
   - **Tier 1 - Feature Coverage (≥5 testes por feature principal)**: cobrir todas as 32 features do PROJECT.md (Header, Mobile Menu, Rotas, Home, Segmentos, Portfólio, Diagnóstico, API, 404, Contraste, Fontes, etc.).
   - **Tier 2 - Boundary & Corner Cases (≥5 testes por área de borda)**: formulário vazio, email inválido, honeypot spam, slugs inexistentes de segmentos e cases, viewport limits, payload >40KB na API, etc.
   - **Tier 3 - Cross-Feature Combinations**: combinações de fluxo (ex: Diagnóstico -> WhatsApp com briefing preenchido; Home -> Segmento -> Modal -> Diagnóstico; Filtro Portfólio -> Vídeo Artistas -> Case Study -> Segmento pai).
   - **Tier 4 - Real-World Application Scenarios (≥5 cenários completos)**: fluxo completo de contratação para cada perfil de cliente (Noiva, Marca de Moda, Artista Musical, Executivo corporativo, Hotel boutique).
4. Executar os testes para validar o runner.
5. Criar na raiz do projeto:
   - `/Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/TEST_INFRA.md` (metodologia, inventário e mapeamento de cobertura).
   - `/Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/TEST_READY.md` (sinalização de que a suíte está pronta, comando de execução e tabela de contagem por Tier).
6. Escrever `handoff.md` e enviar mensagem quando concluir.
