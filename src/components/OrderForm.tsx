import { useState, type FormEvent } from "react";
import { occasionLabels, type Occasion } from "@/data/bouquets";
import { phonePattern, submitLead, type LeadSource } from "@/lib/submit-lead";

export type OrderPrefill = {
  bouquet?: string;
  occasion?: string;
  budget?: string;
  wishes?: string;
  source: LeadSource;
};

const budgetOptions = ["до 9 000 ₽", "9 000 — 14 000 ₽", "14 000 — 25 000 ₽", "от 25 000 ₽"];

export function OrderForm({
  prefill,
  title = "Оформление заказа",
  note = "Мы свяжемся с вами в течение 2 часов",
  onDone,
}: {
  prefill: OrderPrefill;
  title?: string;
  note?: string;
  onDone?: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(prefill.occasion ?? "");
  const [budget, setBudget] = useState(prefill.budget ?? "");
  const [wishes, setWishes] = useState(prefill.wishes ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (!phonePattern.test(phone.trim())) next.phone = "Телефон в формате +7 900 000 00 00";
    if (!occasion.trim()) next.occasion = "Выберите повод";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        occasion,
        budget,
        wishes: wishes.trim(),
        bouquet: prefill.bouquet,
        source: prefill.source,
      });
      setStatus("sent");
      onDone?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-10 text-center">
        <p className="eyebrow">Заявка принята</p>
        <h3 className="mt-4 text-3xl">Спасибо, {name.split(" ")[0]}</h3>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Флорист свяжется с вами в течение двух часов и уточнит детали.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div>
        <p className="eyebrow">{title}</p>
        {prefill.bouquet ? (
          <p className="mt-3 font-display text-2xl">{prefill.bouquet}</p>
        ) : null}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="of-name" className="eyebrow block">
            Имя
          </label>
          <input
            id="of-name"
            className="field-input mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Как к вам обращаться"
          />
          {errors.name ? <p className="mt-2 text-xs text-destructive">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="of-phone" className="eyebrow block">
            Телефон
          </label>
          <input
            id="of-phone"
            className="field-input mt-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 900 000 00 00"
          />
          {errors.phone ? <p className="mt-2 text-xs text-destructive">{errors.phone}</p> : null}
        </div>
      </div>

      <fieldset>
        <legend className="eyebrow">Повод</legend>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          {(Object.keys(occasionLabels) as Occasion[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setOccasion(occasionLabels[key])}
              className={`text-sm transition-colors ${
                occasion === occasionLabels[key]
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {occasionLabels[key]}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOccasion("Другое")}
            className={`text-sm transition-colors ${
              occasion === "Другое" ? "text-gold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Другое
          </button>
        </div>
        {errors.occasion ? <p className="mt-2 text-xs text-destructive">{errors.occasion}</p> : null}
      </fieldset>

      <fieldset>
        <legend className="eyebrow">Бюджет</legend>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          {budgetOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBudget(option)}
              className={`text-sm transition-colors ${
                budget === option ? "text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="of-wishes" className="eyebrow block">
          Пожелания
        </label>
        <textarea
          id="of-wishes"
          rows={3}
          className="field-input mt-2 resize-none"
          value={wishes}
          onChange={(e) => setWishes(e.target.value)}
          placeholder="Кому, что важно передать, любимые цветы"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn-gold" disabled={status === "sending"}>
          {status === "sending" ? "Отправляем" : "Отправить заявку"}
        </button>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>

      {status === "error" ? (
        <p className="text-xs text-destructive">
          Что-то пошло не так. Позвоните нам: +7 495 000 00 00
        </p>
      ) : null}
    </form>
  );
}
