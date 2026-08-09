import bouquet1 from "@/assets/bouquet-1.jpg";
import bouquet2 from "@/assets/bouquet-2.jpg";
import bouquet3 from "@/assets/bouquet-3.jpg";
import bouquet4 from "@/assets/bouquet-4.jpg";
import bouquet5 from "@/assets/bouquet-5.jpg";
import bouquet6 from "@/assets/bouquet-6.jpg";
import bouquet7 from "@/assets/bouquet-7.jpg";
import bouquet8 from "@/assets/bouquet-8.jpg";
import bouquet9 from "@/assets/bouquet-9.jpg";
import bouquet10 from "@/assets/bouquet-10.jpg";
import bouquet11 from "@/assets/bouquet-11.jpg";
import bouquet12 from "@/assets/bouquet-12.jpg";
import bouquet13 from "@/assets/bouquet-13.jpg";
import bouquet14 from "@/assets/bouquet-14.jpg";
import bouquet15 from "@/assets/bouquet-15.jpg";
import bouquet16 from "@/assets/bouquet-16.jpg";
import bouquet17 from "@/assets/bouquet-17.jpg";
import bouquet18 from "@/assets/bouquet-18.jpg";
import bouquet19 from "@/assets/bouquet-19.jpg";
import bouquet20 from "@/assets/bouquet-20.jpg";
import bouquet21 from "@/assets/bouquet-21.jpg";

export type Occasion = "date" | "birthday" | "anniversary" | "proposal" | "wedding" | "nooccasion";
export type Recipient = "love" | "mother" | "friend" | "colleague" | "man";
export type ColorTag = "white" | "pink" | "red" | "cream" | "lavender" | "mix";
export type Segment = "accessible" | "mid" | "premium";

export const occasionLabels: Record<Occasion, string> = {
  date: "Свидание",
  birthday: "День рождения",
  anniversary: "Годовщина",
  proposal: "Предложение",
  wedding: "Свадьба",
  nooccasion: "Без повода",
};

export const recipientLabels: Record<Recipient, string> = {
  love: "Любимой",
  mother: "Маме",
  friend: "Подруге",
  colleague: "Коллеге",
  man: "Мужчине",
};

export const colorLabels: Record<ColorTag, string> = {
  white: "Белый",
  pink: "Розовый",
  red: "Красный",
  cream: "Кремовый",
  lavender: "Лавандовый",
  mix: "Микс",
};

export const segmentLabels: Record<Segment, string> = {
  accessible: "Повседневные",
  mid: "Авторские",
  premium: "Премиум",
};

export type Bouquet = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  composition: string[];
  size: string;
  sizes: string[];
  price: number;
  segment: Segment;
  image: string;
  alt: string;
  occasions: Occasion[];
  recipients: Recipient[];
  color: ColorTag;
};

