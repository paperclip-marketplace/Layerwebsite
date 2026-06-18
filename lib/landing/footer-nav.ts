import { ROUTES } from "@/lib/config/constants";
import type { LandingHeaderDropdownName } from "./header-dropdown";

export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterNavColumn = {
  title: string;
  dropdown?: LandingHeaderDropdownName;
  items: readonly FooterNavLink[];
};

/** Figma 1031:6391 — footer navigation columns */
export const FOOTER_NAV_COLUMNS: readonly FooterNavColumn[] = [
  {
    title: "Customer Facing Team",
    dropdown: "products",
    items: [
      { label: "Roleplay", href: ROUTES.comingSoon },
      { label: "Personal Agent", href: ROUTES.comingSoon },
      { label: "Coaching", href: ROUTES.comingSoon },
      { label: "Scoring and Feedback", href: ROUTES.comingSoon },
    ],
  },
  {
    title: "Leadership",
    dropdown: "products",
    items: [
      { label: "Agent Management", href: ROUTES.comingSoon },
      { label: "Playbooks", href: ROUTES.comingSoon },
      { label: "Skills and Frameworks", href: ROUTES.comingSoon },
      { label: "Interview and Training", href: ROUTES.comingSoon },
      { label: "Tool Calling and Integrations", href: ROUTES.comingSoon },
    ],
  },
  {
    title: "Solutions",
    dropdown: "solutions",
    items: [
      { label: "Ramp", href: ROUTES.comingSoon },
      { label: "Quota Attainment", href: ROUTES.comingSoon },
      { label: "Customer Facing Time", href: ROUTES.comingSoon },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Pricing", href: ROUTES.pricing },
      { label: "Our Story", href: ROUTES.ourStory },
    ],
  },
] as const;

export const FOOTER_POLICY_LINKS = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms of Services", href: ROUTES.terms },
  { label: "Cookie Policy", href: ROUTES.comingSoon },
] as const;
