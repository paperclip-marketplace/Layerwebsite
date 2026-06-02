import type { Metadata } from "next";

import { PrivacyPage } from "@/components/privacy/privacy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Layer AI",
  description:
    "Privacy policy describing how Layer AI collects, uses, and protects your personal data.",
};

export default function PrivacyRoutePage() {
  return <PrivacyPage />;
}
