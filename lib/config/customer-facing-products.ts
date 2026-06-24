import { ROUTES } from "./constants";
import { HEADER_NAV_ASSETS } from "@/lib/landing/header-nav-assets";

export type CustomerFacingProduct = {
  href: string;
  image: string;
  title: string;
  description: string;
};

export const CUSTOMER_FACING_PRODUCTS: CustomerFacingProduct[] = [
  {
    href: ROUTES.productsRoleplay,
    image: HEADER_NAV_ASSETS.customerFacing.roleplay,
    title: "Roleplay",
    description:
      "Discover our All-in one Layer studio designed for leadship",
  },
  {
    href: ROUTES.productsPersonalAgent,
    image: HEADER_NAV_ASSETS.customerFacing.personalAgent,
    title: "Personal Agent",
    description:
      "Discover our All-in one Layer studio designed for leadship",
  },
  {
    href: ROUTES.comingSoon,
    image: HEADER_NAV_ASSETS.customerFacing.coaching,
    title: "Coaching",
    description:
      "Discover our All-in one Layer studio designed for leadship",
  },
  {
    href: ROUTES.comingSoon,
    image: HEADER_NAV_ASSETS.customerFacing.scoringAndFeedback,
    title: "Scoring and Feedback",
    description:
      "Discover our All-in one Layer studio designed for leadship",
  },
];
