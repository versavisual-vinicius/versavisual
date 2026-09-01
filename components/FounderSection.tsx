import { Link } from "react-router-dom"
import { ArrowUpRight, Cpu, Film, Camera, ShieldCheck } from "lucide-react"
import { FOUNDER_DATA } from "../data/site"
import { img } from "../lib/images"

export default function FounderSection() {
  return (
    <section className="relative border-y border-off/10 bg-ink py-16 sm:py-24 lg:py-32">
      {/* Background glow & subtle cinematic grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.06),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-teal-400 animate-pulse" />
              <p className="u-eyebrow text-teal-400">
                Dossier Autoral · Direção
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-off sm:mt-4 sm:text-4xl lg:text-[2.75rem] leading-[1.12]">
              Direção visual com rigor de engenharia.
            </h2>
          </div>
          <Link
            to="/sobre"
            viewTransition
            className="group inline-flex items-center gap-2 text-sm font-medium font-head text-mist transition-colors duration-200 hover:text-off"
          >
            <span>Ver perfil completo & manifesto</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* Dossier Card Container */}
        <div className="grid gap-8 rounded-none border border-off/15 bg-navy/40 p-6 backdrop-blur-sm sm:p-10 lg:grid-cols-12 lg:gap-12">
          {/* Photo & Technical Badges Column */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="group relative aspect-[4/5] w-full overflow-hidden border border-off/15 bg-navy shadow-2xl">
              <img
                src={img(FOUNDER_DATA.photo, 800, 1000)}
                alt={`${FOUNDER_DATA.name} — ${FOUNDER_DATA.title} VERSAVISUAL`}
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />

              {/* Dossier Watermark Badges */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded border border-off/20 bg-ink/80 px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-widest text-off backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-teal-400" />
                Dossier #{FOUNDER_DATA.name.split(" ")[0].toUpperCase()}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-mono uppercase tracking-wider text-teal-400">
                  {FOUNDER_DATA.title}
                </p>
                <p className="mt-0.5 text-xl font-semibold text-off sm:text-2xl">
                  {FOUNDER_DATA.name}
                </p>
                <p className="mt-1 text-xs text-mist">
                  {FOUNDER_DATA.location}
                </p>
              </div>
            </div>

            {/* Micro Technical Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="border border-off/10 bg-ink/60 p-3">
                <span className="block text-[0.65rem] text-mist/70 uppercase">
                  Color Pipeline
                </span>
                <span className="mt-1 font-medium text-off">
                  ACEScc · DaVinci
                </span>
              </div>
              <div className="border border-off/10 bg-ink/60 p-3">
                <span className="block text-[0.65rem] text-mist/70 uppercase">
                  Câmera Base
                </span>
                <span className="mt-1 font-medium text-off">
                  Nikon Full Frame
                </span>
              </div>
            </div>
          </div>

          {/* Bio, Manifesto & Hybrid Pillars Column */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Manifesto Quote Callout */}
              <div className="relative border-l-2 border-teal pl-5 sm:pl-6">
                <p className="text-lg font-medium italic leading-snug text-off sm:text-xl lg:text-2xl">
                  &ldquo;{FOUNDER_DATA.manifestoQuote}&rdquo;
                </p>
              </div>

              {/* Bio Summary */}
              <p className="mt-6 text-pretty text-sm leading-relaxed text-mist sm:text-base">
                {FOUNDER_DATA.bioShort}
              </p>

              {/* Hybrid Pillars Breakdown */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="border border-off/10 bg-ink/40 p-4 transition-colors duration-200 hover:border-off/25">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Film className="size-4" />
                    <span className="text-xs font-mono font-medium">
                      01 · Cena
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-off">
                    Direção Visual
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-mist">
                    Storymaking e decupagem alinhados à estratégia de
                    posicionamento da marca.
                  </p>
                </div>

                <div className="border border-off/10 bg-ink/40 p-4 transition-colors duration-200 hover:border-off/25">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Camera className="size-4" />
                    <span className="text-xs font-mono font-medium">
                      02 · Foto
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-off">
                    Autoral & ACEScc
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-mist">
                    Sensibilidade de lente f/1.4 e color science com preservação
                    de texturas naturais.
                  </p>
                </div>

                <div className="border border-off/10 bg-ink/40 p-4 transition-colors duration-200 hover:border-off/25">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Cpu className="size-4" />
                    <span className="text-xs font-mono font-medium">
                      03 · Tech
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-off">
                    Creative Tech
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-mist">
                    Engenharia de software e automações para eliminar gargalos e
                    erros operacionais.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-col items-stretch gap-3 border-t border-off/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-mist">
                <ShieldCheck className="size-4 text-teal-400" />
                <span>Rigor técnico · Da concepção à pós-produção</span>
              </div>
              <Link
                to="/sobre"
                viewTransition
                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-teal bg-teal/10 px-6 py-2.5 text-center text-xs font-semibold font-head uppercase tracking-wider text-teal-400 transition-all duration-200 hover:bg-teal hover:text-off active:scale-[0.98]"
              >
                <span>Conhecer trajetória completa</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
