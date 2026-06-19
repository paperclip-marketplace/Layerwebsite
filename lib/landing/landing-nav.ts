import { ROUTES } from "@/lib/config/constants";

export type LandingNavLink = {
  label: string;
  href: string;
};

/** Unbuilt marketing pages route here; pricing keeps its live page. */
export const COMING_SOON_HREF = ROUTES.comingSoon;

export const CUSTOMER_FACING_NAV: readonly LandingNavLink[] = [
  { label: "Roleplay", href: ROUTES.productsRoleplay },
  { label: "Personal Agent", href: ROUTES.productsPersonalAgent },
  { label: "Coaching", href: COMING_SOON_HREF },
  { label: "Scoring and Feedback", href: COMING_SOON_HREF },
] as const;

/** Live pages under Products → For Customer Facing Team (excludes coming-soon links). */
export const CUSTOMER_FACING_PRODUCT_PAGE_HREFS = CUSTOMER_FACING_NAV.filter(
  (item) => item.href !== COMING_SOON_HREF,
).map((item) => item.href);

export const LEADERSHIP_NAV: readonly LandingNavLink[] = [
  { label: "Agent Management", href: COMING_SOON_HREF },
  { label: "Playbooks", href: COMING_SOON_HREF },
  { label: "Skills and Frameworks", href: COMING_SOON_HREF },
  { label: "Interview and Training", href: COMING_SOON_HREF },
  { label: "Tool Calling and Integrations", href: COMING_SOON_HREF },
] as const;

export const SOLUTIONS_NAV: readonly LandingNavLink[] = [
  { label: "Ramp", href: COMING_SOON_HREF },
  { label: "Quota Attainment", href: COMING_SOON_HREF },
  { label: "Customer Facing Time", href: COMING_SOON_HREF },
] as const;

export const MORE_NAV: readonly LandingNavLink[] = [
  { label: "Pricing", href: ROUTES.pricing },
] as const;
