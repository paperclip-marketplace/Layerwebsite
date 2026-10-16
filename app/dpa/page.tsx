import type { Metadata } from "next";

import { DpaPage } from "@/components/dpa/dpa-page";

export const metadata: Metadata = {
  title: "Data Processing Addendum | Layer AI",
  description:
    "Layer AI's data processing terms for customers using the Layer Service.",
};

export default function DpaRoutePage() {
  return <DpaPage />;
}
