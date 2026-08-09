import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useSiteUi } from "@/components/SiteUiProvider";
import {
  bouquets,
  budgetRanges,
  colorLabels,
  formatPrice,
  occasionLabels,
  recipientLabels,
  type Bouquet,
  type ColorTag,
  type Occasion,
  type Recipient,
} from "@/data/bouquets";
import { cn } from "@/lib/utils";

type Answers = {
  recipient?: Recipient;
  occasion?: Occasion;
  color?: ColorTag;
  budget?: string;
  size?: "small" | "medium" | "large";
};

type Step = {
  key: keyof Answers;
  question: string;
  options: { label: string; value: string }[];
};

const steps: Step[] = [
  {
    key: "recipient",
    question: "Здравствуйте. Помогу подобрать букет. Кому он предназначен?",
    options: (Object.keys(recipientLabels) as Recipient[]).map((id) => ({
      label: recipientLabels[id],
      value: id,
    })),
  },
  {
    key: "occasion",
    question: "Хорошо. Какой повод?",
    options: (Object.keys(occasionLabels) as Occasion[]).map((id) => ({
      label: occasionLabels[id],
      value: id,
    })),
  },
  {
    key: "color",
    question: "Есть предпочтения по цвету?",
    options: [
      ...(Object.keys(colorLabels) as ColorTag[]).map((id) => ({
        label: colorLabels[id],
        value: id,
      })),
      { label: "Доверяю флористу", value: "any" },
    ],
  },
  {
    key: "budget",
    question: "На какой бюджет ориентируемся?",
    options: budgetRanges.map((r) => ({ label: r.label, value: r.id })),
  },
  {
    key: "size",
    question: "И последнее: какой размер букета вам ближе?",
    options: [
      { label: "Компактный", value: "small" },
      { label: "Средний", value: "medium" },
      { label: "Большой", value: "large" },
    ],
  },
];

type Message =
  | { id: string; role: "assistant" | "user"; text: string }
  | { id: string; role: "suggestions"; items: { bouquet: Bouquet; reason: string }[] };

function budgetScore(price: number, budgetId?: string) {
  if (!budgetId) return 1;
  const range = budgetRanges.find((r) => r.id === budgetId);
  if (!range) return 1;
  if (price >= range.min && price < range.max) return 3;
  const distance = price < range.min ? range.min - price : price - range.max;
  return distance < 2500 ? 1.5 : 0;
}

function sizeScore(price: number, size?: Answers["size"]) {
  if (!size) return 0;
  if (size === "small") return price <= 4000 ? 1 : 0;
  if (size === "medium") return price > 3000 && price <= 12000 ? 1 : 0;
  return price > 9000 ? 1 : 0;
}

function recommend(answers: Answers) {
  const scored = bouquets.map((bouquet) => {
    let score = budgetScore(bouquet.price, answers.budget);
    if (answers.recipient && bouquet.recipients.includes(answers.recipient)) score += 2;
    if (answers.occasion && bouquet.occasions.includes(answers.occasion)) score += 2;
    if (answers.color && answers.color !== ("any" as ColorTag)) {
      if (bouquet.color === answers.color) score += 2;
      else if (bouquet.color === "mix") score += 0.5;
    }
    score += sizeScore(bouquet.price, answers.size);
    return { bouquet, score };
  });

  return scored
    .sort((a, b) => b.score - a.score || a.bouquet.price - b.bouquet.price)
    .slice(0, 3)
    .map(({ bouquet }) => ({ bouquet, reason: buildReason(bouquet, answers) }));
}

function buildReason(bouquet: Bouquet, answers: Answers) {
  const parts: string[] = [];
  if (answers.occasion && bouquet.occasions.includes(answers.occasion))
    parts.push(`уместен на повод «${occasionLabels[answers.occasion].toLowerCase()}»`);
  if (answers.recipient && bouquet.recipients.includes(answers.recipient))
    parts.push(`подходит по адресату (${recipientLabels[answers.recipient].toLowerCase()})`);
  if (answers.color && answers.color !== ("any" as ColorTag) && bouquet.color === answers.color)
    parts.push("держит выбранную вами гамму");
  if (!parts.length) parts.push("уверенный выбор в вашем бюджете");
  return `${bouquet.tagline}. ${parts.join(", ")}.`;
}

