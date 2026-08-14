import { Link } from "react-router-dom";
import { WHATSAPP } from "../data/site";
import { img, HERO_PHOTO } from "../lib/images";

type Props = {
  eyebrow?: string;
  title: string;
  text: string;
  photo?: string;
};

export default function CTASection({ eyebrow = "Diagnóstico Visual", title, text, photo }: Props) {
  return (
    <section className="relative overflow-hidden border-y border-line">
      <img
        src={img(photo ?? HERO_PHOTO, 1800, 900)}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        loading="lazy"
      />
      <div className="u-grade absolute inset-0" />
      <div className="relative mx-auto max-w-[900px] px-5 py-24 text-center lg:px-10 lg:py-32">
        <p className="u-eyebrow">{eyebrow}</p>
        <h2 className="mt-5 text-balance text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-mist">{text}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/diagnostico-visual"
            className="w-full rounded-xs bg-teal px-7 py-3.5 font-medium text-ink transition-colors hover:bg-teal-400 sm:w-auto"
          >
            Fazer diagnóstico visual
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xs border border-line-strong px-7 py-3.5 font-medium text-off transition-colors hover:border-teal-400 hover:text-teal-400 sm:w-auto"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
