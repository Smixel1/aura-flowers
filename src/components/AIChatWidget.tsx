import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { useSiteUi } from "@/components/SiteUiProvider";
import { bouquets, formatPrice, type Bouquet, type Palette } from "@/data/bouquets";
import { cn } from "@/lib/utils";

type Answers = {
  recipient?: string;
  age?: string;
  preferences?: string;
  budget?: string;
  context?: string;
  palette?: Palette;
};

type Step = {
  key: keyof Answers;
  question: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
};

const steps: Step[] = [
  {
    key: "recipient",
    question:
      "Здравствуйте. Я помогу подобрать букет. Расскажите, для кого он и по какому поводу?",
    placeholder: "Например: девушке на день рождения",
  },
  {
    key: "age",
    question: "Спасибо. Подскажите возраст получателя — мне это поможет с характером букета.",
    options: [
      { label: "до 25", value: "до 25 лет" },
      { label: "25–35", value: "25–35 лет" },
      { label: "35–50", value: "35–50 лет" },
      { label: "старше 50", value: "старше 50 лет" },
    ],
  },
  {
    key: "preferences",
    question: "Есть ли любимые цветы или те, которых лучше избегать?",
    options: [
      { label: "Розы", value: "любит розы" },
      { label: "Пионы", value: "любит пионы" },
      { label: "Тюльпаны", value: "любит тюльпаны" },
      { label: "Не знаю", value: "предпочтения неизвестны" },
    ],
    placeholder: "Можно написать своими словами",
  },
  {
    key: "budget",
    question: "На какой бюджет ориентируемся?",
    options: [
      { label: "до 9 000 ₽", value: "до 9 000 ₽" },
      { label: "9 000 — 14 000 ₽", value: "9 000 — 14 000 ₽" },
      { label: "от 14 000 ₽", value: "от 14 000 ₽" },
    ],
  },
  {
    key: "context",
    question: "И ещё один штрих: это первый подарок или вы дарите цветы регулярно?",
    options: [
      { label: "Дарю впервые", value: "дарит впервые" },
      { label: "Дарю регулярно", value: "дарит регулярно" },
    ],
  },
  {
    key: "palette",
    question: "Последнее. Какая гамма ближе?",
    options: [
      { label: "Тёплая", value: "warm" },
      { label: "Холодная", value: "cool" },
      { label: "Нейтральная", value: "neutral" },
    ],
  },
];

type Message =
  | { id: string; role: "assistant" | "user"; text: string }
  | { id: string; role: "suggestions"; items: { bouquet: Bouquet; reason: string }[] };

function budgetFit(price: number, budget?: string) {
  if (budget === "до 9 000 ₽") return price <= 9000 ? 2 : price <= 12000 ? 1 : 0;
  if (budget === "9 000 — 14 000 ₽") return price > 8000 && price <= 14500 ? 2 : 1;
  if (budget === "от 14 000 ₽") return price >= 13000 ? 2 : 1;
  return 1;
}

function recommend(answers: Answers) {
  const scored = bouquets.map((bouquet) => {
    let score = budgetFit(bouquet.price, answers.budget);
    if (answers.palette && bouquet.palette === answers.palette) score += 2;
    const prefs = (answers.preferences ?? "").toLowerCase();
    const text = `${bouquet.composition.join(" ")} ${bouquet.description}`.toLowerCase();
    if (prefs.includes("роз") && text.includes("роз")) score += 1.5;
    if (prefs.includes("пион") && text.includes("пион")) score += 1.5;
    if (prefs.includes("тюльпан") && text.includes("тюльпан")) score += 1.5;
    const recipient = (answers.recipient ?? "").toLowerCase();
    if (recipient.includes("свадьб") && bouquet.occasions.includes("wedding")) score += 2;
    if (recipient.includes("день рожд") && bouquet.occasions.includes("birthday")) score += 1.5;
    if (
      (recipient.includes("партнёр") || recipient.includes("коллег") || recipient.includes("офис")) &&
      bouquet.occasions.includes("corporate")
    )
      score += 2;
    return { bouquet, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ bouquet }) => ({
      bouquet,
      reason: buildReason(bouquet, answers),
    }));
}

function buildReason(bouquet: Bouquet, answers: Answers) {
  const parts: string[] = [];
  if (answers.palette === bouquet.palette) parts.push("держит выбранную вами гамму");
  if (answers.context === "дарит впервые") parts.push("выглядит внимательно, но без давления");
  if (answers.context === "дарит регулярно") parts.push("узнаваемо, но с новым характером");
  if (answers.age?.startsWith("до 25")) parts.push("лёгкий по настроению");
  if (answers.age === "старше 50 лет") parts.push("сдержанный и благородный");
  if (!parts.length) parts.push("уверенный выбор для этого повода");
  return `${bouquet.tagline}. Подойдёт: ${parts.join(", ")}.`;
}

