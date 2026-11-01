import { z } from "zod";

const MAX_BODY_BYTES = 8192;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const optionalText = (max: number) => z.string().trim().min(1).max(max).optional();

const leadSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    phone: z
      .string()
      .trim()
      .max(20)
      .regex(/^\+?[0-9\s\-()]{10,18}$/),
    source: z.enum(["catalog", "bespoke", "ai", "contact"]),
    occasion: optionalText(100),
    budget: optionalText(100),
    bouquet: optionalText(100),
    composition: optionalText(500),
    estimatedPrice: optionalText(50),
    quantity: z.number().int().min(1).max(999).optional(),
    total: z.number().finite().min(0).max(10_000_000).optional(),
    comment: optionalText(2000),
    telegram: optionalText(50),
  })
  .strict();

type Lead = z.infer<typeof leadSchema>;
type Options = {
  botToken?: string | undefined;
  chatId?: string | undefined;
  send?: typeof fetch;
  limit?: (request: Request) => Promise<boolean>;
};

const limits = new Map<string, { count: number; resetAt: number }>();

/** Best-effort local limit; configure a shared edge limit for multiple instances. */
export async function localLeadLimit(request: Request): Promise<boolean> {
  const address = request.headers.get("cf-connecting-ip");
  if (!address) return true;

  const now = Date.now();
  if (limits.size > 10_000) {
    for (const [key, entry] of limits) if (entry.resetAt <= now) limits.delete(key);
  }
  const entry = limits.get(address);
  if (!entry || entry.resetAt <= now) {
    if (!entry && limits.size >= 10_000) return false;
    limits.set(address, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= MAX_REQUESTS;
}

function reply(status: number, message: string): Response {
  return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function readBoundedJson(request: Request): Promise<unknown> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) throw new Error("too_large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_json");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) throw new Error("too_large");
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new Error("invalid_json");
  }
}

function telegramText(lead: Lead): string {
  const lines = [
    "Новая заявка LUNA FLOWERS",
    `Дата: ${new Date().toISOString()}`,
    `Источник: ${lead.source}`,
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
  ];
  const fields: Array<[string, string | number | undefined]> = [
    ["Telegram", lead.telegram],
    ["Повод", lead.occasion],
    ["Бюджет", lead.budget],
    ["Букет", lead.bouquet],
    ["Состав", lead.composition],
    ["Цена", lead.estimatedPrice],
    ["Количество", lead.quantity],
    ["Итого (со слов клиента)", lead.total],
    ["Комментарий", lead.comment],
  ];
  for (const [label, value] of fields) if (value !== undefined) lines.push(`${label}: ${value}`);
  return lines.join("\n").slice(0, 4096);
}

export async function handleLeadRequest(
  request: Request,
  options: Options = {},
): Promise<Response> {
  if (request.method !== "POST") return reply(405, "Метод не поддерживается");
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply(403, "Запрос отклонён");
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply(403, "Запрос отклонён");
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reply(415, "Ожидается JSON");
  }

  let data: unknown;
  try {
    data = await readBoundedJson(request);
  } catch (error) {
    return reply(
      error instanceof Error && error.message === "too_large" ? 413 : 400,
      "Некорректная заявка",
    );
  }
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) return reply(400, "Проверьте поля заявки");

  if (!options.botToken || !options.chatId) return reply(503, "Приём заявок временно недоступен");
  if (options.limit && !(await options.limit(request))) {
    return Response.json(
      { error: "Слишком много заявок. Попробуйте позже" },
      {
        status: 429,
        headers: { "Retry-After": "600", "Cache-Control": "no-store" },
      },
    );
  }

  try {
    const response = await (options.send ?? fetch)(
      `https://api.telegram.org/bot${options.botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: options.chatId, text: telegramText(parsed.data) }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok || ((await response.json()) as { ok?: boolean }).ok !== true) {
      return reply(502, "Не удалось передать заявку. Попробуйте позже");
    }
    return new Response(null, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch {
    return reply(502, "Не удалось передать заявку. Попробуйте позже");
  }
}
