# LUNA FLOWERS Project

LUNA FLOWERS — Техническое задание на разработку сайта

Премиальный цветочный бренд | Документ для реализации в Lovable

1. Общая концепция сайта

LUNA FLOWERS — не каталог цветов, а витрина эмоций. Сайт должен работать как визуальная история: человек заходит не «купить букет», а «купить момент» — признание, извинение, благодарность, праздник. Всё оформление подчинено этому: минимум текста, максимум воздуха и качественной фотографии, спокойный премиальный ритм без ярких CTA-баннеров и агрессивных скидок.

Ключевые принципы:

Тишина и пространство — много белого/бежевого фона, крупные отступы

Фотография — главный герой каждого экрана

Текст — короткий, образный, без канцелярита и штампов «у нас лучшие цветы»

Золото используется точечно (линии, иконки, hover-состояния), не заливками

Анимации плавные, медленные (fade/slide 400–600ms), никакого «магазинного» мигания

Референс ощущения: Aésop, Byredo, свадебные европейские флористы (Fleurs de Prairie, Rosebud) — тактильная роскошь, а не «интернет-магазин».

2. Цветовая палитра и типографика

Роль Цвет HEX (ориентир) Основной фон Кремовый #F7F3EC Глубокий фон (футер, акцентные блоки) Глубокий черный #12100E Текст на светлом Тёплый графит #1E1A16 Акцент Тёплое золото #C9A15D Вторичный фон Тёплый бежевый #EDE4D6

Типографика:

Заголовки: serif с характером (например Cormorant Garamond / Playfair Display) — для эмоции

Основной текст: чистый sans-serif (например Inter / Neue Montreal) — для читаемости

Крупные заголовки — тонкий вес (300–400), не bold

3. Структура страниц

Главная (Home)

Каталог (Shop / Collections)

О бренде (Our Story)

Индивидуальный заказ (Bespoke)

Контакты (Contact)

Сквозные элементы: шапка (логотип по центру, минималистичное меню), футер (соцсети, контакты, юридическая информация), AI-консультант (плавающая кнопка в правом нижнем углу на всех страницах).

4. Главная страница (Home)

Цель страницы: вызвать эмоцию за первые 3 секунды и провести к действию — просмотру каталога или заказу.

Блок 1 — Первый экран (Hero)

Визуал: полноэкранная фотография премиального букета (мягкий свет, глубокие тени), лёгкое затемнение для читаемости текста

Заголовок: «Цветы, которые говорят то, что не успевают сказать слова»

Подзаголовок: «Авторские букеты для моментов, которые хочется запомнить»

Кнопка: «Собрать букет» (ведёт в каталог) — контурная, золотая обводка, прозрачный фон

Действие пользователя: скролл вниз / клик по кнопке

Блок 2 — Преимущества

Четыре колонки/карточки с тонкой иконкой (line-icon, золотая):

Свежесть — «Цветы приезжают с аукциона за 24 часа до сборки»

Авторский подход — «Каждая композиция — работа одного флориста от начала до конца»

Доставка — «Бережная доставка день в день по городу»

Индивидуальность — «Подбираем букет под характер, а не под повод»

Блок 3 — Избранные композиции

Горизонтальная лента из 4–6 карточек букетов (превью из каталога) с кнопкой «Смотреть коллекцию полностью»

Блок 4 — Философия бренда (тизер)

