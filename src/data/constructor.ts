import exampleImage from "@/assets/bouquet-1.jpg";

export type ConstructorFlower = {
  id: string;
  label: string;
  unitPrice: number;
  note?: string;
};

export type ConstructorExtra = {
  id: string;
  label: string;
  price: number;
  description?: string;
};

export const constructorFlowers: ConstructorFlower[] = [
  { id: "rose", label: "Роза", unitPrice: 350, note: "стойкая классика" },
  { id: "tulip", label: "Тюльпан", unitPrice: 250, note: "январь — апрель" },
  { id: "eustoma", label: "Эустома", unitPrice: 300, note: "мягкий объём" },
  { id: "peony", label: "Пион", unitPrice: 600, note: "май — июль" },
  { id: "chrysanthemum", label: "Хризантема", unitPrice: 190, note: "долго стоит" },
  { id: "ranunculus", label: "Ранункулюс", unitPrice: 340, note: "зима — весна" },
];

export const constructorExtras: ConstructorExtra[] = [
  { id: "greenery", label: "Зелень", price: 400, description: "эвкалипт, рускус, фисташка" },
  {
    id: "decorative",
    label: "Декоративные цветы",
    price: 350,
    description: "маттиола, скабиоза, гипсофила",
  },
  {
    id: "premium-packaging",
    label: "Премиальная упаковка",
    price: 600,
    description: "матовая бумага, шёлковая лента или коробка",
  },
];

/** Visual example only — not generated from user selections. */
export const constructorExampleImage = exampleImage;

export const constructorExampleAlt = "Пример авторской композиции — финальный вид собирает флорист";

export type FlowerQuantities = Record<string, number>;

export type SelectedExtras = Record<string, boolean>;

export function getPrimaryFlowerId(quantities: FlowerQuantities): string | null {
  let bestId: string | null = null;
  let bestQty = 0;
  for (const [id, qty] of Object.entries(quantities)) {
    if (qty > bestQty) {
      bestQty = qty;
      bestId = id;
    }
  }
  return bestId;
}

export function getTotalStems(quantities: FlowerQuantities): number {
  return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
}

export type CompositionLine = {
  label: string;
  amount: number;
  detail?: string;
};

export function buildCompositionLines(
  quantities: FlowerQuantities,
  extras: SelectedExtras,
): CompositionLine[] {
  const lines: CompositionLine[] = [];
  const stemLines: string[] = [];
  let flowersTotal = 0;

  for (const flower of constructorFlowers) {
    const qty = quantities[flower.id] ?? 0;
    if (qty > 0) {
      flowersTotal += flower.unitPrice * qty;
      stemLines.push(`${qty} ${flower.label.toLowerCase()}`);
    }
  }

  if (flowersTotal > 0) {
    lines.push({
      label: "Цветы",
      amount: flowersTotal,
      detail: stemLines.join(", "),
    });
  }

  for (const extra of constructorExtras) {
    if (extras[extra.id]) {
      lines.push({ label: extra.label, amount: extra.price });
    }
  }

  return lines;
}

export function calculateConstructorTotal(
  quantities: FlowerQuantities,
  extras: SelectedExtras,
): number {
  let total = 0;
  for (const flower of constructorFlowers) {
    const qty = quantities[flower.id] ?? 0;
    total += flower.unitPrice * qty;
  }
  for (const extra of constructorExtras) {
    if (extras[extra.id]) total += extra.price;
  }
  return total;
}

export function formatCompositionSummary(
  quantities: FlowerQuantities,
  extras: SelectedExtras,
): string {
  const parts: string[] = [];

  for (const flower of constructorFlowers) {
    const qty = quantities[flower.id] ?? 0;
    if (qty > 0) parts.push(`${flower.label} — ${qty} шт.`);
  }

  for (const extra of constructorExtras) {
    if (extras[extra.id]) parts.push(extra.label);
  }

  return parts.join("; ") || "Состав не выбран";
}

export type ConstructorSnapshot = {
  composition: string;
  totalStems: number;
  total: number;
};

export function buildConstructorSnapshot(
  quantities: FlowerQuantities,
  extras: SelectedExtras,
): ConstructorSnapshot | null {
  const totalStems = getTotalStems(quantities);
  if (totalStems <= 0) return null;

  return {
    composition: formatCompositionSummary(quantities, extras),
    totalStems,
    total: calculateConstructorTotal(quantities, extras),
  };
}
