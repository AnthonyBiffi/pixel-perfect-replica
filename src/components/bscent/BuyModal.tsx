import { useEffect } from "react";
import { LINKS, type Product } from "@/data/bscent";

const STORES = [
  { label: "WhatsApp", href: LINKS.whatsapp, note: "Atendimento direto" },
  { label: "Shopee", href: LINKS.shopee, note: "Frete e cupons" },
  { label: "Mercado Livre", href: LINKS.mercadoLivre, note: "Compra protegida" },
  { label: "TikTok Shop", href: LINKS.tiktok, note: "Ofertas ao vivo" },
];

export function BuyModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
      />
      <div className="relative w-full max-w-md rounded-t-xl bg-background p-7 shadow-xl sm:rounded-xl">
        <p className="eyebrow">Onde comprar</p>
        <h3 className="mt-2 text-2xl">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-6 space-y-2">
          {STORES.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border border-border px-5 py-4 text-sm tracking-wide transition-colors hover:bg-secondary"
            >
              <span>{s.label}</span>
              <span className="text-xs text-muted-foreground">{s.note}</span>
            </a>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full text-center text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
