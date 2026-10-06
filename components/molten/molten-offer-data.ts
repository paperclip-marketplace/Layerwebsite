const OFFER_IMAGE_BASE = "/assets/images/molten/offer";

export type MoltenOfferCard = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  dataNodeId: string;
  dataName: string;
  imageDataName: string;
};

export const MOLTEN_OFFER_CARDS: MoltenOfferCard[] = [
  {
    id: "free-access",
    image: `${OFFER_IMAGE_BASE}/metric-01.png`,
    imageAlt: "Six months free access",
    title: "6 months of free access",
    description:
      "Six months free to explore the product and prove value before you pay.",
    dataNodeId: "2395:32943",
    dataName: "Metric Container 3",
    imageDataName: "Metric Image 1",
  },
  {
    id: "credits",
    image: `${OFFER_IMAGE_BASE}/metric-02.png`,
    imageAlt: "Up to 5,000 credits",
    title: "Up to 5,000 credits",
    description:
      "Generous monthly credits let you experiment, validate, and scale without hitting limits.",
    dataNodeId: "2395:32948",
    dataName: "Metric Container 11",
    imageDataName: "Metric Image 2",
  },
  {
    id: "onboarding",
    image: `${OFFER_IMAGE_BASE}/metric-03.png`,
    imageAlt: "Hands-on onboarding",
    title: "Hands-on onboarding",
    description:
      "The Layer team handles your setup, workflow mapping, and guided onboarding.",
    dataNodeId: "2395:32953",
    dataName: "Metric Container 12",
    imageDataName: "Metric Image 2",
  },
  {
    id: "ready",
    image: `${OFFER_IMAGE_BASE}/metric-04.png`,
    imageAlt: "Ready in minutes",
    title: "Ready in minutes",
    description:
      "Connect your tools, sync your data, and go live in minutes — not weeks.",
    dataNodeId: "2395:32958",
    dataName: "Metric Container 10",
    imageDataName: "Metric Image 2",
  },
];
