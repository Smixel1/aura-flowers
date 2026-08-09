import { deliveryFacts, photoApprovalNote } from "@/data/bouquets";
import { Reveal } from "@/components/Reveal";

export function DeliverySection() {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow">Доставка</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Как мы привозим букеты</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Доставляем по Москве и ближайшему Подмосковью. Точную стоимость и время подтверждает
            менеджер при оформлении заказа.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {deliveryFacts.map((fact, i) => (
            <Reveal key={fact.title} delay={(i % 4) * 80}>
              <div className="border-t border-border pt-6">
                <p className="eyebrow">{fact.title}</p>
                <p className="mt-4 font-display text-3xl text-gold">{fact.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{fact.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            {photoApprovalNote} Если нужного сорта не окажется в наличии, мы согласуем замену
            заранее — стиль, гамма и стоимость композиции сохраняются.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
