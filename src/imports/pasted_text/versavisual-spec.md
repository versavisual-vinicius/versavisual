# VERSAVISUAL - mapa do site e development spec

Este documento consolida a estrutura pública atual do site para reconstrução: rotas, seções, textos, CTAs, botões, formulários, fluxos e requisitos de implementação.

## 1. Escopo rastreado

| Rota | Status | Title atual | Links | Botões/interações | Inputs |
|---|---:|---|---:|---:|---:|
| `/` | 200 | VERSAVISUAL \| Fotografia, Vídeo e Storymaking para Marcas | 33 | 1 | 0 |
| `/ativacoes-eventos` | 200 | Cobertura Audiovisual para Ativações de Marca e Eventos Corporativos \| VERSAVISUAL \| VERSAVISUAL | 25 | 138 | 0 |
| `/portfolio` | 200 | Portfólio Audiovisual \| Ativações, Moda, Casamentos, Gestantes e Hotelaria \| VERSAVISUAL \| VERSAVISUAL | 22 | 37 | 0 |
| `/diagnostico-visual` | 200 | Diagnóstico Visual Gratuito \| VERSAVISUAL | 21 | 2 | 17 |
| `/moda-campanhas` | 200 | Fotógrafo de Moda, Beauty e Campanhas para Marcas \| VERSAVISUAL \| VERSAVISUAL | 25 | 59 | 0 |
| `/artistas-videoclipes` | 200 | Direção e Produção Audiovisual para Artistas, Shows e Videoclipes \| VERSAVISUAL \| VERSAVISUAL | 25 | 30 | 0 |
| `/posicionamento-profissional` | 200 | Fotografia de Posicionamento para Profissionais, Clínicas e Marcas Pessoais \| VERSAVISUAL \| VERSAVISUAL | 25 | 70 | 0 |
| `/imagem-pessoal-lifestyle` | 200 | Ensaio Fotográfico Lifestyle e Imagem Pessoal para Instagram \| VERSAVISUAL | 25 | 80 | 0 |
| `/casamentos` | 200 | Fotografia e Vídeo de Casamento com Direção Sensível \| VERSAVISUAL \| VERSAVISUAL | 25 | 31 | 0 |
| `/gestantes` | 200 | Ensaio Gestante com Direção Natural e Sensível \| VERSAVISUAL \| VERSAVISUAL | 25 | 23 | 0 |
| `/hotelaria-lifestyle` | 200 | Fotografia e Vídeo Lifestyle para Hotéis, Resorts e Experiências \| VERSAVISUAL \| VERSAVISUAL | 25 | 22 | 0 |

Observações: `/sitemap.xml` e `/robots.txt` retornaram página 404 do Next, então o mapa foi derivado da navegação interna renderizada. Todas as rotas internas encontradas responderam `200`.

## 2. Arquitetura de informação

### Navegação global

- Logo VERSAVISUAL -> `/`
- Início -> `/`
- Ativações & Eventos -> `/ativacoes-eventos`
- Portfólio -> `/portfolio`
- Segmentos -> `/#nichos`
- Processo -> `/#processo`
- CTA primário: Quero melhorar minha imagem -> `/diagnostico-visual`
- Menu mobile: botão `Menu`, `aria-expanded=false` no estado fechado

### Rotas principais
- `/`: Home institucional e roteadora
- `/portfolio`: Portfólio com filtros por segmento
- `/diagnostico-visual`: Formulário de captação/diagnóstico
- `/ativacoes-eventos`: Landing de segmento
- `/moda-campanhas`: Landing de segmento
- `/artistas-videoclipes`: Landing de segmento
- `/posicionamento-profissional`: Landing de segmento
- `/imagem-pessoal-lifestyle`: Landing de segmento
- `/casamentos`: Landing de segmento
- `/gestantes`: Landing de segmento
- `/hotelaria-lifestyle`: Landing de segmento

### Rodapé global

- Logo VERSAVISUAL
- Texto: Hub Criativo · Vídeo · Fotografia · Storymaking. Da cena ao frame, em todo o Brasil.
- Lista Segmentos: Ativações & Eventos, Moda & Campanhas, Artistas & Videoclipes, Posicionamento Profissional, Imagem Pessoal & Lifestyle, Casamentos, Gestantes, Hotelaria & Lifestyle
- Contato: WhatsApp · 11 95074-7192, hub@versavisual.com.br, Portfólio, Quero melhorar minha imagem
- Legal/local: © 2026 VERSAVISUAL — Hub Criativo Audiovisual; Rio de Janeiro · Brasil
- Botão flutuante: WhatsApp -> `https://wa.me/5511950747192`

## 3. Fluxos de usuário

### Fluxo principal: geração de lead

1. Usuário entra pela Home ou por uma landing de segmento.
2. CTA `Quero melhorar minha imagem` leva para `/diagnostico-visual`.
3. Usuário preenche dados do projeto e faixa de investimento.
4. Botão `Enviar diagnóstico` deve enviar solicitação e/ou encaminhar contato interno.
5. Alternativa direta: CTA WhatsApp abre `https://wa.me/5511950747192`.

### Fluxo exploratório por segmento

1. Home -> seção `Segmentos`.
2. Cards de segmento levam às landings específicas.
3. Landing apresenta: hero, para quem é, problema, solução, serviços, portfólio relacionado, processo, CTA, FAQ.
4. Usuário abre imagens da galeria ou clica nos cards `Entender serviço`.
5. CTA final retorna para diagnóstico ou WhatsApp.

### Fluxo de portfólio

1. Usuário acessa `/portfolio`.
2. Pode filtrar por: Todos, Ativações & Eventos, Moda & Campanhas, Artistas & Videoclipes, Posicionamento, Imagem Pessoal, Casamentos, Gestantes, Hotelaria & Lifestyle.
3. Cards de portfólio funcionam como botões interativos e devem abrir visualização/detalhe do projeto ou lightbox, mantendo categoria, título e local.

## 4. Especificação funcional

### Componentes globais

- `Header`: sticky/fixo conforme design atual, logo, links, CTA, menu mobile acessível.
- `Footer`: colunas de marca, segmentos e contato; preservar links externos e internos.
- `WhatsAppFloat`: botão flutuante global, texto/aria `WhatsApp`/`Falar no WhatsApp`, abre em nova aba quando externo.
- `CTASection`: bloco final reutilizável com eyebrow, título, texto e CTAs diagnóstico/WhatsApp.
- `FAQAccordion`: perguntas fechadas por padrão (`aria-expanded=false`), botão com sinal `+`, resposta expansível.
- `ServiceGrid`: 6 cards por landing, cada card é botão com número, título, descrição e microcopy `Entender serviço`.
- `ImageLightbox`: botões `Abrir imagem: ...` nas imagens principais e galerias relacionadas.
- `PortfolioFilter`: tabs de filtro em `/portfolio`, com estado ativo para `Todos` no carregamento.

### Requisitos de acessibilidade

- Todo botão visual sem texto deve ter `aria-label` descritivo.
- Menu, FAQ e modais/lightboxes devem atualizar `aria-expanded`/foco corretamente.
- Lightbox deve fechar com Esc, clique fora e botão visível de fechar.
- CTAs externos de WhatsApp devem usar `target=_blank` e `rel=noopener noreferrer`.
- Labels de formulário devem permanecer associados aos campos.

### Requisitos de SEO

- `/`: title atual `VERSAVISUAL | Fotografia, Vídeo e Storymaking para Marcas`; description `Hub criativo audiovisual especializado em fotografia, vídeo, direção visual e storymaking para marcas, artistas, eventos, campanhas e experiências no Rio de Janeiro e em todo o Brasil.`
- `/ativacoes-eventos`: title atual `Cobertura Audiovisual para Ativações de Marca e Eventos Corporativos | VERSAVISUAL | VERSAVISUAL`; description `Fotografia, vídeo, storymaking e direção visual para ativações de marca, eventos corporativos, feiras e lançamentos no Rio de Janeiro. Conteúdo em tempo real e cobertura completa.`
- `/portfolio`: title atual `Portfólio Audiovisual | Ativações, Moda, Casamentos, Gestantes e Hotelaria | VERSAVISUAL | VERSAVISUAL`; description `Portfólio de fotografia, vídeo e storymaking da VERSAVISUAL. Ativações de marca, moda, artistas, imagem pessoal, casamentos, gestantes e hotelaria no Rio de Janeiro e em todo o Brasil.`
- `/diagnostico-visual`: title atual `Diagnóstico Visual Gratuito | VERSAVISUAL`; description `Solicite um diagnóstico visual para o seu projeto. Entendemos o momento da sua marca, o tipo de conteúdo necessário e a melhor solução audiovisual — fotografia, vídeo e storymaking.`
- `/moda-campanhas`: title atual `Fotógrafo de Moda, Beauty e Campanhas para Marcas | VERSAVISUAL | VERSAVISUAL`; description `Direção criativa, fotografia editorial de moda, beauty e campanhas comerciais para marcas no Rio de Janeiro. Fashion film, lifestyle e imagem com intenção e posicionamento.`
- `/artistas-videoclipes`: title atual `Direção e Produção Audiovisual para Artistas, Shows e Videoclipes | VERSAVISUAL | VERSAVISUAL`; description `Direção, fotografia, vídeo, making of, capa e teaser para artistas. Produtora de videoclipes e cobertura audiovisual de shows no Rio de Janeiro e em todo o Brasil.`
- `/posicionamento-profissional`: title atual `Fotografia de Posicionamento para Profissionais, Clínicas e Marcas Pessoais | VERSAVISUAL | VERSAVISUAL`; description `Retratos, vídeos institucionais e direção visual para médicos, clínicas, executivos e marcas pessoais que precisam comunicar autoridade, confiança e valor através da imagem.`
- `/imagem-pessoal-lifestyle`: title atual `Ensaio Fotográfico Lifestyle e Imagem Pessoal para Instagram | VERSAVISUAL`; description `Ensaio fotográfico lifestyle, imagem pessoal, fotos para Instagram, dating profile, autoestima e conteúdo autoral com direção de pose no Rio de Janeiro.`
- `/casamentos`: title atual `Fotografia e Vídeo de Casamento com Direção Sensível | VERSAVISUAL | VERSAVISUAL`; description `Fotografia e vídeo de casamento com direção sensível, narrativa visual, retratos naturais, cerimônia, festa, detalhes e entrega editorial no Rio de Janeiro.`
- `/gestantes`: title atual `Ensaio Gestante com Direção Natural e Sensível | VERSAVISUAL | VERSAVISUAL`; description `Ensaio gestante com direção de pose, luz natural, praia, natureza, retratos de maternidade e memória afetiva no Rio de Janeiro.`
- `/hotelaria-lifestyle`: title atual `Fotografia e Vídeo Lifestyle para Hotéis, Resorts e Experiências | VERSAVISUAL | VERSAVISUAL`; description `Produção de imagens para hotelaria, gastronomia, turismo e experiências, com foco em desejo, atmosfera, lifestyle e conversão comercial. Fotografia e vídeo para hotéis e resorts.`

## 5. Formulário de diagnóstico

- Diagnóstico Visual · Gratuito
- Solicite um diagnóstico visual para o seu projeto.
- Preencha as informações abaixo para entendermos o momento da sua marca, o tipo de conteúdo necessário e a melhor solução audiovisual para o seu projeto.
- Resposta em até 1 dia útil, por WhatsApp ou e-mail.
- Sem compromisso — entendemos o escopo antes de orçar.
- Proposta personalizada por faixa de investimento.
- Nome *
- Empresa / Projeto
- WhatsApp *
- E-mail *
- Cidade
- Segmento
- Segmento SelecioneAtivações & EventosModa & CampanhasArtistas & VideoclipesPosicionamento ProfissionalImagem Pessoal & LifestyleHotelaria & LifestyleOutro
- Tipo de projeto
- Tipo de projeto SelecioneFotografiaVídeo / VideomakingStorymakingCobertura de eventoCampanha / Direção visualCombinação de serviços
- Data desejada
- Onde o conteúdo será usado?
- Qual o principal objetivo?
- Faixa de investimento disponível
- Até R$ 1.500
- R$ 1.500–3.000
- R$ 3.000–6.000
- R$ 6.000–10.000
- Acima de R$ 10.000
- Ainda não sei
- Até R$ 1.500 R$ 1.500–3.000 R$ 3.000–6.000 R$ 6.000–10.000 Acima de R$ 10.000 Ainda não sei
- Faixa de investimento disponível Até R$ 1.500 R$ 1.500–3.000 R$ 3.000–6.000 R$ 6.000–10.000 Acima de R$ 10.000 Ainda não sei
- Mensagem adicional
- Ou fale direto no WhatsApp .
- Enviar diagnóstico Ou fale direto no WhatsApp .
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

Campos obrigatórios inferidos pelo texto: `Nome *`, `WhatsApp *`. Campos presentes: Nome, Empresa/Projeto, WhatsApp, E-mail, Cidade, Segmento, Tipo de projeto, Data desejada, Onde o conteúdo será usado?, Qual o principal objetivo?, Faixa de investimento disponível, Mensagem adicional.

Opções de Segmento: Selecione; Ativações & Eventos; Moda & Campanhas; Artistas & Videoclipes; Posicionamento Profissional; Imagem Pessoal & Lifestyle; Hotelaria & Lifestyle; Outro.

Opções de Tipo de projeto: Selecione; Fotografia; Vídeo / Videomaking; Storymaking; Cobertura de evento; Campanha / Direção visual; Combinação de serviços.

Opções de faixa de investimento: Até R$ 1.500; R$ 1.500-3.000; R$ 3.000-6.000; R$ 6.000-10.000; Acima de R$ 10.000; Ainda não sei.

## 6. Mapa de páginas e conteúdo

### /

- URL: https://www.versavisual.com.br/
- Status: 200
- Title: VERSAVISUAL | Fotografia, Vídeo e Storymaking para Marcas
- Meta description: Hub criativo audiovisual especializado em fotografia, vídeo, direção visual e storymaking para marcas, artistas, eventos, campanhas e experiências no Rio de Janeiro e em todo o Brasil.
- Interações detectadas: 1 botões; 0 botões de imagem; 0 cards de serviço; 0 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Hub Criativo Audiovisual · Rio de Janeiro · Brasil
- Fotografia, vídeo e storymaking para marcas, artistas e eventos.
- Imagem forte para marcas, eventos e pessoas.
- A VERSAVISUAL cria direção visual, cobertura audiovisual, fotografia de campanha e conteúdo em tempo real para marcas, artistas, ativações, eventos e projetos comerciais.
- Direção visual para sua marca, evento, campanha ou ensaio pessoal já nascer com imagem forte.
- Quero melhorar minha imagem Ver trabalhos
- +120
- Projetos Autorais
- +120 Projetos Autorais
- 25+
- Marcas Atendidas
- 25+ Marcas Atendidas
- 18
- Estados Cobertos
- 18 Estados Cobertos
- 5+
- Anos de Operação
- 5+ Anos de Operação
- +120 Projetos Autorais 25+ Marcas Atendidas 18 Estados Cobertos 5+ Anos de Operação
- Quem somos
- vira
- Onde a cena vira narrativa.
- Nossa entrega reflete essa dualidade: a energia raw dos palcos e a elegância técnica que marcas premium exigem. Do planejamento ao frame final, somos parceiros criativos — não apenas fornecedores.
- Direção ativa em campo — não chegamos para registrar, chegamos para interpretar.
- Operação multicâmera com papéis definidos e visão compartilhada.
- Tratamento de cor coeso: sombras frias tendendo ao teal, pele respeitada.
- Segmentos
- Cada público, uma especialidade.
- Escolha o segmento do seu projeto. Cada frente tem direção, linguagem e entregáveis próprios — mesma excelência, linguagens diferentes.
- Segmentos Cada público, uma especialidade. Escolha o segmento do seu projeto. Cada frente tem direção, linguagem e entregáveis próprios — mesma excelência, linguagens diferentes.
- 01 — Segmento
- Ativações & Eventos
- Ver página →
- 01 — Segmento Ativações & Eventos Ver página →
- 02 — Segmento
- Moda & Campanhas
- 02 — Segmento Moda & Campanhas Ver página →
- 03 — Segmento
- Artistas & Videoclipes
- 03 — Segmento Artistas & Videoclipes Ver página →
- 04 — Segmento
- Posicionamento Profissional
- 04 — Segmento Posicionamento Profissional Ver página →
- 05 — Segmento
- Imagem Pessoal & Lifestyle
- 05 — Segmento Imagem Pessoal & Lifestyle Ver página →
- 06 — Novo segmento
- Casamentos
- 06 — Novo segmento Casamentos Ver página →
- 07 — Novo segmento
- Gestantes
- 07 — Novo segmento Gestantes Ver página →
- 08 — Segmento
- Hotelaria & Lifestyle
- 08 — Segmento Hotelaria & Lifestyle Ver página →
- Portfólio completo
- Veja todos os projetos.
- Explore cases por segmento e veja a entrega audiovisual em movimento.
- Abrir portfólio →
- Portfólio completo Veja todos os projetos. Explore cases por segmento e veja a entrega audiovisual em movimento. Abrir portfólio →
- 02 — O que entregamos
- 6 serviços. Uma entrega.
- Cada serviço existe de forma independente — e se potencializa quando combinado com os demais. Do roteiro à edição final, da lente ao story publicado.
- 01
- Fotografia
- Direção de cena, leitura de luz e sensibilidade editorial. Imagens com peso, presença e intenção.
- 01 Fotografia Direção de cena, leitura de luz e sensibilidade editorial. Imagens com peso, presença e intenção.
- 02
- Storymaking
- Narrativas visuais para redes sociais. Posts, carrosséis e reels que comunicam com coerência.
- 02 Storymaking Narrativas visuais para redes sociais. Posts, carrosséis e reels que comunicam com coerência.
- 03
- Videomaking
- Cobertura completa com equipe técnica, operação multicâmera e entrega editada com identidade.
- 03 Videomaking Cobertura completa com equipe técnica, operação multicâmera e entrega editada com identidade.
- 04
- Roteiros
- Roteiros para vídeos institucionais, conteúdo e coberturas temáticas. A narrativa começa antes da câmera ligar.
- 04 Roteiros Roteiros para vídeos institucionais, conteúdo e coberturas temáticas. A narrativa começa antes da câmera ligar.
- 05
- Direção
- Direção visual não é estética pela estética. É a tradução de um objetivo de comunicação em escolhas concretas de enquadramento, luz, movimento e composição.
- 05 Direção Direção visual não é estética pela estética. É a tradução de um objetivo de comunicação em escolhas concretas de enquadramento, luz, movimento e composição.
- 06
- Cobertura de Eventos
- Presença completa nos eventos dos clientes — antes, durante e depois.
- 06 Cobertura de Eventos Presença completa nos eventos dos clientes — antes, durante e depois.
- 03 — Modelo de execução
- Mestria não se improvisa. Se constrói quadro a quadro.
- 03 — Modelo de execução Mestria não se improvisa. Se constrói quadro a quadro.
- Briefing
- A maioria das produções falha não na captação — falha no que veio antes dela. Na VERSAVISUAL, o planejamento é parte do produto entregue.
- 01 Briefing A maioria das produções falha não na captação — falha no que veio antes dela. Na VERSAVISUAL, o planejamento é parte do produto entregue.
- Pré-produção
- Alinhamento de briefing, roteiro ou pauta de cobertura, reconhecimento de locação, definição de linguagem visual e organização logística da equipe.
- 02 Pré-produção Alinhamento de briefing, roteiro ou pauta de cobertura, reconhecimento de locação, definição de linguagem visual e organização logística da equipe.
- Execução
- Captação é onde o planejamento encontra a realidade. Chegamos ao set com briefing definido, pauta estruturada e linguagem visual alinhada. A execução em campo é disciplinada — mas sensível.
- 03 Execução Captação é onde o planejamento encontra a realidade. Chegamos ao set com briefing definido, pauta estruturada e linguagem visual alinhada. A execução em campo é disciplinada — mas sensível.
- Pós & entrega
- A edição é onde a narrativa se consolida. A VERSAVISUAL transforma material bruto em entrega com identidade — tratamento de cor coeso, curadoria autoral e formatos por plataforma.
- 04 Pós & entrega A edição é onde a narrativa se consolida. A VERSAVISUAL transforma material bruto em entrega com identidade — tratamento de cor coeso, curadoria autoral e formatos por plataforma.
- Vamos conversar
- Sua marca tem uma história. Nós damos a ela a luz que merece.
- Conte o que você quer comunicar. Entendemos o momento da sua marca e indicamos a melhor solução audiovisual para o seu projeto.
- Quero melhorar minha imagem WhatsApp direto
- Segmentos Ativações & Eventos Moda & Campanhas Artistas & Videoclipes Posicionamento Profissional Imagem Pessoal & Lifestyle Casamentos Gestantes Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Ver trabalhos -> https://www.versavisual.com.br/#nichos
- 01 — Segmento Ativações & Eventos Ver página → -> https://www.versavisual.com.br/ativacoes-eventos
- 02 — Segmento Moda & Campanhas Ver página → -> https://www.versavisual.com.br/moda-campanhas
- 03 — Segmento Artistas & Videoclipes Ver página → -> https://www.versavisual.com.br/artistas-videoclipes
- 04 — Segmento Posicionamento Profissional Ver página → -> https://www.versavisual.com.br/posicionamento-profissional
- 05 — Segmento Imagem Pessoal & Lifestyle Ver página → -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- 06 — Novo segmento Casamentos Ver página → -> https://www.versavisual.com.br/casamentos
- 07 — Novo segmento Gestantes Ver página → -> https://www.versavisual.com.br/gestantes
- 08 — Segmento Hotelaria & Lifestyle Ver página → -> https://www.versavisual.com.br/hotelaria-lifestyle
- Portfólio completo Veja todos os projetos. Explore cases por segmento e veja a entrega audiovisual em movimento. Abrir portfólio → -> https://www.versavisual.com.br/portfolio
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /ativacoes-eventos

