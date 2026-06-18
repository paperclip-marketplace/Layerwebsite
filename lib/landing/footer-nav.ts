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
      { label: "Roleplay", href: "#" },
      { label: "Personal Agent", href: "#" },
      { label: "Coaching", href: "#" },
      { label: "Scoring and Feedback", href: "#" },
    ],
  },
  {
    title: "Leadership",
    dropdown: "products",
    items: [
      { label: "Agent Management", href: "#" },
      { label: "Playbooks", href: "#" },
      { label: "Skills and Frameworks", href: "#" },
      { label: "Interview and Training", href: "#" },
      { label: "Tool Calling and Integrations", href: "#" },
    ],
  },
  {
    title: "Solutions",
    dropdown: "solutions",
    items: [
      { label: "Ramp", href: "#" },
      { label: "Quota Attainment", href: "#" },
      { label: "Customer Facing Time", href: "#" },
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
  { label: "Cookie Policy", href: "#" },
] as const;
