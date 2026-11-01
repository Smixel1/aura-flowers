# Aura Flowers Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver leads privately to Telegram, update vulnerable dependencies, and improve mobile catalog usability.

**Architecture:** A TanStack Start server route validates bounded lead JSON and sends it to Telegram using server-only credentials. Existing forms keep their UI but call the same-origin route. The storefront remains a static catalog.

**Tech Stack:** React, TypeScript, TanStack Start, Vite, Node test runner via tsx.

**Spec:** `docs/superpowers/specs/2026-11-01-aura-hardening-design.md`

## Global Constraints

- Preserve Lovable's connected history and existing order UX.
- Never put Telegram credentials in a `VITE_` environment variable.
- Show success only after acknowledged delivery.
- Treat in-memory throttling as supplemental to a production edge rule.

## Review Focus

- Oversized or malformed JSON must not reach the webhook.
- Unconfigured or failing Telegram delivery must not produce a successful order.
- Browser-only honeypot and price values must not be trusted by the receiver.
- Legitimate forms must still submit all useful lead fields.
- Mobile filters must remain usable without page-level horizontal scrolling.

---

### Task 1: Server-owned lead delivery

**Files:** Add `src/lib/lead-server.ts`, `src/lib/lead-server.test.ts`, `src/routes/api/leads.ts`; modify `src/lib/submit-lead.ts`, `.env.example`, `package.json`.

**Interfaces:** `handleLeadRequest(request, options)` returns a `Response`. Browser `submitLead` posts to `/api/leads` and throws on non-2xx.

- [ ] Write tests for malformed, oversized, cross-origin, unconfigured, upstream failure, success, and throttled requests.
- [ ] Run tests and observe expected failures.
- [ ] Implement the server handler and route; update the browser client and environment example.
- [ ] Run tests, type check, and build.
- [ ] Commit the task.

### Task 2: Dependency security update

**Files:** Modify `package.json`, `package-lock.json`.

- [ ] Capture current audit result and affected installed versions.
- [ ] Upgrade the affected TanStack packages and safe transitive fixes.
- [ ] Run audit, build, type check and tests; reconcile remaining advisories.
- [ ] Commit the task.

### Task 3: Mobile catalog and trust details

**Files:** Modify `src/routes/shop/index.tsx`, `src/components/Footer.tsx`, `src/routes/contact.tsx`, `src/components/OrderForm.tsx` as needed.

- [ ] Verify the current mobile overflow and placeholder actions.
- [ ] Make filters wrap or present a compact usable layout; remove misleading placeholder links and phone fallback.
- [ ] Verify desktop and mobile rendering, controls and console.
- [ ] Commit the task.

### Task 4: Final review

- [ ] Run full test, type check, lint, build and production dependency audit.
- [ ] Inspect final diff and validate the lead flow with a local mock receiver.
- [ ] Review the branch for bypasses and regressions.
