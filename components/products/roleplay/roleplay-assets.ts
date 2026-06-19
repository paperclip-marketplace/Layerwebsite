const BASE = "/assets/images/landing/products/roleplay";
const VOICE_ORB_BASE = `${BASE}/voice-orbs`;

/** Persona wizard voice-card circles (`PitchBots/.../voice-orbs/01`–`06.png`). */
export const ROLEPLAY_VOICE_ORBS = [
  `${VOICE_ORB_BASE}/01.png`,
  `${VOICE_ORB_BASE}/02.png`,
  `${VOICE_ORB_BASE}/03.png`,
  `${VOICE_ORB_BASE}/04.png`,
  `${VOICE_ORB_BASE}/05.png`,
  `${VOICE_ORB_BASE}/06.png`,
] as const;

export const ROLEPLAY_ASSETS = {
  heroAgentBg: `${BASE}/hero-agent-bg.jpg`,
  heroAgentOverlay: `${BASE}/hero-agent-overlay.jpg`,
  heroAgentFeatured: `${BASE}/hero-agent-featured.jpg`,
  heroAgentDavid: `${BASE}/hero-agent-david.png`,
  howCreatePersona: `${BASE}/how-create-persona.png`,
  howEnrichUi: `${BASE}/how-enrich-ui.png`,
  howProcessing: `${BASE}/how-processing.png`,
  howPersonaCreated: `${BASE}/how-persona-created.png`,
  personaBuilder: `${BASE}/persona-builder.png`,
  ctaCreate: `${BASE}/cta-create.png`,
  ctaDemo: `${BASE}/cta-demo.png`,
  bottomCtaBg: `${BASE}/bottom-cta-bg.jpg`,
} as const;
