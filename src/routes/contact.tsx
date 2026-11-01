import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { formatTelegram, phonePattern, submitLead } from "@/lib/submit-lead";
import { buildPageMeta } from "@/lib/seo-meta";
import { HoneypotField } from "@/components/HoneypotField";
import { FIELD_LIMITS, isBotSubmission } from "@/lib/form-guards";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...buildPageMeta({
      title: "Контакты — LUNA FLOWERS",
      description: "Связаться с LUNA FLOWERS: оставьте заявку, и мы ответим по телефону.",
      ogDescription: "Оставьте заявку, и мы свяжемся с вами.",
      path: "/contact",
    }),
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (!phonePattern.test(phone.trim())) next.phone = "Телефон в формате +7 900 000 00 00";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (isBotSubmission(honeypot)) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        telegram: formatTelegram(telegram),
        comment: message.trim() || undefined,
        source: "contact",
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pb-32 pt-40 lg:pt-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow">Контакты</p>
          <h1 className="mt-6 text-5xl leading-tight sm:text-6xl">Связаться с нами</h1>
        </Reveal>

        <div className="mt-20 grid gap-20 lg:grid-cols-2">
          <Reveal className="space-y-6">
            <p className="eyebrow">Связь</p>
            <h2 className="text-3xl">Расскажите о вашем заказе</h2>
            <p className="max-w-md text-muted-foreground">
              Заполните форму, и мы свяжемся с вами по указанному номеру.
            </p>
          </Reveal>

          <Reveal delay={140}>
            {status === "sent" ? (
              <div className="border border-border p-12 text-center">
                <p className="eyebrow">Сообщение отправлено</p>
                <h2 className="mt-4 text-3xl">Спасибо</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Мы свяжемся с вами после получения заявки.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative space-y-10 border border-border p-8 sm:p-12"
              >
                <HoneypotField id="ct-honeypot" value={honeypot} onChange={setHoneypot} />
                <p className="eyebrow">Быстрая связь</p>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ct-name" className="eyebrow block">
                      Имя
                    </label>
                    <input
                      id="ct-name"
                      className="field-input mt-2"
                      value={name}
                      maxLength={FIELD_LIMITS.name}
                      autoComplete="name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться"
                    />
                    {errors.name ? (
                      <p className="mt-2 text-xs text-destructive">{errors.name}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="ct-phone" className="eyebrow block">
                      Телефон
                    </label>
                    <input
                      id="ct-phone"
                      className="field-input mt-2"
                      value={phone}
                      maxLength={FIELD_LIMITS.phone}
                      inputMode="tel"
                      autoComplete="tel"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 900 000 00 00"
                    />
                    {errors.phone ? (
                      <p className="mt-2 text-xs text-destructive">{errors.phone}</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label htmlFor="ct-telegram" className="eyebrow block">
                    Telegram
                  </label>
                  <input
                    id="ct-telegram"
                    className="field-input mt-2"
                    value={telegram}
                    maxLength={FIELD_LIMITS.telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    autoComplete="off"
                    placeholder="@username"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Необязательно · Например: @ivan_ivanov
                  </p>
                </div>
                <div>
                  <label htmlFor="ct-message" className="eyebrow block">
                    Сообщение
                  </label>
                  <textarea
                    id="ct-message"
                    rows={4}
                    className="field-input mt-2 resize-none"
                    value={message}
                    maxLength={FIELD_LIMITS.message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Чем можем помочь"
                  />
                </div>
                <button type="submit" className="btn-gold" disabled={status === "sending"}>
                  {status === "sending" ? "Отправляем" : "Отправить"}
                </button>
                {status === "error" ? (
                  <p className="text-xs text-destructive">
                    Не удалось отправить заявку. Попробуйте ещё раз позже.
                  </p>
                ) : null}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
