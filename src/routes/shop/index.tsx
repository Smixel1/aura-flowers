import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { useSiteUi } from "@/components/SiteUiProvider";
import {
  budgetRanges,
  catalogCategoryLabels,
  formatPrice,
  matchesCatalogCategory,
  staticBouquets,
  type Bouquet,
  type CatalogCategory,
} from "@/data/bouquets";
import { cn } from "@/lib/utils";
import { buildPageMeta } from "@/lib/seo-meta";

export const Route = createFileRoute("/shop/")({
  head: () =>
    buildPageMeta({
      title: "Каталог букетов — LUNA FLOWERS",
      description:
        "Более 20 авторских букетов LUNA FLOWERS от 1 500 ₽: свидание, день рождения, годовщина, свадьба. Фильтры по поводу, получателю, бюджету и цвету.",
      ogDescription: "Композиции сезона: от повседневных букетов до премиальных композиций.",
      path: "/shop",
    }),
  component: Shop,
});

const categoryOptions: (CatalogCategory | "all")[] = [
  "all",
  "for-her",
  "for-him",
  "special",
  "just-because",
];

function FilterPills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow">{label}</span>
      <div className="-mx-6 flex gap-x-6 gap-y-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn("filter-pill", value === option.id && "filter-pill-active")}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Shop() {
  const bouquets = staticBouquets;
  const { openOrder } = useSiteUi();
  const [category, setCategory] = useState<CatalogCategory | "all">("all");
  const [budget, setBudget] = useState<string | null>(null);
  const [active, setActive] = useState<Bouquet | null>(null);

  const visible = useMemo(
    () =>
      bouquets.filter((bouquet) => {
        if (!matchesCatalogCategory(bouquet, category)) return false;
        if (budget) {
          const range = budgetRanges.find((r) => r.id === budget);
          if (range && (bouquet.price < range.min || bouquet.price >= range.max)) return false;
        }
        return true;
      }),
    [bouquets, category, budget],
  );

  const hasFilters = category !== "all" || Boolean(budget);

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-32 lg:px-12 lg:pt-48">
      <Reveal>
        <p className="eyebrow">Каталог</p>
        <h1 className="mt-6 max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-6xl">Коллекция</h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          Более двадцати композиций — от повседневных букетов до премиальных заказных работ. Любую
          можно изменить под ваш повод и бюджет.
        </p>
      </Reveal>

      <Reveal className="mt-12 space-y-8 border-y border-border py-8 lg:mt-16 lg:py-10">
        <FilterPills
          label="Категория"
          value={category}
          onChange={setCategory}
          options={categoryOptions.map((id) => ({
            id,
            label: catalogCategoryLabels[id],
          }))}
        />
        <FilterPills
          label="Бюджет"
          value={budget ?? "all-budget"}
          onChange={(next) => setBudget(next === "all-budget" ? null : next)}
          options={[
            { id: "all-budget" as const, label: "Все" },
            ...budgetRanges.map((r) => ({ id: r.id, label: r.label })),
          ]}
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Фильтры необязательны — можно спокойно просматривать всю коллекцию.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Найдено композиций: {visible.length}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setBudget(null);
            }}
            className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-gold"
          >
            Сбросить фильтры
          </button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <p className="py-24 text-center text-sm text-muted-foreground">
          По этим параметрам готовых композиций нет — соберём индивидуально.
        </p>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((bouquet, i) => (
            <Reveal key={bouquet.id} delay={(i % 3) * 100}>
              <ProductCard
                bouquet={bouquet}
                eager={i < 3}
                onOpen={setActive}
                onOrder={(b) =>
                  openOrder({
                    bouquet: b.name,
                    composition: b.composition.join(", "),
                    estimatedPrice: formatPrice(b.price),
                    budget: formatPrice(b.price),
                    quantity: 1,
                    total: b.price,
                    source: "catalog",
                  })
                }
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
          openOrder({
            bouquet: b.name,
            composition: b.composition.join(", "),
            estimatedPrice: formatPrice(b.price),
            budget: formatPrice(b.price),
            quantity: 1,
            total: b.price,
            source: "catalog",
          });
        }}
      />
    </div>
  );
}
