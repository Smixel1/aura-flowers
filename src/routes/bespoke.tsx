import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { phonePattern, submitLead } from "@/lib/submit-lead";
import { formatPrice } from "@/data/bouquets";

export const Route = createFileRoute("/bespoke")({
  head: () => ({
    meta: [
      { title: "Индивидуальный заказ — LUNA FLOWERS" },
      {
        name: "description",
        content:
          "Индивидуальный флористический дизайн LUNA FLOWERS: свадьбы, мероприятия и корпоративные проекты. Отвечаем в течение двух часов.",
      },
      { property: "og:title", content: "Индивидуальный заказ — LUNA FLOWERS" },
      {
        property: "og:description",
        content: "Букет, которого больше нет ни у кого — авторский дизайн под ваш случай.",
      },
    ],
  }),
  component: Bespoke,
});

const occasions = ["Свадьба", "Мероприятие", "Корпоративный проект", "Личный повод"];

function Bespoke() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState(30000);
  const [wishes, setWishes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; occasion?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next: { name?: string; phone?: string; occasion?: string } = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (!phonePattern.test(phone.trim())) next.phone = "Телефон в формате +7 900 000 00 00";
    if (!occasion) next.occasion = "Выберите повод";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        occasion,
        budget: `до ${formatPrice(budget)}`,
        wishes: wishes.trim(),
        source: "bespoke",
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-40 lg:px-12 lg:pt-48">
      <div className="grid gap-20 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Индивидуальный заказ</p>
          <h1 className="mt-6 text-5xl leading-[1.15] sm:text-6xl">
            Букет, которого больше нет ни у кого
          </h1>
          <p className="mt-10 max-w-md text-base leading-[1.9] text-foreground/80">
            Индивидуальный флористический дизайн — это работа с вашей историей, а не выбор из
            каталога. Мы обсуждаем повод, характер человека, интерьер площадки и палитру, затем
            собираем эскиз и подбираем сорта под сезон.
          </p>
          <p className="mt-6 max-w-md text-base leading-[1.9] text-foreground/80">
            Так мы делаем свадебное оформление, декор мероприятий, подарки партнёрам и подарки,
            которые невозможно повторить.
          </p>
        </Reveal>

        <Reveal delay={140}>
          {status === "sent" ? (
            <div className="border border-border p-12 text-center">
              <p className="eyebrow">Заявка принята</p>
              <h2 className="mt-4 text-3xl">Спасибо</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Флорист свяжется с вами в течение двух часов и предложит время для разговора.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-10 border border-border p-8 sm:p-12">
              <div>
                <label htmlFor="bs-name" className="eyebrow block">
                  Имя
                </label>
                <input
                  id="bs-name"
                  className="field-input mt-2"
                  value={name}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                />
                {errors.name ? <p className="mt-2 text-xs text-destructive">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="bs-phone" className="eyebrow block">
                  Телефон
                </label>
                <input
                  id="bs-phone"
                  className="field-input mt-2"
                  value={phone}
                  inputMode="tel"
                  autoComplete="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 900 000 00 00"
                />
                {errors.phone ? (
                  <p className="mt-2 text-xs text-destructive">{errors.phone}</p>
                ) : null}
              </div>

              <fieldset>
                <legend className="eyebrow">Повод</legend>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                  {occasions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setOccasion(item)}
                      className={`text-sm transition-colors ${
                        occasion === item ? "text-gold" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {errors.occasion ? (
                  <p className="mt-2 text-xs text-destructive">{errors.occasion}</p>
                ) : null}
              </fieldset>

              <div>
                <label htmlFor="bs-budget" className="eyebrow block">
                  Бюджет — до {formatPrice(budget)}
                </label>
                <input
                  id="bs-budget"
                  type="range"
                  min={10000}
                  max={300000}
                  step={5000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="mt-5 w-full accent-[var(--color-gold)]"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>10 000 ₽</span>
                  <span>300 000 ₽</span>
                </div>
              </div>

              <div>
                <label htmlFor="bs-wishes" className="eyebrow block">
                  Пожелания
                </label>
                <textarea
                  id="bs-wishes"
                  rows={4}
                  className="field-input mt-2 resize-none"
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Дата, площадка, палитра, что важно передать"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button type="submit" className="btn-gold" disabled={status === "sending"}>
                  {status === "sending" ? "Отправляем" : "Отправить заявку"}
                </button>
                <p className="text-xs text-muted-foreground">
                  Мы свяжемся с вами в течение 2 часов
                </p>
              </div>

              {status === "error" ? (
                <p className="text-xs text-destructive">
                  Не удалось отправить. Позвоните нам: +7 495 000 00 00
                </p>
              ) : null}
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}
