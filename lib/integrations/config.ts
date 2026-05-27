/**
 * Unified Integrations Configuration
 *
 * Single source of truth for all integrations.
 *
 * TO ADD A NEW INTEGRATION:
 * 1. Add a new entry to the INTEGRATIONS dictionary below
 * 2. That's it! Types and constants are auto-derived.
 */

export type IntegrationCategory = 'crm' | 'sales' | 'meeting' | 'communication'
export type IntegrationType = 'nango' | 'oauth' | 'api_key'

export interface IntegrationCapability {
  deals: boolean
  stages: boolean
  transcripts: boolean
  contacts: boolean
}

export interface IntegrationConfig {
  /** Internal ID used throughout our codebase (e.g., 'salesforce') */
  id: string
  /** Nango provider config key - only used when calling Nango APIs */
  nangoKey: string
  /** Display name */
  name: string
  category: IntegrationCategory
  type: IntegrationType
  capabilities: IntegrationCapability
  icon: string
  logoUrl: string
  description: string
  domain: string
  bgColor: string
  enabled: boolean
  comingSoon?: boolean
  metadata?: Record<string, unknown>
}

// ============================================================================
// ADD NEW INTEGRATIONS HERE - Just add to this dictionary
// ============================================================================

export const INTEGRATIONS = {
  salesforce: {
    id: 'salesforce',
    nangoKey: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    type: 'nango',
    capabilities: { deals: true, stages: true, transcripts: false, contacts: true },
    icon: 'salesforce',
    logoUrl: '/integration-logos/salesforce-logo.svg',
    description: 'Enterprise CRM platform for managing customer relationships, sales pipelines, and analytics.',
    domain: 'salesforce.com',
    bgColor: 'bg-[#00A1E0]',
    enabled: true,
  },
  hubspot: {
    id: 'hubspot',
    nangoKey: 'hubspot',
    name: 'HubSpot',
    category: 'crm',
    type: 'nango',
    capabilities: { deals: true, stages: true, transcripts: true, contacts: true },
    icon: 'hubspot',
    logoUrl: '/integration-logos/hubspot-logo.svg',
    description: 'CRM platform integration for syncing contacts, deals, and call activity data.',
    domain: 'hubspot.com',
    bgColor: 'bg-[#FF7A59]',
    enabled: true,
  },
  gong: {
    id: 'gong',
    nangoKey: 'gong',
    name: 'Gong',
    category: 'sales',
    type: 'oauth',
    capabilities: { deals: false, stages: false, transcripts: true, contacts: false },
    icon: 'gong',
    logoUrl: '/integration-logos/gong.svg',
    description: 'Revenue intelligence platform integration for analyzing sales conversations and coaching insights.',
    domain: 'gong.io',
    bgColor: 'bg-[#7C3AED]',
    enabled: true,
  },
  salesloft: {
    id: 'salesloft',
    nangoKey: 'salesloft',
    name: 'Salesloft',
    category: 'sales',
    type: 'oauth',
    capabilities: { deals: false, stages: false, transcripts: true, contacts: false },
    icon: 'salesloft',
    logoUrl: '/integration-logos/salesloft-logo.svg',
    description: 'Sales engagement platform integration for importing call transcripts and customer interactions.',
    domain: 'salesloft.com',
    bgColor: 'bg-[#2E5C3F]',
    enabled: true,
  },
  outreach: {
    id: 'outreach',
    nangoKey: 'outreach',
    name: 'Outreach',
    category: 'sales',
    type: 'oauth',
    capabilities: { deals: false, stages: false, transcripts: true, contacts: false },
    icon: 'outreach',
    logoUrl: '/integration-logos/outreach.svg',
    description: 'Import sequences and calls from Outreach',
    domain: 'outreach.io',
    bgColor: 'bg-[#3C82F5]',
    enabled: false,
  },
  chorus: {
    id: 'chorus',
    nangoKey: 'chorus',
    name: 'Chorus',
    category: 'sales',
    type: 'oauth',
    capabilities: { deals: false, stages: false, transcripts: true, contacts: false },
    icon: 'chorus',
    logoUrl: '/integration-logos/chorus.svg',
    description: 'Import call transcripts from Chorus',
    domain: 'chorus.ai',
    bgColor: 'bg-[#5B6B7C]',
    enabled: false,
  },
  'google-calendar': {
    id: 'google-calendar',
    nangoKey: 'google-calendar',
    name: 'Google Calendar',
    category: 'meeting',
    type: 'nango',
    capabilities: { deals: false, stages: false, transcripts: false, contacts: false },
    icon: 'google-calendar',
    logoUrl: '/integration-logos/google-calendar.svg',
    description: 'Sync calendar events for meeting prep and scheduling.',
    domain: 'google.com',
    bgColor: 'bg-[#4285F4]',
    enabled: true,
  },
  gmail: {
    id: 'gmail',
    nangoKey: 'gmail',
    name: 'Gmail',
    category: 'meeting',
    type: 'nango',
    capabilities: { deals: false, stages: false, transcripts: false, contacts: false },
    icon: 'gmail',
    logoUrl: '/integration-logos/gmail.svg',
    description: 'Connect Gmail for email drafts and communication tracking.',
    domain: 'google.com',
    bgColor: 'bg-[#EA4335]',
    enabled: false,
  },
  slack: {
    id: 'slack',
    nangoKey: 'slack',
    name: 'Slack',
    category: 'communication',
    type: 'nango',
    capabilities: { deals: false, stages: false, transcripts: false, contacts: false },
    icon: 'slack',
    logoUrl: '/images/workflow-panel-tools/slack.svg',
    description:
      'Authorize Slack for workspace messaging, playbook tooling on the control plane, and assistant integrations.',
    domain: 'slack.com',
    bgColor: 'bg-[#4A154B]',
    enabled: true,
  },
  fireflies: {
    id: 'fireflies',
    nangoKey: 'fireflies',
    name: 'Fireflies',
    category: 'meeting',
    type: 'api_key',
    capabilities: { deals: false, stages: false, transcripts: true, contacts: false },
    icon: 'fireflies',
    logoUrl: '/integration-logos/fireflies.svg',
    description: 'Import meeting transcripts and summaries from Fireflies.ai.',
    domain: 'fireflies.ai',
    bgColor: 'bg-[#6C2BD9]',
    enabled: true,
  },
  circleback: {
    id: 'circleback',
    nangoKey: 'circleback-mcp',
    name: 'Circleback',
    category: 'meeting',
    type: 'nango',
    capabilities: { deals: false, stages: false, transcripts: true, contacts: false },
    icon: 'circleback',
    logoUrl: '/integration-logos/circleback.png',
    description: 'Import meeting transcripts, notes, and summaries from Circleback.',
    domain: 'circleback.ai',
    bgColor: 'bg-[#1B4DFF]',
    enabled: true,
  },
} satisfies Record<string, IntegrationConfig>

