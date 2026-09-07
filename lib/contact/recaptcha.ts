export interface RecaptchaClient {
  ready(callback: () => void): void;
  render(container: HTMLElement, parameters: { sitekey: string }): number;
  reset(widgetId?: number): void;
}

export interface RecaptchaRenderState {
  status: "idle" | "pending" | "rendered";
  widgetId: number | null;
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

    state.widgetId = client.render(container, { sitekey: siteKey });
    state.status = "rendered";
  });
}