- URL: https://www.versavisual.com.br/ativacoes-eventos
- Status: 200
- Title: Cobertura Audiovisual para Ativações de Marca e Eventos Corporativos | VERSAVISUAL | VERSAVISUAL
- Meta description: Fotografia, vídeo, storymaking e direção visual para ativações de marca, eventos corporativos, feiras e lançamentos no Rio de Janeiro. Conteúdo em tempo real e cobertura completa.
- Interações detectadas: 138 botões; 127 botões de imagem; 6 cards de serviço; 4 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Início · Ativações & Eventos
- Cobertura audiovisual para ativações de marca e eventos corporativos.
- Fotografia, vídeo, storymaking e direção visual para marcas que precisam registrar, comunicar e ampliar a percepção de valor de suas ativações, feiras, lançamentos e experiências presenciais.
- Quero melhorar minha imagem Falar no WhatsApp
- Para quem é
- Marcas, agências e equipes de marketing de eventos.
- Se a sua marca investe em presença física — ativações, feiras, summits, lançamentos — mas o registro não acompanha a qualidade da experiência, o conteúdo perde valor no momento que mais importa.
- Agências que precisam entregar conteúdo de qualidade ao cliente final.
- Marcas com calendário de eventos e ativações recorrentes.
- Times de marketing que querem conteúdo em tempo real para redes.
- O problema
- A experiência foi incrível. E o registro?
- Equipes generalistas, sem direção, gerando volume de fotos sem narrativa. Conteúdo que chega tarde demais para as redes. Material bruto que ninguém edita. A ativação acaba e a marca não tem o que mostrar.
- O problema A experiência foi incrível. E o registro? Equipes generalistas, sem direção, gerando volume de fotos sem narrativa. Conteúdo que chega tarde demais para as redes. Material bruto que ninguém edita. A ativação acaba e a marca não tem o que mostrar.
- Como resolvemos
- Direção, captação e entrega — integradas.
- Chegamos com pauta de cobertura definida, hierarquia de momentos e linguagem visual alinhada. Operação multicâmera, storymaking em tempo real para as redes e entrega editada por formato e plataforma.
- Serviços inclusos
- Uma operação, cobertura completa.
- Serviços inclusos Uma operação, cobertura completa.
- 01
- Fotografia
- Registro com direção de cena: equipe, interação com público, detalhes de marca e momentos-chave.
- Entender serviço
- 02
- Vídeo
- Cobertura multicâmera, aftermovie e cortes verticais para redes. Identidade visual da marca preservada.
- 03
- Storymaking
- Conteúdo em tempo real durante o evento — stories, reels e posts publicados enquanto a ação acontece.
- 04
- Direção visual
- Linguagem alinhada ao posicionamento da marca, do enquadramento ao tratamento de cor.
- 05
- Conteúdo p/ redes
- Entregáveis nos formatos certos: 9:16, 1:1 e 16:9, prontos para publicar.
- 06
- Relatório de uso
- Material organizado por momento e câmera, com curadoria e nomenclatura para o time da marca.
- Portfólio relacionado
- Ativações em movimento.
- Uma seleção de coberturas de ativações, feiras e eventos corporativos.
- Portfólio relacionado Ativações em movimento. Uma seleção de coberturas de ativações, feiras e eventos corporativos.
- Processo de trabalho
- Do briefing ao conteúdo publicado.
- Processo de trabalho Do briefing ao conteúdo publicado.
- Briefing
- Entendemos a ativação, os momentos prioritários e onde o conteúdo será usado.
- 01 Briefing Entendemos a ativação, os momentos prioritários e onde o conteúdo será usado.
- Pauta
- Hierarquia de captação, posicionamento de câmera e estimativa por cena.
- 02 Pauta Hierarquia de captação, posicionamento de câmera e estimativa por cena.
- Operação
- Equipe coordenada em campo, com storymaking publicado em tempo real.
- 03 Operação Equipe coordenada em campo, com storymaking publicado em tempo real.
- Entrega
- Edição por formato, curadoria de imagens e material organizado para o time.
- 04 Entrega Edição por formato, curadoria de imagens e material organizado para o time.
- Próxima ativação
- Sua próxima ativação merece um registro à altura.
- Conte o que vem por aí. Montamos a operação audiovisual ideal para o seu evento.
- Quero melhorar minha imagem WhatsApp direto
- Dúvidas comuns
- FAQ — Ativações & Eventos.
- Dúvidas comuns FAQ — Ativações & Eventos.
- Sim. O storymaking em tempo real é parte central do serviço — publicamos stories, reels e posts enquanto a ativação acontece, alinhados ao tom da marca.
- Vocês entregam conteúdo durante o evento? + Sim. O storymaking em tempo real é parte central do serviço — publicamos stories, reels e posts enquanto a ativação acontece, alinhados ao tom da marca.
- Sim. A operação é nacional — vamos onde a história acontece. Logística e equipe são dimensionadas no briefing.
- Atendem fora do Rio de Janeiro? + Sim. A operação é nacional — vamos onde a história acontece. Logística e equipe são dimensionadas no briefing.
- Conteúdo em tempo real sai durante o evento. O material editado completo é definido em briefing conforme o uso — normalmente entre 3 e 10 dias úteis.
- Qual o prazo de entrega do material editado? + Conteúdo em tempo real sai durante o evento. O material editado completo é definido em briefing conforme o uso — normalmente entre 3 e 10 dias úteis.
- Pelo diagnóstico visual entendemos escopo, número de câmeras, duração e entregáveis. A partir daí montamos uma proposta personalizada por faixa de investimento.
- Como funciona o orçamento? + Pelo diagnóstico visual entendemos escopo, número de câmeras, duração e entregáveis. A partir daí montamos uma proposta personalizada por faixa de investimento.
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Botões/cards de serviço
- 01 Fotografia Registro com direção de cena: equipe, interação com público, detalhes de marca e momentos-chave. Entender serviço
- 02 Vídeo Cobertura multicâmera, aftermovie e cortes verticais para redes. Identidade visual da marca preservada. Entender serviço
- 03 Storymaking Conteúdo em tempo real durante o evento — stories, reels e posts publicados enquanto a ação acontece. Entender serviço
- 04 Direção visual Linguagem alinhada ao posicionamento da marca, do enquadramento ao tratamento de cor. Entender serviço
- 05 Conteúdo p/ redes Entregáveis nos formatos certos: 9:16, 1:1 e 16:9, prontos para publicar. Entender serviço
- 06 Relatório de uso Material organizado por momento e câmera, com curadoria e nomenclatura para o time da marca. Entender serviço

#### FAQs
- Vocês entregam conteúdo durante o evento? +
- Atendem fora do Rio de Janeiro? +
- Qual o prazo de entrega do material editado? +
- Como funciona o orçamento? +

#### Galeria/lightbox
- Total de botões de imagem: 127
- Abrir imagem: Cobertura de trio elétrico e ativação com artistas e público
- Abrir imagem: Cobertura de ativação de marca e evento 01
- Abrir imagem: Cobertura de ativação de marca e evento 02
- Abrir imagem: Cobertura de ativação de marca e evento 03
- Abrir imagem: Cobertura de ativação de marca e evento 04
- Abrir imagem: Cobertura de ativação de marca e evento 05
- Abrir imagem: Cobertura de ativação de marca e evento 06
- Abrir imagem: Cobertura de ativação de marca e evento 07
- Abrir imagem: Cobertura de ativação de marca e evento 08
- Abrir imagem: Cobertura de ativação de marca e evento 09
- Abrir imagem: Cobertura de ativação de marca e evento 10
- Abrir imagem: Cobertura de ativação de marca e evento 11
- Abrir imagem: Cobertura de ativação de marca e evento 12
- Abrir imagem: Cobertura de ativação de marca e evento 13
- Abrir imagem: Cobertura de ativação de marca e evento 14
- Abrir imagem: Cobertura de ativação de marca e evento 15
- Abrir imagem: Cobertura de ativação de marca e evento 16
- Abrir imagem: Cobertura de ativação de marca e evento 17
- Abrir imagem: Cobertura de ativação de marca e evento 18
- Abrir imagem: Cobertura de ativação de marca e evento 19
- ...mais 107 imagens com o mesmo padrão de lightbox.

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Falar no WhatsApp -> https://wa.me/5511950747192
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /portfolio

- URL: https://www.versavisual.com.br/portfolio
- Status: 200
- Title: Portfólio Audiovisual | Ativações, Moda, Casamentos, Gestantes e Hotelaria | VERSAVISUAL | VERSAVISUAL
- Meta description: Portfólio de fotografia, vídeo e storymaking da VERSAVISUAL. Ativações de marca, moda, artistas, imagem pessoal, casamentos, gestantes e hotelaria no Rio de Janeiro e em todo o Brasil.
- Interações detectadas: 37 botões; 0 botões de imagem; 0 cards de serviço; 0 FAQs; 9 tabs; 27 cards de portfólio.

#### Copy principal

- Portfólio · A entrega em movimento
- Nosso trabalho, por segmento.
- Uma seleção de coberturas, campanhas e produções. Cada projeto carrega nossa assinatura visual — sombras frias, momento real, composição intencional.
- Todos Ativações & Eventos Moda & Campanhas Artistas & Videoclipes Posicionamento Imagem Pessoal Casamentos Gestantes Hotelaria & Lifestyle
- Ativações & Eventos
- Ativação Drinkball — Experiência de Marca
- São Paulo · SP
- Ativações & Eventos Ativação Drinkball — Experiência de Marca São Paulo · SP
- Carnaval de Rua — Experiência e Público
- Rio de Janeiro · RJ
- Ativações & Eventos Carnaval de Rua — Experiência e Público Rio de Janeiro · RJ
- Festival BON — Cobertura Corporativa
- Ativações & Eventos Festival BON — Cobertura Corporativa Rio de Janeiro · RJ
- Evento FJT — Cobertura de Palco e Camarote
- Ativações & Eventos Evento FJT — Cobertura de Palco e Camarote Rio de Janeiro · RJ
- Show ao Vivo — Registro de Performance
- Ativações & Eventos Show ao Vivo — Registro de Performance Rio de Janeiro · RJ
- SYMBH — Evento Corporativo
- Belo Horizonte · MG
- Ativações & Eventos SYMBH — Evento Corporativo Belo Horizonte · MG
- Moda & Campanhas
- Fashion Week — Passarela e Bastidor
- Moda & Campanhas Fashion Week — Passarela e Bastidor Rio de Janeiro · RJ
- Editorial Lifestyle — Campanha
- Moda & Campanhas Editorial Lifestyle — Campanha Rio de Janeiro · RJ
- Campanha de Verão — Lookbook
- Moda & Campanhas Campanha de Verão — Lookbook Rio de Janeiro · RJ
- Coleção Exclusiva — Campanha Conceitual
- Moda & Campanhas Coleção Exclusiva — Campanha Conceitual Rio de Janeiro · RJ
- Fotografia de Produto — Lançamento
- Moda & Campanhas Fotografia de Produto — Lançamento Rio de Janeiro · RJ
- Artistas & Videoclipes
- É O TCHAN - Jogadinha
- Salvador · BA
- Artistas & Videoclipes É O TCHAN - Jogadinha Salvador · BA
- Babado Novo - Sururu
- Artistas & Videoclipes Babado Novo - Sururu Rio de Janeiro · RJ
- Fotografia de Artista — Press Kit
- Artistas & Videoclipes Fotografia de Artista — Press Kit Rio de Janeiro · RJ
- Posicionamento Profissional
- Retratos de Posicionamento — Marca Pessoal
- Posicionamento Profissional Retratos de Posicionamento — Marca Pessoal Rio de Janeiro · RJ
- Retratos Corporativos — Equipe e Liderança
- Posicionamento Profissional Retratos Corporativos — Equipe e Liderança Rio de Janeiro · RJ
- Brand Personal — Profissional Liberal
- Posicionamento Profissional Brand Personal — Profissional Liberal Rio de Janeiro · RJ
- Imagem Pessoal & Lifestyle
- Ensaio Autoral — Lifestyle para Instagram
- Imagem Pessoal & Lifestyle Ensaio Autoral — Lifestyle para Instagram Rio de Janeiro · RJ
- Ensaio Feminino — Frida
- Imagem Pessoal & Lifestyle Ensaio Feminino — Frida Rio de Janeiro · RJ
- Retratos Urbanos — Presença e Movimento
- Imagem Pessoal & Lifestyle Retratos Urbanos — Presença e Movimento Rio de Janeiro · RJ
- Retratos de Luz — Sessão Intimista
- Imagem Pessoal & Lifestyle Retratos de Luz — Sessão Intimista Rio de Janeiro · RJ
- Ensaio Beauty — Natural e Verdadeiro
- Imagem Pessoal & Lifestyle Ensaio Beauty — Natural e Verdadeiro Rio de Janeiro · RJ
- Casamentos
- Casamento ao Ar Livre — Memória e Afeto
- Casamentos Casamento ao Ar Livre — Memória e Afeto Rio de Janeiro · RJ
- Casamento na Praia — Luz e Emoção
- Macaé · RJ
- Casamentos Casamento na Praia — Luz e Emoção Macaé · RJ
- Gestantes
- Ensaio Gestante — Corpo, Praia e Memória
- Gestantes Ensaio Gestante — Corpo, Praia e Memória Rio de Janeiro · RJ
- Ensaio Gestante — Intimidade e Presença
- Gestantes Ensaio Gestante — Intimidade e Presença Macaé · RJ
- Hotelaria & Lifestyle
- Hotelaria — Espaços, Café e Spa
- Hotelaria & Lifestyle Hotelaria — Espaços, Café e Spa Rio de Janeiro · RJ
- Vamos criar o seu
- Seu projeto pode ser o próximo aqui.
- Conte o que você quer comunicar e montamos a operação audiovisual ideal para a sua marca.
- Quero melhorar minha imagem WhatsApp direto
- Segmentos Ativações & Eventos Moda & Campanhas Artistas & Videoclipes Posicionamento Profissional Imagem Pessoal & Lifestyle Casamentos Gestantes Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Filtros de portfólio
- Todos (ativo)
- Ativações & Eventos (inativo)
- Moda & Campanhas (inativo)
- Artistas & Videoclipes (inativo)
- Posicionamento (inativo)
- Imagem Pessoal (inativo)
- Casamentos (inativo)
- Gestantes (inativo)
- Hotelaria & Lifestyle (inativo)

#### Cards de portfólio
- Ativações & Eventos Ativação Drinkball — Experiência de Marca São Paulo · SP
- Ativações & Eventos Carnaval de Rua — Experiência e Público Rio de Janeiro · RJ
- Ativações & Eventos Festival BON — Cobertura Corporativa Rio de Janeiro · RJ
- Ativações & Eventos Evento FJT — Cobertura de Palco e Camarote Rio de Janeiro · RJ
- Ativações & Eventos Show ao Vivo — Registro de Performance Rio de Janeiro · RJ
- Ativações & Eventos SYMBH — Evento Corporativo Belo Horizonte · MG
- Moda & Campanhas Fashion Week — Passarela e Bastidor Rio de Janeiro · RJ
- Moda & Campanhas Editorial Lifestyle — Campanha Rio de Janeiro · RJ
- Moda & Campanhas Campanha de Verão — Lookbook Rio de Janeiro · RJ
- Moda & Campanhas Coleção Exclusiva — Campanha Conceitual Rio de Janeiro · RJ
- Moda & Campanhas Fotografia de Produto — Lançamento Rio de Janeiro · RJ
- Artistas & Videoclipes É O TCHAN - Jogadinha Salvador · BA
- Artistas & Videoclipes Babado Novo - Sururu Rio de Janeiro · RJ
- Artistas & Videoclipes Fotografia de Artista — Press Kit Rio de Janeiro · RJ
- Posicionamento Profissional Retratos de Posicionamento — Marca Pessoal Rio de Janeiro · RJ
- Posicionamento Profissional Retratos Corporativos — Equipe e Liderança Rio de Janeiro · RJ
- Posicionamento Profissional Brand Personal — Profissional Liberal Rio de Janeiro · RJ
- Imagem Pessoal & Lifestyle Ensaio Autoral — Lifestyle para Instagram Rio de Janeiro · RJ
- Imagem Pessoal & Lifestyle Ensaio Feminino — Frida Rio de Janeiro · RJ
- Imagem Pessoal & Lifestyle Retratos Urbanos — Presença e Movimento Rio de Janeiro · RJ
- Imagem Pessoal & Lifestyle Retratos de Luz — Sessão Intimista Rio de Janeiro · RJ
- Imagem Pessoal & Lifestyle Ensaio Beauty — Natural e Verdadeiro Rio de Janeiro · RJ
- Casamentos Casamento ao Ar Livre — Memória e Afeto Rio de Janeiro · RJ
- Casamentos Casamento na Praia — Luz e Emoção Macaé · RJ
- Gestantes Ensaio Gestante — Corpo, Praia e Memória Rio de Janeiro · RJ
- Gestantes Ensaio Gestante — Intimidade e Presença Macaé · RJ
- Hotelaria & Lifestyle Hotelaria — Espaços, Café e Spa Rio de Janeiro · RJ

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /diagnostico-visual

- URL: https://www.versavisual.com.br/diagnostico-visual
- Status: 200
- Title: Diagnóstico Visual Gratuito | VERSAVISUAL
- Meta description: Solicite um diagnóstico visual para o seu projeto. Entendemos o momento da sua marca, o tipo de conteúdo necessário e a melhor solução audiovisual — fotografia, vídeo e storymaking.
- Interações detectadas: 2 botões; 0 botões de imagem; 0 cards de serviço; 0 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Diagnóstico Visual · Gratuito
- Solicite um diagnóstico visual para o seu projeto.
- Preencha as informações abaixo para entendermos o momento da sua marca, o tipo de conteúdo necessário e a melhor solução audiovisual para o seu projeto.
- Resposta em até 1 dia útil, por WhatsApp ou e-mail.
- Sem compromisso — entendemos o escopo antes de orçar.
- Proposta personalizada por faixa de investimento.
- Nome *
- Empresa / Projeto
- WhatsApp *
- E-mail *
- Cidade
- Segmento
- Segmento SelecioneAtivações & EventosModa & CampanhasArtistas & VideoclipesPosicionamento ProfissionalImagem Pessoal & LifestyleHotelaria & LifestyleOutro
- Tipo de projeto
- Tipo de projeto SelecioneFotografiaVídeo / VideomakingStorymakingCobertura de eventoCampanha / Direção visualCombinação de serviços
- Data desejada
- Onde o conteúdo será usado?
- Qual o principal objetivo?
- Faixa de investimento disponível
- Até R$ 1.500
- R$ 1.500–3.000
- R$ 3.000–6.000
- R$ 6.000–10.000
- Acima de R$ 10.000
- Ainda não sei
- Até R$ 1.500 R$ 1.500–3.000 R$ 3.000–6.000 R$ 6.000–10.000 Acima de R$ 10.000 Ainda não sei
- Faixa de investimento disponível Até R$ 1.500 R$ 1.500–3.000 R$ 3.000–6.000 R$ 6.000–10.000 Acima de R$ 10.000 Ainda não sei
- Mensagem adicional
- Ou fale direto no WhatsApp .
- Enviar diagnóstico Ou fale direto no WhatsApp .
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- WhatsApp -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br

