# TODO.md — Tarefas & Pendências do Projeto

Este documento lista o status operacional das tarefas e pendências do projeto **VERSAVISUAL Website**.

---

## ✅ Concluído no Código & Infraestrutura

- [x] **SSG & SEO Técnico**: 47 rotas estáticas geradas em `dist/` com meta tags e Schema.org JSON-LD completos.
- [x] **Infinite Canvas 360°**: Navegação espacial fluida com inércia, zoom e minimap radar HUD.
- [x] **Before/After Slider**: Comparador de tratamento de imagem e color science ACEScc.
- [x] **Página Sobre Nós & Fundador**: Página `/sobre` e seção institucional de Vinicius Cunha (Vini).
- [x] **Diagnóstico Visual**: Formulário de onboarding com honeypot anti-spam e direcionamento para WhatsApp.
- [x] **Contraste WCAG AA**: Conformidade total com `bg-teal text-off` em botões e CTAs.
- [x] **Acessibilidade & Mobile**: Zero overflow horizontal de 360px a 4K, touch targets >= 44px e skip links.
- [x] **Suíte de Testes**: 256 testes automatizados (Tiers 1 a 5) aprovados com 100% de sucesso.
- [x] **Tipagem TypeScript**: Zero erros em `npx tsc --noEmit`.

---

## 📌 Pendências Operacionais (Dependem do Vini / Produção)

- [x] **Disparo de Leads via E-mail (Resend API)**: Variáveis de ambiente configuradas na Vercel (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`) integradas ao endpoint `/api/diagnostico`.
- [ ] **Domínio & DNS (Produção)**:
  - Apontar o domínio canônico `versavisual.com.br` para o projeto na Vercel.
- [ ] **Google Search Console**:
  - Submeter o sitemap `https://www.versavisual.com.br/sitemap.xml` após o deploy em produção.
