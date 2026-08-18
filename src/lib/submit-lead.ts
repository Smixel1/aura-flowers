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
  createdAt: string;
};

/**
 * Single submission handler for every form on the site.
 * Set VITE_LEAD_WEBHOOK_URL in .env.local (see .env.example).
 * Without it, leads are logged locally in the browser console.
 */
export async function submitLead(lead: Omit<Lead, "createdAt">): Promise<void> {
  const payload = buildLeadPayload(lead);
  const endpoint = import.meta.env["VITE_LEAD_WEBHOOK_URL"] as string | undefined;

  if (!endpoint) {
    console.info("[lead]", payload);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  const isGoogleAppsScript = endpoint.includes("script.google.com");
  const jsonBody = JSON.stringify(payload);

  if (isGoogleAppsScript) {
    // GAS: simple POST without custom headers — avoids CORS preflight.
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      body: jsonBody,
    });
    return;
  }

  // n8n: explicit UTF-8 bytes + charset so the webhook parses Cyrillic correctly.
  const response = await fetch(endpoint, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: new TextEncoder().encode(jsonBody),
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

/** Ensures optional lead fields are included in the webhook JSON when present. */
export function buildLeadPayload(lead: Omit<Lead, "createdAt">): Lead {
  const payload: Lead = {
    name: lead.name,
    phone: lead.phone,
    source: lead.source,
    createdAt: new Date().toISOString(),
  };

  const clientComment = lead.comment?.trim();
  if (clientComment) payload.comment = clientComment;
  if (lead.telegram) payload.telegram = lead.telegram;
  if (lead.occasion) payload.occasion = lead.occasion;
  if (lead.budget) payload.budget = lead.budget;
  if (lead.bouquet) payload.bouquet = lead.bouquet;
  if (lead.composition) payload.composition = lead.composition;
  if (lead.estimatedPrice) payload.estimatedPrice = lead.estimatedPrice;
  if (lead.quantity != null) payload.quantity = lead.quantity;
  if (lead.total != null) payload.total = lead.total;

  return payload;
}
