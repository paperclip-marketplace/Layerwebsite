const BASE = "/assets/images/landing/products/roleplay";
const VOICE_ORB_BASE = `${BASE}/voice-orbs`;

/** Persona wizard voice-card circles. */
export const ROLEPLAY_VOICE_ORBS = [
  `${VOICE_ORB_BASE}/01.webp`,
  `${VOICE_ORB_BASE}/02.webp`,
  `${VOICE_ORB_BASE}/03.webp`,
  `${VOICE_ORB_BASE}/04.webp`,
  `${VOICE_ORB_BASE}/05.webp`,
  `${VOICE_ORB_BASE}/06.webp`,
] as const;

/** Outer-ring dominant colors sampled from each voice-orb PNG for matching glow halos. */
export const VOICE_ORB_GLOW_COLORS: ReadonlyArray<{
  readonly r: number;
  readonly g: number;
  readonly b: number;
}> = [
  { r: 252, g: 155, b: 18 },
  { r: 26, g: 147, b: 184 },
  { r: 95, g: 168, b: 22 },
  { r: 161, g: 29, b: 175 },
  { r: 241, g: 64, b: 121 },
  { r: 124, g: 111, b: 189 },
];

export const ROLEPLAY_ASSETS = {
  heroAgentBg: `${BASE}/hero-agent-bg.webp`,
  heroAgentOverlay: `${BASE}/hero-agent-overlay.webp`,
  heroAgentFeatured: `${BASE}/hero-agent-featured.webp`,
  heroAgentDavid: `${BASE}/hero-agent-david.webp`,
  howCreatePersona: `${BASE}/how-create-persona.webp`,
  howEnrichUi: `${BASE}/how-enrich-ui.webp`,
  howProcessing: `${BASE}/how-processing.webp`,
  howPersonaCreated: `${BASE}/how-persona-created.webp`,
  personaBuilder: `${BASE}/persona-builder.webp`,
  ctaCreate: `${BASE}/cta-create.webp`,
  ctaDemo: `${BASE}/cta-demo.webp`,
  bottomCtaBg: `${BASE}/bottom-cta-bg.webp`,
} as const;
