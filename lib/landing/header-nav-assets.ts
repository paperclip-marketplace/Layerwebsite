const BASE = "/assets/images/landing/header-nav";

/** Figma 1070:1046 / 1070:1244 — header Products & Solutions dropdown thumbnails. */
export const HEADER_NAV_ASSETS = {
  customerFacing: {
    roleplay: `${BASE}/roleplay.webp`,
    personalAgent: `${BASE}/personal-agent.webp`,
    coaching: `${BASE}/coaching.webp`,
    scoringAndFeedback: `${BASE}/scoring-and-feedback.webp`,
  },
  leadership: {
    agentManagement: `${BASE}/agent-management.webp`,
    playbooks: `${BASE}/playbooks.webp`,
    skillsAndFrameworks: `${BASE}/skills-and-frameworks.webp`,
    interviewAndTraining: `${BASE}/interview-and-training.webp`,
    toolCallingAndIntegrations: `${BASE}/tool-calling-and-integrations.webp`,
  },
  solutions: {
    ramp: `${BASE}/ramp.webp`,
    quotaAttainment: `${BASE}/quota-attainment.webp`,
    customerFacingTime: `${BASE}/customer-facing-time.webp`,
  },
  productsFooter: {
    coPilotV2: `${BASE}/co-pilot-v2.webp`,
    appleIcon: `${BASE}/apple-icon.webp`,
  },
} as const;

export const CUSTOMER_FACING_NAV_IMAGES = [
  HEADER_NAV_ASSETS.customerFacing.roleplay,
  HEADER_NAV_ASSETS.customerFacing.personalAgent,
  HEADER_NAV_ASSETS.customerFacing.coaching,
  HEADER_NAV_ASSETS.customerFacing.scoringAndFeedback,
] as const;

export const LEADERSHIP_NAV_IMAGES = [
  HEADER_NAV_ASSETS.leadership.agentManagement,
  HEADER_NAV_ASSETS.leadership.playbooks,
  HEADER_NAV_ASSETS.leadership.skillsAndFrameworks,
  HEADER_NAV_ASSETS.leadership.interviewAndTraining,
  HEADER_NAV_ASSETS.leadership.toolCallingAndIntegrations,
] as const;

export const SOLUTIONS_NAV_IMAGES = [
  HEADER_NAV_ASSETS.solutions.ramp,
  HEADER_NAV_ASSETS.solutions.quotaAttainment,
  HEADER_NAV_ASSETS.solutions.customerFacingTime,
] as const;
