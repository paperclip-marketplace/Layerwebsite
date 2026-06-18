import { ROUTES } from "@/lib/config/constants";
import type { LandingHeaderDropdownName } from "./header-dropdown";
import {
  CUSTOMER_FACING_NAV,
  LEADERSHIP_NAV,
  MORE_NAV,
  SOLUTIONS_NAV,
  type LandingNavLink,
} from "./landing-nav";

export type FooterNavLink = LandingNavLink;

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
    items: CUSTOMER_FACING_NAV,
  },
  {
    title: "Leadership",
    dropdown: "products",
    items: LEADERSHIP_NAV,
  },
  {
    title: "Solutions",
    dropdown: "solutions",
    items: SOLUTIONS_NAV,
  },
  {
    title: "More",
    items: MORE_NAV,
  },
] as const;

export const FOOTER_POLICY_LINKS = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms of Services", href: ROUTES.terms },
  { label: "Cookie Policy", href: ROUTES.comingSoon },
] as const;
