export interface RecaptchaClient {
  ready(callback: () => void): void;
  render(container: HTMLElement, parameters: { sitekey: string }): number;
  reset(widgetId?: number): void;
}

export interface RecaptchaRenderState {
  status: "idle" | "pending" | "rendered";
  widgetId: number | null;
}

/**
 * Public reCAPTCHA v2 checkbox site key used by Salesforce Web-to-Lead.
 * Already shipped to the browser on withlayer.ai — env can override after rotation.
 */
export const DEFAULT_RECAPTCHA_SITE_KEY =
  "6LcvRK4tAAAAAHKke4S1ZREUfzVaj55-xd8FhXBc";

/** Google's published v2 test key — allowed on localhost and always shows the checkbox. */
const LOCAL_RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

export function getRecaptchaSiteKey(): string {
  if (process.env.NODE_ENV !== "production") {
    return LOCAL_RECAPTCHA_SITE_KEY;
  }

  return (
    process.env.SALESFORCE_WEB_TO_LEAD_RECAPTCHA_SITE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SALESFORCE_WEB_TO_LEAD_RECAPTCHA_SITE_KEY?.trim() ||
    DEFAULT_RECAPTCHA_SITE_KEY
  );
}

export function renderRecaptchaOnce(
  client: RecaptchaClient | undefined,
  container: HTMLElement | null,
  siteKey: string,
  state: RecaptchaRenderState,
) {
  if (!client || !container || !siteKey || state.status !== "idle") return;

  state.status = "pending";
  client.ready(() => {
    if (!container.isConnected) {
      state.status = "idle";
      return;
    }

    try {
      state.widgetId = client.render(container, { sitekey: siteKey });
      state.status = "rendered";
    } catch {
      state.status = "idle";
    }
  });
}
