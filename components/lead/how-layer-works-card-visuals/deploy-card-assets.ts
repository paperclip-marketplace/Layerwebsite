/** Figma 1822:24242 — Deploy card assets */
const base = "/assets/images/lead/how-layer-works/deploy";

export const DEPLOY_CARD_ASSETS = {
  /** Stage backdrop */
  backdropBg: `${base}/backdrop-bg.webp`,
  /** Center agent (Maria) */
  heroCenter: `${base}/hero-center.webp`,
  portraitMaria: `${base}/portrait-maria.webp`,
  assigneeEven: `${base}/assignee-even.webp`,
  ringsCenter: `${base}/rings-center.svg`,
  /** Left agent */
  heroLeft: `${base}/hero-left.webp`,
  heroLeftAccent: `${base}/hero-left-accent.webp`,
  portraitMariaLeft: `${base}/portrait-maria-left.webp`,
  avatarLeftOverlay: `${base}/avatar-left-overlay.webp`,
  assigneeJhon: `${base}/assignee-jhon.webp`,
  ringsLeft: `${base}/rings-left.svg`,
  /** Right agent */
  heroRight: `${base}/hero-right.webp`,
  portraitAlex: `${base}/portrait-alex.webp`,
  assigneeDeepanjan: `${base}/assignee-deepanjan.webp`,
  ringsRight: `${base}/rings-right.svg`,
  /** Meta */
  dot: `${base}/dot.svg`,
} as const;