### /moda-campanhas

- URL: https://www.versavisual.com.br/moda-campanhas
- Status: 200
- Title: Fotógrafo de Moda, Beauty e Campanhas para Marcas | VERSAVISUAL | VERSAVISUAL
- Meta description: Direção criativa, fotografia editorial de moda, beauty e campanhas comerciais para marcas no Rio de Janeiro. Fashion film, lifestyle e imagem com intenção e posicionamento.
- Interações detectadas: 59 botões; 48 botões de imagem; 6 cards de serviço; 4 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Início · Moda & Campanhas
- Fotógrafo de moda, beauty e campanhas para marcas.
- Direção criativa, fotografia editorial, beauty, lifestyle e campanhas comerciais para marcas que precisam construir imagem com intenção, estética e posicionamento.
- Quero melhorar minha imagem Falar no WhatsApp
- Para quem é
- Marcas de moda, beauty e lifestyle que vendem por imagem.
- Quando o produto é desejo, a imagem é o produto. Marcas que competem por percepção precisam de direção visual — não de fotos soltas sem conceito.
- Marcas de moda, beauty e acessórios em fase de campanha ou lançamento.
- Agências que precisam de produção e direção de imagem para clientes.
- Negócios lifestyle que constroem marca no Instagram e em mídia paga.
- O problema
- Foto bonita não é o mesmo que campanha.
- Sem direção criativa, a imagem não comunica posicionamento. O resultado é um banco de fotos genérico que poderia ser de qualquer marca — e que envelhece em uma temporada.
- O problema Foto bonita não é o mesmo que campanha. Sem direção criativa, a imagem não comunica posicionamento. O resultado é um banco de fotos genérico que poderia ser de qualquer marca — e que envelhece em uma temporada.
- Como resolvemos
- Conceito, direção e estética comercial.
- Partimos do posicionamento da marca para desenhar referência, styling, luz e tratamento. Cada frame serve à narrativa da campanha — do editorial ao fashion film, do beauty ao lifestyle.
- Serviços inclusos
- Da referência ao frame final.
- Serviços inclusos Da referência ao frame final.
- 01
- Direção criativa
- Conceito visual, moodboard, referências e linguagem alinhados ao posicionamento da marca.
- Entender serviço
- 02
- Fotografia editorial
- Editorial de moda com leitura de luz e composição intencional. Imagens com assinatura.
- 03
- Beauty
- Fotografia de beauty com foco em pele, detalhe e textura — respeitando o produto.
- 04
- Lifestyle
- Imagens de lifestyle e produto em contexto, para feed, e-commerce e mídia.
- 05
- Fashion film
- Vídeo de moda e campanha — movimento, ritmo e estética para redes e mídia paga.
- 06
- Tratamento
- Correção e gradação de cor coesa entre todos os materiais da campanha.
- Portfólio relacionado
- Moda em imagem.
- Uma seleção de editoriais, beauty e campanhas.
- Portfólio relacionado Moda em imagem. Uma seleção de editoriais, beauty e campanhas.
- Processo de trabalho
- Da referência à entrega.
- Processo de trabalho Da referência à entrega.
- Conceito
- Posicionamento, referências e moodboard da campanha.
- 01 Conceito Posicionamento, referências e moodboard da campanha.
- Pré-produção
- Styling, locação, casting e linguagem visual definidos.
- 02 Pré-produção Styling, locação, casting e linguagem visual definidos.
- Produção
- Direção ativa no set — luz, composição e estética sob controle.
- 03 Produção Direção ativa no set — luz, composição e estética sob controle.
- Entrega
- Tratamento de cor e entrega por formato e plataforma.
- 04 Entrega Tratamento de cor e entrega por formato e plataforma.
- Sua próxima campanha
- Sua marca merece uma imagem que vende.
- Conte o conceito da campanha. Desenhamos a direção visual e a produção ideais.
- Quero melhorar minha imagem WhatsApp direto
- Dúvidas comuns
- FAQ — Moda & Campanhas.
- Dúvidas comuns FAQ — Moda & Campanhas.
- Fazemos direção criativa completa — conceito, referências, styling e linguagem visual. A fotografia é a execução de uma estratégia, não um clique isolado.
- Vocês fazem direção criativa ou só fotografam? + Fazemos direção criativa completa — conceito, referências, styling e linguagem visual. A fotografia é a execução de uma estratégia, não um clique isolado.
- Sim. Produzimos desde editorial de campanha até lifestyle de produto e imagens para e-commerce, com tratamento coeso entre os materiais.
- Atendem e-commerce e catálogo? + Sim. Produzimos desde editorial de campanha até lifestyle de produto e imagens para e-commerce, com tratamento coeso entre os materiais.
- Sim. Produzimos vídeo de moda e campanha para redes e mídia paga, com a mesma direção visual da fotografia.
- Fazem fashion film? + Sim. Produzimos vídeo de moda e campanha para redes e mídia paga, com a mesma direção visual da fotografia.
- Pelo diagnóstico visual entendemos escopo, número de looks, equipe e entregáveis, e montamos uma proposta por faixa de investimento.
- Como funciona o orçamento? + Pelo diagnóstico visual entendemos escopo, número de looks, equipe e entregáveis, e montamos uma proposta por faixa de investimento.
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Botões/cards de serviço
- 01 Direção criativa Conceito visual, moodboard, referências e linguagem alinhados ao posicionamento da marca. Entender serviço
- 02 Fotografia editorial Editorial de moda com leitura de luz e composição intencional. Imagens com assinatura. Entender serviço
- 03 Beauty Fotografia de beauty com foco em pele, detalhe e textura — respeitando o produto. Entender serviço
- 04 Lifestyle Imagens de lifestyle e produto em contexto, para feed, e-commerce e mídia. Entender serviço
- 05 Fashion film Vídeo de moda e campanha — movimento, ritmo e estética para redes e mídia paga. Entender serviço
- 06 Tratamento Correção e gradação de cor coesa entre todos os materiais da campanha. Entender serviço

#### FAQs
- Vocês fazem direção criativa ou só fotografam? +
- Atendem e-commerce e catálogo? +
- Fazem fashion film? +
- Como funciona o orçamento? +

#### Galeria/lightbox
- Total de botões de imagem: 48
- Abrir imagem: Campanha de moda com direção visual editorial
- Abrir imagem: Fotografia de moda, campanha e produto 01
- Abrir imagem: Fotografia de moda, campanha e produto 02
- Abrir imagem: Fotografia de moda, campanha e produto 03
- Abrir imagem: Fotografia de moda, campanha e produto 04
- Abrir imagem: Fotografia de moda, campanha e produto 05
- Abrir imagem: Fotografia de moda, campanha e produto 06
- Abrir imagem: Fotografia de moda, campanha e produto 07
- Abrir imagem: Fotografia de moda, campanha e produto 08
- Abrir imagem: Fotografia de moda, campanha e produto 09
- Abrir imagem: Fotografia de moda, campanha e produto 10
- Abrir imagem: Fotografia de moda, campanha e produto 11
- Abrir imagem: Fotografia de moda, campanha e produto 12
- Abrir imagem: Fotografia de moda, campanha e produto 13
- Abrir imagem: Fotografia de moda, campanha e produto 14
- Abrir imagem: Fotografia de moda, campanha e produto 15
- Abrir imagem: Fotografia de moda, campanha e produto 16
- Abrir imagem: Fotografia de moda, campanha e produto 17
- Abrir imagem: Fotografia de moda, campanha e produto 18
- Abrir imagem: Fotografia de moda, campanha e produto 19
- ...mais 28 imagens com o mesmo padrão de lightbox.

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Falar no WhatsApp -> https://wa.me/5511950747192
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /artistas-videoclipes

- URL: https://www.versavisual.com.br/artistas-videoclipes
- Status: 200
- Title: Direção e Produção Audiovisual para Artistas, Shows e Videoclipes | VERSAVISUAL | VERSAVISUAL
- Meta description: Direção, fotografia, vídeo, making of, capa e teaser para artistas. Produtora de videoclipes e cobertura audiovisual de shows no Rio de Janeiro e em todo o Brasil.
- Interações detectadas: 30 botões; 19 botões de imagem; 6 cards de serviço; 4 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Início · Artistas & Videoclipes
- Direção e produção audiovisual para artistas, shows e videoclipes.
- Criação visual para artistas que precisam transformar música, estética e narrativa em imagem — com direção, fotografia, vídeo, making of, capa, teaser e conteúdo para redes.
- Quero melhorar minha imagem Falar no WhatsApp
- Para quem é
- Artistas e selos que tratam imagem como parte da obra.
- Música é som, mas o público também consome a imagem. Artistas que querem crescer precisam de uma identidade visual tão forte quanto a sonora.
- Artistas independentes lançando single, EP ou álbum.
- Selos e produtores que precisam de pacote visual para releases.
- Artistas em turnê que querem cobertura de shows e conteúdo para redes.
- O problema
- O som está pronto. E a imagem?
- Lançar música sem direção visual é entregar metade da obra. Clipes amadores, capas sem conceito e ausência de conteúdo de bastidor enfraquecem o impacto do release.
- O problema O som está pronto. E a imagem? Lançar música sem direção visual é entregar metade da obra. Clipes amadores, capas sem conceito e ausência de conteúdo de bastidor enfraquecem o impacto do release.
- Como resolvemos
- Um universo visual para o release.
- Construímos a imagem do artista em torno da música — videoclipe com direção, fotografia de divulgação, capa, teaser, making of e cortes para redes. Tudo coerente, do single ao show.
- Serviços inclusos
- Do clipe ao conteúdo de redes.
- Serviços inclusos Do clipe ao conteúdo de redes.
- 01
- Direção de clipe
- Conceito, roteiro e direção de videoclipe alinhados à narrativa da música.
- Entender serviço
- 02
- Captação de vídeo
- Operação multicâmera com movimento e linguagem coerentes ao tom do projeto.
- 03
- Fotografia
- Fotos de divulgação, capa e ensaio do artista com direção de cena.
- 04
- Cobertura de shows
- Registro de shows e turnê — palco, bastidor e público.
- 05
- Teaser & making of
- Conteúdo de antecipação e bastidor para alimentar o lançamento.
- 06
- Cortes para redes
- Reels e cortes verticais para sustentar o release nas plataformas.
- Portfólio relacionado
- Música em imagem.
- Uma seleção de clipes, shows e ensaios de artistas.
- Portfólio relacionado Música em imagem. Uma seleção de clipes, shows e ensaios de artistas.
- Processo de trabalho
- Do conceito ao lançamento.
- Processo de trabalho Do conceito ao lançamento.
- Conceito
- Imersão na música, referências e universo visual do artista.
- 01 Conceito Imersão na música, referências e universo visual do artista.
- Roteiro
- Roteiro do clipe, decupagem e plano de captação.
- 02 Roteiro Roteiro do clipe, decupagem e plano de captação.
- Captação
- Direção ativa em set ou show, com operação multicâmera.
- 03 Captação Direção ativa em set ou show, com operação multicâmera.
- Pós & entrega
- Montagem, cor e entrega de clipe, teaser e cortes para redes.
- 04 Pós & entrega Montagem, cor e entrega de clipe, teaser e cortes para redes.
- Seu próximo release
- Transforme sua música em um universo visual.
- Conte o conceito do seu lançamento. Montamos o pacote audiovisual ideal para o artista.
- Quero melhorar minha imagem WhatsApp direto
- Dúvidas comuns
- FAQ — Artistas & Videoclipes.
- Dúvidas comuns FAQ — Artistas & Videoclipes.
- Sim. Fazemos conceito, roteiro, direção, captação e pós-produção do videoclipe, além do material de divulgação.
- Vocês produzem o clipe do conceito à entrega? + Sim. Fazemos conceito, roteiro, direção, captação e pós-produção do videoclipe, além do material de divulgação.
- Sim. Cobrimos shows e turnês com registro de palco, bastidor e público, entregando vídeo e fotografia.
- Fazem cobertura de shows e turnê? + Sim. Cobrimos shows e turnês com registro de palco, bastidor e público, entregando vídeo e fotografia.
- Sim. Teaser, making of e cortes verticais fazem parte do pacote para sustentar o lançamento nas plataformas.
- Entregam conteúdo para redes além do clipe? + Sim. Teaser, making of e cortes verticais fazem parte do pacote para sustentar o lançamento nas plataformas.
- Pelo diagnóstico visual entendemos o escopo do release, locações e equipe, e montamos uma proposta por faixa de investimento.
- Como funciona o orçamento? + Pelo diagnóstico visual entendemos o escopo do release, locações e equipe, e montamos uma proposta por faixa de investimento.
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Botões/cards de serviço
- 01 Direção de clipe Conceito, roteiro e direção de videoclipe alinhados à narrativa da música. Entender serviço
- 02 Captação de vídeo Operação multicâmera com movimento e linguagem coerentes ao tom do projeto. Entender serviço
- 03 Fotografia Fotos de divulgação, capa e ensaio do artista com direção de cena. Entender serviço
- 04 Cobertura de shows Registro de shows e turnê — palco, bastidor e público. Entender serviço
- 05 Teaser & making of Conteúdo de antecipação e bastidor para alimentar o lançamento. Entender serviço
- 06 Cortes para redes Reels e cortes verticais para sustentar o release nas plataformas. Entender serviço

#### FAQs
- Vocês produzem o clipe do conceito à entrega? +
- Fazem cobertura de shows e turnê? +
- Entregam conteúdo para redes além do clipe? +
- Como funciona o orçamento? +

#### Galeria/lightbox
- Total de botões de imagem: 19
- Abrir imagem: Direção de videoclipe com artista em performance
- Abrir imagem: Direção visual para artista e videoclipe 01
- Abrir imagem: Direção visual para artista e videoclipe 02
- Abrir imagem: Direção visual para artista e videoclipe 03
- Abrir imagem: Direção visual para artista e videoclipe 04
- Abrir imagem: Direção visual para artista e videoclipe 05
- Abrir imagem: Direção visual para artista e videoclipe 06
- Abrir imagem: Direção visual para artista e videoclipe 07
- Abrir imagem: Direção visual para artista e videoclipe 08
- Abrir imagem: Direção visual para artista e videoclipe 09
- Abrir imagem: Direção visual para artista e videoclipe 10
- Abrir imagem: Direção visual para artista e videoclipe 11
- Abrir imagem: Direção visual para artista e videoclipe 12
- Abrir imagem: Direção visual para artista e videoclipe 13
- Abrir imagem: Direção visual para artista e videoclipe 14
- Abrir imagem: Direção visual para artista e videoclipe 15
- Abrir imagem: Direção visual para artista e videoclipe 16
- Abrir imagem: Direção visual para artista e videoclipe 17
- Abrir imagem: Direção visual para artista e videoclipe 18

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Falar no WhatsApp -> https://wa.me/5511950747192
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /posicionamento-profissional

- URL: https://www.versavisual.com.br/posicionamento-profissional
- Status: 200
- Title: Fotografia de Posicionamento para Profissionais, Clínicas e Marcas Pessoais | VERSAVISUAL | VERSAVISUAL
- Meta description: Retratos, vídeos institucionais e direção visual para médicos, clínicas, executivos e marcas pessoais que precisam comunicar autoridade, confiança e valor através da imagem.
- Interações detectadas: 70 botões; 59 botões de imagem; 6 cards de serviço; 4 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Início · Posicionamento Profissional
- Fotografia de posicionamento para profissionais, clínicas e marcas pessoais.
- Retratos, vídeos institucionais e direção visual para profissionais que precisam comunicar autoridade, confiança e valor através da imagem.
- Quero melhorar minha imagem Falar no WhatsApp
- Para quem é
- Profissionais e clínicas que vendem confiança.
- Em mercados de alto valor, a decisão começa pela percepção. Quem comunica autoridade na imagem conquista confiança antes da primeira conversa.
- Médicos, dentistas e clínicas que querem comunicar autoridade.
- Executivos e consultores construindo marca pessoal.
- Profissionais liberais que vendem serviço de alto valor.
- O problema
- Sua imagem não comunica o seu valor.
- Retrato de celular, fundo improvisado e ausência de identidade visual passam a mensagem errada. Em mercados premium, isso custa autoridade — e clientes.
- O problema Sua imagem não comunica o seu valor. Retrato de celular, fundo improvisado e ausência de identidade visual passam a mensagem errada. Em mercados premium, isso custa autoridade — e clientes.
- Como resolvemos
- Imagem à altura da sua autoridade.
- Construímos um sistema visual de posicionamento: retratos com direção, vídeo institucional e linguagem coerente para site, redes e materiais. Confiança que se vê antes de se contratar.
- Serviços inclusos
- Retrato, vídeo e marca pessoal.
- Serviços inclusos Retrato, vídeo e marca pessoal.
- 01
- Retrato corporativo
- Retratos com direção de pose, luz e expressão que comunicam autoridade e confiança.
- Entender serviço
- 02
- Vídeo institucional
- Vídeo de apresentação para clínicas e profissionais — claro, sóbrio e profissional.
- 03
- Direção visual
- Linguagem visual coerente para site, redes sociais e materiais de divulgação.
- 04
- Ambiente & equipe
- Registro de consultório, clínica e equipe para transmitir estrutura e cuidado.
- 05
- Conteúdo p/ redes
- Material de autoridade para alimentar perfis profissionais com consistência.
- 06
- Tratamento
- Tratamento de imagem que respeita a pele e mantém naturalidade profissional.
- Portfólio relacionado
- Autoridade em imagem.
- Uma seleção de retratos e materiais de posicionamento.
- Portfólio relacionado Autoridade em imagem. Uma seleção de retratos e materiais de posicionamento.
- Processo de trabalho
- Do briefing ao material pronto.
- Processo de trabalho Do briefing ao material pronto.
- Briefing
- Entendemos o posicionamento, o público e onde a imagem será usada.
- 01 Briefing Entendemos o posicionamento, o público e onde a imagem será usada.
- Direção
- Definição de locação, styling e linguagem visual do profissional.
- 02 Direção Definição de locação, styling e linguagem visual do profissional.
- Produção
- Sessão com direção de pose, luz e expressão — sem improviso.
- 03 Produção Sessão com direção de pose, luz e expressão — sem improviso.
- Entrega
- Tratamento e entrega de retratos, vídeo e material para redes.
- 04 Entrega Tratamento e entrega de retratos, vídeo e material para redes.
- Sua marca pessoal
- Comunique autoridade antes da primeira conversa.
- Conte sobre o seu posicionamento. Desenhamos o sistema visual ideal para a sua marca pessoal.
- Quero melhorar minha imagem WhatsApp direto
- Dúvidas comuns
- FAQ — Posicionamento Profissional.
- Dúvidas comuns FAQ — Posicionamento Profissional.
- Sim. Produzimos retratos individuais, de equipe e registro de ambiente para clínicas e consultórios.
- Atendem clínicas e equipes, não só indivíduos? + Sim. Produzimos retratos individuais, de equipe e registro de ambiente para clínicas e consultórios.
- Sim. Produzimos vídeo de apresentação e conteúdo de autoridade alinhados à identidade visual.
- Fazem vídeo institucional além de foto? + Sim. Produzimos vídeo de apresentação e conteúdo de autoridade alinhados à identidade visual.
- Totalmente dirigida. Conduzimos pose, expressão e luz — você não precisa saber posar, nós conduzimos.
- A sessão é dirigida? Não sou modelo. + Totalmente dirigida. Conduzimos pose, expressão e luz — você não precisa saber posar, nós conduzimos.
- Pelo diagnóstico visual entendemos escopo, entregáveis e uso, e montamos uma proposta por faixa de investimento.
- Como funciona o orçamento? + Pelo diagnóstico visual entendemos escopo, entregáveis e uso, e montamos uma proposta por faixa de investimento.
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Botões/cards de serviço
- 01 Retrato corporativo Retratos com direção de pose, luz e expressão que comunicam autoridade e confiança. Entender serviço
- 02 Vídeo institucional Vídeo de apresentação para clínicas e profissionais — claro, sóbrio e profissional. Entender serviço
- 03 Direção visual Linguagem visual coerente para site, redes sociais e materiais de divulgação. Entender serviço
- 04 Ambiente & equipe Registro de consultório, clínica e equipe para transmitir estrutura e cuidado. Entender serviço
- 05 Conteúdo p/ redes Material de autoridade para alimentar perfis profissionais com consistência. Entender serviço
- 06 Tratamento Tratamento de imagem que respeita a pele e mantém naturalidade profissional. Entender serviço