// ============================================================================
// AUTO-DERIVED TYPES AND CONSTANTS - Don't edit below
// ============================================================================

/** Union type of all internal integration IDs */
export type IntegrationId = keyof typeof INTEGRATIONS

/** Array of all integration configs */
export const ALL_INTEGRATIONS = Object.values(INTEGRATIONS)

/** Integrations shown on Transcripts → Upload → Connect Providers. */
export function getTranscriptProviderIntegrations(): IntegrationConfig[] {
  return ALL_INTEGRATIONS.filter(
    (i) =>
      i.enabled &&
      i.capabilities.transcripts &&
      (i.category === 'sales' || i.category === 'meeting'),
  )
}

/** Same groupings as Settings → Integrations (Sales, CRM, Meeting). */
const SETTINGS_INTEGRATIONS_CATEGORY_ORDER: IntegrationCategory[] = [
  'sales',
  'crm',
  'meeting',
]

export function getSettingsPageIntegrations(): IntegrationConfig[] {
  return SETTINGS_INTEGRATIONS_CATEGORY_ORDER.flatMap((category) =>
    ALL_INTEGRATIONS.filter((integration) => integration.category === category),
  )
}

/** Get Nango key from internal ID - use this when calling Nango APIs */
export function getNangoKey(integrationId: IntegrationId): string {
  return INTEGRATIONS[integrationId].nangoKey
}

/** Get internal ID from Nango key - use this when receiving webhooks from Nango */
export function getIntegrationIdFromNangoKey(nangoKey: string): IntegrationId | undefined {
  const entry = Object.entries(INTEGRATIONS).find(([_, config]) => config.nangoKey === nangoKey)
  return entry?.[0] as IntegrationId | undefined
}

/** Nango-based integrations (for filtering) */
export const NANGO_INTEGRATIONS = ALL_INTEGRATIONS.filter(i => i.type === 'nango')

/** OAuth-based integrations (for filtering) */
export const OAUTH_INTEGRATIONS = ALL_INTEGRATIONS.filter(i => i.type === 'oauth')

