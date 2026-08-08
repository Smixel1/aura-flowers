export type LeadSource = "catalog" | "bespoke" | "ai" | "contact";

export type Lead = {
  name: string;
  phone: string;
  occasion?: string | undefined;
  budget?: string | undefined;
  wishes?: string | undefined;
  bouquet?: string | undefined;
  source: LeadSource;
  createdAt: string;
};

/**
 * Single submission handler for every form on the site.
 * Point VITE_LEAD_WEBHOOK_URL at a Zapier/Make/CRM endpoint later —
 * no UI changes required. Without it, leads are logged locally.
 */
export async function submitLead(lead: Omit<Lead, "createdAt">): Promise<void> {
  const payload: Lead = { ...lead, createdAt: new Date().toISOString() };
  const endpoint = import.meta.env['VITE_LEAD_WEBHOOK_URL'] as string | undefined;

  if (!endpoint) {
    console.info("[lead]", payload);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Не удалось отправить заявку");
}

export const phonePattern = /^\+?[0-9\s\-()]{10,18}$/;
