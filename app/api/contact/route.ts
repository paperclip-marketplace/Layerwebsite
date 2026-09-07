import { NextResponse } from "next/server";

import { APP_CONFIG } from "@/lib/config/constants";
import {
  buildWebToLeadPayload,
  buildWebToLeadUrl,
  parseContactLead,
} from "@/lib/contact/lead";

function requestIsSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");

  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, message: "This submission could not be verified." },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Enter your details and try again." },
      { status: 400 },
    );
  }

  const parsed = parseContactLead(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, errors: parsed.errors },
      { status: 400 },
    );
  }

  if ("bot" in parsed) {
    return NextResponse.json({ ok: true });
  }

  const orgId = process.env.SALESFORCE_WEB_TO_LEAD_ORG_ID?.trim();
  const recaptchaKeyName =
    process.env.SALESFORCE_WEB_TO_LEAD_RECAPTCHA_KEY_NAME?.trim();
  const debugEmail = process.env.SALESFORCE_WEB_TO_LEAD_DEBUG_EMAIL?.trim();
  const recaptchaToken =
    typeof (body as Record<string, unknown>).recaptchaToken === "string"
      ? (body as Record<string, string>).recaptchaToken.trim()
      : "";

  if (!orgId || !recaptchaKeyName) {
    console.error("Salesforce Web-to-Lead is not configured");
    return NextResponse.json(
      {
        ok: false,
        message: "We could not send your message. Please try again shortly.",
      },
      { status: 503 },
    );
  }

  if (!recaptchaToken) {
    return NextResponse.json(
      { ok: false, message: "Please confirm that you are not a robot." },
      { status: 400 },
    );
  }

  const payload = buildWebToLeadPayload(parsed.data, {
    orgId,
    returnUrl: new URL("/contact?submitted=1", APP_CONFIG.url).toString(),
    recaptchaKeyName,
    recaptchaToken,
    debugEmail,
  });

  try {
    const response = await fetch(buildWebToLeadUrl(orgId), {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: payload,
      redirect: "manual",
      cache: "no-store",
    });

    if (![301, 302, 303].includes(response.status)) {
      const responseText = await response.text();
      console.error("Salesforce Web-to-Lead returned an unexpected response", {
        status: response.status,
        contentType: response.headers.get("content-type"),
        responseUrl: response.url,
        responseLength: responseText.length,
        mentionsCaptcha: /captcha/i.test(responseText),
        mentionsError: /error|invalid|failed|could not/i.test(responseText),
      });
      throw new Error(`Salesforce returned ${response.status}`);
    }
  } catch (error) {
    console.error("Salesforce Web-to-Lead submission failed", error);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not send your message. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
