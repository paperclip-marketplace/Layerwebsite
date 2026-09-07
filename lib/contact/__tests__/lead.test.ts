import assert from "node:assert/strict";
import test from "node:test";

import {
  buildWebToLeadPayload,
  parseContactLead,
} from "../lead.ts";

test("normalizes a valid contact submission", () => {
  const result = parseContactLead({
    firstName: "  Ada ",
    lastName: " Lovelace ",
    email: " ADA@EXAMPLE.COM ",
    company: " Analytical Engines Ltd ",
    jobTitle: " CTO ",
    phone: " +44 20 0000 0000 ",
    message: " Improve discovery consistency. ",
    website: "",
  });

  assert.deepEqual(result, {
    ok: true,
    data: {
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines Ltd",
      jobTitle: "CTO",
      phone: "+44 20 0000 0000",
      message: "Improve discovery consistency.",
    },
  });
});

test("requires the fields Salesforce needs to create a useful lead", () => {
  const result = parseContactLead({
    firstName: "",
    lastName: "",
    email: "not-an-email",
    company: "",
  });

  assert.equal(result.ok, false);
  if (result.ok) return;

  assert.deepEqual(result.errors, {
    firstName: "Enter your first name.",
    lastName: "Enter your last name.",
    email: "Enter a valid work email.",
    company: "Enter your company name.",
  });
});

test("treats a filled honeypot as a bot without forwarding it", () => {
  const result = parseContactLead({
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    company: "Analytical Engines Ltd",
    website: "https://spam.invalid",
  });

  assert.deepEqual(result, { ok: true, bot: true });
});

test("maps the contact form to Salesforce Web-to-Lead fields", () => {
  const parsed = parseContactLead({
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    company: "Analytical Engines Ltd",
    jobTitle: "CTO",
    phone: "+44 20 0000 0000",
    message: "Improve discovery consistency.",
  });

  assert.equal(parsed.ok, true);
  if (!parsed.ok || "bot" in parsed) return;

  const payload = buildWebToLeadPayload(parsed.data, {
    orgId: "00D000000000001",
    returnUrl: "https://www.withlayer.ai/contact?submitted=1",
    recaptchaKeyName: "Layer_Website_Production_Rotated",
    recaptchaToken: "captcha-token",
    submittedAt: 1_788_782_400_000,
  });

  assert.deepEqual(Object.fromEntries(payload), {
    oid: "00D000000000001",
    retURL: "https://www.withlayer.ai/contact?submitted=1",
    first_name: "Ada",
    last_name: "Lovelace",
    email: "ada@example.com",
    company: "Analytical Engines Ltd",
    title: "CTO",
    phone: "+44 20 0000 0000",
    description: "Improve discovery consistency.",
    lead_source: "Web",
    captcha_settings: JSON.stringify({
      keyname: "Layer_Website_Production_Rotated",
      fallback: "true",
      orgId: "00D000000000001",
      ts: "1788782400000",
    }),
    "g-recaptcha-response": "captcha-token",
  });
});
