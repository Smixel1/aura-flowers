import { Modal } from "@/components/Modal";
import {
  colorLabels,
  deliveryFacts,
  formatPrice,
  occasionLabels,
  photoApprovalNote,
  seasonalityNote,
  type Bouquet,
} from "@/data/bouquets";

export function ProductModal({
  bouquet,
  onClose,
  onOrder,
}: {
  bouquet: Bouquet | null;
  onClose: () => void;
  onOrder: (bouquet: Bouquet) => void;
}) {
  return (
    <Modal open={bouquet !== null} onClose={onClose} label="Композиция" className="max-w-5xl">
      {bouquet ? (
        <div className="grid md:grid-cols-2">
          <img
            src={bouquet.image}
            alt={bouquet.alt}
            width={1024}
            height={1280}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="flex flex-col justify-center gap-6 px-6 py-10 sm:px-10">
            <div>
              <p className="eyebrow">
                {bouquet.occasions.map((o) => occasionLabels[o]).join(" · ")}
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{bouquet.name}</h2>
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
              <button type="button" className="btn-gold" onClick={() => onOrder(bouquet)}>
                Заказать
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
