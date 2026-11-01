# Aura Flowers hardening design

## Intent

Make lead submission trustworthy and reduce avoidable security and mobile usability risks in the current storefront. The user authorized implementation after reviewing the audit.

## Approach

Keep the existing TanStack Start and Cloudflare-oriented deployment. Add one same-origin server route for leads. Browser forms send only to that route. The route validates bounded JSON, applies a best-effort per-client throttle, and sends a plain-text Telegram message using a private bot token and chat ID. It returns success only after Telegram confirms delivery. Production also needs a platform-level rate rule because in-memory limits are per instance.

Upgrade the vulnerable TanStack Start dependency group, then verify build and audit. Improve mobile catalog filters without changing the visual identity. Remove deceptive placeholder contact actions where real business data is unavailable, while preserving a clear route to the contact form.

## Alternatives considered

- Keep direct browser-to-webhook submission and harden the receiver: fewer code changes, but n8n was removed and the URL remains public.
- Add the server route described above: selected because validation and private configuration become enforceable in this repository.
- Introduce a database and order management service: unnecessary for the current lead-form product and requires deployment decisions.

## Constraints

- Do not add real contact details or credentials without user-provided values.
- Do not rewrite published Git history; Lovable syncs the connected branch.
- Preserve the current static catalog and order-form flow.
- Missing Telegram configuration is a visible failure, never a successful order.