Короткая цитата-манифест на тёмном фоне (#12100E), белый/золотой текст, ссылка «Узнать историю бренда» → страница «О бренде»

Блок 5 — Отзывы клиентов

Слайдер из 3–5 отзывов: имя, короткий текст, повод заказа («Годовщина», «Извинение», «День рождения мамы»)

Блок 6 — Финальный CTA

Крупный блок перед футером: «Не знаете, что выбрать? Наш AI-флорист подберёт букет за вас» + кнопка открытия AI-консультанта

5. Каталог (Shop)

Цель страницы: дать удобный, но не «маркетплейсный» просмотр букетов с быстрым переходом к заказу.

Блоки:

Фильтры сверху (минималистичные, текстовые, не выпадающие «коробки»): по поводу (свидание/свадьба/день рождения/корпоратив), по цветовой гамме, по бюджету

Сетка карточек букетов, 3 колонки на десктопе, 1 на мобильном

Карточка букета:

Фото

Название (например «Тёплый шёпот», «Полночный сад»)

Короткое описание (1 фраза, атмосферная, не состав)

Цена

Кнопка «Заказать» (открывает форму заказа с предзаполненным названием букета)

Пользовательские действия: фильтрация, открытие карточки (модалка/страница товара с расширенным описанием, составом, размерами), добавление в форму заказа

6. О бренде (Our Story)

Цель страницы: сформировать эмоциональную связь и доверие, оправдать премиальную цену.

Блоки:

История: короткий рассказ об основании бренда, философии «цветы как язык эмоций»

Ценности: 3–4 принципа (честность в свежести, уважение к ремеслу флориста, экологичная упаковка, локальные партнёры-фермеры)

Визуальный блок: фото мастерской/флориста за работой (человечность бренда)

Цитата основателя на тёмном фоне

7. Индивидуальный заказ (Bespoke)

Цель страницы: конвертировать сложные/дорогие запросы (свадьбы, мероприятия, корпоративные заказы) в личный контакт.

Блоки:

Заголовок: «Букет, которого больше нет ни у кого»

Короткое описание услуги индивидуального флористического дизайна

Форма заказа:

Имя

Телефон

Повод

Бюджет (диапазон, слайдер или选择)

Пожелания (текстовое поле, свободный ввод)

Примечание: «Мы свяжемся с вами в течение 2 часов»

8. Контакты (Contact)

Блоки:

Адрес шоурума/мастерской, часы работы

Телефон, WhatsApp/Telegram, email

Карта (встроенная, минималистичный стиль)

Короткая форма быстрой связи (имя, телефон, сообщение)

Ссылки на соцсети

9. AI-консультант

Расположение: плавающая кнопка (иконка в виде цветка/звезды, золотая) в правом нижнем углу всех страниц. При клике открывается чат-виджет (slide-in справа или модальное окно по центру на мобильном).

Сценарий диалога:

Приветствие: «Здравствуйте! Я помогу подобрать идеальный букет. Расскажите, для кого и по какому поводу?»

Клиент: «Мне нужен букет девушке на день рождения»

AI последовательно уточняет (не всё сразу одним сообщением, а пошагово, диалогом):

Возраст/возрастная категория получательницы

Предпочтения (любимые цветы/цвета, если известны)

Бюджет

Повод (уже указан, но можно уточнить контекст — «первый раз дарите» / «постоянный клиент»)

Цветовая гамма (тёплая/холодная/нейтральная, монохром/микс)

После сбора данных AI предлагает 2–3 варианта из каталога с фото, названием, ценой и коротким обоснованием выбора

Кнопка под каждым предложением — «Заказать этот букет» → открывает форму заказа с предзаполненными данными

Тон AI: тёплый, как у личного консьержа-флориста, без канцелярита, короткие сообщения, эмодзи не использовать (не соответствует премиальному тону).

10. Автоматизация (для будущей реализации)

После отправки любой формы заказа (каталог, bespoke, AI-консультант, контакты):

CRM: данные заказа (имя, телефон, повод, бюджет, пожелания, выбранный букет) отправляются в CRM-систему через webhook

Telegram-уведомление владельцу: мгновенное сообщение в Telegram-бот с деталями заявки — «Новый заказ: [Имя], [Телефон], [Повод], [Бюджет], [Букет]»

Google Sheets: дублирование каждой заявки строкой в таблицу (для учёта и аналитики) — колонки: дата, имя, телефон, повод, бюджет, букет, источник (каталог/AI/bespoke/контакты)

Примечание: на этапе первой версии сайта в Lovable формы должны быть спроектированы так, чтобы их было легко подключить к Zapier/Make или нативным интеграциям (webhook endpoint), без необходимости переделывать UI при добавлении автоматизации.

11. Технические требования для Lovable

Технологии:

React + Tailwind CSS (стандарт Lovable)

Компонентный подход: переиспользуемые Card, Button, Modal, FilterBar, ChatWidget, FormField

Ключевые компоненты:

Header (sticky, прозрачный на hero, становится непрозрачным при скролле)

Hero-секция с фоновым изображением

Карточка товара (переиспользуется в каталоге, на главной, в результатах AI-консультанта)

Модальное окно карточки товара

Форма заказа (переиспользуемая, с вариациями предзаполненных полей)

Чат-виджет AI-консультанта (плавающий, открывается/закрывается)

Слайдер отзывов

Футер

Функциональность:

Фильтрация каталога на клиенте (без перезагрузки)

Валидация форм (обязательные поля, формат телефона)

Плавные анимации появления блоков при скролле (fade-in/slide-up)

Состояние формы заказа сохраняется при переходе между шагами (если форма многошаговая)

Адаптивность:

Полная мобильная адаптация: 1 колонка для каталога и преимуществ на экранах <768px

Меню — гамбургер на мобильных

Hero-текст уменьшается пропорционально, кнопка остаётся заметной

AI-виджет на мобильном открывается на весь экран, а не узким окном

Скорость и производительность:

Оптимизация изображений (lazy loading для всех фото ниже первого экрана)

Минимальный набор шрифтов (2 семейства максимум)

Избегать тяжёлых сторонних библиотек анимации — использовать нативные CSS-transitions/Framer Motion по минимуму

Доступность (accessibility):

Достаточный контраст текста на золотом/бежевом фоне

Alt-тексты для всех изображений букетов

Формы с понятными label и focus-состояниями

12. Финальный промпт для Lovable (English, ready to copy)

Build a premium, minimalist website for a luxury flower brand called "LUNA FLOWERS."

BRAND & POSITIONING
The brand doesn't sell flowers — it creates emotional moments for dates, weddings,
birthdays, corporate gifts, and personal milestones. Target audience: men and women
25-55 who value aesthetics and quality over price. Inspiration: European luxury
brands (Aésop, Byredo aesthetic) — calm, spacious, editorial, never "salesy."

VISUAL STYLE

- Minimalist, elegant, premium, lots of white space
- Color palette: deep black (#12100E), warm beige (#EDE4D6), cream (#F7F3EC),
  gold accents (#C9A15D), natural tones
- Typography: elegant serif for headlines (e.g. Playfair Display / Cormorant
  Garamond), clean sans-serif for body text (e.g. Inter)
- Slow, smooth fade/slide animations on scroll (400-600ms)
- Photography-first design — large, high-quality flower imagery as the hero
  of every section

PAGES TO BUILD

1. HOME
   - Full-screen hero with a bouquet photo, emotional headline
     ("Flowers that say what words can't"), subheadline, and a single
     outlined gold CTA button "Build a Bouquet" linking to the catalog
   - Four-column benefits section: Freshness, Artisan Craft, Delivery,
     Personal Approach (each with a thin line icon)
   - Featured bouquets horizontal scroll/grid (4-6 cards) linking to catalog
   - Dark brand-philosophy teaser block (black background, gold/white text,
     short manifesto quote) linking to "Our Story"
   - Testimonials slider (3-5 client quotes with occasion tags)
   - Final CTA block: "Not sure what to choose? Let our AI florist help"
     with a button opening the AI chat widget

2. SHOP / CATALOG
   - Minimal text-based filters at the top: by occasion (date, wedding,
     birthday, corporate), by color palette, by budget
   - Responsive grid of bouquet cards: 3 columns desktop, 1 column mobile
   - Each card: photo, poetic name, one-line atmospheric description, price,
     "Order" button that opens the order form pre-filled with the bouquet name
   - Clicking a card opens a modal/detail view with full description,
     composition, and size options

3. OUR STORY
   - Brand founding story and philosophy ("flowers as a language of emotion")
   - 3-4 brand values with short descriptions
   - A workshop/florist-at-work photo section for authenticity
   - Founder quote block on dark background

4. BESPOKE (Custom Order)
   - Headline: "A bouquet no one else has"
   - Short description of the custom/bespoke florist design service
   - Order form: Name, Phone, Occasion, Budget (range slider), Wishes
     (free text)
   - Note: "We'll get back to you within 2 hours"

5. CONTACT
   - Studio address, opening hours
   - Phone, WhatsApp/Telegram, email
   - Embedded minimal-style map
   - Short quick-contact form: Name, Phone, Message
   - Social media links

GLOBAL ELEMENTS

- Sticky header, centered logo, minimal nav, transparent on hero /
  solid on scroll
- Footer with contact info, social links, legal info
- Floating AI consultant button (bottom-right, flower/star icon, gold)
  present on every page

AI CONSULTANT (CHAT WIDGET)
Build a floating chat widget that opens a slide-in panel (right side on
desktop, full-screen on mobile). Conversation flow:

1. Greeting: "Hi! I'll help you find the perfect bouquet. Who is it for
   and what's the occasion?"
2. The assistant asks step-by-step (not all at once, conversationally):
   recipient's age range, flower/color preferences if known, budget,
   occasion context, preferred color palette (warm/cool/neutral,
   monochrome/mixed)
3. After gathering info, it suggests 2-3 bouquets from the catalog with
   photo, name, price, and a short reason for the match
4. Each suggestion has an "Order this bouquet" button that opens the order
   form pre-filled with the selection
   Tone: warm, like a personal florist concierge — short messages, no emojis,
   no corporate/salesy language.

FORMS & AUTOMATION READINESS
All order forms (catalog, bespoke, AI consultant, contact) should collect:
name, phone, occasion, budget, wishes/message, and selected bouquet (if
applicable). Structure form submission logic so it can later be connected
to a webhook (for CRM, Telegram bot notification, and Google Sheets logging)
without redesigning the UI — use a single reusable form-submission handler
function that can be pointed at an external endpoint.

TECHNICAL REQUIREMENTS

- React + Tailwind CSS
- Reusable components: Header, Hero, ProductCard, ProductModal, FilterBar,
  OrderForm, AIChatWidget, TestimonialSlider, Footer
- Client-side catalog filtering (no page reload)
- Form validation (required fields, phone format)
- Scroll-triggered fade-in/slide-up animations
- Fully responsive: single-column layouts on mobile (<768px), hamburger
  menu, full-screen AI widget on mobile
- Lazy-load all images below the fold
- Limit to 2 font families for performance
- Sufficient text contrast on beige/gold backgrounds, alt text on all
  images, visible focus states on form fields

Build this as a complete, polished, production-ready website with all
five pages, working navigation, and the AI chat widget functional with
mock/placeholder bouquet data that matches the described catalog structure.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eb03bc9c-6b60-465a-80b3-769ef1f4f75b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
