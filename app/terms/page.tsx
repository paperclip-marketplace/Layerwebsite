import type { Metadata } from "next";

import { TermsPage } from "@/components/terms/terms-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Layer AI",
  description:
    "Terms and conditions governing your access to and use of the Layer AI platform and related services.",
};

export default function TermsRoutePage() {
  return <TermsPage />;
}
