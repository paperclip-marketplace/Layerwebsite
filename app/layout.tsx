import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";

import "@material-symbols/font-400";
import "./globals.css";

const siteTitle = "Layer | Agents for Revenue Teams";
const siteDescription =
  "AI Agents for revenue teams that source, prepare, practice, support live calls, automate follow-ups and coach every interaction.";
const previewImage = "/layer-preview-1200x630.jpg";
const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.withlayer.ai");

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [
      {
        url: "/assets/images/layer-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/assets/images/layer-logo.svg",
  },
  keywords: [
    "GTM performance",
    "revenue teams",
    "AI agents",
    "sales coaching",
    "sales enablement",
  ],
  authors: [{ name: "Layer AI Team" }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: defaultUrl,
    siteName: "Layer AI",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Layer agents for revenue teams",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className={`${GeistSans.className} antialiased`}>{children}</body>
    </html>
  );
}
