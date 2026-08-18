import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { formatTelegram, phonePattern, submitLead } from "@/lib/submit-lead";
import { buildPageMeta } from "@/lib/seo-meta";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildPageMeta({
      title: "Контакты — LUNA FLOWERS",
      description:
        "Мастерская LUNA FLOWERS: Большая Никитская 12, ежедневно 09:00–21:00. Телефон, WhatsApp, Telegram и форма быстрой связи.",
      ogDescription: "Приходите в мастерскую или напишите — ответим в течение двух часов.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (!phonePattern.test(phone.trim())) next.phone = "Телефон в формате +7 900 000 00 00";
    setErrors(next);
    if (Object.keys(next).length) return;

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
          <h1 className="mt-6 text-5xl leading-tight sm:text-6xl">Мастерская</h1>
        </Reveal>

        <div className="mt-20 grid gap-20 lg:grid-cols-2">
          <Reveal className="space-y-12">
            <div>
              <p className="eyebrow">Адрес</p>
              <p className="mt-4 text-lg">Москва, Большая Никитская, 12</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ежедневно, 09:00 — 21:00. Самовывоз и приём заказов на месте.
              </p>
            </div>

            <div>
              <p className="eyebrow">Связь</p>
              <ul className="mt-4 space-y-2 text-lg">
                <li>
                  <a href="tel:+74950000000" className="link-underline">
                    +7 495 000 00 00
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/74950000000" className="link-underline">
                    WhatsApp
                  </a>
                  <span className="px-3 text-muted-foreground">·</span>
                  <a href="https://t.me" className="link-underline">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@lunaflowers.ru" className="link-underline">
                    hello@lunaflowers.ru
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Социальные сети</p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <a href="https://instagram.com" className="link-underline">
                  Instagram
                </a>
                <a href="https://pinterest.com" className="link-underline">
                  Pinterest
                </a>
                <a href="https://t.me" className="link-underline">
                  Telegram-канал
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            {status === "sent" ? (
              <div className="border border-border p-12 text-center">
                <p className="eyebrow">Сообщение отправлено</p>
                <h2 className="mt-4 text-3xl">Спасибо</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Мы ответим в течение двух часов.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-10 border border-border p-8 sm:p-12"
              >
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
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Чем можем помочь"
                  />
                </div>
                <button type="submit" className="btn-gold" disabled={status === "sending"}>
                  {status === "sending" ? "Отправляем" : "Отправить"}
                </button>
                {status === "error" ? (
                  <p className="text-xs text-destructive">Не удалось отправить. Позвоните нам.</p>
                ) : null}
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-28">
        <iframe
          title="Карта — мастерская LUNA FLOWERS на Большой Никитской, 12"
          src="https://www.openstreetmap.org/export/embed.html?bbox=37.5960%2C55.7520%2C37.6120%2C55.7590&layer=mapnik"
          className="h-[420px] w-full border-y border-border grayscale"
          loading="lazy"
        />
      </Reveal>
    </div>
  );
}
