import { useEffect, useRef } from "react"
import { Shield, X, Lock, FileText, Mail, CheckCircle2 } from "lucide-react"
import { EMAIL, WHATSAPP, WHATSAPP_LABEL } from "../data/site"

type PrivacyModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
      }
      closeButtonRef.current?.focus()
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose()
        }
      }}
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 m-auto z-[70] max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-line bg-off p-6 shadow-2xl sm:p-8 text-ink backdrop:bg-ink/80 backdrop:backdrop-blur-sm scrollbar-thin"
    >
      <div className="relative">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar política de privacidade"
          className="absolute right-0 top-0 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-line text-navy transition-all duration-200 hover:border-teal hover:text-teal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 pr-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="u-eyebrow text-teal">Transparência & Conformidade</p>
            <h2 id="privacy-modal-title" className="text-2xl font-bold font-head text-ink">
              Política de Privacidade & LGPD
            </h2>
          </div>
        </div>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-navy border-t border-line pt-5">
          <section>
            <h3 className="font-semibold text-ink flex items-center gap-2 text-base">
              <Lock className="h-4 w-4 text-teal" /> 1. Controlador e Compromisso
            </h3>
            <p className="mt-1.5">
              A <strong>VERSAVISUAL</strong> (Rio de Janeiro / Brasil) atua como controladora dos dados pessoais coletados por este website, em total conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong> e melhores práticas de segurança digital.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-ink flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-teal" /> 2. Dados Coletados e Finalidade
            </h3>
            <ul className="mt-2 space-y-2 list-none">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal mt-0.5" />
                <span><strong>Formulário de Diagnóstico Visual:</strong> Nome, e-mail, telefone/WhatsApp, empresa, cidade, nicho de atuação e detalhes do projeto. Finalidade: elaboração de proposta técnica sob medida, retorno de contato e planejamento audiovisual.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal mt-0.5" />
                <span><strong>Métricas de Navegação:</strong> Dados anônimos de tráfego (Vercel Analytics) para melhoria de desempenho, tempo de resposta e usabilidade, sem cruzamento com dados pessoais identificáveis.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-ink flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-teal" /> 3. Base Legal e Não Compartilhamento
            </h3>
            <p className="mt-1.5">
              O tratamento de seus dados é fundamentado no seu <strong>consentimento expresso</strong> e nos <strong>procedimentos preliminares relacionados a contrato</strong> a pedido do titular (Art. 7º, incisos I e V da LGPD). <strong>Não vendemos, não alugamos e não compartilhamos</strong> seus dados com terceiros ou anunciantes.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-ink flex items-center gap-2 text-base">
              <Mail className="h-4 w-4 text-teal" /> 4. Seus Direitos (Art. 18 da LGPD) e Canal de Contato
            </h3>
            <p className="mt-1.5">
              Você pode a qualquer momento solicitar a confirmação de existência de tratamento, acesso, correção, anonimização ou <strong>eliminação definitiva dos seus dados pessoais</strong> cadastrados.
            </p>
            <div className="mt-3 rounded-lg border border-line bg-surface p-4 text-xs space-y-1">
              <p><strong>Encarregado / Canal DPO:</strong> <a href={`mailto:${EMAIL}`} className="text-teal font-medium underline">{EMAIL}</a></p>
              <p><strong>Atendimento WhatsApp:</strong> <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-teal font-medium underline">{WHATSAPP_LABEL}</a></p>
              <p><strong>Localidade:</strong> Rio de Janeiro · RJ · Brasil</p>
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-end border-t border-line pt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] items-center justify-center rounded-xl bg-teal px-6 py-2.5 font-medium font-head text-off transition-colors hover:bg-teal-400"
          >
            Entendido e fechar
          </button>
        </div>
      </div>
    </dialog>
  )
}