/** API-key integrations (direct GraphQL / REST, not Nango) */
export const API_KEY_INTEGRATIONS = ALL_INTEGRATIONS.filter(i => i.type === 'api_key')

/** Helper: Get all integrations as array */
export function getAllIntegrations(): IntegrationConfig[] {
  return ALL_INTEGRATIONS
}

/** Helper: Get by category */
export function getIntegrationsByCategory(category: IntegrationCategory): IntegrationConfig[] {
  return ALL_INTEGRATIONS.filter(i => i.category === category)
}

/** Helper: Get by type */
export function getIntegrationsByType(type: IntegrationType): IntegrationConfig[] {
  return ALL_INTEGRATIONS.filter(i => i.type === type)
}

/** Helper: Get single integration */
export function getIntegration(id: IntegrationId): IntegrationConfig {
  return INTEGRATIONS[id]
}

/** Helper: Check if enabled */
export function isIntegrationEnabled(id: IntegrationId): boolean {
  return INTEGRATIONS[id]?.enabled ?? false
}

/** Category labels for UI */
export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  crm: 'CRM Systems',
  sales: 'Sales & Outreach',
  meeting: 'Meeting Platforms',
  communication: 'Communication',
}

/** Category descriptions for UI */
export const CATEGORY_DESCRIPTIONS: Record<IntegrationCategory, string> = {
  crm: 'Connect your CRM to sync deals, stages, and contacts',
  sales: 'Import call transcripts, recordings, and sequences for coaching',
  meeting: 'Connect meeting platforms for recording and analysis',
  communication: 'Chat with your AI assistant through messaging platforms',
}

// ============================================================================
// SYNC CONFIGURATION - Nango sync names by integration
// ============================================================================

export const SYNC_NAMES: Record<IntegrationId, string[]> = {
  salesforce: ['fetch-deals-with-contacts'],
  hubspot: ['fetch-deals-with-contacts'],
  gong: ['calls'],
  salesloft: ['calls'],
  outreach: [],
  chorus: [],
  'google-calendar': [],
  gmail: [],
  slack: [],
  /** Fireflies uses direct GraphQL import, not Nango managed sync triggers. */
  fireflies: [],
  circleback: ['circleback-transcripts'],
}

/** Get sync names for an integration */
export function getSyncNames(integrationId: IntegrationId): string[] {
  return SYNC_NAMES[integrationId] ?? []
}

// ============================================================================
// UI CONFIGURATION - For connection buttons
// ============================================================================

export interface UIConfig {
  name: string
  icon: string
  color: string
  category: 'crm' | 'calls'
}

export const INTEGRATION_UI: Record<IntegrationId, UIConfig> = {
  salesforce: {
    name: 'Salesforce',
    icon: '☁️',
    color: 'bg-blue-100 text-blue-700',
    category: 'crm',
  },
  hubspot: {
    name: 'HubSpot',
    icon: '🟠',
    color: 'bg-orange-100 text-orange-700',
    category: 'crm',
  },
  gong: {
    name: 'Gong',
    icon: '🎯',
    color: 'bg-purple-100 text-purple-700',
    category: 'calls',
  },
  salesloft: {
    name: 'Salesloft',
    icon: '📊',
    color: 'bg-green-100 text-green-700',
    category: 'calls',
  },
  outreach: {
    name: 'Outreach',
    icon: '📧',
    color: 'bg-blue-100 text-blue-600',
    category: 'calls',
  },
  chorus: {
    name: 'Chorus',
    icon: '🎵',
    color: 'bg-gray-100 text-gray-700',
    category: 'calls',
  },
  'google-calendar': {
    name: 'Google Calendar',
    icon: '📅',
    color: 'bg-blue-100 text-blue-600',
    category: 'crm',
  },
  gmail: {
    name: 'Gmail',
    icon: '✉️',
    color: 'bg-red-100 text-red-600',
    category: 'crm',
  },
  slack: {
    name: 'Slack',
    icon: '💬',
    color: 'bg-purple-100 text-purple-700',
    category: 'crm',
  },
  fireflies: {
    name: 'Fireflies',
    icon: '🔥',
    color: 'bg-purple-100 text-purple-700',
    category: 'calls',
  },
  circleback: {
    name: 'Circleback',
    icon: '🔄',
    color: 'bg-blue-100 text-blue-700',
    category: 'calls',
  },
}

/** Get UI config for an integration */
export function getIntegrationUI(integrationId: IntegrationId): UIConfig {
  return INTEGRATION_UI[integrationId]
}