export const bouquets: Bouquet[] = [
  {
    id: "three-words",
    name: "Три слова",
    tagline: "Небольшой жест, который замечают",
    description:
      "Три кремовые розы в тонкой матовой плёнке. Букет для короткой встречи, извинения или просто для настроения — когда важнее внимание, а не размер.",
    composition: ["Роза кремовая — 3 шт.", "Зелень розы", "Матовая плёнка, джутовая нить"],
    size: "Высота около 40 см",
    sizes: ["3 розы", "5 роз", "7 роз"],
    price: 1500,
    segment: "accessible",
    image: bouquet19,
    alt: "Три кремовые розы в прозрачной упаковке на светлом фоне",
    occasions: ["nooccasion", "date"],
    recipients: ["love", "friend", "colleague"],
    color: "cream",
  },
  {
    id: "field-note",
    name: "Полевая записка",
    tagline: "Простая радость без повода",
    description:
      "Ромашки с полевой зеленью в крафтовой бумаге. Лёгкий букет, который хорошо смотрится и на рабочем столе, и на кухонном подоконнике.",
    composition: ["Ромашка садовая — 15 шт.", "Гипсофила", "Полевая зелень", "Крафт-бумага"],
    size: "Высота около 45 см",
    sizes: ["S — 15 стеблей", "M — 25 стеблей"],
    price: 1900,
    segment: "accessible",
    image: bouquet8,
    alt: "Букет из белых ромашек с зеленью в крафтовой бумаге",
    occasions: ["nooccasion", "birthday"],
    recipients: ["friend", "mother", "colleague"],
    color: "white",
  },
  {
    id: "provence-quiet",
    name: "Тихий Прованс",
    tagline: "Сухоцвет, который живёт месяцами",
    description:
      "Плотный сноп сушёной лаванды, перевязанный шёлковой лентой. Не требует воды и сохраняет аромат до полугода.",
    composition: ["Лаванда сушёная", "Льняная лента"],
    size: "Высота около 35 см",
    sizes: ["S — 35 см", "M — 45 см"],
    price: 1700,
    segment: "accessible",
    image: bouquet10,
    alt: "Сноп сушёной лаванды с кремовой лентой",
    occasions: ["nooccasion", "birthday"],
    recipients: ["mother", "friend", "colleague"],
    color: "lavender",
  },
  {
    id: "march-light",
    name: "Мартовский свет",
    tagline: "Первое тепло в бумажном конусе",
    description:
      "Розовые тюльпаны в кремовой бумаге — сезонный букет, который уместен и на день рождения, и просто в понедельник.",
    composition: ["Тюльпан розовый — 9 шт.", "Кремовая матовая бумага"],
    size: "Высота около 45 см",
    sizes: ["9 тюльпанов", "15 тюльпанов", "25 тюльпанов"],
    price: 2400,
    segment: "accessible",
    image: bouquet7,
    alt: "Букет из розовых тюльпанов в кремовой бумаге",
    occasions: ["birthday", "nooccasion", "date"],
    recipients: ["mother", "friend", "love"],
    color: "pink",
  },
  {
    id: "easy-monday",
    name: "Лёгкий понедельник",
    tagline: "Микс, который поднимает тон дня",
    description:
      "Альстромерия, маттиола и кустовая роза в тёплой крафтовой бумаге. Долго стоит и хорошо переносит доставку.",
    composition: ["Альстромерия", "Маттиола", "Кустовая роза розовая", "Хризантема сантини"],
    size: "Высота около 50 см",
    sizes: ["S — 45 см", "M — 55 см"],
    price: 3200,
    segment: "accessible",
    image: bouquet18,
    alt: "Микс-букет из альстромерии, маттиолы и розовых роз в крафте",
    occasions: ["birthday", "nooccasion"],
    recipients: ["friend", "mother", "colleague"],
    color: "mix",
  },
  {
    id: "cream-line",
    name: "Кремовая линия",
    tagline: "Сдержанно и всегда уместно",
    description:
      "Кустовые кремовые розы в бумаге пыльно-серого тона. Нейтральный букет для коллеги, партнёра или деловой встречи.",
    composition: ["Кустовая роза кремовая — 11 шт.", "Эвкалипт", "Серая матовая бумага"],
    size: "Высота около 45 см",
    sizes: ["S — 40 см", "M — 50 см"],
    price: 4200,
    segment: "mid",
    image: bouquet9,
    alt: "Компактный букет из кремовых кустовых роз в серой бумаге",
    occasions: ["nooccasion", "birthday", "anniversary"],
    recipients: ["colleague", "mother", "friend"],
    color: "cream",
  },
  {
    id: "white-page",
    name: "Белый лист",
    tagline: "Чистое высказывание без украшений",
    description:
      "Белая эустома с мягкой зеленью. Один из самых спокойных букетов коллекции — хорош как знак внимания и как дополнение к подарку.",
    composition: ["Эустома белая — 9 стеблей", "Фисташка", "Солидаго"],
    size: "Высота около 50 см",
    sizes: ["S — 45 см", "M — 55 см"],
    price: 4800,
    segment: "mid",
    image: bouquet14,
    alt: "Букет из белой эустомы с зеленью в бежевой бумаге",
    occasions: ["nooccasion", "birthday", "wedding"],
    recipients: ["mother", "colleague", "friend"],
    color: "white",
  },
  {
    id: "north-side",
    name: "Северная сторона",
    tagline: "Графичный букет без сладости",
    description:
      "Тёмная зелень, бруния, чертополох и несколько бордовых акцентов. Собран для мужчины — или для тех, кому не нужны пастельные тона.",
    composition: ["Бруния", "Эрингиум", "Бордовая хризантема", "Писташ", "Тёмная бумага"],
    size: "Высота около 55 см",
    sizes: ["M — 55 см", "L — 65 см"],
    price: 5600,
    segment: "mid",
    image: bouquet16,
    alt: "Графичный тёмный букет с брунией, чертополохом и бордовыми цветами",
    occasions: ["birthday", "anniversary", "nooccasion"],
    recipients: ["man", "colleague"],
    color: "mix",
  },
  {
    id: "warm-october",
    name: "Тёплый октябрь",
    tagline: "Осень, собранная в охристых тонах",
    description:
      "Оранжевые хризантемы, ранункулюс и сухие злаки. Сезонная композиция с характером — заметная, но не громкая.",
    composition: ["Хризантема оранжевая", "Ранункулюс", "Сухие злаки", "Терракотовая бумага"],
    size: "Высота около 55 см",
    sizes: ["M — 55 см", "L — 65 см"],
    price: 5200,
    segment: "mid",
    image: bouquet21,
    alt: "Осенний букет из оранжевых хризантем и сухих трав",
    occasions: ["birthday", "nooccasion"],
    recipients: ["mother", "friend", "colleague"],
    color: "mix",
  },
  {
    id: "blue-hour",
    name: "Синий час",
    tagline: "Прохладная гамма для тёплой квартиры",
    description:
      "Голубая и сиреневая гортензия с эвкалиптом. Объёмный букет, который заполняет комнату одним движением.",
    composition: ["Гортензия голубая — 3 шт.", "Гортензия сиреневая", "Эвкалипт бэби блю"],
    size: "Высота около 50 см, диаметр 35 см",
    sizes: ["3 гортензии", "5 гортензий"],
    price: 6400,
    segment: "mid",
    image: bouquet12,
    alt: "Объёмный букет из голубой и сиреневой гортензии",
    occasions: ["birthday", "anniversary", "nooccasion"],
    recipients: ["mother", "friend", "love"],
    color: "lavender",
  },
  {
    id: "warm-whisper",
    name: "Тёплый шёпот",
    tagline: "Свет позднего августа, собранный в руках",
    description:
      "Мягкая композиция в персиковых полутонах — для слов, которые говорят негромко. Сухие травы придают букету характер и живут в интерьере месяцами.",
    composition: ["Пионовидная роза Shimmer", "Ранункулюс абрикосовый", "Сухие злаки", "Скабиоза"],
    size: "Высота около 45 см",
    sizes: ["S — 35 см", "M — 45 см", "L — 60 см"],
    price: 6900,
    segment: "mid",
    image: bouquet1,
    alt: "Букет из персиковых роз, абрикосового ранункулюса и сухих трав на кремовом фоне",
    occasions: ["date", "birthday", "anniversary"],
    recipients: ["love", "mother"],
    color: "cream",
  },
  {
    id: "soft-morning",
    name: "Раннее утро",
    tagline: "Нежность без сентиментальности",
    description:
      "Розовые тюльпаны, гортензия и лаванда в тёплой крафт-упаковке. Букет, который легко дарить — и легко принимать.",
    composition: ["Тюльпан пионовидный", "Гортензия", "Лаванда", "Душистый горошек"],
    size: "Высота около 45 см",
    sizes: ["S — 35 см", "M — 45 см", "L — 55 см"],
    price: 7400,
    segment: "mid",
    image: bouquet4,
    alt: "Букет из розовых тюльпанов, гортензии и лаванды в бежевой упаковке",
    occasions: ["birthday", "date", "nooccasion"],
    recipients: ["love", "mother", "friend"],
    color: "pink",
  },
  {
    id: "round-letter",
    name: "Круглое письмо",
    tagline: "Композиция в шляпной коробке",
    description:
      "Пастельные розы и эустома в бежевой коробке с флористической губкой — не требует вазы и держит форму несколько дней.",
    composition: ["Роза пионовидная", "Кустовая роза", "Эустома", "Питтоспорум", "Шляпная коробка"],
    size: "Диаметр коробки 20 см, высота композиции 30 см",
    sizes: ["S — 18 см", "M — 20 см", "L — 25 см"],
    price: 7900,
    segment: "mid",
    image: bouquet15,
    alt: "Композиция из пастельных роз и эустомы в бежевой шляпной коробке",
    occasions: ["birthday", "anniversary", "nooccasion"],
    recipients: ["mother", "love", "colleague"],
    color: "mix",
  },
  {
    id: "classic-25",
    name: "Классика 25",
    tagline: "Двадцать пять красных роз без лишних слов",
    description:
      "Плотный монобукет из красных роз в тёмной бумаге. Прямое, узнаваемое высказывание для свидания и годовщины.",
    composition: ["Роза красная Red Naomi — 25 шт.", "Тёмно-серая матовая бумага"],
    size: "Высота 60 см, стебель 50 см",
    sizes: ["25 роз", "51 роза", "101 роза"],
    price: 9800,
    segment: "premium",
    image: bouquet11,
    alt: "Букет из 25 красных роз в тёмно-серой бумаге",
    occasions: ["date", "anniversary", "proposal"],
    recipients: ["love"],
    color: "red",
  },
  {
    id: "peony-solo",
    name: "Пионовое соло",
    tagline: "Сезон, который длится шесть недель",
    description:
      "Монобукет из светло-розовых пионов с шёлковой лентой. Сезонная позиция: доступна с мая по июль, вне сезона собираем из пионовидных роз.",
    composition: ["Пион Sarah Bernhardt — 9 шт.", "Зелень пиона", "Шёлковая лента"],
    size: "Высота около 50 см",
    sizes: ["7 пионов", "9 пионов", "15 пионов"],
    price: 11500,
    segment: "premium",
    image: bouquet13,
    alt: "Монобукет из светло-розовых пионов с кремовой лентой",
    occasions: ["date", "birthday", "anniversary", "wedding"],
    recipients: ["love", "mother"],
    color: "pink",
  },
  {
    id: "midnight-garden",
    name: "Полночный сад",
    tagline: "Разговор, который начинается после заката",
    description:
      "Глубокие бордовые и сливовые тона, тёмная зелень. Букет для тех, кто предпочитает сдержанность и драму вместо очевидной нежности.",
    composition: ["Роза Black Baccara", "Тюльпан махровый бордовый", "Астранция", "Эвкалипт бэби блю"],
    size: "Высота около 50 см",
    sizes: ["M — 45 см", "L — 60 см"],
    price: 12400,
    segment: "premium",
    image: bouquet2,
    alt: "Тёмный букет из бордовых и сливовых цветов на графитовом фоне",
    occasions: ["date", "anniversary"],
    recipients: ["love", "man"],
    color: "red",
  },
  {
    id: "declaration",
    name: "Признание",
    tagline: "Когда объяснять уже поздно",
    description:
      "Красные садовые розы в чёрной бумаге. Прямое высказывание, собранное так, чтобы не выглядеть банальным.",
    composition: ["Садовая роза Explorer", "Роза Red Naomi", "Тёмная зелень", "Чёрная матовая бумага"],
    size: "Высота около 60 см",
    sizes: ["M — 45 см", "L — 60 см", "XL — 75 см"],
    price: 13200,
    segment: "premium",
    image: bouquet6,
    alt: "Букет красных садовых роз в чёрной упаковке на бежевом фоне",
    occasions: ["proposal", "date", "anniversary"],
    recipients: ["love"],
    color: "red",
  },
  {
    id: "first-light",
    name: "Первый свет",
    tagline: "Тишина утра перед важным днём",
    description:
      "Полностью белая композиция с шёлковой лентой. Классика для свадьбы и для моментов, где важна чистота высказывания.",
    composition: ["Пион белый", "Ландыш", "Эустома", "Рускус"],
    size: "Высота около 40 см",
    sizes: ["S — 30 см", "M — 40 см"],
    price: 15600,
    segment: "premium",
    image: bouquet3,
    alt: "Белый свадебный букет из пионов и ландышей с шёлковой лентой",
    occasions: ["wedding", "proposal"],
    recipients: ["love"],
    color: "white",
  },
  {
    id: "garden-basket",
    name: "Садовая корзина",
    tagline: "Большой подарок, который не нужно распаковывать",
    description:
      "Корзина с пионами, гортензией и розами в кремово-розовой гамме. Подходит для выписки из роддома, юбилея и корпоративного поздравления.",
    composition: ["Пион", "Гортензия", "Роза пионовидная", "Эустома", "Плетёная корзина"],
    size: "Высота 55 см, диаметр 45 см",
    sizes: ["M — 45 см", "L — 55 см"],
    price: 17400,
    segment: "premium",
    image: bouquet20,
    alt: "Большая корзина с пионами, гортензией и розами в кремово-розовой гамме",
    occasions: ["birthday", "anniversary", "wedding"],
    recipients: ["mother", "love", "colleague"],
    color: "cream",
  },
  {
    id: "quiet-architecture",
    name: "Тихая архитектура",
    tagline: "Линия, свет и ничего лишнего",
    description:
      "Скульптурная композиция из орхидей и ветвей в керамическом сосуде. Уместна в переговорной, в отеле и в доме, где ценят паузу.",
    composition: ["Орхидея фаленопсис", "Ветви лещины", "Аспидистра", "Керамический сосуд"],
    size: "Высота 55–75 см",
    sizes: ["M — 55 см", "L — 75 см"],
    price: 19800,
    segment: "premium",
    image: bouquet5,
    alt: "Минималистичная композиция из белых орхидей и веток в керамической вазе",
    occasions: ["anniversary", "wedding", "nooccasion"],
    recipients: ["colleague", "man", "mother"],
    color: "white",
  },
  {
    id: "hundred-and-one",
    name: "Сто один",
    tagline: "Жест, который видно с порога",
    description:
      "101 белая роза в кремовой бумаге. Собирается под заказ за 24 часа; при необходимости заменяем сорт на равноценный того же оттенка.",
    composition: ["Роза белая Avalanche — 101 шт.", "Кремовая матовая бумага", "Атласная лента"],
    size: "Высота 70 см, диаметр 60 см",
    sizes: ["51 роза", "101 роза", "151 роза"],
    price: 24900,
    segment: "premium",
    image: bouquet17,
    alt: "Большой букет из 101 белой розы в кремовой упаковке",
    occasions: ["proposal", "anniversary", "wedding"],
    recipients: ["love"],
    color: "white",
  },
];

