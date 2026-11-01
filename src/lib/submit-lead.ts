import { FIELD_LIMITS } from "@/lib/form-guards";

export type LeadSource = "catalog" | "bespoke" | "ai" | "contact";

export type Lead = {
  name: string;
  phone: string;
  occasion?: string | undefined;
  budget?: string | undefined;
  bouquet?: string | undefined;
  composition?: string | undefined;
  estimatedPrice?: string | undefined;
  quantity?: number | undefined;
  total?: number | undefined;
  comment?: string | undefined;
  telegram?: string | undefined;
  source: LeadSource;
};

/** Send every form through the same-origin server route. */
export async function submitLead(lead: Lead): Promise<void> {
  validateLeadInput(lead);
  const payload = buildLeadPayload(lead);
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Не удалось отправить заявку");
  }
}

export const phonePattern = /^\+?[0-9\s\-()]{10,18}$/;

export function formatTelegram(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

/** Ensure optional fields are included only when present. */
export function buildLeadPayload(lead: Lead): Lead {
  const payload: Lead = {
    name: truncate(lead.name.trim(), FIELD_LIMITS.name),
    phone: truncate(lead.phone.trim(), FIELD_LIMITS.phone),
    source: lead.source,
  };

  const clientComment = lead.comment?.trim();
  if (clientComment) payload.comment = truncate(clientComment, FIELD_LIMITS.comment);
  if (lead.telegram) payload.telegram = truncate(lead.telegram, FIELD_LIMITS.telegram);
  if (lead.occasion) payload.occasion = lead.occasion;
  if (lead.budget) payload.budget = lead.budget;
  if (lead.bouquet) payload.bouquet = lead.bouquet;
  if (lead.composition) payload.composition = lead.composition;
  if (lead.estimatedPrice) payload.estimatedPrice = lead.estimatedPrice;
  if (lead.quantity != null) payload.quantity = lead.quantity;
  if (lead.total != null) payload.total = lead.total;

  return payload;
}

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

function validateLeadInput(lead: Omit<Lead, "createdAt">): void {
  if (lead.name.trim().length < 2) throw new Error("Invalid name");
  if (!phonePattern.test(lead.phone.trim())) throw new Error("Invalid phone");
  if (lead.name.trim().length > FIELD_LIMITS.name) throw new Error("Name too long");
  if (lead.phone.trim().length > FIELD_LIMITS.phone) throw new Error("Phone too long");
  if (lead.telegram && lead.telegram.length > FIELD_LIMITS.telegram)
    throw new Error("Telegram too long");
  if (lead.comment && lead.comment.trim().length > FIELD_LIMITS.comment)
    throw new Error("Comment too long");
}
