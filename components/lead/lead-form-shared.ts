export const LEAD_ROLE_OPTIONS = [
  "Sales manager",
  "Sales rep",
  "RevOps",
  "Enablement",
  "Sales leadership",
  "Other",
] as const;

export const LEAD_TEAM_SIZE_OPTIONS = [
  "1-10",
  "10-20",
  "21-50",
  "51-200",
  "200+",
] as const;

export const LEAD_IMPROVEMENT_OPTIONS = [
  "Rep Productivity",
  "Ramp & Onboarding",
  "Sales Execution",
  "Coaching",
  "GTM Consistency",
  "Other",
] as const;

export type LeadImprovementOption = (typeof LEAD_IMPROVEMENT_OPTIONS)[number];

export type LeadFormState = {
  workEmail: string;
  role: (typeof LEAD_ROLE_OPTIONS)[number];
  teamSize: (typeof LEAD_TEAM_SIZE_OPTIONS)[number];
  improvements: LeadImprovementOption[];
};

export const LEAD_FORM_INITIAL_STATE: LeadFormState = {
  workEmail: "",
  role: "Sales manager",
  teamSize: "10-20",
  improvements: [],
};
