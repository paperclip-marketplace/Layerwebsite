export type ContactLead = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  message: string;
};

export type ContactLeadField =
  | "firstName"
  | "lastName"
  | "email"
  | "company"
  | "jobTitle"
  | "phone"
  | "message";

export type ContactLeadErrors = Partial<Record<ContactLeadField, string>>;

export type ContactLeadParseResult =
  | { ok: true; data: ContactLead }
  | { ok: true; bot: true }
  | { ok: false; errors: ContactLeadErrors };

type WebToLeadConfig = {
  orgId: string;
  returnUrl: string;
  recaptchaKeyName: string;
  recaptchaToken: string;
  submittedAt?: number;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function parseContactLead(input: unknown): ContactLeadParseResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {
      ok: false,
      errors: {
        firstName: "Enter your first name.",
        lastName: "Enter your last name.",
        email: "Enter a valid work email.",
        company: "Enter your company name.",
      },
    };
  }

  const values = input as Record<string, unknown>;

  if (readString(values.website, 200)) {
    return { ok: true, bot: true };
  }

  const data: ContactLead = {
    firstName: readString(values.firstName, 40),
    lastName: readString(values.lastName, 80),
    email: readString(values.email, 80).toLowerCase(),
    company: readString(values.company, 255),
    jobTitle: readString(values.jobTitle, 128),
    phone: readString(values.phone, 40),
    message: readString(values.message, 3_000),
  };

  const errors: ContactLeadErrors = {};

  if (!data.firstName) errors.firstName = "Enter your first name.";
  if (!data.lastName) errors.lastName = "Enter your last name.";
  if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "Enter a valid work email.";
  }
  if (!data.company) errors.company = "Enter your company name.";

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}

export function buildWebToLeadPayload(
  lead: ContactLead,
  config: WebToLeadConfig,
): URLSearchParams {
  const submittedAt = config.submittedAt ?? Date.now();
  const payload = new URLSearchParams({
    oid: config.orgId,
    retURL: config.returnUrl,
    first_name: lead.firstName,
    last_name: lead.lastName,
    email: lead.email,
    company: lead.company,
    lead_source: "Web",
    captcha_settings: JSON.stringify({
      keyname: config.recaptchaKeyName,
      fallback: "true",
      orgId: config.orgId,
      ts: String(submittedAt),
    }),
    "g-recaptcha-response": config.recaptchaToken,
  });

  if (lead.jobTitle) payload.set("title", lead.jobTitle);
  if (lead.phone) payload.set("phone", lead.phone);
  if (lead.message) payload.set("description", lead.message);

  return payload;
}
