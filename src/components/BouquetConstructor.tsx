import { useEffect, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useSiteUi } from "@/components/SiteUiProvider";
import { Reveal } from "@/components/Reveal";
import { formatPrice } from "@/data/bouquets";
import {
  buildConstructorSnapshot,
  calculateConstructorTotal,
  constructorExtras,
  constructorFlowers,
  formatCompositionSummary,
  getPrimaryFlowerId,
  getTotalStems,
  type ConstructorSnapshot,
  type FlowerQuantities,
  type SelectedExtras,
} from "@/data/constructor";
import { cn } from "@/lib/utils";

function QuantityControl({
  value,
  onChange,
  min = 0,
  max = 99,
  size = "default",
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "default" | "large";
  label?: string;
}) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className="inline-flex items-center border border-border bg-background transition-colors duration-500"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Уменьшить количество"
        className={cn(
          "flex items-center justify-center text-foreground/60 transition-colors duration-500 hover:text-bloom disabled:opacity-30",
          size === "large" ? "h-12 w-12" : "h-10 w-10",
        )}
      >
        <Minus className="h-4 w-4" strokeWidth={1.2} />
      </button>
      <span
        className={cn(
          "min-w-[2.75rem] border-x border-border text-center tabular-nums",
          size === "large" ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Увеличить количество"
        className={cn(
          "flex items-center justify-center text-foreground/60 transition-colors duration-500 hover:text-bloom disabled:opacity-30",
          size === "large" ? "h-12 w-12" : "h-10 w-10",
        )}
      >
        <Plus className="h-4 w-4" strokeWidth={1.2} />
      </button>
    </div>
  );
}