export function AIChatWidget() {
  const { chatOpen, openChat, closeChat, openOrder } = useSiteUi();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [messages, setMessages] = useState<Message[]>([
    { id: "m0", role: "assistant", text: steps[0]!.question },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentStep = stepIndex < steps.length ? steps[stepIndex] : undefined;

  useEffect(() => {
    if (!chatOpen) return;
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, chatOpen]);

  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [chatOpen, closeChat]);

  function answer(value: string, label: string) {
    if (!currentStep) return;
    const nextAnswers = { ...answers, [currentStep.key]: value } as Answers;
    const nextIndex = stepIndex + 1;
    const nextStep = steps[nextIndex];

    setAnswers(nextAnswers);
    setStepIndex(nextIndex);
    setMessages((prev) => [...prev, { id: `u${prev.length}`, role: "user", text: label }]);

    window.setTimeout(() => {
      setMessages((prev) =>
        nextStep
          ? [...prev, { id: `a${prev.length}`, role: "assistant", text: nextStep.question }]
          : [
              ...prev,
              {
                id: `a${prev.length}`,
                role: "assistant",
                text: "Спасибо. Вот три композиции, которые я бы предложила для этого случая.",
              },
              { id: `s${prev.length + 1}`, role: "suggestions", items: recommend(nextAnswers) },
            ],
      );
    }, 500);
  }

  function reset() {
    setAnswers({});
    setStepIndex(0);
    setMessages([{ id: "m0", role: "assistant", text: steps[0]!.question }]);
  }

  return (
    <>
      {!chatOpen ? (
        <button
          type="button"
          onClick={openChat}
          aria-label="Не знаете, что выбрать? Открыть подбор букета"
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full border border-gold bg-background px-4 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-gold shadow-lg transition-colors duration-500 hover:bg-gold hover:text-ink sm:bottom-6 sm:right-6"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="2.4" />
            <ellipse cx="12" cy="6.6" rx="2.4" ry="3.6" />
            <ellipse cx="12" cy="17.4" rx="2.4" ry="3.6" />
            <ellipse cx="6.6" cy="12" rx="3.6" ry="2.4" />
            <ellipse cx="17.4" cy="12" rx="3.6" ry="2.4" />
          </svg>
          <span className="hidden sm:inline">Не знаете, что выбрать?</span>
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
            aria-label="Подбор букета"
            className="absolute inset-0 flex flex-col bg-background animate-in slide-in-from-bottom duration-500 sm:pointer-events-auto sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[420px] sm:border-l sm:border-border sm:slide-in-from-right"
          >
            <div className="flex items-start justify-between border-b border-border px-6 py-5">
              <div className="min-w-0">
                <p className="eyebrow">Флорист-консультант</p>
                <p className="mt-2 font-display text-xl">Не знаете, что выбрать?</p>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Закрыть чат"
                className="shrink-0 p-1 text-muted-foreground transition-colors hover:text-gold"
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
                            <span className="shrink-0 text-sm">{formatPrice(bouquet.price)}</span>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">{reason}</p>
                          <button
                            type="button"
                            className="btn-gold w-full !py-3"
                            onClick={() =>
                              openOrder({
                                bouquet: bouquet.name,
                                occasion: answers.occasion
                                  ? occasionLabels[answers.occasion]
                                  : "",
                                budget:
                                  budgetRanges.find((r) => r.id === answers.budget)?.label ?? "",
                                wishes: [
                                  answers.recipient ? recipientLabels[answers.recipient] : null,
                                  answers.color && answers.color !== ("any" as ColorTag)
                                    ? `гамма: ${colorLabels[answers.color]}`
                                    : null,
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

            <div className="border-t border-border px-6 py-5">
              {currentStep ? (
                <div className="flex flex-wrap gap-2">
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
              ) : (
                <button
                  type="button"
                  className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground"
                  onClick={reset}
                >
                  Начать подбор заново
                </button>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
