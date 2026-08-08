import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Анна",
    occasion: "Годовщина",
    text: "Муж заказал букет вслепую, а получилось точнее, чем если бы я выбирала сама. Стоял две недели и не рассыпался.",
  },
  {
    name: "Дмитрий",
    occasion: "Извинение",
    text: "Написал флористу три слова о ситуации. Мне собрали композицию, после которой разговор начался иначе.",
  },
  {
    name: "Мария",
    occasion: "День рождения мамы",
    text: "Просила «что-то спокойное, без пафоса». Получила именно то настроение, которое имела в виду.",
  },
  {
    name: "Илья",
    occasion: "Свадьба",
    text: "Вели нас от первой встречи до утра церемонии. Ни одного вопроса в день свадьбы — всё было сделано.",
  },
  {
    name: "Ксения",
    occasion: "Просто так",
    text: "Заказала себе. Это оказалось лучшим решением недели, а упаковка до сих пор лежит как открытка.",
  },
];

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const active = testimonials[index]!;

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div key={index} className="animate-in fade-in duration-700">
        <p className="eyebrow">{active.occasion}</p>
        <blockquote className="mt-8 font-display text-2xl leading-[1.5] sm:text-3xl">
          «{active.text}»
        </blockquote>
        <p className="mt-8 text-sm text-muted-foreground">{active.name}</p>
      </div>

      <div className="mt-12 flex items-center justify-center gap-3">
        {testimonials.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Отзыв ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-px w-10 transition-colors duration-500 ${
              i === index ? "bg-gold" : "bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