function ExtraToggle({
  active,
  onClick,
  label,
  price,
  description,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  price: number;
  description?: string | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full border px-5 py-5 text-left transition-all duration-500",
        active ? "border-bloom/50 bg-bloom/5" : "border-border bg-background hover:border-bloom/30",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={cn("text-sm transition-colors", active && "text-burgundy")}>
            {label}
          </span>
          {description ? (
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <span className="shrink-0 text-xs tracking-wide text-gold">+{formatPrice(price)}</span>
      </div>
    </button>
  );
}

export function BouquetConstructor({
  onSnapshotChange,
}: {
  onSnapshotChange?: (snapshot: ConstructorSnapshot | null) => void;
}) {
  const { openOrder } = useSiteUi();
  const [quantities, setQuantities] = useState<FlowerQuantities>(() =>
    Object.fromEntries(constructorFlowers.map((f) => [f.id, 0])),
  );
  const [extras, setExtras] = useState<SelectedExtras>(() =>
    Object.fromEntries(constructorExtras.map((e) => [e.id, false])),
  );

  const primaryFlowerId = getPrimaryFlowerId(quantities);
  const primaryFlower = constructorFlowers.find((f) => f.id === primaryFlowerId);
  const totalStems = getTotalStems(quantities);
  const total = useMemo(() => calculateConstructorTotal(quantities, extras), [quantities, extras]);
  const hasSelection = totalStems > 0;

  const flowerItems = useMemo(
    () =>
      constructorFlowers
        .map((flower) => {
          const qty = quantities[flower.id] ?? 0;
          if (qty <= 0) return null;
          return {
            id: flower.id,
            label: flower.label,
            qty,
            amount: flower.unitPrice * qty,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [quantities],
  );

  const extraItems = useMemo(
    () =>
      constructorExtras
        .filter((extra) => extras[extra.id])
        .map((extra) => ({ id: extra.id, label: extra.label, amount: extra.price })),
    [extras],
  );

  const flowersSubtotal = useMemo(
    () => flowerItems.reduce((sum, item) => sum + item.amount, 0),
    [flowerItems],
  );

  const extrasSubtotal = useMemo(
    () => extraItems.reduce((sum, item) => sum + item.amount, 0),
    [extraItems],
  );

  const snapshot = useMemo(
    () => buildConstructorSnapshot(quantities, extras),
    [quantities, extras],
  );

  useEffect(() => {
    onSnapshotChange?.(snapshot);
  }, [snapshot, onSnapshotChange]);

  function setFlowerQty(flowerId: string, qty: number) {
    setQuantities((prev) => ({ ...prev, [flowerId]: qty }));
  }

  function setPrimaryQty(qty: number) {
    if (!primaryFlowerId) return;
    setFlowerQty(primaryFlowerId, qty);
  }

  function toggleExtra(extraId: string) {
    setExtras((prev) => ({ ...prev, [extraId]: !prev[extraId] }));
  }

  function handleSubmit() {
    if (!hasSelection) return;

    const composition = formatCompositionSummary(quantities, extras);

    openOrder({
      bouquet: "Свой букет",
      composition,
      estimatedPrice: formatPrice(total),
      budget: `≈ ${formatPrice(total)}`,
      quantity: totalStems,
      total,
      source: "bespoke",
    });
  }

  return (
    <section className="border-t border-border bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Конструктор</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Соберите примерный состав букета
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Выберите цветы и количество. Рассчитаем ориентировочную стоимость, а флорист учтёт ваши
            пожелания при создании композиции.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-20">
          <div className="space-y-16">
            <Reveal>
              <p className="eyebrow">Шаг 1 · Выберите цветы</p>
              <div className="mt-6 space-y-3">
                {constructorFlowers.map((flower) => {
                  const qty = quantities[flower.id] ?? 0;
                  const selected = qty > 0;

                  return (
                    <div
                      key={flower.id}
                      className={cn(
                        "flex flex-col gap-5 border px-5 py-5 transition-all duration-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6",
                        selected
                          ? "border-bloom/45 bg-background"
                          : "border-border bg-background/60 hover:border-bloom/25",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "font-display text-xl transition-colors duration-500",
                            selected && "text-burgundy",
                          )}
                        >
                          {flower.label}
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          <span className="text-gold">{formatPrice(flower.unitPrice)}</span>
                          <span> / шт.</span>
                          {flower.note ? <span> · {flower.note}</span> : null}
                        </p>
                      </div>
                      <QuantityControl
                        value={qty}
                        onChange={(next) => setFlowerQty(flower.id, next)}
                        label={`Количество: ${flower.label}`}
                      />
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {primaryFlower ? (
              <Reveal>
                <p className="eyebrow">Шаг 2 · Количество</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Уточните количество для основного цветка — {primaryFlower.label.toLowerCase()}.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-8">
                  <QuantityControl
                    size="large"
                    value={quantities[primaryFlower.id] ?? 0}
                    onChange={setPrimaryQty}
                    min={1}
                    label={`Количество: ${primaryFlower.label}`}
                  />
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Всего стеблей: {totalStems}
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <p className="eyebrow">Шаг 2 · Количество</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Добавьте цветы на первом шаге — здесь появится удобный контроль количества.
                </p>
              </Reveal>
            )}

            <Reveal>
              <p className="eyebrow">Шаг 3 · Дополнения</p>
              <div className="mt-6 space-y-3">
                {constructorExtras.map((extra) => (
                  <ExtraToggle
                    key={extra.id}
                    active={Boolean(extras[extra.id])}
                    onClick={() => toggleExtra(extra.id)}
                    label={extra.label}
                    price={extra.price}
                    description={extra.description}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <aside className="sticky top-28 flex flex-col gap-8 border border-border bg-background p-6 sm:p-8">
              <div>
                <p className="eyebrow">Ваша композиция</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Расчёт ориентировочный — финальный состав и стоимость согласует флорист.
                </p>
              </div>

              {hasSelection ? (
                <div className="space-y-8">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                      Цветы
                    </p>
                    <ul className="mt-4 space-y-3">
                      {flowerItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-baseline justify-between gap-4 text-sm"
                        >
                          <span className="text-foreground/85">
                            {item.qty} × {item.label}
                          </span>
                          <span className="shrink-0 tabular-nums text-foreground/70">
                            {formatPrice(item.amount)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm">
                      <span className="text-muted-foreground">Стоимость цветов</span>
                      <span className="tabular-nums text-gold">{formatPrice(flowersSubtotal)}</span>
                    </div>
                  </div>

                  {extraItems.length > 0 ? (
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                        Дополнения
                      </p>
                      <ul className="mt-4 space-y-3">
                        {extraItems.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-baseline justify-between gap-4 text-sm"
                          >
                            <span className="text-foreground/85">{item.label}</span>
                            <span className="shrink-0 tabular-nums text-foreground/70">
                              {formatPrice(item.amount)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm">
                        <span className="text-muted-foreground">Стоимость дополнений</span>
                        <span className="tabular-nums text-gold">
                          {formatPrice(extrasSubtotal)}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <div className="border-t border-bloom/30 pt-6">
                    <p className="eyebrow">Ориентировочная стоимость</p>
                    <p className="mt-3 font-display text-3xl sm:text-4xl">≈ {formatPrice(total)}</p>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                      Ориентировочная стоимость. Финальный состав и стоимость подтвердит флорист с
                      учётом наличия цветов и ваших пожеланий.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Выберите цветы — расчёт появится здесь.
                </p>
              )}

              <button
                type="button"
                className="btn-gold w-full"
                disabled={!hasSelection}
                onClick={handleSubmit}
              >
                Отправить пожелания флористу
              </button>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
