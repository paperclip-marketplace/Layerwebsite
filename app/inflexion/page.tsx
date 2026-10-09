import type { Metadata } from "next";

import { MoltenPage } from "@/components/molten/molten-page";
import { INFLEXION_PARTNER } from "@/components/molten/partner-pages";

const title = "Inflexion | 3 Months Free on Layer";
const description =
  "Exclusive for Inflexion: 3 months of Layer free, up to 5,000 credits, and hands-on onboarding so GTM teams win more, ramp faster, and close better.";
const previewImage = "/assets/images/inflexion/inflexion-og.png";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Inflexion",
    "Layer AI",
    "GTM teams",
    "AI sales agents",
    "portfolio offer",
  ],
  alternates: {
    canonical: "/inflexion",
  },
  openGraph: {
    title,
    description,
    url: "/inflexion",
    siteName: "Layer AI",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Inflexion and Layer",
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

export default function InflexionPage() {
  return <MoltenPage partner={INFLEXION_PARTNER} />;
}
