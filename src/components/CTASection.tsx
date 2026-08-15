import { Link } from "react-router-dom"
import { WHATSAPP } from "../data/site"
import { img, HERO_PHOTO } from "../lib/images"
import { useParallax } from "../lib/useParallax"

type Props = {
  eyebrow?: string
  title: string
  text: string
  photo?: string
}

export default function CTASection({
  eyebrow = "Diagnóstico Visual",
  title,
  text,
  photo,
}: Props) {
  const { ref: parallaxRef, style: parallaxStyle } = useParallax({ speed: 0.1 })

  return (
    <section className="relative overflow-hidden border-y border-line">
      <div
        ref={parallaxRef}
        style={parallaxStyle}
        className="absolute -inset-10"
      >
        <img
          src={img(photo ?? HERO_PHOTO, 1800, 900)}
          alt=""
          aria-hidden
          width={1800}
          height={900}
          className="h-full w-full object-cover opacity-[0.22] scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />
      <div className="relative mx-auto max-w-[900px] px-5 py-24 text-center lg:px-10 lg:py-32">
        <p className="u-eyebrow text-mist">{eyebrow}</p>
        <h2 className="mt-5 text-balance text-3xl leading-[1.05] text-off sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-mist">{text}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/diagnostico-visual"
            viewTransition
            className="w-full border border-off bg-off px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-teal hover:bg-teal hover:text-off sm:w-auto"
          >
            Fazer diagnóstico visual
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-medium text-off transition-colors hover:border-teal hover:text-teal-400"
          >
            Falar no WhatsApp <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
