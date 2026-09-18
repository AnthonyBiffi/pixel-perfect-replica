import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/bscent/Header";
import { Faq } from "@/components/bscent/Faq";
import { BuyModal } from "@/components/bscent/BuyModal";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  LINKS,
  TESTIMONIALS,
  type Product,
} from "@/data/bscent";
import { useBscentData } from "@/hooks/useBscentData";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bscent — Fragrâncias artesanais para casa" },
      {
        name: "description",
        content:
          "Velas, difusores, home sprays e wax melts feitos à mão em pequenos lotes. Criada para transformar ambientes.",
      },
      { property: "og:title", content: "Bscent — Fragrâncias artesanais para casa" },
      {
        property: "og:description",
        content:
          "Velas, difusores, home sprays e wax melts feitos à mão em pequenos lotes. Criada para transformar ambientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { products, aromas, loading } = useBscentData();
  const [category, setCategory] = useState<string>("Todos");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (category === "Todos" ? products : products.filter((p) => p.category === category)),
    [category, products],
  );
  const highlights = useMemo(() => {
    const news = products.filter((p) => p.isNew);
    return news.length > 0 ? news.slice(0, 6) : products.slice(0, 3);
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section id="inicio" className="relative">
        <div className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
          <img
            src={hero}
            alt="Vela Bscent acesa sobre mesa de madeira com luz natural"
            width={1600}
            height={1104}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-14 sm:pb-20">
            <Reveal>
              <p className="eyebrow">Fragrâncias artesanais para casa</p>
              <h1 className="mt-4 max-w-2xl text-4xl leading-[1.12] sm:text-6xl">
                Criada para transformar ambientes.
                <br />
                Feita para marcar momentos.
              </h1>
              <a
                href="#colecoes"
                className="btn-base btn-solid mt-8 hover:btn-solid-hover"
              >
                Conheça nossas coleções
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Destaques e lançamentos</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Recém-saídos do ateliê</h2>
        </Reveal>
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {highlights.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 120}
              className="min-w-[78%] snap-start sm:min-w-0"
            >
              <button onClick={() => setSelected(p)} className="group block w-full text-left">
                <div className="overflow-hidden bg-sand">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={912}
                    height={1104}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="eyebrow mt-4">{p.category}</p>
                <h3 className="mt-1 text-xl">{p.name}</h3>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="colecoes" className="bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow">Vitrine</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Nossas coleções</h2>
          </Reveal>

          <div className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-taupe hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3">
            {filtered.length === 0 ? (
              <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
                Nenhum produto encontrado nesta categoria.
              </div>
            ) : (
              filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 100} as="article">
                  <div className="group flex h-full flex-col">
                    <div className="overflow-hidden bg-sand">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={912}
                        height={1104}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="eyebrow">{p.category}</p>
                      {p.price && (
                        <span className="text-xs font-medium text-foreground tracking-wide">{p.price}</span>
                      )}
                    </div>
                    <h3 className="mt-1 text-lg leading-snug sm:text-xl">{p.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {p.description}
                    </p>
                    <button
                      onClick={() => setSelected(p)}
                      className="btn-base btn-outline mt-4 w-full hover:bg-secondary"
                    >
                      Onde comprar
                    </button>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* BIBLIOTECA DE AROMAS */}
      <section id="aromas" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Biblioteca de aromas</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Cada nota conta uma história</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Desenvolvemos nossas composições em pequenos lotes, equilibrando notas de saída, corpo e
            fundo para que o perfume evolua ao longo do dia.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
          {aromas.length === 0 ? (
            <div className="col-span-full bg-background p-8 text-center text-sm text-muted-foreground">
              Nenhum aroma cadastrado no momento.
            </div>
          ) : (
            aromas.map((s, i) => {
              const title = s.title || s.name || "Sem título";
              const story = s.description || s.story || "";
              const top = s.top || s.topNotes || "";
              const heart = s.heart || s.heartNotes || "";
              const base = s.base || s.baseNotes || "";

              return (
                <Reveal key={s.id || title || i} delay={(i % 2) * 100} className="bg-background p-7 sm:p-9">
                  <h3 className="text-2xl">{title}</h3>
                  {story && <p className="mt-2 text-sm text-muted-foreground italic">{story}</p>}
                  <dl className="mt-6 space-y-2 text-xs tracking-wide">
                    {[
                      ["Saída", top],
                      ["Corpo", heart],
                      ["Fundo", base],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <dt className="w-16 shrink-0 uppercase text-taupe">{k}</dt>
                        <dd className="text-foreground">{v || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              );
            })
          )}
        </div>
      </section>

      {/* PERSONALIZADOS */}
      <section id="personalizados" className="bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:py-28 lg:grid-cols-2">
          <Reveal>
            <img
              src={hero}
              alt="Lembranças personalizadas Bscent para eventos"
              loading="lazy"
              width={1600}
              height={1104}
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Personalizados e eventos</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Lembranças que ficam na memória — e no ambiente
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-foreground">
              Casamentos, aniversários e presentes corporativos. Produzimos grandes volumes com
              aroma, rótulo, cor e embalagem desenvolvidos junto com você, mantendo o acabamento
              artesanal em cada unidade.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {["A partir de 30 unidades", "Rótulo e embalagem sob medida", "Aroma exclusivo para a sua marca"].map(
                (t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-px w-5 shrink-0 bg-taupe" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-solid mt-8 hover:btn-solid-hover"
            >
              Solicite um orçamento
            </a>
          </Reveal>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="mx-auto max-w-4xl px-5 py-20 sm:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">Sobre a Bscent</p>
          <h2 className="mt-4 text-3xl leading-snug sm:text-5xl">
            Perfume é memória. Nós a preparamos à mão.
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-10 columns-1 gap-10 text-sm leading-[1.9] text-muted-foreground sm:columns-2">
          <p className="mb-5">
            A Bscent nasceu do desejo de transformar a casa num lugar que se reconhece pelo cheiro.
            Começamos numa cozinha, com uma panela de cera vegetal e a certeza de que um ambiente
            bem perfumado muda o jeito como o dia acontece.
          </p>
          <p className="mb-5">
            Hoje produzimos em pequenos lotes, controlando cada etapa: a escolha das essências, a
            temperatura da cera, a cura de cada peça e a conferência do acabamento antes do envio.
            Nada sai do ateliê sem passar pelas nossas mãos.
          </p>
          <p>
            Trabalhamos com ceras vegetais, essências de grau cosmético e embalagens pensadas para
            durar além do produto. É uma marca brasileira, feita para casas brasileiras — e para os
            momentos que você quer lembrar.
          </p>
        </Reveal>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow">Quem já sentiu</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">@bscent.oficial</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {products.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="block overflow-hidden bg-sand">
                  <img
                    src={p.image}
                    alt={`Cliente Bscent com ${p.name}`}
                    loading="lazy"
                    width={912}
                    height={1104}
                    className="aspect-square w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                  />
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={i * 110}>
                <p className="font-display text-xl leading-snug">“{t.text}”</p>
                <p className="eyebrow mt-3">{t.author}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2 className="mt-3 mb-10 text-3xl sm:text-4xl">Perguntas comuns</h2>
        </Reveal>
        <Reveal delay={100}>
          <Faq />
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="font-display text-2xl tracking-[0.3em] uppercase">Bscent</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Fragrâncias artesanais para casa, feitas em pequenos lotes no Brasil.
              </p>
            </div>
            <div>
              <p className="eyebrow">Onde comprar</p>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  ["Shopee", LINKS.shopee],
                  ["Mercado Livre", LINKS.mercadoLivre],
                  ["TikTok Shop", LINKS.tiktok],
                  ["WhatsApp", LINKS.whatsapp],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Contato</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={LINKS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Instagram @bscent.oficial
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    TikTok @bscent.oficial
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.email}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    contatobscent@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs tracking-wide text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Bscent. Todos os direitos reservados.</p>
            <Link
              to="/admin"
              className="text-[11px] text-muted-foreground/50 transition-colors hover:text-foreground"
              title="Painel Administrativo"
            >
              Área restrita
            </Link>
          </div>
        </div>
      </footer>

      <BuyModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
