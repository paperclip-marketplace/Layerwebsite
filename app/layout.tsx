import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";

import "@material-symbols/font-400";
import "./globals.css";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.withlayer.ai");

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Layer AI - AI-Powered Sales Training",
  description:
    "Master your sales conversations with AI-powered persona training and real-time coaching",
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
    "sales training",
    "AI coaching",
    "conversation practice",
    "sales personas",
  ],
  authors: [{ name: "Layer AI Team" }],
  openGraph: {
    title: "Layer AI",
    description: "AI-powered sales conversation training platform",
    url: defaultUrl,
    siteName: "Layer AI",
    images: ["/thumbnail_image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layer AI",
    description: "AI-powered sales conversation training platform",
    images: ["/thumbnail_image.png"],
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
