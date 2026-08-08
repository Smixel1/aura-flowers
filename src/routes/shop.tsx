import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { useSiteUi } from "@/components/SiteUiProvider";
import {
  bouquets,
  budgetRanges,
  occasionLabels,
  paletteLabels,
  type Bouquet,
  type Occasion,
  type Palette,
} from "@/data/bouquets";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Каталог букетов — LUNA FLOWERS" },
      {
        name: "description",
        content:
          "Авторские композиции LUNA FLOWERS: свидание, свадьба, день рождения, корпоративные подарки. Фильтры по поводу, гамме и бюджету.",
      },
      { property: "og:title", content: "Каталог букетов — LUNA FLOWERS" },
      {
        property: "og:description",
        content: "Композиции сезона: от тихой архитектуры до прямого признания.",
      },
    ],
  }),
  component: Shop,
});

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
      <span className="eyebrow shrink-0 sm:w-32">{label}</span>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`text-sm transition-colors ${value === null ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
        >
          Все
        </button>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`text-sm transition-colors ${value === option.id ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Shop() {
  const { openOrder } = useSiteUi();
  const [occasion, setOccasion] = useState<string | null>(null);
  const [palette, setPalette] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [active, setActive] = useState<Bouquet | null>(null);

  const visible = useMemo(
    () =>
      bouquets.filter((bouquet) => {
        if (occasion && !bouquet.occasions.includes(occasion as Occasion)) return false;
        if (palette && bouquet.palette !== palette) return false;
        if (budget) {
          const range = budgetRanges.find((r) => r.id === budget);
          if (range && (bouquet.price < range.min || bouquet.price > range.max)) return false;
        }
        return true;
      }),
    [occasion, palette, budget],
  );

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-40 lg:px-12 lg:pt-48">
      <Reveal>
        <p className="eyebrow">Каталог</p>
        <h1 className="mt-6 max-w-2xl text-5xl leading-tight sm:text-6xl">Коллекция</h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          Шесть композиций, которые мы собираем ежедневно. Любую из них можно изменить под ваш
          повод.
        </p>
      </Reveal>

      <Reveal className="mt-16 space-y-6 border-y border-border py-10">
        <FilterRow
          label="Повод"
          value={occasion}
          onChange={setOccasion}
          options={(Object.keys(occasionLabels) as Occasion[]).map((id) => ({
            id,
            label: occasionLabels[id],
          }))}
        />
        <FilterRow
          label="Гамма"
          value={palette}
          onChange={setPalette}
          options={(Object.keys(paletteLabels) as Palette[]).map((id) => ({
            id,
            label: paletteLabels[id],
          }))}
        />
        <FilterRow
          label="Бюджет"
          value={budget}
          onChange={setBudget}
          options={budgetRanges.map((r) => ({ id: r.id, label: r.label }))}
        />
      </Reveal>

      {visible.length === 0 ? (
        <p className="py-24 text-center text-sm text-muted-foreground">
          По этим параметрам готовых композиций нет — соберём индивидуально.
        </p>
      ) : (
        <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((bouquet, i) => (
            <Reveal key={bouquet.id} delay={(i % 3) * 100}>
              <ProductCard
                bouquet={bouquet}
                eager={i < 3}
                onOpen={setActive}
                onOrder={(b) => openOrder({ bouquet: b.name, source: "catalog" })}
              />
            </Reveal>
          ))}
        </div>
      )}

      <ProductModal
        bouquet={active}
        onClose={() => setActive(null)}
        onOrder={(b) => {
          setActive(null);
          openOrder({ bouquet: b.name, source: "catalog" });
        }}
      />
    </div>
  );
}
