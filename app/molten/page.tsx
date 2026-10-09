import type { Metadata } from "next";

import { MoltenPage } from "@/components/molten/molten-page";

const title = "Molten Ventures | 3 Months Free on Layer";
const description =
  "Exclusive for Molten Ventures: 3 months of Layer free, up to 5,000 credits, and hands-on onboarding so GTM teams win more, ramp faster, and close better.";
const previewImage = "/assets/images/molten/molten-og.png";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Molten Ventures",
    "Layer AI",
    "GTM teams",
    "AI sales agents",
    "portfolio offer",
  ],
  alternates: {
    canonical: "/molten",
  },
  openGraph: {
    title,
    description,
    url: "/molten",
    siteName: "Layer AI",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Molten and Layer",
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

export default function MoltenRoutePage() {
  return <MoltenPage />;
}
