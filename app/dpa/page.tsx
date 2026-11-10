import type { Metadata } from "next";

import { DpaPage } from "@/components/dpa/dpa-page";

export const metadata: Metadata = {
  title: "Data Processing Addendum | Layer AI",
  description:
    "The Layer AI Data Processing Addendum: how Layer processes personal data on behalf of customers.",
};

export default function DpaRoutePage() {
  return <DpaPage />;
}