#### FAQs
- Atendem clínicas e equipes, não só indivíduos? +
- Fazem vídeo institucional além de foto? +
- A sessão é dirigida? Não sou modelo. +
- Como funciona o orçamento? +

#### Galeria/lightbox
- Total de botões de imagem: 59
- Abrir imagem: Retrato profissional com direção de pose e luz natural para marca pessoal
- Abrir imagem: Retrato de posicionamento profissional 01
- Abrir imagem: Retrato de posicionamento profissional 02
- Abrir imagem: Retrato de posicionamento profissional 03
- Abrir imagem: Retrato de posicionamento profissional 04
- Abrir imagem: Retrato de posicionamento profissional 05
- Abrir imagem: Retrato de posicionamento profissional 06
- Abrir imagem: Retrato de posicionamento profissional 07
- Abrir imagem: Retrato de posicionamento profissional 08
- Abrir imagem: Retrato de posicionamento profissional 09
- Abrir imagem: Retrato de posicionamento profissional 10
- Abrir imagem: Retrato de posicionamento profissional 11
- Abrir imagem: Retrato de posicionamento profissional 12
- Abrir imagem: Retrato de posicionamento profissional 13
- Abrir imagem: Retrato de posicionamento profissional 14
- Abrir imagem: Retrato de posicionamento profissional 15
- Abrir imagem: Retrato de posicionamento profissional 16
- Abrir imagem: Retrato de posicionamento profissional 17
- Abrir imagem: Retrato de posicionamento profissional 18
- Abrir imagem: Retrato de posicionamento profissional 19
- ...mais 39 imagens com o mesmo padrão de lightbox.

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Falar no WhatsApp -> https://wa.me/5511950747192
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /imagem-pessoal-lifestyle

- URL: https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Status: 200
- Title: Ensaio Fotográfico Lifestyle e Imagem Pessoal para Instagram | VERSAVISUAL
- Meta description: Ensaio fotográfico lifestyle, imagem pessoal, fotos para Instagram, dating profile, autoestima e conteúdo autoral com direção de pose no Rio de Janeiro.
- Interações detectadas: 80 botões; 69 botões de imagem; 6 cards de serviço; 4 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Início · Imagem Pessoal & Lifestyle
- Ensaio lifestyle e imagem pessoal para quem quer se ver bem.
- Fotografia com direção de pose, luz natural e olhar sensível para pessoas que querem fotos para Instagram, ensaio autoral, autoestima, dating profile ou um momento de vida bem registrado.
- Quero melhorar minha imagem Falar no WhatsApp
- Para quem é
- Pessoas que querem se reconhecer na própria imagem.
- Você não precisa ser modelo, influenciador ou ter uma marca pronta. A sessão existe para traduzir presença, beleza e personalidade em imagens que parecem suas de verdade.
- Quem quer fotos bonitas e naturais para Instagram ou perfil pessoal.
- Pessoas em fase nova de vida, aniversário, recomeço ou autoestima.
- Criadores e profissionais que querem conteúdo leve sem parecer corporativo.
- O problema
- A câmera intimida quando falta direção.
- Muita gente quer fotos boas, mas trava porque não sabe posar, não sabe que roupa usar ou tem medo de parecer artificial. O resultado vira foto bonita dos outros — nunca sua.
- O problema A câmera intimida quando falta direção. Muita gente quer fotos boas, mas trava porque não sabe posar, não sabe que roupa usar ou tem medo de parecer artificial. O resultado vira foto bonita dos outros — nunca sua.
- Como resolvemos
- Direção para você se sentir bem em cena.
- Conduzimos pose, expressão, movimento, locação e ritmo da sessão. A ideia não é fabricar personagem: é encontrar uma imagem bonita, honesta e publicável de quem você já é.
- Serviços inclusos
- Da autoestima ao feed.
- Serviços inclusos Da autoestima ao feed.
- 01
- Ensaio autoral
- Sessão fotográfica com conceito leve, direção de pose e estética pessoal.
- Entender serviço
- 02
- Fotos para Instagram
- Imagens pensadas para feed, stories, perfil e presença digital.
- 03
- Direção de pose
- Condução completa de corpo, olhar, mãos e expressão. Você não precisa saber posar.
- 04
- Lifestyle externo
- Locações urbanas, praia, casa, hotel ou espaços com luz natural e atmosfera.
- 05
- Beauty natural
- Retratos com foco em pele, presença e beleza real, sem descaracterizar.
- 06
- Curadoria
- Seleção e tratamento de imagens para entregar um conjunto coeso e fácil de usar.
- Portfólio relacionado
- Você em imagem.
- Uma seleção de ensaios lifestyle, beauty natural e momentos pessoais.
- Portfólio relacionado Você em imagem. Uma seleção de ensaios lifestyle, beauty natural e momentos pessoais.
- Processo de trabalho
- Do desconforto à imagem pronta.
- Processo de trabalho Do desconforto à imagem pronta.
- Conversa
- Entendemos seu momento, referências, inseguranças e onde as fotos serão usadas.
- 01 Conversa Entendemos seu momento, referências, inseguranças e onde as fotos serão usadas.
- Direção
- Definimos clima, locação, roupa e caminho visual da sessão.
- 02 Direção Definimos clima, locação, roupa e caminho visual da sessão.
- Sessão
- Condução leve de pose e movimento para você relaxar e se reconhecer.
- 03 Sessão Condução leve de pose e movimento para você relaxar e se reconhecer.
- Entrega
- Curadoria, tratamento e entrega das imagens para usar no feed, perfil ou memória pessoal.
- 04 Entrega Curadoria, tratamento e entrega das imagens para usar no feed, perfil ou memória pessoal.
- Seu ensaio
- Você merece se ver bem na própria imagem.
- Conte o que você quer sentir quando olhar para as fotos. A gente desenha uma sessão que combine com você.
- Quero melhorar minha imagem WhatsApp direto
- Dúvidas comuns
- FAQ — Imagem Pessoal & Lifestyle.
- Dúvidas comuns FAQ — Imagem Pessoal & Lifestyle.
- Sim. A sessão é totalmente dirigida: pose, expressão, movimento e ritmo. Você não precisa chegar sabendo o que fazer.
- Eu nunca fiz ensaio. Vocês dirigem tudo? + Sim. A sessão é totalmente dirigida: pose, expressão, movimento e ritmo. Você não precisa chegar sabendo o que fazer.
- Sim. Pensamos a entrega para perfil, feed, stories e presença digital, sem deixar a imagem artificial.
- Serve para fotos de Instagram? + Sim. Pensamos a entrega para perfil, feed, stories e presença digital, sem deixar a imagem artificial.
- Pode. O ensaio pode ser por autoestima, aniversário, fase nova, dating profile ou simplesmente para se ver bem.
- Pode ser um ensaio sem objetivo profissional? + Pode. O ensaio pode ser por autoestima, aniversário, fase nova, dating profile ou simplesmente para se ver bem.
- Pelo diagnóstico visual entendemos locação, duração, número de looks e quantidade de imagens, e montamos uma proposta por faixa de investimento.
- Como funciona o orçamento? + Pelo diagnóstico visual entendemos locação, duração, número de looks e quantidade de imagens, e montamos uma proposta por faixa de investimento.
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Botões/cards de serviço
- 01 Ensaio autoral Sessão fotográfica com conceito leve, direção de pose e estética pessoal. Entender serviço
- 02 Fotos para Instagram Imagens pensadas para feed, stories, perfil e presença digital. Entender serviço
- 03 Direção de pose Condução completa de corpo, olhar, mãos e expressão. Você não precisa saber posar. Entender serviço
- 04 Lifestyle externo Locações urbanas, praia, casa, hotel ou espaços com luz natural e atmosfera. Entender serviço
- 05 Beauty natural Retratos com foco em pele, presença e beleza real, sem descaracterizar. Entender serviço
- 06 Curadoria Seleção e tratamento de imagens para entregar um conjunto coeso e fácil de usar. Entender serviço

#### FAQs
- Eu nunca fiz ensaio. Vocês dirigem tudo? +
- Serve para fotos de Instagram? +
- Pode ser um ensaio sem objetivo profissional? +
- Como funciona o orçamento? +

#### Galeria/lightbox
- Total de botões de imagem: 69
- Abrir imagem: Ensaio lifestyle autoral com luz natural no rosto
- Abrir imagem: Ensaio pessoal em locação externa com styling claro
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 01
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 02
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 03
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 04
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 05
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 06
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 07
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 08
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 09
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 10
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 11
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 12
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 13
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 14
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 15
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 16
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 17
- Abrir imagem: Ensaio de imagem pessoal e lifestyle 18
- ...mais 49 imagens com o mesmo padrão de lightbox.

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Falar no WhatsApp -> https://wa.me/5511950747192
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /casamentos

- URL: https://www.versavisual.com.br/casamentos
- Status: 200
- Title: Fotografia e Vídeo de Casamento com Direção Sensível | VERSAVISUAL | VERSAVISUAL
- Meta description: Fotografia e vídeo de casamento com direção sensível, narrativa visual, retratos naturais, cerimônia, festa, detalhes e entrega editorial no Rio de Janeiro.
- Interações detectadas: 31 botões; 20 botões de imagem; 6 cards de serviço; 4 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Início · Casamentos
- Fotografia e vídeo de casamento para viver, lembrar e sentir.
- Registro de casamento com olhar narrativo: direção leve, presença discreta, retratos naturais, cerimônia, festa, detalhes e atmosfera do dia sem transformar afeto em pose dura.
- Quero melhorar minha imagem Falar no WhatsApp
- Para quem é
- Casais que querem memória com verdade e beleza.
- O casamento passa rápido. A imagem precisa guardar o que aconteceu e também o que foi sentido: a espera, o encontro, o riso, o abraço, o cenário e a energia de quem estava ali.
- Casais que querem fotos elegantes, naturais e com direção sensível.
- Casamentos ao ar livre, mini weddings, destination e celebrações íntimas.
- Famílias que valorizam álbum, filme e memória visual com acabamento editorial.
- O problema
- Um dia irrepetível não pode virar registro genérico.
- Quando falta direção e sensibilidade, as fotos ficam posadas demais ou soltas demais. O casal não se reconhece, os detalhes se perdem e a história do dia vira uma sequência sem emoção.
- O problema Um dia irrepetível não pode virar registro genérico. Quando falta direção e sensibilidade, as fotos ficam posadas demais ou soltas demais. O casal não se reconhece, os detalhes se perdem e a história do dia vira uma sequência sem emoção.
- Como resolvemos
- Presença discreta, narrativa e direção quando precisa.
- Acompanhamos o dia com leitura de momento e direção leve nos retratos. O resultado é um conjunto coeso: espontâneo quando a cena pede, editorial quando a memória merece.
- Serviços inclusos
- Do making of à última dança.
- Serviços inclusos Do making of à última dança.
- 01
- Making of
- Preparação, detalhes, vestido, encontro com família e clima antes da cerimônia.
- Entender serviço
- 02
- Cerimônia
- Registro atento aos votos, entradas, emoção, gestos pequenos e momentos-chave.
- 03
- Retratos do casal
- Direção leve para fotos naturais, elegantes e sem rigidez.
- 04
- Festa
- Energia da pista, convidados, brindes, abraços e acontecimentos reais.
- 05
- Filme
- Vídeo de casamento com narrativa, ritmo e sensibilidade para reviver o dia.
- 06
- Curadoria
- Entrega organizada, tratamento coeso e seleção pensada para álbum e redes.
- Portfólio relacionado
- Casamento em narrativa.
- Uma seleção de retratos, cerimônia, festa e atmosfera de casamento.
- Portfólio relacionado Casamento em narrativa. Uma seleção de retratos, cerimônia, festa e atmosfera de casamento.
- Processo de trabalho
- Da conversa à memória pronta.
- Processo de trabalho Da conversa à memória pronta.
- Conversa
- Entendemos o estilo do casal, roteiro do dia e prioridades emocionais.
- 01 Conversa Entendemos o estilo do casal, roteiro do dia e prioridades emocionais.
- Plano
- Mapeamos horários, locações, família, entradas e momentos que não podem faltar.
- 02 Plano Mapeamos horários, locações, família, entradas e momentos que não podem faltar.
- Cobertura
- Registro do dia com direção leve, presença atenta e cuidado com os detalhes.
- 03 Cobertura Registro do dia com direção leve, presença atenta e cuidado com os detalhes.
- Entrega
- Curadoria, tratamento e organização das imagens e filmes para guardar e compartilhar.
- 04 Entrega Curadoria, tratamento e organização das imagens e filmes para guardar e compartilhar.
- Seu casamento
- O dia passa. A imagem fica.
- Conte como será a celebração. A gente desenha uma cobertura com o tamanho, a sensibilidade e o ritmo do seu casamento.
- Quero melhorar minha imagem WhatsApp direto
- Dúvidas comuns
- FAQ — Casamentos.
- Dúvidas comuns FAQ — Casamentos.
- Sim. A direção é leve e natural, para o casal se sentir confortável sem perder espontaneidade.
- Vocês dirigem os retratos do casal? + Sim. A direção é leve e natural, para o casal se sentir confortável sem perder espontaneidade.
- Sim. Montamos cobertura integrada de fotografia e vídeo conforme o tamanho do casamento e os momentos prioritários.
- Fazem foto e vídeo no mesmo pacote? + Sim. Montamos cobertura integrada de fotografia e vídeo conforme o tamanho do casamento e os momentos prioritários.
- Sim. A linguagem funciona muito bem para celebrações íntimas, externas e destination weddings.
- Atendem mini wedding e casamento ao ar livre? + Sim. A linguagem funciona muito bem para celebrações íntimas, externas e destination weddings.
- Pelo diagnóstico entendemos data, local, duração, número de convidados e entregáveis, e montamos uma proposta por faixa de investimento.
- Como funciona o orçamento? + Pelo diagnóstico entendemos data, local, duração, número de convidados e entregáveis, e montamos uma proposta por faixa de investimento.
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Botões/cards de serviço
- 01 Making of Preparação, detalhes, vestido, encontro com família e clima antes da cerimônia. Entender serviço
- 02 Cerimônia Registro atento aos votos, entradas, emoção, gestos pequenos e momentos-chave. Entender serviço
- 03 Retratos do casal Direção leve para fotos naturais, elegantes e sem rigidez. Entender serviço
- 04 Festa Energia da pista, convidados, brindes, abraços e acontecimentos reais. Entender serviço
- 05 Filme Vídeo de casamento com narrativa, ritmo e sensibilidade para reviver o dia. Entender serviço
- 06 Curadoria Entrega organizada, tratamento coeso e seleção pensada para álbum e redes. Entender serviço

#### FAQs
- Vocês dirigem os retratos do casal? +
- Fazem foto e vídeo no mesmo pacote? +
- Atendem mini wedding e casamento ao ar livre? +
- Como funciona o orçamento? +

#### Galeria/lightbox
- Total de botões de imagem: 20
- Abrir imagem: Casal em ensaio de casamento ao ar livre com direção natural
- Abrir imagem: Noiva em cena de casamento com luz dramática em preto e branco
- Abrir imagem: Fotografia de casamento 01
- Abrir imagem: Fotografia de casamento 02
- Abrir imagem: Fotografia de casamento 03
- Abrir imagem: Fotografia de casamento 04
- Abrir imagem: Fotografia de casamento 05
- Abrir imagem: Fotografia de casamento 06
- Abrir imagem: Fotografia de casamento 07
- Abrir imagem: Fotografia de casamento 08
- Abrir imagem: Fotografia de casamento 09
- Abrir imagem: Fotografia de casamento 10
- Abrir imagem: Fotografia de casamento 11
- Abrir imagem: Fotografia de casamento 12
- Abrir imagem: Fotografia de casamento 13
- Abrir imagem: Fotografia de casamento 14
- Abrir imagem: Fotografia de casamento 15
- Abrir imagem: Fotografia de casamento 16
- Abrir imagem: Fotografia de casamento 17
- Abrir imagem: Fotografia de casamento 18

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Falar no WhatsApp -> https://wa.me/5511950747192
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /gestantes

- URL: https://www.versavisual.com.br/gestantes
- Status: 200
- Title: Ensaio Gestante com Direção Natural e Sensível | VERSAVISUAL | VERSAVISUAL
- Meta description: Ensaio gestante com direção de pose, luz natural, praia, natureza, retratos de maternidade e memória afetiva no Rio de Janeiro.
- Interações detectadas: 23 botões; 12 botões de imagem; 6 cards de serviço; 4 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Início · Gestantes
- Ensaio gestante para guardar a beleza desse corpo em transformação.
- Fotografia de maternidade com direção sensível, luz natural e estética leve para registrar presença, vínculo, corpo e memória sem pose artificial.
- Quero melhorar minha imagem Falar no WhatsApp
- Para quem é
- Mulheres e famílias vivendo uma fase que merece imagem.
- A gestação muda o corpo, o tempo e a forma de se olhar. A sessão existe para transformar essa fase em memória bonita, acolhedora e verdadeira.
- Gestantes que querem se sentir bonitas e seguras diante da câmera.
- Famílias que querem registrar vínculo, espera e afeto.
- Ensaios na praia, natureza, casa, hotel ou locações com luz natural.
- O problema
- Nem todo ensaio gestante precisa parecer igual.
- Muita sessão vira repetição de poses prontas. A mulher se sente personagem, não protagonista. O registro fica bonito, mas não parece dela.
- O problema Nem todo ensaio gestante precisa parecer igual. Muita sessão vira repetição de poses prontas. A mulher se sente personagem, não protagonista. O registro fica bonito, mas não parece dela.
- Como resolvemos
- Direção de pose com escuta e naturalidade.
- Criamos uma sessão em torno do corpo, do ritmo e da personalidade da gestante. Dirigimos postura, mãos, olhar e movimento para a imagem ficar bonita sem perder verdade.
- Serviços inclusos
- Do cuidado à memória.
- Serviços inclusos Do cuidado à memória.
- 01
- Conceito
- Definição de clima, locação, referências e intenção do ensaio.
- Entender serviço
- 02
- Direção de pose
- Condução sensível de corpo, mãos, olhar e movimento para trazer conforto.
- 03
- Luz natural
- Uso de praia, natureza ou ambientes claros para valorizar pele e atmosfera.
- 04
- Família
- Possibilidade de incluir parceiro, filhos e vínculos importantes no registro.
- 05
- Beauty natural
- Retratos com estética leve, respeitando pele, corpo e momento.
- 06
- Entrega
- Curadoria e tratamento de imagens para álbum, impressão, redes e lembrança.
- Portfólio relacionado
- Maternidade em imagem.
- Uma seleção de ensaios gestantes com praia, natureza e detalhes afetivos.
- Portfólio relacionado Maternidade em imagem. Uma seleção de ensaios gestantes com praia, natureza e detalhes afetivos.
- Processo de trabalho
- Da insegurança ao registro leve.
- Processo de trabalho Da insegurança ao registro leve.
- Conversa
- Entendemos fase da gestação, referências, conforto e pessoas que participam.
- 01 Conversa Entendemos fase da gestação, referências, conforto e pessoas que participam.
- Preparação
- Definimos locação, horário de luz, roupa e caminho visual da sessão.
- 02 Preparação Definimos locação, horário de luz, roupa e caminho visual da sessão.
- Sessão
- Direção tranquila para pose, movimento e expressão sem pressa.
- 03 Sessão Direção tranquila para pose, movimento e expressão sem pressa.
- Curadoria, tratamento natural e imagens prontas para guardar, imprimir e compartilhar.
- 04 Entrega Curadoria, tratamento natural e imagens prontas para guardar, imprimir e compartilhar.
- Seu ensaio gestante
- Você merece lembrar dessa fase com carinho.
- Conte em que momento da gestação você está. A gente desenha uma sessão confortável, bonita e possível para você.
- Quero melhorar minha imagem WhatsApp direto
- Dúvidas comuns
- FAQ — Gestantes.
- Dúvidas comuns FAQ — Gestantes.
- Geralmente entre 28 e 34 semanas, mas ajustamos conforme conforto, saúde e intenção visual da gestante.
- Qual o melhor período para fazer o ensaio? + Geralmente entre 28 e 34 semanas, mas ajustamos conforme conforto, saúde e intenção visual da gestante.
- Sim. A sessão é totalmente dirigida com cuidado para corpo, mãos, olhar e movimento.
- Eu não sei posar. Vocês dirigem? + Sim. A sessão é totalmente dirigida com cuidado para corpo, mãos, olhar e movimento.
- Pode. Parceiro, filhos e vínculos importantes podem entrar no ensaio de forma natural.
- Pode incluir família? + Pode. Parceiro, filhos e vínculos importantes podem entrar no ensaio de forma natural.
- Pelo diagnóstico entendemos locação, duração, participantes e quantidade de imagens, e montamos uma proposta por faixa de investimento.
- Como funciona o orçamento? + Pelo diagnóstico entendemos locação, duração, participantes e quantidade de imagens, e montamos uma proposta por faixa de investimento.
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Botões/cards de serviço
- 01 Conceito Definição de clima, locação, referências e intenção do ensaio. Entender serviço
- 02 Direção de pose Condução sensível de corpo, mãos, olhar e movimento para trazer conforto. Entender serviço
- 03 Luz natural Uso de praia, natureza ou ambientes claros para valorizar pele e atmosfera. Entender serviço
- 04 Família Possibilidade de incluir parceiro, filhos e vínculos importantes no registro. Entender serviço
- 05 Beauty natural Retratos com estética leve, respeitando pele, corpo e momento. Entender serviço
- 06 Entrega Curadoria e tratamento de imagens para álbum, impressão, redes e lembrança. Entender serviço

