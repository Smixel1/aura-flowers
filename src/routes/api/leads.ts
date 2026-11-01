import { createFileRoute } from "@tanstack/react-router";

import { handleLeadRequest, localLeadLimit } from "@/lib/lead-server";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleLeadRequest(request, {
          botToken: process.env["TELEGRAM_BOT_TOKEN"],
          chatId: process.env["TELEGRAM_CHAT_ID"],
          limit: localLeadLimit,
        }),
    },
  },
});
