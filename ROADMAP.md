# ROADMAP.md — VERSAVISUAL Roadmap de Desenvolvimento

Este documento mapeia o histórico de fases concluídas, marcos de SEO técnico e as pendências operacionais para a plataforma **VERSAVISUAL Website**.

---

## 🚀 SEO Técnico e Consolidação de Produção

### Concluído
- [x] Definição de `www.versavisual.com.br` como domínio canônico oficial.
- [x] Limpeza do sitemap e redução para 32 URLs canônicas indexáveis.
- [x] Validação HTTP 200 de todas as 32 URLs do sitemap.
- [x] Emissão de 33 arquivos HTML estáticos, incluindo a página 404.
- [x] Remoção dos aliases de cases do sitemap.
- [x] Implementação de 16 redirects permanentes de cases no `vercel.json`.
- [x] Validação externa dos 16 redirects com HTTP 308.
- [x] Redirects permanentes para aliases de segmentos no `vercel.json`.
- [x] Canonicals corretos na home e nos cases apontando para URLs com `www`.
- [x] HTTP 404 real para rotas desconhecidas em produção.
- [x] Substituição do logo inexistente no JSON-LD (`/brand-assets/vv-profilelogo-dark-square.png`).
- [x] Validação do novo logo em produção com HTTP 200.
- [x] Alteração do destinatário da API de leads para `hub@versavisual.com.br`.
- [x] Build SSG e suítes automatizadas (256 testes) 100% aprovadas durante a implementação.
- [x] Deployment de produção dos redirects de cases.

### Pendente
- [ ] Alterar o redirect do domínio apex de HTTP 307 para HTTP 308 permanente no painel da Vercel.
- [ ] Confirmar novamente a resposta pública após a alteração (`curl -I https://versavisual.com.br/`).
- [ ] Verificar a propriedade de domínio `versavisual.com.br` no Google Search Console por DNS TXT.
- [ ] Enviar `sitemap.xml` ao Google Search Console.
- [ ] Confirmar o processamento do sitemap e acompanhar páginas descobertas/indexadas.
- [ ] Realizar um teste controlado de entrega do formulário via Resend.
- [ ] Confirmar recebimento no endereço `hub@versavisual.com.br`.

---

## 🎨 Fases de Desenvolvimento Concluídas

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
- [x] Implementação do gerador SSG pós-build `scripts/emit-route-html.mjs` para **33 rotas estáticas**.
- [x] Injeção de metadados OpenGraph, Twitter Cards, Canonical e Schemas JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `CreativeWork`, `ImageGallery`).
- [x] Criação do validador de integridade SEO `scripts/verify-built-seo.mjs`.

### Fase 5: Infraestrutura de Testes & Hardening Adversarial (Concluída ✅)
- [x] Construção da suíte com **256 testes automatizados** distribuídos nos Tiers 1 a 5.
- [x] Hardening de segurança contra SQLi, XSS, poluição de protótipo e payloads maliciosos.
- [x] 100% de aprovação em todos os testes funcionais, de limites, de jornadas de conversão e de integridade do build.
