/** Figma 1822:24326 — Improve card assets */
const base = "/assets/images/lead/how-layer-works/improve";

export const IMPROVE_CARD_ASSETS = {
  /** 1822:24328 — textured purple backdrop (raw Figma fill) */
  backdropBg: `${base}/backdrop-raw.png`,
  /** 1822:24330 — soft white outer plate behind call UI */
  callShadowOuter: `${base}/call-shadow-outer.svg`,
  /** 1822:24332 — call UI (Mark / Stacey) */
  callUi: `${base}/call-ui.png`,
  /** 1822:24333 — thin white inner stroke on call UI */
  callShadowInner: `${base}/call-shadow-inner.svg`,
  /** 1822:24336 — coaching scorecard */
  scorecard: `${base}/scorecard.png`,
} as const;
