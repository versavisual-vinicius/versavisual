# ROADMAP.md — VERSAVISUAL Roadmap de Desenvolvimento

Este documento mapeia o histórico de fases concluídas e as oportunidades de evolução futura para a plataforma **VERSAVISUAL Website**.

---

## 🚀 Fases de Desenvolvimento

### Fase 1: Fundação, Design System & Shell Global (Concluída ✅)
- [x] Configuração da stack React 19, Vite 8, TypeScript 5.7 e Tailwind CSS v4 (`@theme`).
- [x] Importação e configuração de fontes self-hosted WOFF2 (`Righteous`, `Outfit`, `DM Sans`).
- [x] Criação do `Header` com scroll blur e menu drawer mobile acessível (WAI-ARIA).
- [x] Criação do `Footer` com links institucionais e `WhatsAppFloat` para conversão.
- [x] Aplicação estrita da regra de contraste WCAG AA (`bg-teal text-off`).

### Fase 2: Roteamento Dinâmico, Dicionário de Dados & Tipagem (Concluída ✅)
- [x] Centralização de 8 nichos, 19 cases, serviços e depoimentos em `src/data/site.ts`.
- [x] Implementação de roteador dinâmico de segmentos com resolução de aliases legados.
- [x] Implementação de rotas para estudos de caso de portfólio (`/portfolio/:caseSlug`).
- [x] Criação de página 404 personalizada com atalhos de recuperação de navegação.
- [x] Zero erros de tipagem estrita com TypeScript (`npx tsc --noEmit`).

### Fase 3: Páginas Ricas, Experiências Interativas & Conversão (Concluída ✅)
- [x] Hero com vídeo loop full-bleed, poster fallback e overlay escuro.
- [x] Implementação do **Infinite Canvas 360°** com aceleração por GPU, inércia e minimap radar HUD.
- [x] Implementação do **Before/After Slider** com visualização de color grading e especificações técnicas.
- [x] Desenvolvimento da página **Sobre Nós** (`/sobre`) e componente **FounderSection** destacando Vini Cunha e câmeras Nikon.
- [x] Formulário de **Diagnóstico Visual** com validação client-side, honeypot anti-spam e direcionamento para WhatsApp.
- [x] Modal acessível de **Políticas de Privacidade** (`PrivacyModal`).

### Fase 4: SEO Técnico, Dados Estruturados & Geração SSG (Concluída ✅)
- [x] Criação do catálogo SEO centralizado em `src/data/catalog-seo.json` e manifesto `seo-routes.json`.
- [x] Implementação do gerador SSG pós-build `scripts/emit-route-html.mjs` para **47 rotas estáticas**.
- [x] Injeção de metadados OpenGraph, Twitter Cards, Canonical e Schemas JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `CreativeWork`, `ImageGallery`).
- [x] Criação do validador de integridade SEO `scripts/verify-built-seo.mjs`.

### Fase 5: Infraestrutura de Testes & Hardening Adversarial (Concluída ✅)
- [x] Construção da suíte com **256 testes automatizados** distribuídos nos Tiers 1 a 5.
- [x] Hardening de segurança contra SQLi, XSS, poluição de protótipo e payloads maliciosos.
- [x] 100% de aprovação em todos os testes funcionais, de limites, de jornadas de conversão e de integridade do build.

---

## 🔮 Backlog & Evoluções Futuras (Planejado / Opcional)

1. **Dashboard de Leads & Notificações**:
   - Integração opcional de webhook do Discord / Slack para notificação instantânea quando um diagnóstico for concluído.
2. **Compressão Automatizada de Mídia AVIF / WebP**:
   - Pipeline de build com geração opcional de versões AVIF para navegadores modernos que suportam maior compressão com fidelidade de cor.
3. **Internacionalização (i18n)**:
   - Suporte futuro a seletor de idioma (PT-BR / EN) para contratação de produções internacionais e destination weddings.
