/** Figma 1822:23896 — Build card assets */
const base = "/assets/images/lead/how-layer-works/build";

export const BUILD_CARD_ASSETS = {
  /** 1822:23897 — grainy green/beige textured backdrop */
  backdropBg: `${base}/backdrop-bg.webp`,
  /** 1822:23904 — concentric white rings in Discount Governance hero */
  directiveHeroRings: `${base}/directive-hero-rings.svg`,
  /** 1822:23945 — open-book glyph in Discount Governance mid card */
  directiveIcon: `${base}/directive-icon.svg`,
  /** 1822:23898 — Objection Handling "Created by" avatar */
  creatorAvatar: "/assets/images/lead/alex-lyma-young.webp",
} as const;
