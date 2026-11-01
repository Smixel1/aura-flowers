import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <div className="grid gap-14 md:grid-cols-3">
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
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">Связаться</p>
            <p className="mt-6 text-sm leading-relaxed text-ink-foreground/70">
              Оставьте заявку, и мы свяжемся с вами по указанному номеру.
            </p>
            <Link
              to="/contact"
              className="link-underline mt-4 inline-block text-sm text-ink-foreground"
            >
              Написать нам
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-foreground/12 pt-8 text-[0.7rem] text-ink-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LUNA FLOWERS. Все права защищены.</p>
          <p>Информация о заказе предоставляется при обращении.</p>
        </div>
      </div>
    </footer>
  );
}