export function AIChatWidget() {
  const { chatOpen, openChat, closeChat, openOrder } = useSiteUi();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [messages, setMessages] = useState<Message[]>([
    { id: "m0", role: "assistant", text: steps[0]!.question },
  ]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentStep = stepIndex < steps.length ? steps[stepIndex] : undefined;
  const finished = stepIndex >= steps.length;

  useEffect(() => {
    if (!chatOpen) return;
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
    if (!finished) inputRef.current?.focus();
  }, [messages, chatOpen, finished]);

  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [chatOpen, closeChat]);

  function answer(value: string, label?: string) {
    if (!currentStep) return;
    const nextAnswers = { ...answers, [currentStep.key]: value } as Answers;
    const nextIndex = stepIndex + 1;
    const nextStep = steps[nextIndex];

    setAnswers(nextAnswers);
    setStepIndex(nextIndex);
    setDraft("");
    setMessages((prev) => [
      ...prev,
      { id: `u${prev.length}`, role: "user", text: label ?? value },
    ]);

    window.setTimeout(() => {
      setMessages((prev) =>
        nextStep
          ? [...prev, { id: `a${prev.length}`, role: "assistant", text: nextStep.question }]
          : [
              ...prev,
              {
                id: `a${prev.length}`,
                role: "assistant",
                text: "Спасибо. Вот композиции, которые я бы предложила именно для этого случая.",
              },
              { id: `s${prev.length + 1}`, role: "suggestions", items: recommend(nextAnswers) },
            ],
      );
    }, 550);
  }

  const suggestionsAnswers = useMemo(() => answers, [answers]);

  return (
    <>
      {!chatOpen ? (
        <button
          type="button"
          onClick={openChat}
          aria-label="Открыть AI-флориста"
          className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-background text-gold shadow-lg transition-all duration-500 hover:bg-gold hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="2.4" />
            <ellipse cx="12" cy="6.6" rx="2.4" ry="3.6" />
            <ellipse cx="12" cy="17.4" rx="2.4" ry="3.6" />
            <ellipse cx="6.6" cy="12" rx="3.6" ry="2.4" />
            <ellipse cx="17.4" cy="12" rx="3.6" ry="2.4" />
          </svg>
        </button>
      ) : null}

      {chatOpen ? (
        <div className="fixed inset-0 z-[65] sm:pointer-events-none">
          <button
            type="button"
            aria-label="Закрыть чат"
            onClick={closeChat}
            className="absolute inset-0 hidden cursor-default bg-ink/40 sm:pointer-events-auto sm:block"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="AI-флорист"
            className="absolute inset-0 flex flex-col bg-background animate-in slide-in-from-bottom duration-500 sm:pointer-events-auto sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[420px] sm:border-l sm:border-border sm:slide-in-from-right"
          >
            <div className="flex items-start justify-between border-b border-border px-6 py-5">
              <div>
                <p className="eyebrow">AI-флорист</p>
                <p className="mt-2 font-display text-xl">Подбор букета</p>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Закрыть чат"
                className="p-1 text-muted-foreground transition-colors hover:text-gold"
              >
                <X className="h-5 w-5" strokeWidth={1} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {messages.map((message) =>
                message.role === "suggestions" ? (
                  <div key={message.id} className="space-y-5">
                    {message.items.map(({ bouquet, reason }) => (
                      <div key={bouquet.id} className="border border-border">
                        <img
                          src={bouquet.image}
                          alt={bouquet.alt}
                          width={1024}
                          height={1280}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <div className="space-y-3 p-4">
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="font-display text-xl">{bouquet.name}</p>
                            <span className="text-sm">{formatPrice(bouquet.price)}</span>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">{reason}</p>
                          <button
                            type="button"
                            className="btn-gold w-full !py-3"
                            onClick={() =>
                              openOrder({
                                bouquet: bouquet.name,
                                occasion: suggestionsAnswers.recipient ?? "",
                                budget: suggestionsAnswers.budget ?? "",
                                wishes: [
                                  suggestionsAnswers.recipient,
                                  suggestionsAnswers.age,
                                  suggestionsAnswers.preferences,
                                  suggestionsAnswers.context,
                                ]
                                  .filter(Boolean)
                                  .join(", "),
                                source: "ai",
                              })
                            }
                          >
                            Заказать этот букет
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    key={message.id}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <p
                      className={cn(
                        "max-w-[85%] text-sm leading-relaxed",
                        message.role === "user"
                          ? "bg-ink px-4 py-3 text-ink-foreground"
                          : "text-foreground/85",
                      )}
                    >
                      {message.text}
                    </p>
                  </div>
                ),
              )}
            </div>

            {currentStep ? (
              <div className="border-t border-border px-6 py-5">
                {currentStep.options ? (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {currentStep.options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => answer(option.value, option.label)}
                        className="border border-border px-3 py-2 text-xs text-foreground/80 transition-colors hover:border-gold hover:text-gold"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : null}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (draft.trim()) answer(draft.trim());
                  }}
                  className="flex items-center gap-3"
                >
                  <label htmlFor="chat-input" className="sr-only">
                    Ваш ответ
                  </label>
                  <input
                    id="chat-input"
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={currentStep.placeholder ?? "Напишите ответ"}
                    className="field-input"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    className="text-[0.7rem] uppercase tracking-[0.2em] text-gold disabled:opacity-40"
                  >
                    Ответить
                  </button>
                </form>
              </div>
            ) : (
              <div className="border-t border-border px-6 py-5">
                <button
                  type="button"
                  className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground"
                  onClick={() => {
                    setAnswers({});
                    setStepIndex(0);
                    setMessages([{ id: "m0", role: "assistant", text: steps[0]!.question }]);
                  }}
                >
                  Начать подбор заново
                </button>
              </div>
            )}
          </aside>
        </div>
      ) : null}
    </>
  );
}
