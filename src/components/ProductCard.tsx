import { formatPrice, type Bouquet } from "@/data/bouquets";

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
  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={() => onOpen(bouquet)}
        aria-label={`Открыть композицию «${bouquet.name}»`}
        className="relative block w-full overflow-hidden bg-secondary"
      >
        <img
          src={bouquet.image}
          alt={bouquet.alt}
          width={1024}
          height={1280}
          loading={eager ? "eager" : "lazy"}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
        />
      </button>

      <div className="flex flex-1 flex-col pt-6">
        <button
          type="button"
          onClick={() => onOpen(bouquet)}
          className="text-left font-display text-2xl transition-colors group-hover:text-gold"
        >
          {bouquet.name}
        </button>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bouquet.tagline}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm tracking-wide">{formatPrice(bouquet.price)}</span>
          <button
            type="button"
            onClick={() => onOrder(bouquet)}
            className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-gold"
          >
            Заказать
          </button>
        </div>
      </div>
    </article>
  );
}
