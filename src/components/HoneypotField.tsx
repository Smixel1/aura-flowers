import type { ChangeEvent } from "react";

/** Visually hidden field - bots often fill it; humans should leave it empty. */
export function HoneypotField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
      <label htmlFor={id}>Компания</label>
      <input
        id={id}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
    </div>
  );
}
