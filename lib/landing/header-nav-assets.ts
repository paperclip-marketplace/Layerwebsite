const BASE = "/assets/images/landing/header-nav";

/** Figma 1070:1046 / 1070:1244 — header Products & Solutions dropdown thumbnails. */
export const HEADER_NAV_ASSETS = {
  customerFacing: {
    roleplay: `${BASE}/roleplay.png`,
    personalAgent: `${BASE}/personal-agent.png`,
    coaching: `${BASE}/coaching.png`,
    scoringAndFeedback: `${BASE}/scoring-and-feedback.png`,
  },
  leadership: {
    agentManagement: `${BASE}/agent-management.png`,
    playbooks: `${BASE}/playbooks.png`,
    skillsAndFrameworks: `${BASE}/skills-and-frameworks.png`,
    interviewAndTraining: `${BASE}/interview-and-training.png`,
    toolCallingAndIntegrations: `${BASE}/tool-calling-and-integrations.png`,
  },
  solutions: {
    ramp: `${BASE}/ramp.png`,
    quotaAttainment: `${BASE}/quota-attainment.png`,
    customerFacingTime: `${BASE}/customer-facing-time.png`,
  },
  productsFooter: {
    coPilotV2: `${BASE}/co-pilot-v2.png`,
    appleIcon: `${BASE}/apple-icon.png`,
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
