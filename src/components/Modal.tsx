import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  children,
  label,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-ink/60 backdrop-blur-[2px] animate-in fade-in duration-500"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          "relative z-10 w-full max-w-3xl bg-background shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 z-20 p-2 text-foreground/70 transition-colors hover:text-gold"
        >
          <X className="h-5 w-5" strokeWidth={1} />
        </button>
        {children}
      </div>
    </div>
  );
}
