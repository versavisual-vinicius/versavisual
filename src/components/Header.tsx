import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../imports/logo-white.png";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/ativacoes-eventos", label: "Ativações & Eventos" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#nichos", label: "Segmentos", hash: true },
  { href: "/#processo", label: "Processo", hash: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const noHeroRoutes = ["/portfolio", "/diagnostico-visual", "/404"];
  const isHeroPage = !noHeroRoutes.some((r) => pathname.startsWith(r));
  const transparent = !scrolled && !open && isHeroPage;

  const isActive = (href: string, hash?: boolean) => {
    if (hash) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        transparent
          ? "border-b border-transparent bg-gradient-to-b from-ink/60 to-transparent"
          : "border-b border-line bg-[#f0f3f4] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 lg:px-10">
        {/* Logo */}
        <Link to="/" aria-label="VERSAVISUAL — página inicial">
          <img
            src={logo}
            alt="VERSAVISUAL"
            width={112}
            height={28}
            className={`block h-7 w-auto transition-all duration-500 ${transparent ? "" : "invert"}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm tracking-wide transition-colors duration-200 ease-out ${
                isActive(l.href, l.hash)
                  ? transparent ? "text-off" : "text-ink"
                  : transparent ? "text-mist/90 hover:text-off" : "text-navy hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/diagnostico-visual"
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-out ${
              transparent
                ? "border border-teal-400/50 bg-teal/10 text-off hover:bg-teal hover:text-ink"
                : "bg-teal text-ink hover:bg-teal-400"
            }`}
          >
            Iniciar projeto
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center lg:hidden ${transparent ? "text-off" : "text-ink"}`}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-off lg:hidden">
          <nav aria-label="Navegação principal" className="px-5 py-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3.5 text-lg text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/diagnostico-visual"
              onClick={() => setOpen(false)}
              className="mt-6 block rounded-xl bg-teal px-4 py-3.5 text-center font-medium text-ink"
            >
              Iniciar projeto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
