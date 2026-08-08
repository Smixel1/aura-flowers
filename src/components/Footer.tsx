import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <div className="grid gap-14 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl tracking-[0.34em]">LUNA</p>
            <p className="mt-1 text-[0.55rem] uppercase tracking-[0.5em] text-gold">Flowers</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-foreground/60">
              Авторская флористика. Букеты как способ сказать то, на что не хватает слов.
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">Разделы</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-foreground/70">
              <li>
                <Link to="/shop" className="link-underline">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/story" className="link-underline">
                  О бренде
                </Link>
              </li>
              <li>
                <Link to="/bespoke" className="link-underline">
                  Индивидуальный заказ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">Контакты</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-foreground/70">
              <li>
                <a href="tel:+74950000000" className="link-underline">
                  +7 495 000 00 00
                </a>
              </li>
              <li>
                <a href="mailto:hello@lunaflowers.ru" className="link-underline">
                  hello@lunaflowers.ru
                </a>
              </li>
              <li>Большая Никитская, 12 — мастерская</li>
              <li>Ежедневно, 09:00 — 21:00</li>
            </ul>
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">Социальные сети</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-foreground/70">
              <li>
                <a href="https://instagram.com" className="link-underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://t.me" className="link-underline">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://wa.me/74950000000" className="link-underline">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" className="link-underline">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-foreground/12 pt-8 text-[0.7rem] text-ink-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LUNA FLOWERS. Все права защищены.</p>
          <p>Политика конфиденциальности · Публичная оферта · ИНН 7700000000</p>
        </div>
      </div>
    </footer>
  );
}
