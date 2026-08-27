/** Hidden field filled by bots — reject silently without calling the webhook. */
export function isBotSubmission(honeypot: string): boolean {
  return honeypot.trim().length > 0;
}

export const FIELD_LIMITS = {
  name: 100,
  phone: 20,
  telegram: 50,
  comment: 2000,
  message: 2000,
} as const;
