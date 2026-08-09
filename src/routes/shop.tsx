import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { useSiteUi } from "@/components/SiteUiProvider";
import {
  bouquets,
  budgetRanges,
  colorLabels,
  occasionLabels,
  recipientLabels,
  type Bouquet,
  type ColorTag,
  type Occasion,
  type Recipient,
} from "@/data/bouquets";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Каталог букетов — LUNA FLOWERS" },
      {
        name: "description",
        content:
          "Более 20 авторских букетов LUNA FLOWERS от 1 500 ₽: свидание, день рождения, годовщина, свадьба. Фильтры по поводу, получателю, бюджету и цвету.",
      },
      { property: "og:title", content: "Каталог букетов — LUNA FLOWERS" },
      {
        property: "og:description",
        content: "Композиции сезона: от повседневных букетов до премиальных композиций.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
      <div className="-mx-6 flex gap-x-5 gap-y-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 sm:gap-x-6">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`shrink-0 whitespace-nowrap text-sm transition-colors ${value === null ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
        >
          Все
        </button>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(value === option.id ? null : option.id)}
            className={`shrink-0 whitespace-nowrap text-sm transition-colors ${value === option.id ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
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
  const [recipient, setRecipient] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [active, setActive] = useState<Bouquet | null>(null);

  const visible = useMemo(
    () =>
      bouquets.filter((bouquet) => {
        if (occasion && !bouquet.occasions.includes(occasion as Occasion)) return false;
        if (recipient && !bouquet.recipients.includes(recipient as Recipient)) return false;
        if (color && bouquet.color !== color) return false;
        if (budget) {
          const range = budgetRanges.find((r) => r.id === budget);
          if (range && (bouquet.price < range.min || bouquet.price >= range.max)) return false;
        }
        return true;
      }),
    [occasion, recipient, budget, color],
  );

  const hasFilters = Boolean(occasion || recipient || budget || color);

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

      <Reveal className="mt-12 space-y-6 border-y border-border py-8 lg:mt-16 lg:py-10">
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
          label="Кому"
          value={recipient}
          onChange={setRecipient}
          options={(Object.keys(recipientLabels) as Recipient[]).map((id) => ({
            id,
            label: recipientLabels[id],
          }))}
        />
        <FilterRow
          label="Бюджет"
          value={budget}
          onChange={setBudget}
          options={budgetRanges.map((r) => ({ id: r.id, label: r.label }))}
        />
        <FilterRow
          label="Цвет"
          value={color}
          onChange={setColor}
          options={(Object.keys(colorLabels) as ColorTag[]).map((id) => ({
            id,
            label: colorLabels[id],
          }))}
        />
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Найдено композиций: {visible.length}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setOccasion(null);
              setRecipient(null);
              setBudget(null);
              setColor(null);
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
