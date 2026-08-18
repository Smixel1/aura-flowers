import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/shop", label: "Каталог" },
  { to: "/story", label: "О бренде" },
  { to: "/bespoke", label: "Индивидуально" },
  { to: "/contact", label: "Контакты" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const transparent = overHero && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        transparent ? "bg-transparent" : "border-b border-border bg-background/95 backdrop-blur",
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 transition-all duration-500 lg:px-12",
          transparent ? "py-8" : "py-5",
        )}
      >
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.slice(0, 2).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "link-underline text-[0.7rem] uppercase tracking-[0.22em] transition-colors",
                transparent
                  ? "text-ink-foreground/85 hover:text-gold"
                  : "text-foreground/70 hover:text-gold",
              )}
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={cn(
            "justify-self-start p-1 lg:hidden",
            transparent ? "text-ink-foreground" : "text-foreground",
          )}
        >
          {menuOpen ? (
            <X className="h-5 w-5" strokeWidth={1} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1} />
          )}
        </button>

        <Link
          to="/"
          className={cn(
            "justify-self-center text-center transition-colors duration-500",
            transparent ? "text-ink-foreground" : "text-foreground",
          )}
        >
          <span className="font-display text-xl tracking-[0.34em] sm:text-2xl">LUNA</span>
          <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.5em] text-gold">
            Flowers
          </span>
        </Link>

        <nav className="hidden items-center justify-end gap-9 lg:flex">
          {nav.slice(2).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "link-underline text-[0.7rem] uppercase tracking-[0.22em] transition-colors",
                transparent
                  ? "text-ink-foreground/85 hover:text-gold"
                  : "text-foreground/70 hover:text-gold",
              )}
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="lg:hidden" />
      </div>

      {menuOpen ? (
        <div className="border-t border-border bg-background px-6 py-8 lg:hidden">
          <nav className="flex flex-col gap-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-display text-2xl text-foreground"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
