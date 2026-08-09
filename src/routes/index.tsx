import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/hero.jpg";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { DeliverySection } from "@/components/DeliverySection";
import { useSiteUi } from "@/components/SiteUiProvider";
import { bouquets, type Bouquet } from "@/data/bouquets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUNA FLOWERS — авторские букеты для важных моментов" },
      {
        name: "description",
        content:
          "Премиальная флористика LUNA FLOWERS: авторские букеты, свежесть с аукциона, доставка день в день и подбор композиции вместе с AI-флористом.",
      },
      { property: "og:title", content: "LUNA FLOWERS — авторские букеты для важных моментов" },
      {
        property: "og:description",
        content: "Цветы, которые говорят то, что не успевают сказать слова.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  {
    title: "Свежесть",
    text: "Цветы приезжают с аукциона за 24 часа до сборки",
    icon: (
      <path d="M12 3c3 3.2 4.6 6 4.6 8.6A4.6 4.6 0 0 1 12 16a4.6 4.6 0 0 1-4.6-4.4C7.4 9 9 6.2 12 3ZM12 16v5" />
    ),
  },
  {
    title: "Авторский подход",
    text: "Каждая композиция — работа одного флориста от начала до конца",
    icon: <path d="M4 20 15 9m0 0 4-4-1.6-1.6L13.4 7.4M15 9l-2-2M6 20H4v-2" />,
  },
  {
    title: "Доставка",
    text: "Бережная доставка день в день по городу",
    icon: <path d="M3 16V7h11v9M14 10h4l3 3v3h-7M6.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm11 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" />,
  },
  {
    title: "Индивидуальность",
    text: "Подбираем букет под характер, а не под повод",
    icon: <path d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  },
];

function Home() {
  const { openOrder, openChat } = useSiteUi();
  const [active, setActive] = useState<Bouquet | null>(null);
  const featuredIds = [
    "march-light",
    "cream-line",
    "warm-whisper",
    "peony-solo",
    "round-letter",
    "declaration",
  ];
  const featured = featuredIds
    .map((id) => bouquets.find((b) => b.id === id))
    .filter((b): b is Bouquet => Boolean(b));

  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Кремовый букет из садовых роз в тёплом свете студии"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/25" />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-36 sm:pb-24 lg:px-12 lg:pb-32">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">
                Цветочный бутик в Москве · с 2014
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 text-4xl leading-[1.12] text-ink-foreground sm:mt-8 sm:text-6xl lg:text-7xl">
                Цветы, которые говорят то, что не успевают сказать слова
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-foreground/80 sm:mt-8">
                Букеты от 1 500 ₽ и авторские композиции ручной сборки. Доставим по Москве в
                выбранный двухчасовой интервал и пришлём фото букета на согласование.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center">
                <Link to="/shop" className="btn-gold w-full sm:w-auto">
                  Выбрать букет
                </Link>
                <button
                  type="button"
                  onClick={openChat}
                  className="link-underline w-full text-[0.7rem] uppercase tracking-[0.22em] text-ink-foreground/80 sm:w-auto"
                >
                  Не знаете, что выбрать?
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 90}>
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {benefit.icon}
              </svg>
              <h2 className="mt-6 text-2xl">{benefit.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/50 py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Избранное</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Композиции сезона</h2>
            </div>
            <Link
              to="/shop"
              className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-gold"
            >
              Смотреть коллекцию полностью
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((bouquet, i) => (
              <Reveal key={bouquet.id} delay={(i % 3) * 100}>
                <ProductCard
                  bouquet={bouquet}
                  onOpen={setActive}
                  onOrder={(b) => openOrder({ bouquet: b.name, source: "catalog" })}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-32 text-ink-foreground lg:py-44">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">Философия</p>
          <p className="mt-10 font-display text-3xl leading-[1.4] sm:text-4xl">
            Мы не продаём цветы. Мы помогаем сказать то, что произносится трудно — и остаётся
            надолго.
          </p>
          <Link
            to="/story"
            className="link-underline mt-12 inline-block text-[0.7rem] uppercase tracking-[0.22em] text-gold"
          >
            Узнать историю бренда
          </Link>
        </Reveal>
      </section>

      <section className="py-28 lg:py-36">
        <Reveal className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <TestimonialSlider />
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/50 py-24 lg:py-32">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <p className="eyebrow">Подбор букета</p>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl">Не знаете, что выбрать?</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Ответьте на пять вопросов — кому, по какому поводу, в какой гамме, на какой бюджет и
            какого размера — и мы предложим три подходящие композиции из каталога.
          </p>
          <button type="button" onClick={openChat} className="btn-gold mt-10">
            Подобрать букет
          </button>
        </Reveal>
      </section>

      <section className="border-t border-border py-24 lg:py-32">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <p className="eyebrow">Конструктор</p>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl">Создайте свой букет</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Выберите цветок, количество, цвет и упаковку — увидите примерную стоимость до
            обращения к флористу.
          </p>
          <Link to="/bespoke" className="btn-gold mt-10">
            Собрать букет
          </Link>
        </Reveal>
      </section>

      <DeliverySection />


      <ProductModal
        bouquet={active}
        onClose={() => setActive(null)}
        onOrder={(b) => {
          setActive(null);
          openOrder({ bouquet: b.name, source: "catalog" });
        }}
      />
    </>
  );
}
