/** Shared bottom glow — Figma contact / lead / molten hero backgrounds. */
export const MARKETING_HERO_BACKDROP_ASSETS = {
  bottomGlow: "/assets/images/contact/new-frame.svg",
  /** Figma 2406:3264 — Molten mesh (orange #F45523 / #F4A423 + purple field). */
  moltenBottomGlow: "/assets/images/molten/molten-hero-glow.svg",
} as const;

export type MarketingHeroBackdropVariant = "default" | "molten";