#### FAQs
- Qual o melhor período para fazer o ensaio? +
- Eu não sei posar. Vocês dirigem? +
- Pode incluir família? +
- Como funciona o orçamento? +

#### Galeria/lightbox
- Total de botões de imagem: 12
- Abrir imagem: Ensaio gestante na praia com direção de pose e luz natural
- Abrir imagem: Gestante entre coqueiros em composição vertical
- Abrir imagem: Ensaio gestante 01
- Abrir imagem: Ensaio gestante 02
- Abrir imagem: Ensaio gestante 03
- Abrir imagem: Ensaio gestante 04
- Abrir imagem: Ensaio gestante 05
- Abrir imagem: Ensaio gestante 06
- Abrir imagem: Ensaio gestante 07
- Abrir imagem: Ensaio gestante 08
- Abrir imagem: Ensaio gestante 09
- Abrir imagem: Ensaio gestante 10

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Falar no WhatsApp -> https://wa.me/5511950747192
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

### /hotelaria-lifestyle

- URL: https://www.versavisual.com.br/hotelaria-lifestyle
- Status: 200
- Title: Fotografia e Vídeo Lifestyle para Hotéis, Resorts e Experiências | VERSAVISUAL | VERSAVISUAL
- Meta description: Produção de imagens para hotelaria, gastronomia, turismo e experiências, com foco em desejo, atmosfera, lifestyle e conversão comercial. Fotografia e vídeo para hotéis e resorts.
- Interações detectadas: 22 botões; 11 botões de imagem; 6 cards de serviço; 4 FAQs; 0 tabs; 0 cards de portfólio.

#### Copy principal

- Início · Hotelaria & Lifestyle
- Fotografia e vídeo lifestyle para hotéis, resorts e experiências.
- Produção de imagens para hotelaria, gastronomia, turismo e experiências, com foco em desejo, atmosfera, lifestyle e conversão comercial.
- Quero melhorar minha imagem Falar no WhatsApp
- Para quem é
- Hotéis, resorts e experiências que vendem atmosfera.
- Em turismo e hospitalidade, o cliente compra antes de chegar. A imagem precisa transmitir desejo, atmosfera e o sentimento de estar ali — não apenas mostrar o espaço.
- Hotéis, pousadas e resorts que vendem por reserva online.
- Restaurantes e experiências gastronômicas premium.
- Operadoras de turismo e marcas de lifestyle e hospitalidade.
- O problema
- Fotos de imobiliária não vendem experiência.
- Imagens frias, sem gente e sem atmosfera, mostram o espaço mas não despertam desejo. O hóspede não se imagina ali — e a reserva vai para o concorrente com imagem melhor.
- O problema Fotos de imobiliária não vendem experiência. Imagens frias, sem gente e sem atmosfera, mostram o espaço mas não despertam desejo. O hóspede não se imagina ali — e a reserva vai para o concorrente com imagem melhor.
- Como resolvemos
- Desejo, atmosfera e conversão.
- Produzimos imagem de lifestyle: luz natural, momento real, gastronomia, detalhe e experiência. Conteúdo que faz o hóspede se imaginar no lugar — e converter em reserva.
- Serviços inclusos
- Da diária ao desejo.
- Serviços inclusos Da diária ao desejo.
- 01
- Fotografia lifestyle
- Imagens de hospedagem, áreas e experiências com atmosfera e luz natural.
- Entender serviço
- 02
- Vídeo institucional
- Vídeo de apresentação do hotel ou resort para site, OTAs e mídia.
- 03
- Gastronomia
- Fotografia e vídeo de gastronomia e bar com foco em desejo e detalhe.
- 04
- Conteúdo p/ redes
- Reels e posts para alimentar redes e sustentar a marca o ano todo.
- 05
- Direção visual
- Linguagem coesa para site, reservas, mídia paga e materiais.
- 06
- Tratamento
- Gradação de cor que valoriza atmosfera sem perder a verdade do espaço.
- Portfólio relacionado
- Hospitalidade em imagem.
- Uma seleção de hotelaria, gastronomia e lifestyle.
- Portfólio relacionado Hospitalidade em imagem. Uma seleção de hotelaria, gastronomia e lifestyle.
- Processo de trabalho
- Da locação à conversão.
- Processo de trabalho Da locação à conversão.
- Briefing
- Entendemos o público, a atmosfera desejada e os canais de venda.
- 01 Briefing Entendemos o público, a atmosfera desejada e os canais de venda.
- Reconhecimento
- Mapeamos luz, áreas e melhores horários de captação.
- 02 Reconhecimento Mapeamos luz, áreas e melhores horários de captação.
- Produção
- Captação com momento real, gente e experiência em cena.
- 03 Produção Captação com momento real, gente e experiência em cena.
- Entrega
- Tratamento e entrega por formato para site, OTAs e redes.
- 04 Entrega Tratamento e entrega por formato para site, OTAs e redes.
- Sua próxima temporada
- Faça o hóspede desejar antes de chegar.
- Conte sobre o seu espaço e a experiência. Produzimos as imagens que convertem em reserva.
- Quero melhorar minha imagem WhatsApp direto
- Dúvidas comuns
- FAQ — Hotelaria & Lifestyle.
- Dúvidas comuns FAQ — Hotelaria & Lifestyle.
- Sim. Entregamos imagens nos formatos certos para site próprio, OTAs e mídia, com tratamento coeso.
- Vocês produzem para site e OTAs (Booking, Airbnb)? + Sim. Entregamos imagens nos formatos certos para site próprio, OTAs e mídia, com tratamento coeso.
- Sim. Gastronomia, bar e experiências fazem parte do pacote, com foco em desejo e detalhe.
- Fotografam gastronomia além do espaço? + Sim. Gastronomia, bar e experiências fazem parte do pacote, com foco em desejo e detalhe.
- Sim. Trabalhamos com momento real e direção discreta, respeitando a operação e a privacidade.
- Conseguem captar com hóspedes no local? + Sim. Trabalhamos com momento real e direção discreta, respeitando a operação e a privacidade.
- Pelo diagnóstico visual entendemos escopo, diárias de captação e entregáveis, e montamos uma proposta por faixa de investimento.
- Como funciona o orçamento? + Pelo diagnóstico visual entendemos escopo, diárias de captação e entregáveis, e montamos uma proposta por faixa de investimento.
- Ativações & Eventos
- Moda & Campanhas
- Artistas & Videoclipes
- Posicionamento Profissional
- Imagem Pessoal & Lifestyle
- Casamentos
- Gestantes
- Hotelaria & Lifestyle
- Portfólio
- Quero melhorar minha imagem
- Contato WhatsApp · 11 95074-7192 hub@versavisual.com.br Portfólio Quero melhorar minha imagem
- © 2026 VERSAVISUAL — Hub Criativo Audiovisual Rio de Janeiro · Brasil

#### Botões/cards de serviço
- 01 Fotografia lifestyle Imagens de hospedagem, áreas e experiências com atmosfera e luz natural. Entender serviço
- 02 Vídeo institucional Vídeo de apresentação do hotel ou resort para site, OTAs e mídia. Entender serviço
- 03 Gastronomia Fotografia e vídeo de gastronomia e bar com foco em desejo e detalhe. Entender serviço
- 04 Conteúdo p/ redes Reels e posts para alimentar redes e sustentar a marca o ano todo. Entender serviço
- 05 Direção visual Linguagem coesa para site, reservas, mídia paga e materiais. Entender serviço
- 06 Tratamento Gradação de cor que valoriza atmosfera sem perder a verdade do espaço. Entender serviço

#### FAQs
- Vocês produzem para site e OTAs (Booking, Airbnb)? +
- Fotografam gastronomia além do espaço? +
- Conseguem captar com hóspedes no local? +
- Como funciona o orçamento? +

#### Galeria/lightbox
- Total de botões de imagem: 11
- Abrir imagem: Sala de hotel com poltronas, luz natural, plantas e atmosfera acolhedora
- Abrir imagem: Fotografia de hotelaria e lifestyle 01
- Abrir imagem: Fotografia de hotelaria e lifestyle 02
- Abrir imagem: Fotografia de hotelaria e lifestyle 03
- Abrir imagem: Fotografia de hotelaria e lifestyle 04
- Abrir imagem: Fotografia de hotelaria e lifestyle 05
- Abrir imagem: Fotografia de hotelaria e lifestyle 06
- Abrir imagem: Fotografia de hotelaria e lifestyle 07
- Abrir imagem: Fotografia de hotelaria e lifestyle 08
- Abrir imagem: Fotografia de hotelaria e lifestyle 09
- Abrir imagem: Fotografia de hotelaria e lifestyle 10

#### Links/CTAs da página
- [logo/sem texto] -> https://www.versavisual.com.br/
- Início -> https://www.versavisual.com.br/
- Ativações & Eventos -> https://www.versavisual.com.br/ativacoes-eventos
- Portfólio -> https://www.versavisual.com.br/portfolio
- Segmentos -> https://www.versavisual.com.br/#nichos
- Processo -> https://www.versavisual.com.br/#processo
- Quero melhorar minha imagem -> https://www.versavisual.com.br/diagnostico-visual
- Falar no WhatsApp -> https://wa.me/5511950747192
- WhatsApp direto -> https://wa.me/5511950747192
- Moda & Campanhas -> https://www.versavisual.com.br/moda-campanhas
- Artistas & Videoclipes -> https://www.versavisual.com.br/artistas-videoclipes
- Posicionamento Profissional -> https://www.versavisual.com.br/posicionamento-profissional
- Imagem Pessoal & Lifestyle -> https://www.versavisual.com.br/imagem-pessoal-lifestyle
- Casamentos -> https://www.versavisual.com.br/casamentos
- Gestantes -> https://www.versavisual.com.br/gestantes
- Hotelaria & Lifestyle -> https://www.versavisual.com.br/hotelaria-lifestyle
- WhatsApp · 11 95074-7192 -> https://wa.me/5511950747192
- hub@versavisual.com.br -> mailto:hub@versavisual.com.br
- WhatsApp -> https://wa.me/5511950747192

## 7. SEO, Search Console e requisitos de ranqueamento

Esta seção deve ser tratada como parte da base de construção da nova versão. O objetivo não é apenas preservar o site atual, mas reconstruí-lo com uma fundação mais forte para crawling, indexação, entendimento semântico, CTR e performance.

Referências oficiais usadas como base:

- Google Search: crawling, indexing e serving: https://developers.google.com/search/docs/fundamentals/how-search-works
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Robots.txt: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Links rastreáveis e anchor text: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Dados estruturados: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals

### Diagnóstico técnico atual

- `/sitemap.xml` retorna página 404 do Next. A nova versão deve gerar sitemap XML real e submetê-lo no Google Search Console.
- `/robots.txt` retorna página 404 do Next. A nova versão deve servir um robots.txt real, sem bloquear páginas públicas.
- Vários titles têm duplicação de marca, por exemplo `| VERSAVISUAL | VERSAVISUAL`. A nova versão deve corrigir titles por rota.
- O portfólio atual tem cards interativos, mas não expõe páginas públicas de cases. Isso limita indexação, prova de autoridade e ranqueamento por termos específicos.
- As páginas de segmento têm boa estrutura comercial, mas podem ganhar blocos semânticos mais explícitos para intenção de busca local e por serviço.
- O site usa muitas imagens e vídeo de hero; a nova versão precisa otimizar LCP, INP e CLS desde a arquitetura.

### Requisitos técnicos obrigatórios

- Criar `sitemap.xml` com todas as rotas públicas indexáveis.
- Criar `robots.txt` com referência ao sitemap:

```txt
User-agent: *
Allow: /

Sitemap: https://www.versavisual.com.br/sitemap.xml
```

- Adicionar `canonical` absoluto em todas as páginas públicas.
- Garantir que todas as páginas estratégicas retornem `200`, sem `noindex`, sem bloqueio por robots e sem dependência de login.
- Gerar metadata por rota: title, description, canonical, Open Graph title, Open Graph description e imagem social.
- Criar estrutura de headings consistente: um único `h1` por página, seções com `h2`, subseções/cards com `h3` quando fizer sentido.
- Usar links internos em `<a href>` reais, não apenas botões JavaScript, para rotas indexáveis.
- Preservar conteúdo importante no HTML inicial/renderizado para Googlebot, inclusive em mobile.
- Criar página 404 própria com links para Home, Portfólio, Segmentos e Diagnóstico.

### Titles e descriptions recomendados

| Rota | Title recomendado | Meta description recomendada |
|---|---|---|
| `/` | VERSAVISUAL - Fotografia, Vídeo e Storymaking para Marcas | Hub criativo audiovisual no Rio de Janeiro para fotografia, vídeo, direção visual, storymaking, eventos, campanhas, artistas e marcas em todo o Brasil. |
| `/ativacoes-eventos` | Fotografia e Vídeo para Ativações de Marca e Eventos Corporativos | Cobertura audiovisual para ativações, feiras, lançamentos e eventos corporativos com fotografia, vídeo, storymaking em tempo real e direção visual. |
| `/portfolio` | Portfólio Audiovisual - VERSAVISUAL | Veja projetos de fotografia, vídeo e storymaking para ativações, moda, artistas, posicionamento profissional, casamentos, gestantes e hotelaria. |
| `/diagnostico-visual` | Diagnóstico Visual Gratuito - VERSAVISUAL | Solicite um diagnóstico visual gratuito para entender a melhor solução de fotografia, vídeo, storymaking ou direção visual para seu projeto. |
| `/moda-campanhas` | Fotografia de Moda, Beauty e Campanhas para Marcas | Direção criativa, fotografia editorial, beauty, lifestyle, fashion film e campanhas para marcas de moda, beleza e lifestyle. |
| `/artistas-videoclipes` | Videoclipes, Fotografia e Conteúdo para Artistas | Direção e produção audiovisual para artistas, shows, videoclipes, press kits, teasers, making of e conteúdo para redes. |
| `/posicionamento-profissional` | Fotografia de Posicionamento para Profissionais e Clínicas | Retratos corporativos, vídeo institucional e direção visual para profissionais, clínicas, equipes e marcas pessoais. |
| `/imagem-pessoal-lifestyle` | Ensaio Fotográfico Lifestyle e Imagem Pessoal | Ensaio fotográfico com direção de pose, luz natural e estética pessoal para Instagram, autoestima, perfil pessoal e momentos de vida. |
| `/casamentos` | Fotografia e Vídeo de Casamento com Direção Sensível | Cobertura de casamento com fotografia, filme, making of, cerimônia, festa, retratos do casal e curadoria de entrega. |
| `/gestantes` | Ensaio Gestante com Direção Natural e Sensível | Fotografia de maternidade com direção de pose, luz natural, família, beauty natural e entrega para memória, álbum e redes. |
| `/hotelaria-lifestyle` | Fotografia e Vídeo Lifestyle para Hotéis e Experiências | Produção audiovisual para hotéis, pousadas, resorts, gastronomia, turismo e experiências com foco em desejo, atmosfera e conversão. |

### Dados estruturados obrigatórios

Adicionar JSON-LD no layout global:

- `Organization` ou `LocalBusiness` para VERSAVISUAL.
- `WebSite` com nome, URL e identidade da marca.
- `BreadcrumbList` em todas as páginas internas.

Adicionar JSON-LD por template:

- Páginas de segmento: `Service`, com nome do serviço, descrição, área atendida e provedor VERSAVISUAL.
- Página de diagnóstico: `ContactPage`.
- Página de portfólio: `CollectionPage`.
- Páginas futuras de case: `CreativeWork`, `ImageGallery` ou `VideoObject` quando houver vídeo público.
- FAQs: usar `FAQPage` apenas se as perguntas e respostas estiverem visíveis ao usuário e alinhadas às diretrizes do Google.

Dados mínimos sugeridos para `Organization`/`LocalBusiness`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "VERSAVISUAL",
  "url": "https://www.versavisual.com.br/",
  "email": "hub@versavisual.com.br",
  "telephone": "+55 11 95074-7192",
  "areaServed": "Brasil",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rio de Janeiro",
    "addressRegion": "RJ",
    "addressCountry": "BR"
  },
  "description": "Hub criativo audiovisual especializado em fotografia, vídeo, direção visual e storymaking para marcas, artistas, eventos, campanhas e experiências."
}
```

### Portfólio indexável

A nova versão deve transformar cards estratégicos do portfólio em páginas públicas de case. A rota recomendada é:

- `/portfolio/ativacao-drinkball`
- `/portfolio/carnaval-de-rua-experiencia-publico`
- `/portfolio/festival-bon-cobertura-corporativa`
- `/portfolio/evento-fjt-palco-camarote`
- `/portfolio/symbh-evento-corporativo`
- `/portfolio/fashion-week-passarela-bastidor`
- `/portfolio/editorial-lifestyle-campanha`
- `/portfolio/e-o-tchan-jogadinha`
- `/portfolio/babado-novo-sururu`
- `/portfolio/retratos-posicionamento-marca-pessoal`
- `/portfolio/ensaio-autoral-lifestyle-instagram`
- `/portfolio/casamento-ao-ar-livre`
- `/portfolio/ensaio-gestante-praia`
- `/portfolio/hotelaria-espacos-cafe-spa`

Template mínimo de case:

- `h1`: nome do projeto.
- Categoria/segmento.
- Cidade/UF.
- Contexto do projeto.
- Problema ou objetivo.
- Direção visual aplicada.
- Entregáveis: fotografia, vídeo, storymaking, campanha, reels, etc.
- Galeria otimizada com alt text descritivo.
- CTA para diagnóstico.
- Links internos para segmento relacionado e portfólio.

### Intenções de busca por página

Cada página deve responder a uma intenção principal e variações naturais.

- `/ativacoes-eventos`: fotografia para eventos corporativos, cobertura audiovisual para ativações de marca, vídeo para eventos, storymaking em tempo real.
- `/moda-campanhas`: fotógrafo de moda, campanha de moda, fotografia beauty, fashion film, direção criativa para marcas.
- `/artistas-videoclipes`: produção de videoclipe, fotografia para artistas, press kit, cobertura de show, conteúdo para lançamento musical.
- `/posicionamento-profissional`: retrato corporativo, fotografia para clínicas, marca pessoal, vídeo institucional profissional.
- `/imagem-pessoal-lifestyle`: ensaio lifestyle, fotos para Instagram, ensaio pessoal, direção de pose, autoestima.
- `/casamentos`: fotografia de casamento, vídeo de casamento, mini wedding, casamento ao ar livre, casamento na praia.
- `/gestantes`: ensaio gestante, ensaio gestante na praia, fotografia de maternidade, ensaio com família.
- `/hotelaria-lifestyle`: fotografia para hotéis, vídeo para pousadas, fotografia de gastronomia, conteúdo para reservas, imagem para Booking/Airbnb/OTAs.

### Conteúdo adicional recomendado por landing

Adicionar, sem prejudicar a estética, blocos objetivos que ajudem ranqueamento:

- `Onde atendemos`: Rio de Janeiro, São Paulo, Belo Horizonte, Salvador, Macaé e operação nacional quando aplicável.
- `Entregáveis`: lista clara por serviço e formato.
- `Prazo e processo`: briefing, pré-produção, captação, edição, entrega.
- `Perguntas frequentes`: manter as FAQs atuais e expandir com dúvidas comerciais reais.
- `Provas/contexto`: logos, cases, bastidores, números, depoimentos ou recortes de entregas quando disponíveis.

### Performance e imagens

- Hero em vídeo deve ter fallback de imagem otimizada e não pode degradar LCP.
- Priorizar imagem LCP com preload/fetch priority adequado.
- Usar formatos modernos (`webp`/`avif`) quando possível.
- Definir `width`, `height` ou `aspect-ratio` para todas as imagens para evitar CLS.
- Lazy-load nas galerias abaixo da dobra.
- Evitar carregar galerias completas em tamanho máximo no primeiro render.
- Gerar thumbnails para grid e imagens maiores apenas no lightbox.
- Medir Core Web Vitals em mobile como prioridade, pois Google usa mobile-first indexing.

### Links internos e anchor text

Substituir anchors genéricos quando possível:

- `Ver página` -> `Ver fotografia para ativações e eventos`.
- `Ver página` -> `Ver fotografia de moda e campanhas`.
- `Ver página` -> `Ver produção audiovisual para artistas`.
- `Ver página` -> `Ver retratos de posicionamento profissional`.
- `Ver página` -> `Ver ensaio de imagem pessoal e lifestyle`.
- `Ver página` -> `Ver fotografia e vídeo de casamento`.
- `Ver página` -> `Ver ensaio gestante`.
- `Ver página` -> `Ver fotografia para hotelaria e lifestyle`.

Manter CTAs comerciais curtos quando o objetivo é conversão, mas enriquecer anchors de navegação e cards de descoberta.

### Plano de Search Console após publicação

1. Verificar propriedade de domínio `versavisual.com.br`.
2. Enviar `https://www.versavisual.com.br/sitemap.xml`.
3. Usar inspeção de URL para Home, Portfólio, Diagnóstico e todas as landings de segmento.
4. Solicitar indexação das páginas principais depois do deploy estável.
5. Monitorar cobertura/indexação por 7, 14 e 30 dias.
6. Monitorar consultas com muitas impressões e baixo CTR para ajustar titles/descriptions.
7. Monitorar páginas com posição média entre 8 e 20 para expansão de conteúdo.
8. Monitorar Core Web Vitals, especialmente LCP em mobile.
9. Validar dados estruturados no Rich Results Test antes e depois do deploy.

