import { useMemo, useState } from "react";
import { useSiteUi } from "@/components/SiteUiProvider";
import { formatPrice } from "@/data/bouquets";

type Flower = { id: string; label: string; unit: number; note: string };
type ColorOption = { id: string; label: string; hex: string; factor: number };
type Packaging = { id: string; label: string; price: number; wrap: string };

const flowers: Flower[] = [
  { id: "rose", label: "Роза", unit: 220, note: "стойкая классика, 7–10 дней" },
  { id: "tulip", label: "Тюльпан", unit: 150, note: "сезон: январь — апрель" },
  { id: "peony", label: "Пион", unit: 620, note: "сезон: май — июль" },
  { id: "eustoma", label: "Эустома", unit: 320, note: "мягкий объём, долго стоит" },
  { id: "chrysanthemum", label: "Хризантема", unit: 190, note: "самая стойкая позиция" },
  { id: "ranunculus", label: "Ранункулюс", unit: 340, note: "сезон: зима — весна" },
];

const counts = [5, 9, 15, 25, 51];

const colorOptions: ColorOption[] = [
  { id: "white", label: "Белый", hex: "#F3EFE7", factor: 1 },
  { id: "cream", label: "Кремовый", hex: "#E8D9BE", factor: 1 },
  { id: "pink", label: "Розовый", hex: "#E3B4B8", factor: 1.05 },
  { id: "red", label: "Красный", hex: "#8E2233", factor: 1.1 },
  { id: "lavender", label: "Лавандовый", hex: "#B3A6C9", factor: 1.08 },
  { id: "mix", label: "Микс", hex: "#D8BFA8", factor: 1.12 },
];

const packagings: Packaging[] = [
  { id: "paper", label: "Матовая бумага", price: 400, wrap: "#EDE4D6" },
  { id: "kraft", label: "Крафт", price: 300, wrap: "#DCC7A8" },
  { id: "ribbon", label: "Только лента", price: 200, wrap: "#F7F3EC" },
  { id: "box", label: "Шляпная коробка", price: 1400, wrap: "#E2D3C0" },
];

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-3 text-left text-sm transition-colors ${
        active
          ? "border-gold text-gold"
          : "border-border text-foreground/80 hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}

function BouquetPreview({
  count,
  color,
  packaging,
}: {
  count: number;
  color: ColorOption;
  packaging: Packaging;
}) {
  const blooms = Math.min(count, 24);
  const columns = Math.ceil(Math.sqrt(blooms));
  const items = Array.from({ length: blooms }, (_, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const spread = 118 / Math.max(columns, 1);
    const x = 100 + (col - (columns - 1) / 2) * spread + (row % 2 ? spread / 3 : -spread / 3);
    const y = 92 + row * (spread * 0.66) - (columns - 1) * 6;
    return { x, y, r: Math.max(7, 20 - columns * 1.6) };
  });

  return (
    <svg
      viewBox="0 0 200 260"
      role="img"
      aria-label={`Схематичное изображение букета: ${count} шт., ${color.label.toLowerCase()}, ${packaging.label.toLowerCase()}`}
      className="h-full w-full"
    >
      <rect width="200" height="260" fill="var(--color-secondary)" />
      {items.map((item, i) => (
        <g key={i}>
          <path
            d={`M100 210 C ${(100 + item.x) / 2} 180 ${item.x} ${item.y + 40} ${item.x} ${item.y + 12}`}
            stroke="#6E7B52"
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx={item.x} cy={item.y} r={item.r} fill={color.hex} stroke="#00000012" />
          <circle cx={item.x} cy={item.y} r={item.r / 3} fill="#00000010" />
        </g>
      ))}
      {packaging.id === "box" ? (
        <rect x="58" y="192" width="84" height="52" fill={packaging.wrap} stroke="#00000018" />
      ) : (
        <path
          d="M64 196 L100 244 L136 196 L118 188 L82 188 Z"
          fill={packaging.wrap}
          stroke="#00000018"
        />
      )}
      <path d="M86 206 h28" stroke="var(--color-gold)" strokeWidth="2" />
    </svg>
  );
}

export function BouquetConstructor() {
  const { openOrder } = useSiteUi();
  const [flowerId, setFlowerId] = useState(flowers[0]!.id);
  const [count, setCount] = useState(9);
  const [colorId, setColorId] = useState(colorOptions[1]!.id);
  const [packagingId, setPackagingId] = useState(packagings[0]!.id);

  const flower = flowers.find((f) => f.id === flowerId)!;
  const color = colorOptions.find((c) => c.id === colorId)!;
  const packaging = packagings.find((p) => p.id === packagingId)!;

  const price = useMemo(() => {
    const raw = flower.unit * count * color.factor + packaging.price;
    return Math.round(raw / 100) * 100;
  }, [flower, count, color, packaging]);

  return (
    <section className="border-t border-border bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="max-w-xl">
          <p className="eyebrow">Конструктор</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">Создайте свой букет</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Соберите композицию по шагам — мы покажем примерную стоимость. Флорист свяжется с вами
            и подтвердит наличие цветов и финальную цену.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-10">
            <div>
              <p className="eyebrow">Шаг 1 · Основной цветок</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {flowers.map((item) => (
                  <OptionButton
                    key={item.id}
                    active={item.id === flowerId}
                    onClick={() => setFlowerId(item.id)}
                  >
                    <span className="block">{item.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{item.note}</span>
                  </OptionButton>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow">Шаг 2 · Количество</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {counts.map((item) => (
                  <OptionButton key={item} active={item === count} onClick={() => setCount(item)}>
                    {item} шт.
                  </OptionButton>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow">Шаг 3 · Цвет</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {colorOptions.map((item) => (
                  <OptionButton
                    key={item.id}
                    active={item.id === colorId}
                    onClick={() => setColorId(item.id)}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="inline-block h-3 w-3 rounded-full border border-border"
                        style={{ backgroundColor: item.hex }}
                      />
                      {item.label}
                    </span>
                  </OptionButton>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow">Шаг 4 · Упаковка</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {packagings.map((item) => (
                  <OptionButton
                    key={item.id}
                    active={item.id === packagingId}
                    onClick={() => setPackagingId(item.id)}
                  >
                    <span className="block">{item.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      +{formatPrice(item.price)}
                    </span>
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-6 border border-border bg-background p-6">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <BouquetPreview count={count} color={color} packaging={packaging} />
            </div>

            <div className="space-y-1.5 text-sm text-foreground/80">
              <p>
                {flower.label} · {count} шт.
              </p>
              <p>
                Гамма: {color.label.toLowerCase()} · {packaging.label.toLowerCase()}
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <p className="eyebrow">Примерная стоимость</p>
              <p className="mt-3 font-display text-4xl">{formatPrice(price)}</p>
            </div>

            <button
              type="button"
              className="btn-gold w-full"
              onClick={() =>
                openOrder({
                  bouquet: `Свой букет: ${flower.label}, ${count} шт.`,
                  wishes: `Гамма: ${color.label}. Упаковка: ${packaging.label}. Примерная стоимость: ${formatPrice(price)}`,
                  source: "bespoke",
                })
              }
            >
              Собрать букет
            </button>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Изображение — схематичная визуализация выбранных параметров, а не фотография готового
              букета. Финальный вид композиции зависит от сорта и наличия цветов; флорист согласует
              его с вами до сборки.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
