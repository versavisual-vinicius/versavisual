import { WHATSAPP } from "../data/site"

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-teal-400/40 bg-ink/85 py-2.5 pl-2.5 pr-4 shadow-2xl backdrop-blur-md transition-all duration-300 ease-out hover:border-teal-400 hover:bg-teal hover:shadow-[0_8px_32px_rgba(94,127,140,0.35)]"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-teal">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.7-1.44 1.33-1.98 1.38-.53.05-1.02.24-3.43-.72-2.9-1.14-4.74-4.1-4.88-4.29-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.11 1-2.4.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.85 2.06.92 2.21.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.61.76 1.89.9.28.14.46.21.53.33.07.11.07.64-.18 1.34Z" />
        </svg>
      </span>
      <span className="hidden text-sm font-medium text-off group-hover:text-ink sm:inline">
        WhatsApp
      </span>
    </a>
  )
}
