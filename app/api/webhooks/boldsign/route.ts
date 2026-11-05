import {
  buildContractSlackMessage,
  isContractEvent,
  verifyBoldSignSignature,
  type BoldSignWebhookPayload,
} from "@/lib/integrations/boldsign-webhook";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  if (request.headers.get("x-boldsign-event") === "Verification") {
    return new Response(null, { status: 200 });
  }

  const rawBody = await request.text();
  const signingSecret = process.env.BOLDSIGN_WEBHOOK_SECRET ?? "";
  const slackWebhookUrl = process.env.SLACK_CONTRACTS_WEBHOOK_URL ?? "";

  if (!signingSecret || !slackWebhookUrl) {
    console.error("BoldSign contract notifications are not configured");
    return new Response(null, { status: 503 });
  }

  if (
    !verifyBoldSignSignature(
      rawBody,
      request.headers.get("x-boldsign-signature"),
      signingSecret,
    )
  ) {
    return new Response(null, { status: 401 });
  }

  let payload: BoldSignWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as BoldSignWebhookPayload;
  } catch {
    return new Response(null, { status: 400 });
  }

  if (!isContractEvent(payload.event?.eventType)) {
    return new Response(null, { status: 200 });
  }

  const slackResponse = await fetch(slackWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(buildContractSlackMessage(payload)),
  });

  if (!slackResponse.ok) {
    console.error("Slack rejected a BoldSign contract notification", {
      eventId: payload.event?.id,
      status: slackResponse.status,
    });
    return new Response(null, { status: 502 });
  }

  return new Response(null, { status: 200 });
}
