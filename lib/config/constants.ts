export const APP_CONFIG = {
  name: 'Layer AI',
  description:
    'AI agents for revenue teams that source, prepare, practise, support live calls, automate follow-up, and coach every interaction.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.withlayer.ai',
} as const;

const LAYER_APP_URL =
  process.env.NEXT_PUBLIC_LAYER_APP_URL ||
  'https://app.withlayer.ai';

export const ROUTES = {
  home: '/',
  signIn: `${LAYER_APP_URL}/sign-in`,
  signUp: `${LAYER_APP_URL}/sign-up`,
  /** Invited members: workspace + profile (cannot skip; must finish before main onboarding on `/`). */
  preOnboarding: '/pre-onboarding',
  onboarding: '/onboarding',
  dashboard: '/u/dashboard',
  personas: '/u/personas',
  account: '/u/account',
  integrations: '/u/integrations',
  settings: '/u/settings',
  calls: '/u/calls',
  chat: '/chat',
  chatAdmin: '/chat/admin',
  chatOnboarding: '/chat/onboarding',
  copilot: '/copilot',
  prep: '/prep',
  pricing: '/pricing',
  ourStory: '/#our-story',
  productsRoleplay: '/products/roleplay',
  productsPersonalAgent: '/products/personal-agent',
  terms: '/terms',
  privacy: '/privacy',
} as const;

/** After auth: org members use home (member v2 shell on `/`); admins and others use personas. */
export function getPostAuthRedirectUrl(
  orgRole: string | null | undefined,
): string {
  return orgRole === 'org:member' ? ROUTES.home : ROUTES.personas;
}

export const PLAN_LIMITS = {
  free: {
    name: 'free',
    displayName: 'Free',
    maxPersonas: 3,
    maxIntegrations: 0,
    interactionLimit: 100,
    canCreateOrg: false,
    maxOrgJoin: 1,
    features: ['basic_personas', 'call_recording'],
  },
  pro: {
    name: 'pro',
    displayName: 'Pro',
    maxPersonas: 10,
    maxIntegrations: 2,
    interactionLimit: 1000,
    canCreateOrg: false,
    maxOrgJoin: 3,
    features: ['advanced_personas', 'call_recording', 'integrations', 'analytics'],
  },
  organization: {
    name: 'organization',
    displayName: 'Organization',
    maxPersonas: 50,
    maxIntegrations: 5,
    interactionLimit: 5000,
    canCreateOrg: true,
    maxOrgJoin: 1,
    features: ['team_collaboration', 'advanced_personas', 'call_recording', 'integrations', 'analytics', 'custom_branding'],
  },
} as const;

export const USER_ROLES = {
  admin: 'admin',
  member: 'member',
} as const;

export const INVITATION_STATUS = {
  pending: 'pending',
  accepted: 'accepted',
  expired: 'expired',
} as const;

export const SUBSCRIPTION_STATUS = {
  active: 'active',
  canceled: 'canceled',
  past_due: 'past_due',
  incomplete: 'incomplete',
} as const;

export const INTEGRATION_PLATFORMS = {
  gong: 'gong',
  salesloft: 'salesloft',
} as const;

export const METHODOLOGIES = {
  MEDDIC: 'MEDDIC',
  MEDDPICC: 'MEDDPICC',
  BANT: 'BANT',
  SPIN: 'SPIN',
  CHALLENGER: 'Challenger',
  SNAP: 'SNAP',
  SANDLER: 'SANDLER',
} as const;

export const SESSION_DURATIONS = [10, 15, 30] as const;

export const OVERAGE_POLICIES = {
  HARD_STOP: 'hard_stop',
  PER_HOUR_BILLING: 'per_hour_billing',
  TIME_PACKS: 'time_packs',
} as const;

export const DEFAULT_ENABLED_METHODOLOGIES = ['MEDDIC', 'BANT'] as const;
export const DEFAULT_SESSION_DURATION = 15;
export const DEFAULT_OVERAGE_POLICY = 'hard_stop';

export const DEFAULT_MEMBER_PERMISSIONS = {
  CAN_CREATE_PERSONAS: true,
  CAN_EDIT_PERSONAS: true,
} as const;

/** Header demo CTA + home promo banner. Set true when public demo launches from marketing. */
export const SHOW_LANDING_DEMO_ENTRY = false;
