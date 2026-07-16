/** Figma 1634:8734 / 1634:9657 — Contact Us assets. */
export const CONTACT_ASSETS = {
  bgGlow: "/assets/images/contact/bg-glow.svg",
  /** Plays once (~1.06s), then freeze on successCheckFinal. */
  successCheck: "/assets/images/contact/success-check.gif",
  successCheckFinal: "/assets/images/contact/success-check-final.png",
} as const;

/** Duration of success-check.gif before freezing on the final frame. */
export const SUCCESS_CHECK_DURATION_MS = 1100;
