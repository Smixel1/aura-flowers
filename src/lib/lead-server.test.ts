import assert from "node:assert/strict";
import { test } from "node:test";

import { handleLeadRequest } from "./lead-server";

const validLead = {
  name: "Анна",
  phone: "+7 900 123 45 67",
  source: "catalog",
  bouquet: "Три слова",
  total: 1500,
};

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://flowers.example/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://flowers.example", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("rejects malformed lead data before contacting Telegram", async () => {
  let calls = 0;
  const response = await handleLeadRequest(request({ ...validLead, phone: "bad" }), {
    botToken: "test-token",
    chatId: "123",
    send: async () => {
      calls++;
      return new Response(JSON.stringify({ ok: true }));
    },
  });
  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});

test("rejects a body larger than the limit even without a content-length header", async () => {
  const response = await handleLeadRequest(request({ ...validLead, comment: "x".repeat(9000) }), {
    botToken: "test-token",
    chatId: "123",
    send: async () => {
      throw new Error("must not send");
    },
  });
  assert.equal(response.status, 413);
});

test("rejects a cross-origin browser request", async () => {
  const response = await handleLeadRequest(
    request(validLead, { origin: "https://attacker.example" }),
    {
      botToken: "test-token",
      chatId: "123",
      send: async () => {
        throw new Error("must not send");
      },
    },
  );
  assert.equal(response.status, 403);
});

test("does not claim success when Telegram is unconfigured", async () => {
  const response = await handleLeadRequest(request(validLead), {
    send: async () => {
      throw new Error("must not send");
    },
  });
  assert.equal(response.status, 503);
});

test("returns 429 when the shared limiter rejects the client", async () => {
  const response = await handleLeadRequest(request(validLead), {
    botToken: "test-token",
    chatId: "123",
    limit: async () => false,
    send: async () => {
      throw new Error("must not send");
    },
  });
  assert.equal(response.status, 429);
  assert.ok(response.headers.has("retry-after"));
});

test("reports Telegram rejection as failure", async () => {
  const response = await handleLeadRequest(request(validLead), {
    botToken: "test-token",
    chatId: "123",
    send: async () => new Response(JSON.stringify({ ok: false }), { status: 200 }),
  });
  assert.equal(response.status, 502);
});

test("acknowledges a validated lead only after Telegram confirms it", async () => {
  let calledUrl = "";
  let sentBody: { chat_id?: string; text?: string } = {};
  const response = await handleLeadRequest(request(validLead), {
    botToken: "test-token",
    chatId: "123",
    send: async (url, init) => {
      calledUrl = String(url);
      sentBody = JSON.parse(String(init?.body));
      return new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }));
    },
  });
  assert.equal(response.status, 200);
  assert.equal(calledUrl, "https://api.telegram.org/bottest-token/sendMessage");
  assert.equal(sentBody.chat_id, "123");
  assert.match(sentBody.text ?? "", /Анна/);
  assert.match(sentBody.text ?? "", /Три слова/);
});
