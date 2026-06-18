import { ROUTES } from "./constants";

export type CustomerFacingProduct = {
  href: string;
  image: string;
  title: string;
  description: string;
};

export const CUSTOMER_FACING_PRODUCTS: CustomerFacingProduct[] = [
  {
    href: ROUTES.productsRoleplay,
    image:
      "https://www.figma.com/api/mcp/asset/7bf407f0-7f4e-43e5-a63a-e514811a15af",
    title: "Roleplay",
    description:
      "Discover our All-in one Layer studio designed for leadship",
  },
  {
    href: ROUTES.productsPersonalAgent,
    image:
      "https://www.figma.com/api/mcp/asset/de9fa87c-0cdc-4945-a66b-884e56f09d2d",
    title: "Personal Agent",
    description:
      "Discover our All-in one Layer studio designed for leadship",
  },
  {
    href: ROUTES.comingSoon,
    image:
      "https://www.figma.com/api/mcp/asset/55ef5f8f-1bcb-4bb4-ac5d-1a7c0572394d",
    title: "Coaching",
    description:
      "Discover our All-in one Layer studio designed for leadship",
  },
  {
    href: ROUTES.comingSoon,
    image:
      "https://www.figma.com/api/mcp/asset/7c4573ec-c420-4a7c-932e-4d187b3599e2",
    title: "Scoring and Feedback",
    description:
      "Discover our All-in one Layer studio designed for leadship",
  },
];