### Critérios de aceite de SEO

- `/sitemap.xml` retorna XML válido com todas as URLs públicas.
- `/robots.txt` retorna 200 e aponta para o sitemap.
- Todas as rotas públicas têm canonical absoluto.
- Nenhuma rota estratégica contém `noindex`.
- Titles são únicos e não duplicam `VERSAVISUAL`.
- Descriptions são únicas e coerentes com a intenção da página.
- Portfólio tem pelo menos 10 páginas de case indexáveis ou uma decisão documentada para lançar essa expansão em fase 2.
- Todas as imagens principais têm alt text descritivo.
- Galerias usam thumbnail + lightbox, sem carregar tudo em tamanho máximo no primeiro render.
- Páginas passam sem erros críticos em Rich Results Test quando houver structured data.
- Home, páginas de segmento, portfólio e diagnóstico ficam submetidos no Search Console.

## 8. Backlog recomendado para reconstrução

- Criar modelo de dados para segmentos: slug, hero, público, problema, solução, serviços, galeria, processo, CTA e FAQ.
- Criar modelo de dados para portfólio: categoria, título, local, imagem, ordem, destaque e descrição opcional.
- Implementar formulário com validação, estado de envio, confirmação visual e integração escolhida: e-mail, CRM, planilha ou WhatsApp prefill.
- Implementar os requisitos de SEO/Search Console da seção 7.
- Definir comportamento dos cards `Entender serviço`: modal, drawer ou expansão inline; preservar aria-label atual.
- Definir se cards de portfólio abrem lightbox, página de case ou modal; hoje são botões sem rota pública detectada.
- Preservar assets atuais ou migrar para uma biblioteca organizada com alt text equivalente.

## 9. Critérios de aceite

- Todas as 11 rotas públicas acima existem e retornam 200.
- Header, footer e WhatsApp flutuante aparecem em todas as páginas.
- Todos os CTAs `Quero melhorar minha imagem` apontam para `/diagnostico-visual`.
- Todos os CTAs de WhatsApp apontam para `https://wa.me/5511950747192`.
- `/portfolio` filtra cards por categoria sem recarregar a página.
- FAQs abrem/fecham com estado acessível.
- Imagens de galeria abrem em lightbox navegável e fechável.
- Formulário valida obrigatórios, envia, confirma sucesso e preserva fallback para WhatsApp.
- Build gera `sitemap.xml`, `robots.txt`, metadata, Open Graph e favicon.
- Build gera canonical absoluto, structured data base e titles/descriptions únicos.


## 10. Inventário completo de botões e interações

Lista bruta de todos os botões/interações extraídos do DOM público, incluindo menu, tabs, cards, serviços, FAQs e botões de imagem/lightbox.

### /

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)

### /ativacoes-eventos

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Abrir imagem: Cobertura de trio elétrico e ativação com artistas e público (class: `image-trigger split-gallery-item is-primary`)
- 3. 01 Fotografia Registro com direção de cena: equipe, interação com público, detalhes de marca e momentos-chave. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Fotografia`)
- 4. 02 Vídeo Cobertura multicâmera, aftermovie e cortes verticais para redes. Identidade visual da marca preservada. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Vídeo`)
- 5. 03 Storymaking Conteúdo em tempo real durante o evento — stories, reels e posts publicados enquanto a ação acontece. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Storymaking`)
- 6. 04 Direção visual Linguagem alinhada ao posicionamento da marca, do enquadramento ao tratamento de cor. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Direção visual`)
- 7. 05 Conteúdo p/ redes Entregáveis nos formatos certos: 9:16, 1:1 e 16:9, prontos para publicar. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Conteúdo p/ redes`)
- 8. 06 Relatório de uso Material organizado por momento e câmera, com curadoria e nomenclatura para o time da marca. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Relatório de uso`)
- 9. Abrir imagem: Cobertura de ativação de marca e evento 01 (class: `image-trigger related-photo`)
- 10. Abrir imagem: Cobertura de ativação de marca e evento 02 (class: `image-trigger related-photo`)
- 11. Abrir imagem: Cobertura de ativação de marca e evento 03 (class: `image-trigger related-photo`)
- 12. Abrir imagem: Cobertura de ativação de marca e evento 04 (class: `image-trigger related-photo`)
- 13. Abrir imagem: Cobertura de ativação de marca e evento 05 (class: `image-trigger related-photo`)
- 14. Abrir imagem: Cobertura de ativação de marca e evento 06 (class: `image-trigger related-photo`)
- 15. Abrir imagem: Cobertura de ativação de marca e evento 07 (class: `image-trigger related-photo`)
- 16. Abrir imagem: Cobertura de ativação de marca e evento 08 (class: `image-trigger related-photo`)
- 17. Abrir imagem: Cobertura de ativação de marca e evento 09 (class: `image-trigger related-photo`)
- 18. Abrir imagem: Cobertura de ativação de marca e evento 10 (class: `image-trigger related-photo`)
- 19. Abrir imagem: Cobertura de ativação de marca e evento 11 (class: `image-trigger related-photo`)
- 20. Abrir imagem: Cobertura de ativação de marca e evento 12 (class: `image-trigger related-photo`)
- 21. Abrir imagem: Cobertura de ativação de marca e evento 13 (class: `image-trigger related-photo`)
- 22. Abrir imagem: Cobertura de ativação de marca e evento 14 (class: `image-trigger related-photo`)
- 23. Abrir imagem: Cobertura de ativação de marca e evento 15 (class: `image-trigger related-photo`)
- 24. Abrir imagem: Cobertura de ativação de marca e evento 16 (class: `image-trigger related-photo`)
- 25. Abrir imagem: Cobertura de ativação de marca e evento 17 (class: `image-trigger related-photo`)
- 26. Abrir imagem: Cobertura de ativação de marca e evento 18 (class: `image-trigger related-photo`)
- 27. Abrir imagem: Cobertura de ativação de marca e evento 19 (class: `image-trigger related-photo`)
- 28. Abrir imagem: Cobertura de ativação de marca e evento 20 (class: `image-trigger related-photo`)
- 29. Abrir imagem: Cobertura de ativação de marca e evento 21 (class: `image-trigger related-photo`)
- 30. Abrir imagem: Cobertura de ativação de marca e evento 22 (class: `image-trigger related-photo`)
- 31. Abrir imagem: Cobertura de ativação de marca e evento 23 (class: `image-trigger related-photo`)
- 32. Abrir imagem: Cobertura de ativação de marca e evento 24 (class: `image-trigger related-photo`)
- 33. Abrir imagem: Cobertura de ativação de marca e evento 25 (class: `image-trigger related-photo`)
- 34. Abrir imagem: Cobertura de ativação de marca e evento 26 (class: `image-trigger related-photo`)
- 35. Abrir imagem: Cobertura de ativação de marca e evento 27 (class: `image-trigger related-photo`)
- 36. Abrir imagem: Cobertura de ativação de marca e evento 28 (class: `image-trigger related-photo`)
- 37. Abrir imagem: Cobertura de ativação de marca e evento 29 (class: `image-trigger related-photo`)
- 38. Abrir imagem: Cobertura de ativação de marca e evento 30 (class: `image-trigger related-photo`)
- 39. Abrir imagem: Cobertura de ativação de marca e evento 31 (class: `image-trigger related-photo`)
- 40. Abrir imagem: Cobertura de ativação de marca e evento 32 (class: `image-trigger related-photo`)
- 41. Abrir imagem: Cobertura de ativação de marca e evento 33 (class: `image-trigger related-photo`)
- 42. Abrir imagem: Cobertura de ativação de marca e evento 34 (class: `image-trigger related-photo`)
- 43. Abrir imagem: Cobertura de ativação de marca e evento 35 (class: `image-trigger related-photo`)
- 44. Abrir imagem: Cobertura de ativação de marca e evento 36 (class: `image-trigger related-photo`)
- 45. Abrir imagem: Cobertura de ativação de marca e evento 37 (class: `image-trigger related-photo`)
- 46. Abrir imagem: Cobertura de ativação de marca e evento 38 (class: `image-trigger related-photo`)
- 47. Abrir imagem: Cobertura de ativação de marca e evento 39 (class: `image-trigger related-photo`)
- 48. Abrir imagem: Cobertura de ativação de marca e evento 40 (class: `image-trigger related-photo`)
- 49. Abrir imagem: Cobertura de ativação de marca e evento 41 (class: `image-trigger related-photo`)
- 50. Abrir imagem: Cobertura de ativação de marca e evento 42 (class: `image-trigger related-photo`)
- 51. Abrir imagem: Cobertura de ativação de marca e evento 43 (class: `image-trigger related-photo`)
- 52. Abrir imagem: Cobertura de ativação de marca e evento 44 (class: `image-trigger related-photo`)
- 53. Abrir imagem: Cobertura de ativação de marca e evento 45 (class: `image-trigger related-photo`)
- 54. Abrir imagem: Cobertura de ativação de marca e evento 46 (class: `image-trigger related-photo`)
- 55. Abrir imagem: Cobertura de ativação de marca e evento 47 (class: `image-trigger related-photo`)
- 56. Abrir imagem: Cobertura de ativação de marca e evento 48 (class: `image-trigger related-photo`)
- 57. Abrir imagem: Cobertura de ativação de marca e evento 49 (class: `image-trigger related-photo`)
- 58. Abrir imagem: Cobertura de ativação de marca e evento 50 (class: `image-trigger related-photo`)
- 59. Abrir imagem: Cobertura de ativação de marca e evento 51 (class: `image-trigger related-photo`)
- 60. Abrir imagem: Cobertura de ativação de marca e evento 52 (class: `image-trigger related-photo`)
- 61. Abrir imagem: Cobertura de ativação de marca e evento 53 (class: `image-trigger related-photo`)
- 62. Abrir imagem: Cobertura de ativação de marca e evento 54 (class: `image-trigger related-photo`)
- 63. Abrir imagem: Cobertura de ativação de marca e evento 55 (class: `image-trigger related-photo`)
- 64. Abrir imagem: Cobertura de ativação de marca e evento 56 (class: `image-trigger related-photo`)
- 65. Abrir imagem: Cobertura de ativação de marca e evento 57 (class: `image-trigger related-photo`)
- 66. Abrir imagem: Cobertura de ativação de marca e evento 58 (class: `image-trigger related-photo`)
- 67. Abrir imagem: Cobertura de ativação de marca e evento 59 (class: `image-trigger related-photo`)
- 68. Abrir imagem: Cobertura de ativação de marca e evento 60 (class: `image-trigger related-photo`)
- 69. Abrir imagem: Cobertura de ativação de marca e evento 61 (class: `image-trigger related-photo`)
- 70. Abrir imagem: Cobertura de ativação de marca e evento 62 (class: `image-trigger related-photo`)
- 71. Abrir imagem: Cobertura de ativação de marca e evento 63 (class: `image-trigger related-photo`)
- 72. Abrir imagem: Cobertura de ativação de marca e evento 64 (class: `image-trigger related-photo`)
- 73. Abrir imagem: Cobertura de ativação de marca e evento 65 (class: `image-trigger related-photo`)
- 74. Abrir imagem: Cobertura de ativação de marca e evento 66 (class: `image-trigger related-photo`)
- 75. Abrir imagem: Cobertura de ativação de marca e evento 67 (class: `image-trigger related-photo`)
- 76. Abrir imagem: Cobertura de ativação de marca e evento 68 (class: `image-trigger related-photo`)
- 77. Abrir imagem: Cobertura de ativação de marca e evento 69 (class: `image-trigger related-photo`)
- 78. Abrir imagem: Cobertura de ativação de marca e evento 70 (class: `image-trigger related-photo`)
- 79. Abrir imagem: Cobertura de ativação de marca e evento 71 (class: `image-trigger related-photo`)
- 80. Abrir imagem: Cobertura de ativação de marca e evento 72 (class: `image-trigger related-photo`)
- 81. Abrir imagem: Cobertura de ativação de marca e evento 73 (class: `image-trigger related-photo`)
- 82. Abrir imagem: Cobertura de ativação de marca e evento 74 (class: `image-trigger related-photo`)
- 83. Abrir imagem: Cobertura de ativação de marca e evento 75 (class: `image-trigger related-photo`)
- 84. Abrir imagem: Cobertura de ativação de marca e evento 76 (class: `image-trigger related-photo`)
- 85. Abrir imagem: Cobertura de ativação de marca e evento 77 (class: `image-trigger related-photo`)
- 86. Abrir imagem: Cobertura de ativação de marca e evento 78 (class: `image-trigger related-photo`)
- 87. Abrir imagem: Cobertura de ativação de marca e evento 79 (class: `image-trigger related-photo`)
- 88. Abrir imagem: Cobertura de ativação de marca e evento 80 (class: `image-trigger related-photo`)
- 89. Abrir imagem: Cobertura de ativação de marca e evento 81 (class: `image-trigger related-photo`)
- 90. Abrir imagem: Cobertura de ativação de marca e evento 82 (class: `image-trigger related-photo`)
- 91. Abrir imagem: Cobertura de ativação de marca e evento 83 (class: `image-trigger related-photo`)
- 92. Abrir imagem: Cobertura de ativação de marca e evento 84 (class: `image-trigger related-photo`)
- 93. Abrir imagem: Cobertura de ativação de marca e evento 85 (class: `image-trigger related-photo`)
- 94. Abrir imagem: Cobertura de ativação de marca e evento 86 (class: `image-trigger related-photo`)
- 95. Abrir imagem: Cobertura de ativação de marca e evento 87 (class: `image-trigger related-photo`)
- 96. Abrir imagem: Cobertura de ativação de marca e evento 88 (class: `image-trigger related-photo`)
- 97. Abrir imagem: Cobertura de ativação de marca e evento 89 (class: `image-trigger related-photo`)
- 98. Abrir imagem: Cobertura de ativação de marca e evento 90 (class: `image-trigger related-photo`)
- 99. Abrir imagem: Cobertura de ativação de marca e evento 91 (class: `image-trigger related-photo`)
- 100. Abrir imagem: Cobertura de ativação de marca e evento 92 (class: `image-trigger related-photo`)
- 101. Abrir imagem: Cobertura de ativação de marca e evento 93 (class: `image-trigger related-photo`)
- 102. Abrir imagem: Cobertura de ativação de marca e evento 94 (class: `image-trigger related-photo`)
- 103. Abrir imagem: Cobertura de ativação de marca e evento 95 (class: `image-trigger related-photo`)
- 104. Abrir imagem: Cobertura de ativação de marca e evento 96 (class: `image-trigger related-photo`)
- 105. Abrir imagem: Cobertura de ativação de marca e evento 97 (class: `image-trigger related-photo`)
- 106. Abrir imagem: Cobertura de ativação de marca e evento 98 (class: `image-trigger related-photo`)
- 107. Abrir imagem: Cobertura de ativação de marca e evento 99 (class: `image-trigger related-photo`)
- 108. Abrir imagem: Cobertura de ativação de marca e evento 100 (class: `image-trigger related-photo`)
- 109. Abrir imagem: Cobertura de ativação de marca e evento 101 (class: `image-trigger related-photo`)
- 110. Abrir imagem: Cobertura de ativação de marca e evento 102 (class: `image-trigger related-photo`)
- 111. Abrir imagem: Cobertura de ativação de marca e evento 103 (class: `image-trigger related-photo`)
- 112. Abrir imagem: Cobertura de ativação de marca e evento 104 (class: `image-trigger related-photo`)
- 113. Abrir imagem: Cobertura de ativação de marca e evento 105 (class: `image-trigger related-photo`)
- 114. Abrir imagem: Cobertura de ativação de marca e evento 106 (class: `image-trigger related-photo`)
- 115. Abrir imagem: Cobertura de ativação de marca e evento 107 (class: `image-trigger related-photo`)
- 116. Abrir imagem: Cobertura de ativação de marca e evento 108 (class: `image-trigger related-photo`)
- 117. Abrir imagem: Cobertura de ativação de marca e evento 109 (class: `image-trigger related-photo`)
- 118. Abrir imagem: Cobertura de ativação de marca e evento 110 (class: `image-trigger related-photo`)
- 119. Abrir imagem: Cobertura de ativação de marca e evento 111 (class: `image-trigger related-photo`)
- 120. Abrir imagem: Cobertura de ativação de marca e evento 112 (class: `image-trigger related-photo`)
- 121. Abrir imagem: Cobertura de ativação de marca e evento 113 (class: `image-trigger related-photo`)
- 122. Abrir imagem: Cobertura de ativação de marca e evento 114 (class: `image-trigger related-photo`)
- 123. Abrir imagem: Cobertura de ativação de marca e evento 115 (class: `image-trigger related-photo`)
- 124. Abrir imagem: Cobertura de ativação de marca e evento 116 (class: `image-trigger related-photo`)
- 125. Abrir imagem: Cobertura de ativação de marca e evento 117 (class: `image-trigger related-photo`)
- 126. Abrir imagem: Cobertura de ativação de marca e evento 118 (class: `image-trigger related-photo`)
- 127. Abrir imagem: Cobertura de ativação de marca e evento 119 (class: `image-trigger related-photo`)
- 128. Abrir imagem: Cobertura de ativação de marca e evento 120 (class: `image-trigger related-photo`)
- 129. Abrir imagem: Cobertura de ativação de marca e evento 121 (class: `image-trigger related-photo`)
- 130. Abrir imagem: Cobertura de ativação de marca e evento 122 (class: `image-trigger related-photo`)
- 131. Abrir imagem: Cobertura de ativação de marca e evento 123 (class: `image-trigger related-photo`)
- 132. Abrir imagem: Cobertura de ativação de marca e evento 124 (class: `image-trigger related-photo`)
- 133. Abrir imagem: Cobertura de ativação de marca e evento 125 (class: `image-trigger related-photo`)
- 134. Abrir imagem: Cobertura de ativação de marca e evento 126 (class: `image-trigger related-photo`)
- 135. Vocês entregam conteúdo durante o evento? + (class: `faq-q`; aria-expanded: `false`)
- 136. Atendem fora do Rio de Janeiro? + (class: `faq-q`; aria-expanded: `false`)
- 137. Qual o prazo de entrega do material editado? + (class: `faq-q`; aria-expanded: `false`)
- 138. Como funciona o orçamento? + (class: `faq-q`; aria-expanded: `false`)

