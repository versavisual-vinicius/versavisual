# TODO.md — Tarefas & Pendências do Projeto

Este documento lista o status operacional das tarefas e pendências de produção do projeto **VERSAVISUAL Website**.

---

## 📌 Pendências Operacionais de Produção

### Prioridade Alta
- [ ] Na Vercel, abrir:
  `Settings → Domains → versavisual.com.br → Edit`.
- [ ] Manter:
  `Redirect to Another Domain → www.versavisual.com.br`.
- [ ] Alterar:
  `307 Temporary Redirect → 308 Permanent Redirect`.
- [ ] Salvar.
- [ ] Confirmar externamente:
```bash
curl -I https://versavisual.com.br/
```
Resultado esperado:
```text
HTTP/2 308
location: https://www.versavisual.com.br/
```

### Google Search Console
- [ ] Adicionar ou confirmar a propriedade de domínio:
```text
versavisual.com.br
```
- [ ] Verificar a propriedade por DNS TXT.
- [ ] Abrir `Sitemaps`.
- [ ] Enviar:
```text
sitemap.xml
```
- [ ] Confirmar status “Sucesso”.
- [ ] Monitorar erros de descoberta, canonicalização e indexação.

### Diagnóstico e E-mail
- [ ] Enviar um lead de teste controlado no formulário `/diagnostico-visual`.
- [ ] Confirmar resposta 200 de `/api/diagnostico`.
- [ ] Confirmar recebimento em `hub@versavisual.com.br`.
- [ ] Confirmar `reply_to` com o e-mail informado pelo lead.
- [ ] Verificar spam e entregabilidade.

---

## 📝 Nota de Validação

> [!NOTE]
> A alteração do redirect apex para 308 chegou a ser preparada no painel e autorizada, mas **não foi salva**: a aba controlada expirou antes da ação e, na tentativa de recuperação, a interface não foi reaberta corretamente. Portanto, a documentação registra essa etapa como pendente, e não como concluída.

---

## ✅ Concluído no Código & Infraestrutura

- [x] **SSG & SEO Técnico**: 33 rotas estáticas geradas em `dist/` com meta tags e Schema.org JSON-LD completos.
- [x] **Domínio Canônico**: `https://www.versavisual.com.br` com canonicals apontando para URLs com `www`.
- [x] **Sitemap Limpo**: 32 URLs canônicas indexáveis respondendo com HTTP 200.
- [x] **Redirects de Cases**: 16 redirects históricos de cases no `vercel.json` com HTTP 308 permanente.
- [x] **Redirects de Segmentos**: Aliases legados de nichos com redirect permanente para slugs canônicos.
- [x] **Logo do Schema**: Atualizado para `/brand-assets/vv-profilelogo-dark-square.png` (HTTP 200).
- [x] **Destinatário da API**: Atualizado para `hub@versavisual.com.br` em `/api/diagnostico`.
- [x] **Infinite Canvas 360°**: Navegação espacial fluida com inércia, zoom e minimap radar HUD.
- [x] **Before/After Slider**: Comparador de tratamento de imagem e color science ACEScc.
- [x] **Página Sobre Nós & Fundador**: Página `/sobre` e seção institucional de Vinicius Cunha (Vini).
- [x] **Diagnóstico Visual**: Formulário de onboarding com honeypot anti-spam e direcionamento para WhatsApp.
- [x] **Contraste WCAG AA**: Conformidade total com `bg-teal text-off` em botões e CTAs.
- [x] **Acessibilidade & Mobile**: Zero overflow horizontal de 360px a 4K, touch targets >= 44px e skip links.
- [x] **Suíte de Testes**: 256 testes automatizados (Tiers 1 a 5) aprovados com 100% de sucesso.
- [x] **Tipagem TypeScript**: Zero erros em `npx tsc --noEmit`.
