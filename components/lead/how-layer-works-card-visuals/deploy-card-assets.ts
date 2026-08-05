/** Figma 1822:24241 — Deploy card assets */
const base = "/assets/images/lead/how-layer-works/deploy";

export const DEPLOY_CARD_ASSETS = {
  /* Stage backdrop — 1822:24243 */
  backdropBg: `${base}/backdrop-bg.png`,

  /* Center — 1822:24298 */
  heroCenter: `${base}/hero-center.png`,
  portraitMaria: `${base}/portrait-maria.png`,
  assigneeEven: `${base}/assignee-even.png`,
  ringsCenter: `${base}/rings-center.svg`,

  /* Left — 1822:24244 */
  heroLeft: `${base}/hero-left.png`,
  heroLeftAccent: `${base}/hero-left-accent.png`,
  portraitMariaLeft: `${base}/portrait-maria-left.png`,
  avatarLeftOverlay: `${base}/avatar-left-overlay.png`,
  assigneeJhon: `${base}/assignee-jhon.png`,
  ringsLeft: `${base}/rings-left.svg`,

  /* Right — 1822:24269 */
  heroRight: `${base}/hero-right.png`,
  portraitAlex: `${base}/portrait-alex.png`,
  assigneeDeepanjan: `${base}/assignee-deepanjan.png`,
  ringsRight: `${base}/rings-right.svg`,

  dot: `${base}/dot.svg`,
} as const;
