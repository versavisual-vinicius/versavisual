import { useCallback, useEffect, useState } from "react";
import { img } from "../lib/images";

type Props = {
  photos: readonly string[];
  label: string;
};

export default function Gallery({ photos, label }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) => {
        if (cur === null) return cur;
        return (cur + dir + photos.length) % photos.length;
      }),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, go]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      go(diff > 0 ? 1 : -1);
    }
    setTouchStart(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
        {photos.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-sm bg-navy focus-visible:outline-teal-400 ${
              i % 5 === 0 ? "col-span-2 aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-square" : "aspect-[4/5]"
            }`}
            aria-label={`Ampliar imagem ${i + 1} de ${label}`}
          >
            <img
              src={img(p, 900)}
              alt={`${label} — imagem ${i + 1}`}
              loading={i < 3 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="u-grade-soft absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex select-none items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — visualização ampliada`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-off transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/10 hover:text-teal-400"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Imagem anterior"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-off transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/10 hover:text-teal-400 sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-[86vh] max-w-5xl">
            <img
              src={img(photos[active], 1600)}
              alt={`${label} — imagem ${active + 1}`}
              decoding="async"
              className="max-h-[80vh] w-auto rounded-sm object-contain"
            />
            <figcaption className="mt-3 text-center text-xs text-mist">
              {label} · {active + 1} / {photos.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Próxima imagem"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-off transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal/10 hover:text-teal-400 sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
