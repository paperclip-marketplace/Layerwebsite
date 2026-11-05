import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

// Node's built-in TypeScript runner requires the explicit extension.
// @ts-expect-error TS5097 is expected under the app's bundler configuration.
import { buildContractSlackMessage, isContractEvent, verifyBoldSignSignature, type BoldSignWebhookPayload } from "../boldsign-webhook.ts";

const secret = "whsec_test";
const now = 1_700_000_000;
const body = JSON.stringify({ event: { id: "evt_123", eventType: "Sent" } });

function signature(timestamp: number, signingSecret = secret): string {
  return createHmac("sha256", signingSecret)
    .update(`${timestamp}.${body}`)
    .digest("hex");
}

test("verifies BoldSign's current or rolling signature", () => {
  assert.equal(
    verifyBoldSignSignature(body, `t=${now}, s0=${signature(now)}`, secret, now),
    true,
  );
  assert.equal(
    verifyBoldSignSignature(body, `t=${now}, s0=${"0".repeat(64)}, s1=${signature(now)}`, secret, now),
    true,
  );
});

test("rejects malformed, stale, or incorrect signatures", () => {
  assert.equal(verifyBoldSignSignature(body, "", secret, now), false);
  assert.equal(
    verifyBoldSignSignature(body, `t=${now - 301}, s0=${signature(now - 301)}`, secret, now),
    false,
  );
  assert.equal(
    verifyBoldSignSignature(body, `t=${now}, s0=${"f".repeat(64)}`, secret, now),
    false,
  );
});

test("limits notifications to useful contract lifecycle events", () => {
  for (const event of [
    "Sent",
    "Viewed",
    "Signed",
    "Completed",
    "Declined",
    "Revoked",
    "Expired",
    "DeliveryFailed",
    "SendFailed",
  ]) {
    assert.equal(isContractEvent(event), true, event);
  }
  assert.equal(isContractEvent("Reminder"), false);
  assert.equal(isContractEvent("SignerSaved"), false);
});

test("builds a compact Slack card without copying contract contents", () => {
  const payload: BoldSignWebhookPayload = {
    event: {
      id: "evt_123",
      created: 1_700_000_000,
      eventType: "Completed",
      environment: "Live",
    },
    data: {
      documentId: "doc_123",
      messageTitle: "Cluster <Order> & Renewal",
      documentDescription: "Sensitive contract body must not appear",
      status: "Completed",
      expiryDate: 1_700_864_000,
      senderDetail: { name: "Even Walser", emailAddress: "even@withlayer.ai" },
      signerDetails: [
        {
          signerName: "Enrique",
          signerEmail: "enrique@example.com",
          status: "Completed",
          isViewed: true,
        },
      ],
    },
  };

  const message = buildContractSlackMessage(payload);
  const serialized = JSON.stringify(message);

  assert.match(message.text, /Contract completed: Cluster <Order> & Renewal/);
  assert.match(serialized, /Cluster &lt;Order&gt; &amp; Renewal/);
  assert.match(serialized, /Enrique/);
  assert.match(serialized, /enrique@example.com/);
  assert.match(serialized, /Even Walser/);
  assert.match(serialized, /Open BoldSign/);
  assert.doesNotMatch(serialized, /Sensitive contract body/);
});
