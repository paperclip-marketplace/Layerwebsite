import { createHmac, timingSafeEqual } from "node:crypto";

const CONTRACT_EVENTS = new Set([
  "Sent",
  "Viewed",
  "Signed",
  "Completed",
  "Declined",
  "Revoked",
  "Expired",
  "DeliveryFailed",
  "SendFailed",
]);

const EVENT_LABELS: Record<string, { emoji: string; label: string }> = {
  Sent: { emoji: "📤", label: "Contract sent" },
  Viewed: { emoji: "👀", label: "Contract viewed" },
  Signed: { emoji: "✍️", label: "Contract signed" },
  Completed: { emoji: "✅", label: "Contract completed" },
  Declined: { emoji: "❌", label: "Contract declined" },
  Revoked: { emoji: "⛔", label: "Contract revoked" },
  Expired: { emoji: "⏰", label: "Contract expired" },
  DeliveryFailed: { emoji: "⚠️", label: "Contract delivery failed" },
  SendFailed: { emoji: "🚨", label: "Contract send failed" },
};

export interface BoldSignWebhookPayload {
  event?: {
    id?: string;
    created?: number;
    eventType?: string;
    environment?: string;
  };
  data?: {
    documentId?: string;
    messageTitle?: string | null;
    documentDescription?: string | null;
    status?: string | null;
    expiryDate?: number | null;
    senderDetail?: { name?: string | null; emailAddress?: string | null } | null;
    signerDetails?: Array<{
      signerName?: string | null;
      signerEmail?: string | null;
      status?: string | null;
      isViewed?: boolean | null;
    }> | null;
  };
}

interface SlackText {
  type: "mrkdwn" | "plain_text";
  text: string;
  emoji?: boolean;
}

type SlackBlock = Record<string, unknown>;

export interface SlackWebhookMessage {
  text: string;
  blocks: SlackBlock[];
}

export function isContractEvent(eventType: unknown): eventType is string {
  return typeof eventType === "string" && CONTRACT_EVENTS.has(eventType);
}

export function verifyBoldSignSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): boolean {
  if (!signatureHeader || !secret) return false;

  const parts = signatureHeader.split(",").map((part) => part.trim().split("=", 2));
  const timestampText = parts.find(([key]) => key === "t")?.[1];
  const timestamp = Number(timestampText);
  if (!Number.isInteger(timestamp) || Math.abs(nowSeconds - timestamp) > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");

  return parts
    .filter(([key, value]) => (key === "s0" || key === "s1") && /^[a-f0-9]{64}$/i.test(value ?? ""))
    .some(([, value]) => {
      const candidate = Buffer.from(value!, "utf8");
      return candidate.length === expectedBuffer.length && timingSafeEqual(candidate, expectedBuffer);
    });
}

function escapeSlack(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function trim(value: string | null | undefined, fallback: string, max = 300): string {
  const clean = value?.trim() || fallback;
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

function formatDate(epochSeconds: number | null | undefined): string {
  if (!epochSeconds) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(epochSeconds * 1000));
}

function signerSummary(payload: BoldSignWebhookPayload): string {
  const signers = payload.data?.signerDetails ?? [];
  if (!signers.length) return "—";

  const lines = signers.slice(0, 5).map((signer) => {
    const identity = [signer.signerName?.trim(), signer.signerEmail?.trim()]
      .filter(Boolean)
      .join(" · ");
    const status = signer.status?.trim() || (signer.isViewed ? "Viewed" : "Pending");
    return `${escapeSlack(identity || "Unnamed signer")} — ${escapeSlack(status)}`;
  });
  if (signers.length > 5) lines.push(`+${signers.length - 5} more`);
  return lines.join("\n");
}

function field(label: string, value: string): SlackText {
  return { type: "mrkdwn", text: `*${label}*\n${value}` };
}

export function buildContractSlackMessage(payload: BoldSignWebhookPayload): SlackWebhookMessage {
  const eventType = payload.event?.eventType ?? "Unknown";
  const event = EVENT_LABELS[eventType] ?? { emoji: "📄", label: "Contract updated" };
  const title = trim(payload.data?.messageTitle, "Untitled contract", 150);
  const sender = payload.data?.senderDetail;
  const senderText = [sender?.name?.trim(), sender?.emailAddress?.trim()]
    .filter(Boolean)
    .join(" · ");
  const status = trim(payload.data?.status, eventType, 100);
  const eventDate = formatDate(payload.event?.created);
  const eventId = trim(payload.event?.id, "unknown event", 100);
  const documentId = trim(payload.data?.documentId, "unknown document", 100);

  return {
    text: `${event.label}: ${title}`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `${event.emoji} ${event.label}`, emoji: true },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*${escapeSlack(title)}*` },
      },
      {
        type: "section",
        fields: [
          field("Status", escapeSlack(status)),
          field("Sender", escapeSlack(senderText || "—")),
          field("Signers", signerSummary(payload)),
          field("Expires", formatDate(payload.data?.expiryDate)),
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Open BoldSign", emoji: true },
            url: "https://app-eu.boldsign.com/dashboard",
            action_id: "open_boldsign",
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Document ${escapeSlack(documentId)} · Event ${escapeSlack(eventId)} · ${eventDate}`,
          },
        ],
      },
    ],
  };
}
