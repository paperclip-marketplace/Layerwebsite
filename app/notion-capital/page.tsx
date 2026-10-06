import type { Metadata } from "next";

import { MoltenPage } from "@/components/molten/molten-page";
import { NOTION_CAPITAL_PARTNER } from "@/components/molten/partner-pages";

const title = "Notion Capital | 6 Months Free on Layer";
const description =
  "Exclusive for Notion Capital: 6 months of Layer free, up to 5,000 credits, and hands-on onboarding so GTM teams win more, ramp faster, and close better.";
const previewImage = "/assets/images/molten/molten-og.png";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Notion Capital",
    "Layer AI",
    "GTM teams",
    "AI sales agents",
    "portfolio offer",
  ],
  alternates: {
    canonical: "/notion-capital",
  },
  openGraph: {
    title,
    description,
    url: "/notion-capital",
    siteName: "Layer AI",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Notion Capital and Layer",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
};

export default function NotionCapitalPage() {
  return <MoltenPage partner={NOTION_CAPITAL_PARTNER} />;
}
