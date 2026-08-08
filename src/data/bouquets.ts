import bouquet1 from "@/assets/bouquet-1.jpg";
import bouquet2 from "@/assets/bouquet-2.jpg";
import bouquet3 from "@/assets/bouquet-3.jpg";
import bouquet4 from "@/assets/bouquet-4.jpg";
import bouquet5 from "@/assets/bouquet-5.jpg";
import bouquet6 from "@/assets/bouquet-6.jpg";

export type Occasion = "date" | "wedding" | "birthday" | "corporate";
export type Palette = "warm" | "cool" | "neutral";

export const occasionLabels: Record<Occasion, string> = {
  date: "Свидание",
  wedding: "Свадьба",
  birthday: "День рождения",
  corporate: "Корпоратив",
};

export const paletteLabels: Record<Palette, string> = {
  warm: "Тёплая",
  cool: "Холодная",
  neutral: "Нейтральная",
};

export type Bouquet = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  composition: string[];
  sizes: string[];
  price: number;
  image: string;
  alt: string;
  occasions: Occasion[];
  palette: Palette;
};

export const bouquets: Bouquet[] = [
  {
    id: "warm-whisper",
    name: "Тёплый шёпот",
    tagline: "Свет позднего августа, собранный в руках",
    description:
      "Мягкая композиция в персиковых полутонах — для слов, которые говорят негромко. Сухие травы придают букету характер и живут в интерьере месяцами.",
    composition: ["Пионовидная роза Shimmer", "Ранункулюс абрикосовый", "Сухие злаки", "Скабиоза"],
    sizes: ["S — 35 см", "M — 45 см", "L — 60 см"],
    price: 8900,
    image: bouquet1,
    alt: "Букет из персиковых роз, абрикосового ранункулюса и сухих трав на кремовом фоне",
    occasions: ["date", "birthday"],
    palette: "warm",
  },
  {
    id: "midnight-garden",
    name: "Полночный сад",
    tagline: "Разговор, который начинается после заката",
    description:
      "Глубокие бордовые и сливовые тона, тёмная зелень. Букет для тех, кто предпочитает сдержанность и драму вместо очевидной нежности.",
    composition: ["Роза Black Baccara", "Тюльпан махровый бордовый", "Астранция", "Эвкалипт бэби блю"],
    sizes: ["M — 45 см", "L — 60 см"],
    price: 12400,
    image: bouquet2,
    alt: "Тёмный букет из бордовых и сливовых цветов на графитовом фоне",
    occasions: ["date", "corporate"],
    palette: "cool",
  },
  {
    id: "first-light",
    name: "Первый свет",
    tagline: "Тишина утра перед важным днём",
    description:
      "Полностью белая композиция с шёлковой лентой. Классика для свадьбы и для моментов, где важна чистота высказывания.",
    composition: ["Пион белый", "Ландыш", "Эустома", "Рускус"],
    sizes: ["S — 30 см", "M — 40 см"],
    price: 15600,
    image: bouquet3,
    alt: "Белый свадебный букет из пионов и ландышей с шёлковой лентой",
    occasions: ["wedding", "birthday"],
    palette: "neutral",
  },
  {
    id: "soft-morning",
    name: "Раннее утро",
    tagline: "Нежность без сентиментальности",
    description:
      "Розовые тюльпаны, гортензия и лаванда в тёплой крафт-упаковке. Букет, который легко дарить — и легко принимать.",
    composition: ["Тюльпан пионовидный", "Гортензия", "Лаванда", "Душистый горошек"],
    sizes: ["S — 35 см", "M — 45 см", "L — 55 см"],
    price: 7400,
    image: bouquet4,
    alt: "Букет из розовых тюльпанов, гортензии и лаванды в бежевой упаковке",
    occasions: ["birthday", "date"],
    palette: "warm",
  },
  {
    id: "quiet-architecture",
    name: "Тихая архитектура",
    tagline: "Линия, свет и ничего лишнего",
    description:
      "Скульптурная композиция из орхидей и ветвей в керамическом сосуде. Уместна в переговорной, в отеле и в доме, где ценят паузу.",
    composition: ["Орхидея фаленопсис", "Ветви лещины", "Аспидистра", "Керамический сосуд"],
    sizes: ["M — 55 см", "L — 75 см"],
    price: 19800,
    image: bouquet5,
    alt: "Минималистичная композиция из белых орхидей и веток в керамической вазе",
    occasions: ["corporate", "wedding"],
    palette: "neutral",
  },
  {
    id: "declaration",
    name: "Признание",
    tagline: "Когда объяснять уже поздно",
    description:
      "Красные садовые розы в чёрной бумаге. Прямое высказывание, собранное так, чтобы не выглядеть банальным.",
    composition: ["Садовая роза Explorer", "Роза Red Naomi", "Тёмная зелень", "Чёрная матовая бумага"],
    sizes: ["M — 45 см", "L — 60 см", "XL — 75 см"],
    price: 13200,
    image: bouquet6,
    alt: "Букет красных садовых роз в чёрной упаковке на бежевом фоне",
    occasions: ["date", "birthday"],
    palette: "warm",
  },
];

export const budgetRanges = [
  { id: "under-9", label: "до 9 000 ₽", min: 0, max: 9000 },
  { id: "9-14", label: "9 000 — 14 000 ₽", min: 9000, max: 14000 },
  { id: "over-14", label: "от 14 000 ₽", min: 14000, max: Infinity },
];

export const formatPrice = (value: number) => `${value.toLocaleString("ru-RU")} ₽`;
