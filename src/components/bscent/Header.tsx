import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Coleções", href: "#colecoes" },
  { label: "Aromas", href: "#aromas" },
  { label: "Personalizados", href: "#personalizados" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20">
        <a href="#inicio" className="font-display text-2xl tracking-[0.3em] uppercase">
          Bscent
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 h-px w-6 bg-foreground transition-all duration-300",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-6 bg-foreground transition-all duration-300",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-border bg-background transition-[max-height] duration-500 md:hidden",
          open ? "max-h-96 border-b" : "max-h-0",
        )}
      >
        <nav className="flex flex-col px-5 pb-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 text-sm tracking-[0.12em] uppercase last:border-0"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
