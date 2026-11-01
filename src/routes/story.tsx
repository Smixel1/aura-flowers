import { createFileRoute, Link } from "@tanstack/react-router";
import workshop from "@/assets/workshop.jpg";
import { Reveal } from "@/components/Reveal";
import { buildPageMeta, storyOgImage } from "@/lib/seo-meta";

export const Route = createFileRoute("/story")({
  head: () =>
    buildPageMeta({
      title: "О бренде — LUNA FLOWERS",
      description:
        "Подход LUNA FLOWERS к подбору букетов: композиции под настроение, повод и пожелания.",
      ogDescription: "Цветы как язык эмоций: подход LUNA FLOWERS.",
      path: "/story",
      ogImage: storyOgImage,
    }),
  component: Story,
});

const values = [
  {
    title: "Внимание к деталям",
    text: "Расскажите, какие цветы и оттенки вам близки, а что лучше исключить.",
  },
  {
    title: "Обсуждение состава",
    text: "Перед подтверждением заказа уточним состав и возможные сезонные замены.",
  },
  {
    title: "Индивидуальный подход",
    text: "Можно выбрать готовый букет или оставить пожелания к своей композиции.",
  },
  {
    title: "Открытый диалог",
    text: "Стоимость и детали доставки обсудим до подтверждения заказа.",
  },
];

function Story() {
  return (
    <div className="pb-32 pt-28 lg:pt-48">
      <div>
        <Reveal className="hidden lg:block">
          <img
            src={workshop}
            alt="Цветочная композиция на рабочем столе"
            width={1408}
            height={1008}
            loading="lazy"
            className="h-[60vh] w-full object-cover"
          />
        </Reveal>

        <div className="mx-auto mt-0 w-full max-w-[1400px] px-6 lg:mt-28 lg:px-12">
          <Reveal>
            <p className="eyebrow">О бренде</p>
            <h1 className="mt-6 max-w-3xl text-5xl leading-[1.15] sm:text-6xl">
              Букет, в котором есть ваши слова
            </h1>
          </Reveal>

          <Reveal delay={120} className="mt-16 grid gap-12 lg:grid-cols-2">
            <p className="text-base leading-[1.9] text-foreground/80">
              Цветы помогают выразить то, что трудно сказать прямо. Иногда нужен небольшой знак
              внимания, иногда композиция для важного события. Начать можно с готового букета из
              каталога или с нескольких пожеланий о цвете и настроении.
            </p>
            <p className="text-base leading-[1.9] text-foreground/80">
              Расскажите, кому предназначен букет и что для вас важно. Мы уточним состав, стоимость
              и детали получения до подтверждения заказа. Если готовая композиция не подходит,
              предложите свой вариант.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12">
        <Reveal>
          <p className="eyebrow">Ценности</p>
        </Reveal>
        <div className="mt-14 grid gap-14 sm:grid-cols-2">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={(i % 2) * 100} className="border-t border-border pt-8">
              <h2 className="text-2xl">{value.title}</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {value.text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} className="mt-20 max-w-2xl">
          <p className="text-base leading-[1.9] text-foreground/80">
            Готовые композиции — в{" "}
            <Link to="/shop" className="link-underline">
              каталоге
            </Link>
            . Если нужен свой состав —{" "}
            <Link to="/bespoke" className="link-underline">
              соберите примерный вариант
            </Link>
            : флорист уточнит детали и скорректирует композицию перед сборкой.
          </p>
        </Reveal>
      </div>

      <section className="bg-ink py-32 text-ink-foreground lg:py-40">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-3xl leading-[1.45] sm:text-4xl">
            «Хороший букет не должен нравиться всем. Он должен быть узнан одним человеком».
          </p>
          <p className="mt-10 text-[0.65rem] uppercase tracking-[0.4em] text-gold">LUNA FLOWERS</p>
        </Reveal>
      </section>
    </div>
  );
}
