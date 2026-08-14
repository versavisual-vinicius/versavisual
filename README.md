# VERSAVISUAL — Hub Audiovisual

> **"Imagem não é registro. É posicionamento."**  
> Hub audiovisual autoral com base no Rio de Janeiro e atuação nacional. Fotografia, vídeo, storymaking e direção visual para marcas, artistas e pessoas que tratam a imagem como decisão estratégica.

---

## 🎯 Sobre o Projeto

Plataforma web de alta performance desenvolvida para apresentar o portfólio, serviços e universo estético da **VERSAVISUAL**. O site foi arquitetado para oferecer uma experiência visual refinada, com galerias imersivas, navegação fluida por segmentos de mercado, estudos de caso detalhados e diagnóstico visual integrado.

---

## 🚀 Tecnologias Utilizadas

- **React 19** & **TypeScript** — Componentização moderna, performática e fortemente tipada
- **Vite 8** — Build tool ultrarrápido com Hot Module Replacement (HMR)
- **Tailwind CSS v4** — Design system com tokens semânticos e utilitários modernos
- **React Router 7** — Roteamento declarativo com suporte a deep linking e URLs canônicas
- **SEO & Schema.org** — Otimização técnica para motores de busca com JSON-LD dinâmico

---

## 📸 Estrutura de Segmentos & Cases

O site organiza todo o trabalho da produtora em 8 segmentos estratégicos:

1. **Ativações & Eventos**: Lançamentos, feiras e summits corporativos com cobertura multicâmera e storymaking em tempo real *(ex: Lançamento Drinkball na APAS com Gkay, Megabloco Chá da Alice, FJT, Bonfim House, Syn Ice, Camarote Ondina)*.
2. **Moda & Campanhas**: Editoriais, beauty, lifestyle e fashion film com direção criativa *(ex: Fashion Manners, Santa Lolla, Loja Frida)*.
3. **Artistas & Videoclipes**: Direção de videoclipes, cobertura de shows, capas de single, teasers e making of *(ex: Babado Novo - Sururu, Megabloco Christian Chávez)*.
4. **Posicionamento Profissional**: Retratos corporativos e imagem de autoridade para executivos, consultores e clínicas.
5. **Imagem Pessoal & Lifestyle**: Ensaios autorais, retratos urbanos e ensaios femininos para redes sociais e presença digital.
6. **Casamentos**: Cobertura integrada de foto e vídeo com olhar narrativo e sensibilidade documental.
7. **Gestantes**: Fotografia de maternidade com luz natural, respeito ao momento e direção acolhedora.
8. **Hotelaria & Lifestyle**: Produção audiovisual focada em desejo, atmosfera e conversão para hotéis, pousadas e resorts.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- **Node.js**: Versão 20 ou superior
- **npm** ou gerenciador de pacotes equivalente

### 1. Clonar o Repositório
```bash
git clone https://github.com/versavisual-vinicius/versavisual-site-new.git
cd versavisual-site-new
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
O servidor estará acessível em `http://localhost:8443` (ou porta informada no terminal).

### 4. Gerar Build de Produção
```bash
npm run build
```

---

## 📂 Estrutura de Diretórios

```text
├── public/
│   ├── images/               # Catálogo completo das 484 fotos por produção
│   ├── robots.txt            # Diretivas para crawlers
│   └── sitemap.xml           # Mapa do site para indexação
├── src/
│   ├── components/           # Componentes reutilizáveis (Header, Footer, Gallery, CTA, Cards)
│   ├── data/
│   │   └── site.ts           # Configurações globais, textos, segmentos e itens de portfólio
│   ├── lib/
│   │   ├── images.ts         # Sistema e catalogação de imagens
│   │   └── seo.tsx           # Utilitários de meta tags dinâmicas e JSON-LD
│   ├── pages/                # Páginas da aplicação (Home, Segmentos, Portfólio, CaseStudy, Diagnóstico)
│   ├── App.tsx               # Configuração das rotas
│   ├── index.css             # Estilos globais e tokens de cor Tailwind
│   └── main.tsx              # Ponto de entrada do React
└── vite.config.ts            # Configuração do Vite e plugins
```

---

## ✉️ Contato & Diagnóstico

- **WhatsApp**: [11 95074-7192](https://wa.me/5511950747192)
- **E-mail**: [hub@versavisual.com.br](mailto:hub@versavisual.com.br)
- **Diagnóstico Visual**: Disponível diretamente através da rota `/diagnostico-visual`

---

© VERSAVISUAL. Todos os direitos reservados.