export const budgetRanges = [
  { id: "to-2500", label: "До 2 500 ₽", min: 0, max: 2500 },
  { id: "2500-5000", label: "2 500 — 5 000 ₽", min: 2500, max: 5000 },
  { id: "5000-10000", label: "5 000 — 10 000 ₽", min: 5000, max: 10000 },
  { id: "10000-20000", label: "10 000 — 20 000 ₽", min: 10000, max: 20000 },
  { id: "from-20000", label: "20 000 ₽ и выше", min: 20000, max: Infinity },
];

export const formatPrice = (value: number) => `${value.toLocaleString("ru-RU")} ₽`;

export const seasonalityNote =
  "Внешний вид букета может немного отличаться в зависимости от сезонности и наличия цветов. Мы сохраним стиль, цветовую гамму и стоимость композиции.";

export const photoApprovalNote =
  "Перед отправкой мы можем прислать вам фото готового букета на согласование.";

export const deliveryFacts = [
  { title: "Доставка по Москве", value: "от 500 ₽", note: "в пределах ТТК; за МКАД — по расчёту" },
  { title: "Интервал доставки", value: "2 часа", note: "с 09:00 до 22:00, выбираете при заказе" },
  { title: "Срочная доставка", value: "от 90 минут", note: "по наличию курьера, доплата 900 ₽" },
  { title: "Фото до отправки", value: "по запросу", note: "присылаем в мессенджер на согласование" },
];
