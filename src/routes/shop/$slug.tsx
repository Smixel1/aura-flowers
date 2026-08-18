import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useSiteUi } from "@/components/SiteUiProvider";
import {
  badgeLabels,
  colorLabels,
  deliveryFacts,
  formatPrice,
  getBouquetBySlug,
  getBouquetProductPath,
  occasionLabels,
  photoApprovalNote,
  seasonalityNote,
} from "@/data/bouquets";
import { buildPageMeta } from "@/lib/seo-meta";
import { productJsonLdScript } from "@/lib/product-schema";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const bouquet = getBouquetBySlug(params.slug);
    if (!bouquet) throw notFound();
    return bouquet;
  },
  head: ({ loaderData: bouquet }) => {
    if (!bouquet) return {};

    const path = getBouquetProductPath(bouquet);

    return {
      ...buildPageMeta({
        title: `${bouquet.name} — LUNA FLOWERS`,
        description: bouquet.description,
        path,
        ogImage: bouquet.image,
      }),
      scripts: [productJsonLdScript(bouquet)],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const bouquet = Route.useLoaderData();
  const { openOrder } = useSiteUi();

  function handleOrder() {
    openOrder({
      bouquet: bouquet.name,
      composition: bouquet.composition.join(", "),
      estimatedPrice: formatPrice(bouquet.price),
      budget: formatPrice(bouquet.price),
      quantity: 1,
      total: bouquet.price,
      source: "catalog",
    });
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-32 lg:px-12 lg:pt-48">
      <Reveal>
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <li>
              <Link to="/" className="link-underline">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">→</li>
            <li>
              <Link to="/shop" className="link-underline">
                Каталог
              </Link>
            </li>
            <li aria-hidden="true">→</li>
            <li className="text-foreground/70">{bouquet.name}</li>
          </ol>
        </nav>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          {bouquet.badge ? (
            <span className="absolute left-4 top-4 z-10 border border-bloom/40 bg-background/90 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.24em] text-burgundy backdrop-blur-sm">
              {badgeLabels[bouquet.badge]}
            </span>
          ) : null}
          <img
            src={bouquet.image}
            alt={bouquet.alt}
            width={1024}
            height={1280}
            loading="eager"
            className="aspect-[4/5] w-full object-cover"
          />
        </Reveal>

        <Reveal delay={120} className="flex flex-col justify-center gap-6">
          <div>
            <p className="eyebrow">{bouquet.occasions.map((o) => occasionLabels[o]).join(" · ")}</p>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{bouquet.name}</h1>
            <p className="mt-3 text-sm italic text-muted-foreground">{bouquet.tagline}</p>
          </div>

          <p className="text-sm leading-relaxed text-foreground/80">{bouquet.description}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Состав</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                {bouquet.composition.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div>
                <p className="eyebrow">Размер</p>
                <p className="mt-3 text-sm text-foreground/80">{bouquet.size}</p>
              </div>
              <div>
                <p className="eyebrow">Гамма</p>
                <p className="mt-3 text-sm text-foreground/80">{colorLabels[bouquet.color]}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <p className="eyebrow">Доставка</p>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
              {deliveryFacts.map((fact) => (
                <li key={fact.title}>
                  {fact.title} — {fact.value}
                  <span className="text-muted-foreground"> ({fact.note})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 bg-secondary/60 p-5">
            <p className="text-xs leading-relaxed text-muted-foreground">{seasonalityNote}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{photoApprovalNote}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-border pt-6">
            <span className="font-display text-2xl">{formatPrice(bouquet.price)}</span>
            <button type="button" className="btn-gold" onClick={handleOrder}>
              Заказать
            </button>
            <Link to="/shop" className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-gold">
              ← В каталог
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
