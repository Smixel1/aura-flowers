import { createFileRoute } from "@tanstack/react-router";
import workshop from "@/assets/workshop.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "О бренде — LUNA FLOWERS" },
      {
        name: "description",
        content:
          "История LUNA FLOWERS: мастерская авторской флористики, честность в свежести, уважение к ремеслу и локальные фермеры-партнёры.",
      },
      { property: "og:title", content: "О бренде — LUNA FLOWERS" },
      {
        property: "og:description",
        content: "Цветы как язык эмоций: философия и ценности мастерской LUNA FLOWERS.",
      },
    ],
  }),
  component: Story,
});

const values = [
  {
    title: "Честность в свежести",
    text: "Мы называем реальную дату поставки и не продаём вчерашние цветы со скидкой.",
  },
  {
    title: "Уважение к ремеслу",
    text: "Один флорист ведёт композицию целиком — от выбора стеблей до узла на ленте.",
  },
  {
    title: "Экологичная упаковка",
    text: "Крафт, шёлк и стекло вместо пластика. Упаковку можно оставить в интерьере.",
  },
  {
    title: "Локальные партнёры",
    text: "Половина ассортимента — подмосковные фермы, с которыми мы работаем годами.",
  },
];

function Story() {
  return (
    <div className="pb-32 pt-40 lg:pt-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow">О бренде</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.15] sm:text-6xl">
            Всё началось с одного букета, который не смогли купить
          </h1>
        </Reveal>

        <Reveal delay={120} className="mt-16 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-[1.9] text-foreground/80">
            В 2014 году основательница LUNA искала цветы для человека, с которым не разговаривала
            семь лет. Ни один готовый букет не подходил: они были или слишком праздничными, или
            слишком нейтральными. Пришлось собрать самой — на кухне, из того, что нашлось на рынке.
            Букет сработал лучше любого письма.
          </p>
          <p className="text-base leading-[1.9] text-foreground/80">
            С тех пор мы собираем цветы именно так: сначала слушаем историю, потом выбираем стебли.
            Мы называем это «языком эмоций» — и он единственная причина, по которой мастерская
            существует. Мы отказываемся от акций, распродаж и «букетов дня»: у момента нет скидки.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-28">
        <img
          src={workshop}
          alt="Флорист собирает композицию на деревянном столе в мастерской"
          width={1408}
          height={1008}
          loading="lazy"
          className="h-[60vh] w-full object-cover"
        />
      </Reveal>

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
      </div>

      <section className="bg-ink py-32 text-ink-foreground lg:py-40">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-3xl leading-[1.45] sm:text-4xl">
            «Хороший букет не должен нравиться всем. Он должен быть узнан одним человеком».
          </p>
          <p className="mt-10 text-[0.65rem] uppercase tracking-[0.4em] text-gold">
            Елена Луна, основатель
          </p>
        </Reveal>
      </section>
    </div>
  );
}
