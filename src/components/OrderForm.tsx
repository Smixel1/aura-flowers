import { useState, type FormEvent } from "react";
import { occasionLabels, type Occasion } from "@/data/bouquets";
import { formatTelegram, phonePattern, submitLead, type LeadSource } from "@/lib/submit-lead";

export type OrderPrefill = {
  bouquet?: string;
  occasion?: string;
  budget?: string;
  composition?: string;
  estimatedPrice?: string;
  quantity?: number;
  total?: number;
  source: LeadSource;
};

const budgetOptions = ["до 3 000 ₽", "3 000 — 5 000 ₽", "5 000 — 10 000 ₽", "10 000+ ₽"];

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
  const fromConstructor = prefill.source === "bespoke";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [occasion, setOccasion] = useState(prefill.occasion ?? "");
  const [budget, setBudget] = useState(prefill.budget ?? "");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; occasion?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next: { name?: string; phone?: string; occasion?: string } = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (!phonePattern.test(phone.trim())) next.phone = "Телефон в формате +7 900 000 00 00";
    if (!fromConstructor && !occasion.trim()) next.occasion = "Выберите повод";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const clientComment = comment.trim();
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        comment: clientComment || undefined,
        occasion: occasion || undefined,
        budget: budget || prefill.estimatedPrice,
        bouquet: fromConstructor && prefill.composition ? prefill.composition : prefill.bouquet,
        composition: prefill.composition,
        estimatedPrice: prefill.estimatedPrice,
        quantity: prefill.quantity ?? 1,
        total: prefill.total,
        telegram: formatTelegram(telegram),
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
        <p className="eyebrow">{fromConstructor ? "Оставить заявку" : title}</p>
        {prefill.bouquet ? <p className="mt-3 font-display text-2xl">{prefill.bouquet}</p> : null}
        {prefill.composition ? (
          <div className="mt-4 space-y-2 border-l border-bloom/40 pl-4">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Состав</p>
            <p className="text-sm leading-relaxed text-foreground/80">{prefill.composition}</p>
            {prefill.estimatedPrice ? (
              <p className="text-sm text-gold">≈ {prefill.estimatedPrice}</p>
            ) : null}
          </div>
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

      <div>
        <label htmlFor="of-telegram" className="eyebrow block">
          Telegram
        </label>
        <input
          id="of-telegram"
          className="field-input mt-2"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          autoComplete="off"
          placeholder="@username"
        />
        <p className="mt-2 text-xs text-muted-foreground">Необязательно · Например: @ivan_ivanov</p>
      </div>

      {!fromConstructor ? (
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
                    : "text-muted-foreground hover:text-bloom"
                }`}
              >
                {occasionLabels[key]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setOccasion("Другое")}
              className={`text-sm transition-colors ${
                occasion === "Другое" ? "text-gold" : "text-muted-foreground hover:text-bloom"
              }`}
            >
              Другое
            </button>
          </div>
          {errors.occasion ? (
            <p className="mt-2 text-xs text-destructive">{errors.occasion}</p>
          ) : null}
        </fieldset>
      ) : null}

      {!fromConstructor ? (
        <fieldset>
          <legend className="eyebrow">Бюджет</legend>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            {budgetOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBudget(option)}
                className={`text-sm transition-colors ${
                  budget === option ? "text-gold" : "text-muted-foreground hover:text-bloom"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div>
        <label htmlFor="of-comment" className="eyebrow block">
          Комментарий
        </label>
        <textarea
          id="of-comment"
          rows={3}
          className="field-input mt-2 resize-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            fromConstructor
              ? "Удобное время для звонка, адрес доставки"
              : "Кому, что важно передать, любимые цветы"
          }
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