### /portfolio

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Todos (class: `pf-tab active`)
- 3. Ativações & Eventos (class: `pf-tab`)
- 4. Moda & Campanhas (class: `pf-tab`)
- 5. Artistas & Videoclipes (class: `pf-tab`)
- 6. Posicionamento (class: `pf-tab`)
- 7. Imagem Pessoal (class: `pf-tab`)
- 8. Casamentos (class: `pf-tab`)
- 9. Gestantes (class: `pf-tab`)
- 10. Hotelaria & Lifestyle (class: `pf-tab`)
- 11. Ativações & Eventos Ativação Drinkball — Experiência de Marca São Paulo · SP (class: `pf-card`; aria-label: `Abrir case study: Ativação Drinkball — Experiência de Marca`)
- 12. Ativações & Eventos Carnaval de Rua — Experiência e Público Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Carnaval de Rua — Experiência e Público`)
- 13. Ativações & Eventos Festival BON — Cobertura Corporativa Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Festival BON — Cobertura Corporativa`)
- 14. Ativações & Eventos Evento FJT — Cobertura de Palco e Camarote Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Evento FJT — Cobertura de Palco e Camarote`)
- 15. Ativações & Eventos Show ao Vivo — Registro de Performance Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Show ao Vivo — Registro de Performance`)
- 16. Ativações & Eventos SYMBH — Evento Corporativo Belo Horizonte · MG (class: `pf-card`; aria-label: `Abrir case study: SYMBH — Evento Corporativo`)
- 17. Moda & Campanhas Fashion Week — Passarela e Bastidor Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Fashion Week — Passarela e Bastidor`)
- 18. Moda & Campanhas Editorial Lifestyle — Campanha Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Editorial Lifestyle — Campanha`)
- 19. Moda & Campanhas Campanha de Verão — Lookbook Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Campanha de Verão — Lookbook`)
- 20. Moda & Campanhas Coleção Exclusiva — Campanha Conceitual Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Coleção Exclusiva — Campanha Conceitual`)
- 21. Moda & Campanhas Fotografia de Produto — Lançamento Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Fotografia de Produto — Lançamento`)
- 22. Artistas & Videoclipes É O TCHAN - Jogadinha Salvador · BA (class: `pf-card`; aria-label: `Abrir case study: É O TCHAN - Jogadinha`)
- 23. Artistas & Videoclipes Babado Novo - Sururu Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Babado Novo - Sururu`)
- 24. Artistas & Videoclipes Fotografia de Artista — Press Kit Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Fotografia de Artista — Press Kit`)
- 25. Posicionamento Profissional Retratos de Posicionamento — Marca Pessoal Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Retratos de Posicionamento — Marca Pessoal`)
- 26. Posicionamento Profissional Retratos Corporativos — Equipe e Liderança Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Retratos Corporativos — Equipe e Liderança`)
- 27. Posicionamento Profissional Brand Personal — Profissional Liberal Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Brand Personal — Profissional Liberal`)
- 28. Imagem Pessoal & Lifestyle Ensaio Autoral — Lifestyle para Instagram Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Ensaio Autoral — Lifestyle para Instagram`)
- 29. Imagem Pessoal & Lifestyle Ensaio Feminino — Frida Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Ensaio Feminino — Frida`)
- 30. Imagem Pessoal & Lifestyle Retratos Urbanos — Presença e Movimento Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Retratos Urbanos — Presença e Movimento`)
- 31. Imagem Pessoal & Lifestyle Retratos de Luz — Sessão Intimista Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Retratos de Luz — Sessão Intimista`)
- 32. Imagem Pessoal & Lifestyle Ensaio Beauty — Natural e Verdadeiro Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Ensaio Beauty — Natural e Verdadeiro`)
- 33. Casamentos Casamento ao Ar Livre — Memória e Afeto Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Casamento ao Ar Livre — Memória e Afeto`)
- 34. Casamentos Casamento na Praia — Luz e Emoção Macaé · RJ (class: `pf-card`; aria-label: `Abrir case study: Casamento na Praia — Luz e Emoção`)
- 35. Gestantes Ensaio Gestante — Corpo, Praia e Memória Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Ensaio Gestante — Corpo, Praia e Memória`)
- 36. Gestantes Ensaio Gestante — Intimidade e Presença Macaé · RJ (class: `pf-card`; aria-label: `Abrir case study: Ensaio Gestante — Intimidade e Presença`)
- 37. Hotelaria & Lifestyle Hotelaria — Espaços, Café e Spa Rio de Janeiro · RJ (class: `pf-card`; aria-label: `Abrir case study: Hotelaria — Espaços, Café e Spa`)

### /diagnostico-visual

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Enviar diagnóstico (class: `btn btn-primary btn-arrow`)

### /moda-campanhas

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Abrir imagem: Campanha de moda com direção visual editorial (class: `image-trigger split-gallery-item is-primary`)
- 3. 01 Direção criativa Conceito visual, moodboard, referências e linguagem alinhados ao posicionamento da marca. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Direção criativa`)
- 4. 02 Fotografia editorial Editorial de moda com leitura de luz e composição intencional. Imagens com assinatura. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Fotografia editorial`)
- 5. 03 Beauty Fotografia de beauty com foco em pele, detalhe e textura — respeitando o produto. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Beauty`)
- 6. 04 Lifestyle Imagens de lifestyle e produto em contexto, para feed, e-commerce e mídia. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Lifestyle`)
- 7. 05 Fashion film Vídeo de moda e campanha — movimento, ritmo e estética para redes e mídia paga. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Fashion film`)
- 8. 06 Tratamento Correção e gradação de cor coesa entre todos os materiais da campanha. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Tratamento`)
- 9. Abrir imagem: Fotografia de moda, campanha e produto 01 (class: `image-trigger related-photo`)
- 10. Abrir imagem: Fotografia de moda, campanha e produto 02 (class: `image-trigger related-photo`)
- 11. Abrir imagem: Fotografia de moda, campanha e produto 03 (class: `image-trigger related-photo`)
- 12. Abrir imagem: Fotografia de moda, campanha e produto 04 (class: `image-trigger related-photo`)
- 13. Abrir imagem: Fotografia de moda, campanha e produto 05 (class: `image-trigger related-photo`)
- 14. Abrir imagem: Fotografia de moda, campanha e produto 06 (class: `image-trigger related-photo`)
- 15. Abrir imagem: Fotografia de moda, campanha e produto 07 (class: `image-trigger related-photo`)
- 16. Abrir imagem: Fotografia de moda, campanha e produto 08 (class: `image-trigger related-photo`)
- 17. Abrir imagem: Fotografia de moda, campanha e produto 09 (class: `image-trigger related-photo`)
- 18. Abrir imagem: Fotografia de moda, campanha e produto 10 (class: `image-trigger related-photo`)
- 19. Abrir imagem: Fotografia de moda, campanha e produto 11 (class: `image-trigger related-photo`)
- 20. Abrir imagem: Fotografia de moda, campanha e produto 12 (class: `image-trigger related-photo`)
- 21. Abrir imagem: Fotografia de moda, campanha e produto 13 (class: `image-trigger related-photo`)
- 22. Abrir imagem: Fotografia de moda, campanha e produto 14 (class: `image-trigger related-photo`)
- 23. Abrir imagem: Fotografia de moda, campanha e produto 15 (class: `image-trigger related-photo`)
- 24. Abrir imagem: Fotografia de moda, campanha e produto 16 (class: `image-trigger related-photo`)
- 25. Abrir imagem: Fotografia de moda, campanha e produto 17 (class: `image-trigger related-photo`)
- 26. Abrir imagem: Fotografia de moda, campanha e produto 18 (class: `image-trigger related-photo`)
- 27. Abrir imagem: Fotografia de moda, campanha e produto 19 (class: `image-trigger related-photo`)
- 28. Abrir imagem: Fotografia de moda, campanha e produto 20 (class: `image-trigger related-photo`)
- 29. Abrir imagem: Fotografia de moda, campanha e produto 21 (class: `image-trigger related-photo`)
- 30. Abrir imagem: Fotografia de moda, campanha e produto 22 (class: `image-trigger related-photo`)
- 31. Abrir imagem: Fotografia de moda, campanha e produto 23 (class: `image-trigger related-photo`)
- 32. Abrir imagem: Fotografia de moda, campanha e produto 24 (class: `image-trigger related-photo`)
- 33. Abrir imagem: Fotografia de moda, campanha e produto 25 (class: `image-trigger related-photo`)
- 34. Abrir imagem: Fotografia de moda, campanha e produto 26 (class: `image-trigger related-photo`)
- 35. Abrir imagem: Fotografia de moda, campanha e produto 27 (class: `image-trigger related-photo`)
- 36. Abrir imagem: Fotografia de moda, campanha e produto 28 (class: `image-trigger related-photo`)
- 37. Abrir imagem: Fotografia de moda, campanha e produto 29 (class: `image-trigger related-photo`)
- 38. Abrir imagem: Fotografia de moda, campanha e produto 30 (class: `image-trigger related-photo`)
- 39. Abrir imagem: Fotografia de moda, campanha e produto 31 (class: `image-trigger related-photo`)
- 40. Abrir imagem: Fotografia de moda, campanha e produto 32 (class: `image-trigger related-photo`)
- 41. Abrir imagem: Fotografia de moda, campanha e produto 33 (class: `image-trigger related-photo`)
- 42. Abrir imagem: Fotografia de moda, campanha e produto 34 (class: `image-trigger related-photo`)
- 43. Abrir imagem: Fotografia de moda, campanha e produto 35 (class: `image-trigger related-photo`)
- 44. Abrir imagem: Fotografia de moda, campanha e produto 36 (class: `image-trigger related-photo`)
- 45. Abrir imagem: Fotografia de moda, campanha e produto 37 (class: `image-trigger related-photo`)
- 46. Abrir imagem: Fotografia de moda, campanha e produto 38 (class: `image-trigger related-photo`)
- 47. Abrir imagem: Fotografia de moda, campanha e produto 39 (class: `image-trigger related-photo`)
- 48. Abrir imagem: Fotografia de moda, campanha e produto 40 (class: `image-trigger related-photo`)
- 49. Abrir imagem: Fotografia de moda, campanha e produto 41 (class: `image-trigger related-photo`)
- 50. Abrir imagem: Fotografia de moda, campanha e produto 42 (class: `image-trigger related-photo`)
- 51. Abrir imagem: Fotografia de moda, campanha e produto 43 (class: `image-trigger related-photo`)
- 52. Abrir imagem: Fotografia de moda, campanha e produto 44 (class: `image-trigger related-photo`)
- 53. Abrir imagem: Fotografia de moda, campanha e produto 45 (class: `image-trigger related-photo`)
- 54. Abrir imagem: Fotografia de moda, campanha e produto 46 (class: `image-trigger related-photo`)
- 55. Abrir imagem: Fotografia de moda, campanha e produto 47 (class: `image-trigger related-photo`)
- 56. Vocês fazem direção criativa ou só fotografam? + (class: `faq-q`; aria-expanded: `false`)
- 57. Atendem e-commerce e catálogo? + (class: `faq-q`; aria-expanded: `false`)
- 58. Fazem fashion film? + (class: `faq-q`; aria-expanded: `false`)
- 59. Como funciona o orçamento? + (class: `faq-q`; aria-expanded: `false`)

### /artistas-videoclipes

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Abrir imagem: Direção de videoclipe com artista em performance (class: `image-trigger split-gallery-item is-primary`)
- 3. 01 Direção de clipe Conceito, roteiro e direção de videoclipe alinhados à narrativa da música. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Direção de clipe`)
- 4. 02 Captação de vídeo Operação multicâmera com movimento e linguagem coerentes ao tom do projeto. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Captação de vídeo`)
- 5. 03 Fotografia Fotos de divulgação, capa e ensaio do artista com direção de cena. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Fotografia`)
- 6. 04 Cobertura de shows Registro de shows e turnê — palco, bastidor e público. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Cobertura de shows`)
- 7. 05 Teaser & making of Conteúdo de antecipação e bastidor para alimentar o lançamento. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Teaser & making of`)
- 8. 06 Cortes para redes Reels e cortes verticais para sustentar o release nas plataformas. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Cortes para redes`)
- 9. Abrir imagem: Direção visual para artista e videoclipe 01 (class: `image-trigger related-photo`)
- 10. Abrir imagem: Direção visual para artista e videoclipe 02 (class: `image-trigger related-photo`)
- 11. Abrir imagem: Direção visual para artista e videoclipe 03 (class: `image-trigger related-photo`)
- 12. Abrir imagem: Direção visual para artista e videoclipe 04 (class: `image-trigger related-photo`)
- 13. Abrir imagem: Direção visual para artista e videoclipe 05 (class: `image-trigger related-photo`)
- 14. Abrir imagem: Direção visual para artista e videoclipe 06 (class: `image-trigger related-photo`)
- 15. Abrir imagem: Direção visual para artista e videoclipe 07 (class: `image-trigger related-photo`)
- 16. Abrir imagem: Direção visual para artista e videoclipe 08 (class: `image-trigger related-photo`)
- 17. Abrir imagem: Direção visual para artista e videoclipe 09 (class: `image-trigger related-photo`)
- 18. Abrir imagem: Direção visual para artista e videoclipe 10 (class: `image-trigger related-photo`)
- 19. Abrir imagem: Direção visual para artista e videoclipe 11 (class: `image-trigger related-photo`)
- 20. Abrir imagem: Direção visual para artista e videoclipe 12 (class: `image-trigger related-photo`)
- 21. Abrir imagem: Direção visual para artista e videoclipe 13 (class: `image-trigger related-photo`)
- 22. Abrir imagem: Direção visual para artista e videoclipe 14 (class: `image-trigger related-photo`)
- 23. Abrir imagem: Direção visual para artista e videoclipe 15 (class: `image-trigger related-photo`)
- 24. Abrir imagem: Direção visual para artista e videoclipe 16 (class: `image-trigger related-photo`)
- 25. Abrir imagem: Direção visual para artista e videoclipe 17 (class: `image-trigger related-photo`)
- 26. Abrir imagem: Direção visual para artista e videoclipe 18 (class: `image-trigger related-photo`)
- 27. Vocês produzem o clipe do conceito à entrega? + (class: `faq-q`; aria-expanded: `false`)
- 28. Fazem cobertura de shows e turnê? + (class: `faq-q`; aria-expanded: `false`)
- 29. Entregam conteúdo para redes além do clipe? + (class: `faq-q`; aria-expanded: `false`)
- 30. Como funciona o orçamento? + (class: `faq-q`; aria-expanded: `false`)

### /posicionamento-profissional

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Abrir imagem: Retrato profissional com direção de pose e luz natural para marca pessoal (class: `image-trigger split-gallery-item is-primary`)
- 3. 01 Retrato corporativo Retratos com direção de pose, luz e expressão que comunicam autoridade e confiança. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Retrato corporativo`)
- 4. 02 Vídeo institucional Vídeo de apresentação para clínicas e profissionais — claro, sóbrio e profissional. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Vídeo institucional`)
- 5. 03 Direção visual Linguagem visual coerente para site, redes sociais e materiais de divulgação. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Direção visual`)
- 6. 04 Ambiente & equipe Registro de consultório, clínica e equipe para transmitir estrutura e cuidado. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Ambiente & equipe`)
- 7. 05 Conteúdo p/ redes Material de autoridade para alimentar perfis profissionais com consistência. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Conteúdo p/ redes`)
- 8. 06 Tratamento Tratamento de imagem que respeita a pele e mantém naturalidade profissional. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Tratamento`)
- 9. Abrir imagem: Retrato de posicionamento profissional 01 (class: `image-trigger related-photo`)
- 10. Abrir imagem: Retrato de posicionamento profissional 02 (class: `image-trigger related-photo`)
- 11. Abrir imagem: Retrato de posicionamento profissional 03 (class: `image-trigger related-photo`)
- 12. Abrir imagem: Retrato de posicionamento profissional 04 (class: `image-trigger related-photo`)
- 13. Abrir imagem: Retrato de posicionamento profissional 05 (class: `image-trigger related-photo`)
- 14. Abrir imagem: Retrato de posicionamento profissional 06 (class: `image-trigger related-photo`)
- 15. Abrir imagem: Retrato de posicionamento profissional 07 (class: `image-trigger related-photo`)
- 16. Abrir imagem: Retrato de posicionamento profissional 08 (class: `image-trigger related-photo`)
- 17. Abrir imagem: Retrato de posicionamento profissional 09 (class: `image-trigger related-photo`)
- 18. Abrir imagem: Retrato de posicionamento profissional 10 (class: `image-trigger related-photo`)
- 19. Abrir imagem: Retrato de posicionamento profissional 11 (class: `image-trigger related-photo`)
- 20. Abrir imagem: Retrato de posicionamento profissional 12 (class: `image-trigger related-photo`)
- 21. Abrir imagem: Retrato de posicionamento profissional 13 (class: `image-trigger related-photo`)
- 22. Abrir imagem: Retrato de posicionamento profissional 14 (class: `image-trigger related-photo`)
- 23. Abrir imagem: Retrato de posicionamento profissional 15 (class: `image-trigger related-photo`)
- 24. Abrir imagem: Retrato de posicionamento profissional 16 (class: `image-trigger related-photo`)
- 25. Abrir imagem: Retrato de posicionamento profissional 17 (class: `image-trigger related-photo`)
- 26. Abrir imagem: Retrato de posicionamento profissional 18 (class: `image-trigger related-photo`)
- 27. Abrir imagem: Retrato de posicionamento profissional 19 (class: `image-trigger related-photo`)
- 28. Abrir imagem: Retrato de posicionamento profissional 20 (class: `image-trigger related-photo`)
- 29. Abrir imagem: Retrato de posicionamento profissional 21 (class: `image-trigger related-photo`)
- 30. Abrir imagem: Retrato de posicionamento profissional 22 (class: `image-trigger related-photo`)
- 31. Abrir imagem: Retrato de posicionamento profissional 23 (class: `image-trigger related-photo`)
- 32. Abrir imagem: Retrato de posicionamento profissional 24 (class: `image-trigger related-photo`)
- 33. Abrir imagem: Retrato de posicionamento profissional 25 (class: `image-trigger related-photo`)
- 34. Abrir imagem: Retrato de posicionamento profissional 26 (class: `image-trigger related-photo`)
- 35. Abrir imagem: Retrato de posicionamento profissional 27 (class: `image-trigger related-photo`)
- 36. Abrir imagem: Retrato de posicionamento profissional 28 (class: `image-trigger related-photo`)
- 37. Abrir imagem: Retrato de posicionamento profissional 29 (class: `image-trigger related-photo`)
- 38. Abrir imagem: Retrato de posicionamento profissional 30 (class: `image-trigger related-photo`)
- 39. Abrir imagem: Retrato de posicionamento profissional 31 (class: `image-trigger related-photo`)
- 40. Abrir imagem: Retrato de posicionamento profissional 32 (class: `image-trigger related-photo`)
- 41. Abrir imagem: Retrato de posicionamento profissional 33 (class: `image-trigger related-photo`)
- 42. Abrir imagem: Retrato de posicionamento profissional 34 (class: `image-trigger related-photo`)
- 43. Abrir imagem: Retrato de posicionamento profissional 35 (class: `image-trigger related-photo`)
- 44. Abrir imagem: Retrato de posicionamento profissional 36 (class: `image-trigger related-photo`)
- 45. Abrir imagem: Retrato de posicionamento profissional 37 (class: `image-trigger related-photo`)
- 46. Abrir imagem: Retrato de posicionamento profissional 38 (class: `image-trigger related-photo`)
- 47. Abrir imagem: Retrato de posicionamento profissional 39 (class: `image-trigger related-photo`)
- 48. Abrir imagem: Retrato de posicionamento profissional 40 (class: `image-trigger related-photo`)
- 49. Abrir imagem: Retrato de posicionamento profissional 41 (class: `image-trigger related-photo`)
- 50. Abrir imagem: Retrato de posicionamento profissional 42 (class: `image-trigger related-photo`)
- 51. Abrir imagem: Retrato de posicionamento profissional 43 (class: `image-trigger related-photo`)
- 52. Abrir imagem: Retrato de posicionamento profissional 44 (class: `image-trigger related-photo`)
- 53. Abrir imagem: Retrato de posicionamento profissional 45 (class: `image-trigger related-photo`)
- 54. Abrir imagem: Retrato de posicionamento profissional 46 (class: `image-trigger related-photo`)
- 55. Abrir imagem: Retrato de posicionamento profissional 47 (class: `image-trigger related-photo`)
- 56. Abrir imagem: Retrato de posicionamento profissional 48 (class: `image-trigger related-photo`)
- 57. Abrir imagem: Retrato de posicionamento profissional 49 (class: `image-trigger related-photo`)
- 58. Abrir imagem: Retrato de posicionamento profissional 50 (class: `image-trigger related-photo`)
- 59. Abrir imagem: Retrato de posicionamento profissional 51 (class: `image-trigger related-photo`)
- 60. Abrir imagem: Retrato de posicionamento profissional 52 (class: `image-trigger related-photo`)
- 61. Abrir imagem: Retrato de posicionamento profissional 53 (class: `image-trigger related-photo`)
- 62. Abrir imagem: Retrato de posicionamento profissional 54 (class: `image-trigger related-photo`)
- 63. Abrir imagem: Retrato de posicionamento profissional 55 (class: `image-trigger related-photo`)
- 64. Abrir imagem: Retrato de posicionamento profissional 56 (class: `image-trigger related-photo`)
- 65. Abrir imagem: Retrato de posicionamento profissional 57 (class: `image-trigger related-photo`)
- 66. Abrir imagem: Retrato de posicionamento profissional 58 (class: `image-trigger related-photo`)
- 67. Atendem clínicas e equipes, não só indivíduos? + (class: `faq-q`; aria-expanded: `false`)
- 68. Fazem vídeo institucional além de foto? + (class: `faq-q`; aria-expanded: `false`)
- 69. A sessão é dirigida? Não sou modelo. + (class: `faq-q`; aria-expanded: `false`)
- 70. Como funciona o orçamento? + (class: `faq-q`; aria-expanded: `false`)

### /imagem-pessoal-lifestyle

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Abrir imagem: Ensaio lifestyle autoral com luz natural no rosto (class: `image-trigger split-gallery-item is-primary`)
- 3. Abrir imagem: Ensaio pessoal em locação externa com styling claro (class: `image-trigger split-gallery-item`)
- 4. 01 Ensaio autoral Sessão fotográfica com conceito leve, direção de pose e estética pessoal. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Ensaio autoral`)
- 5. 02 Fotos para Instagram Imagens pensadas para feed, stories, perfil e presença digital. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Fotos para Instagram`)
- 6. 03 Direção de pose Condução completa de corpo, olhar, mãos e expressão. Você não precisa saber posar. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Direção de pose`)
- 7. 04 Lifestyle externo Locações urbanas, praia, casa, hotel ou espaços com luz natural e atmosfera. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Lifestyle externo`)
- 8. 05 Beauty natural Retratos com foco em pele, presença e beleza real, sem descaracterizar. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Beauty natural`)
- 9. 06 Curadoria Seleção e tratamento de imagens para entregar um conjunto coeso e fácil de usar. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Curadoria`)
- 10. Abrir imagem: Ensaio de imagem pessoal e lifestyle 01 (class: `image-trigger related-photo`)
- 11. Abrir imagem: Ensaio de imagem pessoal e lifestyle 02 (class: `image-trigger related-photo`)
- 12. Abrir imagem: Ensaio de imagem pessoal e lifestyle 03 (class: `image-trigger related-photo`)
- 13. Abrir imagem: Ensaio de imagem pessoal e lifestyle 04 (class: `image-trigger related-photo`)
- 14. Abrir imagem: Ensaio de imagem pessoal e lifestyle 05 (class: `image-trigger related-photo`)
- 15. Abrir imagem: Ensaio de imagem pessoal e lifestyle 06 (class: `image-trigger related-photo`)
- 16. Abrir imagem: Ensaio de imagem pessoal e lifestyle 07 (class: `image-trigger related-photo`)
- 17. Abrir imagem: Ensaio de imagem pessoal e lifestyle 08 (class: `image-trigger related-photo`)
- 18. Abrir imagem: Ensaio de imagem pessoal e lifestyle 09 (class: `image-trigger related-photo`)
- 19. Abrir imagem: Ensaio de imagem pessoal e lifestyle 10 (class: `image-trigger related-photo`)
- 20. Abrir imagem: Ensaio de imagem pessoal e lifestyle 11 (class: `image-trigger related-photo`)
- 21. Abrir imagem: Ensaio de imagem pessoal e lifestyle 12 (class: `image-trigger related-photo`)
- 22. Abrir imagem: Ensaio de imagem pessoal e lifestyle 13 (class: `image-trigger related-photo`)
- 23. Abrir imagem: Ensaio de imagem pessoal e lifestyle 14 (class: `image-trigger related-photo`)
- 24. Abrir imagem: Ensaio de imagem pessoal e lifestyle 15 (class: `image-trigger related-photo`)
- 25. Abrir imagem: Ensaio de imagem pessoal e lifestyle 16 (class: `image-trigger related-photo`)
- 26. Abrir imagem: Ensaio de imagem pessoal e lifestyle 17 (class: `image-trigger related-photo`)
- 27. Abrir imagem: Ensaio de imagem pessoal e lifestyle 18 (class: `image-trigger related-photo`)
- 28. Abrir imagem: Ensaio de imagem pessoal e lifestyle 19 (class: `image-trigger related-photo`)
- 29. Abrir imagem: Ensaio de imagem pessoal e lifestyle 20 (class: `image-trigger related-photo`)
- 30. Abrir imagem: Ensaio de imagem pessoal e lifestyle 21 (class: `image-trigger related-photo`)
- 31. Abrir imagem: Ensaio de imagem pessoal e lifestyle 22 (class: `image-trigger related-photo`)
- 32. Abrir imagem: Ensaio de imagem pessoal e lifestyle 23 (class: `image-trigger related-photo`)
- 33. Abrir imagem: Ensaio de imagem pessoal e lifestyle 24 (class: `image-trigger related-photo`)
- 34. Abrir imagem: Ensaio de imagem pessoal e lifestyle 25 (class: `image-trigger related-photo`)
- 35. Abrir imagem: Ensaio de imagem pessoal e lifestyle 26 (class: `image-trigger related-photo`)
- 36. Abrir imagem: Ensaio de imagem pessoal e lifestyle 27 (class: `image-trigger related-photo`)
- 37. Abrir imagem: Ensaio de imagem pessoal e lifestyle 28 (class: `image-trigger related-photo`)
- 38. Abrir imagem: Ensaio de imagem pessoal e lifestyle 29 (class: `image-trigger related-photo`)
- 39. Abrir imagem: Ensaio de imagem pessoal e lifestyle 30 (class: `image-trigger related-photo`)
- 40. Abrir imagem: Ensaio de imagem pessoal e lifestyle 31 (class: `image-trigger related-photo`)
- 41. Abrir imagem: Ensaio de imagem pessoal e lifestyle 32 (class: `image-trigger related-photo`)
- 42. Abrir imagem: Ensaio de imagem pessoal e lifestyle 33 (class: `image-trigger related-photo`)
- 43. Abrir imagem: Ensaio de imagem pessoal e lifestyle 34 (class: `image-trigger related-photo`)
- 44. Abrir imagem: Ensaio de imagem pessoal e lifestyle 35 (class: `image-trigger related-photo`)
- 45. Abrir imagem: Ensaio de imagem pessoal e lifestyle 36 (class: `image-trigger related-photo`)
- 46. Abrir imagem: Ensaio de imagem pessoal e lifestyle 37 (class: `image-trigger related-photo`)
- 47. Abrir imagem: Ensaio de imagem pessoal e lifestyle 38 (class: `image-trigger related-photo`)
- 48. Abrir imagem: Ensaio de imagem pessoal e lifestyle 39 (class: `image-trigger related-photo`)
- 49. Abrir imagem: Ensaio de imagem pessoal e lifestyle 40 (class: `image-trigger related-photo`)
- 50. Abrir imagem: Ensaio de imagem pessoal e lifestyle 41 (class: `image-trigger related-photo`)
- 51. Abrir imagem: Ensaio de imagem pessoal e lifestyle 42 (class: `image-trigger related-photo`)
- 52. Abrir imagem: Ensaio de imagem pessoal e lifestyle 43 (class: `image-trigger related-photo`)
- 53. Abrir imagem: Ensaio de imagem pessoal e lifestyle 44 (class: `image-trigger related-photo`)
- 54. Abrir imagem: Ensaio de imagem pessoal e lifestyle 45 (class: `image-trigger related-photo`)
- 55. Abrir imagem: Ensaio de imagem pessoal e lifestyle 46 (class: `image-trigger related-photo`)
- 56. Abrir imagem: Ensaio de imagem pessoal e lifestyle 47 (class: `image-trigger related-photo`)
- 57. Abrir imagem: Ensaio de imagem pessoal e lifestyle 48 (class: `image-trigger related-photo`)
- 58. Abrir imagem: Ensaio de imagem pessoal e lifestyle 49 (class: `image-trigger related-photo`)
- 59. Abrir imagem: Ensaio de imagem pessoal e lifestyle 50 (class: `image-trigger related-photo`)
- 60. Abrir imagem: Ensaio de imagem pessoal e lifestyle 51 (class: `image-trigger related-photo`)
- 61. Abrir imagem: Ensaio de imagem pessoal e lifestyle 52 (class: `image-trigger related-photo`)
- 62. Abrir imagem: Ensaio de imagem pessoal e lifestyle 53 (class: `image-trigger related-photo`)
- 63. Abrir imagem: Ensaio de imagem pessoal e lifestyle 54 (class: `image-trigger related-photo`)
- 64. Abrir imagem: Ensaio de imagem pessoal e lifestyle 55 (class: `image-trigger related-photo`)
- 65. Abrir imagem: Ensaio de imagem pessoal e lifestyle 56 (class: `image-trigger related-photo`)
- 66. Abrir imagem: Ensaio de imagem pessoal e lifestyle 57 (class: `image-trigger related-photo`)
- 67. Abrir imagem: Ensaio de imagem pessoal e lifestyle 58 (class: `image-trigger related-photo`)
- 68. Abrir imagem: Ensaio de imagem pessoal e lifestyle 59 (class: `image-trigger related-photo`)
- 69. Abrir imagem: Ensaio de imagem pessoal e lifestyle 60 (class: `image-trigger related-photo`)
- 70. Abrir imagem: Ensaio de imagem pessoal e lifestyle 61 (class: `image-trigger related-photo`)
- 71. Abrir imagem: Ensaio de imagem pessoal e lifestyle 62 (class: `image-trigger related-photo`)
- 72. Abrir imagem: Ensaio de imagem pessoal e lifestyle 63 (class: `image-trigger related-photo`)
- 73. Abrir imagem: Ensaio de imagem pessoal e lifestyle 64 (class: `image-trigger related-photo`)
- 74. Abrir imagem: Ensaio de imagem pessoal e lifestyle 65 (class: `image-trigger related-photo`)
- 75. Abrir imagem: Ensaio de imagem pessoal e lifestyle 66 (class: `image-trigger related-photo`)
- 76. Abrir imagem: Ensaio de imagem pessoal e lifestyle 67 (class: `image-trigger related-photo`)
- 77. Eu nunca fiz ensaio. Vocês dirigem tudo? + (class: `faq-q`; aria-expanded: `false`)
- 78. Serve para fotos de Instagram? + (class: `faq-q`; aria-expanded: `false`)
- 79. Pode ser um ensaio sem objetivo profissional? + (class: `faq-q`; aria-expanded: `false`)
- 80. Como funciona o orçamento? + (class: `faq-q`; aria-expanded: `false`)

### /casamentos

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Abrir imagem: Casal em ensaio de casamento ao ar livre com direção natural (class: `image-trigger split-gallery-item is-primary`)
- 3. Abrir imagem: Noiva em cena de casamento com luz dramática em preto e branco (class: `image-trigger split-gallery-item`)
- 4. 01 Making of Preparação, detalhes, vestido, encontro com família e clima antes da cerimônia. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Making of`)
- 5. 02 Cerimônia Registro atento aos votos, entradas, emoção, gestos pequenos e momentos-chave. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Cerimônia`)
- 6. 03 Retratos do casal Direção leve para fotos naturais, elegantes e sem rigidez. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Retratos do casal`)
- 7. 04 Festa Energia da pista, convidados, brindes, abraços e acontecimentos reais. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Festa`)
- 8. 05 Filme Vídeo de casamento com narrativa, ritmo e sensibilidade para reviver o dia. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Filme`)
- 9. 06 Curadoria Entrega organizada, tratamento coeso e seleção pensada para álbum e redes. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Curadoria`)
- 10. Abrir imagem: Fotografia de casamento 01 (class: `image-trigger related-photo`)
- 11. Abrir imagem: Fotografia de casamento 02 (class: `image-trigger related-photo`)
- 12. Abrir imagem: Fotografia de casamento 03 (class: `image-trigger related-photo`)
- 13. Abrir imagem: Fotografia de casamento 04 (class: `image-trigger related-photo`)
- 14. Abrir imagem: Fotografia de casamento 05 (class: `image-trigger related-photo`)
- 15. Abrir imagem: Fotografia de casamento 06 (class: `image-trigger related-photo`)
- 16. Abrir imagem: Fotografia de casamento 07 (class: `image-trigger related-photo`)
- 17. Abrir imagem: Fotografia de casamento 08 (class: `image-trigger related-photo`)
- 18. Abrir imagem: Fotografia de casamento 09 (class: `image-trigger related-photo`)
- 19. Abrir imagem: Fotografia de casamento 10 (class: `image-trigger related-photo`)
- 20. Abrir imagem: Fotografia de casamento 11 (class: `image-trigger related-photo`)
- 21. Abrir imagem: Fotografia de casamento 12 (class: `image-trigger related-photo`)
- 22. Abrir imagem: Fotografia de casamento 13 (class: `image-trigger related-photo`)
- 23. Abrir imagem: Fotografia de casamento 14 (class: `image-trigger related-photo`)
- 24. Abrir imagem: Fotografia de casamento 15 (class: `image-trigger related-photo`)
- 25. Abrir imagem: Fotografia de casamento 16 (class: `image-trigger related-photo`)
- 26. Abrir imagem: Fotografia de casamento 17 (class: `image-trigger related-photo`)
- 27. Abrir imagem: Fotografia de casamento 18 (class: `image-trigger related-photo`)
- 28. Vocês dirigem os retratos do casal? + (class: `faq-q`; aria-expanded: `false`)
- 29. Fazem foto e vídeo no mesmo pacote? + (class: `faq-q`; aria-expanded: `false`)
- 30. Atendem mini wedding e casamento ao ar livre? + (class: `faq-q`; aria-expanded: `false`)
- 31. Como funciona o orçamento? + (class: `faq-q`; aria-expanded: `false`)

### /gestantes

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Abrir imagem: Ensaio gestante na praia com direção de pose e luz natural (class: `image-trigger split-gallery-item is-primary`)
- 3. Abrir imagem: Gestante entre coqueiros em composição vertical (class: `image-trigger split-gallery-item`)
- 4. 01 Conceito Definição de clima, locação, referências e intenção do ensaio. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Conceito`)
- 5. 02 Direção de pose Condução sensível de corpo, mãos, olhar e movimento para trazer conforto. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Direção de pose`)
- 6. 03 Luz natural Uso de praia, natureza ou ambientes claros para valorizar pele e atmosfera. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Luz natural`)
- 7. 04 Família Possibilidade de incluir parceiro, filhos e vínculos importantes no registro. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Família`)
- 8. 05 Beauty natural Retratos com estética leve, respeitando pele, corpo e momento. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Beauty natural`)
- 9. 06 Entrega Curadoria e tratamento de imagens para álbum, impressão, redes e lembrança. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Entrega`)
- 10. Abrir imagem: Ensaio gestante 01 (class: `image-trigger related-photo`)
- 11. Abrir imagem: Ensaio gestante 02 (class: `image-trigger related-photo`)
- 12. Abrir imagem: Ensaio gestante 03 (class: `image-trigger related-photo`)
- 13. Abrir imagem: Ensaio gestante 04 (class: `image-trigger related-photo`)
- 14. Abrir imagem: Ensaio gestante 05 (class: `image-trigger related-photo`)
- 15. Abrir imagem: Ensaio gestante 06 (class: `image-trigger related-photo`)
- 16. Abrir imagem: Ensaio gestante 07 (class: `image-trigger related-photo`)
- 17. Abrir imagem: Ensaio gestante 08 (class: `image-trigger related-photo`)
- 18. Abrir imagem: Ensaio gestante 09 (class: `image-trigger related-photo`)
- 19. Abrir imagem: Ensaio gestante 10 (class: `image-trigger related-photo`)
- 20. Qual o melhor período para fazer o ensaio? + (class: `faq-q`; aria-expanded: `false`)
- 21. Eu não sei posar. Vocês dirigem? + (class: `faq-q`; aria-expanded: `false`)
- 22. Pode incluir família? + (class: `faq-q`; aria-expanded: `false`)
- 23. Como funciona o orçamento? + (class: `faq-q`; aria-expanded: `false`)

### /hotelaria-lifestyle

- 1. Menu (class: `nav-toggle`; aria-expanded: `false`)
- 2. Abrir imagem: Sala de hotel com poltronas, luz natural, plantas e atmosfera acolhedora (class: `image-trigger split-gallery-item is-primary`)
- 3. 01 Fotografia lifestyle Imagens de hospedagem, áreas e experiências com atmosfera e luz natural. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Fotografia lifestyle`)
- 4. 02 Vídeo institucional Vídeo de apresentação do hotel ou resort para site, OTAs e mídia. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Vídeo institucional`)
- 5. 03 Gastronomia Fotografia e vídeo de gastronomia e bar com foco em desejo e detalhe. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Gastronomia`)
- 6. 04 Conteúdo p/ redes Reels e posts para alimentar redes e sustentar a marca o ano todo. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Conteúdo p/ redes`)
- 7. 05 Direção visual Linguagem coesa para site, reservas, mídia paga e materiais. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Direção visual`)
- 8. 06 Tratamento Gradação de cor que valoriza atmosfera sem perder a verdade do espaço. Entender serviço (class: `cell service-cell`; aria-label: `Abrir explicação do serviço: Tratamento`)
- 9. Abrir imagem: Fotografia de hotelaria e lifestyle 01 (class: `image-trigger related-photo`)
- 10. Abrir imagem: Fotografia de hotelaria e lifestyle 02 (class: `image-trigger related-photo`)
- 11. Abrir imagem: Fotografia de hotelaria e lifestyle 03 (class: `image-trigger related-photo`)
- 12. Abrir imagem: Fotografia de hotelaria e lifestyle 04 (class: `image-trigger related-photo`)
- 13. Abrir imagem: Fotografia de hotelaria e lifestyle 05 (class: `image-trigger related-photo`)
- 14. Abrir imagem: Fotografia de hotelaria e lifestyle 06 (class: `image-trigger related-photo`)
- 15. Abrir imagem: Fotografia de hotelaria e lifestyle 07 (class: `image-trigger related-photo`)
- 16. Abrir imagem: Fotografia de hotelaria e lifestyle 08 (class: `image-trigger related-photo`)
- 17. Abrir imagem: Fotografia de hotelaria e lifestyle 09 (class: `image-trigger related-photo`)
- 18. Abrir imagem: Fotografia de hotelaria e lifestyle 10 (class: `image-trigger related-photo`)
- 19. Vocês produzem para site e OTAs (Booking, Airbnb)? + (class: `faq-q`; aria-expanded: `false`)
- 20. Fotografam gastronomia além do espaço? + (class: `faq-q`; aria-expanded: `false`)
- 21. Conseguem captar com hóspedes no local? + (class: `faq-q`; aria-expanded: `false`)
- 22. Como funciona o orçamento? + (class: `faq-q`; aria-expanded: `false`)
