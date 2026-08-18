import { Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { badgeLabels, formatPrice, type Bouquet } from "@/data/bouquets";

function openModalFromLink(event: MouseEvent, onOpen: () => void) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  onOpen();
}

export function ProductCard({
  bouquet,
  onOpen,
  onOrder,
  eager = false,
}: {
  bouquet: Bouquet;
  onOpen: (bouquet: Bouquet) => void;
  onOrder: (bouquet: Bouquet) => void;
  eager?: boolean;
}) {
  const compositionPreview = bouquet.composition[0];

  return (
    <article className="group flex h-full flex-col">
      <Link
        to="/shop/$slug"
        params={{ slug: bouquet.id }}
        onClick={(event) => openModalFromLink(event, () => onOpen(bouquet))}
        aria-label={`Открыть композицию «${bouquet.name}»`}
        className="relative block w-full overflow-hidden bg-secondary"
      >
        <span aria-hidden="true" className="product-card-accent" />
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
          loading={eager ? "eager" : "lazy"}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col pt-6">
        <Link
          to="/shop/$slug"
          params={{ slug: bouquet.id }}
          onClick={(event) => openModalFromLink(event, () => onOpen(bouquet))}
          className="text-left font-display text-2xl transition-colors duration-500 group-hover:text-bloom"
        >
          {bouquet.name}
        </Link>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bouquet.tagline}</p>
        {compositionPreview ? (
          <p className="mt-3 text-xs leading-relaxed text-foreground/55">{compositionPreview}</p>
        ) : null}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-5">
          <span className="text-sm tracking-wide">{formatPrice(bouquet.price)}</span>
          <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-5">
            <Link
              to="/shop/$slug"
              params={{ slug: bouquet.id }}
              className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-bloom"
            >
              Подробнее
            </Link>
            <button
              type="button"
              onClick={() => onOrder(bouquet)}
              className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-gold"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
